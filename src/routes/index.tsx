import { createFileRoute, redirect } from "@tanstack/react-router";

// Home entry: detect browser language and redirect into the localized route tree.
export const Route = createFileRoute("/")({
  beforeLoad: ({ location }) => {
    let lang: "es" | "en" | "fr" = "es";
    if (typeof navigator !== "undefined") {
      const nav = navigator.language?.toLowerCase() ?? "es";
      if (nav.startsWith("en")) lang = "en";
      else if (nav.startsWith("fr")) lang = "fr";
    }
    throw redirect({ to: "/$lang", params: { lang }, search: location.search });
  },
  component: () => null,
});
