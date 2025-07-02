<script setup lang="ts">
import type { Toc } from '@nuxt/content';
import type { NavigationMenuItem } from '@nuxt/ui';

const { toc = undefined } = defineProps<{
  toc?: Toc
}>()

const navItems: NavigationMenuItem[] | undefined = toc?.links.map((t) => {
  return {
    label: t.text as string,
    to: `#${t.id}` as string,
    open: true,
    children: t.children?.map((c) => {
      return {
        label: c.text as string,
        to: `#${c.id}` as string,
      }
    })
  }
})

// TODO: Rather than using UNavigationMenu or UTree, which each use collapsible elements to revel children...
//       Instead write your own link list component from scratch factoring in children with indentation.
//
//       NuxtUI Pro does feature a UContentToc component, but we are not yet ready to splurge on NuxtUI Pro
//       at this time.
//
// TODO: Also make it sticky somehow based on the **known** height of the navbar (how do we obtain/set this?).
</script>

<template lang="pug">
div(v-if="navItems")
  UNavigationMenu(
    :items="navItems || undefined"
    orientation="vertical"
    variant="link"
    :unmount-on-hide="false"
  )/
</template>