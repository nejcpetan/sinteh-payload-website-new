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
      name: 'layout',
      type: 'blocks',
      blocks: [
        {
          slug: 'hero',
          labels: {
            singular: 'Hero Section',
            plural: 'Hero Sections',
          },
          fields: [
            {
              name: 'title',
              type: 'text',
              required: true,
              admin: {
                description: 'Main hero title',
              },
            },
            {
              name: 'subtitle',
              type: 'textarea',
              admin: {
                description: 'Hero subtitle or description',
              },
            },
            {
              name: 'backgroundImage',
              type: 'upload',
              relationTo: 'media',
              admin: {
                description: 'Hero background image',
              },
            },
            {
              name: 'ctaButtons',
              type: 'array',
              fields: [
                {
                  name: 'label',
                  type: 'text',
                  required: true,
                },
                {
                  name: 'type',
                  type: 'select',
                  required: true,
                  defaultValue: 'page',
                  options: [
                    {
                      label: 'Internal Page',
                      value: 'page',
                    },
                    {
                      label: 'External URL',
                      value: 'url',
                    },
                    {
                      label: 'Anchor Link',
                      value: 'anchor',
                    },
                  ],
                },
                {
                  name: 'page',
                  type: 'relationship',
                  relationTo: 'pages',
                  admin: {
                    condition: (_, siblingData) => siblingData?.type === 'page',
                  },
                },
                {
                  name: 'url',
                  type: 'text',
                  admin: {
                    condition: (_, siblingData) => siblingData?.type === 'url',
                  },
                },
                {
                  name: 'anchor',
                  type: 'text',
                  admin: {
                    condition: (_, siblingData) => siblingData?.type === 'anchor',
                  },
                },
                {
                  name: 'variant',
                  type: 'select',
                  defaultValue: 'default',
                  options: [
                    {
                      label: 'Default',
                      value: 'default',
                    },
                    {
                      label: 'Secondary',
                      value: 'secondary',
                    },
                    {
                      label: 'Outline',
                      value: 'outline',
                    },
                    {
                      label: 'Ghost',
                      value: 'ghost',
                    },
                  ],
                },
              ],
            },
            {
              name: 'bottomText',
              type: 'text',
            },
          ],
        },
        {
          slug: 'logoBelt',
          labels: {
            singular: 'Logo Belt',
            plural: 'Logo Belts',
          },
          fields: [
            {
              name: 'logos',
              type: 'array',
              fields: [
                {
                  name: 'logo',
                  type: 'upload',
                  relationTo: 'media',
                  required: true,
                },
                {
                  name: 'alt',
                  type: 'text',
                  required: true,
                },
              ],
            },
          ],
        },
        {
          slug: 'services',
          labels: {
            singular: 'Services Section',
            plural: 'Services Sections',
          },
          fields: [
            {
              name: 'badge',
              type: 'text',
              defaultValue: 'STORITVE',
            },
            {
              name: 'title',
              type: 'text',
              required: true,
              defaultValue: 'Specializirani za krmiljenje in avtomatizacijo',
            },
            {
              name: 'subtitle',
              type: 'text',
              defaultValue: 'Od načrtovanja do zagona in servisa',
            },
            {
              name: 'services',
              type: 'array',
              fields: [
                {
                  name: 'title',
                  type: 'text',
                  required: true,
                },
                {
                  name: 'description',
                  type: 'text',
                  defaultValue:
                    'Sistematičen pristop, preverjene komponente, popolna dokumentacija.',
                },
                {
                  name: 'image',
                  type: 'upload',
                  relationTo: 'media',
                  required: true,
                },
                {
                  name: 'features',
                  type: 'array',
                  fields: [
                    {
                      name: 'feature',
                      type: 'text',
                      required: true,
                    },
                  ],
                },
                {
                  name: 'button',
                  type: 'group',
                  fields: [
                    {
                      name: 'text',
                      type: 'text',
                      required: true,
                      defaultValue: 'Več o storitvi',
                    },
                    {
                      name: 'type',
                      type: 'select',
                      required: true,
                      defaultValue: 'page',
                      options: [
                        {
                          label: 'Internal Page',
                          value: 'page',
                        },
                        {
                          label: 'External URL',
                          value: 'url',
                        },
                        {
                          label: 'Anchor Link',
                          value: 'anchor',
                        },
                      ],
                    },
                    {
                      name: 'page',
                      type: 'relationship',
                      relationTo: 'pages',
                      admin: {
                        condition: (_, siblingData) => siblingData?.type === 'page',
                      },
                    },
                    {
                      name: 'url',
                      type: 'text',
                      admin: {
                        condition: (_, siblingData) => siblingData?.type === 'url',
                      },
                    },
                    {
                      name: 'anchor',
                      type: 'text',
                      admin: {
                        condition: (_, siblingData) => siblingData?.type === 'anchor',
                      },
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          slug: 'about',
          labels: {
            singular: 'About Section',
            plural: 'About Sections',
          },
          fields: [
            {
              name: 'title',
              type: 'text',
              required: true,
              defaultValue: 'O podjetju',
            },
            {
              name: 'description',
              type: 'text',
              defaultValue:
                'Specializirani smo za industrijske avtomatizacijske sisteme z več kot 10-letnimi izkušnjami.',
            },
            {
              name: 'image',
              type: 'upload',
              relationTo: 'media',
              required: true,
            },
            {
              name: 'badges',
              type: 'array',
              fields: [
                {
                  name: 'text',
                  type: 'text',
                  required: true,
                },
              ],
            },
            {
              name: 'stats',
              type: 'array',
              fields: [
                {
                  name: 'number',
                  type: 'text',
                  required: true,
                },
                {
                  name: 'label',
                  type: 'text',
                  required: true,
                },
              ],
            },
            {
              name: 'process',
              type: 'array',
              fields: [
                {
                  name: 'step',
                  type: 'text',
                  required: true,
                },
              ],
            },
            {
              name: 'calloutText',
              type: 'textarea',
            },
            {
              name: 'button',
              type: 'group',
              fields: [
                {
                  name: 'text',
                  type: 'text',
                  required: true,
                  defaultValue: 'Več o nas',
                },
                {
                  name: 'type',
                  type: 'select',
                  required: true,
                  defaultValue: 'page',
                  options: [
                    {
                      label: 'Internal Page',
                      value: 'page',
                    },
                    {
                      label: 'External URL',
                      value: 'url',
                    },
                    {
                      label: 'Anchor Link',
                      value: 'anchor',
                    },
                  ],
                },
                {
                  name: 'page',
                  type: 'relationship',
                  relationTo: 'pages',
                  admin: {
                    condition: (_, siblingData) => siblingData?.type === 'page',
                  },
                },
                {
                  name: 'url',
                  type: 'text',
                  admin: {
                    condition: (_, siblingData) => siblingData?.type === 'url',
                  },
                },
                {
                  name: 'anchor',
                  type: 'text',
                  admin: {
                    condition: (_, siblingData) => siblingData?.type === 'anchor',
                  },
                },
              ],
            },
          ],
        },
        {
          slug: 'whyTrust',
          labels: {
            singular: 'Why Trust Section',
            plural: 'Why Trust Sections',
          },
          fields: [
            {
              name: 'title',
              type: 'text',
              required: true,
              defaultValue: 'Zakaj nam zaupajo?',
            },
            {
              name: 'image',
              type: 'upload',
              relationTo: 'media',
              required: true,
            },
            {
              name: 'reasons',
              type: 'array',
              fields: [
                {
                  name: 'reason',
                  type: 'text',
                  required: true,
                },
              ],
            },
            {
              name: 'pillars',
              type: 'array',
              fields: [
                {
                  name: 'title',
                  type: 'text',
                  required: true,
                },
                {
                  name: 'description',
                  type: 'text',
                  required: true,
                },
                {
                  name: 'icon',
                  type: 'select',
                  required: true,
                  options: [
                    {
                      label: 'Shield',
                      value: 'shield',
                    },
                    {
                      label: 'Cog',
                      value: 'cog',
                    },
                    {
                      label: 'Headset',
                      value: 'headset',
                    },
                  ],
                },
              ],
            },
            {
              name: 'button',
              type: 'group',
              fields: [
                {
                  name: 'text',
                  type: 'text',
                  required: true,
                  defaultValue: 'Zaupajte nam',
                },
                {
                  name: 'type',
                  type: 'select',
                  required: true,
                  defaultValue: 'page',
                  options: [
                    {
                      label: 'Internal Page',
                      value: 'page',
                    },
                    {
                      label: 'External URL',
                      value: 'url',
                    },
                    {
                      label: 'Anchor Link',
                      value: 'anchor',
                    },
                  ],
                },
                {
                  name: 'page',
                  type: 'relationship',
                  relationTo: 'pages',
                  admin: {
                    condition: (_, siblingData) => siblingData?.type === 'page',
                  },
                },
                {
                  name: 'url',
                  type: 'text',
                  admin: {
                    condition: (_, siblingData) => siblingData?.type === 'url',
                  },
                },
                {
                  name: 'anchor',
                  type: 'text',
                  admin: {
                    condition: (_, siblingData) => siblingData?.type === 'anchor',
                  },
                },
              ],
            },
          ],
        },
        {
          slug: 'projects',
          labels: {
            singular: 'Projects Section',
            plural: 'Projects Sections',
          },
          fields: [
            {
              name: 'badge',
              type: 'text',
              defaultValue: 'PROJEKTI',
            },
            {
              name: 'title',
              type: 'text',
              required: true,
              defaultValue: 'Naši projekti',
            },
            {
              name: 'subtitle',
              type: 'text',
              defaultValue:
                'Izsek projektov, ki so izboljšali produktivnost, varnost in sledljivost.',
            },
            {
              name: 'projects',
              type: 'array',
              fields: [
                {
                  name: 'title',
                  type: 'text',
                  required: true,
                },
                {
                  name: 'category',
                  type: 'text',
                  required: true,
                },
                {
                  name: 'image',
                  type: 'upload',
                  relationTo: 'media',
                  required: true,
                },
                {
                  name: 'description',
                  type: 'textarea',
                  required: true,
                },
                {
                  name: 'stack',
                  type: 'array',
                  fields: [
                    {
                      name: 'technology',
                      type: 'text',
                      required: true,
                    },
                  ],
                },
                {
                  name: 'link',
                  type: 'text',
                },
              ],
            },
            {
              name: 'button',
              type: 'group',
              fields: [
                {
                  name: 'text',
                  type: 'text',
                  required: true,
                  defaultValue: 'Vsi projekti',
                },
                {
                  name: 'type',
                  type: 'select',
                  required: true,
                  defaultValue: 'page',
                  options: [
                    {
                      label: 'Internal Page',
                      value: 'page',
                    },
                    {
                      label: 'External URL',
                      value: 'url',
                    },
                    {
                      label: 'Anchor Link',
                      value: 'anchor',
                    },
                  ],
                },
                {
                  name: 'page',
                  type: 'relationship',
                  relationTo: 'pages',
                  admin: {
                    condition: (_, siblingData) => siblingData?.type === 'page',
                  },
                },
                {
                  name: 'url',
                  type: 'text',
                  admin: {
                    condition: (_, siblingData) => siblingData?.type === 'url',
                  },
                },
                {
                  name: 'anchor',
                  type: 'text',
                  admin: {
                    condition: (_, siblingData) => siblingData?.type === 'anchor',
                  },
                },
              ],
            },
          ],
        },
        {
          slug: 'contact',
          labels: {
            singular: 'Contact Section',
            plural: 'Contact Sections',
          },
          fields: [
            {
              name: 'badge',
              type: 'text',
              defaultValue: 'KONTAKT',
            },
            {
              name: 'title',
              type: 'text',
              required: true,
              defaultValue: 'Stopite v stik z nami',
            },
            {
              name: 'subtitle',
              type: 'text',
              defaultValue: 'Pripravili vam bomo ponudbo v 24 urah',
            },
            {
              name: 'phone',
              type: 'text',
              defaultValue: '+386 1 234 5678',
            },
            {
              name: 'email',
              type: 'text',
              defaultValue: 'info@sinteh.si',
            },
            {
              name: 'privacyText',
              type: 'text',
              defaultValue:
                'Pošiljanjem soglašate z našo politiko zasebnosti. Vaših podatkov ne posredujemo tretjim.',
            },
          ],
        },
        {
          slug: 'richText',
          labels: {
            singular: 'Rich Text',
            plural: 'Rich Text Blocks',
          },
          fields: [
            {
              name: 'content',
              type: 'richText',
              required: true,
              admin: {
                description: 'Rich text content for flexible text sections',
              },
            },
          ],
        },
      ],
      admin: {
        description: 'Build your page using blocks. Mix and match different content sections.',
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
