# Portfolio Website

Personal portfolio for Jamie White — Next.js 14 (App Router), TypeScript, Tailwind CSS.

## Commands

```bash
npm run dev          # Start dev server (localhost:3000)
npm run build        # Production build
npm run check        # Prettier check + ESLint (CI validation)
npm run fix          # Auto-fix formatting + lint
```

## Architecture

- `lib/content.ts` — All site content (profile, case studies, experience, skills, contact). Single source of truth.
- `lib/types.ts` — TypeScript types for every content shape.
- `lib/site.ts` — Site config, URL helpers, structured data builders, case study lookups.
- `lib/utils.ts` — `cn()` class helper, form validation, error extraction.
- `app/page.tsx` — Home page (single-page layout with section anchors: projects, approach, experience, contact).
- `app/projects/[slug]/` — Dynamic case study detail pages.
- `components/` — Presentational components (hero, header, footer, contact form, reveal animations).
- `actions/sendEmail.ts` — Server action for contact form (Resend API, honeypot spam filter).
- `email/` — React Email template for contact form notifications.

## Environment Variables

| Variable                 | Required   | Purpose                                         |
| ------------------------ | ---------- | ----------------------------------------------- |
| `RESEND_API_KEY`         | Production | Resend email delivery                           |
| `PORTFOLIO_CONTACT_FROM` | Production | Sender address for contact emails               |
| `PORTFOLIO_CONTACT_TO`   | Production | Recipient address for contact emails            |
| `NEXT_PUBLIC_SITE_URL`   | Optional   | Canonical site URL (defaults to localhost:3000) |

## Code Style

- Path alias: `@/*` maps to repo root
- Fonts: JetBrains Mono (`--font-jetbrains-mono`, mono body) and Space Mono (`--font-space-mono`, display headings)
- CSS variables for theming: `--background`, `--foreground`, `--line`, `--line-strong`, `--surface`, `--surface-elevated`, `--muted`, `--accent`, `--accent-dim`, `--accent-muted`
- Brutalist design: dark palette (#0a0a0a), electric green accent (#39ff14), sharp corners, thick borders
- Framer Motion `<Reveal>` wrapper for scroll animations, plus `<SplitText>`, `<TextScramble>`, `<MagneticButton>`, `<CustomCursor>`, `<GlitchImage>`, `<Marquee>` effect components
- Prettier + ESLint enforced; run `npm run check` before committing
