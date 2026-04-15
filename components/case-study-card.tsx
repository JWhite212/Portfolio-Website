"use client";

import GlitchImage from "@/components/glitch-image";
import MagneticButton from "@/components/magnetic-button";
import type { CaseStudy } from "@/lib/types";
import { cn } from "@/lib/utils";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
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
    prefersReducedMotion ? [0, 0] : [50, -50],
  );

  const isEven = index % 2 === 1;
  const cardNumber = String(index + 1).padStart(2, "0");

  return (
    <motion.article
      ref={ref}
      initial={prefersReducedMotion ? false : { opacity: 0, x: -40 }}
      whileInView={prefersReducedMotion ? undefined : { opacity: 1, x: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, ease: [0.33, 1, 0.68, 1] }}
      className="relative border-t-brutal-thick border-[var(--accent)] py-10 first:border-t-0 first:pt-0 last:pb-0 lg:py-14">
      {/* Oversized watermark number */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-4 top-8 select-none font-display text-[8rem] font-bold leading-none text-[var(--foreground)] opacity-[0.03] lg:text-[10rem]">
        {cardNumber}
      </div>

      <div
        className={cn(
          "grid items-start gap-10 lg:grid-cols-[minmax(0,0.92fr)_minmax(19rem,0.78fr)]",
          isEven && "lg:grid-cols-[minmax(19rem,0.78fr)_minmax(0,0.92fr)]",
        )}>
        <div className={cn(isEven && "lg:order-2")}>
          <p className="font-mono text-[0.72rem] uppercase tracking-[0.28em] text-[var(--accent)]">
            Case study {cardNumber}
          </p>
          <h3 className="mt-4 font-display text-3xl font-bold tracking-[-0.04em] text-[var(--foreground)] sm:text-[2.45rem]">
            {caseStudy.title}
          </h3>
          <p className="mt-5 max-w-2xl text-base leading-8 text-[var(--muted)] sm:text-lg">
            {caseStudy.summary}
          </p>

          {/* Metadata bar */}
          <div className="mt-8 flex flex-wrap gap-x-6 gap-y-2 border-y border-[var(--line)] py-4 font-mono text-xs uppercase tracking-[0.2em] text-[var(--muted)]">
            <span>
              Role:{" "}
              <span className="text-[var(--foreground)]">{caseStudy.role}</span>
            </span>
            <span className="hidden text-[var(--line-strong)] sm:inline">
              |
            </span>
            <span>
              Period:{" "}
              <span className="text-[var(--foreground)]">
                {caseStudy.period}
              </span>
            </span>
          </div>

          {/* Technical decisions */}
          <ul className="mt-8 space-y-3">
            {caseStudy.technicalDecisions.slice(0, 2).map((decision) => (
              <li
                key={decision.title}
                className="border-l-[3px] border-[var(--accent)] bg-[var(--accent-muted)] px-5 py-4">
                <p className="text-sm font-medium text-[var(--foreground)]">
                  {decision.title}
                </p>
                <p className="mt-2 text-sm leading-7 text-[var(--muted)]">
                  {decision.detail}
                </p>
              </li>
            ))}
          </ul>

          {/* Buttons */}
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <MagneticButton>
              <Link
                href={`/projects/${caseStudy.slug}`}
                className="inline-flex items-center gap-3 bg-[var(--accent)] px-5 py-3 text-sm font-bold text-[var(--background)] transition-opacity duration-200 hover:opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)]">
                Read case study
                <BsArrowRight
                  className="text-xs"
                  aria-hidden="true"
                />
              </Link>
            </MagneticButton>

            {caseStudy.links.map((link) => (
              <MagneticButton key={link.href}>
                <a
                  href={link.href}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-3 border-brutal border-[var(--line-strong)] px-5 py-3 text-sm font-medium text-[var(--foreground)] transition-colors duration-200 hover:border-[var(--accent)] hover:text-[var(--accent)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)]">
                  {link.label}
                  <BsArrowUpRight
                    className="text-xs"
                    aria-hidden="true"
                  />
                </a>
              </MagneticButton>
            ))}
          </div>
        </div>

        {caseStudy.media.length > 0 && (
          <motion.div
            style={{ y: mediaY }}
            className={cn("relative", isEven && "lg:order-1")}>
            <div className="border-brutal border-[var(--line-strong)] bg-[var(--surface)] p-3">
              <GlitchImage
                src={caseStudy.media[0].src}
                alt={caseStudy.media[0].alt}
                fill
                sizes="(min-width: 1024px) 40rem, 100vw"
                className="relative aspect-[4/3] border border-[var(--line)]"
              />
              <p className="mt-3 text-sm leading-7 text-[var(--muted)]">
                {caseStudy.media[0].caption}
              </p>
            </div>
          </motion.div>
        )}
      </div>
    </motion.article>
  );
}
