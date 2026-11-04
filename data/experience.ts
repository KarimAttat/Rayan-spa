/* ============================================================
   TEXTES DE L'EXPÉRIENCE — Rayan Spa  (FR · EN · IT · ES)
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
  menu: {
    title: string;
    bookItem: string;
    perDuration: string;
    /** Liens courts vers chaque groupe de la carte. */
    jump: { massages: string; hammams: string; forfaits: string; beaute: string };
    /** « Comprend » : devant la liste des étapes d'un hammam ou d'un forfait. */
    includes: string;
    /** Indication sous les durées : un toucher suffit pour réserver. */
    tapHint: string;
    /** À côté du prix d'un forfait. */
    perPerson: string;
    forTwo: string;
    /** Offert après chaque soin : dit une seule fois, sur la carte. */
    teaNote: string;
  };
  /** La photo plein écran entre le nom et la carte : promesse + deux chemins. */
  invite: {
    title: string;
    /** {price} et {currency} sont remplacés par le prix d'entrée de la carte. */
    text: string;
    book: string;
    menu: string;
  };
  places: { title: string; alts: string[] };
  band: { sentence: string; verb: string; label: string };
  booking: { preview: string; previewHint: string; optional: string };
  /** Appels à l'action répétés le long de la page. */
  cta: {
    title: string;
    text: string;
    choose: string;
    whatsapp: string;
    ritual: string;
    book: string;
  };
  contact: { hoursLine: string[]; greeting: string; greetingLabel: string; map: string; phoneLabel: string };
  footer: { invite: string; cta: string };
};

const fr: ExperienceCopy = {
  nav: { ritual: "Rituel", menu: "Carte", places: "Lieux", contact: "Contact" },
  hero: {
    h1Suffix: "Hammam et Massages à Marrakech",
    line: "Hammam et massages dans la médina de Marrakech, au 45 Derb Toudgha.",
    cta: "Réserver",
    menuLink: "Voir la Carte",
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
    house: "La Maison",
    places: "Les Lieux",
    placeList: ["Le Hammam", "Les Salles de Massage", "La Salle Duo", "Le Salon", "Le Rooftop"],
  },
  ritual: {
    title: "Le Rituel",
    intro:
      "Du hammam à la pause thé, nos forfaits suivent les gestes des hammams de la médina. Voici les étapes, dans l’ordre.",
    stages: [
      { name: "Vapeur", text: "La chaleur du hammam détend les muscles et prépare la peau. On s’installe, on respire, le temps ralentit." },
      { name: "Huile d’Argan", text: "L’huile d’argan, chauffée entre les mains, nourrit la peau et accompagne chaque geste du massage." },
      { name: "Massage", text: "Relaxant, tonifiant ou dabachi : le massage prolonge la détente du hammam." },
      { name: "Thé", text: "Après chaque soin, du thé et des pâtisseries marocaines, pour revenir doucement à la journée." },
    ],
  },
  menu: {
    title: "La Carte",
    bookItem: "Réserver",
    perDuration: "selon la durée",
    jump: { massages: "Massages", hammams: "Hammams", forfaits: "Forfaits", beaute: "Beauté" },
    includes: "Comprend",
    tapHint: "Touchez une durée pour la réserver.",
    perPerson: "par personne",
    forTwo: "pour 2 personnes",
    teaNote: "Thé et pâtisseries marocaines offerts après chaque soin.",
  },
  invite: {
    title: "Le Massage, au Cœur de la Médina",
    text: "Derrière une porte de la médina, le temps ralentit. Des mains expertes, l’huile d’argan tiédie, la vapeur du hammam : un rituel marocain, à partir de {price} {currency}.",
    book: "Réserver un Massage",
    menu: "Voir la Carte et les Prix",
  },
  places: {
    title: "Les Lieux",
    alts: [
      "Le rooftop, ses chapeaux de paille et la vue sur les toits de la médina",
      "Le hammam, habillé de zellige noir et blanc",
      "La salle de massage duo",
    ],
  },
  band: {
    sentence: "Écrivez-nous sur WhatsApp, nous répondons en quelques minutes.",
    verb: "Réserver",
    label: "Réserver sur WhatsApp",
  },
  booking: {
    preview: "Votre Message",
    previewHint: "Il s’écrit pendant que vous remplissez le formulaire.",
    optional: "facultatif",
  },
  cta: {
    title: "Réservez en une Minute",
    text: "Choisissez un soin, envoyez le message : nous confirmons l’heure sur WhatsApp.",
    choose: "Choisir un Soin",
    whatsapp: "Écrire sur WhatsApp",
    ritual: "Réserver Ce Soin",
    book: "Réserver",
  },
  contact: {
    hoursLine: ["Lun – Sam", "10h – 20h"],
    greeting: "Salam",
    greetingLabel: "Nous écrire sur WhatsApp",
    map: "Carte — Rayan Spa, Dar El Bacha, 45 Derb Toudgha, Marrakech",
    phoneLabel: "Appeler Rayan Spa",
  },
  footer: { invite: "Le Hammam Vous Attend", cta: "Réserver" },
};

