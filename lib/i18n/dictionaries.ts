import type { Locale } from "./config";
import { en } from "./dictionaries/en";
import { it, type Dictionary } from "./dictionaries/it";

export type { Dictionary };

// Contiene funzioni (testi con numeri/nomi): ai Client Component vanno passate solo stringhe già pronte.
const dictionaries: Record<Locale, Dictionary> = { it, en };

export const getDictionary = (lang: Locale): Dictionary => dictionaries[lang];
