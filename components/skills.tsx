"use client";

import { skillsData } from "@/lib/data";
import { useSectionInView } from "@/lib/hooks";
import { motion } from "framer-motion";
import SectionHeading from "./section-heading";

const fadeInAnimationVarients = {
  initial: { opacity: 0, y: 100 },
  animate: (index: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: 0.05 * index },
  }),
};

export default function Skills() {
  const { ref } = useSectionInView("Skills", 0.5);

  return (
    <section
      className="mb-24 sm:mb-40 max-w-3xl w-full px-4 scroll-mt-28 text-center mx-auto"
      ref={ref}
      id="skills">
      <SectionHeading>My Skills</SectionHeading>
      <ul className="flex flex-wrap justify-center gap-2 text-lg text-gray-800 dark:text-gray-100">
        {skillsData.map((skill, index) => (
          <motion.li
            className="bg-white border border-black/[0.1] rounded-xl px-5 py-3 dark:bg-neutral-dark dark:border-gray-700 dark:text-gray-100"
            key={index}
            variants={fadeInAnimationVarients}
            initial="initial"
            whileInView="animate"
            viewport={{
              once: true,
            }}
            custom={index}>
            {skill}
          </motion.li>
        ))}
      </ul>
    </section>
  );
}
