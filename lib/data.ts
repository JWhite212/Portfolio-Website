import corpcommentImg from "@/public/corpcomment.png";
import plantSystemImg from "@/public/plantSystem.jpg";
import vendingMachineImg from "@/public/vendingmachine.png";
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
    title: "Receptionist",
    location: "Canterbury, Kent",
    description:
      "Working on reception supporting staff and students with questions, meetings and organisational needs are adequately met in a helpful and friendly manner.",
    icon: React.createElement(LuGraduationCap),
    date: "2022 - 2022",
  },
  {
    title: "Kitchen and Front of House Staff",
    location: "Canterbury, Kent",
    description:"This is a highly collaborative role, creating meals and keeping the chain of operations running smoothly alongside a large team, in a fast-paced environment.",
    icon: React.createElement(CgWorkAlt),
    date: "2019 - 2024",
  },
  {
    title: "Customer Assistant",
    location: "Farnborough, Hampshire",
    description:"These customer-facing roles were instrumental in increasing my confidence and communication skills. Through regular interactions with the public, I gained effective customer service and teamwork skills. Juggling these roles  with my coursework meant I had to be highly organised to manage my time well.",
    icon: React.createElement(FaReact),
    date: "2016 - 2018",
  },
] as const;

export const projectsData = [
  {
    title: "Portfolio Website",
    description:
      "My personal portfolio website. Built with React, Next.js, TypeScript and styled using Tailwind CSS. Using Framer Motion to animate it, React Email and Resend, to provide the contact form functionality.",
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
    title: "Vending Machine",
    description:
      "A vending machine project modelled in Java, aimed at showcasing strong design principles, clear, well-documented, and thoroughly tested code, and my understanding of fundamental concepts in object-oriented programming like encapsulation, abstraction, inheritance, and polymorphism.",
    tags: ["java","junit","oop","design-patterns","oop-principles","design-principles"],
    imageUrl: vendingMachineImg,
  },
  {
    title: "Automatic IOT Plant Watering System",
    description:
      "I took my love for plants and tech to the next level by building an automated plant care system! Combining C++ programming on an Arduino board, I crafted a system that analyzes sensor data using logistic regression and KNN algorithms to automatically calculate optimal watering schedules. Not just watering though, I built a PID control system to maintain perfect temperature and lighting conditions for any plant I throw at it. To keep you informed, I even built a web interface that graphs sensor data and sends handy mobile notifications if anything needs attention. This project pushed my skills in embedded systems, web development, electronics, and control systems",
    tags: ["Arduino", "Esp32","C++" ,"IOT", "Circuit Design", "Web Development"],
    imageUrl: plantSystemImg,
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
  "Tailwind CSS",
  "MongoDB",
  "Stripe",
  "GraphQL",
  "SPARQL",
  "Firebase",
  "PostgreSQL",
  "Framer Motion",
  "Bootstrap",
] as const;
