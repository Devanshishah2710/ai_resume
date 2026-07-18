/**
 * Auth Service — thin wrapper around Supabase Auth.
 *
 * Keeps all auth logic in one place. Components never call
 * supabase.auth directly — this service is the single source of truth.
 */

import { supabase } from '@/lib/supabase'
import { useAuthStore } from '@/store/auth.store'
import { profileService } from '@/services/profile.service'
import type { AuthUser } from '@/types/auth'

function normalizeEmail(email: string): string {
  return email.trim().toLowerCase()
}

function getFriendlyAuthErrorMessage(error: unknown): string {
  const rawMessage = error instanceof Error ? error.message : 'Authentication failed'
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
  store.setLoading(false)

  const profile = await profileService.getProfile(session.user.id)
  store.setProfile(profile)
}

export const authService = {
  /**
   * Sign in with email and password.
   */
  async signInWithEmail(email: string, password: string): Promise<void> {
    const normalizedEmail = normalizeEmail(email)
    const { data, error } = await supabase.auth.signInWithPassword({ email: normalizedEmail, password })
    if (error) throw new Error(getFriendlyAuthErrorMessage(error))
    await syncAuthStateFromSession(data.session)
  },

  /**
   * Sign in with Google OAuth.
   * Redirects the user to Google, then back to /dashboard.
   */
  async signInWithGoogle(): Promise<void> {
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
    const normalizedEmail = normalizeEmail(email)
    const trimmedFullName = fullName.trim()
    const { data, error } = await supabase.auth.signUp({
      email: normalizedEmail,
      password,
      options: {
        data: { full_name: trimmedFullName },
        emailRedirectTo: `${window.location.origin}/verify-email`,
      },
    })
    if (error) throw new Error(getFriendlyAuthErrorMessage(error))

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
  },

  /**
   * Sign out the current user.
   */
  async signOut(): Promise<void> {
    const { error } = await supabase.auth.signOut()
    if (error) throw new Error(error.message)
    const store = useAuthStore.getState()
    store.setUser(null)
    store.setProfile(null)
    store.setLoading(false)
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
