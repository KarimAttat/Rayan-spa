"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import {
  motion,
  useScroll,
  useTransform,
  type MotionValue,
} from "framer-motion";
import Lightbox from "./ui/Lightbox";
import { gallery } from "@/data/gallery";
import { useI18n } from "@/lib/i18n";
import { useStill } from "@/lib/use-still";

/**
 * Les lieux : la section se fixe et le défilement vertical fait glisser
 * de côté une rangée de grandes photos du spa. Chaque photo pivote en 3D
 * selon sa place (elle fait face au visiteur au centre de l'écran).
 * Uniquement des photos du spa. Un clic ouvre la photo en grand.
 * Avec prefers-reduced-motion : simple rangée qui défile au doigt.
 */
export default function Gallery() {
  const { x } = useI18n();
  const reduce = useStill();
  const [index, setIndex] = useState<number | null>(null);
  const ref = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLUListElement>(null);
  const [distance, setDistance] = useState(0);
  // Pour chaque photo : à quelle progression elle passe au centre de l'écran.
  const [centers, setCenters] = useState<{ c: number; w: number }[]>([]);

  const items = gallery.map((g, i) => ({ ...g, alt: x.places.alts[i] ?? "" }));

  // Distance à parcourir = largeur de la rangée moins la largeur de l'écran.
  useEffect(() => {
    const measure = () => {
      const el = trackRef.current;
      if (!el) return;
      const d = Math.max(1, el.scrollWidth - window.innerWidth);
      setDistance(d);
      const cards = Array.from(el.children).slice(1) as HTMLElement[];
      setCenters(
        cards.map((li) => ({
          c: (li.offsetLeft + li.offsetWidth / 2 - window.innerWidth / 2) / d,
          w: (li.offsetWidth * 1.1) / d,
        }))
      );
    };
    measure();
    const ro = new ResizeObserver(measure);
    if (trackRef.current) ro.observe(trackRef.current);
    window.addEventListener("resize", measure);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, []);

  const { scrollYProgress: p } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const tx = useTransform(p, [0, 1], [0, -distance]);
  const pinned = !reduce;

  return (
    <section
      ref={ref}
      id="lieux"
      className="relative bg-surface"
      style={pinned ? { height: `calc(100svh + ${distance}px)` } : undefined}
    >
      <div className={pinned ? "sticky top-0 flex h-[100svh] flex-col justify-center overflow-hidden" : "py-section"}>
        <motion.ul
          ref={trackRef}
          className={[
            "flex items-center gap-[6vw] px-margin",
            pinned ? "w-max" : "hide-scrollbar snap-x overflow-x-auto",
          ].join(" ")}
          style={pinned ? { x: tx, perspective: "1400px" } : { perspective: "1400px" }}
        >
          <li className="flex w-[78vw] shrink-0 flex-col justify-end self-stretch pb-[6svh] md:w-[34vw]">
            <h2 className="text-[clamp(3.5rem,2rem+7vw,9rem)] leading-[0.9]">{x.places.title}</h2>
            <p className="mt-6 text-lead text-muted">
              {items.length} photos · Dar El Bacha, 45 Derb Toudgha
            </p>
          </li>

          {items.map((item, i) => (
            <Card
              key={item.id}
              item={item}
              i={i}
              at={centers[i] ?? { c: (i + 0.5) / items.length, w: 1.6 / items.length }}
              p={p}
              pinned={pinned}
              onOpen={() => setIndex(i)}
            />
          ))}
        </motion.ul>
      </div>

      <Lightbox items={items} index={index} onClose={() => setIndex(null)} onNavigate={setIndex} />
    </section>
  );
}

function Card({
  item,
  i,
  at,
  p,
  pinned,
  onOpen,
}: {
  item: (typeof gallery)[number] & { alt: string };
  i: number;
  at: { c: number; w: number };
  p: MotionValue<number>;
  pinned: boolean;
  onOpen: () => void;
}) {
  const { c, w } = at;
  const rotateY = useTransform(p, [c - w, c, c + w], pinned ? [-16, 0, 16] : [0, 0, 0]);
  const scale = useTransform(p, [c - w, c, c + w], pinned ? [0.88, 1, 0.88] : [1, 1, 1]);
  // Les photos alternent haut / bas : une rangée qui ne s'aligne pas.
  const offset = i % 2 === 0 ? "md:-translate-y-[5svh]" : "md:translate-y-[5svh]";

  return (
    <motion.li
      className={`relative shrink-0 snap-center ${offset}`}
      style={pinned ? { rotateY, scale } : undefined}
    >
      <button
        type="button"
        onClick={onOpen}
        aria-label={item.alt}
        className="frame group relative block h-[62svh] w-[46.5svh] overflow-hidden md:h-[72svh] md:w-[54svh]"
      >
        <Image
          src={item.src}
          alt={item.alt}
          fill
          sizes="(max-width: 768px) 70vw, 40vw"
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          style={{ objectPosition: item.focus }}
        />
      </button>
      <p className="mt-4 max-w-[54svh] text-small text-muted">{item.alt}</p>
    </motion.li>
  );
}
