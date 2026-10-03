import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        artisan: {
          terracotta: "#C85A32",
          ochre: "#D9822B",
          sand: "#F5EBE1",
          earth: "#3D2B1F",
          clay: "#A34828",
          indigo: "#1E3A8A",
          forest: "#166534"
        },
      },
    },
  },
  plugins: [],
};
export default config;
