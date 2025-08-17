import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // Ensure environment variables are properly loaded
  envPrefix: 'VITE_',
  // Force Vite to load .env file
  envDir: '.',
  // Expose environment variables to the client
  define: {
    __VUE_OPTIONS_API__: true,
    __VUE_PROD_DEVTOOLS__: false,
  },
  // Build optimizations
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          three: ['@react-three/fiber', '@react-three/drei', 'three'],
        },
      },
    },
    chunkSizeWarningLimit: 1000,
  },
  // Asset handling
  assetsInclude: ['**/*.gltf', '**/*.bin'],
  // Optimize dependencies
  optimizeDeps: {
    include: ['@react-three/fiber', '@react-three/drei', 'three'],
  },
})
