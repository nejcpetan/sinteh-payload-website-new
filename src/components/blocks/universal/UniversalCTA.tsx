/**
 * UniversalCTA Component - SINTEH PRO Component Library
 *
 * A powerful call-to-action component that drives conversions and lead generation.
 * Consolidates multiple CTA variants with integrated contact forms, stats, and
 * visual elements for maximum conversion potential.
 *
 * KEY FEATURES:
 * - 4 layout variants (standard, with-contact-form, minimal, full-width)
 * - Integrated contact forms with project type selection
 * - Benefits lists with checkmark icons
 * - Statistics grid display
 * - Visual elements and brand imagery
 * - Multiple background styles
 * - Flexible content layouts (split, centered, stacked)
 *
 * CONVERSION OPTIMIZED:
 * - Clear value propositions
 * - Multiple CTA buttons (primary + secondary)
 * - Trust indicators and social proof
 * - Mobile-optimized forms
 * - Accessibility compliant
 *
 * PERFECT FOR:
 * - Service inquiry forms
 * - Lead generation sections
 * - Contact page CTAs
 * - Product inquiry forms
 * - Newsletter signups
 *
 * @example
 * <UniversalCTA
 *   variant="with-contact-form"
 *   title="Ready to Automate Your Process?"
 *   description="Get a custom quote for your industrial automation needs"
 *   primaryCTA={{ text: "Get Quote", href: "#contact-form" }}
 *   benefits={["Free consultation", "24/7 support", "Expert team"]}
 * />
 */

import { Button } from '@/components/ui/button'
import { getLinkHref } from '@/lib/linkUtils'
import { ContactFormBlock } from '@/components/blocks/ContactFormBlock'
import { ContactInfoBlock } from '@/components/blocks/ContactInfoBlock'

interface CTAButton {
  text: string
  href: string
  variant?: 'default' | 'outline'
}

interface Stat {
  value: string
  label: string
}

export interface UniversalCTAProps {
  // Layout variants
  variant?: 'standard' | 'with-contact-form' | 'minimal' | 'full-width'

  // Core content
  title: string
  subtitle?: string
  description: string

  // CTA buttons
  primaryCTA: CTAButton
  secondaryCTA?: CTAButton

  // Benefits list
  benefits?: string[]
  showBenefitIcons?: boolean

  // Stats section
  stats?: Stat[]
  statsColumns?: 2 | 3 | 4

  // Contact form integration (for with-contact-form variant)
  contactFormTitle?: string
  contactFormDescription?: string
  projectTypeOptions?: Array<{
    value: string
    label: string
  }>
  showBudget?: boolean
  showUrgency?: boolean

  // Contact info
  contactInfoBenefits?: string[]

  // Visual elements
  showVisualElement?: boolean
  visualIcon?: React.ReactNode
  visualTitle?: string
  visualSubtitle?: string

  // Background options
  backgroundStyle?: 'surface' | 'gradient' | 'white' | 'transparent'

  // Layout options
  contentLayout?: 'split' | 'centered' | 'stacked'

  // Styling
  className?: string
}

