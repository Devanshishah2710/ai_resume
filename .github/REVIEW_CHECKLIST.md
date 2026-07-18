# AI Code Review Checklist

Use this checklist to review any pull request against ResumeForge. Each item maps to a repo convention documented in `AGENTS.md`, `ARCHITECTURE.md`, and `CONTRIBUTING.md`.

## Required Gates (must pass before review is meaningful)

- [ ] `npm run lint` (oxlint) passes
- [ ] `npm run build` (`tsc -b` + `vite build`) passes
- [ ] No `.env.local`, `dist/`, `node_modules/`, or secrets committed
- [ ] No new `any` except the sanctioned Supabase `.from()` cast (documented inline)

## Types & Data Model

- [ ] Domain models changed in `src/types/` first, before implementation
- [ ] `DEFAULT_*` values updated alongside types in `src/types/resume.ts` when new fields added
- [ ] New magic strings/numbers added to `src/constants/index.ts` (not hardcoded)
- [ ] `ResumeData` remains decoupled from template rendering (templates are pure `(data, theme)`)

## State & Data Access

- [ ] Mutations go through `src/store/` actions; no direct state mutation outside the store
- [ ] Selector hooks reused where possible to avoid over-rendering
- [ ] Service methods scope queries by `user_id` / authenticated user
- [ ] Auto-save path preserved (mutating actions set `isDirty` and schedule save)

## UI & Components

- [ ] Small, single-purpose components; reused `src/components/ui/` primitives
- [ ] Page components are default-exported and lazy-loaded; others use named exports
- [ ] `@/` path alias used; no long relative imports
- [ ] 2-space indent, no semicolons, single quotes
- [ ] Top-of-file doc comments on non-trivial new files; no unnecessary inline comments
- [ ] `type` used instead of `interface` for domain models

## Security

- [ ] No `VITE_SUPABASE_*` values or PII logged/exposed
- [ ] Any `dangerouslySetInnerHTML` routes content through `src/utils/sanitize.ts`
- [ ] No auth bypass in `ProtectedRoute` / `PublicRoute`

## Templates

- [ ] New template registered in `src/templates/registry.ts` and lazy-loaded
- [ ] Template renders semantic, ATS-parseable HTML

## Notes

- The Supabase migration file `src/db/migrations/001_initial_schema.sql` is currently empty; review DB-related claims carefully.
- There is no test suite; correctness relies on lint + typecheck + manual verification.
