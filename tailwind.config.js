/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      './app/**/*.{js,ts,jsx,tsx,mdx}', // For App Router
      './pages/**/*.{js,ts,jsx,tsx,mdx}', // For Pages Router
      './components/**/*.{js,ts,jsx,tsx,mdx}',
      './src/**/*.{js,ts,jsx,tsx,mdx}', // If you used --src-dir
    ],
    theme: {
      extend: {},
    },
    plugins: [],
  }
  