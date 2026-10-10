import Link from "next/link";
import { LocaleSwitcher } from "@/components/LocaleSwitcher";
import { localePath, type Locale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { siteConfig } from "@/lib/site";

export function Logo({ lang, page = "/" }: { lang: Locale; page?: string }) {
  return (
    <Link href={localePath(lang, page)} className="logo">
      full<span className="accent">/</span>cycle
    </Link>
  );
}

// Link a una sezione della landing `page` ("/" home, "/ai" variante): "/it#faq", "/it/ai#faq".
function sectionPath(lang: Locale, page: string, id: string) {
  return localePath(lang, page === "/" ? `/#${id}` : `${page}#${id}`);
}

// `localePaths`: percorso della pagina in ogni lingua, quando non basta cambiare il prefisso (vedi LocaleSwitcher).
// `page`: landing a cui puntano i link alle sezioni (default la home).
export function SiteHeader({
  lang,
  localePaths,
  page = "/",
}: {
  lang: Locale;
  localePaths?: Partial<Record<Locale, string>>;
  page?: string;
}) {
  const t = getDictionary(lang).chrome;
  return (
    <header className="site-header">
      <div className="container header-inner">
        <Logo lang={lang} page={page} />
        <nav aria-label={t.mainNav} className="nav">
          <Link href={sectionPath(lang, page, "come-funziona")} className="nav-link">{t.nav.how}</Link>
          <Link href={sectionPath(lang, page, "programma")} className="nav-link">{t.nav.program}</Link>
          <Link href={sectionPath(lang, page, "pacchetti")} className="nav-link">{t.nav.tracks}</Link>
          <Link href={sectionPath(lang, page, "faq")} className="nav-link">{t.nav.faq}</Link>
          <Link href={localePath(lang, "/blog")} className="nav-link">{t.nav.blog}</Link>
          <LocaleSwitcher lang={lang} label={t.langSwitch} paths={localePaths} />
          <Link href={sectionPath(lang, page, "lista")} className="btn btn-glow btn-sm" data-track="CTA Click" data-track-location="nav_waitlist">{t.nav.waitlist}</Link>
        </nav>
      </div>
    </header>
  );
}

export function SiteFooter({ lang, page = "/" }: { lang: Locale; page?: string }) {
  const t = getDictionary(lang).chrome;
  const email = siteConfig.contactEmail;
  const hasEmail = email.includes("@");
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-top">
          <div className="footer-brand">
            <Logo lang={lang} page={page} />
            <p>{t.footerTagline}</p>
          </div>
          <div className="footer-col">
            <p className="footer-label">{t.footerContacts}</p>
            {hasEmail ? <a href={`mailto:${email}`}>{email}</a> : <span>{email}</span>}
          </div>
          <nav className="footer-col" aria-label={t.footerNav}>
            <p className="footer-label">{t.footerLinks}</p>
            <Link href={sectionPath(lang, page, "pacchetti")}>{t.nav.tracks}</Link>
            <Link href={sectionPath(lang, page, "faq")}>{t.nav.faq}</Link>
            <Link href={localePath(lang, "/blog")}>{t.nav.blog}</Link>
            <Link href={localePath(lang, "/privacy")}>{t.privacy}</Link>
          </nav>
        </div>
        <p className="footer-bottom">
          © {new Date().getFullYear()} {siteConfig.name} · {siteConfig.mentor.name}
        </p>
      </div>
      <p className="footer-wordmark" aria-hidden="true">
        full<span>/</span>cycle
      </p>
    </footer>
  );
}
