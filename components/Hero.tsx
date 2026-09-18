"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { siteConfig } from "@/data/site-config";
import { useI18n } from "@/lib/i18n";
import { ArrowIcon } from "@/components/icons";

const ease = [0.22, 1, 0.36, 1] as const;

export default function Hero() {
  const { t } = useI18n();
  const { heroVideo, heroPoster } = siteConfig;

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
      className="relative flex min-h-[100svh] flex-col justify-end overflow-hidden"
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
        ) : heroPoster.src ? (
          <Image
            src={heroPoster.src}
            alt={heroPoster.alt}
            fill
            priority
            className="object-cover"
            sizes="100vw"
          />
        ) : (
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
        {/* Voile chaud (brun-rouge très sombre) : lisibilité de bout en bout, sans délaver la photo */}
        <div
          aria-hidden
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, rgba(32,15,12,0.58) 0%, rgba(32,15,12,0.16) 26%, rgba(32,15,12,0.38) 58%, rgba(32,15,12,0.92) 100%)",
          }}
        />
        {/* Lueur rouge discrète — la touche signature Rayan */}
        <div
          aria-hidden
          className="absolute left-1/2 top-[58%] h-[55vh] w-[55vh] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-25 blur-[110px]"
          style={{
            background: "radial-gradient(circle, rgba(162,49,31,0.6), transparent 70%)",
          }}
        />
      </div>

      {/* ---------- Contenuto ---------- */}
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="relative mx-auto max-w-2xl px-6 pb-28 pt-24 text-center sm:pb-32"
      >
        <motion.span
          variants={item}
          className="mx-auto mb-5 block h-[2px] w-11 rounded-full bg-rouge/70"
        />

        <motion.span
          variants={item}
          className="eyebrow text-sm text-ivoire sm:text-base [text-shadow:0_2px_10px_rgba(32,15,12,0.7)]"
        >
          {t.hero.tagline}
        </motion.span>

        <motion.h1
          variants={item}
          className="mt-7 font-display text-[2.9rem] leading-[1.04] text-ivoire [text-shadow:0_4px_24px_rgba(32,15,12,0.55)] sm:text-6xl md:text-7xl text-balance"
        >
          {t.hero.title}
        </motion.h1>

        <motion.p
          variants={item}
          className="mx-auto mt-7 max-w-xl text-lg font-light leading-relaxed text-ivoire/85 [text-shadow:0_2px_12px_rgba(32,15,12,0.5)]"
        >
          {t.hero.subtitle}
        </motion.p>

        <motion.div
          variants={item}
          className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row"
        >
          <a href="#reservation" className="btn btn-gold">
            {t.hero.ctaBook}
          </a>
          <a
            href="#soins"
            className="btn btn-outline border-ivoire/30 text-ivoire hover:border-or hover:text-or"
          >
            {t.hero.ctaDiscover}
            <ArrowIcon width={16} height={16} />
          </a>
        </motion.div>
      </motion.div>

      {/* ---------- Indicatore di scroll ---------- */}
      <motion.a
        href="#a-propos"
        aria-label={t.hero.scroll}
        className="absolute bottom-7 left-1/2 -translate-x-1/2 text-rouge/75"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 1 }}
      >
        <span className="flex h-11 w-7 items-start justify-center rounded-full border border-rouge/35 p-1.5">
          <span className="h-2 w-1 animate-floaty rounded-full bg-rouge/85" />
        </span>
      </motion.a>
    </section>
  );
}
