/** @type {import('tailwindcss').Config} */
module.exports = {
  // 👇 AQUÍ ESTÁ LA CLAVE. Agregamos las rutas correctas
  content: [
    "./app/**/*.{js,jsx,ts,tsx}", 
    "./src/**/*.{js,jsx,ts,tsx}",   // Esto cubre todo lo que esté en src
    "./src/components/**/*.{js,jsx,ts,tsx}" // Refuerzo para tus componentes UI
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {},
  },
  plugins: [],
}