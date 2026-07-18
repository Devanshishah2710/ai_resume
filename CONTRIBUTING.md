# Contributing

Thanks for contributing to ResumeForge. This guide is written to be usable by both humans and AI agents.

## Prerequisites

- Node 18+ and npm
- A Supabase project (URL + anon key) for local dev and any feature touching data/auth
- Copy `.env.example` → `.env.local` and fill in credentials

Full step-by-step setup, Supabase schema, and Vercel deploy are in
[`docs/DEVELOPMENT.md`](./docs/DEVELOPMENT.md). Read
[`docs/PROJECT_OVERVIEW.md`](./docs/PROJECT_OVERVIEW.md) first for a repo map.

## Local Setup

```bash
npm install
cp .env.example .env.local   # then edit with your Supabase values
npm run dev
```

## Before You Open a PR

Run the two required gates (both must pass):

```bash
npm run lint
npm run build
```

`npm run build` runs `tsc -b` (type checking) then `vite build`. It is the source of truth for type correctness.

## How to Make a Change

1. **Types first.** Add or change domain models in `src/types/` before implementation. Defaults (`DEFAULT_*`) live alongside them in `src/types/resume.ts`.
2. **Constants.** Put new magic strings/numbers in `src/constants/index.ts`. Do not hardcode.
3. **Data access.** Add/extend Supabase calls in `src/services/`. Scope queries by the authenticated user. Use the documented `any` cast on `.from()` (SDK bug) — keep it contained.
4. **State.** Expose mutations through `src/store/` actions; never mutate state outside the store.
5. **UI.** Build small, single-purpose components. Reuse `src/components/ui/` primitives. Default-export only page components.

## Coding Standards (for reviewers)

- TypeScript strict; avoid `any` except the sanctioned Supabase cast.
- Use `type`, not `interface`, for domain models.
- 2-space indent, no semicolons, single quotes.
- Top-of-file doc comments on non-trivial files; no inline comments unless logic is non-obvious.
- Path alias `@/` for everything under `src/`.

## Pull Request Guidelines

- Keep PRs focused on one concern.
- Describe the change, the affected layers, and how you verified it (lint + build output).
- Reference issue numbers where applicable.
- Do not commit `.env.local`, `dist/`, `node_modules/`, or secrets.

## Adding a Resume Template

1. Create `src/templates/<id>/index.tsx` exporting a default component that takes `(data, theme)`.
2. Add an entry in `src/templates/registry.ts` keyed by `templateId`.
3. Ensure it renders semantic, ATS-parseable HTML.
4. No other wiring required.

## No Test Suite (yet)

There is currently no automated test runner. Verification relies on `npm run lint` and `npm run build`. PRs that add tests are especially welcome — coordinate on the framework first.
