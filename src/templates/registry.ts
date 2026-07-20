/**
 * Template Registry — the single source of truth for all resume templates.
 *
 * Templates are lazy-loaded via React.lazy() to keep the initial bundle small.
 * The registry is keyed by template ID (matches the DB templateId column).
 *
 * Adding a new template:
 *   1. Create src/templates/<id>/index.tsx
 *   2. Add an entry here
 *   3. Done — no other changes needed
 */

import { lazy } from 'react'
import type { TemplateRegistry } from '@/types/template'

export const templateRegistry: TemplateRegistry = {
  'classic-professional': {
    id: 'classic-professional',
    name: 'Classic Professional',
    description: 'A timeless, ATS-optimized single-column layout trusted by Fortune 500 recruiters.',
    category: 'professional',
    tier: 'free',
    previewImageUrl: getTemplatePreviewUrl('classic-professional'),
    tags: ['ats-friendly', 'single-column', 'traditional'],
    isAtsOptimized: true,
    supportsAvatar: false,
    supportsTwoColumns: false,
    createdAt: '2024-01-01',
    component: lazy(() => import('./classic-professional')),
  },
  'modern-minimal': {
    id: 'modern-minimal',
    name: 'Modern Minimal',
    description: 'Clean, contemporary design with an accent sidebar. Perfect for tech roles.',
    category: 'modern',
    tier: 'free',
    previewImageUrl: getTemplatePreviewUrl('modern-minimal'),
    tags: ['modern', 'sidebar', 'tech'],
    isAtsOptimized: true,
    supportsAvatar: true,
    supportsTwoColumns: true,
    createdAt: '2024-01-01',
    component: lazy(() => import('./modern-minimal')),
  },
  'executive-dark': {
    id: 'executive-dark',
    name: 'Executive',
    description: 'Bold header with refined typography for senior professionals and executives.',
    category: 'executive',
    tier: 'free',
    previewImageUrl: getTemplatePreviewUrl('executive-dark'),
    tags: ['executive', 'bold', 'leadership'],
    isAtsOptimized: true,
    supportsAvatar: false,
    supportsTwoColumns: false,
    createdAt: '2024-01-01',
    component: lazy(() => import('./executive-dark')),
  },
  'minimal-clean': {
    id: 'minimal-clean',
    name: 'Minimal Clean',
    description: 'Ultra-clean whitespace-driven design. Less is more.',
    category: 'minimal',
    tier: 'free',
    previewImageUrl: getTemplatePreviewUrl('minimal-clean'),
    tags: ['minimal', 'whitespace', 'clean'],
    isAtsOptimized: true,
    supportsAvatar: false,
    supportsTwoColumns: false,
    createdAt: '2024-01-01',
    component: lazy(() => import('./minimal-clean')),
  },
  'modern-vanguard': {
    id: 'modern-vanguard',
    name: 'Modern Vanguard',
    description: 'Centered header with elegant, letter-spaced typography and clean divider rules.',
    category: 'modern',
    tier: 'free',
    previewImageUrl: getTemplatePreviewUrl('modern-vanguard'),
    tags: ['modern', 'centered', 'elegant'],
    isAtsOptimized: true,
    supportsAvatar: false,
    supportsTwoColumns: false,
    createdAt: '2024-01-01',
    component: lazy(() => import('./modern-vanguard')),
  },
  'modern-sidebar': {
    id: 'modern-sidebar',
    name: 'Modern Sidebar',
    description: 'Compact tinted sidebar with a spacious, single-column content area.',
    category: 'modern',
    tier: 'free',
    previewImageUrl: getTemplatePreviewUrl('modern-sidebar'),
    tags: ['modern', 'sidebar', 'spacious'],
    isAtsOptimized: true,
    supportsAvatar: false,
    supportsTwoColumns: true,
    createdAt: '2024-01-01',
    component: lazy(() => import('./modern-sidebar')),
  },
  'modern-split': {
    id: 'modern-split',
    name: 'Modern Split',
    description: 'Full-width accent header over a balanced two-column body with a divider rail.',
    category: 'modern',
    tier: 'free',
    previewImageUrl: getTemplatePreviewUrl('modern-split'),
    tags: ['modern', 'two-column', 'header'],
    isAtsOptimized: true,
    supportsAvatar: false,
    supportsTwoColumns: true,
    createdAt: '2024-01-01',
    component: lazy(() => import('./modern-split')),
  },
  'modern-timeline': {
    id: 'modern-timeline',
    name: 'Modern Timeline',
    description: 'Minimal contact row and a soft-accent experience timeline for clear hierarchy.',
    category: 'modern',
    tier: 'free',
    previewImageUrl: getTemplatePreviewUrl('modern-timeline'),
    tags: ['modern', 'timeline', 'soft-accent'],
    isAtsOptimized: true,
    supportsAvatar: false,
    supportsTwoColumns: false,
    createdAt: '2024-01-01',
    component: lazy(() => import('./modern-timeline')),
  },
  'modern-grid': {
    id: 'modern-grid',
    name: 'Modern Grid',
    description: 'Grid-based alignment with modern lowercase-spaced headings and crisp structure.',
    category: 'modern',
    tier: 'free',
    previewImageUrl: getTemplatePreviewUrl('modern-grid'),
    tags: ['modern', 'grid', 'structured'],
    isAtsOptimized: true,
    supportsAvatar: false,
    supportsTwoColumns: true,
    createdAt: '2024-01-01',
    component: lazy(() => import('./modern-grid')),
  },
  'professional-corporate': {
    id: 'professional-corporate',
    name: 'Corporate Executive',
    description: 'Wide header with name left and contact right, single column, strong dividers.',
    category: 'professional',
    tier: 'free',
    previewImageUrl: getTemplatePreviewUrl('professional-corporate'),
    tags: ['professional', 'corporate', 'single-column'],
    isAtsOptimized: true,
    supportsAvatar: false,
    supportsTwoColumns: false,
    createdAt: '2024-01-01',
    component: lazy(() => import('./professional-corporate')),
  },
  'professional-business': {
    id: 'professional-business',
    name: 'Business Two Column',
    description: 'Compact left sidebar with contact and skills, large experience-focused main column.',
    category: 'professional',
    tier: 'free',
    previewImageUrl: getTemplatePreviewUrl('professional-business'),
    tags: ['professional', 'sidebar', 'business'],
    isAtsOptimized: true,
    supportsAvatar: false,
    supportsTwoColumns: true,
    createdAt: '2024-01-01',
    component: lazy(() => import('./professional-business')),
  },
  'professional-consultant': {
    id: 'professional-consultant',
    name: 'Premium Consultant',
    description: 'Centered name with a contact bar, two-column body, and elegant spaced titles.',
    category: 'professional',
    tier: 'free',
    previewImageUrl: getTemplatePreviewUrl('professional-consultant'),
    tags: ['professional', 'consultant', 'two-column'],
    isAtsOptimized: true,
    supportsAvatar: false,
    supportsTwoColumns: true,
    createdAt: '2024-01-01',
    component: lazy(() => import('./professional-consultant')),
  },
  'professional-enterprise': {
    id: 'professional-enterprise',
    name: 'Enterprise Standard',
    description: 'Compact header, single column, bold headings, and a timeline experience layout.',
    category: 'professional',
    tier: 'free',
    previewImageUrl: getTemplatePreviewUrl('professional-enterprise'),
    tags: ['professional', 'enterprise', 'timeline'],
    isAtsOptimized: true,
    supportsAvatar: false,
    supportsTwoColumns: false,
    createdAt: '2024-01-01',
    component: lazy(() => import('./professional-enterprise')),
  },
  'professional-boardroom': {
    id: 'professional-boardroom',
    name: 'Executive Boardroom',
    description: 'Premium centered header over a balanced grid with soft gray dividers and blue accent.',
    category: 'professional',
    tier: 'free',
    previewImageUrl: getTemplatePreviewUrl('professional-boardroom'),
    tags: ['professional', 'executive', 'grid'],
    isAtsOptimized: true,
    supportsAvatar: false,
    supportsTwoColumns: true,
    createdAt: '2024-01-01',
    component: lazy(() => import('./professional-boardroom')),
  },
}

export const DEFAULT_TEMPLATE_ID = 'classic-professional'

/**
 * Derived preview URL for a template. Mirrors the `template-previews` storage
 * bucket path (created by the DB migration) — drop a `<id>.png` there and the
 * template gains a real preview image with no code change.
 */
export function getTemplatePreviewUrl(id: string): string {
  return `/storage/v1/object/public/template-previews/${id}.png`
}

/** Returns the template list for the template browser */
export function getTemplateList() {
  return Object.values(templateRegistry)
}
