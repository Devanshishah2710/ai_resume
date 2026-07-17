import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { resolve } from 'path'

/**
 * Vite config with:
 * - Tailwind CSS v4 via plugin (no postcss needed)
 * - Path aliases for clean imports
 * - Chunk splitting for optimal bundle size
 */
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
      '@components': resolve(__dirname, './src/components'),
      '@features': resolve(__dirname, './src/features'),
      '@hooks': resolve(__dirname, './src/hooks'),
      '@lib': resolve(__dirname, './src/lib'),
      '@pages': resolve(__dirname, './src/pages'),
      '@services': resolve(__dirname, './src/services'),
      '@store': resolve(__dirname, './src/store'),
      '@types': resolve(__dirname, './src/types'),
      '@utils': resolve(__dirname, './src/utils'),
      '@constants': resolve(__dirname, './src/constants'),
      '@contexts': resolve(__dirname, './src/contexts'),
      '@templates': resolve(__dirname, './src/templates'),
    },
  },
  build: {
    // html2pdf.js bundles a full PDF renderer (~935KB) — expected large chunk
    chunkSizeWarningLimit: 1000,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            if (id.includes('react') || id.includes('react-dom') || id.includes('react-router-dom')) return 'vendor'
            if (id.includes('@supabase')) return 'supabase'
            if (id.includes('framer-motion')) return 'motion'
            if (id.includes('@dnd-kit')) return 'dnd'
            if (id.includes('react-hook-form')) return 'forms'
            if (id.includes('zustand')) return 'store'
          }
        },
      },
    },
  },
})
