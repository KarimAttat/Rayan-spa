"use client";

import Image from "next/image";
import { siteConfig } from "@/data/site-config";
import { useI18n } from "@/lib/i18n";
import { rv } from "./ui/Reveal";

/**
 * La fin de page : fond sable, une invitation, l'emblème du lion
 * sous l'arche, et le nom qui revient en entier, dans le rouge du logo,
 * coupé par le bord bas.
 */
export default function Footer() {
  const { t, x } = useI18n();
  const { brand, contact, social } = siteConfig;
  const year = new Date().getFullYear();

  const links = [
    { label: "WhatsApp", href: `https://wa.me/${contact.whatsapp}`, ext: true },
    social.instagram && { label: "Instagram", href: social.instagram, ext: true },
    social.tiktok && { label: "TikTok", href: social.tiktok, ext: true },
    { label: contact.email, href: `mailto:${contact.email}`, ext: false },
  ].filter(Boolean) as { label: string; href: string; ext: boolean }[];

  return (
    <footer className="relative flex min-h-[100svh] flex-col overflow-hidden bg-surface text-ink">
      <div className="wrap grid gap-12 pt-section md:grid-cols-12 md:gap-x-8">
        <div className="md:col-span-7">
          <p {...rv(0)} className="display max-w-[12ch] text-head">
            {x.footer.invite}
          </p>
          <a {...rv(1)} href="#reservation" className="button mt-10">
            {x.footer.cta}
          </a>
        </div>
        <ul className="space-y-2 text-body md:col-span-3 md:col-start-10">
          {links.map((l, i) => (
            <li key={l.href} {...rv(i, "row")}>
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

      <div className="wrap mt-auto flex flex-col gap-10 pt-20">
        <Image
          src="/images/logo-icon.png"
          alt=""
          width={96}
          height={96}
          className="h-20 w-20 md:h-24 md:w-24"
        />
        <div className="flex flex-col gap-2 text-small sm:flex-row sm:justify-between">
          <p>
            © {year} {brand.name}. {t.footer.rights}
          </p>
          <p>
            {contact.address.line1}, {contact.address.line2}
          </p>
        </div>
      </div>

      <p
        aria-hidden="true"
        className="giant display -mb-[0.24em] select-none whitespace-nowrap pl-[0.02em] leading-[0.8] tracking-[-0.055em] text-accent"
      >
        RAYAN SPA
      </p>
    </footer>
  );
}
