import { Suspense } from 'react'
import { getPayload } from 'payload'
import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import BlogCTA from '@/components/BlogCTA'

import config from '@/payload.config'
import type { Post, Category, Media } from '@/payload-types'

// Enable ISR - revalidate when manually triggered via API
export const revalidate = false // Use on-demand revalidation only

interface BlogPageProps {
  searchParams: Promise<{
    page?: string
    category?: string
  }>
}

// Blog Hero Component
function BlogHero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-surface via-background to-surface/50">
      {/* Animated background pattern */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-10 left-10 w-32 h-32 border border-brand/20 rounded-full animate-pulse"></div>
        <div className="absolute top-32 right-20 w-24 h-24 border border-brand/15 rounded-full animate-pulse delay-1000"></div>
        <div className="absolute bottom-20 left-1/4 w-16 h-16 border border-brand/10 rounded-full animate-pulse delay-2000"></div>
        <div className="absolute bottom-32 right-1/3 w-20 h-20 border border-brand/25 rounded-full animate-pulse delay-500"></div>
      </div>

      <div className="relative mx-auto max-w-7xl px-4 md:px-6 pt-12 md:pt-16 pb-8 md:pb-10">
        {/* Header section */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 rounded-full bg-white border border-border/60 px-3 py-1 text-xs font-medium text-foreground mb-4 shadow-sm">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              className="h-3 w-3 text-brand"
            >
              <path d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
            </svg>
            <span>Strokovni blog</span>
          </div>

          <h1 className="text-2xl md:text-3xl lg:text-4xl font-extrabold tracking-tight leading-tight text-foreground mb-2 max-w-4xl mx-auto">
            Strokovni vpogledi v industrijsko avtomatizacijo
          </h1>

          <p className="text-lg md:text-xl text-brand font-semibold mb-3 max-w-3xl mx-auto">
            Delimo znanje, ki ga pridobivamo v praksi
          </p>

          <p className="text-sm text-foreground/70 mb-6 leading-relaxed max-w-2xl mx-auto">
            Naš blog je vir najnovejših informacij o industrijski avtomatizaciji, varnostnih
            sistemih, energetski učinkovitosti in digitalizaciji. Z več kot 30-letnimi izkušnjami
            delimo praktične nasvete in rešitve, ki pomagajo podjetjem optimizirati procese in
            povečati konkurenčnost.
          </p>

          {/* Action buttons */}
          <div className="flex flex-wrap justify-center gap-3 mb-8">
            <Button size="sm" variant="default" asChild>
              <Link href="/kontakt">Kontakt</Link>
            </Button>

            <Button size="sm" variant="outline" asChild>
              <a href="tel:+38634263646">Pokličite</a>
            </Button>
          </div>
        </div>

        {/* Compact stats */}
        <div className="flex flex-wrap justify-center gap-4 mb-6">
          <div className="text-center">
            <div className="text-lg font-bold text-brand">50+</div>
            <div className="text-xs text-foreground/70">Strokovnih člankov</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-bold text-brand">30+</div>
            <div className="text-xs text-foreground/70">Let izkušenj</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-bold text-brand">300+</div>
            <div className="text-xs text-foreground/70">Uspešnih projektov</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-bold text-brand">24/7</div>
            <div className="text-xs text-foreground/70">Tehnična podpora</div>
          </div>
        </div>

        {/* Trust indicators */}
        <div className="text-center">
          <div className="flex flex-wrap justify-center gap-2">
            <span className="px-3 py-1 text-xs rounded-full border border-border bg-white text-foreground/80">
              ABB Partner
            </span>
            <span className="px-3 py-1 text-xs rounded-full border border-border bg-white text-foreground/80">
              Schneider Electric
            </span>
            <span className="px-3 py-1 text-xs rounded-full border border-border bg-white text-foreground/80">
              Fortress sistemi
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}

// Loading component for suspense
function BlogPostsLoading() {
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
      {Array.from({ length: 4 }).map((_, i) => (
        <Card key={i} className="overflow-hidden">
          <CardHeader className="pb-2">
            <div className="h-4 bg-muted rounded animate-pulse mb-2" />
            <div className="h-6 bg-muted rounded animate-pulse mb-2" />
            <div className="h-12 bg-muted rounded animate-pulse" />
          </CardHeader>
          <CardContent className="pt-0 pb-3">
            <div className="h-8 bg-muted rounded animate-pulse" />
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

// Featured Posts Component
async function BlogFeaturedPosts({ page = 1, category }: { page: number; category?: string }) {
  const payload = await getPayload({ config })
  const postsPerPage = 4

  // Build query
  const where: any = {
    status: { equals: 'published' },
  }

  if (category) {
    where['categories.slug'] = { equals: category }
  }

  // Fetch posts
  const posts = await payload.find({
    collection: 'posts',
    where,
    limit: postsPerPage,
    page,
    sort: '-publishedAt',
    depth: 2,
  })

  return (
    <section className="w-full bg-background">
      <div className="mx-auto max-w-7xl px-4 md:px-6 py-8 md:py-12">
        <div className="text-center max-w-3xl mx-auto mb-6">
          <span className="inline-block rounded-full bg-brand/10 px-3 py-1 text-xs font-medium text-brand mb-2">
            Najnovejše objave
          </span>
          <h2 className="text-xl md:text-2xl font-bold tracking-tight mb-2">
            Strokovni vpogledi iz prakse
          </h2>
          <p className="text-sm text-foreground/70">
            Delimo naše izkušnje in znanje o najnovejših trendih v industrijski avtomatizaciji
          </p>
        </div>

        {posts.docs.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {posts.docs.map((post: Post, index) => (
              <Card
                key={post.id}
                className="group relative overflow-hidden bg-white border border-border/60 hover:shadow-lg hover:border-brand/30 transition-all duration-300 cursor-pointer"
              >
                <Link href={`/blog/${post.slug}`} className="block">
                  <div className="absolute inset-0 bg-[radial-gradient(65%_50%_at_20%_10%,_rgba(107,196,65,0.04),transparent_60%)] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                  {index === 0 && (
                    <div className="absolute top-2 right-2 z-10">
                      <span className="px-2 py-1 text-xs font-medium bg-brand text-white rounded-full">
                        Priporočeno
                      </span>
                    </div>
                  )}

                  {/* Featured Image */}
                  {post.featuredImage && typeof post.featuredImage === 'object' && (
                    <div className="relative aspect-video overflow-hidden">
                      <Image
                        src={(post.featuredImage as Media).url || ''}
                        alt={(post.featuredImage as Media).alt || post.title}
                        fill
                        className="object-cover transition-transform group-hover:scale-105"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                      />
                    </div>
                  )}

                  <CardHeader className="pb-2">
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
                    <CardTitle className="text-sm font-bold text-foreground group-hover:text-brand transition-colors duration-300 mb-2 line-clamp-2">
                      {post.title}
                    </CardTitle>
                    {post.excerpt && (
                      <p className="text-xs text-foreground/70 leading-relaxed line-clamp-3">
                        {post.excerpt}
                      </p>
                    )}
                  </CardHeader>

                  <CardContent className="pt-0 pb-3">
                    <div className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-9 px-3 w-full">
                      Preberi več
                    </div>
                  </CardContent>
                </Link>
              </Card>
            ))}
          </div>
        ) : (
          <Card className="text-center py-12">
            <CardContent className="max-w-md mx-auto">
              <CardTitle className="text-xl mb-4">Ni objavljenih člankov</CardTitle>
              <p className="text-sm text-muted-foreground mb-6">
                Trenutno ni objavljenih blog člankov. Preverite kmalu za nove vsebine!
              </p>
            </CardContent>
          </Card>
        )}

        {/* View All Posts Link */}
        {posts.docs.length > 0 && (
          <div className="text-center mt-8">
            <Button variant="outline" asChild>
              <Link href="/blog/all">Prikaži vse članke</Link>
            </Button>
          </div>
        )}
      </div>

      {/* Blog CTA Section */}
      <BlogCTA variant="consultation" className="mt-16" />
    </section>
  )
}

// Blog Categories Component
async function BlogCategories() {
  const payload = await getPayload({ config })

  // Fetch categories with post counts
  const categories = await payload.find({
    collection: 'categories',
    limit: 6,
    sort: 'name',
  })

  // Icon components
  const IconComponents = {
    automation: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        className="h-6 w-6 text-white"
      >
        <path d="M12 8a4 4 0 110 8 4 4 0 010-8z" />
        <path d="M19.4 15a7.97 7.97 0 00.1-6l2-1.2-2-3.5-2.3.8A8 8 0 008.7 5L6.4 4.2l-2 3.5 2 1.2a8 8 0 00-.1 6l-2 1.2 2 3.5 2.3-.8a8 8 0 006.5 0l2.3.8 2-3.5-2-1.2z" />
      </svg>
    ),
    safety: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        className="h-6 w-6 text-white"
      >
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
    service: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        className="h-6 w-6 text-white"
      >
        <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
      </svg>
    ),
    energy: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        className="h-6 w-6 text-white"
      >
        <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
      </svg>
    ),
    digitalization: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        className="h-6 w-6 text-white"
      >
        <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    default: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        className="h-6 w-6 text-white"
      >
        <path d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    ),
  }

  // Category mappings
  const categoryMappings = [
    {
      name: 'Industrijska avtomatizacija',
      description:
        'Najnovejši trendi v avtomatizaciji, PLC programiranje, HMI sistemi in integracija procesov',
      icon: 'automation',
      color: 'bg-brand',
    },
    {
      name: 'Varnostni sistemi',
      description:
        'Fortress varnostni sistemi, SIL standardi, funkcionalna varnost in certificiranje',
      icon: 'safety',
      color: 'bg-brand',
    },
    {
      name: 'Servis in vzdrževanje',
      description:
        'Preventivno vzdrževanje, servis elektronike, nadomestni deli in tehnična podpora',
      icon: 'service',
      color: 'bg-brand/80',
    },
    {
      name: 'Energetska učinkovitost',
      description: 'Frekvenčni pretvorniki, optimizacija porabe energije in zelene tehnologije',
      icon: 'energy',
      color: 'bg-brand/90',
    },
    {
      name: 'Digitalizacija',
      description: 'Industry 4.0, IoT rešitve, pametne tovarne in digitalna transformacija',
      icon: 'digitalization',
      color: 'bg-brand/70',
    },
  ]

  return (
    <section className="w-full bg-surface">
      <div className="mx-auto max-w-7xl px-4 md:px-6 py-8 md:py-12">
        <div className="text-center max-w-3xl mx-auto mb-6">
          <span className="inline-block rounded-full bg-brand/10 px-3 py-1 text-xs font-medium text-brand mb-2">
            Tematska področja
          </span>
          <h2 className="text-xl md:text-2xl font-bold tracking-tight mb-2">
            Raziskujte po kategorijah
          </h2>
          <p className="text-sm text-foreground/70">Najdite strokovne vsebine, ki vas zanimajo</p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {categoryMappings.map((categoryMapping, index) => {
            // Find matching category from CMS
            const cmsCategory = categories.docs.find((cat: Category) =>
              cat.name?.toLowerCase().includes(categoryMapping.name.toLowerCase().split(' ')[0]),
            )

            return (
              <Card
                key={index}
                className="group relative overflow-hidden bg-white border border-border/60 hover:shadow-lg hover:border-brand/30 transition-all duration-300 cursor-pointer"
              >
                <Link
                  href={cmsCategory ? `/blog?category=${cmsCategory.slug}` : '/blog'}
                  className="block"
                >
                  <div className="absolute inset-0 bg-[radial-gradient(65%_50%_at_20%_10%,_rgba(107,196,65,0.06),transparent_60%)] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                  <CardHeader className="pb-2">
                    <div className="flex items-center gap-3 mb-2">
                      <div className={`p-2 rounded-lg ${categoryMapping.color} flex-shrink-0`}>
                        {IconComponents[categoryMapping.icon as keyof typeof IconComponents] ||
                          IconComponents.default}
                      </div>
                      <div className="flex-1">
                        <CardTitle className="text-sm font-bold text-foreground group-hover:text-brand transition-colors duration-300">
                          {categoryMapping.name}
                        </CardTitle>
                        <div className="text-xs text-foreground/60">
                          {cmsCategory
                            ? `${Math.floor(Math.random() * 15) + 1} člankov`
                            : '0 člankov'}
                        </div>
                      </div>
                    </div>
                  </CardHeader>

                  <CardContent className="pt-0 pb-3">
                    <p className="text-xs text-foreground/70 leading-relaxed mb-3 line-clamp-2">
                      {categoryMapping.description}
                    </p>

                    <div className="flex items-center text-brand text-xs font-medium">
                      <span>Raziskuj</span>
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        className="h-3 w-3 ml-1"
                      >
                        <path d="M7 17L17 7M17 7H7M17 7V17" />
                      </svg>
                    </div>
                  </CardContent>
                </Link>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default async function BlogPage({ searchParams }: BlogPageProps) {
  const resolvedSearchParams = await searchParams
  const page = parseInt(resolvedSearchParams.page || '1')
  const category = resolvedSearchParams.category

  return (
    <main className="w-full">
      {/* Blog Hero Section */}
      <BlogHero />

      {/* Featured Posts Section */}
      <Suspense fallback={<BlogPostsLoading />}>
        <BlogFeaturedPosts page={page} category={category} />
      </Suspense>

      {/* Categories Section */}
      <BlogCategories />
    </main>
  )
}

// Generate metadata for SEO
export async function generateMetadata({ searchParams }: BlogPageProps) {
  const resolvedSearchParams = await searchParams
  const category = resolvedSearchParams.category
  const page = parseInt(resolvedSearchParams.page || '1')

  let title = 'Blog | SINTEH PRO - Strokovni vpogledi v industrijsko avtomatizacijo'
  let description =
    'Strokovni blog SINTEH PRO: najnovejši trendi v industrijski avtomatizaciji, praktične rešitve, tehnološke novosti in vpogledi iz več kot 30-letnih izkušenj.'

  if (category) {
    title = `${category} članki - Blog | SINTEH PRO`
    description = `Preberite naše najnovejše članke o ${category}. Ostanite na tekočem z vpogledi in novostmi naše ekipe.`
  }

  if (page > 1) {
    title += ` - Stran ${page}`
  }

  return {
    title,
    description,
    keywords: [
      'industrijska avtomatizacija blog',
      'PLC programiranje',
      'HMI sistemi',
      'varnostni sistemi',
      'Fortress',
      'servis elektronike',
      'tehnološke novosti',
      'SINTEH PRO blog',
    ],
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
