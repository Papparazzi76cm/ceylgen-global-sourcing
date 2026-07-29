import { createFileRoute } from "@tanstack/react-router";
import { useCallback, useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Plus, Save, Trash2 } from "lucide-react";
import { toast } from "sonner";

type Resource = {
  id: string;
  slug: string;
  kind: string;
  lang: string;
  title: string;
  description: string | null;
  storage_path: string | null;
  external_url: string | null;
  published: boolean;
  sort_order: number;
};

type Draft = Omit<Resource, "id">;

const emptyDraft: Draft = {
  slug: "",
  kind: "brochure",
  lang: "es",
  title: "",
  description: null,
  storage_path: null,
  external_url: null,
  published: true,
  sort_order: 0,
};

export const Route = createFileRoute("/_authenticated/admin/resources")({
  head: () => ({ meta: [{ title: "Recursos — CEYLGEN Admin" }, { name: "robots", content: "noindex" }] }),
  component: ResourcesAdmin,
});

function ResourcesAdmin() {
  const [rows, setRows] = useState<Resource[]>([]);
  const [draft, setDraft] = useState<Draft>(emptyDraft);
  const [loading, setLoading] = useState(true);
  const [busy, setBusy] = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    const { data, error } = await supabase.from("resources").select("id, slug, kind, lang, title, description, storage_path, external_url, published, sort_order").order("sort_order");
    if (error) toast.error("No se pudieron cargar los recursos");
    setRows((data ?? []) as Resource[]);
    setLoading(false);
  }, []);

  useEffect(() => { void load(); }, [load]);

  const create = async (event: React.FormEvent) => {
    event.preventDefault();
    const slug = draft.slug.trim().toLowerCase().replace(/[^a-z0-9-]+/g, "-").replace(/^-|-$/g, "");
    if (!slug || !draft.title.trim()) return toast.error("Slug y título son obligatorios");
    if (!draft.storage_path && !draft.external_url) return toast.error("Indica una ruta de Storage o una URL externa");
    setBusy("new");
    const { error } = await supabase.from("resources").insert({ ...draft, slug, title: draft.title.trim(), description: draft.description || null, storage_path: draft.storage_path || null, external_url: draft.external_url || null });
    setBusy(null);
    if (error) return toast.error(error.message);
    setDraft(emptyDraft);
    toast.success("Recurso creado");
    await load();
  };

  const save = async (row: Resource) => {
    setBusy(row.id);
    const { error } = await supabase.from("resources").update({
      kind: row.kind,
      lang: row.lang,
      title: row.title.trim(),
      description: row.description || null,
      storage_path: row.storage_path || null,
      external_url: row.external_url || null,
      published: row.published,
      sort_order: row.sort_order,
    }).eq("id", row.id);
    setBusy(null);
    error ? toast.error(error.message) : toast.success("Recurso actualizado");
  };

  const remove = async (row: Resource) => {
    if (!window.confirm(`¿Eliminar el recurso ${row.title}?`)) return;
    setBusy(row.id);
    const { error } = await supabase.from("resources").delete().eq("id", row.id);
    setBusy(null);
    if (error) return toast.error(error.message);
    toast.success("Recurso eliminado");
    await load();
  };

  const patch = (id: string, next: Partial<Resource>) => setRows((current) => current.map((row) => row.id === id ? { ...row, ...next } : row));

  return (
    <div>
      <p className="text-eyebrow">Contenido</p>
      <h1 className="mt-2 font-serif text-4xl">Recursos</h1>
      <p className="mt-2 text-sm text-muted-foreground">Administra folletos, fichas, documentos y enlaces descargables.</p>

      <form onSubmit={create} className="mt-8 grid gap-3 rounded-lg border border-border bg-card p-5 md:grid-cols-6">
        <input aria-label="Slug" placeholder="slug-recurso" value={draft.slug} onChange={(e) => setDraft({ ...draft, slug: e.target.value })} className="rounded-sm border border-input bg-background px-3 py-2 text-sm md:col-span-2" />
        <input aria-label="Título" placeholder="Título" value={draft.title} onChange={(e) => setDraft({ ...draft, title: e.target.value })} className="rounded-sm border border-input bg-background px-3 py-2 text-sm md:col-span-2" />
        <select aria-label="Idioma" value={draft.lang} onChange={(e) => setDraft({ ...draft, lang: e.target.value })} className="rounded-sm border border-input bg-background px-3 py-2 text-sm"><option value="es">ES</option><option value="en">EN</option><option value="fr">FR</option></select>
        <select aria-label="Tipo" value={draft.kind} onChange={(e) => setDraft({ ...draft, kind: e.target.value })} className="rounded-sm border border-input bg-background px-3 py-2 text-sm"><option value="brochure">Brochure</option><option value="technical-sheet">Ficha técnica</option><option value="certificate">Certificado</option><option value="other">Otro</option></select>
        <input aria-label="Ruta de Storage" placeholder="Ruta en Storage" value={draft.storage_path ?? ""} onChange={(e) => setDraft({ ...draft, storage_path: e.target.value })} className="rounded-sm border border-input bg-background px-3 py-2 text-sm md:col-span-2" />
        <input aria-label="URL externa" placeholder="https://…" value={draft.external_url ?? ""} onChange={(e) => setDraft({ ...draft, external_url: e.target.value })} className="rounded-sm border border-input bg-background px-3 py-2 text-sm md:col-span-3" />
        <button disabled={busy === "new"} className="inline-flex items-center justify-center gap-2 rounded-sm bg-primary px-4 py-2 text-sm text-primary-foreground disabled:opacity-50"><Plus className="h-4 w-4" /> Añadir</button>
      </form>

      <div className="mt-6 space-y-3">
        {loading ? <p className="text-sm text-muted-foreground">Cargando…</p> : rows.map((row) => (
          <div key={row.id} className="grid gap-3 rounded-lg border border-border bg-card p-4 md:grid-cols-12 md:items-center">
            <input aria-label={`Título de ${row.slug}`} value={row.title} onChange={(e) => patch(row.id, { title: e.target.value })} className="rounded-sm border border-input bg-background px-3 py-2 text-sm md:col-span-3" />
            <div className="font-mono text-xs md:col-span-2">{row.slug}</div>
            <select aria-label={`Idioma de ${row.slug}`} value={row.lang} onChange={(e) => patch(row.id, { lang: e.target.value })} className="rounded-sm border border-input bg-background px-3 py-2 text-sm"><option value="es">ES</option><option value="en">EN</option><option value="fr">FR</option></select>
            <select aria-label={`Tipo de ${row.slug}`} value={row.kind} onChange={(e) => patch(row.id, { kind: e.target.value })} className="rounded-sm border border-input bg-background px-3 py-2 text-sm md:col-span-2"><option value="brochure">Brochure</option><option value="technical-sheet">Ficha técnica</option><option value="certificate">Certificado</option><option value="other">Otro</option></select>
            <input aria-label={`Orden de ${row.slug}`} type="number" value={row.sort_order} onChange={(e) => patch(row.id, { sort_order: Number(e.target.value) })} className="rounded-sm border border-input bg-background px-3 py-2 text-sm" />
            <label className="flex items-center gap-2 text-xs"><input type="checkbox" checked={row.published} onChange={(e) => patch(row.id, { published: e.target.checked })} /> Publicado</label>
            <div className="flex gap-2 md:col-span-2 md:justify-end">
              <button onClick={() => void save(row)} disabled={busy === row.id} className="rounded-sm border border-border p-2 hover:bg-accent" aria-label={`Guardar ${row.slug}`}><Save className="h-4 w-4" /></button>
              <button onClick={() => void remove(row)} disabled={busy === row.id} className="rounded-sm border border-border p-2 text-destructive hover:bg-accent" aria-label={`Eliminar ${row.slug}`}><Trash2 className="h-4 w-4" /></button>
            </div>
            <input aria-label={`Ruta de ${row.slug}`} value={row.storage_path ?? ""} onChange={(e) => patch(row.id, { storage_path: e.target.value })} placeholder="Ruta en Storage" className="rounded-sm border border-input bg-background px-3 py-2 text-xs md:col-span-5" />
            <input aria-label={`URL externa de ${row.slug}`} value={row.external_url ?? ""} onChange={(e) => patch(row.id, { external_url: e.target.value })} placeholder="URL externa" className="rounded-sm border border-input bg-background px-3 py-2 text-xs md:col-span-7" />
          </div>
        ))}
      </div>
    </div>
  );
}
