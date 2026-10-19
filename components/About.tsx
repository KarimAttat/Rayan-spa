"use client";

import { siteConfig } from "@/data/site-config";
import { useI18n } from "@/lib/i18n";
import { rv } from "./ui/Reveal";
import { ParallaxImage, TiltIn, WordsReveal } from "./ui/motion";

/**
 * La maison : le rooftop presque plein écran, décalé à droite et collé
 * au bord, qui arrive incliné en profondeur. Puis le texte, qui s'allume
 * mot à mot. Les faits pratiques occupent le vide à gauche de la photo.
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

      {/* ---------- La photo : décalée à droite, collée au bord ---------- */}
      <div className="relative grid grid-cols-12 items-end">
        <TiltIn
          from={16}
          className="col-span-11 col-start-2 h-[78svh] md:col-span-8 md:col-start-5 md:h-[96svh]"
        >
          <ParallaxImage
            src="/images/rooftop1.jpg"
            alt={x.places.alts[0]}
            sizes="(max-width: 768px) 92vw, 66vw"
            drift={10}
            className="h-full w-full"
          />
        </TiltIn>
        <dl className="wrap col-span-12 mt-12 grid grid-cols-2 gap-x-6 gap-y-6 md:col-span-4 md:col-start-1 md:row-start-1 md:mt-0 md:flex md:flex-col md:pb-[6svh]">
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
      </div>

      {/* ---------- Le texte ---------- */}
      <div className="wrap mt-[14svh] grid gap-14 md:grid-cols-12 md:gap-x-8">
        <WordsReveal
          text={`${t.about.p1} ${t.about.p2}`}
          className="display text-[clamp(1.6rem,1.1rem+1.6vw,2.6rem)] leading-[1.18] tracking-[-0.01em] md:col-span-9 md:col-start-4"
        />


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
