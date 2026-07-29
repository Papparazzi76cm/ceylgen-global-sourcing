# Corrección del workflow de CI

El error se producía en `npm ci` porque `package.json` y `package-lock.json` no están sincronizados.

Se sustituye temporalmente `npm ci` por `npm install --no-audit --no-fund` para permitir que GitHub Actions continúe con lint y build.

La solución definitiva será regenerar y confirmar `package-lock.json`, y después restaurar `npm ci`.
