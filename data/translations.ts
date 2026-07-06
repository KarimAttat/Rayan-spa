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
  };
  gallery: {
    eyebrow: string;
    title: string;
    intro: string;
    enlarge: string;
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
    cards: { address: string; hours: string; phone: string; email: string };
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
  serviceData: Record<string, { name: string; description: string }>;
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
  },
  gallery: {
    eyebrow: "Galerie",
    title: "L’atmosphère Rayan",
    intro:
      "Flânez à travers nos espaces : la lumière tamisée, le zellige et la quiétude d’un véritable riad marocain.",
    enlarge: "Agrandir",
    alts: [
      "Voûte du hammam en tadelakt sous la lumière des lanternes",
      "Table de massage drapée de lin et pétales de rose",
      "Patio du riad avec fontaine en zellige et palmiers",
      "Service du thé à la menthe et pâtisseries marocaines",
      "Vidéo d’ambiance du spa",
      "Huiles d’argan, savon noir et fleurs séchées sur plateau de cuivre",
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
    cards: { address: "Adresse", hours: "Horaires", phone: "Téléphone", email: "Email" },
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
    "hammam-traditionnel": {
      name: "Hammam traditionnel",
      description: "Le rituel séculaire de la vapeur, du savon noir et du gant kessa pour une peau purifiée et un esprit délassé.",
    },
    "gommage-savon-noir": {
      name: "Gommage au savon noir",
      description: "Le savon noir à l’huile d’olive et le gant kessa exfolient en douceur pour révéler une peau neuve et satinée.",
    },
    "massage-huile-argan": {
      name: "Massage à l’huile d’argan",
      description: "Un massage enveloppant à l’or liquide du Maroc, nourrissant la peau et dénouant chaque tension.",
    },
    "massage-berbere": {
      name: "Massage berbère",
      description: "Pressions profondes et gestes ancestraux des montagnes de l’Atlas pour libérer le corps en profondeur.",
    },
    "massage-pierres-chaudes": {
      name: "Massage aux pierres chaudes",
      description: "La chaleur enveloppante des pierres volcaniques fond les tensions et réchauffe les muscles en profondeur.",
    },
    "soin-visage": {
      name: "Soin du visage",
      description: "Un soin éclat aux argiles et fleurs du Maroc qui purifie, hydrate et illumine le teint.",
    },
    "massage-duo": {
      name: "Massage en duo",
      description: "Une parenthèse à deux, côte à côte, pour partager un moment de détente absolue dans une suite privée.",
    },
    "forfait-rituel": {
      name: "Forfait Rituel Rayan",
      description: "L’expérience complète : hammam, gommage au savon noir et massage à l’argan. Le voyage des sens absolu.",
    },
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
  },
  gallery: {
    eyebrow: "Gallery",
    title: "The Rayan atmosphere",
    intro:
      "Wander through our spaces: the soft light, the zellige and the quiet of an authentic Moroccan riad.",
    enlarge: "Enlarge",
    alts: [
      "Tadelakt hammam vault under lantern light",
      "Massage table draped in linen with rose petals",
      "Riad patio with zellige fountain and palm trees",
      "Mint tea service with Moroccan pastries",
      "Spa ambiance video",
      "Argan oils, black soap and dried flowers on a copper tray",
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
    cards: { address: "Address", hours: "Opening hours", phone: "Phone", email: "Email" },
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
    "hammam-traditionnel": {
      name: "Traditional hammam",
      description: "The age-old ritual of steam, black soap and the kessa glove for purified skin and a relaxed mind.",
    },
    "gommage-savon-noir": {
      name: "Black soap scrub",
      description: "Olive-oil black soap and the kessa glove gently exfoliate to reveal new, satin-soft skin.",
    },
    "massage-huile-argan": {
      name: "Argan oil massage",
      description: "An enveloping massage with Morocco’s liquid gold, nourishing the skin and releasing every tension.",
    },
    "massage-berbere": {
      name: "Berber massage",
      description: "Deep pressure and ancestral gestures from the Atlas mountains to release the body in depth.",
    },
    "massage-pierres-chaudes": {
      name: "Hot stone massage",
      description: "The enveloping warmth of volcanic stones melts tension and warms the muscles deep down.",
    },
    "soin-visage": {
      name: "Facial treatment",
      description: "A radiance treatment with Moroccan clays and flowers that purifies, hydrates and brightens the complexion.",
    },
    "massage-duo": {
      name: "Couples’ massage",
      description: "A moment for two, side by side, to share absolute relaxation in a private suite.",
    },
    "forfait-rituel": {
      name: "Rayan Ritual Package",
      description: "The complete experience: hammam, black soap scrub and argan massage. The ultimate journey of the senses.",
    },
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
  },
  gallery: {
    eyebrow: "Galleria",
    title: "L’atmosfera Rayan",
    intro:
      "Passeggiate tra i nostri spazi: la luce soffusa, gli zellige e la quiete di un autentico riad marocchino.",
    enlarge: "Ingrandisci",
    alts: [
      "Volta dell’hammam in tadelakt sotto la luce delle lanterne",
      "Lettino da massaggio drappeggiato di lino con petali di rosa",
      "Patio del riad con fontana in zellige e palme",
      "Servizio del tè alla menta con dolci marocchini",
      "Video d’atmosfera della spa",
      "Oli di argan, sapone nero e fiori secchi su vassoio di rame",
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
    cards: { address: "Indirizzo", hours: "Orari", phone: "Telefono", email: "Email" },
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
    "hammam-traditionnel": {
      name: "Hammam tradizionale",
      description: "Il rito secolare del vapore, del sapone nero e del guanto kessa per una pelle purificata e una mente distesa.",
    },
    "gommage-savon-noir": {
      name: "Scrub al sapone nero",
      description: "Il sapone nero all’olio d’oliva e il guanto kessa esfoliano con delicatezza per rivelare una pelle nuova e setosa.",
    },
    "massage-huile-argan": {
      name: "Massaggio all’olio di argan",
      description: "Un massaggio avvolgente con l’oro liquido del Marocco, che nutre la pelle e scioglie ogni tensione.",
    },
    "massage-berbere": {
      name: "Massaggio berbero",
      description: "Pressioni profonde e gesti ancestrali delle montagne dell’Atlante per liberare il corpo in profondità.",
    },
    "massage-pierres-chaudes": {
      name: "Massaggio con pietre calde",
      description: "Il calore avvolgente delle pietre vulcaniche scioglie le tensioni e riscalda i muscoli in profondità.",
    },
    "soin-visage": {
      name: "Trattamento viso",
      description: "Un trattamento illuminante con argille e fiori del Marocco che purifica, idrata e illumina l’incarnato.",
    },
    "massage-duo": {
      name: "Massaggio di coppia",
      description: "Una parentesi in due, fianco a fianco, per condividere un momento di relax assoluto in una suite privata.",
    },
    "forfait-rituel": {
      name: "Pacchetto Rituale Rayan",
      description: "L’esperienza completa: hammam, scrub al sapone nero e massaggio all’argan. Il viaggio dei sensi assoluto.",
    },
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
  },
  gallery: {
    eyebrow: "Galería",
    title: "El ambiente Rayan",
    intro:
      "Pasea por nuestros espacios: la luz tenue, el zellige y la quietud de un auténtico riad marroquí.",
    enlarge: "Ampliar",
    alts: [
      "Bóveda del hammam en tadelakt bajo la luz de los faroles",
      "Camilla de masaje cubierta de lino con pétalos de rosa",
      "Patio del riad con fuente de zellige y palmeras",
      "Servicio de té a la menta con dulces marroquíes",
      "Vídeo de ambiente del spa",
      "Aceites de argán, jabón negro y flores secas en bandeja de cobre",
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
    cards: { address: "Dirección", hours: "Horario", phone: "Teléfono", email: "Email" },
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
    "hammam-traditionnel": {
      name: "Hammam tradicional",
      description: "El ritual milenario del vapor, el jabón negro y el guante kessa para una piel purificada y una mente relajada.",
    },
    "gommage-savon-noir": {
      name: "Exfoliación con jabón negro",
      description: "El jabón negro de aceite de oliva y el guante kessa exfolian con suavidad para revelar una piel nueva y satinada.",
    },
    "massage-huile-argan": {
      name: "Masaje con aceite de argán",
      description: "Un masaje envolvente con el oro líquido de Marruecos, que nutre la piel y deshace cada tensión.",
    },
    "massage-berbere": {
      name: "Masaje bereber",
      description: "Presiones profundas y gestos ancestrales de las montañas del Atlas para liberar el cuerpo en profundidad.",
    },
    "massage-pierres-chaudes": {
      name: "Masaje con piedras calientes",
      description: "El calor envolvente de las piedras volcánicas funde las tensiones y calienta los músculos en profundidad.",
    },
    "soin-visage": {
      name: "Tratamiento facial",
      description: "Un tratamiento de luminosidad con arcillas y flores de Marruecos que purifica, hidrata e ilumina el cutis.",
    },
    "massage-duo": {
      name: "Masaje en pareja",
      description: "Un paréntesis para dos, lado a lado, para compartir un momento de relax absoluto en una suite privada.",
    },
    "forfait-rituel": {
      name: "Paquete Ritual Rayan",
      description: "La experiencia completa: hammam, exfoliación con jabón negro y masaje de argán. El viaje absoluto de los sentidos.",
    },
  },
};

export const translations: Record<Locale, Dict> = { fr, en, it, es };
