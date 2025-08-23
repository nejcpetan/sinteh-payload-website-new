import { notFound } from 'next/navigation'
import { getPayload } from 'payload'
import Link from 'next/link'
import Image from 'next/image'
import { Suspense } from 'react'
import { Calendar, Clock, User, ArrowLeft, Hash } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

import config from '@/payload.config'
import type { Post } from '@/payload-types'
import { RichText } from '@payloadcms/richtext-lexical/react'
import SocialShare from '@/components/SocialShare'

// Enable ISR - revalidate when manually triggered via API
export const revalidate = false // Use on-demand revalidation only

interface BlogPostPageProps {
  params: Promise<{
    slug: string
  }>
}

// Loading component for the post content
function PostContentLoading() {
  return (
    <div className="animate-pulse">
      <div className="h-8 bg-muted rounded mb-4 w-3/4"></div>
      <div className="h-4 bg-muted rounded mb-2"></div>
      <div className="h-4 bg-muted rounded mb-8 w-1/2"></div>
      <div className="h-64 bg-muted rounded mb-8"></div>
      <div className="space-y-4">
        <div className="h-4 bg-muted rounded"></div>
        <div className="h-4 bg-muted rounded"></div>
        <div className="h-4 bg-muted rounded w-3/4"></div>
      </div>
    </div>
  )
}

async function BlogPostContent({ slug }: { slug: string }) {
  const payload = await getPayload({ config })

  // Fetch the specific post
  const posts = await payload.find({
    collection: 'posts',
    where: {
      slug: { equals: slug },
      status: { equals: 'published' },
    },
    limit: 1,
  })

  if (!posts.docs.length) {
    return notFound()
  }

  const post = posts.docs[0]

  // Fetch related posts from the same categories
  let relatedPosts: { docs: Post[] } = { docs: [] }
  if (post.categories && Array.isArray(post.categories) && post.categories.length > 0) {
    const categoryIds = post.categories
      .filter((cat) => typeof cat === 'object' && cat !== null)
      .map((cat: any) => cat.id)

    if (categoryIds.length > 0) {
      relatedPosts = await payload.find({
        collection: 'posts',
        where: {
          and: [
            { status: { equals: 'published' } },
            { id: { not_equals: post.id } },
            {
              categories: {
                in: categoryIds,
              },
            },
          ],
        },
        limit: 3,
        sort: '-publishedAt',
      })
    }
  }

  return (
    <div>
      <article className="max-w-4xl mx-auto">
        {/* Post Header */}
        <header className="mb-8">
          {/* Categories */}
          {post.categories && Array.isArray(post.categories) && post.categories.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-4">
              {post.categories.map((category: any) => (
                <Badge
                  key={typeof category === 'object' ? category.id : category}
                  variant="secondary"
                  className="cursor-pointer"
                  asChild
                >
                  <Link
                    href={`/blog?category=${typeof category === 'object' ? category.slug : category}`}
                  >
                    {typeof category === 'object' ? category.name : category}
                  </Link>
                </Badge>
              ))}
            </div>
          )}

          {/* Title */}
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 leading-tight text-foreground">
            {post.title}
          </h1>

          {/* Excerpt */}
          {post.excerpt && (
            <p className="text-lg md:text-xl text-muted-foreground mb-6 leading-relaxed">
              {post.excerpt}
            </p>
          )}

          {/* Meta Information */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between text-muted-foreground mb-8 pb-8 border-b border-border">
            <div className="flex items-center space-x-4 mb-4 sm:mb-0">
              {post.author && typeof post.author === 'object' && (
                <div className="flex items-center space-x-1">
                  <User className="w-4 h-4" />
                  <span className="text-foreground font-medium">By {post.author.email}</span>
                </div>
              )}
              {post.publishedAt && (
                <div className="flex items-center space-x-1">
                  <Calendar className="w-4 h-4" />
                  <time dateTime={post.publishedAt}>
                    {new Date(post.publishedAt).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </time>
                </div>
              )}
            </div>
            {post.readingTime && (
              <div className="flex items-center space-x-1">
                <Clock className="w-4 h-4" />
                <span>{post.readingTime} min read</span>
              </div>
            )}
          </div>
        </header>

        {/* Featured Image */}
        {post.featuredImage && typeof post.featuredImage === 'object' && (
          <div className="relative aspect-video mb-8 overflow-hidden rounded-lg border border-border">
            <Image
              src={post.featuredImage.url || ''}
              alt={post.featuredImage.alt || post.title}
              fill
              className="object-cover"
              priority
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
            />
          </div>
        )}

        {/* Post Content */}
        <div className="prose prose-lg max-w-none mb-12">
          {post.content && <RichText data={post.content} />}
        </div>

        {/* Tags */}
        {post.tags && Array.isArray(post.tags) && post.tags.length > 0 && (
          <div className="mb-8 pt-8 border-t border-border">
            <h3 className="text-lg font-semibold mb-4 text-foreground">Tags</h3>
            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag: any, index: number) => (
                <Badge key={index} variant="outline" className="text-sm">
                  <Hash className="w-3 h-3 mr-1" />
                  {typeof tag === 'object' ? tag.name : tag}
                </Badge>
              ))}
            </div>
          </div>
        )}

        {/* Social Share */}
        <SocialShare title={post.title} />
      </article>

      {/* Related Posts */}
      {relatedPosts.docs.length > 0 && (
        <section className="mt-16 pt-12 border-t border-border">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-2xl font-bold mb-8 text-foreground">Related Articles</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedPosts.docs.map((relatedPost: Post) => (
                <Card
                  key={relatedPost.id}
                  className="overflow-hidden hover:shadow-lg transition-shadow duration-200 group"
                >
                  <Link href={`/blog/${relatedPost.slug}`} className="block">
                    {/* Featured Image */}
                    {relatedPost.featuredImage && typeof relatedPost.featuredImage === 'object' && (
                      <div className="relative aspect-video overflow-hidden">
                        <Image
                          src={relatedPost.featuredImage.url || ''}
                          alt={relatedPost.featuredImage.alt || relatedPost.title}
                          fill
                          className="object-cover transition-transform group-hover:scale-105"
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        />
                      </div>
                    )}

                    <CardHeader className="pb-2">
                      <CardTitle className="line-clamp-2 group-hover:text-primary transition-colors">
                        {relatedPost.title}
                      </CardTitle>
                    </CardHeader>

                    <CardContent className="pt-0">
                      {relatedPost.excerpt && (
                        <p className="text-muted-foreground text-sm line-clamp-2 mb-3">
                          {relatedPost.excerpt}
                        </p>
                      )}
                      {relatedPost.publishedAt && (
                        <div className="flex items-center space-x-1 text-xs text-muted-foreground">
                          <Calendar className="w-3 h-3" />
                          <time>
                            {new Date(relatedPost.publishedAt).toLocaleDateString('en-US', {
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric',
                            })}
                          </time>
                        </div>
                      )}
                    </CardContent>
                  </Link>
                </Card>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Back to Blog */}
      <div className="mt-12 text-center">
        <Button variant="outline" asChild>
          <Link href="/blog" className="inline-flex items-center space-x-2">
            <ArrowLeft className="w-4 h-4" />
            <span>Back to all posts</span>
          </Link>
        </Button>
      </div>
    </div>
  )
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const resolvedParams = await params
  const { slug } = resolvedParams

  return (
    <div className="container py-8 md:py-12 lg:py-16">
      <Suspense fallback={<PostContentLoading />}>
        <BlogPostContent slug={slug} />
      </Suspense>
    </div>
  )
}

