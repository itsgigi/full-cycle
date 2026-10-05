import type { Locale } from "@/lib/i18n/config";

// "2026-10-05" -> "5 ottobre 2026" / "October 5, 2026". UTC per non slittare di un giorno col fuso orario.
export const formatDate = (lang: Locale, isoDate: string) =>
  new Intl.DateTimeFormat(lang, { dateStyle: "long", timeZone: "UTC" }).format(new Date(`${isoDate}T00:00:00Z`));
