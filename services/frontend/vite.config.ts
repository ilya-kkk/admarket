import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import fs from 'fs'

export default defineConfig({
  plugins: [react()],
  server: {
    https: {
      key: fs.readFileSync('./certificates/privkey.pem'),
      cert: fs.readFileSync('./certificates/fullchain.pem'),
    },
    host: '0.0.0.0',
    port: 3000,
  },
}) 