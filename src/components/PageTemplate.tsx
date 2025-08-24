import { RichText } from '@payloadcms/richtext-lexical/react'
import { Page, Homepage, Media } from '@/payload-types'
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

// Helper function to safely extract image data
function getImageData(image: any): { url: string; alt?: string } {
  if (typeof image === 'object' && image && image.url) {
    return {
      url: image.url,
      alt: image.alt || undefined
    }
  }
  return { url: '', alt: '' }
}

// Helper function to safely extract array data
function getArrayData<T>(arr: any[] | null | undefined): T[] {
  return arr?.filter(item => item != null) || []
}

// Helper function to safely extract button data
function getButtonData(button: any) {
  if (!button || typeof button !== 'object') return undefined
  return {
    text: button.text,
    type: button.type,
    page: button.page && typeof button.page === 'object' ? { slug: button.page.slug } : undefined,
    url: button.url || undefined,
    anchor: button.anchor || undefined
  }
}

export function PageTemplate({ page }: PageTemplateProps) {
  // If the page has blocks, render them
  if (page.layout && Array.isArray(page.layout)) {
    return (
      <div className="w-full">
        {page.layout.map((block, index) => {
          switch (block.blockType) {
            case 'hero':
              return (
                <HeroBlock 
                  key={index} 
                  title={block.title}
                  subtitle={block.subtitle || undefined}
                  backgroundImage={block.backgroundImage ? getImageData(block.backgroundImage) : { url: '', alt: '' }}
                  ctaButtons={getArrayData(block.ctaButtons || [])}
                  bottomText={block.bottomText || undefined}
                />
              )
            case 'logoBelt':
              return (
                <LogoBeltBlock 
                  key={index} 
                  logos={getArrayData(block.logos || []).map((logo: any) => ({
                    logo: getImageData(logo.logo),
                    alt: logo.alt
                  }))}
                />
              )
            case 'services':
              return (
                <ServicesBlock 
                  key={index} 
                  badge={block.badge || undefined}
                  title={block.title}
                  subtitle={block.subtitle || undefined}
                  services={getArrayData(block.services || []).map((service: any) => ({
                    title: service.title,
                    description: service.description || undefined,
                    image: getImageData(service.image),
                    features: getArrayData(service.features || []),
                    button: getButtonData(service.button)
                  }))}
                />
              )
            case 'about':
              return (
                <AboutBlock 
                  key={index} 
                  title={block.title}
                  description={block.description || ''}
                  image={getImageData(block.image)}
                  badges={getArrayData(block.badges || [])}
                  stats={getArrayData(block.stats || [])}
                  process={getArrayData(block.process || [])}
                  calloutText={block.calloutText || undefined}
                  button={getButtonData(block.button)}
                />
              )
            case 'whyTrust':
              return (
                <WhyTrustBlock 
                  key={index} 
                  title={block.title}
                  image={getImageData(block.image)}
                  reasons={getArrayData(block.reasons || [])}
                  pillars={getArrayData(block.pillars || [])}
                  button={getButtonData(block.button)}
                />
              )
            case 'projects':
              return (
                <ProjectsBlock 
                  key={index} 
                  badge={block.badge || undefined}
                  title={block.title}
                  subtitle={block.subtitle || undefined}
                  projects={getArrayData(block.projects || []).map((project: any) => ({
                    title: project.title,
                    category: project.category,
                    image: getImageData(project.image),
                    description: project.description,
                    stack: getArrayData(project.stack || []),
                    link: project.link || undefined
                  }))}
                  button={getButtonData(block.button)}
                />
              )
            case 'contact':
              return (
                <ContactBlock 
                  key={index} 
                  badge={block.badge || undefined}
                  title={block.title}
                  subtitle={block.subtitle || undefined}
                  phone={block.phone || undefined}
                  email={block.email || undefined}
                  privacyText={block.privacyText || undefined}
                />
              )
            case 'richText':
              return (
                <div key={index} className="container mx-auto px-4 py-8">
                  <div className="max-w-4xl mx-auto prose prose-lg">
                    <RichText data={block.content} />
                  </div>
                </div>
              )
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
            {page.content ? <RichText data={page.content as any} /> : null}
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
