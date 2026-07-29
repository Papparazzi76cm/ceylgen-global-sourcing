import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { useI18n } from "@/i18n/context";
import { Cookie, X } from "lucide-react";

const STORAGE_KEY = "ceylgen.cookies.v1";

interface Prefs {
  necessary: true;
  analytics: boolean;
  marketing: boolean;
  ts: number;
}

export function CookieBanner() {
  const { t, lang } = useI18n();
  const [open, setOpen] = useState(false);
  const [showPrefs, setShowPrefs] = useState(false);
  const [analytics, setAnalytics] = useState(false);
  const [marketing, setMarketing] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) setOpen(true);
    } catch { setOpen(true); }
  }, []);

  const save = (prefs: Omit<Prefs, "ts" | "necessary">) => {
    const value: Prefs = { necessary: true, ...prefs, ts: Date.now() };
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(value)); } catch {}
    setOpen(false);
    setShowPrefs(false);
  };

  if (!open) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-40 p-3 md:p-5 pointer-events-none">
      <div className="mx-auto max-w-3xl bg-graphite text-ivory rounded-lg border border-champagne/20 shadow-[var(--shadow-elevated)] p-5 md:p-6 pointer-events-auto animate-fade-up">
        <div className="flex items-start gap-3">
          <div className="hidden sm:flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-champagne/15 text-champagne">
            <Cookie className="h-5 w-5" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between gap-3">
              <h3 className="font-serif text-lg">{t("cookies.title")}</h3>
              <button aria-label="close" onClick={() => save({ analytics: false, marketing: false })} className="p-1 -mr-1 text-ivory/60 hover:text-ivory">
                <X className="h-4 w-4" />
              </button>
            </div>
            <p className="mt-1 text-sm text-ivory/75 leading-relaxed">
              {t("cookies.desc")}{" "}
              <Link to="/$lang/legal/cookies" params={{ lang }} className="underline text-champagne hover:text-champagne/80">
                {t("footer.cookies")}
              </Link>
            </p>

            {showPrefs && (
              <div className="mt-4 space-y-2 text-sm">
                <label className="flex items-center justify-between gap-3 rounded-md border border-ivory/10 bg-ivory/5 px-3 py-2">
                  <span>{t("cookies.necessary")}</span>
                  <span className="text-[10px] uppercase tracking-wider text-champagne">Always on</span>
                </label>
                <label className="flex items-center justify-between gap-3 rounded-md border border-ivory/10 bg-ivory/5 px-3 py-2 cursor-pointer">
                  <span>{t("cookies.analytics")}</span>
                  <input type="checkbox" checked={analytics} onChange={(e) => setAnalytics(e.target.checked)} className="h-4 w-4 accent-champagne" />
                </label>
                <label className="flex items-center justify-between gap-3 rounded-md border border-ivory/10 bg-ivory/5 px-3 py-2 cursor-pointer">
                  <span>{t("cookies.marketing")}</span>
                  <input type="checkbox" checked={marketing} onChange={(e) => setMarketing(e.target.checked)} className="h-4 w-4 accent-champagne" />
                </label>
              </div>
            )}

            <div className="mt-4 flex flex-wrap items-center gap-2">
              <button
                onClick={() => save({ analytics: true, marketing: true })}
                className="rounded-sm bg-champagne px-4 py-2 text-xs font-semibold uppercase tracking-wider text-graphite hover:bg-champagne/90 transition-colors"
              >
                {t("cookies.accept.all")}
              </button>
              {showPrefs ? (
                <button
                  onClick={() => save({ analytics, marketing })}
                  className="rounded-sm border border-ivory/30 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-ivory hover:bg-ivory/5 transition-colors"
                >
                  {t("cookies.accept.selected")}
                </button>
              ) : (
                <button
                  onClick={() => setShowPrefs(true)}
                  className="rounded-sm border border-ivory/30 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-ivory hover:bg-ivory/5 transition-colors"
                >
                  {t("cookies.settings")}
                </button>
              )}
              <button
                onClick={() => save({ analytics: false, marketing: false })}
                className="text-xs text-ivory/60 hover:text-ivory underline underline-offset-4 px-2 py-2"
              >
                {t("cookies.reject")}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
