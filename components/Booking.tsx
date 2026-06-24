"use client";

import { useState } from "react";
import Section from "./ui/Section";
import Reveal from "./ui/Reveal";
import ZelligeDivider from "./ui/ZelligeDivider";
import { services } from "@/data/services";
import { siteConfig } from "@/data/site-config";
import {
  buildWhatsAppLink,
  isPlaceholderNumber,
  type BookingPayload,
} from "@/lib/whatsapp";
import { WhatsAppIcon, CheckIcon } from "@/components/icons";

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

export default function Booking() {
  const [form, setForm] = useState<BookingPayload>(empty);
  const [errors, setErrors] = useState<Errors>({});
  const [sentLink, setSentLink] = useState<string | null>(null);

  const placeholder = isPlaceholderNumber(siteConfig.contact.whatsapp);

  const update =
    (field: keyof BookingPayload) =>
    (
      e: React.ChangeEvent<
        HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
      >
    ) => {
      setForm((f) => ({ ...f, [field]: e.target.value }));
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    };

  function validate(): boolean {
    const next: Errors = {};
    if (!form.name.trim()) next.name = "Veuillez indiquer votre nom.";
    if (!form.phone.trim() || form.phone.replace(/\D/g, "").length < 6)
      next.phone = "Numéro de téléphone invalide.";
    if (!form.service) next.service = "Choisissez un soin.";
    if (!form.date) next.date = "Indiquez une date souhaitée.";
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) return;
    const link = buildWhatsAppLink(form);
    setSentLink(link);
    // Apre WhatsApp in una nuova scheda (se non bloccato dal browser)
    window.open(link, "_blank", "noopener,noreferrer");
  }

  return (
    <Section id="reservation" className="relative overflow-hidden bg-noir">
      <div className="zellige-texture absolute inset-0 opacity-[0.06]" />

      <div className="relative grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
        {/* Colonna evocativa */}
        <div className="lg:pt-6">
          <Reveal>
            <span className="eyebrow eyebrow--left">Réservation</span>
          </Reveal>
          <Reveal delay={0.08}>
            <h2 className="mt-5 text-4xl leading-tight text-creme sm:text-5xl text-balance">
              Réservez votre parenthèse
            </h2>
          </Reveal>
          <Reveal delay={0.16}>
            <p className="mt-6 text-lg font-light leading-relaxed text-sable">
              Remplissez le formulaire&nbsp;: votre demande s’ouvre directement
              dans WhatsApp, déjà rédigée. Nous vous confirmons votre rendez-vous
              en quelques minutes.
            </p>
          </Reveal>

          <ZelligeDivider className="my-8 justify-start" />

          <Reveal delay={0.24}>
            <ul className="space-y-3 text-sm font-light text-sable/85">
              {[
                "Réponse rapide via WhatsApp",
                "Sans engagement ni paiement en ligne",
                "Conseils personnalisés pour votre soin",
              ].map((t) => (
                <li key={t} className="flex items-center gap-3">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-or/15 text-or">
                    <CheckIcon width={14} height={14} />
                  </span>
                  {t}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>

        {/* Form */}
        <Reveal delay={0.12}>
          <div className="rounded-3xl border border-or/15 bg-nuit/80 p-6 shadow-riad backdrop-blur-sm sm:p-9">
            {sentLink ? (
              <Confirmation
                link={sentLink}
                placeholder={placeholder}
                onReset={() => {
                  setSentLink(null);
                  setForm(empty);
                }}
              />
            ) : (
              <form onSubmit={onSubmit} noValidate className="space-y-5">
                <div className="grid gap-5 sm:grid-cols-2">
                  <Field
                    label="Nom complet"
                    error={errors.name}
                    htmlFor="name"
                  >
                    <input
                      id="name"
                      type="text"
                      autoComplete="name"
                      value={form.name}
                      onChange={update("name")}
                      placeholder="Votre nom"
                      className="input"
                    />
                  </Field>
                  <Field
                    label="Téléphone"
                    error={errors.phone}
                    htmlFor="phone"
                  >
                    <input
                      id="phone"
                      type="tel"
                      autoComplete="tel"
                      value={form.phone}
                      onChange={update("phone")}
                      placeholder="+212 6 ..."
                      className="input"
                    />
                  </Field>
                </div>

                <Field label="Soin souhaité" error={errors.service} htmlFor="service">
                  <select
                    id="service"
                    value={form.service}
                    onChange={update("service")}
                    className="input"
                  >
                    <option value="">— Choisir un soin —</option>
                    {services.map((s) => (
                      <option key={s.id} value={`${s.name} (${s.duration})`}>
                        {s.name} · {s.duration} · {s.price} MAD
                      </option>
                    ))}
                  </select>
                </Field>

                <div className="grid gap-5 sm:grid-cols-3">
                  <Field label="Date" error={errors.date} htmlFor="date">
                    <input
                      id="date"
                      type="date"
                      value={form.date}
                      onChange={update("date")}
                      className="input"
                    />
                  </Field>
                  <Field label="Heure" htmlFor="time">
                    <input
                      id="time"
                      type="time"
                      value={form.time}
                      onChange={update("time")}
                      className="input"
                    />
                  </Field>
                  <Field label="Personnes" htmlFor="people">
                    <select
                      id="people"
                      value={form.people}
                      onChange={update("people")}
                      className="input"
                    >
                      {["1", "2", "3", "4", "5+"].map((n) => (
                        <option key={n} value={n}>
                          {n}
                        </option>
                      ))}
                    </select>
                  </Field>
                </div>

                <Field label="Notes (facultatif)" htmlFor="notes">
                  <textarea
                    id="notes"
                    rows={3}
                    value={form.notes}
                    onChange={update("notes")}
                    placeholder="Une préférence, une occasion spéciale ?"
                    className="input resize-none"
                  />
                </Field>

                <button type="submit" className="btn btn-gold w-full !py-4">
                  <WhatsAppIcon width={18} height={18} />
                  Envoyer ma demande
                </button>

                {placeholder && (
                  <p className="text-center text-xs leading-relaxed text-terracotta/90">
                    ⚠️ Démo&nbsp;: le numéro WhatsApp n’est pas encore configuré
                    (voir <code className="text-or/80">data/site-config.ts</code>).
                  </p>
                )}
              </form>
            )}
          </div>
        </Reveal>
      </div>

      {/* stile dei campi (scoped via classe .input) */}
      <style>{`
        .input {
          width: 100%;
          background: rgba(255,255,255,0.7);
          border: 1px solid rgba(58,42,31,0.18);
          border-radius: 0.85rem;
          padding: 0.8rem 1rem;
          color: #3A2A1F;
          font-weight: 300;
          font-size: 0.95rem;
          transition: border-color .3s ease, box-shadow .3s ease;
        }
        .input::placeholder { color: rgba(58,42,31,0.42); }
        .input:focus {
          outline: none;
          border-color: #B5502E;
          box-shadow: 0 0 0 3px rgba(181,80,46,0.16);
        }
        .input option { background:#FBF4EA; color:#3A2A1F; }
        /* icona dei campi data/ora sui campi chiari */
        .input::-webkit-calendar-picker-indicator { opacity: 0.55; cursor: pointer; }
      `}</style>
    </Section>
  );
}

function Field({
  label,
  htmlFor,
  error,
  children,
}: {
  label: string;
  htmlFor: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label
        htmlFor={htmlFor}
        className="mb-2 block text-xs uppercase tracking-wide text-sable/70"
      >
        {label}
      </label>
      {children}
      {error && <p className="mt-1.5 text-xs text-terracotta">{error}</p>}
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
  return (
    <div className="flex flex-col items-center py-8 text-center">
      <span className="flex h-16 w-16 items-center justify-center rounded-full bg-or/15 text-or">
        <WhatsAppIcon width={30} height={30} />
      </span>
      <h3 className="mt-6 font-display text-3xl text-creme">
        Votre demande est prête
      </h3>
      <p className="mt-3 max-w-sm text-sm font-light leading-relaxed text-sable">
        WhatsApp devrait s’ouvrir avec votre message pré-rempli. Si rien ne se
        passe, cliquez sur le bouton ci-dessous.
      </p>
      {placeholder && (
        <p className="mt-3 max-w-sm text-xs text-terracotta/90">
          (Démo : numéro WhatsApp à configurer dans data/site-config.ts)
        </p>
      )}
      <a
        href={link}
        target="_blank"
        rel="noopener noreferrer"
        className="btn btn-gold mt-7"
      >
        <WhatsAppIcon width={18} height={18} />
        Ouvrir WhatsApp
      </a>
      <button
        onClick={onReset}
        className="mt-4 text-xs uppercase tracking-wide text-sable/60 underline-offset-4 hover:text-or hover:underline"
      >
        Nouvelle demande
      </button>
    </div>
  );
}
