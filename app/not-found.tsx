import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-[70vh] flex-col items-center justify-center px-4 text-center">
      <div
        aria-hidden="true"
        className="pointer-events-none select-none font-display text-[clamp(8rem,25vw,16rem)] font-bold leading-none text-[var(--accent)] opacity-20">
        404
      </div>
      <h1 className="mt-4 font-mono text-sm uppercase tracking-[0.3em] text-[var(--muted)]">
        &gt; ERROR: PAGE_NOT_FOUND
      </h1>
      <p className="mt-4 max-w-md text-base leading-8 text-[var(--muted)]">
        The page you are looking for does not exist or has been moved.
      </p>
      <Link
        href="/"
        className="mt-8 inline-flex items-center gap-3 border-brutal border-[var(--accent)] px-6 py-3 text-sm font-bold text-[var(--accent)] transition-colors duration-200 hover:bg-[var(--accent)] hover:text-[var(--background)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)]">
        Return home
      </Link>
    </main>
  );
}
