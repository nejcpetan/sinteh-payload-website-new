import { RichText } from '@payloadcms/richtext-lexical/react'
import { Page, Homepage, Media } from '@/payload-types'
import { HeroBlock } from '@/components/blocks/HeroBlock'
import { LogoBeltBlock } from '@/components/blocks/LogoBeltBlock'
import { ServicesBlock } from '@/components/blocks/ServicesBlock'
import { AboutBlock } from '@/components/blocks/AboutBlock'
import { WhyTrustBlock } from '@/components/blocks/WhyTrustBlock'
import { ProjectsBlock } from '@/components/blocks/ProjectsBlock'
import { ContactBlock } from '@/components/blocks/ContactBlock'
import { ProductHeroBlock } from '@/components/blocks/ProductHeroBlock'
import { KeyFeaturesBlock } from '@/components/blocks/KeyFeaturesBlock'
import { ProductGalleryBlock } from '@/components/blocks/ProductGalleryBlock'
import { SpecificationsBlock } from '@/components/blocks/SpecificationsBlock'
import { ApplicationsBlock } from '@/components/blocks/ApplicationsBlock'
import { TechnicalOverviewBlock } from '@/components/blocks/TechnicalOverviewBlock'
import { BenefitsComparisonBlock } from '@/components/blocks/BenefitsComparisonBlock'
import { ProductCTABlock } from '@/components/blocks/ProductCTABlock'
import { ProductResourcesBlock } from '@/components/blocks/ProductResourcesBlock'
import { ContactHeroBlock } from '@/components/blocks/ContactHeroBlock'
import { ContactFormBlock } from '@/components/blocks/ContactFormBlock'
import { ContactInfoBlock } from '@/components/blocks/ContactInfoBlock'
import { ContactLocationBlock } from '@/components/blocks/ContactLocationBlock'
import { ContactFAQBlock } from '@/components/blocks/ContactFAQBlock'

interface PageTemplateProps {
  page: Page | Homepage
}

// Helper function to safely extract image data
function getImageData(image: any): { url: string; alt?: string } {
  if (typeof image === 'object' && image && image.url) {
    return {
      url: image.url,
      alt: image.alt || undefined,
    }
  }
  return { url: '', alt: '' }
}

// Helper function to safely extract array data
function getArrayData<T>(arr: any[] | null | undefined): T[] {
  return arr?.filter((item) => item != null) || []
}

