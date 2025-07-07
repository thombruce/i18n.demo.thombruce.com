<script lang="ts" setup>
import type { PageCollections } from '@nuxt/content'

const { collection, path, order = { field: 'stem', direction: 'ASC' } } = defineProps<{
  collection: string,
  path: string,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  order?: { field: any, direction: 'ASC' | 'DESC' }
}>()

// NOTE: useAsyncData removed
const items = await queryCollection(collection as keyof PageCollections)
  .where('extension', '=', 'md')
  .where('path', 'LIKE', `${path}/%`)
  // .select('title', 'path', 'description', 'stem', 'date')
  .order(order.field, order.direction)
  .all()
</script>

<template lang="pug">
div
  TntGrid(v-if="items?.length" :items="items")
    template(#item="{ path, categories, date, title, description, authors }")
      ULink(:to="path")
        UCard
          UBadge(v-if="categories" v-for="category in categories" color="neutral" variant="outline") {{ category }}
          strong(v-if="date") {{ new Date(date).toLocaleDateString() }}
          h2(class="text-2xl font-extrabold") {{ title }}
          p {{ description }}
          div(
            v-if="authors"
            v-for="author in authors"
            class="px-2.5 py-1.5 text-sm space-x-1.5 inline-block"
          )
            UAvatar(:src="author.avatar?.src" size="2xs")
            span {{ author.name }}

  div(v-else)
    p No items to show.
</template>
