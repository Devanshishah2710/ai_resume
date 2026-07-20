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

/**
 * Sample resume content used as the default data for every new resume.
 *
 * Populated with realistic dummy content so the live template preview is
 * complete and representative of a finished resume. Users can overwrite any
 * field — this is purely a starting point, not a stored profile.
 */
export const SAMPLE_RESUME_DATA: ResumeData = {
  personal: {
    firstName: 'Jordan',
    lastName: 'Mitchell',
    headline: 'Senior Product Manager',
    email: 'jordan.mitchell@example.com',
    phone: '(415) 555-0192',
    location: 'San Francisco, CA',
    website: 'jordanmitchell.dev',
    linkedin: 'linkedin.com/in/jordanmitchell',
    github: 'github.com/jordanmitchell',
    summary: '',
    avatarUrl: null,
  },
  summary:
    'Results-driven product leader with 8+ years of experience shipping customer-centric software used by millions. Specializes in 0→1 product development, cross-functional team leadership, and turning ambiguous problems into measurable outcomes. Proven track record of growing revenue and engagement through data-informed decisions and tight collaboration with engineering and design.',
  experience: [
    {
      id: 'sample-exp-1',
      company: 'Northwind Technologies',
      position: 'Senior Product Manager',
      location: 'San Francisco, CA',
      dateRange: { startDate: '2021-03', endDate: null, current: true },
      description:
        'Led the end-to-end rebuild of the core analytics suite, growing weekly active users by 42% in three quarters.\n\n• Drove a 0→1 launch of the real-time dashboard, now used by 60% of enterprise accounts.\n• Partnered with 12 engineers and 3 designers across two squads to ship on a 6-week cadence.\n• Established a quarterly OKR process adopted company-wide.',
      highlights: [],
    },
    {
      id: 'sample-exp-2',
      company: 'Brightline Labs',
      position: 'Product Manager',
      location: 'Austin, TX',
      dateRange: { startDate: '2018-06', endDate: '2021-02', current: false },
      description:
        'Owned the mobile growth roadmap for a 5M-user consumer app.\n\n• Launched an onboarding redesign that lifted 30-day retention from 31% to 47%.\n• Ran a 14-experiment A/B program that increased subscription conversion by 18%.',
      highlights: [],
    },
    {
      id: 'sample-exp-3',
      company: 'Cobalt Software',
      position: 'Associate Product Manager',
      location: 'Remote',
      dateRange: { startDate: '2016-07', endDate: '2018-05', current: false },
      description:
        'Supported the payments team across checkout and billing flows.\n\n• Shipped a saved-payment-methods feature that reduced cart abandonment by 9%.',
      highlights: [],
    },
  ],
  education: [
    {
      id: 'sample-edu-1',
      institution: 'University of California, Berkeley',
      degree: 'B.S.',
      field: 'Computer Science',
      location: 'Berkeley, CA',
      dateRange: { startDate: '2012-09', endDate: '2016-05', current: false },
      gpa: '3.8',
      description: 'Graduated with honors. President of the Product & Design club.',
      highlights: [],
    },
  ],
  projects: [
    {
      id: 'sample-proj-1',
      name: 'OpenMetrics Dashboard',
      description:
        'An open-source analytics dashboard that visualizes product usage in real time. Built with React, D3, and a streaming WebSocket backend.',
      technologies: ['React', 'TypeScript', 'D3', 'WebSockets'],
      url: 'github.com/jordanmitchell/openmetrics',
      githubUrl: 'github.com/jordanmitchell/openmetrics',
      dateRange: { startDate: '2022-01', endDate: '2022-08', current: false },
      highlights: [],
    },
    {
      id: 'sample-proj-2',
      name: 'Maker Weekend',
      description:
        'A community hackathon series connecting 200+ builders across four cities. Handles registration, team matching, and live judging.',
      technologies: ['Next.js', 'Supabase', 'Tailwind'],
      url: 'makerweekend.dev',
      githubUrl: '',
      dateRange: { startDate: '2020-03', endDate: null, current: true },
      highlights: [],
    },
  ],
  skills: [
    {
      id: 'sample-skill-1',
      name: 'Product',
      skills: ['Roadmapping', 'Discovery', 'User Research', 'OKRs', 'A/B Testing', 'Analytics'],
      level: 'expert',
    },
    {
      id: 'sample-skill-2',
      name: 'Technical',
      skills: ['SQL', 'Figma', 'HTML/CSS', 'REST APIs', 'Jira', 'Amplitude'],
      level: 'advanced',
    },
    {
      id: 'sample-skill-3',
      name: 'Leadership',
      skills: ['Cross-functional Leadership', 'Mentoring', 'Stakeholder Comms', 'Hiring'],
      level: 'advanced',
    },
  ],
  certifications: [
    {
      id: 'sample-cert-1',
      name: 'Pragmatic Certified Product Manager',
      issuer: 'Pragmatic Institute',
      date: '2022-04',
      expirationDate: null,
      credentialId: 'PCPM-2022-4412',
      url: '',
    },
    {
      id: 'sample-cert-2',
      name: 'Scrum Product Owner (PSPO I)',
      issuer: 'Scrum.org',
      date: '2020-11',
      expirationDate: null,
      credentialId: 'PSPO-2020-9981',
      url: '',
    },
  ],
  achievements: [
    {
      id: 'sample-ach-1',
      title: 'Speaker, SaaS Product Conference 2023',
      description: 'Presented “From Insights to Outcomes” to 800+ product leaders.',
      date: '2023-05',
    },
    {
      id: 'sample-ach-2',
      title: 'Top 10 Product Leader',
      description: 'Recognized by ProductHunt community for the OpenMetrics launch.',
      date: '2022-09',
    },
  ],
  languages: [
    { id: 'sample-lang-1', language: 'English', proficiency: 'native' },
    { id: 'sample-lang-2', language: 'Spanish', proficiency: 'professional' },
    { id: 'sample-lang-3', language: 'French', proficiency: 'limited' },
  ],
  interests: [
    { id: 'sample-int-1', name: 'Trail running' },
    { id: 'sample-int-2', name: 'Photography' },
    { id: 'sample-int-3', name: 'Open source' },
  ],
  awards: [
    {
      id: 'sample-award-1',
      title: 'Employee of the Year',
      issuer: 'Northwind Technologies',
      date: '2023-01',
      description: 'Awarded for the analytics suite rebuild and 42% WAU growth.',
    },
  ],
  publications: [
    {
      id: 'sample-pub-1',
      title: 'Measuring What Matters: A Pragmatic Guide to Product Analytics',
      publisher: 'Product Coalition',
      date: '2023-02',
      url: 'productcoalition.com/jordan-mitchell',
      description: 'A widely-read essay on outcome-driven metrics.',
      authors: ['Jordan Mitchell'],
    },
  ],
  references: [
    {
      id: 'sample-ref-1',
      name: 'Priya Nair',
      position: 'VP of Product',
      company: 'Northwind Technologies',
      email: 'priya.nair@example.com',
      phone: '(415) 555-0148',
      relationship: 'Direct manager',
    },
  ],
  volunteer: [
    {
      id: 'sample-vol-1',
      organization: "Girls Who Code",
      role: 'Mentor',
      location: 'San Francisco, CA',
      dateRange: { startDate: '2019-01', endDate: null, current: true },
      description: 'Mentor high-school students building their first web apps.',
      highlights: [],
    },
  ],
  custom: {},
}

