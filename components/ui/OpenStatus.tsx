"use client";

import { useEffect, useState } from "react";
import { useI18n } from "@/lib/i18n";

/* Horaires réels (data/site-config.ts) : lundi–samedi 10h–20h, dimanche fermé. */
const OPEN = 10;
const CLOSE = 20;

/** Heure et jour de la semaine à Marrakech, quel que soit le fuseau du visiteur. */
function marrakechNow() {
  const parts = new Intl.DateTimeFormat("en-GB", {
    timeZone: "Africa/Casablanca",
    weekday: "short",
    hour: "numeric",
    hourCycle: "h23",
  }).formatToParts(new Date());
  const day = parts.find((p) => p.type === "weekday")?.value ?? "Mon";
  const hour = Number(parts.find((p) => p.type === "hour")?.value ?? 12);
  return { day, hour };
}

function formatHour(h: number, intl: string) {
  const d = new Date(Date.UTC(2024, 0, 1, h, 0));
  return new Intl.DateTimeFormat(intl, {
    hour: "numeric",
    minute: "2-digit",
    timeZone: "UTC",
  }).format(d);
}

/**
 * « Ouvert aujourd'hui jusqu'à 20:00 » — calculé à l'heure de Marrakech.
 * Avant hydratation (ou sans script), affiche simplement les horaires.
 */
export default function OpenStatus({ className = "" }: { className?: string }) {
  const { x, t } = useI18n();
  const [label, setLabel] = useState<string | null>(null);

  useEffect(() => {
    const update = () => {
      const { day, hour } = marrakechNow();
      const fmt = (h: number) => formatHour(h, t.intl);
      let text: string;
      if (day === "Sun") text = x.status.opensMonday.replace("{time}", fmt(OPEN));
      else if (hour < OPEN) text = x.status.opensToday.replace("{time}", fmt(OPEN));
      else if (hour < CLOSE) text = x.status.openUntil.replace("{time}", fmt(CLOSE));
      else if (day === "Sat") text = x.status.opensMonday.replace("{time}", fmt(OPEN));
      else text = x.status.opensTomorrow.replace("{time}", fmt(OPEN));
      setLabel(text);
    };
    update();
    const id = window.setInterval(update, 60_000);
    return () => window.clearInterval(id);
  }, [x, t.intl]);

  return (
    <p className={className} aria-live="polite">
      {label ?? `${x.contact.hoursLine.join(" · ")}`}
    </p>
  );
}
