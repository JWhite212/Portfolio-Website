import GlitchImage from "@/components/glitch-image";
import Reveal from "@/components/reveal";
import SplitText from "@/components/split-text";
import StructuredData from "@/components/structured-data";
import { contactConfig } from "@/lib/content";
import {
  buildCaseStudyStructuredData,
  getCaseStudyBySlug,
  getCaseStudyParams,
} from "@/lib/site";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BsArrowLeft, BsArrowUpRight } from "react-icons/bs";

type ProjectPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export function generateStaticParams() {
  return getCaseStudyParams();
}

export async function generateMetadata({
  params,
}: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const caseStudy = getCaseStudyBySlug(slug);

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

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const caseStudy = getCaseStudyBySlug(slug);

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
            className="inline-flex items-center gap-3 border-brutal border-[var(--line-strong)] px-4 py-2 text-sm text-[var(--foreground)] transition-colors duration-200 hover:border-[var(--accent)] hover:text-[var(--accent)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)]">
            <BsArrowLeft
              className="text-xs"
              aria-hidden="true"
            />
            Back to projects
          </Link>

          <div className="mt-10 grid gap-10 lg:grid-cols-[minmax(0,1fr)_22rem] lg:gap-14">
            <div>
              <p className="font-mono text-[0.74rem] uppercase tracking-[0.32em] text-[var(--accent)]">
                Case study / {caseStudy.period}
              </p>
              <h1 className="mt-5 max-w-5xl font-display text-[clamp(2.5rem,6vw,5rem)] font-bold leading-[0.95] tracking-[-0.04em] text-[var(--foreground)]">
                <SplitText
                  text={caseStudy.title}
                  mode="word"
                  stagger={0.04}
                  delay={0.1}
                />
              </h1>
              <p className="mt-7 max-w-3xl text-lg leading-8 text-[var(--muted)] sm:text-xl">
                {caseStudy.summary}
              </p>
            </div>

            <aside className="grid gap-4">
              <div className="border-brutal border-[var(--line-strong)] bg-[var(--surface)] p-5">
                <h2 className="font-mono text-[0.68rem] uppercase tracking-[0.28em] text-[var(--muted)]">
                  Role
                </h2>
                <p className="mt-3 text-base font-medium text-[var(--foreground)]">
                  {caseStudy.role}
                </p>
              </div>
              <div className="border-brutal border-[var(--line-strong)] bg-[var(--surface)] p-5">
                <h2 className="font-mono text-[0.68rem] uppercase tracking-[0.28em] text-[var(--muted)]">
                  Focus
                </h2>
                <p className="mt-3 text-base font-medium text-[var(--foreground)]">
                  {caseStudy.stack.slice(0, 3).join(" / ")}
                </p>
              </div>
            </aside>
          </div>

          {/* Hero image */}
          <div className="mt-12 border-brutal border-[var(--line-strong)] bg-[var(--surface)] p-3">
            <GlitchImage
              src={caseStudy.media[0].src}
              alt={caseStudy.media[0].alt}
              fill
              priority
              sizes="(min-width: 1024px) 80rem, 100vw"
              className="relative aspect-[16/9] border border-[var(--line)]"
            />
            <p className="mt-3 text-sm leading-7 text-[var(--muted)]">
              {caseStudy.media[0].caption}
            </p>
          </div>

          {caseStudy.metrics && caseStudy.metrics.length > 0 ? (
            <Reveal>
              <section className="mt-12">
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                  {caseStudy.metrics.map((metric) => (
                    <div
                      key={metric.label}
                      className="border-brutal border-[var(--line-strong)] bg-[var(--surface)] p-5">
                      <p className="font-display text-3xl font-bold leading-tight text-[var(--accent)]">
                        {metric.value}
                      </p>
                      <p className="mt-3 font-mono text-[0.66rem] uppercase tracking-[0.28em] text-[var(--muted)]">
                        {metric.label}
                      </p>
                      {metric.detail ? (
                        <p className="mt-3 text-sm leading-6 text-[var(--foreground)]">
                          {metric.detail}
                        </p>
                      ) : null}
                    </div>
                  ))}
                </div>
              </section>
            </Reveal>
          ) : null}

          <div className="mt-14 grid gap-12 lg:grid-cols-[minmax(0,1fr)_22rem] lg:gap-14">
            <div className="space-y-12">
              <Reveal>
                <section>
                  <h2 className="font-mono text-[0.7rem] uppercase tracking-[0.3em] text-[var(--accent)]">
                    <span className="text-[var(--muted)]">[</span> Problem{" "}
                    <span className="text-[var(--muted)]">]</span>
                  </h2>
                  <p className="mt-4 max-w-3xl text-base leading-8 text-[var(--foreground)]">
                    {caseStudy.problem}
                  </p>
                </section>
              </Reveal>

              <Reveal delay={0.05}>
                <section>
                  <h2 className="font-mono text-[0.7rem] uppercase tracking-[0.3em] text-[var(--accent)]">
                    <span className="text-[var(--muted)]">[</span> Approach{" "}
                    <span className="text-[var(--muted)]">]</span>
                  </h2>
                  <div className="mt-5 space-y-3">
                    {caseStudy.approach.map((step, i) => (
                      <p
                        key={step}
                        className="border-l-[3px] border-[var(--accent)] bg-[var(--surface)] px-5 py-4 text-sm leading-8 text-[var(--foreground)]">
                        <span className="font-display text-lg font-bold text-[var(--accent)]">
                          {String(i + 1).padStart(2, "0")}.
                        </span>{" "}
                        {step}
                      </p>
                    ))}
                  </div>
                </section>
              </Reveal>

              {caseStudy.architecture && caseStudy.architecture.length > 0 ? (
                <Reveal delay={0.08}>
                  <section>
                    <h2 className="font-mono text-[0.7rem] uppercase tracking-[0.3em] text-[var(--accent)]">
                      <span className="text-[var(--muted)]">[</span>{" "}
                      Architecture{" "}
                      <span className="text-[var(--muted)]">]</span>
                    </h2>
                    <div className="mt-5 space-y-3">
                      {caseStudy.architecture.map((item, i) => (
                        <p
                          key={item}
                          className="border-l-[3px] border-[var(--line-strong)] bg-[var(--surface)] px-5 py-4 text-sm leading-8 text-[var(--foreground)]">
                          <span className="font-display text-lg font-bold text-[var(--foreground)]">
                            A{i + 1}.
                          </span>{" "}
                          {item}
                        </p>
                      ))}
                    </div>
                  </section>
                </Reveal>
              ) : null}

              <Reveal delay={0.1}>
                <section>
                  <h2 className="font-mono text-[0.7rem] uppercase tracking-[0.3em] text-[var(--accent)]">
                    <span className="text-[var(--muted)]">[</span> Technical
                    decisions <span className="text-[var(--muted)]">]</span>
                  </h2>
                  <div className="mt-5 space-y-3">
                    {caseStudy.technicalDecisions.map((decision) => (
                      <article
                        key={decision.title}
                        className="border-l-[3px] border-[var(--line-strong)] bg-[var(--surface)] px-5 py-5">
                        <h3 className="font-display text-base font-bold text-[var(--foreground)]">
                          {decision.title}
                        </h3>
                        <p className="mt-3 text-sm leading-7 text-[var(--muted)]">
                          {decision.detail}
                        </p>
                      </article>
                    ))}
                  </div>
                </section>
              </Reveal>

              {caseStudy.features && caseStudy.features.length > 0 ? (
                <Reveal delay={0.12}>
                  <section>
                    <h2 className="font-mono text-[0.7rem] uppercase tracking-[0.3em] text-[var(--accent)]">
                      <span className="text-[var(--muted)]">[</span> Features{" "}
                      <span className="text-[var(--muted)]">]</span>
                    </h2>
                    <div className="mt-5 grid gap-3 sm:grid-cols-2">
                      {caseStudy.features.map((feature) => (
                        <article
                          key={feature.title}
                          className="border-brutal border-[var(--line-strong)] bg-[var(--surface)] p-4">
                          <h3 className="font-display text-sm font-bold text-[var(--foreground)]">
                            {feature.title}
                          </h3>
                          <p className="mt-2 text-sm leading-7 text-[var(--muted)]">
                            {feature.detail}
                          </p>
                        </article>
                      ))}
                    </div>
                  </section>
                </Reveal>
              ) : null}

              <Reveal delay={0.15}>
                <section>
                  <h2 className="font-mono text-[0.7rem] uppercase tracking-[0.3em] text-[var(--accent)]">
                    <span className="text-[var(--muted)]">[</span> Outcome{" "}
                    <span className="text-[var(--muted)]">]</span>
                  </h2>
                  <ul className="mt-5 space-y-2">
                    {caseStudy.outcome.map((item) => (
                      <li
                        key={item}
                        className="border-b border-[var(--line)] py-3 text-sm leading-7 text-[var(--foreground)] last:border-b-0">
                        <span className="text-[var(--accent)]">&gt;</span>{" "}
                        {item}
                      </li>
                    ))}
                  </ul>
                </section>
              </Reveal>

              {caseStudy.challenges && caseStudy.challenges.length > 0 ? (
                <Reveal delay={0.2}>
                  <section>
                    <h2 className="font-mono text-[0.7rem] uppercase tracking-[0.3em] text-[var(--accent)]">
                      <span className="text-[var(--muted)]">[</span> Challenges
                      &amp; learnings{" "}
                      <span className="text-[var(--muted)]">]</span>
                    </h2>
                    <div className="mt-5 space-y-3">
                      {caseStudy.challenges.map((challenge) => (
                        <article
                          key={challenge.title}
                          className="border-l-[3px] border-[var(--accent-dim)] bg-[var(--surface)] px-5 py-5">
                          <h3 className="font-display text-base font-bold text-[var(--foreground)]">
                            {challenge.title}
                          </h3>
                          <p className="mt-3 text-sm leading-7 text-[var(--muted)]">
                            {challenge.detail}
                          </p>
                        </article>
                      ))}
                    </div>
                  </section>
                </Reveal>
              ) : null}

              {caseStudy.media.length > 1 ? (
                <section>
                  <h2 className="font-mono text-[0.7rem] uppercase tracking-[0.3em] text-[var(--accent)]">
                    <span className="text-[var(--muted)]">[</span> Screens{" "}
                    <span className="text-[var(--muted)]">]</span>
                  </h2>
                  <div className="mt-5 space-y-6">
                    {caseStudy.media.slice(1).map((item, i) => (
                      <Reveal
                        key={item.caption}
                        delay={0.05 * i}>
                        <figure className="border-brutal border-[var(--line-strong)] bg-[var(--surface)] p-3">
                          <GlitchImage
                            src={item.src}
                            alt={item.alt}
                            fill
                            sizes="(min-width: 1024px) 80rem, 100vw"
                            className="relative aspect-[16/9] border border-[var(--line)]"
                          />
                          <figcaption className="mt-3 text-sm leading-7 text-[var(--muted)]">
                            {item.caption}
                          </figcaption>
                        </figure>
                      </Reveal>
                    ))}
                  </div>
                </section>
              ) : null}
            </div>

            <aside className="space-y-5 lg:sticky lg:top-28 lg:self-start">
              <section className="border-brutal border-[var(--line-strong)] bg-[var(--surface)] p-6">
                <h2 className="font-mono text-[0.68rem] uppercase tracking-[0.28em] text-[var(--muted)]">
                  Stack
                </h2>
                <ul className="mt-5 flex flex-wrap gap-2.5">
                  {caseStudy.stack.map((item) => (
                    <li
                      key={item}
                      className="border-brutal border-[var(--line-strong)] px-3 py-1.5 text-sm text-[var(--foreground)] transition-colors duration-200 hover:border-[var(--accent)] hover:bg-[var(--accent)] hover:text-[var(--background)]">
                      {item}
                    </li>
                  ))}
                </ul>
              </section>

              {caseStudy.links.length > 0 ? (
                <section className="border-brutal border-[var(--line-strong)] bg-[var(--surface)] p-6">
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
                        className="inline-flex items-center justify-between border-brutal border-[var(--line-strong)] px-4 py-3 text-sm text-[var(--foreground)] transition-colors duration-200 hover:border-[var(--accent)] hover:text-[var(--accent)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)]">
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

              <section className="border-brutal border-[var(--accent)] bg-[var(--accent-muted)] p-6">
                <h2 className="font-mono text-[0.68rem] uppercase tracking-[0.28em] text-[var(--accent)]">
                  Contact
                </h2>
                <p className="mt-4 text-sm leading-7 text-[var(--foreground)]">
                  If you want to talk about this build or a relevant role, email{" "}
                  <a
                    href={`mailto:${contactConfig.email}`}
                    className="text-[var(--accent)] underline decoration-[var(--accent)] underline-offset-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)]">
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
