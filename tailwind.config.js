// tailwind.config.js

/** @type {import('tailwindcss').Config} */
import { fontFamily } from 'tailwindcss/defaultTheme';

export const content = [
  "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
  "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
  "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
];
export const theme = {
  extend: {
    fontFamily: {
      sans: ['var(--font-inter)', ...fontFamily.sans],
      display: ['var(--font-poppins)', ...fontFamily.sans],
      // display: ['"Monument Extended"', 'sans-serif'], 
    },
    colors: {
        "vision-black": "#0A0A0A",
        cyan: {
          300: '#67e8f9',
          400: '#22d3ee',
          500: '#06b6d4',
        },
      },
    boxShadow: {
      'cyan-glow': '0 0 15px 0 rgba(34, 211, 238, 0.35), 0 0 30px -10px rgba(34, 211, 238, 0.2)',
    },
    backgroundImage: {
        'radial-gradient-hero': 'radial-gradient(ellipse at center, transparent 20%, #0A0A0A 90%)',
      }
  },
};
export const plugins = [];