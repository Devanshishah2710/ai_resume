import { LogOut } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useAuthStore } from '@/store/auth.store'
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
      useAuthStore.getState().setUser(null)
      useAuthStore.getState().setProfile(null)
      useAuthStore.getState().setLoading(false)
      navigate(ROUTES.LOGIN, { replace: true })
    } catch {
      toast.error('Failed to sign out')
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
