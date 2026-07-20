import { useState } from 'react'
import { Plus, ChevronDown, ChevronUp, Trash2 } from 'lucide-react'
import { useResumeBuilderStore } from '@/store/resume-builder.store'
import { Input } from '@/components/ui/Input'
import { Textarea } from '@/components/ui/Textarea'
import { Button } from '@/components/ui/Button'

export function PublicationsSection() {
  const entries = useResumeBuilderStore((s) => s.resume?.data.publications ?? [])
  const { addPublication, updatePublication, removePublication } = useResumeBuilderStore()
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
              {entry.title || 'New publication'}
            </button>
            <div className="flex items-center gap-1 shrink-0">
              <button onClick={() => removePublication(entry.id)} className="p-1 text-[var(--color-text-tertiary)] hover:text-[var(--color-error)] opacity-0 group-hover:opacity-100">
                <Trash2 className="h-3.5 w-3.5" />
              </button>
              <button onClick={() => setExpandedId((p) => p === entry.id ? null : entry.id)} className="p-1 text-[var(--color-text-tertiary)]">
                {expandedId === entry.id ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
              </button>
            </div>
          </div>
          {expandedId === entry.id && (
            <div className="p-3 space-y-3 border-t border-[var(--color-border)] bg-[var(--color-bg-secondary)]">
              <Input label="Publication title" placeholder="Measuring What Matters" value={entry.title} onChange={(e) => updatePublication(entry.id, { title: e.target.value })} />
              <Input label="Publisher" placeholder="Product Coalition" value={entry.publisher} onChange={(e) => updatePublication(entry.id, { publisher: e.target.value })} />
              <div className="grid grid-cols-2 gap-3">
                <Input label="Date" type="month" value={entry.date} onChange={(e) => updatePublication(entry.id, { date: e.target.value })} />
                <Input label="Link" type="url" placeholder="https://…" value={entry.url} onChange={(e) => updatePublication(entry.id, { url: e.target.value })} />
              </div>
              <Textarea label="Description" placeholder="Brief summary of the publication" value={entry.description} onChange={(e) => updatePublication(entry.id, { description: e.target.value })} minRows={2} />
            </div>
          )}
        </div>
      ))}
      <Button variant="secondary" size="sm" fullWidth leftIcon={<Plus className="h-3.5 w-3.5" />} onClick={addPublication}>
        Add publication
      </Button>
    </div>
  )
}
