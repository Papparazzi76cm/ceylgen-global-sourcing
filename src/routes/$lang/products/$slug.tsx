import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useI18n } from "@/i18n/context";
import { getProduct, products } from "@/data/products";
import { categories, categoryName, accentClasses, getCategory } from "@/data/categories";
import { GoldRule, Reveal } from "@/components/site/Reveal";
import { ArrowRight, FileText, Home, ChevronRight } from "lucide-react";
import { TdsDownload } from "@/components/site/TdsDownload";
import { cn } from "@/lib/utils";
import { Container, Breadcrumb, Badge, Button, SpecTable, Card, CTASection } from "@/components/ds";

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
      <Container className="pt-8">
        <Breadcrumb
          items={[
            { label: "home", node: <Link to="/$lang" params={{ lang }} className="flex items-center gap-1 hover:text-foreground"><Home className="h-3 w-3" strokeWidth={1.6} /></Link> },
            { label: t("nav.products"), node: <Link to="/$lang/products" params={{ lang }} className="hover:text-foreground">{t("nav.products")}</Link> },
            { label: categoryName(lang, cat), node: <Link to="/$lang/categories/$category" params={{ lang, category: cat.slug }} className="hover:text-foreground">{categoryName(lang, cat)}</Link> },
            { label: info.name },
          ]}
        />
      </Container>

      {/* Hero */}
      <Container className="pt-8 pb-12 grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start">
        <div className="relative aspect-[4/3] overflow-hidden rounded-sm bg-graphite border border-border shadow-[var(--shadow-elevated)]">
          <img src={p.image} alt={info.name} width={1600} height={1000} className="h-full w-full object-cover" />
          <span className={cn("absolute top-4 left-4 rounded-sm bg-background/90 backdrop-blur px-2.5 py-1 type-label", acc.text)}>{categoryName(lang, cat)}</span>
        </div>
        <div>
          <div className="type-label text-muted-foreground">{t("product.code")} · {p.code}</div>
          <h1 className="mt-3 type-h1">{info.name}</h1>
          <p className="mt-5 type-lead">{info.shortDescription}</p>
          <div className="mt-7 flex flex-wrap gap-3">
            {p.hasTechnicalSheet && <TdsDownload productCode={p.code} />}
            <Button asChild variant="primary">
              <Link to="/$lang/contact" params={{ lang }} search={{ request: "sheet", product: p.slug } as never}>
                <FileText className="h-4 w-4" strokeWidth={1.6} /> {t("product.request.sheet")}
              </Link>
            </Button>
            <Button asChild variant="secondary">
              <Link to="/$lang/contact" params={{ lang }} search={{ request: "info", product: p.slug } as never}>
                {t("product.request.avail")} <ArrowRight className="h-4 w-4" strokeWidth={1.6} />
              </Link>
            </Button>
          </div>
          <div className="mt-8 grid grid-cols-2 gap-4">
            <Info label={t("catalog.filter.origin")} value={p.origin} />
            <Info label={t("catalog.filter.format")} value={p.format} />
          </div>
        </div>
      </Container>

      {/* Long description + benefits */}
      <Container className="py-12 grid grid-cols-1 lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2">
          <p className="type-body">{info.longDescription}</p>
        </div>
        <div>
          <h3 className="type-label text-muted-foreground">{t("product.benefits")}</h3>
          <ul className="mt-3 space-y-2">
            {info.benefits.map((b) => (
              <li key={b} className="flex gap-2 text-sm"><span className="mt-2 h-1.5 w-1.5 rounded-full bg-champagne shrink-0" /><span>{b}</span></li>
            ))}
          </ul>
        </div>
      </Container>

      {/* Applications */}
      <Container className="py-8">
        <h2 className="type-h2">{t("product.applications")}</h2>
        <div className="mt-6 flex flex-wrap gap-2">
          {info.applications.map((a) => (
            <span key={a} className={cn("inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-sm bg-card", acc.border, acc.text)}>
              <span className={cn("h-1.5 w-1.5 rounded-full", acc.bg)} />{a}
            </span>
          ))}
        </div>
      </Container>

      {/* Specifications */}
      <Container className="py-12">
        <h2 className="type-h2">{t("product.specs")}</h2>
        <div className="mt-6">
          <SpecTable
            rows={p.specs.map((s) => ({
              label: (
                <span className="flex flex-wrap items-baseline gap-x-2">
                  <span className="font-medium text-foreground">{s.parameter}</span>
                  {s.qualifier && <span>{s.qualifier}</span>}
                  {s.method && <span>· {t("product.method")}: {s.method}</span>}
                </span>
              ),
              value: s.value,
              note: s.unit,
            }))}
          />
        </div>
      </Container>

      {/* Packaging + Origin + Quality + Sustainability */}
      <Container className="py-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Block title={t("product.packaging")}>
          <ul className="space-y-1.5 type-small text-muted-foreground">
            {p.packaging.map((x) => <li key={x}>· {x}</li>)}
          </ul>
        </Block>
        <Block title={t("product.origin")}>
          <p className="text-sm">{p.origin}</p>
          <p className="mt-2 type-small text-muted-foreground">{t("sourcing.item1")}</p>
        </Block>
        <Block title={t("product.quality")}>
          <p className="type-small text-muted-foreground">{t("quality.page.note")}</p>
        </Block>
        <Block title={t("product.sustainability")}>
          <p className="type-small text-muted-foreground">{info.sustainability}</p>
        </Block>
      </Container>

      {related.length > 0 && (
        <Container className="py-16">
          <GoldRule className="max-w-xs mb-8" />
          <h2 className="type-h2">{t("product.related")}</h2>
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {related.map((r) => {
              const ri = r.i18n[lang];
              return (
                <Link key={r.slug} to="/$lang/products/$slug" params={{ lang, slug: r.slug }}>
                  <Card interactive className="group overflow-hidden">
                    <div className="aspect-[4/3] overflow-hidden">
                      <img src={r.image} alt={ri.name} loading="lazy" className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-700" />
                    </div>
                    <div className="p-5">
                      <div className="type-label text-muted-foreground">{r.code}</div>
                      <h3 className="mt-1 type-h4 line-clamp-2">{ri.name}</h3>
                    </div>
                  </Card>
                </Link>
              );
            })}
          </div>
        </Container>
      )}

      {/* CTA */}
      <CTASection
        title={t("cta.title")}
        lead={t("cta.desc")}
        actions={
          <Button asChild variant="gold">
            <Link to="/$lang/contact" params={{ lang }}>
              {t("cta.contact")} <ArrowRight className="h-4 w-4" strokeWidth={1.6} />
            </Link>
          </Button>
        }
      />
    </>
  );
}

function Info({ label, value }: { label: string; value: string }) {
  return (
    <div className="border-l-2 border-champagne pl-3">
      <div className="type-label text-muted-foreground">{label}</div>
      <div className="mt-1 font-medium">{value}</div>
    </div>
  );
}
function Block({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <Card className="p-5">
      <h3 className="type-label text-muted-foreground">{title}</h3>
      <div className="mt-3">{children}</div>
    </Card>
  );
}
