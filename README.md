# ResumeForge — ATS Resume Builder

A production-grade SaaS resume builder built with React 19, TypeScript, Supabase, and Tailwind CSS v4.

## Features

- **4 ATS-optimized templates** — Classic Professional, Modern Minimal, Executive, Minimal Clean
- **15+ resume sections** — all draggable, toggle-able, fully editable
- **Live preview** — instant rendering as you type, with zoom controls  
- **Theme customizer** — colors, fonts, spacing, layout density
- **PDF export** — high-DPI A4 PDFs via html2pdf.js
- **Auto-save** — debounced Supabase writes after 1.5s idle
- **Dark mode** — system/light/dark with CSS custom properties
- **Auth** — email + Google OAuth, protected routes, session persistence
- **Dashboard** — grid/list view, search, sort, duplicate, rename, delete

## Tech Stack

React 19 · TypeScript · Vite · Tailwind CSS v4 · Zustand · React Hook Form · Framer Motion · @dnd-kit · Supabase · Sonner · html2pdf.js · Vercel

## Quick Start

```bash
# 1. Install
npm install

# 2. Set up Supabase
#    - Create project at supabase.com
#    - Run src/db/migrations/001_initial_schema.sql in SQL Editor
#    - Copy Project URL and anon key

# 3. Configure env
cp .env.example .env.local
# Edit .env.local with your Supabase credentials

# 4. Develop
npm run dev

# 5. Build
npm run build
```

## Supabase Setup

1. Create a free project at [supabase.com](https://supabase.com)
2. Run `src/db/migrations/001_initial_schema.sql` in the SQL Editor
3. Create Storage buckets: `avatars` (public), `resume-exports` (private), `template-previews` (public)
4. Enable Google OAuth under Authentication → Providers (optional)

## Deploy to Vercel

1. Push to GitHub
2. Import at [vercel.com/new](https://vercel.com/new)  
3. Add env vars: `VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY`
4. Deploy — `vercel.json` handles SPA routing and security headers

## Project Structure

```
src/
├── components/ui/           # Button, Input, Card, Modal, etc.
├── constants/               # Routes, limits, colors, fonts
├── contexts/                # AuthProvider, ThemeProvider
├── db/migrations/           # SQL schema + RLS policies
├── features/
│   ├── resume-builder/      # Builder panels, top bar, preview
│   └── pdf/                 # usePdfExport hook
├── layouts/                 # AuthLayout, AppLayout
├── pages/                   # Route-level components
├── routes/                  # AppRouter, ProtectedRoute, PublicRoute
├── services/                # Supabase data access layer
├── store/                   # Zustand (auth.store, resume-builder.store)
├── styles/                  # globals.css with CSS design tokens
├── templates/               # Resume template components + registry
└── types/                   # Domain types (resume, template, auth)
```

## License

MIT
