/**
 * Authentication and user profile types.
 * Mirrors the Supabase auth.users + public.profiles schema.
 */

export type AuthUser = {
  id: string
  email: string
  emailVerified: boolean
  createdAt: string
}

export type UserProfile = {
  id: string // FK → auth.users.id
  fullName: string
  avatarUrl: string | null
  headline: string
  website: string
  location: string
  plan: 'free' | 'pro' | 'enterprise'
  resumeCount: number
  createdAt: string
  updatedAt: string
}

export type AuthState = {
  user: AuthUser | null
  profile: UserProfile | null
  isLoading: boolean
  isAuthenticated: boolean
}
