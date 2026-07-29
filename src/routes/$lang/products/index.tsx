import { createFileRoute, Link } from "@tanstack/react-router";
import { useI18n } from "@/i18n/context";
import { products } from "@/data/products";
import { categories, categoryName, accentClasses } from "@/data/categories";
import { Reveal } from "@/components/site/Reveal";
import { useMemo, useState } from "react";
import { Search, ArrowRight, FileText, X, PackageSearch } from "lucide-react";
import { cn } from "@/lib/utils";
import { Container, Eyebrow, Select as DsSelect, Checkbox, Badge, Button, EmptyState, Card } from "@/components/ds";

export const Route = createFileRoute("/$lang/products/")({
  head: ({ params }) => {
    const l = params.lang;
    const title = l === "en" ? "Products — CEYLGEN" : l === "fr" ? "Produits — CEYLGEN" : "Productos — CEYLGEN";
    const desc = l === "en" ? "Explore CEYLGEN's catalogue of premium raw materials for global B2B customers." : l === "fr" ? "Explorez le catalogue CEYLGEN de matières premières premium pour clients B2B mondiaux." : "Explora el catálogo CEYLGEN de materias primas premium para clientes B2B internacionales.";
    return {
      meta: [{ title }, { name: "description", content: desc }, { property: "og:title", content: title }, { property: "og:description", content: desc }, { property: "og:url", content: `/${l}/products` }],
      links: [{ rel: "canonical", href: `/${l}/products` }],
    };
  },
  component: CatalogPage,
});

