"use client";

import {
  Cpu,
  Database,
  FlaskConical,
  Layers,
  MessageSquareText,
  Rocket,
  ShieldCheck,
  Sparkle,
  Sparkles,
  Workflow,
} from "lucide-react";
import { useLayoutEffect, useRef } from "react";
import { Chip, Cursor } from "./Chip";
import { Connector } from "./Connector";

/*
 * Composizione dell'hero: card centrale, tile sopra la card, card "fantasma" sotto, chip collegati da linee.
 * Coordinate in px di uno stage 1200×460 (ricavate dai frame di riferimento), poi scalato per stare nella larghezza.
 * Su mobile lo stage è ritagliato al centro (780px) e i chip più lontani sono nascosti.
 */

// desktopScale: a 1440px lo stage dei frame occupa circa l'86% delle sue misure native.
export const STAGE = { w: 1200, h: 460, mobileCrop: 780, desktopScale: 0.86 };

// Linee: ordine = ordine di disegno (dalla più vicina alla card alla più lontana).
const lines: { id: string; points: [number, number][] }[] = [
  { id: "top", points: [[600, 54], [600, 72]] },
  { id: "l1", points: [[433, 203], [265, 203], [265, 176]] },
  { id: "r1", points: [[768, 203], [841, 203], [841, 106], [906, 106]] },
  { id: "l4", points: [[433, 220], [358, 220], [358, 317], [296, 317]] },
  { id: "r3", points: [[768, 220], [934, 220], [934, 243]] },
  { id: "l2", points: [[265, 128], [265, 106], [98, 106], [98, 160]] },
  { id: "r2", points: [[966, 90], [1101, 90], [1101, 160]] },
  { id: "l3", points: [[98, 256], [98, 335], [236, 335]] },
  { id: "r4", points: [[934, 291], [934, 317], [1300, 317]] },
  { id: "r5", points: [[1101, 256], [1101, 317]] },
  { id: "l-ext", points: [[98, 106], [-100, 106]] },
  { id: "r-ext", points: [[1101, 90], [1300, 90]] },
];

const pipelineIcons = [Database, MessageSquareText, Cpu, FlaskConical, Rocket];

