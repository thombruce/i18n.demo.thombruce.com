<script lang="ts" setup>
import type { PageCollections } from '@nuxt/content'

const { theme, collection }: { theme?: 'solid' | 'ghost', collection?: keyof PageCollections } = useAttrs()
</script>

<template lang="pug">
div(class="flex flex-col h-screen justify-between")

  TntHeader(:variant="theme" :collection="collection")/

  UContainer(class="mb-auto")

    slot/

  TntFooter(:variant="theme" :collection="collection")/
</template>
