/** Separatore decorativo: filo d'oro + stella zellige centrale. */
export default function ZelligeDivider({ className = "" }: { className?: string }) {
  return (
    <div
      aria-hidden
      className={`flex items-center justify-center gap-5 ${className}`}
    >
      <span className="hairline w-16 sm:w-28" />
      <svg width="26" height="26" viewBox="0 0 26 26" className="text-or">
        <g
          transform="translate(13 13)"
          fill="none"
          stroke="currentColor"
          strokeWidth="1"
        >
          <polygon points="0,-11 3.2,-3.2 11,0 3.2,3.2 0,11 -3.2,3.2 -11,0 -3.2,-3.2" />
          <rect x="-6.2" y="-6.2" width="12.4" height="12.4" />
          <rect
            x="-6.2"
            y="-6.2"
            width="12.4"
            height="12.4"
            transform="rotate(45)"
          />
        </g>
      </svg>
      <span className="hairline w-16 sm:w-28" />
    </div>
  );
}
