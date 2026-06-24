"use client";

import { useEffect, useState } from "react";
import { siteConfig } from "@/data/site-config";
import { MenuIcon, CloseIcon } from "@/components/icons";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={[
        "fixed inset-x-0 top-0 z-50 transition-all duration-500",
        scrolled
          ? "bg-noir/85 backdrop-blur-md shadow-[0_1px_0_rgba(181,80,46,0.2)]"
          : "bg-transparent",
      ].join(" ")}
    >
      <nav className="mx-auto flex max-w-content items-center justify-between px-6 py-4 sm:px-8">
        {/* Logo testuale */}
        <a href="#top" className="group flex flex-col leading-none">
          <span className="font-brand text-2xl tracking-wide text-creme">
            Rayan<span className="text-rouge"> SPA</span>
          </span>
          <span className="mt-0.5 text-[0.6rem] uppercase tracking-eyebrow text-sable/60">
            Marrakech
          </span>
        </a>

        {/* Menu desktop */}
        <ul className="hidden items-center gap-9 md:flex">
          {siteConfig.nav.map((item) => (
            <li key={item.href}>
              <a
                href={item.href}
                className="group relative text-sm font-light tracking-wide text-creme/85 transition hover:text-or"
              >
                {item.label}
                <span className="absolute -bottom-1.5 left-0 h-px w-0 bg-or transition-all duration-300 group-hover:w-full" />
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-3">
          <a href="#reservation" className="btn btn-gold hidden sm:inline-flex">
            Réserver
          </a>
          <button
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
            aria-expanded={open}
            className="rounded-full border border-or/25 p-2 text-creme md:hidden"
          >
            {open ? <CloseIcon /> : <MenuIcon />}
          </button>
        </div>
      </nav>

      {/* Menu mobile */}
      <div
        className={[
          "overflow-hidden border-t border-or/10 bg-noir/95 backdrop-blur-md transition-[max-height,opacity] duration-500 md:hidden",
          open ? "max-h-96 opacity-100" : "max-h-0 opacity-0",
        ].join(" ")}
      >
        <ul className="flex flex-col gap-1 px-6 py-4">
          {siteConfig.nav.map((item) => (
            <li key={item.href}>
              <a
                href={item.href}
                onClick={() => setOpen(false)}
                className="block border-b border-creme/10 py-3 font-display text-2xl text-creme/90"
              >
                {item.label}
              </a>
            </li>
          ))}
          <li className="pt-4">
            <a
              href="#reservation"
              onClick={() => setOpen(false)}
              className="btn btn-gold w-full"
            >
              Réserver
            </a>
          </li>
        </ul>
      </div>
    </header>
  );
}
