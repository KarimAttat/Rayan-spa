import Section, { SectionHeader } from "./ui/Section";
import Reveal from "./ui/Reveal";
import { testimonials } from "@/data/testimonials";
import { StarIcon } from "@/components/icons";

export default function Testimonials() {
  return (
    <Section id="avis" className="bg-noir">
      <SectionHeader
        eyebrow="Témoignages"
        title="Ils ont vécu l’expérience"
        intro="La sérénité de Rayan SPA racontée par celles et ceux qui en ont franchi le seuil."
      />

      <div className="mt-16 grid gap-6 md:grid-cols-2">
        {testimonials.map((t, i) => (
          <Reveal as="article" key={t.author} delay={(i % 2) * 0.1}>
            <article className="flex h-full flex-col rounded-2xl bg-nuit p-7 ring-riad sm:p-8">
              <div className="flex gap-1 text-or">
                {Array.from({ length: t.rating }).map((_, j) => (
                  <StarIcon key={j} width={16} height={16} />
                ))}
              </div>
              <p className="mt-5 flex-1 font-display text-xl leading-relaxed text-creme/90">
                «&nbsp;{t.quote}&nbsp;»
              </p>
              <footer className="mt-6 border-t border-creme/10 pt-4">
                <p className="text-sm font-medium text-or">{t.author}</p>
                <p className="text-xs uppercase tracking-wide text-sable/55">
                  {t.origin}
                </p>
              </footer>
            </article>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
