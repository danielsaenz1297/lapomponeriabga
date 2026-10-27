// API de reseñas para Cloudflare Workers.
// Reemplaza las Pages Functions (functions/api/...) en un solo archivo.
//
//   GET    /api/resenas          -> reseñas APROBADAS (público)
//   POST   /api/resenas          -> crea reseña PENDIENTE (público). Acepta
//                                    JSON o multipart/form-data (con fotos).
//   GET    /api/admin/resenas    -> lista TODAS (requiere ADMIN_TOKEN)
//   POST   /api/admin/resenas    -> aprobar/ocultar: { id, aprobada: 1 | 0 }
//   DELETE /api/admin/resenas    -> eliminar: { id } (borra también sus fotos)
//   GET    /api/foto/<clave>     -> sirve una foto desde R2 (público)
//
// Bindings necesarios: DB (D1), ASSETS (sitio estático), FOTOS (R2),
// secret ADMIN_TOKEN.

// ---------- Configuración de fotos ----------
const MAX_FOTOS = 3;
const MAX_BYTES = 5 * 1024 * 1024; // 5 MB por foto
const TIPOS_OK = {
  'image/jpeg': 'jpg',
  'image/png': 'png',
  'image/webp': 'webp',
};

// ---------- Utilidades ----------

function json(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Cache-Control': 'no-store',
    },
  });
}

function limpiarTexto(valor, maxLen) {
  if (typeof valor !== 'string') return '';
  const sinHtml = valor.replace(/<[^>]*>/g, '').trim();
  return sinHtml.slice(0, maxLen);
}

function esAdmin(request, env) {
  const auth = request.headers.get('Authorization') || '';
  const token = auth.replace(/^Bearer\s+/i, '').trim();
  return Boolean(env.ADMIN_TOKEN) && token === env.ADMIN_TOKEN;
}

async function leerJson(request) {
  try {
    return await request.json();
  } catch {
    return null;
  }
}

// Genera una clave única para una foto en R2.
function nuevaClaveFoto(ext) {
  const aleatorio = crypto.randomUUID();
  return `resenas/${aleatorio}.${ext}`;
}

// Parsea el campo `fotos` (JSON) de la base a un array seguro.
function parseFotos(valor) {
  try {
    const arr = JSON.parse(valor || '[]');
    return Array.isArray(arr) ? arr : [];
  } catch {
    return [];
  }
}

// ---------- Rutas públicas ----------

async function listarAprobadas(env) {
  try {
    const { results } = await env.DB.prepare(
      `SELECT id, nombre, calificacion, comentario, fotos, creada_en
         FROM resenas
        WHERE aprobada = 1
        ORDER BY creada_en DESC
        LIMIT 50`
    ).all();
    const resenas = (results ?? []).map((r) => ({
      id: r.id,
      nombre: r.nombre,
      calificacion: r.calificacion,
      comentario: r.comentario,
      creada_en: r.creada_en,
      fotos: parseFotos(r.fotos),
    }));
    return json({ resenas });
  } catch {
    return json({ error: 'No se pudieron cargar las reseñas' }, 500);
  }
}

// Sube las fotos recibidas a R2 y devuelve sus claves. Valida cantidad, tipo y tamaño.
async function subirFotos(archivos, env) {
  if (!env.FOTOS) return { error: 'Almacenamiento de fotos no configurado' };
  const claves = [];
  for (const archivo of archivos.slice(0, MAX_FOTOS)) {
    if (!archivo || typeof archivo.arrayBuffer !== 'function') continue;
    const ext = TIPOS_OK[archivo.type];
    if (!ext) return { error: 'Solo se permiten imágenes JPG, PNG o WebP' };
    if (archivo.size > MAX_BYTES) return { error: 'Cada foto debe pesar máximo 5 MB' };
    const clave = nuevaClaveFoto(ext);
    await env.FOTOS.put(clave, await archivo.arrayBuffer(), {
      httpMetadata: { contentType: archivo.type },
    });
    claves.push(clave);
  }
  return { claves };
}

