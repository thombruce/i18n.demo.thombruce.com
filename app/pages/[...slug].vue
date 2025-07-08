<script lang="ts" setup>
import type { LayoutKey } from '#build/types/layouts'
import type { PageCollections } from '@nuxt/content'

// @i18n

const { locale, defaultLocale } = useI18n()

const route = useRoute()

const { public: { collections, googleAnalytics: { id: gaID } } } = useRuntimeConfig()

const { content: { i18n: contentI18n }, ui: { theme, layout: defaultLayout, pattern: backgroundPattern } } = useAppConfig()

const consented = useCookie<boolean>('cookieConsent')

const currentLocale = locale.value
const currentLocaleIsDefault = currentLocale === defaultLocale

let collection = collections.includes(((contentI18n && !currentLocaleIsDefault ? `${currentLocale}_` : '') + route.params.slug?.[0]) as keyof PageCollections)
  ? ((contentI18n && !currentLocaleIsDefault ? `${currentLocale}_` : '') + route.params.slug?.[0]) as keyof PageCollections
  : ((contentI18n && !currentLocaleIsDefault ? `${currentLocale}_` : '') + 'pages') as keyof PageCollections

// NOTE: useAsyncData removed
let page = await queryCollection(collection).path(route.path).first()

const layout = (page?.layout || defaultLayout || 'default') as LayoutKey

definePageMeta({
  colorMode: pageMeta.colorMode
})

tntOgImageComponent(page?.og?.component, {
  title: page?.og?.title || page?.title,
  website: page?.og?.website,
  color: page?.og?.color,
  testimonial: page?.og?.description || page?.description,
  authors: page?.authors,
})

useScriptGoogleAnalytics({
  id: gaID || '',
  scriptOptions: {
    trigger: consented
  }
})
</script>

<template lang="pug">
NuxtLayout(:name="layout" :page="page" :collection="collection" :theme="theme")

  TntBreadcrumbs(v-if="page?.breadcrumbs" :collection="collection")/

  TntPageHeader(v-if="page?.header" :title="page?.title" :description="page?.description" :headline="page?.headline" :links="page?.links")

  UCarousel(v-if="page?.images" v-slot="{ item }" :items="page.images" :ui="{ item: 'basis-1/3' }")

    figure(v-if="item && item.caption")
      div(class="block aspect-video")
        NuxtImg(:src="String(item.src)" :alt="item.alt" fit="cover" width="1200" class="w-full h-full object-cover rounded-lg")
      figcaption {{ item.caption }}

    div(v-else-if="item" class="block aspect-video")
      NuxtImg(:src="String(item.src)" :alt="item.alt" fit="cover" width="1200" class="w-full h-full object-cover rounded-lg")

  ContentRenderer(
    v-if="page"
    :value="page"
    class="prose \
          dark:prose-invert \
          max-w-none"
  )/

  template(v-else)
    div(class="prose dark:prose-invert max-w-none")
      h1 Page Not Found
      p Oops! The content you're looking for doesn't exist.
      NuxtLinkLocale(to="/") Go back home

  //- TODO: Ensure that article list shows content from fallback locale
  TntArticleList(
    v-if="page?.list"
    :collection="typeof page.list === 'object' && page.list.collection ? page.list.collection : collection"
    :path=" \
      typeof page.list === 'boolean' \
        ? route.path \
        : typeof page.list === 'string' \
        ? page.list \
        : typeof page.list === 'object' \
        ? page.list.path \
        : route.path \
    "
    :order="typeof page.list === 'object' && page.list.order ? page.list.order : undefined"
  )

  TntPrevNext(v-if="page?.prevnext" :collection="collection")/

  TntBackground(v-if="backgroundPattern" :pattern="backgroundPattern")/
</template>
