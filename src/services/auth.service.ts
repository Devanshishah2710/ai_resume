/**
 * Auth Service — thin wrapper around Supabase Auth.
 *
 * Keeps all auth logic in one place. Components never call
 * supabase.auth directly — this service is the single source of truth.
 */

import { supabase } from '@/lib/supabase'
import type { AuthUser } from '@/types/auth'

export const authService = {
  /**
   * Sign in with email and password.
   */
  async signInWithEmail(email: string, password: string): Promise<void> {
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) throw new Error(error.message)
  },

  /**
   * Sign in with Google OAuth.
   * Redirects the user to Google, then back to /dashboard.
   */
  async signInWithGoogle(): Promise<void> {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/dashboard`,
      },
    })
    if (error) throw new Error(error.message)
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
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { full_name: fullName },
        emailRedirectTo: `${window.location.origin}/verify-email`,
      },
    })
    if (error) throw new Error(error.message)

    // Best-effort profile creation — ignore failures here; the trigger
    // (or a later refresh) will reconcile. Never blocks signup success.
    const userId = data.user?.id
    if (userId) {
      const { error: profileError } = await (supabase.from('profiles') as any).upsert(
        { id: userId, full_name: fullName },
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
