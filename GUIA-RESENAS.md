# Guía: activar las reseñas (Cloudflare D1 + Pages Functions)

El sitio ya trae todo el código de reseñas listo:

- Sección de reseñas en la página principal (muestra las aprobadas + formulario para enviar).
- Página de moderación en **`/admin`** para aprobar o eliminar.
- Endpoints serverless en `functions/api/` (no tocan el sitio estático).
- Esquema de base de datos en `db/schema.sql`.

Solo falta **conectar una base de datos D1** en Cloudflare y definir una **clave de administración**. Se hace una sola vez.

---

## Requisitos

- Tener el proyecto ya desplegado en **Cloudflare Pages** (ver README).
- Node.js instalado (para usar `wrangler`, la CLI de Cloudflare).

---

## Paso 1 — Iniciar sesión en Cloudflare

```bash
npx wrangler login
```

Se abre el navegador para autorizar. Solo la primera vez.

## Paso 2 — Crear la base de datos D1

```bash
npx wrangler d1 create resenas-pomponeria
```

Esto imprime un bloque con un **`database_id`**. Cópialo.

## Paso 3 — Pegar el `database_id` en `wrangler.toml`

Abre `wrangler.toml` y reemplaza `PENDIENTE_PEGAR_ID_AQUI` por el id que copiaste:

```toml
[[d1_databases]]
binding = "DB"
database_name = "resenas-pomponeria"
database_id = "aquí-va-el-id-real"
```

## Paso 4 — Crear la tabla (en la base REMOTA de producción)

```bash
npx wrangler d1 execute resenas-pomponeria --remote --file=db/schema.sql
```

> El flag `--remote` es importante: aplica el esquema a la base real de Cloudflare
> (sin él, se crearía solo en una base local de pruebas).

## Paso 5 — Definir la clave de administración (ADMIN_TOKEN)

En el panel de Cloudflare:

1. **Workers & Pages → tu proyecto → Settings → Environment variables**.
2. En *Production*, agrega una variable:
   - **Nombre:** `ADMIN_TOKEN`
   - **Valor:** una contraseña larga e inventada por ti (p. ej. `pompon-2026-xY9k...`). Guárdala bien.
   - Márcala como **Secret** (cifrada).
3. Guarda.

## Paso 6 — Enlazar la base D1 al proyecto de Pages

En el panel de Cloudflare:

1. **Workers & Pages → tu proyecto → Settings → Functions → D1 database bindings**.
2. Agrega un binding:
   - **Variable name:** `DB`
   - **D1 database:** `resenas-pomponeria`
3. Guarda y vuelve a desplegar (**Deployments → Retry deployment** o haz un nuevo push).

---

## ¡Listo! Cómo se usa

### Tus clientas
En la sección **Reseñas** del sitio pulsan "Escribir una reseña", eligen estrellas,
nombre y comentario, y envían. La reseña queda **pendiente** (no se ve aún).

### Tú (moderación)
Entra a **`https://tu-sitio.pages.dev/admin`**, escribe tu `ADMIN_TOKEN` y verás todas
las reseñas. Puedes **Aprobar** (se publican), **Ocultar** o **Eliminar**.
Solo las aprobadas aparecen en el sitio público.

---

## Probar en local (opcional)

```bash
# 1. Construir el sitio
npm run build

# 2. Levantar Pages + Functions + D1 local, con un token de prueba
npx wrangler pages dev dist --d1=DB=resenas-pomponeria --binding ADMIN_TOKEN=clave-prueba-123 --port 8788

# 3. En otra terminal, crear la tabla en la base LOCAL:
npx wrangler d1 execute resenas-pomponeria --local --file=db/schema.sql
```

Luego abre `http://127.0.0.1:8788` y `http://127.0.0.1:8788/admin`.

> Nota: en local, la base de `pages dev` y la de `d1 execute` a veces no comparten
> estado. Si ves el error "no such table", lo más fácil es probar directamente en
> producción (pasos 1–6), que sí funciona de forma consistente.

---

## Seguridad

- El `ADMIN_TOKEN` es tu llave: no lo compartas ni lo subas al repositorio.
- Las reseñas se sanean (se quitan etiquetas HTML) y se validan (calificación 1–5,
  longitud de texto) antes de guardarse.
- La moderación evita que aparezca spam: nada se publica sin tu aprobación.
