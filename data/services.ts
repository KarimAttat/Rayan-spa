/* ============================================================
   SOINS & MASSAGES — Rayan SPA
   ------------------------------------------------------------
   👉 MODIFICA QUI i trattamenti: nome, durata, prezzo (MAD),
      descrizione e nome del file immagine.
   ⚠️ I prezzi sono PLACEHOLDER realistici per Marrakech.
      Sostituiscili con il tuo listino reale.
   ============================================================ */

export type Service = {
  id: string;
  name: string;
  /** Breve descrizione evocativa (FR) */
  description: string;
  /** Durata, es. "60 min" */
  duration: string;
  /** Prezzo in MAD (numero) */
  price: number;
  /** Trattamento in evidenza (badge "Signature") */
  featured?: boolean;
  /** Slot immagine — metti il file in /public/images/ con questo nome */
  image: {
    src: string; // es. "/images/hammam.jpg" — lascia "" per il placeholder
    file: string; // nome consigliato del file
    alt: string;
  };
};

/** ⚠️ Listino in MAD — PLACEHOLDER. Aggiorna con i tuoi prezzi reali. */
export const services: Service[] = [
  {
    id: "hammam-traditionnel",
    name: "Hammam traditionnel",
    description:
      "Le rituel séculaire de la vapeur, du savon noir et du gant kessa pour une peau purifiée et un esprit délassé.",
    duration: "60 min",
    price: 250,
    featured: true,
    image: {
      src: "",
      file: "images/soin-hammam.jpg",
      alt: "Salle de hammam en zellige avec vapeur et seau de cuivre",
    },
  },
  {
    id: "gommage-savon-noir",
    name: "Gommage au savon noir",
    description:
      "Le savon noir à l’huile d’olive et le gant kessa exfolient en douceur pour révéler une peau neuve et satinée.",
    duration: "45 min",
    price: 200,
    image: {
      src: "",
      file: "images/soin-savon-noir.jpg",
      alt: "Bol de savon noir traditionnel et gant kessa",
    },
  },
  {
    id: "massage-huile-argan",
    name: "Massage à l’huile d’argan",
    description:
      "Un massage enveloppant à l’or liquide du Maroc, nourrissant la peau et dénouant chaque tension.",
    duration: "60 min",
    price: 350,
    featured: true,
    image: {
      src: "",
      file: "images/soin-argan.jpg",
      alt: "Mains versant de l’huile d’argan lors d’un massage",
    },
  },
  {
    id: "massage-berbere",
    name: "Massage berbère",
    description:
      "Pressions profondes et gestes ancestraux des montagnes de l’Atlas pour libérer le corps en profondeur.",
    duration: "75 min",
    price: 420,
    image: {
      src: "",
      file: "images/soin-berbere.jpg",
      alt: "Massage berbère du dos à l’huile chaude",
    },
  },
  {
    id: "massage-pierres-chaudes",
    name: "Massage aux pierres chaudes",
    description:
      "La chaleur enveloppante des pierres volcaniques fond les tensions et réchauffe les muscles en profondeur.",
    duration: "75 min",
    price: 450,
    image: {
      src: "",
      file: "images/soin-pierres.jpg",
      alt: "Pierres chaudes alignées sur le dos pendant le soin",
    },
  },
  {
    id: "soin-visage",
    name: "Soin du visage",
    description:
      "Un soin éclat aux argiles et fleurs du Maroc qui purifie, hydrate et illumine le teint.",
    duration: "50 min",
    price: 300,
    image: {
      src: "",
      file: "images/soin-visage.jpg",
      alt: "Soin du visage avec masque d’argile et pétales",
    },
  },
  {
    id: "massage-duo",
    name: "Massage en duo",
    description:
      "Une parenthèse à deux, côte à côte, pour partager un moment de détente absolue dans une suite privée.",
    duration: "60 min",
    price: 650,
    image: {
      src: "",
      file: "images/soin-duo.jpg",
      alt: "Deux tables de massage côte à côte aux lanternes",
    },
  },
  {
    id: "forfait-rituel",
    name: "Forfait Rituel Rayan",
    description:
      "L’expérience complète : hammam, gommage au savon noir et massage à l’argan. Le voyage des sens absolu.",
    duration: "150 min",
    price: 850,
    featured: true,
    image: {
      src: "",
      file: "images/soin-rituel.jpg",
      alt: "Plateau de rituel spa : argan, savon noir, pétales et thé",
    },
  },
];

/** Valuta usata nei prezzi. */
export const currency = "MAD";
