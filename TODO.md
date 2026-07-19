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
| 25 | Switch template (keep data) | ✅ | `setTemplate` is now wired into `DesignPanel.tsx` — users switch templates in-place without losing content. |
| 26 | Custom sections (add/remove/edit) | ✅ | `addCustomSection`, `CustomSection.tsx` |
| 27 | Section metadata (target role/notes) | ✅ | Builder SettingsPanel now edits `metadata` (target role/company/notes) via `updateMetadata` store action. |

## Templates

| # | Feature | Status | Notes / Location |
|---|---------|--------|------------------|
| 28 | 4 templates (classic/modern/exec/clean) | ✅ | `src/templates/registry.ts` |
| 29 | ATS-optimized rendering | ⚠️ | Templates render semantic HTML; needs manual ATS audit |
| 30 | Browse / search / filter | ✅ | `TemplatesPage.tsx` |
| 31 | Pro tier gating | 🟡 | `tier: 'free'` on all; no gating logic. `ACCOUNT`/billing routes exist in `ROUTES` but not in `AppRouter`. |
| 32 | Template preview images | ✅ | `previewImageUrl` is optional and points at the `template-previews` storage path; broken `/templates/*.png` literals removed. Drop `<id>.png` in the bucket to enable real previews. |

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
| 40 | **Avatar upload** | ✅ | Wired into `SettingsPage.tsx` Profile card via `profileService.uploadAvatar` (file input + preview). |
| 41 | Sign-out | ✅ | `AppLayout.tsx` (see note at top) |
| 42 | Billing / upgrade to Pro | 🟡 | "Upgrade to Pro" button now shows an informative toast (no handler yet); no Stripe/billing backend. `subscriptions` table + RLS added to support it later. |

## Backend / Infra

| # | Feature | Status | Notes / Location |
|---|---------|--------|------------------|
| 43 | DB schema migration | ✅ | `src/db/migrations/001_initial_schema.sql` now creates all tables (was empty). |
| 44 | Storage buckets | ✅ | `avatars` (public), `resume-exports` (private), `template-previews` (public) created by migration with policies. |
| 45 | RLS policies | ✅ | Owner-scoped policies on every table; public read for public resumes. |
| 46 | Profile auto-create trigger | ✅ | `handle_new_user` trigger added; `authService.signUp` still upserts as fallback. |

## Quality / DX

| # | Feature | Status | Notes / Location |
|---|---------|--------|------------------|
| 47 | Lint | ✅ | `oxlint` (`npm run lint`) |
| 48 | Typecheck + build | ✅ | `npm run build` (`tsc -b`) |
| 49 | Automated tests | 🟡 | Vitest configured + 1 passing test (`auth.store.test.ts`). No store/service smoke tests yet. |
| 50 | Error boundary | ✅ | `src/components/common/ErrorBoundary.tsx` wraps the app in `main.tsx`. |

## Prioritized Action Items

1. ~~**Add DB migration + RLS** (#43–46) — DONE. `src/db/migrations/001_initial_schema.sql` now creates `profiles`, `resumes`, `resume_versions`, `downloads`, `user_settings`, `subscriptions`, RLS policies (owner-scoped), `handle_new_user` + `updated_at` triggers, and the three storage buckets with policies. Note: `supabase-types.ts` was also realigned to match the migration (it previously described a divergent `resume_versions`/`user_settings` shape).~~
2. ~~**Wire `setTemplate` into the Design tab** (#25) — DONE. `DesignPanel.tsx` has a Template switcher calling the existing `setTemplate` store action.~~
3. ~~**Add avatar upload UI** (#40) — DONE. Wired `profileService.uploadAvatar` into the Settings Profile card (file input + preview).~~
4. ~~**Add template preview images or remove the broken `previewImageUrl` refs** (#32) — DONE. `previewImageUrl` is now optional and points at the `template-previews` storage path via `getTemplatePreviewUrl`; broken `/templates/*.png` literals removed. Drop a `<id>.png` in the bucket to enable real previews.~~
5. ~~**Implement or remove the Settings/metadata stub** (#27) — DONE. Builder SettingsPanel edits `metadata` (target role/company/notes) via a new `updateMetadata` store action and links to the Design tab for template switching.~~
6. **Implement downloads stat** (#17) — still open. `resumeService.recordDownload` writes to `downloads`; nothing reads it. Either surface a count on the dashboard or document as out of scope.
7. ~~**Add an error boundary** (#50) — DONE. `src/components/common/ErrorBoundary.tsx` wraps the app in `main.tsx`.~~
8. **Consider a test framework** (#49) — partial. Vitest is configured (1 passing test: `auth.store.test.ts`). Recommend store/service smoke tests; see notes below.
9. ~~Make sign-out more discoverable — DONE (see top note); remains icon-only but now also reachable.~~

### Auth service verification (2026-07-19)

Reviewed `src/services/auth.service.ts`, `src/store/auth.store.ts`, `src/lib/supabase.ts`,
and `src/lib/supabase-types.ts` against the new migration:

- ✅ `signUp` upserts `profiles { id, full_name }` — matches the schema; the `handle_new_user`
  trigger also backfills `full_name` from `raw_user_meta_data`, so signup never hard-fails.
- ✅ `signInWithEmail` / `signInWithGoogle` / `signOut` / `sendPasswordReset` / `updatePassword`
  delegate to `supabase.auth` directly (correct — these are not table operations).
- ✅ `verifyEmail` uses `verifyOtp({ token_hash, type })` — PKCE-safe; works with the
  confirmation links the app generates (`emailRedirectTo: /verify-email`).
- ✅ `profiles` RLS is owner-scoped (select/insert/update by `auth.uid() = id`).
- ⚠️ **Duplication:** profile-sync logic exists in both `auth.service.ts`
  (`syncAuthStateFromSession`) and `auth.store.ts` (`syncAuthStateFromSession`). They use
  different stores (`useAuthStore` vs the local `set`). Not a bug, but a candidate for
  consolidation.
- ⚠️ `isSupabaseReady`/`supabaseConfigError` guard the email + Google flows but `signOut`
  and the store `initialize()` also handle a missing client independently — consistent.

Net: auth services are correct and consistent with the new schema. The only loose end is
the duplicate profile-sync helper (low priority).
