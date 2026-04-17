# Jamie White — Portfolio

Building clear, reliable software across modern web delivery, object-oriented systems, and embedded prototypes.

---

## About

An employer-focused portfolio site built to present selected case studies, professional experience, skills, and contact details in a format that communicates technical judgement and delivery quality.

The site turns fuzzy ideas into maintainable software with strong fundamentals, deliberate architecture, and interface polish. Work spans typed Next.js applications, Java domain modelling, and sensor-driven automation systems — each project chosen to show different layers of the stack.

Built for potential employers, clients, and collaborators who want to understand how I think and build before starting a conversation.

## Featured Projects

| Project                                 | Summary                                                                                                                                                                            | Stack                                                                                       | Links                                                                                                                 |
| --------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------- |
| **Meeting Mind**                        | Tauri v2 desktop app that detects Teams meetings, captures dual audio, transcribes locally with faster-whisper, and generates AI summaries — all without sending audio off-device. | Tauri v2, Rust, React, TypeScript, Python, faster-whisper, Claude API, SQLite               | [Repository](https://github.com/JWhite212/meeting-mind)                                                               |
| **MedTracker**                          | SvelteKit medication tracking app with one-tap dose logging, live time-since counters, per-medication adherence analytics, and inventory management.                               | SvelteKit, Svelte 5, TypeScript, PostgreSQL, Drizzle ORM, Lucia v3, Zod, Vitest, Playwright | [Repository](https://github.com/JWhite212/medication-tracker) · [Live demo](https://medication-tracker-jw.vercel.app) |
| **Automatic IoT Plant Watering System** | Sensor-driven plant care prototype combining embedded programming, PID environmental control, and a monitoring web interface.                                                      | Arduino, ESP32, C++, IoT, PID control                                                       | [Repository](https://github.com/JWhite212/Automatic-IOT-Plant-Watering-System)                                        |
| **Java Vending Machine**                | Java project focused on object-oriented design, domain modelling, and testable implementation backed by JUnit.                                                                     | Java, JUnit, OOP, Domain modelling                                                          | [Repository](https://github.com/JWhite212/VendingMachine)                                                             |
| **Portfolio Platform Redesign**         | This site — a rebuild into an employer-focused portfolio with dedicated case studies, typed content, and a cleaner conversion path.                                                | Next.js, TypeScript, Tailwind CSS, Framer Motion, Resend                                    | This repository                                                                                                       |

Each project has a dedicated case study page on the site with problem context, approach, technical decisions, architecture, and outcome.

## Tech Stack

| Category      | Technologies                                                                                                                                     |
| ------------- | ------------------------------------------------------------------------------------------------------------------------------------------------ |
| **Framework** | Next.js 16 (App Router), React 18, TypeScript 5.3                                                                                                |
| **Styling**   | Tailwind CSS 3.4, CSS custom properties, brutalist design system                                                                                 |
| **Animation** | Framer Motion 10 — scroll reveals, text scramble, split text entrance, glitch-on-hover images, infinite marquee, magnetic buttons, custom cursor |
| **Email**     | Resend API with server-rendered HTML templates, honeypot spam filter, rate limiting                                                              |
| **SEO**       | Dynamic Open Graph images (Edge runtime), JSON-LD structured data, auto-generated sitemap and robots.txt                                         |
| **Analytics** | Vercel Analytics, Vercel Speed Insights                                                                                                          |
| **Images**    | Sharp for build-time optimisation, `next/image` with responsive sizing                                                                           |
| **Tooling**   | Prettier 3.1, ESLint 8 (next/core-web-vitals)                                                                                                    |

## Architecture

```
├── app/
│   ├── layout.tsx                # Root layout — fonts, metadata, analytics
│   ├── page.tsx                  # Home — hero, projects, approach, experience, contact
│   ├── globals.css               # CSS variables, design tokens, grid background
│   ├── not-found.tsx             # Custom 404
│   ├── opengraph-image.tsx       # Dynamic OG image (Edge runtime)
│   ├── sitemap.ts                # Auto-generated sitemap
│   ├── robots.ts                 # Robots.txt configuration
│   └── projects/[slug]/
│       ├── page.tsx              # Case study detail template
│       └── opengraph-image.tsx   # Per-project OG image
├── components/
│   ├── hero-section.tsx          # Landing hero with animated headline
│   ├── case-study-card.tsx       # Project card for the home grid
│   ├── contact-form.tsx          # Contact form with validation
│   ├── reveal.tsx                # Framer Motion scroll animation wrapper
│   ├── text-scramble.tsx         # Character scramble effect on mount
│   ├── split-text.tsx            # Word-by-word entrance animation
│   ├── glitch-image.tsx          # Image hover glitch effect
│   ├── marquee.tsx               # Infinite horizontal scroll ticker
│   ├── magnetic-button.tsx       # Cursor-attracted button interaction
│   ├── custom-cursor.tsx         # Custom dot cursor (desktop only)
│   ├── noise-overlay.tsx         # Subtle noise texture layer
│   ├── site-header.tsx           # Navigation with section tracking
│   ├── site-footer.tsx           # Footer with links
│   ├── section-intro.tsx         # Section heading pattern
│   └── structured-data.tsx       # JSON-LD injection component
├── lib/
│   ├── content.ts                # All site content — single source of truth
│   ├── types.ts                  # TypeScript types for every content shape
│   ├── site.ts                   # Site config, URL helpers, structured data builders
│   └── utils.ts                  # cn() helper, form validation, error extraction
├── actions/
│   └── sendEmail.ts              # Server action — Resend, honeypot, rate limiting
└── public/                       # Static assets — screenshots, CV, avatar
```

### Content Model

All site content lives in `lib/content.ts` as typed TypeScript objects — profile, case studies, experience, education, skills, and contact configuration. Types are defined in `lib/types.ts`. This means the site behaves like a product with a structured data layer rather than hard-coded markup: adding a new case study is a data change, not a template change.

## Design System

| Aspect            | Detail                                                                                                                                                             |
| ----------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **Palette**       | Dark background (`#0a0a0a`), electric green accent (`#39ff14`), warm-grey foreground (`#e8e6e3`)                                                                   |
| **Typography**    | JetBrains Mono (body and monospace), Space Mono (display headings)                                                                                                 |
| **Aesthetic**     | Brutalist — sharp corners, thick 2–3px borders, subtle grid background, noise texture overlay                                                                      |
| **Interactions**  | Custom dot cursor, magnetic buttons, text scramble on mount, scroll-triggered reveals, glitch-on-hover images, infinite skills marquee                             |
| **Accessibility** | Skip-to-content link, `prefers-reduced-motion` fully respected (all animations disabled), `pointer: coarse` disables custom cursor, semantic HTML with ARIA labels |

CSS custom properties power the theming layer (`--background`, `--foreground`, `--accent`, `--surface`, `--muted`, `--line`, etc.), keeping colour values centralised and consistent across every component.

## Getting Started

### Prerequisites

- Node.js 18 or later
- npm

### Setup

```bash
git clone https://github.com/JWhite212/Portfolio-Website.git
cd Portfolio-Website
npm install
cp .env.example .env.local
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

## Environment Variables

| Variable                 | Required   | Purpose                                                  |
| ------------------------ | ---------- | -------------------------------------------------------- |
| `RESEND_API_KEY`         | Production | Resend email delivery for the contact form               |
| `PORTFOLIO_CONTACT_FROM` | Production | Sender address for contact emails                        |
| `PORTFOLIO_CONTACT_TO`   | Production | Recipient address for contact emails                     |
| `NEXT_PUBLIC_SITE_URL`   | Optional   | Canonical site URL (defaults to `http://localhost:3000`) |

The contact form works in development without Resend configured — it will display a configuration message instead of sending.

## Scripts

| Command         | Purpose                                         |
| --------------- | ----------------------------------------------- |
| `npm run dev`   | Start the development server                    |
| `npm run build` | Production build                                |
| `npm start`     | Serve the production build                      |
| `npm run lint`  | Run ESLint                                      |
| `npm run check` | Prettier check + ESLint (use before committing) |
| `npm run fix`   | Auto-fix formatting and lint issues             |

## Deployment

The site is deployed on **Vercel** with automatic deploys from the `main` branch.

**Security headers** are configured in `next.config.js`:

- `X-Content-Type-Options: nosniff`
- `X-Frame-Options: DENY`
- `Referrer-Policy: strict-origin-when-cross-origin`
- `Permissions-Policy: camera=(), microphone=(), geolocation=()`

**Dynamic Open Graph images** are generated at the Edge for both the home page and individual case study pages, ensuring link previews are always up to date without requiring static image assets.

## Contact

**Jamie White** — Early-career Software Engineer, United Kingdom

- Email: [jamiecs@live.co.uk](mailto:jamiecs@live.co.uk)
- GitHub: [github.com/JWhite212](https://github.com/JWhite212)
- LinkedIn: [linkedin.com/in/jamie-white-swe](https://www.linkedin.com/in/jamie-white-swe/)

Open to graduate, junior, and early-career software engineering roles where I can keep building depth while contributing responsibly.
