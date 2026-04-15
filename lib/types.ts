import type { StaticImageData } from "next/image";

export type HomeSectionId =
  | "home"
  | "projects"
  | "approach"
  | "experience"
  | "contact";

export type NavigationItem = {
  label: string;
  href: string;
  sectionId?: HomeSectionId;
  external?: boolean;
};

export type ProofPoint = {
  label: string;
  value: string;
  detail: string;
};

export type Profile = {
  name: string;
  role: string;
  location: string;
  heroEyebrow: string;
  heroHeadline: string;
  heroSummary: string;
  availability: string;
  quickFacts: string[];
  proofPoints: ProofPoint[];
  about: string[];
  principles: string[];
};

export type CaseStudyLink = {
  label: string;
  href: string;
  kind: "repository" | "live" | "article";
};

export type CaseStudyMedia = {
  src: StaticImageData;
  alt: string;
  caption: string;
};

export type TechnicalDecision = {
  title: string;
  detail: string;
};

export type CaseStudy = {
  slug: string;
  title: string;
  summary: string;
  role: string;
  period: string;
  problem: string;
  approach: string[];
  technicalDecisions: TechnicalDecision[];
  stack: string[];
  outcome: string[];
  links: CaseStudyLink[];
  media: CaseStudyMedia[];
  featured: boolean;
  githubUrl?: string;
};

export type ExperienceItem = {
  title: string;
  organisation: string;
  location: string;
  period: string;
  summary: string;
  highlights: string[];
};

export type EducationItem = {
  title: string;
  grade: string;
  institution: string;
  period: string;
  summary: string;
};

export type SkillGroup = {
  title: string;
  summary: string;
  skills: string[];
};

export type ContactLink = {
  label: string;
  href: string;
  description: string;
  external?: boolean;
};

export type ContactConfig = {
  email: string;
  cvHref: string;
  formIntro: string;
  availabilityNote: string;
  responseNote: string;
  githubHref: string;
  linkedInHref: string;
};

export type ContactFormState = {
  status: "idle" | "success" | "error";
  message?: string;
  fieldErrors?: {
    senderEmail?: string;
    message?: string;
  };
};
