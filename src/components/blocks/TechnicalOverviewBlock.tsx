interface ProcessStep {
  title: string
  description: string
}

interface TechnicalBenefit {
  title: string
  description: string
}

interface TechnicalOverviewBlockProps {
  badge?: string
  title: string
  description: string
  technicalImage?: {
    url: string
    alt?: string
  }
  processSteps: ProcessStep[]
  technicalBenefits: TechnicalBenefit[]
}

export function TechnicalOverviewBlock({
  badge,
  title,
  description,
  technicalImage,
  processSteps,
  technicalBenefits,
}: TechnicalOverviewBlockProps) {
  return (
    <section className="w-full bg-background text-foreground">
      <div className="mx-auto max-w-7xl container-px py-16 md:py-24">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Technical Image */}
          <div className="order-2 lg:order-1">
            <div className="relative aspect-[4/3] w-full rounded-2xl overflow-hidden">
              {/* Decorative glow */}
              <div
                aria-hidden
                className="absolute -inset-6 rounded-[28px] bg-[radial-gradient(80%_60%_at_30%_20%,_rgba(107,196,65,0.18),transparent_60%)]"
              />

              {/* Image container */}
              <div className="relative w-full h-full bg-surface border-2 border-border/50 flex items-center justify-center">
                {technicalImage?.url ? (
                  <img
                    src={technicalImage.url}
                    alt={technicalImage.alt || title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="text-center text-foreground/40">
                    <div className="text-5xl mb-3">⚙️</div>
                    <div className="text-base font-medium">Trapped Key Sequence</div>
                    <div className="text-sm mt-1">Technical diagram placeholder</div>
                  </div>
                )}

                {/* Technical pattern overlay */}
                <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(107,196,65,0.03)_25%,rgba(107,196,65,0.03)_50%,transparent_50%,transparent_75%,rgba(107,196,65,0.03)_75%)] bg-[length:20px_20px]"></div>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="order-1 lg:order-2">
            {badge && (
              <span className="inline-block rounded-full bg-brand/10 px-3 py-1 text-xs font-medium text-brand mb-4">
                {badge}
              </span>
            )}

            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-6">{title}</h2>

            <div className="prose prose-lg max-w-none text-foreground/80 mb-8">
              <p className="mb-6 leading-relaxed">{description}</p>
            </div>

            {/* Process steps */}
            <div className="space-y-4 mb-8">
              {processSteps.map((step, index) => (
                <div key={index} className="flex items-start gap-4">
                  <div className="h-8 w-8 rounded-full bg-brand text-white flex items-center justify-center text-sm font-bold flex-shrink-0 mt-1">
                    {index + 1}
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-1">{step.title}</h4>
                    <p className="text-sm text-foreground/70">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Technical benefits */}
            <div className="grid sm:grid-cols-2 gap-4">
              {technicalBenefits.map((benefit, index) => (
                <div key={index} className="rounded-xl bg-surface/60 p-4 border border-border/40">
                  <h5 className="font-semibold text-foreground mb-2">{benefit.title}</h5>
                  <p className="text-sm text-foreground/70">{benefit.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
