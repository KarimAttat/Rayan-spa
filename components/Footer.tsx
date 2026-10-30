"use client";

import { siteConfig } from "@/data/site-config";
import { useI18n } from "@/lib/i18n";

/**
 * Le pied de page, en une bande compacte : l'emblème et le nom, les liens
 * (WhatsApp, réseaux, e-mail), puis une ligne discrète avec le copyright
 * et l'adresse.
 */
export default function Footer() {
  const { t } = useI18n();
  const { brand, contact, social } = siteConfig;
  const year = new Date().getFullYear();

  const links = [
    { label: "WhatsApp", href: `https://wa.me/${contact.whatsapp}`, ext: true },
    social.instagram && { label: "Instagram", href: social.instagram, ext: true },
    social.tiktok && { label: "TikTok", href: social.tiktok, ext: true },
    { label: contact.email, href: `mailto:${contact.email}`, ext: false },
  ].filter(Boolean) as { label: string; href: string; ext: boolean }[];

  return (
    <footer className="bg-surface text-ink">
      <div className="wrap flex flex-col gap-8 py-10 md:flex-row md:items-center md:justify-between md:py-12">
        <a href="#top" className="display flex items-center gap-3 text-lead leading-none">
          <span aria-hidden="true" className="footer-mark h-10 w-10 shrink-0" />
          {brand.name}
        </a>
        <ul className="flex flex-wrap gap-x-8 gap-y-3 text-body">
          {links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="link break-all"
                {...(l.ext ? { target: "_blank", rel: "noopener noreferrer" } : {})}
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
      <div className="footer-base wrap flex flex-col gap-1 py-5 md:!pr-28 text-small text-muted sm:flex-row sm:justify-between">
        <p>
          © {year} {brand.name}. {t.footer.rights}
        </p>
        <p>
          {contact.address.line1}, {contact.address.line2}
        </p>
      </div>

      <style
        dangerouslySetInnerHTML={{
          __html: `
        .footer-base { border-top: 1px solid color-mix(in srgb, var(--ink) 12%, transparent); } /* taste-skill-ignore: filet du pied de page */
        .footer-mark {
          background: currentColor;
          -webkit-mask: url(/images/logo-icon.png) center / contain no-repeat;
          mask: url(/images/logo-icon.png) center / contain no-repeat;
        }
      `,
        }}
      />
    </footer>
  );
}
