/**
 * Otros productos de La Pomponería BGA (no llevan bolsa de regalo).
 * Edita aquí precios, textos, fotos y opciones.
 * Las fotos viven en /public/img/productos/.
 */

export interface OpcionProducto {
  /** Etiqueta del selector, ej. "Aroma" */
  etiqueta: string;
  /** Si es true, se muestra un campo de texto opcional en vez de un selector */
  libre?: boolean;
  /** Texto de ayuda del campo libre */
  placeholder?: string;
  /** Opciones del selector. `precio` reemplaza el precio base del producto. */
  valores: { nombre: string; nota?: string; precio?: number }[];
}

export interface Producto {
  id: string;
  nombre: string;
  emoji: string;
  eslogan: string;
  descripcion: string;
  /** Precio base. Si una opción define `precio`, esa opción lo reemplaza. */
  precio: number;
  /** Texto fijo que se agrega al pedido (ej. aroma único) */
  detalleFijo?: string;
  /** Miniatura cuadrada para el carrito */
  miniatura: string;
  fotos: { src: string; alt: string }[];
  puntos: string[];
  opciones: OpcionProducto[];
}

export const productos: Producto[] = [
  {
    id: 'yessence-car',
    nombre: 'Yessence Car',
    emoji: '🚗',
    eslogan: 'Difusor aromático para carro',
    descripcion:
      'Disco de yeso elaborado a mano con un mensaje inspirador en relieve. Se cuelga del retrovisor y perfuma tu vehículo con un aroma duradero. Incluye esencia aromática de 30 ml y es recargable.',
    precio: 25000,
    miniatura: '/img/productos/yessence-car-mini.webp',
    fotos: [
      { src: '/img/productos/yessence-car-1.webp', alt: 'Yessence Car, difusor aromático para carro, $25.000' },
      { src: '/img/productos/yessence-car-2.webp', alt: 'Presentación Yessence Car con sus cuatro mensajes' },
      { src: '/img/productos/yessence-car-3.webp', alt: 'Aromas disponibles de Yessence Car' },
      { src: '/img/productos/yessence-car-4.webp', alt: 'Los 5 aromas exclusivos de Yessence Car' },
      { src: '/img/productos/yessence-car-5.webp', alt: 'Cómo usar tu Yessence Car' },
      { src: '/img/productos/yessence-car-6.webp', alt: 'Yessence Car colgado del retrovisor y esencia aromática' },
      { src: '/img/productos/yessence-car-7.webp', alt: 'Aromatiza tu auto con Yessence Car' },
      { src: '/img/productos/yessence-car-8.webp', alt: 'Difusores Yessence Car en sus cajas' },
    ],
    puntos: [
      'Elaborado a mano en yeso',
      'Incluye esencia aromática de 30 ml',
      'Cada aplicación dura hasta 7 días',
      'Recargable con tu esencia favorita',
      'Ideal para ti o para regalar',
    ],
    opciones: [
      {
        etiqueta: 'Aroma',
        valores: [
          { nombre: 'Lotus', nota: 'fresco y relajante' },
          { nombre: 'Spiced Vanilla', nota: 'cálido, dulce y especiado' },
          { nombre: 'Creamy Coconut', nota: 'tropical, suave y cremoso' },
          { nombre: 'Golden Pasión', nota: 'intenso y envolvente' },
          { nombre: 'Pineapple Cream', nota: 'dulce, frutal y refrescante' },
          { nombre: 'Mora Velvet' },
        ],
      },
      {
        etiqueta: 'Mensaje',
        valores: [
          { nombre: 'Con Dios todo es posible' },
          { nombre: 'Ten fe' },
          { nombre: 'Cree en ti y todo será posible' },
          { nombre: 'Dios proveerá' },
        ],
      },
    ],
  },
  {
    id: 'popoff',
    nombre: 'Popoff',
    emoji: '🍊',
    eslogan: 'Inhibidor de olor para ir al baño',
    descripcion:
      'Spray pequeño y práctico que neutraliza los malos olores y deja un aroma fresco a naranja. Agítalo, aplica de 3 a 5 spray en el agua del inodoro y listo. Ideal para el hogar, la oficina o los viajes.',
    precio: 20000,
    detalleFijo: 'Aroma naranja · 25 ml',
    miniatura: '/img/productos/popoff-mini.webp',
    fotos: [
      { src: '/img/productos/popoff-1.webp', alt: 'Popoff, inhibidor de olor para el baño, $20 mil' },
      { src: '/img/productos/popoff-2.webp', alt: 'Cómo se usa Popoff y sus beneficios' },
      { src: '/img/productos/popoff-3.webp', alt: 'Popoff, tu aliado portátil, 25 ml, hasta 50 usos' },
      { src: '/img/productos/popoff-4.webp', alt: 'Popoff, frescura donde la necesitas' },
      { src: '/img/productos/popoff-5.webp', alt: 'Popoff entre flores' },
      { src: '/img/productos/popoff-6.webp', alt: 'Dos frascos de Popoff en la mano' },
      { src: '/img/productos/popoff-7.webp', alt: 'Popoff de 25 ml con hasta 50 usos' },
    ],
    puntos: [
      'Neutraliza los malos olores',
      'Aroma naranja fresco y agradable',
      '25 ml, hasta 50 usos',
      'Práctico, pequeño y fácil de llevar',
    ],
    opciones: [],
  },
  {
    id: 'gloss',
    nombre: 'Gloss',
    emoji: '💋',
    eslogan: 'Lip gloss y butter balm con llavero',
    descripcion:
      'Brillo labial hidratante en varias referencias y tonos. Cada gloss trae su dije decorativo. Elige la referencia y cuéntanos el tono que prefieres; lo confirmamos por WhatsApp según disponibilidad.',
    precio: 10000,
    miniatura: '/img/productos/gloss-mini.webp',
    fotos: [
      { src: '/img/productos/gloss-1.webp', alt: 'Gloss que enamora: butter balm y lip gloss Butterfly' },
      { src: '/img/productos/gloss-2.webp', alt: 'Lip gloss: tonos disponibles' },
      { src: '/img/productos/gloss-3.webp', alt: 'Todos los tonos disponibles de gloss y butter balm' },
      { src: '/img/productos/gloss-4.webp', alt: 'Gloss LOVE y Butter Balm con sus tonos' },
      { src: '/img/productos/gloss-5.webp', alt: 'LOVE Lip Gloss, brillo con color' },
      { src: '/img/productos/gloss-6.webp', alt: 'Lip gloss Queen Beauty de 16 ml con dijes' },
      { src: '/img/productos/gloss-7.webp', alt: 'Gloss con llavero en exhibidor de La Pomponería' },
    ],
    puntos: [
      'Brillo intenso, natural y luminoso',
      'Hidrata y suaviza los labios',
      'Cada gloss incluye su dije decorativo',
      'Varias referencias y tonos para elegir',
    ],
    opciones: [
      {
        etiqueta: 'Referencia',
        valores: [
          { nombre: 'Butterfly Lip Gloss LOVE', nota: 'brillo con color multicolor' },
          { nombre: 'Butter Balm', nota: 'hidratación cremosa' },
          { nombre: 'Lip Gloss Strawberry', nota: 'aroma a fresa' },
          { nombre: 'Queen Beauty 16 ml', nota: 'hidratante con dije' },
        ],
      },
      { etiqueta: 'Tono preferido (opcional)', libre: true, placeholder: 'Ej. rosado, rojo, morado', valores: [] },
    ],
  },
  {
    id: 'llaveros',
    nombre: 'Llaveros',
    emoji: '🧸',
    eslogan: 'Llaveros pompón y corazón',
    descripcion:
      'Llaveros suaves y esponjosos para llaves, mochilas o bolsos. Los pompones pequeños cuestan $8.000 y los grandes (corazones y pompones de colores) $10.000.',
    precio: 8000,
    miniatura: '/img/productos/llaveros-mini.webp',
    fotos: [
      { src: '/img/productos/llaveros-1.webp', alt: 'Llaveros pompón de colores, $8.000' },
      { src: '/img/productos/llaveros-2.webp', alt: 'Llaveros de corazón, grandes' },
      { src: '/img/productos/llaveros-3.webp', alt: 'Llaveros de corazón en tonos pastel' },
    ],
    puntos: [
      'Suaves y esponjosos',
      'Diseños modernos y encantadores',
      'Ideales para llaves, mochilas o bolsos',
    ],
    opciones: [
      {
        etiqueta: 'Tamaño',
        valores: [
          { nombre: 'Pompón pequeño', nota: '$8.000', precio: 8000 },
          { nombre: 'Grande (corazón o pompón)', nota: '$10.000', precio: 10000 },
        ],
      },
      { etiqueta: 'Color preferido (opcional)', libre: true, placeholder: 'Ej. rosado, turquesa, morado', valores: [] },
    ],
  },
  {
    id: 'combo-gloss-llavero',
    nombre: 'Combo Gloss + Llavero',
    emoji: '🎀',
    eslogan: 'Combo personalizado',
    descripcion:
      'Elige tu gloss o butter balm favorito y un llavero de tu estilo por un precio especial. Cuéntanos tus tonos y colores y los confirmamos por WhatsApp según disponibilidad.',
    precio: 15000,
    miniatura: '/img/productos/combo-mini.webp',
    fotos: [
      { src: '/img/productos/combo-1.webp', alt: 'Combo Gloss + Llavero por $15.000, últimas unidades' },
      { src: '/img/productos/combo-2.webp', alt: 'Lip gloss, butter balm y llaveros pompón, combo por $15.000' },
    ],
    puntos: [
      'Un gloss o butter balm a tu elección',
      'Más un llavero de tu estilo',
      'Precio especial de combo',
    ],
    opciones: [
      {
        etiqueta: 'Gloss',
        valores: [
          { nombre: 'Butterfly Lip Gloss LOVE' },
          { nombre: 'Butter Balm' },
          { nombre: 'Lip Gloss Strawberry' },
          { nombre: 'Queen Beauty 16 ml' },
        ],
      },
      {
        etiqueta: 'Llavero',
        valores: [{ nombre: 'Pompón pequeño' }, { nombre: 'Grande (corazón o pompón)' }],
      },
      { etiqueta: 'Tonos y colores preferidos (opcional)', libre: true, placeholder: 'Ej. gloss rosado, llavero turquesa', valores: [] },
    ],
  },
];
