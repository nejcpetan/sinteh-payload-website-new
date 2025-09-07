/**
 * BlogCTA Component - SINTEH PRO Blog Conversion Component
 *
 * A specialized call-to-action component designed to convert blog readers
 * into leads by encouraging them to contact the company for consultation
 * or services related to the blog content they just read.
 *
 * KEY FEATURES:
 * - Contextual messaging based on blog content
 * - Multiple contact options (form, phone, email)
 * - Trust indicators and value propositions
 * - Mobile-optimized design
 * - Matches blog design system
 *
 * CONVERSION OPTIMIZED:
 * - Clear value proposition
 * - Low-friction contact options
 * - Trust-building elements
 * - Urgency and relevance
 *
 * @example
 * <BlogCTA
 *   variant="consultation"
 *   title="Need Expert Advice?"
 *   description="Our automation specialists can help you implement these solutions"
 * />
 */

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import {
  Phone,
  Mail,
  MessageCircle,
  CheckCircle,
  ArrowRight,
  Clock,
  Shield,
  Award,
} from 'lucide-react'

interface BlogCTAProps {
  variant?: 'consultation' | 'quote' | 'support' | 'general'
  title?: string
  description?: string
  benefits?: string[]
  showContactForm?: boolean
  className?: string
}

const variantConfig = {
  consultation: {
    title: 'Potrebujete strokovno svetovanje?',
    description:
      'Naši strokovnjaki za industrijsko avtomatizacijo vam lahko pomagajo implementirati te rešitve v vaši organizaciji.',
    ctaText: 'Rezerviraj brezplačno svetovanje',
    benefits: [
      'Brezplačna začetna analiza',
      'Strokovni nasveti prilagojeni vašim potrebam',
      'Več kot 30 let izkušenj',
      '24/7 tehnična podpora',
    ],
  },
  quote: {
    title: 'Zainteresirani za ponudbo?',
    description:
      'Pridobite prilagojeno ponudbo za vaš projekt industrijske avtomatizacije in varnostnih sistemov.',
    ctaText: 'Pridobi brezplačno ponudbo',
    benefits: [
      'Brezplačna ocena projekta',
      'Konkurenčne cene',
      'Certificirani sistemi',
      'Garancija in podpora',
    ],
  },
  support: {
    title: 'Potrebujete tehnično podporo?',
    description:
      'Naša ekipa strokovnjakov je na voljo za pomoč pri vseh vprašanjih glede avtomatizacije in varnostnih sistemov.',
    ctaText: 'Kontaktiraj podporo',
    benefits: [
      'Hitra odzivnost',
      'Certificirani tehniki',
      'Daljinska podpora',
      'Preventivno vzdrževanje',
    ],
  },
  general: {
    title: 'Imate vprašanja?',
    description:
      'Kontaktirajte nas za več informacij o naših storitvah in rešitvah industrijske avtomatizacije.',
    ctaText: 'Kontaktiraj nas',
    benefits: [
      'Brezplačno svetovanje',
      'Prilagojene rešitve',
      'Profesionalna izvedba',
      'Dolgoročno partnerstvo',
    ],
  },
}

