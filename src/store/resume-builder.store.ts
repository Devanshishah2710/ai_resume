/**
 * Resume Builder Store — manages all editor state.
 *
 * This store is the single source of truth for the resume being edited.
 * It handles:
 *   - Resume data mutations
 *   - Section ordering and visibility
 *   - Theme customization
 *   - Template selection
 *   - Auto-save debouncing
 *   - Dirty state tracking
 *
 * Architecture note: We keep the full resume in a flat Zustand store
 * rather than using Context + useReducer. This gives us:
 *   - Selective subscriptions (components only re-render when their slice changes)
 *   - Easy devtools integration
 *   - No prop drilling
 *   - Straightforward undo/redo path (immer middleware can be added later)
 */

import { create } from 'zustand'
import { subscribeWithSelector } from 'zustand/middleware'
import type {
  Resume,
  ResumeTheme,
  SectionConfig,
  SectionType,
  PersonalInfo,
  ExperienceEntry,
  EducationEntry,
  ProjectEntry,
  SkillCategory,
  CertificationEntry,
  AchievementEntry,
  LanguageEntry,
  InterestEntry,
  AwardEntry,
  PublicationEntry,
  ReferenceEntry,
  VolunteerEntry,
  CustomSectionEntry,
} from '@/types/resume'
import { DEFAULT_THEME } from '@/types/resume'
import { AUTO_SAVE_DELAY_MS } from '@/constants'
import { resumeService } from '@/services/resume.service'
import { generateId } from '@/utils/id'

// ─── Store Shape ──────────────────────────────────────────────────────────────

type EditorPanel = 'sections' | 'design' | 'settings'

type ResumeBuilderState = {
  resume: Resume | null
  isLoading: boolean
  isSaving: boolean
  isDirty: boolean
  saveError: string | null
  activePanel: EditorPanel
  activeSectionId: string | null
  previewScale: number
}

type ResumeBuilderActions = {
  // Lifecycle
  loadResume: (id: string) => Promise<void>
  saveResume: () => Promise<void>
  reset: () => void

  // Resume-level
  setTitle: (title: string) => void
  setTemplate: (templateId: string) => void

  // Theme
  updateTheme: (updates: Partial<ResumeTheme>) => void

  // Sections
  setActivePanel: (panel: EditorPanel) => void
  setActiveSectionId: (id: string | null) => void
  toggleSectionVisibility: (id: string) => void
  reorderSections: (sections: SectionConfig[]) => void
  addCustomSection: () => void
  removeCustomSection: (id: string) => void
  updateSectionLabel: (id: string, label: string) => void

  // Data mutations — personal
  updatePersonal: (data: Partial<PersonalInfo>) => void
  updateSummary: (content: string) => void

  // Data mutations — experience
  addExperience: () => void
  updateExperience: (id: string, updates: Partial<ExperienceEntry>) => void
  removeExperience: (id: string) => void
  reorderExperience: (entries: ExperienceEntry[]) => void

  // Data mutations — education
  addEducation: () => void
  updateEducation: (id: string, updates: Partial<EducationEntry>) => void
  removeEducation: (id: string) => void

  // Data mutations — projects
  addProject: () => void
  updateProject: (id: string, updates: Partial<ProjectEntry>) => void
  removeProject: (id: string) => void

  // Data mutations — skills
  addSkillCategory: () => void
  updateSkillCategory: (id: string, updates: Partial<SkillCategory>) => void
  removeSkillCategory: (id: string) => void

  // Data mutations — certifications
  addCertification: () => void
  updateCertification: (id: string, updates: Partial<CertificationEntry>) => void
  removeCertification: (id: string) => void

  // Data mutations — other list sections
  addLanguage: () => void
  updateLanguage: (id: string, updates: Partial<LanguageEntry>) => void
  removeLanguage: (id: string) => void

  addAchievement: () => void
  updateAchievement: (id: string, updates: Partial<AchievementEntry>) => void
  removeAchievement: (id: string) => void

  addInterest: () => void
  updateInterest: (id: string, updates: Partial<InterestEntry>) => void
  removeInterest: (id: string) => void

  addAward: () => void
  updateAward: (id: string, updates: Partial<AwardEntry>) => void
  removeAward: (id: string) => void

  addPublication: () => void
  updatePublication: (id: string, updates: Partial<PublicationEntry>) => void
  removePublication: (id: string) => void

  addReference: () => void
  updateReference: (id: string, updates: Partial<ReferenceEntry>) => void
  removeReference: (id: string) => void

  addVolunteer: () => void
  updateVolunteer: (id: string, updates: Partial<VolunteerEntry>) => void
  removeVolunteer: (id: string) => void

  addCustomEntry: (sectionId: string) => void
  updateCustomEntry: (sectionId: string, entryId: string, updates: Partial<CustomSectionEntry>) => void
  removeCustomEntry: (sectionId: string, entryId: string) => void

  setPreviewScale: (scale: number) => void
}

