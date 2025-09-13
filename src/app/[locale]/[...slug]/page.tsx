import { notFound } from 'next/navigation'
import { getPayload } from 'payload'
import config from '@/payload.config'
import { PageTemplate } from '@/components/PageTemplate'
import type { Locale } from '@/lib/i18n/config'
import { isValidLocale, getAlternateUrls } from '@/lib/i18n/config'

interface LocalePageProps {
  params: Promise<{
    locale: string
    slug: string[]
  }>
}

export default async function LocalePage({ params }: LocalePageProps) {
  const resolvedParams = await params
  const { locale, slug: slugArray } = resolvedParams
  const slug = slugArray?.[0] || 'home'

  // Validate locale
  if (!isValidLocale(locale)) {
    return notFound()
  }

  // Skip static assets to prevent unnecessary database queries
  if (slug.includes('.')) {
    return notFound()
  }

  const payload = await getPayload({ config })

  try {
    const pages = await payload.find({
      collection: 'pages',
      where: {
        slug: {
          equals: slug,
        },
        or: [
          {
            status: {
              equals: 'published',
            },
          },
          {
            _status: {
              equals: 'published',
            },
          },
        ],
      },
      locale,
      fallbackLocale: 'en', // Allow fallback for pages
      limit: 1,
    })

    if (!pages.docs.length) {
      return notFound()
    }

    const page = pages.docs[0]

    return <PageTemplate page={page} locale={locale} />
  } catch (error) {
    console.error('Error fetching page:', error)
    return notFound()
  }
}

// Generate metadata for SEO
export async function generateMetadata({ params }: LocalePageProps) {
  const resolvedParams = await params
  const { locale, slug: slugArray } = resolvedParams
  const slug = slugArray?.[0] || 'home'

  // Validate locale
  if (!isValidLocale(locale)) {
    return {
      title: 'Invalid Locale',
    }
  }

  // Skip static assets
  if (slug.includes('.')) {
    return {
      title: 'Not Found',
    }
  }

  const payload = await getPayload({ config })

  try {
    const pages = await payload.find({
      collection: 'pages',
      where: {
        slug: {
          equals: slug,
        },
        or: [
          {
            status: {
              equals: 'published',
            },
          },
          {
            _status: {
              equals: 'published',
            },
          },
        ],
      },
      locale,
      fallbackLocale: 'en', // Allow fallback for pages
      limit: 1,
    })

    if (!pages.docs.length) {
      return {
        title: 'Page Not Found',
      }
    }

    const page = pages.docs[0]
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://sinteh.pro'
    const currentPath = `/${locale}/${slug === 'home' ? '' : slug}`

    // Generate hreflang alternates
    const alternates = getAlternateUrls(currentPath, baseUrl)

    return {
      title: page.meta?.title || page.title,
      description: page.meta?.description || '',
      alternates: {
        canonical: `${baseUrl}${currentPath}`,
        languages: alternates,
      },
      other: {
        'content-language': locale,
      },
    }
  } catch (error) {
    console.error('Error generating metadata:', error)
    return {
      title: 'Error',
    }
  }
}
