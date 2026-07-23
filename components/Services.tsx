"use client";

import type { ReactNode } from "react";
import Section, { SectionHeader } from "./ui/Section";
import Reveal from "./ui/Reveal";
import ZelligeDivider from "./ui/ZelligeDivider";
import MediaFrame from "./ui/MediaFrame";
import { forfaits, massages, hammams, beaute, currency } from "@/data/services";
import { siteConfig } from "@/data/site-config";
import { useI18n } from "@/lib/i18n";

export default function Services() {
  const { t } = useI18n();

  return (
    <Section id="soins" className="bg-noir">
      <SectionHeader
        eyebrow={t.services.eyebrow}
        title={t.services.title}
        intro={t.services.intro}
      />

      {/* ---------- Forfaits signature ---------- */}
      <div className="mt-16">
        <Reveal>
          <span className="eyebrow eyebrow--left">
            {t.services.categoryForfaits}
          </span>
        </Reveal>

        <div className="mt-8 grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
          {forfaits.map((f, i) => {
            const copy = t.serviceData[f.id];
            return (
              <Reveal as="article" key={f.id} delay={(i % 3) * 0.08}>
                <article className="group relative flex h-full flex-col overflow-hidden rounded-2xl bg-nuit p-6 ring-riad transition-all duration-500 hover:-translate-y-1.5 hover:shadow-riad hover:ring-1 hover:ring-or/40">
                  {f.featured && (
                    <span className="mb-3 self-start rounded-full bg-rouge px-2.5 py-0.5 text-[0.58rem] font-medium uppercase tracking-eyebrow text-ivoire">
                      {t.services.signature}
                    </span>
                  )}

                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h3 className="font-display text-2xl leading-tight text-creme">
                        {copy.name}
                      </h3>
                      {copy.meta && (
                        <span className="mt-1 inline-block text-[0.68rem] uppercase tracking-wide text-or/70">
                          {copy.meta}
                        </span>
                      )}
                    </div>
                    <span className="shrink-0 font-display text-2xl text-or">
                      {f.price}
                      <span className="ml-1 text-xs font-body uppercase tracking-wide text-or/70">
                        {currency}
                      </span>
                    </span>
                  </div>

                  <p className="mt-3 text-sm font-light leading-relaxed text-sable/85">
                    {copy.description}
                  </p>

                  <div className="mt-5 flex flex-1 flex-col justify-end gap-2 border-t border-creme/10 pt-4">
                    <span className="text-[0.65rem] uppercase tracking-eyebrow text-sable/45">
                      {t.services.includes}
                    </span>
                    <p className="text-[0.78rem] leading-relaxed text-sable/75">
                      {f.stepIds.map((id) => t.stepData[id]).join(" · ")}
                    </p>
                  </div>

                  <a
                    href="#reservation"
                    className="group/link mt-5 inline-flex items-center gap-1 self-start text-xs uppercase tracking-wide text-or transition hover:text-or-clair"
                  >
                    {t.services.book}
                  </a>
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>

      <ZelligeDivider className="my-16 sm:my-20" />

      {/* ---------- Menu à la carte ---------- */}
      <div className="grid gap-14 md:grid-cols-[1.2fr_1fr_1fr] md:gap-10">
        <div className="grid gap-7 sm:grid-cols-[190px_1fr] sm:gap-7">
          <Reveal className="h-full">
            <MediaFrame
              src={siteConfig.servicesImage.src}
              file={siteConfig.servicesImage.file}
              alt={siteConfig.servicesImage.alt}
              className="aspect-[3/4] w-full sm:h-full sm:aspect-auto"
              sizes="(max-width: 640px) 60vw, 190px"
            />
          </Reveal>
          <MenuColumn title={t.services.categoryMassages}>
            {massages.map((m, i) => (
              <Reveal key={m.id} delay={i * 0.06} y={14}>
                <MassageRow
                  name={t.serviceData[m.id].name}
                  variants={m.variants}
                />
              </Reveal>
            ))}
          </MenuColumn>
        </div>

        <MenuColumn title={t.services.categoryHammams}>
          {hammams.map((h, i) => (
            <Reveal key={h.id} delay={i * 0.06} y={14}>
              <PriceRow
                name={t.serviceData[h.id].name}
                price={h.price}
                caption={h.stepIds.map((id) => t.stepData[id]).join(" · ")}
              />
            </Reveal>
          ))}
        </MenuColumn>

        <MenuColumn title={t.services.categoryBeaute}>
          {beaute.map((b, i) => (
            <Reveal key={b.id} delay={i * 0.06} y={14}>
              <PriceRow name={t.serviceData[b.id].name} price={b.price} />
            </Reveal>
          ))}
        </MenuColumn>
      </div>

      <Reveal delay={0.1}>
        <p className="mt-16 text-center text-xs uppercase tracking-eyebrow text-sable/45">
          {t.services.priceNote.replace("{currency}", currency)}
        </p>
      </Reveal>
    </Section>
  );
}

/* ---------- Sous-composants de la carte à l'unité ---------- */

function MenuColumn({ title, children }: { title: string; children: ReactNode }) {
  return (
    <Reveal>
      <div>
        <h3 className="font-display text-xl text-creme">{title}</h3>
        <div className="mt-6 space-y-5 border-t border-creme/10 pt-6">
          {children}
        </div>
      </div>
    </Reveal>
  );
}

/** Ligne nom .... prix, avec filet en pointillés (esprit carte de soins). */
function PriceRow({
  name,
  price,
  caption,
}: {
  name: string;
  price: number;
  caption?: string;
}) {
  return (
    <div className="group/row transition-transform duration-300 ease-riad hover:translate-x-1.5">
      <div className="flex items-baseline gap-3">
        <span className="shrink-0 font-display text-[1.05rem] leading-snug text-creme transition-colors duration-300 group-hover/row:text-rouge">
          {name}
        </span>
        <span aria-hidden className="menu-leader" />
        <span className="shrink-0 font-display text-[1.05rem] text-or transition-colors duration-300 group-hover/row:text-rouge">
          {price}
          <span className="ml-1 text-[0.6rem] font-body uppercase tracking-wide text-or/70">
            {currency}
          </span>
        </span>
      </div>
      {caption && (
        <p className="mt-1 text-xs font-light leading-relaxed text-sable/65">
          {caption}
        </p>
      )}
    </div>
  );
}

/** Ligne massage : un nom, plusieurs couples durée / prix (variants). */
function MassageRow({
  name,
  variants,
}: {
  name: string;
  variants: { duration: string; price: number }[];
}) {
  return (
    <div className="group/row transition-transform duration-300 ease-riad hover:translate-x-1.5">
      <span className="font-display text-[1.05rem] leading-snug text-creme transition-colors duration-300 group-hover/row:text-rouge">
        {name}
      </span>
      <div className="mt-2 flex flex-wrap gap-x-5 gap-y-1.5">
        {variants.map((v) => (
          <span
            key={v.duration}
            className="flex items-baseline gap-1.5 transition-transform duration-300 ease-riad hover:scale-110"
          >
            <span className="text-[0.68rem] uppercase tracking-wide text-sable/55">
              {v.duration}
            </span>
            <span className="font-display text-sm text-or">{v.price}</span>
          </span>
        ))}
      </div>
    </div>
  );
}
