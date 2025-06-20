<script setup lang="ts">
import type { PageCollections } from '@nuxt/content';

const { path } = useRoute()

// @i18n

const { collection } = defineProps<{
  collection: keyof PageCollections
}>()

// NOTE: useAsyncData removed
const data = await queryCollectionItemSurroundings(collection, path)

const [prev, next] = data ? [data[0], data[1]] : []
</script>

<template lang="pug">
div(class="flex \
          items-center \
          justify-between \
          w-full")
  UButton(
    v-if="prev"
    :label="prev.title"
    :to="prev.path"
    icon="lucide:chevron-left"
    leading
    color="neutral"
    variant="ghost"
    class="my-2 px-2.5 py-1.5"
  )/
  div(v-else class="size-8 my-2 px-2.5 py-1.5")/

  UButton(
    v-if="next"
    :label="next.title"
    :to="next.path"
    icon="lucide:chevron-right"
    trailing
    color="neutral"
    variant="ghost"
    class="my-2 px-2.5 py-1.5"
  )/
  div(v-else class="size-8 my-2 px-2.5 py-1.5")/
</template>