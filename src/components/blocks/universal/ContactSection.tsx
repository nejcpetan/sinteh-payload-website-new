/**
 * ContactSection Component - SINTEH PRO Component Library
 *
 * A comprehensive contact component that combines contact forms with company
 * information, benefits, and contact methods. Optimized for lead generation
 * and customer engagement across multiple layout variants.
 *
 * KEY FEATURES:
 * - 5 layout variants (form-only, info-only, split, hero-style, compact)
 * - Integrated contact forms with project type selection
 * - Company benefits and trust indicators
 * - Multiple contact methods display
 * - Flexible positioning (left/right form placement)
 * - Background style options
 *
 * CONVERSION OPTIMIZED:
 * - Clear value propositions
 * - Trust-building elements
 * - Multiple contact options
 * - Mobile-optimized forms
 * - Professional presentation
 *
 * PERFECT FOR:
 * - Contact pages
 * - Service inquiry sections
 * - Lead generation forms
 * - Support sections
 * - Quote request forms
 *
 * @example
 * <ContactSection
 *   variant="split"
 *   title="Get Professional Consultation"
 *   formTitle="Project Inquiry"
 *   benefits={[
 *     "Free initial consultation",
 *     "Expert technical advice",
 *     "24/7 emergency support"
 *   ]}
 *   showBudget={true}
 * />
 */

import { ContactFormBlock } from '@/components/blocks/ContactFormBlock'
import { ContactInfoBlock } from '@/components/blocks/ContactInfoBlock'

interface ContactMethod {
  href: string
  icon: React.ReactNode
  title: string
  value: string
  description?: string
}

export interface ContactSectionProps {
  // Layout variants
  variant?: 'form-only' | 'info-only' | 'split' | 'hero-style' | 'compact'

  // Core content
  title?: string
  subtitle?: string
  description?: string
  badge?: string

  // Contact form props
  formTitle?: string
  formDescription?: string
  projectTypeOptions?: Array<{
    value: string
    label: string
  }>
  showBudget?: boolean
  showUrgency?: boolean

  // Contact info props
  infoTitle?: string
  benefits?: string[]

  // Contact methods (for hero-style variant)
  contactMethods?: ContactMethod[]

  // Background options
  backgroundStyle?: 'surface' | 'background' | 'white' | 'gradient'

  // Layout options
  formPosition?: 'left' | 'right'

  // Show/hide elements
  showContactMethods?: boolean
  showBenefits?: boolean

  // Styling
  className?: string
}

