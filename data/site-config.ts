/* ============================================================
   CONFIGURAZIONE SITO — Rayan SPA
   ------------------------------------------------------------
   👉 MODIFICA QUI tutti i dati di contatto, gli orari e il
      NUMERO WHATSAPP. Nessun dato sensibile va cercato altrove.
   ============================================================ */

export const siteConfig = {
  brand: {
    name: "Rayan SPA",
    // ℹ️ Slogan, titre et textes de l'hero sont traduits (FR/EN/IT/ES)
    //    dans data/translations.ts → hero.*
  },

  /* --------- CONTATTI (DA COMPLETARE) --------- */
  contact: {
    // ⚠️ Formato internazionale SENZA "+" né spazi, es. 212600000000
    // Finché resta il placeholder, il pulsante WhatsApp avvisa l'utente.
    whatsapp: "212673019070",
    email: "rayanspamarrakech@gmail.com",
    address: {
      line1: "Dar El Bacha, 45 Derb Toudgha",
      line2: "Marrakech 40000, Maroc",
      // Link Google Maps verso la POSIZIONE ESATTA (apre l'app / la mappa).
      mapsLink: "https://maps.app.goo.gl/iZx3PTF6ZZyC15eU7",
      // Embed iframe della mappa — coordinate esatte, per mostrare il pin preciso.
      mapsEmbed:
        "https://www.google.com/maps?q=31.632970,-7.992715&z=17&output=embed",
    },
    hours: [
      { day: "Lundi – Vendredi", time: "10h00 – 21h00" }, // [DA COMPLETARE]
      { day: "Samedi", time: "10h00 – 22h00" }, // [DA COMPLETARE]
      { day: "Dimanche", time: "11h00 – 20h00" }, // [DA COMPLETARE]
    ],
  },

  /* --------- SOCIAL (lascia vuoto "" per nascondere) --------- */
  social: {
    instagram: "https://instagram.com/rayanspamarrakech",
    tiktok: "https://tiktok.com/@rayanspamarrakech",
  },

  // ℹ️ I libellé del menu sono tradotti in data/translations.ts → nav.*
  //    (le ancore #a-propos, #soins, … sono definite in Header.tsx / Footer.tsx)

  /* --------- MEDIA HERO --------- */
  // Video di sfondo dell'hero. Metti il file in /public/videos/hero.mp4
  // Lascia "" per usare lo sfondo decorativo (consigliato finché non hai il video).
  heroVideo: "", // es. "/videos/hero.mp4"
  heroPoster: {
    src: "/images/hero.jpg", // es. "/images/hero.jpg"
    file: "images/hero.jpg",
    alt: "Soin aux pierres chaudes sur une table de massage, ambiance tamisée",
    w: 2400,
    h: 3200,
  },

  /* --------- IMMAGINE "À PROPOS" --------- */
  aboutImage: {
    src: "/images/massage6.jpg",
    file: "images/massage6.jpg",
    alt: "Mains expertes massant le dos, gestes enveloppants et huile chaude",
    w: 2848,
    h: 4272,
  },

  /* --------- IMMAGINE "SOINS" (à côté du menu des massages) --------- */
  servicesImage: {
    src: "/images/massage3.jpg",
    file: "images/massage3.jpg",
    alt: "Massage du dos aux mains expertes, dans une ambiance tamisée",
    w: 3270,
    h: 4365,
  },
} as const;

export type SiteConfig = typeof siteConfig;
