"use client";


import { useSectionInView } from "@/lib/hooks";
import { motion } from "framer-motion";
import SectionHeading from "./section-heading";

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
};

export default function About() {
  const { ref } = useSectionInView("About");

  return (
    <motion.section
      ref={ref}
      className="mb-24 sm:mb-40 max-w-2xl w-full px-4 text-center leading-8 scroll-mt-28 bg-white/80 dark:bg-neutral-dark/80 rounded-xl shadow-md py-10 sm:py-16 mx-auto"
      initial={{ opacity: 0, y: 100 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1.125 }}
      id="about">
      <SectionHeading>About Me</SectionHeading>
      <motion.p className="mb-3" variants={fadeInUp} initial="initial" whileInView="animate" viewport={{ once: true }}>
        🚀 My journey into software development has been fueled by a deep-seated
        passion for creating high-quality software using object-oriented
        programming languages. My commitment to good coding practices ensures
        elegant solutions to complex problems. I thrive in collaborative
        environments, valuing the diversity of thought that programming brings,
        as it allows individuals from various backgrounds to unite and solve
        common challenges.
      </motion.p>
      <motion.p className="mb-3" variants={fadeInUp} initial="initial" whileInView="animate" viewport={{ once: true }}>
        💡 Proficient in a diverse range of languages and technologies,
        specifically{" "}
        <span className="font-bold">
          Java, SQL (Postgres), TypeScript, HTML/CSS, React, NextJs and Tailwind
          CSS
        </span>
        . I believe in staying ahead of the curve in the dynamic software
        development industry, enjoying the opportunity to continually learn and
        apply cutting-edge technologies to my work.
      </motion.p>
      <motion.p className="mb-3" variants={fadeInUp} initial="initial" whileInView="animate" viewport={{ once: true }}>
        🌐 Currently, I am actively{" "}
        <span className="font-bold">seeking Software Development Jobs</span>.
        These Jobs would present fresh challenges, allowing me to push beyond my
        comfort zone, continually improve, and embrace new experiences. Let's
        connect and explore the possibilities at the intersection of innovation
        and technology! 🚀✨
      </motion.p>
    </motion.section>
  );
}
