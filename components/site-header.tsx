"use client";

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
    <header className="pointer-events-none fixed inset-x-0 top-0 z-50 px-4 pt-4 sm:px-6 lg:px-10">
      <div className="pointer-events-auto mx-auto flex max-w-[88rem] items-center justify-between gap-6 rounded-full border border-[var(--line)] bg-[color:rgba(244,240,232,0.88)] px-4 py-3 shadow-[0_8px_40px_rgba(16,20,19,0.06)] backdrop-blur md:px-6">
        <Link
          href="/"
          className="shrink-0 font-mono text-xs uppercase tracking-[0.28em] text-[var(--foreground)]">
          JW / Portfolio
        </Link>

        <nav
          aria-label="Main navigation"
          className="hidden min-w-0 md:block">
          <ul className="flex flex-wrap items-center justify-center gap-1.5 text-sm text-[var(--muted)] sm:gap-2">
            {navigation.map((item) => {
              const isActive =
                item.sectionId !== undefined &&
                item.sectionId === activeSection;

              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={cn(
                      "rounded-full px-3 py-2 transition-colors duration-200",
                      "hover:text-[var(--foreground)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)]",
                      isActive &&
                        "bg-[var(--accent-soft)] text-[var(--accent-strong)]",
                    )}
                    onClick={() => {
                      if (item.sectionId) {
                        setActiveSection(item.sectionId);
                      }
                    }}>
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <a
          href={contactConfig.cvHref}
          className="hidden shrink-0 rounded-full border border-[var(--line)] px-4 py-2 text-sm font-medium text-[var(--foreground)] transition-colors duration-200 hover:border-[var(--accent)] hover:text-[var(--accent-strong)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)] md:inline-flex">
          Download CV
        </a>

        <button
          type="button"
          onClick={() => setIsMobileMenuOpen((prev) => !prev)}
          aria-expanded={isMobileMenuOpen}
          aria-controls="mobile-menu"
          aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
          className="inline-flex h-10 w-10 items-center justify-center rounded-full text-[var(--foreground)] transition-colors duration-200 hover:bg-[var(--accent-soft)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)] md:hidden">
          {isMobileMenuOpen ? (
            <FiX className="text-lg" aria-hidden="true" />
          ) : (
            <FiMenu className="text-lg" aria-hidden="true" />
          )}
        </button>
      </div>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.nav
            id="mobile-menu"
            aria-label="Mobile navigation"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="pointer-events-auto mt-2 rounded-[1.6rem] border border-[var(--line)] bg-[color:rgba(244,240,232,0.96)] px-4 py-4 shadow-[0_12px_36px_rgba(16,20,19,0.1)] backdrop-blur-lg md:hidden">
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
                        "block rounded-full px-4 py-3 text-sm transition-colors duration-200",
                        "hover:text-[var(--foreground)]",
                        "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)]",
                        isActive
                          ? "bg-[var(--accent-soft)] text-[var(--accent-strong)]"
                          : "text-[var(--muted)]",
                      )}>
                      {item.label}
                    </Link>
                  </li>
                );
              })}
            </ul>

            <div className="mt-3 border-t border-[var(--line)] pt-3">
              <a
                href={contactConfig.cvHref}
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center justify-center gap-2 rounded-full border border-[var(--line)] px-4 py-3 text-sm font-medium text-[var(--foreground)] transition-colors duration-200 hover:border-[var(--accent)] hover:text-[var(--accent-strong)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)]">
                Download CV
              </a>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
