interface ContactFAQBlockProps {
  badge?: string
  title: string
  subtitle?: string
  faqs?: Array<{
    question: string
    answer: string
  }>
}

export function ContactFAQBlock({ badge, title, subtitle, faqs = [] }: ContactFAQBlockProps) {
  return (
    <section className="w-full bg-surface text-foreground">
      <div className="mx-auto max-w-7xl container-px py-16 md:py-24">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          {badge && (
            <span className="inline-block rounded-full bg-brand/10 px-3 py-1 text-xs font-medium text-brand mb-4">
              {badge}
            </span>
          )}
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-4">{title}</h2>
          {subtitle && <p className="text-lg text-foreground/70">{subtitle}</p>}
        </div>

        {/* FAQ Grid */}
        {faqs.length > 0 && (
          <div className="grid md:grid-cols-2 gap-6">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-white rounded-2xl border p-6">
                <h4 className="text-lg font-bold text-foreground mb-3">{faq.question}</h4>
                <p className="text-sm text-foreground/70">{faq.answer}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
