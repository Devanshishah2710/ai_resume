# Architecture

This document explains the high-level architecture of ResumeForge for reviewers who need to understand how the system fits together before reading code.

## System Overview

ResumeForge is a client-only SPA. There is **no custom backend server** — all persistence and auth go through Supabase (Postgres + Auth + Storage). The app is built with Vite and deployed as a static site on Vercel.

```
Browser (React SPA)
   │
   ├── Zustand stores (client state)
   ├── Supabase client (lib/supabase.ts)
   │      ├── Auth  → Supabase Auth
   │      ├── DB    → Postgres (resumes, profiles, …)
   │      └── Storage → avatars / resume-exports / template-previews
   └── PDF export (html2pdf.js, client-side)
```

## Layered Structure

| Layer | Location | Responsibility |
|-------|----------|----------------|
| Pages | `src/pages/` | Route-level screens; default-exported & lazy-loaded |
| Layouts | `src/layouts/` | `AppLayout` (authed chrome), `AuthLayout` (centered auth) |
| Routes | `src/routes/` | `AppRouter` (route table), `ProtectedRoute`, `PublicRoute` |
| Features | `src/features/` | Feature-scoped UI (builder panels, PDF export hook) |
| Components | `src/components/ui/` | Reusable primitives (Button, Modal, Input, …) |
| Contexts | `src/contexts/` | `AuthContext`, `ThemeContext` |
| Stores | `src/store/` | Zustand state (`auth.store`, `resume-builder.store`) |
| Services | `src/services/` | Supabase data-access layer (CRUD) |
| Lib | `src/lib/` | Supabase client singleton + generated types |
| Types | `src/types/` | Domain models (`resume`, `template`, `auth`, `common`) |
| Constants | `src/constants/` | Routes, table names, limits, PDF config, theme options |
| Utils | `src/utils/` | `slug`, `date`, `id`, `sanitize` |
| Templates | `src/templates/` | Resume rendering components + registry |
| Styles | `src/styles/` | `globals.css` design tokens (CSS custom properties) |
| DB | `src/db/migrations/` | SQL schema + RLS policies |

## Data Flow (Resume Builder)

1. `ResumeBuilderPage` mounts → `loadResume(id)` in `resume-builder.store` calls `resumeService.getResume`.
2. Store holds the canonical `Resume` object; panels mutate it via typed actions (`updateExperience`, `toggleSectionVisibility`, …).
3. Every mutating action sets `isDirty = true` and schedules a debounced `saveResume` (`AUTO_SAVE_DELAY_MS = 1500`).
4. The preview panel renders the active template from `templateRegistry`, passing `resume.data` + `resume.theme`.
5. Switching templates only changes `resume.templateId` — never the content.

**Key invariant:** The resume data model (`ResumeData`) is fully decoupled from template rendering. Templates are pure functions of `(data, theme)`.

## State Management Notes

- Zustand is used with `subscribeWithSelector` for selective re-renders.
- Selector hooks (`useResume`, `useResumeData`, `useResumeTheme`, …) live at the bottom of `resume-builder.store.ts`.
- Auto-save timer is module-scoped, not stored in state.

## Routing & Auth

- `ProtectedRoute` redirects unauthenticated users to `/login`.
- `PublicRoute` redirects authenticated users away from `/login`, `/register`, `/forgot-password`.
- All pages are `lazy()`-loaded; a single `Suspense` boundary in `AppRouter` shows a `PageLoader`.
- SPA routing on Vercel is handled by `vercel.json` rewrites to `index.html`.

## Templates

- `src/templates/registry.ts` is the single source of truth, keyed by `templateId` (matches DB column).
- Templates are `lazy()`-loaded. To add one: create `src/templates/<id>/index.tsx` and register it — no other wiring needed.
- Each template receives `data` + `theme` and must render ATS-parseable, semantic HTML.

## Styling

- Tailwind v4 via `@tailwindcss/vite`.
- Design tokens (colors, spacing) are CSS custom properties defined in `src/styles/globals.css`; themes map `ResumeTheme` values onto those variables.
- Dark mode uses system/light/dark via `ThemeContext` toggling a root attribute.

## Security Model

- No secrets in client code beyond the Supabase anon key (safe by design; RLS enforces access).
- All table access is scoped by `user_id` via Supabase Row Level Security (see `src/db/migrations/`).
- `src/lib/supabase.ts` validates required env vars at startup and throws if missing.
- User-generated HTML must pass through `src/utils/sanitize.ts` before `dangerouslySetInnerHTML`.

## Known Tech Debt / Caveats

- `resume.service.ts` casts `supabase.from(...)` to `any` to work around a Supabase SDK circular-generic bug — this is intentional and documented inline.
- `src/db/migrations/001_initial_schema.sql` is currently empty; RLS policies and table DDL must be supplied before production use.
- No automated tests exist yet (oxlint + `tsc` are the only gates).
