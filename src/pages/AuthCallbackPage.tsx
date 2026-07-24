/**
 * AuthCallbackPage — handles the redirect back from OAuth providers.
 *
 * For standard providers (Google), the user is routed to the dashboard.
 * For LinkedIn, the user's profile is imported and a pre-filled resume is
 * created, then the user is routed to the editor.
 *
 * Supabase returns the auth code in the URL (PKCE flow). With
 * `detectSessionInUrl: true` the client processes it automatically, but a
 * dedicated route gives us a single place to surface errors and handle the
 * LinkedIn import flow.
 */

import { useEffect, useState, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import { Loader2, CheckCircle2, AlertCircle } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { supabase } from '@/lib/supabase'
import { resumeService } from '@/services/resume.service'
import { importLinkedInProfile } from '@/services/linkedin.service'
import { ROUTES } from '@/constants'

type ImportStep =
  | 'checking'
  | 'authenticating'
  | 'fetching'
  | 'importing'
  | 'preparing'
  | 'redirecting'
  | 'error'

const STEP_MESSAGES: Record<ImportStep, string> = {
  checking: 'Finalizing sign-in…',
  authenticating: 'Authenticating…',
  fetching: 'Fetching LinkedIn profile…',
  importing: 'Importing your experience…',
  preparing: 'Preparing your resume…',
  redirecting: 'Redirecting to editor…',
  error: '',
}

export default function AuthCallbackPage() {
  const navigate = useNavigate()
  const [step, setStep] = useState<ImportStep>('checking')
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  const handleLinkedInImport = useCallback(async () => {
    setStep('authenticating')

    // Brief delay so the loading state is visible
    await new Promise((r) => setTimeout(r, 400))

    setStep('fetching')

    let result: Awaited<ReturnType<typeof importLinkedInProfile>>
    try {
      result = await importLinkedInProfile()
    } catch {
      // Network / parse error — create a basic resume
      setStep('preparing')
      try {
        const resume = await resumeService.createResume('My LinkedIn Resume')
        setStep('redirecting')
        navigate(ROUTES.RESUME_EDIT.replace(':id', resume.id), { replace: true })
      } catch {
        setStep('error')
        setErrorMessage('We imported your profile but couldn\'t create your resume. Please try again.')
        toast.error('Failed to create resume from LinkedIn profile')
      }
      return
    }

    if (!result) {
      // No LinkedIn data — create basic resume
      setStep('preparing')
      try {
        const resume = await resumeService.createResume('My LinkedIn Resume')
        setStep('redirecting')
        navigate(ROUTES.RESUME_EDIT.replace(':id', resume.id), { replace: true })
      } catch {
        setStep('error')
        setErrorMessage('Could not create your resume. Please try again.')
        toast.error('Failed to create resume')
      }
      return
    }

    setStep('importing')
    await new Promise((r) => setTimeout(r, 300))

    setStep('preparing')
    try {
      const resume = await resumeService.createResume(
        result.title,
        'classic-professional',
        result.data,
      )
      setStep('redirecting')
      toast.success('LinkedIn profile imported successfully!')
      navigate(ROUTES.RESUME_EDIT.replace(':id', resume.id), { replace: true })
    } catch {
      setStep('error')
      setErrorMessage('Your profile was imported but we couldn\'t create the resume. Please try again.')
      toast.error('Failed to create resume from LinkedIn profile')
    }
  }, [navigate])

  useEffect(() => {
    let cancelled = false

    async function handleCallback() {
      const { data: sessionData } = await supabase.auth.getSession()
      const session = sessionData.session

      if (cancelled) return

      if (session) {
        // Check if user has a LinkedIn identity
        const user = session.user
        const linkedInIdentity = (user.identities ?? []).find(
          (id) => id.provider === 'linkedin_oidc',
        )

        if (linkedInIdentity) {
          await handleLinkedInImport()
        } else {
          // Google or other OAuth — go to dashboard
          navigate(ROUTES.DASHBOARD, { replace: true })
        }
        return
      }

      // No session yet — wait briefly then retry
      await new Promise((resolve) => setTimeout(resolve, 400))
      const { data: retry } = await supabase.auth.getSession()

      if (cancelled) return

      if (retry.session) {
        const user = retry.session.user
        const linkedInIdentity = (user.identities ?? []).find(
          (id) => id.provider === 'linkedin_oidc',
        )

        if (linkedInIdentity) {
          await handleLinkedInImport()
        } else {
          navigate(ROUTES.DASHBOARD, { replace: true })
        }
        return
      }

      if (cancelled) return
      const friendly =
        'Sign-in could not be completed. Please try again or use email and password.'
      console.error('[auth] OAuth callback completed without a session')
      setStep('error')
      setErrorMessage(friendly)
      toast.error(friendly)
    }

    void handleCallback()
    return () => {
      cancelled = true
    }
  }, [navigate, handleLinkedInImport])

  // ── Error view ──
  if (step === 'error') {
    return (
      <div className="min-h-dvh flex items-center justify-center bg-[var(--color-bg-primary)] px-4">
        <div className="w-full max-w-sm space-y-4 text-center">
          <AlertCircle className="h-10 w-10 mx-auto text-[var(--color-error)]" />
          <h1 className="text-xl font-semibold text-[var(--color-text-primary)]">
            Sign-in couldn&apos;t be completed
          </h1>
          <p className="text-sm text-[var(--color-text-secondary)]">
            {errorMessage ?? 'An unexpected error occurred.'}
          </p>
          <Button fullWidth onClick={() => navigate(ROUTES.LOGIN, { replace: true })}>
            Back to sign in
          </Button>
        </div>
      </div>
    )
  }

  // ── LinkedIn import in progress ──
  const importSteps = ['authenticating', 'fetching', 'importing', 'preparing', 'redirecting'] as const
  const currentIdx = importSteps.indexOf(step as typeof importSteps[number])

  if (currentIdx >= 0) {
    return (
      <div className="min-h-dvh flex items-center justify-center bg-[var(--color-bg-primary)] px-4">
        <div className="w-full max-w-sm space-y-6">
          {/* Animated logo */}
          <div className="flex justify-center">
            <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg shadow-indigo-500/25">
              <Loader2 className="h-6 w-6 text-white animate-spin" />
            </div>
          </div>

          {/* Steps */}
          <div className="space-y-3">
            {importSteps.map((s, i) => {
              const isActive = i === currentIdx
              const isDone = i < currentIdx
              return (
                <div key={s} className="flex items-center gap-3">
                  <div className="shrink-0 w-6 flex justify-center">
                    {isDone ? (
                      <CheckCircle2 className="h-5 w-5 text-[var(--color-success)]" />
                    ) : isActive ? (
                      <Loader2 className="h-5 w-5 text-[var(--color-primary)] animate-spin" />
                    ) : (
                      <div className="h-5 w-5 rounded-full border-2 border-[var(--color-border)]" />
                    )}
                  </div>
                  <span
                    className={[
                      'text-sm transition-colors',
                      isDone
                        ? 'text-[var(--color-text-tertiary)]'
                        : isActive
                          ? 'text-[var(--color-text-primary)] font-medium'
                          : 'text-[var(--color-text-tertiary)]',
                    ].join(' ')}
                  >
                    {STEP_MESSAGES[s]}
                  </span>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    )
  }

  // ── Default loading state ──
  return (
    <div className="min-h-dvh flex items-center justify-center bg-[var(--color-bg-primary)]">
      <Loader2 className="h-8 w-8 text-[var(--color-primary)] animate-spin" />
    </div>
  )
}
