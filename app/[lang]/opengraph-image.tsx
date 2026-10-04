import { ImageResponse } from "next/og";
import { defaultLocale, hasLocale, locales } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { siteConfig } from "@/lib/site";

export const alt = getDictionary(defaultLocale).meta.title;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export default async function OpenGraphImage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const t = getDictionary(hasLocale(lang) ? lang : defaultLocale);
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
            {t.hero.subtitle}
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
    size,
  );
}
