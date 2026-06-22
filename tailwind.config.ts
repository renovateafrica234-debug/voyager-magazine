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
        voyager: {
          gold: "#C9A96E",
          "gold-light": "#D4B87A",
          "gold-dark": "#B8985A",
          dark: "#0A0A0A",
          "dark-elevated": "#141414",
          "dark-card": "#1A1A1A",
          cream: "#F2EDE4",
          "cream-muted": "#E8E2D6",
          surface: "#1C1C1C",
          border: "#2A2A2A",
          "text-primary": "#F2EDE4",
          "text-secondary": "#A8A29E",
          "text-muted": "#78716C",
        },
      },
      fontFamily: {
        serif: ["Georgia", "Cambria", "Times New Roman", "serif"],
        sans: [
          "Inter",
          "system-ui",
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "Roboto",
          "sans-serif",
        ],
      },
      animation: {
        "fade-in": "fadeIn 0.6s ease-out forwards",
        "slide-up": "slideUp 0.5s ease-out forwards",
        "shimmer": "shimmer 2s infinite",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-gold": "linear-gradient(135deg, #C9A96E 0%, #B8985A 50%, #D4B87A 100%)",
      },
    },
  },
  plugins: [],
};

export default config;
