/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {},
  },
  plugins: [],
  corePlugins: {
    // Disable oklch colors and use RGB/HEX
    preflight: true,
  },
  experimental: {
    // Explicitly disable oklch color optimization
    optimizeUniversalDefaults: false,
  },
  // Override Tailwind colors to use RGB
  theme: {
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      white: '#ffffff',
      gray: {
        100: 'rgb(243, 244, 246)', // Tailwind gray-100
        200: 'rgb(229, 231, 235)', // Tailwind gray-200
        400: 'rgb(156, 163, 175)', // Tailwind gray-400
        500: 'rgb(107, 114, 128)', // Tailwind gray-500
        700: 'rgb(55, 65, 81)', // Tailwind gray-700
        800: 'rgb(31, 41, 55)', // Tailwind gray-800
      },
      orange: {
        100: 'rgb(255, 237, 213)', // Tailwind orange-100
        500: 'rgb(249, 115, 22)', // Tailwind orange-500
        600: 'rgb(234, 88, 12)', // Tailwind orange-600
      },
      black: 'rgb(0, 0, 0)',
      slate: {
        200: 'rgb(203, 213, 225)', // Tailwind slate-200
      },
    },
  },
};