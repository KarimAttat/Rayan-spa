"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { useI18n } from "@/lib/i18n";
import type { RitualStage } from "@/data/experience";
import { rv } from "./ui/Reveal";
import { useStill } from "@/lib/use-still";
import { selectService } from "@/lib/booking-bus";
import type { Dict } from "@/data/translations";

/**
 * Le rituel du hammam, étape par étape : des panneaux plein écran qui
 * s'empilent. Chaque photo entre en zoom ; quand l'étape suivante glisse
 * par-dessus, la précédente recule en profondeur (échelle, inclinaison,
 * assombrissement). Les titres alternent gauche / droite.
 */
const STAGES = [
  { img: "/images/hammam2.jpg", focus: "45% 50%", side: "left" },
  // Photo d'illustration (banque d'images) : l'huile d'argan du massage.
  { img: "/images/massage5.jpg", focus: "50% 40%", side: "right" },
  // Photo d'illustration (banque d'images), pas une salle du spa.
  { img: "/images/massage3.jpg", focus: "50% 45%", side: "left" },
  { img: "/images/rooftop2.jpg", focus: "60% 55%", side: "right" },
] as const;

/** Le soin à réserver depuis chaque étape (valeur exacte d'une option du formulaire). */
const STAGE_SERVICE: ((t: Dict) => string)[] = [
  (t) => t.serviceData["hammam-oriental"].name,
  (t) => t.serviceData["pack-baume"].name,
  (t) => `${t.serviceData["massage-relaxant"].name} (20 min)`,
  (t) => t.serviceData["pack-classique"].name,
];

export default function Ritual() {
  const { x } = useI18n();

  return (
    <section id="rituel" className="relative bg-night text-night-ink">
      <div className="wrap grid gap-8 py-section md:grid-cols-12 md:items-end">
        <h2 {...rv(0)} className="text-[clamp(3.5rem,2rem+7vw,9rem)] leading-[0.9] md:col-span-7">
          {x.ritual.title}
        </h2>
        <p {...rv(1)} className="max-w-[40ch] text-lead md:col-span-4 md:col-start-9">
          {x.ritual.intro}
        </p>
      </div>

      <ol className="relative">
        {x.ritual.stages.map((stage, i) => (
          <Stage key={stage.name} stage={stage} index={i} last={i === x.ritual.stages.length - 1} />
        ))}
      </ol>
    </section>
  );
}

function Stage({ stage, index, last }: { stage: RitualStage; index: number; last: boolean }) {
  const { t, x } = useI18n();
  const ref = useRef<HTMLLIElement>(null);
  const reduce = useStill();
  const s = STAGES[index];

  // Entrée : la photo arrive agrandie et se pose.
  const { scrollYProgress: enter } = useScroll({ target: ref, offset: ["start end", "start start"] });
  // Sortie : quand le panneau suivant arrive, celui-ci recule.
  const { scrollYProgress: leave } = useScroll({ target: ref, offset: ["start start", "end start"] });

  const still = !!reduce;
  const imgScale = useTransform(enter, [0, 1], [still ? 1 : 1.3, 1]);
  const textX = useTransform(enter, [0.45, 1], [still ? "0vw" : s.side === "left" ? "-10vw" : "10vw", "0vw"]);
  const textO = useTransform(enter, [0.5, 1], [still ? 1 : 0, 1]);
  const scale = useTransform(leave, [0, 1], [1, still || last ? 1 : 0.86]);
  const rotateX = useTransform(leave, [0, 1], [0, still || last ? 0 : 8]);
  const dim = useTransform(leave, [0, 1], [0, still || last ? 0 : 0.7]);

  return (
    <li ref={ref} className="sticky top-0 h-[100svh] overflow-hidden" style={{ perspective: "1600px" }}>
      <motion.div className="absolute inset-0 origin-top overflow-hidden bg-night" style={{ scale, rotateX }}>
        <motion.div className="absolute inset-0" style={{ scale: imgScale }}>
          <Image
            src={s.img}
            alt=""
            fill
            sizes="100vw"
            className="object-cover"
            style={{ objectPosition: s.focus }}
          />
        </motion.div>
        {/* Voile neutre côté texte */}
        <div
          className={[
            "absolute inset-0",
            s.side === "left"
              ? "bg-[linear-gradient(90deg,rgba(20,12,9,0.82)_0%,rgba(20,12,9,0.45)_50%,rgba(20,12,9,0.1)_100%)]" /* taste-skill-ignore: voile neutre */
              : "bg-[linear-gradient(270deg,rgba(20,12,9,0.82)_0%,rgba(20,12,9,0.45)_50%,rgba(20,12,9,0.1)_100%)]", // taste-skill-ignore: voile neutre
          ].join(" ")}
        />

        <motion.div
          className={[
            "wrap absolute inset-x-0 bottom-[10svh] flex flex-col gap-6",
            s.side === "left" ? "items-start text-left" : "items-end text-right",
          ].join(" ")}
          style={{ x: textX, opacity: textO }}
        >
          <h3 className="text-[clamp(3.25rem,1.5rem+8vw,10rem)] leading-[0.88] tracking-[-0.035em]">
            {stage.name}
          </h3>
          <p className="max-w-[34ch] text-lead">{stage.text}</p>
          <button
            type="button"
            onClick={() => selectService(STAGE_SERVICE[index](t))}
            className="button button--light"
          >
            {x.cta.ritual}
          </button>
        </motion.div>

        {/* L'assombrissement quand l'étape suivante passe dessus */}
        <motion.div className="pointer-events-none absolute inset-0 bg-night" style={{ opacity: dim }} />
      </motion.div>
    </li>
  );
}
