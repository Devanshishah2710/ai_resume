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
    previewImageUrl: '/templates/classic-professional.png',
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
    previewImageUrl: '/templates/modern-minimal.png',
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
    previewImageUrl: '/templates/executive-dark.png',
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
    previewImageUrl: '/templates/minimal-clean.png',
    tags: ['minimal', 'whitespace', 'clean'],
    isAtsOptimized: true,
    supportsAvatar: false,
    supportsTwoColumns: false,
    createdAt: '2024-01-01',
    component: lazy(() => import('./minimal-clean')),
  },
}

export const DEFAULT_TEMPLATE_ID = 'classic-professional'

/** Returns sorted template list for the template browser */
export function getTemplateList() {
  return Object.values(templateRegistry)
}
