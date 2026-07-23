/**
 * ResumePreviewThumbnail — renders the actual selected template at reduced scale
 * inside a dashboard card preview area. Mirrors the TemplatePreview approach
 * from TemplatesPage but sized for the smaller card container.
 *
 * Reuses the same lazy-loaded template components from the registry so the
 * preview stays synchronized with the actual resume (template, theme, data,
 * sections), preserving all visual details — colors, typography, spacing,
 * icons, sidebar, decorations.
 */

import { Suspense, memo } from 'react'
import { templateRegistry } from '@/templates/registry'
import { Skeleton } from '@/components/ui/Skeleton'
import type { ResumeData, ResumeTheme, SectionConfig } from '@/types/resume'

type ResumePreviewThumbnailProps = {
  templateId: string
  data: ResumeData
  theme: ResumeTheme
  sections: SectionConfig[]
}

function ThumbnailInner({
  templateId,
  data,
  theme,
  sections,
}: ResumePreviewThumbnailProps) {
  const entry = templateRegistry[templateId]
  const Component = entry?.component
  if (!Component) return null

  return (
    <div className="flex justify-center overflow-hidden bg-white w-full h-full">
      <div
        style={{
          width: '794px',
          flexShrink: 0,
          transform: 'scale(0.28)',
          transformOrigin: 'top center',
          pointerEvents: 'none',
        }}
      >
        <Component data={data} theme={theme} sections={sections} isPreview />
      </div>
    </div>
  )
}

export const ResumePreviewThumbnail = memo(function ResumePreviewThumbnail(
  props: ResumePreviewThumbnailProps,
) {
  const entry = templateRegistry[props.templateId]
  const Component = entry?.component
  if (!Component) return null

  return (
    <Suspense fallback={<Skeleton className="h-full w-full rounded-none" />}>
      <ThumbnailInner {...props} />
    </Suspense>
  )
})
