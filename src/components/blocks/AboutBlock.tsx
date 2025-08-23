import Image from 'next/image'
import { Button } from '@/components/ui/button'

interface AboutBlockProps {
  title: string
  description: string
  image: {
    url: string
    alt?: string
  }
  badges?: Array<{
    text: string
  }>
  stats?: Array<{
    number: string
    label: string
  }>
  process?: Array<{
    step: string
  }>
  calloutText?: string
  button?: {
    text: string
    type: 'page' | 'url' | 'anchor'
    page?: {
      slug: string
    }
    url?: string
    anchor?: string
  }
}

export function AboutBlock({
  title,
  description,
  image,
  badges,
  stats,
  process,
  calloutText,
  button,
}: AboutBlockProps) {
  return (
    <section className="w-full bg-[#f6f8fa] text-[#0f1720]">
      <div className="relative mx-auto max-w-7xl container-px py-16 md:py-24">
        <div
          aria-hidden
          className="pointer-events-none absolute -top-10 left-0 right-0 h-32 bg-[radial-gradient(60%_40%_at_10%_20%,_rgba(107,196,65,0.15),transparent_60%)]"
        />
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="order-2 lg:order-1">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight">{title}</h2>
            <p className="mt-4 text-black/70">{description}</p>

            {/* badges */}
            {badges && badges.length > 0 && (
              <div className="mt-6 flex flex-wrap gap-2">
                {badges.map((badge, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 text-xs rounded-full border border-[#e5e9ee] bg-white"
                  >
                    {badge.text}
                  </span>
                ))}
              </div>
            )}

            {/* stats */}
            {stats && stats.length > 0 && (
              <div className="mt-8 grid grid-cols-3 gap-4">
                {stats.map((stat, index) => (
                  <div key={index}>
                    <div className="text-3xl font-extrabold tracking-tight text-[#0f1720]">
                      {stat.number}
                    </div>
                    <div className="text-xs text-black/60">{stat.label}</div>
                  </div>
                ))}
              </div>
            )}

            {/* process timeline */}
            {process && process.length > 0 && (
              <div className="mt-8 hidden md:grid grid-cols-4 gap-3">
                {process.map((step, idx) => (
                  <div key={idx} className="flex items-center gap-3">
                    <div className="h-7 w-7 shrink-0 rounded-full bg-brand text-white grid place-items-center text-xs font-semibold">
                      {idx + 1}
                    </div>
                    <div className="text-xs text-black/70">{step.step}</div>
                  </div>
                ))}
              </div>
            )}

            {/* compact callout */}
            {calloutText && (
              <div className="mt-6 rounded-2xl border border-[#e5e9ee] bg-white p-4 shadow-sm">
                <p className="text-sm text-[#0f1720]">{calloutText}</p>
              </div>
            )}

            {button && (
              <div className="mt-6">
                <Button variant="secondary" asChild>
                  <a
                    href={
                      button.type === 'page'
                        ? `/${button.page?.slug === '/' ? '' : button.page?.slug || ''}`
                        : button.type === 'url'
                          ? button.url || '#'
                          : button.anchor || '#'
                    }
                    target={
                      button.type === 'url' && button.url?.startsWith('http') ? '_blank' : undefined
                    }
                    rel={
                      button.type === 'url' && button.url?.startsWith('http')
                        ? 'noopener noreferrer'
                        : undefined
                    }
                  >
                    {button.text}
                  </a>
                </Button>
              </div>
            )}
          </div>
          <div className="order-1 lg:order-2">
            <div className="relative aspect-[3/4] w-full rounded-2xl overflow-hidden">
              {/* decorative glow */}
              <div
                aria-hidden
                className="absolute -inset-6 rounded-[28px] bg-[radial-gradient(80%_60%_at_30%_20%,_rgba(107,196,65,0.28),transparent_60%)]"
              />
              <Image
                src={image.url}
                alt={image.alt || 'About image'}
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
