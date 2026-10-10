import type { Locale } from "@/lib/i18n/config";
import type { Dictionary } from "@/lib/i18n/dictionaries";
import type { NavContent } from "./AiNav";
import type { HeroContent } from "./Hero";

// Contenuti della pagina AI già risolti lato server: ai componenti client arrivano solo stringhe (niente funzioni).
export type AiContent = {
  lang: Locale;
  nav: NavContent;
  hero: HeroContent;
  how: { eyebrow: string; title: string; steps: { title: string; text: string }[] };
  problem: { eyebrow: string; title: string; items: { title: string; text: string }[]; note: string };
  program: { eyebrow: string; title: string; modules: { path: string; title: string; text: string; highlight: boolean }[] };
  tracks: {
    eyebrow: string;
    title: string;
    body: string;
    lifecycleLabel: string;
    lifecycleAria: string;
    lifecycle: string[];
    specializationLabel: string;
    focusLabel: string;
    projectLabel: string;
    fullPrice: string;
    priceLabel: string;
    freeLabel: string | null;
    items: { id: string; path: string; name: string; tagline: string; topics: string[]; project: string; focus: string[]; choose: string }[];
  };
  result: { eyebrow: string; title: string; body: string; repoLabel: string; repoSublabel: string; checklist: string[] };
  mentor: {
    eyebrow: string;
    name: string;
    role: string;
    bio: string;
    points: string[];
    image: string;
    links: { label: string; href: string }[];
    newTab: string;
  };
  faq: { title: string; items: { q: string; a: string }[] };
  waitlist: {
    title: string;
    body: string;
    notes: string[];
    form: Dictionary["form"];
    tracks: { id: string; name: string; tagline: string }[];
    privacyHref: string;
    privacyLabel: string;
  };
  footer: {
    tagline: string;
    contactsLabel: string;
    email: string;
    linksLabel: string;
    navLabel: string;
    links: { href: string; label: string }[];
    copyright: string;
  };
};
