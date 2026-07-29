import { createFileRoute } from "@tanstack/react-router";
import { useI18n } from "@/i18n/context";
import { Reveal } from "@/components/site/Reveal";
import { useMemo, useState } from "react";
import { z } from "zod";
import { toast } from "sonner";
import { ArrowRight, Check, FileText, Info, PackageCheck, Handshake } from "lucide-react";
import { categories, categoryName } from "@/data/categories";
import { products } from "@/data/products";
import { cn } from "@/lib/utils";
import { Container, Eyebrow, Field, Label, Input, Textarea, Select, OptionTile, Radio, Checkbox, Button, Card, Alert } from "@/components/ds";

export const Route = createFileRoute("/$lang/contact")({
  head: ({ params }) => {
    const title = params.lang === "en" ? "Contact — CEYLGEN" : params.lang === "fr" ? "Contact — CEYLGEN" : "Contacto — CEYLGEN";
    return { meta: [{ title }, { name: "description", content: "Contact CEYLGEN's commercial team for information, samples and data sheets." }, { property: "og:title", content: title }, { property: "og:url", content: `/${params.lang}/contact` }], links: [{ rel: "canonical", href: `/${params.lang}/contact` }] };
  },
  component: ContactPage,
});

function ContactPage() {
  const { t, lang } = useI18n();
  const [sent, setSent] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const schema = useMemo(() => z.object({
    name: z.string().trim().min(2, t("contact.form.required")).max(120),
    company: z.string().trim().min(1, t("contact.form.required")).max(160),
    job: z.string().trim().max(120).optional().or(z.literal("")),
    country: z.string().trim().min(2, t("contact.form.required")).max(80),
    email: z.string().trim().email(t("contact.form.invalid.email")).max(200),
    phone: z.string().trim().max(60).optional().or(z.literal("")),
    category: z.string().max(80).optional().or(z.literal("")),
    product: z.string().max(160).optional().or(z.literal("")),
    application: z.string().max(160).optional().or(z.literal("")),
    volume: z.string().max(80).optional().or(z.literal("")),
    message: z.string().trim().min(10, t("contact.form.required")).max(2000),
    request: z.enum(["info","sheet","sample","collab"]),
    consent: z.literal(true, { errorMap: () => ({ message: t("contact.form.required") }) }),
    hp: z.string().max(0).optional(), // honeypot
  }), [t]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const data = {
      name: fd.get("name"), company: fd.get("company"), job: fd.get("job"),
      country: fd.get("country"), email: fd.get("email"), phone: fd.get("phone"),
      category: fd.get("category"), product: fd.get("product"), application: fd.get("application"),
      volume: fd.get("volume"), message: fd.get("message"),
      request: fd.get("request") || "info",
      consent: fd.get("consent") === "on",
      hp: fd.get("hp") || "",
    };
    const parsed = schema.safeParse(data);
    if (!parsed.success) {
      const map: Record<string, string> = {};
      for (const iss of parsed.error.issues) map[iss.path[0] as string] = iss.message;
      setErrors(map);
      toast.error(t("contact.form.error"));
      return;
    }
    if (parsed.data.hp) return; // silent drop on bot
    setSubmitting(true);
    const { submitLead } = await import("@/services/leads");
    const result = await submitLead({
      name: parsed.data.name,
      email: parsed.data.email,
      message: parsed.data.message,
      company: parsed.data.company,
      phone: parsed.data.phone || null,
      country: parsed.data.country,
      interest: parsed.data.request,
      lang,
      source: "contact-form",
      meta: {
        job: parsed.data.job || null,
        category: parsed.data.category || null,
        product: parsed.data.product || null,
        application: parsed.data.application || null,
        volume: parsed.data.volume || null,
      },
    });
    setSubmitting(false);
    if (!result.ok) {
      toast.error(t("contact.form.error"), { description: result.error });
      return;
    }
    setSent(true);
    setErrors({});
    toast.success(t("contact.form.success.title"), { description: t("contact.form.success.desc") });
  };

  return (
    <>
      <Container className="pt-16 md:pt-24 pb-8">
        <Eyebrow>{t("nav.contact")}</Eyebrow>
        <h1 className="mt-4 type-display max-w-3xl">{t("contact.title")}</h1>
        <p className="mt-5 max-w-2xl type-lead">{t("contact.subtitle")}</p>
      </Container>

      <Container className="pb-8">
        <h2 className="type-label text-muted-foreground">{t("contact.access.title")}</h2>
        <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-3">
          {[
            { i: Info, k: "info" }, { i: PackageCheck, k: "avail" }, { i: FileText, k: "sheet" }, { i: Handshake, k: "collab" },
          ].map(({ i: Icon, k }) => (
            <a key={k} href={`#request-${k}`} className="group flex items-start gap-3 rounded-sm border border-border bg-card p-4 hover:border-champagne transition-colors">
              <Icon className="h-5 w-5 text-champagne shrink-0 mt-0.5" strokeWidth={1.6} />
              <span className="text-sm font-medium">{t(`contact.access.${k}`)}</span>
            </a>
          ))}
        </div>
      </Container>

      <Container className="pb-24 grid grid-cols-1 lg:grid-cols-[1.5fr_1fr] gap-10">
        <Card className="p-6 md:p-8">
          {sent ? (
            <Reveal>
              <div className="text-center py-8">
                <div className="mx-auto h-14 w-14 rounded-sm bg-turquoise/15 text-turquoise flex items-center justify-center">
                  <Check className="h-6 w-6" strokeWidth={1.6} />
                </div>
                <h3 className="mt-5 type-h2">{t("contact.form.success.title")}</h3>
                <p className="mt-2 text-muted-foreground max-w-md mx-auto">{t("contact.form.success.desc")}</p>
                <button onClick={() => setSent(false)} className="mt-6 text-sm text-primary underline underline-offset-4">{t("common.back")}</button>
              </div>
            </Reveal>
          ) : (
            <form onSubmit={handleSubmit} noValidate className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input type="text" name="hp" tabIndex={-1} autoComplete="off" aria-hidden="true" className="hidden" />
              <Field label={t("contact.form.name")} required error={errors.name}>
                <Input name="name" invalid={!!errors.name} />
              </Field>
              <Field label={t("contact.form.company")} required error={errors.company}>
                <Input name="company" invalid={!!errors.company} />
              </Field>
              <Field label={t("contact.form.job")} error={errors.job}>
                <Input name="job" placeholder={t("contact.form.placeholder.optional")} invalid={!!errors.job} />
              </Field>
              <Field label={t("contact.form.country")} required error={errors.country}>
                <Input name="country" invalid={!!errors.country} />
              </Field>
              <Field label={t("contact.form.email")} required error={errors.email}>
                <Input name="email" type="email" invalid={!!errors.email} />
              </Field>
              <Field label={t("contact.form.phone")} error={errors.phone}>
                <Input name="phone" type="tel" placeholder={t("contact.form.placeholder.optional")} invalid={!!errors.phone} />
              </Field>

              <Field label={t("contact.form.category")}>
                <Select name="category">
                  <option value="">—</option>
                  {categories.map((c) => <option key={c.slug} value={c.slug}>{categoryName(lang, c)}</option>)}
                </Select>
              </Field>
              <Field label={t("contact.form.product")}>
                <Select name="product">
                  <option value="">—</option>
                  {products.map((p) => <option key={p.slug} value={p.slug}>{p.code} — {p.i18n[lang].name}</option>)}
                </Select>
              </Field>
              <Field label={t("contact.form.application")}>
                <Input name="application" placeholder={t("contact.form.placeholder.optional")} />
              </Field>
              <Field label={t("contact.form.volume")}>
                <Input name="volume" placeholder={t("contact.form.placeholder.optional")} />
              </Field>

              <div className="md:col-span-2">
                <Label>{t("contact.form.request")} *</Label>
                <div id="request-info" className="mt-2 grid grid-cols-2 md:grid-cols-4 gap-2">
                  {(["info","sheet","sample","collab"] as const).map((r, i) => (
                    <OptionTile key={r} id={`request-${r === "info" ? "info" : r === "sheet" ? "sheet" : r === "sample" ? "avail" : "collab"}`}>
                      <Radio name="request" value={r} defaultChecked={i === 0} />
                      <span>{t(`contact.form.request.${r}`)}</span>
                    </OptionTile>
                  ))}
                </div>
              </div>

              <Field label={t("contact.form.message")} required error={errors.message} className="md:col-span-2">
                <Textarea name="message" rows={5} invalid={!!errors.message} />
              </Field>

              <div className="md:col-span-2">
                <label className="flex items-start gap-2 text-sm">
                  <Checkbox name="consent" className="mt-1" />
                  <span>{t("contact.form.consent")}</span>
                </label>
                {errors.consent && <p className="mt-1 type-small text-destructive">{errors.consent}</p>}
              </div>

              <div className="md:col-span-2">
                <Button disabled={submitting} type="submit" variant="primary">
                  {submitting ? t("contact.form.sending") : t("contact.form.submit")}
                  <ArrowRight className="h-4 w-4" strokeWidth={1.6} />
                </Button>
              </div>
            </form>
          )}
        </Card>

        <aside className="space-y-4">
          <Card className="p-6">
            <h3 className="type-h3">CEYLGEN</h3>
            <p className="mt-2 text-sm text-muted-foreground">{t("footer.desc")}</p>
            <div className="mt-4 h-px bg-border" />
            <p className="mt-4 type-small text-muted-foreground">{t("footer.contact.note")}</p>
          </Card>
          <Alert tone="info" className="border-champagne/40 bg-champagne/5">
            <span className="text-sm text-foreground">{t("common.available_on_request")}</span>
          </Alert>
        </aside>
      </Container>
    </>
  );
}
