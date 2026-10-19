/* ============================================================
   TEXTES DE L'EXPÉRIENCE — Rayan SPA  (FR · EN · IT · ES)
   ------------------------------------------------------------
   Complète data/translations.ts pour la mise en page actuelle
   (rituel, lieux, bandeau de réservation, adresse en grand).
   Les textes déjà publiés (à propos, carte, réservation…)
   restent dans translations.ts et sont réutilisés tels quels.
   Hook : const { x } = useI18n();
   ============================================================ */

import type { Locale } from "./translations";

export type RitualStage = { name: string; text: string };

export type ExperienceCopy = {
  nav: { ritual: string; menu: string; places: string; contact: string };
  hero: {
    /** Complète le h1 pour les lecteurs d'écran et les moteurs. */
    h1Suffix: string;
    line: string;
    cta: string;
    menuLink: string;
    /** Texte posé sur le hammam en plein écran, une fois entré dans le nom. */
    revealTitle: string;
    revealText: string;
  };
  status: {
    openUntil: string; // {time}
    opensToday: string; // {time}
    opensTomorrow: string; // {time}
    opensMonday: string; // {time}
  };
  about: {
    facts: { address: string; hours: string; booking: string };
    bookingValue: string;
    house: string;
    places: string;
    placeList: string[];
  };
  ritual: { title: string; intro: string; stages: RitualStage[] };
  menu: { title: string; bookItem: string; perDuration: string };
  places: { title: string; alts: string[] };
  band: { sentence: string; verb: string; label: string };
  booking: { preview: string; previewHint: string };
  contact: { hoursLine: string[]; greeting: string; greetingLabel: string; map: string; phoneLabel: string };
  footer: { invite: string; cta: string };
};

const fr: ExperienceCopy = {
  nav: { ritual: "Rituel", menu: "Carte", places: "Lieux", contact: "Contact" },
  hero: {
    h1Suffix: "Hammam et massages à Marrakech",
    line: "Hammam et massages dans la médina de Marrakech, au 45 Derb Toudgha.",
    cta: "Réserver",
    menuLink: "Voir la carte",
    revealTitle: "Entrez, respirez",
    revealText: "Lumière tamisée, huiles chaudes et mains expertes : le soin commence ici.",
  },
  status: {
    openUntil: "Ouvert aujourd’hui jusqu’à {time}",
    opensToday: "Ouvre aujourd’hui à {time}",
    opensTomorrow: "Fermé · ouvre demain à {time}",
    opensMonday: "Fermé le dimanche · ouvre lundi à {time}",
  },
  about: {
    facts: { address: "Adresse", hours: "Horaires", booking: "Réservation" },
    bookingValue: "Par WhatsApp",
    house: "La maison",
    places: "Les lieux",
    placeList: ["Le hammam", "Les salles de massage", "La salle duo", "Le salon", "Le rooftop"],
  },
  ritual: {
    title: "Le rituel",
    intro:
      "Du hammam à la pause thé, nos forfaits suivent les gestes des hammams de la médina. Voici les étapes, dans l’ordre.",
    stages: [
      { name: "Vapeur", text: "La chaleur du hammam détend les muscles et prépare la peau. On s’installe, on respire, le temps ralentit." },
      { name: "Huile d’argan", text: "L’huile d’argan, chauffée entre les mains, nourrit la peau et accompagne chaque geste du massage." },
      { name: "Massage", text: "Relaxant, tonifiant, dabachi ou au baume d’argan : le massage prolonge la détente du hammam." },
      { name: "Thé", text: "Une pause thé, avec des pâtisseries marocaines dans certains forfaits, pour revenir doucement à la journée." },
    ],
  },
  menu: { title: "La carte", bookItem: "Réserver", perDuration: "selon la durée" },
  places: {
    title: "Les lieux",
    alts: [
      "Le rooftop, ses chapeaux de paille et la vue sur les toits de la médina",
      "Le hammam, habillé de zellige noir et blanc",
      "Salle de massage baignée de lumière rouge",
      "La salle de massage duo",
    ],
  },
  band: {
    sentence: "Écrivez-nous sur WhatsApp, nous répondons en quelques minutes.",
    verb: "Réserver",
    label: "Réserver sur WhatsApp",
  },
  booking: {
    preview: "Votre message",
    previewHint: "Il s’écrit pendant que vous remplissez le formulaire.",
  },
  contact: {
    hoursLine: ["Lun – Sam", "10h – 20h"],
    greeting: "Salam",
    greetingLabel: "Nous écrire sur WhatsApp",
    map: "Carte — Rayan SPA, Dar El Bacha, 45 Derb Toudgha, Marrakech",
    phoneLabel: "Appeler Rayan SPA",
  },
  footer: { invite: "Le hammam vous attend", cta: "Réserver" },
};

