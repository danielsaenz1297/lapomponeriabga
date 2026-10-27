-- Migración: agrega la columna `fotos` a una base de reseñas YA existente.
-- Ejecútala UNA sola vez si ya habías creado la base antes de la función de fotos.
--   npx wrangler d1 execute resenas-pomponeria --remote --file=db/migracion-fotos.sql
--
-- Si creas la base desde cero con db/schema.sql, NO necesitas esta migración.

ALTER TABLE resenas ADD COLUMN fotos TEXT NOT NULL DEFAULT '[]';
