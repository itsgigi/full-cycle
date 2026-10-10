"use client";

import { Sparkle } from "lucide-react";
import { useRef } from "react";
import { WaitlistForm } from "@/components/WaitlistForm";
import type { AiContent } from "./content";
import { useSectionReveal } from "./motion";

// Lista d'attesa: blu elettrico che scende nel navy, form bianco (lo stesso componente della home, con variant="ai").
export function WaitlistSection({ lang, waitlist }: { lang: AiContent["lang"]; waitlist: AiContent["waitlist"] }) {
  const root = useRef<HTMLElement>(null);
  useSectionReveal(root);

  return (
    <section
      ref={root}
      data-reveal-scope=""
      id="lista"
      aria-labelledby="lista-title"
      className="relative z-10 -mt-12 overflow-hidden rounded-t-[32px] bg-[linear-gradient(180deg,#4366fe_0%,#2644e4_35%,#132ba9_70%,#0c1442_100%)] px-4 py-24 md:rounded-t-[40px] md:px-8 md:py-32"
    >
      <div className="ai-grid ai-grid-dark" />
      <div className="pointer-events-none absolute -left-40 top-0 h-[500px] w-[700px] rounded-full bg-[#a2bdff] opacity-40 blur-[120px]" />
      <div className="relative mx-auto grid max-w-[1150px] items-start gap-12 lg:grid-cols-2 lg:gap-16">
        <div className="lg:pt-6">
          <h2 id="lista-title" data-reveal="head" className="font-tight text-[38px] font-semibold leading-[0.98] tracking-[-0.04em] text-balance text-white md:text-[56px]">
            {waitlist.title}
          </h2>
          <p data-reveal="head" className="mt-6 max-w-[480px] text-[16px] leading-[1.6] text-white/80 md:text-[18px]">
            {waitlist.body}
          </p>
          <ul className="mt-8 flex flex-wrap gap-2.5">
            {waitlist.notes.map((note) => (
              <li
                key={note}
                data-pop=""
                className="flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-[14px] text-white backdrop-blur-md"
              >
                <Sparkle className="size-3.5 fill-cyan-soft text-cyan-soft" />
                {note}
              </li>
            ))}
          </ul>
        </div>
        <div data-reveal="item" className="form-card">
          <WaitlistForm
            lang={lang}
            variant="ai"
            askAiExperience
            t={waitlist.form}
            tracks={waitlist.tracks}
            privacyHref={waitlist.privacyHref}
            privacyLabel={waitlist.privacyLabel}
          />
        </div>
      </div>
    </section>
  );
}
