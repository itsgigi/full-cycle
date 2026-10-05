// Testi del sito in italiano. en.ts deve avere la stessa forma (controllato da TypeScript).

const hoursPerWeek = "3-5 ore/settimana";

export const it = {
  meta: {
    title: "Full Cycle — Percorso 1:1 per sviluppatori junior",
    description:
      "Mentorship 1:1 per sviluppatori junior in tre pacchetti: Web Vitals + SEO, Design & Interaction (Figma, Three.js), Admin Dashboard (login, WebSocket, grafici). Progetti reali dal frontend al deploy, con code review. Gratis per i primi 3 studenti selezionati.",
    keywords: [
      "corso sviluppatore junior",
      "mentorship programmazione",
      "corso full stack",
      "percorso 1:1 sviluppatori",
      "diventare sviluppatore",
      "portfolio GitHub",
      "corso DevOps",
      "CI/CD",
      "deploy in produzione",
      "code review",
      "primo lavoro sviluppatore",
      "corso SEO tecnico",
      "corso Next.js",
      "corso Figma",
      "corso Three.js",
      "corso admin dashboard",
      "WebSocket",
    ],
    tracksListName: "Pacchetti del percorso",
  },

  chrome: {
    skipLink: "Vai al contenuto",
    mainNav: "Navigazione principale",
    nav: {
      how: "Come funziona",
      program: "Programma",
      tracks: "Pacchetti",
      faq: "FAQ",
      blog: "Blog",
      waitlist: "Iscriviti",
    },
    langSwitch: "Lingua",
    footerTagline: "Mentorship 1:1 per sviluppatori junior: dall'idea alla produzione, su progetti veri.",
    footerContacts: "Contatti",
    footerLinks: "Link",
    footerNav: "Link del footer",
    privacy: "Privacy policy",
  },

  lifecycle: ["idea", "design", "frontend", "backend", "database", "test", "CI/CD", "deploy", "monitoraggio"],
  lifecycleAria: "Fasi del ciclo di vita del software",

  hero: {
    eyebrow: "Percorso 1:1 per sviluppatori junior",
    title: "Non basta più saper scrivere codice.",
    subtitle: "Impara a far vivere il software, dall'idea alla produzione.",
    stackAria: "Tecnologie usate nel percorso",
    ctaPrimary: "Voglio imparare",
    ctaSecondary: "Scegli il pacchetto",
    promo: (n: number) => `Lancio: gratis per i primi ${n} studenti selezionati`,
  },

  problem: {
    eyebrow: "Il problema",
    title: "Il ruolo “junior” è cambiato. I percorsi per diventarlo, no.",
    items: [
      {
        title: "Si chiede autonomia end-to-end",
        text: "Anche a chi è alle prime armi viene chiesto di capire come un'app arriva in produzione, non solo di chiudere ticket su un pezzo.",
      },
      {
        title: "L'AI scrive codice, serve chi capisce il sistema",
        text: "Generare una funzione è facile. Sapere dove metterla, come testarla e come rilasciarla è ciò che fa la differenza.",
      },
      {
        title: "I progetti da tutorial non convincono",
        text: "Le aziende guardano GitHub. Una todo-list clonata non racconta come lavori su un progetto vero.",
      },
    ],
  },

  how: {
    eyebrow: "Come funziona",
    title: "Un percorso costruito su di te, non un corso registrato.",
    steps: [
      {
        title: "Call conoscitiva",
        text: "Partiamo da dove sei: competenze, obiettivi, il tipo di azienda in cui vuoi lavorare.",
      },
      {
        title: "Piano su misura",
        text: "Scegliamo insieme i progetti da costruire e lo stack, in base ai tuoi gap e al mercato che punti.",
      },
      {
        title: "Costruisci, con review",
        text: "Sessioni 1:1, code review sulle tue pull request e feedback come in un team vero.",
      },
      {
        title: "Portfolio e colloqui",
        text: "Rifiniamo i repository, prepariamo come raccontarli e ti alleni sulle domande tecniche.",
      },
    ],
  },

  program: {
    eyebrow: "In ogni pacchetto",
    title: "Ogni fase del ciclo di vita, dentro un progetto vero.",
    modules: [
      {
        path: "/frontend",
        title: "Interfacce solide",
        text: "Componenti, stato, accessibilità e performance con React/Next.js.",
        highlight: false,
      },
      {
        path: "/backend",
        title: "API e logica",
        text: "Progettare API, autenticazione, gestione degli errori e integrazioni esterne.",
        highlight: false,
      },
      {
        path: "/database",
        title: "Dati che reggono",
        text: "Modellazione, migrazioni e query, con un database relazionale.",
        highlight: false,
      },
      {
        path: "/test",
        title: "Qualità verificabile",
        text: "Test unitari, di integrazione ed end-to-end che girano a ogni modifica.",
        highlight: false,
      },
      {
        path: "/ci-cd",
        title: "Pipeline automatiche",
        text: "Build, lint e test automatizzati, con rilasci senza passaggi manuali.",
        highlight: false,
      },
      {
        path: "/deploy",
        title: "Online, davvero",
        text: "Container, ambienti e cloud: il tuo progetto ha un URL pubblico.",
        highlight: false,
      },
      {
        path: "/monitoraggio",
        title: "Dopo il rilascio",
        text: "Log, metriche e gestione degli errori in produzione.",
        highlight: false,
      },
      {
        path: "/ai-workflow",
        title: "L'AI come collega",
        text: "Usare gli assistenti AI per andare veloce, senza perdere il controllo del codice.",
        highlight: true,
      },
    ],
  },

  tracks: {
    eyebrow: "Pacchetti",
    title: "Scegli la specializzazione. Il ciclo completo è sempre incluso.",
    body: "Tutti i pacchetti partono dalla stessa base: l'intero ciclo di vita del software. Cambiano il progetto che costruisci e le fasi su cui andiamo più a fondo.",
    lifecycleLabel: "$ base comune a tutti i pacchetti",
    specializationLabel: "Specializzazione:",
    focusLabel: "focus",
    projectLabel: "potenziale progetto finale",
    fullPrice: "Prezzo pieno: ",
    freeFor: (n: number) => `Gratis per i primi ${n}`,
    choose: (name: string) => `Scegli ${name}`,
    // id stabili: usati come ancore e come valore inviato dal form.
    items: [
      {
        id: "web-vitals-seo",
        path: "/web-vitals",
        name: "Web Vitals + SEO",
        tagline: "Siti veloci che si trovano su Google.",
        topics: [
          "React e Next.js: routing, rendering statico e lato server",
          "SEO tecnico: metadata, sitemap, dati strutturati",
          "Core Web Vitals e performance",
          "Accessibilità e HTML semantico",
          "Analytics, dominio e deploy",
        ],
        project: "Un sito multipagina con blog, ottimizzato per SEO e Core Web Vitals, online sul tuo dominio.",
        focus: ["frontend", "deploy", "monitoraggio"],
      },
      {
        id: "design-interaction",
        path: "/design",
        name: "Design & Interaction",
        tagline: "Dal file Figma a un'esperienza che si muove.",
        topics: [
          "Figma: design system, componenti e prototipi",
          "Handoff: dal design al codice, pixel per pixel",
          "Animazioni e micro-interazioni",
          "Three.js: scene 3D, luci, camere e interazione",
          "Performance di animazioni e 3D",
        ],
        project: "Un portfolio interattivo progettato in Figma, con una scena 3D in Three.js.",
        focus: ["design", "frontend"],
      },
      {
        id: "admin-dashboard",
        path: "/admin",
        name: "Admin Dashboard",
        tagline: "Gestionali veri, con dati in tempo reale.",
        topics: [
          "Login, sessioni e ruoli utente",
          "API, database e permessi",
          "WebSocket per aggiornamenti live",
          "Grafici e tabelle con filtri e ordinamento",
          "Test end-to-end dei flussi critici",
        ],
        project: "Una dashboard con login, ruoli, grafici e dati che si aggiornano live via WebSocket.",
        focus: ["backend", "database", "test"],
      },
    ],
  },

  result: {
    eyebrow: "Il risultato",
    title: "Un GitHub che parla per te.",
    body: "Chi legge il tuo profilo vede progetti completi: architettura documentata, test, pipeline e un'app funzionante online. E vede come lavori in team: pull request, code review e una gestione Git ordinata, con sprint e flusso agile. È la prova concreta che sai lavorare sull'intero ciclo, non solo su un pezzo.",
    repoLabel: "progetto-full-cycle",
    repoSublabel: (n: number) => `${n} file nel repo`,
    repoChecklist: [
      "README con architettura e scelte tecniche",
      "Frontend + backend + database",
      "Test automatici",
      "Pipeline CI verde",
      "Deploy live con URL pubblico",
      "Storico di pull request con code review",
    ],
  },

  mentor: {
    eyebrow: "Il mentor",
    role: "Software developer",
    bio: "Sono uno sviluppatore software: progetto e costruisco prodotti web dall'interfaccia al deploy, passando per API, database e pipeline. Ho creato Full Cycle per dare ai junior quello che di solito si impara solo sul campo: lavorare sull'intero ciclo di un progetto vero, con qualcuno che ti rivede il codice.",
    points: [
      "Ti seguo io, 1:1, dalla call iniziale al deploy finale",
      "Rivedo il tuo codice su ogni pull request",
      "Scegliamo i progetti in base al lavoro che vuoi fare",
    ],
    newTab: " (si apre in una nuova scheda)",
  },

  faq: {
    title: "Domande frequenti",
    items: (o: { freeSpots: number; priceLabel: string }) => [
      {
        q: "È il percorso giusto per me?",
        a: "Sì, se hai finito un bootcamp, l'università o studi da autodidatta; se sei junior e lavori solo su una parte dello stack; se cerchi il primo lavoro (o il prossimo) e il tuo GitHub non ti rappresenta; se vuoi un percorso guidato da una persona, non solo video.",
      },
      {
        q: "Quando non fa per me?",
        a: "Se non hai mai scritto una riga di codice, se cerchi una certificazione da appendere al CV o se non hai qualche ora a settimana da dedicare ai progetti.",
      },
      {
        q: "Che livello serve per iniziare?",
        a: "Devi conoscere le basi di almeno un linguaggio e aver già costruito qualcosa, anche piccolo. Il resto lo calibriamo nella call iniziale.",
      },
      {
        q: "Quanto tempo devo dedicarci?",
        a: `${hoursPerWeek} in media, tra sessioni e lavoro sui progetti. Il ritmo si adatta a chi studia o lavora già.`,
      },
      {
        q: "Come scelgo il pacchetto?",
        a: "Scegli quello più vicino al lavoro che vuoi fare: nella call conoscitiva verifichiamo insieme che sia quello giusto per te.",
      },
      {
        q: `Come vengono scelti i ${o.freeSpots} studenti gratuiti?`,
        a: `Tra chi entra in lista d'attesa, dopo la call conoscitiva. I primi ${o.freeSpots} selezionati seguono il pacchetto scelto gratuitamente; per gli altri il prezzo è ${o.priceLabel}.`,
      },
      {
        q: "I progetti restano miei?",
        a: "Sì, il codice è tuo e vive sul tuo GitHub.",
      },
      {
        q: "Garantite un lavoro?",
        a: "No. Ti diamo competenze, un portfolio concreto e preparazione ai colloqui: gli strumenti per presentarti molto meglio di prima.",
      },
    ],
  },

  waitlist: {
    title: "Stiamo aprendo i primi posti.",
    body: "Scegli il pacchetto e lasciaci due informazioni: ti contattiamo per una call conoscitiva gratuita prima dell'apertura ufficiale.",
    bodyFree: (n: number) => ` I primi ${n} studenti selezionati partecipano gratis.`,
  },

  ticket: {
    aria: "Strappa il biglietto e compila il modulo",
    stubCta: "Strappa",
    stubSub: "e candidati",
    title: "Posto riservato",
    free: (n: number) => `Lancio · gratis per i primi ${n}`,
    call: "Call conoscitiva gratuita",
  },

  form: {
    successTitle: "Sei in lista.",
    successText: "Ti scriviamo a breve per fissare la call conoscitiva.",
    name: "Nome",
    email: "Email",
    track: "Quale pacchetto ti interessa?",
    customTrack: { id: "custom", name: "Custom", tagline: "Un percorso su misura: lo definiamo insieme nella call." },
    level: "A che punto sei?",
    budget: "Quanto investiresti in un percorso così?",
    goal: "Cosa vorresti ottenere?",
    optional: "(facoltativo)",
    submit: "Iscriviti",
    pending: "Invio in corso…",
    fineprint: "Niente spam. Usiamo i tuoi dati solo per contattarti su questo percorso.",
    // value stabile (inviato al webhook), label tradotta.
    levelOptions: [
      { value: "student", label: "Sto studiando / bootcamp" },
      { value: "first-job", label: "Cerco il primo lavoro" },
      { value: "junior", label: "Junior con meno di 2 anni" },
      { value: "other", label: "Altro" },
    ],
    budgetOptions: [
      { value: "lt-300", label: "Meno di 300 €" },
      { value: "300-700", label: "300 – 700 €" },
      { value: "700-1500", label: "700 – 1.500 €" },
      { value: "gt-1500", label: "Più di 1.500 €" },
    ],
    errors: {
      name: "Inserisci il tuo nome.",
      email: "Inserisci un'email valida.",
      track: "Scegli un pacchetto.",
      check: "Controlla i campi evidenziati.",
      unavailable: "Iscrizioni temporaneamente non disponibili.",
      generic: "Qualcosa è andato storto. Riprova tra poco.",
    },
  },

  offer: {
    priceLabel: "1.500 €",
  },

  privacy: {
    title: "Privacy policy",
    description: (name: string) => `Come ${name} tratta i dati raccolti tramite la lista d'attesa.`,
    controller: (who: string, email: string) => `Titolare del trattamento: ${who}, contattabile all'indirizzo ${email}.`,
    dataTitle: "Dati raccolti",
    data: "Tramite il modulo della lista d'attesa raccogliamo nome, email, pacchetto di interesse e, se li indichi, livello di esperienza, fascia di budget e obiettivo. Nome, email e pacchetto sono necessari per ricontattarti: senza non possiamo gestire la tua richiesta. Gli altri campi sono facoltativi.",
    purposeTitle: "Finalità",
    purpose: (name: string) =>
      `Usiamo questi dati solo per ricontattarti, di norma entro 24-48 ore, riguardo al percorso ${name} e per fissare una call conoscitiva. Non li usiamo per newsletter o marketing e non li cediamo a terzi.`,
    legalBasisTitle: "Base giuridica",
    legalBasis:
      "Il trattamento si basa sulla tua richiesta di essere ricontattato, cioè su misure precontrattuali adottate su tua richiesta (art. 6, par. 1, lett. b GDPR).",
    recipientsTitle: "Dove sono salvati i dati",
    recipients:
      "Il sito è ospitato su Vercel. Le iscrizioni sono raccolte tramite Formspree, che le salva sui propri server e le inoltra alla casella email del titolare. Questi fornitori agiscono come responsabili del trattamento e possono trattare i dati negli Stati Uniti, con le garanzie previste dal GDPR (EU-US Data Privacy Framework o clausole contrattuali standard). Il fornitore di hosting registra inoltre dati tecnici delle visite, come l'indirizzo IP, per sicurezza e per periodi limitati.",
    retentionTitle: "Conservazione",
    retention:
      "Conserviamo i dati per 12 mesi dall'iscrizione, poi li cancelliamo da Formspree e dalla casella email. Se inizi un percorso, li conserviamo per la durata del rapporto e per gli obblighi di legge che ne derivano (ad esempio fiscali). Puoi chiederne la cancellazione anticipata in qualsiasi momento.",
    cookiesTitle: "Cookie e statistiche",
    cookies:
      "Il sito non usa cookie. Per capire come viene usata la pagina usiamo Vercel Web Analytics, che raccoglie in forma aggregata e anonima le pagine visitate, i click sui pulsanti principali e dati generici come paese, browser e dispositivo. Non salva cookie sul tuo dispositivo e non permette di identificarti: i visitatori sono distinti tramite un codice temporaneo che si azzera ogni 24 ore. Le statistiche sull'iscrizione (pacchetto, livello, budget) non includono nome né email.",
    rightsTitle: "I tuoi diritti",
    rights: (email: string) =>
      `Puoi chiedere in qualsiasi momento accesso, rettifica, cancellazione, limitazione o portabilità dei tuoi dati e opporti al trattamento scrivendo a ${email}. Hai anche il diritto di proporre reclamo al Garante per la protezione dei dati personali (garanteprivacy.it).`,
  },

  blog: {
    title: "Blog",
    eyebrow: "Blog",
    heading: "Dall'idea alla produzione, un articolo alla volta.",
    featured: "In evidenza",
    rss: "Feed RSS",
    description: "Articoli pratici per sviluppatori junior: progetti veri, architettura, deploy e carriera nel software.",
    intro: "Guide pratiche e lezioni dal lavoro vero: come si porta un progetto dall'idea alla produzione.",
    empty: "Nessun articolo ancora. Torna presto.",
    readMore: "Leggi l'articolo",
    readingTime: (minutes: number) => `${minutes} min di lettura`,
    updated: (date: string) => `Aggiornato il ${date}`,
    draft: "Bozza",
    back: "Tutti gli articoli",
    ctaEyebrow: "Full Cycle",
    ctaTitle: "Vuoi costruire un progetto vero, dall'idea alla produzione?",
    ctaText: "Full Cycle è una mentorship 1:1 per sviluppatori junior. Iscriviti alla lista d'attesa.",
    ctaButton: "Iscriviti alla lista",
  },

  notFound: {
    title: "Pagina non trovata.",
    back: "Torna alla home",
  },
};

export type Dictionary = typeof it;
