"use client";

import { useRef } from "react";
import type { AiContent } from "./content";
import { ProblemCompanies, ProblemDemo, ProblemDiagram, ProblemRepo } from "./illustrations";
import { gsap, MOTION, useGSAP, useSectionReveal } from "./motion";
import { SectionHead } from "./SectionHead";

const visuals = [ProblemCompanies, ProblemDemo, ProblemRepo];

// "Il problema": dal grigio chiaro la sezione "si tuffa" nel blu elettrico e poi nel navy
// (riferimento: "Artificial intelligence won't do this for you").
export function ProblemSection({ problem }: { problem: AiContent["problem"] }) {
  const root = useRef<HTMLElement>(null);
  const diagram = useRef<HTMLDivElement>(null);
  useSectionReveal(root);
  useSectionReveal(diagram, "top 80%");

  // Il gradiente scorre con lo scroll: la pagina sembra scendere dal chiaro al blu profondo.
  useGSAP(
    () => {
      gsap.matchMedia().add(MOTION, () => {
        gsap.fromTo(
          root.current,
          { backgroundPosition: "50% 0%" },
          { backgroundPosition: "50% 100%", ease: "none", scrollTrigger: { trigger: root.current, start: "top bottom", end: "bottom bottom", scrub: true } },
        );
      });
    },
    { scope: root },
  );

  return (
    <section
      ref={root}
      data-reveal-scope=""
      aria-labelledby="problema-title"
      className="relative overflow-hidden bg-[linear-gradient(180deg,#e9ecf1_0%,#e9ecf1_16%,#dfe6ff_28%,#a2bdff_40%,#4366fe_52%,#2644e4_62%,#132ba9_74%,#0c1442_88%,#0c1442_100%)] bg-[length:100%_125%] bg-[position:50%_50%] px-4 pb-24 pt-10 md:px-8 md:pb-32"
    >
      <div className="pointer-events-none absolute bottom-[8%] left-1/2 h-[520px] w-[900px] -translate-x-1/2 rounded-full bg-[#3b5bff] opacity-50 blur-[120px]" />
      <div className="ai-grid ai-grid-dark [mask-image:radial-gradient(ellipse_60%_40%_at_50%_80%,#000_30%,transparent_100%)]" />
      <SectionHead id="problema-title" eyebrow={problem.eyebrow} title={problem.title} size="lg" />

      <ul className="relative mx-auto mt-14 grid max-w-[1200px] gap-3 md:grid-cols-3">
        {problem.items.map((item, i) => {
          const Visual = visuals[i % visuals.length];
          return (
            <li
              key={item.title}
              data-reveal="item"
              className="flex flex-col rounded-[24px] bg-white p-6 shadow-[0_30px_60px_-30px_rgba(12,20,66,0.5)] md:p-8"
            >
              <div className="h-[240px]">
                <Visual />
              </div>
              <div className="mt-6 text-center">
                <h3 className="text-[18px] font-medium leading-[1.3] text-ink md:text-[20px]">{item.title}</h3>
                <p className="mt-2 text-[14px] leading-[1.5] text-[#5b6478]">{item.text}</p>
              </div>
            </li>
          );
        })}
      </ul>

      <div ref={diagram} data-reveal-scope="" className="relative mt-20 md:mt-24">
        <ProblemDiagram />
        <p data-reveal="head" className="mx-auto mt-10 max-w-[480px] text-center text-[15px] leading-[1.5] text-white/45">
          {problem.note}
        </p>
      </div>
    </section>
  );
}
