import Image from 'next/image'
import { Button } from '@/components/ui/button'

interface HeroBlockProps {
  title: string
  subtitle?: string
  backgroundImage: {
    url: string
    alt?: string
  }
  ctaButtons?: Array<{
    label: string
    type: 'page' | 'url' | 'anchor'
    page?: {
      slug: string
    }
    url?: string
    anchor?: string
    variant: 'contrast' | 'outlineLight'
  }>
  bottomText?: string
}

export function HeroBlock({
  title,
  subtitle,
  backgroundImage,
  ctaButtons,
  bottomText,
}: HeroBlockProps) {
  return (
    <section className="relative overflow-hidden">
      {/* Background image with overlays */}
      <div className="absolute inset-0">
        <Image
          src={backgroundImage.url}
          alt={backgroundImage.alt || 'Hero background'}
          fill
          className="object-cover"
          priority
        />
        {/* Light theme overlay - green gradient and subtle darkening */}
        <div className="absolute inset-0 bg-[radial-gradient(90%_70%_at_10%_50%,rgba(107,196,65,0.4)_0%,rgba(107,196,65,0.15)_55%,transparent_80%)]" />
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-black/30" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/10 to-black/30" />
      </div>

      {/* Content container */}
      <div className="relative mx-auto max-w-7xl container-px pt-20 md:pt-28 pb-20">
        <div className="max-w-3xl rounded-2xl bg-white/90 backdrop-blur-sm border border-gray-200/80 shadow-xl p-6 md:p-8">
          {/* Main title */}
          <h1 className="mt-3 text-4xl md:text-6xl font-bold tracking-tight leading-tight text-gray-900">
            {title}
          </h1>

          {/* Subtitle */}
          {subtitle && (
            <p className="mt-4 text-gray-700 text-lg md:text-xl leading-relaxed">{subtitle}</p>
          )}

          {/* CTA Buttons */}
          {ctaButtons && ctaButtons.length > 0 && (
            <div className="mt-8 flex flex-wrap gap-3">
              {ctaButtons.map((button, index) => {
                const getHref = () => {
                  switch (button.type) {
                    case 'page':
                      return button.page?.slug
                        ? `/${button.page.slug === '/' ? '' : button.page.slug}`
                        : '#'
                    case 'url':
                      return button.url || '#'
                    case 'anchor':
                      return button.anchor || '#'
                    default:
                      return '#'
                  }
                }

                const href = getHref()
                const isExternal = button.type === 'url' && button.url?.startsWith('http')

                return (
                  <Button
                    key={index}
                    size="lg"
                    variant={button.variant}
                    asChild
                    className="shadow-md hover:shadow-lg transition-all duration-200 font-medium"
                  >
                    <a
                      href={href}
                      target={isExternal ? '_blank' : undefined}
                      rel={isExternal ? 'noopener noreferrer' : undefined}
                    >
                      {button.label}
                    </a>
                  </Button>
                )
              })}
            </div>
          )}

          {/* Bottom text */}
          {bottomText && <p className="mt-6 text-sm text-gray-600 font-medium">{bottomText}</p>}
        </div>
      </div>
    </section>
  )
}
