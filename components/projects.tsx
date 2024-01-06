"use client";

import { UseActiveSectionContext } from "@/context/active-section-context";
import { projectsData } from "@/lib/data";
import React, { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import Project from "./project";
import SectionHeading from "./section-heading";

export default function Projects() {
  const {ref, inView} = useInView({ threshold: 0.5, });
  const { setActiveSection } = UseActiveSectionContext();

  useEffect(() => {
    if (inView) {
      setActiveSection("Projects");
    }
  }, [inView, setActiveSection]);


  return (
    <section
      ref={ref}
      className="scroll-mt-28"
      id="projects">
      <SectionHeading>My Projects</SectionHeading>
      <div>
        {projectsData.map((project, index) => (
          <React.Fragment key={index}>
            <Project {...project} />
          </React.Fragment>
        ))}
      </div>
    </section>
  );
}
