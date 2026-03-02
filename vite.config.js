import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    // Warn if a chunk exceeds 500 KB
    chunkSizeWarningLimit: 500,
    rollupOptions: {
      output: {
        // Split vendor libraries into separate cacheable chunks
        manualChunks(id) {
          if (id.includes('node_modules')) {
            // React core into its own chunk
            if (id.includes('react-dom') || id.includes('react/')) {
              return 'react-vendor'
            }
            // EmailJS into its own chunk (only needed for Contact section)
            if (id.includes('@emailjs')) {
              return 'emailjs-vendor'
            }
            // All other node_modules together
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
