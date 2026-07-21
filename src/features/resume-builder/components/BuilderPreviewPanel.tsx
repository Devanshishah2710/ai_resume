/**
 * BuilderPreviewPanel — the live resume preview pane.
 *
 * Renders the selected template at a scaled-down size that fits the panel.
 * The actual PDF export uses a 1:1 scale in a hidden div.
 * Zoom controls let users inspect the resume closely.
 */

import { Suspense, useRef, useEffect } from 'react'
import { ZoomIn, ZoomOut, Maximize2 } from 'lucide-react'
import { useResumeBuilderStore, useResume, useResumeTheme, useResumeSections } from '@/store/resume-builder.store'
import { templateRegistry } from '@/templates/registry'
import { Button } from '@/components/ui/Button'
import { Tooltip } from '@/components/ui/Tooltip'
import { Spinner } from '@/components/ui/Spinner'
import { PDF_CONFIG } from '@/constants'

const MIN_SCALE = 0.35
const MAX_SCALE = 1.0
const SCALE_STEP = 0.05
const A4_WIDTH_PX = PDF_CONFIG.PAGE_WIDTH_MM * (PDF_CONFIG.DPI / 25.4) // ~794px

export function BuilderPreviewPanel() {
  const containerRef = useRef<HTMLDivElement>(null)
  const resume = useResume()
  const theme = useResumeTheme()
  const sections = useResumeSections()
  const { previewScale, setPreviewScale } = useResumeBuilderStore()

  // Auto-fit scale on container resize
  useEffect(() => {
    if (!containerRef.current) return
    const observer = new ResizeObserver((entries) => {
      const entry = entries[0]
      if (!entry) return
      const { width } = entry.contentRect
      const fitScale = Math.min((width - 48) / A4_WIDTH_PX, MAX_SCALE)
      setPreviewScale(Math.max(MIN_SCALE, fitScale))
    })
    observer.observe(containerRef.current)
    return () => observer.disconnect()
  }, [setPreviewScale])

  if (!resume) return null

  const template = templateRegistry[resume.templateId]
  const TemplateComponent = template?.component

  return (
    <div className="flex-1 flex flex-col bg-[var(--color-bg-secondary)] overflow-hidden">
      {/* Preview toolbar */}
      <div className="flex items-center justify-center gap-2 py-2 border-b border-[var(--color-border)] bg-[var(--color-bg-elevated)] shrink-0">
        <Tooltip content="Zoom out">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setPreviewScale(Math.max(MIN_SCALE, previewScale - SCALE_STEP))}
            disabled={previewScale <= MIN_SCALE}
          >
            <ZoomOut className="h-4 w-4" />
          </Button>
        </Tooltip>

        <button
          className="text-xs font-mono text-[var(--color-text-secondary)] w-14 text-center hover:bg-[var(--color-bg-tertiary)] rounded px-1 py-0.5 transition-colors"
          onClick={() => setPreviewScale(0.65)}
          title="Reset zoom"
        >
          {Math.round(previewScale * 100)}%
        </button>

        <Tooltip content="Zoom in">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setPreviewScale(Math.min(MAX_SCALE, previewScale + SCALE_STEP))}
            disabled={previewScale >= MAX_SCALE}
          >
            <ZoomIn className="h-4 w-4" />
          </Button>
        </Tooltip>

        <Tooltip content="Fit to window">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => {
              if (!containerRef.current) return
              const { width } = containerRef.current.getBoundingClientRect()
              setPreviewScale(Math.min((width - 48) / A4_WIDTH_PX, MAX_SCALE))
            }}
          >
            <Maximize2 className="h-4 w-4" />
          </Button>
        </Tooltip>
      </div>

      {/* Scrollable preview area */}
      <div
        ref={containerRef}
        className="flex-1 overflow-auto flex justify-center py-8 px-4"
        aria-label="Resume preview"
        role="region"
      >
        <div
          style={{
            width: A4_WIDTH_PX,
            transform: `scale(${previewScale})`,
            transformOrigin: 'top center',
            // Maintain layout space even when scaled down
            marginBottom: `calc(${A4_WIDTH_PX * (297 / 210)}px * ${previewScale} - ${A4_WIDTH_PX * (297 / 210)}px)`,
          }}
        >
          {/* The actual resume render */}
          <div
            id="resume-preview-root"
            className="resume-preview-wrapper shadow-[var(--shadow-xl)]"
            style={{ backgroundColor: theme.backgroundColor }}
          >
            {TemplateComponent ? (
              <Suspense fallback={<div className="flex items-center justify-center h-96"><Spinner size="md" /></div>}>
                <TemplateComponent
                  data={resume.data}
                  theme={theme}
                  sections={sections}
                  isPreview
                />
              </Suspense>
            ) : (
              <div className="flex items-center justify-center h-96 text-[var(--color-text-tertiary)] text-sm">
                Template "{resume.templateId}" not found
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
