"use client";

import { useActionState } from "react";
import Link from "next/link";
import { joinWaitlist, type WaitlistState } from "@/app/actions";
import type { Locale } from "@/lib/i18n/config";
import type { Dictionary } from "@/lib/i18n/dictionaries";

const initialState: WaitlistState = { status: "idle" };

type Props = {
  lang: Locale;
  t: Dictionary["form"];
  tracks: { id: string; name: string; tagline: string }[];
  privacyHref: string;
  privacyLabel: string;
};

export function WaitlistForm({ lang, t, tracks, privacyHref, privacyLabel }: Props) {
  const [state, formAction, pending] = useActionState(joinWaitlist, initialState);

  if (state.status === "success") {
    return (
      <div className="waitlist-success" role="status">
        <h3>{t.successTitle}</h3>
        <p>{t.successText}</p>
      </div>
    );
  }

  const errors = state.fieldErrors ?? {};
  const values = state.values;

  return (
    <form key={state.attempt ?? 0} action={formAction} className="waitlist-form" noValidate>
      <input type="hidden" name="lang" value={lang} />
      <div className="field">
        <label htmlFor="wl-name">{t.name}</label>
        <input
          id="wl-name"
          name="name"
          defaultValue={values?.name}
          type="text"
          autoComplete="given-name"
          required
          maxLength={100}
          aria-invalid={!!errors.name}
          aria-describedby={errors.name ? "wl-name-err" : undefined}
        />
        {errors.name && <p id="wl-name-err" className="field-error">{errors.name}</p>}
      </div>

      <div className="field">
        <label htmlFor="wl-email">{t.email}</label>
        <input
          id="wl-email"
          name="email"
          defaultValue={values?.email}
          type="email"
          autoComplete="email"
          required
          maxLength={200}
          aria-invalid={!!errors.email}
          aria-describedby={errors.email ? "wl-email-err" : undefined}
        />
        {errors.email && <p id="wl-email-err" className="field-error">{errors.email}</p>}
      </div>

      <fieldset
        className="field track-options"
        aria-invalid={!!errors.track}
        aria-describedby={errors.track ? "wl-track-err" : undefined}
      >
        <legend>{t.track}</legend>
        {tracks.map((t) => (
          <label key={t.id} className="track-option" htmlFor={`track-${t.id}`}>
            <input
              id={`track-${t.id}`}
              type="radio"
              name="track"
              value={t.id}
              required
              defaultChecked={values?.track === t.id}
            />
            <span>
              <strong>{t.name}</strong>
              <span className="muted">{t.tagline}</span>
            </span>
          </label>
        ))}
        {errors.track && <p id="wl-track-err" className="field-error">{errors.track}</p>}
      </fieldset>

      <div className="field">
        <label htmlFor="wl-level">{t.level}</label>
        <select id="wl-level" name="level" defaultValue={values?.level}>
          {t.levelOptions.map((o) => (
            <option key={o.value} value={o.value}>{o.label}</option>
          ))}
        </select>
      </div>

      <div className="field">
        <label htmlFor="wl-budget">{t.budget}</label>
        <select id="wl-budget" name="budget" defaultValue={values?.budget}>
          {t.budgetOptions.map((o) => (
            <option key={o.value} value={o.value}>{o.label}</option>
          ))}
        </select>
      </div>

      <div className="field">
        <label htmlFor="wl-goal">
          {t.goal} <span className="muted">{t.optional}</span>
        </label>
        <textarea id="wl-goal" name="goal" rows={3} maxLength={2000} defaultValue={values?.goal} />
      </div>
      <div className="field">
        <label htmlFor="wl-gap">{t.gap}</label>
        <textarea id="wl-gap" name="gap" rows={4} maxLength={2000} defaultValue={values?.gap} required />
      </div>

      {/* Honeypot anti-spam, invisibile agli utenti */}
      <div className="hp" aria-hidden="true">
        <label htmlFor="wl-company">Azienda</label>
        <input id="wl-company" name="company" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      {state.status === "error" && state.message && (
        <p className="form-error" role="alert">{state.message}</p>
      )}

      <button type="submit" className="btn btn-glow btn-block" disabled={pending}>
        {pending ? t.pending : t.submit}
      </button>
      <p className="fineprint">
        {t.fineprint} <Link href={privacyHref}>{privacyLabel}</Link>.
      </p>
    </form>
  );
}
