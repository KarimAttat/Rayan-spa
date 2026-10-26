"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
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
import { useStill } from "@/lib/use-still";

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
          <div className="px-margin pb-10 pt-14 md:pl-[6vw] md:pt-section">
            <h2 {...rv(0)} className="text-[clamp(3.5rem,2rem+7vw,9rem)] leading-[0.9]">
              {x.menu.title}
            </h2>
            <p {...rv(1)} className="mt-8 max-w-[38ch] text-lead">
              {t.services.intro}
            </p>
          </div>

          <MenuTabs groups={groups} label={x.menu.title} />

          <Group id="carte-massages" title={t.services.categoryMassages} tone="surface" hint={x.menu.tapHint}>
            {massages
              .filter((m) => !m.hidden)
              .map((m, i) => {
                const copy = t.serviceData[m.id];
                return (
                  <article key={m.id} {...rv(i, "row")} className="menu-card">
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
                            className="menu-pick flex w-full flex-col items-start px-4 py-3.5 text-left"
                          >
                            <span className="flex w-full items-baseline justify-between gap-3">
                              <span className="whitespace-nowrap text-body">{v.duration}</span>
                              <span aria-hidden="true" className="menu-arrow text-body leading-none text-accent">
                                →
                              </span>
                            </span>
                            <span className="mt-1">
                              <Price value={v.price} />
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
        /* Chaque soin sur sa propre fiche, d'un ton franchement différent de sa bande */
        .menu-card { padding: clamp(1.25rem, 1rem + 1.2vw, 2rem); border-radius: var(--radius-card); }
        .menu-pick { border-radius: var(--radius-inner); }
        [data-tone="surface"] .menu-card { background: var(--paper); }
        [data-tone="bg"] .menu-card { background: var(--surface); }
        [data-tone="surface"] .menu-pick { background: var(--surface); }
        [data-tone="bg"] .menu-pick { background: var(--paper); }
        .menu-pick { transition: background-color var(--t-hover) ease, color var(--t-hover) ease, transform 120ms var(--ease-out); }
        .menu-arrow { display: inline-block; transition: transform var(--t-hover) var(--ease-out); }
        @media (hover: hover) and (pointer: fine) {
          [data-tone] .menu-pick:hover { background: var(--accent); color: var(--accent-ink); }
          .menu-pick:hover .menu-arrow { color: var(--accent-ink); transform: translateX(4px); }
        }
        .menu-pick:active { transform: scale(0.97); }

        /* Onglets : la copie rouge est découpée sur l'onglet actif ; la découpe
           glisse d'un onglet à l'autre, couleurs comprises, sans fondu. */
        .menu-tabs-on { transition: clip-path 300ms var(--ease-in-out); }
        .menu-tab { transition: color var(--t-hover) ease; -webkit-tap-highlight-color: transparent; }
        @media (hover: hover) and (pointer: fine) { .menu-tab:hover { color: var(--accent); } }
        @media (prefers-reduced-motion: reduce) { .menu-tabs-on { transition: none; } }
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
    <div id={id} data-tone={tone} className={tone === "surface" ? "bg-surface" : "bg-bg"}>
      <div className="px-margin py-12 md:py-20 md:pl-[6vw] md:pr-[4vw]">
        <h3 {...rv(0)} className="display text-head leading-[0.95]">
          {title}
        </h3>
        {hint && (
          <p {...rv(1)} className="mt-4 text-body text-muted">
            {hint}
          </p>
        )}
        <div className={columns ? "mt-10 grid gap-4 md:gap-5 xl:grid-cols-2" : "mt-10 space-y-12"}>
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
    <article {...rv(i, "row")} className="menu-card">
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

/**
 * Les quatre groupes de la carte, toujours sous la main : la barre reste
 * collée sous l'en-tête pendant toute la carte et allume le groupe qu'on
 * est en train de lire. Un toucher amène au début du groupe.
 */
function MenuTabs({ groups, label }: { groups: { id: string; label: string }[]; label: string }) {
  const [active, setActive] = useState(0);
  const barRef = useRef<HTMLDivElement>(null);
  const still = useStill();
  const ids = groups.map((g) => g.id).join(" ");
  const n = groups.length;

  useEffect(() => {
    const els = ids
      .split(" ")
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => !!el);
    const update = () => {
      // Le groupe actif est le dernier dont le haut est passé sous la barre.
      const line = (barRef.current?.getBoundingClientRect().bottom ?? 120) + 32;
      let idx = 0;
      els.forEach((el, i) => {
        if (el.getBoundingClientRect().top <= line) idx = i;
      });
      setActive(idx);
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [ids]);

  const go = (i: number) => {
    const el = document.getElementById(groups[i].id);
    const bar = barRef.current;
    if (!el || !bar) return;
    // Le haut de la barre collée (= hauteur de l'en-tête) + sa propre hauteur.
    const offset = parseFloat(getComputedStyle(bar).top) + bar.offsetHeight;
    const top = el.getBoundingClientRect().top + window.scrollY - offset + 1;
    setActive(i);
    window.scrollTo({ top, behavior: still ? "auto" : "smooth" });
  };

  const inset = `inset(0 ${((n - 1 - active) * 100) / n}% 0 ${(active * 100) / n}% round 999px)`;

  return (
    <div
      ref={barRef}
      className="sticky top-16 z-30 bg-bg px-margin pb-4 pt-2 md:top-[4.5rem] md:pl-[6vw] md:pr-[4vw]"
    >
      <nav aria-label={label} className="relative">
        <ul className="grid rounded-full bg-surface" style={{ gridTemplateColumns: `repeat(${n}, minmax(0, 1fr))` }}>
          {groups.map((g, i) => (
            <li key={g.id}>
              <a
                href={`#${g.id}`}
                onClick={(e) => {
                  e.preventDefault();
                  go(i);
                }}
                aria-current={i === active ? "true" : undefined}
                className="menu-tab flex h-12 items-center justify-center px-1 text-center text-small md:text-body"
              >
                {g.label}
              </a>
            </li>
          ))}
        </ul>
        {/* La même rangée, en rouge, visible seulement sur l'onglet actif */}
        <ul
          aria-hidden="true"
          className="menu-tabs-on pointer-events-none absolute inset-0 grid rounded-full bg-accent text-accent-ink"
          style={{ gridTemplateColumns: `repeat(${n}, minmax(0, 1fr))`, clipPath: inset }}
        >
          {groups.map((g) => (
            <li key={g.id} className="flex items-center justify-center px-1 text-center text-small font-medium md:text-body">
              {g.label}
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}
