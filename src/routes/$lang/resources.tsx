import { createFileRoute, Link } from "@tanstack/react-router";
import { useI18n } from "@/i18n/context";
import { products } from "@/data/products";
import { Eyebrow, Reveal } from "@/components/site/Reveal";
import { FileText, Mail } from "lucide-react";
import { useState } from "react";

type DocType = "datasheet" | "catalog" | "guide" | "faq";
interface Doc { productSlug?: string; code: string; title: string; type: DocType; lang: "es" | "en" | "fr"; }

export const Route = createFileRoute("/$lang/resources")({
  head: ({ params }) => {
    const title = params.lang === "en" ? "Resources — CEYLGEN" : params.lang === "fr" ? "Ressources — CEYLGEN" : "Recursos — CEYLGEN";
    return { meta: [{ title }, { name: "description", content: "Technical documentation, data sheets and catalogues by CEYLGEN, on request." }, { property: "og:title", content: title }, { property: "og:url", content: `/${params.lang}/resources` }], links: [{ rel: "canonical", href: `/${params.lang}/resources` }] };
  },
  component: () => {
    const { t, lang } = useI18n();
    const [type, setType] = useState<"all" | DocType>("all");
    const [dl, setDl] = useState<"all" | "es" | "en" | "fr">(lang);
    const docs: Doc[] = products
      .filter((p) => p.hasTechnicalSheet)
      .flatMap<Doc>((p) => (["es", "en", "fr"] as const).map((l) => ({
        productSlug: p.slug, code: p.code, title: p.i18n[l].name, type: "datasheet" as DocType, lang: l,
      })));
    const filtered = docs.filter((d) => (type === "all" || d.type === type) && (dl === "all" || d.lang === dl));

    return (
      <>
        <section className="container-page pt-16 md:pt-24 pb-8">
          <Eyebrow>{t("nav.resources")}</Eyebrow>
          <h1 className="mt-4 font-serif text-4xl md:text-6xl max-w-3xl">{t("resources.title")}</h1>
          <p className="mt-5 max-w-2xl text-muted-foreground">{t("resources.subtitle")}</p>
        </section>
        <section className="container-page pb-16">
          <div className="rounded-lg border border-border bg-card p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
            <select value={type} onChange={(e) => setType(e.target.value as any)} className="h-11 rounded-sm border border-input bg-background px-3 text-sm">
              <option value="all">{t("resources.filter.type")}: {t("catalog.filter.all")}</option>
              <option value="datasheet">{t("resources.type.datasheet")}</option>
              <option value="catalog">{t("resources.type.catalog")}</option>
              <option value="guide">{t("resources.type.guide")}</option>
              <option value="faq">{t("resources.type.faq")}</option>
            </select>
            <select value={dl} onChange={(e) => setDl(e.target.value as any)} className="h-11 rounded-sm border border-input bg-background px-3 text-sm">
              <option value="all">{t("resources.filter.lang")}: {t("catalog.filter.all")}</option>
              <option value="es">ES · Español</option>
              <option value="en">EN · English</option>
              <option value="fr">FR · Français</option>
            </select>
          </div>

          {filtered.length === 0 ? (
            <div className="mt-10 rounded-lg border border-dashed border-border p-16 text-center">
              <Mail className="mx-auto h-6 w-6 text-champagne" />
              <p className="mt-4 text-muted-foreground max-w-md mx-auto">{t("resources.empty")}</p>
              <Link to="/$lang/contact" params={{ lang }} className="mt-6 inline-flex rounded-sm bg-primary px-5 py-3 text-sm text-primary-foreground hover:bg-primary/90">{t("nav.contact")}</Link>
            </div>
          ) : (
            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
              {filtered.map((d, i) => (
                <Reveal key={`${d.code}-${d.lang}`} delay={i * 30}>
                  <article className="flex items-start gap-4 rounded-lg border border-border bg-card p-5">
                    <div className="h-11 w-11 rounded-sm bg-champagne/10 text-champagne flex items-center justify-center shrink-0"><FileText className="h-5 w-5" /></div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
                        <span>{t(`resources.type.${d.type}`)}</span>
                        <span>·</span>
                        <span>{d.code}</span>
                        <span>·</span>
                        <span>{d.lang.toUpperCase()}</span>
                      </div>
                      <h3 className="mt-1 font-serif text-base line-clamp-2">{d.title}</h3>
                      <Link to="/$lang/contact" params={{ lang }} className="mt-3 inline-flex items-center gap-1 text-sm text-primary hover:underline">{t("resources.request")}</Link>
                    </div>
                  </article>
                </Reveal>
              ))}
            </div>
          )}
        </section>
      </>
    );
  },
});
