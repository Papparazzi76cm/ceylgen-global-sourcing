# CEYLGEN — Arquitectura técnica

## Estado de la Fase 1

La base del proyecto ya está construida y operativa sobre una arquitectura moderna preparada para una web corporativa B2B multilingüe.

## Stack actual

- React 19
- TypeScript
- Vite
- TanStack Router con rutas tipadas y file-based routing
- TanStack Query
- Tailwind CSS 4
- Radix UI
- Lucide React
- Supabase preparado como backend
- React Hook Form y Zod para formularios y validación

## Estructura funcional

- `src/routes/`: páginas y rutas públicas localizadas.
- `src/components/`: componentes reutilizables y componentes del sitio.
- `src/assets/`: imágenes y recursos visuales.
- `src/data/`: catálogos y datos estructurados.
- `src/i18n/`: traducciones y contexto multilingüe.
- `src/lib/`: utilidades compartidas.
- `public/`: recursos públicos, documentos y metadatos.

## Enrutamiento e idiomas

La raíz detecta el idioma del navegador y redirige a una de estas ramas:

- `/es`
- `/en`
- `/fr`

Las páginas comparten una estructura de rutas localizada mediante el parámetro `$lang`.

## Principios de implementación

1. Diseño responsive desde móvil hasta escritorio.
2. Componentes reutilizables y desacoplados.
3. Contenido traducible sin mezclar idiomas.
4. Metadatos SEO específicos por idioma y página.
5. Accesibilidad semántica y navegación con teclado.
6. Carga diferida de imágenes y recursos no críticos.
7. Preparación para formularios conectados a Supabase.
8. Separación entre datos de producto, presentación y lógica.

## Rutas previstas

- Inicio
- Productos
- Categorías de producto
- Fichas individuales
- Industrias y aplicaciones
- Calidad y cumplimiento
- Sostenibilidad
- Empresa
- Recursos y documentación
- Contacto
- Aviso legal
- Privacidad
- Cookies

## Estrategia de ramas

- `main`: versión estable.
- `chore/fase-1-arquitectura`: documentación y ajustes estructurales de la Fase 1.
- Las siguientes fases se desarrollarán en ramas independientes y se integrarán mediante Pull Request.

## Siguiente fase

La Fase 2 se centrará en revisar y perfeccionar el sistema visual, el header, la navegación, el hero, la consistencia responsive y la adaptación exacta a la identidad de CEYLGEN.
