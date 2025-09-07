'use client'

import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'

interface ContactBlockProps {
  badge?: string
  title: string
  subtitle?: string
  phone?: string
  email?: string
  privacyText?: string
}

export function ContactBlock({
  badge,
  title,
  subtitle,
  phone,
  email,
  privacyText,
}: ContactBlockProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    message: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
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
          subject: 'Kontakt preko spletne strani',
          source: 'simple-contact',
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

  if (submitted) {
    return (
      <section id="kontakt" className="relative w-full overflow-hidden bg-white">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute inset-0 bg-[radial-gradient(80%_50%_at_50%_100%,rgba(107,196,65,0.15)_0%,transparent_70%)]" />
          <div className="absolute inset-0 bg-gradient-to-b from-slate-50/80 via-transparent to-transparent" />
        </div>
        <div className="relative mx-auto max-w-7xl container-px py-16 md:py-24">
          <div className="mx-auto max-w-3xl">
            <div className="rounded-2xl bg-white/60 backdrop-blur-sm border shadow-lg p-6 md:p-8 text-center">
              <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-green-100 flex items-center justify-center">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  className="h-8 w-8 text-green-600"
                >
                  <path d="M9 12l2 2 4-4" strokeLinecap="round" strokeLinejoin="round" />
                  <circle cx="12" cy="12" r="9" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-foreground mb-4">
                Sporočilo uspešno poslano!
              </h3>
              <p className="text-foreground/70 mb-6">
                Hvala za vaše sporočilo. Odgovorili vam bomo v najkrajšem možnem času.
              </p>
              <Button
                variant="outline"
                onClick={() => {
                  setSubmitted(false)
                  setFormData({ name: '', email: '', company: '', message: '' })
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
    <section id="kontakt" className="relative w-full overflow-hidden bg-white">
      {/* Light theme - clean green gradient background */}
      <div className="pointer-events-none absolute inset-0">
        {/* Bottom-center green glow */}
        <div className="absolute inset-0 bg-[radial-gradient(80%_50%_at_50%_100%,rgba(107,196,65,0.15)_0%,transparent_70%)]" />
        {/* Top subtle gradient for depth */}
        <div className="absolute inset-0 bg-gradient-to-b from-slate-50/80 via-transparent to-transparent" />
      </div>

      <div className="relative mx-auto max-w-7xl container-px py-16 md:py-24">
        <div className="mx-auto max-w-3xl">
          <div className="rounded-2xl bg-white/60 backdrop-blur-sm border shadow-lg p-6 md:p-8">
            <div className="text-center">
              {badge && (
                <span className="inline-block rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-800">
                  {badge}
                </span>
              )}
              <h2 className="mt-3 text-3xl md:text-4xl font-bold text-foreground">{title}</h2>
              {subtitle && <p className="mt-2 text-foreground/70 text-sm">{subtitle}</p>}
            </div>

            <form onSubmit={handleSubmit} className="mt-6 grid gap-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Input
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Ime in Priimek"
                  required
                  className="bg-white/80 text-foreground placeholder:text-muted-foreground"
                />
                <Input
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="E-naslov"
                  required
                  className="bg-white/80 text-foreground placeholder:text-muted-foreground"
                />
              </div>
              <Input
                name="company"
                value={formData.company}
                onChange={handleChange}
                placeholder="Naziv podjetja"
                className="bg-white/80 border-border text-gray-900 placeholder:text-gray-500"
              />
              <Textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Sporočilo"
                required
                className="bg-white/80 border-border text-gray-900 placeholder:text-gray-500"
              />
              <div className="flex justify-center">
                <Button
                  size="lg"
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-green-600 hover:bg-green-700 text-white"
                >
                  {isSubmitting ? 'Pošiljam...' : 'Pošlji'}
                </Button>
              </div>
              {privacyText && (
                <p className="text-xs text-center text-muted-foreground">{privacyText}</p>
              )}
            </form>

            <div className="mt-6 flex flex-col items-center gap-2 text-xs text-muted-foreground md:flex-row md:justify-center md:gap-6">
              {phone && (
                <a
                  href={`tel:${phone.replace(/\s/g, '')}`}
                  className="hover:underline hover:text-green-600 transition-colors"
                >
                  Tel: {phone}
                </a>
              )}
              {phone && email && <span className="hidden md:inline opacity-40">•</span>}
              {email && (
                <a
                  href={`mailto:${email}`}
                  className="hover:underline hover:text-green-600 transition-colors"
                >
                  E‑pošta: {email}
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
