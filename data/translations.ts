/* ============================================================
   TRADUCTIONS — Rayan Spa  (FR · EN · IT · ES)
   ------------------------------------------------------------
   👉 Tutte le stringhe visibili del sito vivono qui.
      Per aggiungere/correggere un testo, modifica le 4 lingue.
      I dati strutturali (prezzi, immagini, link, telefono)
      restano in data/site-config.ts e data/services.ts.
   ============================================================ */

export const locales = ["fr", "en", "it", "es"] as const;
export type Locale = (typeof locales)[number];

/** Nome leggibile + sigla mostrati nel selettore di lingua. */
export const localeMeta: Record<Locale, { name: string; short: string }> = {
  fr: { name: "Français", short: "FR" },
  en: { name: "English", short: "EN" },
  it: { name: "Italiano", short: "IT" },
  es: { name: "Español", short: "ES" },
};

export type Dict = {
  /** Locale BCP-47 pour Intl (dates) + attribut <html lang>. */
  intl: string;
  htmlLang: string;
  /** Titre + description SEO (balise <title>, meta description, Open Graph). */
  meta: { title: string; description: string };
  nav: { about: string; services: string; gallery: string; reviews: string; contact: string };
  header: {
    book: string;
    language: string;
    openMenu: string;
    closeMenu: string;
  };
  hero: {
    tagline: string;
    title: string;
    subtitle: string;
    ctaBook: string;
    ctaDiscover: string;
    scroll: string;
  };
  about: {
    eyebrow: string;
    title: string;
    p1: string;
    p2: string;
    values: { k: string; v: string }[];
  };
  services: {
    eyebrow: string;
    title: string;
    intro: string;
    signature: string;
    book: string;
    priceNote: string;
    categoryForfaits: string;
    categoryMassages: string;
    categoryHammams: string;
    categoryBeaute: string;
    includes: string;
    unavailable: string;
  };
  gallery: {
    eyebrow: string;
    title: string;
    intro: string;
    enlarge: string;
    comingSoon: string;
    alts: string[];
  };
  booking: {
    eyebrow: string;
    title: string;
    intro: string;
    perks: string[];
    fields: {
      name: string;
      namePh: string;
      phone: string;
      service: string;
      servicePh: string;
      date: string;
      time: string;
      people: string;
      notes: string;
      notesPh: string;
    };
    errors: { name: string; phone: string; service: string; date: string };
    submit: string;
    demo: { pre: string; post: string };
    confirm: {
      title: string;
      body: string;
      demoNote: string;
      open: string;
      reset: string;
    };
  };
  testimonials: {
    eyebrow: string;
    title: string;
    intro: string;
    items: { quote: string; origin: string }[];
  };
  contact: {
    eyebrow: string;
    title: string;
    intro: string;
    cards: { address: string; hours: string; whatsapp: string; email: string };
    whatsappCta: string;
    follow: string;
    route: string;
    days: string[];
  };
  footer: { tagline: string; rights: string; vitrine: string };
  whatsapp: {
    greeting: string;
    intro: string;
    name: string;
    phone: string;
    service: string;
    date: string;
    time: string;
    people: string;
    notes: string;
    toConvene: string;
    footer: string;
  };
  /** Nom + description par soin (clé = id dans data/services.ts). */
  serviceData: Record<string, { name: string; description?: string; meta?: string }>;
  /** Libellé de chaque étape incluse (clé = stepId dans data/services.ts). */
  stepData: Record<string, string>;
};

