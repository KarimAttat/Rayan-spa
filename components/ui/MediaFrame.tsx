import Image from "next/image";

type MediaFrameProps = {
  /** Percorso del media. Se "" mostra un placeholder elegante. */
  src?: string;
  alt: string;
  /** Nome file consigliato (mostrato nel placeholder). */
  file?: string;
  /** Tipo di media. */
  type?: "image" | "video";
  width?: number;
  height?: number;
  /** Forma ad arco moresco (default true). */
  arch?: boolean;
  /** Carica con priorità (per l'hero). */
  priority?: boolean;
  /** Classe per il rapporto d'aspetto, es. "aspect-[3/4]". */
  className?: string;
  sizes?: string;
};

/**
 * Slot media riutilizzabile.
 *  - Se "src" è valorizzato → usa next/image (o <video>).
 *  - Altrimenti → mostra un placeholder elegante che DOCUMENTA
 *    il nome file e le dimensioni consigliate.
 *
 * 👉 Per inserire un media reale: copia il file in /public/...
 *    e incolla il percorso in "src" (nei file dentro /data).
 */
export default function MediaFrame({
  src,
  alt,
  file,
  type = "image",
  width = 1000,
  height = 1200,
  arch = true,
  priority = false,
  className = "aspect-[4/5]",
  sizes = "(max-width: 768px) 100vw, 50vw",
}: MediaFrameProps) {
  const shape = arch ? "arch" : "rounded-2xl";

  // --- Media reale presente ---
  if (src) {
    return (
      <div className={`relative ${className} ${shape} ring-riad bg-ombre`}>
        {type === "video" ? (
          <video
            className="absolute inset-0 h-full w-full object-cover"
            src={src}
            autoPlay
            muted
            loop
            playsInline
            aria-label={alt}
          />
        ) : (
          <Image
            src={src}
            alt={alt}
            fill
            priority={priority}
            sizes={sizes}
            className="object-cover"
          />
        )}
      </div>
    );
  }

  // --- Placeholder elegante (nessun media ancora) ---
  return (
    <div
      role="img"
      aria-label={`Emplacement média : ${alt}`}
      className={`group relative ${className} ${shape} ring-riad overflow-hidden bg-gradient-to-br from-ombre to-nuit`}
    >
      <div className="zellige-texture absolute inset-0 opacity-30" />
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 p-6 text-center">
        <ImagePlaceholderIcon className="text-or/70" />
        <p className="font-display text-xl text-creme/90">{alt}</p>
        {file && (
          <code className="mt-1 rounded-full bg-noir/50 px-3 py-1 text-[0.68rem] tracking-wide text-or/80">
            /public/{file}
          </code>
        )}
        <span className="text-[0.66rem] uppercase tracking-eyebrow text-sable/50">
          {width} × {height}px
        </span>
      </div>
      {/* angoli decorativi oro */}
      <Corner className="left-3 top-12 rotate-0" />
      <Corner className="right-3 top-12 rotate-90" />
    </div>
  );
}

function Corner({ className }: { className: string }) {
  return (
    <span
      aria-hidden
      className={`pointer-events-none absolute h-5 w-5 border-l border-t border-or/30 ${className}`}
    />
  );
}

function ImagePlaceholderIcon({ className }: { className?: string }) {
  return (
    <svg
      width="34"
      height="34"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.3"
      className={className}
      aria-hidden
    >
      <rect x="3" y="4" width="18" height="16" rx="2" />
      <circle cx="8.5" cy="9.5" r="1.5" />
      <path d="m3 17 5-5 4 4 3-3 6 6" />
    </svg>
  );
}
