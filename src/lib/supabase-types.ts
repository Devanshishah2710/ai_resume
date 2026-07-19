/**
 * TypeScript types generated from the Supabase PostgreSQL schema.
 *
 * In production, these would be auto-generated via: `supabase gen types typescript`
 * Here they are hand-authored to match the migration files precisely.
 *
 * These are database-layer types. Domain types in /types/ wrap these
 * for use throughout the application.
 */

import type { ResumeData, ResumeTheme, SectionConfig } from '@/types/resume'

export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[]

export type Database = {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          full_name: string
          avatar_url: string | null
          headline: string
          website: string
          location: string
          plan: 'free' | 'pro' | 'enterprise'
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          full_name?: string
          avatar_url?: string | null
          headline?: string
          website?: string
          location?: string
          plan?: 'free' | 'pro' | 'enterprise'
        }
        Update: {
          full_name?: string
          avatar_url?: string | null
          headline?: string
          website?: string
          location?: string
          plan?: 'free' | 'pro' | 'enterprise'
        }
      }
      resumes: {
        Row: {
          id: string
          user_id: string
          title: string
          slug: string
          template_id: string
          theme: ResumeTheme
          sections: SectionConfig[]
          data: ResumeData
          is_public: boolean
          metadata: Json
          last_exported_at: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          user_id: string
          title?: string
          slug: string
          template_id?: string
          theme?: ResumeTheme
          sections?: SectionConfig[]
          data?: ResumeData
          is_public?: boolean
          metadata?: Json
          last_exported_at?: string | null
        }
        Update: {
          title?: string
          slug?: string
          template_id?: string
          theme?: ResumeTheme
          sections?: SectionConfig[]
          data?: ResumeData
          is_public?: boolean
          metadata?: Json
          last_exported_at?: string | null
        }
      }
      resume_versions: {
        Row: {
          id: string
          resume_id: string
          user_id: string
          title: string
          theme: ResumeTheme
          sections: SectionConfig[]
          data: ResumeData
          created_at: string
        }
        Insert: {
          resume_id: string
          user_id: string
          title: string
          theme: ResumeTheme
          sections: SectionConfig[]
          data: ResumeData
        }
        Update: Record<string, never>
      }
      user_settings: {
        Row: {
          user_id: string
          settings: Json
          created_at: string
          updated_at: string
        }
        Insert: {
          user_id: string
          settings?: Json
        }
        Update: {
          settings?: Json
        }
      }
      subscriptions: {
        Row: {
          id: string
          user_id: string
          plan: 'free' | 'pro' | 'enterprise'
          status: 'active' | 'canceled' | 'past_due' | 'trialing'
          provider: string | null
          provider_sub_id: string | null
          current_period_end: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          user_id: string
          plan?: 'free' | 'pro' | 'enterprise'
          status?: 'active' | 'canceled' | 'past_due' | 'trialing'
          provider?: string | null
          provider_sub_id?: string | null
          current_period_end?: string | null
        }
        Update: {
          plan?: 'free' | 'pro' | 'enterprise'
          status?: 'active' | 'canceled' | 'past_due' | 'trialing'
          provider?: string | null
          provider_sub_id?: string | null
          current_period_end?: string | null
        }
      }
      downloads: {
        Row: {
          id: string
          user_id: string
          resume_id: string
          format: 'pdf' | 'docx' | 'txt'
          created_at: string
        }
        Insert: {
          user_id: string
          resume_id: string
          format?: 'pdf' | 'docx' | 'txt'
        }
        Update: Record<string, never>
      }
    }
    Views: Record<string, never>
    Functions: {
      get_resume_count: {
        Args: { p_user_id: string }
        Returns: number
      }
    }
    Enums: {
      user_plan: 'free' | 'pro' | 'enterprise'
      download_format: 'pdf' | 'docx' | 'txt'
      theme_mode: 'light' | 'dark' | 'system'
    }
  }
}

// ─── Row type helpers ─────────────────────────────────────────────────────────

export type ProfileRow = Database['public']['Tables']['profiles']['Row']
export type ResumeRow = Database['public']['Tables']['resumes']['Row']
export type ResumeVersionRow = Database['public']['Tables']['resume_versions']['Row']
export type UserSettingsRow = Database['public']['Tables']['user_settings']['Row']
export type DownloadRow = Database['public']['Tables']['downloads']['Row']
