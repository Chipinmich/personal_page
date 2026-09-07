import { ImageResponse } from "next/og";

import { siteConfig } from "@/lib/site";

export const alt = `${siteConfig.name} — ${siteConfig.tagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/**
 * Default social card. Generated once at build time and reused by every route
 * that does not supply its own image.
 */
export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#080a0f",
          backgroundImage:
            "radial-gradient(circle at 78% 18%, rgba(124,140,255,0.20), transparent 55%)",
          padding: "72px 80px",
          color: "#d8dce7",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: 44,
              height: 44,
              borderRadius: 10,
              border: "1px solid #273142",
              background: "#0d1119",
              color: "#7c8cff",
              fontSize: 16,
              letterSpacing: 1,
            }}
          >
            {siteConfig.monogram}
          </div>
          <div style={{ fontSize: 22, color: "#9aa3b5" }}>{siteConfig.url.replace(/^https?:\/\//, "")}</div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 76, fontWeight: 600, letterSpacing: -2 }}>
            {siteConfig.name}
          </div>
          <div style={{ fontSize: 34, color: "#9aa3b5", marginTop: 12 }}>
            {siteConfig.tagline}
          </div>
          <div style={{ fontSize: 24, color: "#7c8cff", marginTop: 22 }}>
            {siteConfig.focus}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 14,
            fontSize: 20,
            color: "#697386",
            letterSpacing: 3,
          }}
        >
          BUILD
          <span style={{ color: "#273142" }}>/</span>
          LEARN
          <span style={{ color: "#273142" }}>/</span>
          EXPERIMENT
          <span style={{ color: "#273142" }}>/</span>
          IMPROVE
        </div>
      </div>
    ),
    size,
  );
}
