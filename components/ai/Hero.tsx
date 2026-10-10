"use client";

import { ArrowRight } from "lucide-react";
import { useRef } from "react";
import { AiNav, type NavContent } from "./AiNav";
import { HeroIllustration } from "./HeroIllustration";
import { gsap, idleFloat, MOTION, popFrom, popTo, ScrollTrigger, spinRings, SplitText, useGSAP } from "./motion";

export type HeroContent = {
  eyebrow: string;
  title: string;
  subtitle: string;
  ctaPrimary: string;
  ctaSecondary: string;
  promo: string | null;
};

const blurIn = { autoAlpha: 0, filter: "blur(10px)", y: 20 };
const sharp = { autoAlpha: 1, filter: "blur(0px)", y: 0, ease: "power3.out" };

export function Hero({ hero, nav }: { hero: HeroContent; nav: NavContent }) {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION, () => {
        const el = root.current!;
        const q = gsap.utils.selector(el);
        const title = q("[data-hero='title']")[0] as HTMLElement;
        const sub = q("[data-hero='sub']")[0] as HTMLElement;
        const stage = q("[data-stage]")[0] as HTMLElement;

        // Righe del titolo e del paragrafo, separate dopo il caricamento del font.
        const titleSplit = SplitText.create(title, { type: "lines" });
        const subSplit = SplitText.create(sub, { type: "lines" });
        gsap.set([title, sub], { autoAlpha: 1 });

        // Chip in ordine di distanza dalla card: prima i vicini, poi i lontani.
        const center = { x: 600, y: 211 };
        const chips = (q("[data-stage] [data-pop]") as HTMLElement[]).sort(
          (a, b) =>
            Math.hypot(a.offsetLeft - center.x, a.offsetTop - center.y) - Math.hypot(b.offsetLeft - center.x, b.offsetTop - center.y),
        );
        const cursor = q("[data-cursor]")[0];

        // Sequenza d'ingresso (dai frame dell'intro, 8 fps): card → tile + titolo → contenuto card → paragrafo → linee → chip.
        const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
        tl.fromTo(q("[data-hero='card']"), { autoAlpha: 0, scale: 0.96, filter: "blur(8px)" }, { autoAlpha: 1, scale: 1, filter: "blur(0px)", duration: 0.6 }, 0)
          .fromTo(q("[data-hero='ghost']"), { autoAlpha: 0, y: 12, filter: "blur(8px)" }, { autoAlpha: 1, y: 0, filter: "blur(0px)", duration: 0.7, stagger: 0.12 }, 0)
          .fromTo(q("[data-hero='badge']"), { autoAlpha: 0, y: 8, filter: "blur(6px)" }, { ...sharp, duration: 0.5 }, 0)
          .fromTo(q("[data-hero='tile']"), { autoAlpha: 0, y: -20, filter: "blur(8px)" }, { autoAlpha: 1, y: 0, filter: "blur(0px)", duration: 0.6 }, 0.15)
          .fromTo(titleSplit.lines, blurIn, { ...sharp, duration: 0.7, stagger: 0.12 }, 0.1)
          .fromTo(q("[data-hero='card-label']"), { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.4 }, 0.45)
          .fromTo(q("[data-hero='bar']"), { autoAlpha: 1, width: "0%" }, { autoAlpha: 1, width: "70%", duration: 0.9, ease: "power2.out" }, 0.45)
          .fromTo(q("[data-hero='icon']"), { autoAlpha: 0, y: 6, filter: "blur(4px)" }, { autoAlpha: 1, y: 0, filter: "blur(0px)", duration: 0.4, stagger: 0.08 }, 0.5)
          .fromTo(subSplit.lines, { ...blurIn, y: 14, filter: "blur(8px)" }, { ...sharp, duration: 0.6, stagger: 0.12 }, 0.65)
          .fromTo(q("[data-hero='cta']"), { autoAlpha: 0, y: 14, filter: "blur(8px)" }, { ...sharp, duration: 0.6, stagger: 0.1 }, 0.9)
          .fromTo(q("[data-lines] path"), { strokeDashoffset: 1 }, { strokeDashoffset: 0, duration: 0.8, ease: "power2.inOut", stagger: 0.07 }, 1.1)
          .fromTo(chips, popFrom, { ...popTo, ease: "back.out(1.7)", stagger: 0.08 }, 1.4)
          .fromTo(cursor, { autoAlpha: 0, x: 24, y: 18 }, { autoAlpha: 1, x: 0, y: 0, duration: 0.7 }, ">-0.3")
          .add(() => {
            // Righe di nuovo in flusso normale: si adattano se la finestra cambia larghezza.
            titleSplit.revert();
            subSplit.revert();
            idle();
          });

        // Movimento a riposo.
        function idle() {
          idleFloat(q("[data-stage] [data-float]"));
          spinRings(q("[data-stage] [data-spin]"));
          gsap.fromTo(q("[data-pulse]"), { scale: 1, autoAlpha: 0.8 }, { scale: 1.55, autoAlpha: 0, duration: 1.8, ease: "sine.out", repeat: -1 });
          gsap.to(cursor, { x: "random(-16, 12)", y: "random(-12, 8)", duration: 2.6, ease: "sine.inOut", repeat: -1, repeatRefresh: true });

          // Un punto di luce percorre ogni tanto una linea.
          const spark = q("[data-spark]")[0];
          const travel = gsap.timeline({ repeat: -1, repeatDelay: 1.2 });
          ["#hero-line-l4", "#hero-line-r3", "#hero-line-r1", "#hero-line-l1"].forEach((path) => {
            travel
              .set(spark, { autoAlpha: 1 })
              .to(spark, { motionPath: { path, align: path, alignOrigin: [0.5, 0.5] }, duration: 1.4, ease: "power1.inOut" })
              .to(spark, { autoAlpha: 0, duration: 0.2 })
              .to({}, { duration: 1.4 });
          });
        }

        // Scroll: il titolo sale più in fretta dell'illustrazione, i chip lontani entrano dai lati.
        const scrub = { trigger: el, start: "top top", end: "bottom top", scrub: true };
        gsap.to(q("[data-hero-text]"), { y: -180, ease: "none", scrollTrigger: scrub });
        gsap.to(stage.parentElement, { y: -50, ease: "none", scrollTrigger: scrub });
        gsap.fromTo(q("[data-far='left']"), { x: -70 }, { x: 0, ease: "none", scrollTrigger: { ...scrub, end: "40% top" } });
        gsap.fromTo(q("[data-far='right']"), { x: 70 }, { x: 0, ease: "none", scrollTrigger: { ...scrub, end: "40% top" } });

        return () => {
          titleSplit.revert();
          subSplit.revert();
        };
      });
      ScrollTrigger.refresh();
    },
    { scope: root },
  );

  return (
    <section ref={root} id="top" className="ai-hero-bg ai-grain relative overflow-hidden pb-6 md:pb-8" aria-labelledby="hero-title">
      <div className="ai-grid ai-grid-dark" />
      {/* Due macchie sfocate: la transizione dal blu al bianco si curva invece di essere una banda dritta. */}
      <div className="pointer-events-none absolute left-[-12%] top-[42%] h-[520px] w-[720px] rounded-full bg-[#3b5bff] opacity-45 blur-[120px]" />
      <div className="pointer-events-none absolute bottom-[-12%] left-[-14%] h-[520px] w-[760px] rounded-full bg-[#c9d4ff] opacity-80 blur-[120px]" />

      <AiNav nav={nav} />

      <div data-hero-text="" className="relative z-10 mx-auto flex max-w-[1040px] flex-col items-center px-5 pt-12 text-center md:pt-12">
        <span
          data-hero="badge"
          className="inline-flex items-center gap-2.5 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-[14px] text-white backdrop-blur-md md:text-[16px]"
        >
          <span className="size-1.5 rounded-full bg-white" />
          {hero.eyebrow}
        </span>
        <h1
          id="hero-title"
          data-hero="title"
          className="mt-7 max-w-[900px] font-tight text-[40px] font-semibold leading-[0.95] tracking-[-0.04em] text-balance text-white md:mt-7 md:text-[60px] xl:text-[68px]"
        >
          {hero.title}
        </h1>
        <p data-hero="sub" className="mt-5 max-w-[560px] text-[17px] leading-[1.35] text-balance text-white/80 md:mt-6 md:text-[19px]">
          {hero.subtitle}
        </p>
        <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
          <a
            data-hero="cta"
            href="#lista"
            className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-[15px] font-medium text-ink! shadow-[0_12px_30px_-10px_rgba(0,0,0,0.5)] transition-transform hover:-translate-y-0.5"
            data-track="CTA Click"
            data-track-location="hero_waitlist"
          >
            {hero.ctaPrimary}
            <ArrowRight className="size-4" />
          </a>
          <a
            data-hero="cta"
            href="#pacchetti"
            className="inline-flex items-center rounded-full border border-white/25 bg-white/10 px-5 py-3 text-[15px] font-medium text-white! backdrop-blur-md transition-colors hover:bg-white/15"
            data-track="CTA Click"
            data-track-location="hero_tracks"
          >
            {hero.ctaSecondary}
          </a>
        </div>
        {hero.promo && (
          <p data-hero="cta" className="mt-4 flex items-center gap-2 text-[13px] text-white/75">
            <span className="size-2 rounded-full bg-[#4ade80] shadow-[0_0_10px_#4ade80]" />
            {hero.promo}
          </p>
        )}
      </div>

      <div className="relative z-10 mt-8 md:mt-10">
        <HeroIllustration />
      </div>
    </section>
  );
}
