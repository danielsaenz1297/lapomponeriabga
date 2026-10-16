// Endpoint de administración de reseñas (PROTEGIDO con ADMIN_TOKEN).
//   GET    /api/admin/resenas        -> lista TODAS (pendientes y aprobadas)
//   POST   /api/admin/resenas        -> aprobar: body { id, aprobada: 1 | 0 }
//   DELETE /api/admin/resenas        -> eliminar: body { id }
//
// Requiere la cabecera: Authorization: Bearer <ADMIN_TOKEN>

import { json, esAdmin } from '../_utils.js';

export async function onRequestGet({ request, env }) {
  if (!esAdmin(request, env)) return json({ error: 'No autorizado' }, 401);
  if (!env.DB) return json({ error: 'Base de datos no configurada' }, 500);

  const { results } = await env.DB.prepare(
    `SELECT id, nombre, calificacion, comentario, aprobada, creada_en
       FROM resenas
      ORDER BY aprobada ASC, creada_en DESC`
  ).all();
  return json({ resenas: results ?? [] });
}

export async function onRequestPost({ request, env }) {
  if (!esAdmin(request, env)) return json({ error: 'No autorizado' }, 401);
  if (!env.DB) return json({ error: 'Base de datos no configurada' }, 500);

  let datos;
  try {
    datos = await request.json();
  } catch {
    return json({ error: 'Solicitud inválida' }, 400);
  }

  const id = Number(datos.id);
  const aprobada = datos.aprobada ? 1 : 0;
  if (!Number.isInteger(id) || id <= 0) return json({ error: 'id inválido' }, 400);

  await env.DB.prepare(`UPDATE resenas SET aprobada = ? WHERE id = ?`)
    .bind(aprobada, id)
    .run();
  return json({ ok: true });
}

export async function onRequestDelete({ request, env }) {
  if (!esAdmin(request, env)) return json({ error: 'No autorizado' }, 401);
  if (!env.DB) return json({ error: 'Base de datos no configurada' }, 500);

  let datos;
  try {
    datos = await request.json();
  } catch {
    return json({ error: 'Solicitud inválida' }, 400);
  }

  const id = Number(datos.id);
  if (!Number.isInteger(id) || id <= 0) return json({ error: 'id inválido' }, 400);

  await env.DB.prepare(`DELETE FROM resenas WHERE id = ?`).bind(id).run();
  return json({ ok: true });
}
