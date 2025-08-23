import type { GlobalConfig } from 'payload'

export const Footer: GlobalConfig = {
  slug: 'footer',
  access: {
    read: () => true,
    update: ({ req: { user } }) => Boolean(user),
  },
  fields: [
    {
      name: 'logo',
      type: 'upload',
      relationTo: 'media',
      required: true,
      admin: {
        description: 'Footer logo image',
      },
    },
    {
      name: 'copyright',
      type: 'text',
      defaultValue: '© 2025 SINTEH PRO. Vse pravice pridržane.',
      admin: {
        description: 'Copyright text displayed in footer',
      },
    },
    {
      name: 'companyInfo',
      type: 'group',
      fields: [
        {
          name: 'address',
          type: 'array',
          fields: [
            {
              name: 'line',
              type: 'text',
              required: true,
            },
          ],
          defaultValue: [
            { line: 'Cesta na Ostrožno 8' },
            { line: '3000 Celje' },
            { line: 'Slovenija - EU' },
          ],
        },
        {
          name: 'phone',
          type: 'text',
          defaultValue: '+386 (3) 426 36 46',
        },
        {
          name: 'email',
          type: 'email',
          defaultValue: 'info@sinteh.pro',
        },
      ],
      admin: {
        description: 'Company contact information',
      },
    },
    {
      name: 'footerColumns',
      type: 'array',
      maxRows: 4,
      fields: [
        {
          name: 'title',
          type: 'text',
          required: true,
        },
        {
          name: 'links',
          type: 'array',
          maxRows: 10,
          fields: [
            {
              name: 'label',
              type: 'text',
              required: true,
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
                  label: 'Anchor Link',
                  value: 'anchor',
                },
              ],
              defaultValue: 'anchor',
              required: true,
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
                description: 'Enter full URL (e.g., https://example.com)',
              },
            },
            {
              name: 'anchor',
              type: 'text',
              admin: {
                condition: (_, siblingData) => siblingData?.type === 'anchor',
                description: 'Enter anchor (e.g., #kontakt)',
              },
            },
            {
              name: 'newTab',
              type: 'checkbox',
              defaultValue: false,
              admin: {
                description: 'Open link in new tab',
              },
            },
          ],
        },
      ],
      defaultValue: [
        {
          title: 'PODROČJA DELA',
          links: [
            { label: 'Avtomatizacija', type: 'anchor', anchor: '#storitve' },
            { label: 'Servis za ABB in Schneider Electric', type: 'anchor', anchor: '#storitve' },
            { label: 'Industrijska varnost', type: 'anchor', anchor: '#storitve' },
          ],
        },
        {
          title: 'PODJETJE',
          links: [
            { label: 'O nas', type: 'anchor', anchor: '#onas' },
            { label: 'Študije primerov', type: 'anchor', anchor: '#projekti' },
            { label: 'Kontakt', type: 'anchor', anchor: '#kontakt' },
          ],
        },
        {
          title: 'PRAVNO',
          links: [
            { label: 'Politika zasebnosti', type: 'url', url: '#' },
            { label: 'Pogoji storitve', type: 'url', url: '#' },
            { label: 'Nastavitve piškotkov', type: 'url', url: '#' },
          ],
        },
      ],
      admin: {
        description: 'Footer link columns (e.g., Company, Products, Support)',
      },
    },
    {
      name: 'bottomLinks',
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
              label: 'Anchor Link',
              value: 'anchor',
            },
          ],
          defaultValue: 'url',
          required: true,
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
      defaultValue: [
        { label: 'Politika zasebnosti', type: 'url', url: '#' },
        { label: 'Pogoji storitve', type: 'url', url: '#' },
        { label: 'Nastavitve piškotkov', type: 'url', url: '#' },
      ],
      admin: {
        description: 'Links shown at the bottom of the footer',
      },
    },
  ],
}
