import { useState } from 'react'
import { Plus, ChevronDown, ChevronUp, Trash2 } from 'lucide-react'
import { useResumeBuilderStore } from '@/store/resume-builder.store'
import { Input } from '@/components/ui/Input'
import { Textarea } from '@/components/ui/Textarea'
import { Button } from '@/components/ui/Button'
import type { ProjectEntry } from '@/types/resume'

export function ProjectsSection() {
  const entries = useResumeBuilderStore((s) => s.resume?.data.projects ?? [])
  const { addProject, updateProject, removeProject } = useResumeBuilderStore()
  const [expandedId, setExpandedId] = useState<string | null>(entries[0]?.id ?? null)

  return (
    <div className="p-4 space-y-2">
      {entries.map((entry) => (
        <ProjectForm
          key={entry.id}
          entry={entry}
          isExpanded={expandedId === entry.id}
          onToggle={() => setExpandedId((p) => p === entry.id ? null : entry.id)}
          onUpdate={(u) => updateProject(entry.id, u)}
          onRemove={() => { removeProject(entry.id); if (expandedId === entry.id) setExpandedId(null) }}
        />
      ))}
      <Button variant="secondary" size="sm" fullWidth leftIcon={<Plus className="h-3.5 w-3.5" />} onClick={addProject}>
        Add project
      </Button>
    </div>
  )
}

type Props = { entry: ProjectEntry; isExpanded: boolean; onToggle: () => void; onUpdate: (u: Partial<ProjectEntry>) => void; onRemove: () => void }

function ProjectForm({ entry, isExpanded, onToggle, onUpdate, onRemove }: Props) {
  return (
    <div className="border border-[var(--color-border)] rounded-[var(--radius-md)] overflow-hidden">
      <div className="flex items-center justify-between p-3 bg-[var(--color-bg-primary)] group">
        <button className="flex-1 text-left text-sm font-medium text-[var(--color-text-primary)] truncate" onClick={onToggle}>{entry.name || 'New project'}</button>
        <div className="flex items-center gap-1 shrink-0">
          <button onClick={onRemove} className="p-1 text-[var(--color-text-tertiary)] hover:text-[var(--color-error)] opacity-0 group-hover:opacity-100"><Trash2 className="h-3.5 w-3.5" /></button>
          <button onClick={onToggle} className="p-1 text-[var(--color-text-tertiary)]">{isExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}</button>
        </div>
      </div>
      {isExpanded && (
        <div className="p-3 space-y-3 border-t border-[var(--color-border)] bg-[var(--color-bg-secondary)]">
          <Input label="Project name" placeholder="ResumeForge" value={entry.name} onChange={(e) => onUpdate({ name: e.target.value })} />
          <Textarea label="Description" placeholder="What did you build and what impact did it have?" value={entry.description} onChange={(e) => onUpdate({ description: e.target.value })} minRows={3} />
          <Input label="Technologies" placeholder="React, TypeScript, Supabase" value={entry.technologies.join(', ')} onChange={(e) => onUpdate({ technologies: e.target.value.split(',').map(t => t.trim()).filter(Boolean) })} helperText="Comma-separated" />
          <Input label="Live URL" type="url" placeholder="https://resumeforge.app" value={entry.url} onChange={(e) => onUpdate({ url: e.target.value })} />
          <Input label="GitHub URL" type="url" placeholder="https://github.com/user/project" value={entry.githubUrl} onChange={(e) => onUpdate({ githubUrl: e.target.value })} />
        </div>
      )}
    </div>
  )
}
