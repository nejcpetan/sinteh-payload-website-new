import { notFound } from 'next/navigation'
import { getPayload } from 'payload'
import config from '@/payload.config'
import { PageTemplate } from '@/components/PageTemplate'
import type { Homepage } from '@/payload-types'
import type { Locale } from '@/lib/i18n/config'
import { isValidLocale, getAlternateUrls } from '@/lib/i18n/config'

interface LocaleHomePageProps {
  params: Promise<{
    locale: string
  }>
}

export const revalidate = false // Use on-demand revalidation only

export default async function LocaleHomePage({ params }: LocaleHomePageProps) {
  const resolvedParams = await params
  const { locale } = resolvedParams

  // Validate locale
  if (!isValidLocale(locale)) {
    return notFound()
  }

  const payload = await getPayload({ config })

  try {
    // Fetch homepage global with locale
    const homepage = (await payload.findGlobal({
      slug: 'homepage',
      locale,
      fallbackLocale: 'en', // Allow fallback for homepage
      depth: 2, // Include relationships for blocks
    })) as Homepage

    return <PageTemplate page={homepage} locale={locale} />
  } catch (error) {
    console.error('Error fetching homepage:', error)
    return notFound()
  }
}

// Generate metadata for SEO
export async function generateMetadata({ params }: LocaleHomePageProps) {
  const resolvedParams = await params
  const { locale } = resolvedParams

  // Validate locale
  if (!isValidLocale(locale)) {
    return {
      title: 'Invalid Locale',
    }
  }

  const payload = await getPayload({ config })

  try {
    const homepage = (await payload.findGlobal({
      slug: 'homepage',
      locale,
      fallbackLocale: 'en',
      depth: 2,
    })) as Homepage

    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://sinteh.pro'
    const currentPath = `/${locale}`

    // Generate hreflang alternates
    const alternates = getAlternateUrls(currentPath, baseUrl)

    // Extract title from homepage layout blocks if available
    let pageTitle = 'SINTEH PRO'
    if (homepage.layout && Array.isArray(homepage.layout)) {
      const heroBlock = homepage.layout.find((block: any) => block.blockType === 'hero')
      if (heroBlock && heroBlock.title) {
        pageTitle = heroBlock.title
      }
    }

    return {
      title: pageTitle,
      description: 'Industrijska avtomatizacija na ključ. Hitri zagoni in predvidljivo delovanje.',
      alternates: {
        canonical: `${baseUrl}${currentPath}`,
        languages: alternates,
      },
      other: {
        'content-language': locale,
      },
    }
  } catch (error) {
    console.error('Error generating homepage metadata:', error)
    return {
      title: 'SINTEH PRO',
      description: 'Industrijska avtomatizacija na ključ',
      other: {
        'content-language': locale,
      },
    }
  }
}
