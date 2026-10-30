"use client";

import { Fragment, type ReactNode } from "react";
import Image from "next/image";
import {
  forfaits,
  massages,
  hammams,
  beaute,
  currency,
  unavailableStepIds,
} from "@/data/services";
import { useI18n } from "@/lib/i18n";
import { selectService } from "@/lib/booking-bus";
import { rv } from "./ui/Reveal";

/**
 * La carte, composée comme celle d'une grande maison : sur fond clair, un
 * titre par groupe (massages, hammams, forfaits, beauté) précédé de son
 * chiffre romain. Les massages en deux colonnes ; les hammams et la beauté
 * face à une photo qui prend la moitié de l'écran (à gauche, puis à droite) ;
 * les forfaits au centre. Chaque nom est relié à
 * son prix par un filet pointillé ; les étapes d'un hammam ou d'un forfait
 * tiennent sur une ligne discrète. Toucher une durée ou « Réserver »
 * présélectionne le soin dans le formulaire.
 */
export default function Services() {
  const { t, x } = useI18n();

  const groups = [
    { id: "carte-massages", label: x.menu.jump.massages },
    { id: "carte-hammams", label: x.menu.jump.hammams },
    { id: "carte-forfaits", label: x.menu.jump.forfaits },
    { id: "carte-beaute", label: x.menu.jump.beaute },
  ];
  const allBeauteOff = beaute.every((b) => b.unavailable);

  return (
    <section id="carte" className="relative bg-bg">
      {/* En-tête court : le titre et les quatre groupes, puis tout de suite la carte */}
      <div className="wrap pt-16 md:pt-20">
        <div className="mx-auto flex max-w-[80rem] flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <h2 {...rv(0)} className="text-head leading-[0.95]">
          {x.menu.title}
        </h2>
        <nav {...rv(1)} aria-label={x.menu.title}>
          <ul className="flex flex-wrap items-center gap-x-8 gap-y-3 md:gap-x-10">
            {groups.map((g) => (
              <li key={g.id}>
                <a href={`#${g.id}`} className="eyebrow menu-jump">
                  {g.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        </div>
      </div>

      <Group id="carte-massages" n="I" title={t.services.categoryMassages} hint={x.menu.tapHint}>
        {massages
          .filter((m) => !m.hidden)
          .map((m, i) => {
            const copy = t.serviceData[m.id];
            return (
              <li key={m.id} {...rv(i % 2, "row")}>
                <h4 className="menu-name">{copy.name}</h4>
                {copy.description && <p className="mt-2 max-w-[44ch] text-body text-muted">{copy.description}</p>}
                <ul className="mt-4">
                  {m.variants.map((v) => (
                    <li key={v.duration}>
                      <button
                        type="button"
                        onClick={() => selectService(`${copy.name} (${v.duration})`)}
                        aria-label={`${x.menu.bookItem} : ${copy.name}, ${v.duration}, ${v.price} ${currency}`}
                        className="menu-pick flex w-full items-baseline gap-4 py-2 text-left"
                      >
                        <span className="whitespace-nowrap text-body">{v.duration}</span>
                        <span aria-hidden="true" className="menu-leader" />
                        <Price value={v.price} />
                        <span aria-hidden="true" className="menu-arrow text-body">
                          →
                        </span>
                      </button>
                    </li>
                  ))}
                </ul>
              </li>
            );
          })}
      </Group>

      <Split id="carte-hammams" n="II" title={t.services.categoryHammams} img="/images/hammam-gommage.jpg" side="left">
        {hammams.map((h, i) => {
          const name = t.serviceData[h.id].name;
          return (
            <Formula
              key={h.id}
              i={i}
              name={name}
              price={h.price}
              bookLabel={x.menu.bookItem}
              onBook={() => selectService(name)}
              steps={h.stepIds}
            />
          );
        })}
      </Split>

      <Group id="carte-forfaits" n="III" title={t.services.categoryForfaits} centered>
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
                bookLabel={x.menu.bookItem}
                onBook={() => selectService(copy.name)}
                steps={f.stepIds}
                centered
              />
            );
          })}
      </Group>

      <Split
        id="carte-beaute"
        n="IV"
        title={t.services.categoryBeaute}
        hint={allBeauteOff ? t.services.unavailable : undefined}
        img="/images/massage-pieds.jpg"
        focus="60% 50%"
        side="right"
      >
        {beaute.map((b, i) => (
          <li key={b.id} {...rv(i % 2, "row")} className="flex items-baseline gap-4">
            <span className={["menu-name", b.unavailable ? "text-muted" : ""].join(" ")}>
              {t.serviceData[b.id].name}
            </span>
            {!allBeauteOff && (
              <>
                <span aria-hidden="true" className="menu-leader" />
                {b.unavailable ? (
                  <span className="shrink-0 text-small text-muted">{t.services.unavailable}</span>
                ) : (
                  <Price value={b.price} />
                )}
              </>
            )}
          </li>
        ))}
      </Split>

      <p className="wrap py-12 text-center text-small text-muted md:pb-20">
        {t.services.priceNote.replace("{currency}", currency)}
      </p>

      <style dangerouslySetInnerHTML={{ __html: `
        /* Le nom de chaque soin : la serif du titre, à taille de lecture */
        .menu-name {
          font-family: var(--font-boska), Georgia, serif;
          font-weight: 500;
          font-size: clamp(1.6rem, 1.3rem + 1vw, 2.1rem);
          line-height: 1.1;
          letter-spacing: -0.01em;
        }
        /* Le filet pointillé qui relie un nom (ou une durée) à son prix */
        .menu-leader {
          flex: 1 1 auto;
          min-width: 1.5rem;
          border-bottom: 1px dotted color-mix(in srgb, var(--ink) 35%, transparent); /* taste-skill-ignore: points de conduite */
          transform: translateY(-0.3em);
        }
        .menu-jump { text-decoration: underline; text-decoration-color: transparent; text-underline-offset: 0.5em; transition: text-decoration-color var(--t-hover) ease; }
        .menu-arrow { display: inline-block; opacity: 0; transform: translateX(-6px); transition: opacity var(--t-hover) ease, transform var(--t-hover) var(--ease-out); }
        .menu-pick { -webkit-tap-highlight-color: transparent; }
        .menu-pick:focus-visible .menu-arrow { opacity: 1; transform: none; }
        @media (hover: hover) and (pointer: fine) {
          .menu-jump:hover { text-decoration-color: currentColor; }
          .menu-pick:hover .menu-arrow { opacity: 1; transform: none; }
          .menu-pick:hover .menu-leader { border-bottom-color: var(--ink); }
          .menu-book:hover .menu-arrow { opacity: 1; transform: none; }
        }
        .menu-pick:active { opacity: 0.6; }
      ` }} />
    </section>
  );
}

