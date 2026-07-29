import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { useI18n } from "@/i18n/context";
import { Cookie, X } from "lucide-react";
import { Button, GhostButton, Card, Checkbox } from "@/components/ds";

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
      <Card tone="dark" className="mx-auto max-w-3xl border-champagne/20 shadow-[var(--shadow-elevated)] p-5 md:p-6 pointer-events-auto animate-fade-up">
        <div className="flex items-start gap-3">
          <div className="hidden sm:flex h-10 w-10 shrink-0 items-center justify-center rounded-sm bg-champagne/15 text-champagne">
            <Cookie className="h-5 w-5" strokeWidth={1.6} />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between gap-3">
              <h3 className="type-h4 text-ivory">{t("cookies.title")}</h3>
              <button aria-label="close" onClick={() => save({ analytics: false, marketing: false })} className="p-1 -mr-1 text-ivory/60 hover:text-ivory">
                <X className="h-4 w-4" strokeWidth={1.6} />
              </button>
            </div>
            <p className="mt-1 type-small text-ivory/75 leading-relaxed">
              {t("cookies.desc")}{" "}
              <Link to="/$lang/legal/cookies" params={{ lang }} className="underline text-champagne hover:text-champagne/80">
                {t("footer.cookies")}
              </Link>
            </p>

            {showPrefs && (
              <div className="mt-4 space-y-2 type-small">
                <label className="flex items-center justify-between gap-3 rounded-sm border border-ivory/10 bg-ivory/5 px-3 py-2">
                  <span>{t("cookies.necessary")}</span>
                  <span className="text-[10px] uppercase tracking-wider text-champagne">Always on</span>
                </label>
                <label className="flex items-center justify-between gap-3 rounded-sm border border-ivory/10 bg-ivory/5 px-3 py-2 cursor-pointer">
                  <span>{t("cookies.analytics")}</span>
                  <Checkbox checked={analytics} onChange={(e) => setAnalytics(e.target.checked)} />
                </label>
                <label className="flex items-center justify-between gap-3 rounded-sm border border-ivory/10 bg-ivory/5 px-3 py-2 cursor-pointer">
                  <span>{t("cookies.marketing")}</span>
                  <Checkbox checked={marketing} onChange={(e) => setMarketing(e.target.checked)} />
                </label>
              </div>
            )}

            <div className="mt-4 flex flex-wrap items-center gap-2">
              <Button variant="gold" size="sm" onClick={() => save({ analytics: true, marketing: true })}>
                {t("cookies.accept.all")}
              </Button>
              {showPrefs ? (
                <Button variant="inverse" size="sm" onClick={() => save({ analytics, marketing })}>
                  {t("cookies.accept.selected")}
                </Button>
              ) : (
                <Button variant="inverse" size="sm" onClick={() => setShowPrefs(true)}>
                  {t("cookies.settings")}
                </Button>
              )}
              <GhostButton
                size="sm"
                className="text-ivory/60 hover:text-ivory normal-case tracking-normal underline underline-offset-4"
                onClick={() => save({ analytics: false, marketing: false })}
              >
                {t("cookies.reject")}
              </GhostButton>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
