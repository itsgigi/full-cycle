import { readdir, readFile } from "node:fs/promises";
import path from "node:path";
import type { ComponentType } from "react";
import { locales, type Locale } from "@/lib/i18n/config";

// Articoli: un file per lingua in content/blog/<lang>/<slug>.mdx, con `export const metadata = {...}` in testa.
// Lo slug è il nome del file e finisce nell'URL (/it/blog/<slug>): breve, minuscolo, parole separate da trattini.

export type PostMeta = {
  title: string;
  description: string;
  // Formato YYYY-MM-DD.
  date: string;
  updated?: string;
  tags?: string[];
  // Immagine di copertina in public/, es. "/blog/mio-articolo.jpg" (ideale 1600x900). Senza: copertina grafica generata.
  cover?: string;
  coverAlt?: string;
  // true = visibile solo in sviluppo (npm run dev), escluso da build, elenco e sitemap.
  draft?: boolean;
  // Slug dello stesso articolo nelle altre lingue, es. { en: "my-post" }. Serve per hreflang e selettore lingua.
  translations?: Partial<Record<Locale, string>>;
};

export type Post = PostMeta & { slug: string; lang: Locale; readingMinutes: number };

const CONTENT_DIR = path.join(process.cwd(), "content", "blog");
const WORDS_PER_MINUTE = 220;
const showDrafts = process.env.NODE_ENV === "development";

async function loadMdx(lang: Locale, slug: string) {
  return (await import(`@/content/blog/${lang}/${slug}.mdx`)) as {
    default: ComponentType;
    metadata: PostMeta;
  };
}

async function readingMinutes(lang: Locale, slug: string) {
  const source = await readFile(path.join(CONTENT_DIR, lang, `${slug}.mdx`), "utf8");
  const text = source.replace(/^export const metadata[\s\S]*?\n};?\n/m, "").replace(/```[\s\S]*?```/g, " ");
  return Math.max(1, Math.round(text.split(/\s+/).filter(Boolean).length / WORDS_PER_MINUTE));
}

async function slugs(lang: Locale) {
  try {
    const files = await readdir(path.join(CONTENT_DIR, lang));
    return files.filter((f) => f.endsWith(".mdx")).map((f) => f.slice(0, -4));
  } catch {
    return [];
  }
}

// Articoli pubblicati di una lingua, dal più recente.
export async function getPosts(lang: Locale): Promise<Post[]> {
  const posts = await Promise.all(
    (await slugs(lang)).map(async (slug) => {
      const { metadata } = await loadMdx(lang, slug);
      return { ...metadata, slug, lang, readingMinutes: await readingMinutes(lang, slug) };
    }),
  );
  return posts.filter((p) => showDrafts || !p.draft).sort((a, b) => b.date.localeCompare(a.date));
}

export async function getPost(lang: Locale, slug: string) {
  const post = (await getPosts(lang)).find((p) => p.slug === slug);
  if (!post) return null;
  const { default: Content } = await loadMdx(lang, slug);
  return { post, Content };
}

// Percorso dell'articolo in ogni lingua in cui esiste (lingua corrente compresa).
export function postAlternates(post: Post): Partial<Record<Locale, string>> {
  const map: Partial<Record<Locale, string>> = { [post.lang]: `/blog/${post.slug}` };
  for (const l of locales) {
    const slug = post.translations?.[l];
    if (l !== post.lang && slug) map[l] = `/blog/${slug}`;
  }
  return map;
}
