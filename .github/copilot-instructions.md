# Copilot Instructions for Portfolio Website

## Project Overview
- This is a personal portfolio built with Next.js (App Router), React, TypeScript, and Tailwind CSS.
- The site showcases projects, skills, and experience, and includes a contact form powered by React Email and Resend.
- Animations are handled with Framer Motion.

## Key Structure
- `app/`: Next.js App Router entrypoints, global layout, and pages.
- `components/`: All React UI components (e.g., `header.tsx`, `footer.tsx`, `project.tsx`).
- `lib/data.ts`: Central source for static data (projects, skills, experience, navigation links).
- `context/`: React context for global state (e.g., active section tracking).
- `email/`: Email templates/components for contact form.
- `actions/`: Server actions (e.g., `sendEmail.ts`).
- `public/`: Static assets (images, PDF resume, etc.).

## Patterns & Conventions
- Data-driven UI: Most content (projects, skills, experience) is defined in `lib/data.ts` and mapped into components.
- Use Tailwind CSS utility classes for all styling; avoid custom CSS except in `app/globals.css`.
- Use Framer Motion for animation (see `project.tsx` for scroll/hover effects).
- All images are imported and used with Next.js `<Image />` for optimization.
- TypeScript is enforced throughout; use `as const` for static data arrays.
- Use React context for cross-component state (see `active-section-context.tsx`).
- Contact form uses React Email for rendering and Resend for delivery (see `email/` and `actions/sendEmail.ts`).

## Developer Workflows
- **Install dependencies:** `npm install`
- **Run dev server:** `npm run dev`
- **Build for production:** `npm run build`
- **Lint:** `npm run lint`
- **Format:** `npm run format` (if configured)
- **Deploy:** Designed for Vercel, but can be deployed anywhere supporting Next.js

## Integration Points
- Contact form: Integrates React Email (for email rendering) and Resend (for sending emails).
- Project images: All images must be placed in `public/` and imported in `lib/data.ts`.

## Examples
- To add a new project: Add an entry to `projectsData` in `lib/data.ts` and ensure the image is in `public/`.
- To add a new skill: Add to `skillsData` in `lib/data.ts`.
- To update navigation: Edit `links` in `lib/data.ts`.

## Special Notes
- Do not use the legacy Next.js Pages Router; all routing is via the App Router (`app/`).
- Do not add global state libraries; use React context if needed.
- Do not use CSS modules or styled-components; use Tailwind CSS.

---
For more details, see `README.md` and explore the `lib/data.ts` file for data-driven patterns.
