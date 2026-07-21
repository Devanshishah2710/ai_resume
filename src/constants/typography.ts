/**
 * Global typography system for all resume templates.
 *
 * Every template imports FONT_SIZE_MAP, LINE_HEIGHT_MAP, and SPACING_MAP from
 * this single source of truth. This ensures a consistent, readable baseline
 * across all 43+ templates and guarantees that future templates automatically
 * inherit the same typography rules without duplicating magic constants.
 *
 * ── Scale rationale ──────────────────────────────────────────────────────────
 *   sm (13px) – compact, for dense resumes
 *   md (15px) – default, comfortable reading for most users
 *   lg (17px) – large, for maximum readability
 *
 * The 2px step between each size is deliberate — users can immediately see
 * the difference when toggling S / M / L in the Design Panel.
 *
 * Line heights are generous to keep text airy at every size.
 * Spacing values maintain proportional white space.
 */

export const FONT_SIZE_MAP = {
  sm: '13px',
  md: '15px',
  lg: '17px',
} as const

export type FontSizeLabel = keyof typeof FONT_SIZE_MAP

export const LINE_HEIGHT_MAP = {
  tight: 1.4,
  normal: 1.6,
  relaxed: 1.8,
} as const

export type LineHeightLabel = keyof typeof LINE_HEIGHT_MAP

export const SPACING_MAP = {
  compact: '12px',
  normal: '16px',
  spacious: '22px',
} as const

export type SpacingLabel = keyof typeof SPACING_MAP
