"use server";

import { track } from "@vercel/analytics/server";
import { defaultLocale, hasLocale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionaries";

export type WaitlistState = {
  status: "idle" | "success" | "error";
  message?: string;
  fieldErrors?: Partial<Record<"name" | "email" | "track", string>>;
  // Valori inviati, per ripopolare il form dopo un errore (React resetta il form dopo l'action).
  values?: Record<"name" | "email" | "track" | "level" | "budget" | "goal", string>;
  // Contatore dei tentativi: usato come key per rimontare il form con i defaultValue aggiornati.
  attempt?: number;
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function field(formData: FormData, key: string, max: number) {
  const value = formData.get(key);
  return typeof value === "string" ? value.trim().slice(0, max) : "";
}

export async function joinWaitlist(
  prev: WaitlistState,
  formData: FormData,
): Promise<WaitlistState> {
  const attempt = (prev.attempt ?? 0) + 1;
  const langValue = field(formData, "lang", 10);
  const lang = hasLocale(langValue) ? langValue : defaultLocale;
  const t = getDictionary(lang);
  const msg = t.form.errors;
  // Honeypot: i bot compilano anche i campi nascosti.
  if (field(formData, "company", 200)) return { status: "success" };

  const entry = {
    name: field(formData, "name", 100),
    email: field(formData, "email", 200).toLowerCase(),
    track: field(formData, "track", 100),
    level: field(formData, "level", 100),
    budget: field(formData, "budget", 100),
    goal: field(formData, "goal", 2000),
    lang,
  };

  const fieldErrors: WaitlistState["fieldErrors"] = {};
  if (!entry.name) fieldErrors.name = msg.name;
  if (!EMAIL_RE.test(entry.email)) fieldErrors.email = msg.email;
  if (entry.track !== t.form.customTrack.id && !t.tracks.items.some((tr) => tr.id === entry.track)) fieldErrors.track = msg.track;
  if (Object.keys(fieldErrors).length) {
    return { status: "error", message: msg.check, fieldErrors, values: entry, attempt };
  }
  if (!t.form.levelOptions.some((o) => o.value === entry.level)) entry.level = "";
  if (!t.form.budgetOptions.some((o) => o.value === entry.budget)) entry.budget = "";

  // Invia l'iscrizione a un webhook (Zapier, Make, n8n, Google Apps Script, Formspree…).
  const webhook = process.env.WAITLIST_WEBHOOK_URL;
  if (!webhook) {
    if (process.env.NODE_ENV === "production") {
      // Meglio un errore visibile che perdere iscrizioni in silenzio.
      console.error("[waitlist] WAITLIST_WEBHOOK_URL non impostata: iscrizione rifiutata.");
      return { status: "error", message: msg.unavailable, values: entry, attempt };
    }
    console.warn("[waitlist] WAITLIST_WEBHOOK_URL non impostata (dev), iscrizione:", entry);
    return { status: "success" };
  }

  try {
    const res = await fetch(webhook, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({ ...entry, createdAt: new Date().toISOString() }),
      cache: "no-store",
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
  } catch (err) {
    console.error("[waitlist] invio fallito:", err);
    return { status: "error", message: msg.generic, values: entry, attempt };
  }

  // Lato server: non bloccato dagli adblocker. Niente nome/email, solo dati aggregabili.
  try {
    await track("Waitlist Signup", { track: entry.track, level: entry.level, budget: entry.budget, lang });
  } catch (err) {
    console.error("[waitlist] tracking fallito:", err);
  }

  return { status: "success" };
}
