import type { ContentNavigationItem, PageCollections } from "@nuxt/content"
import type { NavigationMenuItem } from "@nuxt/ui"

// @i18n

const mapContentNavToUI = (items: ContentNavigationItem[], opts?: { shallow?: boolean }): NavigationMenuItem[] => {
  return items.map(item => {
    return {
      label: item.title as string,
      description: item.description as string,
      icon: item.icon as string,
      to: item.path as string,
      children: !opts?.shallow && item.children && !item.hideChildren ? mapContentNavToUI(item.showIndex ? item.children : item.children.filter(c => c.path !== item.path)) : undefined,
      defaultOpen: true,
      sort: item.stem,
    }
  })
}

export const queryNav = async (collection?: keyof PageCollections, opts?: { shallow?: boolean, locale?: string | boolean }) => {
  const nav = []

  if (collection) {
    const collectionNav = await queryCollectionNavigation(collection, ['icon', 'description'])
    nav.push(...mapContentNavToUI(collectionNav, { shallow: opts?.shallow }))
  } else for (const coll of useRuntimeConfig().public.collections as (keyof PageCollections)[]) {
    let collectionNav
    if (opts?.locale && typeof opts?.locale === 'string') {
      // TODO: Better mapping of international routes
      collectionNav = await queryCollectionNavigation(coll, ['icon', 'description'])
        .where('path', 'LIKE', `/${opts.locale}%`)
    } else if (opts?.locale) {
      collectionNav = await queryCollectionNavigation(coll, ['icon', 'description'])
        .where('path', 'NOT LIKE', '/__')
        .where('path', 'NOT LIKE', '/__/%')
        .where('path', 'NOT LIKE', '/__-__')
        .where('path', 'NOT LIKE', '/__-__/%')
    } else {
      collectionNav = await queryCollectionNavigation(coll, ['icon', 'description'])
    }
    nav.push(...mapContentNavToUI(collectionNav, { shallow: opts?.shallow }))
  }

  return nav.sort((a, b) => {
    const aSort = (a as { sort: string }).sort
    const bSort = (b as { sort: string }).sort
    return aSort < bSort ? -1 : aSort > bSort ? 1 : 0
  })
}

export const tntNav = async (
  nav: NavigationMenuItem[] | boolean,
  collection?: keyof PageCollections,
  opts?: { shallow?: boolean, locale?: string | boolean }
) => {
  let navItems: NavigationMenuItem[]

  if (typeof nav === "boolean" && nav === true) {
    const data = await queryNav(collection, opts)

    navItems = data
  } else {
    navItems = nav || []
  }

  return navItems
}
