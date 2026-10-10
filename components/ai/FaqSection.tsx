"use client";

import { Plus } from "lucide-react";
import { useRef } from "react";
import type { AiContent } from "./content";
import { useSectionReveal } from "./motion";
import { SectionHead } from "./SectionHead";

// FAQ su <details> nativi: funzionano anche senza JS.
export function FaqSection({ faq }: { faq: AiContent["faq"] }) {
  const root = useRef<HTMLElement>(null);
  useSectionReveal(root, "top 75%");

  return (
    <section
      ref={root}
      data-reveal-scope=""
      id="faq"
      aria-labelledby="faq-title"
      className="ai-faq relative z-10 -mt-12 rounded-t-[32px] bg-grey-bg px-4 pb-28 pt-20 md:rounded-t-[40px] md:px-8 md:pt-28"
    >
      <div className="ai-grid ai-grid-light" />
      <SectionHead id="faq-title" title={faq.title} />
      <div className="relative mx-auto mt-12 max-w-[820px] space-y-2.5">
        {faq.items.map((item) => (
          <details key={item.q} data-reveal="item" className="group rounded-[20px] bg-white shadow-[0_14px_40px_-30px_rgba(20,30,90,0.4)]">
            <summary className="flex items-center justify-between gap-6 px-5 py-5 text-[16px] font-medium text-ink md:px-7 md:text-[17px]">
              {item.q}
              <span className="grid size-8 shrink-0 place-items-center rounded-full border border-[#e3e6ef] text-blue-600 group-open:bg-blue-600 group-open:text-white">
                <Plus data-faq-icon="" className="size-4" strokeWidth={2} />
              </span>
            </summary>
            <p className="px-5 pb-6 text-[15px] leading-[1.6] text-[#5b6478] md:px-7">{item.a}</p>
          </details>
        ))}
      </div>
    </section>
  );
}
