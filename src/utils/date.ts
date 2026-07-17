/**
 * Date utilities for resume content.
 * All formatting functions return empty string for empty/invalid input
 * rather than throwing — resume data may be partially filled.
 */

import type { DateRange } from '@/types/resume'

const MONTH_NAMES = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
]

/**
 * Formats an ISO date string (YYYY-MM or YYYY-MM-DD) to "Month YYYY".
 * E.g. "2023-03" → "March 2023"
 */
export function formatMonthYear(dateStr: string): string {
  if (!dateStr) return ''
  const parts = dateStr.split('-')
  const year = parts[0]
  const month = parts[1]
  if (!year) return ''
  if (!month) return year
  const monthIndex = parseInt(month, 10) - 1
  if (monthIndex < 0 || monthIndex > 11) return year
  return `${MONTH_NAMES[monthIndex]} ${year}`
}

/**
 * Formats a DateRange to "Month YYYY – Month YYYY" or "Month YYYY – Present".
 */
export function formatDateRange(range: DateRange): string {
  const start = formatMonthYear(range.startDate)
  if (!start) return ''

  if (range.current || !range.endDate) {
    return `${start} – Present`
  }

  const end = formatMonthYear(range.endDate)
  return end ? `${start} – ${end}` : start
}

/**
 * Returns a human-readable duration between two dates.
 * E.g. "2 years 3 months"
 */
export function getDuration(startDate: string, endDate: string | null): string {
  if (!startDate) return ''

  const start = new Date(startDate)
  const end = endDate ? new Date(endDate) : new Date()

  const months =
    (end.getFullYear() - start.getFullYear()) * 12 +
    (end.getMonth() - start.getMonth())

  if (months < 1) return 'Less than a month'

  const years = Math.floor(months / 12)
  const remainingMonths = months % 12

  const parts: string[] = []
  if (years > 0) parts.push(`${years} yr${years !== 1 ? 's' : ''}`)
  if (remainingMonths > 0) parts.push(`${remainingMonths} mo`)

  return parts.join(' ')
}

/**
 * Formats a simple date string for display (for certifications, awards, etc.)
 */
export function formatSimpleDate(dateStr: string): string {
  return formatMonthYear(dateStr)
}

/**
 * Returns today's date as YYYY-MM for date inputs.
 */
export function todayAsYearMonth(): string {
  const now = new Date()
  return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`
}

/**
 * Relative time — "2 days ago", "just now", etc.
 */
export function timeAgo(dateStr: string): string {
  const date = new Date(dateStr)
  const now = new Date()
  const diffMs = now.getTime() - date.getTime()
  const diffSec = Math.floor(diffMs / 1000)
  const diffMin = Math.floor(diffSec / 60)
  const diffHour = Math.floor(diffMin / 60)
  const diffDay = Math.floor(diffHour / 24)
  const diffWeek = Math.floor(diffDay / 7)
  const diffMonth = Math.floor(diffDay / 30)
  const diffYear = Math.floor(diffDay / 365)

  if (diffSec < 60) return 'just now'
  if (diffMin < 60) return `${diffMin}m ago`
  if (diffHour < 24) return `${diffHour}h ago`
  if (diffDay < 7) return `${diffDay}d ago`
  if (diffWeek < 4) return `${diffWeek}w ago`
  if (diffMonth < 12) return `${diffMonth}mo ago`
  return `${diffYear}y ago`
}
