# AGENTS.md

Guidance for AI agents and human contributors working in this repository. Read this before making or reviewing changes.

## Project

**ResumeForge** — an ATS-optimized SaaS resume builder. Single-page React app with a Supabase backend, deployed on Vercel.

## Tech Stack

- **Framework:** React 19 + TypeScript (strict), built with Vite
- **Styling:** Tailwind CSS v4 (via `@tailwindcss/vite` + PostCSS), CSS custom properties in `src/styles/globals.css`
- **State:** Zustand (`src/store/`)
- **Forms:** React Hook Form
- **Routing:** React Router v7 (lazy-loaded routes)
- **Backend:** Supabase (auth, Postgres, storage)
- **Drag & drop:** `@dnd-kit`
- **Animation:** Framer Motion
- **PDF export:** `html2pdf.js`
- **Toasts:** Sonner
- **Linter:** oxlint

## Commands

| Task | Command |
|------|---------|
| Install | `npm install` |
| Dev server | `npm run dev` |
| Production build (typechecks first) | `npm run build` |
| Lint | `npm run lint` |
| Preview built app | `npm run preview` |

There is **no separate typecheck script**; `npm run build` runs `tsc -b` before `vite build`. There is currently **no test suite**.

### Required before completing a change

Always run both:

```bash
npm run lint
npm run build
```

Both must pass. `build` is the source of truth for type correctness.

## Environment

Copy `.env.example` to `.env.local` and set:

- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_ANON_KEY`

The Supabase client (`src/lib/supabase.ts`) throws at startup if these are missing. Never commit `.env.local` or any secrets.

Full setup, Supabase schema, and Vercel deploy steps are in [`docs/DEVELOPMENT.md`](./docs/DEVELOPMENT.md). A repo map for agents is in [`docs/PROJECT_OVERVIEW.md`](./docs/PROJECT_OVERVIEW.md).

## Import Conventions

- Use the `@/` path alias for everything under `src/` (e.g. `import { ROUTES } from '@/constants'`). Do not use long relative paths.
- Prefer named exports. Page components are the exception — they are **default-exported** because they are lazy-loaded in `src/routes/AppRouter.tsx`.

## Code Style

- TypeScript strict mode; avoid `any`. The one sanctioned exception is the Supabase `.from()` cast in service files, documented inline (SDK circular-generic bug).
- Use `type` aliases (not `interface`) for domain models, matching `src/types/`.
- Keep files focused. Section files, panels, and UI primitives are intentionally small and single-purpose.
- File-header doc comments describe purpose and architectural intent — preserve/extend this style on non-trivial files.
- **Do not add inline comments** unless the logic is genuinely non-obvious; the codebase favors self-documenting code with top-of-file summaries.
- Follow existing formatting (2-space indent, no semicolons, single quotes).

## Data & Constants

- All magic strings/numbers live in `src/constants/index.ts` (routes, table names, limits, PDF config, theme options). Reuse these; do not hardcode.
- Domain types live in `src/types/`. Update the type first, then implementations.
- Default values (`DEFAULT_THEME`, `DEFAULT_RESUME_DATA`, `DEFAULT_SECTION_CONFIGS`) live alongside their types in `src/types/resume.ts`.

## Security

- Never log or expose `VITE_SUPABASE_*` values or user PII.
- Access control is enforced by Supabase Row Level Security; service methods must scope queries by the authenticated user where applicable.
- Never introduce `dangerouslySetInnerHTML` without routing content through `src/utils/sanitize.ts`.

## Git

- Do not commit, push, or open PRs unless explicitly asked.
- Never commit `.env.local`, `dist/`, or `node_modules/`.
