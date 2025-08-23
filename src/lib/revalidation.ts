// Utility function to trigger revalidation
export async function triggerRevalidation(params: {
  collection: string
  slug?: string
  type?: 'path' | 'tag'
}) {
  try {
    const revalidateSecret = process.env.REVALIDATE_SECRET
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || process.env.PAYLOAD_PUBLIC_SERVER_URL

    if (!revalidateSecret) {
      console.warn('REVALIDATE_SECRET not configured - skipping revalidation')
      return
    }

    if (!baseUrl) {
      console.warn('Base URL not configured - skipping revalidation')
      return
    }

    const url = `${baseUrl}/api/revalidate?secret=${revalidateSecret}`

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(params),
    })

    if (!response.ok) {
      console.error(`Revalidation failed: ${response.status} ${response.statusText}`)
      const errorText = await response.text()
      console.error('Error details:', errorText)
      return
    }

    const result = await response.json()
    console.log('Revalidation successful:', result)
    return result
  } catch (error) {
    console.error('Error triggering revalidation:', error)
  }
}

// Helper function to determine if a document is published
export function isPublished(doc: any): boolean {
  return doc.status === 'published' || doc._status === 'published'
}

// Helper function to get the correct slug for revalidation
export function getRevalidationSlug(doc: any, collection: string): string | undefined {
  // For pages and posts, use the slug field
  if (collection === 'pages' || collection === 'posts') {
    return doc.slug
  }

  // For other collections, we might not need a specific slug
  return undefined
}
