import React from 'react'
import { Geist, Geist_Mono } from 'next/font/google'
import { getPayload } from 'payload'
import config from '@/payload.config'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import type { SEO as SEOType, Media } from '@/payload-types'
import './styles.css'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export async function generateMetadata() {
  let seoData: SEOType | null = null

  try {
    const payload = await getPayload({ config })
    seoData = (await payload.findGlobal({
      slug: 'seo',
      depth: 2,
    })) as SEOType
  } catch (error) {
    console.error('Error fetching SEO data:', error)
  }

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
    return fallbackMetadata
  }

  // Build metadata from SEO global
  const metadata: any = {
    title: seoData.siteName || fallbackMetadata.title,
    description: seoData.siteDescription || fallbackMetadata.description,
    metadataBase: new URL(seoData.siteUrl || 'https://sinteh.pro'),
    keywords: seoData.keywords || undefined,
    authors: seoData.author ? [{ name: seoData.author }] : undefined,
  }

  // Add favicon if configured
  if (seoData.favicon && typeof seoData.favicon === 'object' && (seoData.favicon as Media).url) {
    metadata.icons = {
      icon: (seoData.favicon as Media).url,
      shortcut: (seoData.favicon as Media).url,
      apple: (seoData.favicon as Media).url,
    }
  }

  // Add Open Graph data
  metadata.openGraph = {
    title: seoData.siteName || fallbackMetadata.title,
    description: seoData.siteDescription || fallbackMetadata.description,
    type: 'website',
    siteName: seoData.siteName,
  }

  // Add default image if configured
  if (
    seoData.defaultImage &&
    typeof seoData.defaultImage === 'object' &&
    (seoData.defaultImage as Media).url
  ) {
    metadata.openGraph.images = [
      {
        url: (seoData.defaultImage as Media).url,
        alt: (seoData.defaultImage as Media).alt || seoData.siteName,
      },
    ]
  }

  // Add Twitter data
  metadata.twitter = {
    card: 'summary_large_image',
    title: seoData.siteName || fallbackMetadata.title,
    description: seoData.siteDescription || fallbackMetadata.description,
    creator: seoData.twitterHandle ? `@${seoData.twitterHandle}` : undefined,
  }

  if (
    seoData.defaultImage &&
    typeof seoData.defaultImage === 'object' &&
    (seoData.defaultImage as Media).url
  ) {
    metadata.twitter.images = [(seoData.defaultImage as Media).url]
  }

  return metadata
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="sl">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background`}>
        <Navigation />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}
