import { notFound } from 'next/navigation'
import { getPayload } from 'payload'
import config from '@/payload.config'
import { PageTemplate } from '@/components/PageTemplate'

interface PageProps {
  params: Promise<{
    slug: string[]
  }>
}

export default async function Page({ params }: PageProps) {
  const resolvedParams = await params
  const slug = resolvedParams.slug?.[0] || 'home'

  // Skip static assets to prevent unnecessary database queries
  if (slug.includes('.')) {
    return notFound()
  }

  const payload = await getPayload({ config })

  try {
    const pages = await payload.find({
      collection: 'pages',
      where: {
        slug: {
          equals: slug,
        },
        status: {
          equals: 'published',
        },
      },
      limit: 1,
    })

    if (!pages.docs.length) {
      return notFound()
    }

    const page = pages.docs[0]

    return <PageTemplate page={page} />
  } catch (error) {
    return notFound()
  }
}

// Generate metadata for SEO
export async function generateMetadata({ params }: PageProps) {
  const resolvedParams = await params
  const slug = resolvedParams.slug?.[0] || 'home'

  // Skip static assets
  if (slug.includes('.')) {
    return {
      title: 'Not Found',
    }
  }

  const payload = await getPayload({ config })

  try {
    const pages = await payload.find({
      collection: 'pages',
      where: {
        slug: {
          equals: slug,
        },
        status: {
          equals: 'published',
        },
      },
      limit: 1,
    })

    if (!pages.docs.length) {
      return {
        title: 'Page Not Found',
      }
    }

    const page = pages.docs[0]

    return {
      title: page.meta?.title || page.title,
      description: page.meta?.description || '',
    }
  } catch (_error) {
    return {
      title: 'Error',
    }
  }
}
