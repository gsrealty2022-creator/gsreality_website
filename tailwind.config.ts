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
        'navy-blue': '#1a365d',
        'brand-teal': '#2fb9a2',
        'brand-red': '#c63f2b',
        'brand-teal-light': '#4fc5b0',
        'brand-teal-dark': '#259a87',
        'brand-red-light': '#e05a47',
        'brand-red-dark': '#a83222',
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

