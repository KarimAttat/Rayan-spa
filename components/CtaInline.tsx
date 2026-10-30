"use client";

import { siteConfig } from "@/data/site-config";
import { useI18n } from "@/lib/i18n";
import { goToBooking } from "@/lib/booking-bus";
import { rv } from "./ui/Reveal";

/**
 * Relance entre deux sections : une phrase, deux chemins — choisir un
 * soin (formulaire) ou écrire tout de suite sur WhatsApp.
 * `zone` identifie l'emplacement dans les statistiques de conversion.
 */
export default function CtaInline({ zone, tone = "light" }: { zone: string; tone?: "light" | "night" }) {
  const { x } = useI18n();
  const night = tone === "night";

  return (
    <section
      data-cta-zone={zone}
      data-header={night ? "dark" : undefined}
      aria-label={x.cta.title}
      className={night ? "bg-night text-night-ink" : "bg-bg text-ink"}
    >
      <div className="wrap grid gap-8 py-20 md:grid-cols-12 md:items-end md:gap-x-8 md:py-28">
        <div className="md:col-span-6">
          <p {...rv(0)} className="display text-head">
            {x.cta.title}
          </p>
          <p {...rv(1)} className={["mt-5 max-w-[40ch] text-lead", night ? "" : "text-muted"].join(" ")}>
            {x.cta.text}
          </p>
        </div>
        <div {...rv(2)} className="flex flex-col items-start gap-5 sm:flex-row sm:items-center sm:gap-8 md:col-span-5 md:col-start-8 md:justify-end">
          <button type="button" onClick={goToBooking} className="button">
            {x.cta.choose}
          </button>
          <a href={`https://wa.me/${siteConfig.contact.whatsapp}`} className="link text-body">
            {x.cta.whatsapp}
          </a>
        </div>
      </div>
    </section>
  );
}
