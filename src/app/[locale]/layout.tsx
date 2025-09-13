import React from 'react'
import { Geist, Geist_Mono } from 'next/font/google'
import { getPayload } from 'payload'
import config from '@/payload.config'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import type { Seo as SEOType, Media } from '@/payload-types'
import type { Locale } from '@/lib/i18n/config'
import { isValidLocale, getLocaleConfig } from '@/lib/i18n/config'
import { notFound } from 'next/navigation'
import '../(frontend)/styles.css'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

interface LocaleLayoutProps {
  children: React.ReactNode
  params: Promise<{
    locale: string
  }>
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const resolvedParams = await params
  const { locale } = resolvedParams

  if (!isValidLocale(locale)) {
    return {
      title: 'Invalid Locale',
    }
  }

  let seoData: SEOType | null = null

  try {
    const payload = await getPayload({ config })
    seoData = (await payload.findGlobal({
      slug: 'seo',
      locale,
      depth: 2,
    })) as SEOType
  } catch (error) {
    console.error('Error fetching SEO data:', error)
  }

  const localeConfig = getLocaleConfig(locale)

  // Fallback metadata if SEO global is not configured
  const fallbackMetadata = {
    title: 'SINTEH PRO – Industrijska avtomatizacija na ključ',
    description:
      'Hitri zagoni in predvidljivo delovanje. Več kot 30 let izkušenj v industrijski avtomatizaciji, servis ABB in Schneider Electric, industrijska varnost.',
    metadataBase: new URL('https://sinteh.pro'),
    openGraph: {
      title: 'SINTEH PRO – Industrijska avtomatizacija na ključ',
      description:
        'Hitri zagoni in predvidljivo delovanje. Več kot 30 let izkušenj v industrijski avtomatizaciji.',
      type: 'website',
    },
  }

  if (!seoData) {
    return {
      ...fallbackMetadata,
      other: {
        'content-language': locale,
      },
    }
  }

  // Build metadata from SEO global
  const metadata: any = {
    title: seoData.siteName || fallbackMetadata.title,
    description: seoData.siteDescription || fallbackMetadata.description,
    metadataBase: new URL(seoData.siteUrl || 'https://sinteh.pro'),
    keywords: seoData.keywords || undefined,
    authors: seoData.author ? [{ name: seoData.author }] : undefined,
    other: {
      'content-language': locale,
    },
  }

  // Add favicon if configured
  if (seoData.favicon && typeof seoData.favicon === 'object' && seoData.favicon.url) {
    metadata.icons = {
      icon: seoData.favicon.url,
      shortcut: seoData.favicon.url,
      apple: seoData.favicon.url,
    }
  }

  // Add social media image if configured
  if (seoData.socialImage && typeof seoData.socialImage === 'object' && seoData.socialImage.url) {
    metadata.openGraph = {
      title: seoData.siteName || fallbackMetadata.title,
      description: seoData.siteDescription || fallbackMetadata.description,
      type: 'website',
      images: [
        {
          url: seoData.socialImage.url,
          width: seoData.socialImage.width || 1200,
          height: seoData.socialImage.height || 630,
          alt: seoData.socialImage.alt || seoData.siteName || 'SINTEH PRO',
        },
      ],
    }

    metadata.twitter = {
      card: 'summary_large_image',
      title: seoData.siteName || fallbackMetadata.title,
      description: seoData.siteDescription || fallbackMetadata.description,
      images: [seoData.socialImage.url],
    }
  }

  return metadata
}

export default async function LocaleLayout({ children, params }: LocaleLayoutProps) {
  const resolvedParams = await params
  const { locale } = resolvedParams

  // Validate locale
  if (!isValidLocale(locale)) {
    notFound()
  }

  const localeConfig = getLocaleConfig(locale)

  return (
    <html lang={locale} dir={localeConfig.dir}>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background`}>
        <Navigation locale={locale} />
        <main>{children}</main>
        <Footer locale={locale} />
      </body>
    </html>
  )
}
