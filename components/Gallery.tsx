"use client";

import { useState } from "react";
import Section, { SectionHeader } from "./ui/Section";
import Reveal from "./ui/Reveal";
import MediaFrame from "./ui/MediaFrame";
import Lightbox from "./ui/Lightbox";
import { gallery } from "@/data/gallery";
import { PlayIcon } from "@/components/icons";

export default function Gallery() {
  const [index, setIndex] = useState<number | null>(null);

  return (
    <Section id="galerie" className="bg-nuit">
      <SectionHeader
        eyebrow="Galerie"
        title="L’atmosphère Rayan"
        intro="Flânez à travers nos espaces : la lumière tamisée, le zellige et la quiétude d’un véritable riad marocain."
      />

      <div className="mt-16 grid auto-rows-[200px] grid-cols-2 gap-4 sm:auto-rows-[230px] md:grid-cols-3">
        {gallery.map((item, i) => (
          <Reveal
            key={item.id}
            delay={(i % 3) * 0.07}
            className={[
              item.span === "tall" ? "row-span-2" : "",
              item.span === "wide" ? "col-span-2" : "",
            ].join(" ")}
          >
            <button
              onClick={() => setIndex(i)}
              aria-label={`Agrandir : ${item.alt}`}
              className="group relative block h-full w-full overflow-hidden rounded-2xl ring-riad"
            >
              <MediaFrame
                src={item.src}
                file={item.file}
                alt={item.alt}
                type={item.type}
                arch={false}
                className="h-full w-full transition-transform duration-700 group-hover:scale-105"
                sizes="(max-width: 768px) 50vw, 33vw"
              />
              {/* overlay au survol */}
              <span className="absolute inset-0 flex items-center justify-center bg-noir/40 opacity-0 transition-opacity duration-400 group-hover:opacity-100">
                {item.type === "video" ? (
                  <span className="flex h-14 w-14 items-center justify-center rounded-full border border-or/60 text-or">
                    <PlayIcon width={22} height={22} />
                  </span>
                ) : (
                  <span className="font-display text-lg text-creme">
                    Agrandir
                  </span>
                )}
              </span>
            </button>
          </Reveal>
        ))}
      </div>

      <Lightbox
        items={gallery}
        index={index}
        onClose={() => setIndex(null)}
        onNavigate={setIndex}
      />
    </Section>
  );
}
