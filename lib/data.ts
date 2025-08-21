import corpcommentImg from "@/public/corpcomment.png";
import plantSystemImg from "@/public/plantSystem.jpg";
import vendingMachineImg from "@/public/vendingMachine.png";
import snacklessImg from "@/public/snackless.png";
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
		title: "Customer Assistant",
		location: "Morrisons, Farnborough",
		description:
			"Provided customer service, handled transactions, and supported store operations. Developed communication and teamwork skills while assisting a diverse range of customers.",
		icon: React.createElement(FaReact),
		date: "Nov 2024 – Aug 2025",
	},
	{
		title: "Field Sales Representative",
		location: "Toob, Farnborough",
		description:
			"Conducted door-to-door outreach to promote high-speed broadband services and introduce the brand to new markets. Successfully generated leads and secured sign-ups by delivering clear, confident pitches, handling objections, and building rapport with a wide range of potential customers. Maintained accurate engagement records and contributed to local customer acquisition goals.",
		icon: React.createElement(CgWorkAlt),
		date: "May 2024 – Aug 2024",
	},
	{
		title: "Kitchen & Front of House Staff",
		location: "Papa’s The Deep Blue, Canterbury",
		description: "Collaborated with a large team to create meals and keep operations running smoothly in a busy restaurant setting.",
		icon: React.createElement(CgWorkAlt),
		date: "Aug 2021 – Dec 2023",
	},
	{
		title: "Receptionist",
		location: "Canterbury, Kent",
		description: "Supported staff and students with questions, meetings, and organizational needs in a helpful and friendly manner.",
		icon: React.createElement(LuGraduationCap),
		date: "July 2022 – Nov 2022",
	},
	{
		title: "Kitchen & Front of House Staff",
		location: "McDonalds, Farnborough",
		description:
			"Worked in a fast-paced team environment, preparing food and serving customers efficiently while maintaining high standards of quality and hygiene.",
		icon: React.createElement(CgWorkAlt),
		date: "Feb 2019 – Aug 2022",
	},
	{
		title: "Customer Assistant",
		location: "Asda, Farnborough",
		description: "Assisted customers, managed stock, and maintained store presentation during the busy holiday season.",
		icon: React.createElement(FaReact),
		date: "Dec 2016 – Jan 2017",
	},
	{
		title: "Customer Assistant",
		location: "Marks and Spencer, Guildford",
		description: "Provided customer service and supported store operations, developing strong communication and organizational skills.",
		icon: React.createElement(FaReact),
		date: "Apr 2017 – Oct 2018",
	},
] as const;

export const projectsData = [
	{
		title: "Snackless App",
		description:
			"A cross-platform Flutter application delivering a guided 30-day diet programme with daily audio, food logging, and Wix backend integration.",
		tags: ["Flutter", "Dart", "Riverpod", "Wix", "Stripe"],
		imageUrl: snacklessImg,
	},
	{
		title: "Portfolio Website",
		description:
			"My personal portfolio website. Built with React, Next.js, TypeScript and styled using Tailwind CSS. Using Framer Motion to animate it, React Email and Resend, to provide the contact form functionality.",
		tags: ["React", "Next.js", "TypeScript", "Tailwind", "Framer Motion", "React Email", "Resend", "Vercel"],
		imageUrl: corpcommentImg,
	},
	{
		title: "Vending Machine",
		description:
			"A vending machine project modelled in Java, aimed at showcasing strong design principles, clear, well-documented, and thoroughly tested code, and my understanding of fundamental concepts in object-oriented programming like encapsulation, abstraction, inheritance, and polymorphism.",
		tags: ["java", "junit", "oop", "design-patterns", "oop-principles", "design-principles"],
		imageUrl: vendingMachineImg,
	},
	{
		title: "Automatic IOT Plant Watering System",
		description:
			"I took my love for plants and tech to the next level by building an automated plant care system! Combining C++ programming on an Arduino board, I crafted a system that analyzes sensor data using logistic regression and KNN algorithms to automatically calculate optimal watering schedules. Not just watering though, I built a PID control system to maintain perfect temperature and lighting conditions for any plant I throw at it. To keep you informed, I even built a web interface that graphs sensor data and sends handy mobile notifications if anything needs attention. This project pushed my skills in embedded systems, web development, electronics, and control systems",
		tags: ["Arduino", "Esp32", "C++", "IOT", "Circuit Design", "Web Development"],
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
	"Dart",
	"Flutter",
	"Riverpod",
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
