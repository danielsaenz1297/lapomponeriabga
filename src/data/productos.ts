/**
 * Otros productos de La Pomponería BGA (no llevan bolsa de regalo).
 * Edita aquí precios, textos, fotos y opciones.
 * Las fotos viven en /public/img/productos/.
 */

export interface OpcionProducto {
  /** Etiqueta del selector, ej. "Aroma" */
  etiqueta: string;
  valores: { nombre: string; nota?: string }[];
}

export interface Producto {
  id: string;
  nombre: string;
  emoji: string;
  eslogan: string;
  descripcion: string;
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
];
