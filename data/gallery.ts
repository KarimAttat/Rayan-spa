/* ============================================================
   LES LIEUX — Rayan SPA
   ------------------------------------------------------------
   Uniquement des photos du spa lui-même (pas d'images
   d'illustration), une seule par lieu : c'est ce que le visiteur
   retrouvera sur place.
   👉 Les légendes (alt) sont traduites dans data/experience.ts →
      places.alts, dans le même ordre que cette liste.
   ============================================================ */

export type GalleryItem = {
  id: string;
  src: string;
  w: number;
  h: number;
  /** Point focal pour le recadrage portrait (object-position). */
  focus?: string;
};

export const gallery: GalleryItem[] = [
  { id: "rooftop", src: "/images/rooftop1.jpg", w: 2200, h: 1643, focus: "50% 50%" },
  { id: "hammam", src: "/images/hammam1.jpg", w: 2200, h: 1643, focus: "50% 40%" },
  { id: "massage-duo", src: "/images/massage2.jpg", w: 2400, h: 1792, focus: "50% 55%" },
];
