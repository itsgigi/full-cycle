import type { Dictionary } from "./it";

const hoursPerWeek = "3-5";

export const en: Dictionary = {
  meta: {
    title: "Full Cycle — 1:1 mentorship for junior developers",
    description:
      "1:1 mentorship for junior developers in three tracks: Web Vitals + SEO, Design & Interaction (Figma, Three.js), Admin Dashboard (auth, WebSocket, charts). Real projects from frontend to deploy, with code review. Free for the first 3 selected students.",
    keywords: [
      "junior developer course",
      "programming mentorship",
      "full stack course",
      "1:1 developer mentorship",
      "become a developer",
      "GitHub portfolio",
      "DevOps course",
      "CI/CD",
      "production deploy",
      "code review",
      "first developer job",
      "technical SEO course",
      "Next.js course",
      "Figma course",
      "Three.js course",
      "admin dashboard course",
      "WebSocket",
    ],
    tracksListName: "Program tracks",
  },

  chrome: {
    skipLink: "Skip to content",
    mainNav: "Main navigation",
    nav: {
      how: "How it works",
      program: "Program",
      tracks: "Tracks",
      faq: "FAQ",
      waitlist: "Sign up",
    },
    langSwitch: "Language",
    footerTagline: "1:1 mentorship for junior developers: from idea to production, on real projects.",
    footerContacts: "Contact",
    footerLinks: "Links",
    footerNav: "Footer links",
    privacy: "Privacy policy",
  },

  lifecycle: ["idea", "design", "frontend", "backend", "database", "test", "CI/CD", "deploy", "monitoring"],
  lifecycleAria: "Software lifecycle phases",

  hero: {
    eyebrow: "1:1 mentorship for junior developers",
    title: "Writing code is no longer enough.",
    subtitle: "Learn to bring software to life, from idea to production.",
    stackAria: "Technologies used in the program",
    ctaPrimary: "I want to learn",
    ctaSecondary: "Choose a track",
    promo: (n: number) => `Launch offer: free for the first ${n} selected students`,
  },

  problem: {
    eyebrow: "The problem",
    title: "The “junior” role has changed. The paths to get there haven't.",
    items: [
      {
        title: "End-to-end autonomy is expected",
        text: "Even beginners are expected to understand how an app reaches production, not just close tickets on one piece of it.",
      },
      {
        title: "AI writes code, teams need people who understand the system",
        text: "Generating a function is easy. Knowing where it goes, how to test it and how to ship it is what makes the difference.",
      },
      {
        title: "Tutorial projects don't convince anyone",
        text: "Companies look at GitHub. A cloned todo list says nothing about how you work on a real project.",
      },
    ],
  },

  how: {
    eyebrow: "How it works",
    title: "A path built around you, not a pre-recorded course.",
    steps: [
      {
        title: "Intro call",
        text: "We start from where you are: skills, goals, the kind of company you want to work for.",
      },
      {
        title: "Tailored plan",
        text: "Together we pick the projects and the stack, based on your gaps and the market you're aiming for.",
      },
      {
        title: "Build, with review",
        text: "1:1 sessions, code review on your pull requests and feedback like on a real team.",
      },
      {
        title: "Portfolio and interviews",
        text: "We polish your repositories, work on how to present them and you practice technical questions.",
      },
    ],
  },

  program: {
    eyebrow: "In every track",
    title: "Every phase of the lifecycle, inside a real project.",
    modules: [
      {
        path: "/frontend",
        title: "Solid interfaces",
        text: "Components, state, accessibility and performance with [FRONTEND STACK].",
        highlight: false,
      },
      {
        path: "/backend",
        title: "APIs and logic",
        text: "Designing APIs, authentication, error handling and external integrations.",
        highlight: false,
      },
      {
        path: "/database",
        title: "Data that holds up",
        text: "Modeling, migrations and queries, with a relational database.",
        highlight: false,
      },
      {
        path: "/test",
        title: "Verifiable quality",
        text: "Unit, integration and end-to-end tests that run on every change.",
        highlight: false,
      },
      {
        path: "/ci-cd",
        title: "Automated pipelines",
        text: "Automated build, lint and tests, with releases that need no manual steps.",
        highlight: false,
      },
      {
        path: "/deploy",
        title: "Online, for real",
        text: "Containers, environments and cloud: your project gets a public URL.",
        highlight: false,
      },
      {
        path: "/monitoring",
        title: "After release",
        text: "Logs, metrics and error handling in production.",
        highlight: false,
      },
      {
        path: "/ai-workflow",
        title: "AI as a teammate",
        text: "Using AI assistants to move fast without losing control of the code.",
        highlight: true,
      },
    ],
  },

  tracks: {
    eyebrow: "Tracks",
    title: "Pick your specialization. The full cycle is always included.",
    body: "Every track starts from the same foundation: the entire software lifecycle. What changes is the project you build and the phases we go deeper on.",
    lifecycleLabel: "$ shared foundation for every track",
    specializationLabel: "specialization:",
    focusLabel: "focus",
    projectLabel: "potential final project",
    fullPrice: "Full price: ",
    freeFor: (n: number) => `Free for the first ${n}`,
    choose: (name: string) => `Choose ${name}`,
    items: [
      {
        id: "web-vitals-seo",
        path: "/web-vitals",
        name: "Web Vitals + SEO",
        tagline: "Fast websites that rank on Google.",
        topics: [
          "React and Next.js: routing, static and server rendering",
          "Technical SEO: metadata, sitemaps, structured data",
          "Core Web Vitals and performance",
          "Accessibility and semantic HTML",
          "Analytics, domain and deploy",
        ],
        project: "A multi-page website with a blog, optimized for SEO and Core Web Vitals, live on your own domain.",
        focus: ["frontend", "deploy", "monitoring"],
      },
      {
        id: "design-interaction",
        path: "/design",
        name: "Design & Interaction",
        tagline: "From a Figma file to an experience that moves.",
        topics: [
          "Figma: design systems, components and prototypes",
          "Handoff: from design to code, pixel by pixel",
          "Animations and micro-interactions",
          "Three.js: 3D scenes, lights, cameras and interaction",
          "Animation and 3D performance",
        ],
        project: "An interactive portfolio designed in Figma, with a 3D scene in Three.js.",
        focus: ["design", "frontend"],
      },
      {
        id: "admin-dashboard",
        path: "/admin",
        name: "Admin Dashboard",
        tagline: "Real back-office apps, with real-time data.",
        topics: [
          "Login, sessions and user roles",
          "APIs, database and permissions",
          "WebSocket for live updates",
          "Charts and tables with filters and sorting",
          "End-to-end tests for critical flows",
        ],
        project: "A dashboard with login, roles, charts and data that updates live over WebSocket.",
        focus: ["backend", "database", "test"],
      },
    ],
  },

  result: {
    eyebrow: "At the end of the program",
    title: "You won’t leave with another certificate. You’ll have something to show.",
    body: "A live product, a stronger GitHub and a project you can explain in an interview. Most importantly, you’ll have gone through the full cycle: from idea to production, through technical decisions, review, testing and deployment.",
    repoLabel: "full-cycle-project",
    repoSublabel: (n: number) => `${n} files in the repo`,
    repoChecklist: [
      "README with architecture and technical decisions",
      "Frontend + backend + database",
      "Automated tests",
      "Green CI pipeline",
      "Live deploy with a public URL",
      "Pull request history with code review",
    ],
  },

  mentor: {
    eyebrow: "Your mentor",
    role: "Software developer",
    bio: "I’m a software developer who has worked across very different environments: from small teams where building a performant product depends on careful decisions, to multinational companies serving millions of users. Those contexts taught me that there is no single way to build software: scale, teams, goals, constraints and priorities all change what good engineering looks like.",
    points: [
      "Experience across very different company sizes and environments",
      "I mentor you 1:1, from the first call to the final deploy",
      "I review your code and help you understand the why behind technical decisions",
    ],
    newTab: " (opens in a new tab)",
  },

  faq: {
    title: "Frequently asked questions",
    items: (o: { freeSpots: number; priceLabel: string }) => [
      {
        q: "Is this program right for me?",
        a: "Yes, if you've finished a bootcamp or university, or you're self-taught; if you're a junior working on only one part of the stack; if you're looking for your first job (or your next one) and your GitHub doesn't represent you; if you want a path guided by a person, not just videos.",
      },
      {
        q: "When is it not a fit?",
        a: "If you've never written a line of code, if you're looking for a certificate to put on your CV, or if you can't set aside a few hours a week for the projects.",
      },
      {
        q: "What level do I need to start?",
        a: "You should know the basics of at least one language and have already built something, even small. We calibrate the rest in the intro call.",
      },
      {
        q: "How much time do I need?",
        a: `${hoursPerWeek} on average, between sessions and project work. The pace adapts to people who are studying or already working.`,
      },
      {
        q: "How do I choose a track?",
        a: "Pick the one closest to the job you want: in the intro call we check together that it's the right one for you.",
      },
      {
        q: `How are the ${o.freeSpots} free students selected?`,
        a: `From the people on the waitlist, after the intro call. The first ${o.freeSpots} selected take their chosen track for free; for everyone else the price is ${o.priceLabel}.`,
      },
      {
        q: "Do I own my projects?",
        a: "Yes, the code is yours and lives on your GitHub.",
      },
      {
        q: "Do you guarantee a job?",
        a: "No. We give you skills, a concrete portfolio and interview preparation: the tools to present yourself far better than before.",
      },
    ],
  },

  waitlist: {
    title: "We're opening the first spots.",
    body: "Full Cycle is a limited 1:1 mentorship program. Apply, tell me where you’re starting from and we’ll have an intro call to see if the program is right for you.",
    bodyFree: (n: number) => `The first ${n} selected participants join for free. The program value is €2,000.`,
  },

  ticket: {
    aria: "Tear the ticket and fill in the form",
    stubCta: "Tear",
    stubSub: "and apply",
    title: "Reserved seat",
    free: (n: number) => `Launch · free for the first ${n}`,
    call: "Free intro call",
  },

  form: {
    successTitle: "You're on the list.",
    successText: "We'll write to you soon to schedule the intro call.",
    name: "Name",
    email: "Email",
    track: "Which track are you interested in?",
    customTrack: { id: "custom", name: "Custom", tagline: "A tailored path: we shape it together on the call." },
    level: "Where are you at?",
    budget: "How much would you invest in a program like this?",
    goal: "What would you like to achieve?",
    optional: "(optional)",
    submit: "Apply",
    pending: "Sending…",
    fineprint: "No spam. We only use your data to contact you about this program.",
    levelOptions: [
      { value: "student", label: "Studying / bootcamp" },
      { value: "first-job", label: "Looking for my first job" },
      { value: "junior", label: "Junior, less than 2 years" },
      { value: "other", label: "Other" },
    ],
    budgetOptions: [
      { value: "lt-300", label: "Less than €300" },
      { value: "300-700", label: "€300 – €700" },
      { value: "700-1500", label: "€700 – €1,500" },
      { value: "gt-1500", label: "More than €1,500" },
    ],
    errors: {
      name: "Enter your name.",
      email: "Enter a valid email.",
      track: "Choose a track.",
      check: "Check the highlighted fields.",
      unavailable: "Sign-ups are temporarily unavailable.",
      generic: "Something went wrong. Please try again shortly.",
    },
  },

  offer: {
    priceLabel: "€2,000",
  },

  privacy: {
    title: "Privacy policy",
    description: (name: string) => `How ${name} handles the data collected through the waitlist.`,
    controller: (who: string, email: string) => `Data controller: ${who}, reachable at ${email}.`,
    dataTitle: "Data collected",
    data: "Through the waitlist form we collect your name, email, experience level, budget range and, if you share it, your goal.",
    purposeTitle: "Purpose",
    purpose: (name: string) =>
      `We use this data only to contact you about the ${name} program and schedule an intro call. We don't share it with third parties for marketing purposes.`,
    retentionTitle: "Retention",
    retention: "[State how long you keep the data and which services store it.]",
    rightsTitle: "Your rights",
    rights: (email: string) =>
      `You can request access to, correction or deletion of your data at any time by writing to ${email}.`,
  },

  notFound: {
    title: "Page not found.",
    back: "Back to home",
  },
};
