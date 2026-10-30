"use client";

import { useI18n } from "@/lib/i18n";
import { goToBooking } from "@/lib/booking-bus";
import { Pair } from "./ui/PhotoBands";

/**
 * Les deux portes juste après l'invitation : deux grandes photos côte à côte,
 * l'une pour réserver un massage, l'autre pour descendre à la carte.
 */
export default function Doors() {
  const { x } = useI18n();
  return (
    <Pair
      a={{ src: "/images/massage-argan.jpg", label: x.invite.book, onClick: goToBooking }}
      b={{ src: "/images/massage-jambes.jpg", focus: "62% 50%", label: x.invite.menu, href: "#carte" }}
    />
  );
}
