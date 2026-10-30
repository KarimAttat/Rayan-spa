"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { motion, useMotionValueEvent, useScroll, useTransform } from "framer-motion";
import { siteConfig } from "@/data/site-config";
import { useI18n } from "@/lib/i18n";
import OpenStatus from "@/components/ui/OpenStatus";
import { goToBooking } from "@/lib/booking-bus";
import { useStill } from "@/lib/use-still";

/**
 * Le premier écran : le film du massage en plein écran (la photo en attente),
 * « RAYAN SPA » en très grand par-dessus. L'écran reste en place pendant
 * qu'on défile : le nom, la phrase et les boutons s'effacent lentement,
 * le voile s'éclaircit, jusqu'à ne laisser que le film. Alors seulement
 * la page passe à la suite.
 *
 * Avec prefers-reduced-motion : un seul écran, fixe.
 */
export default function Hero() {
  const { x } = useI18n();
  const still = useStill();
  const ref = useRef<HTMLElement>(null);
  const { heroImage, heroVideo } = siteConfig;
  // La vidéo se pose sur la photo une fois prête : la photo reste l'image d'attente.
  const [playing, setPlaying] = useState(false);

  // Progression sur toute la hauteur de la section : l'écran collé y glisse.
  // Tout s'efface sur les 3/4 du parcours ; le dernier quart, le film seul.
  const { scrollYProgress: p } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const fade = useTransform(p, [0, 0.75], [1, still ? 1 : 0]);
  const y = useTransform(p, [0, 0.75], ["0svh", still ? "0svh" : "-3svh"]);
  const veil = useTransform(p, [0, 0.75], [1, still ? 1 : 0.35]);
  // Effacés, les boutons ne doivent plus capter les clics.
  const [gone, setGone] = useState(false);
  useMotionValueEvent(fade, "change", (v) => setGone(v < 0.05));

  return (
    <section
      ref={ref}
      id="top"
      data-header="dark"
      className={["relative bg-night text-night-ink", still ? "h-[100svh]" : "h-[200svh]"].join(" ")}
    >
      <h1 className="sr-only">Rayan SPA — {x.hero.h1Suffix}</h1>
      <div className="sticky top-0 h-[100svh] min-h-[34rem] overflow-hidden">

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
      <motion.div
        aria-hidden="true"
        style={{ opacity: veil }}
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
      <motion.div
        style={{ opacity: fade }}
        className={["absolute inset-x-0 bottom-0", gone ? "pointer-events-none" : ""].join(" ")}
      >
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
      </div>

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
