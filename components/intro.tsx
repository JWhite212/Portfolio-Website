"use client";

import { UseActiveSectionContext } from "@/context/active-section-context";
import { useSectionInView } from "@/lib/hooks";
import avatarImg from "@/public/avatar.jpg";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { BsArrowRight, BsLinkedin } from "react-icons/bs";
import { FaGithubSquare } from "react-icons/fa";
import { HiDownload } from "react-icons/hi";

export default function Intro() {
  const { ref } = useSectionInView("Home", 0.5);
  const { setActiveSection, setTimeOfLastClick } = UseActiveSectionContext();

  return (
    <section
      ref={ref}
      className="mb-28 mt-18 max-w-[50rem] text-center sm:mb-0 scroll-mt-[100rem]"
      id="home">
      <div className="flex items-center justify-center">
        <div className="relative">
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: "tween", duration: 0.2 }}>
            <Image
              src={avatarImg}
              alt="Jamie White portrait"
              width="192"
              height="192"
              quality="95"
              priority={true}
              className="h-24 w-24 rounded-full object-cover border-[0.35rem] border-white shadow-xl"
            />
          </motion.div>
          <motion.span
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              type: "spring",
              stiffness: 100,
              delay: 0.1,
              duration: 0.7,
            }}
            className="absolute text-4xl bottom-0 right-0">
            ✌
          </motion.span>
        </div>
      </div>
      <motion.h1
        className="mb-10 mt-3 px-4 text-2xl font-medium !leading-[1.5] sm:text-4xl"
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}>
        <span className="font-bold">Hi, I'm Jamie.</span> I'm a recent
        <span className="font-bold"> MSc Computer Science Graduate</span>{" "}
        seeking{" "}
        <span className="font-bold">Graduate/Junior Software Engineer</span>{" "}
        roles and opportunities to showcase my skills and gain experience.
      </motion.h1>

      <motion.div
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="flex flex-col sm:flex-row justify-center items-center gap-2 px-4 text-lg font-medium">
        <Link
          href="#contact"
          className="group bg-gray-900 text-white px-7 py-3 flex items-center gap-2 rounded-full outline-none focus:scale-110 hover:scale-110 hover:bg-gray-950 active:scale-105 transition">
          Contact me here{" "}
          <BsArrowRight className="opacity-70 group-hover:translate-x-1 transition" />
        </Link>
        <a
          className="group bg-white text-black px-7 py-3 flex items-center gap-2 rounded-full outline-none focus:scale-110 hover:scale-110 active:scale-105 cursor-pointer borderBlack transition"
          href="/Jamie White CV.pdf"
          onClick={() => {
            setActiveSection("Contact");
            setTimeOfLastClick(Date.now());
          }}>
          Download CV{" "}
          <HiDownload className="opacity-60 group-hover:translate-y-1 transition" />
        </a>
        <a
          className="bg-white text-gray-700 p-4 flex items-center gap-2 rounded-full outline-none focus:scale-[1.15] hover:scale-[1.15] hover:text-gray-950 active:scale-105 cursor-pointer borderBlack transition"
          href="https://www.linkedin.com/in/jamie-white-swe/">
          {" "}
          <BsLinkedin />
        </a>
        <a
          className="bg-white text-gray-700 p-4 flex items-center gap-2 rounded-full outline-none focus:scale-[1.15] hover:scale-[1.15] hover:text-gray-950 active:scale-105 cursor-pointer borderBlack transition"
          href="https://github.com/JWhite212">
          {" "}
          <FaGithubSquare />
        </a>
      </motion.div>
    </section>
  );
}
