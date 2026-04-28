import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  base: process.env.VERCEL
    ? '/'
    : '/portofolio_anan/',
  plugins: [react(), tailwindcss()],
  server: {
    host: true, // expose ke jaringan lokal
  },
})