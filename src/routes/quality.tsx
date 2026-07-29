import { createFileRoute, Link } from "@tanstack/react-router";
import { useI18n } from "@/i18n/context";
import { Reveal } from "@/components/site/Reveal";
import { PageHeader, Section, SectionHeader, Grid, Card, CardBody, CardTitle, Alert, Button, GoldRule } from "@/components/ds";
import { ArrowRight, Info } from "lucide-react";

export const Route = createFileRoute("/quality")({
  head: ({ params }) => {
    const title = params.lang === "en" ? "Quality — CEYLGEN" : params.lang === "fr" ? "Qualité — CEYLGEN" : "Calidad — CEYLGEN";
    return { meta: [{ title }, { name: "description", content: "CEYLGEN quality and compliance approach: supplier selection, documentation and traceability." }, { property: "og:title", content: title }, { property: "og:url", content: `/${params.lang}/quality` }], links: [{ rel: "canonical", href: `/${params.lang}/quality` }] };
  },
  component: () => {
    const { t, lang } = useI18n();
    const items = ["spec","methods","sheets","trace","suppliers","control"];
    return (
      <>
        <PageHeader eyebrow={t("quality.eyebrow")} title={t("quality.page.title")} lead={t("quality.page.subtitle")} />
        <Section size="sm">
          <SectionHeader title={t("quality.page.principles")} />
          <div className="mt-8">
            <Grid cols={3}>
              {items.map((k, i) => (
                <Reveal key={k} delay={i * 40}>
                  <Card className="h-full">
                    <CardBody>
                      <div className="h-1 w-8 bg-champagne mb-3" />
                      <CardTitle>{t(`quality.${k}`)}</CardTitle>
                    </CardBody>
                  </Card>
                </Reveal>
              ))}
            </Grid>
          </div>
        </Section>
        <Section size="sm">
          <Alert tone="info" icon={<Info />}>
            {t("quality.page.note")}
          </Alert>
        </Section>
        <Section>
          <GoldRule className="max-w-xs mb-6" />
          <div className="flex flex-wrap gap-3">
            <Button variant="primary" asChild>
              <Link to="/$lang/contact" params={{ lang }}>
                {t("cta.sheet")} <ArrowRight />
              </Link>
            </Button>
          </div>
        </Section>
      </>
    );
  },
});
