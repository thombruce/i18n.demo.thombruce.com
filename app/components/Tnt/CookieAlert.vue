<script setup lang="ts">
// TODO: Decouple from gaID and check too for i18n usage
const { public: { googleAnalytics: { id: gaID } } } = useRuntimeConfig()

const consented = useCookie<boolean>('cookieConsent', { maxAge: 60 * 60 * 24 * 365 })
const rejected = useCookie<boolean>('cookieReject', { maxAge: 60 * 60 * 24 * 30 })

const open = ref(true)

/* Actions */
const acceptAll = () => { consented.value = true }
const rejectAll = () => { rejected.value = true }
const close = () => { open.value = false }
</script>

<template lang="pug">
div(v-if="gaID && !consented && !rejected && open" class="z-50 fixed bottom-5 w-screen px-2 md:px-12")
  UAlert(
    title="Heads up!"
    description='This site uses cookies to enhance your browsing experience and analyse traffic. By clicking "Accept", you consent to our use of cookies.'
    color="neutral"
    variant="solid"
    close
    @update:open="close()"
    :actions="[ \
      { \
        label: 'Accept', \
        icon: 'lucide:cookie', \
        color: 'success', \
        onClick: acceptAll \
      }, \
      { \
        label: 'Reject', \
        icon: 'lucide:ban', \
        color: 'error', \
        onClick: rejectAll, \
      }, \
      { \
        label: 'Cookie Policy', \
        icon: 'lucide:info', \
        color: 'info', \
        variant: 'outline', \
        to: '/cookie-policy', \
      }, \
    ]"
  )/
</template>
