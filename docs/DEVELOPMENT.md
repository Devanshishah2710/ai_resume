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
4. (Optional but recommended) **Enable Google OAuth** — see
   [Google OAuth Setup](#google-oauth-setup) below. Without this, the "Continue
   with Google" button fails with `400 Unsupported provider: provider is not
   enabled`. Set `VITE_ENABLE_GOOGLE_AUTH=false` to hide the button until the
   provider is configured.
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

## Google OAuth Setup

The `400 validation_failed: Unsupported provider: provider is not enabled` error
is returned **by Supabase**, not the frontend. It means the Google provider is
disabled (or unconfigured) in the Supabase project that your `VITE_SUPABASE_URL`
points to. No code change can enable a disabled provider — it must be configured
in the dashboards below.

### 1. Google Cloud Console

1. Go to [console.cloud.google.com](https://console.cloud.google.com) → **APIs &
   Services → Credentials → Create Credentials → OAuth client ID**.
2. Application type: **Web application**.
3. **Authorized JavaScript origins** — add each environment:
   - `http://localhost:5173` (dev)
   - `https://<your-codespace>-5173.app.github.dev` (Codespaces, if used)
   - `https://resumeforge.vercel.app` (production)
4. **Authorized redirect URIs** — add the Supabase callback URL:
   - `https://<your-project>.supabase.co/auth/v1/callback`
5. Copy the **Client ID** and **Client Secret**.
6. **OAuth consent screen**: set it to *External*, add your app name/email, and
   either **Publish** the app or add test users under *Test users* (unpublished
   apps reject non-test accounts).

### 2. Supabase Dashboard

1. **Authentication → Providers → Google** → toggle **Enabled**.
2. Paste the Google **Client ID** and **Client Secret**.
3. Leave the default **Redirect URL** as
   `https://<your-project>.supabase.co/auth/v1/callback` (matches Google's
   authorized redirect URI above).
4. Save.

### 3. Redirect URLs in the app

The frontend redirects to `${window.location.origin}/auth/callback`
(`ROUTES.AUTH_CALLBACK`) and exchanges the session automatically
(`detectSessionInUrl: true` in `src/lib/supabase.ts`). After sign-in the user
lands on `/dashboard`. Ensure `window.location.origin` matches an authorized
JavaScript origin you added in step 1 (localhost, Codespaces, or your prod
domain).

### 4. Verify

- Click **Continue with Google** → redirected to Google → choose account →
  redirected back to `/auth/callback` → `/dashboard`.
- New users are auto-created; existing users are logged in; the session
  persists via `persistSession: true`.
- Email/password auth is unaffected.

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
