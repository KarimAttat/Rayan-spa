/* ============================================================
   OFFRE DU MOMENT — Black Friday
   ------------------------------------------------------------
   Remise appliquée à toute la carte (prix barré + nouveau prix),
   au formulaire et au message WhatsApp, jusqu'à la date de fin.
   Après la date de fin, les prix normaux reviennent tout seuls.
   👉 Pour couper l'offre plus tôt : enabled: false.
   ============================================================ */

import { useSyncExternalStore } from "react";
import type { Locale } from "./translations";

export const promo = {
  enabled: true,
  percent: 20,
  /** Fin de l'offre, heure de Marrakech (UTC+1). */
  endsAt: "2026-11-30T23:59:59+01:00",
};

const end = new Date(promo.endsAt).getTime();

/** Prix remisé, arrondi à 5 MAD. */
export function discounted(price: number): number {
  return Math.round((price * (100 - promo.percent)) / 100 / 5) * 5;
}

const noop = () => () => {};

/**
 * L'offre est-elle en cours ? Côté serveur (page générée à l'avance), on la
 * suppose active ; dans le navigateur, on vérifie la date réelle, si bien
 * qu'après la date de fin les prix normaux reviennent sans nouveau déploiement.
 */
export function usePromo(): boolean {
  return useSyncExternalStore(
    noop,
    () => promo.enabled && Date.now() < end,
    () => promo.enabled
  );
}

type PromoCopy = {
  /** Bandeau sur la carte. */
  label: string;
  line: string;
  /** Version courte, pour la barre en haut sur téléphone. */
  short: string;
  /** Lien de la barre vers la carte. */
  cta: string;
  /** Ligne ajoutée au message WhatsApp. */
  whatsapp: string;
  /** Lecture d'écran : « au lieu de ». */
  insteadOf: string;
};

export const promoCopy: Record<Locale, PromoCopy> = {
  fr: {
    label: "Black Friday",
    line: `−${promo.percent} % sur toute la carte, jusqu'au 30 novembre`,
    short: `−${promo.percent} % sur toute la carte`,
    cta: "Voir les prix",
    whatsapp: `Offre : Black Friday −${promo.percent} %`,
    insteadOf: "au lieu de",
  },
  en: {
    label: "Black Friday",
    line: `${promo.percent}% off the whole menu, until 30 November`,
    short: `${promo.percent}% off the whole menu`,
    cta: "See prices",
    whatsapp: `Offer: Black Friday −${promo.percent}%`,
    insteadOf: "instead of",
  },
  it: {
    label: "Black Friday",
    line: `−${promo.percent}% su tutta la carta, fino al 30 novembre`,
    short: `−${promo.percent}% su tutta la carta`,
    cta: "Vedi i prezzi",
    whatsapp: `Offerta: Black Friday −${promo.percent}%`,
    insteadOf: "invece di",
  },
  es: {
    label: "Black Friday",
    line: `−${promo.percent} % en toda la carta, hasta el 30 de noviembre`,
    short: `−${promo.percent} % en toda la carta`,
    cta: "Ver precios",
    whatsapp: `Oferta: Black Friday −${promo.percent} %`,
    insteadOf: "en lugar de",
  },
};
