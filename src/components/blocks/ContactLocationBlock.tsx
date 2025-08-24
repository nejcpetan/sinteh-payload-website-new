interface ContactLocationBlockProps {
  badge?: string
  title: string
  subtitle?: string
  mapEmbedUrl?: string
  address?: {
    companyName: string
    street: string
    city: string
    country: string
  }
  emergencyPhone?: string
}

export function ContactLocationBlock({
  badge,
  title,
  subtitle,
  mapEmbedUrl,
  address,
  emergencyPhone,
}: ContactLocationBlockProps) {
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
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-6">{title}</h2>
          {subtitle && <p className="text-lg text-foreground/70">{subtitle}</p>}
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Google Maps */}
          <div className="order-2 lg:order-1">
            {mapEmbedUrl && (
              <div className="relative aspect-[4/3] w-full rounded-2xl overflow-hidden border">
                <iframe
                  src={mapEmbedUrl}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="SINTEH PRO - Cesta na Ostrožno 8, 3000 Celje"
                />
              </div>
            )}

            {/* Map Actions */}
            <div className="mt-6 flex flex-wrap gap-3">
              <a
                href="https://maps.google.com/?q=Cesta+na+Ostrožno+8,+3000+Celje,+Slovenia"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 bg-brand text-white rounded-lg hover:bg-brand-600 transition-colors text-sm font-medium"
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  className="h-4 w-4"
                >
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0Z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
                Odpri v Google Maps
              </a>

              <a
                href="https://waze.com/ul?q=Cesta%20na%20Ostro%C5%BEno%208%2C%203000%20Celje%2C%20Slovenia"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 bg-surface text-foreground border rounded-lg hover:bg-surface/70 transition-colors text-sm font-medium"
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  className="h-4 w-4"
                >
                  <path d="M12 2a3 3 0 0 1 3 3c0 1.5-1 2.5-3 5.5S9 6.5 9 5a3 3 0 0 1 3-3Z" />
                  <circle cx="12" cy="5" r="1" />
                  <path d="M7 22h10" />
                  <path d="M12 2v20" />
                </svg>
                Navigacija
              </a>
            </div>
          </div>

          {/* Location Details */}
          <div className="order-1 lg:order-2">
            <div className="bg-white rounded-2xl border p-8">
              <h3 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-brand/10 flex items-center justify-center">
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
                </div>
                Naš naslov
              </h3>

              <div className="space-y-6">
                {/* Address */}
                {address && (
                  <div>
                    <h4 className="font-semibold text-foreground mb-2">Poslovna enota Celje</h4>
                    <div className="text-foreground/80 space-y-1">
                      <p>{address.companyName}</p>
                      <p>{address.street}</p>
                      <p>{address.city}</p>
                      <p>{address.country}</p>
                    </div>
                  </div>
                )}

                {/* Access Information */}
                <div className="pt-4 border-t">
                  <h4 className="font-semibold text-foreground mb-3">Informacije o dostopu</h4>
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 rounded-lg bg-brand/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <svg
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          className="h-3 w-3 text-brand"
                        >
                          <path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z" />
                        </svg>
                      </div>
                      <div>
                        <div className="font-medium text-foreground text-sm">Parkiranje</div>
                        <div className="text-xs text-foreground/70">
                          Brezplačno parkiranje pred objektom
                        </div>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 rounded-lg bg-brand/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <svg
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          className="h-3 w-3 text-brand"
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
                        <div className="font-medium text-foreground text-sm">Obisk po dogovoru</div>
                        <div className="text-xs text-foreground/70">
                          Priporočamo predhodni dogovor za obisk
                        </div>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 rounded-lg bg-brand/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <svg
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          className="h-3 w-3 text-brand"
                        >
                          <path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10Z" />
                        </svg>
                      </div>
                      <div>
                        <div className="font-medium text-foreground text-sm">Javni prevoz</div>
                        <div className="text-xs text-foreground/70">
                          Avtobusna postaja Celje 2 km
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Business Hours */}
                <div className="pt-4 border-t">
                  <h4 className="font-semibold text-foreground mb-3">Obratovalni čas</h4>
                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div className="space-y-1">
                      <div className="flex justify-between">
                        <span className="text-foreground/70">Ponedeljek:</span>
                        <span className="font-medium">7:00 - 16:00</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-foreground/70">Torek:</span>
                        <span className="font-medium">7:00 - 16:00</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-foreground/70">Sreda:</span>
                        <span className="font-medium">7:00 - 16:00</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-foreground/70">Četrtek:</span>
                        <span className="font-medium">7:00 - 16:00</span>
                      </div>
                    </div>
                    <div className="space-y-1">
                      <div className="flex justify-between">
                        <span className="text-foreground/70">Petek:</span>
                        <span className="font-medium">7:00 - 16:00</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-foreground/70">Sobota:</span>
                        <span className="font-medium">8:00 - 12:00</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-foreground/70">Nedelja:</span>
                        <span className="text-muted-foreground font-medium">Zaprto</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-foreground/70">Prazniki:</span>
                        <span className="text-muted-foreground font-medium">Zaprto</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Emergency Contact */}
                {emergencyPhone && (
                  <div className="pt-4 border-t">
                    <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
                      <h4 className="font-semibold text-orange-800 mb-2 flex items-center gap-2">
                        <svg
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          className="h-4 w-4"
                        >
                          <path d="M12 9v4" strokeLinecap="round" strokeLinejoin="round" />
                          <path d="M12 17h.01" strokeLinecap="round" strokeLinejoin="round" />
                          <path d="M22 12c0 5.523-4.477 10-10 10S2 17.523 2 12 6.477 2 12 2s10 4.477 10 10Z" />
                        </svg>
                        Nujna podpora 24/7
                      </h4>
                      <p className="text-orange-700 text-sm mb-2">
                        Za kritične sisteme in nujne posege
                      </p>
                      <a
                        href={`tel:${emergencyPhone.replace(/\s/g, '')}`}
                        className="inline-flex items-center gap-2 text-orange-800 hover:text-orange-900 font-medium text-sm"
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
                        {emergencyPhone}
                      </a>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
