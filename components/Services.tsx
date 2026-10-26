"use client";

import type { ReactNode } from "react";
import {
  forfaits,
  massages,
  hammams,
  beaute,
  currency,
  unavailableStepIds,
} from "@/data/services";
import { siteConfig } from "@/data/site-config";
import { useI18n } from "@/lib/i18n";
import { selectService } from "@/lib/booking-bus";
import { rv } from "./ui/Reveal";
import { ParallaxImage } from "./ui/motion";

/**
 * La carte, composée pour se lire d'un coup d'œil, même sur téléphone :
 * chaque groupe (massages, hammams, forfaits, beauté) occupe sa propre
 * bande de couleur avec un grand titre ; chaque soin porte son nom en
 * grand et son prix bien visible. Les durées d'un massage sont des pavés
 * à toucher ; les hammams et forfaits listent leurs étapes une par ligne,
 * avec leur bouton « Réserver ». Tout choix présélectionne le soin dans
 * le formulaire de réservation.
 */

type Tone = "bg" | "surface";

export default function Services() {
  const { t, x } = useI18n();
  const { menuImage } = siteConfig;

  const groups = [
    { id: "carte-massages", label: x.menu.jump.massages },
    { id: "carte-hammams", label: x.menu.jump.hammams },
    { id: "carte-forfaits", label: x.menu.jump.forfaits },
    { id: "carte-beaute", label: x.menu.jump.beaute },
  ];
  const allBeauteOff = beaute.every((b) => b.unavailable);

  return (
    <section id="carte" className="relative bg-bg">
      <div className="grid md:grid-cols-12">
        {/* Photo plein-hauteur, collée au bord, qui reste pendant la lecture de la carte */}
        <div className="relative md:col-span-5">
          <div className="md:sticky md:top-0 md:h-[100svh]">
            <ParallaxImage
              src={menuImage.src}
              alt=""
              sizes="(max-width: 768px) 100vw, 42vw"
              zoom={1.35}
              drift={4}
              className="h-[42svh] md:h-full"
            />
          </div>
        </div>

        <div className="md:col-span-7">
          <div className="px-margin pb-12 pt-14 md:pl-[6vw] md:pt-section">
            <h2 {...rv(0)} className="text-[clamp(3.5rem,2rem+7vw,9rem)] leading-[0.9]">
              {x.menu.title}
            </h2>
            <p {...rv(1)} className="mt-8 max-w-[38ch] text-lead">
              {t.services.intro}
            </p>
            {/* Accès direct à chaque groupe */}
            <nav {...rv(2)} aria-label={x.menu.title} className="mt-10">
              <ul className="flex flex-wrap gap-x-7 gap-y-3 text-lead">
                {groups.map((g) => (
                  <li key={g.id}>
                    <a href={`#${g.id}`} className="link">
                      {g.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          <Group id="carte-massages" title={t.services.categoryMassages} tone="surface" hint={x.menu.tapHint}>
            {massages
              .filter((m) => !m.hidden)
              .map((m, i) => {
                const copy = t.serviceData[m.id];
                return (
                  <article key={m.id} {...rv(i, "row")}>
                    <h4 className="menu-name">{copy.name}</h4>
                    {copy.description && (
                      <p className="mt-2 max-w-[42ch] text-body text-muted">{copy.description}</p>
                    )}
                    <ul className="mt-5 grid max-w-[30rem] grid-cols-2 gap-3">
                      {m.variants.map((v) => (
                        <li key={v.duration}>
                          <button
                            type="button"
                            onClick={() => selectService(`${copy.name} (${v.duration})`)}
                            aria-label={`${x.menu.bookItem} : ${copy.name}, ${v.duration}, ${v.price} ${currency}`}
                            className="menu-pick flex w-full flex-col items-start bg-bg px-4 py-3.5 text-left"
                          >
                            <span className="text-body">{v.duration}</span>
                            <span className="mt-1 flex w-full items-baseline justify-between gap-3">
                              <Price value={v.price} />
                              <span aria-hidden="true" className="menu-arrow text-lead text-accent">
                                →
                              </span>
                            </span>
                          </button>
                        </li>
                      ))}
                    </ul>
                  </article>
                );
              })}
          </Group>

          <Group id="carte-hammams" title={t.services.categoryHammams} tone="bg">
            {hammams.map((h, i) => {
              const name = t.serviceData[h.id].name;
              return (
                <Formula
                  key={h.id}
                  i={i}
                  name={name}
                  price={h.price}
                  includes={x.menu.includes}
                  bookLabel={x.menu.bookItem}
                  onBook={() => selectService(name)}
                  steps={h.stepIds}
                />
              );
            })}
          </Group>

          <Group id="carte-forfaits" title={t.services.categoryForfaits} tone="surface">
            {forfaits
              .filter((f) => !f.hidden)
              .map((f, i) => {
                const copy = t.serviceData[f.id];
                return (
                  <Formula
                    key={f.id}
                    i={i}
                    name={copy.name}
                    meta={copy.meta}
                    price={f.price}
                    includes={x.menu.includes}
                    bookLabel={x.menu.bookItem}
                    onBook={() => selectService(copy.name)}
                    steps={f.stepIds}
                  />
                );
              })}
          </Group>

          <Group
            id="carte-beaute"
            title={t.services.categoryBeaute}
            tone="bg"
            columns={false}
            hint={allBeauteOff ? t.services.unavailable : undefined}
          >
            <ul className="space-y-4">
              {beaute.map((b, i) => (
                <li
                  key={b.id}
                  {...rv(i, "row")}
                  className="flex items-baseline justify-between gap-6 text-lead"
                >
                  <span className={b.unavailable ? "text-muted" : undefined}>{t.serviceData[b.id].name}</span>
                  {!allBeauteOff && (
                    <span className="shrink-0 text-small text-muted">
                      {b.unavailable ? t.services.unavailable : `${b.price} ${currency}`}
                    </span>
                  )}
                </li>
              ))}
            </ul>
            <p {...rv(0)} className="text-small text-muted">
              {t.services.priceNote.replace("{currency}", currency)}
            </p>
          </Group>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .menu-name {
          font-family: var(--font-boska), Georgia, serif;
          font-weight: 500;
          font-size: clamp(1.6rem, 1.3rem + 1.1vw, 2.25rem);
          line-height: 1.05;
          letter-spacing: -0.01em;
        }
        .menu-pick { transition: background-color var(--t-hover) ease, color var(--t-hover) ease, transform 120ms var(--ease-out); }
        .menu-arrow { display: inline-block; transition: transform var(--t-hover) var(--ease-out); }
        @media (hover: hover) and (pointer: fine) {
          .menu-pick:hover { background: var(--accent); color: var(--accent-ink); }
          .menu-pick:hover .menu-arrow { color: var(--accent-ink); transform: translateX(4px); }
        }
        .menu-pick:active { transform: scale(0.97); }
      ` }} />
    </section>
  );
}

/** Un groupe de la carte : sa propre bande de couleur, un grand titre. */
function Group({
  id,
  title,
  tone,
  hint,
  columns = true,
  children,
}: {
  id: string;
  title: string;
  tone: Tone;
  hint?: string;
  /** Sur grand écran, les soins sur deux colonnes. */
  columns?: boolean;
  children: ReactNode;
}) {
  return (
    <div id={id} className={tone === "surface" ? "bg-surface" : "bg-bg"}>
      <div className="px-margin py-12 md:py-20 md:pl-[6vw] md:pr-[4vw]">
        <h3 {...rv(0)} className="display text-head leading-[0.95]">
          {title}
        </h3>
        {hint && (
          <p {...rv(1)} className="mt-4 text-body text-muted">
            {hint}
          </p>
        )}
        <div className={columns ? "mt-10 grid gap-12 xl:grid-cols-2 xl:gap-x-14" : "mt-10 space-y-12"}>
          {children}
        </div>
      </div>
    </div>
  );
}

function Price({ value }: { value: number }) {
  return (
    <span className="whitespace-nowrap text-lead tabular-nums">
      {value}
      <span className="ml-1.5 text-small text-muted">{currency}</span>
    </span>
  );
}

/** Hammam ou forfait : nom et prix, les étapes une par ligne, un bouton. */
function Formula({
  i,
  name,
  meta,
  price,
  includes,
  bookLabel,
  onBook,
  steps,
}: {
  i: number;
  name: string;
  meta?: string;
  price: number;
  includes: string;
  bookLabel: string;
  onBook: () => void;
  steps: readonly string[];
}) {
  const { t } = useI18n();
  return (
    <article {...rv(i, "row")}>
      <div className="flex items-baseline justify-between gap-6">
        <h4 className="menu-name">{name}</h4>
        <Price value={price} />
      </div>
      {meta && <p className="mt-2 text-body text-muted">{meta}</p>}
      <p className="mt-5 text-small text-muted">{includes}</p>
      <ul className="mt-2 list-disc space-y-0.5 pl-5 text-body marker:text-accent">
        {steps.map((id) => (
          <li
            key={id}
            className={unavailableStepIds.has(id) ? "line-through" : undefined}
            title={unavailableStepIds.has(id) ? t.services.unavailable : undefined}
          >
            {t.stepData[id]}
          </li>
        ))}
      </ul>
      <button
        type="button"
        onClick={onBook}
        aria-label={`${bookLabel} : ${name}, ${price} ${currency}`}
        className="button mt-6"
      >
        {bookLabel}
      </button>
    </article>
  );
}
