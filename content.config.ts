import { defineCollection, defineContentConfig, z } from '@nuxt/content'

import { image as _image, author as _author, og as _og, global } from './app/content.utils'

export default defineContentConfig({
  collections: {
    // Pages: E.g. /index.md, /about.md
    pages: defineCollection({
      source: [
        {
          include: '**/*',
          exclude: [
            '.*',
            '.*/**/*',
            '*blog/**/*',
            'sv/**/*',
          ]
        },
      ],
      type: 'page',
      schema: z.object({
        ...global,
      })
    }),
    blog: defineCollection({
      source: [
        {
          include: '*blog/**/*',
          exclude: [
            '*blog/**/.*',
            '*blog/**/.*/**/*',
          ]
        },
      ],
      type: 'page',
      schema: z.object({
        ...global,
      })
    }),
    sv_pages: defineCollection({
      source: [
        {
          include: 'sv/**/*',
          exclude: [
            'sv/.*',
            'sv/.*/**/*',
            'sv/*blog/**/*',
          ]
        },
      ],
      type: 'page',
      schema: z.object({
        ...global,
      })
    }),
    sv_blog: defineCollection({
      source: [
        {
          include: 'sv/*blog/**/*',
          exclude: [
            'sv/*blog/**/.*',
            'sv/*blog/**/.*/**/*',
          ]
        },
      ],
      type: 'page',
      schema: z.object({
        ...global,
      })
    }),
  }
})

// To define custom collections, see:
// https://content.nuxt.com/docs/collections/define

// NOTE: It is recommended that any and all content
// files you wish to be searchable are written in
// markdown. It is not yet possible to search .yml
// files or custom content types. We recommend
// creating canonical markdown files which link to
// "attached" content should you need to use custom
// types at all.
