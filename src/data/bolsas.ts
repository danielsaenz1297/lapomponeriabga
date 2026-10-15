/**
 * Bolsas de regalo personalizadas (8 ediciones especiales).
 * El cliente elige UNA bolsa por cada AromaPom (paso 2 de la compra).
 * La bolsa va incluida SIN costo adicional.
 *
 * Cada edición tiene dos caras: `lado1` (frente) y `lado2` (reverso).
 * La "Edición tradicional" (kraft) tiene una sola cara, así que lado2 queda indefinido.
 *
 * Para cambiar una imagen, reemplaza el archivo en /public/img/bolsas
 * conservando el mismo nombre.
 */

export interface Bolsa {
  id: string;
  nombre: string;
  frase: string;
  lado1: string;
  lado2?: string;
}

export const bolsas: Bolsa[] = [
  {
    id: 'nuevos-comienzos',
    nombre: 'Nuevos comienzos',
    frase: 'Que cada ola te inspire a avanzar con propósito y sin miedo a empezar de nuevo.',
    lado1: '/img/bolsas/nuevos-comienzos-lado1.jpeg',
    lado2: '/img/bolsas/nuevos-comienzos-lado2.jpeg',
  },
  {
    id: 'mi-nina-interior',
    nombre: 'Mi niña interior',
    frase: '¿La ves? Es esa niña que tiene tu magia interior.',
    lado1: '/img/bolsas/mi-nina-interior-lado1.jpeg',
    lado2: '/img/bolsas/mi-nina-interior-lado2.jpeg',
  },
  {
    id: 'cumpleanos',
    nombre: 'Edición cumpleaños',
    frase: 'Una nueva vuelta al sol, un nuevo motivo para brillar.',
    lado1: '/img/bolsas/cumpleanos-lado1.jpeg',
    lado2: '/img/bolsas/cumpleanos-lado2.jpeg',
  },
  {
    id: 'cofre-amistad',
    nombre: 'Cofre de amistad',
    frase: 'Lo que el alma reconoce, el corazón aprende a cuidar.',
    lado1: '/img/bolsas/cofre-amistad-lado1.jpeg',
    lado2: '/img/bolsas/cofre-amistad-lado2.jpeg',
  },
  {
    id: 'nuevos-horizontes',
    nombre: 'Nuevos horizontes',
    frase: 'Abre tus alas y vuela hacia nuevos horizontes, persigue tus sueños.',
    lado1: '/img/bolsas/nuevos-horizontes-lado1.jpeg',
    lado2: '/img/bolsas/nuevos-horizontes-lado2.jpeg',
  },
  {
    id: 'suenos-mama',
    nombre: 'Sueños de Mamá',
    frase: 'Mientras cuidabas de todos, también construías tus propios sueños.',
    lado1: '/img/bolsas/suenos-mama-lado1.jpeg',
    lado2: '/img/bolsas/suenos-mama-lado2.jpeg',
  },
  {
    id: 'navidad',
    nombre: 'Edición Navidad',
    frase: 'Edición especial de temporada: Navidad es Familia.',
    lado1: '/img/bolsas/navidad-lado1.jpeg',
    lado2: '/img/bolsas/navidad-lado2.jpeg',
  },
  {
    id: 'tradicional',
    nombre: 'Edición tradicional',
    frase: 'Clásica bolsa kraft con cordón, elegante para cualquier ocasión.',
    lado1: '/img/bolsas/normal.jpeg',
  },
];

// Bolsa por defecto (primera de la lista)
export const bolsaPorDefecto = bolsas[0];

export function buscarBolsa(id: string): Bolsa | undefined {
  return bolsas.find((b) => b.id === id);
}
