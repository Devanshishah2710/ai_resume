import { Plus, Trash2 } from 'lucide-react'
import { useResumeBuilderStore } from '@/store/resume-builder.store'
import { Input } from '@/components/ui/Input'
import { Button } from '@/components/ui/Button'

export function InterestsSection() {
  const entries = useResumeBuilderStore((s) => s.resume?.data.interests ?? [])
  const { addInterest, updateInterest, removeInterest } = useResumeBuilderStore()

  return (
    <div className="p-4 space-y-2">
      {entries.map((entry) => (
        <div key={entry.id} className="flex items-end gap-2 group">
          <Input
            label="Interest"
            placeholder="Photography"
            value={entry.name}
            onChange={(e) => updateInterest(entry.id, { name: e.target.value })}
            className="flex-1"
          />
          <button
            onClick={() => removeInterest(entry.id)}
            className="mb-0.5 p-2 text-[var(--color-text-tertiary)] hover:text-[var(--color-error)] opacity-0 group-hover:opacity-100 transition-all"
            aria-label="Remove interest"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
      ))}
      <Button variant="secondary" size="sm" fullWidth leftIcon={<Plus className="h-3.5 w-3.5" />} onClick={addInterest}>
        Add interest
      </Button>
    </div>
  )
}
