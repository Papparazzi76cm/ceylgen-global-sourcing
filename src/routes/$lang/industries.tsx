import { createFileRoute, Link } from "@tanstack/react-router";
import { useI18n } from "@/i18n/context";
import { Eyebrow, Reveal } from "@/components/site/Reveal";
import { Droplet, Wind, Filter, Utensils, Sprout, Anchor, Sailboat, Globe2, ArrowRight } from "lucide-react";

export const Route = createFileRoute("/$lang/industries")({
  head: ({ params }) => {
    const title = params.lang === "en" ? "Industries — CEYLGEN" : params.lang === "fr" ? "Industries — CEYLGEN" : "Industrias — CEYLGEN";
    return { meta: [{ title }, { name: "description", content: "Industries and applications served by CEYLGEN's premium natural resources." }, { property: "og:title", content: title }, { property: "og:url", content: `/${params.lang}/industries` }], links: [{ rel: "canonical", href: `/${params.lang}/industries` }] };
  },
  component: () => {
    const { t, lang } = useI18n();
    const blocks = [
      { i: Droplet, k: "water" }, { i: Wind, k: "air" }, { i: Filter, k: "filter" }, { i: Utensils, k: "food" },
      { i: Sprout, k: "agri" }, { i: Anchor, k: "marine" }, { i: Sailboat, k: "yacht" }, { i: Globe2, k: "distribution" },
    ];
    return (
      <>
        <section className="container-page pt-16 md:pt-24 pb-8">
          <Eyebrow>{t("industries.eyebrow")}</Eyebrow>
          <h1 className="mt-4 font-serif text-4xl md:text-6xl max-w-3xl">{t("industries.page.title")}</h1>
          <p className="mt-5 max-w-2xl text-muted-foreground">{t("industries.page.subtitle")}</p>
        </section>
        <section className="container-page pb-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {blocks.map(({ i: Icon, k }, idx) => (
            <Reveal key={k} delay={idx * 40}>
              <article className="group h-full rounded-lg border border-border bg-card p-6 hover:border-champagne hover:shadow-[var(--shadow-soft)] transition-all">
                <div className="h-11 w-11 rounded-sm border border-champagne/50 flex items-center justify-center text-champagne"><Icon className="h-5 w-5" strokeWidth={1.6} /></div>
                <h3 className="mt-5 font-serif text-xl">{t(`industries.${k}`)}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{t("common.available_on_request")}</p>
                <Link to="/$lang/products" params={{ lang }} className="mt-4 inline-flex items-center gap-1 text-sm text-primary hover:gap-2 transition-all">
                  {t("industries.page.related")} <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </article>
            </Reveal>
          ))}
        </section>
      </>
    );
  },
});
