import { Suspense } from 'react'
import { notFound } from 'next/navigation'
import { getPayload } from 'payload'
import config from '@/payload.config'
import { RichTextRenderer } from '@/components/RichTextRenderer'
import { SocialShare } from '@/components/SocialShare'
import type { Locale } from '@/lib/i18n/config'
import { isValidLocale, getAlternateUrls } from '@/lib/i18n/config'

interface LocaleBlogPostPageProps {
  params: Promise<{
    locale: string
    slug: string
  }>
}

// Blog post content component
async function BlogPostContent({ locale, slug }: { locale: Locale; slug: string }) {
  const payload = await getPayload({ config })

  try {
    // Fetch post for current locale only (no fallback for blog)
    const posts = await payload.find({
      collection: 'posts',
      where: {
        slug: { equals: slug },
        published: { equals: true }, // Only show if published in current locale
      },
      locale,
      fallbackLocale: false, // No fallback for blog posts
      limit: 1,
      depth: 2,
    })

    if (!posts.docs.length) {
      return notFound()
    }

    const post = posts.docs[0]

    // Fetch related posts
    const relatedPosts = await payload.find({
      collection: 'posts',
      where: {
        slug: { not_equals: slug },
        published: { equals: true },
        categories: {
          in: Array.isArray(post.categories)
            ? post.categories.map((cat: any) => (typeof cat === 'object' ? cat.id : cat))
            : [],
        },
      },
      locale,
      fallbackLocale: false,
      limit: 3,
      sort: '-publishedAt',
    })

    return (
      <div className="w-full bg-background">
        <div className="mx-auto max-w-4xl px-4 md:px-6 py-8 md:py-12 lg:py-16">
          {/* Breadcrumb */}
          <nav className="mb-8 text-sm text-muted-foreground">
            <a href={`/${locale}`} className="hover:text-foreground transition-colors">
              {locale === 'sl' && 'Domov'}
              {locale === 'en' && 'Home'}
              {locale === 'de' && 'Startseite'}
              {locale === 'hr' && 'Početna'}
            </a>
            <span className="mx-2">/</span>
            <a href={`/${locale}/blog`} className="hover:text-foreground transition-colors">
              Blog
            </a>
            <span className="mx-2">/</span>
            <span className="text-foreground">{post.title}</span>
          </nav>

          {/* Article Header */}
          <header className="mb-8">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 leading-tight">
              {post.title}
            </h1>

            {post.excerpt && (
              <p className="text-lg md:text-xl text-muted-foreground mb-6 leading-relaxed">
                {post.excerpt}
              </p>
            )}

            <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-6">
              <time dateTime={post.publishedAt}>
                {new Date(post.publishedAt).toLocaleDateString(locale, {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </time>

              {post.readingTime && (
                <span>
                  {post.readingTime}{' '}
                  {locale === 'sl'
                    ? 'min branja'
                    : locale === 'en'
                      ? 'min read'
                      : locale === 'de'
                        ? 'Min. Lesezeit'
                        : 'min čitanja'}
                </span>
              )}

              {post.categories && Array.isArray(post.categories) && post.categories.length > 0 && (
                <div className="flex gap-2">
                  {post.categories.map((category: any) => (
                    <a
                      key={typeof category === 'object' ? category.id : category}
                      href={`/${locale}/blog?category=${typeof category === 'object' ? category.id : category}`}
                      className="px-3 py-1 bg-muted rounded-full text-xs hover:bg-muted/80 transition-colors"
                    >
                      {typeof category === 'object' ? category.name : category}
                    </a>
                  ))}
                </div>
              )}
            </div>

            {/* Featured Image */}
            {post.featuredImage && typeof post.featuredImage === 'object' && (
              <div className="mb-8 rounded-lg overflow-hidden">
                <img
                  src={post.featuredImage.url}
                  alt={post.featuredImage.alt || post.title}
                  className="w-full h-auto"
                />
              </div>
            )}
          </header>

          {/* Article Content */}
          <article className="prose prose-lg max-w-none mb-12">
            <RichTextRenderer content={post.content} />
          </article>

          {/* Social Share */}
          <div className="mb-12">
            <SocialShare
              title={post.title}
              url={`${process.env.NEXT_PUBLIC_SITE_URL}/${locale}/blog/${post.slug}`}
            />
          </div>

          {/* Related Posts */}
          {relatedPosts.docs.length > 0 && (
            <section className="border-t pt-12">
              <h2 className="text-2xl font-bold mb-6">
                {locale === 'sl' && 'Povezani prispevki'}
                {locale === 'en' && 'Related Posts'}
                {locale === 'de' && 'Verwandte Beiträge'}
                {locale === 'hr' && 'Povezani postovi'}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {relatedPosts.docs.map((relatedPost) => (
                  <article
                    key={relatedPost.id}
                    className="bg-card rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow"
                  >
                    {relatedPost.featuredImage && typeof relatedPost.featuredImage === 'object' && (
                      <div className="aspect-video bg-muted">
                        <img
                          src={relatedPost.featuredImage.url}
                          alt={relatedPost.featuredImage.alt || relatedPost.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}
                    <div className="p-4">
                      <h3 className="font-semibold mb-2 line-clamp-2">
                        <a
                          href={`/${locale}/blog/${relatedPost.slug}`}
                          className="hover:text-primary transition-colors"
                        >
                          {relatedPost.title}
                        </a>
                      </h3>
                      {relatedPost.excerpt && (
                        <p className="text-sm text-muted-foreground line-clamp-2">
                          {relatedPost.excerpt}
                        </p>
                      )}
                    </div>
                  </article>
                ))}
              </div>
            </section>
          )}
        </div>
      </div>
    )
  } catch (error) {
    console.error('Error fetching blog post:', error)
    return notFound()
  }
}

export default async function LocaleBlogPostPage({ params }: LocaleBlogPostPageProps) {
  const resolvedParams = await params
  const { locale, slug } = resolvedParams

  // Validate locale
  if (!isValidLocale(locale)) {
    return notFound()
  }

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <BlogPostContent locale={locale} slug={slug} />
    </Suspense>
  )
}

// Generate metadata for SEO
export async function generateMetadata({ params }: LocaleBlogPostPageProps) {
  const resolvedParams = await params
  const { locale, slug } = resolvedParams

  // Validate locale
  if (!isValidLocale(locale)) {
    return {
      title: 'Invalid Locale',
    }
  }

  const payload = await getPayload({ config })

  try {
    const posts = await payload.find({
      collection: 'posts',
      where: {
        slug: { equals: slug },
        published: { equals: true },
      },
      locale,
      fallbackLocale: false, // No fallback for blog posts
      limit: 1,
    })

    if (!posts.docs.length) {
      return {
        title: 'Post Not Found',
      }
    }

    const post = posts.docs[0]
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://sinteh.pro'
    const currentPath = `/${locale}/blog/${slug}`

    // Generate hreflang alternates
    const alternates = getAlternateUrls(currentPath, baseUrl)

    const metadata: any = {
      title: post.meta?.title || post.title,
      description: post.meta?.description || post.excerpt || '',
      alternates: {
        canonical: `${baseUrl}${currentPath}`,
        languages: alternates,
      },
      other: {
        'content-language': locale,
      },
    }

    // Add featured image for social sharing
    if (post.featuredImage && typeof post.featuredImage === 'object') {
      metadata.openGraph = {
        title: post.title,
        description: post.excerpt || '',
        type: 'article',
        publishedTime: post.publishedAt,
        images: [
          {
            url: post.featuredImage.url,
            width: post.featuredImage.width || 1200,
            height: post.featuredImage.height || 630,
            alt: post.featuredImage.alt || post.title,
          },
        ],
      }

      metadata.twitter = {
        card: 'summary_large_image',
        title: post.title,
        description: post.excerpt || '',
        images: [post.featuredImage.url],
      }
    }

    return metadata
  } catch (error) {
    console.error('Error generating blog post metadata:', error)
    return {
      title: 'Error',
      other: {
        'content-language': locale,
      },
    }
  }
}
