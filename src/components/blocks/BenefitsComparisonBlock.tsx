interface Benefit {
  advantage: string
  description: string
  mGard: string
  electronic: string
}

interface SummaryCard {
  icon: 'shield' | 'clock' | 'users'
  title: string
  description: string
}

interface BenefitsComparisonBlockProps {
  badge?: string
  title: string
  subtitle?: string
  benefits: Benefit[]
  summaryCards: SummaryCard[]
  bottomCTA?: {
    title: string
    description: string
    primaryButtonText: string
    secondaryButtonText: string
  }
}

function ShieldIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" {...props}>
      <path d="M12 3l7 3v6c0 5-3.5 7.5-7 9-3.5-1.5-7-4-7-9V6l7-3z" />
      <path d="M9 12l2 2 4-4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function ClockIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" {...props}>
      <path d="M12 8v4l3 3" />
      <path
        d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20Z"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function UsersIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" {...props}>
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  )
}

const iconComponents = {
  shield: ShieldIcon,
  clock: ClockIcon,
  users: UsersIcon,
}

export function BenefitsComparisonBlock({
  badge,
  title,
  subtitle,
  benefits,
  summaryCards,
  bottomCTA,
}: BenefitsComparisonBlockProps) {
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

        {/* Comparison table */}
        <div className="overflow-hidden rounded-2xl bg-white border border-border/60 shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-surface/50">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">
                    Prednost
                  </th>
                  <th className="px-6 py-4 text-center text-sm font-semibold text-brand">
                    mGard (Mehanski)
                  </th>
                  <th className="px-6 py-4 text-center text-sm font-semibold text-foreground/60">
                    Elektronski sistemi
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/30">
                {benefits.map((benefit, index) => (
                  <tr key={index} className="hover:bg-surface/30 transition-colors duration-200">
                    <td className="px-6 py-4">
                      <div>
                        <div className="font-medium text-foreground mb-1">{benefit.advantage}</div>
                        <div className="text-sm text-foreground/70">{benefit.description}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <div className="flex items-center justify-center">
                        <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand/10 text-brand text-sm font-medium">
                          {benefit.mGard}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <div className="flex items-center justify-center">
                        <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-foreground/5 text-foreground/70 text-sm">
                          {benefit.electronic}
                        </span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Summary cards */}
        <div className="grid md:grid-cols-3 gap-6 mt-16">
          {summaryCards.map((card, index) => {
            const IconComponent = iconComponents[card.icon]
            return (
              <div
                key={index}
                className="rounded-2xl bg-white border border-border/60 p-6 text-center hover:shadow-lg transition-shadow duration-300"
              >
                <div className="w-16 h-16 rounded-full bg-brand/10 flex items-center justify-center mx-auto mb-4">
                  <IconComponent className="h-8 w-8 text-brand" />
                </div>
                <h3 className="text-lg font-bold text-foreground mb-2">{card.title}</h3>
                <p className="text-sm text-foreground/70">{card.description}</p>
              </div>
            )
          })}
        </div>

        {/* Bottom CTA */}
        {bottomCTA && (
          <div className="mt-16 text-center">
            <div className="rounded-2xl bg-white border border-border/60 p-8">
              <h3 className="text-2xl font-bold text-foreground mb-4">{bottomCTA.title}</h3>
              <p className="text-foreground/70 mb-6 max-w-2xl mx-auto">{bottomCTA.description}</p>
              <div className="flex flex-wrap justify-center gap-4">
                <a
                  href="#kontakt"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-brand text-white rounded-full font-medium hover:bg-brand-600 transition-colors duration-200"
                >
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    className="h-4 w-4"
                  >
                    <path d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                  {bottomCTA.primaryButtonText}
                </a>
                <a
                  href="#resources"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-surface text-foreground border border-border rounded-full font-medium hover:bg-surface/70 transition-colors duration-200"
                >
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    className="h-4 w-4"
                  >
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                    <polyline points="7,10 12,15 17,10" />
                    <line x1="12" y1="15" x2="12" y2="3" />
                  </svg>
                  {bottomCTA.secondaryButtonText}
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
