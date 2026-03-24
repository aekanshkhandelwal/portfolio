import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    // Allow larger chunks before warning (useful for heavy graphics/motion libraries)
    chunkSizeWarningLimit: 1500,
    rollupOptions: {
      output: {
        // Split vendor libraries into separate cacheable chunks
        manualChunks(id) {
          if (id.includes('node_modules')) {
            // React core
            if (id.includes('react-dom') || id.includes('react/')) {
              return 'react-vendor'
            }
            // Motion
            if (id.includes('framer-motion')) {
              return 'motion-vendor'
            }
            // Icons
            if (id.includes('lucide-react')) {
              return 'lucide-vendor'
            }
            // Graphics
            if (id.includes('three') || id.includes('@splinetool')) {
              return 'graphics-vendor'
            }
            // EmailJS
            if (id.includes('@emailjs')) {
              return 'emailjs-vendor'
            }
            return 'vendor'
          }
        },
        // Use content hash for long-term caching
        chunkFileNames: 'assets/[name]-[hash].js',
        entryFileNames: 'assets/[name]-[hash].js',
        assetFileNames: 'assets/[name]-[hash].[ext]',
      },
    },
    // Minify with esbuild (default, fastest)
    minify: 'esbuild',
    // Enable source maps only in development
    sourcemap: false,
    // Inline assets smaller than 4KB as base64
    assetsInlineLimit: 4096,
    // Target modern browsers — smaller output
    target: 'es2015',
  },
  // Optimize dependencies during dev server
  optimizeDeps: {
    include: ['react', 'react-dom', '@emailjs/browser'],
  },
})
