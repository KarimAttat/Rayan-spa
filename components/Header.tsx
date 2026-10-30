"use client";

import { useEffect, useState } from "react";
import { useI18n } from "@/lib/i18n";
import LanguageSwitcher from "@/components/ui/LanguageSwitcher";

/** Sections ancrées : href + clé de traduction (data/experience.ts → nav). */
const NAV = [
  { id: "carte", key: "menu" },
  { id: "rituel", key: "ritual" },
  { id: "lieux", key: "places" },
  { id: "contact", key: "contact" },
] as const;

export default function Header() {
  const { x, t } = useI18n();
  const [onDark, setOnDark] = useState(true);
  const [hidden, setHidden] = useState(false);
  const [active, setActive] = useState("");
  const [open, setOpen] = useState(false);

  // La barre n'a pas de fond : son texte passe en clair quand elle survole
  // une photo ou une section sombre (marquées data-header="dark"). Sur les
  // sections claires, elle s'efface quand on descend (pour ne pas se poser
  // sur le texte) et revient dès qu'on remonte.
  useEffect(() => {
    let lastY = window.scrollY;
    const onScroll = () => {
      const y = 32;
      const dark = Array.from(document.querySelectorAll<HTMLElement>('[data-header="dark"]')).some((el) => {
        const r = el.getBoundingClientRect();
        return r.top <= y && r.bottom > y;
      });
      setOnDark(dark);
      const now = window.scrollY;
      if (Math.abs(now - lastY) > 4) {
        setHidden(!dark && now > lastY);
        lastY = now;
      }
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
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
        "fixed inset-x-0 top-0 z-50 transition-[color,background-color,transform] duration-300",
        hidden && !open ? "-translate-y-full" : "",
        // Menu mobile ouvert : un champ plein ; sinon, aucun fond.
        open ? "bg-bg text-ink" : onDark ? "text-night-ink" : "text-ink",
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
