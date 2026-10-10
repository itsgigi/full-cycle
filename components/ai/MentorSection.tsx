"use client";

import { ArrowUpRight, Check } from "lucide-react";
import Image from "next/image";
import { useRef } from "react";
import { Pill } from "./Chip";
import type { AiContent } from "./content";
import { useSectionReveal } from "./motion";

// "Il mentor": sezione navy, foto in una cornice di vetro.
export function MentorSection({ mentor }: { mentor: AiContent["mentor"] }) {
  const root = useRef<HTMLElement>(null);
  useSectionReveal(root);

  return (
    <section
      ref={root}
      data-reveal-scope=""
      id="mentor"
      aria-labelledby="mentor-title"
      className="relative overflow-hidden bg-[linear-gradient(180deg,#0c1442_0%,#0b1b68_100%)] px-4 py-24 md:px-8 md:py-32"
    >
      <div className="ai-grid ai-grid-dark" />
      <div className="pointer-events-none absolute -right-40 top-1/3 h-[500px] w-[600px] rounded-full bg-blue-600 opacity-35 blur-[120px]" />
      <div className="relative mx-auto grid max-w-[1100px] items-center gap-12 md:grid-cols-[minmax(0,420px)_1fr] md:gap-16">
        <div data-reveal="item" className="rounded-[30px] border border-white/15 bg-white/5 p-2.5 backdrop-blur-md">
          <div className="relative aspect-[4/5] overflow-hidden rounded-[22px] bg-navy-800">
            <Image src={mentor.image} alt={`${mentor.name}, ${mentor.role}`} fill sizes="(max-width: 768px) 100vw, 420px" className="object-cover" />
            <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-blue-700/50 to-transparent" />
          </div>
        </div>
        <div>
          <Pill tone="dark">{mentor.eyebrow}</Pill>
          <h2 id="mentor-title" data-reveal="head" className="mt-6 font-tight text-[38px] font-semibold leading-[0.98] tracking-[-0.04em] text-white md:text-[56px]">
            {mentor.name}
          </h2>
          <p data-reveal="head" className="mt-3 font-code text-[13px] text-cyan-soft">
            {mentor.role}
          </p>
          <p data-reveal="head" className="mt-6 text-[16px] leading-[1.65] text-white/75 md:text-[17px]">
            {mentor.bio}
          </p>
          <ul data-reveal="head" className="mt-7 space-y-3">
            {mentor.points.map((p) => (
              <li key={p} className="flex gap-3 text-[15px] text-white/90">
                <span className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full bg-gradient-to-br from-cyan-accent to-blue-600">
                  <Check className="size-3 text-white" strokeWidth={3} />
                </span>
                {p}
              </li>
            ))}
          </ul>
          <div data-reveal="head" className="mt-8 flex flex-wrap gap-2.5">
            {mentor.links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-white/10 px-4 py-2.5 text-[14px] text-white! backdrop-blur-md transition-colors hover:bg-white/15"
                data-track="Mentor Link Click"
                data-track-label={l.label}
              >
                {l.label}
                <ArrowUpRight className="size-4" aria-hidden="true" />
                <span className="sr-only">{mentor.newTab}</span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
