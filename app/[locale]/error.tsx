"use client";

import { useEffect } from "react";

export default function LocaleError({
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
    <div className="flex min-h-[100svh] flex-col items-start justify-center gap-6 bg-bg px-margin">
      <h1 className="text-head">
        Une erreur est survenue
      </h1>
      <p className="max-w-[40ch] text-body">
        Désolé, quelque chose s’est mal passé. Merci de réessayer.
      </p>
      <button onClick={reset} className="button mt-2">
        Réessayer
      </button>
    </div>
  );
}
