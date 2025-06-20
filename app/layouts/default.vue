<script lang="ts" setup>
import type { PageCollections } from '@nuxt/content';

// @i18n

const { theme, collection }: { theme?: 'solid' | 'ghost', collection?: keyof PageCollections } = useAttrs()
</script>

<template lang="pug">
div(class="flex flex-col h-screen justify-between")
  TntHeader(:variant="theme" :collection="collection")/

  UContainer(class="mb-auto")
    div(class="grid grid-cols-10 gap-10")
      div(v-if="$slots.nav" class="col-span-2 hidden md:flex")
        slot(name="nav")

      div(:class="($slots.nav && $slots.toc) ? 'col-span-10 md:col-span-6' : ($slots.nav || $slots.toc) ? 'col-span-10 md:col-span-8' : 'col-span-10'")

        //- TODO: ToC - sm and lower

        slot

      div(v-if="$slots.toc" class="col-span-2 hidden md:flex")
        slot(name="toc")

  TntFooter(:variant="theme" :collection="collection")/
</template>
