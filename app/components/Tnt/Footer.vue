<script setup lang="ts">
import type { PageCollections } from '@nuxt/content';
import { tv } from 'tailwind-variants'

const {
  ui: { pattern: backgroundPattern },
  content: { i18n: contentI18n },
  footer: {
    about: footerAbout,
    copyright: footerCopyright,
    contact: { email, tel, address },
    navigation: { content: navContent, links: navLinks },
  },
} = useAppConfig() as any

const { locale, defaultLocale } = useI18n()

const about = tntTranslate('footer.about', footerAbout)
const copyright = tntTranslate('footer.copyright', footerCopyright)

// @i18n

const { /* color = 'neutral', */ variant = undefined } = defineProps<{
  // color?: 'neutral' | 'primary'
  variant?: 'bordered' | 'solid' | 'ghost'
  // TODO: Size - it would be nice to allow larger text; given that this
  //       ought to be a fixed/sticky element though, we must give consideration
  //       to the space occupied when positioning other content.
  collection?: keyof PageCollections
}>()

// NOTE: useAsyncData removed
const navItems = await tntNav(navContent ? navContent : navLinks, undefined, { shallow: true , locale: contentI18n ? (locale.value === defaultLocale ? true : locale.value) : false })

const footer = computed(() => tv({
  base: 'w-full',
  variants: {
    variant: {
      bordered: 'bg-muted border-t border-accented',
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
div(:class="footer({ variant })")
  UContainer(
    class="flex \
          items-center \
          justify-between"
  )
    div(class="py-2 grow")
      div(v-if="about || navItems || tel || email || address" class="flex flex-wrap gap-4")

        div(v-if="about" class="flex-grow basis-full md:basis-1/3 lg:basis-1/4 xl:basis-1/5")
          span(class="text-xl font-semibold") About
          p(class="text-muted") {{ about }}

        div(v-if="navItems" class="flex-grow basis-full md:basis-1/3 lg:basis-1/4 xl:basis-1/5")
          span(class="text-xl font-semibold") Links
          UNavigationMenu(
            v-if="navItems"
            :items="navItems"
            :unmount-on-hide="false"
            orientation="vertical"
            variant="link"
            class="flex-1"
          )/

        div(v-if="tel || email || address" class="flex-grow basis-full md:basis-1/3 lg:basis-1/4 xl:basis-1/5")
          span(class="text-xl font-semibold") Contact
          dl
            template(v-if="tel")
              dt(class="font-bold") Tel
              dd
                a(:href="`tel:${tel}`" class="text-muted hover:text-default") {{ tel }}
            template(v-if="email")
              dt(class="font-bold") Email
              dd
                a(:href="`mailto:${email}`" class="text-muted hover:text-default") {{ email }}
            template(v-if="address")
              dt(class="font-bold") Address
              dd(class="text-muted") {{ address }}

      div(class="text-center")

        p(v-if="copyright" class="text-sm text-muted") {{ copyright }}

        p(v-if="backgroundPattern" class="text-sm text-muted")
          a(href="https://heropatterns.com/") Hero Patterns
          |
          | by Steve Schoger (
          a(href="https://creativecommons.org/licenses/by/4.0/") CC By 4.0
          | )
</template>
