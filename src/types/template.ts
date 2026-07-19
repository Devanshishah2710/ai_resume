/**
 * Template system types.
 *
 * Templates are purely presentational — they receive ResumeData + ResumeTheme
 * and render HTML. Content and layout are fully decoupled.
 */

import type { ResumeData, ResumeTheme, SectionConfig } from './resume'

export type TemplateCategory =
  | 'technology'
  | 'business'
  | 'finance'
  | 'education'
  | 'executive'
  | 'fresher'
  | 'minimal'
  | 'modern'
  | 'professional'
  | 'creative'

export type TemplateTier = 'free' | 'premium'

export type TemplateMetadata = {
  id: string
  name: string
  description: string
  category: TemplateCategory
  tier: TemplateTier
  /** Optional preview asset. Falls back to a generated thumbnail when absent. */
  previewImageUrl?: string
  tags: string[]
  isAtsOptimized: boolean
  supportsAvatar: boolean
  supportsTwoColumns: boolean
  createdAt: string
}

/**
 * Props passed to every template component.
 * Templates are pure render functions — no side effects, no state.
 */
export type TemplateProps = {
  data: ResumeData
  theme: ResumeTheme
  sections: SectionConfig[]
  /** When true, renders in a scaled preview context (no print styles) */
  isPreview?: boolean
}

/**
 * Template component type — a React component that takes TemplateProps.
 * Using React.ComponentType to allow lazy loading.
 */
export type TemplateComponent = React.ComponentType<TemplateProps>

/**
 * Full template definition — metadata + the actual component.
 */
export type Template = TemplateMetadata & {
  component: TemplateComponent
}

/**
 * Template registry map. Populated at app startup.
 */
export type TemplateRegistry = Record<string, Template>
