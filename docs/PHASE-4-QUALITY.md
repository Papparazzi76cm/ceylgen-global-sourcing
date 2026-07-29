# Fase 4 — Calidad continua y compilación

## Objetivo

Evitar que cambios en diseño, rutas, formularios o traducciones rompan la aplicación antes de llegar a producción.

## Automatización añadida

Se incorpora un workflow de GitHub Actions que se ejecuta en:

- Cada pull request.
- Cada actualización de la rama `main`.

## Comprobaciones

1. Instalación reproducible con `npm ci`.
2. Análisis estático con `npm run lint`.
3. Compilación de producción con `npm run build`.

## Entorno

- Ubuntu actualizado.
- Node.js 22.
- Caché de npm.
- Tiempo máximo: 15 minutos.
- Permisos mínimos de solo lectura.

## Criterio de aceptación

La fase queda validada cuando el workflow finaliza correctamente sobre la rama y las pull requests dependientes.

## Próximas comprobaciones recomendadas

- Pruebas automáticas del formulario de contacto.
- Auditoría Lighthouse.
- Revisión de enlaces internos y rutas multilingües.
- Prueba de envío real contra el backend de leads.
