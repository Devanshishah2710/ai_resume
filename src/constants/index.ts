/**
 * Application-wide constants.
 * All magic strings, numbers, and config values live here.
 */

export const APP_NAME = 'ResumeForge'
export const APP_TAGLINE = 'Build resumes that get interviews.'
export const APP_URL = 'https://resumeforge.vercel.app'
// Google OAuth is enabled by default. Set VITE_ENABLE_GOOGLE_AUTH=false to
// hide the button (e.g. before the Google provider is configured in Supabase).
export const ENABLE_GOOGLE_AUTH = import.meta.env.VITE_ENABLE_GOOGLE_AUTH !== 'false'

// ─── Routes ──────────────────────────────────────────────────────────────────

export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  REGISTER: '/register',
  FORGOT_PASSWORD: '/forgot-password',
  RESET_PASSWORD: '/reset-password',
  VERIFY_EMAIL: '/verify-email',
  AUTH_CALLBACK: '/auth/callback',
  DASHBOARD: '/dashboard',
  RESUME_NEW: '/resume/new',
  RESUME_EDIT: '/resume/:id/edit',
  RESUME_PREVIEW: '/resume/:id/preview',
  TEMPLATES: '/templates',
  SETTINGS: '/settings',
  SETTINGS_ACCOUNT: '/settings/account',
  SETTINGS_APPEARANCE: '/settings/appearance',
  SETTINGS_BILLING: '/settings/billing',
} as const

// ─── Supabase Storage Buckets ─────────────────────────────────────────────────

export const STORAGE_BUCKETS = {
  AVATARS: 'avatars',
  RESUME_EXPORTS: 'resume-exports',
  TEMPLATE_PREVIEWS: 'template-previews',
} as const

// ─── Database Table Names ─────────────────────────────────────────────────────

export const DB_TABLES = {
  PROFILES: 'profiles',
  RESUMES: 'resumes',
  RESUME_VERSIONS: 'resume_versions',
  TEMPLATES: 'templates',
  USER_SETTINGS: 'user_settings',
  DOWNLOADS: 'downloads',
  SUBSCRIPTIONS: 'subscriptions',
} as const

// ─── Query Keys (for cache invalidation) ─────────────────────────────────────

export const QUERY_KEYS = {
  RESUMES: 'resumes',
  RESUME: 'resume',
  PROFILE: 'profile',
  TEMPLATES: 'templates',
  USER_SETTINGS: 'user_settings',
} as const

// ─── Limits ───────────────────────────────────────────────────────────────────

export const LIMITS = {
  FREE_RESUME_COUNT: 3,
  PRO_RESUME_COUNT: Infinity,
  MAX_CUSTOM_SECTIONS: 10,
  MAX_EXPERIENCE_ENTRIES: 20,
  MAX_EDUCATION_ENTRIES: 10,
  RESUME_TITLE_MAX_LENGTH: 100,
  SUMMARY_MAX_LENGTH: 1000,
  DESCRIPTION_MAX_LENGTH: 2000,
  PDF_EXPORT_SCALE: 2, // 2x for high DPI
} as const

// ─── PDF Config ───────────────────────────────────────────────────────────────

export const PDF_CONFIG = {
  /** A4 dimensions in mm */
  PAGE_WIDTH_MM: 210,
  PAGE_HEIGHT_MM: 297,
  /** DPI for export */
  DPI: 96,
  /** html2pdf scale for crisp output */
  SCALE: 2,
} as const

// ─── Auto-save ────────────────────────────────────────────────────────────────

export const AUTO_SAVE_DELAY_MS = 1500

// ─── Animation durations (ms) ─────────────────────────────────────────────────

export const ANIMATION = {
  FAST: 150,
  NORMAL: 250,
  SLOW: 400,
  SPRING: { type: 'spring', stiffness: 400, damping: 30 },
} as const

// ─── Color Palette Options (for theme picker) ─────────────────────────────────

export const ACCENT_COLOR_OPTIONS = [
  { label: 'Midnight', value: '#1a1a2e' },
  { label: 'Ocean', value: '#0f3460' },
  { label: 'Forest', value: '#1b4332' },
  { label: 'Crimson', value: '#9b2226' },
  { label: 'Violet', value: '#4c1d95' },
  { label: 'Slate', value: '#334155' },
  { label: 'Rose', value: '#881337' },
  { label: 'Teal', value: '#0d9488' },
  { label: 'Amber', value: '#92400e' },
  { label: 'Graphite', value: '#1c1c1c' },
] as const

export const FONT_OPTIONS = [
  { label: 'Inter', value: 'inter', css: 'Inter, sans-serif' },
  { label: 'Georgia', value: 'georgia', css: 'Georgia, serif' },
  { label: 'Merriweather', value: 'merriweather', css: '"Merriweather", serif' },
  { label: 'Roboto', value: 'roboto', css: '"Roboto", sans-serif' },
  { label: 'Playfair Display', value: 'playfair', css: '"Playfair Display", serif' },
  { label: 'Lato', value: 'lato', css: '"Lato", sans-serif' },
] as const

// ─── Template Categories ──────────────────────────────────────────────────────

export const TEMPLATE_CATEGORIES = [
  { label: 'All', value: 'all' },
  { label: 'Modern', value: 'modern' },
  { label: 'Professional', value: 'professional' },
  { label: 'Minimal', value: 'minimal' },
  { label: 'Creative', value: 'creative' },
  { label: 'Technology', value: 'technology' },
  { label: 'Business', value: 'business' },
  { label: 'Finance', value: 'finance' },
  { label: 'Education', value: 'education' },
  { label: 'Fresher', value: 'fresher' },
] as const

// ─── Language Proficiency Labels ──────────────────────────────────────────────

export const LANGUAGE_PROFICIENCY_LABELS: Record<string, string> = {
  elementary: 'Elementary',
  limited: 'Limited Working',
  professional: 'Professional Working',
  full: 'Full Professional',
  native: 'Native / Bilingual',
}
