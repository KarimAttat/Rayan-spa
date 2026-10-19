"use client";

import { useEffect, useRef, useState } from "react";
import {
  motion,
  useMotionValueEvent,
  useScroll,
  useTransform,
} from "framer-motion";
import { siteConfig } from "@/data/site-config";
import { useI18n } from "@/lib/i18n";
import OpenStatus from "@/components/ui/OpenStatus";
import { useStill } from "@/lib/use-still";

/**
 * Le nom comme fenêtre : « RAYAN SPA » en très grand, et le hammam vu à
 * travers les lettres. Au défilement, le nom grandit jusqu'à ce qu'on
 * entre dans l'épaisseur d'une lettre : l'écran se remplit de la photo,
 * puis un texte se pose dessus.
 *
 * Technique : la photo reste fixe et nette en plein écran ; seul le masque
 * (le texte, vectoriel) est agrandi — d'où aucune perte de netteté, même
 * à ×150. Le point d'entrée est le trait le plus épais près du centre,
 * trouvé en dessinant le nom sur un canvas.
 *
 * Sans script ou avec prefers-reduced-motion : le nom reste fixe, la photo
 * à l'intérieur (CSS background-clip: text). // taste-skill-ignore: effet demandé
 */

type Layout = {
  w: number;
  h: number;
  family: string;
  size: number;
  /** Lignes de texte : contenu + position de la ligne de base (centre en x). */
  lines: { text: string; x: number; y: number }[];
  /** Point d'entrée du zoom et échelle finale. */
  ox: number;
  oy: number;
  zoom: number;
};

/** Image optimisée par Next (WebP/AVIF), utilisable dans un <image> SVG. */
function optimized(src: string, w: number) {
  return `/_next/image?url=${encodeURIComponent(src)}&w=${w}&q=75`;
}

