/**
 * Auth Service — thin wrapper around Supabase Auth.
 *
 * Keeps all auth logic in one place. Components never call
 * supabase.auth directly — this service is the single source of truth.
 */

import { supabase, isSupabaseReady, supabaseConfigError } from '@/lib/supabase'
import { ROUTES } from '@/constants'
import { useAuthStore } from '@/store/auth.store'
import { profileService } from '@/services/profile.service'
import type { AuthUser } from '@/types/auth'

function normalizeEmail(email: string): string {
  return email.trim().toLowerCase()
}

/**
 * Defensive cleanup of any persisted auth tokens.
 *
 * Supabase stores its session under a key prefixed `sb-<project-ref>-auth-token`
 * in the configured storage. If a sign-out network call is interrupted, that key
 * could linger and re-hydrate a session on the next load. We remove any
 * Supabase auth keys from both localStorage and sessionStorage to guarantee the
 * session cannot be restored after logout.
 */
function clearAuthStorage(): void {
  if (typeof window === 'undefined') return

  const AUTH_KEY_PREFIX = 'sb-'
  const AUTH_KEY_SUFFIX = '-auth-token'

  for (const storage of [window.localStorage, window.sessionStorage]) {
    const keys: string[] = []
    for (let i = 0; i < storage.length; i++) {
      const key = storage.key(i)
      if (key) keys.push(key)
    }
    for (const key of keys) {
      if (key.startsWith(AUTH_KEY_PREFIX) && key.endsWith(AUTH_KEY_SUFFIX)) {
        storage.removeItem(key)
      }
    }
  }
}

function getErrorMessage(error: unknown): string {
  if (error instanceof Error) return error.message
  if (typeof error === 'string') return error
  if (typeof error === 'object' && error !== null) {
    const maybeMessage = (error as { message?: unknown }).message
    if (typeof maybeMessage === 'string' && maybeMessage.length > 0) return maybeMessage
    const maybeError = (error as { error?: unknown }).error
    if (typeof maybeError === 'string' && maybeError.length > 0) return maybeError
    const maybeMsg = (error as { msg?: unknown }).msg
    if (typeof maybeMsg === 'string' && maybeMsg.length > 0) return maybeMsg
  }
  return 'Authentication failed'
}

function getFriendlyAuthErrorMessage(error: unknown): string {
  const rawMessage = getErrorMessage(error)
  const message = rawMessage.toLowerCase()

  if (message.includes('invalid login credentials') || message.includes('invalid_grant') || message.includes('user not found')) {
    return 'Incorrect email or password'
  }

  if (message.includes('email not confirmed') || message.includes('confirm') || message.includes('verify')) {
    return 'Please verify your email before signing in'
  }

  if (message.includes('network') || message.includes('fetch') || message.includes('timeout')) {
    return 'Network error. Please check your connection and try again'
  }

  if (message.includes('provider is not enabled') || message.includes('unsupported provider') || message.includes('invalid provider')) {
    return 'OAuth sign-in is not enabled for this project. Please enable the provider in Supabase Auth providers or use email/password instead.'
  }

  if (message.includes('not configured') || message.includes('missing') || message.includes('disabled')) {
    return 'Authentication is not configured correctly. Please contact support'
  }

  if (message.includes('already registered') || message.includes('already exists') || message.includes('user_already_exists')) {
    return 'An account with this email already exists. Try signing in instead.'
  }

  return rawMessage
}

async function syncAuthStateFromSession(session: Awaited<ReturnType<typeof supabase.auth.signInWithPassword>>['data']['session']) {
  const store = useAuthStore.getState()

  if (!session?.user) {
    store.setUser(null)
    store.setProfile(null)
    store.setLoading(false)
    return
  }

  const authUser: AuthUser = {
    id: session.user.id,
    email: session.user.email ?? '',
    emailVerified: !!session.user.email_confirmed_at,
    createdAt: session.user.created_at,
  }

  store.setUser(authUser)
  store.setLoading(true)

  try {
    const profile = await profileService.getProfile(session.user.id)
    store.setProfile(profile)
  } catch (error) {
    console.warn('[auth] failed to load profile after sign-in', error)
    store.setProfile(null)
  } finally {
    store.setLoading(false)
  }
}

