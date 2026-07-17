/**
 * Supabase client singleton.
 *
 * A single client instance is created and reused across the app.
 * This avoids multiple GoTrue instances which can cause auth conflicts.
 *
 * Environment variables are validated at startup — missing vars fail fast
 * rather than producing confusing runtime errors deep in the call stack.
 */

import { createClient } from '@supabase/supabase-js'
import type { Database } from './supabase-types'

const supabaseUrl = import.meta.env['VITE_SUPABASE_URL'] as string | undefined
const supabaseAnonKey = import.meta.env['VITE_SUPABASE_ANON_KEY'] as string | undefined

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error(
    '[Supabase] Missing environment variables.\n' +
      'Ensure VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY are set in .env.local'
  )
}

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true,
    storage: window.localStorage,
  },
  global: {
    headers: {
      'x-app-name': 'ResumeForge',
    },
  },
})

export type SupabaseClient = typeof supabase
