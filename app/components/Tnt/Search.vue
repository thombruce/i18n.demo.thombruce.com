<script setup lang="ts">
import type { PageCollections } from '@nuxt/content'

import _startCase from 'lodash/startCase'

// @i18n

// TODO: Should ideally have preference for chosen locale.
//       Should possibly exclude secondary locale, except
//       where pages require fallbacks.

// NOTE: We do not use tntTranslate here to avoid
//       the unnecessary computation of startCase(collection)
//       in such case that teh i18n key is defined.
// TODO: It may be worth considering a refactor of tntTranslate
//       in order to handle a callback function.
const { $i18n: { t: translate } } = useNuxtApp()
const t = (collection: string): string => {
  const key = 'content.collections.' + collection
  if (translate(key) !== key) {
    return translate(key)
  } else {
    return _startCase(collection)
  }
}

const query = ref('')

const sections: { collection: keyof PageCollections, section: object[] | undefined }[] = []

for (const collection of useRuntimeConfig().public.collections as (keyof PageCollections)[]) {
  // NOTE: useAsyncData removed
  const section = await queryCollectionSearchSections(collection)
    .then(async => async.map(c => {
      return {
        label: [...c.titles, c.title].join(' > '),
        suffix: c.content,
        onSelect() { navigateTo(c.id) }
      }
    }))
  sections.push({ collection, section })
}

const groups = computed(() => {
  return sections.map(s => {
    return {
      id: s.collection,
      label: query.value ? `${t(s.collection)} matching “${query.value}”...` : t(s.collection),
      items: s.section || [],
      // ignoreFilter: true // Can be used if we want to disable default filtering and use our own search logic.
    }
  })
})
</script>

<template lang="pug">
UModal
  UButton(
    label="Search..."
    color="neutral"
    variant="ghost"
    icon="lucide:search"
    class="my-2 px-2.5 py-1.5"
  )/

  template(#content)
    UCommandPalette(
      v-model:search-term="query"
      :groups="groups"
      :fuse="{ fuseOptions: { keys: ['title', 'content'], includeMatches: true } }"
      placeholder="Search content..."
      class="h-80"
    )/
</template>
