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
        // Use content hash for long-term caching
        chunkFileNames: 'assets/[name]-[hash].js',
        entryFileNames: 'assets/[name]-[hash].js',
        assetFileNames: 'assets/[name]-[hash].[ext]',
      },
    },
    // Minify with esbuild for production performance
    minify: 'esbuild',
    // Enable source maps only in development
    sourcemap: false,
    // Inline assets smaller than 4KB as base64
    assetsInlineLimit: 4096,
    // Target modern browsers supporting ES modules
    target: 'modules',
  },
  // Optimize dependencies during dev server
  optimizeDeps: {
    include: ['react', 'react-dom', '@emailjs/browser'],
  },
})
