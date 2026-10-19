"use client";

import { useEffect, useState } from "react";
import { useI18n } from "@/lib/i18n";
import LanguageSwitcher from "@/components/ui/LanguageSwitcher";

/** Sections ancrées : href + clé de traduction (data/experience.ts → nav). */
const NAV = [
  { id: "rituel", key: "ritual" },
  { id: "carte", key: "menu" },
  { id: "lieux", key: "places" },
  { id: "contact", key: "contact" },
] as const;

export default function Header() {
  const { x, t } = useI18n();
  const [solid, setSolid] = useState(false);
  const [active, setActive] = useState("");
  const [open, setOpen] = useState(false);

  // La barre devient un champ plein une fois le premier écran dépassé.
  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > window.innerHeight * 0.6);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Section en cours de lecture.
  useEffect(() => {
    const sections = NAV.map((n) => document.getElementById(n.id)).filter(
      (el): el is HTMLElement => el !== null
    );
    const io = new IntersectionObserver(
      (entries) => {
        const hit = entries.find((e) => e.isIntersecting);
        if (hit) setActive(hit.target.id);
      },
      { rootMargin: "-45% 0px -50% 0px" }
    );
    sections.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, []);

  // Menu mobile : Échap pour fermer, page figée derrière.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={[
        "fixed inset-x-0 top-0 z-50 transition-colors duration-300",
        solid || open ? "bg-bg" : "bg-transparent",
      ].join(" ")}
    >
      <nav className="wrap flex h-16 items-center justify-between gap-6 md:h-[4.5rem]">
        <a href="#top" className="display text-lead leading-none tracking-[-0.01em]">
          Rayan Spa
        </a>

        <ul className="hidden items-center gap-9 text-small md:flex">
          {NAV.map((item) => (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                aria-current={active === item.id ? "true" : undefined}
                className={[
                  "link",
                  active === item.id ? "!decoration-current" : "",
                ].join(" ")}
              >
                {x.nav[item.key]}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-5">
          <div className="hidden md:block">
            <LanguageSwitcher />
          </div>
          <a href="#reservation" className="button hidden !min-h-[2.75rem] !px-5 !text-small md:inline-flex">
            {t.header.book}
          </a>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="menu-mobile"
            aria-label={open ? t.header.closeMenu : t.header.openMenu}
            className="flex min-h-[2.75rem] items-center text-body md:hidden"
          >
            {/* « Fermer » / « Close » / « Chiudi » / « Cerrar » */}
            {open ? t.header.closeMenu.split(" ")[0] : "Menu"}
          </button>
        </div>
      </nav>

      {/* Menu mobile : un champ plein, les sections en grand */}
      <div
        id="menu-mobile"
        hidden={!open}
        className="h-[calc(100svh-4rem)] overflow-y-auto bg-bg md:hidden"
      >
        <ul className="wrap flex flex-col gap-2 pt-6">
          {NAV.map((item) => (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                onClick={() => setOpen(false)}
                className="display block py-2 text-head"
              >
                {x.nav[item.key]}
              </a>
            </li>
          ))}
        </ul>
        <div className="wrap mt-10 flex flex-col gap-8 pb-10">
          <LanguageSwitcher variant="stack" />
          <a href="#reservation" onClick={() => setOpen(false)} className="button w-full">
            {t.header.book}
          </a>
        </div>
      </div>
    </header>
  );
}
