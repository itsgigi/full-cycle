import { localePath, type Locale } from "@/lib/i18n/config";
import type { Dictionary } from "@/lib/i18n/dictionaries";
import { siteConfig } from "@/lib/site";

// JSON-LD di una landing (home o variante): sito, mentor, pacchetti come Course con offerta, FAQ.
export function structuredData(lang: Locale, t: Dictionary, path: string) {
  const { url: origin, name, mentor, offer } = siteConfig;
  const url = `${origin}${localePath(lang, path)}`;
  const mentorReady = !mentor.name.startsWith("[");
  const faqs = t.faq.items({ freeSpots: offer.freeSpots, priceLabel: t.offer.priceLabel });

  const person = mentorReady
    ? {
        "@type": "Person",
        "@id": `${origin}/#mentor`,
        name: mentor.name,
        jobTitle: t.mentor.role,
        image: `${origin}${mentor.image}`,
        ...(mentor.links.length ? { sameAs: mentor.links.map((l) => l.href) } : {}),
      }
    : null;

  const provider = person
    ? { "@id": `${origin}/#mentor` }
    : { "@type": "Organization", name, url: origin };

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": `${url}#website`,
        url,
        name,
        description: t.meta.description,
        inLanguage: lang,
      },
      ...(person ? [person] : []),
      {
        "@type": "ItemList",
        "@id": `${url}#pacchetti`,
        name: t.meta.tracksListName,
        itemListElement: t.tracks.items.map((tr, i) => ({
          "@type": "ListItem",
          position: i + 1,
          url: `${url}#${tr.id}`,
        })),
      },
      ...t.tracks.items.map((tr) => ({
        "@type": "Course",
        "@id": `${url}#${tr.id}`,
        name: `${tr.name} — ${name}`,
        description: `${tr.tagline} ${tr.project}`,
        url: `${url}#${tr.id}`,
        inLanguage: lang,
        provider,
        educationalLevel: "Beginner",
        teaches: tr.topics,
        hasCourseInstance: {
          "@type": "CourseInstance",
          courseMode: "Online",
          ...(offer.workload ? { courseWorkload: offer.workload } : {}),
          instructor: provider,
        },
        ...(offer.price != null
          ? {
              offers: {
                "@type": "Offer",
                category: "Paid",
                price: offer.price,
                priceCurrency: "EUR",
                availability: "https://schema.org/PreOrder",
                url: `${url}#lista`,
              },
            }
          : {}),
      })),
      {
        "@type": "FAQPage",
        "@id": `${url}#faq`,
        mainEntity: faqs.map((f) => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: { "@type": "Answer", text: f.a },
        })),
      },
    ],
  };
}
