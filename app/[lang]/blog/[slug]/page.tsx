import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { JsonLd } from "@/components/JsonLd";
import { SiteFooter, SiteHeader } from "@/components/SiteChrome";
import { getPost, getPosts, postAlternates } from "@/lib/blog";
import { formatDate } from "@/lib/format";
import { defaultLocale, hasLocale, localePath, locales, ogLocales } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { siteConfig } from "@/lib/site";

export async function generateStaticParams({ params }: { params: { lang: string } }) {
  if (!hasLocale(params.lang)) return [];
  return (await getPosts(params.lang)).map((p) => ({ slug: p.slug }));
}

// Solo gli articoli esistenti: gli altri slug danno 404.
export const dynamicParams = false;

export async function generateMetadata({ params }: PageProps<"/[lang]/blog/[slug]">): Promise<Metadata> {
  const { lang, slug } = await params;
  if (!hasLocale(lang)) return {};
  const found = await getPost(lang, slug);
  if (!found) return {};
  const { post } = found;
  const paths = postAlternates(post);
  const languages = Object.fromEntries(Object.entries(paths).map(([l, p]) => [l, localePath(l as typeof lang, p)]));
  const xDefault = paths[defaultLocale] ? languages[defaultLocale] : undefined;
  const url = localePath(lang, `/blog/${post.slug}`);

  return {
    title: post.title,
    description: post.description,
    keywords: post.tags,
    alternates: { canonical: url, languages: { ...languages, ...(xDefault ? { "x-default": xDefault } : {}) } },
    openGraph: {
      type: "article",
      url,
      locale: ogLocales[lang],
      title: post.title,
      description: post.description,
      publishedTime: post.date,
      modifiedTime: post.updated ?? post.date,
      authors: [siteConfig.mentor.name],
      tags: post.tags,
      ...(post.cover ? { images: [{ url: post.cover, alt: post.coverAlt ?? post.title }] } : {}),
    },
    twitter: {
      title: post.title,
      description: post.description,
      ...(post.cover ? { images: [post.cover] } : {}),
    },
    ...(post.draft ? { robots: { index: false, follow: false } } : {}),
  };
}

export default async function PostPage({ params }: PageProps<"/[lang]/blog/[slug]">) {
  const { lang, slug } = await params;
  if (!hasLocale(lang)) notFound();
  const found = await getPost(lang, slug);
  if (!found) notFound();
  const { post, Content } = found;
  const t = getDictionary(lang);
  const url = `${siteConfig.url}${localePath(lang, `/blog/${post.slug}`)}`;
  // Selettore lingua: traduzione se esiste, altrimenti l'indice del blog.
  const localePaths = { ...Object.fromEntries(locales.map((l) => [l, "/blog"])), ...postAlternates(post) };

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "BlogPosting",
          headline: post.title,
          description: post.description,
          datePublished: post.date,
          dateModified: post.updated ?? post.date,
          inLanguage: lang,
          url,
          mainEntityOfPage: url,
          keywords: post.tags?.join(", "),
          ...(post.cover ? { image: `${siteConfig.url}${post.cover}` } : {}),
          author: { "@type": "Person", name: siteConfig.mentor.name, url: siteConfig.mentor.links[0]?.href },
          publisher: { "@type": "Organization", name: siteConfig.name, url: siteConfig.url },
        }}
      />
      <a href="#main" className="skip-link">{t.chrome.skipLink}</a>
      <SiteHeader lang={lang} localePaths={localePaths} />
      <main id="main" className="container-narrow blog">
        <Link href={localePath(lang, "/blog")} className="post-back">← {t.blog.back}</Link>
        <article className="post">
          <header className="post-header">
            <p className="post-meta">
              <time dateTime={post.date}>{formatDate(lang, post.date)}</time>
              <span aria-hidden="true"> · </span>
              {t.blog.readingTime(post.readingMinutes)}
              {post.draft && <span className="post-draft">{t.blog.draft}</span>}
            </p>
            <h1 className="display-md">{post.title}</h1>
            <p className="post-lead">{post.description}</p>
            {post.updated && <p className="post-meta">{t.blog.updated(formatDate(lang, post.updated))}</p>}
          </header>
          <div className="prose">
            <Content />
          </div>
        </article>

        <aside className="post-cta">
          <h2>{t.blog.ctaTitle}</h2>
          <p>{t.blog.ctaText}</p>
          <Link
            href={localePath(lang, "/#lista")}
            className="btn btn-glow"
            data-track="CTA Click"
            data-track-location="blog_post"
          >
            {t.blog.ctaButton}
          </Link>
        </aside>
      </main>
      <SiteFooter lang={lang} />
    </>
  );
}
