import ZelligeDivider from "./ui/ZelligeDivider";
import { siteConfig } from "@/data/site-config";

export default function Footer() {
  const { brand, contact, nav } = siteConfig;
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
              Hammam & Massages · Marrakech
            </span>
          </a>

          <ZelligeDivider className="my-8" />

          <nav className="flex flex-wrap items-center justify-center gap-x-7 gap-y-2">
            {nav.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="text-sm font-light text-sable/75 transition hover:text-or"
              >
                {item.label}
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
            © {year} {brand.name}. Tous droits réservés.
          </p>
          <p className="uppercase tracking-wide">Site vitrine · Marrakech, Maroc</p>
        </div>
      </div>
    </footer>
  );
}
