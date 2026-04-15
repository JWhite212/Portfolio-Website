"use client";

import MagneticButton from "@/components/magnetic-button";
import TextScramble from "@/components/text-scramble";
import { contactConfig, navigation } from "@/lib/content";
import type { HomeSectionId } from "@/lib/types";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { FiMenu, FiX } from "react-icons/fi";

const HOME_SECTIONS = navigation
  .map((item) => item.sectionId)
  .filter(Boolean) as HomeSectionId[];

export default function SiteHeader() {
  const pathname = usePathname();
  const [activeSection, setActiveSection] = useState<HomeSectionId>("home");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const isProjectPage = useMemo(
    () => pathname.startsWith("/projects/"),
    [pathname],
  );

  useEffect(() => {
    if (isProjectPage) {
      setActiveSection("projects");
      return;
    }

    if (pathname !== "/") {
      setActiveSection("home");
      return;
    }

    const sections = HOME_SECTIONS.map((id) =>
      document.getElementById(id),
    ).filter(Boolean) as HTMLElement[];

    if (sections.length === 0) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntry = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (visibleEntry?.target.id) {
          setActiveSection(visibleEntry.target.id as HomeSectionId);
        }
      },
      {
        rootMargin: "-28% 0px -52% 0px",
        threshold: [0.2, 0.4, 0.65],
      },
    );

    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, [isProjectPage, pathname]);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileMenuOpen]);

  useEffect(() => {
    if (!isMobileMenuOpen) return;

    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest("header")) {
        setIsMobileMenuOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, [isMobileMenuOpen]);

  useEffect(() => {
    if (!isMobileMenuOpen) return;

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsMobileMenuOpen(false);
      }
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [isMobileMenuOpen]);

  return (
    <header className="pointer-events-none fixed inset-x-0 top-0 z-50">
      <div className="pointer-events-auto border-b-brutal border-[var(--line-strong)] bg-[var(--surface)] px-4 sm:px-6 lg:px-10">
        <div className="mx-auto flex max-w-[88rem] items-center justify-between gap-6 py-3">
          <Link
            href="/"
            className="shrink-0 font-mono text-xs font-bold uppercase tracking-[0.28em] text-[var(--accent)]">
            [JW]
          </Link>

          <nav
            aria-label="Main navigation"
            className="hidden min-w-0 md:block">
            <ul className="flex flex-wrap items-center justify-center gap-1 text-sm text-[var(--muted)]">
              {navigation.map((item) => {
                const isActive =
                  item.sectionId !== undefined &&
                  item.sectionId === activeSection;

                return (
                  <li key={item.href}>
                    <MagneticButton
                      strength={0.15}
                      radius={80}>
                      <Link
                        href={item.href}
                        className={cn(
                          "relative block px-3 py-2 transition-colors duration-200",
                          "hover:text-[var(--accent)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)]",
                          isActive && "text-[var(--accent)]",
                        )}
                        onClick={() => {
                          if (item.sectionId) {
                            setActiveSection(item.sectionId);
                          }
                        }}>
                        <TextScramble
                          text={item.label}
                          trigger="hover"
                        />
                        {isActive && (
                          <span className="absolute bottom-0 left-3 right-3 h-0.5 bg-[var(--accent)]" />
                        )}
                      </Link>
                    </MagneticButton>
                  </li>
                );
              })}
            </ul>
          </nav>

          <MagneticButton
            className="hidden md:inline-flex"
            strength={0.15}
            radius={80}>
            <a
              href={contactConfig.cvHref}
              className="inline-flex border-brutal border-[var(--line-strong)] px-4 py-2 text-sm font-medium text-[var(--foreground)] transition-colors duration-200 hover:border-[var(--accent)] hover:text-[var(--accent)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)]">
              Download CV
            </a>
          </MagneticButton>

          <button
            type="button"
            onClick={() => setIsMobileMenuOpen((prev) => !prev)}
            aria-expanded={isMobileMenuOpen}
            aria-controls="mobile-menu"
            aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
            className="inline-flex h-10 w-10 items-center justify-center border-brutal border-[var(--line-strong)] text-[var(--foreground)] transition-colors duration-200 hover:border-[var(--accent)] hover:text-[var(--accent)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)] md:hidden">
            {isMobileMenuOpen ? (
              <FiX
                className="text-lg"
                aria-hidden="true"
              />
            ) : (
              <FiMenu
                className="text-lg"
                aria-hidden="true"
              />
            )}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.nav
            id="mobile-menu"
            aria-label="Mobile navigation"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2, ease: [0.33, 1, 0.68, 1] }}
            className="pointer-events-auto border-b-brutal border-[var(--line-strong)] bg-[var(--surface)] px-4 py-4 md:hidden">
            <ul className="flex flex-col gap-1">
              {navigation.map((item) => {
                const isActive =
                  item.sectionId !== undefined &&
                  item.sectionId === activeSection;

                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      onClick={() => {
                        setIsMobileMenuOpen(false);
                        if (item.sectionId) {
                          setActiveSection(item.sectionId);
                        }
                      }}
                      className={cn(
                        "block border-l-[3px] px-4 py-3 text-sm transition-colors duration-200",
                        "hover:text-[var(--accent)]",
                        "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)]",
                        isActive
                          ? "border-[var(--accent)] text-[var(--accent)]"
                          : "border-transparent text-[var(--muted)]",
                      )}>
                      {item.label}
                    </Link>
                  </li>
                );
              })}
            </ul>

            <div className="mt-3 border-t-brutal border-[var(--line-strong)] pt-3">
              <a
                href={contactConfig.cvHref}
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center justify-center gap-2 border-brutal border-[var(--line-strong)] px-4 py-3 text-sm font-medium text-[var(--foreground)] transition-colors duration-200 hover:border-[var(--accent)] hover:text-[var(--accent)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)]">
                Download CV
              </a>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
