/**
 * UniversalHero Component - SINTEH PRO Component Library
 *
 * A highly flexible hero section component that consolidates multiple hero variants
 * into a single, powerful component. Perfect for landing pages, service pages,
 * and content introductions.
 *
 * KEY FEATURES:
 * - 4 distinct variants (standard, blog, contact, minimal)
 * - Flexible content alignment (left, center)
 * - Multiple background styles (gradient, pattern, solid, animated)
 * - Built-in CTA buttons with icons
 * - Benefits grid/list display
 * - Trust indicators and stats
 * - Contact methods integration
 * - Responsive image placeholders
 *
 * DESIGN PRINCIPLES:
 * - Mobile-first responsive design
 * - SINTEH PRO brand colors and typography
 * - Accessibility-compliant (WCAG 2.1)
 * - Performance optimized
 *
 * PERFECT FOR:
 * - Landing page headers
 * - Service page introductions
 * - Blog section headers
 * - Contact page headers
 * - Product introductions
 *
 * @example
 * <UniversalHero
 *   variant="standard"
 *   title="Industrial Automation Solutions"
 *   description="Professional automation services for modern industry"
 *   primaryCTA={{ text: "Get Quote", href: "/contact" }}
 *   benefits={[
 *     { title: "Expert Team", description: "30+ years experience" }
 *   ]}
 * />
 */

import { Button } from '@/components/ui/button'
import { getLinkHref } from '@/lib/linkUtils'

interface Benefit {
  title: string
  description: string
}

interface CTA {
  text: string
  href: string
  variant?: 'default' | 'outline'
  icon?: React.ReactNode
}

interface TrustIndicator {
  text: string
}

interface Stat {
  value: string
  label: string
}

interface ContactMethod {
  href: string
  icon: React.ReactNode
  title: string
  value: string
}

export interface UniversalHeroProps {
  // Layout variants
  variant?: 'standard' | 'blog' | 'contact' | 'minimal'

  // Core content
  badge?: string
  title: string
  subtitle?: string
  description: string

  // Benefits section
  benefits?: Benefit[]
  benefitsLayout?: 'grid' | 'list'

  // CTA section
  primaryCTA?: CTA
  secondaryCTA?: CTA
  ctaLayout?: 'horizontal' | 'vertical'

  // Trust section
  trustText?: string
  trustIndicators?: TrustIndicator[]

  // Stats section (for blog variant)
  stats?: Stat[]
  statsLayout?: 'horizontal' | 'compact'

  // Contact methods (for contact variant)
  contactMethods?: ContactMethod[]

  // Visual elements
  imageIcon?: React.ReactNode
  imageTitle?: string
  imageSubtitle?: string
  showImage?: boolean

  // Background options
  backgroundStyle?: 'gradient' | 'pattern' | 'solid' | 'animated'

  // Layout options
  contentAlignment?: 'left' | 'center'
  imagePosition?: 'left' | 'right'

  // Styling
  className?: string
}

