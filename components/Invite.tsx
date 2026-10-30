"use client";

import { massages, currency } from "@/data/services";
import { useI18n } from "@/lib/i18n";
import { rv } from "./ui/Reveal";

/**
 * Juste après le film : une page de texte, composée en deux temps. À gauche,
 * le titre en très grand, ligne par ligne (chaque ligne monte de derrière son
 * bord) ; à droite, plus bas, un filet qui se trace puis le texte. Les deux
 * chemins (réserver, lire la carte) sont portés par les photos qui suivent.
 */
export default function Invite() {
  const { x } = useI18n();

  // Le prix d'entrée vient de la carte : il suit tout changement de tarif.
  const from = Math.min(...massages.filter((m) => !m.hidden).flatMap((m) => m.variants.map((v) => v.price)));
  // Le titre se coupe après la virgule : « Le massage, » / « au cœur de la médina ».
  const lines = x.invite.title.split(/(?<=,)\s+/);

  return (
    <section id="massage" aria-labelledby="invite-title" className="bg-bg">
      <div className="wrap grid gap-12 py-24 md:grid-cols-12 md:gap-x-8 md:py-36">
        <div className="md:col-span-8">
          <p {...rv(0)} className="eyebrow text-muted">
            Rayan Spa · Marrakech
          </p>
          <h2
            id="invite-title"
            className="mt-8 text-[clamp(3rem,1.4rem+6vw,7.5rem)] leading-[0.92] tracking-[-0.03em]"
          >
            {lines.map((line, i) => (
              <span key={line} {...rv(i + 1, "line")} className="block pb-[0.08em]">
                <span>{line}</span>
              </span>
            ))}
          </h2>
        </div>
        <div className="flex flex-col justify-end md:col-span-4 md:col-start-9">
          <span {...rv(3, "draw")} aria-hidden="true" className="rule-h block h-px w-full" />
          <p {...rv(4)} className="mt-8 max-w-[34ch] text-lead leading-[1.45]">
            {x.invite.text.replace("{price}", String(from)).replace("{currency}", currency)}
          </p>
        </div>
      </div>
    </section>
  );
}
