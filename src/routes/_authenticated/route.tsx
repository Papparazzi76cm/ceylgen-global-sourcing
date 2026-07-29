import { createFileRoute, Outlet, Link, redirect, useNavigate } from "@tanstack/react-router";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { LayoutDashboard, Package, Inbox, LogOut } from "lucide-react";

export const Route = createFileRoute("/_authenticated")({
  ssr: false,
  beforeLoad: async () => {
    const { data } = await supabase.auth.getUser();
    if (!data.user) throw redirect({ to: "/auth" });
  },
  component: AdminLayout,
});

function AdminLayout() {
  const { loading, user, isStaff } = useAuth();
  const navigate = useNavigate();

  const signOut = async () => {
    await supabase.auth.signOut();
    navigate({ to: "/auth", replace: true });
  };

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center text-sm text-muted-foreground">Cargando…</div>;
  }

  if (!isStaff) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-background px-4">
        <div className="max-w-md text-center rounded-lg border border-border bg-card p-8">
          <p className="text-eyebrow">CEYLGEN</p>
          <h1 className="mt-3 font-serif text-2xl">Acceso restringido</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Tu cuenta ({user?.email}) no tiene permisos de staff. Solicita a un administrador que te asigne un rol.
          </p>
          <button onClick={signOut} className="mt-6 inline-flex items-center gap-2 rounded-sm bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground hover:bg-primary/90">
            <LogOut className="h-4 w-4" /> Cerrar sesión
          </button>
        </div>
      </main>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <aside className="fixed inset-y-0 left-0 hidden w-60 border-r border-border bg-card md:block">
        <div className="p-6">
          <p className="text-eyebrow">CEYLGEN</p>
          <h2 className="mt-1 font-serif text-xl">Admin</h2>
        </div>
        <nav className="px-3 space-y-1 text-sm">
          <NavLink to="/admin" icon={<LayoutDashboard className="h-4 w-4" />}>Dashboard</NavLink>
          <NavLink to="/admin/products" icon={<Package className="h-4 w-4" />}>Productos</NavLink>
          <NavLink to="/admin/leads" icon={<Inbox className="h-4 w-4" />}>Leads</NavLink>
        </nav>
        <div className="absolute bottom-0 inset-x-0 p-4 border-t border-border">
          <div className="text-xs text-muted-foreground truncate">{user?.email}</div>
          <button onClick={signOut} className="mt-2 inline-flex items-center gap-2 text-xs text-muted-foreground hover:text-foreground">
            <LogOut className="h-3.5 w-3.5" /> Cerrar sesión
          </button>
        </div>
      </aside>
      <main className="md:pl-60">
        <div className="container mx-auto max-w-6xl px-6 py-10">
          <Outlet />
        </div>
      </main>
    </div>
  );
}

function NavLink({ to, icon, children }: { to: string; icon: React.ReactNode; children: React.ReactNode }) {
  return (
    <Link
      to={to}
      className="flex items-center gap-2.5 rounded-sm px-3 py-2 text-muted-foreground hover:bg-accent hover:text-foreground"
      activeProps={{ className: "bg-accent text-foreground" }}
      activeOptions={{ exact: to === "/admin" }}
    >
      {icon} {children}
    </Link>
  );
}
