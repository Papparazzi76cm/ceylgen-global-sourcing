// Data-access layer. Reads from Lovable Cloud (Supabase) with graceful fallback
// to local seed data if the backend is unreachable or empty.
//
// Env vars used: VITE_SUPABASE_URL, VITE_SUPABASE_PUBLISHABLE_KEY
// (already wired in `.env` via Lovable Cloud). If they are missing OR the query
// fails, the local seed arrays in `src/data/*` are returned so the public site
// keeps rendering.

import { supabase } from "@/integrations/supabase/client";
import type { Lang } from "@/i18n/translations";
import { products as seedProducts, type Product, type SpecRow, type ProductI18n } from "@/data/products";
import { categories as seedCategories, type Category, type CategorySlug } from "@/data/categories";

const isConfigured = Boolean(
  import.meta.env.VITE_SUPABASE_URL && import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY,
);

/* ----------------------------- CATEGORIES ----------------------------- */
export async function fetchCategories(): Promise<Category[]> {
  if (!isConfigured) return seedCategories;
  try {
    const { data, error } = await supabase
      .from("categories")
      .select("slug, accent, image_url, has_products, sort_order, published")
      .eq("published", true)
      .order("sort_order");
    if (error || !data || data.length === 0) return seedCategories;
    // Map DB rows onto seed shape (image assets stay local until uploaded).
    return data.map((row) => {
      const seed = seedCategories.find((c) => c.slug === row.slug);
      return {
        slug: row.slug as CategorySlug,
        nameKey: seed?.nameKey ?? `cat.${row.slug}`,
        descKey: seed?.descKey ?? `cat.${row.slug}.desc`,
        accent: (row.accent ?? seed?.accent ?? "ocean") as Category["accent"],
        image: row.image_url ?? seed?.image ?? "",
        hasProducts: row.has_products ?? seed?.hasProducts ?? false,
      };
    });
  } catch {
    return seedCategories;
  }
}

/* ------------------------------- PRODUCTS ----------------------------- */
type DbProductRow = {
  id: string;
  slug: string;
  code: string;
  category_slug: string;
  application: string | null;
  origin: string | null;
  format: string | null;
  image_url: string | null;
  featured: boolean;
  packaging: string[];
  has_technical_sheet: boolean;
  product_specs: {
    parameter: string; qualifier: string | null; value: string;
    unit: string | null; method: string | null; sort_order: number;
  }[];
  product_translations: {
    lang: string; name: string; short_description: string | null;
    long_description: string | null; benefits: string[]; applications: string[];
    sustainability: string | null; seo_title: string | null; seo_description: string | null;
  }[];
};

function mapProduct(row: DbProductRow): Product {
  const seed = seedProducts.find((p) => p.slug === row.slug);
  const i18n: Record<Lang, ProductI18n> = { es: emptyI18n(), en: emptyI18n(), fr: emptyI18n() };
  for (const tr of row.product_translations) {
    if (tr.lang !== "es" && tr.lang !== "en" && tr.lang !== "fr") continue;
    i18n[tr.lang as Lang] = {
      name: tr.name,
      shortDescription: tr.short_description ?? "",
      longDescription: tr.long_description ?? "",
      benefits: tr.benefits ?? [],
      applications: tr.applications ?? [],
      sustainability: tr.sustainability ?? "",
      seoTitle: tr.seo_title ?? tr.name,
      seoDescription: tr.seo_description ?? tr.short_description ?? "",
    };
  }
  // Fill missing langs with ES then seed
  for (const l of ["es", "en", "fr"] as Lang[]) {
    if (!i18n[l].name) i18n[l] = seed?.i18n[l] ?? i18n.es;
  }
  const specs: SpecRow[] = [...row.product_specs]
    .sort((a, b) => a.sort_order - b.sort_order)
    .map((s) => ({
      parameter: s.parameter,
      qualifier: s.qualifier ?? undefined,
      value: s.value,
      unit: s.unit ?? undefined,
      method: s.method ?? undefined,
    }));
  return {
    slug: row.slug,
    code: row.code,
    category: row.category_slug as CategorySlug,
    application: (row.application ?? seed?.application ?? "water-purification") as Product["application"],
    origin: row.origin ?? seed?.origin ?? "Sri Lanka",
    format: row.format ?? seed?.format ?? "",
    featured: row.featured,
    image: row.image_url ?? seed?.image ?? "",
    specs: specs.length ? specs : (seed?.specs ?? []),
    hasTechnicalSheet: row.has_technical_sheet,
    packaging: row.packaging?.length ? row.packaging : (seed?.packaging ?? []),
    i18n,
  };
}

function emptyI18n(): ProductI18n {
  return {
    name: "", shortDescription: "", longDescription: "",
    benefits: [], applications: [], sustainability: "",
    seoTitle: "", seoDescription: "",
  };
}

export async function fetchProducts(): Promise<Product[]> {
  if (!isConfigured) return seedProducts;
  try {
    const { data, error } = await supabase
      .from("products")
      .select(`
        id, slug, code, category_slug, application, origin, format,
        image_url, featured, packaging, has_technical_sheet,
        product_specs (parameter, qualifier, value, unit, method, sort_order),
        product_translations (lang, name, short_description, long_description, benefits, applications, sustainability, seo_title, seo_description)
      `)
      .eq("published", true)
      .order("sort_order");
    if (error || !data || data.length === 0) return seedProducts;
    return (data as unknown as DbProductRow[]).map(mapProduct);
  } catch {
    return seedProducts;
  }
}

export async function fetchProductBySlug(slug: string): Promise<Product | null> {
  const all = await fetchProducts();
  return all.find((p) => p.slug === slug) ?? null;
}
