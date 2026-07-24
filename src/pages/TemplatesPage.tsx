/**
 * TemplatesPage — browse, search, filter, and select resume templates.
 * Selecting a template applies it to the current resume (if editing)
 * or asks to create a new resume with that template.
 */

import { useState, useMemo, useEffect, Suspense } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { Search } from 'lucide-react'
import { toast } from 'sonner'
import { AppLayout } from '@/layouts/AppLayout'
import { Input } from '@/components/ui/Input'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { Skeleton } from '@/components/ui/Skeleton'
import { Container } from '@/components/ui/Container'
import { getTemplateList, templateRegistry } from '@/templates/registry'
import { resumeService } from '@/services/resume.service'
import { ROUTES, TEMPLATE_CATEGORIES } from '@/constants'
import { SAMPLE_RESUME_DATA, DEFAULT_THEME, DEFAULT_SECTION_CONFIGS } from '@/types/resume'
import type { TemplateMetadata } from '@/types/template'

const SCROLL_KEY = 'tf:scrollY'

export default function TemplatesPage() {
  const navigate = useNavigate()
  const [searchParams, setSearchParams] = useSearchParams()

  const search = searchParams.get('search') || ''
  const activeCategory = searchParams.get('category') || 'all'

  const setSearch = (value: string) => {
    const next = new URLSearchParams(searchParams)
    if (value) next.set('search', value)
    else next.delete('search')
    setSearchParams(next, { replace: true })
  }

  const setActiveCategory = (value: string) => {
    const next = new URLSearchParams(searchParams)
    if (value !== 'all') next.set('category', value)
    else next.delete('category')
    setSearchParams(next, { replace: true })
  }

  useEffect(() => {
    const saved = sessionStorage.getItem(SCROLL_KEY)
    if (saved) {
      sessionStorage.removeItem(SCROLL_KEY)
      const y = Number(saved)
      requestAnimationFrame(() => requestAnimationFrame(() => window.scrollTo({ top: y })))
    }
  }, [])

  const templates = getTemplateList()

  const filtered = useMemo(() => {
    let list = templates as TemplateMetadata[]
    if (activeCategory !== 'all') {
      list = list.filter((t) => t.category === activeCategory)
    }
    if (search.trim()) {
      const q = search.toLowerCase()
      list = list.filter(
        (t) =>
          t.name.toLowerCase().includes(q) ||
          t.description.toLowerCase().includes(q) ||
          t.tags.some((tag) => tag.includes(q))
      )
    }
    return list
  }, [templates, search, activeCategory])

  const handleSelect = async (template: TemplateMetadata) => {
    sessionStorage.setItem(SCROLL_KEY, String(window.scrollY))
    const toastId = toast.loading(`Creating resume with ${template.name}…`)
    try {
      const resume = await resumeService.createResume(`My ${template.name} Resume`, template.id)
      toast.success('Resume created', { id: toastId })
      navigate(ROUTES.RESUME_EDIT.replace(':id', resume.id))
    } catch {
      toast.error('Failed to create resume', { id: toastId })
    }
  }

  return (
    <AppLayout>
      <Container className="py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-[var(--color-text-primary)]">Resume Templates</h1>
          <p className="text-sm text-[var(--color-text-secondary)] mt-1">
            {templates.length} professional templates — all ATS-optimized and free
          </p>
        </div>

        {/* Search + category filters */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <Input
            placeholder="Search templates…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            leftIcon={<Search className="h-4 w-4" />}
            className="sm:max-w-xs"
          />

          <div className="flex flex-wrap gap-2">
            {TEMPLATE_CATEGORIES.map(({ label, value }) => (
              <button
                key={value}
                onClick={() => setActiveCategory(value)}
                className={[
                  'px-3 py-1.5 rounded-full text-xs font-medium transition-colors',
                  activeCategory === value
                    ? 'bg-[var(--color-accent)] text-white'
                    : 'bg-[var(--color-bg-tertiary)] text-[var(--color-text-secondary)] hover:bg-[var(--color-border)]',
                ].join(' ')}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* Template grid */}
        {filtered.length === 0 ? (
          <div className="text-center py-16 text-[var(--color-text-tertiary)]">
            <p className="text-lg font-medium">No templates match your search</p>
            <p className="text-sm mt-1">Try a different keyword or category</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filtered.map((template) => (
              <TemplateCard key={template.id} template={template} onSelect={handleSelect} />
            ))}
          </div>
        )}
      </Container>
    </AppLayout>
  )
}

// ─── Template Card ────────────────────────────────────────────────────────────

function TemplateCard({
  template,
  onSelect,
}: {
  template: TemplateMetadata
  onSelect: (t: TemplateMetadata) => void
}) {
  const [hovered, setHovered] = useState(false)

  return (
    <div
      className="group rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-bg-elevated)] overflow-hidden hover:shadow-[var(--shadow-lg)] transition-all duration-200 flex flex-col"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Preview area */}
      <div className="relative h-52 bg-[var(--color-bg-secondary)] overflow-hidden">
        {/* Real template preview, scaled down to fit the card */}
        <Suspense fallback={<Skeleton className="h-full w-full" />}>
          <TemplatePreview template={template} />
        </Suspense>

        {/* Hover overlay */}
        {hovered && (
          <div className="absolute inset-0 bg-black/20 flex items-center justify-center gap-2">
            <Button size="sm" onClick={() => onSelect(template)}>
              Use this template
            </Button>
          </div>
        )}

        {/* Tier badge */}
        <div className="absolute top-2 right-2">
          <Badge variant={template.tier === 'free' ? 'success' : 'accent'}>
            {template.tier === 'free' ? 'Free' : 'Pro'}
          </Badge>
        </div>

        {/* ATS badge */}
        {template.isAtsOptimized && (
          <div className="absolute top-2 left-2">
            <Badge variant="default">ATS ✓</Badge>
          </div>
        )}
      </div>

      {/* Card footer */}
      <div className="p-4 flex-1 flex flex-col justify-between">
        <div>
          <h3 className="font-semibold text-sm text-[var(--color-text-primary)]">{template.name}</h3>
          <p className="text-xs text-[var(--color-text-tertiary)] mt-1 line-clamp-2">{template.description}</p>
        </div>
        <div className="flex flex-wrap gap-1 mt-3">
          {template.tags.slice(0, 3).map((tag) => (
            <Badge key={tag} variant="outline">{tag}</Badge>
          ))}
        </div>
      </div>
    </div>
  )
}

/**
 * Renders the real template component scaled down to fit the card preview
 * area. This shows users the actual template design (typography, colors,
 * layout, columns) using representative sample resume content, so templates
 * can be compared without opening the editor.
 */
function TemplatePreview({ template }: { template: TemplateMetadata }) {
  const Component = templateRegistry[template.id]?.component
  if (!Component) return null

  return (
    <div className="absolute inset-0 flex justify-center overflow-hidden bg-white">
      <div
        style={{
          width: '794px',
          flexShrink: 0,
          transform: 'scale(0.34)',
          transformOrigin: 'top center',
          pointerEvents: 'none',
        }}
      >
        <Component
          data={SAMPLE_RESUME_DATA}
          theme={DEFAULT_THEME}
          sections={DEFAULT_SECTION_CONFIGS}
          isPreview
        />
      </div>
    </div>
  )
}
