import { createFileRoute } from "@tanstack/react-router";
import { useI18n } from "@/i18n/context";

export const Route = createFileRoute("/$lang/legal/privacy")({
  head: ({ params }) => ({ meta: [{ title: "Privacy · CEYLGEN" }, { name: "robots", content: "noindex" }], links: [{ rel: "canonical", href: `/${params.lang}/legal/privacy` }] }),
  component: () => { const { t } = useI18n(); return <Legal title={t("legal.privacy.title")} body={t("legal.placeholder")} />; },
});
