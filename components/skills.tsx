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
      className="mb-16 sm:mb-40 max-w-2xl w-full px-2 sm:px-4 scroll-mt-20 text-center mx-auto"
      ref={ref}
      id="skills">
      <SectionHeading>My Skills</SectionHeading>
  <ul className="flex flex-wrap justify-center gap-1 sm:gap-2 text-base sm:text-lg text-gray-800 dark:text-gray-100">
        {skillsData.map((skill, index) => (
          <motion.li
            className="bg-white border border-black/[0.1] rounded-xl px-5 py-3 dark:bg-neutral-dark dark:border-gray-700 dark:text-gray-100 cursor-pointer transition-shadow"
            key={index}
            variants={fadeInAnimationVarients}
            initial="initial"
            whileInView="animate"
            viewport={{
              once: true,
            }}
            custom={index}
            whileHover={{ scale: 1.08, boxShadow: "0 4px 24px 0 rgba(99,102,241,0.15)" }}
            whileTap={{ scale: 0.96 }}
          >
            {skill}
          </motion.li>
        ))}
      </ul>
    </section>
  );
}
