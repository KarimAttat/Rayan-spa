"use client";

import Section, { SectionHeader } from "./ui/Section";
import Reveal from "./ui/Reveal";
import { services, currency } from "@/data/services";
import { useI18n } from "@/lib/i18n";
import { ClockIcon } from "@/components/icons";

export default function Services() {
  const { t } = useI18n();
  return (
    <Section id="soins" className="bg-noir">
      <SectionHeader
        eyebrow={t.services.eyebrow}
        title={t.services.title}
        intro={t.services.intro}
      />

      <div className="mt-16 grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
        {services.map((s, i) => {
          const copy = t.serviceData[s.id];
          return (
            <Reveal as="article" key={s.id} delay={(i % 3) * 0.08}>
              <article className="group relative flex h-full flex-col overflow-hidden rounded-2xl bg-nuit p-6 ring-riad transition-all duration-500 hover:-translate-y-1.5 hover:shadow-riad hover:ring-1 hover:ring-or/40">
                {/* Contenu */}
                <div className="flex flex-1 flex-col">
                  {s.featured && (
                    <span className="self-start rounded-full bg-rouge px-2.5 py-0.5 text-[0.58rem] font-medium uppercase tracking-eyebrow text-ivoire mb-3">
                      {t.services.signature}
                    </span>
                  )}
                  <div className="flex items-start justify-between gap-3">
                    <h3 className="font-display text-2xl leading-tight text-creme">
                      {copy.name}
                    </h3>
                    <span className="shrink-0 font-display text-2xl text-or">
                      {s.price}
                      <span className="ml-1 text-xs font-body uppercase tracking-wide text-or/70">
                        {currency}
                      </span>
                    </span>
                  </div>

                  <p className="mt-3 flex-1 text-sm font-light leading-relaxed text-sable/85">
                    {copy.description}
                  </p>

                  <div className="mt-6 flex items-center justify-between border-t border-creme/10 pt-4">
                    <span className="inline-flex items-center gap-2 text-xs uppercase tracking-wide text-sable/70">
                      <ClockIcon width={15} height={15} />
                      {s.duration}
                    </span>
                    <a
                      href="#reservation"
                      className="group/link inline-flex items-center gap-1 text-xs uppercase tracking-wide text-or transition hover:text-or-clair"
                    >
                      {t.services.book.replace(/\s*→$/, "")}
                      <span className="transition-transform duration-300 group-hover/link:translate-x-1">
                        →
                      </span>
                    </a>
                  </div>
                </div>
              </article>
            </Reveal>
          );
        })}
      </div>

      <Reveal delay={0.1}>
        <p className="mt-12 text-center text-xs uppercase tracking-eyebrow text-sable/45">
          {t.services.priceNote.replace("{currency}", currency)}
        </p>
      </Reveal>
    </Section>
  );
}