const en: ExperienceCopy = {
  nav: { ritual: "Ritual", menu: "Menu", places: "The spa", contact: "Contact" },
  hero: {
    h1Suffix: "Hammam and massages in Marrakech",
    line: "Hammam and massages in the Marrakech medina, at 45 Derb Toudgha.",
    cta: "Book",
    menuLink: "See the menu",
    revealTitle: "Come in, breathe",
    revealText: "Soft light, warm oils and expert hands: your treatment begins here.",
  },
  status: {
    openUntil: "Open today until {time}",
    opensToday: "Opens today at {time}",
    opensTomorrow: "Closed · opens tomorrow at {time}",
    opensMonday: "Closed on Sundays · opens Monday at {time}",
  },
  about: {
    facts: { address: "Address", hours: "Hours", booking: "Booking" },
    bookingValue: "On WhatsApp",
    house: "The house",
    places: "The rooms",
    placeList: ["The hammam", "The massage rooms", "The couples’ room", "The lounge", "The rooftop"],
  },
  ritual: {
    title: "The ritual",
    intro:
      "From the hammam to the tea break, our packages follow the gestures of the medina’s hammams. Here are the steps, in order.",
    stages: [
      { name: "Steam", text: "The heat of the hammam loosens the muscles and prepares the skin. You settle in, you breathe, time slows down." },
      { name: "Argan oil", text: "Argan oil, warmed between the hands, nourishes the skin and carries every movement of the massage." },
      { name: "Massage", text: "Relaxing, toning, dabachi or with argan balm: the massage carries on the calm of the hammam." },
      { name: "Tea", text: "A tea break, with Moroccan pastries in some packages, to ease gently back into the day." },
    ],
  },
  menu: { title: "The menu", bookItem: "Book", perDuration: "by duration" },
  places: {
    title: "The spa",
    alts: [
      "The rooftop, its straw hats and the view over the medina roofs",
      "The hammam, clad in black and white zellige",
      "Massage room bathed in red light",
      "The couples’ massage room",
    ],
  },
  band: {
    sentence: "Message us on WhatsApp, we reply within minutes.",
    verb: "Book",
    label: "Book on WhatsApp",
  },
  booking: {
    preview: "Your message",
    previewHint: "It writes itself as you fill in the form.",
  },
  contact: {
    hoursLine: ["Mon – Sat", "10:00 – 20:00"],
    greeting: "Salam",
    greetingLabel: "Message us on WhatsApp",
    map: "Map — Rayan SPA, Dar El Bacha, 45 Derb Toudgha, Marrakech",
    phoneLabel: "Call Rayan SPA",
  },
  footer: { invite: "The hammam is waiting", cta: "Book" },
};

const it: ExperienceCopy = {
  nav: { ritual: "Rituale", menu: "Listino", places: "Gli spazi", contact: "Contatti" },
  hero: {
    h1Suffix: "Hammam e massaggi a Marrakech",
    line: "Hammam e massaggi nella medina di Marrakech, al 45 di Derb Toudgha.",
    cta: "Prenota",
    menuLink: "Vedi il listino",
    revealTitle: "Entrate, respirate",
    revealText: "Luce soffusa, oli caldi e mani esperte: il trattamento comincia qui.",
  },
  status: {
    openUntil: "Aperto oggi fino alle {time}",
    opensToday: "Apre oggi alle {time}",
    opensTomorrow: "Chiuso · apre domani alle {time}",
    opensMonday: "Chiuso la domenica · apre lunedì alle {time}",
  },
  about: {
    facts: { address: "Indirizzo", hours: "Orari", booking: "Prenotazioni" },
    bookingValue: "Su WhatsApp",
    house: "La casa",
    places: "Gli spazi",
    placeList: ["L’hammam", "Le sale massaggi", "La sala di coppia", "Il salotto", "Il rooftop"],
  },
  ritual: {
    title: "Il rituale",
    intro:
      "Dall’hammam alla pausa tè, i nostri pacchetti seguono i gesti degli hammam della medina. Ecco le tappe, in ordine.",
    stages: [
      { name: "Vapore", text: "Il calore dell’hammam scioglie i muscoli e prepara la pelle. Ci si sistema, si respira, il tempo rallenta." },
      { name: "Olio di argan", text: "L’olio di argan, scaldato tra le mani, nutre la pelle e accompagna ogni gesto del massaggio." },
      { name: "Massaggio", text: "Rilassante, tonificante, dabachi o al balsamo di argan: il massaggio prolunga la calma dell’hammam." },
      { name: "Tè", text: "Una pausa tè, con pasticceria marocchina in alcuni pacchetti, per tornare piano alla giornata." },
    ],
  },
  menu: { title: "Il listino", bookItem: "Prenota", perDuration: "secondo la durata" },
  places: {
    title: "Gli spazi",
    alts: [
      "Il rooftop, i cappelli di paglia e la vista sui tetti della medina",
      "L’hammam, rivestito di zellige bianco e nero",
      "Sala massaggi immersa nella luce rossa",
      "La sala massaggi di coppia",
    ],
  },
  band: {
    sentence: "Scriveteci su WhatsApp, rispondiamo in pochi minuti.",
    verb: "Prenota",
    label: "Prenota su WhatsApp",
  },
  booking: {
    preview: "Il tuo messaggio",
    previewHint: "Si scrive mentre compili il modulo.",
  },
  contact: {
    hoursLine: ["Lun – Sab", "10 – 20"],
    greeting: "Salam",
    greetingLabel: "Scriveteci su WhatsApp",
    map: "Mappa — Rayan SPA, Dar El Bacha, 45 Derb Toudgha, Marrakech",
    phoneLabel: "Chiama Rayan SPA",
  },
  footer: { invite: "L’hammam vi aspetta", cta: "Prenota" },
};

