import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    // Output directory for the build
    outDir: "dist",
    // Specify public base path for assets
    base: "/TicTacToe/",
    // Enable sourcemap generation for debugging
    sourcemap: true,
    // Additional build options as needed
  },
})
