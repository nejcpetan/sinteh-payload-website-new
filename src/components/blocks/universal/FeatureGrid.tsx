/**
 * FeatureGrid Component - SINTEH PRO Component Library
 *
 * A versatile grid component for showcasing features, capabilities, services,
 * and applications. Consolidates multiple feature display patterns into one
 * highly flexible component with extensive customization options.
 *
 * KEY FEATURES:
 * - 5 layout variants (standard, capabilities, applications, compact, detailed)
 * - Flexible grid layouts (2, 3, 4 columns)
 * - Multiple card styles (elevated, bordered, minimal, gradient)
 * - Hover effects (lift, glow, scale, none)
 * - Icons, badges, stats, and CTAs
 * - Process steps integration
 * - Bottom statistics section
 *
 * DESIGN EXCELLENCE:
 * - Consistent SINTEH PRO branding
 * - Smooth animations and transitions
 * - Mobile-responsive layouts
 * - Accessibility optimized
 * - Performance focused
 *
 * PERFECT FOR:
 * - Service feature listings
 * - Product capabilities
 * - Application showcases
 * - Technology overviews
 * - Process explanations
 *
 * @example
 * <FeatureGrid
 *   variant="standard"
 *   title="Our Services"
 *   features={[
 *     {
 *       icon: <ServiceIcon />,
 *       title: "System Integration",
 *       description: "Complete automation solutions",
 *       details: ["PLC Programming", "HMI Design", "Network Setup"]
 *     }
 *   ]}
 *   columns={3}
 *   showCTAs={true}
 * />
 */

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { getLinkHref } from '@/lib/linkUtils'

export interface Feature {
  icon: React.ReactNode
  title: string
  description: string
  details?: string[]
  badge?: string
  link?: {
    type: 'page' | 'post' | 'url' | 'anchor'
    page?: { slug: string }
    post?: { slug: string }
    url?: string
    anchor?: string
  }
  ctaText?: string
  technologies?: string[]
  stats?: {
    value: string
    label: string
  }
  contact?: {
    phone?: string
    email?: string
  }
  // Additional fields for service capabilities
  features?: string[]
  certifications?: string[]
  // Additional fields for applications
  applications?: string[]
}

export interface FeatureGridProps {
  // Layout variants
  variant?: 'standard' | 'capabilities' | 'applications' | 'compact' | 'detailed'

  // Core content
  title: string
  subtitle?: string
  description: string
  badge?: string

  // Features array
  features: Feature[]

  // Layout options
  columns?: 2 | 3 | 4
  layout?: 'card' | 'compact' | 'list'

  // Card styling
  cardStyle?: 'elevated' | 'bordered' | 'minimal' | 'gradient'
  hoverEffect?: 'lift' | 'glow' | 'scale' | 'none'

  // Background options
  backgroundStyle?: 'surface' | 'background' | 'white' | 'gradient'

  // Show/hide elements
  showBadges?: boolean
  showStats?: boolean
  showCTAs?: boolean
  showDetails?: boolean

  // Additional sections (for capabilities variant)
  processSteps?: Array<{
    step: string
    title: string
    description: string
    duration?: string
  }>

  bottomStats?: Array<{
    value: string
    label: string
  }>

  // Styling
  className?: string
}

