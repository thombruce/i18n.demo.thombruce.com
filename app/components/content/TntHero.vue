<script setup lang="ts">
import { UButton } from "#components";
import type { ButtonProps } from "@nuxt/ui"

const { title, description, headline, links, orientation = 'vertical' } = defineProps<{
  title?: string
  description?: string
  headline?: string
  links?: ButtonProps[]
  orientation?: 'vertical' | 'horizontal'
  // reverse?: boolean
}>()
</script>

<template lang="pug">
section(
  class="not-prose w-full max-w-(--ui-container) mx-auto px-4 sm:px-6 lg:px-8 flex flex-col py-24 sm:py-32 gap-16 sm:gap-y-24"
  :class="orientation === 'horizontal' ? 'lg:grid lg:py-40 lg:grid-cols-2 lg:items-center' : ''"
)
  div(v-if="title || description || headline || links")
    span(class="mb-4 font-semibold text-primary flex items-center gap-1.5") {{ headline }}
    h1(class="text-5xl sm:text-7xl text-pretty tracking-tight font-bold text-highlighted") {{ title }}
    p(class="text-lg sm:text-xl/8 text-muted text-pretty mt-6") {{ description }}
    div(v-if="links?.length" class="mt-10 flex flex-wrap gap-x-6 gap-y-3")
      UButton(v-for="link in links" size="xl" v-bind="link")
  div(v-if="$slots.default")
    slot/
</template>
