"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { siteConfig } from "@/data/site-config";
import { useI18n } from "@/lib/i18n";
import OpenStatus from "@/components/ui/OpenStatus";
import { goToBooking } from "@/lib/booking-bus";
import { useStill } from "@/lib/use-still";

/**
 * Le premier écran : le film du massage en plein écran (la photo en attente),
 * « RAYAN SPA » en très grand par-dessus. Au défilement, le nom, les textes
 * et les boutons s'effacent doucement ; le film, lui, ne bouge pas, et la
 * page suivante monte par-dessus.
 *
 * Avec prefers-reduced-motion : tout reste fixe.
 */
export default function Hero() {
  const { x } = useI18n();
  const still = useStill();
  const ref = useRef<HTMLElement>(null);
  const { heroImage, heroVideo } = siteConfig;
  // La vidéo se pose sur la photo une fois prête : la photo reste l'image d'attente.
  const [playing, setPlaying] = useState(false);

  // Le texte s'efface sur la première moitié de l'écran défilé.
  const { scrollYProgress: p } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const fade = useTransform(p, [0, 0.45], [1, still ? 1 : 0]);
  const y = useTransform(p, [0, 0.45], ["0svh", still ? "0svh" : "-4svh"]);

  return (
    <section
      ref={ref}
      id="top"
      data-header="dark"
      className="relative h-[100svh] min-h-[34rem] overflow-hidden bg-night text-night-ink"
    >
      <h1 className="sr-only">Rayan SPA — {x.hero.h1Suffix}</h1>

      <div className="absolute inset-0">
        <Image
          src={heroImage.src}
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover"
          style={{ objectPosition: heroImage.focus }}
        />
        {/* Le film du massage, en boucle, sans son. Mouvement réduit : la photo seule. */}
        {heroVideo && !still && (
          <video
            aria-hidden="true"
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            onPlaying={() => setPlaying(true)}
            className={[
              "absolute inset-0 h-full w-full object-cover transition-opacity duration-700",
              playing ? "opacity-100" : "opacity-0",
            ].join(" ")}
            style={{ objectPosition: heroImage.focus }}
          >
            <source src={heroVideo.src} type="video/mp4" />
          </video>
        )}
      </div>
      {/* Voile neutre : la barre en haut, le nom et le bas de page restent lisibles */}
      <div
        aria-hidden="true"
        className={"absolute inset-0 bg-[linear-gradient(180deg,rgba(20,12,9,0.5)_0%,rgba(20,12,9,0.12)_28%,rgba(20,12,9,0.22)_55%,rgba(20,12,9,0.8)_100%)]" /* taste-skill-ignore: voile neutre sur photo */}
      />

      {/* Le nom */}
      <div className="hero-in absolute inset-x-0 top-[42%] -translate-y-1/2 md:top-[46%]">
        <motion.p
          aria-hidden="true"
          className="hero-name display text-center leading-[0.82] tracking-[-0.02em]"
          style={{ y, opacity: fade }}
        >
          <span className="block md:inline">RAYAN</span> <span className="block md:inline">SPA</span>
        </motion.p>
      </div>

      {/* Bord inférieur : état d'ouverture, phrase, actions */}
      <motion.div style={{ opacity: fade }} className="absolute inset-x-0 bottom-0">
        <div className="fade-late wrap grid gap-5 pb-8 md:pb-10 lg:grid-cols-12 lg:items-end">
          <OpenStatus className="text-small lg:col-span-4" />
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
          color: var(--night-ink);
          text-shadow: 0 2px 40px rgba(20, 12, 9, 0.25);
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
