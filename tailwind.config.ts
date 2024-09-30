import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./**/*.tsx"],
  theme: {
    extend: {
      screens: {
        xs: "320px",
        sm: "480px",
        md: "768px",
        lg: "976px",
        xl: "1440px",
      },
      colors: {
        cream: "#FFE8DF",
        orange: "#FFAC66",
        transparent: "transparent",
        current: "currentColor",
        white: "#ffffff",
        black: "#000",
        charcoal: "#2C2C2C",
        jetBlack: "#090909",
        graphite: "#343434",
      },
      spacing: {
        "128": "32rem",
        "144": "36rem",
      },
      borderRadius: {
        "2.5xl": "1.25rem",
        "4xl": "2rem",
      },
      width: {
        "88": "22rem",
        "112": "28rem",
        "124": "31rem",
      },
      height: {
        "84": "21rem",
        CarouselCardHeight: "37.5rem",
      },
    },
  },
  plugins: [],
};

export default config;
