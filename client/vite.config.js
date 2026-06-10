// client/vite.config.js
//
// The proxy setting is the most important part here.
// When my React app (running on port 5173) calls /api/contact,
// Vite forwards that request to my Express server on port 4000.
// This means I never have to type the full backend URL in my
// React code — and CORS is not an issue during local development.

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    proxy: {
      // Any request to /api/* gets forwarded to the Express server
      '/api': {
        target:      'http://localhost:4000',
        changeOrigin: true,
      },
    },
  },
  build: {
    // Output goes to dist/ — this is what Netlify deploys
    outDir:    'dist',
    // Generate source maps for debugging production issues
    sourcemap: true,
  },
})
