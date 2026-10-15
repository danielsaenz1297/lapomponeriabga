/**
 * Configuración central del negocio.
 * Edita aquí los datos de contacto, redes sociales, precios y textos.
 * Todo el sitio lee de este archivo, así que un cambio aquí se refleja en todas las páginas.
 */

export const negocio = {
  nombre: 'La Pomponería BGA',
  marcaProducto: 'AromaPoms',
  eslogan: 'Aromas que inspiran momentos',
  eslogan2: 'Aromas que hacen la diferencia',
  descripcionCorta:
    'Difusores aromáticos decorativos artesanales con pompones llenos de color. Un detalle diferente para tus espacios y para regalar.',
  descripcionLarga:
    'Somos un emprendimiento de amigas que crea difusores aromáticos decorativos con pompones llenos de color, perfectos para darle un aroma especial a tus espacios o sorprender a alguien con un detalle diferente.',
  ciudad: 'Bucaramanga, Colombia',
  cobertura: 'Entregas en Bucaramanga y área metropolitana, según la zona.',

  // Contacto
  whatsapp: {
    // Número en formato internacional sin signos ni espacios (para enlaces wa.me)
    numero: '573223587255',
    numeroVisible: '+57 322 358 7255',
    // Enlace directo de WhatsApp Business (de la empresa)
    enlaceDirecto: 'https://wa.me/message/VHKDY3ZZMDAJM1',
  },

  // Redes sociales
  redes: {
    instagram: {
      usuario: '@lapomponeria.bga',
      url: 'https://instagram.com/lapomponeria.bga',
    },
    tiktok: {
      usuario: '@lapomponeria.bga',
      url: 'https://www.tiktok.com/@lapomponeria.bga',
    },
  },
};

// Precios (en pesos colombianos)
export const precios = {
  unidad: 35000,
  moneda: 'COP',
};

// Medios de pago (informativos: el pago se coordina por WhatsApp)
export const mediosPago = [
  { nombre: 'Transferencia bancaria', icono: 'banco' },
  { nombre: 'Nequi', icono: 'nequi' },
  { nombre: 'Daviplata', icono: 'daviplata' },
  { nombre: 'Efectivo', icono: 'efectivo' },
];

// Beneficios / promociones de fidelidad (del catálogo)
export const beneficios = [
  {
    titulo: '15% OFF en tu quinta compra',
    detalle: 'Registra tus compras y disfruta tus beneficios.',
    icono: 'descuento',
  },
  {
    titulo: 'Obsequio gratis en tu décimo pedido',
    detalle: 'Un detalle especial para quienes nos acompañan.',
    icono: 'regalo',
  },
  {
    titulo: 'Obsequio por tu compra',
    detalle: 'Cada pedido viene con un pequeño detalle de nuestra parte.',
    icono: 'corazon',
  },
];

// Qué incluye cada AromaPom
export const incluye = [
  'Difusor aromático artesanal (pieza perfumada)',
  'Pom-pom decorativo de fibras o tiras de papel de colores',
  'Base y empaque de papel kraft/cartulina',
  'Cordón o hilo decorativo (según diseño)',
  'Etiqueta decorativa',
  'Bolsa de regalo personalizable (según edición)',
  'Kit de reciclaje incluido',
];

// Cómo se usa
export const comoUsar = [
  'Retira el difusor de su empaque y ubícalo sobre una superficie firme y ventilada.',
  'Deja que la fragancia se libere de forma gradual en el ambiente.',
  'Colócalo en espacios pequeños o medianos, como habitación, escritorio, clóset o baño.',
  'Para renovar la experiencia, cambia su ubicación o elige otra fragancia cuando lo necesites.',
  'Evita mojarlo, ingerir el producto o ponerlo en contacto directo con ojos y piel. Mantén fuera del alcance de niños y mascotas; no lo pongas junto a llamas ni fuentes de calor.',
];

// Nota: las opciones de bolsa de regalo viven en src/data/bolsas.ts

// Características destacadas del producto (sección "Características")
export const caracteristicas = [
  {
    icono: '🧶',
    titulo: 'Pompón artesanal estilo Wayúu',
    detalle:
      'Elaborado con hilos especiales que absorben la fragancia al instalarlo, para difundir el aroma de forma natural.',
  },
  {
    icono: '🕯️',
    titulo: 'Parafina 100% refinada',
    detalle:
      'El envase está elaborado con parafina 100% refinada y contiene fragancia concentrada de larga duración.',
  },
  {
    icono: '💬',
    titulo: 'Mensajes que inspiran',
    detalle:
      'Incluye mensajes motivacionales que elevan tu ánimo y te acompañan en tu día a día.',
  },
  {
    icono: '♻️',
    titulo: 'Kit de reciclaje incluido',
    detalle:
      'Cuando se termine tu AromaPom, el kit te permite reutilizar el envase y darle una segunda vida convirtiéndolo en una velita.',
  },
  {
    icono: '🤍',
    titulo: '100% artesanal',
    detalle:
      'Cada difusor es hecho a mano con dedicación: un detalle único, pensado para alegrar tus espacios o regalar.',
  },
];

// Espacios ideales para ubicar el AromaPom
export const espaciosIdeales = ['Habitación', 'Baño', 'Oficina', 'Clóset', 'Escritorio'];
