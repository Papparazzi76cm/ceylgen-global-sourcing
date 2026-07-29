import { createFileRoute, Link } from "@tanstack/react-router";
import { useI18n } from "@/i18n/context";
import { categories, categoryName } from "@/data/categories";
import { products } from "@/data/products";
import { WorldMap } from "@/components/site/WorldMap";
import { HexParticles } from "@/components/site/HexParticles";
import { Reveal } from "@/components/site/Reveal";
import heroImg from "@/assets/hero-global.jpg";
import { ArrowRight, Award, Leaf, Ship, Wrench } from "lucide-react";
import {
  Container,
  Eyebrow,
  Section,
  Grid,
  EditorialCard,
  EditorialMedia,
  IndexRow,
  Button,
} from "@/components/ds";

export const Route = createFileRoute("/$lang/")({
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

const num = (i: number) => String(i + 1).padStart(2, "0");

function HomePage() {
  const { t, lang } = useI18n();
  const featured = products.filter((p) => p.featured).slice(0, 2);

  return (
    <>
      {/* ── HERO ─────────────────────────────────────────────── */}
      <section className="relative isolate overflow-hidden bg-graphite">
        <div className="absolute inset-0">
          <img
            src={heroImg}
            alt=""
            fetchPriority="high"
            decoding="async"
            className="h-full w-full object-cover"
            width={1920}
            height={1200}
          />
          <div className="absolute inset-0" style={{ background: "var(--gradient-hero)" }} />
          <div className="absolute inset-0" style={{ background: "var(--gradient-hero-side)" }} />
        </div>
        <HexParticles className="absolute inset-0 h-full w-full pointer-events-none opacity-30" />

        <Container className="relative flex min-h-[calc(100svh-84px)] md:min-h-[calc(100svh-124px)] flex-col justify-end pb-16 pt-24 md:pb-24">
          <div className="hero-in max-w-[22ch]">
            <p className="type-label text-ivory/60">{t("hero.eyebrow")}</p>
          </div>

          <h1 className="hero-in mt-10 max-w-[16ch] type-hero text-ivory" style={{ animationDelay: "120ms" }}>
            {t("hero.title")}
          </h1>

          <div
            className="rule-in mt-12 h-px w-full max-w-[560px] bg-ivory/25"
            style={{ animationDelay: "420ms" }}
          />

          <div className="mt-12 grid grid-cols-1 gap-10 md:grid-cols-12 md:items-end">
            <p
              className="hero-in md:col-span-6 lg:col-span-5 type-lead text-ivory/75"
              style={{ animationDelay: "260ms" }}
            >
              {t("hero.subtitle")}
            </p>
            <div
              className="hero-in md:col-span-6 lg:col-span-7 flex flex-wrap items-center gap-4 md:justify-end"
              style={{ animationDelay: "360ms" }}
            >
              <Button variant="gold" size="lg" asChild>
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
        </Container>
      </section>

      {/* ── VALUE ────────────────────────────────────────────── */}
      <Section>
        <div className="grid grid-cols-1 gap-14 lg:grid-cols-12 lg:gap-16">
          <Reveal variant="left" className="lg:col-span-4">
            <Eyebrow>{t("value.eyebrow")}</Eyebrow>
            <h2 className="mt-8 type-h2 max-w-[14ch]">{t("value.title")}</h2>
          </Reveal>
          <div className="lg:col-span-8">
            <Grid cols={2} className="gap-y-14 sm:gap-x-14">
              {[
                { i: Award, k: "quality" },
                { i: Leaf, k: "origin" },
                { i: Ship, k: "supply" },
                { i: Wrench, k: "expertise" },
              ].map(({ i: Icon, k }, idx) => (
                <Reveal key={k} delay={idx * 90}>
                  <EditorialCard
                    index={num(idx)}
                    icon={<Icon strokeWidth={0.9} />}
                    title={t(`value.${k}.title`)}
                    description={t(`value.${k}.desc`)}
                  />
                </Reveal>
              ))}
            </Grid>
          </div>
        </div>
      </Section>

      {/* ── PRODUCT LINES ────────────────────────────────────── */}
      <Section size="lg" className="border-t border-border">
        <Reveal>
          <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
            <div>
              <Eyebrow>{t("lines.eyebrow")}</Eyebrow>
              <h2 className="mt-8 type-h2 max-w-[18ch]">{t("lines.title")}</h2>
            </div>
            <Link
              to="/$lang/products"
              params={{ lang }}
              className="inline-flex items-center gap-2 type-label text-graphite underline-draw"
            >
              {t("lines.explore")} <ArrowRight className="h-3 w-3" strokeWidth={1} />
            </Link>
          </div>
        </Reveal>

        <div className="mt-20 grid grid-cols-1 gap-x-12 gap-y-20 md:grid-cols-2">
          {categories.map((c, idx) => (
            <Reveal key={c.slug} delay={idx % 2 ? 120 : 0} className={idx % 2 ? "md:mt-24" : undefined}>
              <Link to="/$lang/categories/$category" params={{ lang, category: c.slug }} className="block">
                <EditorialMedia
                  image={c.image}
                  alt={categoryName(lang, c)}
                  index={num(idx)}
                  ratio={idx % 2 ? "4/5" : "3/2"}
                  title={categoryName(lang, c)}
                  description={t(c.descKey)}
                  action={
                    <span className="inline-flex items-center gap-2 type-label text-champagne transition-all duration-[420ms] group-hover:gap-3.5">
                      {t("lines.explore")} <ArrowRight className="size-3" strokeWidth={1} />
                    </span>
                  }
                />
              </Link>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* ── FEATURED PRODUCTS ────────────────────────────────── */}
      {featured.length > 0 && (
        <section className="bg-secondary/40 border-y border-border">
          <Container className="section-y-lg">
            <Reveal>
              <Eyebrow>{t("featured.eyebrow")}</Eyebrow>
              <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-end">
                <h2 className="lg:col-span-6 type-h2 max-w-[16ch]">{t("featured.title")}</h2>
                <p className="lg:col-span-5 lg:col-start-8 type-body text-muted-foreground">
                  {t("featured.lead")}
                </p>
              </div>
            </Reveal>

            <div className="mt-20 grid grid-cols-1 gap-x-16 gap-y-20 md:grid-cols-2">
              {featured.map((p, idx) => (
                <Reveal key={p.slug} delay={idx * 120}>
                  <Link
                    to="/$lang/products/$slug"
                    params={{ lang, slug: p.slug }}
                    className="group block"
                  >
                    <div className="relative overflow-hidden bg-background" style={{ aspectRatio: "3 / 2" }}>
                      <img
                        src={p.image}
                        alt={p.i18n[lang].name}
                        loading="lazy"
                        decoding="async"
                        className="media-zoom h-full w-full object-cover"
                      />
                    </div>
                    <div className="mt-8 flex items-baseline justify-between gap-6">
                      <span className="type-index">{p.code}</span>
                      <span className="type-label text-muted-foreground">{p.format}</span>
                    </div>
                    <h3 className="mt-5 type-h3 max-w-[22ch]">{p.i18n[lang].name}</h3>
                    <p className="mt-4 max-w-md type-body text-muted-foreground">
                      {p.i18n[lang].shortDescription}
                    </p>
                    <div className="mt-8 grid grid-cols-2 gap-x-8 gap-y-4 border-t border-border pt-6">
                      {p.specs.slice(0, 4).map((s) => (
                        <div key={s.parameter}>
                          <div className="type-label text-muted-foreground">{s.parameter}</div>
                          <div className="mt-1.5 type-body">
                            {s.qualifier ? `${s.qualifier} ` : ""}{s.value}{s.unit ? ` ${s.unit}` : ""}
                          </div>
                        </div>
                      ))}
                    </div>
                    <span className="mt-8 inline-flex items-center gap-2 type-label text-champagne transition-all duration-[420ms] group-hover:gap-3.5">
                      {t("featured.view")} <ArrowRight className="size-3" strokeWidth={1} />
                    </span>
                  </Link>
                </Reveal>
              ))}
            </div>
          </Container>
        </section>
      )}

      {/* ── SOURCING / GLOBAL PRESENCE ───────────────────────── */}
      <Section>
        <div className="grid grid-cols-1 items-center gap-16 lg:grid-cols-12 lg:gap-20">
          <Reveal variant="left" className="lg:col-span-5">
            <Eyebrow>{t("sourcing.eyebrow")}</Eyebrow>
            <h2 className="mt-8 type-h2 max-w-[16ch]">{t("sourcing.title")}</h2>
            <p className="mt-7 max-w-lg type-lead">{t("sourcing.desc")}</p>
            <ul className="mt-10">
              {[1, 2, 3, 4].map((n) => (
                <li key={n} className="flex items-baseline gap-5 border-t border-border py-4">
                  <span className="type-index">{num(n - 1)}</span>
                  <span className="type-body">{t(`sourcing.item${n}`)}</span>
                </li>
              ))}
            </ul>
            <div className="mt-12 grid grid-cols-3 gap-8">
              {[
                { k: "sourcing.origin", v: "Sri Lanka" },
                { k: "sourcing.base", v: "España" },
                { k: "sourcing.markets", v: t("sourcing.markets.value") },
              ].map((s) => (
                <div key={s.k}>
                  <div className="type-label text-muted-foreground">{t(s.k)}</div>
                  <div className="mt-3 font-serif text-xl md:text-2xl">{s.v}</div>
                </div>
              ))}
            </div>
          </Reveal>
          <Reveal variant="right" delay={120} className="lg:col-span-7">
            <div className="relative aspect-[5/3] w-full">
              <WorldMap className="h-full w-full" />
            </div>
          </Reveal>
        </div>
      </Section>

      {/* ── INDUSTRIES ───────────────────────────────────────── */}
      <Section size="lg" className="border-t border-border">
        <div className="grid grid-cols-1 gap-14 lg:grid-cols-12 lg:gap-16">
          <Reveal variant="left" className="lg:col-span-4">
            <Eyebrow>{t("industries.eyebrow")}</Eyebrow>
            <h2 className="mt-8 type-h2 max-w-[12ch]">{t("industries.title")}</h2>
            <Link
              to="/$lang/industries"
              params={{ lang }}
              className="mt-8 inline-flex items-center gap-2 type-label text-graphite underline-draw"
            >
              {t("common.learn_more")} <ArrowRight className="h-3 w-3" strokeWidth={1} />
            </Link>
          </Reveal>
          <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 md:gap-x-14">
            {["water", "air", "filter", "food", "agri", "marine", "yacht", "distribution"].map((k, idx) => (
              <Reveal key={k} delay={idx * 50}>
                <IndexRow index={num(idx)} title={t(`industries.${k}`)} />
              </Reveal>
            ))}
          </div>
        </div>
      </Section>

      {/* ── QUALITY ──────────────────────────────────────────── */}
      <section className="bg-graphite text-ivory">
        <Container className="section-y-lg">
          <div className="grid grid-cols-1 gap-16 lg:grid-cols-12 lg:gap-20">
            <Reveal variant="left" className="lg:col-span-5">
              <Eyebrow onDark>{t("quality.eyebrow")}</Eyebrow>
              <h2 className="mt-8 type-h2 text-ivory max-w-[14ch]">{t("quality.title")}</h2>
              <p className="mt-7 max-w-lg type-lead text-ivory/70">{t("quality.desc")}</p>
              <div className="mt-12">
                <Button variant="inverse" asChild>
                  <Link to="/$lang/quality" params={{ lang }}>
                    {t("common.learn_more")} <ArrowRight />
                  </Link>
                </Button>
              </div>
            </Reveal>
            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 md:gap-x-12">
              {["spec", "methods", "sheets", "trace", "suppliers", "control"].map((k, i) => (
                <Reveal key={k} delay={i * 60}>
                  <IndexRow onDark index={num(i)} title={t(`quality.${k}`)} />
                </Reveal>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* ── SUSTAINABILITY ───────────────────────────────────── */}
      <Section>
        <div className="grid grid-cols-1 gap-14 lg:grid-cols-12 lg:gap-16">
          <Reveal variant="left" className="lg:col-span-4">
            <Eyebrow>{t("sust.eyebrow")}</Eyebrow>
            <h2 className="mt-8 type-h2 max-w-[14ch]">{t("sust.title")}</h2>
            <p className="mt-7 max-w-md type-lead">{t("sust.desc")}</p>
          </Reveal>
          <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 md:gap-x-14">
            {["natural", "selection", "relations", "logistics", "transparency", "improve"].map((k, i) => (
              <Reveal key={k} delay={i * 60}>
                <IndexRow index={num(i)} title={t(`sust.${k}`)} />
              </Reveal>
            ))}
          </div>
        </div>
      </Section>

      {/* ── CTA ──────────────────────────────────────────────── */}
      <section className="border-t border-border">
        <Container className="section-y-lg">
          <Reveal variant="fade">
            <div className="mx-auto max-w-3xl text-center">
              <Eyebrow className="justify-center">{t("cta.contact")}</Eyebrow>
              <h2 className="mt-10 type-h1">{t("cta.title")}</h2>
              <p className="mx-auto mt-8 max-w-xl type-lead">{t("cta.desc")}</p>
              <div className="mt-14 flex flex-wrap items-center justify-center gap-4">
                <Button variant="primary" size="lg" asChild>
                  <Link to="/$lang/contact" params={{ lang }}>
                    {t("cta.contact")} <ArrowRight />
                  </Link>
                </Button>
                <Button variant="secondary" size="lg" asChild>
                  <Link to="/$lang/contact" params={{ lang }} search={{ request: "sheet" } as never}>
                    {t("cta.sheet")}
                  </Link>
                </Button>
              </div>
            </div>
          </Reveal>
        </Container>
      </section>
    </>
  );
}
