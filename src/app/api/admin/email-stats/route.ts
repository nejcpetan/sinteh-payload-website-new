import { NextRequest, NextResponse } from 'next/server'
import { getPayload } from 'payload'
import config from '@/payload.config'

export async function GET(request: NextRequest) {
  try {
    // Get Payload instance
    const payload = await getPayload({ config })

    // Get all contact submissions
    const submissions = await payload.find({
      collection: 'contact-submissions',
      limit: 1000, // Adjust as needed
      sort: '-createdAt',
    })

    // Calculate statistics
    const totalSubmissions = submissions.totalDocs
    const lastSubmission = submissions.docs.length > 0 ? submissions.docs[0].createdAt : null

    // Count emails sent
    let emailsSent = 0
    submissions.docs.forEach((doc) => {
      if (doc.emailsSent && Array.isArray(doc.emailsSent)) {
        emailsSent += doc.emailsSent.filter((email) => email.success).length
      }
    })

    // Group by source
    const submissionsBySource = submissions.docs.reduce(
      (acc, doc) => {
        const source = doc.source || 'unknown'
        acc[source] = (acc[source] || 0) + 1
        return acc
      },
      {} as Record<string, number>,
    )

    // Group by status
    const submissionsByStatus = submissions.docs.reduce(
      (acc, doc) => {
        const status = doc.status || 'unknown'
        acc[status] = (acc[status] || 0) + 1
        return acc
      },
      {} as Record<string, number>,
    )

    // Get current month's email count
    const currentMonth = new Date()
    currentMonth.setDate(1)
    currentMonth.setHours(0, 0, 0, 0)

    const thisMonthSubmissions = await payload.find({
      collection: 'contact-submissions',
      where: {
        createdAt: {
          greater_than_equal: currentMonth.toISOString(),
        },
      },
      limit: 1000,
    })

    let thisMonthEmails = 0
    thisMonthSubmissions.docs.forEach((doc) => {
      if (doc.emailsSent && Array.isArray(doc.emailsSent)) {
        thisMonthEmails += doc.emailsSent.filter((email) => email.success).length
      }
    })

    const stats = {
      totalSubmissions,
      lastSubmission,
      emailsSent: thisMonthEmails,
      submissionsBySource,
      submissionsByStatus,
    }

    return NextResponse.json(stats)
  } catch (error) {
    console.error('Failed to fetch email stats:', error)
    return NextResponse.json({ error: 'Failed to fetch statistics' }, { status: 500 })
  }
}
