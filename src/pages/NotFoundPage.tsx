import { Link } from 'react-router-dom'
import { FileQuestion } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { ROUTES } from '@/constants'

export default function NotFoundPage() {
  return (
    <div className="min-h-dvh flex flex-col items-center justify-center bg-[var(--color-bg-primary)] px-6 text-center">
      <div className="h-20 w-20 rounded-[var(--radius-xl)] bg-[var(--color-bg-tertiary)] flex items-center justify-center mb-6">
        <FileQuestion className="h-10 w-10 text-[var(--color-text-tertiary)]" />
      </div>
      <h1 className="text-4xl font-bold text-[var(--color-text-primary)] mb-3">404</h1>
      <p className="text-[var(--color-text-secondary)] mb-8 max-w-sm">
        This page doesn't exist or has been moved. Let's get you back on track.
      </p>
      <div className="flex gap-3">
        <Link to={ROUTES.DASHBOARD}>
          <Button>Go to dashboard</Button>
        </Link>
        <Link to={ROUTES.HOME}>
          <Button variant="secondary">Home</Button>
        </Link>
      </div>
    </div>
  )
}
