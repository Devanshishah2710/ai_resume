/**
 * AppLayout — the main authenticated shell.
 *
 * Structure:
 *   ┌─────────────────────────────────┐
 *   │         Top Bar                 │
 *   ├────────┬────────────────────────┤
 *   │        │                        │
 *   │ Sidebar│    Main Content        │
 *   │        │                        │
 *   └────────┴────────────────────────┘
 *
 * On mobile, sidebar collapses to a bottom nav or slide-out drawer.
 */

import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import {
  LayoutDashboard,
  FileText,
  Palette,
  Settings,
  LogOut,
  Menu,
  X,
  ChevronDown,
  Moon,
  Sun,
} from 'lucide-react'
import { useAuthStore } from '@/store/auth.store'
import { authService } from '@/services/auth.service'
import { useTheme } from '@/contexts/ThemeContext'
import { APP_NAME, ROUTES } from '@/constants'
import { Button } from '@/components/ui/Button'
import { Tooltip } from '@/components/ui/Tooltip'
import { toast } from 'sonner'

const NAV_ITEMS = [
  { label: 'Dashboard', icon: LayoutDashboard, to: ROUTES.DASHBOARD },
  { label: 'Templates', icon: Palette, to: ROUTES.TEMPLATES },
  { label: 'Settings', icon: Settings, to: ROUTES.SETTINGS },
]

type AppLayoutProps = { children: React.ReactNode }

