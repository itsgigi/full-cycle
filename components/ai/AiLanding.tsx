import { JsonLd } from "@/components/JsonLd";
import { localePath, locales, type Locale } from "@/lib/i18n/config";
import { getDictionary, getPageContent, variantPaths } from "@/lib/i18n/dictionaries";
import { siteConfig } from "@/lib/site";
import { structuredData } from "@/lib/structured-data";
import { AiFooter } from "./AiFooter";
import type { AiContent } from "./content";
import { FaqSection } from "./FaqSection";
import { Hero } from "./Hero";
import { HowSection } from "./HowSection";
import { MentorSection } from "./MentorSection";
import { ProblemSection } from "./ProblemSection";
import { ProgramBento } from "./ProgramBento";
import { ResultSection } from "./ResultSection";
import { SmoothScroll } from "./SmoothScroll";
import { TracksSection } from "./TracksSection";
import { WaitlistSection } from "./WaitlistSection";

const path = variantPaths.ai;

// Testi risolti lato server (i dizionari contengono funzioni, che non possono andare ai componenti client).
function buildContent(lang: Locale): AiContent {
  const t = getPageContent(lang, "ai");
  const { mentor, offer, contactEmail, name } = siteConfig;
  const free = offer.freeSpots > 0;
  const section = (id: string) => localePath(lang, `${path}#${id}`);

  return {
    lang,
    nav: {
      label: t.chrome.mainNav,
      homeHref: localePath(lang, path),
      items: [
        { id: "come-funziona", href: section("come-funziona"), label: t.chrome.nav.how },
        { id: "programma", href: section("programma"), label: t.chrome.nav.program },
        { id: "pacchetti", href: section("pacchetti"), label: t.chrome.nav.tracks },
        { id: "faq", href: section("faq"), label: t.chrome.nav.faq },
      ],
      waitlist: { href: section("lista"), label: t.chrome.nav.waitlist },
      locales: locales.map((l) => ({ code: l, href: localePath(l, path), active: l === lang })),
      localeLabel: t.chrome.langSwitch,
    },
    hero: {
      eyebrow: t.hero.eyebrow,
      title: t.hero.title,
      subtitle: t.hero.subtitle,
      ctaPrimary: t.hero.ctaPrimary,
      ctaSecondary: t.hero.ctaSecondary,
      promo: free ? t.hero.promo(offer.freeSpots) : null,
    },
    how: t.how,
    problem: { ...t.problem, note: getDictionary(lang).ai.problem.note },
    program: t.program,
    tracks: {
      eyebrow: t.tracks.eyebrow,
      title: t.tracks.title,
      body: t.tracks.body,
      lifecycleLabel: t.tracks.lifecycleLabel,
      lifecycleAria: t.lifecycleAria,
      lifecycle: t.lifecycle,
      specializationLabel: t.tracks.specializationLabel,
      focusLabel: t.tracks.focusLabel,
      projectLabel: t.tracks.projectLabel,
      fullPrice: t.tracks.fullPrice,
      priceLabel: t.offer.priceLabel,
      freeLabel: free ? t.tracks.freeFor(offer.freeSpots) : null,
      items: t.tracks.items.map((tr) => ({ ...tr, choose: t.tracks.choose(tr.name) })),
    },
    result: {
      eyebrow: t.result.eyebrow,
      title: t.result.title,
      body: t.result.body,
      repoLabel: t.result.repoLabel,
      repoSublabel: t.result.repoSublabel(t.result.repoChecklist.length),
      checklist: t.result.repoChecklist,
    },
    mentor: {
      eyebrow: t.mentor.eyebrow,
      name: mentor.name,
      role: t.mentor.role,
      bio: t.mentor.bio,
      points: t.mentor.points,
      image: mentor.image,
      links: [...mentor.links],
      newTab: t.mentor.newTab,
    },
    faq: { title: t.faq.title, items: t.faq.items({ freeSpots: offer.freeSpots, priceLabel: t.offer.priceLabel }) },
    waitlist: {
      title: t.waitlist.title,
      body: t.waitlist.body + (free ? t.waitlist.bodyFree(offer.freeSpots) : ""),
      notes: [t.ticket.call, ...(free ? [t.ticket.free(offer.freeSpots)] : [])],
      form: t.form,
      tracks: [...t.tracks.items.map(({ id, name, tagline }) => ({ id, name, tagline })), t.form.customTrack],
      privacyHref: localePath(lang, "/privacy"),
      privacyLabel: t.chrome.privacy,
    },
    footer: {
      tagline: t.chrome.footerTagline,
      contactsLabel: t.chrome.footerContacts,
      email: contactEmail,
      linksLabel: t.chrome.footerLinks,
      navLabel: t.chrome.footerNav,
      links: [
        { href: section("pacchetti"), label: t.chrome.nav.tracks },
        { href: section("faq"), label: t.chrome.nav.faq },
        { href: localePath(lang, "/blog"), label: t.chrome.nav.blog },
        { href: localePath(lang, "/privacy"), label: t.chrome.privacy },
      ],
      copyright: `© ${new Date().getFullYear()} ${name} · ${mentor.name}`,
    },
  };
}

// Variante AI della landing: stessi contenuti e stessa offerta, nuovo design ("device" navy, gradienti blu, motion GSAP).
export function AiLanding({ lang }: { lang: Locale }) {
  const c = buildContent(lang);
  const t = getPageContent(lang, "ai");

  return (
    <div className="ai-root min-h-screen bg-device p-2.5 md:p-6">
      {/* Senza JS le animazioni non partono: mostra subito lo stato finale. */}
      <noscript>
        <style>{`.ai-root [data-reveal],.ai-root [data-pop],.ai-root [data-hero],.ai-root [data-cursor]{opacity:1!important}.ai-root [data-draw]{stroke-dashoffset:0!important}`}</style>
      </noscript>
      <JsonLd data={structuredData(lang, t, path)} />
      <SmoothScroll />
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-full focus:bg-white focus:px-4 focus:py-2 focus:text-ink!"
      >
        {t.chrome.skipLink}
      </a>
      <div className="mx-auto max-w-[1440px] overflow-hidden rounded-[24px] border border-white/5 bg-navy-900 shadow-[0_0_0_8px_#111c52] md:rounded-[40px] md:shadow-[0_0_0_20px_#111c52]">
        <main id="main">
          <Hero hero={c.hero} nav={c.nav} />
          <HowSection how={c.how} />
          <ProblemSection problem={c.problem} />
          <ProgramBento program={c.program} />
          <TracksSection tracks={c.tracks} />
          <ResultSection result={c.result} />
          <MentorSection mentor={c.mentor} />
          <FaqSection faq={c.faq} />
          <WaitlistSection lang={lang} waitlist={c.waitlist} />
        </main>
        <AiFooter footer={c.footer} />
      </div>
    </div>
  );
}
