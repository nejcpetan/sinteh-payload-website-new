import { RichText } from '@payloadcms/richtext-lexical/react'
import { Page, Homepage, Media } from '@/payload-types'
import { getButtonData, getCTAData, getLinkData, getLinkHref } from '@/lib/linkUtils'
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

// Universal Blocks
import { UniversalHero } from '@/components/blocks/universal/UniversalHero'
import { UniversalCTA } from '@/components/blocks/universal/UniversalCTA'
import { FeatureGrid } from '@/components/blocks/universal/FeatureGrid'
import { ContentGrid } from '@/components/blocks/universal/ContentGrid'
import { StatsSection } from '@/components/blocks/universal/StatsSection'
import { ProcessSteps } from '@/components/blocks/universal/ProcessSteps'
import { ContentCards } from '@/components/blocks/universal/ContentCards'
import { ContactSection } from '@/components/blocks/universal/ContactSection'
import { ComparisonTable } from '@/components/blocks/universal/ComparisonTable'
import { SimplePage } from '@/components/blocks/universal/SimplePage'
import { BrandShowcase } from '@/components/blocks/universal/BrandShowcase'
import { TechnicalContent } from '@/components/blocks/universal/TechnicalContent'
import { ResourceGallery } from '@/components/blocks/universal/ResourceGallery'

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