export function HeroIllustration() {
  const wrap = useRef<HTMLDivElement>(null);

  // Scala lo stage sulla larghezza disponibile (su mobile conta solo la parte centrale).
  useLayoutEffect(() => {
    const el = wrap.current;
    if (!el) return;
    const fit = () => {
      const w = el.clientWidth;
      const s = w < 768 ? Math.min(1, w / STAGE.mobileCrop) : Math.min(STAGE.desktopScale, w / STAGE.w);
      el.style.setProperty("--s", String(s));
    };
    fit();
    const ro = new ResizeObserver(fit);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  return (
    <div ref={wrap} className="relative w-full [--s:0.5] md:[--s:0.7] xl:[--s:0.86]" style={{ height: `calc(${STAGE.h}px * var(--s))` }} aria-hidden="true">
      <div
        data-stage=""
        className="absolute left-1/2 top-0 origin-top"
        style={{ width: STAGE.w, height: STAGE.h, transform: "translateX(-50%) scale(var(--s))" }}
      >
        {/* Linee */}
        <svg
          className="absolute inset-0 overflow-visible [mask-image:linear-gradient(90deg,transparent_-8%,#000_10%,#000_90%,transparent_108%)]"
          width={STAGE.w}
          height={STAGE.h}
          viewBox={`0 0 ${STAGE.w} ${STAGE.h}`}
        >
          <g data-lines="">
            {lines.map((l) => (
              <Connector key={l.id} id={`hero-line-${l.id}`} points={l.points} className="stroke-white/65" />
            ))}
          </g>
          {/* Punto di luce che viaggia lungo una linea (MotionPath) */}
          <circle data-spark="" r="3" fill="#fff" className="drop-shadow-[0_0_6px_#a8d5fe]" opacity="0" />
        </svg>

        {/* Card fantasma sotto quella principale */}
        <div data-hero="ghost" className="absolute rounded-[16px] border border-white/40 bg-white/25 backdrop-blur-sm" style={{ left: 433, top: 333, width: 335, height: 97 }}>
          <div className="absolute left-5 top-[18px] grid size-[60px] place-items-center rounded-[10px] bg-white/35">
            <Workflow className="size-6 text-white/80" strokeWidth={1.4} />
          </div>
          <div className="absolute left-[96px] top-8 h-3 w-[104px] rounded-full bg-white/55" />
          <div className="absolute left-[96px] top-[54px] h-3 w-[60px] rounded-full bg-white/45" />
          <div className="absolute right-3 top-3 size-3 rounded-full bg-white/50" />
        </div>
        <div data-hero="ghost" className="absolute rounded-[16px] border border-white/30 bg-white/15 backdrop-blur-sm" style={{ left: 433, top: 446, width: 335, height: 97 }} />

        {/* Card centrale, con bordo iridescente in alto a destra */}
        <div
          data-hero="card"
          className="absolute rounded-[18px] bg-[linear-gradient(118deg,#fff_52%,#15a0f0_70%,#4366fe_84%,#f3a6d8_100%)] p-[2px] shadow-[0_30px_60px_-20px_rgba(20,40,180,0.35)]"
          style={{ left: 433, top: 106, width: 335, height: 211 }}
        >
          <div className="relative size-full rounded-[16px] bg-white p-[8px]">
            <div className="relative size-full overflow-hidden rounded-[11px] bg-[#f3f3fb]">
              {/* Archi concentrici di sfondo */}
              <svg className="absolute inset-x-0 top-0" width="319" height="70" viewBox="0 0 319 70" fill="none">
                {[150, 120, 92, 66].map((r) => (
                  <circle key={r} cx="160" cy={r + 20} r={r} stroke="#dcdcf0" strokeWidth="1" />
                ))}
              </svg>
              {/* Velo bianco: il tile si fonde con la card */}
              <div className="absolute inset-x-0 top-[52px] h-[60px] bg-gradient-to-b from-white/0 via-white/80 to-white/0" />
              <div className="absolute inset-x-[16px] top-[82px] flex items-center justify-between font-code text-[9px] text-ink/80" data-hero="card-label">
                <span>rag-pipeline</span>
                <span className="flex items-center gap-1">
                  <span className="size-1.5 rounded-full bg-[#2fbf71]" />
                  live
                </span>
              </div>
              <div className="absolute inset-x-[16px] top-[100px] h-[4px] rounded-full bg-[#e6e8f3]">
                <div
                  data-hero="bar"
                  className="h-full w-[70%] rounded-full bg-[linear-gradient(90deg,#3b4be0,#6fb7f5_60%,#f1a3c5)]"
                />
              </div>
              <div className="absolute inset-x-[16px] bottom-[14px] flex justify-between">
                {pipelineIcons.map((Icon, i) => (
                  <span
                    key={i}
                    data-hero="icon"
                    className="grid size-[48px] place-items-center rounded-[10px] border border-[#e3e5f0] bg-white/70"
                  >
                    <Icon className="size-[17px] text-blue-600" strokeWidth={1.5} />
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Tile che si appoggia sulla card */}
        <div
          data-hero="tile"
          className="absolute overflow-hidden rounded-[12px] border border-white/40 shadow-[0_20px_40px_-18px_rgba(20,40,180,0.6)]"
          style={{ left: 541, top: 72, width: 120, height: 100 }}
        >
          <div className="absolute inset-0 bg-[linear-gradient(160deg,#9cc8ff_0%,#3c8cf0_40%,#1f63e6_75%,#1350d8_100%)]" />
          <div className="absolute -left-4 bottom-0 h-16 w-10 bg-[#f3a6d8]/50 blur-xl" />
          <div className="absolute inset-0 bg-[radial-gradient(120%_80%_at_20%_0%,rgba(255,255,255,0.45),transparent_60%)]" />
          <Sparkle className="absolute left-1/2 top-[12px] size-[72px] -translate-x-1/2 text-white/60" strokeWidth={1} />
          <div className="absolute inset-x-0 bottom-0 h-8 bg-gradient-to-b from-transparent to-white/40" />
        </div>

        {/* Chip */}
        <Chip variant="round" size={44} style={{ left: 578, top: 10 }}>
          <Sparkle className="size-[18px] fill-blue-600 text-blue-600" strokeWidth={1.5} />
        </Chip>

        <Chip variant="glass" size={146} style={{ left: 349, top: 26 }}>
          <div className="relative h-[44px]">
            {[
              ["left-[12px]", "bg-blue-500"],
              ["left-[67px]", "bg-cyan-accent"],
              ["right-[12px]", "bg-[#f1a3c5]"],
            ].map(([pos, color]) => (
              <span key={pos} className={`absolute top-[8px] size-[11px] rounded-[3px] border border-white/80 ${pos} ${color}`} />
            ))}
            <span className="absolute inset-x-[8px] bottom-[9px] h-[7px] rounded-[3px] bg-[linear-gradient(90deg,#4366fe,#15a0f0_50%,#f1a3c5)]" />
          </div>
        </Chip>

        <Chip variant="ring" size={48} style={{ left: 241, top: 128 }}>
          <Sparkles className="size-[17px]" strokeWidth={1.8} />
        </Chip>

        <Chip variant="frosted" size={96} style={{ left: 50, top: 160 }} className="max-md:hidden" far="left">
          <ShieldCheck className="size-[26px] fill-blue-600/15 text-blue-600" strokeWidth={1.8} />
        </Chip>

        <Chip variant="square" size={60} style={{ left: 236, top: 287 }}>
          <span className="ai-gradient-text font-tight text-[24px] font-semibold tracking-[-0.04em]">{"{ }"}</span>
          <span className="absolute -right-1 -top-1 size-[7px] rounded-full bg-blue-600 ring-2 ring-white" />
        </Chip>

        <Chip variant="square" size={60} style={{ left: 906, top: 68 }}>
          <Database className="size-[26px] text-blue-300" strokeWidth={1.3} />
          <span className="absolute bottom-[12px] h-[5px] w-[14px] rounded-[2px] bg-blue-300" />
        </Chip>

        <Chip variant="ring" size={48} style={{ left: 910, top: 243 }}>
          <Layers className="size-[17px]" strokeWidth={1.8} />
        </Chip>

        <Chip variant="frosted" size={96} style={{ left: 1053, top: 160 }} className="max-md:hidden" far="right">
          <svg width="52" height="52" viewBox="0 0 52 52" fill="none">
            <defs>
              <linearGradient id="hero-gauge" x1="0" y1="1" x2="1" y2="0">
                <stop offset="0" stopColor="#7293fe" />
                <stop offset="0.6" stopColor="#2644e4" />
                <stop offset="1" stopColor="#15a0f0" />
              </linearGradient>
            </defs>
            <path d="M8 44 A36 36 0 0 1 44 8" stroke="#e6e9f5" strokeWidth="10" />
            <path d="M8 44 A36 36 0 0 1 36 10.5" stroke="url(#hero-gauge)" strokeWidth="10" />
          </svg>
        </Chip>

        <Cursor style={{ left: 968, top: 352 }} label="eval.ts" />
      </div>
    </div>
  );
}