function CatalogPage() {
  const { t, lang } = useI18n();
  const [q, setQ] = useState("");
  const [cat, setCat] = useState<string>("all");
  const [app, setApp] = useState<string>("all");
  const [origin, setOrigin] = useState<string>("all");
  const [fmt, setFmt] = useState<string>("all");
  const [docOnly, setDocOnly] = useState(false);

  const applications = useMemo(() => Array.from(new Set(products.map((p) => p.application))), []);
  const origins = useMemo(() => Array.from(new Set(products.map((p) => p.origin))), []);
  const formats = useMemo(() => Array.from(new Set(products.map((p) => p.format))), []);

  const filtered = useMemo(() => {
    return products.filter((p) => {
      if (cat !== "all" && p.category !== cat) return false;
      if (app !== "all" && p.application !== app) return false;
      if (origin !== "all" && p.origin !== origin) return false;
      if (fmt !== "all" && p.format !== fmt) return false;
      if (docOnly && !p.hasTechnicalSheet) return false;
      if (q.trim()) {
        const s = q.toLowerCase();
        const info = p.i18n[lang];
        const hay = [info.name, info.shortDescription, ...info.applications, p.code].join(" ").toLowerCase();
        if (!hay.includes(s)) return false;
      }
      return true;
    });
  }, [q, cat, app, origin, fmt, docOnly, lang]);

  const reset = () => { setQ(""); setCat("all"); setApp("all"); setOrigin("all"); setFmt("all"); setDocOnly(false); };
  const countKey = filtered.length === 1 ? "catalog.results.count_one" : "catalog.results.count_other";

  return (
    <>
      <Container className="pt-16 md:pt-24 pb-8">
        <Eyebrow>{t("nav.products")}</Eyebrow>
        <h1 className="mt-4 type-display max-w-3xl">{t("catalog.title")}</h1>
        <p className="mt-5 max-w-2xl type-lead">{t("catalog.subtitle")}</p>
      </Container>

      <Container className="pb-16">
        <Card className="p-4 md:p-5">
          <div className="grid grid-cols-1 lg:grid-cols-[1.4fr_1fr_1fr_1fr_1fr_auto] gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" strokeWidth={1.6} />
              <input
                value={q} onChange={(e) => setQ(e.target.value)}
                placeholder={t("catalog.search")}
                className="w-full h-11 rounded-sm border border-input bg-background pl-9 pr-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
              />
            </div>
            <Select label={t("catalog.filter.category")} value={cat} onChange={setCat}
              options={[{ v: "all", l: t("catalog.filter.all") }, ...categories.map((c) => ({ v: c.slug, l: categoryName(lang, c) }))]} />
            <Select label={t("catalog.filter.application")} value={app} onChange={setApp}
              options={[{ v: "all", l: t("catalog.filter.all") }, ...applications.map((a) => ({ v: a, l: labelForApp(a, t) }))]} />
            <Select label={t("catalog.filter.origin")} value={origin} onChange={setOrigin}
              options={[{ v: "all", l: t("catalog.filter.all") }, ...origins.map((o) => ({ v: o, l: o }))]} />
            <Select label={t("catalog.filter.format")} value={fmt} onChange={setFmt}
              options={[{ v: "all", l: t("catalog.filter.all") }, ...formats.map((f) => ({ v: f, l: f }))]} />
            <label className="flex items-center gap-2 h-11 px-3 rounded-sm border border-input bg-background text-sm cursor-pointer whitespace-nowrap">
              <Checkbox checked={docOnly} onChange={(e) => setDocOnly(e.target.checked)} />
              <span>{t("catalog.filter.withDoc")}</span>
            </label>
          </div>
          <div className="mt-3 flex items-center justify-between type-small text-muted-foreground">
            <span>{t(countKey, { count: filtered.length })}</span>
            <button onClick={reset} className="inline-flex items-center gap-1 hover:text-foreground">
              <X className="h-3 w-3" strokeWidth={1.6} /> {t("catalog.reset")}
            </button>
          </div>
        </Card>

        {filtered.length === 0 ? (
          <EmptyState
            className="mt-10"
            icon={<PackageSearch className="h-5 w-5" />}
            title={t("catalog.results.zero")}
          />
        ) : (
          <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((p, i) => {
              const c = categories.find((x) => x.slug === p.category)!;
              const info = p.i18n[lang];
              return (
                <Reveal key={p.slug} delay={i * 60}>
                  <Card interactive className="group h-full flex flex-col overflow-hidden">
                    <div className="relative aspect-[4/3] overflow-hidden bg-graphite">
                      <img src={p.image} alt={info.name} loading="lazy" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" width={1600} height={1000} />
                      <span className={cn("absolute top-3 left-3 rounded-sm bg-background/90 backdrop-blur px-2 py-1 type-label", accentClasses[c.accent].text)}>
                        {categoryName(lang, c)}
                      </span>
                      {p.hasTechnicalSheet && (
                        <Badge tone="gold" className="absolute top-3 right-3">
                          <FileText className="h-3 w-3" strokeWidth={1.6} /> TDS
                        </Badge>
                      )}
                    </div>
                    <div className="flex flex-col flex-1 p-5">
                      <div className="type-label text-muted-foreground">{p.code}</div>
                      <h3 className="mt-1 type-h4 leading-tight line-clamp-2">{info.name}</h3>
                      <p className="mt-2 type-small text-muted-foreground line-clamp-3">{info.shortDescription}</p>
                      <div className="mt-4 flex flex-wrap gap-1.5">
                        {info.applications.slice(0, 3).map((a) => (
                          <Badge key={a} tone="neutral">{a}</Badge>
                        ))}
                      </div>
                      <div className="mt-5 flex items-center justify-between pt-4 border-t border-border">
                        <Link to="/$lang/products/$slug" params={{ lang, slug: p.slug }}
                          className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:gap-2 transition-all">
                          {t("catalog.card.view")} <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.6} />
                        </Link>
                        <Link to="/$lang/contact" params={{ lang }} className="type-small text-muted-foreground hover:text-foreground">
                          {t("catalog.card.request")}
                        </Link>
                      </div>
                    </div>
                  </Card>
                </Reveal>
              );
            })}
          </div>
        )}
      </Container>
    </>
  );
}

function labelForApp(a: string, t: (k: string) => string): string {
  if (a === "water-purification") return t("industries.water");
  if (a === "air-purification") return t("industries.air");
  return a;
}

function Select({ label, value, onChange, options }: { label: string; value: string; onChange: (v: string) => void; options: { v: string; l: string }[] }) {
  return (
    <DsSelect aria-label={label} value={value} onChange={(e) => onChange(e.target.value)}>
      <option disabled>{label}</option>
      {options.map((o) => <option key={o.v} value={o.v}>{o.l}</option>)}
    </DsSelect>
  );
}
