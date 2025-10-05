import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig(({ command }) => {
  const base = command === 'build' ? '/War4Ever/' : '/'
  
  return {
    plugins: [react()],
    base: base,
    build: {
      rollupOptions: {
        input: {
          main: './index.html',
        }
      }
    },
    publicDir: 'public'
  }
})

