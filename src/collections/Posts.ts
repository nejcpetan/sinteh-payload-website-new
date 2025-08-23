import type { CollectionConfig } from 'payload'
import { triggerRevalidation, isPublished } from '@/lib/revalidation'

export const Posts: CollectionConfig = {
  slug: 'posts',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'slug', 'status', 'publishedAt', 'updatedAt'],
  },
  access: {
    read: ({ req: { user } }) => {
      // Published posts are public, drafts require authentication
      if (user) {
        return true
      }
      return {
        status: { equals: 'published' },
      }
    },
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
      name: 'excerpt',
      type: 'textarea',
      admin: {
        description: 'Brief description of the post for previews and SEO',
      },
    },
    {
      name: 'content',
      type: 'richText',
      required: true,
    },
    {
      name: 'featuredImage',
      type: 'upload',
      relationTo: 'media',
      admin: {
        description: 'Main image for the post',
      },
    },
    {
      name: 'categories',
      type: 'relationship',
      relationTo: 'categories',
      hasMany: true,
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'tags',
      type: 'array',
      admin: {
        position: 'sidebar',
      },
      fields: [
        {
          name: 'tag',
          type: 'text',
          required: true,
        },
      ],
    },
    {
      name: 'author',
      type: 'relationship',
      relationTo: 'users',
      required: false, // Made optional to prevent publishing issues
      admin: {
        position: 'sidebar',
        description: 'Author will be auto-assigned if not selected',
      },
      hooks: {
        beforeChange: [
          ({ req, value }) => {
            // Auto-assign current user as author if not set
            if (!value && req.user) {
              return req.user.id
            }
            return value
          },
        ],
      },
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
      hooks: {
        beforeChange: [
          ({ data, value }) => {
            // Auto-set publish date when status changes to published
            if (data && data.status === 'published' && !value) {
              return new Date()
            }
            return value
          },
        ],
      },
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
        {
          label: 'Archived',
          value: 'archived',
        },
      ],
      defaultValue: 'draft',
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'meta',
      type: 'group',
      fields: [
        {
          name: 'title',
          type: 'text',
          admin: {
            description: 'SEO title (optional, defaults to post title)',
          },
        },
        {
          name: 'description',
          type: 'textarea',
          admin: {
            description: 'SEO description for search engines',
          },
        },
        {
          name: 'keywords',
          type: 'text',
          admin: {
            description: 'Comma-separated keywords for SEO',
          },
        },
      ],
    },
    {
      name: 'readingTime',
      type: 'number',
      admin: {
        position: 'sidebar',
        description: 'Estimated reading time in minutes',
        readOnly: true,
      },
      hooks: {
        beforeChange: [
          ({ data }) => {
            if (data && data.content) {
              // Simple reading time calculation (200 words per minute)
              const wordCount = JSON.stringify(data.content).split(' ').length
              return Math.ceil(wordCount / 200)
            }
            return 1
          },
        ],
      },
    },
    {
      name: 'featured',
      type: 'checkbox',
      admin: {
        position: 'sidebar',
        description: 'Feature this post on homepage',
      },
      defaultValue: false,
    },
  ],
  versions: {
    drafts: {
      autosave: {
        interval: 30000, // 30 seconds
      },
    },
  },
  hooks: {
    afterChange: [
      async ({ doc, previousDoc, operation }) => {
        try {
          // Only trigger revalidation for published posts
          if (isPublished(doc)) {
            console.log(`Triggering revalidation for post: ${doc.slug}`)

            // Revalidate the specific blog post
            await triggerRevalidation({
              collection: 'posts',
              slug: doc.slug,
            })

            // If slug changed, also revalidate the old slug
            if (previousDoc && previousDoc.slug !== doc.slug && isPublished(previousDoc)) {
              await triggerRevalidation({
                collection: 'posts',
                slug: previousDoc.slug,
              })
            }
          }

          // Always revalidate blog listing when posts are created, updated, or status changes
          if (
            operation === 'create' ||
            (previousDoc && previousDoc.status !== doc.status) ||
            isPublished(doc)
          ) {
            console.log('Triggering revalidation for blog listing')
            await triggerRevalidation({
              collection: 'posts', // This will trigger blog page revalidation
            })
          }
        } catch (error) {
          console.error('Error in post afterChange hook:', error)
        }
      },
    ],
    afterDelete: [
      async ({ doc }) => {
        try {
          if (isPublished(doc)) {
            console.log(`Triggering revalidation after post deletion: ${doc.slug}`)

            // Revalidate the deleted post to show 404
            await triggerRevalidation({
              collection: 'posts',
              slug: doc.slug,
            })

            // Revalidate blog listing
            await triggerRevalidation({
              collection: 'posts',
            })
          }
        } catch (error) {
          console.error('Error in post afterDelete hook:', error)
        }
      },
    ],
  },
}
