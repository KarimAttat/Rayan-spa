"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { useI18n } from "@/lib/i18n";
import { useStill } from "@/lib/use-still";
import { rv } from "./ui/Reveal";

/**
 * Après la carte, une photo plein écran (la nuque, les mains), fixe, qui
 * glisse à peine au défilement, avec une phrase. Image générée pour
 * illustrer, dans la lumière du film d'ouverture.
 */

export default function Moments() {
  const { t } = useI18n();
  const still = useStill();
  const ref = useRef<HTMLDivElement>(null);

  // Parallaxe douce : la photo défile un peu moins vite que la page.
  const { scrollYProgress: p } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(p, [0, 1], still ? ["0%", "0%"] : ["-6%", "6%"]);

  return (
    <section aria-label={t.services.categoryMassages} className="bg-night">
      {/* Plein écran */}
      <div ref={ref} data-header="dark" className="relative h-[100svh] min-h-[32rem] overflow-hidden bg-night text-night-ink">
        <motion.div className="absolute inset-x-0 -inset-y-[7%]" style={{ y }}>
          <Image
            src="/images/massage-nuque.jpg"
            alt=""
            fill
            sizes="100vw"
            className="object-cover"
            style={{ objectPosition: "58% 50%" }}
          />
        </motion.div>
        <div
          aria-hidden="true"
          className={"absolute inset-0 bg-[linear-gradient(180deg,rgba(20,12,9,0)_45%,rgba(20,12,9,0.6)_100%)]" /* taste-skill-ignore: voile neutre sur photo */}
        />
        <div className="wrap absolute inset-x-0 bottom-0 pb-[calc(6rem+env(safe-area-inset-bottom))] md:pb-16">
          <p {...rv(0)} className="display max-w-[22ch] text-[clamp(1.75rem,1.2rem+2vw,3.25rem)] leading-[1.08]">
            {t.about.values[1]?.v}
          </p>
        </div>
      </div>

    </section>
  );
}
