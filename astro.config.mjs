// @ts-check
import react from '@astrojs/react'
import { defineConfig } from 'astro/config'

// https://astro.build/config
export default defineConfig({
  site: 'https://harlem512.github.io',
  integrations: [react()],
})
