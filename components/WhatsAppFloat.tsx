"use client";

import { siteConfig } from "@/data/site-config";
import { useI18n } from "@/lib/i18n";
import { WhatsAppIcon } from "@/components/icons";

/** Bouton WhatsApp flottant, visible en permanence sur tout le site. */
export default function WhatsAppFloat() {
  const { t } = useI18n();

  return (
    <a
      href={`https://wa.me/${siteConfig.contact.whatsapp}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={t.contact.whatsappCta}
      title={t.contact.whatsappCta}
      className="fixed bottom-[max(1.25rem,env(safe-area-inset-bottom))] right-5 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-or text-ivoire shadow-riad ring-1 ring-or/40 transition-all duration-300 hover:-translate-y-1 hover:bg-rouge-clair hover:shadow-glow sm:right-6"
    >
      <WhatsAppIcon width={26} height={26} />
    </a>
  );
}
