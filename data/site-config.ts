/* ============================================================
   CONFIGURAZIONE SITO — Rayan SPA
   ------------------------------------------------------------
   👉 MODIFICA QUI tutti i dati di contatto, gli orari e il
      NUMERO WHATSAPP. Nessun dato sensibile va cercato altrove.
   ============================================================ */

export const siteConfig = {
  brand: {
    name: "Rayan SPA",
    tagline: "Hammam & Massages — Marrakech",
    // Frase del cuore del sito (hero)
    heroTitle: "L’art ancestral du bien-être marocain",
    heroSubtitle:
      "Au cœur de Marrakech, un havre de calme où le rituel du hammam et le toucher des mains expertes réveillent le corps et apaisent l’esprit.",
  },

  /* --------- CONTATTI (DA COMPLETARE) --------- */
  contact: {
    // ⚠️ Formato internazionale SENZA "+" né spazi, es. 212600000000
    // Finché resta il placeholder, il pulsante WhatsApp avvisa l'utente.
    whatsapp: "212600000000", // [DA COMPLETARE]
    phoneDisplay: "+212 6 00 00 00 00", // [DA COMPLETARE]
    email: "contact@rayan-spa.ma", // [DA COMPLETARE]
    address: {
      line1: "Dar El Bacha",
      line2: "Médina, Marrakech, Maroc",
      // Link Google Maps verso la POSIZIONE ESATTA (apre l'app / la mappa).
      mapsLink: "https://maps.app.goo.gl/iZx3PTF6ZZyC15eU7",
      // Embed iframe della mappa (per la query usata nell'<iframe> della sezione Contact).
      mapsEmbed:
        "https://www.google.com/maps?q=Dar%20El%20Bacha%20Marrakech&output=embed",
    },
    hours: [
      { day: "Lundi – Vendredi", time: "10h00 – 21h00" }, // [DA COMPLETARE]
      { day: "Samedi", time: "10h00 – 22h00" }, // [DA COMPLETARE]
      { day: "Dimanche", time: "11h00 – 20h00" }, // [DA COMPLETARE]
    ],
  },

  /* --------- SOCIAL (DA COMPLETARE — lascia vuoto "" per nascondere) --------- */
  social: {
    instagram: "https://instagram.com/", // [DA COMPLETARE]
    facebook: "https://facebook.com/", // [DA COMPLETARE]
    tripadvisor: "", // opzionale
  },

  /* --------- NAVIGAZIONE (ancore alle sezioni) --------- */
  nav: [
    { label: "À propos", href: "#a-propos" },
    { label: "Soins", href: "#soins" },
    { label: "Galerie", href: "#galerie" },
    { label: "Avis", href: "#avis" },
    { label: "Contact", href: "#contact" },
  ],

  /* --------- MEDIA HERO --------- */
  // Video di sfondo dell'hero. Metti il file in /public/videos/hero.mp4
  // Lascia "" per usare lo sfondo decorativo (consigliato finché non hai il video).
  heroVideo: "", // es. "/videos/hero.mp4"
  heroPoster: {
    src: "", // es. "/images/hero.jpg"
    file: "images/hero.jpg",
    alt: "Salle de repos du hammam Rayan SPA éclairée de lanternes",
    w: 1920,
    h: 1080,
  },

  /* --------- IMMAGINE "À PROPOS" --------- */
  aboutImage: {
    src: "", // es. "/images/a-propos.jpg"
    file: "images/a-propos.jpg",
    alt: "Bassin de hammam en tadelakt et zellige, vapeur douce",
    w: 1000,
    h: 1300,
  },
} as const;

export type SiteConfig = typeof siteConfig;
