/**
 * Resume Service — data access layer for resume CRUD.
 * Uses explicit `any` cast on supabase.from() to avoid the Supabase SDK
 * circular-never generic bug with self-referential Insert/Update types.
 */

import { supabase } from '@/lib/supabase'
import type { Resume, ResumeData, ResumeTheme, SectionConfig } from '@/types/resume'
import { DEFAULT_RESUME_DATA, DEFAULT_SECTION_CONFIGS, DEFAULT_THEME } from '@/types/resume'
import { generateSlug } from '@/utils/slug'
import { generateId } from '@/utils/id'

type ResumeRow = {
  id: string; user_id: string; title: string; slug: string; template_id: string
  theme: ResumeTheme; sections: SectionConfig[]; data: ResumeData; is_public: boolean
  metadata: Resume['metadata']; last_exported_at: string | null; created_at: string; updated_at: string
}

function rowToResume(row: ResumeRow): Resume {
  return {
    id: row.id, userId: row.user_id, title: row.title, slug: row.slug,
    templateId: row.template_id, theme: row.theme, sections: row.sections, data: row.data,
    isPublic: row.is_public,
    metadata: row.metadata ?? { targetRole: '', targetCompany: '', notes: '' },
    lastExportedAt: row.last_exported_at, createdAt: row.created_at, updatedAt: row.updated_at,
  }
}

const resumeTable = () => supabase.from('resumes') as any
const downloadTable = () => supabase.from('downloads') as any

export const resumeService = {
  async listResumes(): Promise<Resume[]> {
    const { data, error } = await resumeTable().select('*').order('updated_at', { ascending: false })
    if (error) throw new Error(error.message)
    return ((data ?? []) as ResumeRow[]).map(rowToResume)
  },

  async getResume(id: string): Promise<Resume> {
    const { data, error } = await resumeTable().select('*').eq('id', id).single()
    if (error) throw new Error(error.message)
    if (!data) throw new Error('Resume not found')
    return rowToResume(data as ResumeRow)
  },

  async createResume(title: string, templateId = 'classic-professional'): Promise<Resume> {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) throw new Error('Not authenticated')
    const slug = await generateUniqueSlug(title, user.id)
    const { data, error } = await resumeTable().insert({
      user_id: user.id, title, slug, template_id: templateId,
      theme: DEFAULT_THEME, sections: DEFAULT_SECTION_CONFIGS, data: DEFAULT_RESUME_DATA,
      is_public: false, metadata: { targetRole: '', targetCompany: '', notes: '' },
    }).select().single()
    if (error) throw new Error(error.message)
    return rowToResume(data as ResumeRow)
  },

  async updateResume(id: string, updates: Partial<{
    title: string; templateId: string; theme: ResumeTheme; sections: SectionConfig[]
    data: ResumeData; isPublic: boolean; metadata: Resume['metadata']
  }>): Promise<Resume> {
    const patch: Record<string, unknown> = {}
    if (updates.title !== undefined)      patch['title']        = updates.title
    if (updates.templateId !== undefined) patch['template_id']  = updates.templateId
    if (updates.theme !== undefined)      patch['theme']        = updates.theme
    if (updates.sections !== undefined)   patch['sections']     = updates.sections
    if (updates.data !== undefined)       patch['data']         = updates.data
    if (updates.isPublic !== undefined)   patch['is_public']    = updates.isPublic
    if (updates.metadata !== undefined)   patch['metadata']     = updates.metadata
    const { data, error } = await resumeTable().update(patch).eq('id', id).select().single()
    if (error) throw new Error(error.message)
    return rowToResume(data as ResumeRow)
  },

  async duplicateResume(id: string): Promise<Resume> {
    const original = await resumeService.getResume(id)
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) throw new Error('Not authenticated')
    const newTitle = `${original.title} (Copy)`
    const slug = await generateUniqueSlug(newTitle, user.id)
    const { data, error } = await resumeTable().insert({
      user_id: user.id, title: newTitle, slug,
      template_id: original.templateId, theme: original.theme, sections: original.sections,
      data: original.data, is_public: false, metadata: original.metadata,
    }).select().single()
    if (error) throw new Error(error.message)
    return rowToResume(data as ResumeRow)
  },

  async deleteResume(id: string): Promise<void> {
    const { error } = await resumeTable().delete().eq('id', id)
    if (error) throw new Error(error.message)
  },

  async renameResume(id: string, title: string): Promise<Resume> {
    return resumeService.updateResume(id, { title })
  },

  async recordDownload(resumeId: string, format: 'pdf' | 'docx' | 'txt' = 'pdf'): Promise<void> {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return
    await downloadTable().insert({ user_id: user.id, resume_id: resumeId, format })
    await resumeTable().update({ last_exported_at: new Date().toISOString() }).eq('id', resumeId).eq('user_id', user.id)
  },
}

async function generateUniqueSlug(title: string, userId: string): Promise<string> {
  const base = generateSlug(title)
  let slug = base
  let attempt = 0
  while (attempt < 50) {
    const { data } = await resumeTable().select('id').eq('user_id', userId).eq('slug', slug).single()
    if (!data) return slug
    attempt++
    slug = `${base}-${attempt}`
  }
  // Fallback: collisions exhausted, use a random suffix
  return `${base}-${generateId().slice(0, 8)}`
}
