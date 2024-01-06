import { projectsData } from "@/lib/data";
import React from "react";
import Project from "./project";
import SectionHeading from "./section-heading";

export default function Projects() {
  return (
    <section
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
