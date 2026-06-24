"use client";

import { motion } from "framer-motion";
import { siteConfig } from "@/data/site-config";
import { ArrowIcon } from "@/components/icons";

const ease = [0.22, 1, 0.36, 1] as const;

export default function Hero() {
  const { brand, heroVideo, heroPoster } = siteConfig;

  const container = {
    hidden: {},
    show: { transition: { staggerChildren: 0.14, delayChildren: 0.15 } },
  };
  const item = {
    hidden: { opacity: 0, y: 28 },
    show: { opacity: 1, y: 0, transition: { duration: 1, ease } },
  };

  return (
    <section
      id="top"
      className="relative flex min-h-[100svh] items-center justify-center overflow-hidden"
    >
      {/* ---------- Sfondo ---------- */}
      <div className="absolute inset-0 -z-10">
        {heroVideo ? (
          <video
            className="h-full w-full object-cover"
            src={heroVideo}
            poster={heroPoster.src || undefined}
            autoPlay
            muted
            loop
            playsInline
          />
        ) : (
          // Sfondo decorativo finché il video non è disponibile
          <div className="h-full w-full bg-gradient-to-b from-nuit via-noir to-noir">
            <div className="zellige-texture absolute inset-0 opacity-[0.18]" />
            <div
              className="absolute left-1/2 top-0 h-[70vh] w-[70vh] -translate-x-1/2 rounded-full opacity-60 blur-[120px] animate-shimmer"
              style={{
                background:
                  "radial-gradient(circle, rgba(181,80,46,0.3), transparent 65%)",
              }}
            />
          </div>
        )}
        <div className="veil absolute inset-0" />
      </div>

      {/* Cornice ad arco decorativa */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-6 top-24 bottom-10 -z-[5] rounded-t-[50%] border border-or/15 sm:inset-x-16"
      />

      {/* ---------- Contenuto ---------- */}
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="relative mx-auto max-w-3xl px-6 pt-28 pb-16 text-center"
      >
        <motion.span variants={item} className="eyebrow">
          {brand.tagline}
        </motion.span>

        <motion.h1
          variants={item}
          className="mt-7 font-display text-[2.9rem] leading-[1.04] text-creme sm:text-6xl md:text-7xl text-balance"
        >
          {brand.heroTitle}
        </motion.h1>

        <motion.p
          variants={item}
          className="mx-auto mt-7 max-w-xl text-lg font-light leading-relaxed text-sable"
        >
          {brand.heroSubtitle}
        </motion.p>

        <motion.div
          variants={item}
          className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row"
        >
          <a href="#reservation" className="btn btn-gold">
            Réserver maintenant
          </a>
          <a href="#soins" className="btn btn-outline">
            Découvrir nos soins
            <ArrowIcon width={16} height={16} />
          </a>
        </motion.div>
      </motion.div>

      {/* ---------- Indicatore di scroll ---------- */}
      <motion.a
        href="#a-propos"
        aria-label="Faire défiler"
        className="absolute bottom-7 left-1/2 -translate-x-1/2 text-or/70"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 1 }}
      >
        <span className="flex h-11 w-7 items-start justify-center rounded-full border border-or/30 p-1.5">
          <span className="h-2 w-1 animate-floaty rounded-full bg-or/80" />
        </span>
      </motion.a>
    </section>
  );
}
