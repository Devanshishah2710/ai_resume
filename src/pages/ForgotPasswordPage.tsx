import { Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { useState } from 'react'
import { Mail, CheckCircle } from 'lucide-react'
import { AuthLayout } from '@/layouts/AuthLayout'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { authService } from '@/services/auth.service'
import { ROUTES } from '@/constants'

type ForgotFormValues = { email: string }

export default function ForgotPasswordPage() {
  const [sent, setSent] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
  } = useForm<ForgotFormValues>()

  const onSubmit = async (values: ForgotFormValues) => {
    try {
      await authService.sendPasswordReset(values.email)
      setSent(true)
    } catch (err) {
      setError('root', { message: err instanceof Error ? err.message : 'Failed to send reset email' })
    }
  }

  if (sent) {
    return (
      <AuthLayout title="Email sent" subtitle="Check your inbox for the reset link">
        <div className="text-center space-y-5">
          <div className="mx-auto h-16 w-16 rounded-full bg-[var(--color-success-subtle)] flex items-center justify-center">
            <CheckCircle className="h-8 w-8 text-[var(--color-success)]" />
          </div>
          <p className="text-sm text-[var(--color-text-secondary)]">
            If an account exists for that email, you'll receive a password reset link shortly.
          </p>
          <Link to={ROUTES.LOGIN}>
            <Button variant="secondary" fullWidth>Back to sign in</Button>
          </Link>
        </div>
      </AuthLayout>
    )
  }

  return (
    <AuthLayout
      title="Reset your password"
      subtitle="Enter your email and we'll send you a reset link"
    >
      <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-4">
        <Input
          label="Email address"
          type="email"
          autoComplete="email"
          placeholder="you@example.com"
          leftIcon={<Mail className="h-4 w-4" />}
          error={errors.email?.message}
          {...register('email', {
            required: 'Email is required',
            pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: 'Enter a valid email' },
          })}
        />

        {errors.root && (
          <div role="alert" className="rounded-[var(--radius-sm)] bg-[var(--color-error-subtle)] px-3 py-2 text-sm text-[var(--color-error)]">
            {errors.root.message}
          </div>
        )}

        <Button type="submit" fullWidth isLoading={isSubmitting}>
          Send reset link
        </Button>

        <p className="text-center text-sm text-[var(--color-text-secondary)]">
          Remember your password?{' '}
          <Link to={ROUTES.LOGIN} className="text-[var(--color-primary)] font-medium hover:underline">
            Sign in
          </Link>
        </p>
      </form>
    </AuthLayout>
  )
}
