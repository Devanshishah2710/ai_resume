/**
 * SectionsPanel — left sidebar sections tab.
 *
 * Shows a list of all sections. Clicking one expands its form.
 * Sections can be reordered via drag-and-drop (dnd-kit).
 * Sections can be toggled visible/hidden.
 * Custom sections can be added/removed.
 */

import { useState } from 'react'
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from '@dnd-kit/core'
import {
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
  arrayMove,
} from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import {
  GripVertical,
  ChevronDown,
  ChevronRight,
  Eye,
  EyeOff,
  Plus,
  Trash2,
} from 'lucide-react'
import { useResumeBuilderStore, useResumeSections } from '@/store/resume-builder.store'
import { Button } from '@/components/ui/Button'
import { Tooltip } from '@/components/ui/Tooltip'
import { PersonalSection } from '../panels/PersonalSection'
import { SummarySection } from '../panels/SummarySection'
import { ExperienceSection } from '../panels/ExperienceSection'
import { EducationSection } from '../panels/EducationSection'
import { ProjectsSection } from '../panels/ProjectsSection'
import { SkillsSection } from '../panels/SkillsSection'
import { CertificationsSection } from '../panels/CertificationsSection'
import { LanguagesSection } from '../panels/LanguagesSection'
import { AchievementsSection } from '../panels/LanguagesSection'
import { InterestsSection } from '../panels/InterestsSection'
import { AwardsSection } from '../panels/AwardsSection'
import { PublicationsSection } from '../panels/PublicationsSection'
import { ReferencesSection } from '../panels/ReferencesSection'
import { VolunteerSection } from '../panels/VolunteerSection'
import { CustomSection } from '../panels/CustomSection'
import type { SectionConfig } from '@/types/resume'

// ─── Section form registry ────────────────────────────────────────────────────

function SectionForm({ section }: { section: SectionConfig }) {
  switch (section.type) {
    case 'personal':        return <PersonalSection />
    case 'summary':         return <SummarySection />
    case 'experience':      return <ExperienceSection />
    case 'education':       return <EducationSection />
    case 'projects':        return <ProjectsSection />
    case 'skills':          return <SkillsSection />
    case 'certifications':  return <CertificationsSection />
    case 'languages':       return <LanguagesSection />
    case 'achievements':    return <AchievementsSection />
    case 'interests':       return <InterestsSection />
    case 'awards':          return <AwardsSection />
    case 'publications':    return <PublicationsSection />
    case 'references':      return <ReferencesSection />
    case 'volunteer':       return <VolunteerSection />
    case 'custom':          return <CustomSection sectionId={section.id} />
    default:                return null
  }
}

// ─── Sortable section row ─────────────────────────────────────────────────────

type SectionRowProps = {
  section: SectionConfig
  isExpanded: boolean
  onToggleExpand: () => void
}

function SortableSectionRow({ section, isExpanded, onToggleExpand }: SectionRowProps) {
  const { toggleSectionVisibility, removeCustomSection } = useResumeBuilderStore()

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: section.id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  }

  return (
    <div ref={setNodeRef} style={style} className="border-b border-[var(--color-border)] last:border-0">
      {/* Section header row */}
      <div
        className={[
          'flex items-center gap-2 px-3 py-2.5 group hover:bg-[var(--color-bg-secondary)] transition-colors',
          isExpanded ? 'bg-[var(--color-bg-secondary)]' : '',
        ].join(' ')}
      >
        {/* Drag handle */}
        <button
          {...attributes}
          {...listeners}
          className="text-[var(--color-text-tertiary)] hover:text-[var(--color-text-secondary)] cursor-grab active:cursor-grabbing shrink-0 touch-none"
          aria-label="Drag to reorder"
        >
          <GripVertical className="h-4 w-4" />
        </button>

        {/* Expand toggle */}
        <button
          className="flex-1 flex items-center gap-2 text-left min-w-0"
          onClick={onToggleExpand}
          aria-expanded={isExpanded}
        >
          <span className={[
            'text-sm font-medium truncate transition-colors',
            section.visible
              ? 'text-[var(--color-text-primary)]'
              : 'text-[var(--color-text-tertiary)]',
          ].join(' ')}>
            {section.label}
          </span>
          {isExpanded
            ? <ChevronDown className="h-3.5 w-3.5 text-[var(--color-text-tertiary)] shrink-0" />
            : <ChevronRight className="h-3.5 w-3.5 text-[var(--color-text-tertiary)] shrink-0" />
          }
        </button>

        {/* Visibility toggle */}
        <Tooltip content={section.visible ? 'Hide section' : 'Show section'}>
          <button
            onClick={(e) => { e.stopPropagation(); toggleSectionVisibility(section.id) }}
            className="text-[var(--color-text-tertiary)] hover:text-[var(--color-text-secondary)] transition-colors opacity-0 group-hover:opacity-100 shrink-0"
            aria-label={section.visible ? 'Hide section' : 'Show section'}
          >
            {section.visible
              ? <Eye className="h-3.5 w-3.5" />
              : <EyeOff className="h-3.5 w-3.5" />
            }
          </button>
        </Tooltip>

        {/* Remove custom section */}
        {section.type === 'custom' && (
          <Tooltip content="Remove section">
            <button
              onClick={(e) => { e.stopPropagation(); removeCustomSection(section.id) }}
              className="text-[var(--color-text-tertiary)] hover:text-[var(--color-error)] transition-colors opacity-0 group-hover:opacity-100 shrink-0"
              aria-label="Remove custom section"
            >
              <Trash2 className="h-3.5 w-3.5" />
            </button>
          </Tooltip>
        )}
      </div>

      {/* Expanded form */}
      {isExpanded && (
        <div className="bg-[var(--color-bg-secondary)] border-t border-[var(--color-border)]">
          <SectionForm section={section} />
        </div>
      )}
    </div>
  )
}

// ─── Main SectionsPanel ───────────────────────────────────────────────────────

export function SectionsPanel() {
  const sections = useResumeSections()
  const { reorderSections, addCustomSection } = useResumeBuilderStore()
  const [expandedId, setExpandedId] = useState<string | null>('personal')

  const sortedSections = [...sections].sort((a, b) => a.order - b.order)

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  )

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event
    if (!over || active.id === over.id) return

    const oldIndex = sortedSections.findIndex((s) => s.id === active.id)
    const newIndex = sortedSections.findIndex((s) => s.id === over.id)
    const reordered = arrayMove(sortedSections, oldIndex, newIndex).map((s, i) => ({
      ...s,
      order: i,
    }))
    reorderSections(reordered)
  }

  const toggleExpand = (id: string) => {
    setExpandedId((prev) => (prev === id ? null : id))
  }

  return (
    <div>
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext
          items={sortedSections.map((s) => s.id)}
          strategy={verticalListSortingStrategy}
        >
          {sortedSections.map((section) => (
            <SortableSectionRow
              key={section.id}
              section={section}
              isExpanded={expandedId === section.id}
              onToggleExpand={() => toggleExpand(section.id)}
            />
          ))}
        </SortableContext>
      </DndContext>

      {/* Add custom section */}
      <div className="p-3">
        <Button
          variant="secondary"
          size="sm"
          fullWidth
          leftIcon={<Plus className="h-3.5 w-3.5" />}
          onClick={addCustomSection}
        >
          Add custom section
        </Button>
      </div>
    </div>
  )
}
