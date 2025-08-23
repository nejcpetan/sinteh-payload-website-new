import { getPayload } from 'payload'
import React from 'react'
import { PageTemplate } from '@/components/PageTemplate'

import config from '@/payload.config'
import type { Homepage } from '@/payload-types'

// Enable ISR - revalidate when manually triggered via API
export const revalidate = false // Use on-demand revalidation only

export default async function HomePage() {
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })

  // Fetch homepage global
  const homepage = (await payload.findGlobal({
    slug: 'homepage',
    depth: 2, // Include relationships for blocks
  })) as Homepage

  return <PageTemplate page={homepage} />
}
