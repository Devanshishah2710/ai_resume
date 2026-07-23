/**
 * LinkedIn Service — fetches LinkedIn profile data after OAuth and maps it
 * to the application's ResumeData schema.
 *
 * Strategy:
 *   1. Basic data always available from Supabase user_metadata (name, email, pic).
 *   2. Extended data from LinkedIn's OIDC userinfo endpoint (when provider_token
 *      is present).
 *   3. Rich profile data (positions, education, skills) from LinkedIn REST API
 *      endpoints (when the app has configured the appropriate scopes).
 *   4. Every API call is wrapped in a try/catch so partial data never blocks
 *      the import — the user always gets a resume with whatever we could fetch.
 */

import { supabase } from '@/lib/supabase'
import { generateId } from '@/utils/id'
import type {
  ResumeData,
  PersonalInfo,
  ExperienceEntry,
  EducationEntry,
  SkillCategory,
  CertificationEntry,
  LanguageEntry,
  VolunteerEntry,
  PublicationEntry,
  ProjectEntry,
  AwardEntry,
} from '@/types/resume'

// ─── Types ──────────────────────────────────────────────────────────────────────

type LinkedInCallResult<T> = { ok: true; data: T } | { ok: false }

export type LinkedInImportResult = {
  data: ResumeData
  title: string
}

// ─── Constants ───────────────────────────────────────────────────────────────────

const LINKEDIN_API_BASE = 'https://api.linkedin.com'

// ─── Helpers ─────────────────────────────────────────────────────────────────────

function callLinkedInAPI<T>(
  path: string,
  token: string,
  base: string = LINKEDIN_API_BASE,
): Promise<LinkedInCallResult<T>> {
  return fetch(`${base}${path}`, {
    headers: {
      Authorization: `Bearer ${token}`,
      ...(path.startsWith('/rest/')
        ? { 'LinkedIn-Version': '202401' }
        : {}),
    },
  })
    .then(async (res) => {
      if (!res.ok) {
        console.warn(`[linkedin] API ${path} returned ${res.status}`)
        return { ok: false as const }
      }
      const json = (await res.json()) as T
      return { ok: true as const, data: json }
    })
    .catch(() => {
      return { ok: false as const }
    })
}

function parseLinkedInDate(
  date: { year?: number; month?: number; day?: number } | undefined | null,
): string {
  if (!date || !date.year) return ''
  const m = date.month != null ? String(date.month).padStart(2, '0') : '01'
  return `${date.year}-${m}`
}

function isCurrentPosition(
  endDate: { year?: number; month?: number; day?: number } | undefined | null,
): boolean {
  return !endDate
}

function normalizeString(val: string | undefined | null): string {
  return (val ?? '').trim()
}

function uniqueSkills(skills: string[]): SkillCategory[] {
  const seen = new Set<string>()
  const unique: string[] = []
  for (const s of skills) {
    const trimmed = s.trim()
    if (trimmed && !seen.has(trimmed.toLowerCase())) {
      seen.add(trimmed.toLowerCase())
      unique.push(trimmed)
    }
  }
  if (unique.length === 0) return []
  return [{ id: generateId(), name: 'Skills', skills: unique, level: null }]
}

// ─── Profile Fetching ────────────────────────────────────────────────────────────

/**
 * Fetch the LinkedIn profile and map it to ResumeData.
 * Returns null when no LinkedIn session data is available.
 */
