"use client";

import { contactConfig, navigation } from "@/lib/content";
import type { HomeSectionId } from "@/lib/types";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

const HOME_SECTIONS = navigation
  .map((item) => item.sectionId)
  .filter(Boolean) as HomeSectionId[];

export default function SiteHeader() {
  const pathname = usePathname();
  const [activeSection, setActiveSection] = useState<HomeSectionId>("home");

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

  return (
    <header className="pointer-events-none fixed inset-x-0 top-0 z-50 px-4 pt-4 sm:px-6 lg:px-10">
      <a
        href="#main-content"
        className="pointer-events-auto absolute left-4 top-2 z-10 -translate-y-12 rounded-full bg-[var(--accent)] px-4 py-2 text-sm font-medium text-white transition-transform focus:translate-y-0 focus:outline focus:outline-2 focus:outline-offset-2 focus:outline-[var(--accent)]">
        Skip to content
      </a>

      <div className="pointer-events-auto mx-auto flex max-w-[88rem] items-center justify-between gap-6 rounded-full border border-[var(--line)] bg-[color:rgba(244,240,232,0.88)] px-4 py-3 shadow-[0_8px_40px_rgba(16,20,19,0.06)] backdrop-blur md:px-6">
        <Link
          href="/"
          className="shrink-0 font-mono text-xs uppercase tracking-[0.28em] text-[var(--foreground)]">
          JW / Portfolio
        </Link>

        <nav
          aria-label="Main navigation"
          className="min-w-0">
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
          className="hidden shrink-0 rounded-full border border-[var(--line)] px-4 py-2 text-sm font-medium text-[var(--foreground)] transition-colors duration-200 hover:border-[var(--accent)] hover:text-[var(--accent-strong)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)] sm:inline-flex">
          Download CV
        </a>
      </div>
    </header>
  );
}
