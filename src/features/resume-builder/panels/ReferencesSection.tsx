import { useState } from 'react'
import { Plus, ChevronDown, ChevronUp, Trash2 } from 'lucide-react'
import { useResumeBuilderStore } from '@/store/resume-builder.store'
import { Input } from '@/components/ui/Input'
import { Button } from '@/components/ui/Button'

export function ReferencesSection() {
  const entries = useResumeBuilderStore((s) => s.resume?.data.references ?? [])
  const { addReference, updateReference, removeReference } = useResumeBuilderStore()
  const [expandedId, setExpandedId] = useState<string | null>(null)

  return (
    <div className="p-4 space-y-2">
      {entries.map((entry) => (
        <div key={entry.id} className="border border-[var(--color-border)] rounded-[var(--radius-md)] overflow-hidden">
          <div className="flex items-center justify-between p-3 bg-[var(--color-bg-primary)] group">
            <button
              className="flex-1 text-left text-sm font-medium text-[var(--color-text-primary)] truncate"
              onClick={() => setExpandedId((p) => p === entry.id ? null : entry.id)}
            >
              {entry.name || 'New reference'}
            </button>
            <div className="flex items-center gap-1 shrink-0">
              <button onClick={() => removeReference(entry.id)} className="p-1 text-[var(--color-text-tertiary)] hover:text-[var(--color-error)] opacity-0 group-hover:opacity-100">
                <Trash2 className="h-3.5 w-3.5" />
              </button>
              <button onClick={() => setExpandedId((p) => p === entry.id ? null : entry.id)} className="p-1 text-[var(--color-text-tertiary)]">
                {expandedId === entry.id ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
              </button>
            </div>
          </div>
          {expandedId === entry.id && (
            <div className="p-3 space-y-3 border-t border-[var(--color-border)] bg-[var(--color-bg-secondary)]">
              <Input label="Name" placeholder="Jane Doe" value={entry.name} onChange={(e) => updateReference(entry.id, { name: e.target.value })} />
              <div className="grid grid-cols-2 gap-3">
                <Input label="Job title" placeholder="VP of Product" value={entry.position} onChange={(e) => updateReference(entry.id, { position: e.target.value })} />
                <Input label="Company" placeholder="Acme Corp" value={entry.company} onChange={(e) => updateReference(entry.id, { company: e.target.value })} />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <Input label="Email" type="email" placeholder="jane@example.com" value={entry.email} onChange={(e) => updateReference(entry.id, { email: e.target.value })} />
                <Input label="Phone" placeholder="(415) 555-0148" value={entry.phone} onChange={(e) => updateReference(entry.id, { phone: e.target.value })} />
              </div>
              <Input label="Relationship" placeholder="Direct manager" value={entry.relationship} onChange={(e) => updateReference(entry.id, { relationship: e.target.value })} />
            </div>
          )}
        </div>
      ))}
      <Button variant="secondary" size="sm" fullWidth leftIcon={<Plus className="h-3.5 w-3.5" />} onClick={addReference}>
        Add reference
      </Button>
    </div>
  )
}
