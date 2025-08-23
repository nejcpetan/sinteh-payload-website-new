import { RichText } from '@payloadcms/richtext-lexical/react'
import { Page, Homepage } from '@/payload-types'
import { HeroBlock } from '@/components/blocks/HeroBlock'
import { LogoBeltBlock } from '@/components/blocks/LogoBeltBlock'
import { ServicesBlock } from '@/components/blocks/ServicesBlock'
import { AboutBlock } from '@/components/blocks/AboutBlock'
import { WhyTrustBlock } from '@/components/blocks/WhyTrustBlock'
import { ProjectsBlock } from '@/components/blocks/ProjectsBlock'
import { ContactBlock } from '@/components/blocks/ContactBlock'

interface PageTemplateProps {
  page: Page | Homepage
}

export function PageTemplate({ page }: PageTemplateProps) {
  // If the page has blocks, render them
  if (page.layout && Array.isArray(page.layout)) {
    return (
      <div className="w-full">
        {page.layout.map((block, index) => {
          switch (block.blockType) {
            case 'hero':
              return <HeroBlock key={index} {...block} />
            case 'logoBelt':
              return <LogoBeltBlock key={index} {...block} />
            case 'services':
              return <ServicesBlock key={index} {...block} />
            case 'about':
              return <AboutBlock key={index} {...block} />
            case 'whyTrust':
              return <WhyTrustBlock key={index} {...block} />
            case 'projects':
              return <ProjectsBlock key={index} {...block} />
            case 'contact':
              return <ContactBlock key={index} {...block} />
            default:
              return null
          }
        })}
      </div>
    )
  }

  // Fallback to legacy rich text content (for Pages only)
  if ('title' in page && 'content' in page) {
    return (
      <div className="container mx-auto px-4 py-8">
        <article className="max-w-4xl mx-auto">
          <header className="mb-8">
            <h1 className="text-4xl font-bold mb-4">{page.title}</h1>
            {'publishedAt' in page && page.publishedAt && (
              <time className="text-gray-600">
                {new Date(page.publishedAt).toLocaleDateString()}
              </time>
            )}
          </header>

          <div className="prose prose-lg max-w-none">
            {page.content && <RichText data={page.content} />}
          </div>
        </article>
      </div>
    )
  }

  // If no layout and it's a Homepage global, show empty state
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">Homepage</h1>
        <p className="text-gray-600">
          No content blocks configured. Please add blocks to the layout.
        </p>
      </div>
    </div>
  )
}
