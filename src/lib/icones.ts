import {
  Briefcase,
  ConciergeBell,
  Coffee,
  Dumbbell,
  Flame,
  Sunset,
  UtensilsCrossed,
  Waves,
  type LucideIcon,
} from "lucide-react";
import type { NomeIcone } from "@/data/predios";

/**
 * Mapa fixo de ícones. Os dados dos prédios guardam só o nome, para continuarem
 * sendo dados puros — e este arquivo é o único lugar que conhece o lucide.
 */
export const ICONES: Record<NomeIcone, LucideIcon> = {
  coffee: Coffee,
  sunset: Sunset,
  utensils: UtensilsCrossed,
  waves: Waves,
  dumbbell: Dumbbell,
  flame: Flame,
  concierge: ConciergeBell,
  briefcase: Briefcase,
};
