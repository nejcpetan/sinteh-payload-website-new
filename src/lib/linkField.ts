import type { Field } from 'payload'

// Enhanced link field that matches existing project pattern but adds blog post support
export const linkFieldArray = (
  options: {
    name?: string
    label?: string
    required?: boolean
    overrides?: Partial<Field>
  } = {},
) => [
  {
    name: 'type',
    type: 'select' as const,
    required: true,
    defaultValue: 'page',
    options: [
      {
        label: 'Internal Page',
        value: 'page',
      },
      {
        label: 'Blog Post',
        value: 'post',
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
    type: 'relationship' as const,
    relationTo: 'pages',
    admin: {
      condition: (_, siblingData) => siblingData?.type === 'page',
    },
  },
  {
    name: 'post',
    type: 'relationship' as const,
    relationTo: 'posts',
    admin: {
      condition: (_, siblingData) => siblingData?.type === 'post',
    },
  },
  {
    name: 'url',
    type: 'text' as const,
    admin: {
      condition: (_, siblingData) => siblingData?.type === 'url',
    },
  },
  {
    name: 'anchor',
    type: 'text' as const,
    admin: {
      condition: (_, siblingData) => siblingData?.type === 'anchor',
    },
  },
]

export const linkField = (
  options: {
    name?: string
    label?: string
    required?: boolean
    overrides?: Partial<Field>
  } = {},
): Field => ({
  name: options.name || 'link',
  type: 'group',
  label: options.label || 'Link',
  fields: linkFieldArray(),
  ...options.overrides,
})

export const ctaField = (
  options: {
    name?: string
    label?: string
    required?: boolean
    overrides?: Partial<Field>
  } = {},
): Field => ({
  name: options.name || 'cta',
  type: 'group',
  label: options.label || 'Call to Action',
  fields: [
    {
      name: 'text',
      type: 'text',
      required: options.required || false,
      label: 'Button Text',
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
          label: 'Blog Post',
          value: 'post',
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
      name: 'post',
      type: 'relationship',
      relationTo: 'posts',
      admin: {
        condition: (_, siblingData) => siblingData?.type === 'post',
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
        { label: 'Default', value: 'default' },
        { label: 'Outline', value: 'outline' },
        { label: 'Secondary', value: 'secondary' },
        { label: 'Ghost', value: 'ghost' },
      ],
    },
  ],
  ...options.overrides,
})
