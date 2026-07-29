import { createFileRoute } from "@tanstack/react-router";
import type {} from "@tanstack/react-start";
import { products } from "@/data/products";
import { categories } from "@/data/categories";

// TODO: replace with your project URL once a project name or custom domain is set.
const BASE_URL = "";

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

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: async () => {
        const entries: SitemapEntry[] = [];
        for (const lang of LANGS) {
          for (const p of STATIC_PATHS) {
            entries.push({
              path: `/${lang}${p}`,
              changefreq: "monthly",
              priority: p === "" ? "1.0" : "0.7",
            });
          }
          for (const c of categories) {
            entries.push({ path: `/${lang}/categories/${c.slug}`, changefreq: "monthly", priority: "0.6" });
          }
          for (const pr of products) {
            entries.push({ path: `/${lang}/products/${pr.slug}`, changefreq: "monthly", priority: "0.8" });
          }
        }

        const urls = entries.map((e) =>
          [
            `  <url>`,
            `    <loc>${BASE_URL}${e.path}</loc>`,
            e.changefreq ? `    <changefreq>${e.changefreq}</changefreq>` : null,
            e.priority ? `    <priority>${e.priority}</priority>` : null,
            `  </url>`,
          ]
            .filter(Boolean)
            .join("\n"),
        );

        const xml = [
          `<?xml version="1.0" encoding="UTF-8"?>`,
          `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`,
          ...urls,
          `</urlset>`,
        ].join("\n");

        return new Response(xml, {
          headers: {
            "Content-Type": "application/xml",
            "Cache-Control": "public, max-age=3600",
          },
        });
      },
    },
  },
});
