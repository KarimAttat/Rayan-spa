/* ============================================================
   LES LIEUX — Rayan SPA
   ------------------------------------------------------------
   Uniquement des photos du spa lui-même (pas d'images
   d'illustration) : c'est ce que le visiteur retrouvera sur place.
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
  { id: "rooftop-1", src: "/images/rooftop1.jpg", w: 1200, h: 1600, focus: "50% 50%" },
  { id: "rooftop-2", src: "/images/rooftop2.jpg", w: 1200, h: 1600, focus: "55% 50%" },
  { id: "salon", src: "/images/ingresso1.jpg", w: 1200, h: 1600, focus: "50% 55%" },
  { id: "hammam-1", src: "/images/hammam1.jpg", w: 1200, h: 1600, focus: "50% 40%" },
  { id: "hammam-2", src: "/images/hammam2.jpg", w: 1200, h: 1600, focus: "45% 50%" },
  { id: "massage-1", src: "/images/massage1.jpg", w: 1200, h: 1600, focus: "50% 60%" },
  { id: "massage-duo", src: "/images/massage2.jpg", w: 1200, h: 1600, focus: "50% 55%" },
  { id: "porte", src: "/images/door1.jpg", w: 1200, h: 1600, focus: "45% 50%" },
  { id: "vestiaire", src: "/images/door2.jpg", w: 1200, h: 1600, focus: "65% 50%" },
];
