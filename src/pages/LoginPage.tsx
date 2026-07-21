/**
 * LoginPage — email/password + Google OAuth sign-in.
 *
 * Uses React Hook Form for validation. Errors displayed inline.
 * After login, redirects to the originally requested URL (from ProtectedRoute).
 */

import { useState } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { Eye, EyeOff, Mail } from 'lucide-react'
import { AuthLayout } from '@/layouts/AuthLayout'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { authService } from '@/services/auth.service'
import { ENABLE_GOOGLE_AUTH, ENABLE_LINKEDIN_AUTH, ROUTES } from '@/constants'

type LoginFormValues = {
  email: string
  password: string
}

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [isGoogleLoading, setIsGoogleLoading] = useState(false)
  const [isLinkedInLoading, setIsLinkedInLoading] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()

  const from = (location.state as { from?: string } | null)?.from ?? ROUTES.DASHBOARD

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
  } = useForm<LoginFormValues>()

  const onSubmit = async (values: LoginFormValues) => {
    try {
      await authService.signInWithEmail(values.email, values.password)
      navigate(from, { replace: true })
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Sign in failed'
      setError('root', { message })
      toast.error(message)
    }
  }

  const handleGoogleSignIn = async () => {
    setIsGoogleLoading(true)
    try {
      await authService.signInWithGoogle()
      // Redirect handled by Supabase OAuth callback
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Google sign-in failed'
      toast.error(message)
      setIsGoogleLoading(false)
    }
  }

  const handleLinkedInSignIn = async () => {
    setIsLinkedInLoading(true)
    try {
      await authService.signInWithLinkedIn()
      // Redirect handled by Supabase OAuth callback
    } catch (err) {
      const message = err instanceof Error ? err.message : 'LinkedIn sign-in failed'
      toast.error(message)
      setIsLinkedInLoading(false)
    }
  }

  return (
    <AuthLayout title="Welcome back" subtitle="Sign in to your account to continue">
      <div className="space-y-4">
        {ENABLE_GOOGLE_AUTH ? (
          <Button
            variant="secondary"
            fullWidth
            isLoading={isGoogleLoading}
            onClick={handleGoogleSignIn}
            leftIcon={
              <svg className="h-4 w-4" viewBox="0 0 24 24" aria-hidden="true">
                <path
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  fill="#4285F4"
                />
                <path
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  fill="#34A853"
                />
                <path
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  fill="#FBBC05"
                />
                <path
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  fill="#EA4335"
                />
              </svg>
            }
          >
            Continue with Google
          </Button>
        ) : (
          <div className="rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-bg-secondary)] p-4 text-sm text-[var(--color-text-secondary)]">
            Google sign-in is not enabled for this project. Use email and password to continue.
          </div>
        )}

        {ENABLE_LINKEDIN_AUTH ? (
          <Button
            variant="secondary"
            fullWidth
            isLoading={isLinkedInLoading}
            onClick={handleLinkedInSignIn}
            leftIcon={
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
            }
          >
            Continue with LinkedIn
          </Button>
        ) : (
          <div className="rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-bg-secondary)] p-4 text-sm text-[var(--color-text-secondary)]">
            LinkedIn sign-in is not enabled for this project. Use email and password to continue.
          </div>
        )}

        {/* Divider */}
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-[var(--color-border)]" />
          </div>
          <div className="relative flex justify-center">
            <span className="bg-[var(--color-bg-primary)] px-3 text-xs text-[var(--color-text-tertiary)]">
              or continue with email
            </span>
          </div>
        </div>

        {/* Email/Password form */}
        <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-3">
          <Input
            label="Email address"
            type="email"
            autoComplete="email"
            placeholder="you@example.com"
            leftIcon={<Mail className="h-4 w-4" />}
            error={errors.email?.message}
            {...register('email', {
              required: 'Email is required',
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: 'Enter a valid email address',
              },
            })}
          />

          <Input
            label="Password"
            type={showPassword ? 'text' : 'password'}
            autoComplete="current-password"
            placeholder="••••••••"
            error={errors.password?.message}
            rightIcon={
              <button
                type="button"
                onClick={() => setShowPassword((v) => !v)}
                className="text-[var(--color-text-tertiary)] hover:text-[var(--color-text-secondary)] transition-colors"
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            }
            {...register('password', {
              required: 'Password is required',
              minLength: { value: 6, message: 'Password must be at least 6 characters' },
            })}
          />

          {/* Forgot password link */}
          <div className="flex justify-end">
            <Link
              to={ROUTES.FORGOT_PASSWORD}
              className="text-xs text-[var(--color-accent)] hover:underline"
            >
              Forgot your password?
            </Link>
          </div>

          {/* Root error */}
          {errors.root && (
            <div
              role="alert"
              className="rounded-[var(--radius-sm)] bg-[var(--color-error-subtle)] border border-[var(--color-error)]/20 px-3 py-2 text-sm text-[var(--color-error)]"
            >
              {errors.root.message}
            </div>
          )}

          <Button type="submit" fullWidth isLoading={isSubmitting}>
            Sign in
          </Button>
        </form>

        {/* Register link */}
        <p className="text-center text-sm text-[var(--color-text-secondary)]">
          Don&apos;t have an account?{' '}
          <Link to={ROUTES.REGISTER} className="text-[var(--color-accent)] font-medium hover:underline">
            Create one free
          </Link>
        </p>
      </div>
    </AuthLayout>
  )
}
