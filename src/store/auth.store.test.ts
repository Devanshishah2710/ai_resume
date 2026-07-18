import { describe, it, expect, beforeEach, vi } from 'vitest'
import { useAuthStore } from './auth.store'

vi.mock('@/lib/supabase', () => ({
  supabase: {
    auth: {
      onAuthStateChange: vi.fn(() => ({ data: { subscription: { unsubscribe: vi.fn() } } })),
      getSession: vi.fn(() => Promise.resolve({ data: { session: null } })),
      signOut: vi.fn(() => Promise.resolve({ error: null })),
      signInWithPassword: vi.fn(() => Promise.resolve({ data: { session: null }, error: null })),
      signUp: vi.fn(() => Promise.resolve({ data: { user: null }, error: null })),
      resetPasswordForEmail: vi.fn(() => Promise.resolve({ error: null })),
      updateUser: vi.fn(() => Promise.resolve({ error: null })),
      verifyOtp: vi.fn(() => Promise.resolve({ error: null })),
      getUser: vi.fn(() => Promise.resolve({ data: { user: null } })),
    },
    from: vi.fn(() => ({
      upsert: vi.fn(() => Promise.resolve({ error: null })),
      select: vi.fn(() => ({
        eq: vi.fn(() => ({
          single: vi.fn(() => Promise.resolve({ data: null, error: null })),
        })),
      })),
      update: vi.fn(() => ({
        eq: vi.fn(() => ({
          select: vi.fn(() => ({
            single: vi.fn(() => Promise.resolve({ data: null, error: null })),
          })),
        })),
      })),
    })),
  },
  isSupabaseReady: true,
  supabaseConfigError: null,
}))

describe('auth store', () => {
  beforeEach(() => {
    useAuthStore.setState({
      user: null,
      profile: null,
      isLoading: true,
      isAuthenticated: false,
    })
    vi.clearAllMocks()
  })

  it('resets auth state after sign-out', async () => {
    useAuthStore.setState({
      user: { id: 'user-1', email: 'demo@example.com', emailVerified: true, createdAt: '2024-01-01' },
      profile: { id: 'user-1', fullName: 'Demo User', avatarUrl: null, headline: '', website: '', location: '', plan: 'free', resumeCount: 0, createdAt: '2024-01-01', updatedAt: '2024-01-01' },
      isAuthenticated: true,
      isLoading: false,
    })

    const { authService } = await import('@/services/auth.service')
    await authService.signOut()

    expect(useAuthStore.getState().user).toBeNull()
    expect(useAuthStore.getState().profile).toBeNull()
    expect(useAuthStore.getState().isAuthenticated).toBe(false)
    expect(useAuthStore.getState().isLoading).toBe(false)
  })
})
