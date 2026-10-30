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
import { track } from "@vercel/analytics";
import { rv } from "./ui/Reveal";
import { WhatsAppIcon } from "./icons";

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
 * Réservation, juste après la carte : sur le fond sombre des chapitres
 * « nuit », une fiche couleur papier, encadrée d'un filet, qui réunit le
 * titre, le formulaire et le message WhatsApp qui s'écrit en direct à côté
 * (exactement le texte envoyé). Le plus court possible : le soin et le nom
 * (obligatoires), le jour, l'heure et le nombre de personnes sur une ligne,
 * une note facultative. Pas de téléphone : le message part de WhatsApp,
 * qui transmet déjà le numéro.
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
    // Deux champs obligatoires : le soin et le nom. Le reste se précise sur
    // WhatsApp (le numéro du client y est déjà, la date peut rester « à convenir »).
    const next: Errors = {};
    if (!form.service) next.service = t.booking.errors.service;
    if (!form.name.trim()) next.name = t.booking.errors.name;
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) return;
    const link = buildWhatsAppLink(form, { whatsapp: t.whatsapp, intl: t.intl });
    setSentLink(link);
    track("booking_submit", { service: form.service });
    // Même onglet : les navigateurs intégrés (Instagram, TikTok, Facebook)
    // bloquent souvent l'ouverture d'un nouvel onglet.
    window.location.href = link;
  }

  // Le message tel qu'il partira, mis à jour à chaque frappe.
  const preview = useMemo(
    () =>
      buildWhatsAppMessage(
        { ...form, service: form.service || "…" },
        { whatsapp: t.whatsapp, intl: t.intl }
      ),
    [form, t.whatsapp, t.intl]
  );
  const started = !!(form.service || form.date || form.name);

  return (
    <section id="reservation" data-header="dark" className="bg-night py-16 md:py-24">
      {/* ---------- La fiche : le formulaire et son message ---------- */}
      <div className="wrap">
      <div
        id="formulaire"
        {...rv(0, "card")}
        className="booking-card mx-auto grid max-w-[80rem] gap-12 p-6 sm:p-10 md:grid-cols-12 md:gap-x-10 md:p-14 lg:p-16"
      >
        <div className="md:col-span-7">
          <p {...rv(0)} className="eyebrow text-muted">
            {x.about.facts.booking}
          </p>
          <h2 {...rv(1)} className="mt-4 text-head">
            {t.booking.title}
          </h2>
          <p {...rv(2)} className="mt-5 max-w-[46ch] text-body text-muted">
            {t.booking.intro}
          </p>

          {sentLink ? (
            <Confirmation link={sentLink} placeholder={placeholder} onReset={() => { setSentLink(null); setForm(empty); }} />
          ) : (
            <form {...rv(3)} onSubmit={onSubmit} noValidate className="mt-10 grid gap-x-5 gap-y-6 sm:grid-cols-2">
              <Field label={t.booking.fields.service} error={errors.service} htmlFor="service" wide>
                <select id="service" value={form.service} onChange={update("service")} className="field" aria-invalid={!!errors.service}>
                  <option value="">{t.booking.fields.servicePh}</option>
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
                  <optgroup label={t.services.categoryForfaits}>
                    {forfaits.filter((f) => !f.hidden).map((f) => {
                      const name = t.serviceData[f.id].name;
                      return <option key={f.id} value={name}>{name} · {f.price} {currency}</option>;
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

              <Field label={t.booking.fields.name} error={errors.name} htmlFor="name" wide>
                <input
                  id="name"
                  type="text"
                  autoComplete="name"
                  value={form.name}
                  onChange={update("name")}
                  placeholder={t.booking.fields.namePh}
                  className="field"
                  aria-invalid={!!errors.name}
                />
              </Field>

              {/* Jour, heure et personnes sur une seule ligne (le jour seul sur téléphone) */}
              <div className="grid min-w-0 grid-cols-2 gap-3 sm:col-span-2 sm:grid-cols-[1.4fr_1fr_0.8fr] sm:gap-4 [&>*]:min-w-0">
                <Field label={t.booking.fields.date} htmlFor="date" className="col-span-2 sm:col-span-1">
                  <input id="date" type="date" value={form.date} onChange={update("date")} className="field" />
                </Field>
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
                <div className="flex flex-col items-start gap-5 sm:flex-row sm:items-center sm:gap-8">
                  <button type="submit" className="button booking-send w-full sm:w-auto">
                    <WhatsAppIcon width={20} height={20} aria-hidden="true" />
                    {t.booking.submit}
                  </button>
                  <a href={direct} data-cta="booking-direct" className="link text-body">
                    {x.cta.whatsapp}
                  </a>
                </div>
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
        <aside {...rv(4)} aria-live="polite" className="md:col-span-5">
          <div className="md:sticky md:top-28">
            <p className="eyebrow text-muted">{x.booking.preview}</p>
            <div className="booking-preview mt-4 p-6 md:p-8">
              <p className={["whitespace-pre-line text-body", started ? "" : "text-muted"].join(" ")}>
                {preview}
              </p>
            </div>
            <p className="mt-3 text-small text-muted">{x.booking.previewHint}</p>
          </div>
        </aside>
      </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        /* La fiche : couleur papier, un filet doré à l'intérieur, une ombre douce */
        .booking-card {
          background: var(--paper);
          color: var(--ink);
          outline: 1px solid color-mix(in srgb, var(--gold) 55%, transparent); /* taste-skill-ignore: filet de la fiche */
          outline-offset: -12px;
          box-shadow: 0 30px 80px -30px rgba(0, 0, 0, 0.55); /* taste-skill-ignore: fiche posée sur le fond sombre */
        }
        /* Le seul bouton plein de la page : on ne peut pas le manquer */
        .booking-send { background: var(--night); color: var(--night-ink); border-color: var(--night); min-height: 3.5rem; padding: 0 2.25rem; }
        @media (hover: hover) and (pointer: fine) { .booking-send:hover { box-shadow: none; background: #000; } }
        .booking-preview {
          background: var(--bg);
          border: 1px solid color-mix(in srgb, var(--ink) 12%, transparent); /* taste-skill-ignore: cadre du message */
        }
        @media (max-width: 639px) { .booking-card { outline-offset: -8px; } }
      ` }} />
    </section>
  );
}

function Field({
  label,
  htmlFor,
  error,
  wide,
  className = "",
  children,
}: {
  label: string;
  htmlFor: string;
  error?: string;
  wide?: boolean;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={["min-w-0", wide ? "sm:col-span-2" : "", className].join(" ")}>
      <label htmlFor={htmlFor} className="mb-2 block text-small font-medium text-muted">
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
        <a href={link} className="button">
          {t.booking.confirm.open}
        </a>
        <button onClick={onReset} className="link min-h-[2.75rem] text-body">
          {t.booking.confirm.reset}
        </button>
      </div>
    </div>
  );
}