export const authService = {
  /**
   * Sign in with email and password.
   */
  async signInWithEmail(email: string, password: string): Promise<void> {
    if (!isSupabaseReady) {
      throw new Error(supabaseConfigError?.message ?? 'Authentication is not configured correctly')
    }

    const normalizedEmail = normalizeEmail(email)
    const store = useAuthStore.getState()
    store.setLoading(true)

    try {
      const { data, error } = await supabase.auth.signInWithPassword({ email: normalizedEmail, password })
      if (error) {
        store.setUser(null)
        store.setProfile(null)
        store.setLoading(false)
        throw new Error(getFriendlyAuthErrorMessage(error))
      }

      await syncAuthStateFromSession(data.session)
    } catch (error) {
      store.setUser(null)
      store.setProfile(null)
      store.setLoading(false)
      throw error
    }
  },

  /**
   * Sign in with Google OAuth.
   * Redirects the user to Google, then back to /dashboard.
   *
   * Uses a relative-safe redirectTo based on window.location.origin so the
   * callback works identically in local dev, GitHub Codespaces, and prod.
   */
  async signInWithGoogle(): Promise<void> {
    if (!isSupabaseReady) {
      throw new Error(supabaseConfigError?.message ?? 'Authentication is not configured correctly')
    }

    let data: { url: string | null }
    let error: { message: string } | null

    try {
      const result = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}${ROUTES.AUTH_CALLBACK}`,
          queryParams: {
            prompt: 'select_account',
            // Request basic profile + email so name/avatar are available.
            access_type: 'offline',
          },
        },
      })
      data = result.data
      error = result.error
    } catch (err) {
      // Network failure or request timeout before Supabase could respond.
      if (err instanceof Error && /timeout|network|fetch/i.test(err.message)) {
        throw new Error('Network error. Please check your connection and try again.')
      }
      console.error('[auth] Google OAuth initiation failed', err)
      throw new Error(getFriendlyAuthErrorMessage(err))
    }

    if (error) {
      const message = error.message.toLowerCase()
      if (message.includes('not enabled') || message.includes('unsupported provider') || message.includes('provider')) {
        console.error('[auth] Google provider not enabled in Supabase', error)
        throw new Error(
          'Google sign-in is currently unavailable. Please try again later or contact the administrator. ' +
            'You can also sign in with email and password.'
        )
      }
      console.error('[auth] Google OAuth initiation failed', error)
      throw new Error(getFriendlyAuthErrorMessage(error))
    }

    if (!data.url) {
      throw new Error('Unable to start Google sign-in. Please try again or use email/password.')
    }

    // Browser may block the navigation (e.g. aggressive popup blockers).
    try {
      window.location.assign(data.url)
    } catch {
      window.open(data.url, '_self')
    }
  },

  /**
   * Sign in with LinkedIn OAuth.
   * Redirects the user to LinkedIn, then back to /dashboard.
   */
  async signInWithLinkedIn(): Promise<void> {
    if (!isSupabaseReady) {
      throw new Error(supabaseConfigError?.message ?? 'Authentication is not configured correctly')
    }

    let data: { url: string | null }
    let error: { message: string } | null

    try {
      const result = await supabase.auth.signInWithOAuth({
        provider: 'linkedin_oidc',
        options: {
          redirectTo: `${window.location.origin}${ROUTES.AUTH_CALLBACK}`,
          queryParams: {
            prompt: 'select_account',
          },
        },
      })
      data = result.data
      error = result.error
    } catch (err) {
      if (err instanceof Error && /timeout|network|fetch/i.test(err.message)) {
        throw new Error('Network error. Please check your connection and try again.')
      }
      console.error('[auth] LinkedIn OAuth initiation failed', err)
      throw new Error(getFriendlyAuthErrorMessage(err))
    }

    if (error) {
      const message = error.message.toLowerCase()
      if (message.includes('not enabled') || message.includes('unsupported provider') || message.includes('provider')) {
        console.error('[auth] LinkedIn provider not enabled in Supabase', error)
        throw new Error(
          'LinkedIn sign-in is currently unavailable. Please try again later or contact the administrator. ' +
            'You can also sign in with email and password.'
        )
      }
      console.error('[auth] LinkedIn OAuth initiation failed', error)
      throw new Error(getFriendlyAuthErrorMessage(error))
    }

    if (!data.url) {
      throw new Error('Unable to start LinkedIn sign-in. Please try again or use email/password.')
    }

    try {
      window.location.assign(data.url)
    } catch {
      window.open(data.url, '_self')
    }
  },

  /**
   * Create a new account with email and password.
   * Supabase sends a verification email automatically.
   *
   * The DB trigger (handle_new_user) normally creates the profile row, but
   * if that trigger fails or is missing we create it explicitly as a fallback
   * so signup never hard-fails on a profile insert race.
   */
  async signUp(email: string, password: string, fullName: string): Promise<void> {
    if (!isSupabaseReady) {
      throw new Error(supabaseConfigError?.message ?? 'Authentication is not configured correctly')
    }

    const normalizedEmail = normalizeEmail(email)
    const trimmedFullName = fullName.trim()
    const store = useAuthStore.getState()
    store.setLoading(true)

    try {
      const { data, error } = await supabase.auth.signUp({
        email: normalizedEmail,
        password,
        options: {
          data: { full_name: trimmedFullName },
          emailRedirectTo: `${window.location.origin}/verify-email`,
        },
      })
      if (error) {
        store.setUser(null)
        store.setProfile(null)
        store.setLoading(false)
        throw new Error(getFriendlyAuthErrorMessage(error))
      }

      // Supabase returns { user: null, error: null } when the email is already
      // registered (email confirmation enabled hides the existence check). Treat
      // a missing user as a duplicate-account failure so the UI can react.
      if (!data.user) {
        store.setUser(null)
        store.setProfile(null)
        store.setLoading(false)
        throw new Error(
          getFriendlyAuthErrorMessage({ message: 'User with this email is already registered' })
        )
      }

      // Best-effort profile creation — ignore failures here; the trigger
      // (or a later refresh) will reconcile. Never blocks signup success.
      const userId = data.user.id
      if (userId) {
        const { error: profileError } = await (supabase.from('profiles') as any).upsert(
          { id: userId, full_name: trimmedFullName },
          { onConflict: 'id' }
        )
        if (profileError) console.warn('[signUp] profile upsert skipped:', profileError.message)
      }
    } finally {
      store.setLoading(false)
    }
  },

  /**
   * Sign out the current user.
   *
   * Uses a global sign-out scope so the session is revoked and cleared across
   * all tabs/devices, not just the current one. As a defense-in-depth measure
   * we also explicitly strip any Supabase auth key from storage so a refreshed
   * page can never restore a stale session even if the network call is
   * interrupted. Local store state is always reset in the finally block so the
   * UI reflects a signed-out state regardless of the network outcome.
   */
  async signOut(): Promise<void> {
    const store = useAuthStore.getState()
    store.setLoading(true)

    try {
      if (isSupabaseReady) {
        const { error } = await supabase.auth.signOut({ scope: 'global' })
        if (error) throw new Error(error.message)
      }
      clearAuthStorage()
    } catch (error) {
      // Even if the network revoke fails, force a local sign-out so the user is
      // never stuck "signed in" against their intent.
      clearAuthStorage()
      throw error
    } finally {
      store.setUser(null)
      store.setProfile(null)
      store.setLoading(false)
    }
  },

  /**
   * Send a password reset email.
   */
  async sendPasswordReset(email: string): Promise<void> {
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`,
    })
    if (error) throw new Error(error.message)
  },

  /**
   * Update the authenticated user's password.
   */
  async updatePassword(newPassword: string): Promise<void> {
    const { error } = await supabase.auth.updateUser({ password: newPassword })
    if (error) throw new Error(error.message)
  },

  /**
   * Verify an email using the token delivered in the confirmation link.
   * Supabase sends `token_hash` + `type=signup` as query params; we exchange
   * them via verifyOtp (PKCE-safe, works without the session hash).
   */
  async verifyEmail(tokenHash: string, type: string): Promise<void> {
    const { error } = await supabase.auth.verifyOtp({
      token_hash: tokenHash,
      type: type as never,
    })
    if (error) throw new Error(error.message)
  },

  /**
   * Get the current authenticated user, or null if not signed in.
   */
  async getCurrentUser(): Promise<AuthUser | null> {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return null

    return {
      id: user.id,
      email: user.email ?? '',
      emailVerified: !!user.email_confirmed_at,
      createdAt: user.created_at,
    }
  },
}
