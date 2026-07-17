/**
 * Shared utility types used application-wide.
 */

/** Discriminated union for async state — avoids the loading/error/data boolean soup */
export type AsyncState<T> =
  | { status: 'idle' }
  | { status: 'loading' }
  | { status: 'success'; data: T }
  | { status: 'error'; error: string }

/** Paginated list response */
export type PaginatedResult<T> = {
  items: T[]
  total: number
  page: number
  perPage: number
  hasNextPage: boolean
}

/** Generic sort config */
export type SortConfig<T extends string = string> = {
  field: T
  direction: 'asc' | 'desc'
}

/** Generic filter map */
export type FilterMap = Record<string, string | string[] | boolean | null>

/** ID type alias for clarity */
export type ID = string

/** ISO date string */
export type ISODateString = string

/** Nullable value */
export type Nullable<T> = T | null

/** Optional value */
export type Optional<T> = T | undefined

/** Deep partial — useful for patch operations */
export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P]
}

/** Select option for dropdowns */
export type SelectOption<T extends string = string> = {
  value: T
  label: string
  description?: string
  icon?: string
  disabled?: boolean
}

/** Notification toast type */
export type ToastType = 'success' | 'error' | 'info' | 'warning'

/** API error shape from Supabase */
export type ApiError = {
  message: string
  code?: string
  details?: string
  hint?: string
}
