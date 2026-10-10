"use client";

import { useRef } from "react";
import type { AiContent } from "./content";
import { HowCall, HowPortfolio, HowProduct, HowSprint } from "./illustrations";
import { useSectionReveal } from "./motion";
import { SectionHead } from "./SectionHead";

const visuals = [HowCall, HowProduct, HowSprint, HowPortfolio];

// "Come funziona": sezione grigia chiara con 4 card (riferimento: "What you will do during the intensive").
export function HowSection({ how }: { how: AiContent["how"] }) {
  const root = useRef<HTMLElement>(null);
  useSectionReveal(root);

  return (
    <section
      ref={root}
      data-reveal-scope=""
      id="come-funziona"
      aria-labelledby="come-title"
      className="relative z-10 -mt-12 rounded-t-[32px] bg-grey-bg px-4 pb-24 pt-20 md:rounded-t-[40px] md:px-8 md:pb-32 md:pt-32"
    >
      <div className="ai-grid ai-grid-light" />
      <SectionHead id="come-title" eyebrow={how.eyebrow} title={how.title} />
      <ol className="relative mx-auto mt-14 grid max-w-[1200px] gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {how.steps.map((step, i) => {
          const Visual = visuals[i % visuals.length];
          return (
            <li
              key={step.title}
              data-reveal="item"
              className="flex flex-col rounded-[20px] bg-white p-3 shadow-[0_20px_50px_-30px_rgba(20,30,90,0.35)]"
            >
              <div className="h-[220px]">
                <Visual />
              </div>
              <div className="px-3 pb-4 pt-5 text-center">
                <p className="font-code text-[11px] text-blue-300">{String(i + 1).padStart(2, "0")}</p>
                <h3 className="mt-1.5 text-[16px] font-medium text-ink">{step.title}</h3>
                <p className="mt-2 text-[14px] leading-[1.45] text-[#5b6478]">{step.text}</p>
              </div>
            </li>
          );
        })}
      </ol>
    </section>
  );
}
