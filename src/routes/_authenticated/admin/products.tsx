import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Link } from "@tanstack/react-router";
import { FileText, Star } from "lucide-react";
import { Eyebrow, Table, THead, TBody, TR, TH, TD, Badge, LoadingRow, EmptyState } from "@/components/ds";

type Row = {
  id: string; slug: string; code: string; category_slug: string;
  featured: boolean; published: boolean; image_url: string | null;
  has_technical_sheet: boolean;
};

export const Route = createFileRoute("/_authenticated/admin/products")({
  head: () => ({ meta: [{ title: "Productos — CEYLGEN Admin" }, { name: "robots", content: "noindex" }] }),
  component: ProductsList,
});

function ProductsList() {
  const [rows, setRows] = useState<Row[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const { data } = await supabase
        .from("products")
        .select("id, slug, code, category_slug, featured, published, image_url, has_technical_sheet")
        .order("sort_order");
      setRows((data ?? []) as Row[]);
      setLoading(false);
    })();
  }, []);

  return (
    <div>
      <Eyebrow>Catálogo</Eyebrow>
      <h1 className="mt-2 type-h1">Productos</h1>
      <p className="mt-2 type-small text-muted-foreground">Gestiona el catálogo, especificaciones y traducciones.</p>

      <div className="mt-8">
        {loading ? (
          <Table>
            <TBody>
              <TR><TD colSpan={5}><LoadingRow label="Cargando…" /></TD></TR>
            </TBody>
          </Table>
        ) : rows.length === 0 ? (
          <EmptyState title="Sin productos" description="Todavía no hay productos en el catálogo." />
        ) : (
          <Table>
            <THead>
              <TR>
                <TH>Código</TH>
                <TH>Slug</TH>
                <TH>Categoría</TH>
                <TH>Estado</TH>
                <TH>TDS</TH>
              </TR>
            </THead>
            <TBody>
              {rows.map((r) => (
                <TR key={r.id}>
                  <TD className="font-mono text-xs">{r.code}</TD>
                  <TD>
                    <Link to="/$lang/products/$slug" params={{ lang: "es", slug: r.slug }} className="text-primary hover:underline">
                      {r.slug}
                    </Link>
                  </TD>
                  <TD className="text-muted-foreground">{r.category_slug}</TD>
                  <TD>
                    <Badge tone={r.published ? "success" : "neutral"}>
                      {r.published ? "Publicado" : "Borrador"}
                    </Badge>
                    {r.featured && <Star className="ml-2 inline h-3 w-3 text-champagne" strokeWidth={1.6} />}
                  </TD>
                  <TD>{r.has_technical_sheet && <FileText className="h-4 w-4 text-muted-foreground" strokeWidth={1.6} />}</TD>
                </TR>
              ))}
            </TBody>
          </Table>
        )}
      </div>
      <p className="mt-4 text-xs text-muted-foreground">La edición inline se habilitará en la siguiente iteración.</p>
    </div>
  );
}
