import { defaultLocale, hasLocale, locales } from "@/lib/i18n/config";
import { getPageContent } from "@/lib/i18n/dictionaries";
import { ogSize, renderOgImage } from "@/lib/og";

export const alt = getPageContent(defaultLocale, "ai").meta.title;
export const size = ogSize;
export const contentType = "image/png";

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export default async function OpenGraphImage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const t = getPageContent(hasLocale(lang) ? lang : defaultLocale, "ai");
  return renderOgImage(t, t.hero.title);
}
