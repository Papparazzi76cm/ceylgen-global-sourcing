import { createFileRoute, Outlet, Link, redirect, useNavigate } from "@tanstack/react-router";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { LayoutDashboard, Package, Inbox, LogOut, ShieldCheck } from "lucide-react";
import { useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { bootstrapFirstAdmin } from "@/lib/bootstrap-admin.functions";
import { toast } from "sonner";
import { Eyebrow, Card, Field, Input, Button, GhostButton, Spinner } from "@/components/ds";

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
    return (
      <div className="min-h-screen flex items-center justify-center gap-3 type-small text-muted-foreground">
        <Spinner /> Cargando…
      </div>
    );
  }

  if (!isStaff) {
    return <RestrictedScreen email={user?.email} onSignOut={signOut} />;
  }

  return (
    <div className="min-h-screen bg-background">
      <aside className="fixed inset-y-0 left-0 hidden w-60 border-r border-border bg-card md:block">
        <div className="p-6">
          <Eyebrow>CEYLGEN</Eyebrow>
          <h2 className="mt-1 type-h3">Admin</h2>
        </div>
        <nav className="px-3 space-y-1 type-small">
          <NavLink to="/admin" icon={<LayoutDashboard className="h-4 w-4" strokeWidth={1.6} />}>Dashboard</NavLink>
          <NavLink to="/admin/products" icon={<Package className="h-4 w-4" strokeWidth={1.6} />}>Productos</NavLink>
          <NavLink to="/admin/leads" icon={<Inbox className="h-4 w-4" strokeWidth={1.6} />}>Leads</NavLink>
        </nav>
        <div className="absolute bottom-0 inset-x-0 p-4 border-t border-border">
          <div className="type-small text-muted-foreground truncate">{user?.email}</div>
          <GhostButton onClick={signOut} size="sm" className="mt-2 normal-case tracking-normal px-0 h-auto text-xs text-muted-foreground hover:text-foreground">
            <LogOut className="h-3.5 w-3.5" strokeWidth={1.6} /> Cerrar sesión
          </GhostButton>
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

function RestrictedScreen({ email, onSignOut }: { email?: string; onSignOut: () => void }) {
  const bootstrap = useServerFn(bootstrapFirstAdmin);
  const [secret, setSecret] = useState("");
  const [busy, setBusy] = useState(false);
  const [open, setOpen] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    try {
      await bootstrap({ data: { secret } });
      toast.success("Rol admin asignado. Recargando…");
      setTimeout(() => window.location.reload(), 500);
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "No se pudo activar el bootstrap");
      setBusy(false);
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-background px-4">
      <Card className="max-w-md w-full p-8 text-center">
        <Eyebrow className="justify-center">CEYLGEN</Eyebrow>
        <h1 className="mt-3 type-h2">Acceso restringido</h1>
        <p className="mt-2 type-small text-muted-foreground">
          Tu cuenta ({email}) no tiene permisos de staff. Solicita a un administrador que te asigne un rol.
        </p>

        {!open ? (
          <GhostButton
            onClick={() => setOpen(true)}
            size="sm"
            className="mt-6 mx-auto normal-case tracking-normal px-0 h-auto text-xs text-muted-foreground hover:text-foreground"
          >
            <ShieldCheck className="h-3.5 w-3.5" strokeWidth={1.6} /> Soy el primer administrador
          </GhostButton>
        ) : (
          <form onSubmit={submit} className="mt-6 text-left space-y-3">
            <Field
              label="Clave de bootstrap"
              htmlFor="secret"
              hint={
                <>
                  Sólo funciona una vez, mientras no exista ningún administrador. La clave se genera en los
                  secretos del backend como <code>ADMIN_BOOTSTRAP_SECRET</code>.
                </>
              }
            >
              <Input
                id="secret"
                type="password"
                required
                value={secret}
                onChange={(e) => setSecret(e.target.value)}
                placeholder="ADMIN_BOOTSTRAP_SECRET"
              />
            </Field>
            <Button type="submit" disabled={busy} className="w-full">
              {busy ? "Activando…" : "Convertirme en admin"}
            </Button>
          </form>
        )}

        <GhostButton
          onClick={onSignOut}
          size="sm"
          className="mt-6 mx-auto normal-case tracking-normal px-0 h-auto text-xs text-muted-foreground hover:text-foreground"
        >
          <LogOut className="h-3.5 w-3.5" strokeWidth={1.6} /> Cerrar sesión
        </GhostButton>
      </Card>
    </main>
  );
}
