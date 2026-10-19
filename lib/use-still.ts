"use client";

import { useEffect, useState } from "react";
import { useReducedMotion } from "framer-motion";

/**
 * « Mouvement réduit ? » — sûr pour l'hydratation.
 * Au premier rendu (serveur comme client) la réponse est toujours `false`,
 * pour que le HTML soit identique ; la vraie préférence est appliquée
 * juste après le montage.
 */
export function useStill(): boolean {
  const reduce = useReducedMotion();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  return mounted && !!reduce;
}
