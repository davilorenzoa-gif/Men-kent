import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// base './' keeps the build relocatable: it works at a domain root (Netlify),
// inside a sub-folder, or opened from any static host without rewriting paths.
export default defineConfig({
  base: './',
  plugins: [react(), tailwindcss()],
  build: { target: 'es2022', cssMinify: true },
})
