"use client";

import { useEffect, useMemo, useState } from "react";
import { forfaits, massages, hammams, beaute, currency } from "@/data/services";
import { siteConfig } from "@/data/site-config";
import { useI18n } from "@/lib/i18n";
import {
  buildWhatsAppLink,
  buildWhatsAppMessage,
  isPlaceholderNumber,
  type BookingPayload,
} from "@/lib/whatsapp";
import { onSelectService } from "@/lib/booking-bus";
import { rv } from "./ui/Reveal";

const empty: BookingPayload = {
  name: "",
  phone: "",
  service: "",
  date: "",
  time: "",
  people: "1",
  notes: "",
};

type Errors = Partial<Record<keyof BookingPayload, string>>;

/**
 * Réservation, en deux temps :
 * 1. un bandeau en forme d'arche — un seul mot, un seul lien, WhatsApp direct ;
 * 2. le formulaire, avec le message WhatsApp qui s'écrit en direct à côté
 *    (exactement le texte qui sera envoyé).
 */
export default function Booking() {
  const { t, x } = useI18n();
  const [form, setForm] = useState<BookingPayload>(empty);
  const [errors, setErrors] = useState<Errors>({});
  const [sentLink, setSentLink] = useState<string | null>(null);
  const placeholder = isPlaceholderNumber(siteConfig.contact.whatsapp);
  const direct = `https://wa.me/${siteConfig.contact.whatsapp}`;

  // Un clic sur un soin de la carte le présélectionne ici.
  useEffect(
    () =>
      onSelectService((value) => {
        setSentLink(null);
        setForm((f) => ({ ...f, service: value }));
        setErrors((e) => ({ ...e, service: undefined }));
      }),
    []
  );

  const update =
    (field: keyof BookingPayload) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
      setForm((f) => ({ ...f, [field]: e.target.value }));
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    };

  function validate(): boolean {
    const next: Errors = {};
    if (!form.name.trim()) next.name = t.booking.errors.name;
    if (!form.phone.trim() || form.phone.replace(/\D/g, "").length < 6)
      next.phone = t.booking.errors.phone;
    if (!form.service) next.service = t.booking.errors.service;
    if (!form.date) next.date = t.booking.errors.date;
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) return;
    const link = buildWhatsAppLink(form, { whatsapp: t.whatsapp, intl: t.intl });
    setSentLink(link);
    window.open(link, "_blank", "noopener,noreferrer");
  }

  // Le message tel qu'il partira, mis à jour à chaque frappe.
  const preview = useMemo(
    () =>
      buildWhatsAppMessage(
        { ...form, name: form.name || "…", phone: form.phone || "…", service: form.service || "…" },
        { whatsapp: t.whatsapp, intl: t.intl }
      ),
    [form, t.whatsapp, t.intl]
  );
  const started = !!(form.service || form.date || form.name);

  return (
    <section id="reservation" className="bg-bg pt-section">
      {/* ---------- Le bandeau : un mot, un lien ---------- */}
      <a
        href={direct}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={x.band.label}
        className="band arch relative mx-margin flex h-[52svh] flex-col justify-between overflow-hidden bg-accent text-accent-ink md:h-[68svh]"
      >
        <span className="mt-[46%] flex items-start justify-between gap-6 px-5 sm:mt-[30%] md:mt-[11%] md:px-8">
          <span className="max-w-[24ch] text-body md:text-lead">{x.band.sentence}</span>
          <svg
            aria-hidden="true"
            viewBox="0 0 48 48"
            className="band-arrow h-8 w-8 shrink-0 md:h-12 md:w-12"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
          >
            <path d="M12 36 36 12M16 12h20v20" strokeLinecap="square" />
          </svg>
        </span>
        <span
          aria-hidden="true"
          className="giant display block whitespace-nowrap px-3 pb-[0.06em] font-medium leading-[0.74] tracking-[-0.055em]"
          // Le mot remplit la largeur sur une ligne, quelle que soit la langue.
          style={{ fontSize: `min(var(--step-giant), ${(86 / (x.band.verb.length * 0.5)).toFixed(1)}vw)` }}
        >
          {x.band.verb}
        </span>
      </a>

      {/* ---------- Le formulaire et son message ---------- */}
      <div id="formulaire" className="wrap grid gap-16 py-section md:grid-cols-12 md:gap-x-8">
        <div className="md:col-span-6">
          <h2 {...rv(0)} className="text-head">
            {t.booking.title}
          </h2>
          <p {...rv(1)} className="mt-6 max-w-[44ch] text-body">
            {t.booking.intro}
          </p>

          {sentLink ? (
            <Confirmation link={sentLink} placeholder={placeholder} onReset={() => { setSentLink(null); setForm(empty); }} />
          ) : (
            <form {...rv(2)} onSubmit={onSubmit} noValidate className="mt-12 grid gap-x-8 gap-y-7 sm:grid-cols-2">
              <Field label={t.booking.fields.name} error={errors.name} htmlFor="name">
                <input id="name" type="text" autoComplete="name" value={form.name} onChange={update("name")} placeholder={t.booking.fields.namePh} className="field" aria-invalid={!!errors.name} />
              </Field>
              <Field label={t.booking.fields.phone} error={errors.phone} htmlFor="phone">
                <input id="phone" type="tel" autoComplete="tel" value={form.phone} onChange={update("phone")} placeholder="+212 6 …" className="field" aria-invalid={!!errors.phone} />
              </Field>

              <Field label={t.booking.fields.service} error={errors.service} htmlFor="service" wide>
                <select id="service" value={form.service} onChange={update("service")} className="field" aria-invalid={!!errors.service}>
                  <option value="">{t.booking.fields.servicePh}</option>
                  <optgroup label={t.services.categoryForfaits}>
                    {forfaits.filter((f) => !f.hidden).map((f) => {
                      const name = t.serviceData[f.id].name;
                      return <option key={f.id} value={name}>{name} · {f.price} {currency}</option>;
                    })}
                  </optgroup>
                  <optgroup label={t.services.categoryMassages}>
                    {massages.filter((m) => !m.hidden).map((m) =>
                      m.variants.map((v) => {
                        const name = t.serviceData[m.id].name;
                        return (
                          <option key={`${m.id}-${v.duration}`} value={`${name} (${v.duration})`}>
                            {name} · {v.duration} · {v.price} {currency}
                          </option>
                        );
                      })
                    )}
                  </optgroup>
                  <optgroup label={t.services.categoryHammams}>
                    {hammams.map((h) => {
                      const name = t.serviceData[h.id].name;
                      return <option key={h.id} value={name}>{name} · {h.price} {currency}</option>;
                    })}
                  </optgroup>
                  {beaute.some((b) => !b.unavailable) && (
                    <optgroup label={t.services.categoryBeaute}>
                      {beaute.filter((b) => !b.unavailable).map((b) => {
                        const name = t.serviceData[b.id].name;
                        return <option key={b.id} value={name}>{name} · {b.price} {currency}</option>;
                      })}
                    </optgroup>
                  )}
                </select>
              </Field>

              <Field label={t.booking.fields.date} error={errors.date} htmlFor="date">
                <input id="date" type="date" value={form.date} onChange={update("date")} className="field" aria-invalid={!!errors.date} />
              </Field>
              <div className="grid grid-cols-2 gap-x-8">
                <Field label={t.booking.fields.time} htmlFor="time">
                  <input id="time" type="time" value={form.time} onChange={update("time")} className="field" />
                </Field>
                <Field label={t.booking.fields.people} htmlFor="people">
                  <select id="people" value={form.people} onChange={update("people")} className="field">
                    {["1", "2", "3", "4", "5+"].map((n) => (
                      <option key={n} value={n}>{n}</option>
                    ))}
                  </select>
                </Field>
              </div>

              <Field label={t.booking.fields.notes} htmlFor="notes" wide>
                <textarea id="notes" rows={2} value={form.notes} onChange={update("notes")} placeholder={t.booking.fields.notesPh} className="field" />
              </Field>

              <div className="sm:col-span-2">
                <button type="submit" className="button w-full sm:w-auto">
                  {t.booking.submit}
                </button>
                {placeholder && (
                  <p className="mt-3 text-small text-muted">
                    {t.booking.demo.pre}data/site-config.ts{t.booking.demo.post}
                  </p>
                )}
              </div>
            </form>
          )}
        </div>

        {/* Le message en direct — le « reçu » de la demande */}
        <aside {...rv(3)} aria-live="polite" className="md:col-span-5 md:col-start-8">
          <div className="md:sticky md:top-28">
            <p className="text-small text-muted">{x.booking.preview}</p>
            <div className="mt-3 bg-surface p-6 md:p-8">
              <p className={["whitespace-pre-line text-body", started ? "" : "text-muted"].join(" ")}>
                {preview}
              </p>
            </div>
            <p className="mt-3 text-small text-muted">{x.booking.previewHint}</p>
          </div>
        </aside>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .band { transition: background-color 0ms, color 0ms; }
        .band-arrow { transition: transform var(--t-hover) var(--ease-out); }
        .band:hover, .band:focus-visible { background: var(--accent-strong); }
        .band:hover .band-arrow { transform: translate(4px, -4px); }
        .band:active { transform: scale(0.995); }
        .band:focus-visible { outline-offset: 6px; }
      ` }} />
    </section>
  );
}

function Field({
  label,
  htmlFor,
  error,
  wide,
  children,
}: {
  label: string;
  htmlFor: string;
  error?: string;
  wide?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className={wide ? "sm:col-span-2" : undefined}>
      <label htmlFor={htmlFor} className="block text-small font-medium text-muted">
        {label}
      </label>
      {children}
      {error && (
        <p role="alert" className="mt-2 text-small font-medium text-accent">
          {error}
        </p>
      )}
    </div>
  );
}

function Confirmation({
  link,
  placeholder,
  onReset,
}: {
  link: string;
  placeholder: boolean;
  onReset: () => void;
}) {
  const { t } = useI18n();
  return (
    <div className="mt-12">
      <h3 className="text-lead">{t.booking.confirm.title}</h3>
      <p className="mt-3 max-w-[44ch] text-body">{t.booking.confirm.body}</p>
      {placeholder && <p className="mt-3 text-small text-muted">{t.booking.confirm.demoNote}</p>}
      <div className="mt-8 flex flex-wrap items-center gap-6">
        <a href={link} target="_blank" rel="noopener noreferrer" className="button">
          {t.booking.confirm.open}
        </a>
        <button onClick={onReset} className="link min-h-[2.75rem] text-body">
          {t.booking.confirm.reset}
        </button>
      </div>
    </div>
  );
}
