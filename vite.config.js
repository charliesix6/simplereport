import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/',          // 👈 IMPORTANTE: solo una barra
  build: {
    outDir: 'docs',   // para que GitHub Pages use /docs
  },
})
