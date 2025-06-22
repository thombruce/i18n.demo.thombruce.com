<script setup lang="ts">
import type { PageCollections } from '@nuxt/content';

const { path } = useRoute()

// @i18n

const {
  content: {
    i18n: contentI18n
  },
} = useAppConfig() as any

const { locale, defaultLocale } = useI18n()

const { collection } = defineProps<{
  collection: keyof PageCollections
}>()

// NOTE: useAsyncData removed
const items = await tntCrumbs(path, collection, { locale: contentI18n ? (locale.value === defaultLocale ? true : locale.value) : false })
</script>

<template lang="pug">
div(class="flex \
          items-center \
          justify-between \
          w-full")
  UBreadcrumb(:items="items || undefined" class="my-2 px-2.5 py-1.5")/
</template>
