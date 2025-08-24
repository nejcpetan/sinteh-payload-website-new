interface ContactHeroBlockProps {
  title: string
  subtitle?: string
  quickContactMethods?: Array<{
    type: 'phone' | 'email' | 'location'
    label: string
    value: string
    link: string
  }>
}

export function ContactHeroBlock({
  title,
  subtitle,
  quickContactMethods = [],
}: ContactHeroBlockProps) {
  const getIcon = (type: string) => {
    switch (type) {
      case 'phone':
        return (
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            className="h-5 w-5 text-brand"
          >
            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
          </svg>
        )
      case 'email':
        return (
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            className="h-5 w-5 text-brand"
          >
            <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
            <polyline points="22,6 12,13 2,6" />
          </svg>
        )
      case 'location':
        return (
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            className="h-5 w-5 text-brand"
          >
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0Z" />
            <circle cx="12" cy="10" r="3" />
          </svg>
        )
      default:
        return null
    }
  }

  return (
    <section className="relative overflow-hidden bg-background">
      {/* Background gradients */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(90%_70%_at_20%_50%,rgba(107,196,65,0.12)_0%,rgba(107,196,65,0.06)_55%,transparent_80%)]" />
        <div className="absolute inset-0 bg-gradient-to-b from-white/20 via-transparent to-surface/30" />
      </div>

      <div className="relative mx-auto max-w-7xl container-px pt-16 md:pt-20 pb-12">
        <div className="text-center max-w-2xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight leading-tight text-foreground mb-4">
            {title}
          </h1>

          {subtitle && (
            <p
              className="text-lg text-foreground/70 mb-6"
              dangerouslySetInnerHTML={{ __html: subtitle }}
            />
          )}

          {/* Quick Contact Methods */}
          {quickContactMethods.length > 0 && (
            <div className="grid sm:grid-cols-3 gap-4">
              {quickContactMethods.map((method, index) => {
                const isClickable = method.type === 'phone' || method.type === 'email'
                const Component = isClickable ? 'a' : 'div'
                const props = isClickable ? { href: method.link } : {}

                return (
                  <Component
                    key={index}
                    {...props}
                    className={`flex items-center gap-3 p-4 bg-white border rounded-xl transition-all ${
                      isClickable ? 'hover:border-brand/50 hover:shadow-md cursor-pointer' : ''
                    }`}
                  >
                    <div className="w-10 h-10 rounded-lg bg-brand/10 flex items-center justify-center">
                      {getIcon(method.type)}
                    </div>
                    <div className="text-left">
                      <div className="font-semibold text-foreground">{method.label}</div>
                      <div
                        className={`text-sm ${isClickable ? 'text-brand' : 'text-foreground/70'}`}
                      >
                        {method.value}
                      </div>
                    </div>
                  </Component>
                )
              })}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
