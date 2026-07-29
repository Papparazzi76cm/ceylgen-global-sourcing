import { createFileRoute, Link } from "@tanstack/react-router";
import { useI18n } from "@/i18n/context";
import { Eyebrow, GoldRule, Reveal } from "@/components/site/Reveal";
import { ArrowRight } from "lucide-react";

export const Route = createFileRoute("/$lang/about")({
  head: ({ params }) => {
    const title = params.lang === "en" ? "About CEYLGEN" : params.lang === "fr" ? "À propos de CEYLGEN" : "Sobre CEYLGEN";
    return { meta: [{ title }, { name: "description", content: "CEYLGEN is a Spanish importer and distributor of premium natural resources." }, { property: "og:title", content: title }, { property: "og:url", content: `/${params.lang}/about` }], links: [{ rel: "canonical", href: `/${params.lang}/about` }] };
  },
  component: () => {
    const { t, lang } = useI18n();
    return (
      <>
        <section className="container-page pt-16 md:pt-24 pb-10">
          <Eyebrow>CEYLGEN</Eyebrow>
          <h1 className="mt-4 font-serif text-4xl md:text-6xl max-w-3xl">{t("about.title")}</h1>
          <p className="mt-5 max-w-2xl text-muted-foreground text-lg">{t("about.subtitle")}</p>
        </section>
        <section className="container-page py-10 grid grid-cols-1 lg:grid-cols-2 gap-10">
          <Reveal><p className="text-foreground/90 leading-relaxed">{t("about.p1")}</p></Reveal>
          <Reveal delay={100}><p className="text-foreground/90 leading-relaxed">{t("about.p2")}</p></Reveal>
        </section>
        <section className="container-page py-10">
          <GoldRule className="max-w-xs mb-6" />
          <h2 className="font-serif text-2xl md:text-3xl">{t("about.values")}</h2>
          <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
            {["quality","origin","supply","expertise"].map((k, i) => (
              <Reveal key={k} delay={i * 60}>
                <div className="rounded-lg border border-border p-5 bg-card">
                  <h3 className="font-serif text-lg">{t(`value.${k}.title`)}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{t(`value.${k}.desc`)}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </section>
        <section className="container-page pb-16">
          <Link to="/$lang/contact" params={{ lang }} className="inline-flex items-center gap-1.5 rounded-sm bg-primary px-5 py-3 text-sm font-medium text-primary-foreground hover:bg-primary/90">
            {t("cta.contact")} <ArrowRight className="h-4 w-4" />
          </Link>
        </section>
      </>
    );
  },
});
