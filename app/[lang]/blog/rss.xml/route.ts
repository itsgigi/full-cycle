import { getPosts } from "@/lib/blog";
import { hasLocale, localePath, locales } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { siteConfig } from "@/lib/site";

// Feed RSS per lingua: /it/blog/rss.xml, /en/blog/rss.xml. Generato in build.
export const dynamic = "force-static";
export const dynamicParams = false;

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

const escape = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

export async function GET(_request: Request, { params }: RouteContext<"/[lang]/blog/rss.xml">) {
  const { lang } = await params;
  if (!hasLocale(lang)) return new Response("Not found", { status: 404 });
  const t = getDictionary(lang).blog;
  const blogUrl = `${siteConfig.url}${localePath(lang, "/blog")}`;
  const posts = (await getPosts(lang)).filter((p) => !p.draft);

  const items = posts
    .map((p) => {
      const url = `${siteConfig.url}${localePath(lang, `/blog/${p.slug}`)}`;
      return `<item>
<title>${escape(p.title)}</title>
<link>${url}</link>
<guid>${url}</guid>
<description>${escape(p.description)}</description>
<pubDate>${new Date(`${p.date}T00:00:00Z`).toUTCString()}</pubDate>
</item>`;
    })
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
<channel>
<title>${escape(`${siteConfig.name} — ${t.title}`)}</title>
<link>${blogUrl}</link>
<description>${escape(t.description)}</description>
<language>${lang}</language>
<atom:link href="${blogUrl}/rss.xml" rel="self" type="application/rss+xml"/>
${items}
</channel>
</rss>`;

  return new Response(xml, { headers: { "Content-Type": "application/rss+xml; charset=utf-8" } });
}
