import Image from 'next/image'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

function CheckIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" {...props}>
      <path
        fillRule="evenodd"
        d="M16.707 5.293a1 1 0 0 1 0 1.414l-7.25 7.25a1 1 0 0 1-1.414 0l-3-3a1 1 0 1 1 1.414-1.414l2.293 2.293 6.543-6.543a1 1 0 0 1 1.414 0z"
        clipRule="evenodd"
      />
    </svg>
  )
}

interface ServicesBlockProps {
  badge?: string
  title: string
  subtitle?: string
  services: Array<{
    title: string
    description?: string
    image: {
      url: string
      alt?: string
    }
    features?: Array<{
      feature: string
    }>
    button?: {
      text: string
      type: 'page' | 'url' | 'anchor'
      page?: {
        slug: string
      }
      url?: string
      anchor?: string
    }
  }>
}

export function ServicesBlock({ badge, title, subtitle, services }: ServicesBlockProps) {
  return (
    <section className="w-full bg-white text-[#0f1720]">
      <div className="mx-auto max-w-7xl container-px py-16 md:py-24">
        <div className="max-w-2xl mb-8">
          {badge && (
            <span className="inline-block rounded-full bg-[#eef3f7] px-3 py-1 text-xs font-medium">
              {badge}
            </span>
          )}
          <h2 className="mt-3 text-3xl md:text-4xl font-extrabold tracking-tight">{title}</h2>
          {subtitle && <p className="mt-2 text-sm text-black/60">{subtitle}</p>}
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {services.map((service, i) => (
            <Card
              key={i}
              className="group overflow-hidden bg-white border-border/60 shadow-sm hover:shadow-lg transition-all hover:-translate-y-0.5 focus-within:-translate-y-0.5 ring-1 ring-transparent hover:ring-brand/25"
            >
              <CardHeader className="pb-2">
                <CardTitle className="text-[18px] font-semibold tracking-tight">
                  {service.title}
                </CardTitle>
                {service.description && (
                  <p className="mt-1 text-xs text-black/60">{service.description}</p>
                )}
              </CardHeader>
              <CardContent>
                <div className="relative aspect-[16/9] w-full rounded-xl overflow-hidden">
                  {/* subtle decorative glow */}
                  <div
                    aria-hidden
                    className="absolute -inset-4 rounded-[20px] bg-[radial-gradient(60%_45%_at_20%_10%,_rgba(107,196,65,0.18),transparent_60%)]"
                  />
                  <Image
                    src={service.image.url}
                    alt={service.image.alt || service.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                  />
                </div>
                {service.features && service.features.length > 0 && (
                  <ul className="mt-4 space-y-2">
                    {service.features.map((featureItem, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-sm text-black/70">
                        <CheckIcon className="mt-[2px] h-4 w-4 text-brand" />
                        <span>{featureItem.feature}</span>
                      </li>
                    ))}
                  </ul>
                )}
                {service.button && (
                  <div className="mt-5 flex items-center justify-end">
                    <Button size="sm" variant="default" asChild>
                      <a
                        href={
                          service.button.type === 'page'
                            ? `/${service.button.page?.slug === '/' ? '' : service.button.page?.slug || ''}`
                            : service.button.type === 'url'
                              ? service.button.url || '#'
                              : service.button.anchor || '#kontakt'
                        }
                        aria-label={`Odkrij ${service.title}`}
                        target={
                          service.button.type === 'url' && service.button.url?.startsWith('http')
                            ? '_blank'
                            : undefined
                        }
                        rel={
                          service.button.type === 'url' && service.button.url?.startsWith('http')
                            ? 'noopener noreferrer'
                            : undefined
                        }
                      >
                        {service.button.text}
                      </a>
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
