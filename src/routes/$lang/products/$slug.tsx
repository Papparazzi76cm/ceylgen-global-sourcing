import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useI18n } from "@/i18n/context";
import { getProduct, products } from "@/data/products";
import { categories, categoryName, accentClasses, getCategory } from "@/data/categories";
import { Eyebrow, GoldRule, Reveal } from "@/components/site/Reveal";
import { ArrowRight, ChevronRight, FileText, Home } from "lucide-react";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/$lang/products/$slug")({
  beforeLoad: ({ params }) => { if (!getProduct(params.slug)) throw notFound(); },
  head: ({ params }) => {
    const p = getProduct(params.slug);
    if (!p) return { meta: [{ title: "Product — CEYLGEN" }] };
    const info = p.i18n[params.lang as "es" | "en" | "fr"] ?? p.i18n.es;
    return {
      meta: [
        { title: info.seoTitle },
        { name: "description", content: info.seoDescription },
        { property: "og:title", content: info.seoTitle },
        { property: "og:description", content: info.seoDescription },
        { property: "og:type", content: "product" },
        { property: "og:url", content: `/${params.lang}/products/${params.slug}` },
      ],
      links: [{ rel: "canonical", href: `/${params.lang}/products/${params.slug}` }],
      scripts: [{
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org", "@type": "Product",
          name: info.name, description: info.shortDescription, sku: p.code,
          brand: { "@type": "Brand", name: "CEYLGEN" },
          category: p.category,
        }),
      }],
    };
  },
  component: ProductPage,
});

