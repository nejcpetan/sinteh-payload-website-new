import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'

function ShieldIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" {...props}>
      <path d="M12 3l7 3v6c0 5-3.5 7.5-7 9-3.5-1.5-7-4-7-9V6l7-3z" />
      <path d="M9 12l2 2 4-4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function CogIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" {...props}>
      <path d="M12 8a4 4 0 110 8 4 4 0 010-8z" />
      <path d="M19.4 15a7.97 7.97 0 00.1-6l2-1.2-2-3.5-2.3.8A8 8 0 008.7 5L6.4 4.2l-2 3.5 2 1.2a8 8 0 00-.1 6l-2 1.2 2 3.5 2.3-.8a8 8 0 006.5 0l2.3.8 2-3.5-2-1.2z" />
    </svg>
  )
}

function HeadsetIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" {...props}>
      <path d="M3 12a9 9 0 1118 0v4a2 2 0 01-2 2h-2v-6h4" strokeLinecap="round" />
      <path d="M7 18H5a2 2 0 01-2-2v-4" strokeLinecap="round" />
    </svg>
  )
}

const iconComponents = {
  shield: ShieldIcon,
  cog: CogIcon,
  headset: HeadsetIcon,
}

interface WhyTrustBlockProps {
  title: string
  image: {
    url: string
    alt?: string
  }
  reasons?: Array<{
    reason: string
  }>
  pillars?: Array<{
    title: string
    description: string
    icon: 'shield' | 'cog' | 'headset'
  }>
  buttonText?: string
  buttonLink?: string
}

export function WhyTrustBlock({ title, image, reasons, pillars, button }: WhyTrustBlockProps) {
  return (
    <section className="w-full bg-[#f6f8fa] text-[#0f1720]">
      <div className="relative mx-auto max-w-7xl container-px py-16 md:py-24">
        <div
          aria-hidden
          className="pointer-events-none absolute -bottom-10 left-0 right-0 h-32 bg-[radial-gradient(60%_40%_at_90%_80%,_rgba(107,196,65,0.12),transparent_60%)]"
        />
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="relative aspect-[3/4] w-full rounded-2xl overflow-hidden">
              {/* diagonal gradient frame */}
              <div
                aria-hidden
                className="absolute -inset-6 rounded-[28px] bg-[conic-gradient(from_140deg_at_20%_20%,_rgba(16,20,24,0.06),_transparent_40%)]"
              />
              <Image
                src={image.url}
                alt={image.alt || 'Why trust image'}
                fill
                className="object-cover"
              />
            </div>
          </div>
          <div>
            <h3 className="text-3xl md:text-4xl font-bold tracking-tight">{title}</h3>
            {reasons && reasons.length > 0 && (
              <ul className="mt-4 space-y-2 text-black/70 list-disc list-inside">
                {reasons.map((reasonItem, index) => (
                  <li key={index}>{reasonItem.reason}</li>
                ))}
              </ul>
            )}

            {/* pillars */}
            {pillars && pillars.length > 0 && (
              <div className="mt-6 grid sm:grid-cols-3 gap-3">
                {pillars.map((pillar, index) => {
                  const IconComponent = iconComponents[pillar.icon]
                  return (
                    <Card key={index} className="bg-white border-[#e5e9ee]">
                      <CardContent className="p-4">
                        <IconComponent className="h-5 w-5 text-brand" />
                        <div className="mt-2 text-sm font-medium">{pillar.title}</div>
                        <div className="text-xs text-black/60">{pillar.description}</div>
                      </CardContent>
                    </Card>
                  )
                })}
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
        </div>
      </div>
    </section>
  )
}
