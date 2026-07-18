# ResumeForge — ATS Resume Builder

**ResumeForge** is a free, ATS-optimized resume builder. Pick a template, fill in your details with a live preview, customize the look, and export a print-ready PDF — all in the browser.

> **Live demo:** [ai-resume-pi-one.vercel.app](https://ai-resume-pi-one.vercel.app/)
>
> Developers: setup, architecture, and contribution guides live in [`docs/`](./docs). Start with [`docs/PROJECT_OVERVIEW.md`](./docs/PROJECT_OVERVIEW.md).

## What you can do

- **Build a resume from scratch** — create a new resume, choose a template, and start editing.
- **Use ATS-friendly templates** — every template is designed to pass Applicant Tracking System scanners.
- **Edit with live preview** — changes render instantly as you type, with zoom controls.
- **Customize the design** — pick accent colors, fonts, spacing, and layout density from the Design tab.
- **Organize with sections** — 14 built-in sections (experience, education, projects, skills, certifications, and more), each toggle-able, reorderable, and editable. Add your own custom sections.
- **Stay safe with auto-save** — your work is saved automatically (debounced) to your account.
- **Switch templates without losing data** — template choice is separate from your content.
- **Export to PDF** — download a high-DPI A4 PDF in one click, from the editor or the preview page.
- **Manage multiple resumes** — dashboard with grid/list view, search, sort, duplicate, rename, and delete.
- **Dark mode** — system / light / dark, applied across the app.

## Templates

Four free, ATS-optimized templates are included:

| Template | Style | Best for |
|----------|-------|----------|
| Classic Professional | Single-column, traditional | Fortune 500 / conservative roles |
| Modern Minimal | Accent sidebar, two-column capable | Tech and modern industries |
| Executive | Bold header, refined typography | Senior / leadership roles |
| Minimal Clean | Whitespace-driven, ultra-clean | Design-forward roles |

Browse and preview them from the **Templates** page.

## Account & auth

- Sign up / sign in with **email + password** or **Google**.
- Email verification and password reset are supported.
- Your resumes are tied to your account and private by default.

## Getting started (as a user)

1. Open the app (or deploy your own — see [`docs/DEVELOPMENT.md`](./docs/DEVELOPMENT.md#deploy-to-vercel)).
2. Create an account or sign in.
3. Click **New Resume** (or pick a template from **Templates**).
4. Edit sections on the left, watch the preview on the right, tweak the design.
5. Click **Export PDF** to download.

## Pricing

ResumeForge is free to use (up to the free resume limit). A "Pro" plan is referenced in the UI but billing is not yet implemented — see [`TODO.md`](./TODO.md).

## License

MIT
