"use client";

import { useEffect, useState } from "react";
import { siteConfig } from "@/data/site-config";
import { useI18n } from "@/lib/i18n";
import { goToBooking } from "@/lib/booking-bus";
import { WhatsAppIcon } from "@/components/icons";

/**
 * Actions toujours à portée de main, dès que le premier écran est passé
 * (le premier écran a déjà ses propres boutons) :
 *  - sur mobile, une barre en bas d'écran : « Réserver » + « WhatsApp » ;
 *    elle s'efface quand le formulaire est déjà à l'écran ;
 *  - sur ordinateur, le bouton rond WhatsApp.
 */
export default function WhatsAppFloat() {
  const { t, x } = useI18n();
  const [pastHero, setPastHero] = useState(false);
  const [formVisible, setFormVisible] = useState(false);
  const wa = `https://wa.me/${siteConfig.contact.whatsapp}`;

  useEffect(() => {
    const onScroll = () => setPastHero(window.scrollY > window.innerHeight * 0.5);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    const form = document.getElementById("formulaire");
    const io = form
      ? new IntersectionObserver(([e]) => setFormVisible(e.isIntersecting), { threshold: 0.15 })
      : null;
    if (form && io) io.observe(form);
    return () => {
      window.removeEventListener("scroll", onScroll);
      io?.disconnect();
    };
  }, []);

  const barShown = pastHero && !formVisible;

  return (
    <>
      {/* Mobile : barre d'actions */}
      <div
        data-cta-zone="mobile-bar"
        aria-hidden={barShown ? undefined : true}
        className={[
          "cta-bar fixed inset-x-0 bottom-0 z-40 flex gap-3 bg-bg px-margin pb-[max(0.75rem,env(safe-area-inset-bottom))] pt-3 md:hidden",
          barShown ? "is-shown" : "",
        ].join(" ")}
      >
        <button type="button" tabIndex={barShown ? undefined : -1} onClick={goToBooking} className="button flex-1">
          {x.cta.book}
        </button>
        <a
          href={wa}
          tabIndex={barShown ? undefined : -1}
          aria-label={t.contact.whatsappCta}
          className="button button--wa flex-1 gap-2"
        >
          <WhatsAppIcon width={20} height={20} />
          WhatsApp
        </a>
      </div>

      {/* Ordinateur : bouton rond */}
      <a
        href={wa}
        data-cta="float"
        aria-label={t.contact.whatsappCta}
        title={t.contact.whatsappCta}
        tabIndex={pastHero ? undefined : -1}
        aria-hidden={pastHero ? undefined : true}
        className={[
          "wa-float fixed bottom-6 right-6 z-40 hidden h-14 w-14 items-center justify-center rounded-full bg-accent text-accent-ink ring-2 ring-bg md:flex",
          pastHero ? "is-shown" : "",
        ].join(" ")}
      >
        <WhatsAppIcon width={26} height={26} />
      </a>

      <style
        dangerouslySetInnerHTML={{
          __html: `
        .wa-float, .cta-bar { opacity: 0; transform: translateY(16px); pointer-events: none;
          transition: transform 320ms var(--ease-out), opacity 320ms var(--ease-out), background-color var(--t-hover) ease; }
        .wa-float.is-shown, .cta-bar.is-shown { opacity: 1; transform: none; pointer-events: auto; }
        /* Le vert profond de WhatsApp : reconnu d'un coup d'œil, accordé au bordeaux et au sable */
        .button--wa { background: #075e54; color: var(--accent-ink); }
        .button--wa:active { background: #054a42; }
        .cta-bar { box-shadow: 0 -1px 0 color-mix(in srgb, var(--ink) 12%, transparent); } /* taste-skill-ignore: barre flottante */
        @media (hover: hover) and (pointer: fine) { .wa-float.is-shown:hover { transform: translateY(-3px); background: var(--accent-strong); } }
        .wa-float.is-shown:active { transform: scale(0.94); }
        /* La barre mobile ne masque jamais la fin de la page */
        @media (max-width: 767px) { body { padding-bottom: calc(4.5rem + env(safe-area-inset-bottom)); } }
      `,
        }}
      />
    </>
  );
}
