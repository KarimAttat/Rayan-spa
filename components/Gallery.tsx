"use client";

import { gallery } from "@/data/gallery";
import { useI18n } from "@/lib/i18n";
import { rv } from "./ui/Reveal";
import { FullBleed } from "./ui/PhotoBands";

/**
 * Les lieux : uniquement les photos du spa lui-même, chacune en plein écran,
 * l'une après l'autre, avec sa légende — comme le reste de la page.
 */
export default function Gallery() {
  const { x } = useI18n();
  const items = gallery.map((g, i) => ({ ...g, alt: x.places.alts[i] ?? "" }));

  return (
    <section id="lieux" aria-labelledby="lieux-title" className="bg-bg">
      <div className="wrap flex flex-col gap-4 py-20 md:flex-row md:items-end md:justify-between md:py-28">
        <h2 id="lieux-title" {...rv(0)} className="text-[clamp(3rem,1.6rem+5vw,7rem)] leading-[0.92]">
          {x.places.title}
        </h2>
        <p {...rv(1)} className="text-lead text-muted">
          Dar El Bacha · 45 Derb Toudgha
        </p>
      </div>
      {items.map((item) => (
        <figure key={item.id} className="m-0">
          <FullBleed src={item.src} focus={item.focus}>
            <figcaption className="display max-w-[26ch] text-[clamp(1.5rem,1.1rem+1.6vw,2.75rem)] leading-[1.1]">
              {item.alt}
            </figcaption>
          </FullBleed>
        </figure>
      ))}
    </section>
  );
}
