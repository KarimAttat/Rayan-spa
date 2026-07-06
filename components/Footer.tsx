"use client";

import ZelligeDivider from "./ui/ZelligeDivider";
import { siteConfig } from "@/data/site-config";
import { useI18n } from "@/lib/i18n";

const NAV = [
  { href: "#a-propos", key: "about" },
  { href: "#soins", key: "services" },
  { href: "#galerie", key: "gallery" },
  { href: "#avis", key: "reviews" },
  { href: "#contact", key: "contact" },
] as const;

export default function Footer() {
  const { t } = useI18n();
  const { brand, contact } = siteConfig;
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-or/10 bg-noir">
      <div className="mx-auto max-w-content px-6 py-16 sm:px-8">
        <div className="flex flex-col items-center text-center">
          <a href="#top" className="flex flex-col items-center leading-none">
            <span className="font-brand text-3xl tracking-wide text-creme">
              Rayan<span className="text-rouge"> SPA</span>
            </span>
            <span className="mt-1 text-[0.62rem] uppercase tracking-eyebrow text-sable/60">
              {t.footer.tagline}
            </span>
          </a>

          <ZelligeDivider className="my-8" />

          <nav className="flex flex-wrap items-center justify-center gap-x-7 gap-y-2">
            {NAV.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="text-sm font-light text-sable/75 transition hover:text-or"
              >
                {t.nav[item.key]}
              </a>
            ))}
          </nav>

          <p className="mt-8 max-w-md text-sm font-light leading-relaxed text-sable/70">
            {contact.address.line1}, {contact.address.line2}
            <br />
            {contact.phoneDisplay} · {contact.email}
          </p>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-creme/10 pt-6 text-xs text-sable/60 sm:flex-row">
          <p>
            © {year} {brand.name}. {t.footer.rights}
          </p>
          <p className="uppercase tracking-wide">{t.footer.vitrine}</p>
        </div>
      </div>
    </footer>
  );
}
