import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#409af5',
        secondary: '#7ed957',
        tertiary: '#c699f1',
      },
      fontFamily: {
        vazir: ['Vazir', 'sans-serif'],
      },
    },
  },
  darkMode: 'class',
  plugins: [],
};

export default config;
