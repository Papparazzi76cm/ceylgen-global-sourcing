import { createFileRoute, useNavigate, redirect } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { lovable } from "@/integrations/lovable";
import { toast } from "sonner";
import { Card, Eyebrow, Field, Input, Button, SecondaryButton, GhostButton } from "@/components/ds";

export const Route = createFileRoute("/auth")({
  head: () => ({
    meta: [
      { title: "Admin — CEYLGEN" },
      { name: "description", content: "Acceso al panel de administración CEYLGEN." },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  beforeLoad: async () => {
    // If already signed in, send to admin
    if (typeof window === "undefined") return;
    const { data } = await supabase.auth.getSession();
    if (data.session) throw redirect({ to: "/admin" });
  },
  component: AuthPage,
});

function AuthPage() {
  const navigate = useNavigate();
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const { data: sub } = supabase.auth.onAuthStateChange((_e, s) => {
      if (s) navigate({ to: "/admin" });
    });
    return () => sub.subscription.unsubscribe();
  }, [navigate]);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (mode === "signup") {
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: { emailRedirectTo: window.location.origin + "/admin" },
        });
        if (error) throw error;
        toast.success("Cuenta creada. Revisa tu email si es necesario.");
      } else {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        toast.success("Sesión iniciada");
      }
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Error de autenticación");
    } finally {
      setLoading(false);
    }
  };

  const google = async () => {
    setLoading(true);
    const res = await lovable.auth.signInWithOAuth("google", {
      redirect_uri: window.location.origin,
    });
    if (res.error) {
      toast.error("No se pudo iniciar con Google");
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-background px-4 py-16">
      <Card className="w-full max-w-md shadow-[var(--shadow-elevated)] p-8">
        <Eyebrow>CEYLGEN</Eyebrow>
        <h1 className="mt-2 type-h2">Panel de administración</h1>
        <p className="mt-2 type-small text-muted-foreground">
          {mode === "signin" ? "Inicia sesión para continuar." : "Crea una cuenta."}
        </p>

        <SecondaryButton onClick={google} disabled={loading} className="mt-6 w-full">
          Continuar con Google
        </SecondaryButton>

        <div className="my-6 flex items-center gap-3 type-small text-muted-foreground">
          <div className="h-px flex-1 bg-border" /> o <div className="h-px flex-1 bg-border" />
        </div>

        <form onSubmit={submit} className="space-y-4">
          <Field label="Email" htmlFor="email">
            <Input
              id="email"
              type="email" required value={email} onChange={(e) => setEmail(e.target.value)}
            />
          </Field>
          <Field label="Contraseña" htmlFor="password">
            <Input
              id="password"
              type="password" required minLength={6} value={password} onChange={(e) => setPassword(e.target.value)}
            />
          </Field>
          <Button type="submit" disabled={loading} className="w-full">
            {loading ? "Procesando…" : mode === "signin" ? "Entrar" : "Crear cuenta"}
          </Button>
        </form>

        <GhostButton
          type="button"
          onClick={() => setMode(mode === "signin" ? "signup" : "signin")}
          className="mt-6 w-full text-center normal-case tracking-normal text-xs text-muted-foreground hover:text-foreground"
        >
          {mode === "signin" ? "¿No tienes cuenta? Crear una" : "¿Ya tienes cuenta? Iniciar sesión"}
        </GhostButton>
      </Card>
    </main>
  );
}
