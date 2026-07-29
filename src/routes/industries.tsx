import { createFileRoute } from "@tanstack/react-router";
import { useI18n } from "@/i18n/context";
import { Reveal } from "@/components/site/Reveal";
import { PageHeader, Section, Grid, FeatureCard, TextLink } from "@/components/ds";
import { Droplet, Wind, Filter, Utensils, Sprout, Anchor, Sailboat, Globe2, ArrowRight } from "lucide-react";

export const Route = createFileRoute("/industries")({
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
        <PageHeader eyebrow={t("industries.eyebrow")} title={t("industries.page.title")} lead={t("industries.page.subtitle")} />
        <Section>
          <Grid cols={3}>
            {blocks.map(({ i: Icon, k }, idx) => (
              <Reveal key={k} delay={idx * 40}>
                <FeatureCard
                  icon={<Icon />}
                  title={t(`industries.${k}`)}
                  description={t("common.available_on_request")}
                  footer={
                    <TextLink asChild>
                      <a href={`/${lang}/products`}>
                        {t("industries.page.related")} <ArrowRight />
                      </a>
                    </TextLink>
                  }
                />
              </Reveal>
            ))}
          </Grid>
        </Section>
      </>
    );
  },
});
