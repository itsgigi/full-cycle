// Lingue del sito. Ogni pagina vive sotto /[lang] (es. /it, /en/privacy).

export const locales = ["it", "en"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "it";

// Cookie con l'ultima lingua visitata: ha la precedenza su Accept-Language nel proxy.
export const LOCALE_COOKIE = "NEXT_LOCALE";

export const hasLocale = (value: string): value is Locale => (locales as readonly string[]).includes(value);

// Percorso localizzato: localePath("en", "/privacy") -> "/en/privacy", localePath("it", "/#faq") -> "/it#faq".
export function localePath(lang: Locale, path = "/") {
  if (path === "/") return `/${lang}`;
  if (path.startsWith("/#")) return `/${lang}${path.slice(1)}`;
  return `/${lang}${path}`;
}

// Valori per og:locale.
export const ogLocales: Record<Locale, string> = { it: "it_IT", en: "en_US" };

// hreflang di una pagina: ogni lingua + x-default. path come in localePath.
export function languageAlternates(path = "/") {
  return {
    ...Object.fromEntries(locales.map((l) => [l, localePath(l, path)])),
    "x-default": localePath(defaultLocale, path),
  };
}
