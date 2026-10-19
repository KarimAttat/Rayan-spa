"use client";

import { useRef, type ReactNode } from "react";
import Image from "next/image";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
} from "framer-motion";

/* ============================================================
   Primitives de mouvement liées au défilement.
   Tout passe par transform / opacity. Avec prefers-reduced-motion,
   chaque primitive rend l'état final, immobile.
   ============================================================ */

/**
 * Photo qui « respire » au défilement : elle entre agrandie et
 * légèrement décalée, puis se pose à mesure qu'elle traverse l'écran.
 */
export function ParallaxImage({
  src,
  alt,
  sizes,
  className = "",
  focus = "50% 50%",
  priority = false,
  zoom = 1.25,
  drift = 8,
}: {
  src: string;
  alt: string;
  sizes: string;
  className?: string;
  focus?: string;
  priority?: boolean;
  /** Échelle de départ (1 = pas de zoom). */
  zoom?: number;
  /** Déplacement vertical en %, de +drift à -drift. */
  drift?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress: p } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const scale = useTransform(p, [0, 0.6], [reduce ? 1 : zoom, 1]);
  const y = useTransform(p, [0, 1], [reduce ? "0%" : `${drift}%`, reduce ? "0%" : `-${drift}%`]);

  return (
    <div ref={ref} className={`relative overflow-hidden ${className}`}>
      <motion.div className="absolute inset-[-10%_0]" style={{ scale, y }}>
        <Image
          src={src}
          alt={alt}
          fill
          priority={priority}
          sizes={sizes}
          className="object-cover"
          style={{ objectPosition: focus }}
        />
      </motion.div>
    </div>
  );
}

/**
 * Entrée en profondeur : l'élément arrive incliné vers l'arrière
 * (rotateX), plus petit, et se redresse en atteignant le centre.
 */
export function TiltIn({
  children,
  className = "",
  from = 24,
}: {
  children: ReactNode;
  className?: string;
  /** Inclinaison de départ, en degrés. */
  from?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress: p } = useScroll({ target: ref, offset: ["start end", "center center"] });
  const rotateX = useTransform(p, [0, 1], [reduce ? 0 : from, 0]);
  const scale = useTransform(p, [0, 1], [reduce ? 1 : 0.86, 1]);
  const opacity = useTransform(p, [0, 0.5], [reduce ? 1 : 0.25, 1]);

  return (
    <div ref={ref} className={className} style={{ perspective: "1400px" }}>
      <motion.div
        className="h-full w-full"
        style={{ rotateX, scale, opacity, transformOrigin: "50% 100%" }}
      >
        {children}
      </motion.div>
    </div>
  );
}

/**
 * Paragraphe qui s'allume mot à mot au fil du défilement.
 * Le texte reste un vrai paragraphe, lisible et indexable.
 */
export function WordsReveal({ text, className = "" }: { text: string; className?: string }) {
  const ref = useRef<HTMLParagraphElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress: p } = useScroll({ target: ref, offset: ["start 85%", "end 45%"] });
  const words = text.split(" ");

  return (
    <p ref={ref} className={className}>
      {words.map((w, i) => (
        <Word key={i} p={p} range={[i / words.length, (i + 1) / words.length]} still={!!reduce}>
          {w}
        </Word>
      ))}
    </p>
  );
}

function Word({
  children,
  p,
  range,
  still,
}: {
  children: string;
  p: MotionValue<number>;
  range: [number, number];
  still: boolean;
}) {
  const opacity = useTransform(p, range, [still ? 1 : 0.16, 1]);
  return (
    <>
      <motion.span style={{ opacity }}>{children}</motion.span>{" "}
    </>
  );
}

/** Raccourci : progression d'un élément à travers l'écran (0 → 1). */
export function useProgress(
  ref: React.RefObject<HTMLElement>,
  offset: ["start end", "end start"] | ["start start", "end end"] | ["start end", "end end"] = ["start end", "end start"]
) {
  return useScroll({ target: ref, offset }).scrollYProgress;
}
