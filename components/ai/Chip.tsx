import type { CSSProperties, ReactNode } from "react";

// Primitivo dei chip "che galleggiano sul vetro": posizione assoluta (pop), wrapper che galleggia, contenuto.
// Gli stili seguono i frame di riferimento: bordo bianco/70, ombra morbida, leggero riflesso interno.

type Variant = "square" | "round" | "ring" | "frosted" | "glass";

const base =
  "relative grid place-items-center bg-white border border-white/70 shadow-[0_10px_30px_-10px_rgba(20,40,180,0.45),inset_0_1px_0_rgba(255,255,255,0.9)]";

export function Chip({
  variant = "square",
  size = 60,
  className = "",
  style,
  float = true,
  pop = true,
  far,
  children,
}: {
  variant?: Variant;
  size?: number;
  className?: string;
  style?: CSSProperties;
  float?: boolean;
  pop?: boolean;
  // Chip lontano dalla card: entra dai lati durante lo scroll.
  far?: "left" | "right";
  children?: ReactNode;
}) {
  return (
    <div className={`absolute ${className}`} style={style} data-pop={pop ? "" : undefined} data-far={far} aria-hidden="true">
      <div data-float={float ? "" : undefined}>
        {variant === "square" && (
          <div className={`${base} rounded-[12px]`} style={{ width: size, height: size }}>
            {children}
          </div>
        )}
        {variant === "round" && (
          <div className="relative grid place-items-center" style={{ width: size, height: size }}>
            <span className="absolute inset-[-6px] rounded-full bg-white/25 blur-[2px]" data-pulse="" />
            <div className={`${base} size-full rounded-full`}>{children}</div>
          </div>
        )}
        {variant === "ring" && (
          <div className="relative grid place-items-center rounded-full bg-white p-[3px] shadow-[0_10px_30px_-10px_rgba(20,40,180,0.5)]" style={{ width: size, height: size }}>
            <div className="relative size-full overflow-hidden rounded-full">
              <div className="ai-conic absolute inset-[-20%]" data-spin="" />
              <div className="absolute inset-[5px] grid place-items-center rounded-full bg-gradient-to-br from-cyan-accent to-blue-600 text-white">
                {children}
              </div>
            </div>
          </div>
        )}
        {variant === "frosted" && (
          <div
            className="grid place-items-center rounded-[18px] border border-white/40 bg-white/25 backdrop-blur-md shadow-[0_20px_40px_-20px_rgba(20,40,180,0.5)]"
            style={{ width: size, height: size }}
          >
            <div className={`${base} rounded-[12px]`} style={{ width: size * 0.74, height: size * 0.74 }}>
              {children}
            </div>
          </div>
        )}
        {variant === "glass" && (
          <div
            className="rounded-[10px] border border-white/15 bg-navy-900/35 backdrop-blur-md shadow-[0_10px_30px_-12px_rgba(0,0,0,0.5)]"
            style={{ width: size }}
          >
            {children}
          </div>
        )}
      </div>
    </div>
  );
}

// Cursore del mouse (freccia nera con bordo bianco), con etichetta sfocata opzionale.
export function Cursor({ className = "", style, label }: { className?: string; style?: CSSProperties; label?: string }) {
  return (
    <div className={`absolute ${className}`} style={style} aria-hidden="true" data-cursor="">
      <svg width="30" height="30" viewBox="0 0 24 24" className="drop-shadow-[0_4px_6px_rgba(0,0,0,0.35)]">
        <path d="M4 3l16 8.5-7 1.6L9.6 20z" fill="#0b0f1f" stroke="#fff" strokeWidth="1.6" strokeLinejoin="round" />
      </svg>
      {label && (
        <span className="absolute left-[18px] top-[26px] rounded-lg bg-white/30 px-3 py-1.5 font-code text-[9px] text-white/70 backdrop-blur-sm">
          {label}
        </span>
      )}
    </div>
  );
}

// Pillola eyebrow sopra i titoli di sezione.
export function Pill({ children, tone = "light" }: { children: ReactNode; tone?: "light" | "dark" }) {
  return (
    <span
      data-reveal="head"
      className={
        tone === "dark"
          ? "inline-flex items-center rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-[13px] text-white/80"
          : "inline-flex items-center rounded-full border border-blue-300/25 bg-[#e3e8f8] px-4 py-1.5 text-[13px] text-blue-300"
      }
    >
      {children}
    </span>
  );
}
