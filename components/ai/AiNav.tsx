"use client";

import { Menu, Ticket } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

export type NavContent = {
  label: string;
  homeHref: string;
  items: { id: string; href: string; label: string }[];
  waitlist: { href: string; label: string };
  locales: { code: string; href: string; active: boolean }[];
  localeLabel: string;
};

// Barra in cima all'hero: logo a sinistra, interruttore a pillola al centro (sezione attiva in bianco), iscrizione a destra.
export function AiNav({ nav }: { nav: NavContent }) {
  const [active, setActive] = useState(nav.items[0]?.id);

  // Evidenzia la sezione visibile.
  useEffect(() => {
    const sections = nav.items.map((i) => document.getElementById(i.id)).filter((el): el is HTMLElement => !!el);
    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActive(visible.target.id);
      },
      { rootMargin: "-40% 0px -50% 0px", threshold: [0, 0.25, 0.5] },
    );
    sections.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, [nav.items]);

  return (
    <header className="relative z-20 flex items-center justify-between px-4 pt-4 md:px-12 md:pt-7">
      <Link
        href={nav.homeHref}
        className="flex size-10 items-center justify-center rounded-[10px] border border-white/10 bg-white/5 font-tight text-[15px] font-semibold tracking-[-0.04em] text-white! backdrop-blur-md"
      >
        f<span className="text-cyan-soft">/</span>
      </Link>

      <nav aria-label={nav.label} className="hidden items-center gap-1 rounded-[10px] border border-white/10 bg-white/[0.07] p-1 backdrop-blur-md md:flex">
        {nav.items.map((item, i) => {
          const isActive = item.id === active;
          return (
            <a
              key={item.id}
              href={item.href}
              aria-current={isActive ? "true" : undefined}
              className={`flex items-center gap-2 rounded-[7px] px-4 py-2 text-[12px] font-medium transition-colors duration-300 ${
                isActive ? "bg-white text-ink!" : "text-white/80! hover:text-white!"
              }`}
            >
              {i === 0 && <Menu className="size-3.5" strokeWidth={2} />}
              {item.label}
            </a>
          );
        })}
      </nav>

      <div className="flex items-center gap-2">
        <div role="group" aria-label={nav.localeLabel} className="flex rounded-[10px] border border-white/10 bg-white/5 p-1 backdrop-blur-md">
          {nav.locales.map((l) => (
            <Link
              key={l.code}
              href={l.href}
              hrefLang={l.code}
              aria-current={l.active ? "true" : undefined}
              className={`rounded-[7px] px-2.5 py-1.5 font-code text-[11px] uppercase ${l.active ? "bg-white/15 text-white!" : "text-white/60! hover:text-white!"}`}
            >
              {l.code}
            </Link>
          ))}
        </div>
        <a
          href={nav.waitlist.href}
          aria-label={nav.waitlist.label}
          className="grid size-10 place-items-center rounded-[10px] bg-white text-ink! shadow-[0_8px_20px_-8px_rgba(0,0,0,0.5)]"
          data-track="CTA Click"
          data-track-location="nav_waitlist"
        >
          <Ticket className="size-4" strokeWidth={1.8} />
        </a>
      </div>
    </header>
  );
}
