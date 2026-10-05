import Image from "next/image";
import { Fragment } from "react";
import { notFound } from "next/navigation";
import {
  SiDocker,
  SiFigma,
  SiGit,
  SiGithubactions,
  SiNextdotjs,
  SiNodedotjs,
  SiPostgresql,
  SiReact,
  SiThreedotjs,
  SiTypescript,
  SiVercel,
} from "react-icons/si";
import BorderGlow from "@/components/BorderGlow";
import { ChooseTrackLink } from "@/components/ChooseTrackLink";
import { FaqList } from "@/components/FaqList";
import { JsonLd } from "@/components/JsonLd";
import LogoLoop from "@/components/LogoLoop";
import { RepoFolder } from "@/components/RepoFolder";
import DitherVeil from "@/components/DitherVeil";
import { Eyebrow } from "@/components/Eyebrow";
import { Flow } from "@/components/Flow";
import { SiteFooter, SiteHeader } from "@/components/SiteChrome";
import { LiveChart } from "@/components/LiveChart";
import TrueFocus from "@/components/TrueFocus";
import TechText from "@/components/TechText";
import { WaitlistForm } from "@/components/WaitlistForm";
import { WaitlistTicket } from "@/components/WaitlistTicket";
import { hasLocale, localePath, type Locale } from "@/lib/i18n/config";
import { getDictionary, type Dictionary } from "@/lib/i18n/dictionaries";
import { siteConfig } from "@/lib/site";

const stackLogos = [
  { node: <SiReact />, title: "React" },
  { node: <SiNextdotjs />, title: "Next.js" },
  { node: <SiTypescript />, title: "TypeScript" },
  { node: <SiNodedotjs />, title: "Node.js" },
  { node: <SiPostgresql />, title: "PostgreSQL" },
  { node: <SiDocker />, title: "Docker" },
  { node: <SiGithubactions />, title: "GitHub Actions" },
  { node: <SiVercel />, title: "Vercel" },
  { node: <SiGit />, title: "Git" },
  { node: <SiFigma />, title: "Figma" },
  { node: <SiThreedotjs />, title: "Three.js" },
];

function structuredData(lang: Locale, t: Dictionary) {
  const { url: origin, name, mentor, offer } = siteConfig;
  const url = `${origin}${localePath(lang)}`;
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

function CheckIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#1A7F37" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M20 6 9 17l-5-5" />
    </svg>
  );
}

function Lifecycle({ label, steps, ariaLabel, className = "" }: { label: string; steps: string[]; ariaLabel: string; className?: string }) {
  return (
    <div className={`lifecycle ${className}`.trim()}>
      <div className="lifecycle-bar">
        <p className="lifecycle-label">{label}</p>
      </div>
      <ol className="lifecycle-steps" aria-label={ariaLabel}>
        {steps.map((s, i) => (
          <li key={s} className="lifecycle-step">
            <span className="lifecycle-index" aria-hidden="true">{String(i + 1).padStart(2, "0")}</span>
            <span className="lifecycle-node" aria-hidden="true" />
            <span className="lifecycle-name">{s}</span>
          </li>
        ))}
      </ol>
    </div>
  );
}

