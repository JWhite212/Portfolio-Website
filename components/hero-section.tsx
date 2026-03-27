"use client";

import { contactConfig, profile } from "@/lib/content";
import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import avatarImg from "@/public/avatar.jpg";
import { BsArrowRight, BsGithub, BsLinkedin } from "react-icons/bs";
import { FiDownload } from "react-icons/fi";

export default function HeroSection() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section
      id="home"
      className="relative border-b border-[var(--line)]"
      data-nav-section>
      <div className="mx-auto grid min-h-[calc(100svh-2rem)] max-w-[88rem] gap-12 px-4 pb-16 pt-32 sm:px-6 lg:grid-cols-[minmax(0,1.2fr)_minmax(20rem,0.8fr)] lg:px-10 lg:pb-20 lg:pt-36">
        <motion.div
          initial={prefersReducedMotion ? false : { opacity: 0, y: 30 }}
          animate={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col justify-end">
          <p className="font-mono text-[0.76rem] uppercase tracking-[0.35em] text-[var(--muted)]">
            {profile.heroEyebrow}
          </p>
          <h1 className="mt-6 max-w-5xl text-[clamp(3.4rem,7vw,7.25rem)] font-semibold leading-[0.92] tracking-[-0.06em] text-[var(--foreground)]">
            {profile.heroHeadline}
          </h1>
          <p className="mt-8 max-w-2xl text-lg leading-8 text-[var(--muted)] sm:text-xl">
            {profile.heroSummary}
          </p>
          <p className="mt-6 max-w-xl text-base leading-7 text-[var(--accent-strong)]">
            {profile.availability}
          </p>

          <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <Link
              href="/#contact"
              className="inline-flex items-center justify-center gap-3 rounded-full bg-[var(--accent-strong)] px-6 py-3.5 text-sm font-medium text-white transition-transform duration-200 hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)]">
              Start a conversation
              <BsArrowRight className="text-xs" />
            </Link>
            <a
              href={contactConfig.cvHref}
              className="inline-flex items-center justify-center gap-3 rounded-full border border-[var(--line)] px-6 py-3.5 text-sm font-medium text-[var(--foreground)] transition-colors duration-200 hover:border-[var(--accent)] hover:text-[var(--accent-strong)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)]">
              Download CV
              <FiDownload className="text-base" />
            </a>
          </div>

          <div className="mt-8 flex items-center gap-3">
            <a
              href={contactConfig.githubHref}
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub profile"
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-[var(--line)] text-[var(--foreground)] transition-colors duration-200 hover:border-[var(--accent)] hover:text-[var(--accent-strong)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)]">
              <BsGithub />
            </a>
            <a
              href={contactConfig.linkedInHref}
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn profile"
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-[var(--line)] text-[var(--foreground)] transition-colors duration-200 hover:border-[var(--accent)] hover:text-[var(--accent-strong)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)]">
              <BsLinkedin />
            </a>
          </div>
        </motion.div>

        <motion.aside
          initial={
            prefersReducedMotion ? false : { opacity: 0, y: 24, scale: 0.98 }
          }
          animate={
            prefersReducedMotion ? undefined : { opacity: 1, y: 0, scale: 1 }
          }
          transition={{
            duration: 0.85,
            delay: 0.08,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="flex items-end lg:justify-end">
          <div className="grid w-full gap-5 lg:max-w-[27rem]">
            <div className="relative overflow-hidden rounded-[2rem] border border-[var(--line)] bg-[var(--surface)] p-4 shadow-[0_18px_50px_rgba(15,20,18,0.08)]">
              <div className="relative aspect-[4/5] overflow-hidden rounded-[1.6rem] border border-[color:rgba(20,67,61,0.12)] bg-[linear-gradient(135deg,rgba(20,67,61,0.08),rgba(255,255,255,0.55))]">
                <Image
                  src={avatarImg}
                  alt="Portrait of Jamie White"
                  fill
                  priority
                  sizes="(min-width: 1024px) 28rem, 100vw"
                  className="object-cover object-center"
                />
              </div>

              <div className="mt-4 flex items-center justify-between gap-4 rounded-[1.35rem] border border-[color:rgba(20,67,61,0.12)] bg-[color:rgba(255,255,255,0.72)] px-4 py-3">
                <div>
                  <p className="font-mono text-[0.7rem] uppercase tracking-[0.28em] text-[var(--muted)]">
                    Current focus
                  </p>
                  <p className="mt-2 text-sm font-medium text-[var(--foreground)]">
                    Early-career software engineering roles
                  </p>
                </div>
                <span className="rounded-full bg-[var(--accent-soft)] px-3 py-1 font-mono text-[0.7rem] uppercase tracking-[0.2em] text-[var(--accent-strong)]">
                  Available
                </span>
              </div>
            </div>

            <div className="rounded-[1.75rem] border border-[var(--line)] bg-[var(--surface)] p-6">
              <p className="font-mono text-[0.72rem] uppercase tracking-[0.3em] text-[var(--muted)]">
                Working focus
              </p>
              <ul className="mt-4 space-y-3 text-sm leading-7 text-[var(--foreground)]">
                {profile.quickFacts.map((fact) => (
                  <li
                    key={fact}
                    className="border-t border-[color:rgba(20,67,61,0.12)] pt-3 first:border-t-0 first:pt-0">
                    {fact}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </motion.aside>
      </div>
    </section>
  );
}
