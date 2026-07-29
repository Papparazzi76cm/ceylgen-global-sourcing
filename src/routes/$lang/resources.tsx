import { createFileRoute, Link } from "@tanstack/react-router";
import { useI18n } from "@/i18n/context";
import { products } from "@/data/products";
import { Reveal } from "@/components/site/Reveal";
import { FileText, Mail } from "lucide-react";
import { useState } from "react";
import { Container, Eyebrow, Select, Button, ResourceCard, EmptyState, TextLink } from "@/components/ds";

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
        <Container className="pt-16 md:pt-24 pb-8">
          <Eyebrow>{t("nav.resources")}</Eyebrow>
          <h1 className="mt-4 type-display max-w-3xl">{t("resources.title")}</h1>
          <p className="mt-5 max-w-2xl type-lead">{t("resources.subtitle")}</p>
        </Container>
        <Container className="pb-16">
          <div className="rounded-sm border border-border bg-card p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
            <Select value={type} onChange={(e) => setType(e.target.value as any)}>
              <option value="all">{t("resources.filter.type")}: {t("catalog.filter.all")}</option>
              <option value="datasheet">{t("resources.type.datasheet")}</option>
              <option value="catalog">{t("resources.type.catalog")}</option>
              <option value="guide">{t("resources.type.guide")}</option>
              <option value="faq">{t("resources.type.faq")}</option>
            </Select>
            <Select value={dl} onChange={(e) => setDl(e.target.value as any)}>
              <option value="all">{t("resources.filter.lang")}: {t("catalog.filter.all")}</option>
              <option value="es">ES · Español</option>
              <option value="en">EN · English</option>
              <option value="fr">FR · Français</option>
            </Select>
          </div>

          {filtered.length === 0 ? (
            <EmptyState
              className="mt-10"
              icon={<Mail className="h-5 w-5" />}
              title={t("resources.empty")}
              action={
                <Button asChild variant="primary">
                  <Link to="/$lang/contact" params={{ lang }}>{t("nav.contact")}</Link>
                </Button>
              }
            />
          ) : (
            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
              {filtered.map((d, i) => (
                <Reveal key={`${d.code}-${d.lang}`} delay={i * 30}>
                  <ResourceCard
                    icon={<FileText className="h-5 w-5" />}
                    title={d.title}
                    meta={
                      <span className="flex items-center gap-2">
                        <span>{t(`resources.type.${d.type}`)}</span>
                        <span>·</span>
                        <span>{d.code}</span>
                        <span>·</span>
                        <span>{d.lang.toUpperCase()}</span>
                      </span>
                    }
                    action={
                      <TextLink asChild>
                        <Link to="/$lang/contact" params={{ lang }}>{t("resources.request")}</Link>
                      </TextLink>
                    }
                  />
                </Reveal>
              ))}
            </div>
          )}
        </Container>
      </>
    );
  },
});
