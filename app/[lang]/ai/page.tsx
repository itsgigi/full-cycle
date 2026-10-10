import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { LandingPage } from "@/components/LandingPage";
import { hasLocale, languageAlternates, localePath, locales, ogLocales } from "@/lib/i18n/config";
import { getPageContent, variantPaths } from "@/lib/i18n/dictionaries";
import { siteConfig } from "@/lib/site";

// Variante AI della landing per l'A/B test: stessa offerta e stesso stile della home, focus sul prodotto AI.
const path = variantPaths.ai;

export async function generateMetadata({ params }: PageProps<"/[lang]/ai">): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const { meta } = getPageContent(lang, "ai");

  // openGraph e twitter vanno ripetuti per intero: Next non unisce i campi annidati del layout.
  return {
    title: { absolute: meta.title },
    description: meta.description,
    keywords: meta.keywords,
    alternates: {
      canonical: localePath(lang, path),
      languages: languageAlternates(path),
    },
    openGraph: {
      type: "website",
      locale: ogLocales[lang],
      alternateLocale: locales.filter((l) => l !== lang).map((l) => ogLocales[l]),
      url: localePath(lang, path),
      siteName: siteConfig.name,
      title: meta.title,
      description: meta.description,
    },
    twitter: {
      card: "summary_large_image",
      title: meta.title,
      description: meta.description,
    },
  };
}

export default async function AiLanding({ params }: PageProps<"/[lang]/ai">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();

  return <LandingPage lang={lang} variant="ai" />;
}
