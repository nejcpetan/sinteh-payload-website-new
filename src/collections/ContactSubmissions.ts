import type { CollectionConfig } from 'payload'

export const ContactSubmissions: CollectionConfig = {
  slug: 'contact-submissions',
  labels: {
    singular: 'Contact Submission',
    plural: 'Contact Submissions',
  },
  admin: {
    group: 'Communications',
    useAsTitle: 'subject',
    defaultColumns: ['subject', 'name', 'email', 'status', 'createdAt'],
    description: 'Manage contact form submissions and track communication status',
    pagination: {
      defaultLimit: 25,
    },
  },
  access: {
    read: ({ req: { user } }) => {
      // Allow any authenticated user to read submissions
      return !!user
    },
    create: () => true, // Allow API to create submissions
    update: ({ req: { user } }) => {
      // Allow any authenticated user to update submissions
      return !!user
    },
    delete: ({ req: { user } }) => {
      // Allow any authenticated user to delete submissions
      return !!user
    },
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Contact Information',
          fields: [
            {
              name: 'name',
              type: 'text',
              label: 'Full Name',
              required: true,
              admin: {
                readOnly: true,
              },
            },
            {
              name: 'email',
              type: 'email',
              label: 'Email Address',
              required: true,
              admin: {
                readOnly: true,
              },
            },
            {
              name: 'company',
              type: 'text',
              label: 'Company',
              admin: {
                readOnly: true,
              },
            },
            {
              name: 'phone',
              type: 'text',
              label: 'Phone Number',
              admin: {
                readOnly: true,
              },
            },
          ],
        },
        {
          label: 'Inquiry Details',
          fields: [
            {
              name: 'subject',
              type: 'text',
              label: 'Subject',
              required: true,
              admin: {
                readOnly: true,
              },
            },
            {
              name: 'message',
              type: 'textarea',
              label: 'Message',
              required: true,
              admin: {
                readOnly: true,
              },
            },
            {
              name: 'projectType',
              type: 'text',
              label: 'Project Type',
              admin: {
                readOnly: true,
              },
            },
            {
              name: 'budget',
              type: 'text',
              label: 'Budget Range',
              admin: {
                readOnly: true,
              },
            },
            {
              name: 'urgency',
              type: 'text',
              label: 'Urgency Level',
              admin: {
                readOnly: true,
              },
            },
            {
              name: 'application',
              type: 'text',
              label: 'Application Type',
              admin: {
                readOnly: true,
                description: 'For product-specific inquiries',
              },
            },
          ],
        },
        {
          label: 'Administration',
          fields: [
            {
              name: 'status',
              type: 'select',
              label: 'Status',
              defaultValue: 'new',
              required: true,
              options: [
                {
                  label: 'New',
                  value: 'new',
                },
                {
                  label: 'In Progress',
                  value: 'in-progress',
                },
                {
                  label: 'Responded',
                  value: 'responded',
                },
                {
                  label: 'Closed',
                  value: 'closed',
                },
                {
                  label: 'Spam',
                  value: 'spam',
                },
              ],
              admin: {
                description: 'Track the current status of this inquiry',
              },
            },
            {
              name: 'priority',
              type: 'select',
              label: 'Priority',
              defaultValue: 'medium',
              options: [
                {
                  label: 'Low',
                  value: 'low',
                },
                {
                  label: 'Medium',
                  value: 'medium',
                },
                {
                  label: 'High',
                  value: 'high',
                },
                {
                  label: 'Urgent',
                  value: 'urgent',
                },
              ],
              admin: {
                description: 'Set priority level for follow-up',
              },
            },
            {
              name: 'assignedTo',
              type: 'relationship',
              relationTo: 'users',
              label: 'Assigned To',
              admin: {
                description: 'Assign this inquiry to a team member',
              },
            },
            {
              name: 'tags',
              type: 'text',
              label: 'Tags',
              hasMany: true,
              admin: {
                description:
                  'Add tags for better organization (e.g., automation, safety, retrofit)',
              },
            },
            {
              name: 'internalNotes',
              type: 'richText',
              label: 'Internal Notes',
              admin: {
                description: 'Internal notes for team communication (not visible to customer)',
              },
            },
            {
              name: 'followUpDate',
              type: 'date',
              label: 'Follow-up Date',
              admin: {
                description: 'Set a reminder date for follow-up',
                date: {
                  pickerAppearance: 'dayAndTime',
                },
              },
            },
          ],
        },
        {
          label: 'Email History',
          fields: [
            {
              name: 'emailsSent',
              type: 'array',
              label: 'Email History',
              admin: {
                readOnly: true,
                description: 'Track all emails sent related to this inquiry',
              },
              fields: [
                {
                  name: 'type',
                  type: 'select',
                  label: 'Email Type',
                  options: [
                    { label: 'Auto-Reply', value: 'auto-reply' },
                    { label: 'Admin Notification', value: 'admin-notification' },
                    { label: 'Follow-up', value: 'follow-up' },
                    { label: 'Response', value: 'response' },
                  ],
                },
                {
                  name: 'sentAt',
                  type: 'date',
                  label: 'Sent At',
                  admin: {
                    date: {
                      pickerAppearance: 'dayAndTime',
                    },
                  },
                },
                {
                  name: 'recipient',
                  type: 'email',
                  label: 'Recipient',
                },
                {
                  name: 'subject',
                  type: 'text',
                  label: 'Subject',
                },
                {
                  name: 'success',
                  type: 'checkbox',
                  label: 'Successfully Sent',
                  defaultValue: true,
                },
              ],
            },
          ],
        },
      ],
    },
    {
      name: 'source',
      type: 'select',
      label: 'Form Source',
      defaultValue: 'contact-form',
      options: [
        { label: 'Contact Form', value: 'contact-form' },
        { label: 'Product CTA', value: 'product-cta' },
        { label: 'Simple Contact', value: 'simple-contact' },
        { label: 'Universal Contact', value: 'universal-contact' },
      ],
      admin: {
        readOnly: true,
        description: 'Which form was used to submit this inquiry',
      },
    },
    {
      name: 'ipAddress',
      type: 'text',
      label: 'IP Address',
      admin: {
        readOnly: true,
        description: 'IP address of the submitter (for spam prevention)',
      },
    },
    {
      name: 'userAgent',
      type: 'text',
      label: 'User Agent',
      admin: {
        readOnly: true,
        description: 'Browser information (for analytics)',
      },
    },
  ],
  hooks: {
    beforeChange: [
      ({ data, operation }) => {
        // Set timestamps
        if (operation === 'create') {
          data.createdAt = new Date()
        }
        data.updatedAt = new Date()
      },
    ],
    afterChange: [
      ({ doc, operation, req }) => {
        // Log status changes
        if (operation === 'update' && req.user) {
          console.log(`Contact submission ${doc.id} updated by ${req.user.email}`)
        }
      },
    ],
  },
}
