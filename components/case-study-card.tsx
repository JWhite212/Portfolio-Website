"use client";

import type { CaseStudy } from "@/lib/types";
import { cn } from "@/lib/utils";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { BsArrowRight, BsArrowUpRight } from "react-icons/bs";

type CaseStudyCardProps = {
  caseStudy: CaseStudy;
  index: number;
};

export default function CaseStudyCard({
  caseStudy,
  index,
}: CaseStudyCardProps) {
  const ref = useRef<HTMLElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 85%", "end 45%"],
  });

  const mediaY = useTransform(
    scrollYProgress,
    [0, 1],
    prefersReducedMotion ? [0, 0] : [28, -28],
  );

  const isEven = index % 2 === 1;

  return (
    <motion.article
      ref={ref}
      initial={prefersReducedMotion ? false : { opacity: 0, y: 30 }}
      whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className="border-t border-[var(--line)] py-10 first:border-t-0 first:pt-0 last:pb-0 lg:py-14">
      <div
        className={cn(
          "grid items-start gap-10 lg:grid-cols-[minmax(0,0.92fr)_minmax(19rem,0.78fr)]",
          isEven && "lg:grid-cols-[minmax(19rem,0.78fr)_minmax(0,0.92fr)]",
        )}>
        <div className={cn(isEven && "lg:order-2")}>
          <p className="font-mono text-[0.72rem] uppercase tracking-[0.28em] text-[var(--muted)]">
            Case study {String(index + 1).padStart(2, "0")}
          </p>
          <h3 className="mt-4 text-3xl font-semibold tracking-[-0.04em] text-[var(--foreground)] sm:text-[2.45rem]">
            {caseStudy.title}
          </h3>
          <p className="mt-5 max-w-2xl text-base leading-8 text-[var(--muted)] sm:text-lg">
            {caseStudy.summary}
          </p>

          <dl className="mt-8 grid gap-5 text-sm sm:grid-cols-2">
            <div className="rounded-[1.35rem] border border-[var(--line)] bg-[var(--surface)] p-5">
              <dt className="font-mono text-[0.68rem] uppercase tracking-[0.28em] text-[var(--muted)]">
                Role
              </dt>
              <dd className="mt-3 text-base font-medium text-[var(--foreground)]">
                {caseStudy.role}
              </dd>
            </div>
            <div className="rounded-[1.35rem] border border-[var(--line)] bg-[var(--surface)] p-5">
              <dt className="font-mono text-[0.68rem] uppercase tracking-[0.28em] text-[var(--muted)]">
                Period
              </dt>
              <dd className="mt-3 text-base font-medium text-[var(--foreground)]">
                {caseStudy.period}
              </dd>
            </div>
          </dl>

          <ul className="mt-8 space-y-4">
            {caseStudy.technicalDecisions.slice(0, 2).map((decision) => (
              <li
                key={decision.title}
                className="rounded-[1.35rem] border border-[var(--accent-border)] bg-[var(--accent-bg-card)] p-5">
                <p className="text-sm font-medium text-[var(--foreground)]">
                  {decision.title}
                </p>
                <p className="mt-2 text-sm leading-7 text-[var(--muted)]">
                  {decision.detail}
                </p>
              </li>
            ))}
          </ul>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <Link
              href={`/projects/${caseStudy.slug}`}
              className="inline-flex items-center gap-3 rounded-full bg-[var(--accent-strong)] px-5 py-3 text-sm font-medium text-white transition-transform duration-200 hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)]">
              Read case study
              <BsArrowRight
                className="text-xs"
                aria-hidden="true"
              />
            </Link>

            {caseStudy.links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-3 rounded-full border border-[var(--line)] px-5 py-3 text-sm font-medium text-[var(--foreground)] transition-colors duration-200 hover:border-[var(--accent)] hover:text-[var(--accent-strong)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)]">
                {link.label}
                <BsArrowUpRight
                  className="text-xs"
                  aria-hidden="true"
                />
              </a>
            ))}
          </div>
        </div>

        {caseStudy.media.length > 0 && (
          <motion.div
            style={{ y: mediaY }}
            className={cn("relative", isEven && "lg:order-1")}>
            <div className="overflow-hidden rounded-[2rem] border border-[var(--line)] bg-[var(--surface)] p-4 shadow-[0_18px_50px_rgba(15,20,18,0.08)]">
              <div className="relative aspect-[4/3] overflow-hidden rounded-[1.5rem] border border-[var(--accent-border)]">
                <Image
                  src={caseStudy.media[0].src}
                  alt={caseStudy.media[0].alt}
                  fill
                  sizes="(min-width: 1024px) 40rem, 100vw"
                  className="object-cover"
                />
              </div>
              <p className="mt-4 text-sm leading-7 text-[var(--muted)]">
                {caseStudy.media[0].caption}
              </p>
            </div>
          </motion.div>
        )}
      </div>
    </motion.article>
  );
}
