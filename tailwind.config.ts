import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#409af5",
        secondary: "#7ed957",
        tertiary: "#c699f1",
      },
      fontFamily: {
        vazir: ["Vazir", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
