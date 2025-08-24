import { Card, CardContent } from '@/components/ui/card'

// Industry Icons
function OilGasIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" {...props}>
      <path d="M2 17h20v2a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-2Z" />
      <path d="M14 2a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2" />
      <path d="M10 2a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2" />
      <path d="M3 2h18v6H3Z" />
      <circle cx="12" cy="11" r="2" />
      <path d="m12 13 4 1" />
      <path d="m12 13-4 1" />
    </svg>
  )
}

function EnergyIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" {...props}>
      <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8Z" />
    </svg>
  )
}

function PharmIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" {...props}>
      <path d="M19 12h-2m-3 0h-2m-3 0H7" />
      <path d="M12 8v8" />
      <path d="M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Z" />
    </svg>
  )
}

function ManufacturingIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" {...props}>
      <path d="M8 21h8" />
      <path d="M12 17v4" />
      <path d="M4 17h16v-7L12 3 4 10v7Z" />
      <path d="M9 9h6v4H9Z" />
    </svg>
  )
}

function AtexIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" {...props}>
      <path d="M12 2v4" />
      <path d="m16.24 7.76-2.12 2.12" />
      <path d="M20 12h-4" />
      <path d="m16.24 16.24-2.12-2.12" />
      <path d="M12 16v4" />
      <path d="m7.76 16.24 2.12-2.12" />
      <path d="M8 12H4" />
      <path d="m7.76 7.76 2.12 2.12" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  )
}

function WaterIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" {...props}>
      <path d="M7 16.3c2.2 0 4-1.83 4-4.05 0-1.16-.57-2.26-1.71-3.19S7.29 6.75 7 5.3c-.29 1.45-1.14 2.84-2.29 3.76S3 11.1 3 12.25c0 2.22 1.8 4.05 4 4.05Z" />
      <path d="M12.56 6.6A10.97 10.97 0 0 0 14 3.02c.5 2.5 2.04 4.6 4.14 5.5a11.12 11.12 0 0 1 1.86 1.48c.72.65 1 1.47 1 2.25 0 .61-.13 1.2-.36 1.73" />
      <path d="M16.85 14.87c.47-.58.77-1.26.77-2.11 0-.32-.04-.64-.14-.94" />
    </svg>
  )
}

interface Application {
  icon: 'oilgas' | 'energy' | 'pharm' | 'manufacturing' | 'atex' | 'water'
  title: string
  description: string
  details: string[]
}

interface ApplicationsBlockProps {
  badge?: string
  title: string
  subtitle?: string
  applications: Application[]
  stats?: Array<{
    number: string
    label: string
  }>
  caseStudy?: {
    title: string
    description: string
    stats: Array<{
      label: string
      value: string
    }>
    image?: {
      url: string
      alt?: string
    }
  }
}

const iconComponents = {
  oilgas: OilGasIcon,
  energy: EnergyIcon,
  pharm: PharmIcon,
  manufacturing: ManufacturingIcon,
  atex: AtexIcon,
  water: WaterIcon,
}

export function ApplicationsBlock({
  badge,
  title,
  subtitle,
  applications,
  stats,
  caseStudy,
}: ApplicationsBlockProps) {
  return (
    <section className="w-full bg-background text-foreground">
      <div className="mx-auto max-w-7xl container-px py-16 md:py-24">
        <div className="text-center max-w-3xl mx-auto mb-12">
          {badge && (
            <span className="inline-block rounded-full bg-brand/10 px-3 py-1 text-xs font-medium text-brand">
              {badge}
            </span>
          )}
          <h2 className="mt-3 text-3xl md:text-4xl font-extrabold tracking-tight">{title}</h2>
          {subtitle && <p className="mt-4 text-lg text-foreground/70">{subtitle}</p>}
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {applications.map((app, index) => {
            const IconComponent = iconComponents[app.icon]
            return (
              <Card
                key={index}
                className="group relative overflow-hidden bg-white/90 border border-border/60 hover:bg-white hover:shadow-xl hover:border-brand/30 transition-all duration-300 hover:-translate-y-2"
              >
                {/* Background gradient on hover */}
                <div className="absolute inset-0 bg-[radial-gradient(65%_50%_at_20%_10%,_rgba(107,196,65,0.06),transparent_60%)] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                <CardContent className="relative p-6">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="p-3 rounded-xl bg-brand/10 group-hover:bg-brand/20 transition-colors duration-300">
                      <IconComponent className="h-8 w-8 text-brand" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-foreground group-hover:text-brand transition-colors duration-300">
                        {app.title}
                      </h3>
                      <p className="text-sm text-brand font-medium">{app.description}</p>
                    </div>
                  </div>

                  <ul className="space-y-2">
                    {app.details.map((detail, detailIndex) => (
                      <li
                        key={detailIndex}
                        className="flex items-start gap-2 text-sm text-foreground/70"
                      >
                        <div className="h-1.5 w-1.5 rounded-full bg-brand/60 flex-shrink-0 mt-2"></div>
                        <span>{detail}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Industry stats */}
        {stats && stats.length > 0 && (
          <div className="grid sm:grid-cols-3 gap-8 mb-16">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl font-extrabold text-brand mb-2">{stat.number}</div>
                <div className="text-sm text-foreground/70">{stat.label}</div>
              </div>
            ))}
          </div>
        )}

        {/* Case study highlight */}
        {caseStudy && (
          <div className="rounded-2xl bg-surface border border-border/60 p-6 md:p-8">
            <div className="grid lg:grid-cols-2 gap-8 items-center">
              <div>
                <h3 className="text-xl font-bold text-foreground mb-3">{caseStudy.title}</h3>
                <p className="text-foreground/70 mb-4">{caseStudy.description}</p>
                <div className="grid sm:grid-cols-2 gap-4 text-sm">
                  {caseStudy.stats.map((stat, index) => (
                    <div key={index}>
                      <span className="font-medium text-foreground">{stat.label}:</span>
                      <span className="text-brand font-bold ml-2">{stat.value}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="relative aspect-video rounded-xl bg-surface/80 border border-border/40 flex items-center justify-center">
                {caseStudy.image?.url ? (
                  <img
                    src={caseStudy.image.url}
                    alt={caseStudy.image.alt || caseStudy.title}
                    className="w-full h-full object-cover rounded-xl"
                  />
                ) : (
                  <div className="text-center text-foreground/40">
                    <div className="text-3xl mb-2">🏭</div>
                    <div className="text-sm font-medium">Case Study Image</div>
                    <div className="text-xs mt-1">Implementation example</div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
