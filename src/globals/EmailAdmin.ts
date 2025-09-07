import type { GlobalConfig } from 'payload'

export const EmailAdmin: GlobalConfig = {
  slug: 'email-admin',
  label: 'Email Administration',
  admin: {
    group: 'Administration',
    description: 'Manage email settings, templates, and contact form submissions',
  },
  access: {
    read: ({ req: { user } }) => {
      // Allow any authenticated user to read email settings
      return !!user
    },
    update: ({ req: { user } }) => {
      // Allow any authenticated user to update email settings
      return !!user
    },
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Email Settings',
          fields: [
            {
              name: 'emailSettings',
              type: 'group',
              label: 'Email Configuration',
              fields: [
                {
                  name: 'fromEmail',
                  type: 'email',
                  label: 'From Email Address',
                  defaultValue: 'noreply@sinteh.pro',
                  required: true,
                  admin: {
                    description: 'The email address that will appear as the sender',
                  },
                },
                {
                  name: 'fromName',
                  type: 'text',
                  label: 'From Name',
                  defaultValue: 'SINTEH PRO',
                  required: true,
                  admin: {
                    description: 'The name that will appear as the sender',
                  },
                },
                {
                  name: 'contactEmail',
                  type: 'email',
                  label: 'Contact Recipient Email',
                  defaultValue: 'info@sinteh.pro',
                  required: true,
                  admin: {
                    description: 'Email address where contact form submissions will be sent',
                  },
                },
                {
                  name: 'replyToEmail',
                  type: 'email',
                  label: 'Reply-To Email',
                  defaultValue: 'info@sinteh.pro',
                  admin: {
                    description: 'Email address for replies (optional)',
                  },
                },
                {
                  name: 'autoReplyEnabled',
                  type: 'checkbox',
                  label: 'Enable Auto-Reply',
                  defaultValue: true,
                  admin: {
                    description: 'Send automatic confirmation emails to form submitters',
                  },
                },
                {
                  name: 'notificationEnabled',
                  type: 'checkbox',
                  label: 'Enable Admin Notifications',
                  defaultValue: true,
                  admin: {
                    description: 'Send notification emails to admin when forms are submitted',
                  },
                },
              ],
            },
          ],
        },
        {
          label: 'Email Templates',
          fields: [
            {
              name: 'templates',
              type: 'group',
              label: 'Email Templates',
              fields: [
                {
                  name: 'customerConfirmation',
                  type: 'group',
                  label: 'Customer Confirmation Email',
                  fields: [
                    {
                      name: 'subject',
                      type: 'text',
                      label: 'Email Subject',
                      defaultValue: 'Potrditev prejema povpraševanja - SINTEH PRO',
                      required: true,
                    },
                    {
                      name: 'heading',
                      type: 'text',
                      label: 'Email Heading',
                      defaultValue: 'Hvala za vaše povpraševanje!',
                      required: true,
                    },
                    {
                      name: 'message',
                      type: 'richText',
                      label: 'Email Message',
                      admin: {
                        description:
                          'Use {{name}} for customer name, {{subject}} for inquiry subject',
                      },
                    },
                    {
                      name: 'responseTime',
                      type: 'text',
                      label: 'Expected Response Time',
                      defaultValue: 'V 24 urah (delovni dnevi)',
                    },
                  ],
                },
                {
                  name: 'adminNotification',
                  type: 'group',
                  label: 'Admin Notification Email',
                  fields: [
                    {
                      name: 'subject',
                      type: 'text',
                      label: 'Email Subject',
                      defaultValue: 'Novo povpraševanje: {{subject}}',
                      required: true,
                      admin: {
                        description: 'Use {{subject}} for inquiry subject',
                      },
                    },
                    {
                      name: 'heading',
                      type: 'text',
                      label: 'Email Heading',
                      defaultValue: 'Novo povpraševanje s spletne strani',
                      required: true,
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          label: 'Statistics',
          fields: [
            {
              name: 'statisticsDisplay',
              type: 'ui',
              admin: {
                components: {
                  Field: '@/components/admin/EmailStatsComponent',
                },
              },
            },
            {
              name: 'quickActions',
              type: 'group',
              label: 'Quick Actions',
              fields: [
                {
                  name: 'viewSubmissions',
                  type: 'ui',
                  admin: {
                    components: {
                      Field: '@/components/admin/QuickLinksComponent',
                    },
                  },
                },
                {
                  name: 'testEmail',
                  type: 'ui',
                  admin: {
                    components: {
                      Field: '@/components/admin/TestEmailComponent',
                    },
                  },
                },
              ],
            },
          ],
        },
      ],
    },
  ],
  hooks: {
    afterChange: [
      ({ doc, req }) => {
        // Log email settings changes
        if (req.user) {
          console.log(`Email settings updated by user: ${req.user.email}`)
        }
      },
    ],
  },
}
