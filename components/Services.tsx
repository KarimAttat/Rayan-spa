import Section, { SectionHeader } from "./ui/Section";
import Reveal from "./ui/Reveal";
import MediaFrame from "./ui/MediaFrame";
import { services, currency } from "@/data/services";
import { ClockIcon } from "@/components/icons";

export default function Services() {
  return (
    <Section id="soins" className="bg-noir">
      <SectionHeader
        eyebrow="Soins & Massages"
        title="Nos rituels de bien-être"
        intro="Une carte de soins inspirée des traditions marocaines, des huiles précieuses de l’Atlas au savon noir des hammams ancestraux."
      />

      <div className="mt-16 grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
        {services.map((s, i) => (
          <Reveal as="article" key={s.id} delay={(i % 3) * 0.08}>
            <article className="group flex h-full flex-col overflow-hidden rounded-2xl bg-nuit ring-riad transition-all duration-500 hover:-translate-y-1.5 hover:shadow-riad">
              {/* Média */}
              <div className="relative overflow-hidden">
                <MediaFrame
                  src={s.image.src}
                  file={s.image.file}
                  alt={s.image.alt}
                  arch={false}
                  width={800}
                  height={600}
                  className="aspect-[5/4] w-full transition-transform duration-700 group-hover:scale-[1.04]"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
                {s.featured && (
                  <span className="absolute left-4 top-4 rounded-full bg-rouge px-3 py-1 text-[0.62rem] font-medium uppercase tracking-eyebrow text-ivoire">
                    Signature
                  </span>
                )}
              </div>

              {/* Contenu */}
              <div className="flex flex-1 flex-col p-6">
                <div className="flex items-start justify-between gap-3">
                  <h3 className="font-display text-2xl leading-tight text-creme">
                    {s.name}
                  </h3>
                  <span className="shrink-0 font-display text-2xl text-or">
                    {s.price}
                    <span className="ml-1 text-xs font-body uppercase tracking-wide text-or/70">
                      {currency}
                    </span>
                  </span>
                </div>

                <p className="mt-3 flex-1 text-sm font-light leading-relaxed text-sable/85">
                  {s.description}
                </p>

                <div className="mt-6 flex items-center justify-between border-t border-creme/10 pt-4">
                  <span className="inline-flex items-center gap-2 text-xs uppercase tracking-wide text-sable/70">
                    <ClockIcon width={15} height={15} />
                    {s.duration}
                  </span>
                  <a
                    href="#reservation"
                    className="text-xs uppercase tracking-wide text-or transition hover:text-or-clair"
                  >
                    Réserver →
                  </a>
                </div>
              </div>
            </article>
          </Reveal>
        ))}
      </div>

      <Reveal delay={0.1}>
        <p className="mt-12 text-center text-xs uppercase tracking-eyebrow text-sable/45">
          Tarifs en {currency} · à titre indicatif
        </p>
      </Reveal>
    </Section>
  );
}
