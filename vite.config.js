import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/simplereport/',   // 👈 nombre EXACTO del repo en GitHub
  build: {
    outDir: 'docs',         // 👈 Vite generará la build en /docs
  },
})
