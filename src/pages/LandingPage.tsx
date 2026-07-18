/**
 * LandingPage — marketing homepage for unauthenticated users.
 *
 * Sections: sticky Navbar (with mobile menu), Hero, Features, Stats,
 * CTA, Footer. Built from shared UI primitives (Container, Section,
 * Button, Card) with one consistent vertical rhythm (py-20 lg:py-24)
 * and a single max-w-7xl content edge so every section aligns.
 */

import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  FileText,
  Zap,
  Download,
  Palette,
  Shield,
  ArrowRight,
  Menu,
  X,
  Check,
  Star,
} from 'lucide-react'
import { Button, Container, Section, Card } from '@/components/ui'
import { APP_NAME, APP_TAGLINE, ROUTES } from '@/constants'

const NAV_LINKS = [
  { label: 'Features', href: '#features' },
  { label: 'Templates', href: ROUTES.TEMPLATES },
  { label: 'Pricing', href: '#pricing' },
]

const FEATURES = [
  { icon: Palette, title: '15+ Templates', desc: 'Professional designs for every industry and career level.' },
  { icon: Zap, title: 'Live Preview', desc: 'See changes instantly as you type. No page reloads.' },
  { icon: Download, title: 'PDF Export', desc: 'High-quality, print-ready PDFs in one click.' },
  { icon: Shield, title: 'ATS-Optimized', desc: 'Every template is designed to pass ATS scanners.' },
]

const STATS = [
  { value: '50k+', label: 'Resumes created' },
  { value: '15+', label: 'Professional templates' },
  { value: '98%', label: 'ATS pass rate' },
  { value: '4.9★', label: 'Average rating' },
]

const FOOTER_LINKS = [
  {
    heading: 'Product',
    links: [
      { label: 'Features', href: '#features' },
      { label: 'Templates', href: ROUTES.TEMPLATES },
      { label: 'Pricing', href: '#pricing' },
    ],
  },
  {
    heading: 'Company',
    links: [
      { label: 'About', href: '#' },
      { label: 'Blog', href: '#' },
      { label: 'Careers', href: '#' },
    ],
  },
  {
    heading: 'Legal',
    links: [
      { label: 'Privacy', href: '#' },
      { label: 'Terms', href: '#' },
      { label: 'Contact', href: '#' },
    ],
  },
]

function Logo() {
  return (
    <Link to={ROUTES.HOME} className="flex items-center gap-2 shrink-0" aria-label={APP_NAME + ' home'}>
      <span className="flex h-8 w-8 items-center justify-center rounded-[var(--radius-md)] bg-[var(--color-accent)] shadow-sm">
        <FileText className="h-4 w-4 text-white" />
      </span>
      <span className="text-base font-bold tracking-tight text-[var(--color-text-primary)]">
        {APP_NAME}
      </span>
    </Link>
  )
}

function BrandMark({ className = '' }: { className?: string }) {
  return (
    <Link to={ROUTES.HOME} className={`flex items-center gap-2 ${className}`} aria-label={APP_NAME + ' home'}>
      <span className="flex h-7 w-7 items-center justify-center rounded-[var(--radius-md)] bg-[var(--color-accent)]">
        <FileText className="h-3.5 w-3.5 text-white" />
      </span>
      <span className="text-sm font-bold text-[var(--color-text-primary)]">{APP_NAME}</span>
    </Link>
  )
}

