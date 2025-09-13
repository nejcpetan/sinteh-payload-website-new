import { Suspense } from 'react'
import { notFound } from 'next/navigation'
import { getPayload } from 'payload'
import config from '@/payload.config'
import type { Locale } from '@/lib/i18n/config'
import { isValidLocale, getAlternateUrls } from '@/lib/i18n/config'

interface LocaleBlogPageProps {
  params: Promise<{
    locale: string
  }>
  searchParams: Promise<{
    category?: string
    page?: string
  }>
}

// Blog content component
async function BlogContent({
  locale,
  searchParams,
}: {
  locale: Locale
  searchParams: { category?: string; page?: string }
}) {
  const payload = await getPayload({ config })
  const page = parseInt(searchParams.page || '1')
  const limit = 12
  const offset = (page - 1) * limit

  try {
    // Build query conditions
    const whereConditions: any = {
      published: { equals: true }, // Only show posts published in current locale
    }

    // Add category filter if specified
    if (searchParams.category) {
      whereConditions.categories = {
        in: [searchParams.category],
      }
    }

    // Fetch posts for current locale only (no fallback for blog)
    const posts = await payload.find({
      collection: 'posts',
      where: whereConditions,
      locale,
      fallbackLocale: false, // No fallback for blog posts
      limit,
      skip: offset,
      sort: '-publishedAt',
      depth: 2,
    })

    // Fetch categories for filtering
    const categories = await payload.find({
      collection: 'categories',
      locale,
      fallbackLocale: 'en', // Allow fallback for categories
      limit: 100,
      sort: 'name',
    })

    return (
      <div className="w-full bg-background">
        <div className="mx-auto max-w-7xl px-4 md:px-6 py-8 md:py-12 lg:py-16">
          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">Blog</h1>
            <p className="text-lg text-muted-foreground">
              {locale === 'sl' &&
                'Najnovejše novice in vpogledi iz sveta industrijske avtomatizacije'}
              {locale === 'en' && 'Latest news and insights from industrial automation'}
              {locale === 'de' && 'Neueste Nachrichten und Einblicke aus der Industrieautomation'}
              {locale === 'hr' &&
                'Najnovije vijesti i uvidi iz svijeta industrijske automatizacije'}
            </p>
          </div>

          {/* Categories Filter */}
          {categories.docs.length > 0 && (
            <div className="mb-8">
              <div className="flex flex-wrap gap-2">
                <a
                  href={`/${locale}/blog`}
                  className={`px-4 py-2 rounded-full text-sm transition-colors ${
                    !searchParams.category
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted hover:bg-muted/80'
                  }`}
                >
                  {locale === 'sl' && 'Vse'}
                  {locale === 'en' && 'All'}
                  {locale === 'de' && 'Alle'}
                  {locale === 'hr' && 'Sve'}
                </a>
                {categories.docs.map((category) => (
                  <a
                    key={category.id}
                    href={`/${locale}/blog?category=${category.id}`}
                    className={`px-4 py-2 rounded-full text-sm transition-colors ${
                      searchParams.category === category.id
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-muted hover:bg-muted/80'
                    }`}
                  >
                    {category.name}
                  </a>
                ))}
              </div>
            </div>
          )}

          {/* Posts Grid */}
          {posts.docs.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {posts.docs.map((post) => (
                <article
                  key={post.id}
                  className="bg-card rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow"
                >
                  {post.featuredImage && typeof post.featuredImage === 'object' && (
                    <div className="aspect-video bg-muted">
                      <img
                        src={post.featuredImage.url}
                        alt={post.featuredImage.alt || post.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                  <div className="p-6">
                    <h2 className="text-xl font-semibold mb-2 line-clamp-2">
                      <a
                        href={`/${locale}/blog/${post.slug}`}
                        className="hover:text-primary transition-colors"
                      >
                        {post.title}
                      </a>
                    </h2>
                    {post.excerpt && (
                      <p className="text-muted-foreground mb-4 line-clamp-3">{post.excerpt}</p>
                    )}
                    <div className="flex items-center justify-between text-sm text-muted-foreground">
                      <time dateTime={post.publishedAt}>
                        {new Date(post.publishedAt).toLocaleDateString(locale)}
                      </time>
                      {post.readingTime && (
                        <span>
                          {post.readingTime} min{' '}
                          {locale === 'sl'
                            ? 'branja'
                            : locale === 'en'
                              ? 'read'
                              : locale === 'de'
                                ? 'Lesezeit'
                                : 'čitanja'}
                        </span>
                      )}
                    </div>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-lg text-muted-foreground">
                {locale === 'sl' && 'Ni objavljenih prispevkov v tem jeziku.'}
                {locale === 'en' && 'No published posts in this language.'}
                {locale === 'de' && 'Keine veröffentlichten Beiträge in dieser Sprache.'}
                {locale === 'hr' && 'Nema objavljenih postova na ovom jeziku.'}
              </p>
            </div>
          )}

          {/* Pagination */}
          {posts.totalPages > 1 && (
            <div className="flex justify-center gap-2">
              {Array.from({ length: posts.totalPages }, (_, i) => i + 1).map((pageNum) => (
                <a
                  key={pageNum}
                  href={`/${locale}/blog?${new URLSearchParams({
                    ...(searchParams.category && { category: searchParams.category }),
                    page: pageNum.toString(),
                  })}`}
                  className={`px-4 py-2 rounded-md text-sm transition-colors ${
                    pageNum === page
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted hover:bg-muted/80'
                  }`}
                >
                  {pageNum}
                </a>
              ))}
            </div>
          )}
        </div>
      </div>
    )
  } catch (error) {
    console.error('Error fetching blog posts:', error)
    return (
      <div className="w-full bg-background">
        <div className="mx-auto max-w-7xl px-4 md:px-6 py-8 md:py-12 lg:py-16">
          <div className="text-center">
            <h1 className="text-3xl font-bold mb-4">Blog</h1>
            <p className="text-muted-foreground">
              {locale === 'sl' && 'Prišlo je do napake pri nalaganju prispevkov.'}
              {locale === 'en' && 'An error occurred while loading posts.'}
              {locale === 'de' && 'Beim Laden der Beiträge ist ein Fehler aufgetreten.'}
              {locale === 'hr' && 'Došlo je do greške pri učitavanju postova.'}
            </p>
          </div>
        </div>
      </div>
    )
  }
}

export default async function LocaleBlogPage({ params, searchParams }: LocaleBlogPageProps) {
  const resolvedParams = await params
  const resolvedSearchParams = await searchParams
  const { locale } = resolvedParams

  // Validate locale
  if (!isValidLocale(locale)) {
    return notFound()
  }

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <BlogContent locale={locale} searchParams={resolvedSearchParams} />
    </Suspense>
  )
}

// Generate metadata for SEO
export async function generateMetadata({ params }: LocaleBlogPageProps) {
  const resolvedParams = await params
  const { locale } = resolvedParams

  // Validate locale
  if (!isValidLocale(locale)) {
    return {
      title: 'Invalid Locale',
    }
  }

  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://sinteh.pro'
  const currentPath = `/${locale}/blog`

  // Generate hreflang alternates
  const alternates = getAlternateUrls(currentPath, baseUrl)

  const titles = {
    sl: 'Blog - SINTEH PRO',
    en: 'Blog - SINTEH PRO',
    de: 'Blog - SINTEH PRO',
    hr: 'Blog - SINTEH PRO',
  }

  const descriptions = {
    sl: 'Najnovejše novice in vpogledi iz sveta industrijske avtomatizacije',
    en: 'Latest news and insights from industrial automation',
    de: 'Neueste Nachrichten und Einblicke aus der Industrieautomation',
    hr: 'Najnovije vijesti i uvidi iz svijeta industrijske automatizacije',
  }

  return {
    title: titles[locale],
    description: descriptions[locale],
    alternates: {
      canonical: `${baseUrl}${currentPath}`,
      languages: alternates,
    },
    other: {
      'content-language': locale,
    },
  }
}