function ProductPage() {
  const { t, lang } = useI18n();
  const { slug } = Route.useParams();
  const p = getProduct(slug)!;
  const info = p.i18n[lang];
  const cat = getCategory(p.category)!;
  const acc = accentClasses[cat.accent];
  const related = products.filter((x) => x.category === p.category && x.slug !== p.slug).slice(0, 3);

  return (
    <>
      {/* Breadcrumbs */}
      <div className="container-page pt-8">
        <nav className="flex flex-wrap items-center gap-1 text-xs text-muted-foreground">
          <Link to="/$lang" params={{ lang }} className="flex items-center gap-1 hover:text-foreground"><Home className="h-3 w-3" /></Link>
          <ChevronRight className="h-3 w-3" />
          <Link to="/$lang/products" params={{ lang }} className="hover:text-foreground">{t("nav.products")}</Link>
          <ChevronRight className="h-3 w-3" />
          <Link to="/$lang/categories/$category" params={{ lang, category: cat.slug }} className="hover:text-foreground">{categoryName(lang, cat)}</Link>
          <ChevronRight className="h-3 w-3" />
          <span className="text-foreground line-clamp-1">{info.name}</span>
        </nav>
      </div>

      {/* Hero */}
      <section className="container-page pt-8 pb-12 grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start">
        <div className="relative aspect-[4/3] overflow-hidden rounded-lg bg-graphite border border-border shadow-[var(--shadow-elevated)]">
          <img src={p.image} alt={info.name} width={1600} height={1000} className="h-full w-full object-cover" />
          <span className={cn("absolute top-4 left-4 rounded-sm bg-background/90 backdrop-blur px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider", acc.text)}>{categoryName(lang, cat)}</span>
        </div>
        <div>
          <div className="text-eyebrow">{t("product.code")} · {p.code}</div>
          <h1 className="mt-3 font-serif text-3xl md:text-5xl leading-tight">{info.name}</h1>
          <p className="mt-5 text-muted-foreground leading-relaxed">{info.shortDescription}</p>
          <div className="mt-7 flex flex-wrap gap-3">
            <Link to="/$lang/contact" params={{ lang }} search={{ request: "sheet", product: p.slug } as never}
              className="inline-flex items-center gap-1.5 rounded-sm bg-primary px-5 py-3 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors">
              <FileText className="h-4 w-4" /> {t("product.request.sheet")}
            </Link>
            <Link to="/$lang/contact" params={{ lang }} search={{ request: "info", product: p.slug } as never}
              className="inline-flex items-center gap-1.5 rounded-sm border border-input px-5 py-3 text-sm font-medium hover:bg-muted transition-colors">
              {t("product.request.avail")} <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="mt-8 grid grid-cols-2 gap-4">
            <Info label={t("catalog.filter.origin")} value={p.origin} />
            <Info label={t("catalog.filter.format")} value={p.format} />
          </div>
        </div>
      </section>

      {/* Long description + benefits */}
      <section className="container-page py-12 grid grid-cols-1 lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2">
          <p className="text-foreground/90 leading-relaxed">{info.longDescription}</p>
        </div>
        <div>
          <h3 className="text-eyebrow">{t("product.benefits")}</h3>
          <ul className="mt-3 space-y-2">
            {info.benefits.map((b) => (
              <li key={b} className="flex gap-2 text-sm"><span className="mt-2 h-1.5 w-1.5 rounded-full bg-champagne shrink-0" /><span>{b}</span></li>
            ))}
          </ul>
        </div>
      </section>

      {/* Applications */}
      <section className="container-page py-8">
        <h2 className="font-serif text-2xl md:text-3xl">{t("product.applications")}</h2>
        <div className="mt-6 flex flex-wrap gap-2">
          {info.applications.map((a) => (
            <span key={a} className={cn("inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-sm bg-card", acc.border, acc.text)}>
              <span className={cn("h-1.5 w-1.5 rounded-full", acc.bg)} />{a}
            </span>
          ))}
        </div>
      </section>

      {/* Specifications */}
      <section className="container-page py-12">
        <h2 className="font-serif text-2xl md:text-3xl">{t("product.specs")}</h2>
        {/* Desktop table */}
        <div className="mt-6 hidden md:block overflow-hidden rounded-lg border border-border bg-card">
          <table className="w-full text-sm">
            <thead className="bg-secondary/50 text-left text-[11px] uppercase tracking-wider text-muted-foreground">
              <tr>
                <th className="px-4 py-3">{t("product.parameter")}</th>
                <th className="px-4 py-3">{t("product.qualifier")}</th>
                <th className="px-4 py-3">{t("product.value")}</th>
                <th className="px-4 py-3">{t("product.unit")}</th>
                <th className="px-4 py-3">{t("product.method")}</th>
              </tr>
            </thead>
            <tbody>
              {p.specs.map((s, i) => (
                <tr key={i} className="border-t border-border">
                  <td className="px-4 py-3 font-medium">{s.parameter}</td>
                  <td className="px-4 py-3 text-muted-foreground">{s.qualifier ?? "—"}</td>
                  <td className="px-4 py-3">{s.value}</td>
                  <td className="px-4 py-3 text-muted-foreground">{s.unit ?? "—"}</td>
                  <td className="px-4 py-3 text-muted-foreground">{s.method ?? "—"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {/* Mobile cards */}
        <div className="mt-6 md:hidden grid grid-cols-1 gap-2">
          {p.specs.map((s, i) => (
            <div key={i} className="rounded-md border border-border bg-card p-3 text-sm">
              <div className="font-medium">{s.parameter}</div>
              <div className="mt-1 grid grid-cols-2 gap-x-2 text-xs text-muted-foreground">
                {s.qualifier && <span>{t("product.qualifier")}: <span className="text-foreground">{s.qualifier}</span></span>}
                <span>{t("product.value")}: <span className="text-foreground">{s.value}{s.unit ? ` ${s.unit}` : ""}</span></span>
                {s.method && <span className="col-span-2">{t("product.method")}: <span className="text-foreground">{s.method}</span></span>}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Packaging + Origin + Quality + Sustainability */}
      <section className="container-page py-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Block title={t("product.packaging")}>
          <ul className="space-y-1.5 text-sm text-muted-foreground">
            {p.packaging.map((x) => <li key={x}>· {x}</li>)}
          </ul>
        </Block>
        <Block title={t("product.origin")}>
          <p className="text-sm">{p.origin}</p>
          <p className="mt-2 text-xs text-muted-foreground">{t("sourcing.item1")}</p>
        </Block>
        <Block title={t("product.quality")}>
          <p className="text-sm text-muted-foreground">{t("quality.page.note")}</p>
        </Block>
        <Block title={t("product.sustainability")}>
          <p className="text-sm text-muted-foreground">{info.sustainability}</p>
        </Block>
      </section>

      {related.length > 0 && (
        <section className="container-page py-16">
          <GoldRule className="max-w-xs mb-8" />
          <h2 className="font-serif text-2xl md:text-3xl">{t("product.related")}</h2>
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {related.map((r) => {
              const ri = r.i18n[lang];
              return (
                <Link key={r.slug} to="/$lang/products/$slug" params={{ lang, slug: r.slug }}
                  className="group rounded-lg border border-border bg-card overflow-hidden hover:shadow-[var(--shadow-elevated)] transition-shadow">
                  <div className="aspect-[4/3] overflow-hidden">
                    <img src={r.image} alt={ri.name} loading="lazy" className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-700" />
                  </div>
                  <div className="p-5">
                    <div className="text-[10px] uppercase tracking-[0.16em] text-muted-foreground">{r.code}</div>
                    <h3 className="mt-1 font-serif text-lg line-clamp-2">{ri.name}</h3>
                  </div>
                </Link>
              );
            })}
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="container-page pb-20">
        <div className="rounded-xl bg-graphite text-ivory p-10 md:p-14">
          <h2 className="font-serif text-2xl md:text-4xl max-w-2xl">{t("cta.title")}</h2>
          <p className="mt-3 text-ivory/80 max-w-xl">{t("cta.desc")}</p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link to="/$lang/contact" params={{ lang }} className="inline-flex items-center gap-1.5 rounded-sm bg-champagne px-5 py-3 text-sm font-semibold text-graphite hover:bg-champagne/90">
              {t("cta.contact")} <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

function Info({ label, value }: { label: string; value: string }) {
  return (
    <div className="border-l-2 border-champagne pl-3">
      <div className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground">{label}</div>
      <div className="mt-1 font-medium">{value}</div>
    </div>
  );
}
function Block({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-lg border border-border bg-card p-5">
      <h3 className="text-eyebrow">{title}</h3>
      <div className="mt-3">{children}</div>
    </div>
  );
}
