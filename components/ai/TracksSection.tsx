"use client";

import { Check } from "lucide-react";
import { useRef, type ComponentType } from "react";
import { ChooseTrackLink } from "@/components/ChooseTrackLink";
import { Connector } from "./Connector";
import type { AiContent } from "./content";
import { TrackApp, TrackRag, TrackVision } from "./illustrations";
import { useSectionReveal } from "./motion";
import { SectionHead } from "./SectionHead";

const visuals: Record<string, ComponentType> = {
  "rag-assistant": TrackRag,
  "ai-in-app": TrackApp,
  "vision-multimodal": TrackVision,
};

// Ciclo del prodotto AI come una pista con i nodi: si disegna da sinistra a destra.
function LifecycleTrack({ t }: { t: AiContent["tracks"] }) {
  const n = t.lifecycle.length;
  return (
    <div data-reveal="head" className="relative mx-auto mt-12 max-w-[1200px] rounded-[24px] border border-white bg-white/60 p-5 backdrop-blur md:p-7">
      <p className="font-code text-[12px] text-[#7a8399]">{t.lifecycleLabel}</p>
      <ol aria-label={t.lifecycleAria} className="relative mt-6 grid grid-cols-4 gap-y-6 md:grid-cols-8">
        <svg className="pointer-events-none absolute inset-x-0 top-[31px] hidden h-2 w-full overflow-visible md:block" viewBox="0 0 800 8" preserveAspectRatio="none">
          <Connector points={[[800 / n / 2, 4], [800 - 800 / n / 2, 4]]} className="stroke-blue-200" />
        </svg>
        {t.lifecycle.map((step, i) => (
          <li key={step} className="relative flex flex-col items-center gap-2 text-center">
            <span className="font-code text-[10px] text-[#9aa1b3]">{String(i + 1).padStart(2, "0")}</span>
            <span
              data-pop=""
              className={`relative z-10 grid size-4 place-items-center rounded-full border-2 ${i === n - 1 ? "border-blue-600 bg-blue-600 ring-4 ring-blue-200" : "border-blue-500 bg-white"}`}
            />
            <span className={`font-code text-[12px] ${i === n - 1 ? "text-blue-600" : "text-ink"}`}>{step}</span>
          </li>
        ))}
      </ol>
    </div>
  );
}

// "Pacchetti": tre card prodotto con prezzo e CTA, nello stesso linguaggio delle card chiare.
export function TracksSection({ tracks }: { tracks: AiContent["tracks"] }) {
  const root = useRef<HTMLElement>(null);
  useSectionReveal(root);

  return (
    <section
      ref={root}
      data-reveal-scope=""
      id="pacchetti"
      aria-labelledby="pacchetti-title"
      className="relative z-10 -mt-12 rounded-t-[32px] bg-grey-bg px-4 pb-24 pt-20 md:rounded-t-[40px] md:px-8 md:pb-32 md:pt-28"
    >
      <div className="ai-grid ai-grid-light" />
      <SectionHead id="pacchetti-title" eyebrow={tracks.eyebrow} title={tracks.title} body={tracks.body} />
      <LifecycleTrack t={tracks} />

      <p data-reveal="head" className="relative mx-auto mt-10 max-w-[1200px] text-center text-[15px] font-medium text-ink">
        {tracks.specializationLabel}
      </p>

      <div className="relative mx-auto mt-6 grid max-w-[1200px] gap-3 lg:grid-cols-3">
        {tracks.items.map((tr) => {
          const Visual = visuals[tr.id];
          return (
            <article
              key={tr.id}
              id={tr.id}
              data-reveal="item"
              aria-labelledby={`${tr.id}-title`}
              className="flex flex-col rounded-[24px] bg-white p-3 shadow-[0_20px_50px_-30px_rgba(20,30,90,0.35)]"
            >
              {Visual && <Visual />}
              <div className="flex flex-1 flex-col px-3 pb-3 pt-6 md:px-4">
                <p className="font-code text-[11px] text-blue-300">{tr.path}</p>
                <h3 id={`${tr.id}-title`} className="mt-2 font-tight text-[24px] font-semibold leading-[1.05] tracking-[-0.03em] text-ink">
                  {tr.name}
                </h3>
                <p className="mt-2 text-[15px] leading-[1.45] text-[#5b6478]">{tr.tagline}</p>
                <p className="mt-4 flex flex-wrap items-center gap-1.5">
                  <span className="mr-1 font-code text-[11px] text-[#9aa1b3]">{tracks.focusLabel}</span>
                  {tr.focus.map((f) => (
                    <span key={f} className="rounded-full bg-ice-50 px-2.5 py-1 font-code text-[11px] text-blue-600">
                      {f}
                    </span>
                  ))}
                </p>
                <ul className="mt-5 space-y-2.5">
                  {tr.topics.map((topic) => (
                    <li key={topic} className="flex gap-2.5 text-[14px] leading-[1.4] text-ink/85">
                      <Check className="mt-0.5 size-4 shrink-0 text-blue-600" strokeWidth={2.2} />
                      {topic}
                    </li>
                  ))}
                </ul>
                <div className="mt-5 rounded-[14px] bg-[#f4f6fa] p-4">
                  <p className="font-code text-[11px] text-[#7a8399]">{tracks.projectLabel}</p>
                  <p className="mt-1.5 text-[14px] leading-[1.45] text-ink">{tr.project}</p>
                </div>
                <div className="mt-auto pt-6">
                  {tracks.freeLabel ? (
                    <p className="flex items-baseline gap-3">
                      <del className="text-[15px] text-[#9aa1b3]">
                        <span className="sr-only">{tracks.fullPrice}</span>
                        {tracks.priceLabel}
                      </del>
                      <strong className="font-tight text-[20px] font-semibold tracking-[-0.02em] text-blue-600">{tracks.freeLabel}</strong>
                    </p>
                  ) : (
                    <p className="font-tight text-[20px] font-semibold text-ink">{tracks.priceLabel}</p>
                  )}
                  <ChooseTrackLink
                    trackId={tr.id}
                    className="mt-4 flex w-full items-center justify-center rounded-full bg-navy-900 px-5 py-3.5 text-[15px] font-medium text-white! transition-colors hover:bg-blue-600"
                  >
                    {tr.choose}
                  </ChooseTrackLink>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
