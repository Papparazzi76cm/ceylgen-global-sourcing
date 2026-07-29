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
    const { error } = await supabase.rpc("submit_public_lead", {
      p_name: input.name,
      p_email: input.email,
      p_message: input.message,
      p_company: input.company ?? null,
      p_phone: input.phone ?? null,
      p_country: input.country ?? null,
      p_interest: input.interest ?? null,
      p_lang: input.lang ?? null,
      p_source: input.source ?? "contact-form",
      p_meta: input.meta ?? {},
    } as never);

    if (error) {
      console.error("Lead submission failed", error);
      return { ok: false, error: "submission_failed" };
    }

    return { ok: true };
  } catch (error) {
    console.error("Lead submission failed", error);
    return { ok: false, error: "submission_failed" };
  }
}
