import Link from "next/link";
import { lang } from "next/root-params";
import { Eyebrow } from "@/components/Eyebrow";
import { SiteFooter, SiteHeader } from "@/components/SiteChrome";
import { defaultLocale, hasLocale, localePath } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionaries";

export default async function NotFound() {
  const value = await lang();
  const locale = hasLocale(value) ? value : defaultLocale;
  const t = getDictionary(locale).notFound;

  return (
    <>
      <SiteHeader lang={locale} />
      <main className="container section">
        <Eyebrow>404</Eyebrow>
        <h1 className="display-lg">{t.title}</h1>
        <p className="body-lg">
          <Link href={localePath(locale)}>{t.back}</Link>
        </p>
      </main>
      <SiteFooter lang={locale} />
    </>
  );
}
