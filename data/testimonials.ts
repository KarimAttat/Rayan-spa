/* ============================================================
   AVIS CLIENTS — Rayan SPA
   👉 Recensioni PLACEHOLDER. Sostituisci con avis reali.
   ============================================================ */

export type Testimonial = {
  quote: string;
  author: string;
  origin: string; // città / paese
  rating: number; // 1–5
};

export const testimonials: Testimonial[] = [
  {
    quote:
      "Une parenthèse hors du temps. Le hammam traditionnel est un pur moment de grâce, et l’accueil d’une chaleur rare.",
    author: "Élodie M.",
    origin: "Paris, France",
    rating: 5,
  },
  {
    quote:
      "Le massage à l’huile d’argan était divin. J’ai quitté Rayan SPA en lévitation. À ne manquer sous aucun prétexte à Marrakech.",
    author: "Sophia R.",
    origin: "Genève, Suisse",
    rating: 5,
  },
  {
    quote:
      "Un cadre somptueux, des mains expertes et une sérénité absolue. Le forfait rituel vaut chaque minute.",
    author: "Karim B.",
    origin: "Casablanca, Maroc",
    rating: 5,
  },
  {
    quote:
      "Élégance, propreté et authenticité. Le massage en duo a été le point fort de notre voyage de noces.",
    author: "Thomas & Léa",
    origin: "Lyon, France",
    rating: 5,
  },
];
