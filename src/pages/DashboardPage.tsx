/**
 * DashboardPage — the main landing page after login.
 *
 * Features:
 *   - Resume list with card and list view toggle
 *   - Search by title
 *   - Sort by updated/created/title
 *   - Create, duplicate, rename, delete resume actions
 *   - Skeleton loading states
 *   - Empty state with CTA
 *   - Stats bar (total resumes, downloads)
 */

import { useState, useEffect, useMemo, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Plus,
  Search,
  LayoutGrid,
  List,
  FileText,
} from 'lucide-react'
import { toast } from 'sonner'
import { AppLayout } from '@/layouts/AppLayout'
import { Button, Container } from '@/components/ui'
import { Input } from '@/components/ui/Input'
import { EmptyState } from '@/components/ui/EmptyState'
import { Select } from '@/components/ui/Select'
import { ResumeCard } from '@/components/dashboard/ResumeCard'
import { ResumeCardSkeleton } from '@/components/dashboard/ResumeCardSkeleton'
import { CreateResumeModal } from '@/components/dashboard/CreateResumeModal'
import { RenameResumeModal } from '@/components/dashboard/RenameResumeModal'
import { DeleteResumeModal } from '@/components/dashboard/DeleteResumeModal'
import { resumeService } from '@/services/resume.service'
import { exportResume } from '@/utils/resumeExport'
import type { Resume } from '@/types/resume'
import { ROUTES, APP_URL } from '@/constants'

type SortOption = 'updated' | 'created' | 'title'
type ViewMode = 'grid' | 'list'

const SORT_OPTIONS = [
  { value: 'updated', label: 'Last modified' },
  { value: 'created', label: 'Date created' },
  { value: 'title', label: 'Name (A–Z)' },
]

