"use client";

import { siteConfig } from "@/data/site-config";
import { useI18n } from "@/lib/i18n";
import { rv } from "./ui/Reveal";
import { ParallaxImage, TiltIn, WordsReveal } from "./ui/motion";

/**
 * La maison : un collage asymétrique — le salon presque plein écran,
 * collé au bord gauche, et le rooftop plus petit, décalé vers le bas,
 * qui arrive incliné en profondeur. Puis le texte, qui s'allume mot à
 * mot, et les faits pratiques dans une colonne étroite.
 */
export default function About() {
  const { t, x } = useI18n();
  const { contact } = siteConfig;

  const facts = [
    { k: x.about.facts.address, v: [contact.address.district, contact.address.street, contact.address.city] },
    { k: x.about.facts.hours, v: [`${t.contact.days[0]}`, contact.hours[0].time] },
    { k: x.about.facts.booking, v: [x.about.bookingValue] },
  ];

  return (
    <section id="a-propos" className="relative overflow-hidden bg-bg pb-section">
      <h2 className="sr-only">{t.about.title}</h2>

      {/* ---------- Le collage ---------- */}
      <div className="relative grid grid-cols-12">
        <ParallaxImage
          src="/images/ingresso1.jpg"
          alt={x.places.alts[2]}
          sizes="(max-width: 768px) 92vw, 62vw"
          focus="50% 55%"
          className="col-span-11 h-[78svh] md:col-span-7 md:h-[96svh]"
        />
        <TiltIn className="col-span-7 col-start-6 -mt-[26svh] h-[52svh] md:col-span-4 md:col-start-8 md:mt-[34svh] md:h-[70svh]">
          <ParallaxImage
            src="/images/rooftop1.jpg"
            alt={x.places.alts[0]}
            sizes="(max-width: 768px) 58vw, 34vw"
            drift={14}
            className="h-full w-full"
          />
        </TiltIn>
      </div>

      {/* ---------- Le texte ---------- */}
      <div className="wrap mt-[14svh] grid gap-14 md:grid-cols-12 md:gap-x-8">
        <WordsReveal
          text={`${t.about.p1} ${t.about.p2}`}
          className="display text-[clamp(1.6rem,1.1rem+1.6vw,2.6rem)] leading-[1.18] tracking-[-0.01em] md:col-span-9 md:col-start-4"
        />

        <dl className="grid grid-cols-2 gap-x-6 gap-y-6 md:col-span-3 md:row-start-1 md:flex md:flex-col">
          {facts.map((f, i) => (
            <div key={f.k} {...rv(i)}>
              <dt className="text-small font-medium text-accent">{f.k}</dt>
              {f.v.map((line) => (
                <dd key={line} className="text-body">
                  {line}
                </dd>
              ))}
            </div>
          ))}
        </dl>

        {/* La maison, les lieux */}
        <div className="grid gap-12 md:col-span-9 md:col-start-4 md:mt-10 md:grid-cols-2">
          <ul className="space-y-6">
            {t.about.values.map((v, i) => (
              <li key={v.k} {...rv(i, "row")}>
                <span className="display block text-lead">{v.k}</span>
                <span className="block text-body text-muted">{v.v}</span>
              </li>
            ))}
          </ul>
          <div>
            <p {...rv(0, "row")} className="text-small font-medium text-accent">
              {x.about.places}
            </p>
            <ul className="mt-3 space-y-2 text-lead">
              {x.about.placeList.map((pl, i) => (
                <li key={pl} {...rv(i + 1, "row")}>
                  <a href="#lieux" className="link display">
                    {pl}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
