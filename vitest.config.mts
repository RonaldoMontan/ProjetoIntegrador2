import { fileURLToPath } from 'node:url'
import { defineConfig } from 'vitest/config'

export default defineConfig({
  resolve: {
    // mesmo atalho "@/" do tsconfig
    alias: { '@': fileURLToPath(new URL('./', import.meta.url)) }
  },
  test: {
    include: ['src/**/*.test.ts']
  }
})
