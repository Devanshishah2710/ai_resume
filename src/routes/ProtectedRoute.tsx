/**
 * ProtectedRoute — wraps routes that require authentication.
 *
 * Redirects to /login if not authenticated, preserving the intended URL
 * so the user is sent back after login.
 */

import { Navigate, useLocation } from 'react-router-dom'
import { useAuthStore } from '@/store/auth.store'
import { ROUTES } from '@/constants'

type ProtectedRouteProps = {
  children: React.ReactNode
}

export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { isAuthenticated, isLoading } = useAuthStore()
  const location = useLocation()

  // Auth state is still loading — AuthProvider handles the loading screen
  if (isLoading) return null

  if (!isAuthenticated) {
    return (
      <Navigate
        to={ROUTES.LOGIN}
        state={{ from: location.pathname }}
        replace
      />
    )
  }

  return <>{children}</>
}
