import type { Locale } from "./config";
import { en } from "./dictionaries/en";
import { it, type Dictionary } from "./dictionaries/it";

export type { Dictionary };

// Contiene funzioni (testi con numeri/nomi): ai Client Component vanno passate solo stringhe già pronte.
const dictionaries: Record<Locale, Dictionary> = { it, en };

export const getDictionary = (lang: Locale): Dictionary => dictionaries[lang];

// Varianti della landing per l'A/B test: "base" è la home (/it), "ai" è /it/ai.
// Il valore viene inviato dal form, così si distinguono le iscrizioni.
export const variants = ["base", "ai"] as const;
export type Variant = (typeof variants)[number];
export const isVariant = (value: string): value is Variant => (variants as readonly string[]).includes(value);

// Percorso della pagina di ogni variante, come in localePath.
export const variantPaths: Record<Variant, string> = { base: "/", ai: "/ai" };

// Testi della pagina di una variante: le sezioni della variante sostituiscono o completano quelle della home.
export function getPageContent(lang: Locale, variant: Variant): Dictionary {
  const t = getDictionary(lang);
  if (variant === "base") return t;
  const v = t.ai;
  return {
    ...t,
    meta: { ...t.meta, ...v.meta },
    lifecycle: v.lifecycle,
    lifecycleAria: v.lifecycleAria,
    hero: { ...t.hero, ...v.hero },
    problem: v.problem,
    how: v.how,
    program: v.program,
    tracks: { ...t.tracks, ...v.tracks },
    result: { ...t.result, ...v.result },
    mentor: { ...t.mentor, ...v.mentor },
    faq: { ...t.faq, ...v.faq },
    waitlist: { ...t.waitlist, ...v.waitlist },
    form: { ...t.form, ...v.form },
  };
}
