/**
 * AuthCallbackPage — handles the redirect back from Google (and any other
 * OAuth provider) after the user authenticates.
 *
 * Supabase returns the auth code in the URL (PKCE flow). With
 * `detectSessionInUrl: true` the client processes it automatically, but a
 * dedicated route gives us a single place to surface errors (e.g. a provider
 * that is not enabled in Supabase) and guarantee the user lands on the
 * dashboard or is sent back to login with a friendly message.
 */

import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import { Spinner } from '@/components/ui/Spinner'
import { Button } from '@/components/ui/Button'
import { supabase } from '@/lib/supabase'
import { ROUTES } from '@/constants'

export default function AuthCallbackPage() {
  const navigate = useNavigate()
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let cancelled = false

    async function handleCallback() {
      // The session may already be established by detectSessionInUrl. If so,
      // the user is authenticated and we can route them onward.
      const { data: sessionData } = await supabase.auth.getSession()
      if (sessionData.session) {
        if (!cancelled) navigate(ROUTES.DASHBOARD, { replace: true })
        return
      }

      // No session and no error param — still finalizing. Give it a brief
      // moment for the URL-based code exchange to complete, then re-check.
      await new Promise((resolve) => setTimeout(resolve, 400))
      const { data: retry } = await supabase.auth.getSession()
      if (retry.session) {
        if (!cancelled) navigate(ROUTES.DASHBOARD, { replace: true })
        return
      }

      if (cancelled) return
      const friendly =
        'Google sign-in is currently unavailable. Please try again later or contact the administrator.'
      console.error('[auth] OAuth callback completed without a session')
      setError(friendly)
      toast.error(friendly)
    }

    void handleCallback()
    return () => {
      cancelled = true
    }
  }, [navigate])

  if (error) {
    return (
      <div className="min-h-dvh flex items-center justify-center bg-[var(--color-bg-primary)] px-4">
        <div className="w-full max-w-sm space-y-4 text-center">
          <h1 className="text-xl font-semibold text-[var(--color-text-primary)]">
            Sign-in couldn&apos;t be completed
          </h1>
          <p className="text-sm text-[var(--color-text-secondary)]">{error}</p>
          <Button fullWidth onClick={() => navigate(ROUTES.LOGIN, { replace: true })}>
            Back to sign in
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-dvh flex items-center justify-center bg-[var(--color-bg-primary)]">
      <Spinner size="lg" />
    </div>
  )
}
