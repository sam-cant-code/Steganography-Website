import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  // This section tells Vite to specifically look for and pre-bundle
  // the browser-compatible version of the @vercel/stega package.
  // We are removing the incorrect 'resolve.alias' section.
  optimizeDeps: {
    include: ['@vercel/stega/browser'],
  },
})
