import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useI18n } from "@/i18n/context";
import { getCategory, categoryName, accentClasses } from "@/data/categories";
import { productsByCategory } from "@/data/products";
import { Eyebrow, GoldRule, Reveal } from "@/components/site/Reveal";
import { ArrowRight, ChevronRight, FileText, Home, Mail } from "lucide-react";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/$lang/categories/$category")({
  beforeLoad: ({ params }) => { if (!getCategory(params.category)) throw notFound(); },
  head: ({ params }) => {
    const c = getCategory(params.category);
    if (!c) return { meta: [{ title: "Category — CEYLGEN" }] };
    const name = params.category === "activated-carbon" ? "Activated Carbon" : params.category === "spices" ? "Spices" : params.category === "fertilizers" ? "Fertilizers" : "Marine Wood";
    const title = `${name} — CEYLGEN`;
    return {
      meta: [{ title }, { name: "description", content: `${name} product line by CEYLGEN — premium natural resources.` }, { property: "og:title", content: title }, { property: "og:url", content: `/${params.lang}/categories/${params.category}` }],
      links: [{ rel: "canonical", href: `/${params.lang}/categories/${params.category}` }],
    };
  },
  component: CategoryPage,
});

function CategoryPage() {
  const { t, lang } = useI18n();
  const { category } = Route.useParams();
  const cat = getCategory(category)!;
  const acc = accentClasses[cat.accent];
  const list = productsByCategory(cat.slug);

  return (
    <>
      <div className="container-page pt-8">
        <nav className="flex items-center gap-1 text-xs text-muted-foreground">
          <Link to="/$lang" params={{ lang }} className="flex items-center gap-1 hover:text-foreground"><Home className="h-3 w-3" /></Link>
          <ChevronRight className="h-3 w-3" />
          <Link to="/$lang/products" params={{ lang }} className="hover:text-foreground">{t("nav.products")}</Link>
          <ChevronRight className="h-3 w-3" />
          <span className="text-foreground">{categoryName(lang, cat)}</span>
        </nav>
      </div>

      <section className="relative overflow-hidden">
        <div className="absolute inset-0"><img src={cat.image} alt="" className="h-full w-full object-cover" /><div className="absolute inset-0 bg-gradient-to-r from-graphite/85 via-graphite/60 to-graphite/40" /></div>
        <div className="relative container-page py-24 md:py-32 text-ivory">
          <div className="flex items-center gap-2"><span className={cn("h-2.5 w-2.5 rounded-full", acc.bg)} /><span className="text-eyebrow text-champagne">{t("lines.eyebrow")}</span></div>
          <h1 className="mt-4 font-serif text-4xl md:text-6xl">{categoryName(lang, cat)}</h1>
          <p className="mt-5 max-w-2xl text-ivory/85">{t(cat.descKey)}</p>
        </div>
      </section>

      <section className="container-page py-16">
        {list.length > 0 ? (
          <>
            <div className="flex items-baseline justify-between mb-8">
              <h2 className="font-serif text-2xl md:text-3xl">{t("nav.products")}</h2>
              <span className="text-sm text-muted-foreground">{list.length}</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {list.map((p, i) => {
                const info = p.i18n[lang];
                return (
                  <Reveal key={p.slug} delay={i * 60}>
                    <article className="group h-full flex flex-col rounded-lg border border-border bg-card overflow-hidden hover:shadow-[var(--shadow-elevated)] hover:-translate-y-0.5 transition-all">
                      <div className="relative aspect-[4/3] overflow-hidden bg-graphite">
                        <img src={p.image} alt={info.name} loading="lazy" className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-700" />
                        {p.hasTechnicalSheet && (<span className="absolute top-3 right-3 flex items-center gap-1 rounded-sm bg-champagne/95 px-2 py-1 text-[10px] font-semibold uppercase tracking-wider text-graphite"><FileText className="h-3 w-3" /> TDS</span>)}
                      </div>
                      <div className="flex flex-col flex-1 p-5">
                        <div className="text-[10px] uppercase tracking-[0.16em] text-muted-foreground">{p.code}</div>
                        <h3 className="mt-1 font-serif text-lg leading-tight line-clamp-2">{info.name}</h3>
                        <p className="mt-2 text-sm text-muted-foreground line-clamp-3">{info.shortDescription}</p>
                        <div className="mt-4 pt-4 border-t border-border">
                          <Link to="/$lang/products/$slug" params={{ lang, slug: p.slug }} className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:gap-2 transition-all">{t("catalog.card.view")} <ArrowRight className="h-3.5 w-3.5" /></Link>
                        </div>
                      </div>
                    </article>
                  </Reveal>
                );
              })}
            </div>
          </>
        ) : (
          <div className="rounded-xl border border-dashed border-border bg-card p-10 md:p-16 text-center">
            <div className={cn("mx-auto h-12 w-12 rounded-full flex items-center justify-center text-champagne bg-champagne/10")}>
              <Mail className="h-5 w-5" />
            </div>
            <h3 className="mt-5 font-serif text-2xl md:text-3xl">{t("catalog.soon")}</h3>
            <p className="mt-3 max-w-lg mx-auto text-muted-foreground">{t("catalog.soon.desc")}</p>
            <Link to="/$lang/contact" params={{ lang }} className="mt-6 inline-flex items-center gap-1.5 rounded-sm bg-primary px-5 py-3 text-sm font-medium text-primary-foreground hover:bg-primary/90">
              {t("nav.contact")} <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        )}
      </section>
      <GoldRule className="max-w-md mx-auto" />
    </>
  );
}
