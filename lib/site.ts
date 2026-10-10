// Configurazione centrale del sito (valori uguali in tutte le lingue). I testi tradotti sono in lib/i18n/dictionaries.
// I valori tra [PARENTESI] sono segnaposto da sostituire.

export const siteConfig = {
  // Solo l'origin (schema + dominio): un percorso nella variabile (es. ".../it") finirebbe in ogni URL
  // assoluto, e Next lo antepone anche ai path dei metadata (canonical "/it" -> "/it/it").
  url: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000").origin,
  name: "Full Cycle",
  shortName: "full/cycle",
  accent: "#4F46E5",

  mentor: {
    name: "Luigi Di Loreto",
    image: "/luigi.png",
    // Profili mostrati nella sezione mentor e usati nei dati strutturati (sameAs).
    links: [
      { label: "luigidiloreto.it", href: "https://luigidiloreto.it" },
      { label: "LinkedIn", href: "https://www.linkedin.com/in/luigi-di-loreto-023361173" },
    ],
  },

  offer: {
    // Prezzo di ogni pacchetto in EUR. null = niente prezzo nei dati strutturati.
    price: 1500 as number | null,
    // Offerta lancio: i primi N studenti selezionati partecipano gratis. 0 = offerta nascosta.
    freeSpots: 3,
    // Impegno totale in formato ISO 8601 per Google (es. "P2M" = 2 mesi, "PT40H" = 40 ore). null = omesso.
    workload: null as string | null,
  },

  contactEmail: "luigi.dl@hotmail.it",
} as const;
