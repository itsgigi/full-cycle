import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SiteFooter, SiteHeader } from "@/components/SiteChrome";
import { hasLocale, languageAlternates, localePath } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { siteConfig } from "@/lib/site";

export async function generateMetadata({ params }: PageProps<"/[lang]/privacy">): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const t = getDictionary(lang).privacy;
  return {
    title: t.title,
    description: t.description(siteConfig.name),
    alternates: { canonical: localePath(lang, "/privacy"), languages: languageAlternates("/privacy") },
  };
}

export default async function PrivacyPage({ params }: PageProps<"/[lang]/privacy">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const t = getDictionary(lang).privacy;
  const { name, mentor, contactEmail } = siteConfig;

  return (
    <>
      <SiteHeader lang={lang} />
      <main className="container-narrow legal">
        <h1 className="display-md">{t.title}</h1>
        <p>{t.controller(mentor.name, contactEmail)}</p>
        <h2>{t.dataTitle}</h2>
        <p>{t.data}</p>
        <h2>{t.purposeTitle}</h2>
        <p>{t.purpose(name)}</p>
        <h2>{t.legalBasisTitle}</h2>
        <p>{t.legalBasis}</p>
        <h2>{t.recipientsTitle}</h2>
        <p>{t.recipients}</p>
        <h2>{t.retentionTitle}</h2>
        <p>{t.retention}</p>
        <h2>{t.cookiesTitle}</h2>
        <p>{t.cookies}</p>
        <h2>{t.rightsTitle}</h2>
        <p>{t.rights(contactEmail)}</p>
      </main>
      <SiteFooter lang={lang} />
    </>
  );
}
