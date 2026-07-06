/* ============================================================
   Costruzione del messaggio WhatsApp precompilato (multilingue).
   Nessun backend: si apre wa.me con il testo già pronto, nella
   lingua attiva del sito (vedi data/translations.ts).
   ============================================================ */

import { siteConfig } from "@/data/site-config";
import type { Dict } from "@/data/translations";

export type BookingPayload = {
  name: string;
  phone: string;
  service: string;
  date: string;
  time: string;
  people: string;
  notes: string;
};

/** Étiquettes + locale Intl issues du dictionnaire actif. */
type MessageLocale = Pick<Dict, "whatsapp" | "intl">;

/** Il numero placeholder di default — usato per avvisare l'utente in demo. */
export const PLACEHOLDER_NUMBER = "212600000000";

export function isPlaceholderNumber(num: string): boolean {
  return num.replace(/\D/g, "") === PLACEHOLDER_NUMBER;
}

/** Costruisce il testo del messaggio nella lingua attiva, ben formattato. */
export function buildWhatsAppMessage(
  data: BookingPayload,
  loc: MessageLocale
): string {
  const w = loc.whatsapp;
  const lines = [
    w.greeting.replace("{brand}", siteConfig.brand.name),
    "",
    w.intro,
    "",
    `• ${w.name} : ${data.name}`,
    `• ${w.phone} : ${data.phone}`,
    `• ${w.service} : ${data.service}`,
    `• ${w.date} : ${formatDate(data.date, loc.intl, w.toConvene)}`,
    `• ${w.time} : ${data.time || w.toConvene}`,
    `• ${w.people} : ${data.people}`,
  ];

  if (data.notes.trim()) {
    lines.push(`• ${w.notes} : ${data.notes.trim()}`);
  }

  lines.push("", w.footer);

  return lines.join("\n");
}

/** Restituisce il link wa.me completo con testo codificato. */
export function buildWhatsAppLink(
  data: BookingPayload,
  loc: MessageLocale
): string {
  const number = siteConfig.contact.whatsapp.replace(/\D/g, "");
  const text = encodeURIComponent(buildWhatsAppMessage(data, loc));
  return `https://wa.me/${number}?text=${text}`;
}

/** Formatta una data ISO (YYYY-MM-DD) in modo leggibile nella lingua attiva. */
function formatDate(iso: string, intlLocale: string, fallback: string): string {
  if (!iso) return fallback;
  try {
    const d = new Date(iso + "T00:00:00");
    return new Intl.DateTimeFormat(intlLocale, {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    }).format(d);
  } catch {
    return iso;
  }
}
