import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        black: "#000",
        yellow: "#FAC744",
        white: "#ffffff",
        green: "#67CE67",
        blue: {
          header: "#0E1648",
          card: "#0E1648",
          body: "#020733",
          btn: "#3333FF",
          dropHeader: "#192468",
          commingSoon: "#010E28",
        },
        grey: {
          100: "#FBFBFB",
          300: "#CCCCCC",
          400: "#808080",
          500: "#4C4C4C",
          700: "#6A6B6D",
          800: "#ABABAB",
          900: "#2E405D",
        },
        cancel: "#C25E5E",
      },
    },
  },
  plugins: [],
};
export default config;
