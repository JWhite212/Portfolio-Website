import { contactConfig } from "@/lib/content";

export default function SiteFooter() {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      aria-label="Site footer"
      className="border-t border-[var(--line)] px-4 py-10 sm:px-6 lg:px-10">
      <div className="mx-auto flex max-w-[88rem] flex-col gap-4 text-sm text-[var(--muted)] md:flex-row md:items-end md:justify-between">
        <div>
          <p className="font-mono text-xs uppercase tracking-[0.28em] text-[var(--foreground)]">
            Jamie White
          </p>
          <p className="mt-3 max-w-xl leading-7">
            Built with Next.js, TypeScript, Tailwind CSS, Framer Motion, React
            Email, and Resend.
          </p>
        </div>

        <div className="flex flex-col gap-2 text-left md:text-right">
          <a
            href={`mailto:${contactConfig.email}`}
            className="rounded-sm text-[var(--foreground)] transition-colors hover:text-[var(--accent-strong)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)]">
            {contactConfig.email}
          </a>
          <p>&copy; {currentYear} Jamie White. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