export function UniversalCTA({
  variant = 'standard',
  title,
  subtitle,
  description,
  primaryCTA,
  secondaryCTA,
  benefits = [],
  showBenefitIcons = true,
  stats = [],
  statsColumns = 3,
  contactFormTitle = 'Povpraševanje',
  contactFormDescription = 'Opišite vaš projekt, specifične potrebe in časovni okvir.',
  projectTypeOptions,
  showBudget = false,
  showUrgency = false,
  contactInfoBenefits = [
    '30+ let izkušenj v industrijski avtomatizaciji',
    'Certificirani partnerji vodilnih proizvajalcev',
    'Celotna podpora od načrtovanja do servisa',
    'Lokalna podpora v slovenskem jeziku',
  ],
  showVisualElement = true,
  visualIcon = (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      className="h-12 w-12 mx-auto"
    >
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  ),
  visualTitle = 'SINTEH PRO',
  visualSubtitle = 'Vaš partner',
  backgroundStyle = 'surface',
  contentLayout = 'split',
  className = '',
}: UniversalCTAProps) {
  const getSectionClasses = () => {
    const baseClasses = 'w-full text-foreground'

    switch (backgroundStyle) {
      case 'surface':
        return `${baseClasses} bg-background`
      case 'gradient':
        return `${baseClasses} bg-gradient-to-br from-surface via-background to-surface/50`
      case 'white':
        return `${baseClasses} bg-white`
      case 'transparent':
        return `${baseClasses}`
      default:
        return `${baseClasses} bg-background`
    }
  }

  const getContainerClasses = () => {
    return variant === 'full-width'
      ? 'w-full px-4 md:px-6 py-16 md:py-24'
      : 'mx-auto max-w-7xl container-px py-16 md:py-24'
  }

  const getMainContentClasses = () => {
    const baseClasses = 'relative overflow-hidden rounded-3xl border border-border/60'

    switch (backgroundStyle) {
      case 'surface':
        return `${baseClasses} bg-surface`
      case 'white':
        return `${baseClasses} bg-white`
      case 'gradient':
        return `${baseClasses} bg-gradient-to-br from-white via-surface/50 to-white`
      default:
        return `${baseClasses} bg-surface`
    }
  }

  const getContentLayoutClasses = () => {
    switch (contentLayout) {
      case 'centered':
        return 'text-center max-w-4xl mx-auto'
      case 'stacked':
        return 'space-y-8'
      default:
        return 'grid lg:grid-cols-2 gap-12 items-center'
    }
  }

  const getStatsGridClasses = () => {
    const gridClasses = {
      2: 'grid-cols-2',
      3: 'sm:grid-cols-3',
      4: 'sm:grid-cols-2 lg:grid-cols-4',
    }
    return `grid ${gridClasses[statsColumns]} gap-6`
  }

  // Background gradients
  const backgroundElements = (
    <div className="pointer-events-none absolute inset-0">
      <div className="absolute inset-0 bg-[radial-gradient(90%_70%_at_20%_50%,rgba(107,196,65,0.15)_0%,rgba(107,196,65,0.08)_55%,transparent_80%)]" />
      <div className="absolute inset-0 bg-gradient-to-r from-white/40 via-transparent to-white/20" />
    </div>
  )

  if (variant === 'with-contact-form') {
    return (
      <>
        {/* Main CTA Section */}
        <section className={`${getSectionClasses()} ${className}`}>
          <div className={getContainerClasses()}>
            <div className={getMainContentClasses()}>
              {backgroundElements}

              <div className="relative px-8 py-12 md:px-12 md:py-16">
                <div className={getContentLayoutClasses()}>
                  {/* Content */}
                  <div>
                    {subtitle && (
                      <span className="inline-block rounded-full bg-brand/10 px-3 py-1 text-xs font-medium text-brand mb-4">
                        {subtitle}
                      </span>
                    )}

                    <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-foreground mb-6">
                      {title}
                    </h2>

                    <p className="text-lg text-foreground/80 mb-8 leading-relaxed">{description}</p>

                    {/* Benefits */}
                    {benefits.length > 0 && (
                      <div className="space-y-4 mb-8">
                        {benefits.map((benefit, index) => (
                          <div key={index} className="flex items-start gap-3">
                            {showBenefitIcons && (
                              <div className="w-6 h-6 rounded-full bg-brand text-white flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">
                                <svg
                                  className="w-4 h-4 text-white"
                                  fill="none"
                                  stroke="currentColor"
                                  viewBox="0 0 24 24"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M5 13l4 4L19 7"
                                  />
                                </svg>
                              </div>
                            )}
                            <span className="text-foreground/80">{benefit}</span>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Stats */}
                    {stats.length > 0 && (
                      <div className={`${getStatsGridClasses()} mb-8 text-center`}>
                        {stats.map((stat, index) => (
                          <div key={index}>
                            <div className="text-2xl font-extrabold text-brand mb-1">
                              {stat.value}
                            </div>
                            <div className="text-sm text-foreground/70">{stat.label}</div>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* CTAs */}
                    <div className="flex flex-wrap gap-4">
                      <Button size="lg" variant={primaryCTA.variant || 'default'} asChild>
                        <a href={getLinkHref(primaryCTA)}>{primaryCTA.text}</a>
                      </Button>

                      {secondaryCTA && (
                        <Button size="lg" variant={secondaryCTA.variant || 'outline'} asChild>
                          <a href={getLinkHref(secondaryCTA)}>
                            {secondaryCTA.type === 'url' &&
                              secondaryCTA.url?.startsWith('tel:') && (
                                <svg
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  stroke="currentColor"
                                  strokeWidth="1.5"
                                  className="h-4 w-4 mr-2"
                                >
                                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                                </svg>
                              )}
                            {secondaryCTA.type === 'url' &&
                              secondaryCTA.url?.startsWith('mailto:') && (
                                <svg
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  stroke="currentColor"
                                  strokeWidth="1.5"
                                  className="h-4 w-4 mr-2"
                                >
                                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                                  <polyline points="22,6 12,13 2,6" />
                                </svg>
                              )}
                            {secondaryCTA.text}
                          </a>
                        </Button>
                      )}
                    </div>
                  </div>

                  {/* Visual element */}
                  {showVisualElement && contentLayout === 'split' && (
                    <div className="order-1 lg:order-2">
                      <div className="relative aspect-square max-w-md mx-auto">
                        <div className="absolute -inset-6 rounded-[32px] bg-[radial-gradient(80%_60%_at_30%_20%,_rgba(107,196,65,0.2),transparent_60%)]" />
                        <div className="relative w-full h-full rounded-2xl bg-white border-2 border-border/50 flex items-center justify-center">
                          <div className="text-center text-foreground/40">
                            <div className="mb-3">{visualIcon}</div>
                            <div className="text-lg font-medium">{visualTitle}</div>
                            <div className="text-sm mt-1">{visualSubtitle}</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Form Section */}
        <section id="contact-form" className="w-full bg-background text-foreground">
          <div className="mx-auto max-w-7xl container-px py-16 md:py-24">
            <div className="grid lg:grid-cols-2 gap-12">
              <ContactFormBlock
                title={contactFormTitle}
                description={contactFormDescription}
                projectTypeOptions={projectTypeOptions}
                showBudget={showBudget}
                showUrgency={showUrgency}
              />
              <ContactInfoBlock benefits={contactInfoBenefits} />
            </div>
          </div>
        </section>
      </>
    )
  }

  // Standard CTA variant
  return (
    <section className={`${getSectionClasses()} ${className}`}>
      <div className={getContainerClasses()}>
        <div className={getMainContentClasses()}>
          {backgroundElements}

          <div className="relative px-8 py-12 md:px-12 md:py-16">
            <div className={getContentLayoutClasses()}>
              {/* Content */}
              <div>
                {subtitle && (
                  <span className="inline-block rounded-full bg-brand/10 px-3 py-1 text-xs font-medium text-brand mb-4">
                    {subtitle}
                  </span>
                )}

                <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-foreground mb-6">
                  {title}
                </h2>

                <p className="text-lg text-foreground/80 mb-8 leading-relaxed">{description}</p>

                {/* Benefits */}
                {benefits.length > 0 && (
                  <div className="space-y-4 mb-8">
                    {benefits.map((benefit, index) => (
                      <div key={index} className="flex items-start gap-3">
                        {showBenefitIcons && (
                          <div className="w-6 h-6 rounded-full bg-brand text-white flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">
                            <svg
                              className="w-4 h-4 text-white"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M5 13l4 4L19 7"
                              />
                            </svg>
                          </div>
                        )}
                        <span className="text-foreground/80">{benefit}</span>
                      </div>
                    ))}
                  </div>
                )}

                {/* Stats */}
                {stats.length > 0 && (
                  <div className={`${getStatsGridClasses()} mb-8 text-center`}>
                    {stats.map((stat, index) => (
                      <div key={index}>
                        <div className="text-2xl font-extrabold text-brand mb-1">{stat.value}</div>
                        <div className="text-sm text-foreground/70">{stat.label}</div>
                      </div>
                    ))}
                  </div>
                )}

                {/* CTAs */}
                <div
                  className={`flex gap-4 ${contentLayout === 'centered' ? 'justify-center' : ''} ${variant === 'minimal' ? 'flex-col sm:flex-row' : 'flex-wrap'}`}
                >
                  <Button size="lg" variant={primaryCTA.variant || 'default'} asChild>
                    <a href={getLinkHref(primaryCTA)}>{primaryCTA.text}</a>
                  </Button>

                  {secondaryCTA && (
                    <Button size="lg" variant={secondaryCTA.variant || 'outline'} asChild>
                      <a href={getLinkHref(secondaryCTA)}>
                        {secondaryCTA.type === 'url' && secondaryCTA.url?.startsWith('tel:') && (
                          <svg
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            className="h-4 w-4 mr-2"
                          >
                            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                          </svg>
                        )}
                        {secondaryCTA.type === 'url' && secondaryCTA.url?.startsWith('mailto:') && (
                          <svg
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            className="h-4 w-4 mr-2"
                          >
                            <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                            <polyline points="22,6 12,13 2,6" />
                          </svg>
                        )}
                        {secondaryCTA.text}
                      </a>
                    </Button>
                  )}
                </div>
              </div>

              {/* Visual element */}
              {showVisualElement && contentLayout === 'split' && (
                <div className="order-1 lg:order-2">
                  <div className="relative aspect-square max-w-md mx-auto">
                    <div className="absolute -inset-6 rounded-[32px] bg-[radial-gradient(80%_60%_at_30%_20%,_rgba(107,196,65,0.2),transparent_60%)]" />
                    <div className="relative w-full h-full rounded-2xl bg-white border-2 border-border/50 flex items-center justify-center">
                      <div className="text-center text-foreground/40">
                        <div className="mb-3">{visualIcon}</div>
                        <div className="text-lg font-medium">{visualTitle}</div>
                        <div className="text-sm mt-1">{visualSubtitle}</div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
