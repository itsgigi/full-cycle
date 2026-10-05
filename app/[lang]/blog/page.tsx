import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Eyebrow } from "@/components/Eyebrow";
import { JsonLd } from "@/components/JsonLd";
import { PostCard } from "@/components/PostCard";
import { SiteFooter, SiteHeader } from "@/components/SiteChrome";
import { getPosts } from "@/lib/blog";
import { hasLocale, languageAlternates, localePath } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { siteConfig } from "@/lib/site";

export async function generateMetadata({ params }: PageProps<"/[lang]/blog">): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const t = getDictionary(lang).blog;
  return {
    title: t.title,
    description: t.description,
    alternates: {
      canonical: localePath(lang, "/blog"),
      languages: languageAlternates("/blog"),
      types: { "application/rss+xml": localePath(lang, "/blog/rss.xml") },
    },
    openGraph: { url: localePath(lang, "/blog"), title: t.title, description: t.description },
  };
}

export default async function BlogPage({ params }: PageProps<"/[lang]/blog">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const t = getDictionary(lang);
  const posts = await getPosts(lang);
  const { freeSpots } = siteConfig.offer;

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Blog",
          name: `${siteConfig.name} — ${t.blog.title}`,
          description: t.blog.description,
          url: `${siteConfig.url}${localePath(lang, "/blog")}`,
          inLanguage: lang,
          blogPost: posts.map((p) => ({
            "@type": "BlogPosting",
            headline: p.title,
            datePublished: p.date,
            url: `${siteConfig.url}${localePath(lang, `/blog/${p.slug}`)}`,
          })),
        }}
      />
      <a href="#main" className="skip-link">{t.chrome.skipLink}</a>
      <SiteHeader lang={lang} />
      <main id="main" className="blog-index">
        <header className="container section-head blog-hero">
          <Eyebrow>{t.blog.eyebrow}</Eyebrow>
          <h1 className="display-lg">{t.blog.heading}</h1>
          <p className="body-lg">{t.blog.intro}</p>
          <a href={localePath(lang, "/blog/rss.xml")} className="blog-rss">{t.blog.rss}</a>
        </header>

        <section className="container">
          {posts.length === 0 ? (
            <p className="blog-empty">{t.blog.empty}</p>
          ) : (
            <ul className="post-grid">
              {posts.map((post, i) => (
                <li key={post.slug} className={i === 0 ? "is-featured" : undefined}>
                  <PostCard post={post} featured={i === 0} />
                </li>
              ))}
            </ul>
          )}
        </section>

        <section className="container section-head blog-cta">
          <Eyebrow>{t.blog.ctaEyebrow}</Eyebrow>
          <h2 className="display-lg">{t.blog.ctaTitle}</h2>
          <p className="body-lg">{t.blog.ctaText}</p>
          <Link
            href={localePath(lang, "/#lista")}
            className="btn btn-glow"
            data-track="CTA Click"
            data-track-location="blog_index"
          >
            {t.blog.ctaButton}
          </Link>
          {freeSpots > 0 && (
            <p className="promo">
              <span className="promo-dot" aria-hidden="true" />
              {t.hero.promo(freeSpots)}
            </p>
          )}
        </section>
      </main>
      <SiteFooter lang={lang} />
    </>
  );
}
