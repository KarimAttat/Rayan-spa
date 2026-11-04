"use client";

import { useI18n } from "@/lib/i18n";
import { Pair } from "./ui/PhotoBands";

/**
 * Les deux portes juste après l'invitation : deux grandes photos côte à côte
 * qui mènent vers la suite de la page, le rituel et les lieux. (La carte et le
 * formulaire sont déjà passés plus haut.)
 */
export default function Doors() {
  const { x } = useI18n();
  return (
    <Pair
      a={{ src: "/images/massage-argan.jpg", label: x.ritual.title, href: "#rituel" }}
      b={{ src: "/images/massage-jambes.jpg", focus: "62% 50%", label: x.places.title, href: "#lieux" }}
    />
  );
}
