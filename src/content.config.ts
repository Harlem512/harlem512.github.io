import { glob } from 'astro/loaders'
import { defineCollection, z } from 'astro:content'

const modDocs = defineCollection({
  loader: glob({ pattern: '*/*.mdx', base: './modDocs/src' }),
  schema: z.object({
    desc: z.string(),
    title: z.string(),
    order: z.number()
  }),
})

export const collections = { modDocs }
