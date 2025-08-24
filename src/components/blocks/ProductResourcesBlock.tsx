'use client'

import { Card, CardContent } from '@/components/ui/card'

interface Resource {
  title: string
  description: string
  fileType: string
  fileSize: string
  icon: string
  category: string
  downloadUrl?: string
}

interface QuickAccessItem {
  name: string
  fileInfo: string
  downloadUrl?: string
}

interface ProductResourcesBlockProps {
  badge?: string
  title: string
  subtitle?: string
  resources: Resource[]
  quickAccessItems?: QuickAccessItem[]
  contactSection?: {
    title: string
    description: string
    phone?: string
    email?: string
  }
  newsletterSection?: {
    title: string
    description: string
    privacyText?: string
  }
}

export function ProductResourcesBlock({
  badge,
  title,
  subtitle,
  resources,
  quickAccessItems,
  contactSection,
  newsletterSection,
}: ProductResourcesBlockProps) {
  return (
    <section id="resources" className="w-full bg-surface text-foreground">
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

        {/* Resources grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-16">
          {resources.map((resource, index) => (
            <Card
              key={index}
              className="group relative overflow-hidden bg-white/90 border border-border/60 hover:bg-white hover:shadow-xl hover:border-brand/30 transition-all duration-300 hover:-translate-y-1 cursor-pointer"
            >
              {/* Background gradient on hover */}
              <div className="absolute inset-0 bg-[radial-gradient(65%_50%_at_20%_10%,_rgba(107,196,65,0.06),transparent_60%)] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              <CardContent className="relative p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="text-3xl">{resource.icon}</div>
                  <div className="text-right">
                    <span className="inline-block px-2 py-1 bg-brand/10 text-brand text-xs rounded-full font-medium">
                      {resource.fileType}
                    </span>
                    <div className="text-xs text-foreground/60 mt-1">{resource.fileSize}</div>
                  </div>
                </div>

                <h3 className="text-lg font-bold text-foreground mb-2 group-hover:text-brand transition-colors duration-300">
                  {resource.title}
                </h3>

                <p className="text-sm text-foreground/70 mb-4 leading-relaxed">
                  {resource.description}
                </p>

                <div className="flex items-center justify-between">
                  <span className="text-xs text-foreground/60 bg-surface/60 px-2 py-1 rounded-full">
                    {resource.category}
                  </span>

                  <button
                    onClick={() =>
                      resource.downloadUrl && window.open(resource.downloadUrl, '_blank')
                    }
                    className="flex items-center gap-1 text-brand hover:text-brand-600 transition-colors duration-200 text-sm font-medium"
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
                    Prenesi
                  </button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Quick access section */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {quickAccessItems && quickAccessItems.length > 0 && (
            <div className="rounded-2xl bg-white border border-border/60 p-6">
              <h3 className="text-xl font-bold text-foreground mb-4 flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-brand/10 flex items-center justify-center">
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
                Hiter dostop
              </h3>
              <div className="space-y-3">
                {quickAccessItems.map((item, index) => (
                  <a
                    key={index}
                    href={item.downloadUrl || '#'}
                    className="flex items-center justify-between p-3 rounded-lg bg-surface/60 hover:bg-surface transition-colors duration-200"
                  >
                    <span className="font-medium text-foreground">{item.name}</span>
                    <span className="text-brand text-sm">{item.fileInfo}</span>
                  </a>
                ))}
              </div>
            </div>
          )}

          {contactSection && (
            <div className="rounded-2xl bg-white border border-border/60 p-6">
              <h3 className="text-xl font-bold text-foreground mb-4 flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-brand/10 flex items-center justify-center">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    className="h-4 w-4 text-brand"
                  >
                    <path d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                </div>
                {contactSection.title}
              </h3>
              <p className="text-foreground/70 mb-4">{contactSection.description}</p>
              <div className="space-y-3">
                {contactSection.email && (
                  <a
                    href={`mailto:${contactSection.email}`}
                    className="flex items-center gap-2 text-brand hover:text-brand-600 transition-colors duration-200"
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
                    <span className="font-medium">Kontaktirajte našo tehnično službo</span>
                  </a>
                )}
                {contactSection.phone && (
                  <a
                    href={`tel:${contactSection.phone}`}
                    className="flex items-center gap-2 text-brand hover:text-brand-600 transition-colors duration-200"
                  >
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      className="h-4 w-4"
                    >
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                    </svg>
                    <span className="font-medium">{contactSection.phone}</span>
                  </a>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Newsletter signup */}
        {newsletterSection && (
          <div className="rounded-2xl bg-white border border-border/60 p-8 text-center">
            <h3 className="text-xl font-bold text-foreground mb-4">{newsletterSection.title}</h3>
            <p className="text-foreground/70 mb-6 max-w-2xl mx-auto">
              {newsletterSection.description}
            </p>
            <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Vaš e-naslov"
                className="flex-1 px-4 py-2 border border-border rounded-full focus:outline-none focus:ring-2 focus:ring-brand/50 focus:border-brand"
              />
              <button className="px-6 py-2 bg-brand text-white rounded-full font-medium hover:bg-brand-600 transition-colors duration-200">
                Prijavite se
              </button>
            </div>
            {newsletterSection.privacyText && (
              <p className="text-xs text-foreground/60 mt-3">{newsletterSection.privacyText}</p>
            )}
          </div>
        )}
      </div>
    </section>
  )
}