export function UniversalHero({
  variant = 'standard',
  badge,
  title,
  subtitle,
  description,
  benefits = [],
  benefitsLayout = 'grid',
  primaryCTA,
  secondaryCTA,
  ctaLayout = 'horizontal',
  trustText,
  trustIndicators = [],
  stats = [],
  statsLayout = 'horizontal',
  contactMethods = [],
  imageIcon = (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      className="h-12 w-12"
    >
      <path d="M12 8a4 4 0 110 8 4 4 0 010-8z" />
      <path d="M19.4 15a7.97 7.97 0 00.1-6l2-1.2-2-3.5-2.3.8A8 8 0 008.7 5L6.4 4.2l-2 3.5 2 1.2a8 8 0 00-.1 6l-2 1.2 2 3.5 2.3-.8a8 8 0 006.5 0l2.3.8 2-3.5-2-1.2z" />
    </svg>
  ),
  imageTitle = 'SINTEH PRO',
  imageSubtitle,
  showImage = true,
  backgroundStyle = 'gradient',
  contentAlignment = 'left',
  imagePosition = 'right',
  className = '',
}: UniversalHeroProps) {
  // Background styles based on variant and backgroundStyle
  const getBackgroundElements = () => {
    if (variant === 'blog' && backgroundStyle === 'animated') {
      return (
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-10 left-10 w-32 h-32 border border-brand/20 rounded-full animate-pulse"></div>
          <div className="absolute top-32 right-20 w-24 h-24 border border-brand/15 rounded-full animate-pulse delay-1000"></div>
          <div className="absolute bottom-20 left-1/4 w-16 h-16 border border-brand/10 rounded-full animate-pulse delay-2000"></div>
          <div className="absolute bottom-32 right-1/3 w-20 h-20 border border-brand/25 rounded-full animate-pulse delay-500"></div>
        </div>
      )
    }

    if (backgroundStyle === 'gradient') {
      return (
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute inset-0 bg-[radial-gradient(90%_70%_at_20%_50%,rgba(107,196,65,0.12)_0%,rgba(107,196,65,0.06)_55%,transparent_80%)]" />
          <div className="absolute inset-0 bg-gradient-to-b from-white/20 via-transparent to-surface/30" />
        </div>
      )
    }

    return null
  }

  // Layout classes based on variant
  const getSectionClasses = () => {
    const baseClasses = 'relative overflow-hidden'

    switch (variant) {
      case 'blog':
        return `${baseClasses} bg-gradient-to-br from-surface via-background to-surface/50`
      case 'contact':
      case 'minimal':
        return `${baseClasses} bg-background`
      default:
        return `${baseClasses} bg-background`
    }
  }

  const getContainerClasses = () => {
    const basePadding =
      variant === 'blog' ? 'pt-12 md:pt-16 pb-8 md:pb-10' : 'pt-20 md:pt-28 pb-16 md:pb-20'
    return `relative mx-auto max-w-7xl container-px ${basePadding}`
  }

  const getContentLayout = () => {
    if (variant === 'contact') {
      return 'text-center max-w-2xl mx-auto'
    }

    if (variant === 'blog' || variant === 'minimal' || !showImage) {
      return contentAlignment === 'center' ? 'text-center max-w-4xl mx-auto' : 'max-w-4xl'
    }

    return `grid lg:grid-cols-2 gap-12 items-center`
  }

  const getContentOrder = () => {
    if (variant === 'blog' || variant === 'contact' || variant === 'minimal' || !showImage) {
      return ''
    }
    return imagePosition === 'left' ? 'order-2 lg:order-2' : 'order-2 lg:order-1'
  }

  const getImageOrder = () => {
    if (!showImage) return 'hidden'
    return imagePosition === 'left' ? 'order-1 lg:order-1' : 'order-1 lg:order-2'
  }

  return (
    <section className={`${getSectionClasses()} ${className}`}>
      {getBackgroundElements()}

      <div className={getContainerClasses()}>
        <div className={getContentLayout()}>
          {/* Content */}
          <div className={getContentOrder()}>
            {badge && (
              <div
                className={`inline-block rounded-full bg-brand/10 px-3 py-1 text-xs font-medium text-brand mb-4 ${variant === 'blog' ? 'bg-white border border-border/60 shadow-sm' : ''}`}
              >
                {variant === 'blog' && (
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    className="h-3 w-3 text-brand inline mr-2"
                  >
                    <path d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                  </svg>
                )}
                {badge}
              </div>
            )}

            <h1
              className={`font-extrabold tracking-tight leading-tight text-foreground ${
                variant === 'blog'
                  ? 'text-2xl md:text-3xl lg:text-4xl mb-2 max-w-4xl'
                  : variant === 'contact'
                    ? 'text-3xl md:text-4xl mb-4'
                    : 'text-4xl md:text-5xl lg:text-6xl'
              } ${contentAlignment === 'center' ? 'mx-auto' : ''}`}
            >
              {title}
            </h1>

            {subtitle && (
              <p
                className={`text-brand font-semibold ${
                  variant === 'blog'
                    ? 'text-lg md:text-xl mb-3 max-w-3xl'
                    : 'text-xl md:text-2xl mt-2 mb-6'
                } ${contentAlignment === 'center' ? 'mx-auto' : ''}`}
              >
                {subtitle}
              </p>
            )}

            <p
              className={`text-foreground/80 leading-relaxed ${
                variant === 'blog'
                  ? 'text-sm mb-6 max-w-2xl'
                  : variant === 'contact'
                    ? 'text-lg mb-6'
                    : 'text-lg mb-8'
              } ${contentAlignment === 'center' ? 'mx-auto' : ''}`}
            >
              {description}
            </p>

            {/* Benefits */}
            {benefits.length > 0 && (
              <div
                className={`mb-8 ${benefitsLayout === 'grid' ? 'grid sm:grid-cols-2 gap-4' : 'space-y-4'}`}
              >
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className="h-6 w-6 rounded-full bg-brand/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <div className="h-2 w-2 rounded-full bg-brand"></div>
                    </div>
                    <div>
                      <div className="font-semibold text-foreground">{benefit.title}</div>
                      <div className="text-sm text-foreground/70">{benefit.description}</div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* CTAs */}
            {(primaryCTA || secondaryCTA) && (
              <div
                className={`flex gap-4 mb-8 ${
                  ctaLayout === 'vertical' ? 'flex-col' : 'flex-wrap'
                } ${contentAlignment === 'center' ? 'justify-center' : ''}`}
              >
                {primaryCTA && (
                  <Button
                    size={variant === 'blog' ? 'sm' : 'lg'}
                    variant={primaryCTA.variant || 'default'}
                    asChild
                  >
                    <a href={getLinkHref(primaryCTA)}>
                      {primaryCTA.icon}
                      {primaryCTA.text}
                    </a>
                  </Button>
                )}

                {secondaryCTA && (
                  <Button
                    size={variant === 'blog' ? 'sm' : 'lg'}
                    variant={secondaryCTA.variant || 'outline'}
                    asChild
                  >
                    <a href={getLinkHref(secondaryCTA)}>
                      {secondaryCTA.icon}
                      {secondaryCTA.text}
                    </a>
                  </Button>
                )}
              </div>
            )}

            {/* Stats (for blog variant) */}
            {variant === 'blog' && stats.length > 0 && (
              <div
                className={`mb-6 ${
                  statsLayout === 'compact'
                    ? 'flex flex-wrap justify-center gap-4'
                    : 'grid grid-cols-2 md:grid-cols-4 gap-4 text-center'
                }`}
              >
                {stats.map((stat, index) => (
                  <div key={index} className="text-center">
                    <div className="text-lg font-bold text-brand">{stat.value}</div>
                    <div className="text-xs text-foreground/70">{stat.label}</div>
                  </div>
                ))}
              </div>
            )}

            {/* Contact Methods (for contact variant) */}
            {variant === 'contact' && contactMethods.length > 0 && (
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
                    </div>
                  </a>
                ))}
              </div>
            )}

            {/* Trust indicators */}
            {(trustText || trustIndicators.length > 0) && (
              <div className="mt-8 pt-8 border-t border-border/30">
                {trustText && <p className="text-sm text-foreground/60 mb-3">{trustText}</p>}
                {trustIndicators.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {trustIndicators.map((indicator, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 text-xs rounded-full border border-border bg-surface"
                      >
                        {indicator.text}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Blog trust indicators - Always centered for blog variant */}
            {variant === 'blog' && (
              <div className="text-center">
                <div className="flex flex-wrap justify-center gap-2">
                  <span className="px-3 py-1 text-xs rounded-full border border-border bg-white text-foreground/80">
                    ABB Partner
                  </span>
                  <span className="px-3 py-1 text-xs rounded-full border border-border bg-white text-foreground/80">
                    Schneider Electric
                  </span>
                  <span className="px-3 py-1 text-xs rounded-full border border-border bg-white text-foreground/80">
                    Fortress sistemi
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* Image placeholder */}
          {showImage && variant !== 'blog' && variant !== 'contact' && variant !== 'minimal' && (
            <div className={getImageOrder()}>
              <div className="relative aspect-square w-full max-w-lg mx-auto">
                {/* Decorative glow */}
                <div
                  aria-hidden
                  className="absolute -inset-8 rounded-[32px] bg-[radial-gradient(80%_60%_at_30%_20%,_rgba(107,196,65,0.25),transparent_60%)]"
                />

                {/* Image placeholder */}
                <div className="relative w-full h-full rounded-2xl bg-surface border-2 border-border/50 flex items-center justify-center overflow-hidden">
                  <div className="text-center text-foreground/40">
                    <div className="mb-2">{imageIcon}</div>
                    <div className="text-sm font-medium">{imageTitle}</div>
                    {imageSubtitle && <div className="text-xs mt-1">{imageSubtitle}</div>}
                  </div>

                  {/* Subtle pattern overlay */}
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,transparent_40%,rgba(107,196,65,0.05)_100%)]"></div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