/* --------------------------------------------------------------- */
/*  FRANÇAIS (langue source)                                       */
/* --------------------------------------------------------------- */
const fr: Dict = {
  intl: "fr-FR",
  htmlLang: "fr",
  meta: {
    title: "Rayan Spa · Hammam et Massages à Marrakech",
    description:
      "Rayan Spa, à Dar El Bacha, au cœur de la médina de Marrakech. Hammam traditionnel, massages à l’huile d’argan et rituels berbères. Réservez sur WhatsApp.",
  },
  nav: { about: "À Propos", services: "Soins", gallery: "Galerie", reviews: "Avis", contact: "Contact" },
  header: { book: "Réserver", language: "Langue", openMenu: "Ouvrir le menu", closeMenu: "Fermer le menu" },
  hero: {
    tagline: "Hammam & Massages · Marrakech",
    title: "La Tradition Marocaine du Hammam et du Massage",
    subtitle:
      "Au cœur de la médina de Marrakech, le rituel du hammam et le toucher de mains expertes détendent le corps et apaisent l’esprit.",
    ctaBook: "Réserver Maintenant",
    ctaDiscover: "Découvrir Nos Soins",
    scroll: "Faire Défiler",
  },
  about: {
    eyebrow: "À Propos",
    title: "Un Espace de Calme au Cœur de Marrakech",
    p1: "Derrière les murs de terre rose de la médina, Rayan Spa vous ouvre les portes d’un véritable rituel marocain. Ici, le temps ralentit : la vapeur du hammam, le parfum de l’argan et le clapotis de la fontaine vous enveloppent dès le premier pas.",
    p2: "Notre approche puise dans les gestes traditionnels berbères, transmis depuis des générations dans les hammams de la médina. Le corps se détend, l’esprit se pose. Chaque soin prend le temps qu’il faut, sans jamais être pressé.",
    values: [
      { k: "Authenticité", v: "Des rituels berbères transmis de génération en génération." },
      { k: "Sérénité", v: "Un écrin de calme préservé du tumulte de la médina." },
      { k: "Excellence", v: "Des produits naturels et des mains expertes, à chaque geste." },
    ],
  },
  services: {
    eyebrow: "Soins & Massages",
    title: "Nos Rituels de Soin",
    intro:
      "Une carte de soins inspirée des traditions marocaines, des huiles précieuses de l’Atlas au savon noir des hammams ancestraux.",
    signature: "Signature",
    book: "Réserver →",
    priceNote: "Tarifs par personne en {currency} · à titre indicatif",
    categoryForfaits: "Nos Forfaits Signature",
    categoryMassages: "Massages à la Carte",
    categoryHammams: "Hammams",
    categoryBeaute: "Manucure & Pédicure",
    includes: "Comprend",
    unavailable: "Temporairement indisponible",
  },
  gallery: {
    eyebrow: "Galerie",
    title: "L’Atmosphère Rayan",
    intro:
      "Flânez à travers nos espaces : la lumière tamisée, le zellige et la quiétude d’un véritable riad marocain.",
    enlarge: "Agrandir",
    comingSoon: "Bientôt Disponible",
    alts: [
      "Voûte du hammam en tadelakt sous la lumière des lanternes",
      "Table de massage drapée de lin et pétales de rose",
      "Rooftop patio pour savourer un thé et des pâtisseries après le soin",
      "Application d’huile d’argan lors d’un massage",
      "Massage des épaules et de la nuque, geste précis",
    ],
  },
  booking: {
    eyebrow: "Réservation",
    title: "Réservez Votre Soin",
    intro:
      "Remplissez le formulaire : le message est déjà prêt, il ne reste qu’à l’envoyer sur WhatsApp. Nous vous répondons en quelques minutes pour fixer l’heure.",
    perks: [
      "Réponse rapide via WhatsApp",
      "Sans engagement ni paiement en ligne",
      "Conseils personnalisés pour votre soin",
    ],
    fields: {
      name: "Votre Nom",
      namePh: "Prénom et nom",
      phone: "Téléphone",
      service: "Soin Souhaité",
      servicePh: "Choisir un Soin",
      date: "Date",
      time: "Heure",
      people: "Personnes",
      notes: "Notes (facultatif)",
      notesPh: "Une préférence, une occasion spéciale ?",
    },
    errors: {
      name: "Veuillez indiquer votre nom.",
      phone: "Numéro de téléphone invalide.",
      service: "Choisissez un soin.",
      date: "Indiquez une date souhaitée.",
    },
    submit: "Envoyer sur WhatsApp",
    demo: {
      pre: "⚠️ Démo : le numéro WhatsApp n’est pas encore configuré (voir ",
      post: ").",
    },
    confirm: {
      title: "Votre Demande Est Prête",
      body: "WhatsApp devrait s’ouvrir avec votre message déjà écrit. Si rien ne se passe, cliquez sur le bouton plus bas.",
      demoNote: "(Démo : numéro WhatsApp à configurer dans data/site-config.ts)",
      open: "Ouvrir WhatsApp",
      reset: "Nouvelle Demande",
    },
  },
  testimonials: {
    eyebrow: "Témoignages",
    title: "Ce Qu’ils en Disent",
    intro: "L’expérience racontée par celles et ceux qui sont déjà venus.",
    items: [
      { quote: "Le hammam traditionnel était vraiment relaxant, et l’accueil bien plus chaleureux que ce qu’on attendait.", origin: "Paris, France" },
      { quote: "Le massage à l’huile d’argan était incroyable, je suis restée légère toute la journée après. À faire sans hésiter si vous passez par Marrakech.", origin: "Genève, Suisse" },
      { quote: "Le cadre est magnifique et le personnel sait clairement ce qu’il fait. Le forfait complet vaut chaque minute.", origin: "Casablanca, Maroc" },
      { quote: "Très propre, très soigné, et sincèrement marocain. Le massage en duo a été le meilleur moment de notre voyage de noces.", origin: "Lyon, France" },
    ],
  },
  contact: {
    eyebrow: "Contact",
    title: "Venez Nous Rendre Visite",
    intro: "Au cœur de la médina de Marrakech, à quelques pas des souks.",
    cards: { address: "Adresse", hours: "Horaires", whatsapp: "WhatsApp", email: "Email" },
    whatsappCta: "Envoyer un Message sur WhatsApp",
    follow: "Nos Réseaux",
    route: "Itinéraire",
    days: ["Du Lundi au Samedi", "Dimanche"],
  },
  footer: {
    tagline: "Hammam & Massages · Marrakech",
    rights: "Tous droits réservés.",
    vitrine: "Site Vitrine · Marrakech, Maroc",
  },
  whatsapp: {
    greeting: "Bonjour {brand},",
    intro: "Je souhaite réserver un soin :",
    name: "Nom",
    phone: "Téléphone",
    service: "Soin Souhaité",
    date: "Date Souhaitée",
    time: "Heure Souhaitée",
    people: "Nombre de Personnes",
    notes: "Notes",
    toConvene: "à convenir",
    footer: "Merci de me confirmer la disponibilité. 🌿",
  },
  serviceData: {
    "pack-relaxant": {
      name: "Pack Relaxant",
      description: "Un massage relaxant d’une heure suivi d’un soin du visage complet, pour dénouer le corps et apaiser l’esprit.",
    },
    "pack-classique": {
      name: "Pack Classique",
      description: "L’essentiel du rituel marocain : hammam, gommage et un massage relaxant pour repartir léger.",
    },
    "pack-baume": {
      name: "Pack Baume",
      description: "Un hammam complet suivi d’un massage de 40 min au choix — la signature Rayan pour une peau nourrie et un corps détendu.",
    },
    "pack-amoureux": {
      name: "Pack Amoureux",
      description: "Une parenthèse à deux, côte à côte : hammam, gommage, massage au choix et pause thé aux pâtisseries marocaines.",
    },
    "pack-royal": {
      name: "Pack Royal",
      description: "L’expérience complète Rayan : quatre heures de soins, du hammam au massage au baume, jusqu’au soin du visage, manucure et pédicure.",
      meta: "4h",
    },
    "massage-relaxant": {
      name: "Massage Relaxant",
      description: "Gestes doux et enveloppants pour relâcher les tensions du quotidien.",
    },
    "massage-tonifiant": {
      name: "Massage Tonifiant",
      description: "Pressions plus fermes pour réveiller le corps et stimuler la circulation.",
    },
    "massage-ayurvedique": {
      name: "Massage Ayurvédique",
      description: "Un massage venu d’Inde, aux huiles chaudes, pour un équilibre profond entre corps et esprit.",
    },
    "massage-dabachi": {
      name: "Massage Dabachi",
      description: "Le geste traditionnel marocain, réalisé uniquement avec les coudes : une pression profonde et soutenue, pour un relâchement en profondeur.",
    },
    "massage-dos": {
      name: "Massage du Dos",
      description: "Un soin ciblé sur les épaules et le dos, pour dénouer les nœuds de tension.",
    },
    "massage-pieds": {
      name: "Massage des Pieds",
      description: "Un moment de légèreté pour des pieds apaisés après une journée dans la médina.",
    },
    "hammam-oriental": { name: "Oriental Hammam" },
    "hammam-dabachi": { name: "Hammam Dabachi" },
    "hammam-royal": { name: "Hammam Royal" },
    manucure: { name: "Manucure" },
    pedicure: { name: "Pédicure" },
    "pedicure-medicale": { name: "Pédicure Médicale" },
    "soin-visage": { name: "Soin du Visage" },
  },
  stepData: {
    hammam30: "Hammam 30 min",
    hammam45: "Hammam 45 min",
    hammam1h: "Hammam 1h",
    gommage: "Gommage Exfoliant",
    gommageSavonNoir: "Gommage au Savon Noir",
    gommageGhassoul: "Gommage au Ghassoul",
    gommageCafe: "Gommage au Café Anti-Cellulite",
    gommageChoix: "Gommage au Choix (savon noir ou ghassoul)",
    savonNoir: "Application de Savon Noir",
    savonnage: "Savonnage",
    shampooing: "Shampooing",
    shampooingBio: "Shampooing Bio",
    masqueGhassoul: "Masque Complet au Ghassoul",
    masqueCheveux: "Masque Cheveux",
    hydratation15: "15 min d’Hydratation",
    pauseThe: "Pause Thé",
    pauseThePatisserie: "Pause Thé & Pâtisserie Marocaine",
    soinVisage45: "Soin du Visage 45 min",
    soinVisage1h: "Soin du Visage 1h",
    massageBaume40: "Massage au Baume 40 min",
    massageRelaxant40: "Massage Relaxant 40 min",
    massageRelaxant20: "Massage Relaxant 20 min",
    massageChoix40: "Massage au Choix 40 min (relaxant ou tonifiant)",
    manucure: "Manucure",
    pedicure: "Pédicure",
  },
};

