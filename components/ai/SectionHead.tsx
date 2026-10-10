import { Pill } from "./Chip";

// Intestazione centrata delle sezioni: pillola, titolo, testo opzionale.
export function SectionHead({
  id,
  eyebrow,
  title,
  body,
  tone = "light",
  size = "md",
}: {
  id: string;
  eyebrow?: string;
  title: string;
  body?: string;
  tone?: "light" | "dark";
  size?: "md" | "lg";
}) {
  const dark = tone === "dark";
  return (
    <div className="relative mx-auto flex max-w-[760px] flex-col items-center text-center">
      {eyebrow && <Pill tone={tone}>{eyebrow}</Pill>}
      <h2
        id={id}
        data-reveal="head"
        className={`mt-6 font-tight font-semibold leading-[0.98] tracking-[-0.04em] text-balance ${
          size === "lg" ? "text-[36px] md:text-[56px]" : "text-[34px] md:text-[48px]"
        } ${dark ? "text-white" : "text-ink"}`}
      >
        {title}
      </h2>
      {body && (
        <p data-reveal="head" className={`mt-5 max-w-[620px] text-[16px] leading-[1.5] text-pretty ${dark ? "text-white/70" : "text-[#5b6478]"}`}>
          {body}
        </p>
      )}
    </div>
  );
}
