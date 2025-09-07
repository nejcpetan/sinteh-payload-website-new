// Utility functions for handling links and CTAs with the new link structure

export interface LinkData {
  type: 'page' | 'post' | 'url' | 'anchor'
  page?: { slug: string }
  post?: { slug: string }
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

// Helper function to generate href from link data
export function getLinkHref(link: LinkData): string {
  switch (link.type) {
    case 'page':
      return link.page?.slug ? `/${link.page.slug}` : '#'
    case 'post':
      return link.post?.slug ? `/blog/${link.post.slug}` : '#'
    case 'url':
      return link.url || '#'
    case 'anchor':
      return link.anchor ? `#${link.anchor}` : '#'
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
    url: button.url || undefined,
    anchor: button.anchor || undefined,
    variant: button.variant || 'default',
  }
}

