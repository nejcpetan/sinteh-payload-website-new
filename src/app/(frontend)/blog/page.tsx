import { Suspense } from 'react'
import { getPayload } from 'payload'
import Link from 'next/link'
import Image from 'next/image'
import { BookOpen, Calendar, Clock, User } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

import config from '@/payload.config'
import type { Post } from '@/payload-types'

// Enable ISR - revalidate when manually triggered via API
export const revalidate = false // Use on-demand revalidation only

interface BlogPageProps {
  searchParams: Promise<{
    page?: string
    category?: string
  }>
}

// Loading component for suspense
function BlogPostsLoading() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: 6 }).map((_, i) => (
        <Card key={i} className="overflow-hidden">
          <div className="h-48 bg-muted animate-pulse" />
          <CardHeader>
            <div className="h-6 bg-muted rounded animate-pulse mb-2" />
            <div className="h-4 bg-muted rounded animate-pulse" />
          </CardHeader>
          <CardContent>
            <div className="flex justify-between">
              <div className="h-4 bg-muted rounded w-24 animate-pulse" />
              <div className="h-4 bg-muted rounded w-16 animate-pulse" />
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

async function BlogPosts({ page = 1, category }: { page: number; category?: string }) {
  const payload = await getPayload({ config })
  const postsPerPage = 12

  // Build query
  const where: any = {
    status: { equals: 'published' },
  }

  if (category) {
    where['categories.slug'] = { equals: category }
  }

  // Fetch posts with pagination
  const posts = await payload.find({
    collection: 'posts',
    where,
    limit: postsPerPage,
    page,
    sort: '-publishedAt',
  })

  // Fetch categories for filter
  const categories = await payload.find({
    collection: 'categories',
    limit: 50,
    sort: 'name',
  })

  if (!posts.docs.length) {
    return (
      <Card className="text-center py-12">
        <CardContent className="max-w-md mx-auto">
          <div className="mb-6">
            <BookOpen className="mx-auto h-12 w-12 text-muted-foreground" />
          </div>
          <CardTitle className="text-xl mb-4">No posts found</CardTitle>
          <CardDescription className="mb-6">
            {category
              ? `No posts found in "${category}" category.`
              : 'No blog posts have been published yet.'}
          </CardDescription>

          {!category && (
            <div className="space-y-4">
              <p className="text-sm text-muted-foreground">To create your first blog post:</p>
              <ol className="text-sm text-left space-y-2">
                <li>
                  1. Go to the{' '}
                  <Link href="/admin" className="text-primary hover:underline">
                    Admin Panel
                  </Link>
                </li>
                <li>2. Navigate to &ldquo;Posts&rdquo; collection</li>
                <li>3. Click &ldquo;Create New&rdquo;</li>
                <li>4. Fill in the content and set status to &ldquo;Published&rdquo;</li>
              </ol>
            </div>
          )}

          {category && (
            <Button asChild className="mt-4">
              <Link href="/blog">View all posts</Link>
            </Button>
          )}
        </CardContent>
      </Card>
    )
  }

  return (
    <div>
      {/* Category Filter */}
      {categories.docs.length > 0 && (
        <div className="mb-8">
          <h3 className="text-lg font-semibold mb-4">Filter by Category</h3>
          <div className="flex flex-wrap gap-2">
            <Badge variant={!category ? 'default' : 'secondary'} className="cursor-pointer" asChild>
              <Link href="/blog">All Posts</Link>
            </Badge>
            {categories.docs.map((cat: any) => (
              <Badge
                key={cat.id}
                variant={category === cat.slug ? 'default' : 'secondary'}
                className="cursor-pointer"
                asChild
              >
                <Link href={`/blog?category=${cat.slug}`}>{cat.name}</Link>
              </Badge>
            ))}
          </div>
        </div>
      )}

      {/* Posts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.docs.map((post: Post) => (
          <Card
            key={post.id}
            className="overflow-hidden hover:shadow-lg transition-shadow duration-200 group"
          >
            <Link href={`/blog/${post.slug}`} className="block">
              {/* Featured Image */}
              {post.featuredImage && typeof post.featuredImage === 'object' && (
                <div className="relative aspect-video overflow-hidden">
                  <Image
                    src={post.featuredImage.url || ''}
                    alt={post.featuredImage.alt || post.title}
                    fill
                    className="object-cover transition-transform group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                </div>
              )}

              <CardHeader className="pb-2">
                {/* Categories */}
                {post.categories &&
                  Array.isArray(post.categories) &&
                  post.categories.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-2">
                      {post.categories.slice(0, 2).map((category: any) => (
                        <Badge
                          key={typeof category === 'object' ? category.id : category}
                          variant="secondary"
                          className="text-xs"
                        >
                          {typeof category === 'object' ? category.name : category}
                        </Badge>
                      ))}
                    </div>
                  )}

                {/* Title */}
                <CardTitle className="line-clamp-2 group-hover:text-primary transition-colors">
                  {post.title}
                </CardTitle>
              </CardHeader>

              <CardContent className="pt-0">
                {/* Excerpt */}
                {post.excerpt && (
                  <CardDescription className="line-clamp-3 mb-4">{post.excerpt}</CardDescription>
                )}

                {/* Meta */}
                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <div className="flex items-center space-x-4">
                    {post.publishedAt && (
                      <div className="flex items-center space-x-1">
                        <Calendar className="w-4 h-4" />
                        <time dateTime={post.publishedAt}>
                          {new Date(post.publishedAt).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric',
                          })}
                        </time>
                      </div>
                    )}
                    {post.author && typeof post.author === 'object' && (
                      <div className="flex items-center space-x-1">
                        <User className="w-4 h-4" />
                        <span>{post.author.email}</span>
                      </div>
                    )}
                  </div>
                  {post.readingTime && (
                    <div className="flex items-center space-x-1">
                      <Clock className="w-4 h-4" />
                      <span>{post.readingTime} min</span>
                    </div>
                  )}
                </div>
              </CardContent>
            </Link>
          </Card>
        ))}
      </div>

      {/* Pagination */}
      {posts.totalPages > 1 && (
        <div className="mt-12 flex justify-center items-center space-x-2">
          {/* Previous */}
          {posts.hasPrevPage && (
            <Button variant="outline" asChild>
              <Link href={`/blog?page=${posts.prevPage}${category ? `&category=${category}` : ''}`}>
                Previous
              </Link>
            </Button>
          )}

          {/* Page Numbers */}
          {Array.from({ length: posts.totalPages }, (_, i) => i + 1).map((pageNum) => (
            <Button
              key={pageNum}
              variant={pageNum === posts.page ? 'default' : 'outline'}
              size="sm"
              asChild
            >
              <Link href={`/blog?page=${pageNum}${category ? `&category=${category}` : ''}`}>
                {pageNum}
              </Link>
            </Button>
          ))}

          {/* Next */}
          {posts.hasNextPage && (
            <Button variant="outline" asChild>
              <Link href={`/blog?page=${posts.nextPage}${category ? `&category=${category}` : ''}`}>
                Next
              </Link>
            </Button>
          )}
        </div>
      )}

      {/* Results Summary */}
      <div className="mt-8 text-center text-muted-foreground">
        Showing {posts.docs.length} of {posts.totalDocs} posts
        {category && ` in "${category}" category`}
      </div>
    </div>
  )
}

export default async function BlogPage({ searchParams }: BlogPageProps) {
  const resolvedSearchParams = await searchParams
  const page = parseInt(resolvedSearchParams.page || '1')
  const category = resolvedSearchParams.category

  return (
    <div className="container py-8 md:py-12 lg:py-16">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <header className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">Blog</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Discover our latest articles, insights, and updates from our team.
          </p>
        </header>

        {/* Blog Posts with Suspense */}
        <Suspense fallback={<BlogPostsLoading />}>
          <BlogPosts page={page} category={category} />
        </Suspense>
      </div>
    </div>
  )
}

// Generate metadata for SEO
export async function generateMetadata({ searchParams }: BlogPageProps) {
  const resolvedSearchParams = await searchParams
  const category = resolvedSearchParams.category
  const page = parseInt(resolvedSearchParams.page || '1')

  let title = 'Blog'
  let description = 'Discover our latest articles, insights, and updates from our team.'

  if (category) {
    title = `${category} Articles - Blog`
    description = `Read our latest articles about ${category}. Stay updated with insights and updates from our team.`
  }

  if (page > 1) {
    title += ` - Page ${page}`
  }

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: 'website',
      siteName: 'Your Site Name',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
  }
}
