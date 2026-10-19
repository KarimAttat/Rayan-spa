"use client";

import { siteConfig } from "@/data/site-config";
import { useI18n } from "@/lib/i18n";
import { rv } from "./ui/Reveal";

/**
 * L'adresse en grand : une rangée par ligne d'adresse, en bandes de deux
 * tons. La rue ouvre la carte, le numéro appelle, « Salam » écrit sur
 * WhatsApp. La carte Google se tient à droite des rangées (dessous sur mobile).
 * E-mail et réseaux sont dans le pied de page.
 */
export default function Contact() {
  const { t, x } = useI18n();
  const { contact } = siteConfig;
  const tel = `+${contact.whatsapp}`;

  const rows: { text: React.ReactNode; href?: string; label?: string; external?: boolean }[] = [
    { text: contact.address.district },
    { text: contact.address.street, href: contact.address.mapsLink, label: `${t.contact.route} : ${contact.address.street}`, external: true },
    { text: contact.address.city },
    {
      text: (
        <>
          <span className="block md:inline">{x.contact.hoursLine[0]}</span>
          <span className="hidden md:inline"> · </span>
          <span className="block md:inline">{x.contact.hoursLine[1]}</span>
        </>
      ),
    },
    { text: contact.phoneDisplay, href: `tel:${tel}`, label: x.contact.phoneLabel },
  ];

  return (
    <section id="contact" className="bg-bg">
      <h2 className="sr-only">{t.contact.title}</h2>
      <div className="relative">
        <ul>
          {rows.map((row, i) => (
            <li key={i} className={i % 2 === 0 ? "bg-bg" : "bg-surface"}>
              <div {...rv(0, "row")} className="wrap flex min-h-[5.25rem] items-end pb-3 md:min-h-[9.5rem] md:pb-5">
                {row.href ? (
                  <a
                    href={row.href}
                    aria-label={row.label}
                    {...(row.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                    className="link display text-head tabular-nums"
                  >
                    {row.text}
                  </a>
                ) : (
                  <p className="display text-head">{row.text}</p>
                )}
              </div>
            </li>
          ))}

          {/* Salutation : le bouton rond ouvre WhatsApp */}
          <li className="bg-accent text-accent-ink md:bg-bg md:text-ink">
            <div {...rv(0, "row")} className="wrap flex min-h-[5.25rem] items-center justify-between gap-6 py-4 md:min-h-[9.5rem] md:justify-start">
              <p className="display text-head">{x.contact.greeting}</p>
              <a
                href={`https://wa.me/${contact.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={x.contact.greetingLabel}
                className="hello flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-bg text-ink md:h-[0.9em] md:w-[0.9em] md:bg-accent md:text-[length:var(--step-head)] md:text-accent-ink"
              >
                <svg aria-hidden="true" viewBox="0 0 24 24" className="h-6 w-6 md:h-[0.4em] md:w-[0.4em]" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="square" />
                </svg>
              </a>
            </div>
          </li>
        </ul>

        {/* La carte : à droite des rangées sur grand écran, en dessous sur mobile */}
        <div
          {...rv(1, "mask")}
          className="relative h-[20rem] md:absolute md:bottom-0 md:right-margin md:top-0 md:h-auto md:w-[36%]"
        >
          <a
            href={contact.address.mapsLink}
            target="_blank"
            rel="noopener noreferrer"
            className="absolute inset-0 flex items-end bg-night p-6 text-body text-night-ink"
          >
            <span className="link">{t.contact.route} · Google Maps</span>
          </a>
          <iframe
            title={x.contact.map}
            src={contact.address.mapsEmbed}
            className="map absolute inset-0 h-full w-full"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .hello { transition: transform var(--t-hover) var(--ease-out); }
        @media (hover: hover) and (pointer: fine) { .hello:hover { transform: translateX(6px); } }
        .hello:active { transform: scale(0.94); }
        .map { filter: grayscale(1) contrast(0.95) brightness(0.92); }
      ` }} />
    </section>
  );
}

