/**
 * Theme context object and value type.
 *
 * Kept in its own module so ThemeContext.tsx exports only the ThemeProvider
 * component — this keeps React fast refresh happy (a module exporting both a
 * component and a non-component value triggers a fast-refresh warning).
 */

import { createContext } from 'react'

export type ThemeMode = 'light' | 'dark' | 'system'
export type ResolvedTheme = 'light' | 'dark'

export type ThemeContextValue = {
  theme: ThemeMode
  resolvedTheme: ResolvedTheme
  setTheme: (theme: ThemeMode) => void
}

export const ThemeContext = createContext<ThemeContextValue | null>(null)
