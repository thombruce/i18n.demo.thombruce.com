<script setup lang="ts">
const {
  cards
} = defineProps<{
  cards: {
    highlight?: boolean
    title?: string
    badge?: string
    description?: string
    price?: string
    discount?: string
    features?: string[]
    button?: object
    terms?: string
  }[]
}>()

// TODO: This is hacky and should be refactored when TntGrid is improved.
const cols = computed(() => {
  switch (cards.length) {
    case 1:
      return 1
    case 2:
      return 2
    case 3:
      return 3
    case 4:
    default:
      return 4
  }
})
</script>

<template lang="pug">
TntGrid(:cols="cols" :items="cards")
  template(#item="card")
    TntPricingCard(v-bind="card")
</template>
