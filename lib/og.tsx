import { ImageResponse } from "next/og";
import type { Dictionary } from "@/lib/i18n/dictionaries";
import { siteConfig } from "@/lib/site";

// Immagine Open Graph/Twitter condivisa dalle landing: eyebrow, titolo e fasi del ciclo.
export const ogSize = { width: 1200, height: 630 };

export function renderOgImage(t: Dictionary, headline: string) {
  const lifecycle = t.lifecycle;
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 72,
          background: "#FFFFFF",
          color: "#111317",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", fontSize: 32, fontWeight: 600 }}>
          full<span style={{ color: siteConfig.accent }}>/</span>cycle
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <div style={{ display: "flex", fontSize: 26, color: siteConfig.accent, letterSpacing: 1 }}>
            {t.hero.eyebrow.toUpperCase()}
          </div>
          <div style={{ display: "flex", fontSize: 68, fontWeight: 800, lineHeight: 1.05, letterSpacing: -2 }}>
            {headline}
          </div>
        </div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 10, fontSize: 22 }}>
          {lifecycle.map((s, i) => (
            <div
              key={s}
              style={{
                display: "flex",
                padding: "8px 14px",
                borderRadius: 8,
                border: "1px solid #D5D8DF",
                background: i === lifecycle.length - 1 ? "#111317" : "#F6F7F9",
                color: i === lifecycle.length - 1 ? "#FFFFFF" : "#3B3F48",
              }}
            >
              {s}
            </div>
          ))}
        </div>
      </div>
    ),
    ogSize,
  );
}
