import { createFileRoute } from "@tanstack/react-router";
import type {} from "@tanstack/react-start";
import { products } from "@/data/products";
import { categories } from "@/data/categories";

const LANGS = ["es", "en", "fr"] as const;
const STATIC_PATHS = [
  "",
  "/about",
  "/industries",
  "/quality",
  "/sustainability",
  "/resources",
  "/contact",
  "/products",
];

interface SitemapEntry {
  path: string;
  changefreq?: "weekly" | "monthly" | "yearly";
  priority?: string;
}

function escapeXml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&apos;");
}

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: async ({ request }) => {
        const origin = new URL(request.url).origin;
        const entries: SitemapEntry[] = [];

        for (const lang of LANGS) {
          for (const path of STATIC_PATHS) {
            entries.push({
              path: `/${lang}${path}`,
              changefreq: path === "" ? "weekly" : "monthly",
              priority: path === "" ? "1.0" : "0.7",
            });
          }

          for (const category of categories) {
            entries.push({
              path: `/${lang}/categories/${category.slug}`,
              changefreq: "monthly",
              priority: "0.6",
            });
          }

          for (const product of products) {
            entries.push({
              path: `/${lang}/products/${product.slug}`,
              changefreq: "monthly",
              priority: "0.8",
            });
          }
        }

        const urls = entries.map((entry) => {
          const localizedPath = entry.path.replace(/^\/(es|en|fr)/, "");
          const alternates = LANGS.map(
            (lang) =>
              `    <xhtml:link rel="alternate" hreflang="${lang}" href="${escapeXml(`${origin}/${lang}${localizedPath}`)}" />`,
          );

          return [
            "  <url>",
            `    <loc>${escapeXml(`${origin}${entry.path}`)}</loc>`,
            ...alternates,
            `    <xhtml:link rel="alternate" hreflang="x-default" href="${escapeXml(`${origin}/es${localizedPath}`)}" />`,
            entry.changefreq
              ? `    <changefreq>${entry.changefreq}</changefreq>`
              : null,
            entry.priority ? `    <priority>${entry.priority}</priority>` : null,
            "  </url>",
          ]
            .filter(Boolean)
            .join("\n");
        });

        const xml = [
          '<?xml version="1.0" encoding="UTF-8"?>',
          '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">',
          ...urls,
          "</urlset>",
        ].join("\n");

        return new Response(xml, {
          headers: {
            "Content-Type": "application/xml; charset=utf-8",
            "Cache-Control": "public, max-age=3600, s-maxage=3600",
          },
        });
      },
    },
  },
});
