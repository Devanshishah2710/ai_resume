/**
 * Profile Service — manages user profile data.
 */

import { supabase } from '@/lib/supabase'
import type { UserProfile } from '@/types/auth'
import { STORAGE_BUCKETS } from '@/constants'

type ProfileRow = {
  id: string; full_name: string; avatar_url: string | null; headline: string
  website: string; location: string; plan: 'free' | 'pro' | 'enterprise'
  created_at: string; updated_at: string
}

function rowToProfile(row: ProfileRow): UserProfile {
  return {
    id: row.id, fullName: row.full_name, avatarUrl: row.avatar_url,
    headline: row.headline, website: row.website, location: row.location,
    plan: row.plan, resumeCount: 0, createdAt: row.created_at, updatedAt: row.updated_at,
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const profileTable = () => supabase.from('profiles') as any

export const profileService = {
  async getProfile(userId: string): Promise<UserProfile | null> {
    const { data, error } = await profileTable().select('*').eq('id', userId).single()
    if (error) return null
    return data ? rowToProfile(data as ProfileRow) : null
  },

  async updateProfile(userId: string, updates: Partial<Pick<UserProfile, 'fullName' | 'headline' | 'website' | 'location'>>): Promise<UserProfile> {
    const patch: Record<string, string> = {}
    if (updates.fullName  !== undefined) patch['full_name'] = updates.fullName
    if (updates.headline  !== undefined) patch['headline']  = updates.headline
    if (updates.website   !== undefined) patch['website']   = updates.website
    if (updates.location  !== undefined) patch['location']  = updates.location
    const { data, error } = await profileTable().update(patch).eq('id', userId).select().single()
    if (error) throw new Error(error.message)
    if (!data) throw new Error('Profile not found')
    return rowToProfile(data as ProfileRow)
  },

  async uploadAvatar(userId: string, file: File): Promise<string> {
    const ext = file.name.split('.').pop() ?? 'png'
    const path = `${userId}/avatar.${ext}`
    const { error } = await supabase.storage.from(STORAGE_BUCKETS.AVATARS).upload(path, file, { upsert: true, contentType: file.type })
    if (error) throw new Error(error.message)
    const { data } = supabase.storage.from(STORAGE_BUCKETS.AVATARS).getPublicUrl(path)
    await profileTable().update({ avatar_url: data.publicUrl }).eq('id', userId)
    return data.publicUrl
  },
}
