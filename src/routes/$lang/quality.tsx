import { createFileRoute, Link } from "@tanstack/react-router";
import { useI18n } from "@/i18n/context";
import { Eyebrow, GoldRule, Reveal } from "@/components/site/Reveal";
import { ArrowRight, Info } from "lucide-react";

export const Route = createFileRoute("/$lang/quality")({
  head: ({ params }) => {
    const title = params.lang === "en" ? "Quality — CEYLGEN" : params.lang === "fr" ? "Qualité — CEYLGEN" : "Calidad — CEYLGEN";
    return { meta: [{ title }, { name: "description", content: "CEYLGEN quality and compliance approach: supplier selection, documentation and traceability." }, { property: "og:title", content: title }, { property: "og:url", content: `/${params.lang}/quality` }], links: [{ rel: "canonical", href: `/${params.lang}/quality` }] };
  },
  component: () => {
    const { t, lang } = useI18n();
    const items = ["spec","methods","sheets","trace","suppliers","control"];
    return (
      <>
        <section className="container-page pt-16 md:pt-24 pb-10">
          <Eyebrow>{t("quality.eyebrow")}</Eyebrow>
          <h1 className="mt-4 font-serif text-4xl md:text-6xl max-w-3xl">{t("quality.page.title")}</h1>
          <p className="mt-5 max-w-2xl text-muted-foreground">{t("quality.page.subtitle")}</p>
        </section>
        <section className="container-page pb-8">
          <h2 className="font-serif text-2xl md:text-3xl">{t("quality.page.principles")}</h2>
          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {items.map((k, i) => (
              <Reveal key={k} delay={i * 40}>
                <div className="rounded-lg border border-border bg-card p-5">
                  <div className="h-1 w-8 bg-champagne mb-3" />
                  <h3 className="font-serif text-lg">{t(`quality.${k}`)}</h3>
                </div>
              </Reveal>
            ))}
          </div>
        </section>
        <section className="container-page py-10">
          <div className="rounded-lg border border-champagne/40 bg-champagne/5 p-5 flex items-start gap-3">
            <Info className="h-4 w-4 text-champagne mt-0.5" />
            <p className="text-sm text-foreground/85">{t("quality.page.note")}</p>
          </div>
        </section>
        <section className="container-page pb-16">
          <GoldRule className="max-w-xs mb-6" />
          <div className="flex flex-wrap gap-3">
            <Link to="/$lang/contact" params={{ lang }} className="inline-flex items-center gap-1.5 rounded-sm bg-primary px-5 py-3 text-sm font-medium text-primary-foreground hover:bg-primary/90">{t("cta.sheet")} <ArrowRight className="h-4 w-4" /></Link>
          </div>
        </section>
      </>
    );
  },
});
