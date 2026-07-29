import type { Lang } from "@/i18n/translations";
import catCarbon from "@/assets/cat-carbon.jpg";
import catSpices from "@/assets/cat-spices.jpg";
import catFertilizers from "@/assets/cat-fertilizers.jpg";
import catMarine from "@/assets/cat-marine.jpg";

export type CategorySlug =
  | "activated-carbon"
  | "spices"
  | "fertilizers"
  | "marine-wood";

export interface Category {
  slug: CategorySlug;
  nameKey: string;
  descKey: string;
  accent: "ocean" | "copper" | "forest" | "teak";
  image: string;
  hasProducts: boolean;
}

export const categories: Category[] = [
  {
    slug: "activated-carbon",
    nameKey: "cat.activated_carbon",
    descKey: "cat.activated_carbon.desc",
    accent: "ocean",
    image: catCarbon,
    hasProducts: true,
  },
  {
    slug: "spices",
    nameKey: "cat.spices",
    descKey: "cat.spices.desc",
    accent: "copper",
    image: catSpices,
    hasProducts: false,
  },
  {
    slug: "fertilizers",
    nameKey: "cat.fertilizers",
    descKey: "cat.fertilizers.desc",
    accent: "forest",
    image: catFertilizers,
    hasProducts: false,
  },
  {
    slug: "marine-wood",
    nameKey: "cat.marine_wood",
    descKey: "cat.marine_wood.desc",
    accent: "teak",
    image: catMarine,
    hasProducts: false,
  },
];

export function getCategory(slug: string): Category | undefined {
  return categories.find((c) => c.slug === slug);
}

export const accentClasses: Record<Category["accent"], { text: string; bg: string; border: string; grad: string }> = {
  ocean: {
    text: "text-ocean",
    bg: "bg-ocean",
    border: "border-ocean",
    grad: "from-ocean via-ocean to-turquoise",
  },
  copper: {
    text: "text-copper",
    bg: "bg-copper",
    border: "border-copper",
    grad: "from-copper to-champagne",
  },
  forest: {
    text: "text-forest",
    bg: "bg-forest",
    border: "border-forest",
    grad: "from-forest to-forest",
  },
  teak: {
    text: "text-teak",
    bg: "bg-teak",
    border: "border-teak",
    grad: "from-teak to-champagne",
  },
};

// Category translations that stay in English brand-line names but have translated descriptions
export function categoryName(_lang: Lang, cat: Category): string {
  // Line names are brand terms; keep English across languages per brand spec
  return cat.slug === "activated-carbon"
    ? "Activated Carbon"
    : cat.slug === "spices"
      ? "Spices"
      : cat.slug === "fertilizers"
        ? "Fertilizers"
        : "Marine Wood";
}
