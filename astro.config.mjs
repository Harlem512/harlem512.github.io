// @ts-check
import { defineConfig } from 'astro/config'

import react from '@astrojs/react';

// https://astro.build/config
export default defineConfig({
  site: 'https://harlem512.github.io',
  integrations: [react()],
})