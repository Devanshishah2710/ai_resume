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

async function syncAuthStateFromSession(
  session: Awaited<ReturnType<typeof supabase.auth.getSession>>['data']['session'],
  set: (next: Partial<AuthState>) => void
) {
  if (!session?.user) {
    set({ user: null, profile: null, isAuthenticated: false, isLoading: false })
    return
  }

  const authUser: AuthUser = {
    id: session.user.id,
    email: session.user.email ?? '',
    emailVerified: !!session.user.email_confirmed_at,
    createdAt: session.user.created_at,
  }

  set({ user: authUser, isAuthenticated: true, isLoading: true })

  try {
    const profile = await profileService.getProfile(session.user.id)
    set({ profile, isLoading: false })
  } catch (error) {
    console.warn('[auth] failed to load profile', error)
    set({ profile: null, isLoading: false })
  }
}

type AuthActions = {
  initialize: () => () => void // Returns unsubscribe function
  setUser: (user: AuthUser | null) => void
  setProfile: (profile: UserProfile | null) => void
  setLoading: (loading: boolean) => void
  refreshProfile: () => Promise<void>
}

export const useAuthStore = create<AuthState & AuthActions>((set, get) => ({
  // ── State ──
  user: null,
  profile: null,
  isLoading: true,
  isAuthenticated: false,

  // ── Actions ──
  setUser: (user) => set({ user, isAuthenticated: !!user }),
  setProfile: (profile) => set({ profile }),
  setLoading: (isLoading) => set({ isLoading }),

  /**
   * Initialize auth listener. Call once at app startup.
   * Returns an unsubscribe function for cleanup.
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

    void supabase.auth.getSession()
      .then(({ data: { session } }) => {
        void syncAuthStateFromSession(session, set)
      })
      .catch((error) => {
        console.warn('[auth] failed to read initial session', error)
        set({ user: null, profile: null, isAuthenticated: false, isLoading: false })
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
