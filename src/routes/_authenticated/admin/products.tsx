import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Link } from "@tanstack/react-router";
import { FileText, Star } from "lucide-react";

type Row = {
  id: string; slug: string; code: string; category_slug: string;
  featured: boolean; published: boolean; image_url: string | null;
  has_technical_sheet: boolean;
};

export const Route = createFileRoute("/_authenticated/admin/products")({
  head: () => ({ meta: [{ title: "Productos — CEYLGEN Admin" }, { name: "robots", content: "noindex" }] }),
  component: ProductsList,
});

function ProductsList() {
  const [rows, setRows] = useState<Row[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const { data } = await supabase
        .from("products")
        .select("id, slug, code, category_slug, featured, published, image_url, has_technical_sheet")
        .order("sort_order");
      setRows((data ?? []) as Row[]);
      setLoading(false);
    })();
  }, []);

  return (
    <div>
      <p className="text-eyebrow">Catálogo</p>
      <h1 className="mt-2 font-serif text-4xl">Productos</h1>
      <p className="mt-2 text-sm text-muted-foreground">Gestiona el catálogo, especificaciones y traducciones.</p>

      <div className="mt-8 rounded-lg border border-border bg-card overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-muted/40 text-xs uppercase tracking-wider text-muted-foreground">
            <tr>
              <th className="text-left px-4 py-3">Código</th>
              <th className="text-left px-4 py-3">Slug</th>
              <th className="text-left px-4 py-3">Categoría</th>
              <th className="text-left px-4 py-3">Estado</th>
              <th className="text-left px-4 py-3">TDS</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan={5} className="px-4 py-6 text-center text-muted-foreground">Cargando…</td></tr>
            ) : rows.length === 0 ? (
              <tr><td colSpan={5} className="px-4 py-6 text-center text-muted-foreground">Sin productos</td></tr>
            ) : rows.map((r) => (
              <tr key={r.id} className="border-t border-border hover:bg-accent/40">
                <td className="px-4 py-3 font-mono text-xs">{r.code}</td>
                <td className="px-4 py-3">
                  <Link to="/$lang/products/$slug" params={{ lang: "es", slug: r.slug }} className="text-primary hover:underline">
                    {r.slug}
                  </Link>
                </td>
                <td className="px-4 py-3 text-muted-foreground">{r.category_slug}</td>
                <td className="px-4 py-3">
                  <span className={`inline-flex items-center gap-1 rounded-sm px-2 py-0.5 text-[10px] uppercase tracking-wider ${r.published ? "bg-emerald-500/10 text-emerald-600" : "bg-muted text-muted-foreground"}`}>
                    {r.published ? "Publicado" : "Borrador"}
                  </span>
                  {r.featured && <Star className="ml-2 inline h-3 w-3 text-champagne" />}
                </td>
                <td className="px-4 py-3">{r.has_technical_sheet && <FileText className="h-4 w-4 text-muted-foreground" />}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="mt-4 text-xs text-muted-foreground">La edición inline se habilitará en la siguiente iteración.</p>
    </div>
  );
}