export default function LandingPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <div className="flex min-h-dvh flex-col bg-[var(--color-bg-primary)]">
      {/* ── Navbar ─────────────────────────────────────────────────────────── */}
      <header className="sticky top-0 z-50 border-b border-[var(--color-border)] bg-[var(--color-bg-primary)]/80 backdrop-blur-md">
        <Container className="flex h-16 items-center justify-between">
          <Logo />

          {/* Desktop nav */}
          <nav className="hidden items-center gap-1 md:flex">
            {NAV_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="rounded-[var(--radius-sm)] px-3 py-2 text-sm font-medium text-[var(--color-text-secondary)] transition-colors hover:text-[var(--color-text-primary)]"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="hidden items-center gap-2 md:flex">
            <Link to={ROUTES.LOGIN}>
              <Button variant="ghost" size="sm">Sign in</Button>
            </Link>
            <Link to={ROUTES.REGISTER}>
              <Button size="sm">Get started free</Button>
            </Link>
          </div>

          {/* Mobile toggle */}
          <button
            type="button"
            aria-label="Toggle navigation menu"
            aria-expanded={mobileMenuOpen}
            onClick={() => setMobileMenuOpen((o) => !o)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-[var(--radius-md)] text-[var(--color-text-secondary)] transition-colors hover:bg-[var(--color-bg-tertiary)] hover:text-[var(--color-text-primary)] md:hidden"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </Container>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            transition={{ duration: 0.2 }}
            className="border-t border-[var(--color-border)] bg-[var(--color-bg-primary)] md:hidden"
          >
            <Container className="flex flex-col gap-1 py-4">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="rounded-[var(--radius-md)] px-3 py-2.5 text-sm font-medium text-[var(--color-text-secondary)] transition-colors hover:bg-[var(--color-bg-tertiary)] hover:text-[var(--color-text-primary)]"
                >
                  {link.label}
                </a>
              ))}
              <div className="mt-2 flex flex-col gap-2">
                <Link to={ROUTES.LOGIN} onClick={() => setMobileMenuOpen(false)}>
                  <Button variant="ghost" fullWidth>Sign in</Button>
                </Link>
                <Link to={ROUTES.REGISTER} onClick={() => setMobileMenuOpen(false)}>
                  <Button fullWidth>Get started free</Button>
                </Link>
              </div>
            </Container>
          </motion.div>
        )}
      </header>

      <main className="flex-1">
        {/* ── Hero ─────────────────────────────────────────────────────────── */}
        <section className="relative overflow-hidden">
          {/* Soft accent glow */}
          <div
            aria-hidden
            className="pointer-events-none absolute left-1/2 top-0 -z-0 h-[420px] w-[min(820px,90vw)] -translate-x-1/2 rounded-full bg-[var(--color-accent)]/5 blur-3xl"
          />
          <Container size="narrow" className="relative px-4 py-20 text-center sm:py-24 lg:py-28">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mx-auto flex max-w-3xl flex-col items-center"
            >
              <span className="inline-flex items-center gap-1.5 rounded-full bg-[var(--color-accent-subtle)] px-3 py-1 text-xs font-medium text-[var(--color-accent)]">
                <Zap className="h-3 w-3" /> Free forever · No credit card required
              </span>

              <h1 className="mt-6 text-balance text-4xl font-bold tracking-tight text-[var(--color-text-primary)] leading-[1.1] sm:text-5xl lg:text-6xl">
                {APP_TAGLINE}
              </h1>

              <p className="mx-auto mt-5 max-w-xl text-base text-[var(--color-text-secondary)] sm:text-lg">
                Build ATS-optimized resumes in minutes with our professional templates,
                live preview, and one-click PDF export.
              </p>

              <div className="mt-8 flex w-full flex-col items-center justify-center gap-3 sm:w-auto sm:flex-row">
                <Link to={ROUTES.REGISTER} className="w-full sm:w-auto">
                  <Button size="lg" fullWidth rightIcon={<ArrowRight className="h-4 w-4" />}>
                    Build my resume free
                  </Button>
                </Link>
                <Link to={ROUTES.TEMPLATES} className="w-full sm:w-auto">
                  <Button size="lg" variant="secondary" fullWidth>
                    Browse templates
                  </Button>
                </Link>
              </div>

              <ul className="mt-6 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-xs text-[var(--color-text-tertiary)]">
                <li className="inline-flex items-center gap-1.5"><Check className="h-3.5 w-3.5 text-[var(--color-success)]" /> No credit card</li>
                <li className="inline-flex items-center gap-1.5"><Check className="h-3.5 w-3.5 text-[var(--color-success)]" /> Cancel anytime</li>
                <li className="inline-flex items-center gap-1.5"><Check className="h-3.5 w-3.5 text-[var(--color-success)]" /> ATS-friendly</li>
              </ul>
            </motion.div>
          </Container>
        </section>

        {/* ── Features ─────────────────────────────────────────────────────── */}
        <Section id="features" className="scroll-mt-20">
          <div className="mx-auto max-w-2xl text-center">
            <span className="text-sm font-semibold uppercase tracking-wide text-[var(--color-accent)]">
              Features
            </span>
            <h2 className="mt-2 text-3xl font-bold tracking-tight text-[var(--color-text-primary)] sm:text-4xl">
              Everything you need to land the interview
            </h2>
            <p className="mt-4 text-[var(--color-text-secondary)]">
              Powerful tools that turn a blank page into a job-winning resume.
            </p>
          </div>

          <div className="mt-14 grid auto-rows-fr grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {FEATURES.map(({ icon: Icon, title, desc }, i) => (
              <motion.div
                key={title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
              >
                <Card hover padding="lg" className="h-full">
                  <div className="flex h-11 w-11 items-center justify-center rounded-[var(--radius-md)] bg-[var(--color-accent-subtle)]">
                    <Icon className="h-5 w-5 text-[var(--color-accent)]" />
                  </div>
                  <h3 className="mt-5 font-semibold text-[var(--color-text-primary)]">{title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-[var(--color-text-secondary)]">{desc}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </Section>

        {/* ── Stats ────────────────────────────────────────────────────────── */}
        <Section className="border-y border-[var(--color-border)] bg-[var(--color-bg-secondary)] py-14 sm:py-16 lg:py-20">
          <div className="grid grid-cols-2 gap-y-10 sm:grid-cols-4">
            {STATS.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-4xl font-bold tracking-tight text-[var(--color-text-primary)] sm:text-5xl">
                  {stat.value}
                </div>
                <div className="mt-2 text-sm text-[var(--color-text-secondary)]">{stat.label}</div>
              </div>
            ))}
          </div>
        </Section>

        {/* ── CTA ──────────────────────────────────────────────────────────── */}
        <Section id="pricing" className="scroll-mt-20">
          <Container>
            <div className="relative overflow-hidden rounded-[var(--radius-xl)] bg-[var(--color-accent)] px-6 py-16 text-center shadow-[var(--shadow-lg)] sm:px-12 sm:py-20">
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 opacity-20"
                style={{
                  backgroundImage:
                    'radial-gradient(circle at 1px 1px, white 1px, transparent 0)',
                  backgroundSize: '28px 28px',
                }}
              />
              <div className="relative mx-auto max-w-2xl">
                <div className="mx-auto inline-flex items-center gap-1 rounded-full bg-white/15 px-3 py-1 text-xs font-medium text-white">
                  <Star className="h-3 w-3" /> Loved by 50,000+ job seekers
                </div>
                <h2 className="mt-5 text-3xl font-bold tracking-tight text-white sm:text-4xl">
                  Ready to land your next role?
                </h2>
                <p className="mx-auto mt-4 max-w-xl text-white/80">
                  Join thousands of job seekers who built their resume with {APP_NAME}.
                </p>
                <div className="mt-8 flex justify-center">
                  <Link to={ROUTES.REGISTER}>
                    <Button size="lg" variant="white">
                      Create your resume — it's free
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </Container>
        </Section>
      </main>

      {/* ── Footer ─────────────────────────────────────────────────────────── */}
      <footer className="border-t border-[var(--color-border)] bg-[var(--color-bg-primary)]">
        <Container className="py-14">
          <div className="grid grid-cols-2 gap-x-8 gap-y-10 sm:grid-cols-3 lg:grid-cols-4">
            <div className="col-span-2 sm:col-span-3 lg:col-span-1">
              <BrandMark />
              <p className="mt-4 max-w-xs text-sm leading-relaxed text-[var(--color-text-tertiary)]">
                Build ATS-optimized resumes that get interviews. Free forever.
              </p>
            </div>

            {FOOTER_LINKS.map((group) => (
              <div key={group.heading}>
                <h3 className="text-sm font-semibold text-[var(--color-text-primary)]">
                  {group.heading}
                </h3>
                <ul className="mt-4 space-y-3">
                  {group.links.map((link) => (
                    <li key={link.label}>
                      <a
                        href={link.href}
                        className="text-sm text-[var(--color-text-secondary)] transition-colors hover:text-[var(--color-text-primary)]"
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-[var(--color-border)] pt-6 sm:flex-row">
            <p className="text-xs text-[var(--color-text-tertiary)]">
              © {new Date().getFullYear()} {APP_NAME}. Built with ❤️ for job seekers everywhere.
            </p>
            <div className="flex items-center gap-5 text-xs text-[var(--color-text-tertiary)]">
              <a href="#" className="transition-colors hover:text-[var(--color-text-primary)]">Privacy</a>
              <a href="#" className="transition-colors hover:text-[var(--color-text-primary)]">Terms</a>
            </div>
          </div>
        </Container>
      </footer>
    </div>
  )
}
