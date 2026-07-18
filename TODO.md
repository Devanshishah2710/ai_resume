# ResumeForge — Feature Review & TODO

This list was produced by auditing the codebase against the advertised features
(see `README.md`). Each item notes the current status and where the relevant
code lives.

> **Note on logout:** A logout/sign-out control **already exists** — it is not
> missing. See `src/layouts/AppLayout.tsx:134` (desktop top-bar icon) and
> `src/layouts/AppLayout.tsx:231` (mobile drawer), both wired to
> `authService.signOut()`. If a reviewer expected it elsewhere, consider making
> it more discoverable (e.g. a labeled entry in a user dropdown).

## Legend

- ✅ Implemented & wired
- 🟡 Partial / stub / dead-code
- ❌ Missing
- ⚠️ Needs verification (requires Supabase + runtime to confirm)

## Core Features

| # | Feature | Status | Notes / Location |
|---|---------|--------|------------------|
| 1 | Email + password login | ✅ | `src/pages/LoginPage.tsx`, `authService.signInWithEmail` |
| 2 | Google OAuth | ✅ (code) ⚠️ | `authService.signInWithGoogle`; needs OAuth configured in Supabase |
| 3 | Register / sign-up | ✅ (code) ⚠️ | `src/pages/RegisterPage.tsx`; relies on DB trigger for profile creation |
| 4 | Forgot / reset password | ✅ (code) ⚠️ | `ForgotPasswordPage`, `ResetPasswordPage`, `authService.sendPasswordReset` |
| 5 | Email verification | ✅ (code) ⚠️ | `VerifyEmailPage`, `authService.verifyEmail` |
| 6 | Protected routes | ✅ | `src/routes/ProtectedRoute.tsx`, `PublicRoute.tsx` |
| 7 | Session persistence | ✅ | `lib/supabase.ts` + `auth.store.ts` listener |

## Dashboard

| # | Feature | Status | Notes / Location |
|---|---------|--------|------------------|
| 8 | Resume grid / list view | ✅ | `DashboardPage.tsx` view-mode toggle |
| 9 | Search resumes | ✅ | `DashboardPage.tsx` |
| 10 | Sort (updated/created/title) | ✅ | `SORT_OPTIONS` |
| 11 | Create resume | ✅ | `CreateResumeModal` → `resumeService.createResume` |
| 12 | Duplicate | ✅ | `resumeService.duplicateResume` |
| 13 | Rename | ✅ | `RenameResumeModal` |
| 14 | Delete | ✅ | `DeleteResumeModal` |
| 15 | Skeleton loading | ✅ | `ResumeCardSkeleton` |
| 16 | Empty state | ✅ | `EmptyState` |
| 17 | Stats bar (downloads count) | ❌ | Header shows resume count only; no downloads stat. `resumeService.recordDownload` writes to `downloads` table but nothing reads it. |

## Resume Builder

| # | Feature | Status | Notes / Location |
|---|---------|--------|------------------|
| 18 | 3-panel editor (sections/design/preview) | ✅ | `ResumeBuilderPage.tsx` |
| 19 | Editable title (inline) | ✅ | `BuilderTopBar.tsx` |
| 20 | Auto-save indicator + debounce | ✅ | `resume-builder.store.ts` `scheduleSave`, `AUTO_SAVE_DELAY_MS` |
| 21 | 15+ sections, toggle/order | ✅ | `SectionsPanel`, `DEFAULT_SECTION_CONFIGS` (14 sections) |
| 22 | Drag & drop section reorder | 🟡 | `@dnd-kit` is a dependency but verify `SectionsPanel` actually wires sortable; needs runtime check |
| 23 | Live preview w/ zoom | ✅ | `BuilderPreviewPanel`, `previewScale` |
| 24 | Theme customizer (color/font/spacing) | ✅ | `DesignPanel.tsx` |
| 25 | Switch template (keep data) | 🟡 | `setTemplate` exists in store (`resume-builder.store.ts:231`) but **no UI calls it**. The Design tab shows current template id only (`BuilderLeftPanel.tsx:60`); switching is done by creating a new resume via `TemplatesPage`. See TODO #40. |
| 26 | Custom sections (add/remove/edit) | ✅ | `addCustomSection`, `CustomSection.tsx` |
| 27 | Section metadata (target role/notes) | 🟡 | `resume.metadata` exists in type + service patch, but Settings tab is a **stub** (`BuilderLeftPanel.tsx:60`, comment "will be expanded") |

