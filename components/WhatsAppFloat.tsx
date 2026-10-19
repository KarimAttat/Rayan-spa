"use client";

import { useEffect, useState } from "react";
import { siteConfig } from "@/data/site-config";
import { useI18n } from "@/lib/i18n";
import { WhatsAppIcon } from "@/components/icons";

/**
 * Bouton WhatsApp flottant, présent sur tout le site dès que le premier
 * écran est passé (le premier écran a déjà ses propres actions).
 */
export default function WhatsAppFloat() {
  const { t } = useI18n();
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const onScroll = () => setShown(window.scrollY > window.innerHeight * 0.5);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <a
      href={`https://wa.me/${siteConfig.contact.whatsapp}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={t.contact.whatsappCta}
      title={t.contact.whatsappCta}
      tabIndex={shown ? undefined : -1}
      aria-hidden={shown ? undefined : true}
      className={[
        "wa-float fixed bottom-[max(1.25rem,env(safe-area-inset-bottom))] right-5 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-accent text-accent-ink ring-2 ring-bg sm:right-6",
        shown ? "is-shown" : "",
      ].join(" ")}
    >
      <WhatsAppIcon width={26} height={26} />
      <style
        dangerouslySetInnerHTML={{
          __html: `
        .wa-float { opacity: 0; transform: translateY(12px) scale(0.9); pointer-events: none;
          transition: transform 320ms var(--ease-out), opacity 320ms var(--ease-out), background-color var(--t-hover) ease; }
        .wa-float.is-shown { opacity: 1; transform: none; pointer-events: auto; }
        @media (hover: hover) and (pointer: fine) { .wa-float.is-shown:hover { transform: translateY(-3px); background: var(--accent-strong); } }
        .wa-float.is-shown:active { transform: scale(0.94); }
      `,
        }}
      />
    </a>
  );
}
