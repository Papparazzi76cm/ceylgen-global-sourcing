import { Link, useLocation, useNavigate, useParams } from "@tanstack/react-router";
import { useI18n } from "@/i18n/context";
import { LANGS, LANG_LABELS, type Lang } from "@/i18n/translations";
import { categories, categoryName } from "@/data/categories";
import { useEffect, useState } from "react";
import { Menu, X, ChevronDown, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { BrandMark } from "./BrandMark";

const accentDot: Record<string, string> = {
  ocean: "bg-ocean",
  copper: "bg-copper",
  forest: "bg-forest",
  teak: "bg-teak",
};

export function Header() {
  const { t, lang } = useI18n();
  const navigate = useNavigate();
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [productsOpen, setProductsOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setProductsOpen(false);
    setLangOpen(false);
  }, [location.pathname]);

  const changeLang = (next: Lang) => {
    const parts = location.pathname.split("/");
    parts[1] = next;
    navigate({ to: parts.join("/") || `/${next}`, replace: false });
  };

  const nav = [
    { key: "products", label: t("nav.products"), to: `/${lang}/products`, mega: true },
    { key: "industries", label: t("nav.industries"), to: `/${lang}/industries` },
    { key: "quality", label: t("nav.quality"), to: `/${lang}/quality` },
    { key: "sustainability", label: t("nav.sustainability"), to: `/${lang}/sustainability` },
    { key: "about", label: t("nav.about"), to: `/${lang}/about` },
    { key: "resources", label: t("nav.resources"), to: `/${lang}/resources` },
    { key: "contact", label: t("nav.contact"), to: `/${lang}/contact` },
  ];

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full border-b transition-all duration-300",
        scrolled
          ? "border-border/60 bg-background/85 backdrop-blur-md shadow-[0_1px_0_0_var(--border)]"
          : "border-transparent bg-background/60 backdrop-blur",
      )}
    >
      <div className="container-page flex h-16 md:h-20 items-center justify-between gap-4">
        <Link to="/$lang" params={{ lang }} className="flex items-center gap-2.5 group" aria-label="CEYLGEN">
          <BrandMark className="h-8 w-8 text-primary transition-transform group-hover:rotate-6" />
          <div className="flex flex-col leading-none">
            <span className="font-serif text-xl tracking-tight text-foreground">CEYLGEN</span>
            <span className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground hidden sm:block">
              {t("brand.tagline")}
            </span>
          </div>
        </Link>

        <nav className="hidden lg:flex items-center gap-1">
          {nav.map((item) =>
            item.mega ? (
              <div key={item.key} className="relative"
                onMouseEnter={() => setProductsOpen(true)}
                onMouseLeave={() => setProductsOpen(false)}>
                <button
                  className="flex items-center gap-1 px-3 py-2 text-sm font-medium text-foreground/85 hover:text-foreground transition-colors"
                  onClick={() => setProductsOpen((v) => !v)}
                  aria-expanded={productsOpen}
                >
                  {item.label}
                  <ChevronDown className={cn("h-3.5 w-3.5 transition-transform", productsOpen && "rotate-180")} />
                </button>
                {productsOpen && (
                  <div className="absolute left-1/2 top-full -translate-x-1/2 pt-3 min-w-[720px]">
                    <div className="rounded-lg border border-border bg-card shadow-[var(--shadow-elevated)] p-6 animate-fade-up">
                      <div className="grid grid-cols-2 gap-3">
                        {categories.map((c) => (
                          <Link
                            key={c.slug}
                            to="/$lang/categories/$category"
                            params={{ lang, category: c.slug }}
                            className="group flex items-start gap-3 rounded-md p-3 hover:bg-muted transition-colors"
                          >
                            <span
                              className={cn("mt-1 h-2.5 w-2.5 rounded-full shrink-0", accentDot[c.accent])}
                              aria-hidden
                            />
                            <span className="flex flex-col gap-0.5 min-w-0">
                              <span className="font-serif text-base text-foreground">
                                {categoryName(lang, c)}
                              </span>
                              <span className="text-xs text-muted-foreground line-clamp-2">
                                {t(c.descKey)}
                              </span>
                            </span>
                          </Link>
                        ))}
                      </div>
                      <div className="mt-4 flex items-center justify-between border-t border-border pt-4">
                        <Link
                          to="/$lang/products"
                          params={{ lang }}
                          className="text-sm font-medium text-primary inline-flex items-center gap-1 hover:gap-2 transition-all"
                        >
                          {t("nav.products")} <ArrowRight className="h-3.5 w-3.5" />
                        </Link>
                        <div className="gold-line w-32" />
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <Link
                key={item.key}
                to={item.to}
                className="px-3 py-2 text-sm font-medium text-foreground/85 hover:text-foreground transition-colors relative after:absolute after:left-3 after:right-3 after:bottom-1 after:h-px after:bg-champagne after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:origin-left"
                activeProps={{ className: "text-foreground after:scale-x-100" }}
              >
                {item.label}
              </Link>
            ),
          )}
        </nav>

        <div className="hidden md:flex items-center gap-2">
          <div className="relative">
            <button
              onClick={() => setLangOpen((v) => !v)}
              className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-semibold uppercase tracking-wider text-foreground/70 hover:text-foreground border border-transparent hover:border-border rounded transition-colors"
              aria-label={t("nav.language")}
              aria-expanded={langOpen}
            >
              {lang}
              <ChevronDown className={cn("h-3 w-3 transition-transform", langOpen && "rotate-180")} />
            </button>
            {langOpen && (
              <div className="absolute right-0 top-full mt-1 min-w-[140px] rounded-md border border-border bg-card shadow-[var(--shadow-soft)] py-1 animate-fade-up">
                {LANGS.map((l) => (
                  <button
                    key={l}
                    onClick={() => { changeLang(l); setLangOpen(false); }}
                    className={cn(
                      "block w-full text-left px-3 py-2 text-sm hover:bg-muted transition-colors",
                      l === lang && "text-primary font-medium",
                    )}
                  >
                    <span className="uppercase text-xs tracking-wider mr-2">{l}</span>
                    {LANG_LABELS[l]}
                  </button>
                ))}
              </div>
            )}
          </div>
          <Link
            to="/$lang/contact"
            params={{ lang }}
            className="inline-flex items-center gap-1.5 rounded-sm bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground shadow-[var(--shadow-soft)] hover:bg-primary/90 hover:shadow-[var(--shadow-elevated)] transition-all"
          >
            {t("nav.request")}
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>

        <button
          className="lg:hidden inline-flex items-center justify-center p-2 -mr-2 text-foreground"
          onClick={() => setMobileOpen(true)}
          aria-label={t("nav.menu")}
        >
          <Menu className="h-5 w-5" />
        </button>
      </div>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-graphite/60 backdrop-blur-sm animate-fade-up" onClick={() => setMobileOpen(false)} />
          <div className="absolute right-0 top-0 h-full w-[88%] max-w-sm bg-background border-l border-border shadow-[var(--shadow-elevated)] flex flex-col">
            <div className="flex items-center justify-between px-5 h-16 border-b border-border">
              <div className="flex items-center gap-2">
                <BrandMark className="h-7 w-7 text-primary" />
                <span className="font-serif text-lg">CEYLGEN</span>
              </div>
              <button aria-label={t("nav.close")} onClick={() => setMobileOpen(false)} className="p-2 -mr-2">
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto px-5 py-6">
              <p className="text-eyebrow mb-3">{t("nav.products")}</p>
              <div className="space-y-1 mb-6">
                {categories.map((c) => (
                  <Link
                    key={c.slug}
                    to="/$lang/categories/$category"
                    params={{ lang, category: c.slug }}
                    className="flex items-center gap-2.5 py-2 text-foreground/90"
                  >
                    <span className={cn("h-2 w-2 rounded-full", accentDot[c.accent])} />
                    <span className="font-serif">{categoryName(lang, c)}</span>
                  </Link>
                ))}
                <Link
                  to="/$lang/products"
                  params={{ lang }}
                  className="flex items-center gap-1 py-2 text-sm text-primary"
                >
                  {t("nav.products")} <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
              <div className="h-px bg-border mb-6" />
              <nav className="flex flex-col gap-1">
                {nav.filter((n) => !n.mega).map((n) => (
                  <Link
                    key={n.key}
                    to={n.to}
                    className="py-2.5 text-base text-foreground/90"
                  >
                    {n.label}
                  </Link>
                ))}
              </nav>
            </div>
            <div className="border-t border-border p-5 space-y-4">
              <div>
                <p className="text-eyebrow mb-2">{t("nav.language")}</p>
                <div className="flex gap-2">
                  {LANGS.map((l) => (
                    <button
                      key={l}
                      onClick={() => changeLang(l)}
                      className={cn(
                        "flex-1 rounded-sm border px-3 py-2 text-xs font-semibold uppercase tracking-wider transition-colors",
                        l === lang
                          ? "border-primary bg-primary text-primary-foreground"
                          : "border-border text-foreground/70 hover:border-foreground",
                      )}
                    >
                      {l}
                    </button>
                  ))}
                </div>
              </div>
              <Link
                to="/$lang/contact"
                params={{ lang }}
                className="flex items-center justify-center gap-1.5 rounded-sm bg-primary px-4 py-3 text-sm font-medium text-primary-foreground w-full"
              >
                {t("nav.request")} <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
