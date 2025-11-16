import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/simplereport/',   // nombre del repo en GitHub
  build: {
    outDir: 'docs',         // aquí se generará la versión para GitHub Pages
  },
})