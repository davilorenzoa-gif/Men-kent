import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// base './' keeps the build relocatable: it works at a domain root (Netlify),
// inside a sub-folder, or opened from any static host without rewriting paths.
export default defineConfig({
  base: './',
  plugins: [react(), tailwindcss()],
  build: {
    target: 'es2022',
    cssMinify: true,
    rolldownOptions: {
      output: {
        // Libraries change far less often than the site: keep them in their own
        // long-cached files, fetched in parallel with the app code.
        codeSplitting: {
          groups: [
            { name: 'react', test: /node_modules[\\/](react|react-dom|scheduler)[\\/]/, priority: 2 },
            { name: 'motion', test: /node_modules[\\/](motion|motion-dom|motion-utils|framer-motion|lenis)[\\/]/, priority: 1 },
          ],
        },
      },
    },
  },
})
