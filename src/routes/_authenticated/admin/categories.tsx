import { createFileRoute } from "@tanstack/react-router";
import { useCallback, useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Plus, Save, Trash2 } from "lucide-react";
import { toast } from "sonner";

type Category = {
  slug: string;
  accent: string;
  image_url: string | null;
  has_products: boolean;
  published: boolean;
  sort_order: number;
};

const emptyCategory: Category = {
  slug: "",
  accent: "ocean",
  image_url: null,
  has_products: true,
  published: true,
  sort_order: 0,
};

export const Route = createFileRoute("/_authenticated/admin/categories")({
  head: () => ({ meta: [{ title: "Categorías — CEYLGEN Admin" }, { name: "robots", content: "noindex" }] }),
  component: CategoriesAdmin,
});

function CategoriesAdmin() {
  const [rows, setRows] = useState<Category[]>([]);
  const [draft, setDraft] = useState<Category>(emptyCategory);
  const [loading, setLoading] = useState(true);
  const [busy, setBusy] = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    const { data, error } = await supabase.from("categories").select("slug, accent, image_url, has_products, published, sort_order").order("sort_order");
    if (error) toast.error("No se pudieron cargar las categorías");
    setRows((data ?? []) as Category[]);
    setLoading(false);
  }, []);

  useEffect(() => { void load(); }, [load]);

  const create = async (event: React.FormEvent) => {
    event.preventDefault();
    const slug = draft.slug.trim().toLowerCase().replace(/[^a-z0-9-]+/g, "-").replace(/^-|-$/g, "");
    if (!slug) return toast.error("Introduce un slug válido");
    setBusy("new");
    const { error } = await supabase.from("categories").insert({ ...draft, slug, image_url: draft.image_url || null });
    setBusy(null);
    if (error) return toast.error(error.message);
    setDraft(emptyCategory);
    toast.success("Categoría creada");
    await load();
  };

  const save = async (row: Category) => {
    setBusy(row.slug);
    const { error } = await supabase.from("categories").update({
      accent: row.accent,
      image_url: row.image_url || null,
      has_products: row.has_products,
      published: row.published,
      sort_order: row.sort_order,
    }).eq("slug", row.slug);
    setBusy(null);
    error ? toast.error(error.message) : toast.success("Categoría actualizada");
  };

  const remove = async (slug: string) => {
    if (!window.confirm(`¿Eliminar la categoría ${slug}?`)) return;
    setBusy(slug);
    const { error } = await supabase.from("categories").delete().eq("slug", slug);
    setBusy(null);
    if (error) return toast.error("No se puede eliminar una categoría con productos asociados");
    toast.success("Categoría eliminada");
    await load();
  };

  const patch = (slug: string, next: Partial<Category>) => setRows((current) => current.map((row) => row.slug === slug ? { ...row, ...next } : row));

  return (
    <div>
      <p className="text-eyebrow">Catálogo</p>
      <h1 className="mt-2 font-serif text-4xl">Categorías</h1>
      <p className="mt-2 text-sm text-muted-foreground">Crea, ordena, publica y configura las categorías del catálogo.</p>

      <form onSubmit={create} className="mt-8 grid gap-3 rounded-lg border border-border bg-card p-5 md:grid-cols-6">
        <input aria-label="Slug" placeholder="slug-categoria" value={draft.slug} onChange={(e) => setDraft({ ...draft, slug: e.target.value })} className="rounded-sm border border-input bg-background px-3 py-2 text-sm md:col-span-2" />
        <input aria-label="Acento" placeholder="ocean" value={draft.accent} onChange={(e) => setDraft({ ...draft, accent: e.target.value })} className="rounded-sm border border-input bg-background px-3 py-2 text-sm" />
        <input aria-label="URL de imagen" placeholder="URL de imagen" value={draft.image_url ?? ""} onChange={(e) => setDraft({ ...draft, image_url: e.target.value })} className="rounded-sm border border-input bg-background px-3 py-2 text-sm md:col-span-2" />
        <button disabled={busy === "new"} className="inline-flex items-center justify-center gap-2 rounded-sm bg-primary px-4 py-2 text-sm text-primary-foreground disabled:opacity-50"><Plus className="h-4 w-4" /> Añadir</button>
      </form>

      <div className="mt-6 space-y-3">
        {loading ? <p className="text-sm text-muted-foreground">Cargando…</p> : rows.map((row) => (
          <div key={row.slug} className="grid gap-3 rounded-lg border border-border bg-card p-4 md:grid-cols-12 md:items-center">
            <div className="font-mono text-xs md:col-span-2">{row.slug}</div>
            <input aria-label={`Acento de ${row.slug}`} value={row.accent} onChange={(e) => patch(row.slug, { accent: e.target.value })} className="rounded-sm border border-input bg-background px-3 py-2 text-sm md:col-span-2" />
            <input aria-label={`Imagen de ${row.slug}`} value={row.image_url ?? ""} onChange={(e) => patch(row.slug, { image_url: e.target.value })} placeholder="URL de imagen" className="rounded-sm border border-input bg-background px-3 py-2 text-sm md:col-span-3" />
            <input aria-label={`Orden de ${row.slug}`} type="number" value={row.sort_order} onChange={(e) => patch(row.slug, { sort_order: Number(e.target.value) })} className="rounded-sm border border-input bg-background px-3 py-2 text-sm md:col-span-1" />
            <label className="flex items-center gap-2 text-xs md:col-span-1"><input type="checkbox" checked={row.published} onChange={(e) => patch(row.slug, { published: e.target.checked })} /> Publicada</label>
            <label className="flex items-center gap-2 text-xs md:col-span-1"><input type="checkbox" checked={row.has_products} onChange={(e) => patch(row.slug, { has_products: e.target.checked })} /> Productos</label>
            <div className="flex gap-2 md:col-span-2 md:justify-end">
              <button onClick={() => void save(row)} disabled={busy === row.slug} className="rounded-sm border border-border p-2 hover:bg-accent" aria-label={`Guardar ${row.slug}`}><Save className="h-4 w-4" /></button>
              <button onClick={() => void remove(row.slug)} disabled={busy === row.slug} className="rounded-sm border border-border p-2 text-destructive hover:bg-accent" aria-label={`Eliminar ${row.slug}`}><Trash2 className="h-4 w-4" /></button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
