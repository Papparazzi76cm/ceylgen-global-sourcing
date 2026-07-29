import { createFileRoute } from "@tanstack/react-router";
import { useI18n } from "@/i18n/context";

export const Route = createFileRoute("/$lang/legal/cookies")({
  head: ({ params }) => ({ meta: [{ title: "Cookies · CEYLGEN" }, { name: "robots", content: "noindex" }], links: [{ rel: "canonical", href: `/${params.lang}/legal/cookies` }] }),
  component: () => { const { t } = useI18n(); return <Legal title={t("legal.cookies.title")} body={t("legal.placeholder")} />; },
});
