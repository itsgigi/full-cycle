import type { MetadataRoute } from "next";
import { languageAlternates, localePath, locales } from "@/lib/i18n/config";
import { siteConfig } from "@/lib/site";

const absolute = (map: Record<string, string>) =>
  Object.fromEntries(Object.entries(map).map(([k, v]) => [k, `${siteConfig.url}${v}`]));

// Una voce per pagina e lingua, con gli hreflang delle altre lingue.
export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  const pages = [
    { path: "/", changeFrequency: "weekly", priority: 1 },
    { path: "/privacy", changeFrequency: "yearly", priority: 0.2 },
  ] as const;

  return pages.flatMap(({ path, changeFrequency, priority }) =>
    locales.map((lang) => ({
      url: `${siteConfig.url}${localePath(lang, path)}`,
      lastModified,
      changeFrequency,
      priority,
      alternates: { languages: absolute(languageAlternates(path)) },
    })),
  );
}
