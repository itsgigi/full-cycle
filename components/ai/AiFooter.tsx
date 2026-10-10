import Link from "next/link";
import type { AiContent } from "./content";

export function AiFooter({ footer }: { footer: AiContent["footer"] }) {
  const hasEmail = footer.email.includes("@");
  return (
    <footer className="relative overflow-hidden bg-navy-950 px-4 pb-8 pt-16 text-white/70 md:px-8">
      <div className="mx-auto grid max-w-[1200px] gap-10 md:grid-cols-[2fr_1fr_1fr]">
        <div>
          <p className="font-tight text-[20px] font-semibold tracking-[-0.04em] text-white">
            full<span className="text-cyan-soft">/</span>cycle
          </p>
          <p className="mt-3 max-w-[360px] text-[14px] leading-[1.6]">{footer.tagline}</p>
        </div>
        <div>
          <p className="font-code text-[11px] uppercase tracking-wider text-white/40">{footer.contactsLabel}</p>
          {hasEmail ? (
            <a href={`mailto:${footer.email}`} className="mt-3 block text-[14px] hover:text-white!">
              {footer.email}
            </a>
          ) : (
            <span className="mt-3 block text-[14px]">{footer.email}</span>
          )}
        </div>
        <nav aria-label={footer.navLabel}>
          <p className="font-code text-[11px] uppercase tracking-wider text-white/40">{footer.linksLabel}</p>
          <ul className="mt-3 space-y-2 text-[14px]">
            {footer.links.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="hover:text-white!">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
      <p className="mx-auto mt-14 max-w-[1200px] border-t border-white/10 pt-6 text-[12px] text-white/40">{footer.copyright}</p>
      <p aria-hidden="true" className="pointer-events-none mt-6 select-none text-center font-tight text-[18vw] font-semibold leading-[0.8] tracking-[-0.06em] text-white/[0.04]">
        full/cycle
      </p>
    </footer>
  );
}
