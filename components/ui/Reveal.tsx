"use client";

import { useEffect } from "react";

/**
 * Observateur unique des entrées de section.
 * Chaque élément marqué data-rv (et un index --i pour la cascade)
 * reçoit .is-in quand il entre dans le viewport, une seule fois.
 * Les états cachés ne vivent que sous html.js (voir globals.css) :
 * sans script, tout reste visible ; avec prefers-reduced-motion,
 * aucun déplacement n'est appliqué.
 */
export default function RevealObserver() {
  useEffect(() => {
    const els = Array.from(document.querySelectorAll<HTMLElement>("[data-rv]"));
    if (!("IntersectionObserver" in window)) {
      els.forEach((el) => el.classList.add("is-in"));
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            e.target.classList.add("is-in");
            io.unobserve(e.target);
          }
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.08 }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return null;
}

/** Raccourci : props d'entrée pour un élément, avec sa place dans la cascade. */
export function rv(i = 0, kind: "up" | "row" | "mask" = "up") {
  return {
    "data-rv": kind === "up" ? "" : kind,
    style: { "--i": i } as React.CSSProperties,
  };
}