export function FeatureGrid({
  variant = 'standard',
  title,
  subtitle,
  description,
  badge,
  features,
  columns = 3,
  layout = 'card',
  cardStyle = 'elevated',
  hoverEffect = 'lift',
  backgroundStyle = 'surface',
  showBadges = true,
  showStats = true,
  showCTAs = true,
  showDetails = true,
  processSteps = [],
  bottomStats = [],
  className = '',
}: FeatureGridProps) {
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

  const getGridClasses = () => {
    const gridClasses = {
      2: 'md:grid-cols-2',
      3: 'md:grid-cols-2 lg:grid-cols-3',
      4: 'sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4',
    }

    if (variant === 'capabilities') {
      return 'md:grid-cols-2 lg:grid-cols-4'
    }

    return `grid ${gridClasses[columns]} gap-6`
  }

  const getCardClasses = () => {
    let baseClasses = 'group relative overflow-hidden'

    // Card style
    switch (cardStyle) {
      case 'elevated':
        baseClasses += ' bg-white/90 border border-border/60 shadow-sm'
        break
      case 'bordered':
        baseClasses += ' bg-white border border-border/60'
        break
      case 'minimal':
        baseClasses += ' bg-surface/40'
        break
      case 'gradient':
        baseClasses += ' bg-gradient-to-br from-white to-surface/50 border border-border/60'
        break
      default:
        baseClasses += ' bg-white/90 border border-border/60'
    }

    // Hover effects
    switch (hoverEffect) {
      case 'lift':
        baseClasses +=
          ' hover:shadow-xl hover:border-brand/30 transition-all duration-300 hover:-translate-y-2'
        break
      case 'glow':
        baseClasses +=
          ' hover:shadow-lg hover:shadow-brand/20 hover:border-brand/30 transition-all duration-300'
        break
      case 'scale':
        baseClasses += ' hover:scale-105 hover:shadow-lg transition-all duration-300'
        break
      case 'none':
        baseClasses += ' transition-colors duration-300'
        break
      default:
        baseClasses +=
          ' hover:shadow-xl hover:border-brand/30 transition-all duration-300 hover:-translate-y-2'
    }

    return baseClasses
  }

  const renderFeatureCard = (feature: Feature, index: number) => {
    if (layout === 'compact') {
      return (
        <div
          key={index}
          className="p-6 rounded-xl bg-surface/40 hover:bg-surface/60 transition-colors duration-200"
        >
          <div className="text-3xl mb-4">{feature.icon}</div>
          <h4 className="font-bold text-foreground mb-2">{feature.title}</h4>
          <p className="text-sm text-foreground/70 mb-4">{feature.description}</p>

          {/* Render different content based on feature type */}
          {feature.technologies && (
            <div className="space-y-2">
              <span className="text-xs font-medium text-foreground/60">Technologies:</span>
              <div className="flex flex-wrap gap-1">
                {feature.technologies.map((tech, techIndex) => (
                  <span
                    key={techIndex}
                    className="px-2 py-1 bg-white text-foreground/60 text-xs rounded-full"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          )}

          {feature.features && (
            <div className="space-y-2">
              <span className="text-xs font-medium text-foreground/60">Features:</span>
              <ul className="space-y-1">
                {feature.features.map((item, itemIndex) => (
                  <li key={itemIndex} className="flex items-start gap-2 text-sm text-foreground/70">
                    <div className="h-1.5 w-1.5 rounded-full bg-brand/60 flex-shrink-0 mt-2"></div>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {feature.applications && (
            <div className="space-y-2">
              <span className="text-xs font-medium text-foreground/60">Applications:</span>
              <ul className="space-y-1">
                {feature.applications.map((app, appIndex) => (
                  <li key={appIndex} className="flex items-start gap-2 text-sm text-foreground/70">
                    <div className="h-1.5 w-1.5 rounded-full bg-brand/60 flex-shrink-0 mt-2"></div>
                    <span>{app}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )
    }

    return (
      <Card key={index} className={getCardClasses()}>
        {/* Badge */}
        {showBadges && feature.badge && (
          <div className="absolute top-4 right-4 z-10">
            <span className="px-2 py-1 text-xs font-medium bg-brand text-white rounded-full">
              {feature.badge}
            </span>
          </div>
        )}

        {/* Background gradient on hover */}
        <div className="absolute inset-0 bg-[radial-gradient(65%_50%_at_20%_10%,_rgba(107,196,65,0.06),transparent_60%)] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        <CardHeader className={variant === 'capabilities' ? 'pb-4' : 'pb-4'}>
          <div
            className={
              variant === 'applications' ? 'flex items-center gap-4 mb-4' : 'flex items-start gap-4'
            }
          >
            <div
              className={`p-3 rounded-xl bg-brand/10 group-hover:bg-brand/20 transition-colors duration-300 flex-shrink-0 ${variant === 'applications' ? 'text-4xl' : ''}`}
            >
              {feature.icon}
            </div>
            <div className="flex-1">
              <CardTitle
                className={`font-bold text-foreground group-hover:text-brand transition-colors duration-300 mb-2 ${variant === 'applications' ? 'text-lg' : 'text-lg'}`}
              >
                {feature.title}
              </CardTitle>
              <p
                className={`text-foreground/70 leading-relaxed ${variant === 'applications' ? 'text-sm' : 'text-sm'}`}
              >
                {feature.description}
              </p>
              {variant === 'applications' && feature.applications && (
                <p className="text-sm text-brand font-medium mt-1">{feature.applications[0]}</p>
              )}
            </div>
          </div>
        </CardHeader>

        {((showDetails && (feature.details || feature.features || feature.applications)) ||
          showStats ||
          showCTAs) && (
          <CardContent className="pt-0">
            {/* Details list */}
            {showDetails && feature.details && feature.details.length > 0 && (
              <ul className="space-y-2 mb-4">
                {feature.details.map((detail, detailIndex) => (
                  <li
                    key={detailIndex}
                    className="flex items-start gap-2 text-sm text-foreground/70"
                  >
                    <div className="h-1.5 w-1.5 rounded-full bg-brand/60 flex-shrink-0 mt-2"></div>
                    <span>{detail}</span>
                  </li>
                ))}
              </ul>
            )}

            {/* Features list (for capabilities variant) */}
            {showDetails && variant === 'capabilities' && feature.features && (
              <ul className="space-y-2 mb-4">
                {feature.features.map((featureItem, featureIndex) => (
                  <li
                    key={featureIndex}
                    className="flex items-start gap-2 text-sm text-foreground/70"
                  >
                    <div className="h-1.5 w-1.5 rounded-full bg-brand/60 flex-shrink-0 mt-2"></div>
                    <span>{featureItem}</span>
                  </li>
                ))}
              </ul>
            )}

            {/* Applications list (for applications variant) */}
            {showDetails &&
              variant === 'applications' &&
              feature.applications &&
              feature.applications.length > 1 && (
                <ul className="space-y-2 mb-4">
                  {feature.applications.slice(1).map((app, appIndex) => (
                    <li
                      key={appIndex}
                      className="flex items-start gap-2 text-sm text-foreground/70"
                    >
                      <div className="h-1.5 w-1.5 rounded-full bg-brand/60 flex-shrink-0 mt-2"></div>
                      <span>{app}</span>
                    </li>
                  ))}
                </ul>
              )}

            {/* Stats */}
            {showStats && feature.stats && (
              <div className="pt-4 border-t border-border/30 mb-4">
                <div className="text-center">
                  <div className="text-2xl font-extrabold text-brand">{feature.stats.value}</div>
                  <div className="text-xs text-foreground/60">{feature.stats.label}</div>
                </div>
              </div>
            )}

            {/* Certifications (for service brands) */}
            {feature.certifications && (
              <div className="pt-4 border-t border-border/30 mb-4">
                <h5 className="font-semibold text-foreground mb-2">Certifications:</h5>
                <div className="flex flex-wrap gap-2">
                  {feature.certifications.map((cert, certIndex) => (
                    <span
                      key={certIndex}
                      className="px-3 py-1 bg-brand/10 text-brand text-sm rounded-full font-medium"
                    >
                      {cert}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Contact info */}
            {feature.contact && (
              <div className="pt-4 border-t border-border/30 mb-4">
                {feature.contact.phone && (
                  <div className="text-center">
                    <div className="text-sm text-foreground/60 mb-1">Contact:</div>
                    <a
                      href={`tel:${feature.contact.phone.replace(/\s/g, '')}`}
                      className="text-brand font-bold hover:underline"
                    >
                      {feature.contact.phone}
                    </a>
                  </div>
                )}
              </div>
            )}

            {/* CTA Button */}
            {showCTAs && feature.link && (
              <Button size="sm" variant="default" asChild className="w-full">
                <a href={getLinkHref(feature.link)}>{feature.ctaText || 'Learn More'}</a>
              </Button>
            )}
          </CardContent>
        )}
      </Card>
    )
  }

  return (
    <section className={`${getSectionClasses()} ${className}`}>
      <div className="mx-auto max-w-7xl container-px py-16 md:py-24">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          {badge && (
            <span className="inline-block rounded-full bg-brand/10 px-3 py-1 text-xs font-medium text-brand mb-4">
              {badge}
            </span>
          )}
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-4">{title}</h2>
          {subtitle && (
            <p className="text-xl md:text-2xl text-brand font-semibold mb-4">{subtitle}</p>
          )}
          <p className="text-lg text-foreground/70">{description}</p>
        </div>

        {/* Features Grid */}
        <div className={`${getGridClasses()} ${variant === 'capabilities' ? 'mb-16' : ''}`}>
          {features.map((feature, index) => renderFeatureCard(feature, index))}
        </div>

        {/* Process Steps (for capabilities variant) */}
        {variant === 'capabilities' && processSteps.length > 0 && (
          <div className="bg-surface rounded-2xl border border-border/60 p-6 md:p-8">
            <div className="text-center mb-12">
              <h3 className="text-2xl font-bold text-foreground mb-4">Our Process</h3>
              <p className="text-foreground/70">
                Systematic approach ensures quality and fast problem resolution
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {processSteps.map((step, index) => (
                <div
                  key={index}
                  className="relative p-6 bg-white rounded-xl border border-border/60 hover:shadow-lg transition-shadow duration-300"
                >
                  {/* Step number */}
                  <div className="absolute -top-3 -left-3 w-8 h-8 bg-brand text-white rounded-full flex items-center justify-center text-sm font-bold">
                    {step.step}
                  </div>

                  <div className="pt-2">
                    <div className="flex justify-between items-start mb-3">
                      <h4 className="font-bold text-foreground">{step.title}</h4>
                      {step.duration && (
                        <span className="text-xs text-brand font-medium bg-brand/10 px-2 py-1 rounded-full">
                          {step.duration}
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-foreground/70">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Bottom Stats */}
            {bottomStats.length > 0 && (
              <div className="mt-12 pt-8 border-t border-border/30">
                <div className="grid sm:grid-cols-4 gap-8 text-center">
                  {bottomStats.map((stat, index) => (
                    <div key={index}>
                      <div className="text-3xl font-extrabold text-brand mb-2">{stat.value}</div>
                      <div className="text-sm text-foreground/70">{stat.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Bottom highlight (for applications variant) */}
        {variant === 'applications' && (
          <div className="grid sm:grid-cols-3 gap-8 mb-16">
            <div className="text-center">
              <div className="text-4xl font-extrabold text-brand mb-2">500+</div>
              <div className="text-sm text-foreground/70">Successful implementations</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-extrabold text-brand mb-2">15</div>
              <div className="text-sm text-foreground/70">Different industries</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-extrabold text-brand mb-2">99.9%</div>
              <div className="text-sm text-foreground/70">Reliability</div>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
