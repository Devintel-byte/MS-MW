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
          50: '#f9fafb',
          100: '#e5e7eb',
          400: '#9ca3af',
          700: '#374151',
          800: '#1f2937',
        },
      orange: {
          100: '#fed7aa',
          500: '#f97316',
          600: '#e66915',
        },
      black: 'rgb(0, 0, 0)',
     slate: { 200: '#e2e8f0' },
    },
  },
};