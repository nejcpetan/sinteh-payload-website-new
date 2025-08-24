interface SpecificationItem {
  label: string
  value: string
}

interface SpecificationCategory {
  category: string
  items: SpecificationItem[]
}

interface CertificationBadge {
  name: string
  description: string
}

interface SpecificationsBlockProps {
  badge?: string
  title: string
  subtitle?: string
  specifications: SpecificationCategory[]
  certificationBadges?: CertificationBadge[]
  additionalInfo?: {
    title: string
    description: string
    details: Array<{
      label: string
      value: string
    }>
  }
}

export function SpecificationsBlock({
  badge,
  title,
  subtitle,
  specifications,
  certificationBadges,
  additionalInfo,
}: SpecificationsBlockProps) {
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

        <div className="grid md:grid-cols-2 gap-8">
          {specifications.map((spec, index) => (
            <div
              key={index}
              className="rounded-2xl bg-white border border-border/60 p-6 hover:shadow-lg transition-shadow duration-300"
            >
              <h3 className="text-xl font-bold text-foreground mb-6 flex items-center gap-3">
                <div className="h-2 w-2 rounded-full bg-brand"></div>
                {spec.category}
              </h3>

              <div className="space-y-3">
                {spec.items.map((item, itemIndex) => (
                  <div
                    key={itemIndex}
                    className="flex justify-between items-start py-2 border-b border-border/30 last:border-b-0"
                  >
                    <span className="text-foreground/70 text-sm font-medium flex-1">
                      {item.label}
                    </span>
                    <span className="text-foreground font-semibold text-sm text-right ml-4 flex-1">
                      {item.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Certification badges */}
        {certificationBadges && certificationBadges.length > 0 && (
          <div className="mt-16 text-center">
            <h3 className="text-xl font-bold text-foreground mb-8">Certificiranje in odobritve</h3>
            <div className="flex flex-wrap justify-center items-center gap-8">
              {certificationBadges.map((badge, index) => (
                <div key={index} className="flex flex-col items-center">
                  <div className="w-20 h-20 rounded-full bg-brand/10 border-2 border-brand/30 flex items-center justify-center mb-2">
                    <span className="text-brand font-bold text-sm">{badge.name}</span>
                  </div>
                  <span className="text-xs text-foreground/70">{badge.description}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Additional info */}
        {additionalInfo && (
          <div className="mt-12 rounded-2xl bg-white border border-border/60 p-6 md:p-8">
            <div className="flex items-start gap-4">
              <div className="p-3 rounded-xl bg-brand/10">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  className="h-6 w-6 text-brand"
                >
                  <path d="M12 8v4l3 3" />
                  <path
                    d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20Z"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <div>
                <h4 className="text-lg font-semibold text-foreground mb-2">
                  {additionalInfo.title}
                </h4>
                <p className="text-foreground/70 mb-4">{additionalInfo.description}</p>
                <div className="grid sm:grid-cols-2 gap-4 text-sm">
                  {additionalInfo.details.map((detail, index) => (
                    <div key={index}>
                      <span className="font-medium text-foreground">{detail.label}:</span>
                      <span className="text-foreground/70 ml-2">{detail.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
