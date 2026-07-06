import { glob } from 'astro/loaders'
import { defineCollection, z } from 'astro:content'

const modDocs = defineCollection({
  loader: glob({ pattern: '*/*.mdx', base: './modDocs/src' }),
  schema: z.object({
    desc: z.string(),
    title: z.string(),
    order: z.number(),
  }),
})

const blog = defineCollection({
  loader: glob({ pattern: '*.mdx', base: './src/pages/blog' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    written: z.coerce.date().transform((d) => {
      // add 24 hours so dates line up
      d.setHours(25)
      return d
    }),
  }),
})

export const collections = { modDocs, blog }
