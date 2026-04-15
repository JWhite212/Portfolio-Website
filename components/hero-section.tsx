"use client";

import GlitchImage from "@/components/glitch-image";
import MagneticButton from "@/components/magnetic-button";
import SplitText from "@/components/split-text";
import TextScramble from "@/components/text-scramble";
import { contactConfig, profile } from "@/lib/content";
import { motion, useReducedMotion } from "framer-motion";
import Link from "next/link";
import avatarImg from "@/public/avatar.jpg";
import { BsArrowRight, BsGithub, BsLinkedin } from "react-icons/bs";
import { FiDownload } from "react-icons/fi";

export default function HeroSection() {
  const prefersReducedMotion = useReducedMotion();

  const stagger = {
    hidden: {},
    visible: {
      transition: { staggerChildren: 0.1, delayChildren: 0.2 },
    },
  };

  const fadeIn = {
    hidden: { opacity: 0, x: -30 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.6, ease: [0.33, 1, 0.68, 1] },
    },
  };

  return (
    <section
      id="home"
      className="relative border-b-brutal border-[var(--line-strong)]"
      data-nav-section>
      {/* Oversized watermark */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-8 top-24 select-none font-display text-[clamp(8rem,20vw,16rem)] font-bold leading-none text-[var(--foreground)] opacity-[0.03]">
        [00]
      </div>

      <div className="mx-auto grid min-h-[calc(100svh-2rem)] max-w-[88rem] gap-12 px-4 pb-16 pt-32 sm:px-6 lg:grid-cols-[minmax(0,1.3fr)_minmax(18rem,0.7fr)] lg:px-10 lg:pb-20 lg:pt-36">
        <motion.div
          variants={prefersReducedMotion ? undefined : stagger}
          initial="hidden"
          animate="visible"
          className="flex flex-col justify-end">
          {/* Terminal status line */}
          <motion.p
            variants={prefersReducedMotion ? undefined : fadeIn}
            className="font-mono text-[0.76rem] uppercase tracking-[0.35em] text-[var(--muted)]">
            <span className="animate-blink text-[var(--accent)]">&gt;</span>{" "}
            <TextScramble
              text={profile.heroEyebrow}
              trigger="mount"
              speed={25}
            />
          </motion.p>

          {/* Main headline with split-text */}
          <motion.h1
            variants={prefersReducedMotion ? undefined : fadeIn}
            className="mt-6 max-w-5xl font-display text-[clamp(2.8rem,7vw,6.5rem)] font-bold leading-[0.92] tracking-[-0.04em] text-[var(--foreground)]">
            {prefersReducedMotion ? (
              profile.heroHeadline
            ) : (
              <SplitText
                text={profile.heroHeadline}
                mode="word"
                stagger={0.04}
                delay={0.4}
              />
            )}
          </motion.h1>

          <motion.p
            variants={prefersReducedMotion ? undefined : fadeIn}
            className="mt-8 max-w-2xl text-base leading-8 text-[var(--muted)] sm:text-lg">
            {profile.heroSummary}
          </motion.p>

          {/* Availability badge */}
          <motion.div
            variants={prefersReducedMotion ? undefined : fadeIn}
            className="mt-6 inline-flex w-fit items-center gap-3 border-brutal border-[var(--accent)] px-4 py-2">
            <span className="inline-block h-2 w-2 animate-pulse bg-[var(--accent)]" />
            <span className="font-mono text-xs uppercase tracking-[0.2em] text-[var(--accent)]">
              {profile.availability}
            </span>
          </motion.div>

          {/* CTA buttons */}
          <motion.div
            variants={prefersReducedMotion ? undefined : fadeIn}
            className="mt-10 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <MagneticButton>
              <Link
                href="/#contact"
                className="inline-flex items-center justify-center gap-3 bg-[var(--accent)] px-6 py-3.5 text-sm font-bold text-[var(--background)] transition-opacity duration-200 hover:opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)]">
                Start a conversation
                <BsArrowRight
                  className="text-xs"
                  aria-hidden="true"
                />
              </Link>
            </MagneticButton>
            <MagneticButton>
              <a
                href={contactConfig.cvHref}
                className="inline-flex items-center justify-center gap-3 border-brutal border-[var(--line-strong)] px-6 py-3.5 text-sm font-medium text-[var(--foreground)] transition-colors duration-200 hover:border-[var(--accent)] hover:text-[var(--accent)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)]">
                Download CV
                <FiDownload
                  className="text-base"
                  aria-hidden="true"
                />
              </a>
            </MagneticButton>
          </motion.div>

          {/* Social icons */}
          <motion.div
            variants={prefersReducedMotion ? undefined : fadeIn}
            className="mt-8 flex items-center gap-3">
            <MagneticButton
              strength={0.2}
              radius={60}>
              <a
                href={contactConfig.githubHref}
                target="_blank"
                rel="noreferrer"
                aria-label="GitHub profile"
                className="inline-flex h-11 w-11 items-center justify-center border-brutal border-[var(--line-strong)] text-[var(--foreground)] transition-colors duration-200 hover:border-[var(--accent)] hover:text-[var(--accent)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)]">
                <BsGithub />
              </a>
            </MagneticButton>
            <MagneticButton
              strength={0.2}
              radius={60}>
              <a
                href={contactConfig.linkedInHref}
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn profile"
                className="inline-flex h-11 w-11 items-center justify-center border-brutal border-[var(--line-strong)] text-[var(--foreground)] transition-colors duration-200 hover:border-[var(--accent)] hover:text-[var(--accent)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)]">
                <BsLinkedin />
              </a>
            </MagneticButton>
          </motion.div>
        </motion.div>

        {/* Sidebar */}
        <motion.aside
          initial={prefersReducedMotion ? false : { opacity: 0, x: 30 }}
          animate={prefersReducedMotion ? undefined : { opacity: 1, x: 0 }}
          transition={{
            duration: 0.7,
            delay: 0.3,
            ease: [0.33, 1, 0.68, 1],
          }}
          aria-label="Quick profile overview"
          className="flex items-end lg:justify-end">
          <div className="grid w-full gap-5 lg:max-w-[27rem]">
            {/* Avatar */}
            <div className="border-brutal border-[var(--line-strong)] bg-[var(--surface)] p-3">
              <GlitchImage
                src={avatarImg}
                alt="Portrait of Jamie White"
                fill
                priority
                sizes="(min-width: 1024px) 28rem, 100vw"
                className="relative aspect-[4/5] border border-[var(--line)]"
              />

              <div className="mt-3 flex items-center justify-between gap-4 border-brutal border-[var(--line-strong)] px-4 py-3">
                <div>
                  <p className="font-mono text-[0.7rem] uppercase tracking-[0.28em] text-[var(--muted)]">
                    Current focus
                  </p>
                  <p className="mt-2 text-sm font-medium text-[var(--foreground)]">
                    Early-career software engineering roles
                  </p>
                </div>
                <span className="border-brutal border-[var(--accent)] px-3 py-1 font-mono text-[0.7rem] uppercase tracking-[0.2em] text-[var(--accent)]">
                  Available
                </span>
              </div>
            </div>

            {/* Quick facts */}
            <div className="border-brutal border-[var(--line-strong)] bg-[var(--surface)] p-6">
              <p className="font-mono text-[0.72rem] uppercase tracking-[0.3em] text-[var(--muted)]">
                Working focus
              </p>
              <ul className="mt-4 space-y-3 text-sm leading-7 text-[var(--foreground)]">
                {profile.quickFacts.map((fact) => (
                  <li
                    key={fact}
                    className="border-t border-[var(--line)] pt-3 first:border-t-0 first:pt-0">
                    <span className="text-[var(--accent)]">&gt;</span> {fact}
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
