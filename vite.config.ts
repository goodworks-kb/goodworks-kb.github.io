import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig(({ command }) => ({
  plugins: [react()],
  // Use root path for dev, repo name for production build (GitHub Pages)
  base: command === 'build' ? '/goodworks-kb.github.io/' : '/',
  build: {
    outDir: 'dist',
  },
}))
