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
    written: z
      .string()
      .regex(/^[0-9]{4}-[0-9]{2}-[0-9]{2}$/)
      .transform((d) => {
        const [year, month, date] = d.split('-')
        return new Date(Date.UTC(Number(year), Number(month) - 1, Number(date)))
      }),
  }),
})

export const collections = { modDocs, blog }