async function crearResena(request, env) {
  const contentType = request.headers.get('Content-Type') || '';
  let nombre, comentario, calificacion;
  let archivos = [];

  if (contentType.includes('multipart/form-data')) {
    const form = await request.formData();
    nombre = limpiarTexto(form.get('nombre'), 60);
    comentario = limpiarTexto(form.get('comentario'), 500);
    calificacion = Number(form.get('calificacion'));
    archivos = form.getAll('fotos').filter((f) => f && typeof f === 'object' && f.size > 0);
  } else {
    const datos = await leerJson(request);
    if (!datos) return json({ error: 'Solicitud inválida' }, 400);
    nombre = limpiarTexto(datos.nombre, 60);
    comentario = limpiarTexto(datos.comentario, 500);
    calificacion = Number(datos.calificacion);
  }

  // Validación de campos
  if (!nombre) return json({ error: 'El nombre es obligatorio' }, 400);
  if (!comentario || comentario.length < 3)
    return json({ error: 'El comentario es muy corto' }, 400);
  if (!Number.isInteger(calificacion) || calificacion < 1 || calificacion > 5)
    return json({ error: 'La calificación debe ser de 1 a 5 estrellas' }, 400);
  if (archivos.length > MAX_FOTOS)
    return json({ error: `Máximo ${MAX_FOTOS} fotos por reseña` }, 400);

  // Subir fotos (si las hay)
  let clavesFotos = [];
  if (archivos.length > 0) {
    const r = await subirFotos(archivos, env);
    if (r.error) return json({ error: r.error }, 400);
    clavesFotos = r.claves;
  }

  try {
    await env.DB.prepare(
      `INSERT INTO resenas (nombre, calificacion, comentario, aprobada, fotos)
       VALUES (?, ?, ?, 0, ?)`
    )
      .bind(nombre, calificacion, comentario, JSON.stringify(clavesFotos))
      .run();

    return json({
      ok: true,
      mensaje:
        '¡Gracias por tu reseña! 💜 La revisaremos y pronto aparecerá publicada.',
    });
  } catch {
    // Si falló la BD, intentar limpiar las fotos recién subidas
    if (env.FOTOS) for (const c of clavesFotos) await env.FOTOS.delete(c).catch(() => {});
    return json({ error: 'No se pudo guardar la reseña' }, 500);
  }
}

// Sirve una foto desde R2. La "clave" viene en la URL: /api/foto/resenas/<uuid>.<ext>
async function servirFoto(pathname, env) {
  if (!env.FOTOS) return new Response('No disponible', { status: 404 });
  const clave = decodeURIComponent(pathname.replace(/^\/api\/foto\//, ''));
  // Seguridad: solo claves dentro de "resenas/"
  if (!clave.startsWith('resenas/') || clave.includes('..')) {
    return new Response('No encontrado', { status: 404 });
  }
  const obj = await env.FOTOS.get(clave);
  if (!obj) return new Response('No encontrado', { status: 404 });
  const headers = new Headers();
  obj.writeHttpMetadata(headers);
  headers.set('Cache-Control', 'public, max-age=31536000, immutable');
  return new Response(obj.body, { headers });
}

// ---------- Rutas de administración ----------

async function listarTodas(env) {
  const { results } = await env.DB.prepare(
    `SELECT id, nombre, calificacion, comentario, aprobada, fotos, creada_en
       FROM resenas
      ORDER BY aprobada ASC, creada_en DESC`
  ).all();
  const resenas = (results ?? []).map((r) => ({
    id: r.id,
    nombre: r.nombre,
    calificacion: r.calificacion,
    comentario: r.comentario,
    aprobada: r.aprobada,
    creada_en: r.creada_en,
    fotos: parseFotos(r.fotos),
  }));
  return json({ resenas });
}

async function cambiarAprobacion(request, env) {
  const datos = await leerJson(request);
  if (!datos) return json({ error: 'Solicitud inválida' }, 400);

  const id = Number(datos.id);
  const aprobada = datos.aprobada ? 1 : 0;
  if (!Number.isInteger(id) || id <= 0) return json({ error: 'id inválido' }, 400);

  await env.DB.prepare(`UPDATE resenas SET aprobada = ? WHERE id = ?`)
    .bind(aprobada, id)
    .run();
  return json({ ok: true });
}

async function eliminarResena(request, env) {
  const datos = await leerJson(request);
  if (!datos) return json({ error: 'Solicitud inválida' }, 400);

  const id = Number(datos.id);
  if (!Number.isInteger(id) || id <= 0) return json({ error: 'id inválido' }, 400);

  // Borrar también las fotos de R2
  const fila = await env.DB.prepare(`SELECT fotos FROM resenas WHERE id = ?`).bind(id).first();
  if (fila && env.FOTOS) {
    for (const clave of parseFotos(fila.fotos)) {
      await env.FOTOS.delete(clave).catch(() => {});
    }
  }

  await env.DB.prepare(`DELETE FROM resenas WHERE id = ?`).bind(id).run();
  return json({ ok: true });
}

// ---------- Enrutador ----------

export default {
  async fetch(request, env) {
    const { pathname } = new URL(request.url);
    const metodo = request.method;

    // Servir fotos de reseñas (público)
    if (pathname.startsWith('/api/foto/')) {
      if (metodo !== 'GET') return json({ error: 'Método no permitido' }, 405);
      return servirFoto(pathname, env);
    }

    if (pathname === '/api/resenas') {
      if (!env.DB) return json({ error: 'Base de datos no configurada' }, 500);
      if (metodo === 'GET') return listarAprobadas(env);
      if (metodo === 'POST') return crearResena(request, env);
      return json({ error: 'Método no permitido' }, 405);
    }

    if (pathname === '/api/admin/resenas') {
      if (!esAdmin(request, env)) return json({ error: 'No autorizado' }, 401);
      if (!env.DB) return json({ error: 'Base de datos no configurada' }, 500);
      if (metodo === 'GET') return listarTodas(env);
      if (metodo === 'POST') return cambiarAprobacion(request, env);
      if (metodo === 'DELETE') return eliminarResena(request, env);
      return json({ error: 'Método no permitido' }, 405);
    }

    // Cualquier otra ruta: sirve el sitio estático
    return env.ASSETS.fetch(request);
  },
};
