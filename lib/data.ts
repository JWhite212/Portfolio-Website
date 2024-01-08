import corpcommentImg from "@/public/corpcomment.png";
import rmtdevImg from "@/public/rmtdev.png";
import wordanalyticsImg from "@/public/wordanalytics.png";
import React from "react";
import { CgWorkAlt } from "react-icons/cg";
import { FaReact } from "react-icons/fa";
import { LuGraduationCap } from "react-icons/lu";

export const links = [
  {
    name: "Home",
    hash: "#home",
  },
  {
    name: "About",
    hash: "#about",
  },
  {
    name: "Projects",
    hash: "#projects",
  },
  {
    name: "Skills",
    hash: "#skills",
  },
  {
    name: "Experience",
    hash: "#experience",
  },
  {
    name: "Contact",
    hash: "#contact",
  },
] as const;

export const experiencesData = [
  {
    title: "Graduated bootcamp",
    location: "Miami, FL",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis nec aliquet dui.",
    icon: React.createElement(LuGraduationCap),
    date: "2019",
  },
  {
    title: "Front-End Developer",
    location: "Orlando, FL",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis nec aliquet dui. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis nec aliquet dui.",
    icon: React.createElement(CgWorkAlt),
    date: "2019 - 2021",
  },
  {
    title: "Full-Stack Developer",
    location: "Houston, TX",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis nec aliquet dui. Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    icon: React.createElement(FaReact),
    date: "2021 - present",
  },
] as const;

export const projectsData = [
  {
    title: "Portfolio Website",
    description:
      "My personal portfolio website showcasing a list of my projects, skills, contact details and information about myself. I have used Framer Motion to implement animations.",
    tags: [
      "React",
      "Next.js",
      "TypeScript",
      "Tailwind",
      "Framer Motion",
      "React Email",
      "Resend",
      "Vercel",
    ],
    imageUrl: corpcommentImg,
  },
  {
    title: "rmtDev",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis nec aliquet dui. Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    tags: ["React", "TypeScript", "Next.js", "Tailwind", "Redux"],
    imageUrl: rmtdevImg,
  },
  {
    title: "Word Analytics",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis nec aliquet dui. Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    tags: ["React", "Next.js", "SQL", "Tailwind", "Framer"],
    imageUrl: wordanalyticsImg,
  },
] as const;

export const skillsData = [
  "Java",
  "JUnit",
  "HTML",
  "CSS",
  "JavaScript",
  "TypeScript",
  "React",
  "Gatsby",
  "Next.js",
  "Node.js",
  "Go",
  "Git",
  "Tailwind",
  "MongoDB",
  "GraphQL",
  "SPARQL",
  "Firebase",
  "PostgreSQL",
  "Framer Motion",
  "Bootstrap",
] as const;
