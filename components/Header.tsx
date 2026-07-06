"use client";

import { useEffect, useState } from "react";
import { useI18n } from "@/lib/i18n";
import { MenuIcon, CloseIcon } from "@/components/icons";
import LanguageSwitcher from "@/components/ui/LanguageSwitcher";

/** Sections ancrées : href + clé de traduction + id observé. */
const NAV = [
  { href: "#a-propos", id: "a-propos", key: "about" },
  { href: "#soins", id: "soins", key: "services" },
  { href: "#galerie", id: "galerie", key: "gallery" },
  { href: "#avis", id: "avis", key: "reviews" },
  { href: "#contact", id: "contact", key: "contact" },
] as const;

export default function Header() {
  const { t } = useI18n();
  const [scrolled, setScrolled] = useState(false);
  const [progress, setProgress] = useState(0);
  const [active, setActive] = useState<string>("");
  const [open, setOpen] = useState(false);

  // État de défilement + barre de progression de lecture.
  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 24);
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(max > 0 ? Math.min(y / max, 1) : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Surligne la section en cours de lecture (scroll-spy).
  useEffect(() => {
    const sections = NAV.map((n) => document.getElementById(n.id)).filter(
      (el): el is HTMLElement => el !== null
    );
    if (!sections.length) return;
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActive(visible.target.id);
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: [0, 0.25, 0.5] }
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
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
          {NAV.map((item) => {
            const isActive = active === item.id;
            return (
              <li key={item.href}>
                <a
                  href={item.href}
                  aria-current={isActive ? "true" : undefined}
                  className={[
                    "group relative text-sm font-light tracking-wide transition",
                    isActive ? "text-or" : "text-creme/85 hover:text-or",
                  ].join(" ")}
                >
                  {t.nav[item.key]}
                  <span
                    className={[
                      "absolute -bottom-1.5 left-0 h-px bg-or transition-all duration-300",
                      isActive ? "w-full" : "w-0 group-hover:w-full",
                    ].join(" ")}
                  />
                </a>
              </li>
            );
          })}
        </ul>

        <div className="flex items-center gap-3">
          <div className="hidden sm:block">
            <LanguageSwitcher />
          </div>
          <a href="#reservation" className="btn btn-gold hidden sm:inline-flex">
            {t.header.book}
          </a>
          <button
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? t.header.closeMenu : t.header.openMenu}
            aria-expanded={open}
            className="rounded-full border border-or/25 p-2 text-creme md:hidden"
          >
            {open ? <CloseIcon /> : <MenuIcon />}
          </button>
        </div>
      </nav>

      {/* Barre de progression de lecture */}
      <div
        aria-hidden
        className="absolute inset-x-0 bottom-0 h-px origin-left bg-or/70 transition-transform duration-150 ease-out"
        style={{ transform: `scaleX(${progress})`, opacity: scrolled ? 1 : 0 }}
      />

      {/* Menu mobile */}
      <div
        className={[
          "overflow-hidden border-t border-or/10 bg-noir/95 backdrop-blur-md transition-[max-height,opacity] duration-500 md:hidden",
          open ? "max-h-[32rem] opacity-100" : "max-h-0 opacity-0",
        ].join(" ")}
      >
        <ul className="flex flex-col gap-1 px-6 py-4">
          {NAV.map((item) => (
            <li key={item.href}>
              <a
                href={item.href}
                onClick={() => setOpen(false)}
                className="block border-b border-creme/10 py-3 font-display text-2xl text-creme/90"
              >
                {t.nav[item.key]}
              </a>
            </li>
          ))}
          <li className="flex items-center justify-between gap-4 pt-5">
            <span className="text-xs uppercase tracking-eyebrow text-sable/55">
              {t.header.language}
            </span>
            <LanguageSwitcher variant="stack" />
          </li>
          <li className="pt-4">
            <a
              href="#reservation"
              onClick={() => setOpen(false)}
              className="btn btn-gold w-full"
            >
              {t.header.book}
            </a>
          </li>
        </ul>
      </div>
    </header>
  );
}
