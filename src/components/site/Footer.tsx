import { Link } from "@tanstack/react-router";
import { useI18n } from "@/i18n/context";
import { LANGS, LANG_LABELS } from "@/i18n/translations";
import { categories, categoryName } from "@/data/categories";
import { Wordmark } from "./BrandMark";
import { MapPin } from "lucide-react";

export function Footer() {
  const { t, lang } = useI18n();
  const year = new Date().getFullYear();

  return (
    <footer className="bg-graphite text-ivory mt-24">
      <div className="container-page py-16 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
          <div className="md:col-span-4">
            <Wordmark size="md" onDark showTagline={true} />
            <p className="mt-6 type-small text-ivory/70 max-w-sm leading-relaxed">
              {t("footer.desc")}
            </p>
            <div className="mt-6 flex items-center gap-2 type-small text-ivory/60">
              <MapPin className="h-4 w-4 text-champagne/80" strokeWidth={1.6} />
              <span>{t("footer.location")}</span>
            </div>
            <p className="mt-3 text-xs text-ivory/50">{t("footer.contact.note")}</p>
          </div>

          <div className="md:col-span-2">
            <h4 className="type-label text-champagne mb-4">
              {t("footer.products")}
            </h4>
            <ul className="space-y-2.5 type-small text-ivory/75">
              {categories.map((c) => (
                <li key={c.slug}>
                  <Link
                    to="/$lang/categories/$category"
                    params={{ lang, category: c.slug }}
                    className="hover:text-champagne transition-colors"
                  >
                    {categoryName(lang, c)}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  to="/$lang/products"
                  params={{ lang }}
                  className="hover:text-champagne transition-colors"
                >
                  {t("nav.products")}
                </Link>
              </li>
            </ul>
          </div>

          <div className="md:col-span-2">
            <h4 className="type-label text-champagne mb-4">
              {t("footer.company")}
            </h4>
            <ul className="space-y-2.5 type-small text-ivory/75">
              <li><Link to="/$lang/about" params={{ lang }} className="hover:text-champagne transition-colors">{t("nav.about")}</Link></li>
              <li><Link to="/$lang/industries" params={{ lang }} className="hover:text-champagne transition-colors">{t("nav.industries")}</Link></li>
              <li><Link to="/$lang/quality" params={{ lang }} className="hover:text-champagne transition-colors">{t("nav.quality")}</Link></li>
              <li><Link to="/$lang/sustainability" params={{ lang }} className="hover:text-champagne transition-colors">{t("nav.sustainability")}</Link></li>
              <li><Link to="/$lang/contact" params={{ lang }} className="hover:text-champagne transition-colors">{t("nav.contact")}</Link></li>
            </ul>
          </div>

          <div className="md:col-span-2">
            <h4 className="type-label text-champagne mb-4">
              {t("footer.resources")}
            </h4>
            <ul className="space-y-2.5 type-small text-ivory/75">
              <li><Link to="/$lang/resources" params={{ lang }} className="hover:text-champagne transition-colors">{t("nav.resources")}</Link></li>
              <li><Link to="/$lang/contact" params={{ lang }} className="hover:text-champagne transition-colors">{t("contact.access.sheet")}</Link></li>
            </ul>
            <p className="mt-4 text-xs text-ivory/50">{t("footer.social.note")}</p>
          </div>

          <div className="md:col-span-2">
            <h4 className="type-label text-champagne mb-4">
              {t("footer.legal")}
            </h4>
            <ul className="space-y-2.5 type-small text-ivory/75">
              <li><Link to="/$lang/legal/privacy" params={{ lang }} className="hover:text-champagne transition-colors">{t("footer.privacy")}</Link></li>
              <li><Link to="/$lang/legal/cookies" params={{ lang }} className="hover:text-champagne transition-colors">{t("footer.cookies")}</Link></li>
              <li><Link to="/$lang/legal/notice" params={{ lang }} className="hover:text-champagne transition-colors">{t("footer.notice")}</Link></li>
            </ul>
            <h4 className="type-label text-champagne mt-6 mb-3">
              {t("nav.language")}
            </h4>
            <div className="flex gap-1.5">
              {LANGS.map((l) => (
                <Link
                  key={l}
                  to="/$lang"
                  params={{ lang: l }}
                  className={
                    "rounded-sm border px-2 py-1 text-[10px] font-semibold uppercase tracking-wider " +
                    (l === lang
                      ? "border-champagne text-champagne"
                      : "border-ivory/20 text-ivory/60 hover:text-ivory hover:border-ivory/40")
                  }
                  title={LANG_LABELS[l]}
                >
                  {l}
                </Link>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-14 pt-6 border-t border-ivory/10 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 text-xs text-ivory/50">
          <span>© {year} CEYLGEN. {t("footer.rights")}</span>
          <span>Premium Natural Resources</span>
        </div>
      </div>
    </footer>
  );
}
