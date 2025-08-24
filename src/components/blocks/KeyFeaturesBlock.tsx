import { Card, CardContent } from '@/components/ui/card'

// SVG Icons for features
function MechanicalIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" {...props}>
      <circle cx="12" cy="12" r="3" />
      <path d="M12 1v6m0 6v6" />
      <path d="m21 12-6-3v6l6-3Z" />
      <path d="m3 12 6-3v6l-6-3Z" />
      <path d="m16.24 7.76-4.24 4.24" />
      <path d="m7.76 16.24 4.24-4.24" />
      <path d="m16.24 16.24-4.24-4.24" />
      <path d="m7.76 7.76 4.24 4.24" />
    </svg>
  )
}

function ShieldIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" {...props}>
      <path d="M12 3l7 3v6c0 5-3.5 7.5-7 9-3.5-1.5-7-4-7-9V6l7-3z" />
      <path d="M9 12l2 2 4-4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function ModularIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" {...props}>
      <rect x="3" y="3" width="7" height="7" rx="1" />
      <rect x="14" y="3" width="7" height="7" rx="1" />
      <rect x="14" y="14" width="7" height="7" rx="1" />
      <rect x="3" y="14" width="7" height="7" rx="1" />
    </svg>
  )
}

function KeyIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" {...props}>
      <circle cx="7.5" cy="15.5" r="5.5" />
      <path d="m21 2-9.6 9.6" />
      <path d="m15.5 7.5 3 3L22 7l-3-3" />
    </svg>
  )
}

function TemperatureIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" {...props}>
      <path d="M14 4v10.54a4 4 0 1 1-4 0V4a2 2 0 0 1 4 0Z" />
      <path d="M12 18a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z" />
      <path d="M12 9v5" />
    </svg>
  )
}

function RetrofitIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" {...props}>
      <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
    </svg>
  )
}

interface Feature {
  icon: 'mechanical' | 'shield' | 'retrofit' | 'modular' | 'temperature' | 'key'
  title: string
  description: string
}

interface KeyFeaturesBlockProps {
  badge?: string
  title: string
  subtitle?: string
  features: Feature[]
  bottomHighlight?: {
    title: string
    description: string
  }
}

const iconComponents = {
  mechanical: MechanicalIcon,
  shield: ShieldIcon,
  retrofit: RetrofitIcon,
  modular: ModularIcon,
  temperature: TemperatureIcon,
  key: KeyIcon,
}

export function KeyFeaturesBlock({
  badge,
  title,
  subtitle,
  features,
  bottomHighlight,
}: KeyFeaturesBlockProps) {
  return (
    <section className="w-full bg-surface text-foreground">
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

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => {
            const IconComponent = iconComponents[feature.icon]
            return (
              <Card
                key={index}
                className="group relative overflow-hidden bg-white/80 border border-border/60 hover:bg-white hover:shadow-lg hover:border-brand/30 transition-all duration-300 hover:-translate-y-1"
              >
                {/* Subtle gradient background on hover */}
                <div className="absolute inset-0 bg-[radial-gradient(65%_50%_at_20%_10%,_rgba(107,196,65,0.08),transparent_60%)] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                <CardContent className="relative p-6">
                  <div className="flex items-start gap-4">
                    <div className="p-3 rounded-xl bg-brand/10 group-hover:bg-brand/20 transition-colors duration-300">
                      <IconComponent className="h-6 w-6 text-brand" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-foreground mb-2 group-hover:text-brand transition-colors duration-300">
                        {feature.title}
                      </h3>
                      <p className="text-sm text-foreground/70 leading-relaxed">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Bottom highlight section */}
        {bottomHighlight && (
          <div className="mt-16 rounded-2xl bg-white border border-border/60 p-6 md:p-8 text-center">
            <h3 className="text-xl font-bold text-foreground mb-3">{bottomHighlight.title}</h3>
            <p className="text-foreground/70 max-w-2xl mx-auto">{bottomHighlight.description}</p>
          </div>
        )}
      </div>
    </section>
  )
}
