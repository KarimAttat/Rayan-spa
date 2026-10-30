"use client";

import { siteConfig } from "@/data/site-config";
import { useI18n } from "@/lib/i18n";
import { rv } from "./ui/Reveal";

/**
 * Nous trouver : à gauche l'adresse, les horaires et le téléphone, dans le
 * sans léger du texte (net et lisible) ; à droite la carte Google, en
 * couleurs, sur la moitié de l'écran. La rue ouvre l'itinéraire, le numéro
 * appelle, « Salam » écrit sur WhatsApp.
 */
export default function Contact() {
  const { t, x } = useI18n();
  const { contact } = siteConfig;
  const tel = `+${contact.whatsapp}`;

  return (
    <section id="contact" className="grid bg-bg md:min-h-[100svh] md:grid-cols-2">
      <div className="flex flex-col justify-center px-margin py-20 md:px-[6vw] md:py-24">
        <h2 {...rv(0)} className="eyebrow text-muted">
          {t.contact.title}
        </h2>

        <address {...rv(1)} className="contact-big mt-8 not-italic">
          <span className="block">{contact.address.district}</span>
          <a
            href={contact.address.mapsLink}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${t.contact.route} : ${contact.address.street}`}
            className="link block"
          >
            {contact.address.street}
          </a>
          <span className="block">{contact.address.city}</span>
        </address>

        <dl className="mt-12 grid gap-8 sm:grid-cols-2">
          <div {...rv(2)}>
            <dt className="eyebrow text-muted">{x.about.facts.hours}</dt>
            <dd className="mt-3 text-lead font-light">
              {x.contact.hoursLine[0]}
              <br />
              {x.contact.hoursLine[1]}
            </dd>
          </div>
          <div {...rv(3)}>
            <dt className="eyebrow text-muted">{x.contact.phoneLabel}</dt>
            <dd className="mt-3 text-lead font-light">
              <a href={`tel:${tel}`} className="link tabular-nums">
                {contact.phoneDisplay}
              </a>
            </dd>
          </div>
        </dl>

        <div {...rv(4)} className="mt-12 flex flex-wrap items-center gap-x-10 gap-y-6">
          <a
            href={`https://wa.me/${contact.whatsapp}`}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={x.contact.greetingLabel}
            className="button"
          >
            {x.contact.greeting} · WhatsApp
          </a>
          <a href={contact.address.mapsLink} target="_blank" rel="noopener noreferrer" className="link text-body">
            {t.contact.route} · Google Maps
          </a>
        </div>
      </div>

      <div {...rv(1, "mask")} className="relative h-[70svh] overflow-hidden md:h-auto">
        <div className="absolute inset-0 bg-surface">
          <iframe
            title={x.contact.map}
            src={contact.address.mapsEmbed}
            className="absolute inset-0 h-full w-full border-0"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        /* L'adresse : le sans du texte, en léger, grand et aéré */
        .contact-big {
          font-family: var(--font-jost), system-ui, sans-serif;
          font-weight: 300;
          font-size: clamp(2rem, 1.3rem + 2.4vw, 3.5rem);
          line-height: 1.15;
          letter-spacing: -0.015em;
        }
      ` }} />
    </section>
  );
}