## Templates

| # | Feature | Status | Notes / Location |
|---|---------|--------|------------------|
| 28 | 4 templates (classic/modern/exec/clean) | ✅ | `src/templates/registry.ts` |
| 29 | ATS-optimized rendering | ⚠️ | Templates render semantic HTML; needs manual ATS audit |
| 30 | Browse / search / filter | ✅ | `TemplatesPage.tsx` |
| 31 | Pro tier gating | 🟡 | `tier: 'free'` on all; no gating logic. `ACCOUNT`/billing routes exist in `ROUTES` but not in `AppRouter`. |
| 32 | Template preview images | ❌ | `registry.ts` references `/templates/<id>.png`; `public/templates/` does **not exist** → broken preview images. `MiniPreview` uses a decorative placeholder instead. |

## PDF Export

| # | Feature | Status | Notes / Location |
|---|---------|--------|------------------|
| 33 | High-DPI A4 PDF | ✅ (code) ⚠️ | `usePdfExport.ts`; needs runtime test. Uses `html2pdf.js`. |
| 34 | Export from builder | ✅ | `BuilderTopBar.tsx` |
| 35 | Export from preview page | ✅ | `ResumePreviewPage.tsx` |
| 36 | Download tracking | 🟡 | `resumeService.recordDownload` works but no UI consumes it (see #17) |

## Account / Settings

| # | Feature | Status | Notes / Location |
|---|---------|--------|------------------|
| 38 | Profile editing (name/headline/location/site) | ✅ | `SettingsPage.tsx`, `profileService.updateProfile` |
| 39 | Theme (light/dark/system) | ✅ | `useTheme`, `ThemeContext` |
| 40 | **Avatar upload** | ❌ | `profileService.uploadAvatar` exists but is **never called** — no file input/UI. `AppLayout` only shows initials. |
| 41 | Sign-out | ✅ | `AppLayout.tsx` (see note at top) |
| 42 | Billing / upgrade to Pro | 🟡 | `SettingsPage` shows "Upgrade to Pro" button with **no handler**; no Stripe/billing backend. |

## Backend / Infra

| # | Feature | Status | Notes / Location |
|---|---------|--------|------------------|
| 43 | DB schema migration | ❌ | `src/db/migrations/001_initial_schema.sql` is **empty** — no tables, no RLS. App cannot persist without it. |
| 44 | Storage buckets | ❌ | `avatars`, `resume-exports`, `template-previews` referenced but not created by any migration/script. |
| 45 | RLS policies | ❌ | No policies defined; required for security per `AGENTS.md`. |
| 46 | Profile auto-create trigger | 🟡 | `authService.signUp` mentions `handle_new_user` trigger as best-effort; trigger not present in migration. |

## Quality / DX

| # | Feature | Status | Notes / Location |
|---|---------|--------|------------------|
| 47 | Lint | ✅ | `oxlint` (`npm run lint`) |
| 48 | Typecheck + build | ✅ | `npm run build` (`tsc -b`) |
| 49 | Automated tests | ❌ | No test suite (per `AGENTS.md`/`CONTRIBUTING.md`). |
| 50 | Error boundary | ❌ | No React error boundary; unhandled render errors crash the SPA. |

## Prioritized Action Items

1. **Add DB migration + RLS** (#43–46) — blocker for any real persistence.
2. **Wire `setTemplate` into the Design tab** (#25) so users can switch templates without creating a new resume.
3. **Add avatar upload UI** (#40) or remove the unused `uploadAvatar` service.
4. **Add template preview images or remove the broken `previewImageUrl` refs** (#32).
5. **Implement or remove the Settings/metadata stub** (#27).
6. **Implement downloads stat** (#17) or document it as out of scope.
7. **Add an error boundary** (#50).
8. **Consider a test framework** (#49) — at minimum smoke tests for stores/services.
9. **Make sign-out more discoverable** if reviewers keep flagging it (see top note).
