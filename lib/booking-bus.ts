/* ============================================================
   Lien carte → formulaire : un clic sur un soin de la carte le
   présélectionne dans le formulaire de réservation et fait défiler
   jusqu'à lui. La valeur est exactement celle d'une <option>.
   goToBooking() : même défilement, sans présélection (boutons
   « Réserver » de la page).
   ============================================================ */

import { track } from "@vercel/analytics";

const EVENT = "rayan:select-service";

export function selectService(value: string) {
  window.dispatchEvent(new CustomEvent<string>(EVENT, { detail: value }));
  track("menu_select", { service: value });
  goToBooking();
}

/** Fait défiler jusqu'au formulaire, titre sous la barre de navigation (≈ 72 px) avec de l'air. */
export function goToBooking() {
  const target = document.querySelector("#formulaire h2") ?? document.getElementById("formulaire");
  if (!target) return;
  const top = target.getBoundingClientRect().top + window.scrollY - 112;
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  window.scrollTo({ top, behavior: reduce ? "auto" : "smooth" });
}

export function onSelectService(handler: (value: string) => void) {
  const listener = (e: Event) => handler((e as CustomEvent<string>).detail);
  window.addEventListener(EVENT, listener);
  return () => window.removeEventListener(EVENT, listener);
}
