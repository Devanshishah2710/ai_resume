/**
 * ResumeCard — displays a single resume in the dashboard.
 * Supports both grid (card) and list (row) view modes.
 */

import { memo } from 'react'
import {
  FileText,
  Edit3,
  Eye,
  Copy,
  Trash2,
  MoreHorizontal,
  Star,
  Share2,
  Download,
  FileDown,
  FileType2,
} from 'lucide-react'
import { Dropdown, type DropdownItem } from '@/components/ui/Dropdown'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { ResumePreviewThumbnail } from '@/components/dashboard/ResumePreviewThumbnail'
import { timeAgo } from '@/utils/date'
import type { Resume } from '@/types/resume'

type ResumeCardProps = {
  resume: Resume
  viewMode: 'grid' | 'list'
  onEdit: () => void
  onPreview: () => void
  onDuplicate: () => void
  onRename: () => void
  onDelete: () => void
  onToggleFavorite: () => void
  onShare: () => void
  onExport: (format: 'pdf' | 'docx') => void
  onDownload: (format: 'pdf' | 'docx') => void
}

export const ResumeCard = memo(function ResumeCard({
  resume,
  viewMode,
  onEdit,
  onPreview,
  onDuplicate,
  onRename,
  onDelete,
  onToggleFavorite,
  onShare,
  onExport,
  onDownload,
}: ResumeCardProps) {
  const menuItems: DropdownItem[] = [
    { label: 'Edit Resume', icon: <Edit3 className="h-3.5 w-3.5" />, onClick: onEdit },
    { label: 'Preview Resume', icon: <Eye className="h-3.5 w-3.5" />, onClick: onPreview },
    {
      label: 'Export',
      icon: <FileDown className="h-3.5 w-3.5" />,
      children: [
        { label: 'Export as PDF', icon: <FileType2 className="h-3.5 w-3.5" />, onClick: () => onExport('pdf') },
        { label: 'Export as DOCX', icon: <FileType2 className="h-3.5 w-3.5" />, onClick: () => onExport('docx') },
      ],
    },
    {
      label: 'Download',
      icon: <Download className="h-3.5 w-3.5" />,
      children: [
        { label: 'Download PDF', icon: <FileType2 className="h-3.5 w-3.5" />, onClick: () => onDownload('pdf') },
        { label: 'Download DOCX', icon: <FileType2 className="h-3.5 w-3.5" />, onClick: () => onDownload('docx') },
      ],
    },
    { label: 'Duplicate Resume', icon: <Copy className="h-3.5 w-3.5" />, onClick: onDuplicate },
    { label: 'Rename Resume', icon: <Edit3 className="h-3.5 w-3.5" />, onClick: onRename },
    {
      label: resume.isFavorite ? 'Remove Favorite' : 'Set as Favorite',
      icon: <Star className="h-3.5 w-3.5" style={resume.isFavorite ? { fill: 'currentColor', color: 'var(--color-accent)' } : undefined} />,
      onClick: onToggleFavorite,
    },
    {
      label: 'Share Resume',
      icon: <Share2 className="h-3.5 w-3.5" />,
      onClick: onShare,
      separator: true,
    },
    {
      label: 'Delete Resume',
      icon: <Trash2 className="h-3.5 w-3.5" />,
      onClick: onDelete,
      variant: 'danger' as const,
    },
  ]

  if (viewMode === 'list') {
    return (
      <div className="flex items-center gap-4 p-4 rounded-[var(--radius-lg)] bg-[var(--color-bg-elevated)] border border-[var(--color-border)] hover:shadow-[var(--shadow-md)] transition-shadow group">
        {/* Icon */}
        <div className="h-10 w-10 rounded-[var(--radius-md)] bg-[var(--color-accent-subtle)] flex items-center justify-center shrink-0">
          <FileText className="h-5 w-5 text-[var(--color-accent)]" />
        </div>

        {/* Info */}
        <div className="flex-1 min-w-0">
          <p className="font-medium text-sm text-[var(--color-text-primary)] truncate">{resume.title}</p>
          <p className="text-xs text-[var(--color-text-tertiary)] mt-0.5">
            Modified {timeAgo(resume.updatedAt)}
          </p>
        </div>

        {/* Template badge */}
        <Badge variant="outline" className="hidden sm:inline-flex shrink-0">
          {resume.templateId.replace(/-/g, ' ')}
        </Badge>

        {/* Actions */}
        <div className="flex items-center gap-1 shrink-0">
          <Button
            variant="ghost"
            size="sm"
            leftIcon={<Edit3 className="h-3.5 w-3.5" />}
            onClick={onEdit}
            className="opacity-0 group-hover:opacity-100 transition-opacity"
          >
            Edit
          </Button>
          <Dropdown trigger={
            <Button variant="ghost" size="icon" aria-label="More actions">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          } items={menuItems} />
        </div>
      </div>
    )
  }

  // Grid card view
  return (
    <div className="group rounded-[var(--radius-lg)] bg-[var(--color-bg-elevated)] border border-[var(--color-border)] overflow-hidden hover:shadow-[var(--shadow-lg)] transition-all duration-200 flex flex-col">
      {/* Preview area */}
      <div
        className="relative h-44 bg-white cursor-pointer overflow-hidden"
        onClick={onEdit}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => e.key === 'Enter' && onEdit()}
        aria-label={`Edit ${resume.title}`}
      >
        {/* Real template preview */}
        {resume.templateId ? (
          <div className="transition-transform duration-300 ease-out group-hover:scale-105 w-full h-full">
            <ResumePreviewThumbnail
              templateId={resume.templateId}
              data={resume.data}
              theme={resume.theme}
              sections={resume.sections}
            />
          </div>
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-[var(--color-bg-tertiary)] to-[var(--color-bg-secondary)]">
            <div className="w-24 h-32 bg-white rounded shadow-[var(--shadow-md)] p-2 flex flex-col gap-1.5 opacity-80">
              <div className="h-2 bg-gray-800 rounded-full w-3/4" />
              <div className="h-1 bg-gray-300 rounded-full w-1/2" />
              <div className="mt-1 space-y-1">
                {[100, 85, 90, 70, 80].map((w, i) => (
                  <div key={i} className="h-0.5 bg-gray-200 rounded-full" style={{ width: `${w}%` }} />
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Hover overlay — edit button fades in on hover */}
        <div className="absolute inset-0 flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
          <Button
            size="sm"
            onClick={onEdit}
            leftIcon={<Edit3 className="h-3.5 w-3.5" />}
            className="pointer-events-auto shadow-[var(--shadow-lg)]"
          >
            Edit
          </Button>
        </div>
      </div>

      {/* Card footer */}
      <div className="flex items-center justify-between p-3 border-t border-[var(--color-border)]">
        <div className="min-w-0 flex-1">
          <p className="text-sm font-medium text-[var(--color-text-primary)] truncate">{resume.title}</p>
          <p className="text-xs text-[var(--color-text-tertiary)] mt-0.5">
            {timeAgo(resume.updatedAt)}
          </p>
        </div>
        <Dropdown
          trigger={
            <Button variant="ghost" size="icon" aria-label="More actions">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          }
          items={menuItems}
        />
      </div>
    </div>
  )
})
