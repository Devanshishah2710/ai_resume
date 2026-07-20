import { LogOut } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { authService } from '@/services/auth.service'
import { Button } from '@/components/ui/Button'
import { ROUTES } from '@/constants'
import { toast } from 'sonner'

type SignOutButtonProps = {
  className?: string
  label?: string
  iconOnly?: boolean
}

export function SignOutButton({ className = '', label = 'Sign out', iconOnly = false }: SignOutButtonProps) {
  const navigate = useNavigate()

  const handleSignOut = async () => {
    try {
      await authService.signOut()
      // Real authentication sign-out completed — clear local UI state is handled
      // by the auth store. Route to Login and replace history so the back
      // button cannot return to the authenticated session.
      navigate(ROUTES.LOGIN, { replace: true })
    } catch (error) {
      const message =
        error instanceof Error && error.message ? error.message : 'Failed to sign out. Please try again.'
      toast.error(message)
    }
  }

  return (
    <Button
      variant="ghost"
      size={iconOnly ? 'icon' : 'sm'}
      onClick={handleSignOut}
      aria-label={label}
      className={className}
      leftIcon={<LogOut className="h-4 w-4" />}
    >
      {!iconOnly && label}
    </Button>
  )
}
