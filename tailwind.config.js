/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: ["class", "class"],
  theme: {
    fontFamily: {
      roboto: ["Roboto", "sans-serif"],
      helvetica: ["Helvetica", "sans-serif"],
    },
    container: {
      padding: {
        DEFAULT: "1rem",
        sm: "2rem",
        lg: "4rem",
        xl: "5rem",
        "2xl": "6rem",
      },
      center: "true",
    },
    screens: {
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1536px",
    },
    extend: {
      animation: {
        bounceSlow: "bounce 2s infinite",
      },
      colors: {
        dark: "#333333",
        light: "#e7f8fe",
        primary: "#13356d",
        secondary: "#d5ff47",
        brand: "#13356d",
        brandLight: "#154188",
        brandDark: "#a5a7aa",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
