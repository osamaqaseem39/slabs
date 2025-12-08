import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/sections/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/utils/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: "1.5rem",
        sm: "1.5rem",
        md: "2rem",
        lg: "2.5rem",
        xl: "3rem",
        "2xl": "4rem",
      },
      screens: {
        sm: "600px",
        md: "768px",
        lg: "1024px",
        xl: "1200px",
        "2xl": "1440px",
      },
    },
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        primary: "#00bef7",
        secondary: "#00bef7",
        tertiary: "rgb(20 27 56)",
      },
      screens: {
        xs: "375px",
      },
      maxWidth: {
        "layout-xs": "375px",
        "layout-sm": "600px",
        "layout-md": "768px",
        "layout-lg": "1024px",
        "layout-xl": "1200px",
        "layout-2xl": "1440px",
      },
    },
  },
  plugins: [],
};
export default config;
