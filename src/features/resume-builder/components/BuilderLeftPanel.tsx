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
                ? 'text-[var(--color-accent)] border-b-2 border-[var(--color-accent)] -mb-px'
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

// ─── Inline Settings Panel (lightweight) ─────────────────────────────────────

function SettingsPanel() {
  const resume = useResumeBuilderStore((s) => s.resume)
  // Metadata editing will be expanded in a future iteration
  return (
    <div className="p-4 space-y-4">
      <div>
        <h3 className="text-sm font-semibold text-[var(--color-text-primary)] mb-1">Template</h3>
        <p className="text-xs text-[var(--color-text-secondary)]">
          Current: <span className="font-medium">{resume?.templateId}</span>
        </p>
        <p className="text-xs text-[var(--color-text-tertiary)] mt-1">
          Switch templates from the Design tab without losing your data.
        </p>
      </div>
    </div>
  )
}
