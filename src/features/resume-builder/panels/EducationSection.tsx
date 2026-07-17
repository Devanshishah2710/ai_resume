/**
 * Education section form.
 */

import { useState } from 'react'
import { Plus, ChevronDown, ChevronUp, Trash2 } from 'lucide-react'
import { useResumeBuilderStore } from '@/store/resume-builder.store'
import { Input } from '@/components/ui/Input'
import { Textarea } from '@/components/ui/Textarea'
import { Button } from '@/components/ui/Button'
import type { EducationEntry } from '@/types/resume'

export function EducationSection() {
  const entries = useResumeBuilderStore((s) => s.resume?.data.education ?? [])
  const { addEducation, updateEducation, removeEducation } = useResumeBuilderStore()
  const [expandedId, setExpandedId] = useState<string | null>(entries[0]?.id ?? null)

  return (
    <div className="p-4 space-y-2">
      {entries.map((entry) => (
        <EducationEntryForm
          key={entry.id}
          entry={entry}
          isExpanded={expandedId === entry.id}
          onToggle={() => setExpandedId((p) => p === entry.id ? null : entry.id)}
          onUpdate={(u) => updateEducation(entry.id, u)}
          onRemove={() => { removeEducation(entry.id); if (expandedId === entry.id) setExpandedId(null) }}
        />
      ))}
      <Button variant="secondary" size="sm" fullWidth leftIcon={<Plus className="h-3.5 w-3.5" />} onClick={addEducation}>
        Add education
      </Button>
    </div>
  )
}

type EduProps = {
  entry: EducationEntry
  isExpanded: boolean
  onToggle: () => void
  onUpdate: (u: Partial<EducationEntry>) => void
  onRemove: () => void
}

function EducationEntryForm({ entry, isExpanded, onToggle, onUpdate, onRemove }: EduProps) {
  return (
    <div className="border border-[var(--color-border)] rounded-[var(--radius-md)] overflow-hidden">
      <div className="flex items-center justify-between p-3 bg-[var(--color-bg-primary)] group">
        <button className="flex-1 text-left text-sm font-medium text-[var(--color-text-primary)] truncate" onClick={onToggle} aria-expanded={isExpanded}>
          {entry.institution || entry.degree || 'New education'}
        </button>
        <div className="flex items-center gap-1 shrink-0">
          <button onClick={onRemove} className="p-1 text-[var(--color-text-tertiary)] hover:text-[var(--color-error)] transition-colors opacity-0 group-hover:opacity-100"><Trash2 className="h-3.5 w-3.5" /></button>
          <button onClick={onToggle} className="p-1 text-[var(--color-text-tertiary)]">
            {isExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
          </button>
        </div>
      </div>
      {isExpanded && (
        <div className="p-3 space-y-3 border-t border-[var(--color-border)] bg-[var(--color-bg-secondary)]">
          <Input label="Institution" placeholder="MIT" value={entry.institution} onChange={(e) => onUpdate({ institution: e.target.value })} />
          <div className="grid grid-cols-2 gap-3">
            <Input label="Degree" placeholder="Bachelor's" value={entry.degree} onChange={(e) => onUpdate({ degree: e.target.value })} />
            <Input label="Field of study" placeholder="Computer Science" value={entry.field} onChange={(e) => onUpdate({ field: e.target.value })} />
          </div>
          <Input label="Location" placeholder="Cambridge, MA" value={entry.location} onChange={(e) => onUpdate({ location: e.target.value })} />
          <div className="grid grid-cols-2 gap-3">
            <Input label="Start date" type="month" value={entry.dateRange.startDate} onChange={(e) => onUpdate({ dateRange: { ...entry.dateRange, startDate: e.target.value } })} />
            <Input label="End date" type="month" value={entry.dateRange.endDate ?? ''} onChange={(e) => onUpdate({ dateRange: { ...entry.dateRange, endDate: e.target.value || null } })} />
          </div>
          <Input label="GPA (optional)" placeholder="3.9 / 4.0" value={entry.gpa} onChange={(e) => onUpdate({ gpa: e.target.value })} />
          <Textarea label="Additional details" placeholder="Relevant coursework, honors, activities…" value={entry.description} onChange={(e) => onUpdate({ description: e.target.value })} minRows={2} />
        </div>
      )}
    </div>
  )
}
