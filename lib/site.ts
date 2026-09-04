import { caseStudies, contactConfig, profile } from "@/lib/content";
import type { CaseStudy } from "@/lib/types";

const fallbackSiteUrl = "http://localhost:3000";

export const siteConfig = {
  name: profile.name,
  title: `${profile.name} | ${profile.role}`,
  description:
    "Portfolio for Jamie White, a software and solutions engineer building and shipping mobile, web, and systems software.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? fallbackSiteUrl,
};

export function getSiteUrl() {
  return siteConfig.url.endsWith("/")
    ? siteConfig.url.slice(0, -1)
    : siteConfig.url;
}

export function absoluteUrl(path = "/") {
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  return `${getSiteUrl()}${normalizedPath}`;
}

export function getFeaturedCaseStudies() {
  return caseStudies.filter((caseStudy) => caseStudy.featured);
}

export function getOtherCaseStudies() {
  return caseStudies.filter((caseStudy) => !caseStudy.featured);
}

export function getCaseStudyBySlug(slug: string) {
  return caseStudies.find((caseStudy) => caseStudy.slug === slug);
}

export function getCaseStudyParams() {
  return caseStudies.map((caseStudy) => ({ slug: caseStudy.slug }));
}

export function buildHomeStructuredData() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: profile.name,
    jobTitle: profile.role,
    description: siteConfig.description,
    url: absoluteUrl("/"),
    email: `mailto:${contactConfig.email}`,
    address: {
      "@type": "PostalAddress",
      addressCountry: "UK",
    },
    alumniOf: {
      "@type": "CollegeOrUniversity",
      name: "University of Kent",
    },
    sameAs: [contactConfig.githubHref, contactConfig.linkedInHref],
    knowsAbout: [
      "Flutter",
      "Dart",
      "TypeScript",
      "Next.js",
      "SvelteKit",
      "React",
      "Swift",
      "Embedded systems",
      "Software engineering",
      "Automated testing",
    ],
  };
}

export function buildCaseStudyStructuredData(caseStudy: CaseStudy) {
  return {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: caseStudy.title,
    description: caseStudy.summary,
    url: absoluteUrl(`/projects/${caseStudy.slug}`),
    image: absoluteUrl(caseStudy.media[0]?.src.src ?? "/opengraph-image"),
    author: {
      "@type": "Person",
      name: profile.name,
    },
    creator: {
      "@type": "Person",
      name: profile.name,
    },
    about: caseStudy.stack,
    keywords: caseStudy.stack.join(", "),
  };
}
