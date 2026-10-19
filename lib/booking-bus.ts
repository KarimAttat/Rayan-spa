/* ============================================================
   Lien carte → formulaire : un clic sur un soin de la carte le
   présélectionne dans le formulaire de réservation et fait défiler
   jusqu'à lui. La valeur est exactement celle d'une <option>.
   ============================================================ */

const EVENT = "rayan:select-service";

export function selectService(value: string) {
  window.dispatchEvent(new CustomEvent<string>(EVENT, { detail: value }));
  // On vise le titre du formulaire, sous la barre de navigation (≈ 72 px) avec de l'air.
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
