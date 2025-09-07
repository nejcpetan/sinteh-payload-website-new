# Email Administration Guide - SINTEH PRO

## Overview

The SINTEH PRO website now includes a comprehensive email administration system that allows you to manage contact form submissions, email settings, and monitor email statistics through the Payload CMS admin panel.

## Features

### 📧 Email Administration Global
- **Location**: Admin Panel → Globals → Email Administration
- **Purpose**: Centralized email configuration and management

#### Email Settings Tab
- **From Email**: Configure the sender email address
- **From Name**: Set the sender name (default: SINTEH PRO)
- **Contact Email**: Where contact form submissions are sent
- **Auto-Reply**: Enable/disable automatic confirmation emails to customers
- **Admin Notifications**: Enable/disable notification emails to admin

#### Email Templates Tab
- **Customer Confirmation**: Customize auto-reply email templates
- **Admin Notification**: Customize notification email templates
- **Template Variables**: Use {{name}}, {{subject}} for dynamic content

#### Statistics Tab
- **Real-time Statistics**: View submission counts, email metrics
- **Quick Links**: Direct access to contact submissions
- **Test Email**: Send test emails to verify configuration

### 📋 Contact Submissions Collection
- **Location**: Admin Panel → Collections → Contact Submissions
- **Purpose**: Manage all contact form submissions

#### Features
- **Status Tracking**: New, In Progress, Responded, Closed, Spam
- **Priority Levels**: Low, Medium, High, Urgent
- **Assignment**: Assign submissions to team members
- **Tags**: Organize submissions with custom tags
- **Internal Notes**: Add private notes for team communication
- **Email History**: Track all emails sent for each submission
- **Follow-up Dates**: Set reminders for follow-up actions

#### Submission Sources
- **Contact Form**: Main contact form submissions
- **Product CTA**: Product-specific inquiries
- **Simple Contact**: Basic contact form submissions
- **Universal Contact**: Other contact form variants

## Admin Workflow

### 1. Daily Management
1. Go to **Email Administration** → **Statistics** tab
2. Review new submissions and email metrics
3. Click "View New Submissions" for unprocessed inquiries
4. Process submissions by updating status and priority

### 2. Handling Submissions
1. Open **Contact Submissions** collection
2. Click on a submission to view details
3. Update **Status** as you work on it:
   - **New**: Just received, needs review
   - **In Progress**: Currently being handled
   - **Responded**: Customer has been contacted
   - **Closed**: Issue resolved
   - **Spam**: Mark as spam if needed

4. Set **Priority** based on urgency:
   - **Urgent**: Critical issues requiring immediate attention
   - **High**: Important inquiries
   - **Medium**: Standard inquiries
   - **Low**: General information requests

5. **Assign** to team members if needed
6. Add **Internal Notes** for team communication
7. Set **Follow-up Date** for reminders

### 3. Email Configuration
1. Go to **Email Administration** → **Email Settings**
2. Configure email addresses and settings
3. Use **Statistics** → **Test Email** to verify configuration
4. Customize email templates in **Email Templates** tab

## Email Templates

### Customer Confirmation Email
- Sent automatically when auto-reply is enabled
- Includes submission reference number
- Provides expected response time
- Contains company contact information

### Admin Notification Email
- Sent to configured contact email
- Includes all submission details
- Shows submission source and system info
- Formatted for easy reading

## API Endpoints

### Contact Form Submission
- **Endpoint**: `/api/contact`
- **Method**: POST
- **Purpose**: Handles all contact form submissions
- **Features**: 
  - Stores submissions in database
  - Sends notification and confirmation emails
  - Tracks email delivery status

### Email Statistics
- **Endpoint**: `/api/admin/email-stats`
- **Method**: GET
- **Purpose**: Provides real-time statistics for admin dashboard

### Test Email
- **Endpoint**: `/api/admin/test-email`
- **Method**: POST
- **Purpose**: Sends test emails to verify configuration

## Environment Variables Required

```env
# Email Configuration (Resend)
RESEND_API_KEY=your_resend_api_key_here
CONTACT_EMAIL=info@sinteh.pro
FROM_EMAIL=noreply@sinteh.pro
```

## Getting Your Resend API Key

1. Visit [resend.com](https://resend.com) and create an account
2. Verify your domain (sinteh.pro) in the dashboard
3. Go to "API Keys" section
4. Create a new API key
5. Add it to your environment variables

## Best Practices

### Email Management
- Check new submissions daily
- Respond to urgent inquiries within 2 hours
- Update submission status as you work
- Use internal notes for team coordination
- Set follow-up reminders for complex inquiries

### Template Customization
- Keep confirmation emails professional but friendly
- Include clear next steps for customers
- Maintain consistent branding
- Test template changes before deploying

### Monitoring
- Review email statistics weekly
- Monitor delivery success rates
- Check for spam submissions regularly
- Update email settings as needed

## Troubleshooting

### Emails Not Sending
1. Check Resend API key in environment variables
2. Verify domain is verified in Resend dashboard
3. Use "Test Email" feature to diagnose issues
4. Check email settings in admin panel

### Missing Submissions
1. Verify contact forms are using correct API endpoint
2. Check browser console for JavaScript errors
3. Review server logs for API errors
4. Ensure database connection is working

### Template Issues
1. Test templates with "Test Email" feature
2. Check for syntax errors in template variables
3. Verify HTML formatting is correct
4. Test on different email clients

## Support

For technical issues with the email administration system:
1. Check the admin panel error logs
2. Review browser console for client-side errors
3. Verify all environment variables are set correctly
4. Test email configuration using the built-in test feature

The system is designed to be robust and user-friendly, providing comprehensive email management capabilities for the SINTEH PRO website.
