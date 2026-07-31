"use client";

import { useEffect } from "react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-noir px-6 text-center">
      <h1 className="font-display text-3xl text-creme">
        Une erreur est survenue
      </h1>
      <p className="max-w-sm text-sm font-light text-creme/70">
        Désolé, quelque chose s’est mal passé. Merci de réessayer.
      </p>
      <button
        onClick={reset}
        className="btn btn-gold mt-2"
      >
        Réessayer
      </button>
    </div>
  );
}
