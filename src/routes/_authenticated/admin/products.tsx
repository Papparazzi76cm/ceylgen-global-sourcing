import { createFileRoute, Link } from "@tanstack/react-router";
import { useCallback, useEffect, useMemo, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { ExternalLink, FileText, Save, Search, Star } from "lucide-react";
import { toast } from "sonner";

type Row = {
  id: string;
  slug: string;
  code: string;
  category_slug: string;
  featured: boolean;
  published: boolean;
  image_url: string | null;
  has_technical_sheet: boolean;
  sort_order: number;
};

export const Route = createFileRoute("/_authenticated/admin/products")({
  head: () => ({ meta: [{ title: "Productos — CEYLGEN Admin" }, { name: "robots", content: "noindex" }] }),
  component: ProductsList,
});

function ProductsList() {
  const [rows, setRows] = useState<Row[]>([]);
  const [loading, setLoading] = useState(true);
  const [busy, setBusy] = useState<string | null>(null);
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState<"all" | "published" | "draft">("all");

  const load = useCallback(async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("products")
      .select("id, slug, code, category_slug, featured, published, image_url, has_technical_sheet, sort_order")
      .order("sort_order");
    if (error) toast.error("No se pudieron cargar los productos");
    setRows((data ?? []) as Row[]);
    setLoading(false);
  }, []);

  useEffect(() => { void load(); }, [load]);

  const filtered = useMemo(() => rows.filter((row) => {
    const matchesQuery = `${row.code} ${row.slug} ${row.category_slug}`.toLowerCase().includes(query.toLowerCase());
    const matchesStatus = status === "all" || (status === "published" ? row.published : !row.published);
    return matchesQuery && matchesStatus;
  }), [query, rows, status]);

  const patch = (id: string, next: Partial<Row>) => setRows((current) => current.map((row) => row.id === id ? { ...row, ...next } : row));

  const save = async (row: Row) => {
    setBusy(row.id);
    const { error } = await supabase.from("products").update({
      category_slug: row.category_slug,
      featured: row.featured,
      published: row.published,
      image_url: row.image_url || null,
      has_technical_sheet: row.has_technical_sheet,
      sort_order: row.sort_order,
    }).eq("id", row.id);
    setBusy(null);
    error ? toast.error(error.message) : toast.success("Producto actualizado");
  };

  return (
    <div>
      <p className="text-eyebrow">Catálogo</p>
      <h1 className="mt-2 font-serif text-4xl">Productos</h1>
      <p className="mt-2 text-sm text-muted-foreground">Filtra, publica y actualiza la configuración principal del catálogo.</p>

      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <label className="relative flex-1">
          <Search className="pointer-events-none absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
          <span className="sr-only">Buscar productos</span>
          <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Buscar por código, slug o categoría" className="w-full rounded-sm border border-input bg-background py-2 pl-9 pr-3 text-sm" />
        </label>
        <select aria-label="Filtrar por estado" value={status} onChange={(e) => setStatus(e.target.value as typeof status)} className="rounded-sm border border-input bg-background px-3 py-2 text-sm">
          <option value="all">Todos</option>
          <option value="published">Publicados</option>
          <option value="draft">Borradores</option>
        </select>
      </div>

      <div className="mt-6 space-y-3">
        {loading ? <p className="text-sm text-muted-foreground">Cargando…</p> : filtered.length === 0 ? <p className="text-sm text-muted-foreground">No hay productos que coincidan con el filtro.</p> : filtered.map((row) => (
          <div key={row.id} className="grid gap-3 rounded-lg border border-border bg-card p-4 md:grid-cols-12 md:items-center">
            <div className="md:col-span-2">
              <div className="font-mono text-xs">{row.code}</div>
              <Link to="/$lang/products/$slug" params={{ lang: "es", slug: row.slug }} className="mt-1 inline-flex items-center gap-1 text-xs text-primary hover:underline">{row.slug}<ExternalLink className="h-3 w-3" /></Link>
            </div>
            <input aria-label={`Categoría de ${row.code}`} value={row.category_slug} onChange={(e) => patch(row.id, { category_slug: e.target.value })} className="rounded-sm border border-input bg-background px-3 py-2 text-sm md:col-span-2" />
            <input aria-label={`URL de imagen de ${row.code}`} value={row.image_url ?? ""} onChange={(e) => patch(row.id, { image_url: e.target.value })} placeholder="URL de imagen" className="rounded-sm border border-input bg-background px-3 py-2 text-sm md:col-span-3" />
            <input aria-label={`Orden de ${row.code}`} type="number" value={row.sort_order} onChange={(e) => patch(row.id, { sort_order: Number(e.target.value) })} className="rounded-sm border border-input bg-background px-3 py-2 text-sm" />
            <label className="flex items-center gap-2 text-xs"><input type="checkbox" checked={row.published} onChange={(e) => patch(row.id, { published: e.target.checked })} /> Publicado</label>
            <label className="flex items-center gap-2 text-xs"><input type="checkbox" checked={row.featured} onChange={(e) => patch(row.id, { featured: e.target.checked })} /><Star className="h-3 w-3" /> Destacado</label>
            <label className="flex items-center gap-2 text-xs"><input type="checkbox" checked={row.has_technical_sheet} onChange={(e) => patch(row.id, { has_technical_sheet: e.target.checked })} /><FileText className="h-3 w-3" /> TDS</label>
            <button onClick={() => void save(row)} disabled={busy === row.id} className="inline-flex items-center justify-center gap-2 rounded-sm border border-border px-3 py-2 text-xs hover:bg-accent disabled:opacity-50"><Save className="h-4 w-4" /> Guardar</button>
          </div>
        ))}
      </div>
    </div>
  );
}
