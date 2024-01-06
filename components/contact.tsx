"use client";

import { useSectionInView } from "@/lib/hooks";
import { motion } from "framer-motion";
import { FaPaperPlane } from "react-icons/fa";
import SectionHeading from "./section-heading";

export default function Contact() {
  const { ref } = useSectionInView("Contact");

  return (
    <motion.section
      ref={ref}
      id="contact"
      className="mb-20 sm:mb-28 w-[min(100%,38rem)] text-center "
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 2 }}
      viewport={{ once: true }}>
      <SectionHeading>Contact Me</SectionHeading>
      <p className="text-gray-700 -mt-6">
        Please contact me directly at{" "}
        <a
          className="underline"
          href="mailto:jamiecs@live.co.uk">
          jamiecs@live.co.uk
        </a>{" "}
        or through this form.
      </p>
      <form className="mt-10 flex flex-col ">
        <input
          className="h-14 rounded-lg borderBlack px-4"
          type="email"
          placeholder="Your email"
        />
        <textarea
          className="h-52 my-3 rounded-lg borderBlack p-4"
          placeholder="Your message"
        />
        <button
          className="group flex items-center justify-center gap-2 h-[3rem] w-[8rem] bg-gray-900 text-white rounded-full outline-none transition-all focus:scale-110 hover:scale-110 hover:bg-gray-950 active:scale-105 cursor-pointer borderBlack"
          type="submit">
          Submit{" "}
          <FaPaperPlane className="text-xs opacity-70 transition-all focus:scale-110 hover:scale-110 active:scale-105 cursor-pointer borderBlack group-hover:translate-x-1 group-hover:-translate-y-1" />
        </button>
      </form>
    </motion.section>
  );
}
