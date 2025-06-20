<script lang="ts" setup>
import type { LayoutKey } from '#build/types/layouts'
import type { PageCollections } from '@nuxt/content'

// @i18n

const { locale, defaultLocale } = useI18n()

const route = useRoute()

const { public: { collections } } = useRuntimeConfig()

const { content: { i18n: contentI18n }, ui: { theme, layout: defaultLayout, pattern: backgroundPattern } } = useAppConfig()

let collection = collections.includes(((contentI18n ? `${locale.value}_` : '') + route.params.slug?.[0]) as keyof PageCollections)
  ? ((contentI18n ? `${locale.value}_` : '') + route.params.slug?.[0]) as keyof PageCollections
  : ((contentI18n ? `${locale.value}_` : '') + 'pages') as keyof PageCollections

// NOTE: useAsyncData removed
let page = await queryCollection(collection).path(route.path).first()

// Fallback
if (contentI18n && !page) {
  collection = collections.includes(`${defaultLocale}_${route.params.slug?.[0]}` as keyof PageCollections)
    ? `${defaultLocale}_${route.params.slug?.[0]}` as keyof PageCollections
    : `${defaultLocale}_pages` as keyof PageCollections

    let split = route.path.split('/')
    split.splice(1, 1, defaultLocale)
    const path = split.join('/')

    page = await queryCollection(collection).path(path).first()
}

// TODO: For menus/search, discard dupes favouring chosen locale where present.
// NOTE: prevnext won't really work properly where pages are missing; in that
//       case, we should just show only pages for the chosen locale.

// OKAY: But... Hang on... was the separate collection approach better?
//       I don't think so, right? Surely it is better to discard... but...
//       Something about ordering of content got me thinking... 'cause
//       fallbacks are gonna be completely out of order, right? Like...
//       en/about is gonna come before sv/index. And that's somewhat
//       unresolvable... We can reorder using Nuxt Content .order chainable
//       but that then requires us to order by some given field... and it
//       1. might not have the desired result always
//       2. might require us to think about adding a new field to be managed
//       Simpler, actually, (at least from end-user POV) to...
//       Basically to.... establish the ordering of links using the default
//       locale, then query and match chosen locale files to the default
//       locale items. This means we'll already have queried for the fallbacks.
//       From a menus perspective then, I think this makes separate collections
//       favourable. From a search one? Less sure.
//       We do have to construct our search result collection anyway.. We can
//       technically do that however we like. Does the multi-collection approach
//       provide us more flexibility? I really think it does. We can limit search
//       to same language (by targeting the collection), we can match items from
//       another collection or list them separately...
//       Yeah, I think I'm settled on the multi-collection approach.
//       Dammit. I just undid that! Easily returned to previous. Done!

// NOTE: useAsyncData removed
const navItems = await tntNav(true, collection)

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
</script>

<template lang="pug">
NuxtLayout(:name="layout" :theme="theme" :collection="collection")
  template(#nav v-if="page?.nav && navItems")
    UNavigationMenu(
      :items="navItems"
      orientation="vertical"
      :unmount-on-hide="false"
    )/

  template(#default)
    TntBreadcrumbs(v-if="page?.breadcrumbs" :collection="collection")/

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

  template(#toc v-if="page?.toc && page?.body.toc?.links.length")
    TntToc(:toc="page?.body.toc")
</template>
