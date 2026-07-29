import { createFileRoute } from "@tanstack/react-router";
import { useI18n } from "@/i18n/context";
import { Reveal } from "@/components/site/Reveal";
import { PageHeader, Section, Grid, Card, CardBody, CardTitle } from "@/components/ds";

export const Route = createFileRoute("/sustainability")({
  head: ({ params }) => {
    const title = params.lang === "en" ? "Sustainability — CEYLGEN" : params.lang === "fr" ? "Durabilité — CEYLGEN" : "Sostenibilidad — CEYLGEN";
    return { meta: [{ title }, { name: "description", content: "CEYLGEN's sober and verifiable approach to sustainability." }, { property: "og:title", content: title }, { property: "og:url", content: `/${params.lang}/sustainability` }], links: [{ rel: "canonical", href: `/${params.lang}/sustainability` }] };
  },
  component: () => {
    const { t } = useI18n();
    const items = ["natural","selection","relations","logistics","transparency","improve"];
    return (
      <>
        <PageHeader eyebrow={t("sust.eyebrow")} title={t("sust.page.title")} lead={t("sust.page.subtitle")} />
        <Section>
          <Grid cols={2}>
            {items.map((k, i) => (
              <Reveal key={k} delay={i * 40}>
                <Card className="border-l-4 border-l-forest h-full">
                  <CardBody>
                    <CardTitle>{t(`sust.${k}`)}</CardTitle>
                  </CardBody>
                </Card>
              </Reveal>
            ))}
          </Grid>
        </Section>
      </>
    );
  },
});
