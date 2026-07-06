"use client";

import { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import type { GalleryItem } from "@/data/gallery";
import MediaFrame from "./MediaFrame";
import { CloseIcon, ArrowIcon } from "@/components/icons";

type LightboxProps = {
  items: GalleryItem[];
  index: number | null;
  onClose: () => void;
  onNavigate: (i: number) => void;
};

export default function Lightbox({
  items,
  index,
  onClose,
  onNavigate,
}: LightboxProps) {
  const open = index !== null;

  // Tastiera: Esc per chiudere, frecce per navigare
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") onNavigate((index! + 1) % items.length);
      if (e.key === "ArrowLeft")
        onNavigate((index! - 1 + items.length) % items.length);
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, index, items.length, onClose, onNavigate]);

  return (
    <AnimatePresence>
      {open && index !== null && (
        <motion.div
          className="fixed inset-0 z-[80] flex items-center justify-center bg-noir/95 p-4 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          role="dialog"
          aria-modal="true"
          aria-label="Galerie agrandie"
        >
          <button
            onClick={onClose}
            aria-label="Fermer"
            className="absolute right-5 top-5 z-10 rounded-full border border-or/30 p-2 text-creme transition hover:border-or hover:text-or"
          >
            <CloseIcon />
          </button>

          <NavButton
            side="left"
            onClick={(e) => {
              e.stopPropagation();
              onNavigate((index - 1 + items.length) % items.length);
            }}
          />
          <NavButton
            side="right"
            onClick={(e) => {
              e.stopPropagation();
              onNavigate((index + 1) % items.length);
            }}
          />

          <motion.div
            key={items[index].id}
            className="w-full max-w-3xl"
            initial={{ scale: 0.96, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.96, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            onClick={(e) => e.stopPropagation()}
          >
            <MediaFrame
              src={items[index].src}
              alt={items[index].alt}
              file={items[index].file}
              type={items[index].type}
              arch
              className="aspect-[4/3] w-full"
              sizes="(max-width: 768px) 100vw, 768px"
            />
            <p className="mt-4 text-center font-display text-xl text-creme/90">
              {items[index].alt}
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function NavButton({
  side,
  onClick,
}: {
  side: "left" | "right";
  onClick: (e: React.MouseEvent) => void;
}) {
  return (
    <button
      onClick={onClick}
      aria-label={side === "left" ? "Précédent" : "Suivant"}
      className={`absolute top-1/2 z-10 -translate-y-1/2 rounded-full border border-or/30 p-3 text-creme transition hover:border-or hover:text-or ${
        side === "left" ? "left-4" : "right-4"
      }`}
    >
      <ArrowIcon className={side === "left" ? "rotate-180" : ""} />
    </button>
  );
}
