# Full Cycle — landing page

Landing del percorso 1:1 per sviluppatori junior. Next.js (App Router), pagina interamente statica.

## Avvio

```bash
cp .env.example .env.local   # imposta NEXT_PUBLIC_SITE_URL e WAITLIST_WEBHOOK_URL
npm install
npm run dev                  # http://localhost:3000
npm run build && npm start   # produzione
```

## Da personalizzare prima di pubblicare

- `lib/site.ts` — valori uguali in tutte le lingue: nome mentor, foto, profili social (`sameAs`), email. Prezzo per pacchetto (`price`, oggi 1500) e posti gratuiti dell'offerta lancio (`freeSpots`, oggi 3; metti 0 per nasconderla).
- `lib/i18n/dictionaries/it.ts` e `en.ts` — tutti i testi tradotti: pacchetti (`tracks`), sezioni, FAQ, ruolo e bio del mentor, prezzo formattato, ore/settimana, `[STACK FRONTEND]`. TypeScript segnala se `en.ts` non ha la stessa forma di `it.ts`.
- Lingue: ogni pagina vive sotto `/it` o `/en`. `proxy.ts` reindirizza `/` alla lingua dal cookie `NEXT_LOCALE` o da `Accept-Language` (default italiano).
- `app/privacy/page.tsx` — completa la privacy policy (titolare, conservazione).
- Foto mentor: oggi c'è un segnaposto in `app/page.tsx` (usa `next/image`).

## Lista d'attesa

Il form usa una Server Action (`app/actions.ts`): chiede il pacchetto scelto (i bottoni "Scegli …" delle card lo preselezionano), valida i campi, filtra i bot con un honeypot e invia l'iscrizione in JSON a `WAITLIST_WEBHOOK_URL` (Zapier, Make, n8n, Google Apps Script…). In produzione, senza webhook, il form mostra un errore invece di perdere iscrizioni in silenzio. Funziona anche senza JavaScript.

## SEO incluso

- Metadata: title template, description, keywords, canonical, Open Graph, Twitter card, robots, `lang="it"`.
- OG/Twitter image generate (`app/opengraph-image.tsx`), favicon SVG, apple icon, web manifest.
- `sitemap.xml` e `robots.txt` generati da `NEXT_PUBLIC_SITE_URL`.
- JSON-LD: `WebSite`, `ItemList` con un `Course` per pacchetto (+ `Offer` 1500 EUR), `FAQPage`, `Person` (quando il nome mentor è compilato).
- Font self-hosted con `next/font` (niente richieste a Google, niente layout shift), HTML semantico, skip link.
- Lighthouse mobile: Accessibility, Best Practices e SEO 100.

Dopo il deploy: registra il dominio su Google Search Console, invia la sitemap e verifica i dati strutturati con il Rich Results Test.
