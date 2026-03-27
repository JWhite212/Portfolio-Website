import { getCaseStudyBySlug } from "@/lib/site";
import { ImageResponse } from "next/og";

type ProjectImageProps = {
  params: {
    slug: string;
  };
};

export const runtime = "edge";
export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export default function Image({ params }: ProjectImageProps) {
  const caseStudy = getCaseStudyBySlug(params.slug);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 56,
          background:
            "linear-gradient(180deg, rgba(255,255,255,1) 0%, rgba(242,238,230,1) 100%)",
          color: "#151a19",
          border: "1px solid rgba(21,26,25,0.08)",
        }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            fontSize: 20,
            letterSpacing: "0.28em",
            textTransform: "uppercase",
            color: "#5d635f",
          }}>
          <span>Case Study</span>
          <span>Jamie White</span>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <div
            style={{
              fontSize: 66,
              lineHeight: 1,
              letterSpacing: "-0.06em",
              fontWeight: 700,
              maxWidth: 930,
            }}>
            {caseStudy?.title ?? "Project case study"}
          </div>
          <div
            style={{
              fontSize: 28,
              lineHeight: 1.4,
              color: "#14433d",
              maxWidth: 860,
            }}>
            {caseStudy?.summary ??
              "Project detail page from Jamie White's portfolio."}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            gap: 12,
            flexWrap: "wrap",
          }}>
          {(caseStudy?.stack ?? ["Software engineering"])
            .slice(0, 4)
            .map((item) => (
              <div
                key={item}
                style={{
                  border: "1px solid rgba(20,67,61,0.14)",
                  borderRadius: 999,
                  padding: "10px 18px",
                  fontSize: 20,
                  color: "#151a19",
                  background: "rgba(255,255,255,0.85)",
                }}>
                {item}
              </div>
            ))}
        </div>
      </div>
    ),
    {
      ...size,
    },
  );
}
