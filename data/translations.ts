/* ============================================================
   TRADUCTIONS — Rayan SPA  (FR · EN · IT · ES)
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
  nav: { about: "À propos", services: "Soins", gallery: "Galerie", reviews: "Avis", contact: "Contact" },
  header: { book: "Réserver", language: "Langue", openMenu: "Ouvrir le menu", closeMenu: "Fermer le menu" },
  hero: {
    tagline: "Hammam & Massages — Marrakech",
    title: "L’art ancestral du bien-être marocain",
    subtitle:
      "Au cœur de Marrakech, un havre de calme où le rituel du hammam et le toucher des mains expertes réveillent le corps et apaisent l’esprit.",
    ctaBook: "Réserver maintenant",
    ctaDiscover: "Découvrir nos soins",
    scroll: "Faire défiler",
  },
  about: {
    eyebrow: "À propos",
    title: "Un refuge de bien-être au cœur de Marrakech",
    p1: "Derrière les murs de terre rose de la médina, Rayan SPA vous ouvre les portes d’un véritable rituel marocain. Ici, le temps ralentit : la vapeur du hammam, le parfum de l’argan et le clapotis de la fontaine vous enveloppent dès le premier pas.",
    p2: "Notre philosophie puise dans la sagesse ancestrale du bien-être berbère, où le corps se purifie et l’esprit se libère. Chaque soin est une invitation au voyage, pensé comme une parenthèse hors du temps.",
    values: [
      { k: "Authenticité", v: "Des rituels berbères transmis de génération en génération." },
      { k: "Sérénité", v: "Un écrin de calme préservé du tumulte de la médina." },
      { k: "Excellence", v: "Des produits naturels et des mains expertes, à chaque geste." },
    ],
  },
  services: {
    eyebrow: "Soins & Massages",
    title: "Nos rituels de bien-être",
    intro:
      "Une carte de soins inspirée des traditions marocaines, des huiles précieuses de l’Atlas au savon noir des hammams ancestraux.",
    signature: "Signature",
    book: "Réserver →",
    priceNote: "Tarifs en {currency} · à titre indicatif",
    categoryForfaits: "Nos forfaits signature",
    categoryMassages: "Massages à la carte",
    categoryHammams: "Hammams",
    categoryBeaute: "Manucure & Pédicure",
    includes: "Comprend",
    unavailable: "Temporairement indisponible",
  },
  gallery: {
    eyebrow: "Galerie",
    title: "L’atmosphère Rayan",
    intro:
      "Flânez à travers nos espaces : la lumière tamisée, le zellige et la quiétude d’un véritable riad marocain.",
    enlarge: "Agrandir",
    comingSoon: "Bientôt disponible",
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
    title: "Réservez votre parenthèse",
    intro:
      "Remplissez le formulaire : votre demande s’ouvre directement dans WhatsApp, déjà rédigée. Nous vous confirmons votre rendez-vous en quelques minutes.",
    perks: [
      "Réponse rapide via WhatsApp",
      "Sans engagement ni paiement en ligne",
      "Conseils personnalisés pour votre soin",
    ],
    fields: {
      name: "Nom complet",
      namePh: "Votre nom",
      phone: "Téléphone",
      service: "Soin souhaité",
      servicePh: "— Choisir un soin —",
      date: "Date",
      time: "Heure",
      people: "Personnes",
      notes: "Notes (facultatif)",
      notesPh: "Une préférence, une occasion spéciale ?",
    },
    errors: {
      name: "Veuillez indiquer votre nom.",
      phone: "Numéro de téléphone invalide.",
      service: "Choisissez un soin.",
      date: "Indiquez une date souhaitée.",
    },
    submit: "Envoyer ma demande",
    demo: {
      pre: "⚠️ Démo : le numéro WhatsApp n’est pas encore configuré (voir ",
      post: ").",
    },
    confirm: {
      title: "Votre demande est prête",
      body: "WhatsApp devrait s’ouvrir avec votre message pré-rempli. Si rien ne se passe, cliquez sur le bouton ci-dessous.",
      demoNote: "(Démo : numéro WhatsApp à configurer dans data/site-config.ts)",
      open: "Ouvrir WhatsApp",
      reset: "Nouvelle demande",
    },
  },
  testimonials: {
    eyebrow: "Témoignages",
    title: "Ils ont vécu l’expérience",
    intro:
      "La sérénité de Rayan SPA racontée par celles et ceux qui en ont franchi le seuil.",
    items: [
      { quote: "Une parenthèse hors du temps. Le hammam traditionnel est un pur moment de grâce, et l’accueil d’une chaleur rare.", origin: "Paris, France" },
      { quote: "Le massage à l’huile d’argan était divin. J’ai quitté Rayan SPA en lévitation. À ne manquer sous aucun prétexte à Marrakech.", origin: "Genève, Suisse" },
      { quote: "Un cadre somptueux, des mains expertes et une sérénité absolue. Le forfait rituel vaut chaque minute.", origin: "Casablanca, Maroc" },
      { quote: "Élégance, propreté et authenticité. Le massage en duo a été le point fort de notre voyage de noces.", origin: "Lyon, France" },
    ],
  },
  contact: {
    eyebrow: "Contact",
    title: "Venez nous rendre visite",
    intro: "Au cœur de la médina de Marrakech, à quelques pas des souks.",
    cards: { address: "Adresse", hours: "Horaires", whatsapp: "WhatsApp", email: "Email" },
    whatsappCta: "Écrivez-nous sur WhatsApp",
    follow: "Suivez-nous",
    route: "Itinéraire",
    days: ["Lundi – Vendredi", "Samedi", "Dimanche"],
  },
  footer: {
    tagline: "Hammam & Massages · Marrakech",
    rights: "Tous droits réservés.",
    vitrine: "Site vitrine · Marrakech, Maroc",
  },
  whatsapp: {
    greeting: "Bonjour {brand},",
    intro: "Je souhaite réserver un soin :",
    name: "Nom",
    phone: "Téléphone",
    service: "Soin souhaité",
    date: "Date souhaitée",
    time: "Heure souhaitée",
    people: "Nombre de personnes",
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
      description: "L’essentiel du rituel marocain : hammam, gommage et un massage anti-stress pour repartir léger.",
    },
    "pack-baume": {
      name: "Pack Baume",
      description: "Un hammam complet suivi d’un massage au baume concentré à l’huile d’argan — la signature Rayan pour une peau nourrie et un corps détendu.",
    },
    "pack-amoureux": {
      name: "Pack Amoureux",
      description: "Une parenthèse à deux, côte à côte : hammam, gommage, massage au choix et pause thé aux pâtisseries marocaines.",
      meta: "2 personnes",
    },
    "pack-royal": {
      name: "Pack Royal",
      description: "L’expérience complète Rayan : quatre heures de soins, du hammam au massage au baume, jusqu’au soin du visage, manucure et pédicure.",
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
      description: "Le geste traditionnel marocain, entre pression et étirement, pour un relâchement en profondeur.",
    },
    "massage-dos": {
      name: "Massage du dos",
      description: "Un soin ciblé sur les épaules et le dos, pour dénouer les nœuds de tension.",
    },
    "massage-pieds": {
      name: "Massage des pieds",
      description: "Un moment de légèreté pour des pieds apaisés après une journée dans la médina.",
    },
    "hammam-oriental": { name: "Oriental Hammam" },
    "hammam-dabachi": { name: "Hammam Dabachi" },
    "hammam-royal": { name: "Hammam Royal" },
    manucure: { name: "Manucure" },
    pedicure: { name: "Pédicure" },
    "pedicure-medicale": { name: "Pédicure médicale" },
    "soin-visage": { name: "Soin du visage" },
  },
  stepData: {
    hammam30: "Hammam 30 min",
    hammam45: "Hammam 45 min",
    hammam1h: "Hammam 1h",
    gommage: "Gommage exfoliant",
    gommageSavonNoir: "Gommage au savon noir",
    gommageGhassoul: "Gommage au ghassoul",
    gommageCafe: "Gommage au café anti-cellulite",
    gommageChoix: "Gommage au choix (savon noir ou ghassoul)",
    savonNoir: "Application de savon noir",
    savonnage: "Savonnage",
    shampooing: "Shampooing",
    shampooingBio: "Shampooing bio",
    masqueGhassoul: "Masque complet au ghassoul",
    masqueCheveux: "Masque cheveux",
    hydratation15: "15 min d’hydratation",
    pauseThe: "Pause thé",
    pauseThePatisserie: "Pause thé & pâtisserie marocaine",
    soinVisage45: "Soin du visage 45 min",
    soinVisage1h: "Soin du visage 1h",
    massageBaumeArgan45: "Massage au baume d’argan 45 min",
    massageBaume1h: "Massage au baume 1h",
    massageRelaxant1h: "Massage relaxant 1h",
    massageAntiStress30: "Massage anti-stress 30 min",
    massageChoix30: "Massage au choix 30 min (relaxant, tonifiant ou dabachi)",
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
  nav: { about: "About", services: "Treatments", gallery: "Gallery", reviews: "Reviews", contact: "Contact" },
  header: { book: "Book", language: "Language", openMenu: "Open menu", closeMenu: "Close menu" },
  hero: {
    tagline: "Hammam & Massages — Marrakech",
    title: "The ancestral art of Moroccan well-being",
    subtitle:
      "In the heart of Marrakech, a haven of calm where the hammam ritual and the touch of expert hands awaken the body and soothe the mind.",
    ctaBook: "Book now",
    ctaDiscover: "Discover our treatments",
    scroll: "Scroll",
  },
  about: {
    eyebrow: "About",
    title: "A well-being retreat in the heart of Marrakech",
    p1: "Behind the pink earthen walls of the medina, Rayan SPA opens the doors to an authentic Moroccan ritual. Here, time slows down: the steam of the hammam, the scent of argan and the murmur of the fountain envelop you from the very first step.",
    p2: "Our philosophy draws on the ancestral wisdom of Berber well-being, where the body is purified and the mind set free. Each treatment is an invitation to travel, conceived as a timeless interlude.",
    values: [
      { k: "Authenticity", v: "Berber rituals passed down from generation to generation." },
      { k: "Serenity", v: "A cocoon of calm, sheltered from the bustle of the medina." },
      { k: "Excellence", v: "Natural products and expert hands, in every gesture." },
    ],
  },
  services: {
    eyebrow: "Treatments & Massages",
    title: "Our well-being rituals",
    intro:
      "A treatment menu inspired by Moroccan traditions, from the precious oils of the Atlas to the black soap of ancestral hammams.",
    signature: "Signature",
    book: "Book →",
    priceNote: "Prices in {currency} · indicative",
    categoryForfaits: "Our signature packages",
    categoryMassages: "Massages à la carte",
    categoryHammams: "Hammams",
    categoryBeaute: "Manicure & Pedicure",
    includes: "Includes",
    unavailable: "Temporarily unavailable",
  },
  gallery: {
    eyebrow: "Gallery",
    title: "The Rayan atmosphere",
    intro:
      "Wander through our spaces: the soft light, the zellige and the quiet of an authentic Moroccan riad.",
    enlarge: "Enlarge",
    comingSoon: "Coming soon",
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
    title: "Book your escape",
    intro:
      "Fill in the form: your request opens directly in WhatsApp, already written. We confirm your appointment within minutes.",
    perks: [
      "Quick reply via WhatsApp",
      "No commitment or online payment",
      "Personalised advice for your treatment",
    ],
    fields: {
      name: "Full name",
      namePh: "Your name",
      phone: "Phone",
      service: "Desired treatment",
      servicePh: "— Choose a treatment —",
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
    submit: "Send my request",
    demo: {
      pre: "⚠️ Demo: the WhatsApp number is not configured yet (see ",
      post: ").",
    },
    confirm: {
      title: "Your request is ready",
      body: "WhatsApp should open with your pre-filled message. If nothing happens, click the button below.",
      demoNote: "(Demo: WhatsApp number to configure in data/site-config.ts)",
      open: "Open WhatsApp",
      reset: "New request",
    },
  },
  testimonials: {
    eyebrow: "Testimonials",
    title: "They lived the experience",
    intro: "The serenity of Rayan SPA told by those who have crossed its threshold.",
    items: [
      { quote: "A timeless escape. The traditional hammam is a pure moment of grace, and the welcome is wonderfully warm.", origin: "Paris, France" },
      { quote: "The argan oil massage was divine. I left Rayan SPA floating on air. Not to be missed in Marrakech for anything.", origin: "Geneva, Switzerland" },
      { quote: "Sumptuous surroundings, expert hands and absolute serenity. The ritual package is worth every minute.", origin: "Casablanca, Morocco" },
      { quote: "Elegance, cleanliness and authenticity. The couples’ massage was the highlight of our honeymoon.", origin: "Lyon, France" },
    ],
  },
  contact: {
    eyebrow: "Contact",
    title: "Come and visit us",
    intro: "In the heart of the Marrakech medina, a few steps from the souks.",
    cards: { address: "Address", hours: "Opening hours", whatsapp: "WhatsApp", email: "Email" },
    whatsappCta: "Message us on WhatsApp",
    follow: "Follow us",
    route: "Directions",
    days: ["Monday – Friday", "Saturday", "Sunday"],
  },
  footer: {
    tagline: "Hammam & Massages · Marrakech",
    rights: "All rights reserved.",
    vitrine: "Showcase site · Marrakech, Morocco",
  },
  whatsapp: {
    greeting: "Hello {brand},",
    intro: "I would like to book a treatment:",
    name: "Name",
    phone: "Phone",
    service: "Treatment",
    date: "Preferred date",
    time: "Preferred time",
    people: "Number of people",
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
      description: "The essence of the Moroccan ritual: hammam, scrub and an anti-stress massage to leave feeling light.",
    },
    "pack-baume": {
      name: "Balm Package",
      description: "A full hammam followed by a massage with concentrated argan balm — the Rayan signature for nourished skin and a relaxed body.",
    },
    "pack-amoureux": {
      name: "Lovers’ Package",
      description: "A moment for two, side by side: hammam, scrub, massage of your choice and tea with Moroccan pastries.",
      meta: "2 people",
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
      description: "The traditional Moroccan gesture, between pressure and stretching, for a deep release.",
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
    gommage: "Exfoliating scrub",
    gommageSavonNoir: "Black soap scrub",
    gommageGhassoul: "Ghassoul clay scrub",
    gommageCafe: "Anti-cellulite coffee scrub",
    gommageChoix: "Choice of scrub (black soap or ghassoul)",
    savonNoir: "Black soap application",
    savonnage: "Soaping",
    shampooing: "Shampoo",
    shampooingBio: "Organic shampoo",
    masqueGhassoul: "Full ghassoul clay mask",
    masqueCheveux: "Hair mask",
    hydratation15: "15 min hydration",
    pauseThe: "Tea break",
    pauseThePatisserie: "Tea break with Moroccan pastries",
    soinVisage45: "45 min facial treatment",
    soinVisage1h: "1h facial treatment",
    massageBaumeArgan45: "45 min argan balm massage",
    massageBaume1h: "1h balm massage",
    massageRelaxant1h: "1h relaxing massage",
    massageAntiStress30: "30 min anti-stress massage",
    massageChoix30: "30 min massage of your choice (relaxing, toning or dabachi)",
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
  nav: { about: "Chi siamo", services: "Trattamenti", gallery: "Galleria", reviews: "Recensioni", contact: "Contatti" },
  header: { book: "Prenota", language: "Lingua", openMenu: "Apri il menu", closeMenu: "Chiudi il menu" },
  hero: {
    tagline: "Hammam & Massaggi — Marrakech",
    title: "L’arte ancestrale del benessere marocchino",
    subtitle:
      "Nel cuore di Marrakech, un’oasi di pace dove il rito dell’hammam e il tocco di mani esperte risvegliano il corpo e placano la mente.",
    ctaBook: "Prenota ora",
    ctaDiscover: "Scopri i trattamenti",
    scroll: "Scorri",
  },
  about: {
    eyebrow: "Chi siamo",
    title: "Un rifugio di benessere nel cuore di Marrakech",
    p1: "Dietro le mura di terra rosa della medina, Rayan SPA vi apre le porte di un autentico rito marocchino. Qui il tempo rallenta: il vapore dell’hammam, il profumo dell’argan e il mormorio della fontana vi avvolgono fin dal primo passo.",
    p2: "La nostra filosofia attinge alla saggezza ancestrale del benessere berbero, dove il corpo si purifica e la mente si libera. Ogni trattamento è un invito al viaggio, pensato come una parentesi fuori dal tempo.",
    values: [
      { k: "Autenticità", v: "Riti berberi tramandati di generazione in generazione." },
      { k: "Serenità", v: "Uno scrigno di calma, al riparo dal trambusto della medina." },
      { k: "Eccellenza", v: "Prodotti naturali e mani esperte, in ogni gesto." },
    ],
  },
  services: {
    eyebrow: "Trattamenti & Massaggi",
    title: "I nostri rituali di benessere",
    intro:
      "Un menù di trattamenti ispirato alle tradizioni marocchine, dagli oli preziosi dell’Atlante al sapone nero degli hammam ancestrali.",
    signature: "Signature",
    book: "Prenota →",
    priceNote: "Prezzi in {currency} · indicativi",
    categoryForfaits: "I nostri forfait signature",
    categoryMassages: "Massaggi à la carte",
    categoryHammams: "Hammam",
    categoryBeaute: "Manicure & Pedicure",
    includes: "Include",
    unavailable: "Temporaneamente non disponibile",
  },
  gallery: {
    eyebrow: "Galleria",
    title: "L’atmosfera Rayan",
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
    title: "Prenota la tua parentesi",
    intro:
      "Compila il modulo: la tua richiesta si apre direttamente in WhatsApp, già scritta. Confermiamo l’appuntamento in pochi minuti.",
    perks: [
      "Risposta rapida via WhatsApp",
      "Senza impegno né pagamento online",
      "Consigli personalizzati per il tuo trattamento",
    ],
    fields: {
      name: "Nome completo",
      namePh: "Il tuo nome",
      phone: "Telefono",
      service: "Trattamento desiderato",
      servicePh: "— Scegli un trattamento —",
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
    submit: "Invia la richiesta",
    demo: {
      pre: "⚠️ Demo: il numero WhatsApp non è ancora configurato (vedi ",
      post: ").",
    },
    confirm: {
      title: "La tua richiesta è pronta",
      body: "WhatsApp dovrebbe aprirsi con il messaggio già compilato. Se non accade nulla, clicca il pulsante qui sotto.",
      demoNote: "(Demo: numero WhatsApp da configurare in data/site-config.ts)",
      open: "Apri WhatsApp",
      reset: "Nuova richiesta",
    },
  },
  testimonials: {
    eyebrow: "Testimonianze",
    title: "Hanno vissuto l’esperienza",
    intro: "La serenità di Rayan SPA raccontata da chi ne ha varcato la soglia.",
    items: [
      { quote: "Una parentesi fuori dal tempo. L’hammam tradizionale è un puro momento di grazia e l’accoglienza è di rara calore.", origin: "Parigi, Francia" },
      { quote: "Il massaggio all’olio di argan è stato divino. Ho lasciato Rayan SPA in levitazione. Da non perdere per nessun motivo a Marrakech.", origin: "Ginevra, Svizzera" },
      { quote: "Una cornice sontuosa, mani esperte e una serenità assoluta. Il pacchetto rituale vale ogni minuto.", origin: "Casablanca, Marocco" },
      { quote: "Eleganza, pulizia e autenticità. Il massaggio di coppia è stato il momento clou della nostra luna di miele.", origin: "Lione, Francia" },
    ],
  },
  contact: {
    eyebrow: "Contatti",
    title: "Vieni a trovarci",
    intro: "Nel cuore della medina di Marrakech, a pochi passi dai souk.",
    cards: { address: "Indirizzo", hours: "Orari", whatsapp: "WhatsApp", email: "Email" },
    whatsappCta: "Scrivici su WhatsApp",
    follow: "Seguici",
    route: "Indicazioni",
    days: ["Lunedì – Venerdì", "Sabato", "Domenica"],
  },
  footer: {
    tagline: "Hammam & Massaggi · Marrakech",
    rights: "Tutti i diritti riservati.",
    vitrine: "Sito vetrina · Marrakech, Marocco",
  },
  whatsapp: {
    greeting: "Buongiorno {brand},",
    intro: "Vorrei prenotare un trattamento:",
    name: "Nome",
    phone: "Telefono",
    service: "Trattamento",
    date: "Data preferita",
    time: "Ora preferita",
    people: "Numero di persone",
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
      description: "L’essenziale del rito marocchino: hammam, scrub e un massaggio anti-stress per ripartire leggeri.",
    },
    "pack-baume": {
      name: "Pack Baume",
      description: "Un hammam completo seguito da un massaggio al balsamo concentrato di olio di argan — la signature Rayan per una pelle nutrita e un corpo rilassato.",
    },
    "pack-amoureux": {
      name: "Pack Innamorati",
      description: "Una parentesi in due, fianco a fianco: hammam, scrub, massaggio a scelta e pausa tè con dolci marocchini.",
      meta: "2 persone",
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
      description: "Il gesto tradizionale marocchino, tra pressione e stiramento, per un rilascio in profondità.",
    },
    "massage-dos": {
      name: "Massaggio schiena",
      description: "Un trattamento mirato su spalle e schiena, per sciogliere i nodi di tensione.",
    },
    "massage-pieds": {
      name: "Massaggio piedi",
      description: "Un momento di leggerezza per piedi distesi dopo una giornata nella medina.",
    },
    "hammam-oriental": { name: "Hammam Orientale" },
    "hammam-dabachi": { name: "Hammam Dabachi" },
    "hammam-royal": { name: "Hammam Royal" },
    manucure: { name: "Manicure" },
    pedicure: { name: "Pedicure" },
    "pedicure-medicale": { name: "Pedicure medica" },
    "soin-visage": { name: "Trattamento viso" },
  },
  stepData: {
    hammam30: "Hammam 30 min",
    hammam45: "Hammam 45 min",
    hammam1h: "Hammam 1h",
    gommage: "Scrub esfoliante",
    gommageSavonNoir: "Scrub al sapone nero",
    gommageGhassoul: "Scrub all’argilla ghassoul",
    gommageCafe: "Scrub al caffè anticellulite",
    gommageChoix: "Scrub a scelta (sapone nero o ghassoul)",
    savonNoir: "Applicazione di sapone nero",
    savonnage: "Insaponatura",
    shampooing: "Shampoo",
    shampooingBio: "Shampoo bio",
    masqueGhassoul: "Maschera completa al ghassoul",
    masqueCheveux: "Maschera per capelli",
    hydratation15: "15 min di idratazione",
    pauseThe: "Pausa tè",
    pauseThePatisserie: "Pausa tè con dolci marocchini",
    soinVisage45: "Trattamento viso 45 min",
    soinVisage1h: "Trattamento viso 1h",
    massageBaumeArgan45: "Massaggio al balsamo di argan 45 min",
    massageBaume1h: "Massaggio al balsamo 1h",
    massageRelaxant1h: "Massaggio relax 1h",
    massageAntiStress30: "Massaggio anti-stress 30 min",
    massageChoix30: "Massaggio a scelta 30 min (relax, tonificante o dabachi)",
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
  nav: { about: "Nosotros", services: "Tratamientos", gallery: "Galería", reviews: "Opiniones", contact: "Contacto" },
  header: { book: "Reservar", language: "Idioma", openMenu: "Abrir el menú", closeMenu: "Cerrar el menú" },
  hero: {
    tagline: "Hammam & Masajes — Marrakech",
    title: "El arte ancestral del bienestar marroquí",
    subtitle:
      "En el corazón de Marrakech, un remanso de calma donde el ritual del hammam y el tacto de manos expertas despiertan el cuerpo y serenan la mente.",
    ctaBook: "Reservar ahora",
    ctaDiscover: "Descubre nuestros tratamientos",
    scroll: "Desplázate",
  },
  about: {
    eyebrow: "Nosotros",
    title: "Un refugio de bienestar en el corazón de Marrakech",
    p1: "Tras los muros de tierra rosada de la medina, Rayan SPA te abre las puertas de un auténtico ritual marroquí. Aquí el tiempo se detiene: el vapor del hammam, el aroma del argán y el murmullo de la fuente te envuelven desde el primer paso.",
    p2: "Nuestra filosofía bebe de la sabiduría ancestral del bienestar bereber, donde el cuerpo se purifica y la mente se libera. Cada tratamiento es una invitación al viaje, concebido como un paréntesis fuera del tiempo.",
    values: [
      { k: "Autenticidad", v: "Rituales bereberes transmitidos de generación en generación." },
      { k: "Serenidad", v: "Un refugio de calma, a salvo del bullicio de la medina." },
      { k: "Excelencia", v: "Productos naturales y manos expertas, en cada gesto." },
    ],
  },
  services: {
    eyebrow: "Tratamientos y Masajes",
    title: "Nuestros rituales de bienestar",
    intro:
      "Una carta de tratamientos inspirada en las tradiciones marroquíes, desde los aceites preciosos del Atlas hasta el jabón negro de los hammams ancestrales.",
    signature: "Signature",
    book: "Reservar →",
    priceNote: "Precios en {currency} · orientativos",
    categoryForfaits: "Nuestros packs signature",
    categoryMassages: "Masajes a la carta",
    categoryHammams: "Hammams",
    categoryBeaute: "Manicura & Pedicura",
    includes: "Incluye",
    unavailable: "Temporalmente no disponible",
  },
  gallery: {
    eyebrow: "Galería",
    title: "El ambiente Rayan",
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
    title: "Reserva tu paréntesis",
    intro:
      "Rellena el formulario: tu solicitud se abre directamente en WhatsApp, ya redactada. Confirmamos tu cita en pocos minutos.",
    perks: [
      "Respuesta rápida por WhatsApp",
      "Sin compromiso ni pago en línea",
      "Consejos personalizados para tu tratamiento",
    ],
    fields: {
      name: "Nombre completo",
      namePh: "Tu nombre",
      phone: "Teléfono",
      service: "Tratamiento deseado",
      servicePh: "— Elige un tratamiento —",
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
    submit: "Enviar mi solicitud",
    demo: {
      pre: "⚠️ Demo: el número de WhatsApp aún no está configurado (ver ",
      post: ").",
    },
    confirm: {
      title: "Tu solicitud está lista",
      body: "WhatsApp debería abrirse con tu mensaje ya escrito. Si no ocurre nada, pulsa el botón de abajo.",
      demoNote: "(Demo: número de WhatsApp por configurar en data/site-config.ts)",
      open: "Abrir WhatsApp",
      reset: "Nueva solicitud",
    },
  },
  testimonials: {
    eyebrow: "Opiniones",
    title: "Vivieron la experiencia",
    intro: "La serenidad de Rayan SPA contada por quienes han cruzado su umbral.",
    items: [
      { quote: "Un paréntesis fuera del tiempo. El hammam tradicional es un puro momento de gracia, y la acogida de una calidez poco común.", origin: "París, Francia" },
      { quote: "El masaje con aceite de argán fue divino. Salí de Rayan SPA flotando. Imprescindible en Marrakech.", origin: "Ginebra, Suiza" },
      { quote: "Un entorno suntuoso, manos expertas y una serenidad absoluta. El paquete ritual vale cada minuto.", origin: "Casablanca, Marruecos" },
      { quote: "Elegancia, limpieza y autenticidad. El masaje en pareja fue lo mejor de nuestra luna de miel.", origin: "Lyon, Francia" },
    ],
  },
  contact: {
    eyebrow: "Contacto",
    title: "Ven a visitarnos",
    intro: "En el corazón de la medina de Marrakech, a pocos pasos de los zocos.",
    cards: { address: "Dirección", hours: "Horario", whatsapp: "WhatsApp", email: "Email" },
    whatsappCta: "Escríbenos por WhatsApp",
    follow: "Síguenos",
    route: "Cómo llegar",
    days: ["Lunes – Viernes", "Sábado", "Domingo"],
  },
  footer: {
    tagline: "Hammam & Masajes · Marrakech",
    rights: "Todos los derechos reservados.",
    vitrine: "Sitio web · Marrakech, Marruecos",
  },
  whatsapp: {
    greeting: "Hola {brand},",
    intro: "Me gustaría reservar un tratamiento:",
    name: "Nombre",
    phone: "Teléfono",
    service: "Tratamiento",
    date: "Fecha preferida",
    time: "Hora preferida",
    people: "Número de personas",
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
      description: "Lo esencial del ritual marroquí: hammam, exfoliación y un masaje antiestrés para salir ligero.",
    },
    "pack-baume": {
      name: "Pack Bálsamo",
      description: "Un hammam completo seguido de un masaje con bálsamo concentrado de aceite de argán — la firma de Rayan para una piel nutrida y un cuerpo relajado.",
    },
    "pack-amoureux": {
      name: "Pack Enamorados",
      description: "Un paréntesis para dos, lado a lado: hammam, exfoliación, masaje a elegir y pausa de té con dulces marroquíes.",
      meta: "2 personas",
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
      description: "El gesto tradicional marroquí, entre presión y estiramiento, para una liberación profunda.",
    },
    "massage-dos": {
      name: "Masaje de espalda",
      description: "Un tratamiento centrado en los hombros y la espalda, para liberar los nudos de tensión.",
    },
    "massage-pieds": {
      name: "Masaje de pies",
      description: "Un momento de ligereza para unos pies aliviados tras un día en la medina.",
    },
    "hammam-oriental": { name: "Hammam Oriental" },
    "hammam-dabachi": { name: "Hammam Dabachi" },
    "hammam-royal": { name: "Hammam Royal" },
    manucure: { name: "Manicura" },
    pedicure: { name: "Pedicura" },
    "pedicure-medicale": { name: "Pedicura médica" },
    "soin-visage": { name: "Tratamiento facial" },
  },
  stepData: {
    hammam30: "Hammam 30 min",
    hammam45: "Hammam 45 min",
    hammam1h: "Hammam 1h",
    gommage: "Exfoliación",
    gommageSavonNoir: "Exfoliación con jabón negro",
    gommageGhassoul: "Exfoliación con arcilla ghassoul",
    gommageCafe: "Exfoliación de café anticelulítica",
    gommageChoix: "Exfoliación a elegir (jabón negro o ghassoul)",
    savonNoir: "Aplicación de jabón negro",
    savonnage: "Enjabonado",
    shampooing: "Champú",
    shampooingBio: "Champú ecológico",
    masqueGhassoul: "Mascarilla completa de ghassoul",
    masqueCheveux: "Mascarilla capilar",
    hydratation15: "15 min de hidratación",
    pauseThe: "Pausa de té",
    pauseThePatisserie: "Pausa de té con dulces marroquíes",
    soinVisage45: "Tratamiento facial de 45 min",
    soinVisage1h: "Tratamiento facial de 1h",
    massageBaumeArgan45: "Masaje con bálsamo de argán 45 min",
    massageBaume1h: "Masaje con bálsamo 1h",
    massageRelaxant1h: "Masaje relajante 1h",
    massageAntiStress30: "Masaje antiestrés 30 min",
    massageChoix30: "Masaje a elegir 30 min (relajante, tonificante o dabachi)",
    manucure: "Manicura",
    pedicure: "Pedicura",
  },
};

export const translations: Record<Locale, Dict> = { fr, en, it, es };
