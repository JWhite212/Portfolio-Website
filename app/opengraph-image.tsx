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
          background: "#0a0a0a",
          color: "#e8e6e3",
          fontFamily: "monospace",
        }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            fontSize: 18,
            letterSpacing: "0.3em",
            textTransform: "uppercase",
            color: "#39ff14",
          }}>
          <span>[JW]</span>
          <span>Portfolio</span>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <div
            style={{
              fontSize: 64,
              lineHeight: 1,
              letterSpacing: "-0.04em",
              fontWeight: 700,
              maxWidth: 900,
              color: "#e8e6e3",
            }}>
            Building clear, reliable software across web, Java, and embedded
            systems.
          </div>
          <div
            style={{
              fontSize: 24,
              lineHeight: 1.4,
              color: "#39ff14",
              maxWidth: 860,
            }}>
            &gt; Early-career software engineer / maintainable architecture /
            polished delivery
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    },
  );
}
