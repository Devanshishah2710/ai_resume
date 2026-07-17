/**
 * ResumeBuilderPage — the three-panel editor.
 *
 * Layout:
 *   ┌──────────────┬──────────────────────┬──────────────┐
 *   │  Left Panel  │   Live Preview       │  (future)    │
 *   │  (sections/  │   (A4 preview)       │              │
 *   │   design)    │                      │              │
 *   └──────────────┴──────────────────────┴──────────────┘
 *
 * Topbar: resume title (editable), save status, template picker, export.
 */

import { useEffect, useCallback } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import { useResumeBuilderStore } from '@/store/resume-builder.store'
import { BuilderTopBar } from '@/features/resume-builder/components/BuilderTopBar'
import { BuilderLeftPanel } from '@/features/resume-builder/components/BuilderLeftPanel'
import { BuilderPreviewPanel } from '@/features/resume-builder/components/BuilderPreviewPanel'
import { Spinner } from '@/components/ui/Spinner'
import { ROUTES } from '@/constants'

export default function ResumeBuilderPage() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const { loadResume, reset, isLoading, saveError, resume } = useResumeBuilderStore()

  const load = useCallback(async () => {
    if (!id) {
      // /resume/new — create flow handled by dashboard modal
      navigate(ROUTES.DASHBOARD, { replace: true })
      return
    }
    try {
      await loadResume(id)
    } catch {
      toast.error('Failed to load resume')
      navigate(ROUTES.DASHBOARD, { replace: true })
    }
  }, [id, loadResume, navigate])

  useEffect(() => {
    load()
    return () => reset()
  }, [load, reset])

  useEffect(() => {
    if (saveError) toast.error(`Auto-save failed: ${saveError}`)
  }, [saveError])

  if (isLoading || !resume) {
    return (
      <div className="min-h-dvh flex items-center justify-center bg-[var(--color-bg-secondary)]">
        <Spinner size="lg" />
      </div>
    )
  }

  return (
    <div className="flex flex-col h-dvh bg-[var(--color-bg-secondary)] overflow-hidden">
      {/* Top bar */}
      <BuilderTopBar />

      {/* Editor panels */}
      <div className="flex flex-1 overflow-hidden">
        {/* Left — section forms */}
        <BuilderLeftPanel />

        {/* Center — live preview */}
        <BuilderPreviewPanel />
      </div>
    </div>
  )
}
