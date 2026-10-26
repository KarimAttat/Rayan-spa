"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { siteConfig } from "@/data/site-config";
import { useI18n } from "@/lib/i18n";
import OpenStatus from "@/components/ui/OpenStatus";
import { goToBooking } from "@/lib/booking-bus";
import { useStill } from "@/lib/use-still";

/**
 * Le nom comme fenêtre : « RAYAN SPA » en très grand, le zellige du hammam
 * vu à travers les lettres. Un seul écran : au premier défilement, le nom
 * grandit et s'efface pendant que la carte des soins monte — on arrive
 * tout de suite au menu.
 *
 * Avec prefers-reduced-motion : le nom reste fixe.
 */

/** Image optimisée par Next (WebP/AVIF), utilisable en image de fond CSS. */
function optimized(src: string, w: number) {
  return `/_next/image?url=${encodeURIComponent(src)}&w=${w}&q=75`;
}

export default function Hero() {
  const { x } = useI18n();
  const still = useStill();
  const ref = useRef<HTMLElement>(null);
  const { heroImage } = siteConfig;

  const { scrollYProgress: p } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const scale = useTransform(p, [0, 1], [1, still ? 1 : 1.35]);
  const y = useTransform(p, [0, 1], ["0svh", still ? "0svh" : "18svh"]);
  const fade = useTransform(p, [0, 0.7], [1, still ? 1 : 0]);
  const bgY = useTransform(p, [0, 1], ["50%", still ? "50%" : "20%"]);

  const photo = optimized(heroImage.src, 1920);

  return (
    <section ref={ref} id="top" className="relative h-[100svh] overflow-hidden bg-bg">
      <h1 className="sr-only">Rayan SPA — {x.hero.h1Suffix}</h1>

      {/* Le nom, la photo dedans */}
      <div className="hero-in absolute inset-x-0 top-[42%] -translate-y-1/2 md:top-[46%]">
        <motion.p
          aria-hidden="true"
          className="hero-name display text-center leading-[0.82] tracking-[-0.02em]"
          style={{ scale, y, opacity: fade, backgroundImage: `url(${photo})`, backgroundPositionY: bgY }}
        >
          <span className="block md:inline">RAYAN</span> <span className="block md:inline">SPA</span>
        </motion.p>
      </div>

      {/* Bord inférieur : état d'ouverture, phrase, actions */}
      <motion.div style={{ opacity: fade }} className="absolute inset-x-0 bottom-0">
        <div className="fade-late wrap grid gap-5 pb-8 md:pb-10 lg:grid-cols-12 lg:items-end">
          <OpenStatus className="text-small text-muted lg:col-span-4" />
          <p className="max-w-[34ch] text-body lg:col-span-4 lg:col-start-6">{x.hero.line}</p>
          <div
            data-cta-zone="hero"
            className="flex items-center gap-6 lg:col-span-3 lg:col-start-10 lg:justify-end"
          >
            <a href="#reservation" onClick={(e) => { e.preventDefault(); goToBooking(); }} className="button">
              {x.hero.cta}
            </a>
            <a href="#carte" className="link whitespace-nowrap text-body">
              {x.hero.menuLink}
            </a>
          </div>
        </div>
      </motion.div>

      <style
        dangerouslySetInnerHTML={{
          __html: `
        .hero-name {
          font-size: clamp(5.5rem, 26vw, 14rem);
          font-weight: 500;
          color: var(--ink);
          background-size: cover;
          background-position-x: center;
          -webkit-background-clip: text; /* taste-skill-ignore: photo dans le nom, demandée */
          background-clip: text; /* taste-skill-ignore: photo dans le nom, demandée */
          -webkit-text-fill-color: transparent;
          transform-origin: 50% 50%;
        }
        @media (min-width: 768px) {
          .hero-name { font-size: 15.5vw; }
        }
        /* Le nom apparaît en douceur au chargement */
        @media (prefers-reduced-motion: no-preference) {
          .js .hero-in { animation: hero-in 1200ms var(--ease-out) both; }
        }
        @keyframes hero-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
      `,
        }}
      />
    </section>
  );
}
