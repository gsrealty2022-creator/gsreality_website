import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        'navy-blue': '#0f172a',
        'brand-primary': '#0f172a', // Main Navy Blue
        'brand-secondary': '#C5A028', // Gold (Logo Match)
        'brand-primary-light': '#1e293b', // Lighter Navy
        'brand-primary-dark': '#020617', // Darker Navy
        'brand-secondary-light': '#D4AF37', // Lighter Gold
        'brand-secondary-dark': '#B8860B', // Darker Gold
      },
      animation: {
        'spin-slow': 'spin 1s linear infinite',
        'gradient': 'gradient 3s ease infinite',
      },
      keyframes: {
        gradient: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
      },
    },
  },
  plugins: [],
};
export default config;

