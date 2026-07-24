/**
 * AuthLayout — wraps all authentication pages.
 * Split-screen: left premium hero panel, right form card.
 * Collapses to single column on mobile.
 *
 * The left panel showcases the brand with hero messaging, feature badges,
 * and a lightweight illustration composed of CSS/SVG elements.
 * The right panel contains the auth form in a polished card.
 */

import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  FileText,
  Sparkles,
  Target,
  CheckCircle2,
  TrendingUp,
  Bot,
} from 'lucide-react'
import { APP_NAME, ROUTES } from '@/constants'

type AuthLayoutProps = {
  children: React.ReactNode
  title: string
  subtitle?: string
}

export function AuthLayout({ children, title, subtitle }: AuthLayoutProps) {
  return (
    <div className="min-h-dvh flex">
      {/* ── Left Hero Panel ── */}
      <div className="hidden lg:flex lg:w-[55%] flex-col justify-between p-12 relative overflow-hidden bg-gradient-to-br from-[var(--color-primary)]/10 via-[var(--color-primary)]/5 to-[var(--color-primary-subtle)]/10">
        {/* Background blobs */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
          <div className="absolute -top-48 -right-48 w-96 h-96 rounded-full bg-[var(--color-primary)]/10 blur-3xl animate-blob" />
          <div className="absolute -bottom-32 -left-32 w-80 h-80 rounded-full bg-purple-500/15 blur-3xl animate-blob-delayed" />
          <div className="absolute top-1/3 left-1/4 w-64 h-64 rounded-full bg-blue-500/10 blur-3xl" />
          {/* Floating particles */}
          <div className="absolute top-1/4 right-1/4 w-1.5 h-1.5 rounded-full bg-white/30 animate-float" />
          <div className="absolute top-1/2 right-1/3 w-1 h-1 rounded-full bg-purple-300/40 animate-float-delayed" />
          <div className="absolute bottom-1/3 left-1/2 w-2 h-2 rounded-full bg-indigo-300/30 animate-float" style={{ animationDelay: '2s' }} />
        </div>

        {/* Grid pattern overlay */}
        <div
          className="absolute inset-0 opacity-[0.03] pointer-events-none"
          style={{
            backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)',
            backgroundSize: '32px 32px',
          }}
          aria-hidden="true"
        />

        {/* Top section — logo + badges */}
        <div className="relative z-10">
          <Link to={ROUTES.HOME} className="flex items-center gap-2.5 w-fit">
            <div className="h-9 w-9 rounded-lg bg-gradient-to-br from-indigo-400 to-purple-500 flex items-center justify-center shadow-lg shadow-[var(--color-primary)]/10">
              <FileText className="h-5 w-5 text-white" />
            </div>
            <span className="text-xl font-bold text-white">{APP_NAME}</span>
          </Link>

          <div className="flex flex-wrap gap-2 mt-8">
            <span className="inline-flex items-center gap-1 px-3 py-1 text-xs font-medium rounded-full bg-white/10 text-[var(--color-text-primary)] backdrop-blur-sm border border-white/10">
              <Sparkles className="h-3 w-3" />
              AI Powered
            </span>
            <span className="inline-flex items-center gap-1 px-3 py-1 text-xs font-medium rounded-full bg-white/10 text-[var(--color-text-primary)] backdrop-blur-sm border border-white/10">
              <Target className="h-3 w-3" />
              ATS Optimized
            </span>
            <span className="inline-flex items-center gap-1 px-3 py-1 text-xs font-medium rounded-full bg-white/10 text-[var(--color-text-primary)] backdrop-blur-sm border border-white/10">
              <CheckCircle2 className="h-3 w-3" />
              Role Specific
            </span>
          </div>
        </div>

        {/* Middle section — hero heading + supporting text */}
        <div className="relative z-10 -mt-8">
          <h1 className="text-4xl lg:text-5xl font-bold leading-tight text-white">
            Land Your Dream Job
            <br />
            With a Resume That
            <br />
            <span className="bg-gradient-to-r from-indigo-300 via-purple-300 to-pink-300 bg-clip-text text-transparent">
              Speaks Before You Do.
            </span>
          </h1>
          <p className="mt-4 text-base text-white/70 max-w-md leading-relaxed">
            Create professional, ATS-optimized resumes in minutes with AI-powered
            suggestions. Stand out to recruiters and land more interviews.
          </p>
        </div>

        {/* Bottom section — illustration */}
        <div className="relative z-10 h-44">
          {/* Laptop mockup */}
          <div className="absolute bottom-0 left-0 w-56 animate-float">
            <div className="bg-gray-800 rounded-t-lg rounded-b-sm p-2 pb-0 shadow-[0_10px_40px_rgba(15,23,42,0.05)]">
              {/* Screen */}
              <div className="bg-white rounded-t aspect-[4/3] p-2 flex flex-col gap-1.5">
                <div className="flex items-center gap-1.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-red-400" />
                  <div className="w-1.5 h-1.5 rounded-full bg-yellow-400" />
                  <div className="w-1.5 h-1.5 rounded-full bg-green-400" />
                </div>
                {/* Resume lines on screen */}
                <div className="h-1.5 bg-indigo-200 rounded w-3/4" />
                <div className="h-1 bg-gray-200 rounded w-1/2" />
                <div className="h-0.5 bg-gray-100 rounded w-full" />
                <div className="h-0.5 bg-gray-100 rounded w-11/12" />
                <div className="h-0.5 bg-gray-100 rounded w-4/5" />
                <div className="flex gap-2 mt-1">
                  <div className="flex-1 space-y-0.5">
                    <div className="h-0.5 bg-gray-100 rounded w-full" />
                    <div className="h-0.5 bg-gray-100 rounded w-full" />
                  </div>
                  <div className="w-8 h-8 rounded bg-indigo-100 flex items-center justify-center">
                    <FileText className="h-3.5 w-3.5 text-indigo-500" />
                  </div>
                </div>
              </div>
              {/* Base */}
              <div className="h-1.5 bg-gray-700 rounded-b-sm mx-4" />
            </div>
          </div>

          {/* Floating resume preview card */}
          <div className="absolute bottom-8 left-48 w-32 animate-float-delayed">
            <div className="bg-white rounded-2xl shadow-[0_10px_40px_rgba(15,23,42,0.05)] p-3 flex flex-col gap-1.5">
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 rounded bg-gradient-to-br from-indigo-400 to-purple-500 flex items-center justify-center">
                  <FileText className="h-3 w-3 text-white" />
                </div>
                <div className="h-1.5 bg-gray-200 rounded w-16" />
              </div>
              <div className="h-1 bg-gray-100 rounded w-full" />
              <div className="h-1 bg-gray-100 rounded w-4/5" />
              <div className="flex gap-1 mt-1">
                <span className="px-1.5 py-0.5 text-[8px] font-medium rounded bg-green-100 text-green-700">
                  ATS: 94%
                </span>
                <span className="px-1.5 py-0.5 text-[8px] font-medium rounded bg-blue-100 text-blue-700">
                  Score: 88
                </span>
              </div>
            </div>
          </div>

          {/* AI Robot assistant */}
          <div className="absolute bottom-4 right-4 w-14 h-14 animate-float" style={{ animationDelay: '1.5s' }}>
            <div className="w-full h-full rounded-2xl bg-gradient-to-br from-indigo-400 to-purple-600 flex items-center justify-center shadow-lg shadow-[var(--color-primary)]/10 ring-2 ring-white/20">
              <Bot className="h-7 w-7 text-white" />
            </div>
          </div>

          {/* Floating ATS score badge */}
          <div className="absolute top-0 right-12 w-24 animate-float-delayed">
            <div className="bg-white/10 backdrop-blur-md rounded-2xl border border-[var(--color-border)] p-3">
              <div className="flex items-center gap-2">
                <TrendingUp className="h-3.5 w-3.5 text-green-400" />
                <span className="text-[10px] font-medium text-white/80">ATS Score</span>
              </div>
              <p className="text-lg font-bold text-white mt-1">94%</p>
              <div className="mt-1 h-1 bg-white/10 rounded-full overflow-hidden">
                <div className="h-full w-[94%] bg-gradient-to-r from-green-400 to-emerald-300 rounded-full" />
              </div>
            </div>
          </div>

          {/* Decorative glowing dot */}
          <div className="absolute top-6 left-24 w-2 h-2 rounded-full bg-purple-400/60 animate-pulse" />
          <div className="absolute top-16 right-1/2 w-1.5 h-1.5 rounded-full bg-indigo-400/50 animate-pulse" style={{ animationDelay: '1s' }} />
        </div>

        {/* Bottom gradient fade */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-indigo-950/60 to-transparent pointer-events-none" aria-hidden="true" />
      </div>

      {/* ── Right Panel (form) ── */}
      <div className="flex-1 flex flex-col justify-center items-center p-6 lg:p-12 bg-[var(--color-bg-primary)]">
        {/* Mobile logo */}
        <Link
          to={ROUTES.HOME}
          className="lg:hidden flex items-center gap-2 mb-10"
        >
          <div className="h-8 w-8 rounded-[var(--radius-md)] bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
            <FileText className="h-4 w-4 text-white" />
          </div>
          <span className="text-lg font-bold text-[var(--color-text-primary)]">{APP_NAME}</span>
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="w-full max-w-md"
        >
          <div className="bg-[var(--color-bg-elevated)] rounded-2xl shadow-xl border border-[var(--color-border)] p-8 sm:p-10">
            <div className="mb-8">
              <h1 className="text-2xl font-bold text-[var(--color-text-primary)]">{title}</h1>
              {subtitle && (
                <p className="mt-2 text-sm text-[var(--color-text-secondary)]">{subtitle}</p>
              )}
            </div>

            {children}
          </div>
        </motion.div>
      </div>
    </div>
  )
}
