import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Package, Inbox, FileText, Users } from "lucide-react";

export const Route = createFileRoute("/_authenticated/admin/")({
  head: () => ({ meta: [{ title: "Dashboard — CEYLGEN Admin" }, { name: "robots", content: "noindex" }] }),
  component: Dashboard,
});

function Dashboard() {
  const [stats, setStats] = useState({ products: 0, leads: 0, resources: 0, newLeads: 0 });

  useEffect(() => {
    (async () => {
      const [p, l, r, nl] = await Promise.all([
        supabase.from("products").select("id", { count: "exact", head: true }),
        supabase.from("leads").select("id", { count: "exact", head: true }),
        supabase.from("resources").select("id", { count: "exact", head: true }),
        supabase.from("leads").select("id", { count: "exact", head: true }).eq("status", "new"),
      ]);
      setStats({
        products: p.count ?? 0,
        leads: l.count ?? 0,
        resources: r.count ?? 0,
        newLeads: nl.count ?? 0,
      });
    })();
  }, []);

  const cards = [
    { label: "Productos", value: stats.products, icon: Package },
    { label: "Leads totales", value: stats.leads, icon: Users },
    { label: "Leads nuevos", value: stats.newLeads, icon: Inbox },
    { label: "Recursos", value: stats.resources, icon: FileText },
  ];

  return (
    <div>
      <p className="text-eyebrow">Panel</p>
      <h1 className="mt-2 font-serif text-4xl">Dashboard</h1>
      <p className="mt-2 text-sm text-muted-foreground">Resumen del contenido y contactos.</p>

      <div className="mt-8 grid grid-cols-2 lg:grid-cols-4 gap-4">
        {cards.map((c) => (
          <div key={c.label} className="rounded-lg border border-border bg-card p-5">
            <div className="flex items-center justify-between">
              <span className="text-xs uppercase tracking-wider text-muted-foreground">{c.label}</span>
              <c.icon className="h-4 w-4 text-champagne" />
            </div>
            <div className="mt-3 font-serif text-3xl">{c.value}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
