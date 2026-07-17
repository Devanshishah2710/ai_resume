import { Plus, Trash2 } from 'lucide-react'
import { useResumeBuilderStore } from '@/store/resume-builder.store'
import { Input } from '@/components/ui/Input'
import { Button } from '@/components/ui/Button'

export function SkillsSection() {
  const skills = useResumeBuilderStore((s) => s.resume?.data.skills ?? [])
  const { addSkillCategory, updateSkillCategory, removeSkillCategory } = useResumeBuilderStore()

  return (
    <div className="p-4 space-y-3">
      {skills.map((cat) => (
        <div key={cat.id} className="border border-[var(--color-border)] rounded-[var(--radius-md)] p-3 space-y-2 bg-[var(--color-bg-primary)] group">
          <div className="flex items-center gap-2">
            <Input
              placeholder="Category (e.g. Frontend)"
              value={cat.name}
              onChange={(e) => updateSkillCategory(cat.id, { name: e.target.value })}
              className="flex-1"
            />
            <button onClick={() => removeSkillCategory(cat.id)} className="p-1.5 text-[var(--color-text-tertiary)] hover:text-[var(--color-error)] opacity-0 group-hover:opacity-100 transition-all shrink-0">
              <Trash2 className="h-4 w-4" />
            </button>
          </div>
          <Input
            placeholder="React, TypeScript, Node.js (comma-separated)"
            value={cat.skills.join(', ')}
            onChange={(e) => updateSkillCategory(cat.id, { skills: e.target.value.split(',').map(s => s.trim()).filter(Boolean) })}
          />
        </div>
      ))}
      <Button variant="secondary" size="sm" fullWidth leftIcon={<Plus className="h-3.5 w-3.5" />} onClick={addSkillCategory}>
        Add skill category
      </Button>
    </div>
  )
}