export default function DashboardPage() {
  const navigate = useNavigate()

  // ── Data state ──
  const [resumes, setResumes] = useState<Resume[]>([])
  const [isLoading, setIsLoading] = useState(true)

  // ── UI state ──
  const [search, setSearch] = useState('')
  const [sort, setSort] = useState<SortOption>('updated')
  const [viewMode, setViewMode] = useState<ViewMode>('grid')
  const [createOpen, setCreateOpen] = useState(false)
  const [renameTarget, setRenameTarget] = useState<Resume | null>(null)
  const [deleteTarget, setDeleteTarget] = useState<Resume | null>(null)

  // ── Load resumes ──
  const loadResumes = useCallback(async () => {
    setIsLoading(true)
    try {
      const data = await resumeService.listResumes()
      setResumes(data)
    } catch {
      toast.error('Failed to load resumes')
    } finally {
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    loadResumes()
  }, [loadResumes])

  // ── Filtered + sorted list ──
  const filteredResumes = useMemo(() => {
    const q = search.toLowerCase().trim()
    const filtered = q
      ? resumes.filter((r) => r.title.toLowerCase().includes(q))
      : resumes

    return [...filtered].sort((a, b) => {
      if (sort === 'title') return a.title.localeCompare(b.title)
      if (sort === 'created') return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
    })
  }, [resumes, search, sort])

  // ── Actions ──
  const handleEdit = (id: string) => {
    navigate(ROUTES.RESUME_EDIT.replace(':id', id))
  }

  const handleDuplicate = async (resume: Resume) => {
    const toastId = toast.loading(`Duplicating "${resume.title}"…`)
    try {
      const duplicate = await resumeService.duplicateResume(resume.id)
      setResumes((prev) => [duplicate, ...prev])
      toast.success('Resume duplicated', { id: toastId })
    } catch {
      toast.error('Failed to duplicate resume', { id: toastId })
    }
  }

  const handleRename = async (resume: Resume, newTitle: string) => {
    try {
      const updated = await resumeService.renameResume(resume.id, newTitle)
      setResumes((prev) => prev.map((r) => r.id === updated.id ? updated : r))
      toast.success('Resume renamed')
    } catch {
      toast.error('Failed to rename resume')
    }
  }

  const handleDelete = async (resume: Resume) => {
    try {
      await resumeService.deleteResume(resume.id)
      setResumes((prev) => prev.filter((r) => r.id !== resume.id))
      toast.success('Resume deleted')
    } catch {
      toast.error('Failed to delete resume')
    }
  }

  const handlePreview = (id: string) => {
    navigate(ROUTES.RESUME_PREVIEW.replace(':id', id))
  }

  const handleToggleFavorite = async (resume: Resume) => {
    const next = !resume.isFavorite
    setResumes((prev) => prev.map((r) => r.id === resume.id ? { ...r, isFavorite: next } : r))
    try {
      await resumeService.toggleFavorite(resume.id, next)
      toast.success(next ? 'Added to favorites' : 'Removed from favorites')
    } catch {
      setResumes((prev) => prev.map((r) => r.id === resume.id ? { ...r, isFavorite: !next } : r))
      toast.error('Failed to update favorite')
    }
  }

  const handleShare = async (resume: Resume) => {
    const link = `${APP_URL}${ROUTES.RESUME_PREVIEW.replace(':id', resume.id)}`
    try {
      await navigator.clipboard.writeText(link)
      toast.success('Share link copied to clipboard')
    } catch {
      toast.message(`Share link: ${link}`)
    }
  }

  const handleExport = async (resume: Resume, format: 'pdf' | 'docx') => {
    const toastId = toast.loading(`Exporting "${resume.title}" as ${format.toUpperCase()}…`)
    try {
      await exportResume(resume, format)
      toast.success(`${format.toUpperCase()} exported`, { id: toastId })
    } catch {
      toast.error(`Failed to export ${format.toUpperCase()}`, { id: toastId })
    }
  }

  const handleCreate = async (title: string, templateId: string) => {
    const toastId = toast.loading('Creating resume…')
    try {
      const resume = await resumeService.createResume(title, templateId)
      setResumes((prev) => [resume, ...prev])
      setCreateOpen(false)
      toast.success('Resume created', { id: toastId })
      navigate(ROUTES.RESUME_EDIT.replace(':id', resume.id))
    } catch {
      toast.error('Failed to create resume', { id: toastId })
    }
  }

  // ── Render ──
  return (
    <AppLayout>
      <Container className="py-8">
        {/* ── Header ── */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl font-bold text-[var(--color-text-primary)]">My Resumes</h1>
            <p className="text-sm text-[var(--color-text-secondary)] mt-0.5">
              {isLoading ? '…' : `${resumes.length} resume${resumes.length !== 1 ? 's' : ''}`}
            </p>
          </div>
          <Button
            leftIcon={<Plus className="h-4 w-4" />}
            onClick={() => setCreateOpen(true)}
          >
            New Resume
          </Button>
        </div>

        {/* ── Filters ── */}
        {(resumes.length > 0 || search) && (
          <div className="flex flex-col sm:flex-row gap-3 mb-6">
            <Input
              placeholder="Search resumes…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              leftIcon={<Search className="h-4 w-4" />}
              className="sm:max-w-xs"
              aria-label="Search resumes"
            />
            <div className="flex items-center gap-2 ml-auto">
              <Select
                value={sort}
                onChange={(e) => setSort(e.target.value as SortOption)}
                options={SORT_OPTIONS}
                aria-label="Sort resumes"
                className="w-44"
              />
              <div className="flex items-center border border-[var(--color-border)] rounded-[var(--radius-sm)] overflow-hidden">
                <button
                  onClick={() => setViewMode('grid')}
                  aria-label="Grid view"
                  className={[
                    'p-2 transition-colors',
                    viewMode === 'grid'
                      ? 'bg-[var(--color-accent-subtle)] text-[var(--color-accent)]'
                      : 'text-[var(--color-text-tertiary)] hover:bg-[var(--color-bg-secondary)]',
                  ].join(' ')}
                >
                  <LayoutGrid className="h-4 w-4" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  aria-label="List view"
                  className={[
                    'p-2 transition-colors',
                    viewMode === 'list'
                      ? 'bg-[var(--color-accent-subtle)] text-[var(--color-accent)]'
                      : 'text-[var(--color-text-tertiary)] hover:bg-[var(--color-bg-secondary)]',
                  ].join(' ')}
                >
                  <List className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ── Resume Grid / List ── */}
        {isLoading ? (
          <div className={[
            viewMode === 'grid'
              ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4'
              : 'flex flex-col gap-3',
          ].join(' ')}>
            {Array.from({ length: 6 }).map((_, i) => (
              <ResumeCardSkeleton key={i} viewMode={viewMode} />
            ))}
          </div>
        ) : filteredResumes.length === 0 ? (
          search ? (
            <EmptyState
              icon={<Search className="h-12 w-12" />}
              title="No resumes found"
              description={`No resumes match "${search}". Try a different search term.`}
              action={
                <Button variant="secondary" onClick={() => setSearch('')}>
                  Clear search
                </Button>
              }
            />
          ) : (
            <EmptyState
              icon={<FileText className="h-12 w-12" />}
              title="No resumes yet"
              description="Create your first resume to get started. It takes less than 5 minutes."
              action={
                <Button leftIcon={<Plus className="h-4 w-4" />} onClick={() => setCreateOpen(true)}>
                  Create your first resume
                </Button>
              }
            />
          )
        ) : (
          <motion.div
            layout
            className={[
              viewMode === 'grid'
                ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4'
                : 'flex flex-col gap-3',
            ].join(' ')}
          >
            <AnimatePresence mode="popLayout">
              {filteredResumes.map((resume) => (
                <motion.div
                  key={resume.id}
                  layout
                  initial={{ opacity: 0, scale: 0.97 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.97 }}
                  transition={{ duration: 0.18 }}
                >
                  <ResumeCard
                    resume={resume}
                    viewMode={viewMode}
                    onEdit={() => handleEdit(resume.id)}
                    onPreview={() => handlePreview(resume.id)}
                    onDuplicate={() => handleDuplicate(resume)}
                    onRename={() => setRenameTarget(resume)}
                    onDelete={() => setDeleteTarget(resume)}
                    onToggleFavorite={() => handleToggleFavorite(resume)}
                    onShare={() => handleShare(resume)}
                    onExport={(format) => handleExport(resume, format)}
                    onDownload={(format) => handleExport(resume, format)}
                  />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}

      {/* ── Modals ── */}
      <CreateResumeModal
        isOpen={createOpen}
        onClose={() => setCreateOpen(false)}
        onCreate={handleCreate}
      />

      <RenameResumeModal
        resume={renameTarget}
        onClose={() => setRenameTarget(null)}
        onRename={handleRename}
      />

      <DeleteResumeModal
        resume={deleteTarget}
        onClose={() => setDeleteTarget(null)}
        onDelete={handleDelete}
      />
      </Container>
    </AppLayout>
  )
}
