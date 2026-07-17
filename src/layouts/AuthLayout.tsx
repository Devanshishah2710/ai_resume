/**
 * AuthLayout — wraps all authentication pages.
 * Split-screen: left side brand/illustration, right side form.
 * Collapses to single column on mobile.
 */

import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { APP_NAME, ROUTES } from '@/constants'
import { FileText } from 'lucide-react'

type AuthLayoutProps = {
  children: React.ReactNode
  title: string
  subtitle?: string
}

export function AuthLayout({ children, title, subtitle }: AuthLayoutProps) {
  return (
    <div className="min-h-dvh flex">
      {/* ── Left Panel (brand) ── */}
      <div className="hidden lg:flex lg:w-[45%] flex-col justify-between p-12 bg-[var(--color-text-primary)] text-[var(--color-text-inverse)] relative overflow-hidden">
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-5">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)`,
              backgroundSize: '32px 32px',
            }}
          />
        </div>

        {/* Logo */}
        <Link
          to={ROUTES.HOME}
          className="relative flex items-center gap-2.5 w-fit"
        >
          <div className="h-9 w-9 rounded-[var(--radius-md)] bg-[var(--color-accent)] flex items-center justify-center">
            <FileText className="h-5 w-5 text-white" />
          </div>
          <span className="text-xl font-bold">{APP_NAME}</span>
        </Link>

        {/* Testimonial / value prop */}
        <div className="relative space-y-6">
          <blockquote className="text-2xl font-light leading-relaxed opacity-90">
            "Land your dream job with a resume that speaks before you do."
          </blockquote>
          <div className="flex items-center gap-4">
            <div className="h-10 w-10 rounded-full bg-white/20" />
            <div>
              <p className="font-medium text-sm">Alex Chen</p>
              <p className="text-xs opacity-60">Hired at Google after using {APP_NAME}</p>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="relative grid grid-cols-3 gap-6">
          {[
            { value: '50K+', label: 'Resumes created' },
            { value: '94%', label: 'Interview rate' },
            { value: '15+', label: 'Templates' },
          ].map((stat) => (
            <div key={stat.label}>
              <p className="text-2xl font-bold">{stat.value}</p>
              <p className="text-xs opacity-60 mt-0.5">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ── Right Panel (form) ── */}
      <div className="flex-1 flex flex-col justify-center items-center p-6 lg:p-16 bg-[var(--color-bg-primary)]">
        {/* Mobile logo */}
        <Link
          to={ROUTES.HOME}
          className="lg:hidden flex items-center gap-2 mb-10"
        >
          <div className="h-8 w-8 rounded-[var(--radius-md)] bg-[var(--color-accent)] flex items-center justify-center">
            <FileText className="h-4 w-4 text-white" />
          </div>
          <span className="text-lg font-bold text-[var(--color-text-primary)]">{APP_NAME}</span>
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="w-full max-w-sm"
        >
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-[var(--color-text-primary)]">{title}</h1>
            {subtitle && (
              <p className="mt-2 text-sm text-[var(--color-text-secondary)]">{subtitle}</p>
            )}
          </div>

          {children}
        </motion.div>
      </div>
    </div>
  )
}
