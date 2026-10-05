// Testi del sito in italiano. en.ts deve avere la stessa forma (controllato da TypeScript).

const hoursPerWeek = "3-5";

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
      waitlist: "Candidati",
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
    title: "Hai imparato a programmare. Ora impara a lavorare come uno sviluppatore.",
    subtitle: "Costruisci un prodotto reale dall'idea al deploy, imparando a gestire le fasi che trasformano il codice in software.",
    stackAria: "Tecnologie usate nel percorso",
    ctaPrimary: "Candidati ai 3 posti gratuiti",
    ctaSecondary: "Scopri il percorso",
    promo: (n: number) => `Lancio: gratis per i primi ${n} studenti selezionati`,
  },

  problem: {
    eyebrow: "Il problema",
    title: "Conoscere un linguaggio o un framework è solo una parte del lavoro.",
    items: [
      {
        title: "Hai studiato, ma hai visto solo una parte del percorso",
        text: "Tutorial, corsi e side project ti hanno insegnato a scrivere codice. Ma nello sviluppo reale devi capire come un'idea diventa un prodotto: requisiti, architettura, sviluppo, testing, review, deploy e manutenzione.",
      },
      {
        title: "Sai sviluppare una feature, ma non sempre portarla fino in produzione",
        text: "È diverso completare una funzionalità in locale e occuparsi di tutto quello che succede prima e dopo: Git, ambienti, CI/CD, performance, errori, monitoraggio e qualità del codice.",
      },
      {
        title: "Ti manca l'esperienza che collega tutti i pezzi",
        text: "Puoi conoscere React, TypeScript, Git o un database singolarmente. Il vero salto è imparare a usarli insieme, prendendo decisioni tecniche e affrontando i problemi che emergono durante un progetto reale.",
      },
    ],
  },

  how: {
    eyebrow: "Come funziona",
    title: "Lavoriamo come un piccolo team di sviluppo.",
    steps: [
      {
        title: "Definisci",
        text: "Partiamo da un'idea e la trasformiamo in requisiti, user story e una roadmap concreta.",
      },
      {
        title: "Costruisci",
        text: "Sviluppi frontend, backend e database con un'architettura pensata per il progetto.",
      },
      {
        title: "Rivedi",
        text: "Lavori con branch e pull request, ricevi code review e correggi il codice come in un team.",
      },
      {
        title: "Rilascia",
        text: "Automatizzi test e CI/CD e porti il progetto online con un deploy reale.",
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
        text: "Componenti, stato, accessibilità e performance con React, Next.js e TypeScript.",
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
    specializationLabel: "specializzazione:",
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
    eyebrow: "Alla fine del percorso",
    title: "Non avrai un altro certificato. Avrai un GitHub da mostrare.",
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

  ai: {
    eyebrow: "AI nel workflow",
    title: "Impara a usare l'AI senza diventare dipendente dall'AI.",
    body: "L'AI può accelerare lo sviluppo, ma non sostituisce la comprensione del software. La usi per esplorare, generare e iterare; impari a verificare l'output, capire i trade-off e mantenere tu il controllo del codice.",
    items: [
      { title: "Genera", text: "Usa l'AI per boilerplate, alternative e prime implementazioni." },
      { title: "Verifica", text: "Testa, leggi e controlla ciò che produce prima di integrarlo." },
      { title: "Decidi", text: "Le decisioni tecniche restano tue: architettura, trade-off e qualità." },
    ],
  },

  beforeAfter: {
    eyebrow: "Il salto di livello",
    title: "La differenza non è quanto codice sai scrivere. È quanto software sai portare fino alla fine.",
    beforeLabel: "Prima",
    beforeSteps: ["Tutorial", "side project", "GitHub", "“Non mi sento pronto”"],
    beforeText: "Hai imparato strumenti e costruito qualcosa, ma spesso senza vedere tutto ciò che succede tra una prima idea e un prodotto in produzione.",
    afterLabel: "Dopo",
    afterSteps: ["Idea", "architettura", "sviluppo", "review", "test", "CI/CD", "produzione"],
    afterText: "Sai raccontare le scelte che hai fatto, mostrare come lavori e spiegare un progetto completo anche durante un colloquio.",
  },

  mentor: {
    eyebrow: "Il mentor",
    role: "Software developer",
    bio: "Sono uno sviluppatore software e ho lavorato in contesti molto diversi: da piccole realtà in cui costruire un prodotto performante richiede scelte attente, fino a multinazionali con milioni di utenti. Questi contesti mi hanno insegnato che non esiste un unico modo di sviluppare software: cambiano dimensioni, team, obiettivi, vincoli e priorità.",
    points: [
      "Esperienza in contesti e dimensioni aziendali molto diversi",
      "Ti seguo 1:1, dalla prima call al deploy finale",
      "Rivedo il tuo codice e ti aiuto a capire il perché delle scelte tecniche",
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
    title: "I primi 3 posti sono gratuiti.",
    body: "Full Cycle è un percorso 1:1 a numero limitato. Candidati, raccontami da dove parti e facciamo una call conoscitiva per capire se il percorso è adatto a te.",
    bodyFree: (n: number) => `I primi ${n} partecipanti selezionati partecipano gratuitamente. Il valore del percorso è 2.000 €.`,
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
    gap: "Cosa ti impedisce oggi di sentirti pronto per un lavoro da developer?",
    optional: "(facoltativo)",
    submit: "Candidati",
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
    priceLabel: "2.000 €",
  },

  privacy: {
    title: "Privacy policy",
    description: (name: string) => `Come ${name} tratta i dati raccolti tramite la lista d'attesa.`,
    controller: (who: string, email: string) => `Titolare del trattamento: ${who}, contattabile all'indirizzo ${email}.`,
    dataTitle: "Dati raccolti",
    data: "Tramite il modulo della lista d'attesa raccogliamo nome, email, livello di esperienza, fascia di budget e, se lo indichi, il tuo obiettivo.",
    purposeTitle: "Finalità",
    purpose: (name: string) =>
      `Usiamo questi dati solo per contattarti riguardo al percorso ${name} e fissare una call conoscitiva. Non li cediamo a terzi per finalità di marketing.`,
    retentionTitle: "Conservazione",
    retention: "[Indica per quanto tempo conservi i dati e su quali servizi sono salvati.]",
    rightsTitle: "I tuoi diritti",
    rights: (email: string) =>
      `Puoi chiedere in qualsiasi momento accesso, rettifica o cancellazione dei tuoi dati scrivendo a ${email}.`,
  },

  notFound: {
    title: "Pagina non trovata.",
    back: "Torna alla home",
  },
};

export type Dictionary = typeof it;
