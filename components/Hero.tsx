"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import {
  motion,
  useMotionTemplate,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { siteConfig } from "@/data/site-config";
import { useI18n } from "@/lib/i18n";
import OpenStatus from "@/components/ui/OpenStatus";

/**
 * Le nom comme monument : « RAYAN ⌂ SPA », la porte du spa glissée dans
 * l'arche du logo comme une lettre. Au défilement :
 *  1. les deux mots s'écartent comme les battants d'une porte et l'arche
 *     s'avance vers le visiteur ;
 *  2. derrière la porte, le hammam s'ouvre en plein écran ;
 *  3. un texte entre sur la photo, décalé à gauche.
 *
 * Sans script ou avec prefers-reduced-motion, la composition reste fixe.
 */
export default function Hero() {
  const { x } = useI18n();
  const reduce = useReducedMotion();
  const ref = useRef<HTMLElement>(null);
  const slotRef = useRef<HTMLSpanElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress: p } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  // Géométrie mesurée : où est l'arche, de combien grandir, où finit-elle.
  const [geo, setGeo] = useState({ dx: 0, dy: 0, grow: 1, insetY: 0, insetX: 0 });
  useEffect(() => {
    const measure = () => {
      const slot = slotRef.current;
      const stage = stageRef.current;
      if (!slot || !stage) return;
      const r = slot.getBoundingClientRect();
      const s = stage.getBoundingClientRect();
      const fit = Math.min((s.height * 0.86) / r.height, (s.width * 0.92) / r.width);
      const grow = Math.max(1, fit);
      // Boîte de l'arche à la fin de sa croissance, centrée dans l'écran.
      const w = r.width * grow;
      const h = r.height * grow;
      setGeo({
        dx: s.width / 2 - (r.left - s.left + r.width / 2),
        dy: s.height / 2 - (r.top - s.top + r.height / 2),
        grow,
        insetY: Math.max(0, (s.height - h) / 2 + h * 0.3),
        insetX: Math.max(0, (s.width - w) / 2),
      });
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(document.documentElement);
    return () => ro.disconnect();
  }, []);

  const still = !!reduce;
  // 1. L'arche grandit, les mots s'écartent
  const scale = useTransform(p, [0, 0.42], [1, still ? 1 : geo.grow]);
  const ax = useTransform(p, [0, 0.42], [0, still ? 0 : geo.dx]);
  const ay = useTransform(p, [0, 0.42], [0, still ? 0 : geo.dy]);
  const left = useTransform(p, [0, 0.36], ["0vw", still ? "0vw" : "-42vw"]);
  const right = useTransform(p, [0, 0.36], ["0vw", still ? "0vw" : "42vw"]);
  const words = useTransform(p, [0.05, 0.32], [1, still ? 1 : 0]);
  const chrome = useTransform(p, [0, 0.12], [1, still ? 1 : 0]);
  const hammam = useTransform(p, [0.2, 0.4], [0, still ? 0 : 1]);
  // 2. Le hammam s'ouvre en plein écran depuis la boîte de l'arche
  const full = useTransform(p, [0.42, 0.5], [0, still ? 0 : 1]);
  const iy = useTransform(p, [0.42, 0.66], [geo.insetY, 0]);
  const ix = useTransform(p, [0.42, 0.66], [geo.insetX, 0]);
  const clip = useMotionTemplate`inset(${iy}px ${ix}px ${iy}px ${ix}px)`;
  const fullScale = useTransform(p, [0.42, 1], [1.18, 1]);
  // 3. Le texte entre sur la photo
  const tx = useTransform(p, [0.64, 0.86], ["-8vw", "0vw"]);
  const to = useTransform(p, [0.64, 0.8], [0, still ? 0 : 1]);

  const { heroImage } = siteConfig;

  return (
    <section ref={ref} id="top" className="relative h-[100svh] bg-bg motion-safe:h-[280svh]">
      <div ref={stageRef} className="sticky top-0 flex h-[100svh] flex-col justify-end overflow-hidden">
        {/* ---------- Le nom ---------- */}
        <h1 className="absolute inset-x-0 top-1/2 -translate-y-1/2 text-display tracking-[-0.045em] text-ink">
          <span className="sr-only">Rayan SPA — {x.hero.h1Suffix}</span>
          <span
            aria-hidden="true"
            className="flex flex-col items-center gap-[4vw] md:flex-row md:items-baseline md:justify-center md:gap-[0.12em]"
          >
            <Word text="RAYAN" offset={left} fade={words} start={0} />{" "}
            <span ref={slotRef} className="hero-slot relative block shrink-0 md:inline-block">
              <motion.span className="hero-arch absolute block" style={{ x: ax, y: ay, scale }}>
                <span className="hero-arch-inner block h-full w-full">
                  <span className="arch block h-full w-full">
                    <span className="shutter relative block h-full w-full bg-surface">
                      <Image
                        src={heroImage.src}
                        alt=""
                        fill
                        priority
                        sizes="(max-width: 768px) 100vw, 60vw"
                        className="object-cover object-[42%_50%]"
                      />
                      <motion.span className="absolute inset-0 block" style={{ opacity: hammam }}>
                        <Image
                          src="/images/hammam1.jpg"
                          alt=""
                          fill
                          sizes="(max-width: 768px) 100vw, 60vw"
                          className="object-cover"
                        />
                      </motion.span>
                    </span>
                  </span>
                </span>
              </motion.span>
            </span>{" "}
            <Word text="SPA" offset={right} fade={words} start={6} />
          </span>
        </h1>
        <span className="sr-only">{x.hero.doorAlt}</span>

        {/* ---------- Le hammam en plein écran ---------- */}
        {!still && (
          <motion.div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-night"
            style={{ opacity: full, clipPath: clip }}
          >
            <motion.div className="absolute inset-0" style={{ scale: fullScale }}>
              <Image src="/images/hammam1.jpg" alt="" fill priority sizes="100vw" className="object-cover" />
            </motion.div>
            {/* Voile neutre pour lire le texte posé sur la photo */}
            <div className={"absolute inset-0 bg-[linear-gradient(90deg,rgba(20,12,9,0.8)_0%,rgba(20,12,9,0.4)_55%,rgba(20,12,9,0.05)_100%)]" /* taste-skill-ignore: voile neutre sur photo */} />
            <motion.div
              className="wrap absolute inset-x-0 bottom-[12svh] max-w-[46rem] text-night-ink"
              style={{ x: tx, opacity: to }}
            >
              <p className="display text-head">{x.hero.revealTitle}</p>
              <p className="mt-5 max-w-[34ch] text-lead">{x.hero.revealText}</p>
            </motion.div>
          </motion.div>
        )}

        {/* ---------- Bord inférieur : phrase, état d'ouverture, action ---------- */}
        <motion.div style={{ opacity: chrome }} className="relative">
          <div className="fade-late wrap grid gap-5 pb-8 md:pb-10 lg:grid-cols-12 lg:items-end">
            <OpenStatus className="text-small text-muted lg:col-span-4" />
            <p className="max-w-[34ch] text-body lg:col-span-4 lg:col-start-6">{x.hero.line}</p>
            <div className="flex items-center gap-6 lg:col-span-3 lg:col-start-10 lg:justify-end">
              <a href="#reservation" className="button">
                {x.hero.cta}
              </a>
              <a href="#carte" className="link whitespace-nowrap text-body">
                {x.hero.menuLink}
              </a>
            </div>
          </div>
        </motion.div>
      </div>

      <style
        dangerouslySetInnerHTML={{
          __html: `
        /* Le créneau de l'arche dans la ligne du nom. --k : rapport entre
           la grande arche (rendue nette) et la lettre qu'elle remplace. */
        .hero-slot { --k: 2.5; width: 42vw; height: 56vw; }
        .hero-arch {
          left: 50%; top: 50%;
          width: calc(42vw * var(--k)); height: calc(56vw * var(--k));
          margin-left: calc(-21vw * var(--k)); margin-top: calc(-28vw * var(--k));
        }
        .hero-arch-inner { transform: scale(calc(1 / var(--k))); }
        @media (max-width: 767px) {
          .hero-slot { margin-block: -2vw; }
        }
        @media (min-width: 768px) {
          .hero-slot { --k: 5; width: 0.6em; height: 0.84em; }
          .hero-arch {
            width: calc(0.6em * var(--k)); height: calc(0.84em * var(--k));
            margin-left: calc(-0.3em * var(--k)); margin-top: calc(-0.42em * var(--k));
          }
        }
      `,
        }}
      />
    </section>
  );
}

function Word({
  text,
  offset,
  fade,
  start,
}: {
  text: string;
  offset: MotionValue<string>;
  fade: MotionValue<number>;
  start: number;
}) {
  return (
    <motion.span className="rise block whitespace-nowrap leading-[0.8]" style={{ x: offset, opacity: fade }}>
      {text.split("").map((ch, i) => (
        <span key={i} style={{ "--i": start + i } as React.CSSProperties}>
          {ch}
        </span>
      ))}
    </motion.span>
  );
}
