<script setup lang="ts">
const { items, cols = 4 } = defineProps<{
  items?: any[]
  cols?: 1 | 2 | 3 | 4
  // masonry?: boolean
}>()

// TODO: This is an imperfect way of handling the number of columns.
//       Perhaps we would prefer to invoke Tailwind Variants UI manipulation?

const klass = computed(() => {
  switch (cols) {
    case 1:
      return 'grid-cols-1'
    case 2:
      return 'grid-cols-1 sm:grid-cols-2'
    case 3:
      return 'grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3'
    case 4:
    default:
      return 'grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
  }
})
</script>

<template lang="pug">
div(class="grid gap-4" :class="klass")
  div(v-for="item in items" class="")
    slot(name="item" v-bind="item")/
</template>
