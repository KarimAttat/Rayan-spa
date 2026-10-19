"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { useI18n } from "@/lib/i18n";

type LightboxItem = { id: string; src: string; alt: string; w: number; h: number };

type LightboxProps = {
  items: LightboxItem[];
  index: number | null;
  onClose: () => void;
  onNavigate: (i: number) => void;
};

/** Photo en grand : Échap pour fermer, flèches pour naviguer, focus piégé sur le bouton fermer. */
export default function Lightbox({ items, index, onClose, onNavigate }: LightboxProps) {
  const { locale } = useI18n();
  const closeRef = useRef<HTMLButtonElement>(null);
  const open = index !== null;
  const labels = {
    fr: { close: "Fermer", prev: "Précédente", next: "Suivante" },
    en: { close: "Close", prev: "Previous", next: "Next" },
    it: { close: "Chiudi", prev: "Precedente", next: "Successiva" },
    es: { close: "Cerrar", prev: "Anterior", next: "Siguiente" },
  }[locale];

  useEffect(() => {
    if (!open) return;
    const previous = document.activeElement as HTMLElement | null;
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") onNavigate((index! + 1) % items.length);
      if (e.key === "ArrowLeft") onNavigate((index! - 1 + items.length) % items.length);
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
      previous?.focus();
    };
  }, [open, index, items.length, onClose, onNavigate]);

  return (
    <AnimatePresence>
      {open && index !== null && (
        <motion.div
          className="fixed inset-0 z-[80] flex flex-col bg-bg"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          role="dialog"
          aria-modal="true"
          aria-label={items[index].alt}
        >
          <div className="wrap flex h-16 items-center justify-between text-body">
            <span className="tabular-nums text-muted">
              {index + 1} / {items.length}
            </span>
            <button ref={closeRef} onClick={onClose} className="link min-h-[2.75rem]">
              {labels.close}
            </button>
          </div>

          <motion.figure
            key={items[index].id}
            className="relative mx-margin flex-1"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          >
            <Image
              src={items[index].src}
              alt={items[index].alt}
              fill
              sizes="100vw"
              className="object-contain"
            />
          </motion.figure>

          <div className="wrap flex min-h-24 items-center justify-between gap-6 py-4 text-body">
            <button
              onClick={() => onNavigate((index - 1 + items.length) % items.length)}
              className="link min-h-[2.75rem]"
            >
              {labels.prev}
            </button>
            <p className="hidden max-w-[48ch] text-center md:block">{items[index].alt}</p>
            <button onClick={() => onNavigate((index + 1) % items.length)} className="link min-h-[2.75rem]">
              {labels.next}
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
