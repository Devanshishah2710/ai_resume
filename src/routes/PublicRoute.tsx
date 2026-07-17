/**
 * PublicRoute — wraps auth pages (login, register).
 * Redirects already-authenticated users to the dashboard.
 */

import { Navigate } from 'react-router-dom'
import { useAuthStore } from '@/store/auth.store'
import { ROUTES } from '@/constants'

type PublicRouteProps = {
  children: React.ReactNode
}

export function PublicRoute({ children }: PublicRouteProps) {
  const { isAuthenticated, isLoading } = useAuthStore()

  if (isLoading) return null

  if (isAuthenticated) {
    return <Navigate to={ROUTES.DASHBOARD} replace />
  }

  return <>{children}</>
}
