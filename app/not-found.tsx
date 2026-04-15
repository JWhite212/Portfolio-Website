import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-[60vh] flex-col items-center justify-center px-4 py-20 text-center sm:px-6 lg:px-10">
      <p className="font-mono text-[0.72rem] uppercase tracking-[0.28em] text-[var(--muted)]">
        404
      </p>
      <h1 className="mt-4 text-3xl font-semibold tracking-[-0.04em] text-[var(--foreground)] sm:text-4xl">
        Page not found
      </h1>
      <p className="mt-4 max-w-md text-base leading-7 text-[var(--muted)]">
        The page you are looking for does not exist or has been moved.
      </p>
      <Link
        href="/"
        className="mt-8 inline-flex rounded-full border border-[var(--line)] px-5 py-2.5 text-sm font-medium text-[var(--foreground)] transition-colors duration-200 hover:border-[var(--accent)] hover:text-[var(--accent-strong)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)]"
      >
        Back to portfolio
      </Link>
    </main>
  );
}