export function ContactSection({
  variant = 'split',
  title = 'Contact Us',
  subtitle,
  description = 'Fill out the form and our expert team will respond as soon as possible.',
  badge,
  formTitle = 'Get in Touch',
  formDescription = 'Fill out the form and our expert team will respond as soon as possible.',
  projectTypeOptions,
  showBudget = false,
  showUrgency = false,
  infoTitle = 'Why Choose Us?',
  benefits = [
    '30+ years of experience in industrial automation',
    'Certified partners of leading manufacturers',
    'Complete support from design to service',
    'Local support in Slovenian language',
  ],
  contactMethods = [
    {
      href: 'tel:+38634263646',
      icon: (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          className="h-5 w-5 text-brand"
        >
          <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
        </svg>
      ),
      title: 'Phone',
      value: '+386 (3) 426 36 46',
      description: 'Mon-Fri: 7:00-16:00, 24/7 emergency support',
    },
    {
      href: 'mailto:info@sinteh.pro',
      icon: (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          className="h-5 w-5 text-brand"
        >
          <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
          <polyline points="22,6 12,13 2,6" />
        </svg>
      ),
      title: 'Email',
      value: 'info@sinteh.pro',
      description: 'We respond within 24 hours',
    },
    {
      href: '#',
      icon: (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          className="h-5 w-5 text-brand"
        >
          <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0Z" />
          <circle cx="12" cy="10" r="3" />
        </svg>
      ),
      title: 'Location',
      value: 'Celje, Slovenia',
      description: 'Visit by appointment',
    },
  ],
  backgroundStyle = 'surface',
  formPosition = 'left',
  showContactMethods = true,
  showBenefits = true,
  className = '',
}: ContactSectionProps) {
  const getSectionClasses = () => {
    const baseClasses = 'w-full text-foreground'

    switch (backgroundStyle) {
      case 'surface':
        return `${baseClasses} bg-surface`
      case 'background':
        return `${baseClasses} bg-background`
      case 'white':
        return `${baseClasses} bg-white`
      case 'gradient':
        return `${baseClasses} bg-gradient-to-br from-surface via-background to-surface/50`
      default:
        return `${baseClasses} bg-surface`
    }
  }

  const getContainerClasses = () => {
    if (variant === 'compact') {
      return 'mx-auto max-w-7xl container-px py-8 md:py-12'
    }
    return 'mx-auto max-w-7xl container-px py-16 md:py-24'
  }

  const renderBackgroundElements = () => {
    if (variant === 'hero-style' || backgroundStyle === 'gradient') {
      return (
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute inset-0 bg-[radial-gradient(80%_50%_at_50%_100%,rgba(107,196,65,0.15)_0%,transparent_60%)]" />
          <div className="absolute inset-0 bg-gradient-to-b from-white/20 via-transparent to-white/10" />
        </div>
      )
    }
    return null
  }

  const renderHeader = () => {
    if (variant === 'form-only' || variant === 'info-only') return null

    return (
      <div
        className={`text-center max-w-3xl mx-auto mb-12 ${variant === 'hero-style' ? 'mb-8' : ''}`}
      >
        {badge && (
          <span className="inline-block rounded-full bg-brand/10 px-3 py-1 text-xs font-medium text-brand mb-4">
            {badge}
          </span>
        )}
        <h2
          className={`font-extrabold tracking-tight text-foreground mb-4 ${
            variant === 'hero-style' ? 'text-3xl md:text-4xl' : 'text-3xl md:text-4xl'
          }`}
        >
          {title}
        </h2>
        {subtitle && (
          <p className="text-xl md:text-2xl text-brand font-semibold mb-4">{subtitle}</p>
        )}
        <p className="text-lg text-foreground/70">{description}</p>
      </div>
    )
  }

  const renderContactMethods = () => {
    if (!showContactMethods || variant !== 'hero-style') return null

    return (
      <div className="grid sm:grid-cols-3 gap-4 mb-8">
        {contactMethods.map((method, index) => (
          <a
            key={index}
            href={method.href}
            className={`flex items-center gap-3 p-4 border border-border rounded-xl hover:border-brand/50 hover:shadow-md transition-all ${
              method.href === '#' ? 'bg-surface cursor-default' : 'bg-white'
            }`}
          >
            <div className="w-10 h-10 rounded-lg bg-brand/10 flex items-center justify-center">
              {method.icon}
            </div>
            <div className="text-left">
              <div className="font-semibold text-foreground">{method.title}</div>
              <div
                className={`text-sm ${method.href === '#' ? 'text-foreground/70' : 'text-brand'}`}
              >
                {method.value}
              </div>
              {method.description && (
                <div className="text-xs text-foreground/60 mt-1">{method.description}</div>
              )}
            </div>
          </a>
        ))}
      </div>
    )
  }

  const renderFormOnly = () => {
    return (
      <div className="max-w-2xl mx-auto">
        <ContactFormBlock
          title={formTitle}
          description={formDescription}
          projectTypeOptions={projectTypeOptions}
          showBudget={showBudget}
          showUrgency={showUrgency}
        />
      </div>
    )
  }

  const renderInfoOnly = () => {
    return (
      <div className="max-w-2xl mx-auto">
        <ContactInfoBlock title={infoTitle} benefits={benefits} />
      </div>
    )
  }

  const renderSplit = () => {
    const formContent = (
      <ContactFormBlock
        title={formTitle}
        description={formDescription}
        projectTypeOptions={projectTypeOptions}
        showBudget={showBudget}
        showUrgency={showUrgency}
      />
    )

    const infoContent = <ContactInfoBlock title={infoTitle} benefits={benefits} />

    return (
      <div className="grid lg:grid-cols-2 gap-12">
        {formPosition === 'left' ? (
          <>
            {formContent}
            {infoContent}
          </>
        ) : (
          <>
            {infoContent}
            {formContent}
          </>
        )}
      </div>
    )
  }

  const renderHeroStyle = () => {
    return (
      <div className="text-center max-w-2xl mx-auto">
        <div className="rounded-2xl bg-white/95 backdrop-blur-sm ring-1 ring-border shadow-lg p-6 md:p-8">
          <ContactFormBlock
            title=""
            description=""
            className="bg-transparent border-0 p-0"
            projectTypeOptions={projectTypeOptions}
            showBudget={showBudget}
            showUrgency={showUrgency}
          />

          <div className="mt-6 flex flex-col items-center gap-2 text-xs text-foreground/70 md:flex-row md:justify-center md:gap-6">
            <a href="tel:+38634263646" className="hover:underline">
              Tel: +386 (3) 426 36 46
            </a>
            <span className="hidden md:inline opacity-40">•</span>
            <a href="mailto:info@sinteh.pro" className="hover:underline">
              Email: info@sinteh.pro
            </a>
          </div>
        </div>
      </div>
    )
  }

  const renderCompact = () => {
    return (
      <div className="grid md:grid-cols-2 gap-8">
        <div className="space-y-6">
          <div>
            <h3 className="text-xl font-bold text-foreground mb-4">Quick Contact</h3>
            <div className="space-y-3">
              {contactMethods.slice(0, 2).map((method, index) => (
                <a
                  key={index}
                  href={method.href}
                  className="flex items-center gap-3 p-3 rounded-lg bg-white border border-border hover:border-brand/50 transition-colors"
                >
                  <div className="p-2 rounded-lg bg-brand/10">{method.icon}</div>
                  <div>
                    <div className="font-medium text-foreground">{method.title}</div>
                    <div className="text-sm text-brand">{method.value}</div>
                  </div>
                </a>
              ))}
            </div>
          </div>

          {showBenefits && (
            <div>
              <h4 className="font-semibold text-foreground mb-3">Why Choose Us?</h4>
              <ul className="space-y-2">
                {benefits.slice(0, 3).map((benefit, index) => (
                  <li key={index} className="flex items-start gap-2 text-sm text-foreground/80">
                    <div className="h-2 w-2 rounded-full bg-brand flex-shrink-0 mt-2"></div>
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        <ContactFormBlock
          title="Send Message"
          description="Quick inquiry form"
          className="bg-white"
          projectTypeOptions={projectTypeOptions}
          showBudget={showBudget}
          showUrgency={showUrgency}
        />
      </div>
    )
  }

  const renderContent = () => {
    switch (variant) {
      case 'form-only':
        return renderFormOnly()
      case 'info-only':
        return renderInfoOnly()
      case 'split':
        return renderSplit()
      case 'hero-style':
        return renderHeroStyle()
      case 'compact':
        return renderCompact()
      default:
        return renderSplit()
    }
  }

  return (
    <section className={`relative overflow-hidden ${getSectionClasses()} ${className}`}>
      {renderBackgroundElements()}

      <div className={`relative ${getContainerClasses()}`}>
        {renderHeader()}
        {renderContactMethods()}
        {renderContent()}
      </div>
    </section>
  )
}
