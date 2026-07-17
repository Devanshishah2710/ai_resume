import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { Eye, EyeOff } from 'lucide-react'
import { AuthLayout } from '@/layouts/AuthLayout'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { authService } from '@/services/auth.service'
import { ROUTES } from '@/constants'

type ResetFormValues = { password: string; confirmPassword: string }

export default function ResetPasswordPage() {
  const [showPassword, setShowPassword] = useState(false)
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
    setError,
  } = useForm<ResetFormValues>()

  const password = watch('password')

  const onSubmit = async (values: ResetFormValues) => {
    try {
      await authService.updatePassword(values.password)
      navigate(ROUTES.DASHBOARD, { replace: true })
    } catch (err) {
      setError('root', { message: err instanceof Error ? err.message : 'Failed to update password' })
    }
  }

  return (
    <AuthLayout title="Set new password" subtitle="Choose a strong password for your account">
      <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-4">
        <Input
          label="New password"
          type={showPassword ? 'text' : 'password'}
          autoComplete="new-password"
          placeholder="At least 8 characters"
          error={errors.password?.message}
          rightIcon={
            <button type="button" onClick={() => setShowPassword(v => !v)} aria-label="Toggle password">
              {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          }
          {...register('password', {
            required: 'Password is required',
            minLength: { value: 8, message: 'At least 8 characters' },
            pattern: { value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, message: 'Must include uppercase, lowercase, and a number' },
          })}
        />

        <Input
          label="Confirm new password"
          type={showPassword ? 'text' : 'password'}
          autoComplete="new-password"
          placeholder="Repeat your password"
          error={errors.confirmPassword?.message}
          {...register('confirmPassword', {
            required: 'Please confirm your password',
            validate: val => val === password || 'Passwords do not match',
          })}
        />

        {errors.root && (
          <div role="alert" className="rounded-[var(--radius-sm)] bg-[var(--color-error-subtle)] px-3 py-2 text-sm text-[var(--color-error)]">
            {errors.root.message}
          </div>
        )}

        <Button type="submit" fullWidth isLoading={isSubmitting}>
          Update password
        </Button>
      </form>
    </AuthLayout>
  )
}
