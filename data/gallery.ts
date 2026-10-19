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
  { id: "rooftop", src: "/images/rooftop1.jpg", w: 1200, h: 1600, focus: "50% 50%" },
  { id: "hammam", src: "/images/hammam1.jpg", w: 1200, h: 1600, focus: "50% 40%" },
  { id: "massage", src: "/images/massage1.jpg", w: 1200, h: 1600, focus: "50% 60%" },
  { id: "massage-duo", src: "/images/massage2.jpg", w: 1200, h: 1600, focus: "50% 55%" },
];
