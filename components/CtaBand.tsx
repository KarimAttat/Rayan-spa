"use client";

import { siteConfig } from "@/data/site-config";
import { useI18n } from "@/lib/i18n";

/**
 * Le bandeau en forme d'arche : un seul mot (« Réserver »), un seul lien,
 * WhatsApp direct. Placé après les lieux, au moment où l'envie est là.
 */
export default function CtaBand() {
  const { x } = useI18n();
  const direct = `https://wa.me/${siteConfig.contact.whatsapp}`;

  return (
    <section id="reserver-whatsapp" className="bg-bg py-section">
      <a
        href={direct}
        data-cta="band"
        aria-label={x.band.label}
        className="band arch relative mx-margin flex h-[52svh] flex-col justify-between overflow-hidden bg-night text-night-ink md:h-[68svh]"
      >
        <span className="mt-[46%] flex items-start justify-between gap-6 px-5 sm:mt-[30%] md:mt-[11%] md:px-8">
          <span className="max-w-[24ch] text-body md:text-lead">{x.band.sentence}</span>
          <svg
            aria-hidden="true"
            viewBox="0 0 48 48"
            className="band-arrow h-8 w-8 shrink-0 md:h-12 md:w-12"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
          >
            <path d="M12 36 36 12M16 12h20v20" strokeLinecap="square" />
          </svg>
        </span>
        <span
          aria-hidden="true"
          className="giant display block whitespace-nowrap px-3 pb-[0.06em] font-medium leading-[0.74] tracking-[-0.055em]"
          // Le mot remplit la largeur sur une ligne, quelle que soit la langue.
          style={{ fontSize: `min(var(--step-giant), ${(86 / (x.band.verb.length * 0.5)).toFixed(1)}vw)` }}
        >
          {x.band.verb}
        </span>
      </a>

      <style
        dangerouslySetInnerHTML={{
          __html: `
        .band { transition: background-color 0ms, color 0ms; }
        .band-arrow { transition: transform var(--t-hover) var(--ease-out); }
        .band:hover, .band:focus-visible { background: #1a0f0b; }
        .band:hover .band-arrow { transform: translate(4px, -4px); }
        .band:active { transform: scale(0.995); }
        .band:focus-visible { outline-offset: 6px; }
      `,
        }}
      />
    </section>
  );
}
