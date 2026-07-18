# Development Guide

This guide is for contributors and agents setting up ResumeForge locally. For a
high-level map of the codebase, read [`PROJECT_OVERVIEW.md`](./PROJECT_OVERVIEW.md)
first. Contributor conventions live in [`../AGENTS.md`](../AGENTS.md) and
[`../CONTRIBUTING.md`](../CONTRIBUTING.md).

## Prerequisites

- Node 18+ and npm
- A Supabase project (URL + anon key)
- A Gemini API key if running the OpenCode GitHub agent (see `.github/workflows/opencode.yml`)

## Local Setup

```bash
# 1. Install
npm install

# 2. Configure env
cp .env.example .env.local
# Edit .env.local with your Supabase credentials:
#   VITE_SUPABASE_URL=https://your-project.supabase.co
#   VITE_SUPABASE_ANON_KEY=your-anon-key-here

# 3. Set up Supabase (see below)

# 4. Develop
npm run dev

# 5. Build / typecheck
npm run build

# 6. Lint
npm run lint
```

The Supabase client (`src/lib/supabase.ts`) **throws at startup** if the env vars
are missing, so configure them before running.

## Supabase Setup

1. Create a free project at [supabase.com](https://supabase.com).
2. **Create the database schema.** Run the SQL in
   `src/db/migrations/001_initial_schema.sql` in the SQL Editor.
   > ⚠️ **This file is currently empty.** Tables, RLS policies, and storage
   > buckets must be added before the app can persist data. See
   > [`TODO.md`](../TODO.md) items #43–46.
3. Create Storage buckets: `avatars` (public), `resume-exports` (private),
   `template-previews` (public).
4. Enable **Google OAuth** under Authentication → Providers (optional).
5. (Recommended) Add a `handle_new_user` trigger on `auth.users` to auto-create
   a `profiles` row. `authService.signUp` also upserts a profile as a fallback.

## Database tables

The app expects these tables (column mapping is in the service layer):

| Table | Purpose |
|-------|---------|
| `profiles` | User profile (full name, headline, location, website, plan, avatar) |
| `resumes` | Resume documents (title, slug, template_id, theme, sections, data, metadata) |
| `resume_versions` | Version history (reserved) |
| `downloads` | PDF export events (written by `resumeService.recordDownload`) |
| `user_settings` | Per-user settings (reserved) |
| `subscriptions` | Billing (not implemented) |

See `DB_TABLES` in `src/constants/index.ts` for the canonical names.

## Deploy to Vercel

1. Push to GitHub.
2. Import at [vercel.com/new](https://vercel.com/new).
3. Add env vars: `VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY`.
4. Deploy — `vercel.json` handles SPA routing (rewrites to `index.html`) and
   security headers. The build command is `npm run build`, output `dist`.

## Running the OpenCode GitHub agent

See `.github/workflows/opencode.yml`. Install the
[opencode-agent GitHub App](https://github.com/apps/opencode-agent), add the
`GEMINI_API_KEY` secret, and comment `/oc` or `/opencode` on an issue/PR to
invoke the agent. The agent replies in the same thread.

## Scripts

| Task | Command |
|------|---------|
| Dev server | `npm run dev` |
| Production build (typechecks first) | `npm run build` |
| Lint | `npm run lint` |
| Preview built app | `npm run preview` |

`npm run build` runs `tsc -b` then `vite build`; it is the source of truth for
type correctness. There is no separate test runner yet.
