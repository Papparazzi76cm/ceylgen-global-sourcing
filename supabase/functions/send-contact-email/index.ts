const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface ContactLead {
  name: string;
  email: string;
  message: string;
  company?: string | null;
  phone?: string | null;
  country?: string | null;
  interest?: string | null;
  lang?: string | null;
  source?: string | null;
  meta?: Record<string, unknown> | null;
}

function escapeHtml(value: unknown): string {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function textValue(value: unknown): string {
  const text = String(value ?? "").trim();
  return text || "—";
}

function confirmationCopy(lang?: string | null) {
  if (lang === "fr") {
    return {
      subject: "Nous avons reçu votre demande — CEYLGEN",
      title: "Merci de nous avoir contactés",
      body: "Nous avons bien reçu votre demande. Notre équipe commerciale vous répondra dans les plus brefs délais.",
      closing: "Cordialement,",
    };
  }

  if (lang === "es") {
    return {
      subject: "Hemos recibido tu consulta — CEYLGEN",
      title: "Gracias por contactar con nosotros",
      body: "Hemos recibido correctamente tu consulta. Nuestro equipo comercial responderá lo antes posible.",
      closing: "Atentamente,",
    };
  }

  return {
    subject: "We have received your enquiry — CEYLGEN",
    title: "Thank you for contacting us",
    body: "We have received your enquiry. Our commercial team will respond as soon as possible.",
    closing: "Kind regards,",
  };
}

async function sendEmail(
  apiKey: string,
  payload: Record<string, unknown>,
): Promise<void> {
  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const details = await response.text();
    throw new Error(`Resend error ${response.status}: ${details}`);
  }
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    if (req.method !== "POST") {
      return new Response(JSON.stringify({ error: "Method not allowed" }), {
        status: 405,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const resendApiKey = Deno.env.get("RESEND_API_KEY");
    const fromEmail = Deno.env.get("CONTACT_FROM_EMAIL");
    const toEmail = Deno.env.get("CONTACT_TO_EMAIL") ?? "info@ceylgen.com";

    if (!resendApiKey || !fromEmail) {
      throw new Error("Missing RESEND_API_KEY or CONTACT_FROM_EMAIL secret");
    }

    const lead = (await req.json()) as ContactLead;

    if (
      !lead.name?.trim() ||
      !lead.email?.trim() ||
      !lead.message?.trim() ||
      !lead.company?.trim()
    ) {
      return new Response(JSON.stringify({ error: "Missing required contact fields" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const meta = lead.meta ?? {};
    const receivedAt = new Intl.DateTimeFormat("es-ES", {
      dateStyle: "full",
      timeStyle: "long",
      timeZone: "Europe/Madrid",
    }).format(new Date());

    const internalHtml = `
      <div style="font-family:Arial,sans-serif;max-width:680px;margin:auto;color:#17252a">
        <h1 style="font-size:24px;margin-bottom:8px">Nueva consulta desde la web de CEYLGEN</h1>
        <p style="color:#52666d;margin-top:0">Recibida el ${escapeHtml(receivedAt)}</p>
        <table style="width:100%;border-collapse:collapse;margin-top:24px">
          ${[
            ["Nombre", lead.name],
            ["Empresa", lead.company],
            ["Cargo", meta.job],
            ["Email", lead.email],
            ["Teléfono", lead.phone],
            ["País", lead.country],
            ["Tipo de solicitud", lead.interest],
            ["Categoría", meta.category],
            ["Producto", meta.product],
            ["Aplicación", meta.application],
            ["Volumen", meta.volume],
            ["Idioma", lead.lang],
            ["Origen", lead.source],
          ]
            .map(
              ([label, value]) => `
                <tr>
                  <td style="padding:10px;border-bottom:1px solid #e5e7eb;font-weight:bold;width:35%">${escapeHtml(label)}</td>
                  <td style="padding:10px;border-bottom:1px solid #e5e7eb">${escapeHtml(textValue(value))}</td>
                </tr>`,
            )
            .join("")}
        </table>
        <h2 style="font-size:18px;margin-top:28px">Mensaje</h2>
        <div style="padding:16px;background:#f4f7f7;border-left:4px solid #16a6a1;white-space:pre-wrap">${escapeHtml(lead.message)}</div>
        <p style="margin-top:24px"><a href="mailto:${escapeHtml(lead.email)}" style="color:#087f7b">Responder a ${escapeHtml(lead.email)}</a></p>
      </div>`;

    await sendEmail(resendApiKey, {
      from: fromEmail,
      to: [toEmail],
      reply_to: lead.email,
      subject: `Nueva consulta web — ${lead.company} — ${lead.name}`,
      html: internalHtml,
    });

    const copy = confirmationCopy(lead.lang);
    const confirmationHtml = `
      <div style="font-family:Arial,sans-serif;max-width:620px;margin:auto;color:#17252a">
        <h1 style="font-size:24px">${escapeHtml(copy.title)}</h1>
        <p>${escapeHtml(copy.body)}</p>
        <p>${escapeHtml(copy.closing)}<br><strong>CEYLGEN Global Sourcing</strong></p>
      </div>`;

    await sendEmail(resendApiKey, {
      from: fromEmail,
      to: [lead.email],
      reply_to: toEmail,
      subject: copy.subject,
      html: confirmationHtml,
    });

    return new Response(JSON.stringify({ ok: true }), {
      status: 200,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error(error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : "Unknown error" }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      },
    );
  }
});
