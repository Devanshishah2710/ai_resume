/**
 * RegisterPage — new account creation with email/password + Google.
 */

import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { Eye, EyeOff, Mail, User } from 'lucide-react'
import { AuthLayout } from '@/layouts/AuthLayout'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { authService } from '@/services/auth.service'
import { ENABLE_GOOGLE_AUTH, ROUTES } from '@/constants'

type RegisterFormValues = {
  fullName: string
  email: string
  password: string
  confirmPassword: string
}

export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [isGoogleLoading, setIsGoogleLoading] = useState(false)
  const [registered, setRegistered] = useState(false)
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
    setError,
  } = useForm<RegisterFormValues>()

  const password = watch('password')

  const onSubmit = async (values: RegisterFormValues) => {
    try {
      await authService.signUp(values.email, values.password, values.fullName)
      setRegistered(true)
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Registration failed'
      setError('root', { message })
      if (message.toLowerCase().includes('already exists')) {
        toast.error(message, {
          action: {
            label: 'Sign in',
            onClick: () => navigate(ROUTES.LOGIN),
          },
        })
      } else {
        toast.error(message)
      }
    }
  }

  const handleGoogleSignIn = async () => {
    setIsGoogleLoading(true)
    try {
      await authService.signInWithGoogle()
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Google sign-in failed'
      toast.error(message)
      setIsGoogleLoading(false)
    }
  }

  if (registered) {
    return (
      <AuthLayout title="Check your email" subtitle="We sent you a verification link">
        <div className="text-center space-y-4">
          <div className="mx-auto h-16 w-16 rounded-full bg-[var(--color-success-subtle)] flex items-center justify-center">
            <Mail className="h-8 w-8 text-[var(--color-success)]" />
          </div>
          <p className="text-sm text-[var(--color-text-secondary)]">
            Click the link in your email to verify your account and get started.
          </p>
          <Button variant="secondary" fullWidth onClick={() => navigate(ROUTES.LOGIN)}>
            Back to sign in
          </Button>
        </div>
      </AuthLayout>
    )
  }

  return (
    <AuthLayout
      title="Create your account"
      subtitle="Start building resumes that get interviews — free forever"
    >
      <div className="space-y-4">
        {ENABLE_GOOGLE_AUTH ? (
          <Button
            variant="secondary"
            fullWidth
            isLoading={isGoogleLoading}
            onClick={handleGoogleSignIn}
            leftIcon={
              <svg className="h-4 w-4" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
              </svg>
            }
          >
            Continue with Google
          </Button>
        ) : (
          <div className="rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-bg-secondary)] p-4 text-sm text-[var(--color-text-secondary)]">
            Google sign-up is not enabled for this project. Use email and password to register.
          </div>
        )}

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-[var(--color-border)]" />
          </div>
          <div className="relative flex justify-center">
            <span className="bg-[var(--color-bg-primary)] px-3 text-xs text-[var(--color-text-tertiary)]">
              or register with email
            </span>
          </div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-3">
          <Input
            label="Full name"
            type="text"
            autoComplete="name"
            placeholder="Jane Smith"
            leftIcon={<User className="h-4 w-4" />}
            error={errors.fullName?.message}
            {...register('fullName', {
              required: 'Full name is required',
              minLength: { value: 2, message: 'Name must be at least 2 characters' },
              maxLength: { value: 80, message: 'Name is too long' },
            })}
          />

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
            autoComplete="new-password"
            placeholder="At least 8 characters"
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
              minLength: { value: 8, message: 'Password must be at least 8 characters' },
              pattern: {
                value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
                message: 'Must include uppercase, lowercase, and a number',
              },
            })}
          />

          <Input
            label="Confirm password"
            type={showPassword ? 'text' : 'password'}
            autoComplete="new-password"
            placeholder="Repeat your password"
            error={errors.confirmPassword?.message}
            {...register('confirmPassword', {
              required: 'Please confirm your password',
              validate: (val) => val === password || 'Passwords do not match',
            })}
          />

          {errors.root && (
            <div role="alert" className="rounded-[var(--radius-sm)] bg-[var(--color-error-subtle)] border border-[var(--color-error)]/20 px-3 py-2 text-sm text-[var(--color-error)]">
              {errors.root.message}
            </div>
          )}

          <Button type="submit" fullWidth isLoading={isSubmitting}>
            Create account
          </Button>

          <p className="text-xs text-center text-[var(--color-text-tertiary)]">
            By creating an account you agree to our{' '}
            <a href="#" className="underline hover:text-[var(--color-text-secondary)]">Terms</a>
            {' '}and{' '}
            <a href="#" className="underline hover:text-[var(--color-text-secondary)]">Privacy Policy</a>
          </p>
        </form>

        <p className="text-center text-sm text-[var(--color-text-secondary)]">
          Already have an account?{' '}
          <Link to={ROUTES.LOGIN} className="text-[var(--color-accent)] font-medium hover:underline">
            Sign in
          </Link>
        </p>
      </div>
    </AuthLayout>
  )
}
