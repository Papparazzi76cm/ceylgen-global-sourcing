import { createFileRoute } from "@tanstack/react-router";
import { useI18n } from "@/i18n/context";
import { Eyebrow, Reveal } from "@/components/site/Reveal";

export const Route = createFileRoute("/$lang/sustainability")({
  head: ({ params }) => {
    const title = params.lang === "en" ? "Sustainability — CEYLGEN" : params.lang === "fr" ? "Durabilité — CEYLGEN" : "Sostenibilidad — CEYLGEN";
    return { meta: [{ title }, { name: "description", content: "CEYLGEN's sober and verifiable approach to sustainability." }, { property: "og:title", content: title }, { property: "og:url", content: `/${params.lang}/sustainability` }], links: [{ rel: "canonical", href: `/${params.lang}/sustainability` }] };
  },
  component: () => {
    const { t } = useI18n();
    const items = ["natural","selection","relations","logistics","transparency","improve"];
    return (
      <>
        <section className="container-page pt-16 md:pt-24 pb-10">
          <Eyebrow>{t("sust.eyebrow")}</Eyebrow>
          <h1 className="mt-4 font-serif text-4xl md:text-6xl max-w-3xl">{t("sust.page.title")}</h1>
          <p className="mt-5 max-w-2xl text-muted-foreground">{t("sust.page.subtitle")}</p>
        </section>
        <section className="container-page pb-20 grid grid-cols-1 md:grid-cols-2 gap-4">
          {items.map((k, i) => (
            <Reveal key={k} delay={i * 40}>
              <div className="rounded-lg border border-border bg-card p-6 border-l-4 border-l-forest">
                <h3 className="font-serif text-lg">{t(`sust.${k}`)}</h3>
              </div>
            </Reveal>
          ))}
        </section>
      </>
    );
  },
});
