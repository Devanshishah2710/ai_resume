/**
 * Dashboard modals — Create, Rename, Delete resume confirmation.
 * All three live here since they're tightly coupled to dashboard actions.
 */

import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { AlertTriangle } from 'lucide-react'
import { Modal } from '@/components/ui/Modal'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import type { Resume } from '@/types/resume'

// ─── Create Resume Modal ──────────────────────────────────────────────────────

type CreateResumeModalProps = {
  isOpen: boolean
  onClose: () => void
  onCreate: (title: string, templateId: string) => Promise<void>
}

type CreateFormValues = { title: string }

export function CreateResumeModal({ isOpen, onClose, onCreate }: CreateResumeModalProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<CreateFormValues>({ defaultValues: { title: 'My Resume' } })

  useEffect(() => {
    if (isOpen) reset({ title: 'My Resume' })
  }, [isOpen, reset])

  const onSubmit = async ({ title }: CreateFormValues) => {
    await onCreate(title.trim(), 'classic-professional')
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Create new resume" size="sm">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <Input
          label="Resume title"
          placeholder="e.g. Software Engineer Resume"
          autoFocus
          error={errors.title?.message}
          helperText="You can rename this at any time"
          {...register('title', {
            required: 'Title is required',
            maxLength: { value: 100, message: 'Title must be under 100 characters' },
            validate: (v) => v.trim().length > 0 || 'Title cannot be empty',
          })}
        />
        <div className="flex justify-end gap-2 pt-2">
          <Button variant="secondary" type="button" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit" isLoading={isSubmitting}>
            Create resume
          </Button>
        </div>
      </form>
    </Modal>
  )
}

// ─── Rename Resume Modal ──────────────────────────────────────────────────────

type RenameResumeModalProps = {
  resume: Resume | null
  onClose: () => void
  onRename: (resume: Resume, newTitle: string) => Promise<void>
}

type RenameFormValues = { title: string }

export function RenameResumeModal({ resume, onClose, onRename }: RenameResumeModalProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<RenameFormValues>()

  useEffect(() => {
    if (resume) reset({ title: resume.title })
  }, [resume, reset])

  const onSubmit = async ({ title }: RenameFormValues) => {
    if (!resume) return
    await onRename(resume, title.trim())
    onClose()
  }

  return (
    <Modal isOpen={!!resume} onClose={onClose} title="Rename resume" size="sm">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <Input
          label="Resume title"
          autoFocus
          error={errors.title?.message}
          {...register('title', {
            required: 'Title is required',
            maxLength: { value: 100, message: 'Title must be under 100 characters' },
            validate: (v) => v.trim().length > 0 || 'Title cannot be empty',
          })}
        />
        <div className="flex justify-end gap-2 pt-2">
          <Button variant="secondary" type="button" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit" isLoading={isSubmitting}>
            Save
          </Button>
        </div>
      </form>
    </Modal>
  )
}

// ─── Delete Resume Modal ──────────────────────────────────────────────────────

type DeleteResumeModalProps = {
  resume: Resume | null
  onClose: () => void
  onDelete: (resume: Resume) => Promise<void>
}

export function DeleteResumeModal({ resume, onClose, onDelete }: DeleteResumeModalProps) {
  const [isDeleting, setIsDeleting] = useState(false)

  const handleDelete = async () => {
    if (!resume) return
    setIsDeleting(true)
    try {
      await onDelete(resume)
      onClose()
    } finally {
      setIsDeleting(false)
    }
  }

  return (
    <Modal isOpen={!!resume} onClose={onClose} title="Delete resume" size="sm">
      <div className="space-y-4">
        <div className="flex items-start gap-3 p-3 rounded-[var(--radius-md)] bg-[var(--color-error-subtle)] border border-[var(--color-error)]/20">
          <AlertTriangle className="h-5 w-5 text-[var(--color-error)] shrink-0 mt-0.5" />
          <p className="text-sm text-[var(--color-error)]">
            <span className="font-semibold">"{resume?.title}"</span> will be permanently deleted.
            This action cannot be undone.
          </p>
        </div>
        <div className="flex justify-end gap-2">
          <Button variant="secondary" onClick={onClose} disabled={isDeleting}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleDelete} isLoading={isDeleting}>
            Delete resume
          </Button>
        </div>
      </div>
    </Modal>
  )
}