export async function importLinkedInProfile(): Promise<LinkedInImportResult | null> {
  const { data: sessionData } = await supabase.auth.getSession()
  const session = sessionData.session
  if (!session) return null

  const user = session.user
  const metadata = user.user_metadata ?? {}
  const identities = user.identities ?? []
  const linkedInIdentity = identities.find(
    (id) => id.provider === 'linkedin_oidc',
  )
  const identityData = linkedInIdentity?.identity_data ?? {}

  const token = session.provider_token ?? null

  // Accumulate raw data from multiple sources
  const raw: Record<string, unknown> = {}

  // 1. Basic data from Supabase user_metadata / identity_data
  //    LinkedIn OIDC returns: sub, name, given_name, family_name, picture,
  //    locale, email, email_verified
  const pictureUrl = metadata.picture ?? identityData.picture ?? metadata.avatar_url ?? null
  raw.name = metadata.name ?? identityData.name ?? ''
  raw.given_name = metadata.given_name ?? identityData.given_name ?? metadata.full_name?.split(' ')[0] ?? ''
  raw.family_name = metadata.family_name ?? identityData.family_name ?? metadata.full_name?.split(' ').slice(1).join(' ') ?? ''
  raw.email = metadata.email ?? identityData.email ?? user.email ?? ''
  raw.picture = pictureUrl
  raw.headline = metadata.headline ?? identityData.headline ?? null
  raw.locale = metadata.locale ?? identityData.locale ?? null
  raw.location = metadata.location ?? identityData.location ?? null
  raw.sub = identityData.sub ?? metadata.sub ?? metadata.provider_id ?? null
  raw.vanity_name = metadata.vanity_name ?? identityData.vanity_name ?? metadata.user_name ?? null

  // Construct LinkedIn profile URL from sub or vanity name
  if (raw.vanity_name) {
    raw.linkedin_url = `https://www.linkedin.com/in/${raw.vanity_name}/`
  } else if (raw.sub) {
    raw.linkedin_url = `https://www.linkedin.com/in/${raw.sub}/`
  }

  // Extract location from locale (e.g. "en-US" -> "United States")
  if (!raw.location && raw.locale) {
    const localeStr = String(raw.locale)
    const parts = localeStr.split('-')
    if (parts.length > 1) {
      const countryNames: Record<string, string> = {
        US: 'United States', GB: 'United Kingdom', CA: 'Canada',
        AU: 'Australia', IN: 'India', DE: 'Germany', FR: 'France',
        ES: 'Spain', IT: 'Italy', NL: 'Netherlands', BR: 'Brazil',
        JP: 'Japan', CN: 'China', KR: 'South Korea', SG: 'Singapore',
        NZ: 'New Zealand', IE: 'Ireland', SE: 'Sweden', NO: 'Norway',
        DK: 'Denmark', FI: 'Finland', CH: 'Switzerland', AT: 'Austria',
        BE: 'Belgium', PT: 'Portugal', MX: 'Mexico', AR: 'Argentina',
        CL: 'Chile', CO: 'Colombia', ZA: 'South Africa', IL: 'Israel',
        AE: 'UAE', SA: 'Saudi Arabia', HK: 'Hong Kong', TW: 'Taiwan',
        PH: 'Philippines', MY: 'Malaysia', ID: 'Indonesia', TH: 'Thailand',
        VN: 'Vietnam', RU: 'Russia', PL: 'Poland', TR: 'Turkey',
      }
      const countryCode = parts[1]!.toUpperCase()
      raw.location = countryNames[countryCode] ?? parts[1]!
    }
  }

  // 2. Extended data from LinkedIn OIDC userinfo endpoint
  if (token) {
    const userinfo = await callLinkedInAPI<LinkedInUserInfo>('/v2/userinfo', token)
    if (userinfo.ok) {
      if (!raw.name) raw.name = userinfo.data.name ?? ''
      if (!raw.given_name) raw.given_name = userinfo.data.given_name ?? ''
      if (!raw.family_name) raw.family_name = userinfo.data.family_name ?? ''
      if (!raw.email) raw.email = userinfo.data.email ?? ''
      if (!raw.picture) raw.picture = userinfo.data.picture ?? null
      if (!raw.sub) raw.sub = userinfo.data.sub ?? null
    }

    // 3. Try the v2/me endpoint for richer profile data.
    //    Requires the r_liteprofile scope (now requested in auth.service.ts).
    const meResp = await callLinkedInAPI<LinkedInMeResponse>(
      '/v2/me?projection=(id,localizedFirstName,localizedLastName,profilePicture(displayImage~:playableStreams),headline,vanityName,industry)',
      token,
    )
    if (meResp.ok) {
      if (!raw.headline) raw.headline = meResp.data.headline ?? null
      if (!raw.vanity_name) raw.vanity_name = meResp.data.vanityName ?? null
      if (meResp.data.industry) raw.industry = meResp.data.industry
      if (!raw.linkedin_url && meResp.data.vanityName) {
        raw.linkedin_url = `https://www.linkedin.com/in/${meResp.data.vanityName}/`
      }

      // Extract profile photo from the displayImage~ stream if available
      if (!raw.picture && meResp.data.profilePicture) {
        try {
          const pic = meResp.data.profilePicture
          const stream = (pic as Record<string, unknown>)['displayImage~']
          if (stream && typeof stream === 'object') {
            const elements = (stream as Record<string, unknown>).elements as Array<Record<string, unknown>> | undefined
            if (elements && elements.length > 0) {
              const largest = elements[elements.length - 1]!
              const identifiers = largest.identifiers as Array<Record<string, unknown>> | undefined
              if (identifiers && identifiers.length > 0) {
                const first = identifiers[0]!
                raw.picture = (first.identifier as string) ?? null
              }
            }
          }
        } catch {
          // silently ignore picture extraction failure
        }
      }
    }

    // 4. Try LinkedIn REST API endpoints for richer profile data.
    //    These require the LinkedIn app to have the appropriate scopes
    //    configured and approved through LinkedIn's partner program.
    //    Failures are silent. All calls run in parallel for speed.
    const [positionsResp, educationsResp, skillsResp, certsResp, langsResp,
      projResp, honorsResp, volResp, pubsResp, summaryResp] = await Promise.all([
      callLinkedInAPI<{ elements?: LinkedInPosition[] }>('/rest/positions', token),
      callLinkedInAPI<{ elements?: LinkedInEducation[] }>('/rest/educations', token),
      callLinkedInAPI<{ elements?: LinkedInSkill[] }>('/rest/skills', token),
      callLinkedInAPI<{ elements?: LinkedInCertification[] }>('/rest/certifications', token),
      callLinkedInAPI<{ elements?: LinkedInLanguage[] }>('/rest/languages', token),
      callLinkedInAPI<{ elements?: LinkedInProject[] }>('/rest/projects', token),
      callLinkedInAPI<{ elements?: LinkedInHonor[] }>('/rest/honors', token),
      callLinkedInAPI<{ elements?: LinkedInVolunteer[] }>('/rest/volunteer', token),
      callLinkedInAPI<{ elements?: LinkedInPublication[] }>('/rest/publications', token),
      callLinkedInAPI<{ summary?: string }>('/v2/me?projection=(summary)', token),
    ])

    if (positionsResp.ok && positionsResp.data.elements) {
      raw.positions = positionsResp.data.elements
    }
    if (educationsResp.ok && educationsResp.data.elements) {
      raw.educations = educationsResp.data.elements
    }
    if (skillsResp.ok && skillsResp.data.elements) {
      raw.skills = skillsResp.data.elements
    }
    if (certsResp.ok && certsResp.data.elements) {
      raw.certifications = certsResp.data.elements
    }
    if (langsResp.ok && langsResp.data.elements) {
      raw.languages = langsResp.data.elements
    }
    if (projResp.ok && projResp.data.elements) {
      raw.projects = projResp.data.elements
    }
    if (honorsResp.ok && honorsResp.data.elements) {
      raw.honors = honorsResp.data.elements
    }
    if (volResp.ok && volResp.data.elements) {
      raw.volunteer = volResp.data.elements
    }
    if (pubsResp.ok && pubsResp.data.elements) {
      raw.publications = pubsResp.data.elements
    }
    if (summaryResp.ok && summaryResp.data.summary) {
      raw.summary = summaryResp.data.summary
    }
  }

  // 5. Build the ResumeData from whatever we collected
  const resumeData = mapToResumeData(raw)
  const fullName = normalizeString(raw.name as string) || `${raw.given_name ?? ''} ${raw.family_name ?? ''}`.trim() || 'My LinkedIn Resume'

  return {
    data: resumeData,
    title: fullName ? `${fullName}'s Resume` : 'My LinkedIn Resume',
  }
}

