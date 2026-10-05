import type { MetadataRoute } from "next";
import { getPosts, postAlternates } from "@/lib/blog";
import { languageAlternates, localePath, locales, type Locale } from "@/lib/i18n/config";
import { siteConfig } from "@/lib/site";

const absolute = (map: Record<string, string>) =>
  Object.fromEntries(Object.entries(map).map(([k, v]) => [k, `${siteConfig.url}${v}`]));

// Una voce per pagina e lingua, con gli hreflang delle altre lingue. Più una voce per ogni articolo del blog.
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const lastModified = new Date();
  const pages = [
    { path: "/", changeFrequency: "weekly", priority: 1 },
    { path: "/blog", changeFrequency: "weekly", priority: 0.7 },
    { path: "/privacy", changeFrequency: "yearly", priority: 0.2 },
  ] as const;

  const staticEntries = pages.flatMap(({ path, changeFrequency, priority }) =>
    locales.map((lang) => ({
      url: `${siteConfig.url}${localePath(lang, path)}`,
      lastModified,
      changeFrequency,
      priority,
      alternates: { languages: absolute(languageAlternates(path)) },
    })),
  );

  const posts = (await Promise.all(locales.map(getPosts))).flat().filter((p) => !p.draft);
  const postEntries = posts.map((post) => {
    const languages = Object.fromEntries(
      Object.entries(postAlternates(post)).map(([l, p]) => [l, localePath(l as Locale, p)]),
    );
    return {
      url: `${siteConfig.url}${localePath(post.lang, `/blog/${post.slug}`)}`,
      lastModified: new Date(`${post.updated ?? post.date}T00:00:00Z`),
      changeFrequency: "monthly" as const,
      priority: 0.6,
      alternates: { languages: absolute(languages) },
    };
  });

  return [...staticEntries, ...postEntries];
}
