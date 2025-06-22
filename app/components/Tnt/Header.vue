<script setup lang="ts">
import { tv } from 'tailwind-variants'

const localePath = useLocalePath()

const {
  site: { name },
  header: {
    navigation: { content: navContent, links: navLinks },
  },
} = useAppConfig() as any

// @i18n

const { /* color = 'neutral', */ variant = undefined } = defineProps<{
  // color?: 'neutral' | 'primary'
  variant?: 'bordered' | 'solid' | 'ghost'
  // TODO: Size - it would be nice to allow larger text; given that this
  //       ought to be a fixed/sticky element though, we must give consideration
  //       to the space occupied when positioning other content.
}>()

// NOTE: useAsyncData removed
const navItems = await tntNav(navContent ? navContent : navLinks)

const navbar = computed(() => tv({
  base: 'w-full',
  variants: {
    variant: {
      bordered: 'bg-muted border-b border-accented',
      solid: 'bg-(--ui-bg)',
      ghost: 'bg-transparent',
    },
  },
  compoundVariants: [
    {
      variant: ['solid', 'ghost'],
      class: 'border-none',
    },
  ],
  defaultVariants: {
    variant: 'bordered',
  },
}))
</script>

<template lang="pug">
div(:class="navbar({ variant })")
  UContainer(
    class="flex \
          items-center \
          justify-between"
  )
    div(class="flex")
      TntNavigationDrawer(:items="navItems")/

      UButton(
        :label="name"
        :to="localePath('/')"
        color="neutral"
        variant="ghost"
        class="my-2 px-2.5 py-1.5 font-extrabold"
      )/

    UNavigationMenu(
      :items="navItems || undefined"
      :unmount-on-hide="false"
      class="hidden md:flex w-full justify-center z-50"
    )/

    div(class="flex")
      TntSearch/
      TntColorMode/
</template>
