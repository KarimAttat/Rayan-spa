"use client";

import { massages, currency } from "@/data/services";
import { useI18n } from "@/lib/i18n";
import { goToBooking } from "@/lib/booking-bus";
import { rv } from "./ui/Reveal";

/**
 * Juste après le film : une respiration claire, sans photo. La promesse
 * (le prix d'entrée, tiré de la carte) et deux chemins : réserver tout de
 * suite, ou lire la carte, qui suit immédiatement.
 */
export default function Invite() {
  const { x } = useI18n();

  // Le prix d'entrée vient de la carte : il suit tout changement de tarif.
  const from = Math.min(...massages.filter((m) => !m.hidden).flatMap((m) => m.variants.map((v) => v.price)));

  return (
    <section id="massage" aria-labelledby="invite-title" className="bg-bg">
      <div className="wrap mx-auto flex max-w-[60rem] flex-col items-center py-section text-center">
        <p {...rv(0)} className="eyebrow text-muted">
          Rayan Spa · Marrakech
        </p>
        <h2 id="invite-title" {...rv(1)} className="mt-8 text-[clamp(2.75rem,1.6rem+4.6vw,6rem)] leading-[0.95]">
          {x.invite.title}
        </h2>
        <span {...rv(2)} aria-hidden="true" className="rule-v mt-10 block h-12 w-px" />
        <p {...rv(3)} className="mt-10 max-w-[42ch] text-lead text-muted">
          {x.invite.text.replace("{price}", String(from)).replace("{currency}", currency)}
        </p>
        <div {...rv(4)} className="mt-12 flex flex-col items-center gap-6 sm:flex-row sm:gap-10">
          <button type="button" onClick={goToBooking} className="button">
            {x.invite.book}
          </button>
          <a href="#carte" className="link text-body">
            {x.invite.menu}
          </a>
        </div>
      </div>
    </section>
  );
}
