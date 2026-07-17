/**
 * Core resume domain types.
 *
 * These types represent the resume data model — completely decoupled from
 * any template or rendering concern. Template selection is stored separately
 * so switching templates never mutates resume content.
 */

// ─── Primitive Building Blocks ───────────────────────────────────────────────

export type DateRange = {
  startDate: string // ISO date string YYYY-MM or YYYY-MM-DD
  endDate: string | null // null = "Present"
  current: boolean
}

export type ContactLink = {
  id: string
  type: 'linkedin' | 'github' | 'portfolio' | 'twitter' | 'other'
  label: string
  url: string
}

// ─── Section Types ────────────────────────────────────────────────────────────

export type PersonalInfo = {
  firstName: string
  lastName: string
  headline: string // e.g. "Senior Software Engineer"
  email: string
  phone: string
  location: string
  website: string
  linkedin: string
  github: string
  summary: string
  avatarUrl: string | null
}

export type ExperienceEntry = {
  id: string
  company: string
  position: string
  location: string
  dateRange: DateRange
  description: string // Rich text / markdown
  highlights: string[] // Bullet points
}

export type EducationEntry = {
  id: string
  institution: string
  degree: string
  field: string
  location: string
  dateRange: DateRange
  gpa: string
  description: string
  highlights: string[]
}

export type ProjectEntry = {
  id: string
  name: string
  description: string
  technologies: string[]
  url: string
  githubUrl: string
  dateRange: DateRange | null
  highlights: string[]
}

export type SkillCategory = {
  id: string
  name: string
  skills: string[]
  level: 'beginner' | 'intermediate' | 'advanced' | 'expert' | null
}

export type CertificationEntry = {
  id: string
  name: string
  issuer: string
  date: string
  expirationDate: string | null
  credentialId: string
  url: string
}

export type AchievementEntry = {
  id: string
  title: string
  description: string
  date: string
}

export type LanguageEntry = {
  id: string
  language: string
  proficiency: 'elementary' | 'limited' | 'professional' | 'full' | 'native'
}

export type InterestEntry = {
  id: string
  name: string
}

export type AwardEntry = {
  id: string
  title: string
  issuer: string
  date: string
  description: string
}

export type PublicationEntry = {
  id: string
  title: string
  publisher: string
  date: string
  url: string
  description: string
  authors: string[]
}

export type ReferenceEntry = {
  id: string
  name: string
  position: string
  company: string
  email: string
  phone: string
  relationship: string
}

export type VolunteerEntry = {
  id: string
  organization: string
  role: string
  location: string
  dateRange: DateRange
  description: string
  highlights: string[]
}

export type CustomSectionEntry = {
  id: string
  title: string
  subtitle: string
  description: string
  date: string
  url: string
}

// ─── Section Registry ─────────────────────────────────────────────────────────

/**
 * All possible section type identifiers.
 * Using a const enum pattern for tree-shaking + type safety.
 */
export type SectionType =
  | 'personal'
  | 'summary'
  | 'experience'
  | 'education'
  | 'projects'
  | 'skills'
  | 'certifications'
  | 'achievements'
  | 'languages'
  | 'interests'
  | 'awards'
  | 'publications'
  | 'references'
  | 'volunteer'
  | 'custom'

export type ResumeSection =
  | { type: 'personal'; data: PersonalInfo }
  | { type: 'summary'; data: { content: string } }
  | { type: 'experience'; data: ExperienceEntry[] }
  | { type: 'education'; data: EducationEntry[] }
  | { type: 'projects'; data: ProjectEntry[] }
  | { type: 'skills'; data: SkillCategory[] }
  | { type: 'certifications'; data: CertificationEntry[] }
  | { type: 'achievements'; data: AchievementEntry[] }
  | { type: 'languages'; data: LanguageEntry[] }
  | { type: 'interests'; data: InterestEntry[] }
  | { type: 'awards'; data: AwardEntry[] }
  | { type: 'publications'; data: PublicationEntry[] }
  | { type: 'references'; data: ReferenceEntry[] }
  | { type: 'volunteer'; data: VolunteerEntry[] }
  | { type: 'custom'; data: { title: string; entries: CustomSectionEntry[] } }

// ─── Resume Theme / Customization ────────────────────────────────────────────