export function BlogCTA({
  variant = 'consultation',
  title,
  description,
  benefits,
  showContactForm = false,
  className = '',
}: BlogCTAProps) {
  const config = variantConfig[variant]
  const finalTitle = title || config.title
  const finalDescription = description || config.description
  const finalBenefits = benefits || config.benefits

  return (
    <section
      className={`w-full bg-gradient-to-br from-surface via-background to-surface/50 ${className}`}
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-10 right-10 w-24 h-24 border border-brand/30 rounded-full animate-pulse"></div>
        <div className="absolute bottom-20 left-10 w-16 h-16 border border-brand/20 rounded-full animate-pulse delay-1000"></div>
      </div>

      <div className="relative mx-auto max-w-7xl px-4 md:px-6 py-12 md:py-16">
        <Card className="overflow-hidden bg-white/95 backdrop-blur-sm border border-border/60 shadow-xl">
          <CardHeader className="text-center pb-6">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 rounded-full bg-brand/10 px-3 py-1 text-xs font-medium text-brand mb-4 mx-auto">
              <MessageCircle className="h-3 w-3" />
              <span>Strokovna pomoč</span>
            </div>

            {/* Title */}
            <CardTitle className="text-2xl md:text-3xl font-bold text-foreground mb-4">
              {finalTitle}
            </CardTitle>

            {/* Description */}
            <p className="text-foreground/70 text-lg leading-relaxed max-w-2xl mx-auto">
              {finalDescription}
            </p>
          </CardHeader>

          <CardContent className="pt-0">
            <div className="grid lg:grid-cols-2 gap-8 items-center">
              {/* Benefits */}
              <div className="space-y-6">
                <div>
                  <h4 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                    <Award className="h-5 w-5 text-brand" />
                    Zakaj izbrati SINTEH PRO?
                  </h4>
                  <div className="grid gap-3">
                    {finalBenefits.map((benefit, index) => (
                      <div key={index} className="flex items-center gap-3">
                        <CheckCircle className="h-5 w-5 text-brand flex-shrink-0" />
                        <span className="text-foreground/80">{benefit}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Trust Indicators */}
                <div className="flex flex-wrap gap-4 pt-4 border-t border-border">
                  <div className="flex items-center gap-2 text-sm text-foreground/60">
                    <Clock className="h-4 w-4" />
                    <span>30+ let izkušenj</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-foreground/60">
                    <Shield className="h-4 w-4" />
                    <span>Certificirani sistemi</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-foreground/60">
                    <Award className="h-4 w-4" />
                    <span>ISO standardi</span>
                  </div>
                </div>
              </div>

              {/* Contact Options */}
              <div className="space-y-6">
                {/* Primary CTA */}
                <div className="text-center lg:text-left">
                  <Button size="lg" className="w-full lg:w-auto mb-4" asChild>
                    <Link href="/kontakt" className="inline-flex items-center gap-2">
                      {config.ctaText}
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </Button>
                  <p className="text-xs text-foreground/60">
                    Odgovorimo v 24 urah • Brezplačno svetovanje
                  </p>
                </div>

                {/* Contact Methods */}
                <div className="grid gap-3">
                  <div className="text-center lg:text-left">
                    <p className="text-sm font-medium text-foreground mb-3">
                      Ali nas kontaktirajte direktno:
                    </p>
                  </div>

                  <div className="grid gap-3">
                    {/* Phone */}
                    <Link
                      href="tel:+38615896410"
                      className="flex items-center gap-3 p-3 rounded-lg border border-border hover:border-brand/30 hover:bg-brand/5 transition-all duration-200 group"
                    >
                      <div className="flex items-center justify-center w-10 h-10 rounded-full bg-brand/10 group-hover:bg-brand/20 transition-colors">
                        <Phone className="h-4 w-4 text-brand" />
                      </div>
                      <div>
                        <p className="font-medium text-foreground">+386 1 589 64 10</p>
                        <p className="text-xs text-foreground/60">Pokličite za takojšnjo pomoč</p>
                      </div>
                    </Link>

                    {/* Email */}
                    <Link
                      href="mailto:info@sinteh.si"
                      className="flex items-center gap-3 p-3 rounded-lg border border-border hover:border-brand/30 hover:bg-brand/5 transition-all duration-200 group"
                    >
                      <div className="flex items-center justify-center w-10 h-10 rounded-full bg-brand/10 group-hover:bg-brand/20 transition-colors">
                        <Mail className="h-4 w-4 text-brand" />
                      </div>
                      <div>
                        <p className="font-medium text-foreground">info@sinteh.si</p>
                        <p className="text-xs text-foreground/60">Pošljite nam povpraševanje</p>
                      </div>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}

export default BlogCTA
