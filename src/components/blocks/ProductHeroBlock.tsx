import { Button } from '@/components/ui/button'

interface ProductHeroBlockProps {
  badge?: string
  title: string
  subtitle?: string
  description?: string
  backgroundImage?: {
    url: string
    alt?: string
  }
  keyBenefits?: Array<{
    title: string
    description: string
  }>
  ctaButtons?: Array<{
    label: string
    type: 'page' | 'url' | 'anchor'
    page?: { slug: string }
    url?: string
    anchor?: string
    variant?: 'default' | 'secondary' | 'outline' | 'ghost'
  }>
}

export function ProductHeroBlock({
  badge,
  title,
  subtitle,
  description,
  backgroundImage,
  keyBenefits,
  ctaButtons,
}: ProductHeroBlockProps) {
  return (
    <section className="relative overflow-hidden bg-background">
      {/* Background gradients */}
      <div className="pointer-events-none absolute inset-0">
        {/* Left radial SINTEH green wash */}
        <div className="absolute inset-0 bg-[radial-gradient(90%_70%_at_10%_50%,rgba(107,196,65,0.12)_0%,rgba(107,196,65,0.08)_55%,transparent_80%)]" />
        {/* Subtle vertical gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-white/20 via-transparent to-surface/30" />
      </div>

      <div className="relative mx-auto max-w-7xl container-px pt-20 md:pt-28 pb-16 md:pb-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="order-2 lg:order-1">
            {badge && (
              <div className="inline-block rounded-full bg-brand/10 px-3 py-1 text-xs font-medium text-brand mb-4">
                {badge}
              </div>
            )}

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight text-foreground">
              {title}
            </h1>

            {subtitle && (
              <p className="text-xl md:text-2xl text-brand font-semibold mt-2 mb-6">{subtitle}</p>
            )}

            {description && (
              <p className="text-lg text-foreground/80 mb-8 leading-relaxed">{description}</p>
            )}

            {/* Key benefits */}
            {keyBenefits && keyBenefits.length > 0 && (
              <div className="grid sm:grid-cols-2 gap-4 mb-8">
                {keyBenefits.map((benefit, index) => (
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
            {ctaButtons && ctaButtons.length > 0 && (
              <div className="flex flex-wrap gap-4">
                {ctaButtons.map((button, index) => {
                  let href = '#'
                  if (button.type === 'page' && button.page?.slug) {
                    href = `/${button.page.slug}`
                  } else if (button.type === 'url' && button.url) {
                    href = button.url
                  } else if (button.type === 'anchor' && button.anchor) {
                    href = `#${button.anchor}`
                  }

                  return (
                    <Button key={index} size="lg" variant={button.variant || 'default'} asChild>
                      <a href={href}>{button.label}</a>
                    </Button>
                  )
                })}
              </div>
            )}
          </div>

          {/* Product Image */}
          <div className="order-1 lg:order-2">
            <div className="relative aspect-square w-full max-w-lg mx-auto">
              {/* Decorative glow */}
              <div
                aria-hidden
                className="absolute -inset-8 rounded-[32px] bg-[radial-gradient(80%_60%_at_30%_20%,_rgba(107,196,65,0.25),transparent_60%)]"
              />

              {/* Image container */}
              <div className="relative w-full h-full rounded-2xl bg-surface border-2 border-border/50 flex items-center justify-center overflow-hidden">
                {backgroundImage?.url ? (
                  <img
                    src={backgroundImage.url}
                    alt={backgroundImage.alt || title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="text-center text-foreground/40">
                    <div className="text-4xl mb-2">🔐</div>
                    <div className="text-sm font-medium">Product Image</div>
                    <div className="text-xs mt-1">Image placeholder</div>
                  </div>
                )}

                {/* Subtle pattern overlay */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,transparent_40%,rgba(107,196,65,0.05)_100%)]"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
