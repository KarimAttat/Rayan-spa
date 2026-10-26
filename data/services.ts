/* ============================================================
   SOINS & MASSAGES — Rayan SPA
   ------------------------------------------------------------
   Listino reale (photos "listino1"/"listino2"), riorganizzato
   in 4 categorie : Forfaits (packs), Massages, Hammams,
   Manucure & Pédicure.
   👉 NOME, DESCRIZIONE e passaggi inclusi sono tradotti
      (FR/EN/IT/ES) in data/translations.ts → serviceData[<id>]
      e stepData[<stepId>]. Qui restano solo i dati strutturali :
      prezzi (MAD), durate, e l'elenco dei passaggi per id.
   ============================================================ */

export const currency = "MAD";

/** Massaggio con una o più coppie durata/prezzo (es. 30 min / 45 min / 1h). */
export type Massage = {
  id: string;
  variants: { duration: string; price: number }[];
  hidden?: boolean;
};

export const massages: Massage[] = [
  {
    id: "massage-relaxant",
    variants: [
      { duration: "20 min", price: 250 },
      { duration: "40 min", price: 400 },
    ],
  },
  {
    id: "massage-tonifiant",
    variants: [
      { duration: "20 min", price: 300 },
      { duration: "40 min", price: 500 },
    ],
  },
  {
    id: "massage-ayurvedique",
    variants: [
      { duration: "30 min", price: 250 },
      { duration: "1h", price: 500 },
    ],
    hidden: true,
  },
  { id: "massage-dabachi", variants: [{ duration: "30 min", price: 500 }] },
  { id: "massage-dos", variants: [{ duration: "20 min", price: 200 }] },
  { id: "massage-pieds", variants: [{ duration: "20 min", price: 200 }] },
];

/** Formula hammam à prix fixe, avec ses étapes (clé = stepData). */
export type Hammam = {
  id: string;
  price: number;
  stepIds: string[];
};

export const hammams: Hammam[] = [
  {
    id: "hammam-oriental",
    price: 250,
    stepIds: ["gommageSavonNoir", "shampooing", "savonnage", "gommageCafe"],
  },
  {
    id: "hammam-dabachi",
    price: 400,
    stepIds: ["gommageSavonNoir", "shampooingBio", "savonnage", "hydratation15"],
  },
  {
    id: "hammam-royal",
    price: 500,
    stepIds: [
      "gommageSavonNoir",
      "shampooingBio",
      "masqueGhassoul",
      "gommageCafe",
      "masqueCheveux",
      "hydratation15",
      "pauseThe",
    ],
  },
];

/** Forfait signature (soin composé) — mis en avant visuellement. */
export type Forfait = {
  id: string;
  price: number;
  stepIds: string[];
  featured?: boolean;
  hidden?: boolean;
};

export const forfaits: Forfait[] = [
  {
    id: "pack-relaxant",
    price: 550,
    stepIds: ["massageRelaxant40", "soinVisage1h", "pauseThe"],
    // Masqué tant que le soin visage n'est pas disponible (pas de machine).
    hidden: true,
  },
  {
    id: "pack-classique",
    price: 450,
    stepIds: [
      "hammam30",
      "gommage",
      "shampooingBio",
      "savonnage",
      "pauseThe",
      "massageRelaxant20",
    ],
  },
  {
    id: "pack-baume",
    price: 750,
    featured: true,
    stepIds: [
      "hammam45",
      "gommage",
      "savonNoir",
      "shampooingBio",
      "gommageGhassoul",
      "gommageCafe",
      "massageRelaxant40",
      "pauseThe",
    ],
  },
  {
    id: "pack-amoureux",
    price: 1100,
    featured: true,
    stepIds: [
      "hammam30",
      "savonNoir",
      "gommageChoix",
      "savonnage",
      "shampooing",
      "masqueCheveux",
      "massageChoix40",
      "pauseThePatisserie",
    ],
  },
  {
    id: "pack-royal",
    price: 1500,
    featured: true,
    stepIds: [
      "hammam1h",
      "savonNoir",
      "shampooing",
      "masqueCheveux",
      "gommageGhassoul",
      "gommageCafe",
      "savonnage",
      "pauseThe",
      "soinVisage45",
      "massageBaume40",
      "manucure",
      "pedicure",
    ],
    // Masqué tant que le soin visage n'est pas disponible (pas de machine).
    hidden: true,
  },
];

/** Soin unitaire à prix fixe (manucure, pédicure, visage). */
export type BeauteItem = { id: string; price: number; unavailable?: boolean };

export const beaute: BeauteItem[] = [
  // Momentanément suspendues.
  { id: "manucure", price: 180, unavailable: true },
  { id: "pedicure", price: 200, unavailable: true },
  { id: "pedicure-medicale", price: 250, unavailable: true },
  // Machine de soin visage momentanément absente du spa — voir indisponibilité ci-dessous.
  { id: "soin-visage", price: 300, unavailable: true },
];

/** Steps de forfait actuellement suspendus (ex. faute de machine dédiée ou de prestataire). */
export const unavailableStepIds = new Set([
  "soinVisage45",
  "soinVisage1h",
  "manucure",
  "pedicure",
]);