export default async function Home({ params }: PageProps<"/[lang]">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();

  const t = getDictionary(lang);
  const { mentor, offer } = siteConfig;
  const { priceLabel } = t.offer;
  const faqs = t.faq.items({ freeSpots: offer.freeSpots, priceLabel });

  return (
    <>
      <JsonLd data={structuredData(lang, t)} />
      <a href="#main" className="skip-link">{t.chrome.skipLink}</a>
      <SiteHeader lang={lang} />

      <main id="main">
        {/* HERO */}
        <section id="top" className="hero" aria-labelledby="hero-title" style={{ marginTop: "3rem", marginBottom: "6rem" }}>
          <div className="container hero-inner">
            <Eyebrow variant="glass">{t.hero.eyebrow}</Eyebrow>
            <h1 id="hero-title" className="display-xl">{t.hero.title}</h1>
            <p className="hero-subtitle">{t.hero.subtitle}</p>
            <div className="hero-stack">
              <LogoLoop
                logos={stackLogos}
                speed={60}
                logoHeight={44}
                gap={64}
                hoverSpeed={15}
                scaleOnHover
                fadeOut
                ariaLabel={t.hero.stackAria}
              />
            </div>
            <div className="cta-row">
              <a href="#lista" className="btn btn-glow btn-lg">
                {t.hero.ctaPrimary}
                <span className="btn-arrow" aria-hidden="true">→</span>
              </a>
              <a href="#pacchetti" className="btn btn-glass btn-lg">{t.hero.ctaSecondary}</a>
            </div>
            {offer.freeSpots > 0 && (
              <p className="promo">
                <span className="promo-dot" aria-hidden="true" />
                {t.hero.promo(offer.freeSpots)}
              </p>
            )}
          </div>
        </section>

        {/* PROBLEMA */}
        <section className="band-dark band-spaced" aria-labelledby="problema-title">
          <div className="container section">
            <div className="section-head">
              <Eyebrow variant="dark">{t.problem.eyebrow}</Eyebrow>
              <h2 id="problema-title" className="display-lg">{t.problem.title}</h2>
            </div>
            <div className="grid-3">
              {t.problem.items.map((p) => (
                <article key={p.title} className="problem">
                  <h3>{p.title}</h3>
                  <p>{p.text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* COME FUNZIONA */}
        <section id="come-funziona" className="container section" aria-labelledby="come-title">
          <div className="section-head">
            <Eyebrow>{t.how.eyebrow}</Eyebrow>
            <h2 id="come-title" className="display-lg">{t.how.title}</h2>
          </div>
          <ol className="steps">
            {t.how.steps.map((s, i) => (
              <li key={s.title} className="step">
                <span className="step-num" aria-hidden="true">{String(i + 1).padStart(2, "0")}</span>
                <h3>{s.title}</h3>
                <p>{s.text}</p>
              </li>
            ))}
          </ol>
        </section>

        {/* PROGRAMMA */}
        <section id="programma" className="band-muted" aria-labelledby="programma-title">
          <div className="container section">
            <div className="section-head">
              <Eyebrow>{t.program.eyebrow}</Eyebrow>
              <h2 id="programma-title" className="display-lg">{t.program.title}</h2>
            </div>
            <div className="modules">
              {t.program.modules.map((m) => (
                <BorderGlow
                  key={m.path}
                  backgroundColor={m.highlight ? "#1f1f1f" : "#ececec"}
                  borderRadius={20}
                  glowColor={m.highlight ? "215 80 80" : "218 72 53"}
                  glowRadius={32}
                  glowIntensity={m.highlight ? 1 : 0.8}
                  colors={["#2f6fde", "#a9c9f5", "#3b7ddf"]}
                >
                  <article className={m.highlight ? "module module-dark" : "module"}>
                    <p className="module-path">{m.path}</p>
                    <h3>{m.title}</h3>
                    <p>{m.text}</p>
                  </article>
                </BorderGlow>
              ))}
            </div>
          </div>
        </section>

        {/* PACCHETTI */}
        <section id="pacchetti" className="container section" aria-labelledby="pacchetti-title">
          <div className="section-head">
            <Eyebrow>{t.tracks.eyebrow}</Eyebrow>
            <h2 id="pacchetti-title" className="display-lg">{t.tracks.title}</h2>
            <p className="body-lg">{t.tracks.body}</p>
          </div>
          <Lifecycle
            label={t.tracks.lifecycleLabel}
            steps={t.lifecycle}
            ariaLabel={t.lifecycleAria}
            className="lifecycle-compact"
          />
          <p className="promo-banner">
            <strong>{t.tracks.specializationLabel}</strong>
          </p>
          <div className="tracks">
            {t.tracks.items.map((tr) => (
              <article key={tr.id} id={tr.id} className="track" aria-labelledby={`${tr.id}-title`}>
                {tr.id === "web-vitals-seo" && (
                  <div className="design-canvas design-canvas-center" aria-hidden="true">
                    <span className="design-canvas-label">&lt;head&gt; · index.html</span>
                    <TrueFocus
                      sentence="Web Vitals SEO"
                      blurAmount={4}
                      borderColor="#a9c9f5"
                      glowColor="rgba(169, 201, 245, 0.6)"
                      animationDuration={0.6}
                      pauseBetweenAnimations={1}
                    />
                  </div>
                )}
                {tr.id === "admin-dashboard" && (
                  <div className="design-canvas" aria-hidden="true">
                    <span className="design-canvas-label">ws · dashboard.tsx</span>
                    <LiveChart />
                  </div>
                )}
                {tr.id === "design-interaction" && (
                  <div className="design-canvas" aria-hidden="true">
                    <span className="design-canvas-label">Frame · design.fig</span>
                    <TechText
                      text="Design"
                      fontWeight={500}
                      fontSize={62}
                      letterSpacing={-0.03}
                      color="#ffffff"
                      accentColor="#a5b4fc"
                      specks={10}
                    />
                  </div>
                )}
                <p className="module-path">{tr.path}</p>
                <h3 id={`${tr.id}-title`} className="track-name">{tr.name}</h3>
                <p className="track-tagline">{tr.tagline}</p>
                <p className="track-focus">
                  <span className="mono">{t.tracks.focusLabel}</span>
                  {tr.focus.map((phase) => (
                    <span key={phase} className="track-focus-chip">{phase}</span>
                  ))}
                </p>
                <ul className="track-topics">
                  {tr.topics.map((topic) => (
                    <li key={topic}>
                      <CheckIcon />
                      {topic}
                    </li>
                  ))}
                </ul>
                <p className="track-project">
                  <span className="mono">{t.tracks.projectLabel}</span>
                  {tr.project}
                </p>
                <div className="track-footer">
                  {offer.freeSpots > 0 ? (
                    <p className="track-price">
                      <del className="track-price-old">
                        <span className="sr-only">{t.tracks.fullPrice}</span>
                        {priceLabel}
                      </del>
                      <strong className="track-free">{t.tracks.freeFor(offer.freeSpots)}</strong>
                    </p>
                  ) : (
                    <p className="track-price">{priceLabel}</p>
                  )}
                  <ChooseTrackLink trackId={tr.id} className="btn btn-dark btn-block">
                    {t.tracks.choose(tr.name)}
                  </ChooseTrackLink>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* RISULTATO */}
        <section className="container section split" aria-labelledby="risultato-title">
          <div>
            <Eyebrow>{t.result.eyebrow}</Eyebrow>
            <h2 id="risultato-title" className="display-lg">
              {t.result.title.split("GitHub").map((part, i) => (
                <Fragment key={i}>
                  {i > 0 && (
                    <Image src="/github-icon.webp" alt="GitHub" width={512} height={512} sizes="64px" className="inline-logo" />
                  )}
                  {part}
                </Fragment>
              ))}
            </h2>
            <p className="body-lg">{t.result.body}</p>
          </div>
          <RepoFolder
            items={t.result.repoChecklist}
            label={t.result.repoLabel}
            sublabel={t.result.repoSublabel(t.result.repoChecklist.length)}
          />
        </section>

        {/* AI */}
        <section className="band-accent band-spaced" aria-labelledby="ai-title">
          <div className="container section">
            <div className="section-head">
              <Eyebrow variant="glass">{t.ai.eyebrow}</Eyebrow>
              <h2 id="ai-title" className="display-lg">{t.ai.title}</h2>
              <p className="body-lg text-accent-light">{t.ai.body}</p>
            </div>
            <div className="grid-3">
              {t.ai.items.map((item) => (
                <article key={item.title} className="card card-dark">
                  <h3>{item.title}</h3>
                  <p className="body-lg text-light">{item.text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* PRIMA / DOPO */}
        <section className="container section" aria-labelledby="before-after-title">
          <div className="section-head">
            <Eyebrow>{t.beforeAfter.eyebrow}</Eyebrow>
            <h2 id="before-after-title" className="display-lg">{t.beforeAfter.title}</h2>
          </div>
          <div className="grid-2 before-after-grid">
            <article className="card card-dark ba-card">
              <h3 className="module-path">{t.beforeAfter.beforeLabel}</h3>
              <Flow steps={t.beforeAfter.beforeSteps} className="flow-dark" />
              <p className="body-lg text-light">{t.beforeAfter.beforeText}</p>
            </article>
            <article className="card card-sky ba-card">
              <h3 className="module-path">{t.beforeAfter.afterLabel}</h3>
              <Flow steps={t.beforeAfter.afterSteps} className="flow-sky" />
              <p className="body-lg text-accent-light">{t.beforeAfter.afterText}</p>
            </article>
          </div>
        </section>

        {/* MENTOR */}
        <section id="mentor" className="band-muted" aria-labelledby="mentor-title">
          <div className="container section split">
            <div className="mentor-photo" role="img" aria-label={`${mentor.name}, ${t.mentor.role}`}>
              {/* Foto normale sotto: resta visibile se WebGL non è disponibile. */}
              <Image src={mentor.image} alt="" fill sizes="(max-width: 900px) 100vw, 420px" />
              <DitherVeil
                src={`/_next/image?url=${encodeURIComponent(mentor.image)}&w=1080&q=75`}
                fit="cover"
                pattern="floyd"
                pixelSize={2}
                inkColor="#2f6fde"
                paperColor="#ececec"
                revealRadius={170}
                softness={0.6}
                linger={1}
                className="mentor-veil"
                wander={true}
              />
            </div>
            <div>
              <Eyebrow>{t.mentor.eyebrow}</Eyebrow>
              <h2 id="mentor-title" className="display-lg">{mentor.name}</h2>
              <p className="mentor-role">{t.mentor.role}</p>
              <p className="body-lg">{t.mentor.bio}</p>
              <ul className="mentor-points">
                {t.mentor.points.map((point) => (
                  <li key={point}>
                    <CheckIcon />
                    {point}
                  </li>
                ))}
              </ul>
              <div className="mentor-links">
                {mentor.links.map((l) => (
                  <a key={l.href} href={l.href} className="btn btn-outline" target="_blank" rel="noopener noreferrer">
                    {l.label}
                    <span aria-hidden="true">↗</span>
                    <span className="sr-only">{t.mentor.newTab}</span>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="faq" className="container-narrow section" aria-labelledby="faq-title">
          <h2 id="faq-title" className="display-lg faq-title">{t.faq.title}</h2>
          <FaqList items={faqs} />
        </section>

        {/* WAITLIST */}
        <section id="lista" className="band-accent" aria-labelledby="lista-title">
          <div className="container section split split-top">
            <div>
              <h2 id="lista-title" className="display-lg">{t.waitlist.title}</h2>
              <p className="body-lg text-accent-light">
                {t.waitlist.body}
                {offer.freeSpots > 0 && t.waitlist.bodyFree(offer.freeSpots)}
              </p>
              <WaitlistTicket
                ariaLabel={t.ticket.aria}
                stubCta={t.ticket.stubCta}
                stubSub={t.ticket.stubSub}
                title={t.ticket.title}
                note={offer.freeSpots > 0 ? t.ticket.free(offer.freeSpots) : t.ticket.call}
              />
            </div>
            <div className="form-card">
              <WaitlistForm
                lang={lang}
                t={t.form}
                tracks={[...t.tracks.items.map(({ id, name, tagline }) => ({ id, name, tagline })), t.form.customTrack]}
                privacyHref={localePath(lang, "/privacy")}
                privacyLabel={t.chrome.privacy}
              />
            </div>
          </div>
        </section>
      </main>

      <SiteFooter lang={lang} />
    </>
  );
}
