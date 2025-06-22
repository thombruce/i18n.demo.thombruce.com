// https://nuxt.com/docs/api/configuration/nuxt-config

export default defineNuxtConfig({
  future: {
    compatibilityVersion: 4,
  },
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  nitro: {
    static: true
  },
  site: {
    name: 'I18n Demo',
    description: '',
    url: 'https://i18n.demo.thombruce.com/',
  },
  routeRules: {
    /* Custom route rules */
    '/sv': { prerender: true, }
  },
  runtimeConfig: {
    public: {
      collections: [
        'pages',
        'blog',
        'sv_pages',
        'sv_blog',
      ],
      googleAnalytics: {
        // NUXT_PUBLIC_GOOGLE_ANALYTICS_ID=<your-id>
        id: '',
      },
    },
  },
  ui: {
    theme: {
      colors: [
        'primary',
        'secondary',
        'success',
        'info',
        'warning',
        'error',
        'neutral',
      ],
    },
  },
  modules: [
    'nuxt-site-config',
    '@nuxt/icon',
    '@nuxt/image',
    '@nuxt/scripts',
    '@nuxt/test-utils',
    '@nuxt/ui',
    '@nuxtjs/i18n',
    '@nuxt/fonts',
    '@nuxt/eslint',
    '@vueuse/nuxt',
    '@nuxtjs/seo',
    '@nuxt/content',
  ],
  css: [
    './assets/css/main.css',
  ],
  app: {
    head: {
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
      ]
    }
  },
  content: {
    build: {
      markdown: {
        highlight: {
          langs: [
            /* Add your own languages if you want to support code highlighting in documents */
          ]
        },
        toc: {
          // TODO: This can be set back to 2 when we have a better solution for our TntToc
          depth: 1,
        }
      }
    },
    preview: {
      api: 'https://api.nuxt.studio',
      // dev: true,
      // See here for how to debug studio setup in dev: https://content.nuxt.com/docs/studio/debug
      // You probably don't want to do this all the time, as it exposes your app to the internet.
      // It is useful specifically for development work concerning the admin interface on Nuxt Studio.
    }
  },
  i18n: {
    // baseUrl: 'https://www.example.com', // TODO: Implement SEO
    strategy: 'prefix_except_default',
    defaultLocale: 'en',
    locales: [
      { code: 'en', name: 'English', file: 'en.json' },
      { code: 'sv', name: 'Svenska', file: 'sv.json' },
    ]
  },
  // PATCH: https://github.com/nuxt/nuxt/issues/32175#issuecomment-2898200099
  // vite: {
  //   $server: {
  //     build: {
  //       rollupOptions: {
  //         output: {
  //           preserveModules: true
  //         }
  //       }
  //     }
  //   },
  // },
})
