/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#6366f1', // Indigo-500
          dark: '#818cf8',    // Indigo-400
        },
        accent: {
          DEFAULT: '#f59e42', // Orange-400
          dark: '#fbbf24',    // Amber-400
        },
        secondary: {
          DEFAULT: '#10b981', // Emerald-500
          dark: '#34d399',    // Emerald-400
        },
        neutral: {
          DEFAULT: '#f3f4f6', // Gray-100
          dark: '#18181b',    // Gray-900
        },
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [],
  darkMode: "class",
};
