"use client";

import { useEffect } from "react";
import { track } from "@vercel/analytics";

/**
 * Mesure des conversions (Vercel Web Analytics → onglet « Events »).
 * Un seul écouteur pour tous les liens WhatsApp de la page : l'événement
 * indique la section d'où vient le clic (hero, carte, barre mobile…),
 * pour savoir quels appels à l'action fonctionnent vraiment.
 * Les envois du formulaire et les choix dans la carte sont suivis là où
 * ils ont lieu (voir lib/booking-bus.ts et components/Booking.tsx).
 */
export default function ConversionTracker() {
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const link = (e.target as Element | null)?.closest?.('a[href*="wa.me"]');
      if (!link) return;
      const from =
        link.getAttribute("data-cta") ??
        link.closest("[data-cta-zone]")?.getAttribute("data-cta-zone") ??
        link.closest("section, header, footer")?.id ??
        "page";
      track("whatsapp_click", { from });
    };
    document.addEventListener("click", onClick, { capture: true });
    return () => document.removeEventListener("click", onClick, { capture: true });
  }, []);

  return null;
}
