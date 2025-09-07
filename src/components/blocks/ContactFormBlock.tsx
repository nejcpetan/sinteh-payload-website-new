'use client'

import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'

interface ContactFormBlockProps {
  badge?: string
  title: string
  subtitle?: string
  formTitle?: string
  submitButtonText?: string
  submitButtonLoadingText?: string
  privacyText?: string
}

interface FormData {
  name: string
  email: string
  company: string
  phone: string
  subject: string
  message: string
  urgency: string
  projectType: string
  budget: string
}

export function ContactFormBlock({
  badge,
  title,
  subtitle,
  formTitle,
  submitButtonText = 'Pošlji povpraševanje',
  submitButtonLoadingText = 'Pošiljam...',
  privacyText,
}: ContactFormBlockProps) {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    company: '',
    phone: '',
    subject: '',
    message: '',
    urgency: '',
    projectType: '',
    budget: '',
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
          source: 'contact-form',
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to send message')
      }

      setSubmitted(true)
    } catch (error) {
      console.error('Error sending message:', error)
      // You could add error state handling here
      alert('Napaka pri pošiljanju sporočila. Prosimo poskusite znova.')
    } finally {
      setIsSubmitting(false)
    }
  }

  if (submitted) {
    return (
      <section className="w-full bg-surface text-foreground">
        <div className="mx-auto max-w-7xl container-px py-16 md:py-24">
          <div className="max-w-2xl mx-auto">
            <div className="text-center p-12 bg-white rounded-2xl border shadow-sm">
              <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-brand/10 flex items-center justify-center">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  className="h-8 w-8 text-brand"
                >
                  <path d="M9 12l2 2 4-4" strokeLinecap="round" strokeLinejoin="round" />
                  <circle cx="12" cy="12" r="9" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-foreground mb-4">
                Sporočilo uspešno poslano!
              </h3>
              <p className="text-foreground/70 mb-6">
                Hvala za vaše povpraševanje. Naša strokovna ekipa bo odgovorila v 24 urah (delovni
                dnevi).
              </p>
              <div className="bg-surface rounded-xl p-4 border mb-6">
                <p className="text-sm text-foreground/70">
                  <strong>Naslednji koraki:</strong>
                  <br />
                  1. Pregled vašega povpraševanja
                  <br />
                  2. Priprava predhodne analize
                  <br />
                  3. Kontakt za dogovor o sestanku
                </p>
              </div>
              <Button
                variant="outline"
                onClick={() => {
                  setSubmitted(false)
                  setFormData({
                    name: '',
                    email: '',
                    company: '',
                    phone: '',
                    subject: '',
                    message: '',
                    urgency: '',
                    projectType: '',
                    budget: '',
                  })
                }}
              >
                Pošlji novo sporočilo
              </Button>
            </div>
          </div>
        </div>
      </section>
    )
  }

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

          {/* Form */}
          <div className="bg-white rounded-2xl border p-6 md:p-8 shadow-sm">
            {formTitle && <h3 className="text-2xl font-bold text-foreground mb-6">{formTitle}</h3>}

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Personal Information */}
              <div className="grid sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-foreground mb-2">
                    Ime in priimek *
                  </label>
                  <Input
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Vaše ime"
                    required
                    className="h-12"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-foreground mb-2">
                    E-naslov *
                  </label>
                  <Input
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="vas.email@podjetje.si"
                    required
                    className="h-12"
                  />
                </div>
              </div>

              {/* Company Information */}
              <div className="grid sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-foreground mb-2">
                    Podjetje
                  </label>
                  <Input
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    placeholder="Naziv podjetja"
                    className="h-12"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-foreground mb-2">
                    Telefon
                  </label>
                  <Input
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+386 XX XXX XXX"
                    className="h-12"
                  />
                </div>
              </div>

              {/* Project Details */}
              <div className="grid sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-foreground mb-2">
                    Tip projekta
                  </label>
                  <select
                    name="projectType"
                    value={formData.projectType}
                    onChange={handleChange}
                    className="w-full h-12 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-brand/50 focus:border-brand bg-background"
                  >
                    <option value="">Izberite tip projekta</option>
                    <option value="automation">Industrijska avtomatizacija</option>
                    <option value="safety">Varnostni sistemi</option>
                    <option value="maintenance">Servis in vzdrževanje</option>
                    <option value="retrofit">Posodobitev obstoječih sistemov</option>
                    <option value="consultation">Svetovanje in načrtovanje</option>
                    <option value="other">Drugo</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-foreground mb-2">
                    Predvideni proračun
                  </label>
                  <select
                    name="budget"
                    value={formData.budget}
                    onChange={handleChange}
                    className="w-full h-12 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-brand/50 focus:border-brand bg-background"
                  >
                    <option value="">Izberite proračun</option>
                    <option value="under-10k">Pod 10.000 €</option>
                    <option value="10k-25k">10.000 - 25.000 €</option>
                    <option value="25k-50k">25.000 - 50.000 €</option>
                    <option value="50k-100k">50.000 - 100.000 €</option>
                    <option value="over-100k">Nad 100.000 €</option>
                    <option value="not-defined">Še ni določen</option>
                  </select>
                </div>
              </div>

              {/* Urgency and Subject */}
              <div className="grid sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-foreground mb-2">
                    Nujnost
                  </label>
                  <select
                    name="urgency"
                    value={formData.urgency}
                    onChange={handleChange}
                    className="w-full h-12 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-brand/50 focus:border-brand bg-background"
                  >
                    <option value="">Izberite nujnost</option>
                    <option value="low">Nizka - Informativno povpraševanje</option>
                    <option value="medium">Srednja - Načrtovanje za prihodnost</option>
                    <option value="high">Visoka - Potreben hiter odziv</option>
                    <option value="critical">Kritična - Nujna podpora</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-foreground mb-2">
                    Zadeva *
                  </label>
                  <Input
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="Kratek opis povpraševanja"
                    required
                    className="h-12"
                  />
                </div>
              </div>

              {/* Message */}
              <div>
                <label className="block text-sm font-semibold text-foreground mb-2">
                  Podrobno sporočilo *
                </label>
                <Textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Opišite vaš projekt, specifične potrebe, tehnične zahteve, časovni okvir in ostale relevantne informacije..."
                  required
                  rows={6}
                  className="resize-none"
                />
                <p className="text-xs text-foreground/60 mt-2">
                  Minimalno 20 znakov. Bolj kot ste natančni, boljši bo naš odziv.
                </p>
              </div>

              {/* Privacy Agreement */}
              {privacyText && (
                <div className="flex items-start gap-3 p-4 bg-surface/50 rounded-lg border">
                  <input
                    type="checkbox"
                    id="privacy"
                    required
                    className="mt-1 rounded border focus:ring-2 focus:ring-brand/50"
                  />
                  <label htmlFor="privacy" className="text-sm text-foreground/80">
                    {privacyText}
                  </label>
                </div>
              )}

              {/* Submit Button */}
              <div className="text-center pt-4">
                <Button type="submit" size="lg" disabled={isSubmitting} className="min-w-[200px]">
                  {isSubmitting ? (
                    <>
                      <svg
                        className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      {submitButtonLoadingText}
                    </>
                  ) : (
                    submitButtonText
                  )}
                </Button>

                <p className="text-xs text-foreground/60 mt-4 max-w-md mx-auto">
                  S klikom na gumb se strinjate z našimi pogoji storitve. Povpraševanje bo
                  obravnavano zaupno in profesionalno.
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}
