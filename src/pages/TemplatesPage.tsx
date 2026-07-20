/**
 * TemplatesPage — browse, search, filter, and select resume templates.
 * Selecting a template applies it to the current resume (if editing)
 * or asks to create a new resume with that template.
 */

import { useState, useMemo, Suspense } from 'react'
import { useNavigate } from 'react-router-dom'
import { Search } from 'lucide-react'
import { toast } from 'sonner'
import { AppLayout } from '@/layouts/AppLayout'
import { Input } from '@/components/ui/Input'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { Skeleton } from '@/components/ui/Skeleton'
import { Container } from '@/components/ui/Container'
import { getTemplateList } from '@/templates/registry'
import { resumeService } from '@/services/resume.service'
import { ROUTES, TEMPLATE_CATEGORIES } from '@/constants'
import type { TemplateMetadata } from '@/types/template'

export default function TemplatesPage() {
  const navigate = useNavigate()
  const [search, setSearch] = useState('')
  const [activeCategory, setActiveCategory] = useState('all')
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
      <div className="relative h-52 bg-[var(--color-bg-secondary)] flex items-center justify-center overflow-hidden">
        {/* Mini resume preview */}
        <Suspense fallback={<Skeleton className="h-40 w-28" />}>
          <MiniPreview template={template} />
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

// Lightweight template thumbnail — shows the real preview image, falling back
// to a decorative mini-preview when no image is available.
function MiniPreview({ template }: { template: TemplateMetadata }) {
  const colors: Record<string, string> = {
    'classic-professional': '#1a1a2e',
    'modern-minimal': '#0f3460',
    'executive-dark': '#1b4332',
    'minimal-clean': '#334155',
  }
  const accent = colors[template.id] ?? '#2563eb'

  if (template.previewImageUrl) {
    return (
      <img
        src={template.previewImageUrl}
        alt={`${template.name} preview`}
        className="h-52 w-full object-cover object-top"
        loading="lazy"
      />
    )
  }

  return (
    <div className="w-28 h-40 bg-white rounded shadow-md p-2 flex flex-col gap-1 opacity-90">
      <div className="h-5 rounded-sm" style={{ backgroundColor: accent }} />
      <div className="space-y-0.5 mt-1">
        {[100, 85, 90, 70, 80, 75, 65].map((w, i) => (
          <div key={i} className="h-0.5 rounded-full bg-gray-200" style={{ width: `${w}%` }} />
        ))}
      </div>
      <div className="mt-1 h-1 rounded-full w-1/2" style={{ backgroundColor: accent, opacity: 0.4 }} />
      <div className="space-y-0.5 mt-1">
        {[90, 80, 70, 60].map((w, i) => (
          <div key={i} className="h-0.5 rounded-full bg-gray-200" style={{ width: `${w}%` }} />
        ))}
      </div>
    </div>
  )
}
