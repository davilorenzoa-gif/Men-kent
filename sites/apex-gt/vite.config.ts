import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// base './' keeps the build relocatable (Netlify root, sub-folder or the single-file preview).
export default defineConfig({
  base: './',
  plugins: [react(), tailwindcss()],
  build: {
    target: 'es2022',
    cssMinify: true,
    chunkSizeWarningLimit: 1000,
    // SINGLE=1 builds one JS file (no lazy chunks) for the offline single-file preview.
    rolldownOptions: process.env.SINGLE ? { output: { codeSplitting: false } } : undefined,
  },
})
