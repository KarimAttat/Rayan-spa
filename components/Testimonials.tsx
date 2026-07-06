"use client";

import Section, { SectionHeader } from "./ui/Section";
import Reveal from "./ui/Reveal";
import { testimonials } from "@/data/testimonials";
import { useI18n } from "@/lib/i18n";
import { StarIcon } from "@/components/icons";

export default function Testimonials() {
  const { t } = useI18n();
  return (
    <Section id="avis" className="bg-noir">
      <SectionHeader
        eyebrow={t.testimonials.eyebrow}
        title={t.testimonials.title}
        intro={t.testimonials.intro}
      />

      <div className="mt-16 grid gap-6 md:grid-cols-2">
        {testimonials.map((item, i) => {
          const copy = t.testimonials.items[i] ?? {
            quote: item.quote,
            origin: item.origin,
          };
          return (
            <Reveal as="article" key={item.author} delay={(i % 2) * 0.1}>
              <article className="relative flex h-full flex-col overflow-hidden rounded-2xl bg-nuit p-7 ring-riad transition-all duration-500 hover:-translate-y-1 hover:shadow-riad sm:p-8">
                {/* Guillemet décoratif */}
                <span
                  aria-hidden
                  className="pointer-events-none absolute -right-2 -top-5 select-none font-display text-[7rem] leading-none text-or/10"
                >
                  &rdquo;
                </span>
                <div className="flex gap-1 text-or">
                  {Array.from({ length: item.rating }).map((_, j) => (
                    <StarIcon key={j} width={16} height={16} />
                  ))}
                </div>
                <p className="mt-5 flex-1 font-display text-xl leading-relaxed text-creme/90">
                  «&nbsp;{copy.quote}&nbsp;»
                </p>
                <footer className="mt-6 border-t border-creme/10 pt-4">
                  <p className="text-sm font-medium text-or">{item.author}</p>
                  <p className="text-xs uppercase tracking-wide text-sable/55">
                    {copy.origin}
                  </p>
                </footer>
              </article>
            </Reveal>
          );
        })}
      </div>
    </Section>
  );
}
