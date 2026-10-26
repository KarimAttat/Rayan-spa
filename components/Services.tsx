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
 * La carte, composée comme un vrai menu de soins : une photo pleine
 * hauteur collée au bord gauche (elle reste pendant la lecture et se
 * pose en zoom), les groupes à droite : d'abord les massages (les plus
 * demandés), puis les hammams, puis les forfaits. Nom à gauche, prix à droite,
 * la devise une seule fois par groupe. Chaque soin se réserve d'un clic :
 * il est présélectionné dans le formulaire de réservation.
 */
export default function Services() {
  const { t, x } = useI18n();
  const { menuImage } = siteConfig;
  const steps = (ids: readonly string[]) =>
    ids.map((id, i) => (
      <span key={id}>
        {i > 0 && " · "}
        <span
          className={unavailableStepIds.has(id) ? "line-through" : undefined}
          title={unavailableStepIds.has(id) ? t.services.unavailable : undefined}
        >
          {t.stepData[id]}
        </span>
      </span>
    ));

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

        <div className="wrap py-section md:col-span-7 md:pl-[6vw]">
          <h2 {...rv(0)} className="text-[clamp(3.5rem,2rem+7vw,9rem)] leading-[0.9]">
            {x.menu.title}
          </h2>
          <p {...rv(1)} className="mt-8 max-w-[38ch] text-lead">
            {t.services.intro}
          </p>

          <div className="mt-20 grid gap-16 xl:grid-cols-2 xl:gap-x-14">
          <div className="xl:col-start-1 xl:row-start-1">
            <Group title={t.services.categoryMassages}>
              {massages
                .filter((m) => !m.hidden)
                .map((m, i) => {
                  const copy = t.serviceData[m.id];
                  return (
                    <div key={m.id} {...rv(i, "row")}>
                      <p className="text-body">{copy.name}</p>
                      {copy.description && (
                        <p className="mt-1 max-w-[36ch] text-small text-muted">
                          {copy.description}
                        </p>
                      )}
                      <ul className="mt-2">
                        {m.variants.map((v) => (
                          <li key={v.duration}>
                            <button
                              type="button"
                              onClick={() => selectService(`${copy.name} (${v.duration})`)}
                              aria-label={`${x.menu.bookItem} : ${copy.name}, ${v.duration}, ${v.price} ${currency}`}
                              className="menu-row flex w-full items-baseline justify-between gap-6 py-1 text-left text-body tabular-nums"
                            >
                              <span className="text-muted">{v.duration}</span>
                              <span className="flex items-baseline gap-4">
                                <span>{v.price}</span>
                                <BookHint label={x.menu.bookItem} />
                              </span>
                            </button>
                          </li>
                        ))}
                      </ul>
                    </div>
                  );
                })}
            </Group>

          </div>

          <div className="space-y-16 xl:col-start-2 xl:row-span-2 xl:row-start-1">
            <Group title={t.services.categoryHammams}>
              {hammams.map((h, i) => {
                const name = t.serviceData[h.id].name;
                return (
                  <Item
                    key={h.id}
                    i={i}
                    name={name}
                    price={h.price}
                    value={name}
                    bookLabel={x.menu.bookItem}
                  >
                    {steps(h.stepIds)}
                  </Item>
                );
              })}
            </Group>

            <Group title={t.services.categoryForfaits}>
              {forfaits
                .filter((f) => !f.hidden)
                .map((f, i) => {
                  const copy = t.serviceData[f.id];
                  return (
                    <Item
                      key={f.id}
                      i={i}
                      name={copy.name}
                      meta={copy.meta}
                      price={f.price}
                      value={copy.name}
                      bookLabel={x.menu.bookItem}
                    >
                      {steps(f.stepIds)}
                    </Item>
                  );
                })}
            </Group>
          </div>

          <div className="xl:col-start-1 xl:row-start-2">
            <Group title={t.services.categoryBeaute} currencyShown={false}>
              {beaute.map((b, i) => (
                <div
                  key={b.id}
                  {...rv(i, "row")}
                  className="flex items-baseline justify-between gap-6 text-body"
                >
                  <span className={b.unavailable ? "text-muted" : undefined}>
                    {t.serviceData[b.id].name}
                  </span>
                  <span className="text-small text-muted">
                    {b.unavailable ? t.services.unavailable : `${b.price} ${currency}`}
                  </span>
                </div>
              ))}
            </Group>
          </div>

          <p {...rv(0)} className="text-small text-muted xl:col-span-2">
            {t.services.priceNote.replace("{currency}", currency)}
          </p>
          </div>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .menu-row { transition: color var(--t-hover) ease; }
        @media (hover: hover) and (pointer: fine) {
          .menu-row:hover .text-muted, .menu-row:hover { color: var(--accent); }
          .menu-row:hover .menu-name { text-decoration-color: currentColor; }
        }
        .menu-row:active { transform: translateX(2px); }
        .menu-book { display: inline-block; transition: transform var(--t-hover) var(--ease-out); }
        @media (hover: hover) and (pointer: fine) { .menu-row:hover .menu-book { transform: translateX(4px); } }
      ` }} />
    </section>
  );
}

function Group({
  title,
  children,
  currencyShown = true,
}: {
  title: string;
  children: ReactNode;
  currencyShown?: boolean;
}) {
  return (
    <div>
      <div {...rv(0)} className="flex items-baseline justify-between gap-6">
        <h3 className="text-lead">{title}</h3>
        {currencyShown && <span className="text-small text-muted">{currency}</span>}
      </div>
      <div className="mt-6 space-y-6">{children}</div>
    </div>
  );
}

/** « Réserver → » visible sur chaque ligne : la carte se lit comme un bon de commande. */
function BookHint({ label }: { label: string }) {
  return (
    <span aria-hidden="true" className="menu-book whitespace-nowrap text-small font-medium text-accent">
      {label}&nbsp;→
    </span>
  );
}

function Item({
  i,
  name,
  meta,
  price,
  value,
  bookLabel,
  children,
}: {
  i: number;
  name: string;
  meta?: string;
  price: number;
  value: string;
  bookLabel: string;
  children?: ReactNode;
}) {
  return (
    <div {...rv(i, "row")}>
      <button
        type="button"
        onClick={() => selectService(value)}
        aria-label={`${bookLabel} : ${name}, ${price} ${currency}`}
        className="menu-row flex w-full items-baseline justify-between gap-6 text-left text-body tabular-nums"
      >
        <span className="menu-name link">
          {name}
          {meta && <span className="text-muted"> · {meta}</span>}
        </span>
        <span className="flex shrink-0 items-baseline gap-4">
          <span>{price}</span>
          <BookHint label={bookLabel} />
        </span>
      </button>
      {children && (
        <p className="mt-1 max-w-[40ch] text-small text-muted">{children}</p>
      )}
    </div>
  );
}
