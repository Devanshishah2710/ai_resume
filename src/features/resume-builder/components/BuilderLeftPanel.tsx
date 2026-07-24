/**
 * BuilderLeftPanel — the editing sidebar of the resume builder.
 *
 * Three tabs:
 *   1. Sections — drag-and-drop section list + active section form
 *   2. Design   — theme, fonts, colors, spacing
 *   3. Settings — metadata, visibility, template pick
 */

import { useResumeBuilderStore } from '@/store/resume-builder.store'
import { SectionsPanel } from './SectionsPanel'
import { DesignPanel } from './DesignPanel'
import { LayoutDashboard, Palette, Settings } from 'lucide-react'

const TABS = [
  { id: 'sections' as const, label: 'Sections', icon: LayoutDashboard },
  { id: 'design' as const, label: 'Design', icon: Palette },
  { id: 'settings' as const, label: 'Settings', icon: Settings },
]

export function BuilderLeftPanel() {
  const activePanel = useResumeBuilderStore((s) => s.activePanel)
  const setActivePanel = useResumeBuilderStore((s) => s.setActivePanel)

  return (
    <aside className="w-full lg:w-[var(--sidebar-width)] shrink-0 lg:shrink-0 flex flex-col border-r border-[var(--color-border)] bg-[var(--color-bg-elevated)] overflow-hidden">
      {/* Tab bar */}
      <div className="flex border-b border-[var(--color-border)] shrink-0">
        {TABS.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            onClick={() => setActivePanel(id)}
            className={[
              'flex-1 flex flex-col items-center gap-1 py-3 text-xs font-medium transition-colors',
              activePanel === id
                ? 'text-[var(--color-primary)] border-b-2 border-[var(--color-primary)] -mb-px'
                : 'text-[var(--color-text-tertiary)] hover:text-[var(--color-text-secondary)]',
            ].join(' ')}
            aria-selected={activePanel === id}
            role="tab"
          >
            <Icon className="h-4 w-4" />
            {label}
          </button>
        ))}
      </div>

      {/* Panel content */}
      <div className="flex-1 overflow-y-auto">
        {activePanel === 'sections' && <SectionsPanel />}
        {activePanel === 'design' && <DesignPanel />}
        {activePanel === 'settings' && <SettingsPanel />}
      </div>
    </aside>
  )
}

// ─── Inline Settings Panel ───────────────────────────────────────────────────

function SettingsPanel() {
  const resume = useResumeBuilderStore((s) => s.resume)
  const updateMetadata = useResumeBuilderStore((s) => s.updateMetadata)
  const setActivePanel = useResumeBuilderStore((s) => s.setActivePanel)

  return (
    <div className="p-4 space-y-5">
      <div>
        <h3 className="text-sm font-semibold text-[var(--color-text-primary)] mb-1">Template</h3>
        <p className="text-xs text-[var(--color-text-secondary)]">
          Current: <span className="font-medium capitalize">{resume?.templateId.replace(/-/g, ' ')}</span>
        </p>
        <button
          onClick={() => setActivePanel('design')}
          className="mt-2 text-xs font-medium text-[var(--color-primary)] hover:underline"
        >
          Switch template in Design tab →
        </button>
      </div>

      <div className="space-y-3">
        <h3 className="text-xs font-semibold uppercase tracking-wider text-[var(--color-text-tertiary)]">
          Targeting
        </h3>
        <div>
          <label className="text-xs font-medium text-[var(--color-text-secondary)] mb-1 block">
            Target role
          </label>
          <input
            value={resume?.metadata.targetRole ?? ''}
            onChange={(e) => updateMetadata({ targetRole: e.target.value })}
            placeholder="e.g. Senior Frontend Engineer"
            className="w-full rounded-[var(--radius-sm)] border border-[var(--color-border)] bg-[var(--color-bg-primary)] px-2.5 py-1.5 text-sm text-[var(--color-text-primary)] outline-none focus:border-[var(--color-primary)]"
          />
        </div>
        <div>
          <label className="text-xs font-medium text-[var(--color-text-secondary)] mb-1 block">
            Target company
          </label>
          <input
            value={resume?.metadata.targetCompany ?? ''}
            onChange={(e) => updateMetadata({ targetCompany: e.target.value })}
            placeholder="e.g. Acme Inc."
            className="w-full rounded-[var(--radius-sm)] border border-[var(--color-border)] bg-[var(--color-bg-primary)] px-2.5 py-1.5 text-sm text-[var(--color-text-primary)] outline-none focus:border-[var(--color-primary)]"
          />
        </div>
        <div>
          <label className="text-xs font-medium text-[var(--color-text-secondary)] mb-1 block">
            Notes
          </label>
          <textarea
            value={resume?.metadata.notes ?? ''}
            onChange={(e) => updateMetadata({ notes: e.target.value })}
            placeholder="Private notes about this resume"
            rows={3}
            className="w-full rounded-[var(--radius-sm)] border border-[var(--color-border)] bg-[var(--color-bg-primary)] px-2.5 py-1.5 text-sm text-[var(--color-text-primary)] outline-none focus:border-[var(--color-primary)] resize-none"
          />
        </div>
      </div>
    </div>
  )
}