/** Un groupe de la carte : chiffre romain, grand titre centré, soins en deux colonnes (ou au centre). */
function Group({
  id,
  n,
  title,
  hint,
  centered = false,
  children,
}: {
  id: string;
  n: string;
  title: string;
  hint?: string;
  centered?: boolean;
  children: ReactNode;
}) {
  return (
    <div id={id} className="wrap scroll-mt-8 py-16 md:py-24">
      <div className="mx-auto max-w-[80rem]">
        <GroupHead n={n} title={title} hint={hint} className="items-center text-center" />
        <ul
          className={
            centered
              ? "mx-auto mt-10 max-w-[40rem] space-y-14 text-center md:mt-14"
              : "mt-10 grid gap-x-20 gap-y-10 md:mt-14 md:grid-cols-2 md:gap-y-12"
          }
        >
          {children}
        </ul>
      </div>
    </div>
  );
}

function GroupHead({ n, title, hint, className = "" }: { n: string; title: string; hint?: string; className?: string }) {
  return (
    <div className={["flex flex-col", className].join(" ")}>
      <span {...rv(0)} className="display text-lead text-muted">
        {n}
      </span>
      <h3 {...rv(1)} className="mt-2 text-head leading-[0.95]">
        {title}
      </h3>
      {hint && (
        <p {...rv(2)} className="mt-3 text-small text-muted">
          {hint}
        </p>
      )}
    </div>
  );
}

/**
 * Un groupe face à une photo : la photo prend la moitié de l'écran, bord à
 * bord, sur toute la hauteur ; la liste occupe l'autre moitié.
 */
function Split({
  id,
  n,
  title,
  hint,
  img,
  focus = "50% 50%",
  side,
  children,
}: {
  id: string;
  n: string;
  title: string;
  hint?: string;
  img: string;
  focus?: string;
  side: "left" | "right";
  children: ReactNode;
}) {
  return (
    <div id={id} className="grid scroll-mt-8 md:min-h-[100svh] md:grid-cols-2">
      <div
        {...rv(0, "mask")}
        className={["relative h-[62svh] md:h-auto", side === "right" ? "md:order-2" : ""].join(" ")}
      >
        <div className="absolute inset-0">
          <Image src={img} alt="" fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover" style={{ objectPosition: focus }} />
        </div>
      </div>
      <div className="flex flex-col justify-center px-margin py-16 md:px-[6vw] md:py-24">
        <GroupHead n={n} title={title} hint={hint} />
        <ul className="mt-10 space-y-10 md:mt-12">{children}</ul>
      </div>
    </div>
  );
}

function Price({ value }: { value: number }) {
  return (
    <span className="shrink-0 whitespace-nowrap text-body tabular-nums">
      {value}
      <span className="ml-1.5 text-small text-muted">{currency}</span>
    </span>
  );
}

/** Hammam ou forfait : nom, filet, prix ; les étapes sur une ligne ; « Réserver ». */
function Formula({
  i,
  name,
  meta,
  price,
  bookLabel,
  onBook,
  steps,
  centered = false,
}: {
  i: number;
  name: string;
  meta?: string;
  price: number;
  bookLabel: string;
  onBook: () => void;
  steps: readonly string[];
  centered?: boolean;
}) {
  const { t } = useI18n();
  return (
    <li {...rv(i % 2, "row")}>
      {centered ? (
        <>
          <h4 className="menu-name">{name}</h4>
          <p className="mt-2">
            <Price value={price} />
          </p>
        </>
      ) : (
        <div className="flex items-baseline gap-4">
          <h4 className="menu-name">{name}</h4>
          <span aria-hidden="true" className="menu-leader" />
          <Price value={price} />
        </div>
      )}
      {meta && <p className="mt-1 text-small text-muted">{meta}</p>}
      <p className={["mt-3 max-w-[52ch] text-body text-muted", centered ? "mx-auto" : ""].join(" ")}>
        {steps.map((id, k) => (
          <Fragment key={id}>
            {k > 0 && <span aria-hidden="true"> · </span>}
            <span
              className={unavailableStepIds.has(id) ? "line-through" : undefined}
              title={unavailableStepIds.has(id) ? t.services.unavailable : undefined}
            >
              {t.stepData[id]}
            </span>
          </Fragment>
        ))}
      </p>
      <button
        type="button"
        onClick={onBook}
        aria-label={`${bookLabel} : ${name}, ${price} ${currency}`}
        className="menu-book eyebrow link mt-5 inline-flex items-center gap-3"
      >
        {bookLabel}
        <span aria-hidden="true" className="menu-arrow">
          →
        </span>
      </button>
    </li>
  );
}
