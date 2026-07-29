import { createServerFn } from "@tanstack/react-start";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";
import { createHash, timingSafeEqual } from "node:crypto";

function safeEqual(a: string, b: string): boolean {
  const ha = createHash("sha256").update(a, "utf8").digest();
  const hb = createHash("sha256").update(b, "utf8").digest();
  return timingSafeEqual(ha, hb);
}

/**
 * Bootstrap the first admin. Only works when NO admin exists yet.
 * Requires the caller to be authenticated and to supply ADMIN_BOOTSTRAP_SECRET.
 * After the first admin is created, this endpoint becomes inert.
 */
export const bootstrapFirstAdmin = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((data: { secret: string }) => {
    if (!data || typeof data.secret !== "string" || data.secret.length < 8) {
      throw new Error("Missing bootstrap secret");
    }
    return data;
  })
  .handler(async ({ data, context }) => {
    const expected = process.env.ADMIN_BOOTSTRAP_SECRET;
    if (!expected) throw new Error("ADMIN_BOOTSTRAP_SECRET no configurado");
    if (!safeEqual(data.secret, expected)) throw new Error("Clave de bootstrap inválida");

    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");

    // Guard: only allow if there are no admins yet
    const { count, error: countErr } = await supabaseAdmin
      .from("user_roles")
      .select("id", { count: "exact", head: true })
      .eq("role", "admin");
    if (countErr) throw countErr;
    if ((count ?? 0) > 0) throw new Error("Ya existe un administrador");

    const { error: insErr } = await supabaseAdmin
      .from("user_roles")
      .insert({ user_id: context.userId, role: "admin" });
    if (insErr) throw insErr;

    return { ok: true as const };
  });
