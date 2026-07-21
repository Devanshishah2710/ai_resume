/**
 * Auth Store — single source of truth for authentication state.
 *
 * Listens to Supabase auth state changes and syncs the store.
 * Components subscribe to this store instead of calling supabase.auth directly.
 */

import { create } from 'zustand'
import { supabase } from '@/lib/supabase'
import { profileService } from '@/services/profile.service'
import type { AuthState, AuthUser, UserProfile } from '@/types/auth'

type AuthActions = {
  initialize: () => () => void
  setUser: (user: AuthUser | null) => void
  setProfile: (profile: UserProfile | null) => void
  setLoading: (loading: boolean) => void
  refreshProfile: () => Promise<void>
}

export const useAuthStore = create<AuthState & AuthActions>((set, get) => ({
  user: null,
  profile: null,
  isLoading: true,
  isAuthenticated: false,

  setUser: (user) => set({ user, isAuthenticated: !!user }),
  setProfile: (profile) => set({ profile }),
  setLoading: (isLoading) => set({ isLoading }),

  /**
   * Initialize auth listener. Call once at app startup.
   * The onAuthStateChange callback fires immediately on subscribe with the
   * current session (INITIAL_SESSION), then on every auth change. This is the
   * SINGLE source of truth — no redundant getSession() calls or duplicate
   * sync functions.
   */
  initialize: () => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      // IMPORTANT: never call supabase (e.g. profileService) directly inside
      // this callback — it runs inside Supabase's internal auth lock and a
      // nested network request deadlocks the auth client (sign-in/out hang).
      // Defer the (async) profile fetch out of the callback via a microtask.
      set({
        user: session?.user
          ? {
              id: session.user.id,
              email: session.user.email ?? '',
              emailVerified: !!session.user.email_confirmed_at,
              createdAt: session.user.created_at,
            }
          : null,
        isAuthenticated: !!session?.user,
        isLoading: !!session?.user,
      })

      if (session?.user) {
        queueMicrotask(() => {
          void profileService
            .getProfile(session.user.id)
            .then((profile) => set({ profile }))
            .catch((error) => console.warn('[auth] failed to load profile', error))
            .finally(() => set({ isLoading: false }))
        })
      } else {
        set({ profile: null, isLoading: false })
      }
    })

    return () => subscription.unsubscribe()
  },

  refreshProfile: async () => {
    const { user } = get()
    if (!user) return
    const profile = await profileService.getProfile(user.id)
    set({ profile })
  },
}))
