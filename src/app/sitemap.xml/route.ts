import { NextResponse } from 'next/server'
import { getPayload } from 'payload'
import config from '@/payload.config'
import { locales } from '@/lib/i18n/config'

export async function GET() {
  const payload = await getPayload({ config })
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://sinteh.pro'

  try {
    const urls: string[] = []

    // Add homepage for each locale
    for (const locale of locales) {
      urls.push(`
        <url>
          <loc>${baseUrl}/${locale}</loc>
          <lastmod>${new Date().toISOString()}</lastmod>
          <changefreq>weekly</changefreq>
          <priority>1.0</priority>
        </url>`)
    }

    // Get all published pages for each locale
    for (const locale of locales) {
      try {
        const pages = await payload.find({
          collection: 'pages',
          where: {
            or: [{ status: { equals: 'published' } }, { _status: { equals: 'published' } }],
          },
          locale,
          fallbackLocale: false, // Don't include fallback content in sitemap
          limit: 1000,
          depth: 0,
        })

        for (const page of pages.docs) {
          if (page.slug !== 'home') {
            // Homepage already added above
            urls.push(`
              <url>
                <loc>${baseUrl}/${locale}/${page.slug}</loc>
                <lastmod>${new Date(page.updatedAt).toISOString()}</lastmod>
                <changefreq>weekly</changefreq>
                <priority>0.7</priority>
              </url>`)
          }
        }
      } catch (error) {
        console.error(`Error fetching pages for locale ${locale}:`, error)
      }
    }

    // Get all published blog posts for each locale
    for (const locale of locales) {
      try {
        const posts = await payload.find({
          collection: 'posts',
          where: {
            published: { equals: true }, // Only posts published in this locale
          },
          locale,
          fallbackLocale: false, // Don't include fallback content in sitemap
          limit: 1000,
          depth: 0,
        })

        for (const post of posts.docs) {
          urls.push(`
            <url>
              <loc>${baseUrl}/${locale}/blog/${post.slug}</loc>
              <lastmod>${new Date(post.updatedAt).toISOString()}</lastmod>
              <changefreq>weekly</changefreq>
              <priority>0.6</priority>
            </url>`)
        }

        // Add blog listing page for each locale
        urls.push(`
          <url>
            <loc>${baseUrl}/${locale}/blog</loc>
            <lastmod>${new Date().toISOString()}</lastmod>
            <changefreq>daily</changefreq>
            <priority>0.8</priority>
          </url>`)
      } catch (error) {
        console.error(`Error fetching posts for locale ${locale}:`, error)
      }
    }

    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${urls.join('')}
</urlset>`

    return new NextResponse(sitemap, {
      headers: {
        'Content-Type': 'application/xml',
        'Cache-Control': 'public, max-age=3600, s-maxage=3600', // Cache for 1 hour
      },
    })
  } catch (error) {
    console.error('Error generating sitemap:', error)

    // Return a minimal sitemap on error
    const fallbackSitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${locales
    .map(
      (locale) => `
    <url>
      <loc>${baseUrl}/${locale}</loc>
      <lastmod>${new Date().toISOString()}</lastmod>
      <changefreq>weekly</changefreq>
      <priority>1.0</priority>
    </url>`,
    )
    .join('')}
</urlset>`

    return new NextResponse(fallbackSitemap, {
      headers: {
        'Content-Type': 'application/xml',
        'Cache-Control': 'public, max-age=300, s-maxage=300', // Cache for 5 minutes on error
      },
    })
  }
}
