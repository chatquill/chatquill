/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        bg: {
          DEFAULT: '#0d1117',
          2: '#111820',
          3: '#161f2c',
          4: '#1c2739',
        },
        border: {
          DEFAULT: '#1e2d3d',
          2: '#243447',
        },
        muted: '#3d5166',
        dim: '#7a90a4',
        body: '#b8ccdb',
        'off-white': '#e4eff8',
        accent: {
          DEFAULT: '#00e5a0',
          2: '#00c488',
        },
      },
      fontFamily: {
        display: ['"Playfair Display"', 'Georgia', 'serif'],
        body: ['Lora', 'Georgia', 'serif'],
        mono: ['"JetBrains Mono"', '"Courier New"', 'monospace'],
      },
      screens: {
        xs: '400px',
      },
    },
  },
};
