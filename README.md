# Portfolio Website

This project is a professional interactive portfolio to showcase my skills, experience, and projects to potential employers, clients, or collaborators. Acting as a centralized hub where visitors can learn more about me and my work. It now features recent highlights like **Snackless**, a cross-platform Flutter app demonstrating my mobile development expertise.

## Tech Stack

To bring this dynamic portfolio to life, I've utilized a cutting-edge tech stack:

* React: I've leveraged React's component-based architecture to ensure a smooth and seamless user experience.
* Next.js: Built upon Next.js, my website benefits from server-side rendering and efficient routing for improved performance and SEO optimization.
* TypeScript: With TypeScript, my codebase is made more robust and maintainable, offering type safety and enhanced developer productivity.
* Tailwind CSS: Styling is streamlined and highly customizable thanks to Tailwind CSS, allowing for rapid development and consistent design across all pages.
* Framer Motion: Framer Motion adds flair and interactivity to the user interface with fluid animations and transitions, enhancing the overall user experience.
* React Email: The integration of React Email facilitates seamless communication, enabling visitors to easily reach out to me directly from the website.
* Resend: The Resend library further enhances the communication aspect of my website, ensuring reliable email delivery and responsiveness.

By leveraging these tools and technologies, I've created a visually appealing and highly functional portfolio website that showcases my skills, experience, and projects. I aim to leave a lasting impression on potential employers, clients, or collaborators,
demonstrating my proficiency in modern web development technologies.

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