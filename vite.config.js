import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: '127.0.0.1',  // 👈 tvinga Vite att lyssna på 127.0.0.1
    port: 5173,         // 👈 samma port som du använder i Spotify
  }
})
