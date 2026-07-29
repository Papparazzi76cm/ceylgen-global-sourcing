import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Package, Inbox, FileText, Users, Tags, ArrowRight } from "lucide-react";

export const Route = createFileRoute("/_authenticated/admin/")({
  head: () => ({ meta: [{ title: "Dashboard — CEYLGEN Admin" }, { name: "robots", content: "noindex" }] }),
  component: Dashboard,
});

function Dashboard() {
  const [stats, setStats] = useState({ products: 0, leads: 0, resources: 0, newLeads: 0, categories: 0, drafts: 0 });
  const [error, setError] = useState(false);

  useEffect(() => {
    (async () => {
      const [p, l, r, nl, c, d] = await Promise.all([
        supabase.from("products").select("id", { count: "exact", head: true }),
        supabase.from("leads").select("id", { count: "exact", head: true }),
        supabase.from("resources").select("id", { count: "exact", head: true }),
        supabase.from("leads").select("id", { count: "exact", head: true }).eq("status", "new"),
        supabase.from("categories").select("slug", { count: "exact", head: true }),
        supabase.from("products").select("id", { count: "exact", head: true }).eq("published", false),
      ]);
      setError([p, l, r, nl, c, d].some((result) => Boolean(result.error)));
      setStats({
        products: p.count ?? 0,
        leads: l.count ?? 0,
        resources: r.count ?? 0,
        newLeads: nl.count ?? 0,
        categories: c.count ?? 0,
        drafts: d.count ?? 0,
      });
    })();
  }, []);

  const cards = [
    { label: "Productos", value: stats.products, icon: Package, to: "/admin/products" },
    { label: "Categorías", value: stats.categories, icon: Tags, to: "/admin/categories" },
    { label: "Recursos", value: stats.resources, icon: FileText, to: "/admin/resources" },
    { label: "Leads totales", value: stats.leads, icon: Users, to: "/admin/leads" },
    { label: "Leads nuevos", value: stats.newLeads, icon: Inbox, to: "/admin/leads" },
    { label: "Productos en borrador", value: stats.drafts, icon: Package, to: "/admin/products" },
  ];

  return (
    <div>
      <p className="text-eyebrow">Panel</p>
      <h1 className="mt-2 font-serif text-4xl">Dashboard</h1>
      <p className="mt-2 text-sm text-muted-foreground">Resumen del contenido, catálogo y contactos.</p>
      {error && <p role="alert" className="mt-4 rounded-sm border border-destructive/30 bg-destructive/5 px-4 py-3 text-sm text-destructive">Algunos indicadores no pudieron cargarse. Revisa la conexión y los permisos de Supabase.</p>}

      <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {cards.map((card) => (
          <Link key={card.label} to={card.to} className="group rounded-lg border border-border bg-card p-5 transition hover:border-primary/40 hover:bg-accent/30">
            <div className="flex items-center justify-between">
              <span className="text-xs uppercase tracking-wider text-muted-foreground">{card.label}</span>
              <card.icon className="h-4 w-4 text-champagne" />
            </div>
            <div className="mt-3 flex items-end justify-between">
              <span className="font-serif text-3xl">{card.value}</span>
              <ArrowRight className="h-4 w-4 text-muted-foreground transition group-hover:translate-x-1 group-hover:text-foreground" />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