// Link utilities are now imported from @/lib/linkUtils

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

            // Universal Blocks
            case 'universalHero':
              return (
                <UniversalHero
                  key={index}
                  variant={block.variant}
                  badge={block.badge}
                  title={block.title}
                  subtitle={block.subtitle}
                  description={block.description}
                  benefits={getArrayData(block.benefits || [])}
                  benefitsLayout={block.benefitsLayout}
                  primaryCTA={block.primaryCTA}
                  secondaryCTA={block.secondaryCTA}
                  trustText={block.trustText}
                  trustIndicators={getArrayData(block.trustIndicators || [])}
                  stats={getArrayData(block.stats || [])}
                  contactMethods={getArrayData(block.contactMethods || [])}
                  showImage={block.showImage}
                  backgroundStyle={block.backgroundStyle}
                  contentAlignment={block.contentAlignment}
                />
              )

            case 'universalCTA':
              return (
                <UniversalCTA
                  key={index}
                  variant={block.variant}
                  title={block.title}
                  subtitle={block.subtitle}
                  description={block.description}
                  primaryCTA={block.primaryCTA}
                  secondaryCTA={block.secondaryCTA}
                  benefits={getArrayData(block.benefits || []).map((b: any) => b.benefit)}
                  stats={getArrayData(block.stats || [])}
                  backgroundStyle={block.backgroundStyle}
                />
              )

            case 'featureGrid':
              return (
                <FeatureGrid
                  key={index}
                  variant={block.variant}
                  title={block.title}
                  subtitle={block.subtitle}
                  description={block.description}
                  badge={block.badge}
                  features={getArrayData(block.features || []).map((feature: any) => ({
                    ...feature,
                    icon: <div>🔧</div>, // Placeholder icon
                    details: getArrayData(feature.details || []).map((d: any) => d.detail),
                  }))}
                  columns={block.columns}
                  cardStyle={block.cardStyle}
                  backgroundStyle={block.backgroundStyle}
                />
              )

            case 'contentGrid':
              return (
                <ContentGrid
                  key={index}
                  variant={block.variant}
                  title={block.title}
                  subtitle={block.subtitle}
                  description={block.description}
                  badge={block.badge}
                  items={getArrayData(block.items || []).map((item: any) => ({
                    ...item,
                    icon: <div>📋</div>, // Placeholder icon
                    applications: getArrayData(item.applications || []).map(
                      (a: any) => a.application,
                    ),
                  }))}
                  columns={block.columns}
                  backgroundStyle={block.backgroundStyle}
                />
              )

            case 'statsSection':
              return (
                <StatsSection
                  key={index}
                  variant={block.variant}
                  title={block.title}
                  subtitle={block.subtitle}
                  description={block.description}
                  badge={block.badge}
                  stats={getArrayData(block.stats || [])}
                  columns={block.columns}
                  backgroundStyle={block.backgroundStyle}
                />
              )

            case 'processSteps':
              return (
                <ProcessSteps
                  key={index}
                  variant={block.variant}
                  title={block.title}
                  subtitle={block.subtitle}
                  description={block.description}
                  badge={block.badge}
                  steps={getArrayData(block.steps || []).map((step: any) => ({
                    ...step,
                    details: getArrayData(step.details || []).map((d: any) => d.detail),
                  }))}
                  backgroundStyle={block.backgroundStyle}
                />
              )

            case 'contentCards':
              return (
                <ContentCards
                  key={index}
                  variant={block.variant}
                  title={block.title}
                  subtitle={block.subtitle}
                  description={block.description}
                  badge={block.badge}
                  cards={getArrayData(block.cards || []).map((card: any) => ({
                    ...card,
                    tags: getArrayData(card.tags || []).map((t: any) => t.tag),
                  }))}
                  columns={block.columns}
                  backgroundStyle={block.backgroundStyle}
                />
              )

            case 'contactSection':
              return (
                <ContactSection
                  key={index}
                  variant={block.variant}
                  title={block.title}
                  description={block.description}
                  badge={block.badge}
                  formTitle={block.formTitle}
                  formDescription={block.formDescription}
                  benefits={getArrayData(block.benefits || []).map((b: any) => b.benefit)}
                  backgroundStyle={block.backgroundStyle}
                />
              )

            case 'comparisonTable':
              return (
                <ComparisonTable
                  key={index}
                  title={block.title}
                  description={block.description}
                  badge={block.badge}
                  items={getArrayData(block.items || [])}
                  primaryLabel={block.primaryLabel}
                  secondaryLabel={block.secondaryLabel}
                  backgroundStyle={block.backgroundStyle}
                />
              )

            case 'simplePage':
              return (
                <SimplePage
                  key={index}
                  variant={block.variant}
                  title={block.title}
                  subtitle={block.subtitle}
                  breadcrumbs={getArrayData(block.breadcrumbs || [])}
                  links={getArrayData(block.links || [])}
                >
                  <RichText data={block.content} />
                </SimplePage>
              )

            case 'brandShowcase':
              return (
                <BrandShowcase
                  key={index}
                  variant={block.variant}
                  title={block.title}
                  description={block.description}
                  badge={block.badge}
                  brands={getArrayData(block.brands || []).map((brand: any) => ({
                    ...brand,
                    logo: brand.logo ? getImageData(brand.logo).url : undefined,
                  }))}
                  backgroundStyle={block.backgroundStyle}
                />
              )

            case 'technicalContent':
              return (
                <TechnicalContent
                  key={index}
                  variant={block.variant}
                  title={block.title}
                  description={block.description}
                  badge={block.badge}
                  overviewContent={block.overviewContent}
                  processSteps={getArrayData(block.processSteps || [])}
                  specifications={getArrayData(block.specifications || []).map((spec: any) => ({
                    ...spec,
                    items: getArrayData(spec.items || []),
                  }))}
                  backgroundStyle={block.backgroundStyle}
                />
              )

            case 'resourceGallery':
              return (
                <ResourceGallery
                  key={index}
                  variant={block.variant}
                  title={block.title}
                  description={block.description}
                  badge={block.badge}
                  resources={getArrayData(block.resources || []).map((resource: any) => ({
                    ...resource,
                    icon: <div>📄</div>, // Placeholder icon
                  }))}
                  galleryImages={getArrayData(block.galleryImages || []).map((img: any) => ({
                    ...img,
                    imageUrl: img.image ? getImageData(img.image).url : undefined,
                  }))}
                  backgroundStyle={block.backgroundStyle}
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
