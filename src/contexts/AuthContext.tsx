/**
 * AuthProvider — initializes the auth listener on mount.
 *
 * Sits at the app root. Children can use useAuthStore() to access auth state.
 * Renders a full-screen loader while the initial session check is in progress
 * to prevent flash of unauthenticated content.
 */

import { useEffect } from 'react'
import { useAuthStore } from '@/store/auth.store'
import { Spinner } from '@/components/ui/Spinner'

type AuthProviderProps = {
  children: React.ReactNode
}

export function AuthProvider({ children }: AuthProviderProps) {
  const { initialize, isLoading } = useAuthStore()

  useEffect(() => {
    const unsubscribe = initialize()
    return unsubscribe
  }, [initialize])

  if (isLoading) {
    return (
      <div className="min-h-dvh flex items-center justify-center bg-[var(--color-bg-primary)]">
        <Spinner size="lg" />
      </div>
    )
  }

  return <>{children}</>
}
