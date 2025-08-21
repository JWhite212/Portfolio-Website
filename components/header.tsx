"use client";

import { UseActiveSectionContext } from "@/context/active-section-context";
import { links } from "@/lib/data";
import clsx from "clsx";
import { motion } from "framer-motion";
import Link from "next/link";
import { useEffect, useState } from "react";
import { BsSun, BsMoon } from "react-icons/bs";

export default function Header() {
  const { activeSection, setActiveSection, setTimeOfLastClick } = UseActiveSectionContext();
  const [isDark, setIsDark] = useState(false);

  // Sync with system/user preference on mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsDark(document.documentElement.classList.contains("dark"));
    }
  }, []);

  const toggleDarkMode = () => {
    if (typeof window !== "undefined") {
      const html = document.documentElement;
      if (html.classList.contains("dark")) {
        html.classList.remove("dark");
        setIsDark(false);
        localStorage.setItem("theme", "light");
      } else {
        html.classList.add("dark");
        setIsDark(true);
        localStorage.setItem("theme", "dark");
      }
    }
  };

  return (
    <header className="z-[999] relative">
      <motion.div
        className="fixed top-0 left-0 w-full h-16 border-b border-primary/20 bg-white bg-opacity-95 shadow-lg shadow-black/[0.03] dark:bg-neutral-dark dark:border-primary/30 dark:bg-opacity-95 sm:left-1/2 sm:top-6 sm:h-[3.25rem] sm:w-[36rem] sm:rounded-full sm:border sm:bg-opacity-90 sm:dark:bg-opacity-80 sm:rounded-full sm:left-1/2 sm:-translate-x-1/2"
        initial={{ y: -100, x: 0, opacity: 0 }}
        animate={{ y: 0, x: 0, opacity: 1 }}
        style={{ left: undefined }}
      />

      <nav className="flex fixed top-0 left-0 w-full h-16 items-center justify-center z-50 sm:top-[1.7rem] sm:left-1/2 sm:-translate-x-1/2 sm:w-[36rem] sm:h-[3.25rem] sm:rounded-full">
        <ul className="flex w-full max-w-[36rem] justify-center items-center gap-x-2 gap-y-1 px-2 text-base font-medium text-primary dark:text-primary-dark sm:w-[initial] sm:flex-nowrap sm:gap-5">
          {links.map((link) => (
            <motion.li
              className="h-3/4 flex items-center justify-center relative"
              key={link.hash}
              initial={{ y: -100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}>
              <Link
                className={clsx(
                  "flex w-full items-center justify-center px-3 py-3 hover:text-accent transition dark:text-primary-dark dark:hover:text-accent-dark min-w-[60px] min-h-[44px] sm:min-w-0 sm:min-h-0",
                  {
                    "text-accent dark:text-accent-dark":
                      activeSection === link.name,
                  },
                )}
                href={link.hash}
                onClick={() => {
                  setActiveSection(link.name);
                  setTimeOfLastClick(Date.now());
                }}>
                {link.name}

                {link.name === activeSection && (
                  <motion.span
                    className={clsx(
                      "bg-accent/10 rounded-full absolute -z-10 dark:bg-accent-dark/20",
                      link.name === "Home" ? "left-1 right-1" : "inset-0"
                    )}
                    layoutId="activeSection"
                    transition={{
                      type: "spring",
                      stiffness: 380,
                      damping: 30,
                    }}
                  />
                )}
              </Link>
            </motion.li>
          ))}
        </ul>
        <button
          aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
          onClick={toggleDarkMode}
          className="ml-2 p-2 rounded-full border border-primary/30 dark:border-primary-dark/40 bg-white dark:bg-neutral-dark shadow transition-colors hover:bg-accent/10 dark:hover:bg-accent-dark/20 focus:outline-none focus:ring-2 focus:ring-accent">
          {isDark ? (
            <BsSun className="text-accent text-xl" />
          ) : (
            <BsMoon className="text-primary text-xl" />
          )}
        </button>
      </nav>
    </header>
  );
}
