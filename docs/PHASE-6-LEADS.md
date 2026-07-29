# Fase 6 — Integración segura de leads con Supabase

## Objetivo

Centralizar la validación del formulario público en PostgreSQL y reducir la superficie de ataque del acceso anónimo.

## Cambios

- Se crea la función RPC `public.submit_public_lead`.
- La función normaliza nombre, correo y mensaje antes de guardar.
- Valida longitudes, formato básico del correo, idiomas admitidos y tamaño de metadatos.
- El cliente deja de insertar directamente en `public.leads`.
- Se revoca el permiso `INSERT` de la función pública `anon` sobre la tabla.
- El acceso administrativo existente se mantiene mediante las políticas RLS para personal autenticado.
- Los errores internos de Supabase no se muestran al visitante.

## Comprobaciones necesarias

1. Aplicar la migración en el proyecto Supabase asociado.
2. Enviar una solicitud válida desde cada idioma.
3. Confirmar que el lead aparece en el panel administrativo.
4. Probar correo incorrecto, mensaje vacío y campos demasiado largos.
5. Confirmar que una inserción directa anónima sobre `public.leads` es rechazada.

## Limitaciones

La función reduce el riesgo de entradas inválidas, pero no sustituye una protección antiabuso. Antes del lanzamiento público debe añadirse CAPTCHA o rate limiting en el perímetro si el formulario recibe tráfico automatizado.