// ─── Data Mapping ────────────────────────────────────────────────────────────────

function mapToResumeData(raw: Record<string, unknown>): ResumeData {
  const givenName = normalizeString(raw.given_name as string) || ''
  const familyName = normalizeString(raw.family_name as string) || ''
  const fullName = normalizeString(raw.name as string) || `${givenName} ${familyName}`.trim()

  const personal: PersonalInfo = {
    firstName: givenName || fullName.split(' ')[0] || '',
    lastName: familyName || fullName.split(' ').slice(1).join(' ') || '',
    headline: normalizeString(raw.headline as string) || '',
    email: normalizeString(raw.email as string) || '',
    phone: normalizeString(raw.phone as string) || '',
    location: extractLocation(raw),
    website: normalizeString(raw.website as string) || '',
    linkedin: normalizeString(raw.linkedin_url as string) || '',
    github: '',
    summary: '',
    avatarUrl: (raw.picture as string) ?? null,
  }

  const summary = normalizeString(raw.summary as string) || ''

  const experience = mapPositions(raw.positions)
  const education = mapEducations(raw.educations)
  const skills = mapSkillStrings(raw.skills)
  const certifications = mapCertifications(raw.certifications)
  const languages = mapLanguages(raw.languages)
  const awards = mapAwards(raw.honors)
  const volunteer = mapVolunteer(raw.volunteer)
  const publications = mapPublications(raw.publications)
  const projects = mapProjects(raw.projects)

  return {
    personal,
    summary,
    experience,
    education,
    projects,
    skills,
    certifications,
    achievements: [],
    languages,
    interests: [],
    awards,
    publications,
    references: [],
    volunteer,
    custom: {},
  }
}

