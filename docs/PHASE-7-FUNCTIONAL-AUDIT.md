# Fase 7 — Auditoría funcional final

## Objetivo

Verificar que la aplicación está preparada para su revisión final en Lovable, sin incluir despliegue, dominio, DNS ni configuración de hosting.

## Alcance de revisión

### Navegación pública

- Carga correcta de la portada en español, inglés y francés.
- Cambio de idioma conservando una ruta equivalente cuando exista.
- Funcionamiento de navegación principal, menú móvil, enlaces del pie y migas de pan.
- Comportamiento correcto de rutas inexistentes y estados de error.

### Catálogo

- Listado de categorías y productos.
- Filtros, búsqueda y restablecimiento de filtros.
- Fichas de producto, productos relacionados y enlaces de solicitud.
- Coherencia de nombres, códigos, imágenes y traducciones.

### Formulario de contacto

- Validación de campos obligatorios.
- Enfoque del primer campo con error.
- Envío válido en ES, EN y FR.
- Mensaje de éxito y recuperación tras un fallo.
- Registro del lead en Supabase mediante `submit_public_lead`.
- Prueba de direcciones válidas con apóstrofe, por ejemplo `o'connor@example.com`.

### SEO técnico

- Respuesta válida de `/robots.txt`.
- Respuesta XML válida de `/sitemap.xml`.
- Presencia de variantes ES, EN, FR y `x-default`.
- Canonical, títulos y descripciones coherentes en páginas principales.

### Administración

- Acceso y cierre de sesión.
- Protección de rutas privadas.
- Lectura de leads por usuarios autorizados.
- Actualización de estados de leads.
- Visualización del catálogo administrativo.

### Responsive y accesibilidad

- Revisión en móvil, tableta y escritorio.
- Navegación mediante teclado.
- Enlace para saltar al contenido.
- Foco visible, etiquetas de formularios y mensajes accesibles.
- Ausencia de desbordamientos horizontales.

## Hallazgo corregido durante la auditoría

La validación inicial del RPC rechazaba correos válidos con apóstrofes en la parte local, aunque el formulario del navegador los aceptaba. Se añade una migración que utiliza una comprobación estructural más compatible y mantiene los límites de longitud y seguridad.

## Fuera de alcance

- Publicación desde Lovable.
- Configuración del dominio.
- DNS y certificados.
- Analítica de producción.
- Pruebas sobre el dominio definitivo.

## Criterio de cierre

La fase se considera terminada cuando:

1. GitHub Actions compila correctamente.
2. Las migraciones se aplican en el proyecto Supabase conectado.
3. El formulario registra un lead válido y rechaza entradas inválidas.
4. Las rutas públicas principales se revisan en los tres idiomas.
5. No quedan defectos bloqueantes para la revisión final en Lovable.
