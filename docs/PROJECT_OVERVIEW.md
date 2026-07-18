# Project Overview — ResumeForge

**Single entry point for agents.** Read this first. It maps the repository so
you can make or review changes without reading every file. Linked docs hold the
details: [`AGENTS.md`](../AGENTS.md) (conventions),
[`ARCHITECTURE.md`](../ARCHITECTURE.md) (design),
[`CONTRIBUTING.md`](../CONTRIBUTING.md) (workflow),
[`TODO.md`](../TODO.md) (known gaps), [`docs/DEVELOPMENT.md`](./DEVELOPMENT.md)
(setup).

## TL;DR

- **What:** ATS-optimized SaaS resume builder. React 19 SPA, Supabase backend, Vercel deploy.
- **No custom server.** All persistence/auth goes through Supabase (Postgres + Auth + Storage).
- **State:** Zustand. **Data access:** `src/services/*`. **Types:** `src/types/*`.
- **Gates before done:** `npm run lint` AND `npm run build` must pass.
- **Biggest open risk:** the DB migration file is **empty** — nothing persists until schema + RLS are added.

## What an agent needs to know to act

### Before any change
1. Run `npm run lint` and `npm run build`. Both must pass.
2. Follow conventions in `AGENTS.md`: `@/` alias, `type` not `interface`, 2-space/no-semicolons/single-quotes, no unnecessary inline comments, top-of-file doc comments on non-trivial files.
3. Never commit `.env.local`, `dist/`, `node_modules/`, or secrets. Never log `VITE_SUPABASE_*` or PII.
4. Route any `dangerouslySetInnerHTML` through `src/utils/sanitize.ts`.

### Where to put things
| Concern | Location |
|---------|----------|
| Route table | `src/routes/AppRouter.tsx` |
| Auth gate | `src/routes/ProtectedRoute.tsx`, `PublicRoute.tsx` |
| App shell | `src/layouts/AppLayout.tsx` (top bar + sidebar + sign-out) |
| Pages | `src/pages/*` (default-exported, lazy-loaded) |
| Builder UI | `src/features/resume-builder/*` (panels, top bar, preview) |
| PDF export | `src/features/pdf/hooks/usePdfExport.ts` |
| Reusable UI | `src/components/ui/*` |
| Auth/Theme context | `src/contexts/*` |
| **State (canonical resume)** | `src/store/resume-builder.store.ts` |
| **State (auth)** | `src/store/auth.store.ts` |
| **Supabase CRUD** | `src/services/*` (scope queries by `user_id`) |
| Supabase client | `src/lib/supabase.ts` (validates env at startup) |
| Domain types + defaults | `src/types/resume.ts` (`DEFAULT_THEME`, `DEFAULT_RESUME_DATA`, `DEFAULT_SECTION_CONFIGS`) |
| Constants/magic values | `src/constants/index.ts` (routes, table names, limits, PDF config) |
| Utilities | `src/utils/*` (`slug`, `date`, `id`, `sanitize`) |
| Templates | `src/templates/registry.ts` (add entry + `src/templates/<id>/index.tsx`) |
| Design tokens | `src/styles/globals.css` (CSS custom properties) |
| DB schema/RLS | `src/db/migrations/001_initial_schema.sql` (**empty — TODO**) |

### Data flow (resume editor)
1. `ResumeBuilderPage` → `loadResume(id)` in store → `resumeService.getResume`.
2. Store holds the canonical `Resume`; panels mutate via typed actions.
3. Every mutating action sets `isDirty` and schedules debounced `saveResume` (`AUTO_SAVE_DELAY_MS = 1500`).
4. Preview renders the active template from `templateRegistry` with `(data, theme)`.
5. Switching templates changes only `resume.templateId` — never content.
**Invariant:** `ResumeData` is fully decoupled from template rendering.

## Conventions cheat-sheet
- Imports: `@/...` alias. Named exports everywhere **except** page components (default-exported, lazy-loaded).
- Types: `type` aliases; avoid `any` — the one sanctioned `any` is `supabase.from(...)` cast in services (SDK bug, documented inline).
- Mutations go through store actions; never mutate state directly. Reuse selector hooks at the bottom of `resume-builder.store.ts`.
- New magic strings/numbers → `src/constants/index.ts`. New types → `src/types/` (+ update defaults).

## Feature status (brief)
Full table in `TODO.md`. Highlights:
- ✅ Auth (email/Google/OAuth/verify/reset), dashboard CRUD, 3-panel builder, live preview, theme customizer, PDF export, 4 templates, dark mode, sign-out.
- ❌ **Empty DB migration / no RLS / no storage buckets** (#43–46) — top blocker.
- 🟡 `setTemplate` has no UI (can't switch template on existing resume); `uploadAvatar` service is unused (no UI); Settings tab is a stub; template preview images referenced but `public/templates/` missing; no downloads stat; no billing backend; no tests; no error boundary.

## Reviewing a PR
Use `.github/REVIEW_CHECKLIST.md` and `.github/PULL_REQUEST_TEMPLATE.md`. Confirm
both gates pass and that changes stay within the layers described above.

## Common pitfalls
- Adding a field to `Resume`/`ResumeData`? Update the type **and** `DEFAULT_*` in `src/types/resume.ts`, plus the row mapping in `resume.service.ts`.
- Never call `supabase.auth` or `supabase.from` directly from components — go through `services/` and `store/`.
- The migration file is empty; do not assume tables/RLS exist.
- `html2pdf.js` export targets the DOM node `#resume-preview-root`.
