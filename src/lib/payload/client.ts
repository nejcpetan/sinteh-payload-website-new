import { getPayload } from 'payload'
import config from '@/payload.config'
import type { Locale } from '@/lib/i18n/config'
import { fallbackLocale } from '@/lib/i18n/config'

export interface PayloadClientOptions {
  locale: Locale
  fallback?: boolean
  depth?: number
}

/**
 * Get a page by slug with locale support
 */
export async function getPage(slug: string, options: PayloadClientOptions) {
  const payload = await getPayload({ config })

  try {
    const pages = await payload.find({
      collection: 'pages',
      where: {
        slug: { equals: slug },
        or: [{ status: { equals: 'published' } }, { _status: { equals: 'published' } }],
      },
      locale: options.locale,
      fallbackLocale: options.fallback !== false ? fallbackLocale : false,
      depth: options.depth || 2,
      limit: 1,
    })

    return pages.docs[0] || null
  } catch (error) {
    console.error('Error fetching page:', error)
    return null
  }
}

/**
 * Get posts with locale support and per-locale publishing
 */
export async function getPosts(
  options: PayloadClientOptions & {
    limit?: number
    skip?: number
    category?: string
    featured?: boolean
  },
) {
  const payload = await getPayload({ config })

  try {
    const whereConditions: any = {
      published: { equals: true }, // Only posts published in current locale
    }

    if (options.category) {
      whereConditions.categories = { in: [options.category] }
    }

    if (options.featured) {
      whereConditions.featured = { equals: true }
    }

    const posts = await payload.find({
      collection: 'posts',
      where: whereConditions,
      locale: options.locale,
      fallbackLocale: false, // Never fallback for blog posts
      depth: options.depth || 2,
      limit: options.limit || 10,
      skip: options.skip || 0,
      sort: '-publishedAt',
    })

    return posts
  } catch (error) {
    console.error('Error fetching posts:', error)
    return {
      docs: [],
      totalDocs: 0,
      totalPages: 0,
      page: 1,
      hasNextPage: false,
      hasPrevPage: false,
    }
  }
}

/**
 * Get a single post by slug with locale support
 */
export async function getPost(slug: string, options: PayloadClientOptions) {
  const payload = await getPayload({ config })

  try {
    const posts = await payload.find({
      collection: 'posts',
      where: {
        slug: { equals: slug },
        published: { equals: true }, // Only if published in current locale
      },
      locale: options.locale,
      fallbackLocale: false, // Never fallback for blog posts
      depth: options.depth || 2,
      limit: 1,
    })

    return posts.docs[0] || null
  } catch (error) {
    console.error('Error fetching post:', error)
    return null
  }
}

/**
 * Get categories with locale support
 */
export async function getCategories(options: PayloadClientOptions) {
  const payload = await getPayload({ config })

  try {
    const categories = await payload.find({
      collection: 'categories',
      locale: options.locale,
      fallbackLocale: options.fallback !== false ? fallbackLocale : false,
      depth: options.depth || 1,
      limit: 100,
      sort: 'name',
    })

    return categories.docs
  } catch (error) {
    console.error('Error fetching categories:', error)
    return []
  }
}

/**
 * Get header global with locale support
 */
export async function getHeader(options: PayloadClientOptions) {
  const payload = await getPayload({ config })

  try {
    const header = await payload.findGlobal({
      slug: 'header',
      locale: options.locale,
      fallbackLocale: options.fallback !== false ? fallbackLocale : false,
      depth: options.depth || 2,
    })

    return header
  } catch (error) {
    console.error('Error fetching header:', error)
    return null
  }
}

/**
 * Get footer global with locale support
 */
export async function getFooter(options: PayloadClientOptions) {
  const payload = await getPayload({ config })

  try {
    const footer = await payload.findGlobal({
      slug: 'footer',
      locale: options.locale,
      fallbackLocale: options.fallback !== false ? fallbackLocale : false,
      depth: options.depth || 2,
    })

    return footer
  } catch (error) {
    console.error('Error fetching footer:', error)
    return null
  }
}

/**
 * Get homepage global with locale support
 */
export async function getHomepage(options: PayloadClientOptions) {
  const payload = await getPayload({ config })

  try {
    const homepage = await payload.findGlobal({
      slug: 'homepage',
      locale: options.locale,
      fallbackLocale: options.fallback !== false ? fallbackLocale : false,
      depth: options.depth || 2,
    })

    return homepage
  } catch (error) {
    console.error('Error fetching homepage:', error)
    return null
  }
}

/**
 * Get SEO global with locale support
 */
export async function getSEO(options: PayloadClientOptions) {
  const payload = await getPayload({ config })

  try {
    const seo = await payload.findGlobal({
      slug: 'seo',
      locale: options.locale,
      fallbackLocale: options.fallback !== false ? fallbackLocale : false,
      depth: options.depth || 2,
    })

    return seo
  } catch (error) {
    console.error('Error fetching SEO:', error)
    return null
  }
}

/**
 * Search content across collections with locale support
 */
export async function searchContent(
  query: string,
  options: PayloadClientOptions & {
    collections?: ('pages' | 'posts')[]
    limit?: number
  },
) {
  const payload = await getPayload({ config })
  const collections = options.collections || ['pages', 'posts']
  const results: any[] = []

  try {
    // Search pages
    if (collections.includes('pages')) {
      const pages = await payload.find({
        collection: 'pages',
        where: {
          or: [
            { title: { contains: query } },
            // Note: Rich text search would need custom implementation
          ],
          and: [
            {
              or: [{ status: { equals: 'published' } }, { _status: { equals: 'published' } }],
            },
          ],
        },
        locale: options.locale,
        fallbackLocale: options.fallback !== false ? fallbackLocale : false,
        limit: options.limit || 5,
      })

      results.push(...pages.docs.map((doc) => ({ ...doc, type: 'page' })))
    }

    // Search posts
    if (collections.includes('posts')) {
      const posts = await payload.find({
        collection: 'posts',
        where: {
          or: [{ title: { contains: query } }, { excerpt: { contains: query } }],
          and: [{ published: { equals: true } }],
        },
        locale: options.locale,
        fallbackLocale: false, // Never fallback for blog posts
        limit: options.limit || 5,
      })

      results.push(...posts.docs.map((doc) => ({ ...doc, type: 'post' })))
    }

    return results
  } catch (error) {
    console.error('Error searching content:', error)
    return []
  }
}
