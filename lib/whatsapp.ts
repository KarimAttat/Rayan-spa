/* ============================================================
   Costruzione del messaggio WhatsApp precompilato (in francese).
   Nessun backend: si apre wa.me con il testo già pronto.
   ============================================================ */

import { siteConfig } from "@/data/site-config";

export type BookingPayload = {
  name: string;
  phone: string;
  service: string;
  date: string;
  time: string;
  people: string;
  notes: string;
};

/** Il numero placeholder di default — usato per avvisare l'utente in demo. */
export const PLACEHOLDER_NUMBER = "212600000000";

export function isPlaceholderNumber(num: string): boolean {
  return num.replace(/\D/g, "") === PLACEHOLDER_NUMBER;
}

/** Costruisce il testo del messaggio in francese, ben formattato. */
export function buildWhatsAppMessage(data: BookingPayload): string {
  const lines = [
    `Bonjour ${siteConfig.brand.name},`,
    "",
    "Je souhaite réserver un soin :",
    "",
    `• Nom : ${data.name}`,
    `• Téléphone : ${data.phone}`,
    `• Soin souhaité : ${data.service}`,
    `• Date souhaitée : ${formatFrDate(data.date)}`,
    `• Heure souhaitée : ${data.time || "à convenir"}`,
    `• Nombre de personnes : ${data.people}`,
  ];

  if (data.notes.trim()) {
    lines.push(`• Notes : ${data.notes.trim()}`);
  }

  lines.push("", "Merci de me confirmer la disponibilité. 🌿");

  return lines.join("\n");
}

/** Restituisce il link wa.me completo con testo codificato. */
export function buildWhatsAppLink(data: BookingPayload): string {
  const number = siteConfig.contact.whatsapp.replace(/\D/g, "");
  const text = encodeURIComponent(buildWhatsAppMessage(data));
  return `https://wa.me/${number}?text=${text}`;
}

/** Formatta una data ISO (YYYY-MM-DD) in francese leggibile. */
function formatFrDate(iso: string): string {
  if (!iso) return "à convenir";
  try {
    const d = new Date(iso + "T00:00:00");
    return new Intl.DateTimeFormat("fr-FR", {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    }).format(d);
  } catch {
    return iso;
  }
}
