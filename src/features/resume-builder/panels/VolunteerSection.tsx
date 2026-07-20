import { useState } from 'react'
import { Plus, ChevronDown, ChevronUp, Trash2 } from 'lucide-react'
import { useResumeBuilderStore } from '@/store/resume-builder.store'
import { Input } from '@/components/ui/Input'
import { Textarea } from '@/components/ui/Textarea'
import { Button } from '@/components/ui/Button'
import { Switch } from '@/components/ui/Switch'
import type { VolunteerEntry } from '@/types/resume'

export function VolunteerSection() {
  const entries = useResumeBuilderStore((s) => s.resume?.data.volunteer ?? [])
  const { addVolunteer, updateVolunteer, removeVolunteer } = useResumeBuilderStore()
  const [expandedId, setExpandedId] = useState<string | null>(null)

  return (
    <div className="p-4 space-y-2">
      {entries.map((entry) => (
        <VolunteerEntryForm
          key={entry.id}
          entry={entry}
          isExpanded={expandedId === entry.id}
          onToggle={() => setExpandedId((prev) => prev === entry.id ? null : entry.id)}
          onUpdate={(updates) => updateVolunteer(entry.id, updates)}
          onRemove={() => {
            removeVolunteer(entry.id)
            if (expandedId === entry.id) setExpandedId(null)
          }}
        />
      ))}
      <Button variant="secondary" size="sm" fullWidth leftIcon={<Plus className="h-3.5 w-3.5" />} onClick={addVolunteer}>
        Add volunteer experience
      </Button>
    </div>
  )
}

type EntryFormProps = {
  entry: VolunteerEntry
  isExpanded: boolean
  onToggle: () => void
  onUpdate: (updates: Partial<VolunteerEntry>) => void
  onRemove: () => void
}

function VolunteerEntryForm({ entry, isExpanded, onToggle, onUpdate, onRemove }: EntryFormProps) {
  const label = entry.role || entry.organization || 'New volunteer experience'

  return (
    <div className="border border-[var(--color-border)] rounded-[var(--radius-md)] overflow-hidden">
      <div className="flex items-center justify-between p-3 bg-[var(--color-bg-primary)] group">
        <button className="flex-1 text-left text-sm font-medium text-[var(--color-text-primary)] truncate" onClick={onToggle} aria-expanded={isExpanded}>
          {label}
        </button>
        <div className="flex items-center gap-1 shrink-0">
          <button onClick={onRemove} className="p-1 text-[var(--color-text-tertiary)] hover:text-[var(--color-error)] opacity-0 group-hover:opacity-100" aria-label="Remove">
            <Trash2 className="h-3.5 w-3.5" />
          </button>
          <button onClick={onToggle} className="p-1 text-[var(--color-text-tertiary)]">
            {isExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
          </button>
        </div>
      </div>
      {isExpanded && (
        <div className="p-3 space-y-3 border-t border-[var(--color-border)] bg-[var(--color-bg-secondary)]">
          <Input label="Organization" placeholder="Girls Who Code" value={entry.organization} onChange={(e) => onUpdate({ organization: e.target.value })} />
          <Input label="Role" placeholder="Mentor" value={entry.role} onChange={(e) => onUpdate({ role: e.target.value })} />
          <Input label="Location" placeholder="San Francisco, CA or Remote" value={entry.location} onChange={(e) => onUpdate({ location: e.target.value })} />
          <div className="grid grid-cols-2 gap-3">
            <Input label="Start date" type="month" value={entry.dateRange.startDate} onChange={(e) => onUpdate({ dateRange: { ...entry.dateRange, startDate: e.target.value } })} />
            {!entry.dateRange.current && (
              <Input label="End date" type="month" value={entry.dateRange.endDate ?? ''} onChange={(e) => onUpdate({ dateRange: { ...entry.dateRange, endDate: e.target.value || null } })} />
            )}
          </div>
          <Switch
            checked={entry.dateRange.current}
            onChange={(checked) => onUpdate({ dateRange: { ...entry.dateRange, current: checked, endDate: checked ? null : entry.dateRange.endDate } })}
            label="I currently volunteer here"
          />
          <Textarea label="Description" placeholder="Describe your contributions…" value={entry.description} onChange={(e) => onUpdate({ description: e.target.value })} minRows={3} maxRows={8} />
        </div>
      )}
    </div>
  )
}