// Helper function to safely extract button data
function getButtonData(button: any) {
  if (!button || typeof button !== 'object') return undefined
  return {
    text: button.text,
    type: button.type,
    page: button.page && typeof button.page === 'object' ? { slug: button.page.slug } : undefined,
    url: button.url || undefined,
    anchor: button.anchor || undefined,
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
                  backgroundImage={
                    block.backgroundImage
                      ? getImageData(block.backgroundImage)
                      : { url: '', alt: '' }
                  }
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
                    alt: logo.alt,
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
                    button: getButtonData(service.button),
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
                    link: project.link || undefined,
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
            case 'productHero':
              return (
                <ProductHeroBlock
                  key={index}
                  badge={block.badge || undefined}
                  title={block.title}
                  subtitle={block.subtitle || undefined}
                  description={block.description || undefined}
                  backgroundImage={
                    block.backgroundImage ? getImageData(block.backgroundImage) : undefined
                  }
                  keyBenefits={getArrayData(block.keyBenefits || [])}
                  ctaButtons={getArrayData(block.ctaButtons || [])}
                />
              )
            case 'keyFeatures':
              return (
                <KeyFeaturesBlock
                  key={index}
                  badge={block.badge || undefined}
                  title={block.title}
                  subtitle={block.subtitle || undefined}
                  features={getArrayData(block.features || [])}
                  bottomHighlight={block.bottomHighlight || undefined}
                />
              )
            case 'productGallery':
              return (
                <ProductGalleryBlock
                  key={index}
                  badge={block.badge || undefined}
                  title={block.title}
                  subtitle={block.subtitle || undefined}
                  images={getArrayData(block.images || []).map((image: any) => ({
                    title: image.title,
                    description: image.description,
                    category: image.category,
                    image: image.image ? getImageData(image.image) : undefined,
                  }))}
                  downloadSection={block.downloadSection || undefined}
                />
              )
            case 'specifications':
              return (
                <SpecificationsBlock
                  key={index}
                  badge={block.badge || undefined}
                  title={block.title}
                  subtitle={block.subtitle || undefined}
                  specifications={getArrayData(block.specifications || [])}
                  certificationBadges={getArrayData(block.certificationBadges || [])}
                  additionalInfo={block.additionalInfo || undefined}
                />
              )
            case 'applications':
              return (
                <ApplicationsBlock
                  key={index}
                  badge={block.badge || undefined}
                  title={block.title}
                  subtitle={block.subtitle || undefined}
                  applications={getArrayData(block.applications || []).map((app: any) => ({
                    icon: app.icon,
                    title: app.title,
                    description: app.description,
                    details: getArrayData(app.details || []).map((detail: any) => detail.detail),
                  }))}
                  stats={getArrayData(block.stats || [])}
                  caseStudy={
                    block.caseStudy
                      ? {
                          title: block.caseStudy.title,
                          description: block.caseStudy.description,
                          stats: getArrayData(block.caseStudy.stats || []),
                          image: block.caseStudy.image
                            ? getImageData(block.caseStudy.image)
                            : undefined,
                        }
                      : undefined
                  }
                />
              )
            case 'technicalOverview':
              return (
                <TechnicalOverviewBlock
                  key={index}
                  badge={block.badge || undefined}
                  title={block.title}
                  description={block.description}
                  technicalImage={
                    block.technicalImage ? getImageData(block.technicalImage) : undefined
                  }
                  processSteps={getArrayData(block.processSteps || [])}
                  technicalBenefits={getArrayData(block.technicalBenefits || [])}
                />
              )
            case 'benefitsComparison':
              return (
                <BenefitsComparisonBlock
                  key={index}
                  badge={block.badge || undefined}
                  title={block.title}
                  subtitle={block.subtitle || undefined}
                  benefits={getArrayData(block.benefits || [])}
                  summaryCards={getArrayData(block.summaryCards || [])}
                  bottomCTA={block.bottomCTA || undefined}
                />
              )
            case 'productCTA':
              return (
                <ProductCTABlock
                  key={index}
                  title={block.title}
                  description={block.description}
                  stats={getArrayData(block.stats || [])}
                  contactInfo={block.contactInfo || undefined}
                  whyUsPoints={getArrayData(block.whyUsPoints || [])}
                  heroImage={block.heroImage ? getImageData(block.heroImage) : undefined}
                  formTitle={block.formTitle || undefined}
                  applicationOptions={getArrayData(block.applicationOptions || [])}
                  privacyText={block.privacyText || undefined}
                />
              )
            case 'productResources':
              return (
                <ProductResourcesBlock
                  key={index}
                  badge={block.badge || undefined}
                  title={block.title}
                  subtitle={block.subtitle || undefined}
                  resources={getArrayData(block.resources || [])}
                  quickAccessItems={getArrayData(block.quickAccessItems || [])}
                  contactSection={block.contactSection || undefined}
                  newsletterSection={block.newsletterSection || undefined}
                />
              )
            case 'contactHero':
              return (
                <ContactHeroBlock
                  key={index}
                  title={block.title}
                  subtitle={block.subtitle || undefined}
                  quickContactMethods={getArrayData(block.quickContactMethods || [])}
                />
              )
            case 'contactForm':
              return (
                <ContactFormBlock
                  key={index}
                  badge={block.badge || undefined}
                  title={block.title}
                  subtitle={block.subtitle || undefined}
                  formTitle={block.formTitle || undefined}
                  submitButtonText={block.submitButtonText || undefined}
                  submitButtonLoadingText={block.submitButtonLoadingText || undefined}
                  privacyText={block.privacyText || undefined}
                />
              )
            case 'contactInfo':
              return (
                <ContactInfoBlock
                  key={index}
                  badge={block.badge || undefined}
                  title={block.title}
                  subtitle={block.subtitle || undefined}
                  contactMethods={getArrayData(block.contactMethods || [])}
                />
              )
            case 'contactLocation':
              return (
                <ContactLocationBlock
                  key={index}
                  badge={block.badge || undefined}
                  title={block.title}
                  subtitle={block.subtitle || undefined}
                  mapEmbedUrl={block.mapEmbedUrl || undefined}
                  address={block.address || undefined}
                  emergencyPhone={block.emergencyPhone || undefined}
                />
              )
            case 'contactFAQ':
              return (
                <ContactFAQBlock
                  key={index}
                  badge={block.badge || undefined}
                  title={block.title}
                  subtitle={block.subtitle || undefined}
                  faqs={getArrayData(block.faqs || [])}
                />
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