const en: ExperienceCopy = {
  nav: { ritual: "Ritual", menu: "Menu", places: "The Spa", contact: "Contact" },
  hero: {
    h1Suffix: "Hammam and Massages in Marrakech",
    line: "Hammam and massages in the Marrakech medina, at 45 Derb Toudgha.",
    cta: "Book",
    menuLink: "See the Menu",
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
    house: "The House",
    places: "The Rooms",
    placeList: ["The Hammam", "The Massage Rooms", "The Couples’ Room", "The Lounge", "The Rooftop"],
  },
  ritual: {
    title: "The Ritual",
    intro:
      "From the hammam to the tea break, our packages follow the gestures of the medina’s hammams. Here are the steps, in order.",
    stages: [
      { name: "Steam", text: "The heat of the hammam loosens the muscles and prepares the skin. You settle in, you breathe, time slows down." },
      { name: "Argan Oil", text: "Argan oil, warmed between the hands, nourishes the skin and carries every movement of the massage." },
      { name: "Massage", text: "Relaxing, toning or dabachi: the massage carries on the calm of the hammam." },
      { name: "Tea", text: "After every treatment, tea and Moroccan pastries, to ease gently back into the day." },
    ],
  },
  menu: {
    title: "The Menu",
    bookItem: "Book",
    perDuration: "by duration",
    jump: { massages: "Massages", hammams: "Hammams", forfaits: "Packages", beaute: "Beauty" },
    includes: "Includes",
    tapHint: "Tap a duration to book it.",
    perPerson: "per person",
    forTwo: "for 2 people",
    teaNote: "Tea and Moroccan pastries offered after every treatment.",
  },
  invite: {
    title: "Massage in the Heart of the Medina",
    text: "Behind a door in the medina, time slows down. Expert hands, warm argan oil, the steam of the hammam: a Moroccan ritual, from {price} {currency}.",
    book: "Book a Massage",
    menu: "See the Menu and Prices",
  },
  places: {
    title: "The Spa",
    alts: [
      "The rooftop, its straw hats and the view over the medina roofs",
      "The hammam, clad in black and white zellige",
      "The couples’ massage room",
    ],
  },
  band: {
    sentence: "Message us on WhatsApp, we reply within minutes.",
    verb: "Book",
    label: "Book on WhatsApp",
  },
  booking: {
    preview: "Your Message",
    previewHint: "It writes itself as you fill in the form.",
    optional: "optional",
  },
  cta: {
    title: "Book in One Minute",
    text: "Pick a treatment, send the message: we confirm the time on WhatsApp.",
    choose: "Choose a Treatment",
    whatsapp: "Message Us on WhatsApp",
    ritual: "Book This Treatment",
    book: "Book",
  },
  contact: {
    hoursLine: ["Mon – Sat", "10:00 – 20:00"],
    greeting: "Salam",
    greetingLabel: "Message us on WhatsApp",
    map: "Map — Rayan Spa, Dar El Bacha, 45 Derb Toudgha, Marrakech",
    phoneLabel: "Call Rayan Spa",
  },
  footer: { invite: "The Hammam Is Waiting", cta: "Book" },
};