/* --------------------------------------------------------------- */
/*  ENGLISH                                                        */
/* --------------------------------------------------------------- */
const en: Dict = {
  intl: "en-GB",
  htmlLang: "en",
  meta: {
    title: "Rayan Spa · Hammam and Massages in Marrakech",
    description:
      "Rayan Spa, in Dar El Bacha, in the heart of the Marrakech medina. Traditional hammam, argan oil massages and Berber rituals. Book on WhatsApp.",
  },
  nav: { about: "About", services: "Treatments", gallery: "Gallery", reviews: "Reviews", contact: "Contact" },
  header: { book: "Book", language: "Language", openMenu: "Open menu", closeMenu: "Close menu" },
  hero: {
    tagline: "Hammam & Massages · Marrakech",
    title: "The Moroccan Tradition of Hammam and Massage",
    subtitle:
      "In the heart of the Marrakech medina, the hammam ritual and the touch of expert hands relax the body and calm the mind.",
    ctaBook: "Book Now",
    ctaDiscover: "Discover Our Treatments",
    scroll: "Scroll",
  },
  about: {
    eyebrow: "About",
    title: "A Calm Space in the Heart of Marrakech",
    p1: "Behind the pink earthen walls of the medina, Rayan Spa opens the doors to an authentic Moroccan ritual. Here, time slows down: the steam of the hammam, the scent of argan and the murmur of the fountain envelop you from the very first step.",
    p2: "Our approach draws on traditional Berber techniques, passed down through generations in the hammams of the medina. The body relaxes, the mind settles. Every treatment takes the time it needs, never rushed.",
    values: [
      { k: "Authenticity", v: "Berber rituals passed down from generation to generation." },
      { k: "Serenity", v: "A cocoon of calm, sheltered from the bustle of the medina." },
      { k: "Excellence", v: "Natural products and expert hands, in every gesture." },
    ],
  },
  services: {
    eyebrow: "Treatments & Massages",
    title: "Our Rituals of Care",
    intro:
      "A treatment menu inspired by Moroccan traditions, from the precious oils of the Atlas to the black soap of ancestral hammams.",
    signature: "Signature",
    book: "Book →",
    priceNote: "Prices per person in {currency} · indicative",
    categoryForfaits: "Our Signature Packages",
    categoryMassages: "Massages à la Carte",
    categoryHammams: "Hammams",
    categoryBeaute: "Manicure & Pedicure",
    includes: "Includes",
    unavailable: "Temporarily unavailable",
  },
  gallery: {
    eyebrow: "Gallery",
    title: "The Rayan Atmosphere",
    intro:
      "Wander through our spaces: the soft light, the zellige and the quiet of an authentic Moroccan riad.",
    enlarge: "Enlarge",
    comingSoon: "Coming Soon",
    alts: [
      "Tadelakt hammam vault under lantern light",
      "Massage table draped in linen with rose petals",
      "Rooftop patio to enjoy tea and pastries after your treatment",
      "Applying argan oil during a massage",
      "Shoulder and neck massage, precise touch",
    ],
  },
  booking: {
    eyebrow: "Booking",
    title: "Book Your Treatment",
    intro:
      "Fill in the form: the message is ready, all that’s left is to send it on WhatsApp. We reply within minutes to confirm the time.",
    perks: [
      "Quick reply via WhatsApp",
      "No commitment or online payment",
      "Personalised advice for your treatment",
    ],
    fields: {
      name: "Your Name",
      namePh: "First and last name",
      phone: "Phone",
      service: "Desired Treatment",
      servicePh: "Choose a Treatment",
      date: "Date",
      time: "Time",
      people: "People",
      notes: "Notes (optional)",
      notesPh: "A preference, a special occasion?",
    },
    errors: {
      name: "Please enter your name.",
      phone: "Invalid phone number.",
      service: "Choose a treatment.",
      date: "Choose a desired date.",
    },
    submit: "Send on WhatsApp",
    demo: {
      pre: "⚠️ Demo: the WhatsApp number is not configured yet (see ",
      post: ").",
    },
    confirm: {
      title: "Your Request Is Ready",
      body: "WhatsApp should open with your message already written. If nothing happens, click the button below.",
      demoNote: "(Demo: WhatsApp number to configure in data/site-config.ts)",
      open: "Open WhatsApp",
      reset: "New Request",
    },
  },
  testimonials: {
    eyebrow: "Testimonials",
    title: "What People Say",
    intro: "The experience, told by people who have already been.",
    items: [
      { quote: "The traditional hammam was genuinely relaxing, and the welcome was warmer than we expected.", origin: "Paris, France" },
      { quote: "The argan oil massage was amazing, I felt light for the rest of the day. Don’t skip it if you’re in Marrakech.", origin: "Geneva, Switzerland" },
      { quote: "Beautiful setting, and the staff clearly know what they’re doing. The full package is worth every minute.", origin: "Casablanca, Morocco" },
      { quote: "Very clean, very thoughtful, and genuinely Moroccan. The couples’ massage was the highlight of our honeymoon.", origin: "Lyon, France" },
    ],
  },
  contact: {
    eyebrow: "Contact",
    title: "Come and Visit Us",
    intro: "In the heart of the Marrakech medina, a few steps from the souks.",
    cards: { address: "Address", hours: "Opening Hours", whatsapp: "WhatsApp", email: "Email" },
    whatsappCta: "Send a WhatsApp Message",
    follow: "Follow Us",
    route: "Directions",
    days: ["Monday to Saturday", "Sunday"],
  },
  footer: {
    tagline: "Hammam & Massages · Marrakech",
    rights: "All rights reserved.",
    vitrine: "Showcase Site · Marrakech, Morocco",
  },
  whatsapp: {
    greeting: "Hello {brand},",
    intro: "I would like to book a treatment:",
    name: "Name",
    phone: "Phone",
    service: "Treatment",
    date: "Preferred Date",
    time: "Preferred Time",
    people: "Number of People",
    notes: "Notes",
    toConvene: "to be arranged",
    footer: "Please confirm availability. 🌿",
  },
  serviceData: {
    "pack-relaxant": {
      name: "Relaxing Package",
      description: "A one-hour relaxing massage followed by a complete facial treatment, to release the body and calm the mind.",
    },
    "pack-classique": {
      name: "Classic Package",
      description: "The essence of the Moroccan ritual: hammam, scrub and a relaxing massage to leave feeling light.",
    },
    "pack-baume": {
      name: "Balm Package",
      description: "A full hammam followed by a 40 min massage of your choice — the Rayan signature for nourished skin and a relaxed body.",
    },
    "pack-amoureux": {
      name: "Lovers’ Package",
      description: "A moment for two, side by side: hammam, scrub, massage of your choice and tea with Moroccan pastries.",
    },
    "pack-royal": {
      name: "Royal Package",
      description: "The complete Rayan experience: four hours of care, from hammam to balm massage, facial treatment, manicure and pedicure.",
      meta: "4h",
    },
    "massage-relaxant": {
      name: "Relaxing Massage",
      description: "Gentle, enveloping strokes to release everyday tension.",
    },
    "massage-tonifiant": {
      name: "Toning Massage",
      description: "Firmer pressure to awaken the body and stimulate circulation.",
    },
    "massage-ayurvedique": {
      name: "Ayurvedic Massage",
      description: "A massage from India, with warm oils, for a deep balance between body and mind.",
    },
    "massage-dabachi": {
      name: "Dabachi Massage",
      description: "The traditional Moroccan technique, performed with the elbows only: deep, sustained pressure for a thorough release.",
    },
    "massage-dos": {
      name: "Back Massage",
      description: "A treatment focused on the shoulders and back, to release knots of tension.",
    },
    "massage-pieds": {
      name: "Foot Massage",
      description: "A moment of lightness for feet soothed after a day in the medina.",
    },
    "hammam-oriental": { name: "Oriental Hammam" },
    "hammam-dabachi": { name: "Hammam Dabachi" },
    "hammam-royal": { name: "Royal Hammam" },
    manucure: { name: "Manicure" },
    pedicure: { name: "Pedicure" },
    "pedicure-medicale": { name: "Medical Pedicure" },
    "soin-visage": { name: "Facial Treatment" },
  },
  stepData: {
    hammam30: "Hammam 30 min",
    hammam45: "Hammam 45 min",
    hammam1h: "Hammam 1h",
    gommage: "Exfoliating Scrub",
    gommageSavonNoir: "Black Soap Scrub",
    gommageGhassoul: "Ghassoul Clay Scrub",
    gommageCafe: "Anti-Cellulite Coffee Scrub",
    gommageChoix: "Choice of Scrub (black soap or ghassoul)",
    savonNoir: "Black Soap Application",
    savonnage: "Soaping",
    shampooing: "Shampoo",
    shampooingBio: "Organic Shampoo",
    masqueGhassoul: "Full Ghassoul Clay Mask",
    masqueCheveux: "Hair Mask",
    hydratation15: "15 min Hydration",
    pauseThe: "Tea Break",
    pauseThePatisserie: "Tea Break with Moroccan Pastries",
    soinVisage45: "45 min Facial Treatment",
    soinVisage1h: "1h Facial Treatment",
    massageBaume40: "40 min Balm Massage",
    massageRelaxant40: "40 min Relaxing Massage",
    massageRelaxant20: "20 min Relaxing Massage",
    massageChoix40: "40 min Massage of Your Choice (relaxing or toning)",
    manucure: "Manicure",
    pedicure: "Pedicure",
  },
};

