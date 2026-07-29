# Fase 3 — Formularios, conversión y accesibilidad

## Objetivo

Mejorar el formulario comercial de CEYLGEN para que sea más accesible, claro y fiable sin alterar la integración actual de leads.

## Alcance

- Asociación explícita entre etiquetas y campos mediante `htmlFor` e `id`.
- Marcado `aria-invalid` y `aria-describedby` en campos con error.
- Mensajes de error con identificadores estables y `role="alert"`.
- Enfoque automático del primer campo inválido tras una validación fallida.
- Región de estado accesible para el resultado del envío.
- Metadatos de la página de contacto localizados en español, inglés y francés.
- Conservación de la validación Zod, honeypot y servicio `submitLead` existentes.

## Criterios de aceptación

1. Un lector de pantalla identifica correctamente cada etiqueta.
2. Los errores quedan vinculados al campo correspondiente.
3. Tras un envío inválido, el foco se mueve al primer campo con error.
4. El botón conserva su estado deshabilitado durante el envío.
5. No se modifica el contrato de datos enviado al servicio de leads.
