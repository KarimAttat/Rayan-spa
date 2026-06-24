/* ============================================================
   GALERIE — Rayan SPA
   👉 Slot foto/video. Metti i file in /public/images/ o /public/videos/
      e incolla il percorso in "src". Lascia "" per il placeholder.
   ============================================================ */

export type GalleryItem = {
  id: string;
  type: "image" | "video";
  src: string; // es. "/images/galerie-1.jpg" — "" = placeholder
  file: string; // nome consigliato
  alt: string;
  /** Layout: alcuni elementi occupano più spazio nella griglia */
  span?: "tall" | "wide";
};

export const gallery: GalleryItem[] = [
  {
    id: "g1",
    type: "image",
    src: "",
    file: "images/galerie-hammam.jpg",
    alt: "Voûte du hammam en tadelakt sous la lumière des lanternes",
    span: "tall",
  },
  {
    id: "g2",
    type: "image",
    src: "",
    file: "images/galerie-massage.jpg",
    alt: "Table de massage drapée de lin et pétales de rose",
  },
  {
    id: "g3",
    type: "image",
    src: "",
    file: "images/galerie-cour.jpg",
    alt: "Patio du riad avec fontaine en zellige et palmiers",
    span: "wide",
  },
  {
    id: "g4",
    type: "image",
    src: "",
    file: "images/galerie-the.jpg",
    alt: "Service du thé à la menthe et pâtisseries marocaines",
  },
  {
    id: "g5",
    type: "video",
    src: "",
    file: "videos/galerie-ambiance.mp4",
    alt: "Vidéo d’ambiance du spa",
    span: "tall",
  },
  {
    id: "g6",
    type: "image",
    src: "",
    file: "images/galerie-produits.jpg",
    alt: "Huiles d’argan, savon noir et fleurs séchées sur plateau de cuivre",
  },
];
