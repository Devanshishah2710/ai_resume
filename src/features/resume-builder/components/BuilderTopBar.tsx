/**
 * BuilderTopBar — sticky header of the resume editor.
 *
 * Contains:
 *   - Back to dashboard link
 *   - Editable resume title (inline)
 *   - Auto-save indicator
 *   - Template switch button
 *   - Download PDF button
 *   - Preview toggle (mobile)
 */

import { useState, useRef } from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeft, Check, Loader2, Download, Palette, PanelLeft } from 'lucide-react'
import { useResumeBuilderStore, useIsSaving, useIsDirty } from '@/store/resume-builder.store'
import { Button } from '@/components/ui/Button'
import { Tooltip } from '@/components/ui/Tooltip'
import { usePdfExport } from '@/features/pdf/hooks/usePdfExport'
import { ROUTES } from '@/constants'
import { SignOutButton } from '@/components/common/SignOutButton'

type BuilderTopBarProps = {
  onToggleEditor?: () => void
}

export function BuilderTopBar({ onToggleEditor }: BuilderTopBarProps) {
  const resume = useResumeBuilderStore((s) => s.resume)
  const setTitle = useResumeBuilderStore((s) => s.setTitle)
  const setActivePanel = useResumeBuilderStore((s) => s.setActivePanel)
  const isSaving = useIsSaving()
  const isDirty = useIsDirty()

  const [editingTitle, setEditingTitle] = useState(false)
  const [titleDraft, setTitleDraft] = useState(resume?.title ?? '')
  const titleInputRef = useRef<HTMLInputElement>(null)

  const { exportPdf, isExporting } = usePdfExport()

  const commitTitle = () => {
    const trimmed = titleDraft.trim()
    if (trimmed && trimmed !== resume?.title) {
      setTitle(trimmed)
    } else {
      setTitleDraft(resume?.title ?? '')
    }
    setEditingTitle(false)
  }

  const handleTitleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') commitTitle()
    if (e.key === 'Escape') {
      setTitleDraft(resume?.title ?? '')
      setEditingTitle(false)
    }
  }

  return (
    <header className="h-[var(--topbar-height)] shrink-0 flex items-center justify-between gap-3 px-4 border-b border-[var(--color-border)] bg-[var(--color-bg-elevated)] z-30">
      {/* Left */}
      <div className="flex items-center gap-3 min-w-0">
        {/* Editor toggle (mobile / tablet) */}
        {onToggleEditor && (
          <Button
            variant="ghost"
            size="icon"
            onClick={onToggleEditor}
            className="lg:hidden shrink-0"
            aria-label="Open editor"
          >
            <PanelLeft className="h-4 w-4" />
          </Button>
        )}

        <Tooltip content="Back to dashboard">
          <Link
            to={ROUTES.DASHBOARD}
            className="p-2 rounded-[var(--radius-sm)] hover:bg-[var(--color-bg-tertiary)] transition-colors text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] shrink-0"
            aria-label="Back to dashboard"
          >
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Tooltip>

        {/* Editable title */}
        {editingTitle ? (
          <input
            ref={titleInputRef}
            type="text"
            value={titleDraft}
            onChange={(e) => setTitleDraft(e.target.value)}
            onBlur={commitTitle}
            onKeyDown={handleTitleKeyDown}
            maxLength={100}
            className="text-sm font-semibold text-[var(--color-text-primary)] bg-[var(--color-bg-tertiary)] rounded-[var(--radius-sm)] px-2 py-1 min-w-0 w-48 focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]"
            autoFocus
            aria-label="Resume title"
          />
        ) : (
          <button
            onClick={() => {
              setTitleDraft(resume?.title ?? '')
              setEditingTitle(true)
            }}
            className="text-sm font-semibold text-[var(--color-text-primary)] truncate max-w-[200px] hover:bg-[var(--color-bg-tertiary)] rounded-[var(--radius-sm)] px-2 py-1 transition-colors text-left"
            title="Click to rename"
          >
            {resume?.title}
          </button>
        )}

        {/* Save status */}
        <div className="hidden sm:flex items-center gap-1.5 text-xs text-[var(--color-text-tertiary)]">
          {isSaving ? (
            <>
              <Loader2 className="h-3 w-3 animate-spin" />
              Saving…
            </>
          ) : isDirty ? (
            <span>Unsaved changes</span>
          ) : (
            <>
              <Check className="h-3 w-3 text-[var(--color-success)]" />
              Saved
            </>
          )}
        </div>
      </div>

      {/* Right */}
      <div className="flex items-center gap-2 shrink-0">
        <Tooltip content="Sign out">
          <div>
            <SignOutButton iconOnly className="h-10 w-10" />
          </div>
        </Tooltip>

        {/* Template picker shortcut */}
        <Button
          variant="secondary"
          size="sm"
          leftIcon={<Palette className="h-3.5 w-3.5" />}
          onClick={() => setActivePanel('design')}
          className="hidden sm:inline-flex"
        >
          Design
        </Button>

        {/* PDF Export */}
        <Button
          size="sm"
          leftIcon={isExporting ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Download className="h-3.5 w-3.5" />}
          onClick={exportPdf}
          isLoading={isExporting}
          disabled={isExporting}
        >
          <span className="hidden sm:inline">Export PDF</span>
          <span className="sm:hidden">PDF</span>
        </Button>
      </div>
    </header>
  )
}
