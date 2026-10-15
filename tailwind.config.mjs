/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,ts,tsx,vue,svelte}'],
  theme: {
    extend: {
      colors: {
        // Paleta de marca inspirada en el logo y las fichas de aroma
        marca: {
          morado: '#5B2A86',   // morado profundo del logo "La Pomponería"
          lila: '#9B5DE5',     // lila/púrpura vibrante
          fucsia: '#E6168B',   // fucsia/magenta de "BGA" y acentos
          rosa: '#F7A6D3',     // rosa suave de fondos
          rosaClaro: '#FDEBF4',// rosa muy claro para secciones
          crema: '#FFF7FB',    // fondo cremoso
          amarillo: '#FFC94D', // acento cítrico
        },
      },
      fontFamily: {
        sans: ['Nunito', 'system-ui', 'sans-serif'],
        display: ['Baloo 2', 'Nunito', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        suave: '0 10px 30px -10px rgba(91, 42, 134, 0.25)',
        tarjeta: '0 8px 24px -8px rgba(230, 22, 139, 0.18)',
      },
      borderRadius: {
        '2xl': '1.25rem',
        '3xl': '1.75rem',
      },
    },
  },
  plugins: [],
};