const es: ExperienceCopy = {
  nav: { ritual: "Ritual", menu: "Carta", places: "El espacio", contact: "Contacto" },
  hero: {
    h1Suffix: "Hammam y masajes en Marrakech",
    line: "Hammam y masajes en la medina de Marrakech, en el 45 de Derb Toudgha.",
    cta: "Reservar",
    menuLink: "Ver la carta",
    revealTitle: "Entra, respira",
    revealText: "Luz tenue, aceites calientes y manos expertas: el tratamiento empieza aquí.",
  },
  status: {
    openUntil: "Abierto hoy hasta las {time}",
    opensToday: "Abre hoy a las {time}",
    opensTomorrow: "Cerrado · abre mañana a las {time}",
    opensMonday: "Cerrado los domingos · abre el lunes a las {time}",
  },
  about: {
    facts: { address: "Dirección", hours: "Horario", booking: "Reservas" },
    bookingValue: "Por WhatsApp",
    house: "La casa",
    places: "Los espacios",
    placeList: ["El hammam", "Las salas de masaje", "La sala para dos", "El salón", "La azotea"],
  },
  ritual: {
    title: "El ritual",
    intro:
      "Del hammam a la pausa del té, nuestros paquetes siguen los gestos de los hammams de la medina. Estas son las etapas, en orden.",
    stages: [
      { name: "Vapor", text: "El calor del hammam relaja los músculos y prepara la piel. Te acomodas, respiras, el tiempo se detiene." },
      { name: "Aceite de argán", text: "El aceite de argán, templado entre las manos, nutre la piel y acompaña cada gesto del masaje." },
      { name: "Masaje", text: "Relajante, tonificante, dabachi o con bálsamo de argán: el masaje prolonga la calma del hammam." },
      { name: "Té", text: "Una pausa con té, y pastelería marroquí en algunos paquetes, para volver despacio al día." },
    ],
  },
  menu: { title: "La carta", bookItem: "Reservar", perDuration: "según la duración" },
  places: {
    title: "El espacio",
    alts: [
      "La azotea, sus sombreros de paja y la vista sobre los tejados de la medina",
      "El hammam, revestido de zellige blanco y negro",
      "Sala de masaje bañada de luz roja",
      "La sala de masaje para dos",
    ],
  },
  band: {
    sentence: "Escríbenos por WhatsApp, respondemos en pocos minutos.",
    verb: "Reservar",
    label: "Reservar por WhatsApp",
  },
  booking: {
    preview: "Tu mensaje",
    previewHint: "Se escribe mientras rellenas el formulario.",
  },
  contact: {
    hoursLine: ["Lun – Sáb", "10 – 20 h"],
    greeting: "Salam",
    greetingLabel: "Escríbenos por WhatsApp",
    map: "Mapa — Rayan SPA, Dar El Bacha, 45 Derb Toudgha, Marrakech",
    phoneLabel: "Llamar a Rayan SPA",
  },
  footer: { invite: "El hammam te espera", cta: "Reservar" },
};

export const experience: Record<Locale, ExperienceCopy> = { fr, en, it, es };
