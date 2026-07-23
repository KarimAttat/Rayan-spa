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
  /** Carte plus large dans le filmstrip (photos panoramiques, vidéo). */
  size?: "lg";
};

export const gallery: GalleryItem[] = [
  {
    id: "g1",
    type: "image",
    src: "/images/galerie-hammam.jpg",
    file: "images/galerie-hammam.jpg",
    alt: "Voûte du hammam en tadelakt sous la lumière des lanternes",
  },
  {
    id: "g2",
    type: "image",
    src: "/images/galerie-massage.jpg",
    file: "images/galerie-massage.jpg",
    alt: "Table de massage drapée de lin et pétales de rose",
  },
  {
    id: "g3",
    type: "image",
    src: "/images/galerie-the.jpg",
    file: "images/galerie-the.jpg",
    alt: "Rooftop patio pour savourer un thé et des pâtisseries après le soin",
    size: "lg",
  },
  {
    id: "g5",
    type: "image",
    src: "/images/massage5.jpg",
    file: "images/massage5.jpg",
    alt: "Application d’huile d’argan lors d’un massage",
  },
  {
    id: "g6",
    type: "image",
    src: "/images/massage4.jpg",
    file: "images/massage4.jpg",
    alt: "Massage des épaules et de la nuque, geste précis",
  },
];
