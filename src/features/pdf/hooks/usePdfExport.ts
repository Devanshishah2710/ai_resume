/**
 * usePdfExport — PDF generation from the live preview DOM.
 *
 * Uses html2pdf.js (client-side) for zero-infrastructure PDF export.
 * Export is triggered from the builder top bar or preview page.
 */

import { useState, useCallback } from 'react'
import { toast } from 'sonner'
import { useResumeBuilderStore } from '@/store/resume-builder.store'
import { resumeService } from '@/services/resume.service'
import { PDF_CONFIG } from '@/constants'

export function usePdfExport() {
  const [isExporting, setIsExporting] = useState(false)
  const resume = useResumeBuilderStore((s) => s.resume)

  const exportPdf = useCallback(async () => {
    if (!resume || isExporting) return
    setIsExporting(true)
    const toastId = toast.loading('Generating PDF…')

    try {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const html2pdf = ((await import('html2pdf.js')) as any).default ?? (await import('html2pdf.js'))

      const element = document.getElementById('resume-preview-root')
      if (!element) throw new Error('Resume preview element not found')

      const savedTransform = element.style.transform
      element.style.transform = 'none'

      const filename = `${resume.title.replace(/[^a-zA-Z0-9 _-]/g, '').trim() || 'resume'}.pdf`
      const pageWidthPx = Math.round(PDF_CONFIG.PAGE_WIDTH_MM * (PDF_CONFIG.DPI / 25.4))

      await html2pdf().set({
        margin: 0,
        filename,
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: {
          scale: PDF_CONFIG.SCALE,
          useCORS: true,
          logging: false,
          letterRendering: true,
          width: pageWidthPx,
          windowWidth: pageWidthPx,
        },
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait', compress: true },
        pagebreak: { mode: ['avoid-all', 'css', 'legacy'] },
      }).from(element).save()

      element.style.transform = savedTransform

      // Record download (fire-and-forget)
      resumeService.recordDownload(resume.id, 'pdf').catch(() => {})

      toast.success('PDF downloaded', { id: toastId })
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'PDF generation failed', { id: toastId })
    } finally {
      setIsExporting(false)
    }
  }, [resume, isExporting])

  return { exportPdf, isExporting }
}
