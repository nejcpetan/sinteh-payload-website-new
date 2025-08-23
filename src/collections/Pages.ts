import type { CollectionConfig } from 'payload'
import { triggerRevalidation, isPublished } from '@/lib/revalidation'

export const Pages: CollectionConfig = {
  slug: 'pages',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'slug', 'updatedAt'],
  },
  access: {
    read: () => true,
    create: ({ req: { user } }) => Boolean(user),
    update: ({ req: { user } }) => Boolean(user),
    delete: ({ req: { user } }) => Boolean(user),
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      admin: {
        position: 'sidebar',
      },
      hooks: {
        beforeChange: [
          ({ data, value }) => {
            if (data && data.title && !value) {
              return data.title
                .toLowerCase()
                .replace(/[^a-z0-9]+/g, '-')
                .replace(/(^-|-$)+/g, '')
            }
            return value
          },
        ],
      },
    },
    {
      name: 'content',
      type: 'richText',
      required: false,
    },
    {
      name: 'meta',
      type: 'group',
      fields: [
        {
          name: 'title',
          type: 'text',
          admin: {
            description: 'SEO title (optional, defaults to page title)',
          },
        },
        {
          name: 'description',
          type: 'textarea',
          admin: {
            description: 'SEO description for search engines',
          },
        },
      ],
    },
    {
      name: 'publishedAt',
      type: 'date',
      admin: {
        position: 'sidebar',
        date: {
          pickerAppearance: 'dayAndTime',
        },
      },
      defaultValue: () => new Date(),
    },
    {
      name: 'status',
      type: 'select',
      options: [
        {
          label: 'Draft',
          value: 'draft',
        },
        {
          label: 'Published',
          value: 'published',
        },
      ],
      defaultValue: 'draft',
      admin: {
        position: 'sidebar',
      },
    },
  ],
  versions: {
    drafts: true,
  },
  hooks: {
    afterChange: [
      async ({ doc, previousDoc, operation }) => {
        try {
          // Only trigger revalidation for published pages
          if (isPublished(doc)) {
            console.log(`Triggering revalidation for page: ${doc.slug}`)

            // Revalidate the specific page
            await triggerRevalidation({
              collection: 'pages',
              slug: doc.slug,
            })

            // If slug changed, also revalidate the old slug
            if (previousDoc && previousDoc.slug !== doc.slug && isPublished(previousDoc)) {
              await triggerRevalidation({
                collection: 'pages',
                slug: previousDoc.slug,
              })
            }
          }
        } catch (error) {
          console.error('Error in page afterChange hook:', error)
        }
      },
    ],
    afterDelete: [
      async ({ doc }) => {
        try {
          if (isPublished(doc)) {
            console.log(`Triggering revalidation after page deletion: ${doc.slug}`)

            // Revalidate the deleted page to show 404
            await triggerRevalidation({
              collection: 'pages',
              slug: doc.slug,
            })
          }
        } catch (error) {
          console.error('Error in page afterDelete hook:', error)
        }
      },
    ],
  },
}
