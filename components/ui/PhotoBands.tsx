"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { useStill } from "@/lib/use-still";

/**
 * Les grandes images qui rythment la page entre deux pages de texte :
 * - FullBleed : une photo plein écran, fixe, qui glisse à peine au défilement ;
 * - Pair : deux photos côte à côte, d'un bord à l'autre de l'écran ; chacune
 *   peut porter un chemin (« Réserver un massage », « Voir la carte… »).
 */

type Shot = {
  src: string;
  focus?: string;
  /** Un chemin posé sur la photo : la photo entière devient le lien ou le bouton. */
  label?: string;
  href?: string;
  onClick?: () => void;
};

function useDrift() {
  const still = useStill();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress: p } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(p, [0, 1], still ? ["0%", "0%"] : ["-5%", "5%"]);
  return { ref, y };
}

export function FullBleed({ src, focus = "50% 50%", children }: Shot & { children?: React.ReactNode }) {
  const { ref, y } = useDrift();
  return (
    <div ref={ref} data-header="dark" className="relative h-[100svh] min-h-[32rem] overflow-hidden bg-night text-night-ink">
      <motion.div className="absolute inset-x-0 -inset-y-[6%]" style={{ y }}>
        <Image src={src} alt="" fill sizes="100vw" className="object-cover" style={{ objectPosition: focus }} />
      </motion.div>
      {children && (
        <>
          <div
            aria-hidden="true"
            className={"absolute inset-0 bg-[linear-gradient(180deg,rgba(20,12,9,0)_45%,rgba(20,12,9,0.6)_100%)]" /* taste-skill-ignore: voile neutre sur photo */}
          />
          <div className="wrap absolute inset-x-0 bottom-0 pb-[calc(6rem+env(safe-area-inset-bottom))] md:pb-16">
            {children}
          </div>
        </>
      )}
    </div>
  );
}

export function Pair({ a, b }: { a: Shot; b: Shot }) {
  const { ref, y } = useDrift();
  return (
    <div ref={ref} data-header="dark" className="grid gap-1 bg-bg md:grid-cols-2">
      {[a, b].map((s) => {
        const photo = (
          <>
            <motion.div className="absolute inset-x-0 -inset-y-[6%]" style={{ y }}>
              <Image
                src={s.src}
                alt=""
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="pair-img object-cover"
                style={{ objectPosition: s.focus ?? "50% 50%" }}
              />
            </motion.div>
            {s.label && (
              <>
                <span
                  aria-hidden="true"
                  className={"absolute inset-0 bg-[linear-gradient(180deg,rgba(20,12,9,0)_40%,rgba(20,12,9,0.62)_100%)]" /* taste-skill-ignore: voile neutre sur photo */}
                />
                <span className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-6 p-margin pb-8 md:pb-12">
                  <span className="display text-[clamp(2rem,1.2rem+3vw,4.25rem)] leading-[0.95] tracking-[-0.02em]">
                    {s.label}
                  </span>
                  <span aria-hidden="true" className="pair-arrow text-[clamp(1.75rem,1.2rem+2vw,3rem)] leading-none">
                    →
                  </span>
                </span>
              </>
            )}
          </>
        );
        const cls = "pair relative block h-[70svh] overflow-hidden bg-night text-left text-night-ink md:h-[92svh]";
        if (s.href)
          return (
            <a key={s.src} href={s.href} className={cls}>
              {photo}
            </a>
          );
        if (s.onClick)
          return (
            <button key={s.src} type="button" onClick={s.onClick} className={cls + " w-full"}>
              {photo}
            </button>
          );
        return (
          <div key={s.src} className={cls}>
            {photo}
          </div>
        );
      })}
      <style
        dangerouslySetInnerHTML={{
          __html: `
        .pair-img { transition: transform 900ms var(--ease-out); }
        .pair-arrow { display: inline-block; transition: transform var(--t-hover) var(--ease-out); }
        @media (hover: hover) and (pointer: fine) {
          a.pair:hover .pair-img, button.pair:hover .pair-img { transform: scale(1.03); }
          .pair:hover .pair-arrow { transform: translateX(6px); }
        }
        @media (prefers-reduced-motion: reduce) { .pair-img, .pair-arrow { transition: none; } }
      `,
        }}
      />
    </div>
  );
}
