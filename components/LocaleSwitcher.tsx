"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { localePath, locales, type Locale } from "@/lib/i18n/config";

// Stessa pagina nell'altra lingua: sostituisce il primo segmento del percorso.
// `paths` forza il percorso per lingua (es. articoli del blog con slug tradotti), come in localePath.
export function LocaleSwitcher({
  lang,
  label,
  paths,
}: {
  lang: Locale;
  label: string;
  paths?: Partial<Record<Locale, string>>;
}) {
  const pathname = usePathname() ?? `/${lang}`;
  const rest = pathname.replace(/^\/[^/]+/, "");
  const hrefFor = (l: Locale) => (paths ? localePath(l, paths[l] ?? "/") : `/${l}${rest}`);

  return (
    <div className="locale-switcher" role="group" aria-label={label}>
      {locales.map((l) => (
        <Link
          key={l}
          href={hrefFor(l)}
          hrefLang={l}
          lang={l}
          className={l === lang ? "locale-link is-active" : "locale-link"}
          aria-current={l === lang ? "true" : undefined}
        >
          {l.toUpperCase()}
        </Link>
      ))}
    </div>
  );
}
