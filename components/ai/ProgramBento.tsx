"use client";

import { Sparkle } from "lucide-react";
import { useRef, type ComponentType } from "react";
import type { AiContent } from "./content";
import { BentoEval, BentoProduction, BentoPrompt, BentoRag, BentoStream, BentoTeam, BentoTokens, BentoVectors } from "./illustrations";
import { useSectionReveal } from "./motion";
import { SectionHead } from "./SectionHead";

// Posizione nel bento (desktop, 3 colonne) e illustrazione, nell'ordine dei moduli.
const cells: { className: string; Visual: ComponentType }[] = [
  { className: "lg:col-start-1 lg:row-start-1", Visual: BentoTokens },
  { className: "lg:col-start-2 lg:row-start-1 lg:row-span-2", Visual: BentoPrompt },
  { className: "lg:col-start-3 lg:row-start-1", Visual: BentoVectors },
  { className: "lg:col-start-1 lg:row-start-2 lg:row-span-2", Visual: BentoRag },
  { className: "lg:col-start-3 lg:row-start-2", Visual: BentoStream },
  { className: "lg:col-start-2 lg:row-start-3", Visual: BentoEval },
  { className: "lg:col-start-3 lg:row-start-3", Visual: BentoProduction },
  { className: "md:col-span-2 lg:col-span-3 lg:row-start-4", Visual: BentoTeam },
];

// "Cosa impari costruendo": bento scuro (riferimento: "What is inside the intensive").
export function ProgramBento({ program }: { program: AiContent["program"] }) {
  const root = useRef<HTMLElement>(null);
  useSectionReveal(root, "top 75%");

  return (
    <section
      ref={root}
      data-reveal-scope=""
      id="programma"
      aria-labelledby="programma-title"
      className="relative overflow-hidden bg-[linear-gradient(180deg,#0c1442_0%,#0a1238_45%,#090b1a_100%)] px-4 pb-28 pt-16 md:px-8 md:pb-36 md:pt-24"
    >
      <div className="pointer-events-none absolute left-1/2 top-0 h-[300px] w-[1000px] -translate-x-1/2 rounded-full bg-blue-700 opacity-30 blur-[120px]" />
      <SectionHead id="programma-title" eyebrow={program.eyebrow} title={program.title} tone="dark" size="lg" />

      <ul className="relative mx-auto mt-14 grid max-w-[1200px] gap-3 md:grid-cols-2 lg:grid-cols-3">
        {program.modules.map((m, i) => {
          const cell = cells[i] ?? { className: "", Visual: () => null };
          const { Visual } = cell;
          return (
            <li
              key={m.path}
              data-reveal="item"
              className={`relative flex flex-col rounded-[24px] bg-white p-6 md:p-7 ${m.highlight ? "mb-4" : ""} ${cell.className}`}
            >
              <p className="font-code text-[11px] text-blue-300">{m.path}</p>
              <h3 className="mt-2 max-w-[340px] font-tight text-[22px] font-semibold leading-[1.1] tracking-[-0.02em] text-ink">{m.title}</h3>
              <p className="mt-3 max-w-[380px] text-[14px] leading-[1.45] text-[#5b6478]">{m.text}</p>
              <div className="mt-auto">
                <Visual />
              </div>
              {m.highlight && (
                <span
                  data-pop=""
                  className="absolute -bottom-4 left-1/2 flex -translate-x-1/2 items-center gap-1.5 rounded-full border border-[#dfe6fb] bg-white px-4 py-1.5 font-code text-[12px] text-blue-600 shadow-[0_10px_20px_-10px_rgba(20,40,180,0.6)]"
                >
                  <Sparkle className="size-3 fill-blue-600" />
                  {m.path}
                </span>
              )}
            </li>
          );
        })}
      </ul>
    </section>
  );
}
