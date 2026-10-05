import Image from "next/image";
import Link from "next/link";
import { FiArrowUpRight } from "react-icons/fi";
import type { Post } from "@/lib/blog";
import { formatDate } from "@/lib/format";
import { localePath } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { siteConfig } from "@/lib/site";

const slugify = (text: string) => text.trim().toLowerCase().replace(/\s+/g, "-");

// Card di un articolo nell'indice del blog. `featured`: card larga con etichetta "In evidenza".
export function PostCard({ post, featured = false }: { post: Post; featured?: boolean }) {
  const t = getDictionary(post.lang).blog;
  const href = localePath(post.lang, `/blog/${post.slug}`);

  return (
    <article className={featured ? "post-card is-featured" : "post-card"}>
      <div className="post-cover">
        {post.cover ? (
          <Image
            src={post.cover}
            alt={post.coverAlt ?? ""}
            fill
            sizes={featured ? "(max-width: 900px) 100vw, 760px" : "(max-width: 900px) 100vw, 380px"}
            priority={featured}
          />
        ) : (
          // Copertina grafica quando l'articolo non ha un'immagine: path del primo tag, come le etichette del sito.
          <div className="post-cover-art" aria-hidden="true">
            <span>{"/" + slugify(post.tags?.[0] ?? "blog")}</span>
          </div>
        )}
        {featured && <span className="post-badge">{t.featured}</span>}
        {post.draft && <span className="post-badge is-draft">{t.draft}</span>}
      </div>

      <div className="post-body">
        <p className="post-meta">
          {siteConfig.mentor.name}
          <span aria-hidden="true"> · </span>
          {t.readingTime(post.readingMinutes)}
        </p>
        <h2 className="post-title">
          <Link href={href}>{post.title}</Link>
          <FiArrowUpRight className="post-arrow" aria-hidden="true" />
        </h2>
        <p className="post-excerpt">{post.description}</p>
        <div className="post-foot">
          {post.tags?.slice(0, 2).map((tag) => (
            <span key={tag} className="post-tag">#{slugify(tag)}</span>
          ))}
          <time dateTime={post.date}>{formatDate(post.lang, post.date)}</time>
        </div>
      </div>
    </article>
  );
}