function extractLocation(raw: Record<string, unknown>): string {
  const loc = raw.location
  if (typeof loc === 'string') return loc
  if (loc && typeof loc === 'object') {
    const l = loc as Record<string, unknown>
    const parts = [l.city, l.country].filter(Boolean) as string[]
    if (parts.length) return parts.join(', ')
  }
  return ''
}

// ─── Position Mapping ────────────────────────────────────────────────────────────

function mapPositions(
  positions: unknown,
): ExperienceEntry[] {
  if (!Array.isArray(positions)) return []
  return positions
    .map((p: LinkedInPosition): ExperienceEntry | null => {
      if (!p) return null
      const start = p.startDate ?? p.start_date
      const end = p.endDate ?? p.end_date
      return {
        id: generateId(),
        company: normalizeString(p.companyName ?? p.company ?? '') || '',
        position: normalizeString(p.title ?? p.position ?? '') || '',
        location: normalizeString(p.location ?? '') || '',
        dateRange: {
          startDate: parseLinkedInDate(start),
          endDate: isCurrentPosition(end) ? null : parseLinkedInDate(end),
          current: isCurrentPosition(end),
        },
        description: normalizeString(p.description ?? p.summary ?? '') || '',
        highlights: [],
      }
    })
    .filter((e): e is ExperienceEntry => e !== null && (e.company !== '' || e.position !== ''))
}

// ─── Education Mapping ───────────────────────────────────────────────────────────

function mapEducations(
  educations: unknown,
): EducationEntry[] {
  if (!Array.isArray(educations)) return []
  return educations
    .map((e: LinkedInEducation): EducationEntry | null => {
      if (!e) return null
      const start = e.startDate ?? e.start_date
      const end = e.endDate ?? e.end_date
      return {
        id: generateId(),
        institution: normalizeString(e.schoolName ?? e.school ?? e.institution ?? e.name ?? '') || '',
        degree: normalizeString(e.degree ?? e.degreeName ?? '') || '',
        field: normalizeString(e.fieldOfStudy ?? e.field ?? '') || '',
        location: normalizeString(e.location ?? '') || '',
        dateRange: {
          startDate: parseLinkedInDate(start),
          endDate: isCurrentPosition(end) ? null : parseLinkedInDate(end),
          current: isCurrentPosition(end),
        },
        gpa: normalizeString(e.grade ?? e.gpa ?? '') || '',
        description: normalizeString(e.description ?? e.notes ?? '') || '',
        highlights: [],
      }
    })
    .filter((e): e is EducationEntry => e !== null && e.institution !== '')
}

