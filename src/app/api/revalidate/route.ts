import { NextRequest, NextResponse } from 'next/server'
import { revalidatePath, revalidateTag } from 'next/cache'
import { locales } from '@/lib/i18n/config'

export async function POST(req: NextRequest) {
  try {
    // Verify the secret token
    const secret = req.nextUrl.searchParams.get('secret')

    if (!secret || secret !== process.env.REVALIDATE_SECRET) {
      return NextResponse.json({ message: 'Invalid or missing secret token' }, { status: 401 })
    }

    const body = await req.json()
    const { collection, slug, type = 'path', locales: affectedLocales } = body

    if (!collection) {
      return NextResponse.json({ message: 'Collection is required' }, { status: 400 })
    }

    // Determine which locales to revalidate
    const localesToRevalidate = affectedLocales || locales

    // Handle different types of revalidation
    switch (collection) {
      case 'pages':
        if (slug) {
          // Revalidate specific page for all affected locales
          for (const locale of localesToRevalidate) {
            if (slug === 'home') {
              await revalidatePath(`/${locale}`)
              console.log(`Revalidated homepage for locale: ${locale}`)
            } else {
              await revalidatePath(`/${locale}/${slug}`)
              console.log(`Revalidated page: /${locale}/${slug}`)
            }
          }
        } else {
          // Revalidate all pages if no slug provided
          for (const locale of localesToRevalidate) {
            await revalidatePath(`/${locale}`, 'layout')
            console.log(`Revalidated all pages for locale: ${locale}`)
          }
        }
        break

      case 'posts':
        if (slug) {
          // Revalidate specific blog post for all affected locales
          for (const locale of localesToRevalidate) {
            await revalidatePath(`/${locale}/blog/${slug}`)
            console.log(`Revalidated post: /${locale}/blog/${slug}`)
          }
        }
        // Always revalidate blog listing when posts change
        for (const locale of localesToRevalidate) {
          await revalidatePath(`/${locale}/blog`)
          console.log(`Revalidated blog listing for locale: ${locale}`)
        }
        break

      case 'homepage':
        // Revalidate homepage for all affected locales
        for (const locale of localesToRevalidate) {
          await revalidatePath(`/${locale}`)
          console.log(`Revalidated homepage for locale: ${locale}`)
        }
        break

      case 'header':
      case 'footer':
      case 'seo':
        // Revalidate entire layout when global content changes
        for (const locale of localesToRevalidate) {
          await revalidatePath(`/${locale}`, 'layout')
          console.log(`Revalidated layout for locale ${locale} due to ${collection} change`)
        }
        break

      default:
        // For any other collection, revalidate the entire frontend
        for (const locale of localesToRevalidate) {
          await revalidatePath(`/${locale}`, 'layout')
          console.log(`Revalidated layout for locale ${locale} due to ${collection} change`)
        }
    }

    // If using cache tags, you can also revalidate by tag
    if (type === 'tag') {
      await revalidateTag(collection)
      console.log(`Revalidated tag: ${collection}`)
    }

    return NextResponse.json({
      revalidated: true,
      now: Date.now(),
      collection,
      slug: slug || 'all',
    })
  } catch (error) {
    console.error('Error during revalidation:', error)
    return NextResponse.json(
      {
        message: 'Error revalidating',
        error: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 },
    )
  }
}

// Handle GET requests for manual testing
export async function GET(req: NextRequest) {
  const secret = req.nextUrl.searchParams.get('secret')
  const path = req.nextUrl.searchParams.get('path')

  if (!secret || secret !== process.env.REVALIDATE_SECRET) {
    return NextResponse.json({ message: 'Invalid or missing secret token' }, { status: 401 })
  }

  if (!path) {
    return NextResponse.json(
      { message: 'Path parameter is required for GET requests' },
      { status: 400 },
    )
  }

  try {
    await revalidatePath(path)
    return NextResponse.json({
      revalidated: true,
      path,
      now: Date.now(),
    })
  } catch (error) {
    console.error('Error during revalidation:', error)
    return NextResponse.json(
      {
        message: 'Error revalidating',
        error: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 },
    )
  }
}
