-- Ajusta la validación del correo del formulario público para aceptar
-- direcciones válidas con caracteres como apóstrofes en la parte local.
-- Se mantiene una comprobación estructural básica y se evita duplicar
-- una validación RFC completa en PostgreSQL.

CREATE OR REPLACE FUNCTION public.submit_public_lead(
  p_name TEXT,
  p_email TEXT,
  p_message TEXT,
  p_company TEXT DEFAULT NULL,
  p_phone TEXT DEFAULT NULL,
  p_country TEXT DEFAULT NULL,
  p_interest TEXT DEFAULT NULL,
  p_lang TEXT DEFAULT NULL,
  p_source TEXT DEFAULT 'contact-form',
  p_meta JSONB DEFAULT '{}'::jsonb
)
RETURNS UUID
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_id UUID;
  v_name TEXT := btrim(COALESCE(p_name, ''));
  v_email TEXT := lower(btrim(COALESCE(p_email, '')));
  v_message TEXT := btrim(COALESCE(p_message, ''));
BEGIN
  IF char_length(v_name) NOT BETWEEN 1 AND 200 THEN
    RAISE EXCEPTION 'invalid_name';
  END IF;

  IF char_length(v_email) NOT BETWEEN 3 AND 320
     OR v_email !~ '^[^[:space:]@]+@[^[:space:]@]+\.[^[:space:]@]+$' THEN
    RAISE EXCEPTION 'invalid_email';
  END IF;

  IF char_length(v_message) NOT BETWEEN 1 AND 5000 THEN
    RAISE EXCEPTION 'invalid_message';
  END IF;

  IF p_company IS NOT NULL AND char_length(btrim(p_company)) > 200 THEN
    RAISE EXCEPTION 'invalid_company';
  END IF;

  IF p_phone IS NOT NULL AND char_length(btrim(p_phone)) > 40 THEN
    RAISE EXCEPTION 'invalid_phone';
  END IF;

  IF p_country IS NOT NULL AND char_length(btrim(p_country)) > 100 THEN
    RAISE EXCEPTION 'invalid_country';
  END IF;

  IF p_interest IS NOT NULL AND char_length(btrim(p_interest)) > 200 THEN
    RAISE EXCEPTION 'invalid_interest';
  END IF;

  IF p_lang IS NOT NULL AND p_lang NOT IN ('es', 'en', 'fr') THEN
    RAISE EXCEPTION 'invalid_language';
  END IF;

  IF char_length(COALESCE(p_source, 'contact-form')) > 80 THEN
    RAISE EXCEPTION 'invalid_source';
  END IF;

  IF pg_column_size(COALESCE(p_meta, '{}'::jsonb)) > 8192 THEN
    RAISE EXCEPTION 'invalid_metadata';
  END IF;

  INSERT INTO public.leads (
    name,
    company,
    email,
    phone,
    country,
    interest,
    message,
    lang,
    source,
    meta
  )
  VALUES (
    v_name,
    NULLIF(btrim(p_company), ''),
    v_email,
    NULLIF(btrim(p_phone), ''),
    NULLIF(btrim(p_country), ''),
    NULLIF(btrim(p_interest), ''),
    v_message,
    p_lang,
    COALESCE(NULLIF(btrim(p_source), ''), 'contact-form'),
    COALESCE(p_meta, '{}'::jsonb)
  )
  RETURNING id INTO v_id;

  RETURN v_id;
END;
$$;