export type ResumeTheme = {
  primaryColor: string // hex
  secondaryColor: string // hex
  accentColor: string // hex
  textColor: string // hex
  backgroundColor: string // hex
  fontFamily: 'inter' | 'georgia' | 'merriweather' | 'roboto' | 'playfair' | 'lato'
  fontSize: 'sm' | 'md' | 'lg'
  lineHeight: 'tight' | 'normal' | 'relaxed'
  spacing: 'compact' | 'normal' | 'spacious'
  borderRadius: 'none' | 'sm' | 'md'
  showIcons: boolean
  showAvatar: boolean
  columns: 1 | 2
}

export const DEFAULT_THEME: ResumeTheme = {
  primaryColor: '#1a1a2e',
  secondaryColor: '#16213e',
  accentColor: '#0f3460',
  textColor: '#374151',
  backgroundColor: '#ffffff',
  fontFamily: 'inter',
  fontSize: 'md',
  lineHeight: 'normal',
  spacing: 'normal',
  borderRadius: 'sm',
  showIcons: true,
  showAvatar: false,
  columns: 1,
}

// ─── Resume Section Config (ordering + visibility) ────────────────────────────

export type SectionConfig = {
  id: string // matches SectionType or custom UUID
  type: SectionType
  label: string // Display label, editable for custom sections
  visible: boolean
  order: number
  customId?: string // For custom sections — links to custom section data key
}

// ─── Top-level Resume Model ───────────────────────────────────────────────────

export type ResumeData = {
  personal: PersonalInfo
  summary: string
  experience: ExperienceEntry[]
  education: EducationEntry[]
  projects: ProjectEntry[]
  skills: SkillCategory[]
  certifications: CertificationEntry[]
  achievements: AchievementEntry[]
  languages: LanguageEntry[]
  interests: InterestEntry[]
  awards: AwardEntry[]
  publications: PublicationEntry[]
  references: ReferenceEntry[]
  volunteer: VolunteerEntry[]
  custom: Record<string, { title: string; entries: CustomSectionEntry[] }>
}

export type Resume = {
  id: string
  userId: string
  title: string
  slug: string
  templateId: string
  theme: ResumeTheme
  sections: SectionConfig[]
  data: ResumeData
  isPublic: boolean
  createdAt: string
  updatedAt: string
  lastExportedAt: string | null
  metadata: {
    targetRole: string
    targetCompany: string
    notes: string
  }
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

export const DEFAULT_PERSONAL_INFO: PersonalInfo = {
  firstName: '',
  lastName: '',
  headline: '',
  email: '',
  phone: '',
  location: '',
  website: '',
  linkedin: '',
  github: '',
  summary: '',
  avatarUrl: null,
}

export const DEFAULT_RESUME_DATA: ResumeData = {
  personal: DEFAULT_PERSONAL_INFO,
  summary: '',
  experience: [],
  education: [],
  projects: [],
  skills: [],
  certifications: [],
  achievements: [],
  languages: [],
  interests: [],
  awards: [],
  publications: [],
  references: [],
  volunteer: [],
  custom: {},
}

export const DEFAULT_SECTION_CONFIGS: SectionConfig[] = [
  { id: 'personal', type: 'personal', label: 'Personal Information', visible: true, order: 0 },
  { id: 'summary', type: 'summary', label: 'Professional Summary', visible: true, order: 1 },
  { id: 'experience', type: 'experience', label: 'Work Experience', visible: true, order: 2 },
  { id: 'education', type: 'education', label: 'Education', visible: true, order: 3 },
  { id: 'projects', type: 'projects', label: 'Projects', visible: true, order: 4 },
  { id: 'skills', type: 'skills', label: 'Skills', visible: true, order: 5 },
  { id: 'certifications', type: 'certifications', label: 'Certifications', visible: false, order: 6 },
  { id: 'achievements', type: 'achievements', label: 'Achievements', visible: false, order: 7 },
  { id: 'languages', type: 'languages', label: 'Languages', visible: false, order: 8 },
  { id: 'interests', type: 'interests', label: 'Interests', visible: false, order: 9 },
  { id: 'awards', type: 'awards', label: 'Awards', visible: false, order: 10 },
  { id: 'publications', type: 'publications', label: 'Publications', visible: false, order: 11 },
  { id: 'references', type: 'references', label: 'References', visible: false, order: 12 },
  { id: 'volunteer', type: 'volunteer', label: 'Volunteer Experience', visible: false, order: 13 },
]
