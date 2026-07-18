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

async function syncAuthStateFromSession(session: Awaited<ReturnType<typeof supabase.auth.getSession>>['data']['session']) {
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
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (_event, session) => {
      if (session?.user) {
        const authUser: AuthUser = {
          id: session.user.id,
          email: session.user.email ?? '',
          emailVerified: !!session.user.email_confirmed_at,
          createdAt: session.user.created_at,
        }
        set({ user: authUser, isAuthenticated: true })

        const profile = await profileService.getProfile(session.user.id)
        set({ profile, isLoading: false })
      } else {
        set({ user: null, profile: null, isAuthenticated: false, isLoading: false })
      }
    })

    void supabase.auth.getSession().then(({ data: { session } }) => {
      void syncAuthStateFromSession(session)
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
