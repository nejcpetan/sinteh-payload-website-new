import type { Block } from 'payload'

export const keyFeaturesBlock: Block = {
  slug: 'keyFeatures',
  labels: {
    singular: 'Key Features',
    plural: 'Key Features',
  },
  admin: {
    group: 'Product Page',
  },
  fields: [
    {
      name: 'badge',
      type: 'text',
      admin: {
        description: 'Small badge text above title',
      },
    },
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'subtitle',
      type: 'textarea',
    },
    {
      name: 'features',
      type: 'array',
      fields: [
        {
          name: 'icon',
          type: 'select',
          required: true,
          options: [
            {
              label: 'Mechanical',
              value: 'mechanical',
            },
            {
              label: 'Shield',
              value: 'shield',
            },
            {
              label: 'Retrofit',
              value: 'retrofit',
            },
            {
              label: 'Modular',
              value: 'modular',
            },
            {
              label: 'Temperature',
              value: 'temperature',
            },
            {
              label: 'Key',
              value: 'key',
            },
          ],
        },
        {
          name: 'title',
          type: 'text',
          required: true,
        },
        {
          name: 'description',
          type: 'textarea',
          required: true,
        },
      ],
    },
    {
      name: 'bottomHighlight',
      type: 'group',
      fields: [
        {
          name: 'title',
          type: 'text',
        },
        {
          name: 'description',
          type: 'textarea',
        },
      ],
    },
  ],
}

export const productGalleryBlock: Block = {
  slug: 'productGallery',
  labels: {
    singular: 'Product Gallery',
    plural: 'Product Galleries',
  },
  admin: {
    group: 'Product Page',
  },
  fields: [
    {
      name: 'badge',
      type: 'text',
    },
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'subtitle',
      type: 'textarea',
    },
    {
      name: 'images',
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
          name: 'category',
          type: 'text',
          required: true,
        },
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
        },
      ],
    },
    {
      name: 'downloadSection',
      type: 'group',
      fields: [
        {
          name: 'title',
          type: 'text',
        },
        {
          name: 'description',
          type: 'textarea',
        },
        {
          name: 'downloadButtonText',
          type: 'text',
          defaultValue: 'Prenesi galerijo',
        },
        {
          name: 'requestButtonText',
          type: 'text',
          defaultValue: 'Zahtevaj specifične slike',
        },
      ],
    },
  ],
}

export const specificationsBlock: Block = {
  slug: 'specifications',
  labels: {
    singular: 'Specifications',
    plural: 'Specifications',
  },
  admin: {
    group: 'Product Page',
  },
  fields: [
    {
      name: 'badge',
      type: 'text',
    },
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'subtitle',
      type: 'textarea',
    },
    {
      name: 'specifications',
      type: 'array',
      fields: [
        {
          name: 'category',
          type: 'text',
          required: true,
        },
        {
          name: 'items',
          type: 'array',
          fields: [
            {
              name: 'label',
              type: 'text',
              required: true,
            },
            {
              name: 'value',
              type: 'text',
              required: true,
            },
          ],
        },
      ],
    },
    {
      name: 'certificationBadges',
      type: 'array',
      fields: [
        {
          name: 'name',
          type: 'text',
          required: true,
        },
        {
          name: 'description',
          type: 'text',
          required: true,
        },
      ],
    },
    {
      name: 'additionalInfo',
      type: 'group',
      fields: [
        {
          name: 'title',
          type: 'text',
        },
        {
          name: 'description',
          type: 'textarea',
        },
        {
          name: 'details',
          type: 'array',
          fields: [
            {
              name: 'label',
              type: 'text',
              required: true,
            },
            {
              name: 'value',
              type: 'text',
              required: true,
            },
          ],
        },
      ],
    },
  ],
}

export const applicationsBlock: Block = {
  slug: 'applications',
  labels: {
    singular: 'Applications',
    plural: 'Applications',
  },
  admin: {
    group: 'Product Page',
  },
  fields: [
    {
      name: 'badge',
      type: 'text',
    },
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'subtitle',
      type: 'textarea',
    },
    {
      name: 'applications',
      type: 'array',
      fields: [
        {
          name: 'icon',
          type: 'select',
          required: true,
          options: [
            {
              label: 'Oil & Gas',
              value: 'oilgas',
            },
            {
              label: 'Energy',
              value: 'energy',
            },
            {
              label: 'Pharmaceutical',
              value: 'pharm',
            },
            {
              label: 'Manufacturing',
              value: 'manufacturing',
            },
            {
              label: 'ATEX',
              value: 'atex',
            },
            {
              label: 'Water',
              value: 'water',
            },
          ],
        },
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
          name: 'details',
          type: 'array',
          fields: [
            {
              name: 'detail',
              type: 'text',
              required: true,
            },
          ],
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
      name: 'caseStudy',
      type: 'group',
      fields: [
        {
          name: 'title',
          type: 'text',
        },
        {
          name: 'description',
          type: 'textarea',
        },
        {
          name: 'stats',
          type: 'array',
          fields: [
            {
              name: 'label',
              type: 'text',
              required: true,
            },
            {
              name: 'value',
              type: 'text',
              required: true,
            },
          ],
        },
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
        },
      ],
    },
  ],
}

// Export all blocks as an array for easy import
export const productBlocks = [
  keyFeaturesBlock,
  productGalleryBlock,
  specificationsBlock,
  applicationsBlock,
]
