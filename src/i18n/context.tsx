import { createContext, useContext, useMemo, type ReactNode } from "react";
import { t as translate, type Lang } from "./translations";

interface I18nCtx {
  lang: Lang;
  t: (key: string, vars?: Record<string, string | number>) => string;
}

const Ctx = createContext<I18nCtx | null>(null);

export function I18nProvider({ lang, children }: { lang: Lang; children: ReactNode }) {
  const value = useMemo<I18nCtx>(
    () => ({ lang, t: (key, vars) => translate(lang, key, vars) }),
    [lang],
  );
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useI18n(): I18nCtx {
  const v = useContext(Ctx);
  if (!v) throw new Error("useI18n must be used within I18nProvider");
  return v;
}
