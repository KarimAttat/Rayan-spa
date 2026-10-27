"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { siteConfig } from "@/data/site-config";
import { massages, currency } from "@/data/services";
import { useI18n } from "@/lib/i18n";
import { goToBooking } from "@/lib/booking-bus";
import { useStill } from "@/lib/use-still";
import { rv } from "./ui/Reveal";

/**
 * Juste après le nom : les mains sur le dos, en plein écran. La photo
 * s'ouvre jusqu'aux bords en arrivant, puis porte la promesse (le prix
 * d'entrée, tiré de la carte) et deux chemins : réserver tout de suite,
 * ou descendre lire la carte, qui suit immédiatement.
 */
export default function Invite() {
  const { x } = useI18n();
  const still = useStill();
  const ref = useRef<HTMLElement>(null);
  const { menuImage } = siteConfig;

  // Le prix d'entrée vient de la carte : il suit tout changement de tarif.
  const from = Math.min(...massages.filter((m) => !m.hidden).flatMap((m) => m.variants.map((v) => v.price)));

  // Arrivée : la photo part encadrée, aux angles arrondis, et s'ouvre jusqu'aux bords.
  const { scrollYProgress: enter } = useScroll({ target: ref, offset: ["start end", "start start"] });
  const side = useTransform(enter, [0, 1], [still ? 0 : 6, 0]);
  const round = useTransform(enter, [0, 1], [still ? 0 : 32, 0]);
  const clipPath = useTransform([side, round], ([s, r]) => `inset(${s}% ${s}% 0 ${s}% round ${r}px)`);
  const scale = useTransform(enter, [0, 1], [still ? 1 : 1.18, 1]);

  return (
    <section
      ref={ref}
      id="massage"
      data-cta-zone="invite"
      aria-labelledby="invite-title"
      className="relative h-[100svh] min-h-[34rem] bg-bg"
    >
      <motion.div className="absolute inset-0 overflow-hidden" style={{ clipPath }}>
        <motion.div className="absolute inset-0" style={{ scale }}>
          <Image
            src={menuImage.src}
            alt=""
            fill
            sizes="100vw"
            className="object-cover"
            style={{ objectPosition: "50% 58%" }}
          />
        </motion.div>
        {/* Voile neutre sous le texte, pour qu'il se lise sur la photo */}
        <div
          aria-hidden="true"
          className={"absolute inset-0 bg-[linear-gradient(180deg,rgba(20,12,9,0)_30%,rgba(20,12,9,0.78)_100%)] md:bg-[linear-gradient(90deg,rgba(20,12,9,0.78)_0%,rgba(20,12,9,0.35)_55%,rgba(20,12,9,0)_80%)]" /* taste-skill-ignore: voile neutre sur photo */}
        />

        <div className="wrap absolute inset-x-0 bottom-0 pb-[calc(6.5rem+env(safe-area-inset-bottom))] text-night-ink md:top-0 md:flex md:flex-col md:justify-center md:pb-0">
          <h2 id="invite-title" {...rv(0)} className="display max-w-[14ch] text-head leading-[0.95]">
            {x.invite.title}
          </h2>
          <p {...rv(1)} className="mt-5 max-w-[40ch] text-lead">
            {x.invite.text.replace("{price}", String(from)).replace("{currency}", currency)}
          </p>
          <div {...rv(2)} className="mt-8 flex flex-wrap items-center gap-x-7 gap-y-4">
            <button type="button" onClick={goToBooking} className="button">
              {x.invite.book}
            </button>
            <a href="#carte" className="invite-menu link inline-flex items-center gap-2 text-body text-night-ink">
              {x.invite.menu}
              <span aria-hidden="true" className="invite-arrow inline-block">
                ↓
              </span>
            </a>
          </div>
        </div>
      </motion.div>

      <style
        dangerouslySetInnerHTML={{
          __html: `
        .invite-arrow { transition: transform var(--t-hover) var(--ease-out); }
        @media (hover: hover) and (pointer: fine) { .invite-menu:hover .invite-arrow { transform: translateY(3px); } }
        .invite-menu:active .invite-arrow { transform: translateY(3px); }
      `,
        }}
      />
    </section>
  );
}
