import { createFileRoute, Link } from "@tanstack/react-router";
import { useI18n } from "@/i18n/context";
import { categories, categoryName, accentClasses } from "@/data/categories";
import { WorldMap } from "@/components/site/WorldMap";
import { HexParticles } from "@/components/site/HexParticles";
import { Reveal, Eyebrow, GoldRule } from "@/components/site/Reveal";
import heroImg from "@/assets/hero-global.jpg";
import { ArrowRight, Award, Leaf, Ship, Wrench, Droplet, Wind, Filter, Utensils, Sprout, Anchor, Sailboat, Globe2 } from "lucide-react";
import { cn } from "@/lib/utils";

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
            <Eyebrow className="text-ivory/80"><span className="text-ivory/80">{t("hero.eyebrow")}</span></Eyebrow>
            <h1 className="mt-6 font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-ivory leading-[1.05]">
              {t("hero.title")}
            </h1>
            <p className="mt-6 max-w-2xl text-base md:text-lg text-ivory/85 leading-relaxed">
              {t("hero.subtitle")}
            </p>
            <div className="mt-10 flex flex-wrap items-center gap-3">
              <Link to="/$lang/products" params={{ lang }}
                className="group inline-flex items-center gap-2 rounded-sm bg-champagne px-6 py-3.5 text-sm font-semibold text-graphite hover:bg-champagne/90 shadow-[var(--shadow-glow)] transition-all">
                {t("hero.cta.primary")}
                <ArrowRight className="h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
              </Link>
              <Link to="/$lang/contact" params={{ lang }}
                className="inline-flex items-center gap-2 rounded-sm border border-ivory/40 bg-ivory/5 px-6 py-3.5 text-sm font-medium text-ivory backdrop-blur hover:bg-ivory/10 transition-colors">
                {t("hero.cta.secondary")}
              </Link>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-b from-transparent to-background pointer-events-none" />
      </section>

      {/* VALUE */}
      <section className="container-page py-20 md:py-28">
        <Reveal>
          <Eyebrow>{t("value.eyebrow")}</Eyebrow>
          <h2 className="mt-4 max-w-2xl font-serif text-3xl md:text-5xl">{t("value.title")}</h2>
        </Reveal>
        <div className="mt-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            { i: Award, k: "quality" },
            { i: Leaf, k: "origin" },
            { i: Ship, k: "supply" },
            { i: Wrench, k: "expertise" },
          ].map(({ i: Icon, k }, idx) => (
            <Reveal key={k} delay={idx * 80}>
              <div className="group border-t border-border pt-6">
                <div className="h-11 w-11 rounded-sm border border-champagne/60 flex items-center justify-center text-champagne group-hover:border-champagne group-hover:bg-champagne/5 transition-colors">
                  <Icon className="h-5 w-5" strokeWidth={1.6} />
                </div>
                <h3 className="mt-5 font-serif text-xl">{t(`value.${k}.title`)}</h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{t(`value.${k}.desc`)}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* LINES */}
      <section className="container-page py-20 md:py-28">
        <Reveal>
          <Eyebrow>{t("lines.eyebrow")}</Eyebrow>
          <h2 className="mt-4 max-w-2xl font-serif text-3xl md:text-5xl">{t("lines.title")}</h2>
        </Reveal>
        <div className="mt-14 grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {categories.map((c, idx) => (
            <Reveal key={c.slug} delay={idx * 60}>
              <Link to="/$lang/categories/$category" params={{ lang, category: c.slug }}
                className="group relative block overflow-hidden rounded-lg border border-border bg-card shadow-[var(--shadow-soft)] hover:shadow-[var(--shadow-elevated)] transition-all">
                <div className="relative aspect-[16/10] overflow-hidden">
                  <img src={c.image} alt={categoryName(lang, c)} loading="lazy" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" width={1200} height={900} />
                  <div className="absolute inset-0 bg-gradient-to-t from-graphite/85 via-graphite/25 to-transparent" />
                  <div className={cn("absolute top-4 left-4 h-2.5 w-2.5 rounded-full", accentClasses[c.accent].bg)} />
                </div>
                <div className="absolute inset-x-0 bottom-0 p-6 md:p-7 text-ivory">
                  <h3 className="font-serif text-2xl md:text-3xl">{categoryName(lang, c)}</h3>
                  <p className="mt-2 text-sm text-ivory/85 max-w-md">{t(c.descKey)}</p>
                  <span className="mt-4 inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-champagne group-hover:gap-2.5 transition-all">
                    {t("lines.explore")} <ArrowRight className="h-3.5 w-3.5" />
                  </span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      {/* SOURCING */}
      <section className="bg-secondary/60 border-y border-border">
        <div className="container-page py-20 md:py-28 grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
          <Reveal>
            <Eyebrow>{t("sourcing.eyebrow")}</Eyebrow>
            <h2 className="mt-4 font-serif text-3xl md:text-5xl">{t("sourcing.title")}</h2>
            <p className="mt-5 text-base text-muted-foreground leading-relaxed max-w-lg">{t("sourcing.desc")}</p>
            <ul className="mt-8 space-y-3">
              {[1,2,3,4].map((n) => (
                <li key={n} className="flex items-start gap-3 text-sm">
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
                  <div className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground">{t(s.k)}</div>
                  <div className="mt-1 font-serif text-base md:text-lg">{s.v}</div>
                </div>
              ))}
            </div>
          </Reveal>
          <Reveal delay={100}>
            <div className="relative aspect-[5/3] rounded-lg overflow-hidden bg-card border border-border p-4">
              <WorldMap className="h-full w-full" />
            </div>
          </Reveal>
        </div>
      </section>

      {/* INDUSTRIES */}
      <section className="container-page py-20 md:py-28">
        <Reveal>
          <Eyebrow>{t("industries.eyebrow")}</Eyebrow>
          <h2 className="mt-4 max-w-2xl font-serif text-3xl md:text-5xl">{t("industries.title")}</h2>
        </Reveal>
        <div className="mt-14 grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {[
            { i: Droplet, k: "water" }, { i: Wind, k: "air" }, { i: Filter, k: "filter" }, { i: Utensils, k: "food" },
            { i: Sprout, k: "agri" }, { i: Anchor, k: "marine" }, { i: Sailboat, k: "yacht" }, { i: Globe2, k: "distribution" },
          ].map(({ i: Icon, k }, idx) => (
            <Reveal key={k} delay={idx * 40}>
              <div className="group h-full border border-border rounded-lg p-5 md:p-6 bg-card hover:border-champagne hover:-translate-y-0.5 transition-all">
                <Icon className="h-6 w-6 text-primary group-hover:text-champagne transition-colors" strokeWidth={1.6} />
                <div className="mt-4 text-sm font-medium">{t(`industries.${k}`)}</div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* QUALITY */}
      <section className="bg-graphite text-ivory">
        <div className="container-page py-20 md:py-28 grid grid-cols-1 lg:grid-cols-2 gap-14">
          <Reveal>
            <Eyebrow className="[&_span]:text-champagne">{t("quality.eyebrow")}</Eyebrow>
            <h2 className="mt-4 font-serif text-3xl md:text-5xl text-ivory">{t("quality.title")}</h2>
            <p className="mt-5 text-ivory/75 leading-relaxed max-w-lg">{t("quality.desc")}</p>
            <div className="mt-8 flex gap-3">
              <Link to="/$lang/quality" params={{ lang }} className="inline-flex items-center gap-1.5 rounded-sm border border-champagne px-5 py-2.5 text-sm text-champagne hover:bg-champagne hover:text-graphite transition-colors">
                {t("common.learn_more")} <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </Reveal>
          <Reveal delay={80}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {["spec","methods","sheets","trace","suppliers","control"].map((k) => (
                <div key={k} className="border border-ivory/10 rounded-md p-4 hover:border-champagne/40 transition-colors">
                  <div className="h-1 w-6 bg-champagne mb-3" />
                  <div className="text-sm text-ivory/90">{t(`quality.${k}`)}</div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* SUSTAINABILITY */}
      <section className="container-page py-20 md:py-28">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 lg:gap-16">
          <Reveal className="lg:col-span-1">
            <Eyebrow>{t("sust.eyebrow")}</Eyebrow>
            <h2 className="mt-4 font-serif text-3xl md:text-5xl">{t("sust.title")}</h2>
            <p className="mt-5 text-muted-foreground leading-relaxed">{t("sust.desc")}</p>
          </Reveal>
          <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {["natural","selection","relations","logistics","transparency","improve"].map((k, i) => (
              <Reveal key={k} delay={i * 50}>
                <div className="border-l-2 border-forest pl-4 py-2">
                  <div className="text-sm font-medium">{t(`sust.${k}`)}</div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="container-page pb-20 md:pb-28">
        <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-ocean via-ocean to-turquoise text-ivory p-10 md:p-16">
          <HexParticles className="absolute inset-0 opacity-30 pointer-events-none" />
          <div className="relative max-w-3xl">
            <h2 className="font-serif text-3xl md:text-5xl leading-tight">{t("cta.title")}</h2>
            <p className="mt-4 text-ivory/90 max-w-2xl">{t("cta.desc")}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/$lang/contact" params={{ lang }} className="inline-flex items-center gap-1.5 rounded-sm bg-champagne px-6 py-3 text-sm font-semibold text-graphite hover:bg-champagne/90 transition-colors">
                {t("cta.contact")} <ArrowRight className="h-4 w-4" />
              </Link>
              <Link to="/$lang/contact" params={{ lang }} search={{ request: "sheet" } as never} className="inline-flex items-center gap-1.5 rounded-sm border border-ivory/50 px-6 py-3 text-sm font-medium text-ivory hover:bg-ivory/10 transition-colors">
                {t("cta.sheet")}
              </Link>
            </div>
          </div>
        </div>
      </section>
      <GoldRule className="mx-auto max-w-md" />
    </>
  );
}
