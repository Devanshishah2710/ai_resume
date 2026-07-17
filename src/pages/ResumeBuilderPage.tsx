/**
 * ResumeBuilderPage — the three-panel editor.
 *
 * Layout (desktop ≥ lg):
 *   ┌──────────────┬──────────────────────┐
 *   │  Left Panel  │   Live Preview       │
 *   │  (sections/  │   (A4 preview)       │
 *   │   design)    │                      │
 *   └──────────────┴──────────────────────┘
 *
 * Layout (mobile / tablet < lg):
 *   The preview and editor are stacked. A segmented control toggles between
 *   "Edit" and "Preview". The left panel becomes a full-height scroll area.
 *
 * Topbar: resume title (editable), save status, template picker, export.
 */

import { useEffect, useCallback, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import { motion, AnimatePresence } from 'framer-motion'
import { PanelLeft, Eye } from 'lucide-react'
import { useResumeBuilderStore } from '@/store/resume-builder.store'
import { BuilderTopBar } from '@/features/resume-builder/components/BuilderTopBar'
import { BuilderLeftPanel } from '@/features/resume-builder/components/BuilderLeftPanel'
import { BuilderPreviewPanel } from '@/features/resume-builder/components/BuilderPreviewPanel'
import { Spinner } from '@/components/ui/Spinner'
import { Button } from '@/components/ui/Button'
import { ROUTES } from '@/constants'

type MobileView = 'edit' | 'preview'

export default function ResumeBuilderPage() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const { loadResume, reset, isLoading, saveError, resume } = useResumeBuilderStore()
  const [mobileView, setMobileView] = useState<MobileView>('edit')
  const [drawerOpen, setDrawerOpen] = useState(false)

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
      <BuilderTopBar
        onToggleEditor={() => setDrawerOpen(true)}
      />

      {/* Editor panels */}
      <div className="flex flex-1 overflow-hidden">
        {/* Left — section forms (desktop) */}
        <div className="hidden lg:flex">
          <BuilderLeftPanel />
        </div>

        {/* Center — live preview (desktop) */}
        <div className="hidden lg:flex flex-1 min-w-0">
          <BuilderPreviewPanel />
        </div>

        {/* ── Mobile / tablet layout (< lg) ── */}
        <div className="flex flex-1 flex-col min-w-0 lg:hidden">
          {/* Segmented control */}
          <div className="flex items-center gap-2 p-2 border-b border-[var(--color-border)] bg-[var(--color-bg-elevated)] shrink-0">
            <Button
              variant={mobileView === 'edit' ? 'secondary' : 'ghost'}
              size="sm"
              leftIcon={<PanelLeft className="h-4 w-4" />}
              onClick={() => setMobileView('edit')}
              className="flex-1"
            >
              Edit
            </Button>
            <Button
              variant={mobileView === 'preview' ? 'secondary' : 'ghost'}
              size="sm"
              leftIcon={<Eye className="h-4 w-4" />}
              onClick={() => setMobileView('preview')}
              className="flex-1"
            >
              Preview
            </Button>
          </div>

          <div className="flex-1 min-h-0">
            {mobileView === 'edit' ? <BuilderLeftPanel /> : <BuilderPreviewPanel />}
          </div>
        </div>
      </div>

      {/* ── Editor drawer (tablet/mobile, opens from top bar) ── */}
      <AnimatePresence>
        {drawerOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setDrawerOpen(false)}
              className="fixed inset-0 z-40 bg-black/40 lg:hidden"
            />
            <motion.aside
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', stiffness: 400, damping: 40 }}
              className="fixed top-0 left-0 bottom-0 z-50 w-80 max-w-[85vw] bg-[var(--color-bg-elevated)] border-r border-[var(--color-border)] flex flex-col lg:hidden"
            >
              <div className="flex items-center justify-between px-4 py-3 border-b border-[var(--color-border)] shrink-0">
                <span className="font-semibold text-sm text-[var(--color-text-primary)]">Editor</span>
                <Button variant="ghost" size="icon" onClick={() => setDrawerOpen(false)} aria-label="Close editor">
                  <PanelLeft className="h-4 w-4" />
                </Button>
              </div>
              <div className="flex-1 overflow-hidden">
                <BuilderLeftPanel />
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </div>
  )
}
