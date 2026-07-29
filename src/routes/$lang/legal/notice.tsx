import { createFileRoute } from "@tanstack/react-router";
import { useI18n } from "@/i18n/context";
import { Legal } from "@/components/site/Legal";

export const Route = createFileRoute("/$lang/legal/notice")({
  head: ({ params }) => ({ meta: [{ title: "Legal notice · CEYLGEN" }, { name: "robots", content: "noindex" }], links: [{ rel: "canonical", href: `/${params.lang}/legal/notice` }] }),
  component: () => { const { t } = useI18n(); return <Legal title={t("legal.notice.title")} body={t("legal.placeholder")} />; },
});
