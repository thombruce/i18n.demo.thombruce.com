import { z } from '@nuxt/content'

export const image = z.object({
  src: z.string().editor({ input: 'media' }),
  alt: z.string().optional(),
  caption: z.string().optional(),
})

export const author = z.object({
  name: z.string(),
  title: z.string().optional(),
  avatar: z.object({ src: z.string().editor({ input: 'media' }) }).optional(),
  to: z.string().url().optional(),
})

export const og = z.object({
  component: z.string().optional(),
  title: z.string().optional(),
  description: z.string().optional(),
  // icon: z.string().optional(),
  // logo: z.string().optional(),
  // headline: z.string().optional(),
  color: z.string().optional(),
  website: z.string().optional(),
  // image: z.string().optional(),
  // bg: z.string().optional(),
  // emoji: z.string().optional(),
})

// Global keys shared by all content pages
export const global = {
  title: z.string().optional(),
  description: z.string().optional(),
  og: og.optional(),

  date: z.string().date().optional(),

  layout: z.enum(['default', 'docs']).optional(),

  // TODO: Some kinda page.ui object.
  //       Probably include layout (above) in this as well.
  breadcrumbs: z.boolean().default(true),
  prevnext: z.boolean().default(true),
  // NOTE: Presently used only by the docs layout
  nav: z.boolean().default(true),
  toc: z.boolean().default(true),

  icon: z.string().optional().editor({ input: 'icon' }),

  images: z.array(image).optional(),

  categories: z.array(
    z.string()
  ),

  authors: z.array(author).optional(),

  // tags: z.array(z.string()).optional(), // TODO: Not presently used anywhere

  // TODO: Simplify? The type is currently too complex for use in Studio
  list: z.boolean() // .meta candidate
    .or(z.string())
    .or(z.object({
      collection: z.string().optional(),
      path: z.string(),
      order: z.object({ field: z.string(), direction: z.enum(['ASC', 'DESC']) }).optional()
    })).optional(),
}
