# Nota de implementación — Fase 3

Esta rama introduce la base reutilizable para normalizar la accesibilidad de los campos del formulario comercial.

## Incluido

- Componente `FormField` con asociación `label`/`input`.
- `aria-invalid` y `aria-describedby` cuando existe error.
- Mensajes de error con `role="alert"`.
- Soporte para `autocomplete`.
- Documento de alcance y criterios de aceptación.

## Pendiente antes de fusionar en producción

- Sustituir los campos locales de `contact.tsx` por `FormField`.
- Añadir enfoque automático al primer error.
- Revisar `select`, `textarea`, radio buttons y consentimiento con el mismo patrón.
- Ejecutar compilación, lint y prueba manual de teclado.

Esta separación evita introducir un cambio masivo en el formulario sin validación previa.
