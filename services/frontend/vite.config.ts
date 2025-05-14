import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import fs from 'fs'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './'),
    },
  },
  server: {
    https: {
      key: fs.readFileSync('./certificates/localhost-key.pem'),
      cert: fs.readFileSync('./certificates/localhost.pem'),
    },
    port: 3000,
    open: true
  }
}) 