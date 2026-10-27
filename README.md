# La Pomponería BGA · AromaPoms

Sitio web de ventas en línea para **La Pomponería BGA**, un emprendimiento de
Bucaramanga que crea **AromaPoms**: difusores aromáticos decorativos artesanales
con pompones de colores y kit de reciclaje.

El sitio es un catálogo estático con carrito de compras que **genera el pedido por
WhatsApp** (sin pasarela de pago): el cliente arma su pedido y el pago y envío se
coordinan directamente por chat.

## 🧰 Stack

- [Astro](https://astro.build/) — generador de sitios estáticos, rápido y liviano.
- [Tailwind CSS](https://tailwindcss.com/) — estilos.
- Carrito en JavaScript (vanilla) con `localStorage`.
- **Reseñas dinámicas** con Cloudflare D1 + Pages Functions (opcional, ver `GUIA-RESENAS.md`).
- Listo para desplegar en **Cloudflare Pages**.

## 🚀 Desarrollo local

Requiere Node.js 18+.

```bash
npm install        # instala dependencias
npm run dev        # servidor de desarrollo en http://localhost:4321
npm run build      # genera el sitio en /dist
npm run preview    # previsualiza el build de producción
```

## 📂 Estructura

```
public/
  img/
    aromas/        # fotos de cada aroma (15)
    bolsas/        # fotos de las bolsas de regalo
    marca/         # imágenes de marca (hero, redes, etc.)
  favicon.svg
  _headers         # cabeceras para Cloudflare Pages
src/
  data/
    config.ts      # ⚙️ datos del negocio: contacto, redes, precio, pagos, textos
    aromas.ts      # 🌸 catálogo de los 15 aromas
    bolsas.ts      # 🎁 bolsas de regalo (incluidas sin costo)
  components/
    secciones/     # secciones de la landing (Hero, Aromas, etc.)
    ...            # Header, Footer, Carrito, TarjetaAroma, Logo, BotonWhatsApp
  layouts/
    Layout.astro   # layout base (head, header, footer, carrito)
  pages/
    index.astro    # página principal
  styles/
    global.css     # estilos globales y utilidades
```

## ✏️ Cómo editar el contenido

Casi todo el contenido vive en dos archivos, sin tocar el diseño:

- **`src/data/config.ts`** — número de WhatsApp, redes sociales, precios, medios de
  pago, cobertura de envíos y textos de la empresa.
- **`src/data/aromas.ts`** — los 15 aromas (nombre, descripción, categoría, imagen y color).

Para cambiar una **foto de aroma**, reemplaza el archivo correspondiente en
`public/img/aromas/` conservando el mismo nombre.

## 🛒 Cómo funciona el pedido

1. El cliente elige un aroma y pulsa **Elegir**.
2. **Paso 2:** escoge la **bolsa de regalo** (una por producto, incluida sin costo).
3. El aroma + bolsa se agrega al carrito (se guarda en el navegador).
4. El total es **$35.000 por unidad** (precio único, sin promociones).
5. Al finalizar, se abre WhatsApp con el detalle del pedido (aroma + bolsa de cada ítem), nombre y zona de entrega prellenados.
6. El pago (Nequi, Daviplata, transferencia o efectivo) y el envío se coordinan por chat.

> El mismo aroma con dos bolsas distintas cuenta como dos líneas en el carrito.
> Puedes cambiar la bolsa de un ítem desde el carrito con el botón **"cambiar"**.

## ☁️ Despliegue en Cloudflare Pages

1. Sube este repositorio a GitHub.
2. En el panel de Cloudflare: **Workers & Pages → Create → Pages → Connect to Git**.
3. Selecciona el repositorio y usa esta configuración de build:
   - **Framework preset:** `Astro`
   - **Build command:** `npm run build`
   - **Build output directory:** `dist`
4. Deploy. Cloudflare asignará una URL `*.pages.dev` y podrás conectar tu dominio propio.

> Nota: si configuras un dominio propio, actualiza el campo `site` en `astro.config.mjs`.

## 📱 Contacto

- WhatsApp: +57 322 358 7255
- Instagram: [@lapomponeria.bga](https://instagram.com/lapomponeria.bga)
- TikTok: [@lapomponeria.bga](https://www.tiktok.com/@lapomponeria.bga)

<!-- Redeploy: orden de la galería de Características (donde-colocar, artesanal, segunda-vida). -->
