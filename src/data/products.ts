import prodWater from "@/assets/prod-water.jpg";
import prodAir from "@/assets/prod-air.jpg";
import type { CategorySlug } from "./categories";
import type { Lang } from "@/i18n/translations";

export interface SpecRow {
  parameter: string;
  qualifier?: string;
  value: string;
  unit?: string;
  method?: string;
}

export interface ProductI18n {
  name: string;
  shortDescription: string;
  longDescription: string;
  benefits: string[];
  applications: string[];
  sustainability: string;
  seoTitle: string;
  seoDescription: string;
}

export interface Product {
  slug: string;
  code: string;
  category: CategorySlug;
  application: "water-purification" | "air-purification";
  origin: string;
  format: string;
  featured: boolean;
  image: string;
  specs: SpecRow[];
  hasTechnicalSheet: boolean;
  packaging: string[];
  i18n: Record<Lang, ProductI18n>;
}

export const products: Product[] = [
  {
    slug: "coconut-shell-activated-carbon-water-purification",
    code: "CG-AC-001",
    category: "activated-carbon",
    application: "water-purification",
    origin: "Sri Lanka",
    format: "12 × 30 mesh",
    featured: true,
    image: prodWater,
    hasTechnicalSheet: true,
    packaging: [
      "Big Bags: por confirmar",
      "Sacos de 25 kg: por confirmar",
      "Embalaje personalizado: consultar disponibilidad",
    ],
    specs: [
      { parameter: "Iodine Number", qualifier: "min.", value: "1100", unit: "mg/g", method: "ASTM D4607" },
      { parameter: "CTC Adsorption", qualifier: "min.", value: "55", unit: "% w/w", method: "ASTM D3467" },
      { parameter: "Apparent Density, dry", qualifier: "min.", value: "0.48", unit: "g/cc", method: "ASTM D2854" },
      { parameter: "Moisture as packed", qualifier: "max.", value: "5", unit: "%", method: "ASTM D2867" },
      { parameter: "Total Ash", qualifier: "max.", value: "3", unit: "%", method: "ASTM D2866" },
      { parameter: "Extractable pH", value: "9 – 11", method: "ASTM D3838" },
      { parameter: "Hardness Number", qualifier: "min.", value: "98", unit: "%", method: "ASTM D3802" },
      { parameter: "Particle Size", value: "12 × 30 ASTM mesh" },
      { parameter: "> 12 mesh (1.700 mm)", qualifier: "max.", value: "5", unit: "%", method: "ASTM D2862" },
      { parameter: "12 × 30 mesh (1.700 × 0.600 mm)", qualifier: "min.", value: "90", unit: "%", method: "ASTM D2862" },
      { parameter: "< 30 mesh (0.600 mm)", qualifier: "max.", value: "5", unit: "%", method: "ASTM D2862" },
    ],
    i18n: {
      es: {
        name: "Carbón activo de cáscara de coco — Purificación de agua",
        shortDescription:
          "Carbón activo granular de cáscara de coco de alta dureza y elevado número de yodo, indicado para tratamiento de agua potable, industrial y residual.",
        longDescription:
          "Producto seleccionado para aplicaciones exigentes de purificación de agua. Fabricado a partir de cáscara de coco por activación por vapor, ofrece una alta capacidad de adsorción, baja generación de finos y buen rendimiento en columnas de lecho fijo.",
        benefits: [
          "Alto número de yodo (mín. 1100 mg/g)",
          "Elevada dureza para columnas de lecho fijo",
          "Bajo contenido en cenizas y humedad",
          "Granulometría 12 × 30 mesh consistente",
        ],
        applications: [
          "Agua potable",
          "Agua industrial",
          "Aguas residuales",
          "Industria alimentaria",
          "Industria química",
        ],
        sustainability:
          "Materia prima de origen natural renovable (cáscara de coco), subproducto de la industria del coco en Sri Lanka.",
        seoTitle: "Carbón activo de cáscara de coco para agua | CEYLGEN CG-AC-001",
        seoDescription:
          "Carbón activo granular 12×30 mesh, mín. 1100 mg/g de yodo, para tratamiento de agua potable, industrial y residual. Origen Sri Lanka.",
      },
      en: {
        name: "Coconut Shell Activated Carbon — Water Purification",
        shortDescription:
          "Granular coconut shell activated carbon with high hardness and iodine number, suited for drinking, industrial and wastewater treatment.",
        longDescription:
          "Selected for demanding water purification applications. Produced from coconut shell by steam activation, offering high adsorption capacity, low fines generation and reliable performance in fixed-bed columns.",
        benefits: [
          "High iodine number (min. 1100 mg/g)",
          "High hardness for fixed-bed columns",
          "Low ash and moisture content",
          "Consistent 12 × 30 mesh granulometry",
        ],
        applications: [
          "Drinking water",
          "Industrial water",
          "Wastewater",
          "Food industry",
          "Chemical industry",
        ],
        sustainability:
          "Raw material from a natural renewable source (coconut shell), by-product of Sri Lanka's coconut industry.",
        seoTitle: "Coconut Shell Activated Carbon for Water | CEYLGEN CG-AC-001",
        seoDescription:
          "Granular activated carbon 12×30 mesh, min. 1100 mg/g iodine, for drinking, industrial and wastewater treatment. Sri Lanka origin.",
      },
      fr: {
        name: "Charbon actif de coque de coco — Purification de l'eau",
        shortDescription:
          "Charbon actif granulé de coque de coco, haute dureté et indice d'iode élevé, adapté au traitement des eaux potable, industrielle et usée.",
        longDescription:
          "Sélectionné pour des applications exigeantes de purification de l'eau. Fabriqué à partir de coque de coco par activation à la vapeur, il offre une forte capacité d'adsorption, une faible génération de fines et de bonnes performances en colonnes à lit fixe.",
        benefits: [
          "Indice d'iode élevé (min. 1100 mg/g)",
          "Haute dureté pour colonnes à lit fixe",
          "Faible teneur en cendres et humidité",
          "Granulométrie 12 × 30 mesh constante",
        ],
        applications: [
          "Eau potable",
          "Eau industrielle",
          "Eaux usées",
          "Industrie alimentaire",
          "Industrie chimique",
        ],
        sustainability:
          "Matière première d'origine naturelle renouvelable (coque de coco), sous-produit de l'industrie du coco au Sri Lanka.",
        seoTitle: "Charbon actif de coque de coco pour l'eau | CEYLGEN CG-AC-001",
        seoDescription:
          "Charbon actif granulé 12×30 mesh, min. 1100 mg/g d'iode, pour eau potable, industrielle et eaux usées. Origine Sri Lanka.",
      },
    },
  },

  {
    slug: "coconut-shell-activated-carbon-air-purification",
    code: "CG-AC-002",
    category: "activated-carbon",
    application: "air-purification",
    origin: "Sri Lanka",
    format: "4 × 8 mesh",
    featured: true,
    image: prodAir,
    hasTechnicalSheet: true,
    packaging: [
      "Big Bags: por confirmar",
      "Sacos de 25 kg: por confirmar",
      "Embalaje personalizado: consultar disponibilidad",
    ],
    specs: [
      { parameter: "Iodine Number", qualifier: "min.", value: "1150", unit: "mg/g", method: "ASTM D4607" },
      { parameter: "Apparent Density, dry", qualifier: "min.", value: "0.45", unit: "g/cc", method: "ASTM D2854" },
      { parameter: "Moisture as packed", qualifier: "max.", value: "5", unit: "%", method: "ASTM D2867" },
      { parameter: "Ash", qualifier: "max.", value: "3", unit: "%", method: "ASTM D2866" },
      { parameter: "Extractable pH", value: "9 – 11", method: "ASTM D3838" },
      { parameter: "Hardness Number", qualifier: "min.", value: "98", unit: "%", method: "ASTM D3802" },
      { parameter: "Particle Size", value: "4 × 8 mesh" },
      { parameter: "> 4 mesh (4.75 mm)", qualifier: "max.", value: "5", unit: "%", method: "ASTM D2862" },
      { parameter: "4 × 8 mesh (4.75 × 2.36 mm)", qualifier: "min.", value: "90", unit: "%", method: "ASTM D2862" },
      { parameter: "< 8 mesh (2.36 mm)", qualifier: "max.", value: "5", unit: "%", method: "ASTM D2862" },
    ],
    i18n: {
      es: {
        name: "Carbón activo de cáscara de coco — Purificación de aire",
        shortDescription:
          "Carbón activo granular 4 × 8 mesh de cáscara de coco para filtración de aire interior, sistemas HVAC y control de emisiones.",
        longDescription:
          "Carbón activo diseñado para aplicaciones de purificación de aire. Alta dureza y bajo contenido de finos para minimizar la caída de presión en filtros y prolongar la vida útil del lecho.",
        benefits: [
          "Iodine Number mín. 1150 mg/g (ASTM D4607)",
          "Alta dureza y baja generación de finos",
          "Baja humedad al envasar",
          "Granulometría 4 × 8 mesh estable",
        ],
        applications: [
          "Filtración de aire interior",
          "Sistemas HVAC",
          "Control de emisiones industriales",
          "Purificadores de aire",
          "Respiradores",
          "Aire de cabina de vehículos",
        ],
        sustainability:
          "Materia prima renovable procedente de cáscara de coco, subproducto de la industria del coco en Sri Lanka.",
        seoTitle: "Carbón activo de cáscara de coco para aire | CEYLGEN CG-AC-002",
        seoDescription:
          "Carbón activo granular 4×8 mesh, mín. 1150 mg/g de yodo, para HVAC, purificación de aire y control de emisiones.",
      },
      en: {
        name: "Coconut Shell Activated Carbon — Air Purification",
        shortDescription:
          "Granular 4 × 8 mesh coconut shell activated carbon for indoor air filtration, HVAC systems and emissions control.",
        longDescription:
          "Activated carbon engineered for air purification applications. High hardness and low fines to minimise pressure drop in filters and extend bed life.",
        benefits: [
          "Iodine number min. 1150 mg/g (ASTM D4607)",
          "High hardness, low fines generation",
          "Low moisture as packed",
          "Stable 4 × 8 mesh granulometry",
        ],
        applications: [
          "Indoor air filtration",
          "HVAC systems",
          "Industrial emissions control",
          "Air purifiers",
          "Respirators",
          "Vehicle cabin air",
        ],
        sustainability:
          "Renewable raw material from coconut shell, by-product of Sri Lanka's coconut industry.",
        seoTitle: "Coconut Shell Activated Carbon for Air | CEYLGEN CG-AC-002",
        seoDescription:
          "Granular activated carbon 4×8 mesh, min. 1150 mg/g iodine, for HVAC, air purification and emissions control.",
      },
      fr: {
        name: "Charbon actif de coque de coco — Purification de l'air",
        shortDescription:
          "Charbon actif granulé 4 × 8 mesh en coque de coco pour la filtration de l'air intérieur, les systèmes CVC et le contrôle des émissions.",
        longDescription:
          "Charbon actif conçu pour les applications de purification de l'air. Haute dureté et faible teneur en fines pour minimiser la perte de charge dans les filtres et prolonger la durée de vie du lit.",
        benefits: [
          "Indice d'iode min. 1150 mg/g (ASTM D4607)",
          "Haute dureté, faible génération de fines",
          "Faible humidité au conditionnement",
          "Granulométrie 4 × 8 mesh stable",
        ],
        applications: [
          "Filtration de l'air intérieur",
          "Systèmes CVC",
          "Contrôle des émissions industrielles",
          "Purificateurs d'air",
          "Respirateurs",
          "Air de cabine de véhicules",
        ],
        sustainability:
          "Matière première renouvelable issue de la coque de coco, sous-produit de l'industrie du coco au Sri Lanka.",
        seoTitle: "Charbon actif de coque de coco pour l'air | CEYLGEN CG-AC-002",
        seoDescription:
          "Charbon actif granulé 4×8 mesh, min. 1150 mg/g d'iode, pour CVC, purification de l'air et contrôle des émissions.",
      },
    },
  },
];

export function getProduct(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function productsByCategory(category: CategorySlug): Product[] {
  return products.filter((p) => p.category === category);
}
