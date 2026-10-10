"use client";

import { Check, FolderGit2 } from "lucide-react";
import { useRef } from "react";
import { Connector } from "./Connector";
import type { AiContent } from "./content";
import { useSectionReveal } from "./motion";
import { Pill } from "./Chip";

const ROW = 56;

// "Il risultato": il repository come un albero di file, ogni voce della checklist è un chip collegato al tronco.
export function ResultSection({ result }: { result: AiContent["result"] }) {
  const root = useRef<HTMLElement>(null);
  useSectionReveal(root);
  const n = result.checklist.length;

  return (
    <section
      ref={root}
      data-reveal-scope=""
      aria-labelledby="risultato-title"
      className="relative overflow-hidden bg-[linear-gradient(180deg,#e9ecf1_0%,#dfe8ff_55%,#c7deff_100%)] px-4 py-24 md:px-8 md:py-32"
    >
      <div className="ai-grid ai-grid-light" />
      <div className="relative mx-auto grid max-w-[1200px] items-center gap-14 lg:grid-cols-2">
        <div>
          <Pill>{result.eyebrow}</Pill>
          <h2
            id="risultato-title"
            data-reveal="head"
            className="mt-6 font-tight text-[34px] font-semibold leading-[0.98] tracking-[-0.04em] text-balance text-ink md:text-[48px]"
          >
            {result.title}
          </h2>
          <p data-reveal="head" className="mt-6 max-w-[520px] text-[16px] leading-[1.6] text-[#5b6478] md:text-[17px]">
            {result.body}
          </p>
        </div>

        <div data-reveal="item" className="relative mx-auto w-full max-w-[460px]">
          <div className="flex items-center gap-4 rounded-[20px] bg-[linear-gradient(118deg,#fff_55%,#15a0f0_75%,#4366fe_88%,#f3a6d8_100%)] p-[2px] shadow-[0_30px_60px_-25px_rgba(20,40,180,0.45)]">
            <div className="flex w-full items-center gap-4 rounded-[18px] bg-white p-4">
              <span className="grid size-12 place-items-center rounded-[12px] bg-gradient-to-br from-blue-500 to-cyan-accent text-white">
                <FolderGit2 className="size-6" strokeWidth={1.5} />
              </span>
              <span>
                <span className="block font-code text-[14px] text-ink">{result.repoLabel}</span>
                <span className="block text-[12px] text-[#7a8399]">{result.repoSublabel}</span>
              </span>
            </div>
          </div>
          <ul className="relative ml-6">
            {result.checklist.map((item, i) => (
              <li key={item} className="relative flex items-center pl-10" style={{ height: ROW }}>
                <svg className="absolute left-0 top-0 overflow-visible" width="40" height={ROW} aria-hidden="true">
                  <Connector points={[[1, 0], [1, ROW / 2], [36, ROW / 2]]} radius={12} className="stroke-blue-300/70" />
                  {i < n - 1 && <Connector points={[[1, ROW / 2], [1, ROW]]} radius={0} className="stroke-blue-300/70" />}
                </svg>
                <span
                  data-pop=""
                  className="flex items-center gap-2.5 rounded-[12px] border border-white/80 bg-white px-3.5 py-2 text-[14px] text-ink shadow-[0_10px_24px_-14px_rgba(20,40,180,0.5)]"
                >
                  <span className="grid size-5 place-items-center rounded-full bg-[#2fbf71]/15 text-[#2fbf71]">
                    <Check className="size-3" strokeWidth={3} />
                  </span>
                  {item}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
