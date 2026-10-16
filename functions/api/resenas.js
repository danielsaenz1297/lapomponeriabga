// Endpoint público de reseñas.
//   GET  /api/resenas       -> lista las reseñas APROBADAS (para mostrar en el sitio)
//   POST /api/resenas       -> crea una reseña nueva en estado PENDIENTE
//
// La base de datos D1 se enlaza con el binding "DB" (ver GUIA-RESENAS.md).

import { json, limpiarTexto } from './_utils.js';

export async function onRequestGet({ env }) {
  if (!env.DB) return json({ error: 'Base de datos no configurada' }, 500);
  try {
    const { results } = await env.DB.prepare(
      `SELECT id, nombre, calificacion, comentario, creada_en
         FROM resenas
        WHERE aprobada = 1
        ORDER BY creada_en DESC
        LIMIT 50`
    ).all();
    return json({ resenas: results ?? [] });
  } catch (err) {
    return json({ error: 'No se pudieron cargar las reseñas' }, 500);
  }
}

export async function onRequestPost({ request, env }) {
  if (!env.DB) return json({ error: 'Base de datos no configurada' }, 500);

  let datos;
  try {
    datos = await request.json();
  } catch {
    return json({ error: 'Solicitud inválida' }, 400);
  }

  // Validación y saneamiento
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
  } catch (err) {
    return json({ error: 'No se pudo guardar la reseña' }, 500);
  }
}
