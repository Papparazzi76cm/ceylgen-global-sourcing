import { Link, useLocation, useNavigate } from "@tanstack/react-router";
import { useI18n } from "@/i18n/context";
import { LANGS, LANG_LABELS, type Lang } from "@/i18n/translations";
import { categories, categoryName } from "@/data/categories";
import { useEffect, useState } from "react";
import { Menu, X, ChevronDown, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { Wordmark } from "./BrandMark";
import { Button } from "@/components/ds";

export function Header() {
  const { t, lang } = useI18n();
  const navigate = useNavigate();
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [productsOpen, setProductsOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
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
        "sticky top-0 z-50 w-full bg-background/92 backdrop-blur-[6px]",
        "transition-[box-shadow,background-color] duration-[520ms] ease-[var(--ease-brand)]",
        scrolled ? "shadow-[0_1px_0_0_var(--border),0_10px_30px_-24px_oklch(0.2_0.02_236/0.35)]" : "shadow-none",
      )}
    >
      <div
        className={cn(
          "container-page flex items-center justify-between gap-6",
          "transition-[height] duration-[520ms] ease-[var(--ease-brand)]",
          scrolled ? "h-[72px] md:h-[84px]" : "h-[84px] md:h-[124px]",
        )}
      >
        <Link
          to="/$lang"
          params={{ lang }}
          className="shrink-0"
          aria-label="CEYLGEN Premium Natural Resources"
        >
          <span className="hidden md:block transition-opacity duration-[520ms]">
            <Wordmark size={scrolled ? "md" : "lg"} showTagline={!scrolled} />
          </span>
          <span className="md:hidden">
            <Wordmark size="md" showTagline={false} />
          </span>
        </Link>

        <nav className="hidden lg:flex items-center gap-6 xl:gap-8">
          {nav.map((item) =>
            item.mega ? (
              <div
                key={item.key}
                className="relative"
                onMouseEnter={() => setProductsOpen(true)}
                onMouseLeave={() => setProductsOpen(false)}
              >
                <button
                  className="flex items-center gap-1.5 py-2 type-label text-foreground/65 hover:text-foreground transition-colors duration-[420ms] ease-[var(--ease-brand)] underline-draw"
                  onClick={() => setProductsOpen((v) => !v)}
                  aria-expanded={productsOpen}
                >
                  {item.label}
                  <ChevronDown
                    className={cn("h-3 w-3 transition-transform duration-[420ms]", productsOpen && "rotate-180")}
                    strokeWidth={1}
                  />
                </button>
              </div>
            ) : (
              <Link
                key={item.key}
                to={item.to}
                className="py-2 type-label text-foreground/65 hover:text-foreground transition-colors duration-[420ms] ease-[var(--ease-brand)] underline-draw"
                activeProps={{ className: "text-foreground" }}
              >
                {item.label}
              </Link>
            ),
          )}
        </nav>

        <div className="hidden md:flex items-center gap-5 shrink-0">
          <div className="relative">
            <button
              onClick={() => setLangOpen((v) => !v)}
              className="flex items-center gap-1.5 py-2 type-label text-foreground/55 hover:text-foreground transition-colors duration-[420ms]"
              aria-label={t("nav.language")}
              aria-expanded={langOpen}
            >
              <span className="uppercase">{lang}</span>
              <ChevronDown className={cn("h-3 w-3 transition-transform duration-[420ms]", langOpen && "rotate-180")} strokeWidth={1} />
            </button>
            {langOpen && (
              <div className="absolute right-0 top-full mt-3 min-w-[168px] border border-border bg-card shadow-[var(--shadow-elevated)] py-2 animate-fade-up">
                {LANGS.map((l) => (
                  <button
                    key={l}
                    onClick={() => { changeLang(l); setLangOpen(false); }}
                    className={cn(
                      "flex w-full items-center gap-3 px-4 py-2.5 type-small text-left transition-colors hover:bg-secondary/60",
                      l === lang && "text-champagne",
                    )}
                  >
                    <span className="type-label w-5">{l}</span>
                    <span className="text-muted-foreground">{LANG_LABELS[l]}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
          <Button asChild variant="secondary" size="sm">
            <Link to="/$lang/contact" params={{ lang }}>
              {t("nav.request")}
              <ArrowRight strokeWidth={1} />
            </Link>
          </Button>
        </div>

        <button
          className="lg:hidden inline-flex items-center justify-center p-2 -mr-2 text-foreground"
          onClick={() => setMobileOpen(true)}
          aria-label={t("nav.menu")}
        >
          <Menu className="h-5 w-5" strokeWidth={1} />
        </button>
      </div>

      {/* Full-width mega panel — editorial, hairline, no heavy surfaces */}
      <div
        className={cn(
          "hidden lg:block absolute left-0 right-0 top-full overflow-hidden border-t border-border bg-background",
          "transition-[max-height,opacity] duration-[520ms] ease-[var(--ease-brand)]",
          productsOpen ? "max-h-[520px] opacity-100" : "max-h-0 opacity-0 pointer-events-none",
        )}
        onMouseEnter={() => setProductsOpen(true)}
        onMouseLeave={() => setProductsOpen(false)}
      >
        <div className="container-page py-14">
          <div className="grid grid-cols-12 gap-12">
            <div className="col-span-3">
              <p className="type-label text-muted-foreground">{t("lines.eyebrow")}</p>
              <p className="mt-5 type-h3 max-w-[14ch]">{t("lines.title")}</p>
              <Link
                to="/$lang/products"
                params={{ lang }}
                className="mt-7 inline-flex items-center gap-2 type-label text-graphite underline-draw"
              >
                {t("nav.products")}
                <ArrowRight className="h-3 w-3" strokeWidth={1} />
              </Link>
            </div>
            <div className="col-span-9 grid grid-cols-4 gap-x-8">
              {categories.map((c, i) => (
                <Link
                  key={c.slug}
                  to="/$lang/categories/$category"
                  params={{ lang, category: c.slug }}
                  className="group relative block pt-6"
                >
                  <span className="absolute left-0 top-0 h-px w-full bg-border" />
                  <span className="absolute left-0 top-0 h-px w-0 bg-champagne transition-[width] duration-[720ms] ease-[var(--ease-brand)] group-hover:w-full" />
                  <span className="type-index">{String(i + 1).padStart(2, "0")}</span>
                  <span className="mt-5 block type-h4">{categoryName(lang, c)}</span>
                  <span className="mt-3 block type-small text-muted-foreground line-clamp-3">
                    {t(c.descKey)}
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-graphite/50 backdrop-blur-sm animate-fade-up" onClick={() => setMobileOpen(false)} />
          <div className="absolute right-0 top-0 h-full w-[92%] max-w-md bg-background flex flex-col animate-fade-up">
            <div className="flex items-center justify-between px-6 h-[84px]">
              <Wordmark size="md" showTagline={false} />
              <button aria-label={t("nav.close")} onClick={() => setMobileOpen(false)} className="p-2 -mr-2">
                <X className="h-5 w-5" strokeWidth={1} />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto px-6 pt-6 pb-10">
              <p className="type-label text-muted-foreground">{t("nav.products")}</p>
              <div className="mt-5">
                {categories.map((c, i) => (
                  <Link
                    key={c.slug}
                    to="/$lang/categories/$category"
                    params={{ lang, category: c.slug }}
                    className="flex items-baseline gap-4 border-t border-border py-4"
                  >
                    <span className="type-index">{String(i + 1).padStart(2, "0")}</span>
                    <span className="type-h4">{categoryName(lang, c)}</span>
                  </Link>
                ))}
                <Link
                  to="/$lang/products"
                  params={{ lang }}
                  className="flex items-center gap-2 border-t border-border py-4 type-label text-champagne"
                >
                  {t("nav.products")} <ArrowRight className="h-3 w-3" strokeWidth={1} />
                </Link>
              </div>

              <nav className="mt-10 flex flex-col">
                {nav.filter((n) => !n.mega).map((n) => (
                  <Link key={n.key} to={n.to} className="border-t border-border py-4 type-h4">
                    {n.label}
                  </Link>
                ))}
              </nav>
            </div>
            <div className="px-6 pb-8 pt-6 border-t border-border space-y-5">
              <div className="flex items-center gap-5">
                <span className="type-label text-muted-foreground">{t("nav.language")}</span>
                <div className="flex gap-4">
                  {LANGS.map((l) => (
                    <button
                      key={l}
                      onClick={() => changeLang(l)}
                      className={cn(
                        "type-label transition-colors",
                        l === lang ? "text-champagne" : "text-foreground/45 hover:text-foreground",
                      )}
                    >
                      {l}
                    </button>
                  ))}
                </div>
              </div>
              <Button asChild variant="primary" className="w-full">
                <Link to="/$lang/contact" params={{ lang }}>
                  {t("nav.request")} <ArrowRight strokeWidth={1} />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
