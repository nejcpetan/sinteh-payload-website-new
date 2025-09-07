import type { GlobalConfig } from 'payload'
import { triggerRevalidation } from '@/lib/revalidation'

export const Header: GlobalConfig = {
  slug: 'header',
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
        description: 'The name of your website/brand',
      },
    },
    {
      name: 'logo',
      type: 'upload',
      relationTo: 'media',
      admin: {
        description: 'Upload your logo (optional)',
      },
    },
    {
      name: 'navigation',
      type: 'array',
      maxRows: 10,
      fields: [
        {
          name: 'label',
          type: 'text',
          required: true,
        },
        {
          name: 'navType',
          type: 'select',
          options: [
            {
              label: 'Normal Link',
              value: 'link',
            },
            {
              label: 'Dropdown Menu',
              value: 'dropdown',
            },
          ],
          defaultValue: 'link',
          required: true,
          admin: {
            description: 'Choose between a normal link or dropdown menu',
          },
        },
        {
          name: 'type',
          type: 'select',
          options: [
            {
              label: 'Internal Page',
              value: 'page',
            },
            {
              label: 'Custom URL',
              value: 'url',
            },
            {
              label: 'Blog',
              value: 'blog',
            },
            {
              label: 'Specific Post',
              value: 'post',
            },
            {
              label: 'Category',
              value: 'category',
            },
          ],
          defaultValue: 'page',
          required: true,
          admin: {
            condition: (_, siblingData) => siblingData?.navType === 'link',
            description: 'Link destination type (only for normal links)',
          },
        },
        {
          name: 'page',
          type: 'relationship',
          relationTo: 'pages',
          maxDepth: 1, // Need slug for navigation links
          admin: {
            condition: (_, siblingData) =>
              siblingData?.navType === 'link' && siblingData?.type === 'page',
          },
        },
        {
          name: 'post',
          type: 'relationship',
          relationTo: 'posts',
          maxDepth: 1, // Need slug for navigation links
          filterOptions: {
            status: { equals: 'published' },
          },
          admin: {
            condition: (_, siblingData) =>
              siblingData?.navType === 'link' && siblingData?.type === 'post',
            description: 'Link to a specific blog post',
          },
        },
        {
          name: 'category',
          type: 'relationship',
          relationTo: 'categories',
          maxDepth: 1, // Need slug for navigation links
          admin: {
            condition: (_, siblingData) =>
              siblingData?.navType === 'link' && siblingData?.type === 'category',
            description: 'Link to a specific category',
          },
        },
        {
          name: 'url',
          type: 'text',
          admin: {
            condition: (_, siblingData) =>
              siblingData?.navType === 'link' && siblingData?.type === 'url',
            description: 'Enter full URL (e.g., https://example.com)',
          },
        },
        {
          name: 'newTab',
          type: 'checkbox',
          defaultValue: false,
          admin: {
            condition: (_, siblingData) => siblingData?.navType === 'link',
            description: 'Open link in new tab (only for normal links)',
          },
        },
        // Dropdown Menu Fields
        {
          name: 'dropdownItems',
          type: 'array',
          maxRows: 8,
          admin: {
            condition: (_, siblingData) => siblingData?.navType === 'dropdown',
            description: 'Configure dropdown menu items',
          },
          fields: [
            {
              name: 'label',
              type: 'text',
              required: true,
            },
            {
              name: 'description',
              type: 'text',
              admin: {
                description: 'Optional description for the dropdown item',
              },
            },
            {
              name: 'type',
              type: 'select',
              options: [
                {
                  label: 'Internal Page',
                  value: 'page',
                },
                {
                  label: 'Custom URL',
                  value: 'url',
                },
                {
                  label: 'Blog',
                  value: 'blog',
                },
                {
                  label: 'Specific Post',
                  value: 'post',
                },
                {
                  label: 'Category',
                  value: 'category',
                },
                {
                  label: 'Divider',
                  value: 'divider',
                },
              ],
              defaultValue: 'page',
              required: true,
            },
            {
              name: 'page',
              type: 'relationship',
              relationTo: 'pages',
              maxDepth: 1,
              admin: {
                condition: (_, siblingData) => siblingData?.type === 'page',
              },
            },
            {
              name: 'post',
              type: 'relationship',
              relationTo: 'posts',
              maxDepth: 1,
              filterOptions: {
                status: { equals: 'published' },
              },
              admin: {
                condition: (_, siblingData) => siblingData?.type === 'post',
              },
            },
            {
              name: 'category',
              type: 'relationship',
              relationTo: 'categories',
              maxDepth: 1,
              admin: {
                condition: (_, siblingData) => siblingData?.type === 'category',
              },
            },
            {
              name: 'url',
              type: 'text',
              admin: {
                condition: (_, siblingData) => siblingData?.type === 'url',
                description: 'Enter full URL (e.g., https://example.com)',
              },
            },
            {
              name: 'newTab',
              type: 'checkbox',
              defaultValue: false,
              admin: {
                condition: (_, siblingData) => siblingData?.type !== 'divider',
                description: 'Open link in new tab',
              },
            },
            {
              name: 'featured',
              type: 'checkbox',
              defaultValue: false,
              admin: {
                condition: (_, siblingData) => siblingData?.type !== 'divider',
                description: 'Highlight this item in the dropdown',
              },
            },
          ],
        },
        {
          name: 'dropdownStyle',
          type: 'select',
          options: [
            {
              label: 'Simple List',
              value: 'simple',
            },
            {
              label: 'Cards with Descriptions',
              value: 'cards',
            },
            {
              label: 'Two Column Layout',
              value: 'columns',
            },
          ],
          defaultValue: 'simple',
          admin: {
            condition: (_, siblingData) => siblingData?.navType === 'dropdown',
            description: 'Choose dropdown menu layout style',
          },
        },
      ],
      admin: {
        description: 'Configure your main navigation menu',
      },
    },
    // Mobile Navigation Settings
    {
      name: 'mobileNavigation',
      type: 'group',
      fields: [
        {
          name: 'enabled',
          type: 'checkbox',
          defaultValue: true,
          admin: {
            description: 'Enable hamburger menu for mobile devices',
          },
        },
        {
          name: 'menuButtonLabel',
          type: 'text',
          defaultValue: 'Menu',
          admin: {
            condition: (_, siblingData) => siblingData?.enabled,
            description: 'Accessibility label for hamburger menu button',
          },
        },
        {
          name: 'closeButtonLabel',
          type: 'text',
          defaultValue: 'Close menu',
          admin: {
            condition: (_, siblingData) => siblingData?.enabled,
            description: 'Accessibility label for close menu button',
          },
        },
        {
          name: 'showLanguageSelector',
          type: 'checkbox',
          defaultValue: true,
          admin: {
            condition: (_, siblingData) => siblingData?.enabled,
            description: 'Show language selector in mobile menu',
          },
        },
        {
          name: 'showContactButton',
          type: 'checkbox',
          defaultValue: true,
          admin: {
            condition: (_, siblingData) => siblingData?.enabled,
            description: 'Show contact button in mobile menu',
          },
        },
      ],
      admin: {
        description: 'Configure mobile hamburger menu behavior',
      },
    },
    // Recent Posts Navigation Section
    {
      name: 'recentPosts',
      type: 'group',
      fields: [
        {
          name: 'enabled',
          type: 'checkbox',
          defaultValue: false,
          admin: {
            description: 'Show recent posts in navigation',
          },
        },
        {
          name: 'label',
          type: 'text',
          defaultValue: 'Recent Posts',
          admin: {
            condition: (_, siblingData) => siblingData?.enabled,
            description: 'Label for the recent posts section',
          },
        },
        {
          name: 'numberOfPosts',
          type: 'number',
          defaultValue: 5,
          min: 1,
          max: 10,
          admin: {
            condition: (_, siblingData) => siblingData?.enabled,
            description: 'Number of recent posts to show (1-10)',
          },
        },
        {
          name: 'showInMobile',
          type: 'checkbox',
          defaultValue: true,
          admin: {
            condition: (_, siblingData) => siblingData?.enabled,
            description: 'Show recent posts in mobile menu',
          },
        },
      ],
      admin: {
        description: 'Configure recent posts dropdown in navigation',
      },
    },
    // Categories Navigation Section
    {
      name: 'categoriesNav',
      type: 'group',
      fields: [
        {
          name: 'enabled',
          type: 'checkbox',
          defaultValue: false,
          admin: {
            description: 'Show categories in navigation',
          },
        },
        {
          name: 'label',
          type: 'text',
          defaultValue: 'Categories',
          admin: {
            condition: (_, siblingData) => siblingData?.enabled,
            description: 'Label for the categories section',
          },
        },
        {
          name: 'displayType',
          type: 'select',
          options: [
            {
              label: 'All Categories',
              value: 'all',
            },
            {
              label: 'Selected Categories',
              value: 'selected',
            },
          ],
          defaultValue: 'all',
          admin: {
            condition: (_, siblingData) => siblingData?.enabled,
          },
        },
        {
          name: 'selectedCategories',
          type: 'relationship',
          relationTo: 'categories',
          hasMany: true,
          maxDepth: 0,
          admin: {
            condition: (_, siblingData) =>
              siblingData?.enabled && siblingData?.displayType === 'selected',
            description: 'Choose specific categories to show',
          },
        },
        {
          name: 'maxCategories',
          type: 'number',
          defaultValue: 6,
          min: 1,
          max: 12,
          admin: {
            condition: (_, siblingData) =>
              siblingData?.enabled && siblingData?.displayType === 'all',
            description: 'Maximum number of categories to show (1-12)',
          },
        },
        {
          name: 'showInMobile',
          type: 'checkbox',
          defaultValue: true,
          admin: {
            condition: (_, siblingData) => siblingData?.enabled,
            description: 'Show categories in mobile menu',
          },
        },
      ],
      admin: {
        description: 'Configure categories navigation',
      },
    },
    {
      name: 'socialLinks',
      type: 'group',
      fields: [
        {
          name: 'facebook',
          type: 'text',
          admin: {
            description: 'Facebook page URL',
          },
        },
        {
          name: 'twitter',
          type: 'text',
          admin: {
            description: 'Twitter/X profile URL',
          },
        },
        {
          name: 'instagram',
          type: 'text',
          admin: {
            description: 'Instagram profile URL',
          },
        },
        {
          name: 'linkedin',
          type: 'text',
          admin: {
            description: 'LinkedIn profile/company URL',
          },
        },
        {
          name: 'youtube',
          type: 'text',
          admin: {
            description: 'YouTube channel URL',
          },
        },
      ],
      admin: {
        description: 'Social media links for header/footer',
      },
    },
  ],
  hooks: {
    afterChange: [
      async ({ doc }) => {
        try {
          console.log('Triggering revalidation for header changes')
          await triggerRevalidation({
            collection: 'header',
          })
        } catch (error) {
          console.error('Error in header afterChange hook:', error)
        }
      },
    ],
  },
}
