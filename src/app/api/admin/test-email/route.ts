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

export async function POST(request: NextRequest) {
  try {
    const { testEmail } = await request.json()

    if (!testEmail) {
      return NextResponse.json({ error: 'Test email address is required' }, { status: 400 })
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

    const resend = getResendClient()
    const testEmailHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="text-align: center; padding: 20px; background-color: #6bc441; color: white; border-radius: 8px 8px 0 0;">
          <h1 style="margin: 0;">${fromName}</h1>
          <p style="margin: 10px 0 0 0;">Email System Test</p>
        </div>
        
        <div style="padding: 30px; background-color: #fff; border: 1px solid #e9ecef; border-top: none; border-radius: 0 0 8px 8px;">
          <h2 style="color: #333; margin-top: 0;">Email Configuration Test</h2>
          
          <p>This is a test email to verify that your email configuration is working correctly.</p>
          
          <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="margin-top: 0; color: #6bc441;">Configuration Details:</h3>
            <ul style="color: #333; line-height: 1.6;">
              <li><strong>From Email:</strong> ${fromEmail}</li>
              <li><strong>From Name:</strong> ${fromName}</li>
              <li><strong>Test Time:</strong> ${new Date().toLocaleString('sl-SI')}</li>
              <li><strong>Resend API:</strong> Connected ✓</li>
            </ul>
          </div>
          
          <p style="color: #28a745; font-weight: bold;">✓ Email system is working correctly!</p>
          
          <div style="border-top: 1px solid #e9ecef; padding-top: 20px; margin-top: 30px; color: #666; font-size: 14px;">
            <p><strong>SINTEH PRO Email Administration</strong></p>
            <p>This test was sent from the Payload CMS admin panel.</p>
          </div>
        </div>
      </div>
    `

    await resend.emails.send({
      from: `${fromName} <${fromEmail}>`,
      to: [testEmail],
      subject: 'Email Configuration Test - SINTEH PRO',
      html: testEmailHtml,
    })

    return NextResponse.json({
      success: true,
      message: 'Test email sent successfully',
      sentTo: testEmail,
      sentFrom: `${fromName} <${fromEmail}>`,
      sentAt: new Date().toISOString(),
    })
  } catch (error) {
    console.error('Test email error:', error)
    return NextResponse.json(
      {
        error: 'Failed to send test email',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 },
    )
  }
}
