import type { ContentNavigationItem, PageCollections } from '@nuxt/content'
import type { BreadcrumbItem } from '@nuxt/ui'

import _startCase from 'lodash/startCase'

// @i18n

export const tntCrumbs = async (path: string, collection: keyof PageCollections, opts?: { locale?: string | boolean}) => {
  const params = path.split('/').filter(item => item).filter(item => item !== opts?.locale)

  let home: ContentNavigationItem | undefined
  if (opts?.locale && typeof opts?.locale === 'string') {
    home =
      await queryCollectionNavigation(`${opts.locale}_pages`, ['icon'])
        .where('path', '=', `/${opts.locale}`)
        .then(n => n[0])
  } else {
    home =
      await queryCollectionNavigation('pages', ['icon'])
        .where('path', '=', '/')
        .then(n => n[0])
  }

  const navItems: BreadcrumbItem[] = home
    ? [{ label: home.title, icon: home.icon as string | undefined, to: home.path }]
    : [{ label: 'Home', icon: 'lucide:house', to: '/' }]

  let navigation: ContentNavigationItem[] = await queryCollectionNavigation(collection, ['icon'])

  // NOTE: This seems kind of hacky and maybe we can refactor breadcrumbs to avoid specifically doing this
  //       but... because locale routes are in subdir spaces, the collection actually considers that subdir
  //       the root and we need to step into it in order to begin. This is in contrast to the true index,
  //       which is not considered a directory with children...
  //       In fact, this information may help us fix tntNav as well, I think?
  if (opts?.locale && typeof opts?.locale === 'string') navigation = navigation[0]?.children || []

  let param = typeof opts?.locale === 'string' ? `/${opts.locale}` : ''

  params.forEach((p) => {
    param = `${param}/${p}`

    const item = navigation.find(item => item.path === param)

    if (item) {
      navItems.push({
        label: item.title,
        icon: item.icon as string | undefined,
        to: item.path,
      })
    } else {
      navItems.push({
        label: _startCase(p),
        to: param,
      })
    }

    if (item?.children) {
      navigation = item.children
    }
  })

  return navItems
}
