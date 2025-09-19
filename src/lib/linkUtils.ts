// Utility functions for handling links and CTAs with locale-aware routing
import type { Locale } from '@/lib/i18n/config'

export interface LinkData {
  type: 'page' | 'post' | 'url' | 'anchor' | 'blog' | 'category'
  page?: { slug: string }
  post?: { slug: string }
  category?: { slug: string }
  url?: string
  anchor?: string
}

export interface CTAData extends LinkData {
  text: string
  variant?: string
}

// Helper function to safely extract link data
export function getLinkData(link: any): LinkData | undefined {
  if (!link || typeof link !== 'object') return undefined

  return {
    type: link.type,
    page: link.page && typeof link.page === 'object' ? { slug: link.page.slug } : undefined,
    post: link.post && typeof link.post === 'object' ? { slug: link.post.slug } : undefined,
    category:
      link.category && typeof link.category === 'object' ? { slug: link.category.slug } : undefined,
    url: link.url || undefined,
    anchor: link.anchor || undefined,
  }
}

// Helper function to safely extract CTA data (includes text and variant)
export function getCTAData(cta: any): CTAData | undefined {
  if (!cta || typeof cta !== 'object') return undefined

  const linkData = getLinkData(cta)
  if (!linkData) return undefined

  return {
    ...linkData,
    text: cta.text || '',
    variant: cta.variant || 'default',
  }
}

// Helper function to generate locale-aware href from link data
export function getLinkHref(link: LinkData, locale?: Locale): string {
  const localePrefix = locale ? `/${locale}` : ''

  switch (link.type) {
    case 'page':
      if (!link.page?.slug) return '#'
      const pageSlug = link.page.slug === '/' || link.page.slug === 'home' ? '' : link.page.slug
      return `${localePrefix}/${pageSlug}`.replace(/\/+/g, '/').replace(/\/$/, '') || '/'
    case 'post':
      return link.post?.slug ? `${localePrefix}/blog/${link.post.slug}` : '#'
    case 'blog':
      return `${localePrefix}/blog`
    case 'category':
      return link.category?.slug ? `${localePrefix}/blog/category/${link.category.slug}` : '#'
    case 'url':
      return link.url || '#'
    case 'anchor':
      return link.anchor ? `#${link.anchor}` : '#'
    default:
      return '#'
  }
}

// Helper function to generate locale-aware href from navigation item
export function getNavigationHref(item: any, locale?: Locale): string {
  if (!item) return '#'

  const localePrefix = locale ? `/${locale}` : ''

  switch (item.type) {
    case 'page':
      if (!item.page || typeof item.page !== 'object' || !item.page.slug) return '#'
      const pageSlug = item.page.slug === '/' || item.page.slug === 'home' ? '' : item.page.slug
      return `${localePrefix}/${pageSlug}`.replace(/\/+/g, '/').replace(/\/$/, '') || '/'
    case 'post':
      if (!item.post || typeof item.post !== 'object' || !item.post.slug) return '#'
      return `${localePrefix}/blog/${item.post.slug}`
    case 'blog':
      return `${localePrefix}/blog`
    case 'category':
      if (!item.category || typeof item.category !== 'object' || !item.category.slug) return '#'
      return `${localePrefix}/blog/category/${item.category.slug}`
    case 'url':
      return item.url || '#'
    case 'anchor':
      return item.anchor || '#'
    default:
      return '#'
  }
}

// Legacy function for backward compatibility with existing button structure
export function getButtonData(button: any): CTAData | undefined {
  if (!button || typeof button !== 'object') return undefined

  return {
    text: button.text || button.label || '',
    type: button.type || 'page',
    page: button.page && typeof button.page === 'object' ? { slug: button.page.slug } : undefined,
    post: button.post && typeof button.post === 'object' ? { slug: button.post.slug } : undefined,
    category:
      button.category && typeof button.category === 'object'
        ? { slug: button.category.slug }
        : undefined,
    url: button.url || undefined,
    anchor: button.anchor || undefined,
    variant: button.variant || 'default',
  }
}
