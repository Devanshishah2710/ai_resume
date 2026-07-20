import { useState } from 'react'
import { Plus, ChevronDown, ChevronUp, Trash2 } from 'lucide-react'
import { useResumeBuilderStore } from '@/store/resume-builder.store'
import { Input } from '@/components/ui/Input'
import { Textarea } from '@/components/ui/Textarea'
import { Button } from '@/components/ui/Button'

export function AwardsSection() {
  const entries = useResumeBuilderStore((s) => s.resume?.data.awards ?? [])
  const { addAward, updateAward, removeAward } = useResumeBuilderStore()
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
              {entry.title || 'New award'}
            </button>
            <div className="flex items-center gap-1 shrink-0">
              <button onClick={() => removeAward(entry.id)} className="p-1 text-[var(--color-text-tertiary)] hover:text-[var(--color-error)] opacity-0 group-hover:opacity-100">
                <Trash2 className="h-3.5 w-3.5" />
              </button>
              <button onClick={() => setExpandedId((p) => p === entry.id ? null : entry.id)} className="p-1 text-[var(--color-text-tertiary)]">
                {expandedId === entry.id ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
              </button>
            </div>
          </div>
          {expandedId === entry.id && (
            <div className="p-3 space-y-3 border-t border-[var(--color-border)] bg-[var(--color-bg-secondary)]">
              <Input label="Award title" placeholder="Employee of the Year" value={entry.title} onChange={(e) => updateAward(entry.id, { title: e.target.value })} />
              <Input label="Organization" placeholder="Acme Corp" value={entry.issuer} onChange={(e) => updateAward(entry.id, { issuer: e.target.value })} />
              <Input label="Date" type="month" value={entry.date} onChange={(e) => updateAward(entry.id, { date: e.target.value })} />
              <Textarea label="Description" placeholder="What was the award for?" value={entry.description} onChange={(e) => updateAward(entry.id, { description: e.target.value })} minRows={2} />
            </div>
          )}
        </div>
      ))}
      <Button variant="secondary" size="sm" fullWidth leftIcon={<Plus className="h-3.5 w-3.5" />} onClick={addAward}>
        Add award
      </Button>
    </div>
  )
}
