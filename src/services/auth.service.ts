/**
 * Auth Service — thin wrapper around Supabase Auth.
 *
 * Keeps all auth logic in one place. Components never call
 * supabase.auth directly — this service is the single source of truth.
 */

import { supabase, isSupabaseReady, supabaseConfigError } from '@/lib/supabase'
import { ENABLE_GOOGLE_AUTH } from '@/constants'
import { useAuthStore } from '@/store/auth.store'
import { profileService } from '@/services/profile.service'
import type { AuthUser } from '@/types/auth'

function normalizeEmail(email: string): string {
  return email.trim().toLowerCase()
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
    return 'Google sign-in is not enabled for this project. Please enable Google in Supabase Auth providers or use email/password instead.'
  }

  if (message.includes('not configured') || message.includes('missing') || message.includes('disabled')) {
    return 'Authentication is not configured correctly. Please contact support'
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
   */
  async signInWithGoogle(): Promise<void> {
    if (!ENABLE_GOOGLE_AUTH) {
      throw new Error('Google sign-in is not enabled for this project. Use email/password instead.')
    }

    if (!isSupabaseReady) {
      throw new Error(supabaseConfigError?.message ?? 'Authentication is not configured correctly')
    }

    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/dashboard`,
        queryParams: {
          prompt: 'select_account',
        },
      },
    })

    if (error) throw new Error(error.message)

    if (data.url) {
      window.location.assign(data.url)
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

      // Best-effort profile creation — ignore failures here; the trigger
      // (or a later refresh) will reconcile. Never blocks signup success.
      const userId = data.user?.id
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
   */
  async signOut(): Promise<void> {
    if (!isSupabaseReady) {
      const store = useAuthStore.getState()
      store.setUser(null)
      store.setProfile(null)
      store.setLoading(false)
      return
    }

    const store = useAuthStore.getState()
    store.setLoading(true)

    try {
      const { error } = await supabase.auth.signOut()
      if (error) throw new Error(error.message)
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
