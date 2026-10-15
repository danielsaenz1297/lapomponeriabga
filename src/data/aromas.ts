/**
 * Catálogo de aromas (AromaPoms).
 * 15 aromas organizados en 3 categorías según el catálogo oficial.
 *
 * Cada aroma tiene:
 *  - id: identificador único (sin espacios), usado en el carrito y URLs
 *  - nombre: nombre visible
 *  - categoria: 'suaves' | 'fuertes' | 'citricos'
 *  - descripcion: texto de la ficha
 *  - imagen: ruta a la foto (en /public/img/aromas)
 *  - color: color representativo del pompón (para acentos visuales)
 *  - emoji: emoji ilustrativo
 */

export type Categoria = 'suaves' | 'fuertes' | 'citricos';

export interface Aroma {
  id: string;
  nombre: string;
  categoria: Categoria;
  descripcion: string;
  imagen: string;
  color: string;
  emoji: string;
}

export const categorias: Record<
  Categoria,
  { titulo: string; subtitulo: string; emoji: string }
> = {
  suaves: {
    titulo: 'Aromas suaves',
    subtitulo: 'Delicados, cálidos y envolventes',
    emoji: '🤍',
  },
  fuertes: {
    titulo: 'Aromas fuertes',
    subtitulo: 'Frutales, intensos y llenos de color',
    emoji: '💜',
  },
  citricos: {
    titulo: 'Aromas cítricos',
    subtitulo: 'Frescos, alegres y vibrantes',
    emoji: '💚',
  },
};

export const aromas: Aroma[] = [
  // ---- Suaves ----
  {
    id: 'vainilla',
    nombre: 'Vainilla',
    categoria: 'suaves',
    descripcion: 'Fragancia dulce, con notas suaves y cremosas.',
    imagen: '/img/aromas/vainilla.jpeg',
    color: '#D86FB0',
    emoji: '🌼',
  },
  {
    id: 'moka',
    nombre: 'Moka',
    categoria: 'suaves',
    descripcion: 'Fragancia que combina el café y el chocolate.',
    imagen: '/img/aromas/mocka.jpeg',
    color: '#8B5E3C',
    emoji: '☕',
  },
  {
    id: 'galleta',
    nombre: 'Galleta',
    categoria: 'suaves',
    descripcion: 'Fragancia dulce y notas cálidas.',
    imagen: '/img/aromas/galleta.jpeg',
    color: '#2FA4C7',
    emoji: '🍪',
  },
  {
    id: 'flor-de-loto',
    nombre: 'Flor de Loto',
    categoria: 'suaves',
    descripcion: 'Fragancia delicada, suave y floral.',
    imagen: '/img/aromas/flor-de-loto.jpeg',
    color: '#EC87C0',
    emoji: '🪷',
  },
  {
    id: 'manzanilla',
    nombre: 'Manzanilla',
    categoria: 'suaves',
    descripcion: 'Fragancia herbal, suave y reconfortante, con notas florales delicadas.',
    imagen: '/img/aromas/manzanilla.jpeg',
    color: '#5FBF77',
    emoji: '🌸',
  },
  {
    id: 'natilla',
    nombre: 'Natilla',
    categoria: 'suaves',
    descripcion: 'Fragancia dulce y cremosa, con notas de vainilla y leche.',
    imagen: '/img/aromas/natilla.jpeg',
    color: '#D9B98A',
    emoji: '🍮',
  },

  // ---- Fuertes ----
  {
    id: 'frambuesa',
    nombre: 'Frambuesa',
    categoria: 'fuertes',
    descripcion: 'Fragancia dulce, jugosa y tropical, que alegra el día.',
    imagen: '/img/aromas/frambuesa.jpeg',
    color: '#E6168B',
    emoji: '🫐',
  },
  {
    id: 'frutos-rojos',
    nombre: 'Frutos Rojos',
    categoria: 'fuertes',
    descripcion: 'Fragancia que combina notas dulces y ácidas.',
    imagen: '/img/aromas/frutos-rojos.jpeg',
    color: '#C21E7A',
    emoji: '🍓',
  },
  {
    id: 'uva',
    nombre: 'Uva',
    categoria: 'fuertes',
    descripcion: 'Fragancia refrescante y jugosa, con notas frutales y vibrantes.',
    imagen: '/img/aromas/uva.jpeg',
    color: '#7B2FA0',
    emoji: '🍇',
  },
  {
    id: 'morita',
    nombre: 'Morita',
    categoria: 'fuertes',
    descripcion: 'Fragancia dulce, con notas frutales y florales.',
    imagen: '/img/aromas/morita.jpeg',
    color: '#9B2F8F',
    emoji: '🫐',
  },
  {
    id: 'manzana-canela',
    nombre: 'Manzana Canela',
    categoria: 'fuertes',
    descripcion: 'Fragancia dulce, con notas cálidas de la canela.',
    imagen: '/img/aromas/manzana-canela.jpeg',
    color: '#E6468B',
    emoji: '🍎',
  },
  {
    id: 'cherry',
    nombre: 'Cherry',
    categoria: 'fuertes',
    descripcion: 'Fragancia refrescante y dulce, con notas frutales y florales.',
    imagen: '/img/aromas/cherry.jpeg',
    color: '#D81E7A',
    emoji: '🍒',
  },

  // ---- Cítricos ----
  {
    id: 'limon',
    nombre: 'Limón',
    categoria: 'citricos',
    descripcion: 'Fragancia fresca, cítrica y revitalizante.',
    imagen: '/img/aromas/limon.jpeg',
    color: '#5FBF3C',
    emoji: '🍋',
  },
  {
    id: 'maracuya',
    nombre: 'Maracuyá',
    categoria: 'citricos',
    descripcion: 'Fragancia con notas dulces y ácidas que evocan la frescura tropical.',
    imagen: '/img/aromas/maracuya.jpeg',
    color: '#F5A623',
    emoji: '🥭',
  },
  {
    id: 'pina',
    nombre: 'Piña',
    categoria: 'citricos',
    descripcion: 'Fragancia fresca, tropical y jugosa.',
    imagen: '/img/aromas/pina.jpeg',
    color: '#F2B705',
    emoji: '🍍',
  },
];

export function aromasPorCategoria(cat: Categoria): Aroma[] {
  return aromas.filter((a) => a.categoria === cat);
}
