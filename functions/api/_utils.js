// Utilidades compartidas por las funciones de reseñas (Cloudflare Pages Functions).

/** Respuesta JSON con cabeceras estándar. */
export function json(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Cache-Control': 'no-store',
    },
  });
}

/** Limpia y recorta texto para evitar abusos. */
export function limpiarTexto(valor, maxLen) {
  if (typeof valor !== 'string') return '';
  // Quita etiquetas HTML y espacios sobrantes
  const sinHtml = valor.replace(/<[^>]*>/g, '').trim();
  return sinHtml.slice(0, maxLen);
}

/** Verifica el token de administración (para aprobar/eliminar). */
export function esAdmin(request, env) {
  const auth = request.headers.get('Authorization') || '';
  const token = auth.replace(/^Bearer\s+/i, '').trim();
  return Boolean(env.ADMIN_TOKEN) && token === env.ADMIN_TOKEN;
}
