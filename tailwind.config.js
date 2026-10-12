/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: [
          "Inter",
          "system-ui",
          "-apple-system",
          "Segoe UI",
          "Roboto",
          "sans-serif",
        ],
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
        xl: "calc(var(--radius) + 4px)",
      },
      colors: {
        background: "rgb(var(--background) / <alpha-value>)",
        surface: "rgb(var(--surface) / <alpha-value>)",
        "surface-muted": "rgb(var(--surface-muted) / <alpha-value>)",
        border: "rgb(var(--border) / <alpha-value>)",
        "border-strong": "rgb(var(--border-strong) / <alpha-value>)",
        foreground: "rgb(var(--foreground) / <alpha-value>)",
        secondary: "rgb(var(--secondary) / <alpha-value>)",
        muted: "rgb(var(--muted) / <alpha-value>)",
        "on-brand": "rgb(var(--on-brand) / <alpha-value>)",
        brand: {
          DEFAULT: "rgb(var(--brand) / <alpha-value>)",
          hover: "rgb(var(--brand-hover) / <alpha-value>)",
          soft: "rgb(var(--brand-soft) / <alpha-value>)",
        },
        success: "rgb(var(--success) / <alpha-value>)",
        warning: "rgb(var(--warning) / <alpha-value>)",
        danger: "rgb(var(--danger) / <alpha-value>)",
        ring: "rgb(var(--ring) / <alpha-value>)",
      },
      boxShadow: {
        sm: "0 1px 2px 0 rgb(15 23 42 / 0.04)",
        md: "0 4px 12px -2px rgb(15 23 42 / 0.08), 0 2px 4px -2px rgb(15 23 42 / 0.04)",
        lg: "0 12px 24px -8px rgb(15 23 42 / 0.12), 0 4px 8px -4px rgb(15 23 42 / 0.06)",
      },
      ringColor: {
        DEFAULT: "rgb(var(--ring) / 0.5)",
      },
    },
    keyframes: {
      "collapsible-down": {
        from: { height: 0, opacity: 0 },
        to: { height: "var(--radix-collapsible-content-height)", opacity: 1 },
      },
      "collapsible-up": {
        from: { height: "var(--radix-collapsible-content-height)", opacity: 1 },
        to: { height: 0, opacity: 0 },
      },
      "accordion-down": {
        from: { height: 0, opacity: 0 },
        to: { height: "var(--radix-accordion-content-height)", opacity: 1 },
      },
      "accordion-up": {
        from: { height: "var(--radix-accordion-content-height)", opacity: 1 },
        to: { height: 0, opacity: 0 },
      },
    },
    animation: {
      "collapsible-down": "collapsible-down 0.2s ease-out",
      "collapsible-up": "collapsible-up 0.2s ease-out",
      "accordion-down": "accordion-down 0.2s ease-out",
      "accordion-up": "accordion-up 0.2s ease-out",
    },
  },
  plugins: [require("tailwindcss-animate")],
};
