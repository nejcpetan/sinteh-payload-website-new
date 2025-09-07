import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'
import { getPayload } from 'payload'
import config from '@/payload.config'

// Initialize Resend only when API key is available
const getResendClient = () => {
  const apiKey = process.env.RESEND_API_KEY
  if (!apiKey) {
    throw new Error('RESEND_API_KEY environment variable is required')
  }
  return new Resend(apiKey)
}

interface ContactFormData {
  name: string
  email: string
  company?: string
  phone?: string
  subject: string
  message: string
  urgency?: string
  projectType?: string
  budget?: string
  application?: string
  source?: string
}

export async function POST(request: NextRequest) {
  try {
    const body: ContactFormData = await request.json()

    // Validate required fields
    if (!body.name || !body.email || !body.subject || !body.message) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    // Get Payload instance
    const payload = await getPayload({ config })

    // Get email settings from admin
    let emailSettings
    try {
      const emailAdmin = await payload.findGlobal({
        slug: 'email-admin',
      })
      emailSettings = emailAdmin?.emailSettings
    } catch (error) {
      console.warn('Could not fetch email settings, using defaults')
      emailSettings = null
    }

    // Use admin settings or fallback to environment variables
    const fromEmail = emailSettings?.fromEmail || process.env.FROM_EMAIL || 'noreply@sinteh.pro'
    const fromName = emailSettings?.fromName || 'SINTEH PRO'
    const contactEmail =
      emailSettings?.contactEmail || process.env.CONTACT_EMAIL || 'info@sinteh.pro'
    const autoReplyEnabled = emailSettings?.autoReplyEnabled !== false
    const notificationEnabled = emailSettings?.notificationEnabled !== false

    // Get client IP and user agent for tracking
    const clientIP =
      request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'unknown'
    const userAgent = request.headers.get('user-agent') || 'unknown'

    // Determine source if not provided
    const source: 'contact-form' | 'product-cta' | 'simple-contact' | 'universal-contact' =
      (body.source as any) || (body.application ? 'product-cta' : 'contact-form')

    // Store submission in database
    const submission = await payload.create({
      collection: 'contact-submissions',
      data: {
        name: body.name,
        email: body.email,
        company: body.company,
        phone: body.phone,
        subject: body.subject,
        message: body.message,
        urgency: body.urgency,
        projectType: body.projectType,
        budget: body.budget,
        application: body.application,
        source: source,
        status: 'new',
        priority:
          body.urgency === 'critical' ? 'urgent' : body.urgency === 'high' ? 'high' : 'medium',
        ipAddress: clientIP,
        userAgent: userAgent,
        emailsSent: [],
      },
    })

    const emailsSent = []

    // Send notification email to company if enabled
    if (notificationEnabled) {
      try {
        const resend = getResendClient()
        const companyEmailHtml = `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #6bc441; border-bottom: 2px solid #6bc441; padding-bottom: 10px;">
              Novo povpraševanje s spletne strani
            </h2>
            
            <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h3 style="margin-top: 0; color: #333;">Podatki o stranki:</h3>
              <p><strong>Ime:</strong> ${body.name}</p>
              <p><strong>E-naslov:</strong> ${body.email}</p>
              ${body.company ? `<p><strong>Podjetje:</strong> ${body.company}</p>` : ''}
              ${body.phone ? `<p><strong>Telefon:</strong> ${body.phone}</p>` : ''}
            </div>

            <div style="background-color: #fff; padding: 20px; border: 1px solid #e9ecef; border-radius: 8px; margin: 20px 0;">
              <h3 style="margin-top: 0; color: #333;">Podrobnosti povpraševanja:</h3>
              <p><strong>Zadeva:</strong> ${body.subject}</p>
              ${body.projectType ? `<p><strong>Tip projekta:</strong> ${body.projectType}</p>` : ''}
              ${body.application ? `<p><strong>Aplikacija:</strong> ${body.application}</p>` : ''}
              ${body.budget ? `<p><strong>Proračun:</strong> ${body.budget}</p>` : ''}
              ${body.urgency ? `<p><strong>Nujnost:</strong> ${body.urgency}</p>` : ''}
              
              <h4 style="color: #333; margin-top: 20px;">Sporočilo:</h4>
              <div style="background-color: #f8f9fa; padding: 15px; border-radius: 4px; border-left: 4px solid #6bc441;">
                ${body.message.replace(/\n/g, '<br>')}
              </div>
            </div>

            <div style="background-color: #6bc441; color: white; padding: 15px; border-radius: 8px; text-align: center; margin: 20px 0;">
              <p style="margin: 0;"><strong>Priporočen odziv:</strong> V 24 urah (delovni dnevi)</p>
            </div>

            <div style="background-color: #f8f9fa; padding: 15px; border-radius: 8px; margin: 20px 0; font-size: 12px; color: #666;">
              <p style="margin: 0;"><strong>Sistem info:</strong></p>
              <p style="margin: 5px 0 0 0;">ID: ${submission.id} | Vir: ${source} | IP: ${clientIP}</p>
            </div>
          </div>
        `

        await resend.emails.send({
          from: `${fromName} <${fromEmail}>`,
          to: [contactEmail],
          subject: `Novo povpraševanje: ${body.subject}`,
          html: companyEmailHtml,
          replyTo: body.email,
        })

        emailsSent.push({
          type: 'admin-notification' as const,
          sentAt: new Date().toISOString(),
          recipient: contactEmail,
          subject: `Novo povpraševanje: ${body.subject}`,
          success: true,
        })
      } catch (error) {
        console.error('Failed to send admin notification:', error)
        emailsSent.push({
          type: 'admin-notification' as const,
          sentAt: new Date().toISOString(),
          recipient: contactEmail,
          subject: `Novo povpraševanje: ${body.subject}`,
          success: false,
        })
      }
    }

    // Send confirmation email to customer if enabled
    if (autoReplyEnabled) {
      try {
        const resend = getResendClient()
        const customerEmailHtml = `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <div style="text-align: center; padding: 20px; background-color: #6bc441; color: white; border-radius: 8px 8px 0 0;">
              <h1 style="margin: 0;">${fromName}</h1>
              <p style="margin: 10px 0 0 0;">Industrijska avtomatizacija</p>
            </div>
            
            <div style="padding: 30px; background-color: #fff; border: 1px solid #e9ecef; border-top: none; border-radius: 0 0 8px 8px;">
              <h2 style="color: #333; margin-top: 0;">Hvala za vaše povpraševanje!</h2>
              
              <p>Spoštovani/a <strong>${body.name}</strong>,</p>
              
              <p>Prejeli smo vaše povpraševanje z zadevo "<strong>${body.subject}</strong>" in se vam zahvaljujemo za zaupanje.</p>
              
              <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
                <h3 style="margin-top: 0; color: #6bc441;">Naslednji koraki:</h3>
                <ol style="color: #333; line-height: 1.6;">
                  <li>Pregled vašega povpraševanja</li>
                  <li>Priprava predhodne analize</li>
                  <li>Kontakt za dogovor o sestanku</li>
                </ol>
              </div>
              
              <p><strong>Pričakovani odziv:</strong> V 24 urah (delovni dnevi)</p>
              
              <div style="border-top: 1px solid #e9ecef; padding-top: 20px; margin-top: 30px; color: #666; font-size: 14px;">
                <p><strong>Kontakt:</strong></p>
                <p>📞 +386 (3) 426 36 46<br>
                ✉️ ${contactEmail}<br>
                🌐 www.sinteh.pro</p>
              </div>

              <div style="margin-top: 20px; padding: 10px; background-color: #f8f9fa; border-radius: 4px; font-size: 12px; color: #666;">
                <p style="margin: 0;">Referenčna številka: ${submission.id}</p>
              </div>
            </div>
          </div>
        `

        await resend.emails.send({
          from: `${fromName} <${fromEmail}>`,
          to: [body.email],
          subject: 'Potrditev prejema povpraševanja - SINTEH PRO',
          html: customerEmailHtml,
        })

        emailsSent.push({
          type: 'auto-reply' as const,
          sentAt: new Date().toISOString(),
          recipient: body.email,
          subject: 'Potrditev prejema povpraševanja - SINTEH PRO',
          success: true,
        })
      } catch (error) {
        console.error('Failed to send customer confirmation:', error)
        emailsSent.push({
          type: 'auto-reply' as const,
          sentAt: new Date().toISOString(),
          recipient: body.email,
          subject: 'Potrditev prejema povpraševanja - SINTEH PRO',
          success: false,
        })
      }
    }

    // Update submission with email history
    if (emailsSent.length > 0) {
      await payload.update({
        collection: 'contact-submissions',
        id: submission.id,
        data: {
          emailsSent: emailsSent,
        },
      })
    }

    return NextResponse.json({
      success: true,
      submissionId: submission.id,
      emailsSent: emailsSent.length,
    })
  } catch (error) {
    console.error('Contact form error:', error)
    return NextResponse.json({ error: 'Failed to process contact form' }, { status: 500 })
  }
}
