/**
 * LandingPage — marketing homepage for unauthenticated users.
 */

import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FileText, Zap, Download, Palette, Shield, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { APP_NAME, APP_TAGLINE, ROUTES } from '@/constants'

export default function LandingPage() {
  return (
    <div className="min-h-dvh bg-[var(--color-bg-primary)]">
      {/* Nav */}
      <nav className="flex items-center justify-between px-6 py-4 max-w-6xl mx-auto">
        <Link to={ROUTES.HOME} className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-[var(--radius-md)] bg-[var(--color-accent)] flex items-center justify-center">
            <FileText className="h-4 w-4 text-white" />
          </div>
          <span className="font-bold text-[var(--color-text-primary)]">{APP_NAME}</span>
        </Link>
        <div className="flex items-center gap-3">
          <Link to={ROUTES.LOGIN}>
            <Button variant="ghost" size="sm">Sign in</Button>
          </Link>
          <Link to={ROUTES.REGISTER}>
            <Button size="sm">Get started free</Button>
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <section className="max-w-4xl mx-auto px-6 pt-20 pb-24 text-center">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-[var(--color-accent-subtle)] text-[var(--color-accent)] mb-6">
            <Zap className="h-3 w-3" /> Free forever · No credit card required
          </span>

          <h1 className="text-5xl sm:text-6xl font-bold text-[var(--color-text-primary)] tracking-tight leading-tight mb-6">
            {APP_TAGLINE}
          </h1>

          <p className="text-xl text-[var(--color-text-secondary)] max-w-2xl mx-auto mb-10">
            Build ATS-optimized resumes in minutes with our professional templates,
            live preview, and one-click PDF export.
          </p>

          <div className="flex items-center justify-center gap-3 flex-wrap">
            <Link to={ROUTES.REGISTER}>
              <Button size="lg" rightIcon={<ArrowRight className="h-4 w-4" />}>
                Build my resume free
              </Button>
            </Link>
            <Link to={ROUTES.TEMPLATES}>
              <Button size="lg" variant="secondary">
                Browse templates
              </Button>
            </Link>
          </div>
        </motion.div>
      </section>

      {/* Features */}
      <section className="max-w-6xl mx-auto px-6 pb-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { icon: Palette, title: '15+ Templates', desc: 'Professional designs for every industry and career level.' },
            { icon: Zap, title: 'Live Preview', desc: 'See changes instantly as you type. No page reloads.' },
            { icon: Download, title: 'PDF Export', desc: 'High-quality, print-ready PDFs in one click.' },
            { icon: Shield, title: 'ATS-Optimized', desc: 'Every template is designed to pass ATS scanners.' },
          ].map(({ icon: Icon, title, desc }) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
              className="p-6 rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-bg-elevated)]"
            >
              <div className="h-10 w-10 rounded-[var(--radius-md)] bg-[var(--color-accent-subtle)] flex items-center justify-center mb-4">
                <Icon className="h-5 w-5 text-[var(--color-accent)]" />
              </div>
              <h3 className="font-semibold text-[var(--color-text-primary)] mb-1">{title}</h3>
              <p className="text-sm text-[var(--color-text-secondary)]">{desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-[var(--color-text-primary)]">
        <div className="max-w-2xl mx-auto text-center px-6">
          <h2 className="text-3xl font-bold text-white mb-4">Ready to land your next role?</h2>
          <p className="text-white/70 mb-8">Join thousands of job seekers who built their resume with {APP_NAME}.</p>
          <Link to={ROUTES.REGISTER}>
            <Button size="lg" className="bg-white !text-[var(--color-text-primary)] hover:bg-white/90">
              Create your resume — it's free
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-[var(--color-border)] py-8 px-6">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="h-6 w-6 rounded bg-[var(--color-accent)] flex items-center justify-center">
              <FileText className="h-3.5 w-3.5 text-white" />
            </div>
            <span className="text-sm font-bold text-[var(--color-text-primary)]">{APP_NAME}</span>
          </div>
          <p className="text-xs text-[var(--color-text-tertiary)]">
            © {new Date().getFullYear()} {APP_NAME}. Built with ❤️ for job seekers everywhere.
          </p>
        </div>
      </footer>
    </div>
  )
}
