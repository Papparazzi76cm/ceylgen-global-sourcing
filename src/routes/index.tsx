import { createFileRoute, Link } from "@tanstack/react-router";
import { useI18n } from "@/i18n/context";
import { categories, categoryName } from "@/data/categories";
import { WorldMap } from "@/components/site/WorldMap";
import { HexParticles } from "@/components/site/HexParticles";
import { Reveal } from "@/components/site/Reveal";
import heroImg from "@/assets/hero-global.jpg";
import { ArrowRight, Award, Leaf, Ship, Wrench, Droplet, Wind, Filter, Utensils, Sprout, Anchor, Sailboat, Globe2 } from "lucide-react";
import {
  Eyebrow,
  GoldRule,
  Section,
  SectionHeader,
  Grid,
  FeatureCard,
  MediaCard,
  CTASection,
  Button,
  TextLink,
} from "@/components/ds";

export const Route = createFileRoute("/")({
  head: ({ params }) => {
    const l = params.lang;
    const title =
      l === "en" ? "CEYLGEN — Premium Natural Resources" :
      l === "fr" ? "CEYLGEN — Ressources naturelles premium" :
      "CEYLGEN — Recursos naturales premium";
    const desc =
      l === "en" ? "Spanish international importer sourcing premium raw materials from Sri Lanka for water, air, agriculture, food and marine industries." :
      l === "fr" ? "Importateur international espagnol de matières premières premium sourcées au Sri Lanka pour les industries de l'eau, l'air, l'agriculture et la marine." :
      "Importador internacional español de materias primas premium desde Sri Lanka para industrias de agua, aire, agricultura, alimentación e industria naval.";
    return {
      meta: [
        { title }, { name: "description", content: desc },
        { property: "og:title", content: title },
        { property: "og:description", content: desc },
        { property: "og:url", content: `/${l}` },
      ],
      links: [{ rel: "canonical", href: `/${l}` }],
      scripts: [{
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org", "@type": "Organization",
          name: "CEYLGEN", description: desc, url: `/${l}`,
          address: { "@type": "PostalAddress", addressCountry: "ES" },
        }),
      }],
    };
  },
  component: HomePage,
});

