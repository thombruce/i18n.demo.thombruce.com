import type { ContentNavigationItem, PageCollections } from '@nuxt/content'
import type { BreadcrumbItem } from '@nuxt/ui'

import _startCase from 'lodash/startCase'

// @i18n

// TODO: Should treat locale index as homepage when i18n mode in use.

export const tntCrumbs = async (path: string, collection: keyof PageCollections) => {
  const params = path.split('/').filter(item => item)

  // TODO: Depends on a known default collection like pages.
  //       We may want to import defaultLocale here to handle this
  const home: ContentNavigationItem | undefined = undefined
  // await queryCollectionNavigation('pages', ['icon'])
  //   .where('path', '=', '/')
  //   .then(n => n[0])

  const navItems: BreadcrumbItem[] = home
    ? [] // [{ label: home.title, icon: home.icon as string | undefined, to: home.path }]
    : [{ label: 'Home', icon: 'lucide:house', to: '/' }]

  let navigation: ContentNavigationItem[] = await queryCollectionNavigation(collection, ['icon'])

  let param = ''

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
