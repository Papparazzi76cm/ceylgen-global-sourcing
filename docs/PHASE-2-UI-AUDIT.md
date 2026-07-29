# Fase 2 — Auditoría visual, responsive y de accesibilidad

## Alcance revisado

- Encabezado sticky y navegación principal.
- Mega menú de productos.
- Selector ES / EN / FR.
- Menú lateral móvil.
- Hero y jerarquía visual de la portada.
- Tarjetas de producto e industrias.
- Estructura semántica general.
- SEO básico por idioma.
- Accesibilidad de navegación por teclado.

## Estado actual

La aplicación ya dispone de una identidad visual coherente con el diseño de CEYLGEN: paleta corporativa, tipografías editoriales, espaciado amplio, tarjetas B2B, imágenes temáticas, navegación localizada y llamadas a la acción consistentes.

La portada contiene hero, propuesta de valor, líneas de producto, sourcing internacional, industrias, calidad y sostenibilidad. La estructura es responsive mediante breakpoints de Tailwind y el menú móvil sustituye correctamente la navegación de escritorio.

## Mejora implementada

Se ha añadido un enlace accesible «Saltar al contenido principal» en español, inglés y francés. Permanece oculto visualmente hasta recibir foco mediante teclado y dirige al elemento `main`.

Esto permite que usuarios de teclado y lectores de pantalla eviten repetir toda la navegación en cada página.

## Hallazgos para siguientes iteraciones

### Prioridad alta

1. Convertir el menú móvil en un diálogo accesible con `role="dialog"`, `aria-modal="true"`, cierre mediante Escape y bloqueo del scroll de fondo.
2. Añadir cierre al hacer clic fuera y mediante Escape en los desplegables de idioma y productos.
3. Revisar el foco al abrir y cerrar el menú móvil.
4. Confirmar contraste WCAG de textos secundarios sobre imágenes y fondos oscuros.
5. Validar formularios de contacto con mensajes de error localizados y asociación mediante `aria-describedby`.

### Prioridad media

1. Evitar que el mega menú dependa exclusivamente del hover.
2. Añadir indicadores `aria-current` consistentes en navegación móvil.
3. Comprobar tamaños táctiles mínimos de 44 × 44 px.
4. Incorporar `prefers-reduced-motion` para usuarios que reduzcan animaciones.
5. Revisar textos alternativos de imágenes informativas.

### SEO y contenido

1. Sustituir enlaces canonical relativos por URL absolutas cuando el dominio definitivo esté conectado.
2. Añadir `hreflang` entre versiones ES, EN y FR.
3. Completar Open Graph con una imagen social definitiva.
4. Verificar que cada página tenga título y descripción propios.
5. Generar `sitemap.xml` y `robots.txt` al cerrar la arquitectura pública.

## Criterio visual recomendado

La interfaz debe conservar la estética actual y evitar una reconstrucción innecesaria. Las siguientes mejoras deben centrarse en:

- Refinar espaciado y jerarquía.
- Mejorar accesibilidad y comportamiento de navegación.
- Sustituir recursos provisionales por materiales definitivos.
- Homogeneizar las páginas internas con la portada.
- Optimizar rendimiento y carga de imágenes.

## Resultado

La base visual es válida para continuar. No se recomienda migrar de framework ni reemplazar el design system. La siguiente fase debe abordar contenido definitivo, formularios y funcionalidades comerciales.