const it: ExperienceCopy = {
  nav: { ritual: "Rituale", menu: "Listino", places: "Gli Spazi", contact: "Contatti" },
  hero: {
    h1Suffix: "Hammam e Massaggi a Marrakech",
    line: "Hammam e massaggi nella medina di Marrakech, al 45 di Derb Toudgha.",
    cta: "Prenota",
    menuLink: "Vedi il Listino",
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
    house: "La Casa",
    places: "Gli Spazi",
    placeList: ["L’Hammam", "Le Sale Massaggi", "La Sala di Coppia", "Il Salotto", "Il Rooftop"],
  },
  ritual: {
    title: "Il Rituale",
    intro:
      "Dall’hammam alla pausa tè, i nostri pacchetti seguono i gesti degli hammam della medina. Ecco le tappe, in ordine.",
    stages: [
      { name: "Vapore", text: "Il calore dell’hammam scioglie i muscoli e prepara la pelle. Ci si sistema, si respira, il tempo rallenta." },
      { name: "Olio di Argan", text: "L’olio di argan, scaldato tra le mani, nutre la pelle e accompagna ogni gesto del massaggio." },
      { name: "Massaggio", text: "Rilassante, tonificante o dabachi: il massaggio prolunga la calma dell’hammam." },
      { name: "Tè", text: "Dopo ogni trattamento, tè e pasticcini marocchini, per tornare piano alla giornata." },
    ],
  },
  menu: {
    title: "Il Listino",
    bookItem: "Prenota",
    perDuration: "secondo la durata",
    jump: { massages: "Massaggi", hammams: "Hammam", forfaits: "Pacchetti", beaute: "Bellezza" },
    includes: "Comprende",
    tapHint: "Tocca una durata per prenotarla.",
    perPerson: "a persona",
    forTwo: "per 2 persone",
    teaNote: "Tè e pasticcini marocchini offerti dopo ogni trattamento.",
  },
  invite: {
    title: "Il Massaggio, nel Cuore della Medina",
    text: "Dietro una porta della medina, il tempo rallenta. Mani esperte, olio d’argan tiepido, il vapore dell’hammam: un rituale marocchino, a partire da {price} {currency}.",
    book: "Prenota un Massaggio",
    menu: "Vedi il Listino e i Prezzi",
  },
  places: {
    title: "Gli Spazi",
    alts: [
      "Il rooftop, i cappelli di paglia e la vista sui tetti della medina",
      "L’hammam, rivestito di zellige bianco e nero",
      "La sala massaggi di coppia",
    ],
  },
  band: {
    sentence: "Scriveteci su WhatsApp, rispondiamo in pochi minuti.",
    verb: "Prenota",
    label: "Prenota su WhatsApp",
  },
  booking: {
    preview: "Il Tuo Messaggio",
    previewHint: "Si scrive mentre compili il modulo.",
    optional: "facoltativo",
  },
  cta: {
    title: "Prenota in un Minuto",
    text: "Scegli un trattamento, invia il messaggio: confermiamo l’orario su WhatsApp.",
    choose: "Scegli un Trattamento",
    whatsapp: "Scrivici su WhatsApp",
    ritual: "Prenota Questo Trattamento",
    book: "Prenota",
  },
  contact: {
    hoursLine: ["Lun – Sab", "10 – 20"],
    greeting: "Salam",
    greetingLabel: "Scriveteci su WhatsApp",
    map: "Mappa — Rayan Spa, Dar El Bacha, 45 Derb Toudgha, Marrakech",
    phoneLabel: "Chiama Rayan Spa",
  },
  footer: { invite: "L’Hammam Vi Aspetta", cta: "Prenota" },
};

