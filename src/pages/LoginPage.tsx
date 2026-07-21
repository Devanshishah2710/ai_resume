/**
 * LoginPage — email/password + Google/LinkedIn OAuth sign-in.
 *
 * Anti-autofill strategy (multi-layer):
 *   Layer 1 — autoComplete="off" on form, "off" on email, "new-password" on
 *             password (Chrome respects "new-password" for password fields).
 *   Layer 2 — type="text" + inputMode="email" for the email field instead of
 *             type="email" so Chrome does not recognise it as an autofill target.
 *   Layer 3 — hidden decoy username/password inputs before the real fields to
 *             absorb credential-fill from password managers.
 *   Layer 4 — readOnly on mount, released after 2 s (browser autofill typically
 *             fires within 500 ms of DOM ready, so this covers it).
 *   Layer 5 — state is force-cleared at multiple time points (200 ms, 500 ms,
 *             1200 ms, 2000 ms) to override any late autofill.
 *   Layer 6 — field name attributes are randomised per mount so password
 *             managers cannot match fields across sessions.
 *   Layer 7 — form reset on mount, after successful login, and after failed
 *             login.
 *   Layer 8 — controlled inputs with useState('') so React always overwrites
 *             the DOM value property on every render.
 */

import { useState, useEffect, useRef } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { toast } from 'sonner'
import { Eye, EyeOff, Mail } from 'lucide-react'
import { AuthLayout } from '@/layouts/AuthLayout'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { authService } from '@/services/auth.service'
import { ENABLE_GOOGLE_AUTH, ENABLE_LINKEDIN_AUTH, ROUTES } from '@/constants'

type FormErrors = {
  email?: string
  password?: string
  root?: string
}

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isGoogleLoading, setIsGoogleLoading] = useState(false)
  const [isLinkedInLoading, setIsLinkedInLoading] = useState(false)
  const [errors, setErrors] = useState<FormErrors>({})
  const [isReadOnly, setIsReadOnly] = useState(true)

  const navigate = useNavigate()
  const location = useLocation()

  const from =
    (location.state as { from?: string } | null)?.from ?? ROUTES.DASHBOARD

  // Layer 6 — randomised field names per mount
  const fieldNames = useRef({
    email: `eml_${Math.random().toString(36).slice(2, 10)}`,
    password: `pwd_${Math.random().toString(36).slice(2, 10)}`,
  })

  // Layers 4 + 5 — readOnly + force-clear on mount
  useEffect(() => {
    const clear = () => {
      setEmail('')
      setPassword('')
      setErrors({})
    }

    clear() // immediate

    // Force-clear at staggered intervals to catch late autofill
    const c1 = setTimeout(clear, 200)
    const c2 = setTimeout(clear, 500)
    const c3 = setTimeout(clear, 1200)
    const c4 = setTimeout(clear, 2000)

    // Release readOnly after the autofill window has firmly passed
    const release = setTimeout(() => setIsReadOnly(false), 2500)

    return () => {
      clearTimeout(c1); clearTimeout(c2); clearTimeout(c3); clearTimeout(c4)
      clearTimeout(release)
    }
  }, [])

  // ── Validators ───────────────────────────────────────────────────────────
  const validateForm = (): boolean => {
    const next: FormErrors = {}
    if (!email.trim()) {
      next.email = 'Email is required'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      next.email = 'Enter a valid email address'
    }
    if (!password) {
      next.password = 'Password is required'
    } else if (password.length < 6) {
      next.password = 'Password must be at least 6 characters'
    }
    setErrors(next)
    return Object.keys(next).length === 0
  }

  // Layer 7 — form reset
  const resetForm = () => {
    setEmail('')
    setPassword('')
    setErrors({})
  }

  // ── Handlers ─────────────────────────────────────────────────────────────
  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validateForm()) return

    setIsSubmitting(true)
    setErrors({})

    try {
      await authService.signInWithEmail(email, password)
      resetForm()
      navigate(from, { replace: true })
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Sign in failed'
      setErrors({ root: message })
      toast.error(message)
      resetForm()
    } finally {
      setIsSubmitting(false)
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

  const handleLinkedInSignIn = async () => {
    setIsLinkedInLoading(true)
    try {
      await authService.signInWithLinkedIn()
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
        <form onSubmit={onSubmit} autoComplete="off" noValidate className="space-y-3">
          {/*
            Layer 3 — hidden decoy inputs that sit before the real fields.
            Password managers tend to fill the first matching field they find,
            so these absorb the credential-fill attempt.
          */}
          <input
            type="email"
            name="username"
            autoComplete="off"
            tabIndex={-1}
            style={{ position: 'absolute', left: '-9999px', width: '1px', height: '1px' }}
            aria-hidden="true"
            readOnly
          />
          <input
            type="password"
            name="fakepassword"
            autoComplete="off"
            tabIndex={-1}
            style={{ position: 'absolute', left: '-9999px', width: '1px', height: '1px' }}
            aria-hidden="true"
            readOnly
          />

          {/*
            Layer 2 — use type="text" + inputMode="email" instead of
            type="email" so Chrome heuristics do not identify this as a
            username/email autofill target.
          */}
          <Input
            label="Email address"
            type="text"
            inputMode="email"
            autoComplete="off"
            placeholder="you@example.com"
            leftIcon={<Mail className="h-4 w-4" />}
            error={errors.email}
            name={fieldNames.current.email}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            readOnly={isReadOnly}
          />

          {/*
            Layer 1 — autoComplete="new-password" is the only value Chrome
            reliably respects for password fields (it tells the browser never
            to fill an existing password into this field).
          */}
          <Input
            label="Password"
            type={showPassword ? 'text' : 'password'}
            autoComplete="new-password"
            placeholder="••••••••"
            error={errors.password}
            name={fieldNames.current.password}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            readOnly={isReadOnly}
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
              {errors.root}
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
