import { useI18n } from "@/i18n/context";

export function Legal({ title, body }: { title: string; body: string }) {
  const { t } = useI18n();
  return (
    <section className="container-page pt-16 md:pt-24 pb-20 max-w-3xl">
      <div className="text-eyebrow">CEYLGEN</div>
      <h1 className="mt-4 font-serif text-4xl md:text-5xl">{title}</h1>
      <p className="mt-6 text-muted-foreground leading-relaxed">{body}</p>
      <p className="mt-4 text-xs text-muted-foreground">{t("common.available_on_request")}</p>
    </section>
  );
}

declare global {
  // Exported without export {} so both direct-import and JIT compilers pick it up
}
export {};
