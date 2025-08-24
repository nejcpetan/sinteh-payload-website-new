interface ContactInfoBlockProps {
  badge?: string
  title: string
  subtitle?: string
  contactMethods?: Array<{
    title: string
    email: string
    phone: string
    description: string
    hours: string
  }>
}

export function ContactInfoBlock({
  badge,
  title,
  subtitle,
  contactMethods = [],
}: ContactInfoBlockProps) {
  return (
    <section className="w-full bg-surface text-foreground">
      <div className="mx-auto max-w-7xl container-px py-16 md:py-24">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            {badge && (
              <span className="inline-block rounded-full bg-brand/10 px-3 py-1 text-xs font-medium text-brand mb-4">
                {badge}
              </span>
            )}
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-4">{title}</h2>
            {subtitle && <p className="text-lg text-foreground/70">{subtitle}</p>}
          </div>

          {/* Contact Methods */}
          {contactMethods.length > 0 && (
            <div className="space-y-6">
              {contactMethods.map((method, index) => (
                <div
                  key={index}
                  className="bg-white rounded-2xl border p-6 hover:shadow-lg transition-shadow duration-300"
                >
                  <h3 className="text-xl font-bold text-foreground mb-3">{method.title}</h3>
                  <p className="text-sm text-foreground/70 mb-4">{method.description}</p>

                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-brand/10 flex items-center justify-center">
                        <svg
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          className="h-4 w-4 text-brand"
                        >
                          <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                          <polyline points="22,6 12,13 2,6" />
                        </svg>
                      </div>
                      <a
                        href={`mailto:${method.email}`}
                        className="text-brand hover:underline font-medium"
                      >
                        {method.email}
                      </a>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-brand/10 flex items-center justify-center">
                        <svg
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          className="h-4 w-4 text-brand"
                        >
                          <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                        </svg>
                      </div>
                      <a
                        href={`tel:${method.phone.replace(/\s/g, '')}`}
                        className="text-brand hover:underline font-medium"
                      >
                        {method.phone}
                      </a>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-brand/10 flex items-center justify-center">
                        <svg
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          className="h-4 w-4 text-brand"
                        >
                          <path d="M12 8v4l3 3" />
                          <path
                            d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20Z"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </div>
                      <span className="text-foreground/70 text-sm">{method.hours}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
