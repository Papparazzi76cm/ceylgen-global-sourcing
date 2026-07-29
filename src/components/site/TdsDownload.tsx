import { useEffect, useState } from "react";
import { Download } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import type { Lang } from "@/i18n/translations";
import { useI18n } from "@/i18n/context";
import { Button, Spinner } from "@/components/ds";

interface Props {
  productCode: string; // e.g. CG-AC-001
}

const LABELS: Record<Lang, string> = {
  es: "Descargar ficha técnica",
  en: "Download data sheet",
  fr: "Télécharger la fiche",
};

/**
 * Client-only button that resolves a signed URL for the product's technical
 * data sheet in the current language and opens it in a new tab. Falls back
 * silently if the backend is unreachable — the "Request data sheet" CTA
 * beside it always works.
 */
export function TdsDownload({ productCode }: Props) {
  const { lang } = useI18n();
  const [busy, setBusy] = useState(false);
  const [available, setAvailable] = useState<boolean | null>(null);

  const path = `${productCode.toLowerCase()}/tds-${lang}.png`;

  useEffect(() => {
    let cancelled = false;
    supabase.storage
      .from("product-documents")
      .createSignedUrl(path, 60)
      .then(({ error }) => { if (!cancelled) setAvailable(!error); })
      .catch(() => { if (!cancelled) setAvailable(false); });
    return () => { cancelled = true; };
  }, [path]);

  if (available === false) return null;

  async function onDownload() {
    setBusy(true);
    try {
      const { data, error } = await supabase.storage
        .from("product-documents")
        .createSignedUrl(path, 300, { download: `${productCode}-${lang.toUpperCase()}.png` });
      if (error || !data?.signedUrl) return;
      window.open(data.signedUrl, "_blank", "noopener,noreferrer");
    } finally {
      setBusy(false);
    }
  }

  return (
    <Button type="button" variant="gold" onClick={onDownload} disabled={busy}>
      {busy ? <Spinner /> : <Download className="h-4 w-4" strokeWidth={1.6} />}
      {LABELS[lang]}
    </Button>
  );
}
