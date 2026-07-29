import { Link } from "@tanstack/react-router";
import { useI18n } from "@/i18n/context";
import { LANGS, LANG_LABELS } from "@/i18n/translations";
import { categories, categoryName } from "@/data/categories";
import { Wordmark } from "./BrandMark";

export function Footer() {
  const { t, lang } = useI18n();
  const year = new Date().getFullYear();

  const linkCls =
    "type-small text-ivory/60 hover:text-champagne transition-colors duration-[420ms] ease-[var(--ease-brand)]";
  const colTitle = "type-label text-ivory/40";

  return (
    <footer className="bg-graphite text-ivory">
      <div className="container-page pt-24 pb-12 md:pt-32 md:pb-16">
        {/* Brand statement — the footer opens like a page, not a sitemap */}
        <div className="grid grid-cols-1 gap-14 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <Wordmark size="lg" onDark showTagline />
            <p className="mt-10 max-w-sm type-lead text-ivory/60">{t("footer.desc")}</p>
            <p className="mt-10 type-label text-ivory/40">{t("footer.location")}</p>
            <p className="mt-3 type-small text-ivory/45">{t("footer.contact.note")}</p>
          </div>

          <div className="lg:col-span-7 grid grid-cols-2 gap-x-10 gap-y-12 md:grid-cols-4">
            <div>
              <h4 className={colTitle}>{t("footer.products")}</h4>
              <ul className="mt-6 space-y-3">
                {categories.map((c) => (
                  <li key={c.slug}>
                    <Link to="/$lang/categories/$category" params={{ lang, category: c.slug }} className={linkCls}>
                      {categoryName(lang, c)}
                    </Link>
                  </li>
                ))}
                <li>
                  <Link to="/$lang/products" params={{ lang }} className={linkCls}>
                    {t("nav.products")}
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className={colTitle}>{t("footer.company")}</h4>
              <ul className="mt-6 space-y-3">
                <li><Link to="/$lang/about" params={{ lang }} className={linkCls}>{t("nav.about")}</Link></li>
                <li><Link to="/$lang/industries" params={{ lang }} className={linkCls}>{t("nav.industries")}</Link></li>
                <li><Link to="/$lang/quality" params={{ lang }} className={linkCls}>{t("nav.quality")}</Link></li>
                <li><Link to="/$lang/sustainability" params={{ lang }} className={linkCls}>{t("nav.sustainability")}</Link></li>
                <li><Link to="/$lang/contact" params={{ lang }} className={linkCls}>{t("nav.contact")}</Link></li>
              </ul>
            </div>

            <div>
              <h4 className={colTitle}>{t("footer.resources")}</h4>
              <ul className="mt-6 space-y-3">
                <li><Link to="/$lang/resources" params={{ lang }} className={linkCls}>{t("nav.resources")}</Link></li>
                <li><Link to="/$lang/contact" params={{ lang }} className={linkCls}>{t("contact.access.sheet")}</Link></li>
              </ul>
              <p className="mt-6 type-small text-ivory/35">{t("footer.social.note")}</p>
            </div>

            <div>
              <h4 className={colTitle}>{t("footer.legal")}</h4>
              <ul className="mt-6 space-y-3">
                <li><Link to="/$lang/legal/privacy" params={{ lang }} className={linkCls}>{t("footer.privacy")}</Link></li>
                <li><Link to="/$lang/legal/cookies" params={{ lang }} className={linkCls}>{t("footer.cookies")}</Link></li>
                <li><Link to="/$lang/legal/notice" params={{ lang }} className={linkCls}>{t("footer.notice")}</Link></li>
              </ul>

              <h4 className={`${colTitle} mt-10`}>{t("nav.language")}</h4>
              <div className="mt-5 flex gap-5">
                {LANGS.map((l) => (
                  <Link
                    key={l}
                    to="/$lang"
                    params={{ lang: l }}
                    title={LANG_LABELS[l]}
                    className={
                      "type-label transition-colors duration-[420ms] " +
                      (l === lang ? "text-champagne" : "text-ivory/40 hover:text-ivory")
                    }
                  >
                    {l}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Brand rule — a single gold hairline closes the page */}
        <div className="mt-24 h-px w-full bg-ivory/12" />

        <div className="mt-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <span className="type-small text-ivory/40">© {year} CEYLGEN. {t("footer.rights")}</span>
          <span className="type-label text-ivory/30">Premium Natural Resources</span>
        </div>
      </div>
    </footer>
  );
}