// ─── Skills Mapping ──────────────────────────────────────────────────────────────

function mapSkillStrings(skills: unknown): SkillCategory[] {
  if (!Array.isArray(skills)) return []
  const names = skills
    .map((s: LinkedInSkill) => {
      if (typeof s === 'string') return s.trim()
      if (s && typeof s === 'object') {
        return normalizeString((s as Record<string, unknown>).name as string)
      }
      return ''
    })
    .filter(Boolean)
  return uniqueSkills(names)
}

// ─── Certification Mapping ───────────────────────────────────────────────────────

function mapCertifications(
  certs: unknown,
): CertificationEntry[] {
  if (!Array.isArray(certs)) return []
  return certs
    .map((c: LinkedInCertification): CertificationEntry | null => {
      if (!c) return null
      return {
        id: generateId(),
        name: normalizeString(c.name ?? c.title ?? '') || '',
        issuer: normalizeString(c.authority ?? c.issuer ?? c.organization ?? '') || '',
        date: normalizeString(c.startDate ?? c.issueDate ?? c.date ?? '') || '',
        expirationDate: normalizeString(c.expirationDate ?? c.expireDate ?? '') || null,
        credentialId: normalizeString(c.credentialId ?? c.licenseNumber ?? '') || '',
        url: normalizeString(c.url ?? '') || '',
      }
    })
    .filter((c): c is CertificationEntry => c !== null && c.name !== '')
}

// ─── Language Mapping ────────────────────────────────────────────────────────────

function mapLanguages(langs: unknown): LanguageEntry[] {
  if (!Array.isArray(langs)) return []
  return langs
    .map((l: LinkedInLanguage): LanguageEntry | null => {
      if (!l) return null
      const name = normalizeString(
        typeof l === 'string' ? l : (l as Record<string, unknown>).name as string,
      )
      if (!name) return null
      return {
        id: generateId(),
        language: name,
        proficiency: 'professional' as const,
      }
    })
    .filter((l): l is LanguageEntry => l !== null)
}

// ─── Awards Mapping ──────────────────────────────────────────────────────────────

function mapAwards(honors: unknown): AwardEntry[] {
  if (!Array.isArray(honors)) return []
  return honors
    .map((h: LinkedInHonor): AwardEntry | null => {
      if (!h) return null
      const title = normalizeString(h.name ?? h.title ?? h.description ?? '')
      if (!title) return null
      return {
        id: generateId(),
        title,
        issuer: '',
        description: normalizeString(h.description ?? h.notes ?? '') || '',
        date: normalizeString(h.date ?? h.issueDate ?? '') || '',
      }
    })
    .filter((h): h is AwardEntry => h !== null)
}

// ─── Volunteer Mapping ───────────────────────────────────────────────────────────

function mapVolunteer(vol: unknown): VolunteerEntry[] {
  if (!Array.isArray(vol)) return []
  return vol
    .map((v: LinkedInVolunteer): VolunteerEntry | null => {
      if (!v) return null
      const organization = normalizeString(v.company ?? v.organization ?? v.name ?? '')
      if (!organization) return null
      const start = v.startDate ?? v.start_date
      const end = v.endDate ?? v.end_date
      return {
        id: generateId(),
        organization,
        role: normalizeString(v.role ?? v.position ?? v.title ?? '') || '',
        location: normalizeString(v.location ?? '') || '',
        dateRange: {
          startDate: parseLinkedInDate(start),
          endDate: isCurrentPosition(end) ? null : parseLinkedInDate(end),
          current: isCurrentPosition(end),
        },
        description: normalizeString(v.description ?? v.summary ?? '') || '',
        highlights: [],
      }
    })
    .filter((v): v is VolunteerEntry => v !== null)
}

// ─── Publications Mapping ────────────────────────────────────────────────────────