export const DEFAULT_RESUME_DATA: ResumeData = SAMPLE_RESUME_DATA

export const DEFAULT_SECTION_CONFIGS: SectionConfig[] = [
  { id: 'personal', type: 'personal', label: 'Personal Information', visible: true, order: 0 },
  { id: 'summary', type: 'summary', label: 'Professional Summary', visible: true, order: 1 },
  { id: 'experience', type: 'experience', label: 'Work Experience', visible: true, order: 2 },
  { id: 'education', type: 'education', label: 'Education', visible: true, order: 3 },
  { id: 'projects', type: 'projects', label: 'Projects', visible: true, order: 4 },
  { id: 'skills', type: 'skills', label: 'Skills', visible: true, order: 5 },
  { id: 'certifications', type: 'certifications', label: 'Certifications', visible: true, order: 6 },
  { id: 'achievements', type: 'achievements', label: 'Achievements', visible: true, order: 7 },
  { id: 'languages', type: 'languages', label: 'Languages', visible: true, order: 8 },
  { id: 'interests', type: 'interests', label: 'Interests', visible: true, order: 9 },
  { id: 'awards', type: 'awards', label: 'Awards', visible: true, order: 10 },
  { id: 'publications', type: 'publications', label: 'Publications', visible: true, order: 11 },
  { id: 'references', type: 'references', label: 'References', visible: false, order: 12 },
  { id: 'volunteer', type: 'volunteer', label: 'Volunteer Experience', visible: true, order: 13 },
]
