import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/ToDoList/',
  server: {
    port: 3001,
    open: true
  },
  build: {
    outDir: 'docs',
    sourcemap: true
  }
})
