import { profile } from "@/lib/content";
import { ImageResponse } from "next/og";

export const runtime = "edge";
export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";
export const alt = `${profile.name} portfolio preview`;

export default function Image() {
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
          <span>Jamie White</span>
          <span>Portfolio</span>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <div
            style={{
              fontSize: 68,
              lineHeight: 1,
              letterSpacing: "-0.06em",
              fontWeight: 700,
              maxWidth: 900,
            }}>
            Building clear, reliable software across web, Java, and embedded
            systems.
          </div>
          <div
            style={{
              fontSize: 28,
              lineHeight: 1.4,
              color: "#14433d",
              maxWidth: 860,
            }}>
            Employer-focused portfolio for an early-career software engineer
            with a bias for maintainable architecture and polished delivery.
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    },
  );
}
