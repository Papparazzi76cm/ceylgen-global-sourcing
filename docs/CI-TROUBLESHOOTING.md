# Corrección del workflow de CI

## Causa del error

El workflow fallaba antes de ejecutar lint y build porque `npm ci` exige que `package.json` y `package-lock.json` estén completamente sincronizados.

El repositorio contiene actualmente diferencias entre ambos archivos en dependencias transitivas como `ajv`, `fast-uri`, `json-schema-traverse` y `lru-cache`.

## Corrección aplicada

Se sustituye temporalmente:

```bash
npm ci
```

por:

```bash
npm install --no-audit --no-fund
```

Esto permite instalar las dependencias, actualizar la resolución necesaria y continuar con las comprobaciones de lint y compilación.

## Solución definitiva recomendada

Cuando se trabaje con el repositorio en un entorno local o Codespace, se debe ejecutar:

```bash
npm install
npm run lint
npm run build
```

y confirmar el `package-lock.json` actualizado. Después podrá restaurarse `npm ci` en GitHub Actions para mantener instalaciones totalmente reproducibles.