// Generate metadata for SEO
export async function generateMetadata({ params }: BlogPostPageProps) {
  const resolvedParams = await params
  const { slug } = resolvedParams

  const payload = await getPayload({ config })

  try {
    const posts = await payload.find({
      collection: 'posts',
      where: {
        slug: { equals: slug },
        status: { equals: 'published' },
      },
      limit: 1,
    })

    if (!posts.docs.length) {
      return {
        title: 'Post Not Found',
        description: 'The requested blog post could not be found.',
      }
    }

    const post = posts.docs[0]
    const title = post.meta?.title || post.title
    const description = post.meta?.description || post.excerpt || ''
    const publishedTime = post.publishedAt
    const modifiedTime = post.updatedAt

    // Get featured image for social sharing
    const image =
      post.featuredImage && typeof post.featuredImage === 'object' ? post.featuredImage.url : null

    return {
      title,
      description,
      openGraph: {
        title,
        description,
        type: 'article',
        publishedTime,
        modifiedTime,
        authors: post.author && typeof post.author === 'object' ? [post.author.email] : undefined,
        images: image ? [{ url: image, alt: title }] : undefined,
        siteName: 'Your Site Name',
      },
      twitter: {
        card: 'summary_large_image',
        title,
        description,
        images: image ? [image] : undefined,
      },
      alternates: {
        canonical: `/blog/${slug}`,
      },
    }
  } catch (error) {
    console.error('Error generating metadata:', error)
    return {
      title: 'Error',
      description: 'An error occurred while loading this page.',
    }
  }
}

// Generate static params for build-time optimization
export async function generateStaticParams() {
  const payload = await getPayload({ config })

  try {
    const posts = await payload.find({
      collection: 'posts',
      where: {
        status: { equals: 'published' },
      },
      limit: 1000, // Adjust based on your needs
      pagination: false,
    })

    return posts.docs.map((post: Post) => ({
      slug: post.slug,
    }))
  } catch (error) {
    console.error('Error generating static params:', error)
    return []
  }
}
