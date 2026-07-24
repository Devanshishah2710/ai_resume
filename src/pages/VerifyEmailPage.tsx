import { useEffect, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { CheckCircle, AlertTriangle } from 'lucide-react'
import { AuthLayout } from '@/layouts/AuthLayout'
import { Button } from '@/components/ui/Button'
import { authService } from '@/services/auth.service'
import { ROUTES } from '@/constants'

type Status = 'verifying' | 'success' | 'error'

export default function VerifyEmailPage() {
  const [searchParams] = useSearchParams()
  const [status, setStatus] = useState<Status>('verifying')
  const [message, setMessage] = useState('')

  useEffect(() => {
    const tokenHash = searchParams.get('token_hash')
    const type = searchParams.get('type')

    if (!tokenHash || !type) {
      setStatus('error')
      setMessage('This verification link is missing its token. Please request a new one.')
      return
    }

    authService
      .verifyEmail(tokenHash, type)
      .then(() => {
        setStatus('success')
      })
      .catch((err) => {
        setStatus('error')
        setMessage(err instanceof Error ? err.message : 'Email verification failed')
      })
  }, [searchParams])

  if (status === 'verifying') {
    return (
      <AuthLayout title="Verifying your email…" subtitle="Please wait a moment">
        <div className="text-center">
          <span className="mx-auto block h-8 w-8 rounded-full border-2 border-[var(--color-primary)] border-t-transparent animate-spin" />
        </div>
      </AuthLayout>
    )
  }

  if (status === 'error') {
    return (
      <AuthLayout title="Verification failed" subtitle="We couldn't verify your email">
        <div className="text-center space-y-5">
          <div className="mx-auto h-16 w-16 rounded-full bg-[var(--color-error-subtle)] flex items-center justify-center">
            <AlertTriangle className="h-8 w-8 text-[var(--color-error)]" />
          </div>
          <p className="text-sm text-[var(--color-text-secondary)]">{message}</p>
          <Link to={ROUTES.LOGIN}>
            <Button fullWidth>Back to sign in</Button>
          </Link>
        </div>
      </AuthLayout>
    )
  }

  return (
    <AuthLayout title="Email verified!" subtitle="Your account is ready to use">
      <div className="text-center space-y-5">
        <div className="mx-auto h-16 w-16 rounded-full bg-[var(--color-success-subtle)] flex items-center justify-center">
          <CheckCircle className="h-8 w-8 text-[var(--color-success)]" />
        </div>
        <p className="text-sm text-[var(--color-text-secondary)]">
          Your email has been verified. You can now sign in and start building your resume.
        </p>
        <Link to={ROUTES.LOGIN}>
          <Button fullWidth>Go to sign in</Button>
        </Link>
      </div>
    </AuthLayout>
  )
}
