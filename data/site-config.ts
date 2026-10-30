/* ============================================================
   CONFIGURAZIONE SITO — Rayan SPA
   ------------------------------------------------------------
   👉 MODIFICA QUI tutti i dati di contatto, gli orari e il
      NUMERO WHATSAPP. Nessun dato sensibile va cercato altrove.
   ============================================================ */

export const siteConfig = {
  // URL de production — sert de base aux metadata, au sitemap et aux données structurées.
  url: "https://rayanspa.com",

  brand: {
    name: "Rayan SPA",
    // ℹ️ Slogan, titre et textes de l'hero sont traduits (FR/EN/IT/ES)
    //    dans data/translations.ts → hero.*
  },

  /* --------- CONTATTI (DA COMPLETARE) --------- */
  contact: {
    // ⚠️ Formato internazionale SENZA "+" né spazi, es. 212600000000
    // Finché resta il placeholder, il pulsante WhatsApp avvisa l'utente.
    whatsapp: "212690887209",
    // Affichage lisible du même numéro (ligne « téléphone » du contact).
    phoneDisplay: "+212 690 887 209",
    email: "rayanspamarrakech@gmail.com",
    address: {
      line1: "Dar El Bacha, 45 Derb Toudgha",
      // Découpage pour l'adresse en grand (section contact).
      district: "Dar El Bacha",
      street: "45 Derb Toudgha",
      city: "40000 Marrakech",
      line2: "Marrakech 40000, Maroc",
      // Link Google Maps verso la POSIZIONE ESATTA (apre l'app / la mappa).
      mapsLink: "https://maps.app.goo.gl/iZx3PTF6ZZyC15eU7",
      // Embed iframe della mappa — coordinate esatte, per mostrare il pin preciso.
      mapsEmbed:
        "https://www.google.com/maps?q=31.632970,-7.992715&z=17&output=embed",
    },
    hours: [
      { day: "Lundi – Samedi", time: "10h00 – 20h00" },
      { day: "Dimanche", time: "Fermé" },
    ],
  },

  /* --------- SOCIAL (lascia vuoto "" per nascondere) --------- */
  social: {
    instagram: "https://instagram.com/rayanspamarrakech",
    tiktok: "https://tiktok.com/@rayanspamarrakech",
  },

  // ℹ️ I libellé del menu sono tradotti in data/translations.ts → nav.*
  //    (le ancore #a-propos, #soins, … sono definite in Header.tsx / Footer.tsx)

  /* --------- AVIS CLIENTS --------- */
  // ⚠️ Les avis de data/testimonials.ts sont des exemples (non vérifiés).
  // La section reste masquée tant qu'ils ne sont pas remplacés par de
  // vrais avis (Google, TripAdvisor…) : passer à true pour l'afficher.
  showTestimonials: false,

  /* --------- IMAGES --------- */
  // Photo plein écran du premier écran, sous le nom (image générée, illustration).
  heroImage: {
    src: "/images/massage-dos.jpg",
    w: 3200,
    h: 1786,
    // Les mains sont à droite : sur un écran étroit, on garde ce côté-là.
    focus: "72% 50%",
  },
  // Film du premier écran (généré, illustration), posé sur la photo ci-dessus.
  heroVideo: {
    src: "/videos/hero.mp4",
  },
  // Image des données structurées / partage (photo dominante).
  shareImage: "/images/hero.jpg",
  // Photo plein écran juste avant la carte des soins (image générée, illustration).
  menuImage: {
    src: "/images/massage-nuque.jpg",
    w: 3200,
    h: 1786,
    focus: "58% 50%",
  },
} as const;

export type SiteConfig = typeof siteConfig;
