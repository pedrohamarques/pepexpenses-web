import {
  Utensils,
  Car,
  Home,
  Zap,
  Clapperboard,
  Banknote,
  Briefcase,
  TrendingUp,
  HeartPulse,
  ShoppingBag,
  MoreHorizontal,
  type LucideIcon,
} from "lucide-react";

export const CATEGORY_ICON_MAP: Record<string, LucideIcon> = {
  Food: Utensils,
  Transport: Car,
  Housing: Home,
  Utilities: Zap,
  Entertainment: Clapperboard,
  Salary: Banknote,
  Freelance: Briefcase,
  Investment: TrendingUp,
  Health: HeartPulse,
  Shopping: ShoppingBag,
  Other: MoreHorizontal,
};
