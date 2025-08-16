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
  }
})
