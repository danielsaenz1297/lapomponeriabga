// API de reseñas para Cloudflare Workers.
// Reemplaza las Pages Functions (functions/api/...) en un solo archivo.
//
//   GET    /api/resenas          -> reseñas APROBADAS (público)
//   POST   /api/resenas          -> crea reseña PENDIENTE (público)
//   GET    /api/admin/resenas    -> lista TODAS (requiere ADMIN_TOKEN)
//   POST   /api/admin/resenas    -> aprobar/ocultar: { id, aprobada: 1 | 0 }
//   DELETE /api/admin/resenas    -> eliminar: { id }
//
// Bindings necesarios: DB (D1), ASSETS (sitio estático), secret ADMIN_TOKEN.

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

// ---------- Rutas públicas ----------

async function listarAprobadas(env) {
  try {
    const { results } = await env.DB.prepare(
      `SELECT id, nombre, calificacion, comentario, creada_en
         FROM resenas
        WHERE aprobada = 1
        ORDER BY creada_en DESC
        LIMIT 50`
    ).all();
    return json({ resenas: results ?? [] });
  } catch {
    return json({ error: 'No se pudieron cargar las reseñas' }, 500);
  }
}

async function crearResena(request, env) {
  const datos = await leerJson(request);
  if (!datos) return json({ error: 'Solicitud inválida' }, 400);

  const nombre = limpiarTexto(datos.nombre, 60);
  const comentario = limpiarTexto(datos.comentario, 500);
  const calificacion = Number(datos.calificacion);

  if (!nombre) return json({ error: 'El nombre es obligatorio' }, 400);
  if (!comentario || comentario.length < 3)
    return json({ error: 'El comentario es muy corto' }, 400);
  if (!Number.isInteger(calificacion) || calificacion < 1 || calificacion > 5)
    return json({ error: 'La calificación debe ser de 1 a 5 estrellas' }, 400);

  try {
    await env.DB.prepare(
      `INSERT INTO resenas (nombre, calificacion, comentario, aprobada)
       VALUES (?, ?, ?, 0)`
    )
      .bind(nombre, calificacion, comentario)
      .run();

    return json({
      ok: true,
      mensaje:
        '¡Gracias por tu reseña! 💜 La revisaremos y pronto aparecerá publicada.',
    });
  } catch {
    return json({ error: 'No se pudo guardar la reseña' }, 500);
  }
}

// ---------- Rutas de administración ----------

async function listarTodas(env) {
  const { results } = await env.DB.prepare(
    `SELECT id, nombre, calificacion, comentario, aprobada, creada_en
       FROM resenas
      ORDER BY aprobada ASC, creada_en DESC`
  ).all();
  return json({ resenas: results ?? [] });
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

  await env.DB.prepare(`DELETE FROM resenas WHERE id = ?`).bind(id).run();
  return json({ ok: true });
}

// ---------- Enrutador ----------

export default {
  async fetch(request, env) {
    const { pathname } = new URL(request.url);
    const metodo = request.method;

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