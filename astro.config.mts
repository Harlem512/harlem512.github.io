// @ts-check
import mdx from '@astrojs/mdx'
import sitemap from '@astrojs/sitemap'
import { transformerColorizedBrackets } from '@shikijs/colorized-brackets'
import { transformerMetaHighlight } from '@shikijs/transformers'
import type { ShikiConfig } from 'astro'
import { defineConfig } from 'astro/config'
import rehypeExternalLinks from 'rehype-external-links'
import catspeak from './src/data/syntax/catspeak.tmLanguage.json' assert { type: 'json' }
import gml from './src/data/syntax/gml.tmLanguage.json' assert { type: 'json' }
import mini from './src/data/syntax/mini.tmLanguage.json' assert { type: 'json' }
import rmml from './src/data/syntax/rmml.tmLanguage.json' assert { type: 'json' }

export const shikiConfig: Partial<ShikiConfig> = {
  theme: 'night-owl',
  langs: [catspeak, rmml, gml, mini],
  wrap: false,
  langAlias: {
    sp: 'catspeak',
    gml: 'GameMaker Language',
  },
  transformers: [transformerColorizedBrackets(), transformerMetaHighlight()],
}

// https://astro.build/config
export default defineConfig({
  site: 'https://harlem512.github.io',
  integrations: [sitemap(), mdx()],
  markdown: {
    shikiConfig,
    rehypePlugins: [[rehypeExternalLinks, {}]],
  },
})
