import Link from "next/link";
import { LocaleSwitcher } from "@/components/LocaleSwitcher";
import { localePath, type Locale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { siteConfig } from "@/lib/site";

export function Logo({ lang }: { lang: Locale }) {
  return (
    <Link href={localePath(lang)} className="logo">
      full<span className="accent">/</span>cycle
    </Link>
  );
}

export function SiteHeader({ lang }: { lang: Locale }) {
  const t = getDictionary(lang).chrome;
  return (
    <header className="site-header">
      <div className="container header-inner">
        <Logo lang={lang} />
        <nav aria-label={t.mainNav} className="nav">
          <Link href={localePath(lang, "/#come-funziona")} className="nav-link">{t.nav.how}</Link>
          <Link href={localePath(lang, "/#programma")} className="nav-link">{t.nav.program}</Link>
          <Link href={localePath(lang, "/#pacchetti")} className="nav-link">{t.nav.tracks}</Link>
          <Link href={localePath(lang, "/#faq")} className="nav-link">{t.nav.faq}</Link>
          <LocaleSwitcher lang={lang} label={t.langSwitch} />
          <Link href={localePath(lang, "/#lista")} className="btn btn-glow btn-sm" data-track="CTA Click" data-track-location="nav_waitlist">{t.nav.waitlist}</Link>
        </nav>
      </div>
    </header>
  );
}

export function SiteFooter({ lang }: { lang: Locale }) {
  const t = getDictionary(lang).chrome;
  const email = siteConfig.contactEmail;
  const hasEmail = email.includes("@");
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-top">
          <div className="footer-brand">
            <Logo lang={lang} />
            <p>{t.footerTagline}</p>
          </div>
          <div className="footer-col">
            <p className="footer-label">{t.footerContacts}</p>
            {hasEmail ? <a href={`mailto:${email}`}>{email}</a> : <span>{email}</span>}
          </div>
          <nav className="footer-col" aria-label={t.footerNav}>
            <p className="footer-label">{t.footerLinks}</p>
            <Link href={localePath(lang, "/#pacchetti")}>{t.nav.tracks}</Link>
            <Link href={localePath(lang, "/#faq")}>{t.nav.faq}</Link>
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
