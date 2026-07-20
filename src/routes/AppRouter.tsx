/**
 * AppRouter — the single route configuration for the entire app.
 *
 * Uses lazy loading for all page-level components so only the current
 * route's code is downloaded. Suspense boundaries provide loading fallbacks.
 *
 * Route structure:
 *   / (public)    — Landing page
 *   /login        — Sign in
 *   /register     — Sign up
 *   /dashboard    — Resume list (protected)
 *   /resume/:id/edit     — Builder (protected)
 *   /resume/:id/preview  — Full preview (protected)
 *   /templates    — Template browser (protected)
 *   /settings/*   — Account settings (protected)
 */

import { lazy, Suspense } from 'react'
import { Routes, Route } from 'react-router-dom'
import { ProtectedRoute } from './ProtectedRoute'
import { PublicRoute } from './PublicRoute'
import { ROUTES } from '@/constants'
import { Spinner } from '@/components/ui/Spinner'

// ── Lazy-loaded pages ─────────────────────────────────────────────────────────

const LandingPage = lazy(() => import('@/pages/LandingPage'))
const LoginPage = lazy(() => import('@/pages/LoginPage'))
const RegisterPage = lazy(() => import('@/pages/RegisterPage'))
const ForgotPasswordPage = lazy(() => import('@/pages/ForgotPasswordPage'))
const ResetPasswordPage = lazy(() => import('@/pages/ResetPasswordPage'))
const VerifyEmailPage = lazy(() => import('@/pages/VerifyEmailPage'))
const AuthCallbackPage = lazy(() => import('@/pages/AuthCallbackPage'))
const DashboardPage = lazy(() => import('@/pages/DashboardPage'))
const ResumeBuilderPage = lazy(() => import('@/pages/ResumeBuilderPage'))
const ResumePreviewPage = lazy(() => import('@/pages/ResumePreviewPage'))
const TemplatesPage = lazy(() => import('@/pages/TemplatesPage'))
const SettingsPage = lazy(() => import('@/pages/SettingsPage'))
const NotFoundPage = lazy(() => import('@/pages/NotFoundPage'))

// ── Page-level suspense fallback ──────────────────────────────────────────────

function PageLoader() {
  return (
    <div className="min-h-dvh flex items-center justify-center bg-[var(--color-bg-primary)]">
      <Spinner size="lg" />
    </div>
  )
}

// ── Router ────────────────────────────────────────────────────────────────────

export function AppRouter() {
  return (
    <Suspense fallback={<PageLoader />}>
      <Routes>
        {/* Public */}
        <Route path={ROUTES.HOME} element={<LandingPage />} />
        <Route path={ROUTES.VERIFY_EMAIL} element={<VerifyEmailPage />} />
        <Route path={ROUTES.AUTH_CALLBACK} element={<AuthCallbackPage />} />
        <Route path={ROUTES.RESET_PASSWORD} element={<ResetPasswordPage />} />

        {/* Auth pages — redirect authenticated users away */}
        <Route
          path={ROUTES.LOGIN}
          element={<PublicRoute><LoginPage /></PublicRoute>}
        />
        <Route
          path={ROUTES.REGISTER}
          element={<PublicRoute><RegisterPage /></PublicRoute>}
        />
        <Route
          path={ROUTES.FORGOT_PASSWORD}
          element={<PublicRoute><ForgotPasswordPage /></PublicRoute>}
        />

        {/* Protected — dashboard */}
        <Route
          path={ROUTES.DASHBOARD}
          element={<ProtectedRoute><DashboardPage /></ProtectedRoute>}
        />

        {/* Protected — resume builder */}
        <Route
          path={ROUTES.RESUME_EDIT}
          element={<ProtectedRoute><ResumeBuilderPage /></ProtectedRoute>}
        />

        {/* Protected — resume preview */}
        <Route
          path={ROUTES.RESUME_PREVIEW}
          element={<ProtectedRoute><ResumePreviewPage /></ProtectedRoute>}
        />

        {/* Protected — templates */}
        <Route
          path={ROUTES.TEMPLATES}
          element={<ProtectedRoute><TemplatesPage /></ProtectedRoute>}
        />

        {/* Protected — settings */}
        <Route
          path={`${ROUTES.SETTINGS}/*`}
          element={<ProtectedRoute><SettingsPage /></ProtectedRoute>}
        />

        {/* Redirects */}
        <Route path="/resume/new" element={<ProtectedRoute><ResumeBuilderPage /></ProtectedRoute>} />

        {/* 404 */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Suspense>
  )
}
