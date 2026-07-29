# Fase 8 — Panel administrativo ampliado

## Objetivo

Permitir que el equipo de CEYLGEN gestione el catálogo y los recursos principales desde la propia aplicación, sin depender de Supabase Studio para las tareas editoriales habituales.

## Funcionalidades incluidas

### Dashboard

- Indicadores de productos, categorías, recursos y leads.
- Conteo de leads nuevos.
- Conteo de productos en borrador.
- Accesos directos desde cada indicador.
- Aviso cuando alguna consulta no puede cargarse.

### Productos

- Búsqueda por código, slug o categoría.
- Filtro por estado de publicación.
- Edición rápida de categoría, imagen, orden, publicación, destacado y disponibilidad de ficha técnica.
- Enlace directo a la ficha pública en español.

### Categorías

- Creación de categorías.
- Normalización automática del slug.
- Edición de acento, imagen, orden y visibilidad.
- Activación o desactivación de categorías con productos.
- Eliminación protegida por las relaciones de base de datos.

### Recursos

- Creación y edición de folletos, fichas técnicas, certificados y otros documentos.
- Gestión por idioma ES, EN y FR.
- Soporte para archivos alojados en Supabase Storage y enlaces externos.
- Ordenación y publicación.
- Eliminación desde el panel.

## Seguridad

Todas las operaciones siguen protegidas por la autenticación existente, los roles `admin` y `editor` y las políticas RLS de Supabase. El panel no utiliza claves de servicio en el navegador.

## Alcance pendiente

La edición avanzada de traducciones completas de productos, especificaciones técnicas y documentos vinculados por producto puede desarrollarse como una iteración independiente. Esta fase cubre la administración operativa esencial y deja preparada la navegación para futuras ampliaciones.

## Exclusiones

No incluye deployment, dominio, DNS, hosting ni configuración de producción. Estas tareas se realizarán posteriormente desde Lovable.
