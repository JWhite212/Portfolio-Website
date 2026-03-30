import StructuredData from "@/components/structured-data";
import { contactConfig } from "@/lib/content";
import {
  buildCaseStudyStructuredData,
  getCaseStudyBySlug,
  getCaseStudyParams,
} from "@/lib/site";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BsArrowLeft, BsArrowUpRight } from "react-icons/bs";

type ProjectPageProps = {
  params: {
    slug: string;
  };
};

export function generateStaticParams() {
  return getCaseStudyParams();
}

export function generateMetadata({ params }: ProjectPageProps): Metadata {
  const caseStudy = getCaseStudyBySlug(params.slug);

  if (!caseStudy) {
    return {};
  }

  return {
    title: caseStudy.title,
    description: caseStudy.summary,
    alternates: {
      canonical: `/projects/${caseStudy.slug}`,
    },
    openGraph: {
      title: caseStudy.title,
      description: caseStudy.summary,
      url: `/projects/${caseStudy.slug}`,
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: caseStudy.title,
      description: caseStudy.summary,
    },
  };
}

export default function ProjectPage({ params }: ProjectPageProps) {
  const caseStudy = getCaseStudyBySlug(params.slug);

  if (!caseStudy) {
    notFound();
  }

  return (
    <>
      <StructuredData data={buildCaseStudyStructuredData(caseStudy)} />

      <main className="px-4 pb-20 pt-32 sm:px-6 lg:px-10 lg:pb-24 lg:pt-36">
        <div className="mx-auto max-w-[88rem]">
          <Link
            href="/#projects"
            className="inline-flex items-center gap-3 rounded-full border border-[var(--line)] bg-[var(--surface)] px-4 py-2 text-sm text-[var(--foreground)] transition-colors duration-200 hover:border-[var(--accent)] hover:text-[var(--accent-strong)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)]">
            <BsArrowLeft
              className="text-xs"
              aria-hidden="true"
            />
            Back to projects
          </Link>

          <div className="mt-10 grid gap-10 lg:grid-cols-[minmax(0,1fr)_22rem] lg:gap-14">
            <div>
              <p className="font-mono text-[0.74rem] uppercase tracking-[0.32em] text-[var(--muted)]">
                Case study / {caseStudy.period}
              </p>
              <h1 className="mt-5 max-w-5xl text-[clamp(2.9rem,6vw,5.5rem)] font-semibold leading-[0.95] tracking-[-0.06em] text-[var(--foreground)]">
                {caseStudy.title}
              </h1>
              <p className="mt-7 max-w-3xl text-lg leading-8 text-[var(--muted)] sm:text-xl">
                {caseStudy.summary}
              </p>
            </div>

            <aside className="grid gap-4">
              <div className="rounded-[1.5rem] border border-[var(--line)] bg-[var(--surface)] p-5">
                <h2 className="font-mono text-[0.68rem] uppercase tracking-[0.28em] text-[var(--muted)]">
                  Role
                </h2>
                <p className="mt-3 text-base font-medium text-[var(--foreground)]">
                  {caseStudy.role}
                </p>
              </div>
              <div className="rounded-[1.5rem] border border-[var(--line)] bg-[var(--surface)] p-5">
                <h2 className="font-mono text-[0.68rem] uppercase tracking-[0.28em] text-[var(--muted)]">
                  Focus
                </h2>
                <p className="mt-3 text-base font-medium text-[var(--foreground)]">
                  {caseStudy.stack.slice(0, 3).join(" / ")}
                </p>
              </div>
            </aside>
          </div>

          <div className="mt-12 overflow-hidden rounded-[2rem] border border-[var(--line)] bg-[var(--surface)] p-4 shadow-[0_18px_50px_rgba(15,20,18,0.08)]">
            <div className="relative aspect-[16/9] overflow-hidden rounded-[1.6rem] border border-[var(--accent-border)]">
              <Image
                src={caseStudy.media[0].src}
                alt={caseStudy.media[0].alt}
                fill
                priority
                sizes="(min-width: 1024px) 80rem, 100vw"
                className="object-cover"
              />
            </div>
            <p className="mt-4 text-sm leading-7 text-[var(--muted)]">
              {caseStudy.media[0].caption}
            </p>
          </div>

          <div className="mt-14 grid gap-12 lg:grid-cols-[minmax(0,1fr)_22rem] lg:gap-14">
            <div className="space-y-12">
              <section>
                <h2 className="font-mono text-[0.7rem] uppercase tracking-[0.3em] text-[var(--muted)]">
                  Problem
                </h2>
                <p className="mt-4 max-w-3xl text-base leading-8 text-[var(--foreground)]">
                  {caseStudy.problem}
                </p>
              </section>

              <section>
                <h2 className="font-mono text-[0.7rem] uppercase tracking-[0.3em] text-[var(--muted)]">
                  Approach
                </h2>
                <div className="mt-5 space-y-4">
                  {caseStudy.approach.map((step) => (
                    <p
                      key={step}
                      className="rounded-[1.4rem] border border-[var(--line)] bg-[var(--surface)] px-5 py-5 text-sm leading-8 text-[var(--foreground)]">
                      {step}
                    </p>
                  ))}
                </div>
              </section>

              <section>
                <h2 className="font-mono text-[0.7rem] uppercase tracking-[0.3em] text-[var(--muted)]">
                  Technical decisions
                </h2>
                <div className="mt-5 space-y-4">
                  {caseStudy.technicalDecisions.map((decision) => (
                    <article
                      key={decision.title}
                      className="rounded-[1.4rem] border border-[var(--line)] bg-[var(--surface)] px-5 py-5">
                      <h3 className="text-lg font-semibold text-[var(--foreground)]">
                        {decision.title}
                      </h3>
                      <p className="mt-3 text-sm leading-7 text-[var(--muted)]">
                        {decision.detail}
                      </p>
                    </article>
                  ))}
                </div>
              </section>

              <section>
                <h2 className="font-mono text-[0.7rem] uppercase tracking-[0.3em] text-[var(--muted)]">
                  Outcome
                </h2>
                <ul className="mt-5 space-y-3">
                  {caseStudy.outcome.map((item) => (
                    <li
                      key={item}
                      className="rounded-[1.2rem] border border-[var(--line)] bg-[var(--surface)] px-5 py-4 text-sm leading-7 text-[var(--foreground)]">
                      {item}
                    </li>
                  ))}
                </ul>
              </section>
            </div>

            <aside className="space-y-5 lg:sticky lg:top-28 lg:self-start">
              <section className="rounded-[1.6rem] border border-[var(--line)] bg-[var(--surface)] p-6">
                <h2 className="font-mono text-[0.68rem] uppercase tracking-[0.28em] text-[var(--muted)]">
                  Stack
                </h2>
                <ul className="mt-5 flex flex-wrap gap-2.5">
                  {caseStudy.stack.map((item) => (
                    <li
                      key={item}
                      className="rounded-full border border-[var(--accent-border)] bg-white px-3.5 py-2 text-sm text-[var(--foreground)]">
                      {item}
                    </li>
                  ))}
                </ul>
              </section>

              {caseStudy.links.length > 0 ? (
                <section className="rounded-[1.6rem] border border-[var(--line)] bg-[var(--surface)] p-6">
                  <h2 className="font-mono text-[0.68rem] uppercase tracking-[0.28em] text-[var(--muted)]">
                    Links
                  </h2>
                  <div className="mt-5 flex flex-col gap-3">
                    {caseStudy.links.map((link) => (
                      <a
                        key={link.href}
                        href={link.href}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center justify-between rounded-[1.1rem] border border-[var(--accent-border)] bg-white px-4 py-3 text-sm text-[var(--foreground)] transition-colors duration-200 hover:border-[var(--accent)] hover:text-[var(--accent-strong)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)]">
                        {link.label}
                        <BsArrowUpRight
                          className="text-xs"
                          aria-hidden="true"
                        />
                      </a>
                    ))}
                  </div>
                </section>
              ) : null}

              <section className="rounded-[1.6rem] border border-[var(--line)] bg-[var(--accent-bg-subtle)] p-6">
                <h2 className="font-mono text-[0.68rem] uppercase tracking-[0.28em] text-[var(--accent-strong)]">
                  Contact
                </h2>
                <p className="mt-4 text-sm leading-7 text-[var(--foreground)]">
                  If you want to talk about this build or a relevant role, email{" "}
                  <a
                    href={`mailto:${contactConfig.email}`}
                    className="underline decoration-[var(--accent)] underline-offset-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)]">
                    {contactConfig.email}
                  </a>
                  .
                </p>
              </section>
            </aside>
          </div>
        </div>
      </main>
    </>
  );
}