export function AppLayout({ children }: AppLayoutProps) {
  const [mobileOpen, setMobileOpen] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()
  const { user, profile } = useAuthStore()
  const { resolvedTheme, setTheme } = useTheme()

  const handleSignOut = async () => {
    try {
      await authService.signOut()
      navigate(ROUTES.LOGIN, { replace: true })
    } catch {
      toast.error('Failed to sign out')
    }
  }

  const toggleTheme = () => {
    setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')
  }

  const isActive = (to: string) => location.pathname === to

  const initials = profile?.fullName
    ? profile.fullName.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase()
    : user?.email?.[0]?.toUpperCase() ?? '?'

  return (
    <div className="min-h-dvh flex flex-col bg-[var(--color-bg-secondary)]">
      {/* ── Top Bar ── */}
      <header
        className="h-[var(--topbar-height)] shrink-0 flex items-center justify-between px-4 lg:px-6 border-b border-[var(--color-border)] bg-[var(--color-bg-elevated)] sticky top-0 z-40"
        style={{ boxShadow: 'var(--shadow-sm)' }}
      >
        {/* Left: Logo + mobile menu */}
        <div className="flex items-center gap-3">
          <button
            className="lg:hidden p-2 rounded-[var(--radius-sm)] hover:bg-[var(--color-bg-tertiary)] transition-colors"
            onClick={() => setMobileOpen(true)}
            aria-label="Open menu"
          >
            <Menu className="h-5 w-5 text-[var(--color-text-secondary)]" />
          </button>

          <Link to={ROUTES.DASHBOARD} className="flex items-center gap-2">
            <div className="h-7 w-7 rounded-[var(--radius-sm)] bg-[var(--color-accent)] flex items-center justify-center">
              <FileText className="h-4 w-4 text-white" />
            </div>
            <span className="font-bold text-sm text-[var(--color-text-primary)] hidden sm:block">
              {APP_NAME}
            </span>
          </Link>
        </div>

        {/* Right: actions */}
        <div className="flex items-center gap-1">
          {/* Theme toggle */}
          <Tooltip content={resolvedTheme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}>
            <Button variant="ghost" size="icon" onClick={toggleTheme} aria-label="Toggle theme">
              {resolvedTheme === 'dark'
                ? <Sun className="h-4 w-4" />
                : <Moon className="h-4 w-4" />
              }
            </Button>
          </Tooltip>

          {/* User avatar */}
          <div className="relative ml-2">
            <button
              className="flex items-center gap-2 rounded-[var(--radius-md)] px-2 py-1.5 hover:bg-[var(--color-bg-tertiary)] transition-colors"
              aria-label="User menu"
            >
              <div className="h-7 w-7 rounded-full bg-[var(--color-accent)] flex items-center justify-center text-white text-xs font-semibold">
                {profile?.avatarUrl ? (
                  <img
                    src={profile.avatarUrl}
                    alt={profile.fullName}
                    className="h-7 w-7 rounded-full object-cover"
                  />
                ) : initials}
              </div>
              <span className="text-sm font-medium text-[var(--color-text-primary)] hidden sm:block max-w-[120px] truncate">
                {profile?.fullName || user?.email}
              </span>
              <ChevronDown className="h-3.5 w-3.5 text-[var(--color-text-tertiary)] hidden sm:block" />
            </button>
          </div>

          <Tooltip content="Sign out">
            <Button variant="ghost" size="icon" onClick={handleSignOut} aria-label="Sign out">
              <LogOut className="h-4 w-4" />
            </Button>
          </Tooltip>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* ── Desktop Sidebar ── */}
        <aside className="hidden lg:flex flex-col w-[var(--sidebar-width)] shrink-0 border-r border-[var(--color-border)] bg-[var(--color-bg-elevated)] py-4">
          <nav className="flex-1 px-3 space-y-0.5">
            {NAV_ITEMS.map(({ label, icon: Icon, to }) => (
              <Link
                key={to}
                to={to}
                className={[
                  'flex items-center gap-3 px-3 py-2.5 rounded-[var(--radius-md)] text-sm font-medium',
                  'transition-colors duration-[var(--transition-fast)]',
                  isActive(to)
                    ? 'bg-[var(--color-accent-subtle)] text-[var(--color-accent)]'
                    : 'text-[var(--color-text-secondary)] hover:bg-[var(--color-bg-secondary)] hover:text-[var(--color-text-primary)]',
                ].join(' ')}
              >
                <Icon className="h-4 w-4 shrink-0" />
                {label}
              </Link>
            ))}
          </nav>

          {/* Sidebar footer — user profile snippet */}
          <div className="px-3 pt-4 border-t border-[var(--color-border)] mt-4">
            <div className="flex items-center gap-3 px-3 py-2">
              <div className="h-8 w-8 rounded-full bg-[var(--color-accent)] flex items-center justify-center text-white text-xs font-semibold shrink-0">
                {initials}
              </div>
              <div className="min-w-0">
                <p className="text-sm font-medium text-[var(--color-text-primary)] truncate">
                  {profile?.fullName || 'User'}
                </p>
                <p className="text-xs text-[var(--color-text-tertiary)] truncate">{user?.email}</p>
              </div>
            </div>
          </div>
        </aside>

        {/* ── Mobile Drawer ── */}
        <AnimatePresence>
          {mobileOpen && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setMobileOpen(false)}
                className="fixed inset-0 z-40 bg-black/40 lg:hidden"
              />
              <motion.aside
                initial={{ x: '-100%' }}
                animate={{ x: 0 }}
                exit={{ x: '-100%' }}
                transition={{ type: 'spring', stiffness: 400, damping: 40 }}
                className="fixed top-0 left-0 bottom-0 z-50 w-72 bg-[var(--color-bg-elevated)] border-r border-[var(--color-border)] flex flex-col py-4 lg:hidden"
              >
                <div className="flex items-center justify-between px-4 mb-4">
                  <Link to={ROUTES.DASHBOARD} className="flex items-center gap-2" onClick={() => setMobileOpen(false)}>
                    <div className="h-7 w-7 rounded-[var(--radius-sm)] bg-[var(--color-accent)] flex items-center justify-center">
                      <FileText className="h-4 w-4 text-white" />
                    </div>
                    <span className="font-bold text-sm">{APP_NAME}</span>
                  </Link>
                  <Button variant="ghost" size="icon" onClick={() => setMobileOpen(false)}>
                    <X className="h-4 w-4" />
                  </Button>
                </div>

                <nav className="flex-1 px-3 space-y-0.5">
                  {NAV_ITEMS.map(({ label, icon: Icon, to }) => (
                    <Link
                      key={to}
                      to={to}
                      onClick={() => setMobileOpen(false)}
                      className={[
                        'flex items-center gap-3 px-3 py-2.5 rounded-[var(--radius-md)] text-sm font-medium',
                        'transition-colors duration-[var(--transition-fast)]',
                        isActive(to)
                          ? 'bg-[var(--color-accent-subtle)] text-[var(--color-accent)]'
                          : 'text-[var(--color-text-secondary)] hover:bg-[var(--color-bg-secondary)]',
                      ].join(' ')}
                    >
                      <Icon className="h-4 w-4 shrink-0" />
                      {label}
                    </Link>
                  ))}
                </nav>

                <div className="px-3 pt-4 border-t border-[var(--color-border)] mt-4">
                  <button
                    onClick={handleSignOut}
                    className="flex w-full items-center gap-3 px-3 py-2.5 rounded-[var(--radius-md)] text-sm font-medium text-[var(--color-error)] hover:bg-[var(--color-error-subtle)] transition-colors"
                  >
                    <LogOut className="h-4 w-4" />
                    Sign out
                  </button>
                </div>
              </motion.aside>
            </>
          )}
        </AnimatePresence>

        {/* ── Main content ── */}
        <main className="flex-1 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  )
}