function HomePage() {
  const { t, lang } = useI18n();
  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <img src={heroImg} alt="" className="h-full w-full object-cover" width={1920} height={1200} />
          <div className="absolute inset-0" style={{ background: "var(--gradient-hero)" }} />
        </div>
        <HexParticles className="absolute inset-0 h-full w-full pointer-events-none opacity-70" />
        <div className="relative container-page pt-28 md:pt-40 pb-24 md:pb-36">
          <div className="max-w-3xl animate-fade-up">
            <Eyebrow onDark>{t("hero.eyebrow")}</Eyebrow>
            <h1 className="mt-6 type-display text-ivory">
              {t("hero.title")}
            </h1>
            <p className="mt-6 max-w-2xl type-lead text-ivory/85">
              {t("hero.subtitle")}
            </p>
            <div className="mt-10 flex flex-wrap items-center gap-3">
              <Button variant="gold" size="lg" asChild className="shadow-[var(--shadow-glow)]">
                <Link to="/$lang/products" params={{ lang }}>
                  {t("hero.cta.primary")}
                  <ArrowRight />
                </Link>
              </Button>
              <Button variant="inverse" size="lg" asChild>
                <Link to="/$lang/contact" params={{ lang }}>
                  {t("hero.cta.secondary")}
                </Link>
              </Button>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-b from-transparent to-background pointer-events-none" />
      </section>

      {/* VALUE */}
      <Section>
        <Reveal>
          <SectionHeader eyebrow={t("value.eyebrow")} title={t("value.title")} />
        </Reveal>
        <div className="mt-14">
          <Grid cols={4}>
            {[
              { i: Award, k: "quality" },
              { i: Leaf, k: "origin" },
              { i: Ship, k: "supply" },
              { i: Wrench, k: "expertise" },
            ].map(({ i: Icon, k }, idx) => (
              <Reveal key={k} delay={idx * 80}>
                <FeatureCard
                  icon={<Icon />}
                  title={t(`value.${k}.title`)}
                  description={t(`value.${k}.desc`)}
                />
              </Reveal>
            ))}
          </Grid>
        </div>
      </Section>

      {/* LINES */}
      <Section>
        <Reveal>
          <SectionHeader eyebrow={t("lines.eyebrow")} title={t("lines.title")} />
        </Reveal>
        <div className="mt-14">
          <Grid cols={2}>
            {categories.map((c, idx) => (
              <Reveal key={c.slug} delay={idx * 60}>
                <Link to="/$lang/categories/$category" params={{ lang, category: c.slug }} className="block">
                  <MediaCard
                    image={c.image}
                    alt={categoryName(lang, c)}
                    title={categoryName(lang, c)}
                    description={t(c.descKey)}
                    action={
                      <span className="inline-flex items-center gap-1.5 type-label text-champagne group-hover:gap-2.5 transition-all">
                        {t("lines.explore")} <ArrowRight className="size-3.5" />
                      </span>
                    }
                  />
                </Link>
              </Reveal>
            ))}
          </Grid>
        </div>
      </Section>

      {/* SOURCING */}
      <Section tone="muted" bordered>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
          <Reveal>
            <Eyebrow>{t("sourcing.eyebrow")}</Eyebrow>
            <h2 className="mt-5 type-h2">{t("sourcing.title")}</h2>
            <p className="mt-5 type-lead max-w-lg">{t("sourcing.desc")}</p>
            <ul className="mt-8 space-y-3">
              {[1,2,3,4].map((n) => (
                <li key={n} className="flex items-start gap-3 type-small">
                  <span className="mt-2 h-1.5 w-1.5 rounded-full bg-champagne" />
                  <span>{t(`sourcing.item${n}`)}</span>
                </li>
              ))}
            </ul>
            <div className="mt-8 grid grid-cols-3 gap-4">
              {[
                { k: "sourcing.origin", v: "Sri Lanka" },
                { k: "sourcing.base", v: "España" },
                { k: "sourcing.markets", v: t("sourcing.markets.value") },
              ].map((s) => (
                <div key={s.k} className="border-l-2 border-champagne pl-3">
                  <div className="type-label text-muted-foreground">{t(s.k)}</div>
                  <div className="mt-1 font-serif text-base md:text-lg">{s.v}</div>
                </div>
              ))}
            </div>
          </Reveal>
          <Reveal delay={100}>
            <div className="relative aspect-[5/3] rounded-sm overflow-hidden bg-card border border-border p-4">
              <WorldMap className="h-full w-full" />
            </div>
          </Reveal>
        </div>
      </Section>

      {/* INDUSTRIES */}
      <Section>
        <Reveal>
          <SectionHeader eyebrow={t("industries.eyebrow")} title={t("industries.title")} />
        </Reveal>
        <div className="mt-14">
          <Grid cols={4}>
            {[
              { i: Droplet, k: "water" }, { i: Wind, k: "air" }, { i: Filter, k: "filter" }, { i: Utensils, k: "food" },
              { i: Sprout, k: "agri" }, { i: Anchor, k: "marine" }, { i: Sailboat, k: "yacht" }, { i: Globe2, k: "distribution" },
            ].map(({ i: Icon, k }, idx) => (
              <Reveal key={k} delay={idx * 40}>
                <FeatureCard icon={<Icon />} title={t(`industries.${k}`)} />
              </Reveal>
            ))}
          </Grid>
        </div>
      </Section>

      {/* QUALITY */}
      <Section tone="dark">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14">
          <Reveal>
            <Eyebrow onDark>{t("quality.eyebrow")}</Eyebrow>
            <h2 className="mt-5 type-h2 text-ivory">{t("quality.title")}</h2>
            <p className="mt-5 type-lead text-ivory/75 max-w-lg">{t("quality.desc")}</p>
            <div className="mt-8 flex gap-3">
              <Button variant="secondary" className="border-champagne text-champagne hover:bg-champagne hover:text-graphite" asChild>
                <Link to="/$lang/quality" params={{ lang }}>
                  {t("common.learn_more")} <ArrowRight />
                </Link>
              </Button>
            </div>
          </Reveal>
          <Reveal delay={80}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {["spec","methods","sheets","trace","suppliers","control"].map((k) => (
                <div key={k} className="border border-ivory/10 rounded-sm p-4 hover:border-champagne/40 transition-colors">
                  <div className="h-1 w-6 bg-champagne mb-3" />
                  <div className="type-small text-ivory/90">{t(`quality.${k}`)}</div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </Section>

      {/* SUSTAINABILITY */}
      <Section>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 lg:gap-16">
          <Reveal className="lg:col-span-1">
            <Eyebrow>{t("sust.eyebrow")}</Eyebrow>
            <h2 className="mt-5 type-h2">{t("sust.title")}</h2>
            <p className="mt-5 type-lead text-muted-foreground">{t("sust.desc")}</p>
          </Reveal>
          <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {["natural","selection","relations","logistics","transparency","improve"].map((k, i) => (
              <Reveal key={k} delay={i * 50}>
                <div className="border-l-2 border-forest pl-4 py-2">
                  <div className="type-small font-medium">{t(`sust.${k}`)}</div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </Section>

      {/* CTA */}
      <CTASection
        title={t("cta.title")}
        lead={t("cta.desc")}
        actions={
          <>
            <Button variant="gold" asChild>
              <Link to="/$lang/contact" params={{ lang }}>
                {t("cta.contact")} <ArrowRight />
              </Link>
            </Button>
            <Button variant="inverse" asChild>
              <Link to="/$lang/contact" params={{ lang }} search={{ request: "sheet" } as never}>
                {t("cta.sheet")}
              </Link>
            </Button>
          </>
        }
      />
      <GoldRule className="mx-auto max-w-md my-10" />
    </>
  );
}
