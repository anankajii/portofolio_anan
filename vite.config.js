import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { viteStaticCopy } from 'vite-plugin-static-copy'
import path from 'path'

export default defineConfig({
  base: process.env.VERCEL
    ? '/'
    : '/portofolio_anan/',
  plugins: [
    react(),
    tailwindcss(),
    viteStaticCopy({
      targets: [
        {
          src: path.resolve(__dirname, 'node_modules/@mediapipe/hands') + '/*',
          dest: 'mediapipe/hands',
        },
      ],
    }),
  ],
  server: {
    host: true,
  },
})