function mapPublications(pubs: unknown): PublicationEntry[] {
  if (!Array.isArray(pubs)) return []
  return pubs
    .map((p: LinkedInPublication): PublicationEntry | null => {
      if (!p) return null
      const title = normalizeString(p.name ?? p.title ?? '')
      if (!title) return null
      return {
        id: generateId(),
        title,
        publisher: normalizeString(p.publisher ?? p.company ?? '') || '',
        date: normalizeString(p.date ?? p.publishedDate ?? '') || '',
        url: normalizeString(p.url ?? '') || '',
        description: normalizeString(p.description ?? p.summary ?? '') || '',
        authors: [],
      }
    })
    .filter((p): p is PublicationEntry => p !== null)
}

// ─── Projects Mapping ────────────────────────────────────────────────────────────

function mapProjects(projects: unknown): ProjectEntry[] {
  if (!Array.isArray(projects)) return []
  return projects
    .map((p: LinkedInProject): ProjectEntry | null => {
      if (!p) return null
      const name = normalizeString(p.name ?? p.title ?? '')
      if (!name) return null
      return {
        id: generateId(),
        name,
        description: normalizeString(p.description ?? p.summary ?? '') || '',
        technologies: Array.isArray(p.skills ?? p.technologies ?? [])
          ? (p.skills ?? p.technologies ?? []).map(String)
          : [],
        url: normalizeString(p.url ?? '') || '',
        githubUrl: '',
        dateRange: null,
        highlights: [],
      }
    })
    .filter((p): p is ProjectEntry => p !== null)
}

// ─── LinkedIn API Response Types ──────────────────────────────────────────────────

type LinkedInUserInfo = {
  sub: string
  name?: string
  given_name?: string
  family_name?: string
  picture?: string
  email?: string
}

type LinkedInMeResponse = {
  id: string
  localizedFirstName?: string
  localizedLastName?: string
  profilePicture?: Record<string, unknown>
  headline?: string
  vanityName?: string
  industry?: string
}

type LinkedInPosition = {
  companyName?: string
  company?: string
  title?: string
  position?: string
  location?: string
  description?: string
  summary?: string
  startDate?: { year?: number; month?: number; day?: number }
  start_date?: { year?: number; month?: number; day?: number }
  endDate?: { year?: number; month?: number; day?: number } | null
  end_date?: { year?: number; month?: number; day?: number } | null
}

type LinkedInEducation = {
  schoolName?: string
  school?: string
  institution?: string
  name?: string
  degree?: string
  degreeName?: string
  fieldOfStudy?: string
  field?: string
  location?: string
  grade?: string
  gpa?: string
  description?: string
  notes?: string
  startDate?: { year?: number; month?: number; day?: number }
  start_date?: { year?: number; month?: number; day?: number }
  endDate?: { year?: number; month?: number; day?: number } | null
  end_date?: { year?: number; month?: number; day?: number } | null
}

type LinkedInSkill = {
  name?: string
} | string

type LinkedInCertification = {
  name?: string
  title?: string
  authority?: string
  issuer?: string
  organization?: string
  startDate?: string
  issueDate?: string
  date?: string
  expirationDate?: string
  expireDate?: string
  credentialId?: string
  licenseNumber?: string
  url?: string
}

type LinkedInLanguage = {
  name?: string
} | string

type LinkedInProject = {
  name?: string
  title?: string
  description?: string
  summary?: string
  skills?: string[]
  technologies?: string[]
  url?: string
}

type LinkedInHonor = {
  name?: string
  title?: string
  description?: string
  notes?: string
  date?: string
  issueDate?: string
}

type LinkedInVolunteer = {
  company?: string
  organization?: string
  name?: string
  role?: string
  position?: string
  title?: string
  location?: string
  description?: string
  summary?: string
  startDate?: { year?: number; month?: number; day?: number }
  start_date?: { year?: number; month?: number; day?: number }
  endDate?: { year?: number; month?: number; day?: number } | null
  end_date?: { year?: number; month?: number; day?: number } | null
}

type LinkedInPublication = {
  name?: string
  title?: string
  publisher?: string
  company?: string
  date?: string
  publishedDate?: string
  url?: string
  description?: string
  summary?: string
}
