import { createFileRoute, Link } from "@tanstack/react-router";
import { useI18n } from "@/i18n/context";
import { Reveal } from "@/components/site/Reveal";
import { PageHeader, Section, Grid, Card, CardBody, CardTitle, CardText, GoldRule, Button } from "@/components/ds";
import { ArrowRight } from "lucide-react";

export const Route = createFileRoute("/about")({
  head: ({ params }) => {
    const title = params.lang === "en" ? "About CEYLGEN" : params.lang === "fr" ? "À propos de CEYLGEN" : "Sobre CEYLGEN";
    return { meta: [{ title }, { name: "description", content: "CEYLGEN is a Spanish importer and distributor of premium natural resources." }, { property: "og:title", content: title }, { property: "og:url", content: `/${params.lang}/about` }], links: [{ rel: "canonical", href: `/${params.lang}/about` }] };
  },
  component: () => {
    const { t, lang } = useI18n();
    return (
      <>
        <PageHeader eyebrow="CEYLGEN" title={t("about.title")} lead={t("about.subtitle")} />
        <Section size="sm">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            <Reveal><p className="type-body text-foreground/90">{t("about.p1")}</p></Reveal>
            <Reveal delay={100}><p className="type-body text-foreground/90">{t("about.p2")}</p></Reveal>
          </div>
        </Section>
        <Section size="sm">
          <GoldRule className="max-w-xs mb-6" />
          <h2 className="type-h2">{t("about.values")}</h2>
          <div className="mt-8">
            <Grid cols={4}>
              {["quality","origin","supply","expertise"].map((k, i) => (
                <Reveal key={k} delay={i * 60}>
                  <Card className="h-full">
                    <CardBody>
                      <CardTitle>{t(`value.${k}.title`)}</CardTitle>
                      <CardText>{t(`value.${k}.desc`)}</CardText>
                    </CardBody>
                  </Card>
                </Reveal>
              ))}
            </Grid>
          </div>
        </Section>
        <Section size="sm">
          <Button variant="primary" asChild>
            <Link to="/$lang/contact" params={{ lang }}>
              {t("cta.contact")} <ArrowRight />
            </Link>
          </Button>
        </Section>
      </>
    );
  },
});
