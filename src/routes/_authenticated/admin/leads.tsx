import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

type Lead = {
  id: string; name: string; email: string; company: string | null;
  country: string | null; interest: string | null; message: string;
  status: string; created_at: string; lang: string | null;
};

const STATUSES = ["new", "contacted", "qualified", "archived"];

export const Route = createFileRoute("/_authenticated/admin/leads")({
  head: () => ({ meta: [{ title: "Leads — CEYLGEN Admin" }, { name: "robots", content: "noindex" }] }),
  component: LeadsInbox,
});

function LeadsInbox() {
  const [rows, setRows] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<Lead | null>(null);

  const load = async () => {
    const { data } = await supabase
      .from("leads")
      .select("id, name, email, company, country, interest, message, status, created_at, lang")
      .order("created_at", { ascending: false });
    setRows((data ?? []) as Lead[]);
    setLoading(false);
  };

  useEffect(() => { load(); }, []);

  const updateStatus = async (id: string, status: string) => {
    const { error } = await supabase.from("leads").update({ status }).eq("id", id);
    if (error) return toast.error("No se pudo actualizar");
    toast.success("Estado actualizado");
    setRows((rs) => rs.map((r) => (r.id === id ? { ...r, status } : r)));
    if (selected?.id === id) setSelected({ ...selected, status });
  };

  return (
    <div>
      <p className="text-eyebrow">Contactos</p>
      <h1 className="mt-2 font-serif text-4xl">Leads</h1>
      <p className="mt-2 text-sm text-muted-foreground">Buzón de solicitudes desde el formulario público.</p>

      <div className="mt-8 grid grid-cols-1 lg:grid-cols-[1fr_1.2fr] gap-6">
        <div className="rounded-lg border border-border bg-card overflow-hidden">
          {loading ? (
            <div className="p-6 text-center text-sm text-muted-foreground">Cargando…</div>
          ) : rows.length === 0 ? (
            <div className="p-6 text-center text-sm text-muted-foreground">Sin leads todavía.</div>
          ) : (
            <ul className="divide-y divide-border max-h-[70vh] overflow-y-auto">
              {rows.map((r) => (
                <li key={r.id}>
                  <button
                    onClick={() => setSelected(r)}
                    className={`w-full text-left px-4 py-3 hover:bg-accent/40 ${selected?.id === r.id ? "bg-accent/60" : ""}`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-medium text-sm truncate">{r.name}</span>
                      <span className={`text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-sm ${r.status === "new" ? "bg-champagne/20 text-champagne" : "bg-muted text-muted-foreground"}`}>
                        {r.status}
                      </span>
                    </div>
                    <div className="text-xs text-muted-foreground truncate">{r.email} · {r.company ?? "—"}</div>
                    <div className="text-xs text-muted-foreground mt-1">{new Date(r.created_at).toLocaleString()}</div>
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="rounded-lg border border-border bg-card p-6">
          {!selected ? (
            <div className="text-sm text-muted-foreground">Selecciona un lead para ver los detalles.</div>
          ) : (
            <div>
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h2 className="font-serif text-2xl">{selected.name}</h2>
                  <a href={`mailto:${selected.email}`} className="text-sm text-primary hover:underline">{selected.email}</a>
                </div>
                <select
                  value={selected.status}
                  onChange={(e) => updateStatus(selected.id, e.target.value)}
                  className="rounded-sm border border-input bg-background px-2 py-1 text-xs"
                >
                  {STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>
              <dl className="mt-6 grid grid-cols-2 gap-4 text-sm">
                <Field label="Empresa" value={selected.company} />
                <Field label="País" value={selected.country} />
                <Field label="Interés" value={selected.interest} />
                <Field label="Idioma" value={selected.lang} />
              </dl>
              <div className="mt-6">
                <div className="text-xs uppercase tracking-wider text-muted-foreground">Mensaje</div>
                <p className="mt-2 whitespace-pre-wrap text-sm">{selected.message}</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function Field({ label, value }: { label: string; value: string | null }) {
  return (
    <div>
      <dt className="text-xs uppercase tracking-wider text-muted-foreground">{label}</dt>
      <dd className="mt-1">{value ?? "—"}</dd>
    </div>
  );
}
