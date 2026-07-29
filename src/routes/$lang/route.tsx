import { createFileRoute, Outlet, notFound } from "@tanstack/react-router";
import { I18nProvider } from "@/i18n/context";
import { isLang, type Lang } from "@/i18n/translations";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { CookieBanner } from "@/components/site/CookieBanner";

export const Route = createFileRoute("/$lang")({
  beforeLoad: ({ params }) => {
    if (!isLang(params.lang)) throw notFound();
  },
  component: LangLayout,
});

function LangLayout() {
  const { lang } = Route.useParams();
  return (
    <I18nProvider lang={lang as Lang}>
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1">
          <Outlet />
        </main>
        <Footer />
      </div>
      <CookieBanner />
    </I18nProvider>
  );
}
