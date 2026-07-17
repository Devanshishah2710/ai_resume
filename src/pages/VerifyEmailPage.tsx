import { Link } from 'react-router-dom'
import { CheckCircle } from 'lucide-react'
import { AuthLayout } from '@/layouts/AuthLayout'
import { Button } from '@/components/ui/Button'
import { ROUTES } from '@/constants'

export default function VerifyEmailPage() {
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
