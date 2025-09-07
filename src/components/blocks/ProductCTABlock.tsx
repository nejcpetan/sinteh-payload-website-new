'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'

interface Stat {
  value: string
  label: string
}

interface ContactInfo {
  phone?: string
  email?: string
  responseTime?: string
}

interface WhyUsPoint {
  text: string
}

interface ProductCTABlockProps {
  title: string
  description: string
  stats?: Stat[]
  contactInfo?: ContactInfo
  whyUsPoints?: WhyUsPoint[]
  heroImage?: {
    url: string
    alt?: string
  }
  formTitle?: string
  applicationOptions?: Array<{
    value: string
    label: string
  }>
  privacyText?: string
}

export function ProductCTABlock({
  title,
  description,
  stats,
  contactInfo,
  whyUsPoints,
  heroImage,
  formTitle,
  applicationOptions,
  privacyText,
}: ProductCTABlockProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    phone: '',
    application: '',
    message: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          subject: `Povpraševanje za sistem - ${formData.application || 'Splošno'}`,
          source: 'product-cta',
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to send message')
      }

      setSubmitted(true)
    } catch (error) {
      console.error('Error sending message:', error)
      alert('Napaka pri pošiljanju sporočila. Prosimo poskusite znova.')
    } finally {
      setIsSubmitting(false)
    }
  }
  return (
    <section className="w-full bg-background text-foreground">
      <div className="mx-auto max-w-7xl container-px py-16 md:py-24">
        {/* Main CTA Section */}
        <div className="relative overflow-hidden rounded-3xl bg-surface border border-border/60 mb-16">
          {/* Background gradients */}
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute inset-0 bg-[radial-gradient(90%_70%_at_20%_50%,rgba(107,196,65,0.15)_0%,rgba(107,196,65,0.08)_55%,transparent_80%)]" />
            <div className="absolute inset-0 bg-gradient-to-r from-white/40 via-transparent to-white/20" />
          </div>

          <div className="relative px-8 py-12 md:px-12 md:py-16">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Content */}
              <div>
                <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-foreground mb-6">
                  {title}
                </h2>

                <p className="text-lg text-foreground/80 mb-8 leading-relaxed">{description}</p>

                {/* Key stats */}
                {stats && stats.length > 0 && (
                  <div className="grid sm:grid-cols-3 gap-6 mb-8">
                    {stats.map((stat, index) => (
                      <div key={index} className="text-center">
                        <div className="text-2xl font-extrabold text-brand mb-1">{stat.value}</div>
                        <div className="text-sm text-foreground/70">{stat.label}</div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Contact options */}
                <div className="flex flex-wrap gap-4">
                  <Button size="lg" variant="default" asChild>
                    <a href="#contact-form">Kontaktirajte nas</a>
                  </Button>
                  {contactInfo?.phone && (
                    <Button size="lg" variant="outline" asChild>
                      <a href={`tel:${contactInfo.phone}`}>
                        <svg
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          className="h-4 w-4 mr-2"
                        >
                          <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                        </svg>
                        {contactInfo.phone}
                      </a>
                    </Button>
                  )}
                </div>
              </div>

              {/* Image placeholder */}
              <div className="order-1 lg:order-2">
                <div className="relative aspect-square max-w-md mx-auto">
                  <div className="absolute -inset-6 rounded-[32px] bg-[radial-gradient(80%_60%_at_30%_20%,_rgba(107,196,65,0.2),transparent_60%)]" />
                  <div className="relative w-full h-full rounded-2xl bg-white border-2 border-border/50 flex items-center justify-center overflow-hidden">
                    {heroImage?.url ? (
                      <img
                        src={heroImage.url}
                        alt={heroImage.alt || title}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="text-center text-foreground/40">
                        <div className="text-5xl mb-3">🔐</div>
                        <div className="text-lg font-medium">mGard v akciji</div>
                        <div className="text-sm mt-1">Varnost na delu</div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div id="contact-form" className="grid lg:grid-cols-2 gap-12">
          {/* Form */}
          <div className="rounded-2xl bg-white border border-border/60 p-8">
            <h3 className="text-2xl font-bold text-foreground mb-6">
              {formTitle || 'Povpraševanje za sistem'}
            </h3>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Ime in priimek *
                  </label>
                  <Input
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Vaše ime"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    E-naslov *
                  </label>
                  <Input
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="vas.email@podjetje.si"
                    required
                  />
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Podjetje</label>
                  <Input
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    placeholder="Naziv podjetja"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Telefon</label>
                  <Input
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+386 XX XXX XXX"
                  />
                </div>
              </div>

              {applicationOptions && applicationOptions.length > 0 && (
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Tip aplikacije
                  </label>
                  <select
                    name="application"
                    value={formData.application}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-brand/50 focus:border-brand"
                  >
                    <option value="">Izberite aplikacijo</option>
                    {applicationOptions.map((option, index) => (
                      <option key={index} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Opis projekta *
                </label>
                <Textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Opišite vašo aplikacijo, varnostne zahteve in specifične potrebe..."
                  rows={4}
                  required
                />
              </div>

              <div className="flex items-start gap-3">
                <input
                  type="checkbox"
                  id="privacy"
                  className="mt-1 rounded border-border focus:ring-2 focus:ring-brand/50"
                  required
                />
                <label htmlFor="privacy" className="text-sm text-foreground/70">
                  {privacyText ||
                    'Soglašam z politiko zasebnosti in obdelavo osebnih podatkov za namen odgovora na povpraševanje.'}
                </label>
              </div>

              <Button size="lg" type="submit" disabled={isSubmitting} className="w-full">
                {isSubmitting ? 'Pošiljam...' : 'Pošljite povpraševanje'}
              </Button>
            </form>
          </div>

          {/* Contact info */}
          <div className="space-y-8">
            <div className="rounded-2xl bg-surface border border-border/60 p-6">
              <h4 className="text-xl font-bold text-foreground mb-4">Neposredni kontakt</h4>

              <div className="space-y-4">
                {contactInfo?.phone && (
                  <div className="flex items-start gap-3">
                    <div className="p-2 rounded-lg bg-brand/10">
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        className="h-5 w-5 text-brand"
                      >
                        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                      </svg>
                    </div>
                    <div>
                      <div className="font-medium text-foreground">Telefon</div>
                      <a href={`tel:${contactInfo.phone}`} className="text-brand hover:underline">
                        {contactInfo.phone}
                      </a>
                    </div>
                  </div>
                )}

                {contactInfo?.email && (
                  <div className="flex items-start gap-3">
                    <div className="p-2 rounded-lg bg-brand/10">
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
                    </div>
                    <div>
                      <div className="font-medium text-foreground">E-pošta</div>
                      <a
                        href={`mailto:${contactInfo.email}`}
                        className="text-brand hover:underline"
                      >
                        {contactInfo.email}
                      </a>
                    </div>
                  </div>
                )}

                {contactInfo?.responseTime && (
                  <div className="flex items-start gap-3">
                    <div className="p-2 rounded-lg bg-brand/10">
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        className="h-5 w-5 text-brand"
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
                      <div className="font-medium text-foreground">Odzivni čas</div>
                      <div className="text-foreground/70">{contactInfo.responseTime}</div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {whyUsPoints && whyUsPoints.length > 0 && (
              <div className="rounded-2xl bg-surface border border-border/60 p-6">
                <h4 className="text-xl font-bold text-foreground mb-4">Zakaj SINTEH PRO?</h4>

                <ul className="space-y-3">
                  {whyUsPoints.map((point, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <div className="h-2 w-2 rounded-full bg-brand flex-shrink-0 mt-2"></div>
                      <span className="text-sm text-foreground/80">{point.text}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
