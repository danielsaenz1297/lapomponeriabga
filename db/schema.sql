-- Esquema de la base de datos D1 para las reseñas de La Pomponería BGA.
-- Ejecuta este archivo al crear la base (ver GUIA-RESENAS.md).

CREATE TABLE IF NOT EXISTS resenas (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  nombre TEXT NOT NULL,
  calificacion INTEGER NOT NULL CHECK (calificacion BETWEEN 1 AND 5),
  comentario TEXT NOT NULL,
  -- 0 = pendiente de aprobación, 1 = aprobada (visible en el sitio)
  aprobada INTEGER NOT NULL DEFAULT 0,
  creada_en TEXT NOT NULL DEFAULT (datetime('now'))
);

-- Índice para listar rápido las aprobadas y recientes
CREATE INDEX IF NOT EXISTS idx_resenas_aprobada_fecha
  ON resenas (aprobada, creada_en DESC);
