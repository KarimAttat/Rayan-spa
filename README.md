# Rayan SPA — Sito vitrine (Marrakech)

Sito demo per **Rayan SPA** (hammam & massaggi, Marrakech). Tutti i contenuti sono
in **francese**. La prenotazione **non usa un backend**: il form compila un
messaggio e apre **WhatsApp**.

> Stack: **Next.js 14 (App Router) + TypeScript + Tailwind CSS**. Nessun database,
> login o pagamento.

---

## 1. Avvio in locale

Serve [Node.js 18.18+](https://nodejs.org) (consigliato 20+).

```bash
npm install      # installa le dipendenze (una sola volta)
npm run dev      # avvia in sviluppo → http://localhost:3000
```

Altri comandi:

```bash
npm run build    # build di produzione
npm start        # avvia la build di produzione
```

---

## 2. Dove modificare i contenuti

**Tutti i dati modificabili vivono nella cartella `data/`.** Non serve toccare il
codice dei componenti.

| File | Cosa contiene |
|------|---------------|
| `data/site-config.ts` | Numero WhatsApp, indirizzo, orari, telefono, email, social, testi dell’hero, menu |
| `data/services.ts` | Elenco soin: nome, durata, **prezzo (MAD)**, descrizione, immagine |
| `data/testimonials.ts` | Recensioni clienti |
| `data/gallery.ts` | Foto e video della galleria |

### ➜ Numero WhatsApp (importante)

In `data/site-config.ts`, campo `contact.whatsapp`. Usa il **formato
internazionale senza `+` né spazi**:

```ts
whatsapp: "212661234567",  // es. +212 6 61 23 45 67
```

Finché resta il numero placeholder (`212600000000`), il sito mostra un avviso
“demo” sotto il form.

### ➜ Prezzi e servizi

In `data/services.ts`. I prezzi sono in **MAD** e sono **placeholder realistici**:
sostituiscili con il tuo listino. Per aggiungere/togliere un soin, aggiungi/rimuovi
un elemento dall’array `services`.

### ➜ Contatti, orari, social

Sempre in `data/site-config.ts` (`contact`, `social`). Per **nascondere** un social,
lascia la stringa vuota `""`.

### ➜ Mappa Google

In `contact.address`: `mapsLink` (apre la mappa) e `mapsEmbed` (l’iframe). Per il
tuo indirizzo: Google Maps → *Condividi* → *Incorpora una mappa* → copia il valore
`src` dell’iframe in `mapsEmbed`.

---

## 3. Come sostituire foto e video (placeholder)

Finché non ci sono media reali, il sito mostra **riquadri placeholder eleganti**
che indicano il **nome file** e le **dimensioni consigliate**.

**Per inserire un media reale, in 2 passi:**

1. Copia il file nella cartella indicata (`public/images/` o `public/videos/`)
   usando **esattamente il nome consigliato**.
2. Apri il file `data/` corrispondente e incolla il percorso nel campo `src`
   (parte da `/`, es. `"/images/soin-hammam.jpg"`).

> Esempio — soin “Hammam traditionnel” in `data/services.ts`:
> ```ts
> image: {
>   src: "/images/soin-hammam.jpg",   // ← prima era ""
>   file: "images/soin-hammam.jpg",
>   alt: "Salle de hammam ...",
> }
> ```

### Tabella dei media

| Slot | Percorso file consigliato | Dimensioni | Proporzione |
|------|---------------------------|-----------|-------------|
| Video hero (sfondo) | `public/videos/hero.mp4` + `heroVideo` in config | 1920×1080, muto, loop, ~6 MB | 16:9 |
| Poster hero | `public/images/hero.jpg` | 1920×1080 | 16:9 |
| À propos | `public/images/a-propos.jpg` | 1000×1300 | 4:5 |
| Soins (×8) | `public/images/soin-*.jpg` | 800×600 | 5:4 |
| Galleria foto | `public/images/galerie-*.jpg` | 1200×900 | 4:3 |
| Galleria video | `public/videos/galerie-ambiance.mp4` | 1280×720, muto, loop | 16:9 |

I nomi esatti di ogni slot sono scritti **dentro i file `data/`** (campo `file`) e
sono mostrati anche nel placeholder a schermo.

**Formati consigliati:** foto in `.jpg`/`.webp` (ottimizzate, < 400 KB), video in
`.mp4` (H.264, muti). Le immagini reali passano automaticamente per `next/image`
(ottimizzazione, lazy-load).

### Video di sfondo dell’hero

Per attivarlo: metti `public/videos/hero.mp4` e in `data/site-config.ts` imposta
`heroVideo: "/videos/hero.mp4"`. Se resta `""`, l’hero usa uno sfondo decorativo
animato (consigliato finché non hai il video).

---

## 4. Identità visiva (design tokens)

Palette e tipografia sono centralizzate in `tailwind.config.ts` (colori) e
`app/globals.css` (texture zellige, arco moresco, grain). Modificando i colori lì,
cambia l’intero sito.

- **Colori:** espresso/noir, oro bougie, terracotta, verde zellige, sabbia/crema.
- **Font:** Cormorant Garamond (titoli), Jost (testo), Marcellus (logo).

---

## 5. Struttura del progetto

```
app/            layout (font, SEO), page (assembla le sezioni), globals.css
components/     Header, Hero, About, Services, Gallery, Booking,
                Testimonials, Contact, Footer  +  ui/ (componenti riusabili)
data/           👈 CONTENUTI MODIFICABILI (config, servizi, avis, galleria)
lib/            whatsapp.ts (costruisce il messaggio e il link wa.me)
public/         images/, videos/, patterns/ (texture zellige)
```

---

## 6. Note tecniche

- **Prenotazione**: `lib/whatsapp.ts` costruisce un messaggio FR formattato e apre
  `https://wa.me/<numero>?text=...` con encoding corretto. Nessun dato è inviato a
  un server.
- **SEO**: metadata e Open Graph in francese in `app/layout.tsx`.
- **Accessibilità**: HTML semantico, `alt`, focus visibili, navigazione da tastiera
  (galleria/lightbox), rispetto di `prefers-reduced-motion`.
- **Responsive**: mobile-first, testato a 375px.
