import { Plus, Trash2 } from 'lucide-react'
import { useResumeBuilderStore } from '@/store/resume-builder.store'
import { Input } from '@/components/ui/Input'
import { Select } from '@/components/ui/Select'
import { Textarea } from '@/components/ui/Textarea'
import { Button } from '@/components/ui/Button'
import { LANGUAGE_PROFICIENCY_LABELS } from '@/constants'

const PROFICIENCY_OPTIONS = Object.entries(LANGUAGE_PROFICIENCY_LABELS).map(([value, label]) => ({ value, label }))

export function LanguagesSection() {
  const entries = useResumeBuilderStore((s) => s.resume?.data.languages ?? [])
  const { addLanguage, updateLanguage, removeLanguage } = useResumeBuilderStore()

  return (
    <div className="p-4 space-y-2">
      {entries.map((entry) => (
        <div key={entry.id} className="flex items-end gap-2 group">
          <Input
            label="Language"
            placeholder="English"
            value={entry.language}
            onChange={(e) => updateLanguage(entry.id, { language: e.target.value })}
            className="flex-1"
          />
          <Select
            label="Level"
            value={entry.proficiency}
            onChange={(e) => updateLanguage(entry.id, { proficiency: e.target.value as typeof entry.proficiency })}
            options={PROFICIENCY_OPTIONS}
            className="flex-1"
          />
          <button
            onClick={() => removeLanguage(entry.id)}
            className="mb-0.5 p-2 text-[var(--color-text-tertiary)] hover:text-[var(--color-error)] opacity-0 group-hover:opacity-100 transition-all"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
      ))}
      <Button variant="secondary" size="sm" fullWidth leftIcon={<Plus className="h-3.5 w-3.5" />} onClick={addLanguage}>
        Add language
      </Button>
    </div>
  )
}

export function AchievementsSection() {
  const entries = useResumeBuilderStore((s) => s.resume?.data.achievements ?? [])
  const { addAchievement, updateAchievement, removeAchievement } = useResumeBuilderStore()

  return (
    <div className="p-4 space-y-3">
      {entries.map((entry) => (
        <div key={entry.id} className="border border-[var(--color-border)] rounded-[var(--radius-md)] p-3 space-y-2 bg-[var(--color-bg-primary)] group">
          <div className="flex items-center gap-2">
            <Input
              placeholder="Achievement title"
              value={entry.title}
              onChange={(e) => updateAchievement(entry.id, { title: e.target.value })}
              className="flex-1"
            />
            <button onClick={() => removeAchievement(entry.id)} className="p-1.5 text-[var(--color-text-tertiary)] hover:text-[var(--color-error)] opacity-0 group-hover:opacity-100 shrink-0">
              <Trash2 className="h-4 w-4" />
            </button>
          </div>
          <Input label="Date" type="month" value={entry.date} onChange={(e) => updateAchievement(entry.id, { date: e.target.value })} />
          <Textarea
            label="Description"
            placeholder="Describe what you achieved and its impact…"
            value={entry.description}
            onChange={(e) => updateAchievement(entry.id, { description: e.target.value })}
            minRows={2}
          />
        </div>
      ))}
      <Button variant="secondary" size="sm" fullWidth leftIcon={<Plus className="h-3.5 w-3.5" />} onClick={addAchievement}>
        Add achievement
      </Button>
    </div>
  )
}

type CustomSectionProps = { sectionId: string }

export function CustomSection({ sectionId }: CustomSectionProps) {
  const sections = useResumeBuilderStore((s) => s.resume?.sections ?? [])
  const custom = useResumeBuilderStore((s) => s.resume?.data.custom)
  const { addCustomEntry, updateCustomEntry, removeCustomEntry, updateSectionLabel } = useResumeBuilderStore()

  const section = sections.find((s) => s.id === sectionId)
  const customId = section?.customId
  const data = customId ? custom?.[customId] : null

  if (!section || !data) return null

  return (
    <div className="p-4 space-y-3">
      <Input
        label="Section title"
        value={section.label}
        onChange={(e) => updateSectionLabel(sectionId, e.target.value)}
        placeholder="Custom Section"
      />

      {data.entries.map((entry) => (
        <div key={entry.id} className="border border-[var(--color-border)] rounded-[var(--radius-md)] p-3 space-y-2 bg-[var(--color-bg-primary)] group">
          <div className="flex items-center gap-2">
            <Input
              placeholder="Title"
              value={entry.title}
              onChange={(e) => updateCustomEntry(sectionId, entry.id, { title: e.target.value })}
              className="flex-1"
            />
            <button onClick={() => removeCustomEntry(sectionId, entry.id)} className="p-1.5 text-[var(--color-text-tertiary)] hover:text-[var(--color-error)] opacity-0 group-hover:opacity-100 shrink-0">
              <Trash2 className="h-4 w-4" />
            </button>
          </div>
          <Input placeholder="Subtitle" value={entry.subtitle} onChange={(e) => updateCustomEntry(sectionId, entry.id, { subtitle: e.target.value })} />
          <Input label="Date" type="month" value={entry.date} onChange={(e) => updateCustomEntry(sectionId, entry.id, { date: e.target.value })} />
          <Textarea
            label="Description"
            placeholder="Details…"
            value={entry.description}
            onChange={(e) => updateCustomEntry(sectionId, entry.id, { description: e.target.value })}
            minRows={2}
          />
        </div>
      ))}

      <Button variant="secondary" size="sm" fullWidth leftIcon={<Plus className="h-3.5 w-3.5" />} onClick={() => addCustomEntry(sectionId)}>
        Add entry
      </Button>
    </div>
  )
}
