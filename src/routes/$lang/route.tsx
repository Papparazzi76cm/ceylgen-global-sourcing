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
  const skipLabel =
    lang === "en"
      ? "Skip to main content"
      : lang === "fr"
        ? "Aller au contenu principal"
        : "Saltar al contenido principal";

  return (
    <I18nProvider lang={lang as Lang}>
      <a
        href="#main-content"
        className="fixed left-4 top-4 z-[100] -translate-y-24 rounded-sm bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground shadow-lg transition-transform focus:translate-y-0"
      >
        {skipLabel}
      </a>
      <div className="min-h-screen flex flex-col">
        <Header />
        <main id="main-content" tabIndex={-1} className="flex-1 outline-none">
          <Outlet />
        </main>
        <Footer />
      </div>
      <CookieBanner />
    </I18nProvider>
  );
}
