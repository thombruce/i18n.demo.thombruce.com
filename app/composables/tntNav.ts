import type { ContentNavigationItem, PageCollections } from "@nuxt/content"
import type { NavigationMenuItem } from "@nuxt/ui"

// @i18n
// TODO: Should list pages for only one locale...
//       Current state shows locale_code/ and any locale_code/collection as
//       separate items. We need a way to exclude all i18n routes when not
//       relevant, and include only them when in that locale.
// TODO: Should still show pages for multiple collections (this is broken).

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

export const queryNav = async (collection?: keyof PageCollections, opts?: { shallow?: boolean }) => {
  const nav = []

  if (collection) {
    const collectionNav = await queryCollectionNavigation(collection, ['icon', 'description'])
    nav.push(...mapContentNavToUI(collectionNav, { shallow: opts?.shallow }))
  } else for (const coll of useRuntimeConfig().public.collections as (keyof PageCollections)[]) {
    const collectionNav = await queryCollectionNavigation(coll, ['icon', 'description'])
    nav.push(...mapContentNavToUI(collectionNav, { shallow: opts?.shallow }))
  }

  return nav.sort((a, b) => {
    const aSort = (a as { sort: string }).sort
    const bSort = (b as { sort: string }).sort
    return aSort < bSort ? -1 : aSort > bSort ? 1 : 0
  })
}

export const tntNav = async (nav: NavigationMenuItem[] | boolean, collection?: keyof PageCollections, opts?: { shallow?: boolean }) => {
  let navItems: NavigationMenuItem[]

  if (typeof nav === "boolean" && nav === true) {
    const data = await queryNav(collection, opts)

    navItems = data
  } else {
    navItems = nav || []
  }

  return navItems
}
