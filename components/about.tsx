"use client";

import { useSectionInView } from "@/lib/hooks";
import { motion } from "framer-motion";
import SectionHeading from "./section-heading";

export default function About() {
  const { ref } = useSectionInView("About");

  return (
    <motion.section
      ref={ref}
      className="mb-28 max-w-[45rem] text-center leading-8 sm:mb-80 scroll-mt-28 "
      initial={{ opacity: 0, y: 100 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1.125 }}
      id="about">
      <SectionHeading>About Me</SectionHeading>
      <p className="mb-3">
        🚀 My journey into software development has been fueled by a deep-seated
        passion for creating high-quality software using object-oriented
        programming languages. My commitment to good coding practices ensures
        elegant solutions to complex problems. I thrive in collaborative
        environments, valuing the diversity of thought that programming brings,
        as it allows individuals from various backgrounds to unite and solve
        common challenges.
      </p>
      <p className="mb-3">
        💡 Proficient in a diverse range of languages and technologies,
        specifically{" "}
        <span className="font-bold">
          Java, SQL (Postgres), TypeScript, HTML/CSS, React, NextJs and Tailwind
          CSS
        </span>
        . I believe in staying ahead of the curve in the dynamic software
        development industry, enjoying the opportunity to continually learn and
        apply cutting-edge technologies to my work.
      </p>
      <p className="mb-3">
        🌐 Currently, I am actively{" "}
        <span className="font-bold">seeking Software Development Jobs</span>.
        These Jobs would present fresh challenges, allowing me to push beyond my
        comfort zone, continually improve, and embrace new experiences. Let's
        connect and explore the possibilities at the intersection of innovation
        and technology! 🚀✨
      </p>
    </motion.section>
  );
}