// ─── Auto-save timer ──────────────────────────────────────────────────────────

let saveTimer: ReturnType<typeof setTimeout> | null = null

type StoreInstance = { getState: () => { saveResume: () => Promise<void> } }

function scheduleSave(store: StoreInstance) {
  if (saveTimer) clearTimeout(saveTimer)
  saveTimer = setTimeout(() => {
    store.getState().saveResume()
  }, AUTO_SAVE_DELAY_MS)
}

// ─── Store ────────────────────────────────────────────────────────────────────

export const useResumeBuilderStore = create<ResumeBuilderState & ResumeBuilderActions>()(
  subscribeWithSelector((set, get) => ({
    // ── Initial State ──
    resume: null,
    isLoading: false,
    isSaving: false,
    isDirty: false,
    saveError: null,
    activePanel: 'sections',
    activeSectionId: null,
    previewScale: 0.6,

    // ── Lifecycle ──

    loadResume: async (id) => {
      set({ isLoading: true, saveError: null })
      try {
        const resume = await resumeService.getResume(id)
        set({ resume, isLoading: false, isDirty: false })
      } catch (error) {
        set({ isLoading: false, saveError: String(error) })
      }
    },

    saveResume: async () => {
      const { resume, isDirty } = get()
      if (!resume || !isDirty) return

      set({ isSaving: true, saveError: null })
      try {
        await resumeService.updateResume(resume.id, {
          title: resume.title,
          templateId: resume.templateId,
          theme: resume.theme,
          sections: resume.sections,
          data: resume.data,
          metadata: resume.metadata,
        })
        set({ isSaving: false, isDirty: false })
      } catch (error) {
        set({ isSaving: false, saveError: String(error) })
      }
    },

    reset: () => {
      if (saveTimer) clearTimeout(saveTimer)
      set({
        resume: null,
        isLoading: false,
        isSaving: false,
        isDirty: false,
        saveError: null,
        activeSectionId: null,
      })
    },

    // ── Helpers (private pattern — mutate and schedule save) ──

    // ── Resume-level ──

    setTitle: (title) => {
      set((s) => s.resume ? { resume: { ...s.resume, title }, isDirty: true } : s)
      scheduleSave(useResumeBuilderStore)
    },

    setTemplate: (templateId) => {
      set((s) => s.resume ? { resume: { ...s.resume, templateId }, isDirty: true } : s)
      scheduleSave(useResumeBuilderStore)
    },

    // ── Theme ──

    updateTheme: (updates) => {
      set((s) => {
        if (!s.resume) return s
        return {
          resume: { ...s.resume, theme: { ...s.resume.theme, ...updates } },
          isDirty: true,
        }
      })
      scheduleSave(useResumeBuilderStore)
    },

    // ── Panel / Section UI ──

    setActivePanel: (panel) => set({ activePanel: panel }),
    setActiveSectionId: (id) => set({ activeSectionId: id }),

    toggleSectionVisibility: (id) => {
      set((s) => {
        if (!s.resume) return s
        const sections = s.resume.sections.map((sec) =>
          sec.id === id ? { ...sec, visible: !sec.visible } : sec
        )
        return { resume: { ...s.resume, sections }, isDirty: true }
      })
      scheduleSave(useResumeBuilderStore)
    },

    reorderSections: (sections) => {
      set((s) => s.resume ? { resume: { ...s.resume, sections }, isDirty: true } : s)
      scheduleSave(useResumeBuilderStore)
    },

    addCustomSection: () => {
      const customId = generateId()
      const sectionId = `custom-${customId}`
      set((s) => {
        if (!s.resume) return s
        const maxOrder = s.resume.sections.length
          ? Math.max(...s.resume.sections.map((sec) => sec.order))
          : -1
        const newSection: SectionConfig = {
          id: sectionId,
          type: 'custom' as SectionType,
          label: 'Custom Section',
          visible: true,
          order: maxOrder + 1,
          customId,
        }
        return {
          resume: {
            ...s.resume,
            sections: [...s.resume.sections, newSection],
            data: {
              ...s.resume.data,
              custom: {
                ...s.resume.data.custom,
                [customId]: { title: 'Custom Section', entries: [] },
              },
            },
          },
          isDirty: true,
        }
      })
      scheduleSave(useResumeBuilderStore)
    },

    removeCustomSection: (id) => {
      set((s) => {
        if (!s.resume) return s
        const section = s.resume.sections.find((sec) => sec.id === id)
        if (!section?.customId) return s
        const { [section.customId]: _removed, ...remainingCustom } = s.resume.data.custom
        return {
          resume: {
            ...s.resume,
            sections: s.resume.sections.filter((sec) => sec.id !== id),
            data: { ...s.resume.data, custom: remainingCustom },
          },
          isDirty: true,
        }
      })
      scheduleSave(useResumeBuilderStore)
    },

    updateSectionLabel: (id, label) => {
      set((s) => {
        if (!s.resume) return s
        const sections = s.resume.sections.map((sec) =>
          sec.id === id ? { ...sec, label } : sec
        )
        // Also update custom section title in data
        const section = s.resume.sections.find((sec) => sec.id === id)
        let data = s.resume.data
        if (section?.customId && data.custom[section.customId]) {
          data = {
            ...data,
            custom: {
              ...data.custom,
              [section.customId]: { ...data.custom[section.customId]!, title: label },
            },
          }
        }
        return { resume: { ...s.resume, sections, data }, isDirty: true }
      })
      scheduleSave(useResumeBuilderStore)
    },

    // ── Personal ──

    updatePersonal: (updates) => {
      set((s) => s.resume ? {
        resume: {
          ...s.resume,
          data: { ...s.resume.data, personal: { ...s.resume.data.personal, ...updates } },
        },
        isDirty: true,
      } : s)
      scheduleSave(useResumeBuilderStore)
    },

    updateSummary: (content) => {
      set((s) => s.resume ? {
        resume: { ...s.resume, data: { ...s.resume.data, summary: content } },
        isDirty: true,
      } : s)
      scheduleSave(useResumeBuilderStore)
    },

    // ── Experience ──

    addExperience: () => {
      const entry: ExperienceEntry = {
        id: generateId(),
        company: '',
        position: '',
        location: '',
        dateRange: { startDate: '', endDate: null, current: true },
        description: '',
        highlights: [],
      }
      set((s) => s.resume ? {
        resume: { ...s.resume, data: { ...s.resume.data, experience: [...s.resume.data.experience, entry] } },
        isDirty: true,
      } : s)
      scheduleSave(useResumeBuilderStore)
    },

    updateExperience: (id, updates) => {
      set((s) => s.resume ? {
        resume: {
          ...s.resume,
          data: {
            ...s.resume.data,
            experience: s.resume.data.experience.map((e) => e.id === id ? { ...e, ...updates } : e),
          },
        },
        isDirty: true,
      } : s)
      scheduleSave(useResumeBuilderStore)
    },

    removeExperience: (id) => {
      set((s) => s.resume ? {
        resume: {
          ...s.resume,
          data: { ...s.resume.data, experience: s.resume.data.experience.filter((e) => e.id !== id) },
        },
        isDirty: true,
      } : s)
      scheduleSave(useResumeBuilderStore)
    },

    reorderExperience: (entries) => {
      set((s) => s.resume ? {
        resume: { ...s.resume, data: { ...s.resume.data, experience: entries } },
        isDirty: true,
      } : s)
      scheduleSave(useResumeBuilderStore)
    },

    // ── Education ──

    addEducation: () => {
      const entry: EducationEntry = {
        id: generateId(),
        institution: '',
        degree: '',
        field: '',
        location: '',
        dateRange: { startDate: '', endDate: null, current: false },
        gpa: '',
        description: '',
        highlights: [],
      }
      set((s) => s.resume ? {
        resume: { ...s.resume, data: { ...s.resume.data, education: [...s.resume.data.education, entry] } },
        isDirty: true,
      } : s)
      scheduleSave(useResumeBuilderStore)
    },

    updateEducation: (id, updates) => {
      set((s) => s.resume ? {
        resume: {
          ...s.resume,
          data: {
            ...s.resume.data,
            education: s.resume.data.education.map((e) => e.id === id ? { ...e, ...updates } : e),
          },
        },
        isDirty: true,
      } : s)
      scheduleSave(useResumeBuilderStore)
    },

    removeEducation: (id) => {
      set((s) => s.resume ? {
        resume: {
          ...s.resume,
          data: { ...s.resume.data, education: s.resume.data.education.filter((e) => e.id !== id) },
        },
        isDirty: true,
      } : s)
      scheduleSave(useResumeBuilderStore)
    },

    // ── Projects ──

    addProject: () => {
      const entry: ProjectEntry = {
        id: generateId(),
        name: '',
        description: '',
        technologies: [],
        url: '',
        githubUrl: '',
        dateRange: null,
        highlights: [],
      }
      set((s) => s.resume ? {
        resume: { ...s.resume, data: { ...s.resume.data, projects: [...s.resume.data.projects, entry] } },
        isDirty: true,
      } : s)
      scheduleSave(useResumeBuilderStore)
    },

    updateProject: (id, updates) => {
      set((s) => s.resume ? {
        resume: {
          ...s.resume,
          data: {
            ...s.resume.data,
            projects: s.resume.data.projects.map((e) => e.id === id ? { ...e, ...updates } : e),
          },
        },
        isDirty: true,
      } : s)
      scheduleSave(useResumeBuilderStore)
    },

    removeProject: (id) => {
      set((s) => s.resume ? {
        resume: { ...s.resume, data: { ...s.resume.data, projects: s.resume.data.projects.filter((e) => e.id !== id) } },
        isDirty: true,
      } : s)
      scheduleSave(useResumeBuilderStore)
    },

    // ── Skills ──

    addSkillCategory: () => {
      const entry: SkillCategory = { id: generateId(), name: '', skills: [], level: null }
      set((s) => s.resume ? {
        resume: { ...s.resume, data: { ...s.resume.data, skills: [...s.resume.data.skills, entry] } },
        isDirty: true,
      } : s)
      scheduleSave(useResumeBuilderStore)
    },

    updateSkillCategory: (id, updates) => {
      set((s) => s.resume ? {
        resume: {
          ...s.resume,
          data: { ...s.resume.data, skills: s.resume.data.skills.map((e) => e.id === id ? { ...e, ...updates } : e) },
        },
        isDirty: true,
      } : s)
      scheduleSave(useResumeBuilderStore)
    },

    removeSkillCategory: (id) => {
      set((s) => s.resume ? {
        resume: { ...s.resume, data: { ...s.resume.data, skills: s.resume.data.skills.filter((e) => e.id !== id) } },
        isDirty: true,
      } : s)
      scheduleSave(useResumeBuilderStore)
    },

    // ── Certifications ──

    addCertification: () => {
      const entry: CertificationEntry = { id: generateId(), name: '', issuer: '', date: '', expirationDate: null, credentialId: '', url: '' }
      set((s) => s.resume ? {
        resume: { ...s.resume, data: { ...s.resume.data, certifications: [...s.resume.data.certifications, entry] } },
        isDirty: true,
      } : s)
      scheduleSave(useResumeBuilderStore)
    },

    updateCertification: (id, updates) => {
      set((s) => s.resume ? {
        resume: {
          ...s.resume,
          data: { ...s.resume.data, certifications: s.resume.data.certifications.map((e) => e.id === id ? { ...e, ...updates } : e) },
        },
        isDirty: true,
      } : s)
      scheduleSave(useResumeBuilderStore)
    },

    removeCertification: (id) => {
      set((s) => s.resume ? {
        resume: { ...s.resume, data: { ...s.resume.data, certifications: s.resume.data.certifications.filter((e) => e.id !== id) } },
        isDirty: true,
      } : s)
      scheduleSave(useResumeBuilderStore)
    },

    // ── Languages ──
    addLanguage: () => {
      const entry: LanguageEntry = { id: generateId(), language: '', proficiency: 'professional' }
      set((s) => s.resume ? { resume: { ...s.resume, data: { ...s.resume.data, languages: [...s.resume.data.languages, entry] } }, isDirty: true } : s)
      scheduleSave(useResumeBuilderStore)
    },
    updateLanguage: (id, updates) => {
      set((s) => s.resume ? { resume: { ...s.resume, data: { ...s.resume.data, languages: s.resume.data.languages.map((e) => e.id === id ? { ...e, ...updates } : e) } }, isDirty: true } : s)
      scheduleSave(useResumeBuilderStore)
    },
    removeLanguage: (id) => {
      set((s) => s.resume ? { resume: { ...s.resume, data: { ...s.resume.data, languages: s.resume.data.languages.filter((e) => e.id !== id) } }, isDirty: true } : s)
      scheduleSave(useResumeBuilderStore)
    },

    // ── Achievements ──
    addAchievement: () => {
      const entry: AchievementEntry = { id: generateId(), title: '', description: '', date: '' }
      set((s) => s.resume ? { resume: { ...s.resume, data: { ...s.resume.data, achievements: [...s.resume.data.achievements, entry] } }, isDirty: true } : s)
      scheduleSave(useResumeBuilderStore)
    },
    updateAchievement: (id, updates) => {
      set((s) => s.resume ? { resume: { ...s.resume, data: { ...s.resume.data, achievements: s.resume.data.achievements.map((e) => e.id === id ? { ...e, ...updates } : e) } }, isDirty: true } : s)
      scheduleSave(useResumeBuilderStore)
    },
    removeAchievement: (id) => {
      set((s) => s.resume ? { resume: { ...s.resume, data: { ...s.resume.data, achievements: s.resume.data.achievements.filter((e) => e.id !== id) } }, isDirty: true } : s)
      scheduleSave(useResumeBuilderStore)
    },

    // ── Interests ──
    addInterest: () => {
      const entry: InterestEntry = { id: generateId(), name: '' }
      set((s) => s.resume ? { resume: { ...s.resume, data: { ...s.resume.data, interests: [...s.resume.data.interests, entry] } }, isDirty: true } : s)
      scheduleSave(useResumeBuilderStore)
    },
    updateInterest: (id, updates) => {
      set((s) => s.resume ? { resume: { ...s.resume, data: { ...s.resume.data, interests: s.resume.data.interests.map((e) => e.id === id ? { ...e, ...updates } : e) } }, isDirty: true } : s)
      scheduleSave(useResumeBuilderStore)
    },
    removeInterest: (id) => {
      set((s) => s.resume ? { resume: { ...s.resume, data: { ...s.resume.data, interests: s.resume.data.interests.filter((e) => e.id !== id) } }, isDirty: true } : s)
      scheduleSave(useResumeBuilderStore)
    },

    // ── Awards ──
    addAward: () => {
      const entry: AwardEntry = { id: generateId(), title: '', issuer: '', date: '', description: '' }
      set((s) => s.resume ? { resume: { ...s.resume, data: { ...s.resume.data, awards: [...s.resume.data.awards, entry] } }, isDirty: true } : s)
      scheduleSave(useResumeBuilderStore)
    },
    updateAward: (id, updates) => {
      set((s) => s.resume ? { resume: { ...s.resume, data: { ...s.resume.data, awards: s.resume.data.awards.map((e) => e.id === id ? { ...e, ...updates } : e) } }, isDirty: true } : s)
      scheduleSave(useResumeBuilderStore)
    },
    removeAward: (id) => {
      set((s) => s.resume ? { resume: { ...s.resume, data: { ...s.resume.data, awards: s.resume.data.awards.filter((e) => e.id !== id) } }, isDirty: true } : s)
      scheduleSave(useResumeBuilderStore)
    },

    // ── Publications ──
    addPublication: () => {
      const entry: PublicationEntry = { id: generateId(), title: '', publisher: '', date: '', url: '', description: '', authors: [] }
      set((s) => s.resume ? { resume: { ...s.resume, data: { ...s.resume.data, publications: [...s.resume.data.publications, entry] } }, isDirty: true } : s)
      scheduleSave(useResumeBuilderStore)
    },
    updatePublication: (id, updates) => {
      set((s) => s.resume ? { resume: { ...s.resume, data: { ...s.resume.data, publications: s.resume.data.publications.map((e) => e.id === id ? { ...e, ...updates } : e) } }, isDirty: true } : s)
      scheduleSave(useResumeBuilderStore)
    },
    removePublication: (id) => {
      set((s) => s.resume ? { resume: { ...s.resume, data: { ...s.resume.data, publications: s.resume.data.publications.filter((e) => e.id !== id) } }, isDirty: true } : s)
      scheduleSave(useResumeBuilderStore)
    },

    // ── References ──
    addReference: () => {
      const entry: ReferenceEntry = { id: generateId(), name: '', position: '', company: '', email: '', phone: '', relationship: '' }
      set((s) => s.resume ? { resume: { ...s.resume, data: { ...s.resume.data, references: [...s.resume.data.references, entry] } }, isDirty: true } : s)
      scheduleSave(useResumeBuilderStore)
    },
    updateReference: (id, updates) => {
      set((s) => s.resume ? { resume: { ...s.resume, data: { ...s.resume.data, references: s.resume.data.references.map((e) => e.id === id ? { ...e, ...updates } : e) } }, isDirty: true } : s)
      scheduleSave(useResumeBuilderStore)
    },
    removeReference: (id) => {
      set((s) => s.resume ? { resume: { ...s.resume, data: { ...s.resume.data, references: s.resume.data.references.filter((e) => e.id !== id) } }, isDirty: true } : s)
      scheduleSave(useResumeBuilderStore)
    },

    // ── Volunteer ──
    addVolunteer: () => {
      const entry: VolunteerEntry = { id: generateId(), organization: '', role: '', location: '', dateRange: { startDate: '', endDate: null, current: false }, description: '', highlights: [] }
      set((s) => s.resume ? { resume: { ...s.resume, data: { ...s.resume.data, volunteer: [...s.resume.data.volunteer, entry] } }, isDirty: true } : s)
      scheduleSave(useResumeBuilderStore)
    },
    updateVolunteer: (id, updates) => {
      set((s) => s.resume ? { resume: { ...s.resume, data: { ...s.resume.data, volunteer: s.resume.data.volunteer.map((e) => e.id === id ? { ...e, ...updates } : e) } }, isDirty: true } : s)
      scheduleSave(useResumeBuilderStore)
    },
    removeVolunteer: (id) => {
      set((s) => s.resume ? { resume: { ...s.resume, data: { ...s.resume.data, volunteer: s.resume.data.volunteer.filter((e) => e.id !== id) } }, isDirty: true } : s)
      scheduleSave(useResumeBuilderStore)
    },

    // ── Custom Sections ──
    addCustomEntry: (sectionId) => {
      const entry: CustomSectionEntry = { id: generateId(), title: '', subtitle: '', description: '', date: '', url: '' }
      set((s) => {
        if (!s.resume) return s
        const section = s.resume.sections.find((sec) => sec.id === sectionId)
        if (!section?.customId) return s
        const existing = s.resume.data.custom[section.customId]
        if (!existing) return s
        return {
          resume: {
            ...s.resume,
            data: {
              ...s.resume.data,
              custom: {
                ...s.resume.data.custom,
                [section.customId]: { ...existing, entries: [...existing.entries, entry] },
              },
            },
          },
          isDirty: true,
        }
      })
      scheduleSave(useResumeBuilderStore)
    },

    updateCustomEntry: (sectionId, entryId, updates) => {
      set((s) => {
        if (!s.resume) return s
        const section = s.resume.sections.find((sec) => sec.id === sectionId)
        if (!section?.customId) return s
        const existing = s.resume.data.custom[section.customId]
        if (!existing) return s
        return {
          resume: {
            ...s.resume,
            data: {
              ...s.resume.data,
              custom: {
                ...s.resume.data.custom,
                [section.customId]: {
                  ...existing,
                  entries: existing.entries.map((e) => e.id === entryId ? { ...e, ...updates } : e),
                },
              },
            },
          },
          isDirty: true,
        }
      })
      scheduleSave(useResumeBuilderStore)
    },

    removeCustomEntry: (sectionId, entryId) => {
      set((s) => {
        if (!s.resume) return s
        const section = s.resume.sections.find((sec) => sec.id === sectionId)
        if (!section?.customId) return s
        const existing = s.resume.data.custom[section.customId]
        if (!existing) return s
        return {
          resume: {
            ...s.resume,
            data: {
              ...s.resume.data,
              custom: {
                ...s.resume.data.custom,
                [section.customId]: {
                  ...existing,
                  entries: existing.entries.filter((e) => e.id !== entryId),
                },
              },
            },
          },
          isDirty: true,
        }
      })
      scheduleSave(useResumeBuilderStore)
    },

    setPreviewScale: (scale) => set({ previewScale: scale }),
  }))
)

// Convenience selector hooks
export const useResume = () => useResumeBuilderStore((s) => s.resume)
export const useResumeData = () => useResumeBuilderStore((s) => s.resume?.data)
export const useResumeTheme = () => useResumeBuilderStore((s) => s.resume?.theme ?? DEFAULT_THEME)
export const useResumeSections = () => useResumeBuilderStore((s) => s.resume?.sections ?? [])
export const useIsSaving = () => useResumeBuilderStore((s) => s.isSaving)
export const useIsDirty = () => useResumeBuilderStore((s) => s.isDirty)