/* --------------------------------------------------------------- */
/*  ITALIANO                                                       */
/* --------------------------------------------------------------- */
const it: Dict = {
  intl: "it-IT",
  htmlLang: "it",
  meta: {
    title: "Rayan Spa · Hammam e Massaggi a Marrakech",
    description:
      "Rayan Spa, a Dar El Bacha, nel cuore della medina di Marrakech. Hammam tradizionale, massaggi all’olio di argan e rituali berberi. Prenota su WhatsApp.",
  },
  nav: { about: "Chi Siamo", services: "Trattamenti", gallery: "Galleria", reviews: "Recensioni", contact: "Contatti" },
  header: { book: "Prenota", language: "Lingua", openMenu: "Apri il menu", closeMenu: "Chiudi il menu" },
  hero: {
    tagline: "Hammam & Massaggi · Marrakech",
    title: "La Tradizione Marocchina di Hammam e Massaggio",
    subtitle:
      "Nel cuore della medina di Marrakech, il rito dell’hammam e il tocco di mani esperte rilassano il corpo e calmano la mente.",
    ctaBook: "Prenota Ora",
    ctaDiscover: "Scopri i Trattamenti",
    scroll: "Scorri",
  },
  about: {
    eyebrow: "Chi Siamo",
    title: "Un Luogo di Calma nel Cuore di Marrakech",
    p1: "Dietro le mura di terra rosa della medina, Rayan Spa vi apre le porte di un autentico rito marocchino. Qui il tempo rallenta: il vapore dell’hammam, il profumo dell’argan e il mormorio della fontana vi avvolgono fin dal primo passo.",
    p2: "Il nostro approccio si ispira ai gesti tradizionali berberi, tramandati da generazioni negli hammam della medina. Il corpo si rilassa, la mente si distende. Ogni trattamento prende il tempo che serve, senza fretta.",
    values: [
      { k: "Autenticità", v: "Riti berberi tramandati di generazione in generazione." },
      { k: "Serenità", v: "Uno scrigno di calma, al riparo dal trambusto della medina." },
      { k: "Eccellenza", v: "Prodotti naturali e mani esperte, in ogni gesto." },
    ],
  },
  services: {
    eyebrow: "Trattamenti & Massaggi",
    title: "I Nostri Rituali di Cura",
    intro:
      "Un menù di trattamenti ispirato alle tradizioni marocchine, dagli oli preziosi dell’Atlante al sapone nero degli hammam ancestrali.",
    signature: "Signature",
    book: "Prenota →",
    priceNote: "Prezzi a persona in {currency} · indicativi",
    categoryForfaits: "I Nostri Forfait Signature",
    categoryMassages: "Massaggi à la Carte",
    categoryHammams: "Hammam",
    categoryBeaute: "Manicure & Pedicure",
    includes: "Include",
    unavailable: "Temporaneamente non disponibile",
  },
  gallery: {
    eyebrow: "Galleria",
    title: "L’Atmosfera Rayan",
    intro:
      "Passeggiate tra i nostri spazi: la luce soffusa, gli zellige e la quiete di un autentico riad marocchino.",
    enlarge: "Ingrandisci",
    comingSoon: "Prossimamente",
    alts: [
      "Volta dell’hammam in tadelakt sotto la luce delle lanterne",
      "Lettino da massaggio drappeggiato di lino con petali di rosa",
      "Un rooftop patio dove gustare un tè e dolci tipici dopo il trattamento",
      "Applicazione di olio di argan durante un massaggio",
      "Massaggio a spalle e collo, gesto preciso",
    ],
  },
  booking: {
    eyebrow: "Prenotazione",
    title: "Prenota il Tuo Trattamento",
    intro:
      "Compila il modulo: il messaggio è già pronto, basta inviarlo su WhatsApp. Ti rispondiamo in pochi minuti per confermare l’orario.",
    perks: [
      "Risposta rapida via WhatsApp",
      "Senza impegno né pagamento online",
      "Consigli personalizzati per il tuo trattamento",
    ],
    fields: {
      name: "Il Tuo Nome",
      namePh: "Nome e cognome",
      phone: "Telefono",
      service: "Trattamento Desiderato",
      servicePh: "Scegli un Trattamento",
      date: "Data",
      time: "Ora",
      people: "Persone",
      notes: "Note (facoltativo)",
      notesPh: "Una preferenza, un’occasione speciale?",
    },
    errors: {
      name: "Inserisci il tuo nome.",
      phone: "Numero di telefono non valido.",
      service: "Scegli un trattamento.",
      date: "Indica una data.",
    },
    submit: "Invia su WhatsApp",
    demo: {
      pre: "⚠️ Demo: il numero WhatsApp non è ancora configurato (vedi ",
      post: ").",
    },
    confirm: {
      title: "La Tua Richiesta È Pronta",
      body: "WhatsApp dovrebbe aprirsi con il messaggio già scritto. Se non accade nulla, clicca il pulsante qui sotto.",
      demoNote: "(Demo: numero WhatsApp da configurare in data/site-config.ts)",
      open: "Apri WhatsApp",
      reset: "Nuova Richiesta",
    },
  },
  testimonials: {
    eyebrow: "Testimonianze",
    title: "Cosa Dicono di Noi",
    intro: "L’esperienza raccontata da chi è già stato da noi.",
    items: [
      { quote: "L’hammam tradizionale è stato davvero rilassante, e l’accoglienza più calorosa di quanto ci aspettassimo.", origin: "Parigi, Francia" },
      { quote: "Il massaggio all’olio di argan è stato fantastico, mi sono sentita leggera per il resto della giornata. Da non perdere se siete a Marrakech.", origin: "Ginevra, Svizzera" },
      { quote: "Location bellissima, e il personale sa chiaramente quello che fa. Il pacchetto completo vale ogni minuto.", origin: "Casablanca, Marocco" },
      { quote: "Tutto pulitissimo e curato, e davvero autentico. Il massaggio di coppia è stato il momento più bello della nostra luna di miele.", origin: "Lione, Francia" },
    ],
  },
  contact: {
    eyebrow: "Contatti",
    title: "Vieni a Trovarci",
    intro: "Nel cuore della medina di Marrakech, a pochi passi dai souk.",
    cards: { address: "Indirizzo", hours: "Orari", whatsapp: "WhatsApp", email: "Email" },
    whatsappCta: "Scrivici su WhatsApp",
    follow: "Seguici",
    route: "Indicazioni",
    days: ["Dal Lunedì al Sabato", "Domenica"],
  },
  footer: {
    tagline: "Hammam & Massaggi · Marrakech",
    rights: "Tutti i diritti riservati.",
    vitrine: "Sito Vetrina · Marrakech, Marocco",
  },
  whatsapp: {
    greeting: "Buongiorno {brand},",
    intro: "Vorrei prenotare un trattamento:",
    name: "Nome",
    phone: "Telefono",
    service: "Trattamento",
    date: "Data Preferita",
    time: "Ora Preferita",
    people: "Numero di Persone",
    notes: "Note",
    toConvene: "da concordare",
    footer: "Vi prego di confermarmi la disponibilità. 🌿",
  },
  serviceData: {
    "pack-relaxant": {
      name: "Pack Relax",
      description: "Un massaggio relax di un’ora seguito da un trattamento viso completo, per sciogliere il corpo e placare la mente.",
    },
    "pack-classique": {
      name: "Pack Classico",
      description: "L’essenziale del rito marocchino: hammam, scrub e un massaggio relax per ripartire leggeri.",
    },
    "pack-baume": {
      name: "Pack Baume",
      description: "Un hammam completo seguito da un massaggio di 40 min a scelta — la signature Rayan per una pelle nutrita e un corpo rilassato.",
    },
    "pack-amoureux": {
      name: "Pack Innamorati",
      description: "Una parentesi in due, fianco a fianco: hammam, scrub, massaggio a scelta e pausa tè con dolci marocchini.",
    },
    "pack-royal": {
      name: "Pack Royal",
      description: "L’esperienza completa Rayan: quattro ore di trattamenti, dall’hammam al massaggio al balsamo, fino al trattamento viso, manicure e pedicure.",
      meta: "4h",
    },
    "massage-relaxant": {
      name: "Massaggio Relax",
      description: "Gesti dolci e avvolgenti per sciogliere le tensioni quotidiane.",
    },
    "massage-tonifiant": {
      name: "Massaggio Tonificante",
      description: "Pressioni più energiche per risvegliare il corpo e stimolare la circolazione.",
    },
    "massage-ayurvedique": {
      name: "Massaggio Ayurvedico",
      description: "Un massaggio che viene dall’India, con oli caldi, per un equilibrio profondo tra corpo e mente.",
    },
    "massage-dabachi": {
      name: "Massaggio Dabachi",
      description: "Il gesto tradizionale marocchino, eseguito solo con i gomiti: una pressione profonda e costante, per un rilascio in profondità.",
    },
    "massage-dos": {
      name: "Massaggio Schiena",
      description: "Un trattamento mirato su spalle e schiena, per sciogliere i nodi di tensione.",
    },
    "massage-pieds": {
      name: "Massaggio Piedi",
      description: "Un momento di leggerezza per piedi distesi dopo una giornata nella medina.",
    },
    "hammam-oriental": { name: "Hammam Orientale" },
    "hammam-dabachi": { name: "Hammam Dabachi" },
    "hammam-royal": { name: "Hammam Royal" },
    manucure: { name: "Manicure" },
    pedicure: { name: "Pedicure" },
    "pedicure-medicale": { name: "Pedicure Medica" },
    "soin-visage": { name: "Trattamento Viso" },
  },
  stepData: {
    hammam30: "Hammam 30 min",
    hammam45: "Hammam 45 min",
    hammam1h: "Hammam 1h",
    gommage: "Scrub Esfoliante",
    gommageSavonNoir: "Scrub al Sapone Nero",
    gommageGhassoul: "Scrub all’Argilla Ghassoul",
    gommageCafe: "Scrub al Caffè Anticellulite",
    gommageChoix: "Scrub a Scelta (sapone nero o ghassoul)",
    savonNoir: "Applicazione di Sapone Nero",
    savonnage: "Insaponatura",
    shampooing: "Shampoo",
    shampooingBio: "Shampoo Bio",
    masqueGhassoul: "Maschera Completa al Ghassoul",
    masqueCheveux: "Maschera per Capelli",
    hydratation15: "15 min di Idratazione",
    pauseThe: "Pausa Tè",
    pauseThePatisserie: "Pausa Tè con Dolci Marocchini",
    soinVisage45: "Trattamento Viso 45 min",
    soinVisage1h: "Trattamento Viso 1h",
    massageBaume40: "Massaggio al Balsamo 40 min",
    massageRelaxant40: "Massaggio Relax 40 min",
    massageRelaxant20: "Massaggio Relax 20 min",
    massageChoix40: "Massaggio a Scelta 40 min (relax o tonificante)",
    manucure: "Manicure",
    pedicure: "Pedicure",
  },
};

