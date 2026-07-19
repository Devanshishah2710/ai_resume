/**
 * DesignPanel — right-side design customization tab.
 * Controls theme colors, fonts, spacing, and template selection.
 */

import { useResumeBuilderStore, useResumeTheme } from '@/store/resume-builder.store'
import { Switch } from '@/components/ui/Switch'
import { Select } from '@/components/ui/Select'
import { ACCENT_COLOR_OPTIONS, FONT_OPTIONS } from '@/constants'
import { getTemplateList } from '@/templates/registry'

export function DesignPanel() {
  const theme = useResumeTheme()
  const updateTheme = useResumeBuilderStore((s) => s.updateTheme)
  const templateId = useResumeBuilderStore((s) => s.resume?.templateId ?? '')
  const setTemplate = useResumeBuilderStore((s) => s.setTemplate)

  const fontOptions = FONT_OPTIONS.map((f) => ({ value: f.value, label: f.label }))
  const templates = getTemplateList()

  return (
    <div className="p-4 space-y-6">
      {/* ── Template ── */}
      <Section title="Template">
        <p className="text-xs text-[var(--color-text-tertiary)]">
          Switch templates freely — your content and theme are preserved.
        </p>
        <div className="grid grid-cols-2 gap-2">
          {templates.map((tpl) => {
            const active = tpl.id === templateId
            return (
              <button
                key={tpl.id}
                onClick={() => setTemplate(tpl.id)}
                className={[
                  'text-left rounded-[var(--radius-md)] border p-2.5 transition-colors',
                  active
                    ? 'border-[var(--color-accent)] bg-[var(--color-accent-subtle)]'
                    : 'border-[var(--color-border)] hover:bg-[var(--color-bg-secondary)]',
                ].join(' ')}
                aria-pressed={active}
              >
                <span className={[
                  'block text-xs font-semibold',
                  active ? 'text-[var(--color-accent)]' : 'text-[var(--color-text-primary)]',
                ].join(' ')}>
                  {tpl.name}
                </span>
                <span className="mt-0.5 block text-[10px] leading-snug text-[var(--color-text-tertiary)]">
                  {tpl.description}
                </span>
              </button>
            )
          })}
        </div>
      </Section>

      {/* ── Colors ── */}
      <Section title="Colors">
        <div>
          <label className="text-xs font-medium text-[var(--color-text-secondary)] mb-2 block">
            Accent color
          </label>
          <div className="grid grid-cols-5 gap-2">
            {ACCENT_COLOR_OPTIONS.map((opt) => (
              <button
                key={opt.value}
                title={opt.label}
                onClick={() => updateTheme({ primaryColor: opt.value, accentColor: opt.value })}
                className={[
                  'h-8 w-8 rounded-full transition-transform hover:scale-110',
                  theme.primaryColor === opt.value
                    ? 'ring-2 ring-offset-2 ring-[var(--color-accent)] scale-110'
                    : '',
                ].join(' ')}
                style={{ backgroundColor: opt.value }}
                aria-label={opt.label}
                aria-pressed={theme.primaryColor === opt.value}
              />
            ))}
          </div>
        </div>

        <div>
          <label className="text-xs font-medium text-[var(--color-text-secondary)] mb-2 block">
            Custom color
          </label>
          <div className="flex items-center gap-2">
            <input
              type="color"
              value={theme.primaryColor}
              onChange={(e) => updateTheme({ primaryColor: e.target.value, accentColor: e.target.value })}
              className="h-9 w-14 rounded-[var(--radius-sm)] border border-[var(--color-border)] cursor-pointer p-0.5 bg-transparent"
              aria-label="Custom accent color"
            />
            <span className="text-xs font-mono text-[var(--color-text-secondary)]">
              {theme.primaryColor.toUpperCase()}
            </span>
          </div>
        </div>
      </Section>

      {/* ── Typography ── */}
      <Section title="Typography">
        <Select
          label="Font family"
          value={theme.fontFamily}
          onChange={(e) => updateTheme({ fontFamily: e.target.value as typeof theme.fontFamily })}
          options={fontOptions}
        />

        <div>
          <label className="text-xs font-medium text-[var(--color-text-secondary)] mb-2 block">
            Font size
          </label>
          <div className="flex gap-2">
            {(['sm', 'md', 'lg'] as const).map((size) => (
              <button
                key={size}
                onClick={() => updateTheme({ fontSize: size })}
                className={[
                  'flex-1 py-1.5 text-xs rounded-[var(--radius-sm)] border transition-colors font-medium',
                  theme.fontSize === size
                    ? 'border-[var(--color-accent)] bg-[var(--color-accent-subtle)] text-[var(--color-accent)]'
                    : 'border-[var(--color-border)] text-[var(--color-text-secondary)] hover:bg-[var(--color-bg-secondary)]',
                ].join(' ')}
              >
                {size === 'sm' ? 'Small' : size === 'md' ? 'Medium' : 'Large'}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="text-xs font-medium text-[var(--color-text-secondary)] mb-2 block">
            Line height
          </label>
          <div className="flex gap-2">
            {(['tight', 'normal', 'relaxed'] as const).map((lh) => (
              <button
                key={lh}
                onClick={() => updateTheme({ lineHeight: lh })}
                className={[
                  'flex-1 py-1.5 text-xs rounded-[var(--radius-sm)] border transition-colors font-medium capitalize',
                  theme.lineHeight === lh
                    ? 'border-[var(--color-accent)] bg-[var(--color-accent-subtle)] text-[var(--color-accent)]'
                    : 'border-[var(--color-border)] text-[var(--color-text-secondary)] hover:bg-[var(--color-bg-secondary)]',
                ].join(' ')}
              >
                {lh}
              </button>
            ))}
          </div>
        </div>
      </Section>

      {/* ── Spacing ── */}
      <Section title="Spacing">
        <div>
          <label className="text-xs font-medium text-[var(--color-text-secondary)] mb-2 block">
            Content density
          </label>
          <div className="flex gap-2">
            {(['compact', 'normal', 'spacious'] as const).map((spacing) => (
              <button
                key={spacing}
                onClick={() => updateTheme({ spacing })}
                className={[
                  'flex-1 py-1.5 text-xs rounded-[var(--radius-sm)] border transition-colors font-medium capitalize',
                  theme.spacing === spacing
                    ? 'border-[var(--color-accent)] bg-[var(--color-accent-subtle)] text-[var(--color-accent)]'
                    : 'border-[var(--color-border)] text-[var(--color-text-secondary)] hover:bg-[var(--color-bg-secondary)]',
                ].join(' ')}
              >
                {spacing}
              </button>
            ))}
          </div>
        </div>
      </Section>

      {/* ── Layout ── */}
      <Section title="Layout">
        <Switch
          checked={theme.showIcons}
          onChange={(checked) => updateTheme({ showIcons: checked })}
          label="Show contact icons"
        />
        <Switch
          checked={theme.showAvatar}
          onChange={(checked) => updateTheme({ showAvatar: checked })}
          label="Show profile photo"
        />
        <div>
          <label className="text-xs font-medium text-[var(--color-text-secondary)] mb-2 block">
            Layout
          </label>
          <div className="flex gap-2">
            {([1, 2] as const).map((cols) => (
              <button
                key={cols}
                onClick={() => updateTheme({ columns: cols })}
                className={[
                  'flex-1 py-1.5 text-xs rounded-[var(--radius-sm)] border transition-colors font-medium',
                  theme.columns === cols
                    ? 'border-[var(--color-accent)] bg-[var(--color-accent-subtle)] text-[var(--color-accent)]'
                    : 'border-[var(--color-border)] text-[var(--color-text-secondary)] hover:bg-[var(--color-bg-secondary)]',
                ].join(' ')}
              >
                {cols === 1 ? 'Single column' : 'Two columns'}
              </button>
            ))}
          </div>
        </div>
      </Section>
    </div>
  )
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h3 className="text-xs font-semibold uppercase tracking-wider text-[var(--color-text-tertiary)] mb-3">
        {title}
      </h3>
      <div className="space-y-3">
        {children}
      </div>
    </div>
  )
}
