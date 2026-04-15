import type { MetadataRoute } from "next";
import { absoluteUrl, getCaseStudyParams } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const caseStudyEntries = getCaseStudyParams().map((params) => ({
    url: absoluteUrl(`/projects/${params.slug}`),
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [
    {
      url: absoluteUrl("/"),
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1.0,
    },
    ...caseStudyEntries,
  ];
}
