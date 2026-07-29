
CREATE POLICY "storage_public_read_assets" ON storage.objects FOR SELECT
  USING (bucket_id IN ('product-images','product-documents','resources'));

CREATE POLICY "storage_staff_insert_assets" ON storage.objects FOR INSERT TO authenticated
  WITH CHECK (
    bucket_id IN ('product-images','product-documents','resources')
    AND public.is_staff(auth.uid())
  );

CREATE POLICY "storage_staff_update_assets" ON storage.objects FOR UPDATE TO authenticated
  USING (
    bucket_id IN ('product-images','product-documents','resources')
    AND public.is_staff(auth.uid())
  );

CREATE POLICY "storage_staff_delete_assets" ON storage.objects FOR DELETE TO authenticated
  USING (
    bucket_id IN ('product-images','product-documents','resources')
    AND public.is_staff(auth.uid())
  );