const es: ExperienceCopy = {
  nav: { ritual: "Ritual", menu: "Carta", places: "El Espacio", contact: "Contacto" },
  hero: {
    h1Suffix: "Hammam y Masajes en Marrakech",
    line: "Hammam y masajes en la medina de Marrakech, en el 45 de Derb Toudgha.",
    cta: "Reservar",
    menuLink: "Ver la Carta",
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
    house: "La Casa",
    places: "Los Espacios",
    placeList: ["El Hammam", "Las Salas de Masaje", "La Sala para Dos", "El Salón", "La Azotea"],
  },
  ritual: {
    title: "El Ritual",
    intro:
      "Del hammam a la pausa del té, nuestros paquetes siguen los gestos de los hammams de la medina. Estas son las etapas, en orden.",
    stages: [
      { name: "Vapor", text: "El calor del hammam relaja los músculos y prepara la piel. Te acomodas, respiras, el tiempo se detiene." },
      { name: "Aceite de Argán", text: "El aceite de argán, templado entre las manos, nutre la piel y acompaña cada gesto del masaje." },
      { name: "Masaje", text: "Relajante, tonificante o dabachi: el masaje prolonga la calma del hammam." },
      { name: "Té", text: "Después de cada tratamiento, té y dulces marroquíes, para volver despacio al día." },
    ],
  },
  menu: {
    title: "La Carta",
    bookItem: "Reservar",
    perDuration: "según la duración",
    jump: { massages: "Masajes", hammams: "Hammams", forfaits: "Paquetes", beaute: "Belleza" },
    includes: "Incluye",
    tapHint: "Toca una duración para reservarla.",
    perPerson: "por persona",
    forTwo: "para 2 personas",
    teaNote: "Té y dulces marroquíes de cortesía después de cada tratamiento.",
  },
  invite: {
    title: "El Masaje, en el Corazón de la Medina",
    text: "Tras una puerta de la medina, el tiempo se detiene. Manos expertas, aceite de argán tibio, el vapor del hammam: un ritual marroquí, desde {price} {currency}.",
    book: "Reservar un Masaje",
    menu: "Ver la Carta y los Precios",
  },
  places: {
    title: "El Espacio",
    alts: [
      "La azotea, sus sombreros de paja y la vista sobre los tejados de la medina",
      "El hammam, revestido de zellige blanco y negro",
      "La sala de masaje para dos",
    ],
  },
  band: {
    sentence: "Escríbenos por WhatsApp, respondemos en pocos minutos.",
    verb: "Reservar",
    label: "Reservar por WhatsApp",
  },
  booking: {
    preview: "Tu Mensaje",
    previewHint: "Se escribe mientras rellenas el formulario.",
    optional: "opcional",
  },
  cta: {
    title: "Reserva en un Minuto",
    text: "Elige un tratamiento, envía el mensaje: confirmamos la hora por WhatsApp.",
    choose: "Elegir Tratamiento",
    whatsapp: "Escríbenos por WhatsApp",
    ritual: "Reservar Este Tratamiento",
    book: "Reservar",
  },
  contact: {
    hoursLine: ["Lun – Sáb", "10 – 20 h"],
    greeting: "Salam",
    greetingLabel: "Escríbenos por WhatsApp",
    map: "Mapa — Rayan Spa, Dar El Bacha, 45 Derb Toudgha, Marrakech",
    phoneLabel: "Llamar a Rayan Spa",
  },
  footer: { invite: "El Hammam Te Espera", cta: "Reservar" },
};

export const experience: Record<Locale, ExperienceCopy> = { fr, en, it, es };
