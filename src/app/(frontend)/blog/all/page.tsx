import { Suspense } from 'react'
import { getPayload } from 'payload'
import Link from 'next/link'
import Image from 'next/image'
import { BookOpen, Calendar, Clock, User } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import BlogCTA from '@/components/BlogCTA'

import config from '@/payload.config'
import type { Post, Category, Media } from '@/payload-types'

// Enable ISR - revalidate when manually triggered via API
export const revalidate = false // Use on-demand revalidation only

interface BlogAllPageProps {
  searchParams: Promise<{
    page?: string
    category?: string
  }>
}

// Loading component for suspense
function BlogPostsLoading() {
  return (
    <div>
      {/* Category Filter Loading */}
      <div className="mb-8">
        <div className="text-center mb-6">
          <div className="h-6 bg-muted rounded-full w-20 mx-auto mb-2 animate-pulse" />
          <div className="h-6 bg-muted rounded w-48 mx-auto animate-pulse" />
        </div>
        <div className="flex flex-wrap justify-center gap-2">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="h-6 bg-muted rounded-full w-20 animate-pulse" />
          ))}
        </div>
      </div>

      {/* Posts Grid Loading */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 6 }).map((_, i) => (
          <Card key={i} className="overflow-hidden bg-white border border-border/60">
            <div className="aspect-video bg-muted animate-pulse" />
            <CardHeader className="pb-2">
              <div className="flex items-center gap-2 mb-2">
                <div className="h-4 bg-muted rounded-full w-16 animate-pulse" />
                <div className="h-3 bg-muted rounded w-12 animate-pulse" />
              </div>
              <div className="h-5 bg-muted rounded animate-pulse mb-2" />
              <div className="h-5 bg-muted rounded w-3/4 animate-pulse" />
            </CardHeader>
            <CardContent className="pt-0">
              <div className="space-y-2 mb-3">
                <div className="h-3 bg-muted rounded animate-pulse" />
                <div className="h-3 bg-muted rounded animate-pulse" />
                <div className="h-3 bg-muted rounded w-2/3 animate-pulse" />
              </div>
              <div className="h-3 bg-muted rounded w-32 animate-pulse" />
            </CardContent>
          </Card>
        ))}
      </div>
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
    depth: 2,
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
          <CardTitle className="text-xl mb-4">Ni najdenih člankov</CardTitle>
          <CardDescription className="mb-6">
            {category
              ? `Ni najdenih člankov v kategoriji "${category}".`
              : 'Trenutno ni objavljenih blog člankov.'}
          </CardDescription>

          {category && (
            <Button asChild className="mt-4">
              <Link href="/blog/all">Prikaži vse članke</Link>
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
          <div className="text-center mb-6">
            <span className="inline-block rounded-full bg-brand/10 px-3 py-1 text-xs font-medium text-brand mb-2">
              Kategorije
            </span>
            <h3 className="text-lg font-semibold">Filtriraj po kategoriji</h3>
          </div>
          <div className="flex flex-wrap justify-center gap-2">
            <Badge
              className={`cursor-pointer transition-colors ${
                !category
                  ? 'bg-brand text-white hover:bg-brand/90'
                  : 'bg-brand/10 text-brand hover:bg-brand/20 border-0'
              }`}
              asChild
            >
              <Link href="/blog/all">Vsi članki</Link>
            </Badge>
            {categories.docs.map((cat: Category) => (
              <Badge
                key={cat.id}
                className={`cursor-pointer transition-colors ${
                  category === cat.slug
                    ? 'bg-brand text-white hover:bg-brand/90'
                    : 'bg-brand/10 text-brand hover:bg-brand/20 border-0'
                }`}
                asChild
              >
                <Link href={`/blog/all?category=${cat.slug}`}>{cat.name}</Link>
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
            className="group relative overflow-hidden bg-white border border-border/60 hover:shadow-lg hover:border-brand/30 transition-all duration-300 cursor-pointer"
          >
            <Link href={`/blog/${post.slug}`} className="block">
              <div className="absolute inset-0 bg-[radial-gradient(65%_50%_at_20%_10%,_rgba(107,196,65,0.04),transparent_60%)] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              {/* Featured Image */}
              {post.featuredImage && typeof post.featuredImage === 'object' && (
                <div className="relative aspect-video overflow-hidden">
                  <Image
                    src={(post.featuredImage as Media).url || ''}
                    alt={(post.featuredImage as Media).alt || post.title}
                    fill
                    className="object-cover transition-transform group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                </div>
              )}

              <CardHeader className="pb-2">
                {/* Categories and Reading Time */}
                <div className="flex items-center gap-2 text-xs text-foreground/60 mb-2">
                  {post.categories &&
                    Array.isArray(post.categories) &&
                    post.categories.length > 0 && (
                      <span className="px-2 py-1 bg-brand/10 text-brand rounded-full">
                        {typeof post.categories[0] === 'object'
                          ? (post.categories[0] as Category).name
                          : post.categories[0]}
                      </span>
                    )}
                  {post.readingTime && (
                    <>
                      <span>•</span>
                      <span>{post.readingTime} min branja</span>
                    </>
                  )}
                </div>

                {/* Title */}
                <CardTitle className="text-sm font-bold text-foreground group-hover:text-brand transition-colors duration-300 mb-2 line-clamp-2">
                  {post.title}
                </CardTitle>
              </CardHeader>

              <CardContent className="pt-0">
                {/* Excerpt */}
                {post.excerpt && (
                  <p className="text-xs text-foreground/70 leading-relaxed line-clamp-3 mb-3">
                    {post.excerpt}
                  </p>
                )}

                {/* Published Date */}
                {post.publishedAt && (
                  <div className="flex items-center space-x-1 text-xs text-foreground/60">
                    <Calendar className="w-3 h-3" />
                    <time dateTime={post.publishedAt}>
                      {new Date(post.publishedAt).toLocaleDateString('sl-SI', {
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

      {/* Pagination */}
      {posts.totalPages > 1 && (
        <div className="mt-12 flex justify-center items-center space-x-2">
          {/* Previous */}
          {posts.hasPrevPage && (
            <Button variant="outline" asChild>
              <Link
                href={`/blog/all?page=${posts.prevPage}${category ? `&category=${category}` : ''}`}
              >
                Prejšnja
              </Link>
            </Button>
          )}

          {/* Page Numbers */}
          {Array.from({ length: Math.min(posts.totalPages, 5) }, (_, i) => {
            const pageNum = i + 1
            return (
              <Button
                key={pageNum}
                variant={pageNum === posts.page ? 'default' : 'outline'}
                size="sm"
                asChild
              >
                <Link href={`/blog/all?page=${pageNum}${category ? `&category=${category}` : ''}`}>
                  {pageNum}
                </Link>
              </Button>
            )
          })}

          {/* Next */}
          {posts.hasNextPage && (
            <Button variant="outline" asChild>
              <Link
                href={`/blog/all?page=${posts.nextPage}${category ? `&category=${category}` : ''}`}
              >
                Naslednja
              </Link>
            </Button>
          )}
        </div>
      )}

      {/* Results Summary */}
      <div className="mt-8 text-center text-muted-foreground">
        Prikazano {posts.docs.length} od {posts.totalDocs} člankov
        {category && ` v kategoriji "${category}"`}
      </div>

      {/* Blog CTA Section */}
      <BlogCTA variant="general" className="mt-16" />
    </div>
  )
}

export default async function BlogAllPage({ searchParams }: BlogAllPageProps) {
  const resolvedSearchParams = await searchParams
  const page = parseInt(resolvedSearchParams.page || '1')
  const category = resolvedSearchParams.category

  return (
    <div className="w-full bg-background">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-surface via-background to-surface/50">
        {/* Animated background pattern */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-10 left-10 w-32 h-32 border border-brand/20 rounded-full animate-pulse"></div>
          <div className="absolute top-32 right-20 w-24 h-24 border border-brand/15 rounded-full animate-pulse delay-1000"></div>
          <div className="absolute bottom-20 left-1/4 w-16 h-16 border border-brand/10 rounded-full animate-pulse delay-2000"></div>
          <div className="absolute bottom-32 right-1/3 w-20 h-20 border border-brand/25 rounded-full animate-pulse delay-500"></div>
        </div>

        <div className="relative mx-auto max-w-7xl px-4 md:px-6 pt-12 md:pt-16 pb-8 md:pb-10">
          {/* Breadcrumb Navigation */}
          <nav className="flex items-center gap-2 text-sm text-foreground/60 mb-6">
            <Link href="/" className="hover:text-foreground transition-colors">
              Domov
            </Link>
            <span>/</span>
            <Link href="/blog" className="hover:text-foreground transition-colors">
              Blog
            </Link>
            <span>/</span>
            <span className="text-foreground">Vsi članki</span>
          </nav>

          {/* Header */}
          <header className="text-center mb-8">
            <div className="inline-flex items-center gap-2 rounded-full bg-white border border-border/60 px-3 py-1 text-xs font-medium text-foreground mb-4 shadow-sm">
              <BookOpen className="h-3 w-3 text-brand" />
              <span>Arhiv člankov</span>
            </div>

            <h1 className="text-2xl md:text-3xl lg:text-4xl font-extrabold tracking-tight leading-tight text-foreground mb-2 max-w-4xl mx-auto">
              Vsi objavljeni članki
            </h1>

            <p className="text-sm text-foreground/70 mb-6 leading-relaxed max-w-2xl mx-auto">
              Odkrijte naše najnovejše članke, vpoglede in posodobitve naše ekipe. Prebrskajte po
              kategorijah ali uporabite iskanje za iskanje specifičnih tem.
            </p>

            <div className="mt-6">
              <Button variant="outline" asChild>
                <Link href="/blog">Nazaj na glavno stran bloga</Link>
              </Button>
            </div>
          </header>
        </div>
      </section>

      {/* Content Section */}
      <div className="mx-auto max-w-7xl px-4 md:px-6 py-8 md:py-12">
        {/* Blog Posts with Suspense */}
        <Suspense fallback={<BlogPostsLoading />}>
          <BlogPosts page={page} category={category} />
        </Suspense>
      </div>
    </div>
  )
}

// Generate metadata for SEO
export async function generateMetadata({ searchParams }: BlogAllPageProps) {
  const resolvedSearchParams = await searchParams
  const category = resolvedSearchParams.category
  const page = parseInt(resolvedSearchParams.page || '1')

  let title = 'Vsi članki | SINTEH PRO Blog'
  let description =
    'Prebrskajte vse naše blog članke o industrijski avtomatizaciji, varnostnih sistemih in tehnoloških rešitvah.'

  if (category) {
    title = `${category} članki | SINTEH PRO Blog`
    description = `Preberite naše najnovejše članke o ${category}. Ostanite na tekočem z vpogledi in novostmi naše ekipe.`
  }

  if (page > 1) {
    title += ` - Stran ${page}`
  }

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: 'website',
      siteName: 'SINTEH PRO',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
  }
}
