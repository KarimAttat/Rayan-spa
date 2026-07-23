"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Section, { SectionHeader } from "./ui/Section";
import Reveal from "./ui/Reveal";
import Lightbox from "./ui/Lightbox";
import { gallery, type GalleryItem } from "@/data/gallery";
import { useI18n } from "@/lib/i18n";
import { ArrowIcon, PlayIcon } from "@/components/icons";

export default function Gallery() {
  const { t } = useI18n();
  const [index, setIndex] = useState<number | null>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);
  const drag = useRef<{ startX: number; startScroll: number; moved: boolean } | null>(null);

  // Légendes localisées (les médias/tailles restent dans data/gallery.ts).
  const items = gallery.map((item, i) => ({
    ...item,
    alt: t.gallery.alts[i] ?? item.alt,
  }));

  const updateProgress = () => {
    const el = trackRef.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    setProgress(max > 0 ? el.scrollLeft / max : 0);
  };

  useEffect(() => {
    updateProgress();
    window.addEventListener("resize", updateProgress);
    return () => window.removeEventListener("resize", updateProgress);
  }, []);

  function scrollByViewport(dir: 1 | -1) {
    trackRef.current?.scrollBy({
      left: dir * trackRef.current.clientWidth * 0.85,
      behavior: "smooth",
    });
  }

  // Drag-to-scroll à la souris uniquement : au tactile, le scroll natif
  // (avec son momentum) est déjà optimal et ne doit pas être intercepté.
  function onPointerDown(e: React.PointerEvent) {
    const el = trackRef.current;
    if (!el || e.pointerType !== "mouse") return;
    drag.current = { startX: e.clientX, startScroll: el.scrollLeft, moved: false };
    el.setPointerCapture(e.pointerId);
  }
  function onPointerMove(e: React.PointerEvent) {
    if (!drag.current || !trackRef.current || e.pointerType !== "mouse") return;
    const dx = e.clientX - drag.current.startX;
    if (Math.abs(dx) > 4) drag.current.moved = true;
    trackRef.current.scrollLeft = drag.current.startScroll - dx;
  }
  function onPointerUp(e: React.PointerEvent) {
    if (e.pointerType !== "mouse" || !drag.current) return;
    trackRef.current?.releasePointerCapture(e.pointerId);
    // Laisse un instant à onClick pour lire "moved" avant de le réinitialiser.
    setTimeout(() => (drag.current = null), 0);
  }

  return (
    <Section id="galerie" className="bg-nuit">
      <SectionHeader
        eyebrow={t.gallery.eyebrow}
        title={t.gallery.title}
        intro={t.gallery.intro}
      />

      <div className="mt-14">
        <div
          ref={trackRef}
          onScroll={updateProgress}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onPointerLeave={onPointerUp}
          className="hide-scrollbar flex cursor-grab snap-x snap-mandatory gap-5 overflow-x-auto pb-2 active:cursor-grabbing"
        >
          {items.map((item, i) => (
            <Reveal
              key={item.id}
              delay={i * 0.07}
              y={22}
              className={[
                "h-[380px] shrink-0 snap-center sm:h-[440px] md:h-[480px]",
                item.size === "lg"
                  ? "w-[82vw] sm:w-[430px] md:w-[490px]"
                  : "w-[72vw] sm:w-[300px] md:w-[330px]",
              ].join(" ")}
            >
              <GalleryCard
                item={item}
                onOpen={() => {
                  if (!drag.current?.moved) setIndex(i);
                }}
                enlargeLabel={t.gallery.enlarge}
                comingSoonLabel={t.gallery.comingSoon}
              />
            </Reveal>
          ))}
        </div>

        {/* Contrôles : flèches + barre de progression (reflète le scroll réel) */}
        <div className="mt-8 flex items-center gap-5">
          <NavButton dir={-1} onClick={() => scrollByViewport(-1)} />
          <div className="relative h-px flex-1 overflow-hidden rounded-full bg-creme/15">
            <span
              className="absolute inset-y-0 left-0 rounded-full bg-or transition-[width] duration-150 ease-out"
              style={{ width: `${Math.max(6, progress * 100)}%` }}
            />
          </div>
          <NavButton dir={1} onClick={() => scrollByViewport(1)} />
        </div>
      </div>

      <Lightbox
        items={items}
        index={index}
        onClose={() => setIndex(null)}
        onNavigate={setIndex}
      />
    </Section>
  );
}

/* ---------- Carte du filmstrip ---------- */

function GalleryCard({
  item,
  onOpen,
  enlargeLabel,
  comingSoonLabel,
}: {
  item: GalleryItem & { alt: string };
  onOpen: () => void;
  enlargeLabel: string;
  comingSoonLabel: string;
}) {
  const isPendingVideo = item.type === "video" && !item.src;

  if (isPendingVideo) {
    return (
      <div className="relative flex h-full w-full select-none flex-col items-center justify-center overflow-hidden rounded-2xl bg-gradient-to-br from-ombre to-nuit ring-riad">
        <div className="zellige-texture absolute inset-0 opacity-[0.14]" />
        <div
          aria-hidden
          className="absolute left-1/2 top-1/2 h-56 w-56 -translate-x-1/2 -translate-y-1/2 rounded-full opacity-50 blur-[70px] animate-shimmer"
          style={{
            background: "radial-gradient(circle, rgba(181,80,46,0.4), transparent 70%)",
          }}
        />
        <span className="relative flex h-16 w-16 items-center justify-center rounded-full border border-or/40 text-or">
          <PlayIcon width={22} height={22} />
        </span>
        <span className="relative mt-5 rounded-full border border-or/25 px-3 py-1 text-[0.62rem] uppercase tracking-eyebrow text-or/80">
          {comingSoonLabel}
        </span>
        <p className="relative mt-4 max-w-[80%] text-center font-display text-lg leading-snug text-creme/85">
          {item.alt}
        </p>
      </div>
    );
  }

  return (
    <button
      type="button"
      onClick={onOpen}
      aria-label={`${enlargeLabel} : ${item.alt}`}
      className="group relative block h-full w-full overflow-hidden rounded-2xl text-left ring-riad"
    >
      <Image
        src={item.src}
        alt={item.alt}
        fill
        draggable={false}
        sizes="(max-width: 640px) 82vw, 490px"
        className="object-cover transition-transform duration-[900ms] ease-riad group-hover:scale-110"
      />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-creme/85 via-creme/10 to-transparent transition-opacity duration-500 group-hover:from-creme/90" />
      <span className="pointer-events-none absolute bottom-0 left-0 right-0 p-5 font-display text-lg leading-snug text-ivoire [text-shadow:0_2px_10px_rgba(32,15,12,0.6)]">
        {item.alt}
      </span>
      <span className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full border border-ivoire/30 text-ivoire opacity-0 backdrop-blur-sm transition-all duration-300 group-hover:opacity-100 group-hover:border-or group-hover:text-or">
        <ArrowIcon width={14} height={14} className="-rotate-45" />
      </span>
    </button>
  );
}

function NavButton({ dir, onClick }: { dir: 1 | -1; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={dir === -1 ? "Précédent" : "Suivant"}
      className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-or/25 text-or transition hover:border-or hover:bg-or/10"
    >
      <ArrowIcon width={16} height={16} className={dir === -1 ? "rotate-180" : ""} />
    </button>
  );
}
