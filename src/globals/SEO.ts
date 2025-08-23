import type { GlobalConfig } from 'payload'

export const SEO: GlobalConfig = {
  slug: 'seo',
  access: {
    read: () => true,
    update: ({ req: { user } }) => Boolean(user),
  },
  fields: [
    {
      name: 'siteName',
      type: 'text',
      required: true,
      defaultValue: 'My Website',
      admin: {
        description: 'Default site name for meta tags',
      },
    },
    {
      name: 'siteDescription',
      type: 'textarea',
      required: true,
      defaultValue: 'A modern website built with Payload CMS and Next.js',
      admin: {
        description: 'Default site description for meta tags and search engines',
      },
    },
    {
      name: 'siteUrl',
      type: 'text',
      required: true,
      defaultValue: 'https://mywebsite.com',
      admin: {
        description: 'Your website URL (without trailing slash)',
      },
    },
    {
      name: 'defaultImage',
      type: 'upload',
      relationTo: 'media',
      admin: {
        description: 'Default social sharing image (1200x630px recommended)',
      },
    },
    {
      name: 'keywords',
      type: 'text',
      admin: {
        description: 'Default keywords for SEO (comma-separated)',
      },
    },
    {
      name: 'author',
      type: 'text',
      admin: {
        description: 'Default author name for meta tags',
      },
    },
    {
      name: 'twitterHandle',
      type: 'text',
      admin: {
        description: 'Twitter handle for Twitter Card meta tags (without @)',
      },
    },
    {
      name: 'facebookAppId',
      type: 'text',
      admin: {
        description: 'Facebook App ID for Open Graph meta tags',
      },
    },
    {
      name: 'googleAnalytics',
      type: 'group',
      fields: [
        {
          name: 'enabled',
          type: 'checkbox',
          defaultValue: false,
          admin: {
            description: 'Enable Google Analytics tracking',
          },
        },
        {
          name: 'measurementId',
          type: 'text',
          admin: {
            condition: (_, siblingData) => siblingData?.enabled === true,
            description: 'Google Analytics 4 Measurement ID (e.g., G-XXXXXXXXXX)',
          },
        },
      ],
      admin: {
        description: 'Google Analytics configuration',
      },
    },
    {
      name: 'googleTagManager',
      type: 'group',
      fields: [
        {
          name: 'enabled',
          type: 'checkbox',
          defaultValue: false,
          admin: {
            description: 'Enable Google Tag Manager',
          },
        },
        {
          name: 'containerId',
          type: 'text',
          admin: {
            condition: (_, siblingData) => siblingData?.enabled === true,
            description: 'Google Tag Manager Container ID (e.g., GTM-XXXXXXX)',
          },
        },
      ],
      admin: {
        description: 'Google Tag Manager configuration',
      },
    },
    {
      name: 'robots',
      type: 'group',
      fields: [
        {
          name: 'index',
          type: 'checkbox',
          defaultValue: true,
          admin: {
            description: 'Allow search engines to index this site',
          },
        },
        {
          name: 'follow',
          type: 'checkbox',
          defaultValue: true,
          admin: {
            description: 'Allow search engines to follow links on this site',
          },
        },
        {
          name: 'customRobots',
          type: 'textarea',
          admin: {
            description: 'Custom robots.txt content (optional)',
          },
        },
      ],
      admin: {
        description: 'Search engine robots configuration',
      },
    },
    {
      name: 'verification',
      type: 'group',
      fields: [
        {
          name: 'googleSiteVerification',
          type: 'text',
          admin: {
            description: 'Google Search Console verification code',
          },
        },
        {
          name: 'bingSiteVerification',
          type: 'text',
          admin: {
            description: 'Bing Webmaster Tools verification code',
          },
        },
      ],
      admin: {
        description: 'Site verification codes for search engines',
      },
    },
  ],
}
