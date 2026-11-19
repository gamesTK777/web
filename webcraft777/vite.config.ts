import { defineConfig } from 'vite'

export default defineConfig({
  base: './',
  build: { outDir: 'play', target: 'es2022' }
})
