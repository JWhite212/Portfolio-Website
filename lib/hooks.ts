"use client";

import { UseActiveSectionContext } from "@/context/active-section-context";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { SectionName } from "./types";

/**
 * Custom hook that tracks whether a section is in view and sets it as the active section.
 *
 * @param sectionName - The name of the section to track.
 * @param threshold - The percentage of the section that must be visible for it to be considered in view. Defaults to 0.75.
 * @returns An object containing the `ref` to be attached to the section element.
 *
 * @example
 * ```tsx
 * const { ref } = useSectionInView('about');
 *
 * return <section ref={ref}>About Section</section>;
 * ```
 */
export function useSectionInView(sectionName: SectionName, threshold = 0.75) {
  const { ref, inView } = useInView({
    threshold,
  });
  const { setActiveSection, timeOfLastClick } = UseActiveSectionContext();

  useEffect(() => {
    if (inView && Date.now() - timeOfLastClick > 1000) {
      setActiveSection(sectionName);
    }
  }, [inView, setActiveSection, timeOfLastClick, sectionName]);

  return { ref };
}
