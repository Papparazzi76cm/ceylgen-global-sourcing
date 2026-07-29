import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Package, Inbox, FileText, Users } from "lucide-react";
import { Eyebrow, Grid, StatCard } from "@/components/ds";

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
      <Eyebrow>Panel</Eyebrow>
      <h1 className="mt-2 type-h1">Dashboard</h1>
      <p className="mt-2 type-small text-muted-foreground">Resumen del contenido y contactos.</p>

      <Grid cols={4} className="mt-8">
        {cards.map((c) => (
          <StatCard key={c.label} label={c.label} value={c.value} icon={<c.icon />} />
        ))}
      </Grid>
    </div>
  );
}