/* --------------------------------------------------------------- */
/*  ESPAÑOL                                                        */
/* --------------------------------------------------------------- */
const es: Dict = {
  intl: "es-ES",
  htmlLang: "es",
  meta: {
    title: "Rayan Spa · Hammam y Masajes en Marrakech",
    description:
      "Rayan Spa, en Dar El Bacha, en el corazón de la medina de Marrakech. Hammam tradicional, masajes con aceite de argán y rituales bereberes. Reserva por WhatsApp.",
  },
  nav: { about: "Nosotros", services: "Tratamientos", gallery: "Galería", reviews: "Opiniones", contact: "Contacto" },
  header: { book: "Reservar", language: "Idioma", openMenu: "Abrir el menú", closeMenu: "Cerrar el menú" },
  hero: {
    tagline: "Hammam & Masajes · Marrakech",
    title: "La Tradición Marroquí del Hammam y el Masaje",
    subtitle:
      "En el corazón de la medina de Marrakech, el ritual del hammam y el tacto de manos expertas relajan el cuerpo y calman la mente.",
    ctaBook: "Reservar Ahora",
    ctaDiscover: "Descubre Nuestros Tratamientos",
    scroll: "Desplázate",
  },
  about: {
    eyebrow: "Nosotros",
    title: "Un Espacio de Calma en el Corazón de Marrakech",
    p1: "Tras los muros de tierra rosada de la medina, Rayan Spa te abre las puertas de un auténtico ritual marroquí. Aquí el tiempo se detiene: el vapor del hammam, el aroma del argán y el murmullo de la fuente te envuelven desde el primer paso.",
    p2: "Nuestro enfoque se inspira en los gestos tradicionales bereberes, transmitidos durante generaciones en los hammams de la medina. El cuerpo se relaja, la mente se calma. Cada tratamiento toma el tiempo que necesita, sin prisa.",
    values: [
      { k: "Autenticidad", v: "Rituales bereberes transmitidos de generación en generación." },
      { k: "Serenidad", v: "Un refugio de calma, a salvo del bullicio de la medina." },
      { k: "Excelencia", v: "Productos naturales y manos expertas, en cada gesto." },
    ],
  },
  services: {
    eyebrow: "Tratamientos y Masajes",
    title: "Nuestros Rituales de Cuidado",
    intro:
      "Una carta de tratamientos inspirada en las tradiciones marroquíes, desde los aceites preciosos del Atlas hasta el jabón negro de los hammams ancestrales.",
    signature: "Signature",
    book: "Reservar →",
    priceNote: "Precios por persona en {currency} · orientativos",
    categoryForfaits: "Nuestros Packs Signature",
    categoryMassages: "Masajes a la Carta",
    categoryHammams: "Hammams",
    categoryBeaute: "Manicura & Pedicura",
    includes: "Incluye",
    unavailable: "Temporalmente no disponible",
  },
  gallery: {
    eyebrow: "Galería",
    title: "El Ambiente Rayan",
    intro:
      "Pasea por nuestros espacios: la luz tenue, el zellige y la quietud de un auténtico riad marroquí.",
    enlarge: "Ampliar",
    comingSoon: "Próximamente",
    alts: [
      "Bóveda del hammam en tadelakt bajo la luz de los faroles",
      "Camilla de masaje cubierta de lino con pétalos de rosa",
      "Un patio en la azotea para disfrutar un té y dulces tras el tratamiento",
      "Aplicación de aceite de argán durante un masaje",
      "Masaje de hombros y cuello, gesto preciso",
    ],
  },
  booking: {
    eyebrow: "Reserva",
    title: "Reserva Tu Tratamiento",
    intro:
      "Rellena el formulario: el mensaje ya está listo, solo falta enviarlo por WhatsApp. Te respondemos en pocos minutos para confirmar la hora.",
    perks: [
      "Respuesta rápida por WhatsApp",
      "Sin compromiso ni pago en línea",
      "Consejos personalizados para tu tratamiento",
    ],
    fields: {
      name: "Tu Nombre",
      namePh: "Nombre y apellido",
      phone: "Teléfono",
      service: "Tratamiento Deseado",
      servicePh: "Elige un Tratamiento",
      date: "Fecha",
      time: "Hora",
      people: "Personas",
      notes: "Notas (opcional)",
      notesPh: "¿Alguna preferencia, una ocasión especial?",
    },
    errors: {
      name: "Indica tu nombre.",
      phone: "Número de teléfono no válido.",
      service: "Elige un tratamiento.",
      date: "Indica una fecha.",
    },
    submit: "Enviar por WhatsApp",
    demo: {
      pre: "⚠️ Demo: el número de WhatsApp aún no está configurado (ver ",
      post: ").",
    },
    confirm: {
      title: "Tu Solicitud Está Lista",
      body: "WhatsApp debería abrirse con tu mensaje ya escrito. Si no ocurre nada, pulsa el botón de abajo.",
      demoNote: "(Demo: número de WhatsApp por configurar en data/site-config.ts)",
      open: "Abrir WhatsApp",
      reset: "Nueva Solicitud",
    },
  },
  testimonials: {
    eyebrow: "Opiniones",
    title: "Lo Que Dicen de Nosotros",
    intro: "La experiencia contada por quienes ya nos han visitado.",
    items: [
      { quote: "El hammam tradicional fue realmente relajante, y la acogida fue más cálida de lo que esperábamos.", origin: "París, Francia" },
      { quote: "El masaje con aceite de argán fue increíble, me sentí ligera el resto del día. Imprescindible si estás en Marrakech.", origin: "Ginebra, Suiza" },
      { quote: "Un entorno precioso, y el personal sabe lo que hace. El paquete completo vale cada minuto.", origin: "Casablanca, Marruecos" },
      { quote: "Todo muy limpio y cuidado, y realmente marroquí. El masaje en pareja fue lo mejor de nuestra luna de miel.", origin: "Lyon, Francia" },
    ],
  },
  contact: {
    eyebrow: "Contacto",
    title: "Ven a Visitarnos",
    intro: "En el corazón de la medina de Marrakech, a pocos pasos de los zocos.",
    cards: { address: "Dirección", hours: "Horario", whatsapp: "WhatsApp", email: "Email" },
    whatsappCta: "Escríbenos por WhatsApp",
    follow: "Síguenos",
    route: "Cómo Llegar",
    days: ["De Lunes a Sábado", "Domingo"],
  },
  footer: {
    tagline: "Hammam & Masajes · Marrakech",
    rights: "Todos los derechos reservados.",
    vitrine: "Sitio Web · Marrakech, Marruecos",
  },
  whatsapp: {
    greeting: "Hola {brand},",
    intro: "Me gustaría reservar un tratamiento:",
    name: "Nombre",
    phone: "Teléfono",
    service: "Tratamiento",
    date: "Fecha Preferida",
    time: "Hora Preferida",
    people: "Número de Personas",
    notes: "Notas",
    toConvene: "a convenir",
    footer: "Por favor, confírmenme la disponibilidad. 🌿",
  },
  serviceData: {
    "pack-relaxant": {
      name: "Pack Relajante",
      description: "Un masaje relajante de una hora seguido de un tratamiento facial completo, para liberar el cuerpo y calmar la mente.",
    },
    "pack-classique": {
      name: "Pack Clásico",
      description: "Lo esencial del ritual marroquí: hammam, exfoliación y un masaje relajante para salir ligero.",
    },
    "pack-baume": {
      name: "Pack Bálsamo",
      description: "Un hammam completo seguido de un masaje de 40 min a elegir — la firma de Rayan para una piel nutrida y un cuerpo relajado.",
    },
    "pack-amoureux": {
      name: "Pack Enamorados",
      description: "Un paréntesis para dos, lado a lado: hammam, exfoliación, masaje a elegir y pausa de té con dulces marroquíes.",
    },
    "pack-royal": {
      name: "Pack Royal",
      description: "La experiencia completa Rayan: cuatro horas de tratamientos, del hammam al masaje con bálsamo, hasta el tratamiento facial, manicura y pedicura.",
      meta: "4h",
    },
    "massage-relaxant": {
      name: "Masaje Relajante",
      description: "Gestos suaves y envolventes para liberar las tensiones del día a día.",
    },
    "massage-tonifiant": {
      name: "Masaje Tonificante",
      description: "Presiones más firmes para despertar el cuerpo y estimular la circulación.",
    },
    "massage-ayurvedique": {
      name: "Masaje Ayurvédico",
      description: "Un masaje llegado de la India, con aceites calientes, para un equilibrio profundo entre cuerpo y mente.",
    },
    "massage-dabachi": {
      name: "Masaje Dabachi",
      description: "El gesto tradicional marroquí, realizado solo con los codos: una presión profunda y sostenida, para una liberación en profundidad.",
    },
    "massage-dos": {
      name: "Masaje de Espalda",
      description: "Un tratamiento centrado en los hombros y la espalda, para liberar los nudos de tensión.",
    },
    "massage-pieds": {
      name: "Masaje de Pies",
      description: "Un momento de ligereza para unos pies aliviados tras un día en la medina.",
    },
    "hammam-oriental": { name: "Hammam Oriental" },
    "hammam-dabachi": { name: "Hammam Dabachi" },
    "hammam-royal": { name: "Hammam Royal" },
    manucure: { name: "Manicura" },
    pedicure: { name: "Pedicura" },
    "pedicure-medicale": { name: "Pedicura Médica" },
    "soin-visage": { name: "Tratamiento Facial" },
  },
  stepData: {
    hammam30: "Hammam 30 min",
    hammam45: "Hammam 45 min",
    hammam1h: "Hammam 1h",
    gommage: "Exfoliación",
    gommageSavonNoir: "Exfoliación con Jabón Negro",
    gommageGhassoul: "Exfoliación con Arcilla Ghassoul",
    gommageCafe: "Exfoliación de Café Anticelulítica",
    gommageChoix: "Exfoliación a Elegir (jabón negro o ghassoul)",
    savonNoir: "Aplicación de Jabón Negro",
    savonnage: "Enjabonado",
    shampooing: "Champú",
    shampooingBio: "Champú Ecológico",
    masqueGhassoul: "Mascarilla Completa de Ghassoul",
    masqueCheveux: "Mascarilla Capilar",
    hydratation15: "15 min de Hidratación",
    pauseThe: "Pausa de Té",
    pauseThePatisserie: "Pausa de Té con Dulces Marroquíes",
    soinVisage45: "Tratamiento Facial de 45 min",
    soinVisage1h: "Tratamiento Facial de 1h",
    massageBaume40: "Masaje con Bálsamo 40 min",
    massageRelaxant40: "Masaje Relajante 40 min",
    massageRelaxant20: "Masaje Relajante 20 min",
    massageChoix40: "Masaje a Elegir 40 min (relajante o tonificante)",
    manucure: "Manicura",
    pedicure: "Pedicura",
  },
};

export const translations: Record<Locale, Dict> = { fr, en, it, es };
