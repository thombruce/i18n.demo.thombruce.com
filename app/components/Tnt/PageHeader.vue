<script setup lang="ts">
import { UButton } from "#components";
import type { ButtonProps } from "@nuxt/ui"

const { title, description, headline, links } = defineProps<{
  title?: string
  description?: string
  headline?: string
  links?: ButtonProps[]
}>()
</script>

<template lang="pug">
header(
  class="not-prose relative border-b border-default py-8 w-full"
)
  div(v-if="title || description || headline || links")
    span(class="mb-2.5 text-sm font-semibold text-primary flex items-center gap-1.5") {{ headline }}
    h1(class="text-3xl sm:text-4xl text-pretty font-bold text-highlighted") {{ title }}
    p(class="text-lg text-pretty text-muted mt-4") {{ description }}
    div(v-if="links?.length" class="mt-10 flex flex-wrap gap-x-6 gap-y-3")
      UButton(v-for="link in links" size="xl" v-bind="link")
  div(v-if="$slots.default")
    slot/
</template>
