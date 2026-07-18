import { useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { ArrowLeft, Download } from 'lucide-react'
import { useResumeBuilderStore, useResume, useResumeTheme, useResumeSections } from '@/store/resume-builder.store'
import { templateRegistry } from '@/templates/registry'
import { usePdfExport } from '@/features/pdf/hooks/usePdfExport'
import { Button } from '@/components/ui/Button'
import { Spinner } from '@/components/ui/Spinner'
import { ROUTES } from '@/constants'
import { SignOutButton } from '@/components/common/SignOutButton'

export default function ResumePreviewPage() {
  const { id } = useParams<{ id: string }>()
  const { loadResume, isLoading } = useResumeBuilderStore()
  const resume = useResume()
  const theme = useResumeTheme()
  const sections = useResumeSections()
  const { exportPdf, isExporting } = usePdfExport()

  useEffect(() => {
    if (id) loadResume(id)
  }, [id, loadResume])

  if (isLoading || !resume) {
    return (
      <div className="min-h-dvh flex items-center justify-center bg-[var(--color-bg-secondary)]">
        <Spinner size="lg" />
      </div>
    )
  }

  const template = templateRegistry[resume.templateId]
  const TemplateComponent = template?.component

  return (
    <div className="min-h-dvh bg-[var(--color-bg-secondary)]">
      {/* Preview bar */}
      <div className="sticky top-0 z-10 flex items-center justify-between px-4 py-3 bg-[var(--color-bg-elevated)] border-b border-[var(--color-border)]">
        <Link
          to={ROUTES.RESUME_EDIT.replace(':id', resume.id)}
          className="flex items-center gap-2 text-sm text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to editor
        </Link>
        <div className="flex items-center gap-2">
          <SignOutButton iconOnly className="h-9 w-9" />
          <Button size="sm" leftIcon={<Download className="h-3.5 w-3.5" />} onClick={exportPdf} isLoading={isExporting}>
            Export PDF
          </Button>
        </div>
      </div>

      {/* A4 preview */}
      <div className="flex justify-center py-10 px-4">
        <div id="resume-preview-root" className="resume-preview-wrapper shadow-2xl">
          {TemplateComponent ? (
            <TemplateComponent data={resume.data} theme={theme} sections={sections} isPreview />
          ) : (
            <div className="flex items-center justify-center h-96 text-[var(--color-text-tertiary)]">
              Template not found
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
