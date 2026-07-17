/**
 * ExperienceSection — work experience entries with add/remove/reorder.
 */

import { useState } from 'react'
import { Plus, ChevronDown, ChevronUp, Trash2 } from 'lucide-react'
import { useResumeBuilderStore } from '@/store/resume-builder.store'
import { Input } from '@/components/ui/Input'
import { Textarea } from '@/components/ui/Textarea'
import { Button } from '@/components/ui/Button'
import { Switch } from '@/components/ui/Switch'
import type { ExperienceEntry } from '@/types/resume'

export function ExperienceSection() {
  const entries = useResumeBuilderStore((s) => s.resume?.data.experience ?? [])
  const { addExperience, updateExperience, removeExperience } = useResumeBuilderStore()
  const [expandedId, setExpandedId] = useState<string | null>(entries[0]?.id ?? null)

  return (
    <div className="p-4 space-y-2">
      {entries.map((entry) => (
        <ExperienceEntryForm
          key={entry.id}
          entry={entry}
          isExpanded={expandedId === entry.id}
          onToggle={() => setExpandedId((prev) => prev === entry.id ? null : entry.id)}
          onUpdate={(updates) => updateExperience(entry.id, updates)}
          onRemove={() => {
            removeExperience(entry.id)
            if (expandedId === entry.id) setExpandedId(null)
          }}
        />
      ))}

      <Button
        variant="secondary"
        size="sm"
        fullWidth
        leftIcon={<Plus className="h-3.5 w-3.5" />}
        onClick={() => {
          addExperience()
        }}
      >
        Add experience
      </Button>
    </div>
  )
}

type EntryFormProps = {
  entry: ExperienceEntry
  isExpanded: boolean
  onToggle: () => void
  onUpdate: (updates: Partial<ExperienceEntry>) => void
  onRemove: () => void
}

function ExperienceEntryForm({ entry, isExpanded, onToggle, onUpdate, onRemove }: EntryFormProps) {
  const label = entry.company || entry.position || 'New experience'

  return (
    <div className="border border-[var(--color-border)] rounded-[var(--radius-md)] overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between p-3 bg-[var(--color-bg-primary)] group">
        <button
          className="flex-1 text-left text-sm font-medium text-[var(--color-text-primary)] truncate"
          onClick={onToggle}
          aria-expanded={isExpanded}
        >
          {label}
        </button>
        <div className="flex items-center gap-1 shrink-0">
          <button
            onClick={onRemove}
            className="p-1 text-[var(--color-text-tertiary)] hover:text-[var(--color-error)] transition-colors opacity-0 group-hover:opacity-100"
            aria-label="Remove"
          >
            <Trash2 className="h-3.5 w-3.5" />
          </button>
          <button onClick={onToggle} className="p-1 text-[var(--color-text-tertiary)]">
            {isExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
          </button>
        </div>
      </div>

      {/* Form */}
      {isExpanded && (
        <div className="p-3 space-y-3 border-t border-[var(--color-border)] bg-[var(--color-bg-secondary)]">
          <Input
            label="Job title"
            placeholder="Senior Software Engineer"
            value={entry.position}
            onChange={(e) => onUpdate({ position: e.target.value })}
          />
          <Input
            label="Company"
            placeholder="Acme Corp"
            value={entry.company}
            onChange={(e) => onUpdate({ company: e.target.value })}
          />
          <Input
            label="Location"
            placeholder="San Francisco, CA or Remote"
            value={entry.location}
            onChange={(e) => onUpdate({ location: e.target.value })}
          />

          <div className="grid grid-cols-2 gap-3">
            <Input
              label="Start date"
              type="month"
              value={entry.dateRange.startDate}
              onChange={(e) => onUpdate({ dateRange: { ...entry.dateRange, startDate: e.target.value } })}
            />
            {!entry.dateRange.current && (
              <Input
                label="End date"
                type="month"
                value={entry.dateRange.endDate ?? ''}
                onChange={(e) => onUpdate({ dateRange: { ...entry.dateRange, endDate: e.target.value || null } })}
              />
            )}
          </div>

          <Switch
            checked={entry.dateRange.current}
            onChange={(checked) =>
              onUpdate({ dateRange: { ...entry.dateRange, current: checked, endDate: checked ? null : entry.dateRange.endDate } })
            }
            label="I currently work here"
          />

          <Textarea
            label="Description"
            placeholder="Describe your responsibilities and key contributions…"
            value={entry.description}
            onChange={(e) => onUpdate({ description: e.target.value })}
            minRows={3}
            maxRows={8}
            helperText="Use bullet points to highlight achievements"
          />
        </div>
      )}
    </div>
  )
}
