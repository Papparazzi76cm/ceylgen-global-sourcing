# Fase 5 — SEO técnico

## Cambios implementados

- Sitemap XML generado desde las rutas, categorías y productos actuales.
- URLs absolutas calculadas a partir del dominio real de cada petición.
- Alternativas `hreflang` para español, inglés y francés.
- Alternativa `x-default` dirigida a la versión española.
- Escape XML para evitar documentos inválidos.
- Frecuencia y prioridad diferenciadas para portada, páginas, categorías y productos.
- `robots.txt` dinámico con referencia absoluta al sitemap.
- Exclusión de las rutas privadas `/admin` y `/auth` de los rastreadores.
- Cabeceras de caché y tipos MIME correctos.

## Ventaja del enfoque dinámico

No se fija todavía un dominio en el código. El sitemap y robots utilizan el origen de la petición, por lo que funcionarán durante las pruebas y también cuando se conecte el dominio definitivo.

## Pendiente en esta fase

- Centralizar canonical, Open Graph y Twitter Cards.
- Añadir `hreflang` HTML en las páginas públicas.
- Revisar títulos y descripciones por idioma.
- Validar el sitemap en el entorno desplegado.
- Medir Core Web Vitals y optimizar los recursos que afecten al LCP.

## Criterio de aceptación de esta entrega

- `/robots.txt` responde en texto plano y enlaza `/sitemap.xml`.
- `/sitemap.xml` responde como XML válido y contiene las tres versiones idiomáticas.
- La compilación de producción termina correctamente en GitHub Actions.
