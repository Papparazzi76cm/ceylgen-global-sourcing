import { supabase } from "@/integrations/supabase/client";

export interface LeadInput {
  name: string;
  email: string;
  message: string;
  company?: string | null;
  phone?: string | null;
  country?: string | null;
  interest?: string | null;
  lang?: string | null;
  source?: string;
  meta?: Record<string, unknown>;
}

export async function submitLead(input: LeadInput): Promise<{ ok: boolean; error?: string }> {
  try {
    const lead = {
      name: input.name,
      email: input.email,
      message: input.message,
      company: input.company ?? null,
      phone: input.phone ?? null,
      country: input.country ?? null,
      interest: input.interest ?? null,
      lang: input.lang ?? null,
      source: input.source ?? "contact-form",
      meta: (input.meta ?? {}) as never,
    };

    const { error: insertError } = await supabase.from("leads").insert(lead);
    if (insertError) return { ok: false, error: insertError.message };

    const { error: emailError } = await supabase.functions.invoke("send-contact-email", {
      body: lead,
    });

    if (emailError) {
      console.error("Lead saved, but email notification failed:", emailError);
      return {
        ok: false,
        error: "Your enquiry was saved, but the email notification could not be sent.",
      };
    }

    return { ok: true };
  } catch (e) {
    return { ok: false, error: e instanceof Error ? e.message : "unknown" };
  }
}
