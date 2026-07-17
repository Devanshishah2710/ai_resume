/**
 * useTheme — consumes the ThemeContext provided by ThemeProvider.
 *
 * Extracted into its own module so ThemeContext.tsx only exports the
 * ThemeProvider component (keeps React fast refresh working — a module that
 * exports both a component and a non-component hook triggers a fast-refresh
 * warning and loses HMR state).
 */

import { useContext } from 'react'
import { ThemeContext, type ThemeContextValue } from '@/contexts/theme-context'

export function useTheme(): ThemeContextValue {
  const ctx = useContext(ThemeContext)
  if (!ctx) throw new Error('useTheme must be used within ThemeProvider')
  return ctx
}