export default function Hero() {
  const { x } = useI18n();
  const reduce = useStill();
  const ref = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const groupRef = useRef<SVGGElement>(null);
  const [layout, setLayout] = useState<Layout | null>(null);
  const { heroImage } = siteConfig;

  // Mise en page du nom + recherche du point d'entrée, à chaque redimensionnement.
  useEffect(() => {
    let cancelled = false;
    const compute = async () => {
      const stage = stageRef.current;
      if (!stage) return;
      const w = stage.clientWidth;
      const h = stage.clientHeight;
      const family =
        getComputedStyle(document.documentElement).getPropertyValue("--font-boska").trim() || "Georgia, serif";
      // La police doit être chargée avant de mesurer.
      try {
        await document.fonts.load(`500 100px ${family}`);
      } catch {
        /* on mesure avec la police de secours */
      }
      if (cancelled) return;

      const canvas = document.createElement("canvas");
      canvas.width = w;
      canvas.height = h;
      const ctx = canvas.getContext("2d", { willReadFrequently: true });
      if (!ctx) return;

      const phone = w < 768;
      const texts = phone ? ["RAYAN", "SPA"] : ["RAYAN SPA"];
      ctx.font = `500 100px ${family}`;
      const widest = Math.max(...texts.map((t) => ctx.measureText(t).width));
      const m = ctx.measureText("RAYAN");
      const capH = (m.actualBoundingBoxAscent / 100) || 0.7;
      // Taille : le nom occupe ~90 % de la largeur (et pas plus de la moitié de la hauteur).
      const size = Math.min(((phone ? 0.88 : 0.9) * w * 100) / widest, (h * (phone ? 0.24 : 0.42)) / capH);
      const gap = size * 0.12;
      const blockH = texts.length * capH * size + (texts.length - 1) * gap;
      const top = h * (phone ? 0.42 : 0.48) - blockH / 2;
      const lines = texts.map((text, i) => ({
        text,
        x: w / 2,
        y: top + capH * size * (i + 1) + gap * i,
      }));

      // Dessin du nom pour trouver le trait le plus épais, près du centre.
      ctx.clearRect(0, 0, w, h);
      ctx.fillStyle = "#000";
      ctx.textAlign = "center";
      ctx.textBaseline = "alphabetic";
      ctx.font = `500 ${size}px ${family}`;
      lines.forEach((l) => ctx.fillText(l.text, l.x, l.y));
      const data = ctx.getImageData(0, 0, w, h).data;
      const inside = (i: number) => data[i * 4 + 3] > 128;

      // Distance de chaque pixel plein au bord de la lettre (chanfrein 3-4,
      // deux passes) : l'épaisseur réelle du trait, y compris en diagonale.
      const dt = new Uint16Array(w * h);
      const INF = 65000;
      for (let i = 0; i < w * h; i++) dt[i] = inside(i) ? INF : 0;
      for (let y = 1; y < h - 1; y++) {
        for (let xx = 1; xx < w - 1; xx++) {
          const i = y * w + xx;
          if (!dt[i]) continue;
          dt[i] = Math.min(dt[i], dt[i - 1] + 3, dt[i - w] + 3, dt[i - w - 1] + 4, dt[i - w + 1] + 4);
        }
      }
      for (let y = h - 2; y > 0; y--) {
        for (let xx = w - 2; xx > 0; xx--) {
          const i = y * w + xx;
          if (!dt[i]) continue;
          dt[i] = Math.min(dt[i], dt[i + 1] + 3, dt[i + w] + 3, dt[i + w + 1] + 4, dt[i + w - 1] + 4);
        }
      }
      let maxS = 0;
      for (let i = 0; i < w * h; i++) if (dt[i] < INF && dt[i] > maxS) maxS = dt[i];
      // Parmi les traits les plus épais, le point le plus proche du centre de l'écran.
      let best = { s: 1, x: w / 2, y: h / 2 };
      let bestD = Infinity;
      for (let y = 0; y < h; y += 2) {
        for (let xx = 0; xx < w; xx += 2) {
          const v = dt[y * w + xx];
          if (v < maxS * 0.85 || v >= INF) continue;
          const d = Math.hypot(xx - w / 2, y - h / 2);
          if (d < bestD) {
            bestD = d;
            best = { s: v / 3, x: xx, y };
          }
        }
      }
      // Échelle pour que le trait couvre tout l'écran, avec marge.
      const reach = Math.max(
        Math.hypot(best.x, best.y),
        Math.hypot(w - best.x, best.y),
        Math.hypot(best.x, h - best.y),
        Math.hypot(w - best.x, h - best.y)
      );
      const zoom = (reach / Math.max(1, best.s)) * 1.2;

      setLayout({ w, h, family, size, lines, ox: best.x, oy: best.y, zoom });
    };

    compute();
    const ro = new ResizeObserver(() => compute());
    if (stageRef.current) ro.observe(stageRef.current);
    return () => {
      cancelled = true;
      ro.disconnect();
    };
  }, []);

  const { scrollYProgress: p } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const still = !!reduce;

  // Le zoom suit une progression exponentielle : on « avance » à vitesse
  // constante dans le nom, au lieu d'un démarrage lent puis d'un saut.
  // Au-delà de ×40, Chrome ne dessine plus les glyphes géants dans un masque :
  // on plafonne, et la fin du passage est assurée par le remplissage du masque.
  const t = useTransform(p, [0.04, 0.62], [0, 1], { clamp: true });
  const scaleAt = (v: number, zoom: number) =>
    still ? 1 : Math.exp(Math.log(Math.min(zoom, 40)) * Math.pow(v, 1.15));
  const fill = useTransform(p, [0.42, 0.6], [0, still ? 0 : 1]);
  useMotionValueEvent(t, "change", (v) => {
    const g = groupRef.current;
    if (!g || !layout) return;
    const s = scaleAt(v, layout.zoom);
    g.setAttribute(
      "transform",
      `translate(${layout.ox} ${layout.oy}) scale(${s}) translate(${-layout.ox} ${-layout.oy})`
    );
  });
  // Recalage du masque quand la mise en page change.
  useEffect(() => {
    const g = groupRef.current;
    if (!g || !layout) return;
    const v = t.get();
    const s = scaleAt(v, layout.zoom);
    g.setAttribute(
      "transform",
      `translate(${layout.ox} ${layout.oy}) scale(${s}) translate(${-layout.ox} ${-layout.oy})`
    );
  }, [layout, still, t]); // eslint-disable-line react-hooks/exhaustive-deps

  const photoScale = useTransform(p, [0, 0.62, 1], [1.12, 1.02, 1]);
  const chrome = useTransform(p, [0, 0.08], [1, still ? 1 : 0]);
  const scrim = useTransform(p, [0.55, 0.72], [0, still ? 0 : 1]);
  const tx = useTransform(p, [0.62, 0.85], ["-8vw", "0vw"]);
  const to = useTransform(p, [0.62, 0.8], [0, still ? 0 : 1]);

  const svgReady = !!layout && !still;
  const photo = optimized(heroImage.src, 1920);

  return (
    <section ref={ref} id="top" className="relative h-[100svh] bg-bg motion-safe:h-[260svh]">
      <div ref={stageRef} className="sticky top-0 h-[100svh] overflow-hidden">
        <h1 className="sr-only">Rayan SPA — {x.hero.h1Suffix}</h1>

        {/* Repli (sans script, mouvement réduit) : le nom, la photo dedans */}
        <p
          aria-hidden="true"
          className={[
            "hero-fallback display absolute inset-x-0 top-[42%] -translate-y-1/2 text-center leading-[0.82] tracking-[-0.02em] transition-opacity duration-300 md:top-[48%]",
            svgReady ? "opacity-0" : "opacity-100",
          ].join(" ")}
          style={{ backgroundImage: `url(${photo})` }}
        >
          <span className="block md:inline">RAYAN</span> <span className="block md:inline">SPA</span>
        </p>

        {/* Le nom comme masque : la photo n'apparaît qu'à travers les lettres */}
        {layout && (
          <motion.svg
            aria-hidden="true"
            className="absolute inset-0 h-full w-full"
            viewBox={`0 0 ${layout.w} ${layout.h}`}
            style={{ opacity: svgReady ? 1 : 0 }}
          >
            <defs>
              <mask id="hero-name" maskUnits="userSpaceOnUse" x="0" y="0" width={layout.w} height={layout.h}>
                <rect width={layout.w} height={layout.h} fill="black" />
                <motion.rect width={layout.w} height={layout.h} fill="white" style={{ opacity: fill }} />
                <g ref={groupRef}>
                  {layout.lines.map((l) => (
                    <text
                      key={l.text}
                      x={l.x}
                      y={l.y}
                      textAnchor="middle"
                      fill="white"
                      style={{ fontFamily: layout.family, fontWeight: 500, fontSize: layout.size }}
                    >
                      {l.text}
                    </text>
                  ))}
                </g>
              </mask>
            </defs>
            <g mask="url(#hero-name)">
              <motion.g style={{ scale: photoScale, originX: "50%", originY: "50%" }}>
                <image
                  href={photo}
                  x="0"
                  y="0"
                  width={layout.w}
                  height={layout.h}
                  preserveAspectRatio="xMidYMid slice"
                />
              </motion.g>
            </g>
          </motion.svg>
        )}

        {/* Une fois dans la photo : voile et texte. Toujours rendu (même HTML
            serveur / client), invisible en mouvement réduit. */}
        <motion.div
          className="pointer-events-none absolute inset-0"
          style={{ opacity: scrim }}
          aria-hidden="true"
        >
          <div
            className={"absolute inset-0 bg-[linear-gradient(90deg,rgba(20,12,9,0.8)_0%,rgba(20,12,9,0.4)_55%,rgba(20,12,9,0.05)_100%)]" /* taste-skill-ignore: voile neutre sur photo */}
          />
          <motion.div
            className="wrap absolute inset-x-0 bottom-[12svh] max-w-[46rem] text-night-ink"
            style={{ x: tx, opacity: to }}
          >
            <p className="display text-head">{x.hero.revealTitle}</p>
            <p className="mt-5 max-w-[34ch] text-lead">{x.hero.revealText}</p>
          </motion.div>
        </motion.div>

        {/* Bord inférieur : état d'ouverture, phrase, action */}
        <motion.div style={{ opacity: chrome }} className="absolute inset-x-0 bottom-0">
          <div className="fade-late wrap grid gap-5 pb-8 md:pb-10 lg:grid-cols-12 lg:items-end">
            <OpenStatus className="text-small text-muted lg:col-span-4" />
            <p className="max-w-[34ch] text-body lg:col-span-4 lg:col-start-6">{x.hero.line}</p>
            <div className="flex items-center gap-6 lg:col-span-3 lg:col-start-10 lg:justify-end">
              <a href="#reservation" className="button">
                {x.hero.cta}
              </a>
              <a href="#carte" className="link whitespace-nowrap text-body">
                {x.hero.menuLink}
              </a>
            </div>
          </div>
        </motion.div>
      </div>

      <style
        dangerouslySetInnerHTML={{
          __html: `
        /* Repli : la photo à l'intérieur des lettres, en CSS. */
        .hero-fallback {
          font-size: clamp(5.5rem, 26vw, 14rem);
          font-weight: 500;
          color: var(--ink);
          background-size: cover;
          background-position: center;
          -webkit-background-clip: text; /* taste-skill-ignore: photo dans le nom, demandée */
          background-clip: text; /* taste-skill-ignore: photo dans le nom, demandée */
          -webkit-text-fill-color: transparent;
        }
        @media (min-width: 768px) {
          .hero-fallback { font-size: 15.5vw; }
        }
        /* Le nom apparaît en douceur au chargement */
        @media (prefers-reduced-motion: no-preference) {
          .js #top svg { animation: hero-in 1200ms var(--ease-out) both; }
        }
        @keyframes hero-in {
          from { opacity: 0; transform: scale(0.96); }
          to { opacity: 1; transform: none; }
        }
      `,
        }}
      />
    </section>
  );
}
