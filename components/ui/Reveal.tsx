"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

type RevealProps = {
  children: ReactNode;
  /** Ritardo in secondi per effetto a cascata */
  delay?: number;
  /** Direzione di entrata */
  y?: number;
  className?: string;
  as?: "div" | "li" | "section" | "article" | "span";
};

/**
 * Rivela il contenuto con una dissolvenza discreta quando entra
 * nel viewport. Rispetta "prefers-reduced-motion".
 */
export default function Reveal({
  children,
  delay = 0,
  y = 26,
  className,
  as = "div",
}: RevealProps) {
  const reduce = useReducedMotion();
  const MotionTag = motion[as];

  return (
    <MotionTag
      className={className}
      initial={reduce ? { opacity: 0 } : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{
        duration: 0.9,
        delay,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      {children}
    </MotionTag>
  );
}
