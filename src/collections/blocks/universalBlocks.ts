import type { Block } from 'payload'
import { ctaField, linkField } from '@/lib/linkField'

// Universal Hero Block
export const universalHeroBlock: Block = {
  slug: 'universalHero',
  labels: {
    singular: 'Universal Hero',
    plural: 'Universal Heroes',
  },
  admin: {
    group: 'Universal Blocks',
  },
  fields: [
    {
      name: 'variant',
      type: 'select',
      defaultValue: 'standard',
      options: [
        { label: 'Standard', value: 'standard' },
        { label: 'Blog', value: 'blog' },
        { label: 'Contact', value: 'contact' },
        { label: 'Minimal', value: 'minimal' },
      ],
    },
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
      type: 'text',
    },
    {
      name: 'description',
      type: 'textarea',
      required: true,
    },
    {
      name: 'benefits',
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
      ],
    },
    {
      name: 'benefitsLayout',
      type: 'select',
      defaultValue: 'grid',
      options: [
        { label: 'Grid', value: 'grid' },
        { label: 'List', value: 'list' },
      ],
    },
    ctaField({
      name: 'primaryCTA',
      label: 'Primary CTA',
      required: true,
    }),
    ctaField({
      name: 'secondaryCTA',
      label: 'Secondary CTA',
    }),
    {
      name: 'trustText',
      type: 'text',
    },
    {
      name: 'trustIndicators',
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
          name: 'value',
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
      name: 'contactMethods',
      type: 'array',
      fields: [
        linkField({
          name: 'link',
          label: 'Contact Link',
          required: true,
        }),
        {
          name: 'title',
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
      name: 'showImage',
      type: 'checkbox',
      defaultValue: true,
    },
    {
      name: 'backgroundStyle',
      type: 'select',
      defaultValue: 'surface',
      options: [
        { label: 'Surface', value: 'surface' },
        { label: 'Background', value: 'background' },
        { label: 'White', value: 'white' },
        { label: 'Gradient', value: 'gradient' },
      ],
    },
    {
      name: 'contentAlignment',
      type: 'select',
      defaultValue: 'left',
      options: [
        { label: 'Left', value: 'left' },
        { label: 'Center', value: 'center' },
      ],
    },
  ],
}

// Universal CTA Block
export const universalCTABlock: Block = {
  slug: 'universalCTA',
  labels: {
    singular: 'Universal CTA',
    plural: 'Universal CTAs',
  },
  admin: {
    group: 'Universal Blocks',
  },
  fields: [
    {
      name: 'variant',
      type: 'select',
      defaultValue: 'standard',
      options: [
        { label: 'Standard', value: 'standard' },
        { label: 'With Contact Form', value: 'with-contact-form' },
        { label: 'Minimal', value: 'minimal' },
        { label: 'Full Width', value: 'full-width' },
      ],
    },
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'subtitle',
      type: 'text',
    },
    {
      name: 'description',
      type: 'textarea',
      required: true,
    },
    ctaField({
      name: 'primaryCTA',
      label: 'Primary CTA',
      required: true,
    }),
    ctaField({
      name: 'secondaryCTA',
      label: 'Secondary CTA',
    }),
    {
      name: 'benefits',
      type: 'array',
      fields: [
        {
          name: 'benefit',
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
          name: 'value',
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
      name: 'backgroundStyle',
      type: 'select',
      defaultValue: 'surface',
      options: [
        { label: 'Surface', value: 'surface' },
        { label: 'Background', value: 'background' },
        { label: 'White', value: 'white' },
        { label: 'Gradient', value: 'gradient' },
      ],
    },
  ],
}

// Feature Grid Block
export const featureGridBlock: Block = {
  slug: 'featureGrid',
  labels: {
    singular: 'Feature Grid',
    plural: 'Feature Grids',
  },
  admin: {
    group: 'Universal Blocks',
  },
  fields: [
    {
      name: 'variant',
      type: 'select',
      defaultValue: 'features',
      options: [
        { label: 'Features', value: 'features' },
        { label: 'Services', value: 'services' },
        { label: 'Benefits', value: 'benefits' },
        { label: 'Solutions', value: 'solutions' },
      ],
    },
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'subtitle',
      type: 'text',
    },
    {
      name: 'description',
      type: 'textarea',
      required: true,
    },
    {
      name: 'badge',
      type: 'text',
    },
    {
      name: 'features',
      type: 'array',
      fields: [
        {
          name: 'title',
          type: 'text',
          required: true,
        },
        {
          name: 'description',
          type: 'textarea',
        },
        {
          name: 'badge',
          type: 'text',
        },
        linkField({
          name: 'link',
          label: 'Feature Link',
        }),
        {
          name: 'ctaText',
          type: 'text',
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
      name: 'columns',
      type: 'select',
      defaultValue: '3',
      options: [
        { label: '2 Columns', value: '2' },
        { label: '3 Columns', value: '3' },
        { label: '4 Columns', value: '4' },
      ],
    },
    {
      name: 'cardStyle',
      type: 'select',
      defaultValue: 'default',
      options: [
        { label: 'Default', value: 'default' },
        { label: 'Minimal', value: 'minimal' },
        { label: 'Bordered', value: 'bordered' },
      ],
    },
    {
      name: 'backgroundStyle',
      type: 'select',
      defaultValue: 'background',
      options: [
        { label: 'Background', value: 'background' },
        { label: 'Surface', value: 'surface' },
        { label: 'White', value: 'white' },
      ],
    },
  ],
}

// Content Grid Block
export const contentGridBlock: Block = {
  slug: 'contentGrid',
  labels: {
    singular: 'Content Grid',
    plural: 'Content Grids',
  },
  admin: {
    group: 'Universal Blocks',
  },
  fields: [
    {
      name: 'variant',
      type: 'select',
      defaultValue: 'categories',
      options: [
        { label: 'Categories', value: 'categories' },
        { label: 'Topics', value: 'topics' },
        { label: 'Services', value: 'services' },
        { label: 'Industries', value: 'industries' },
      ],
    },
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'subtitle',
      type: 'text',
    },
    {
      name: 'description',
      type: 'textarea',
      required: true,
    },
    {
      name: 'badge',
      type: 'text',
    },
    {
      name: 'items',
      type: 'array',
      fields: [
        {
          name: 'name',
          type: 'text',
          required: true,
        },
        {
          name: 'title',
          type: 'text',
          required: true,
        },
        {
          name: 'description',
          type: 'textarea',
        },
        linkField({
          name: 'link',
          label: 'Item Link',
        }),
        {
          name: 'postCount',
          type: 'number',
        },
        {
          name: 'applications',
          type: 'array',
          fields: [
            {
              name: 'application',
              type: 'text',
              required: true,
            },
          ],
        },
      ],
    },
    {
      name: 'columns',
      type: 'select',
      defaultValue: '3',
      options: [
        { label: '2 Columns', value: '2' },
        { label: '3 Columns', value: '3' },
        { label: '4 Columns', value: '4' },
      ],
    },
    {
      name: 'backgroundStyle',
      type: 'select',
      defaultValue: 'background',
      options: [
        { label: 'Background', value: 'background' },
        { label: 'Surface', value: 'surface' },
        { label: 'White', value: 'white' },
      ],
    },
  ],
}

// Stats Section Block
export const statsSectionBlock: Block = {
  slug: 'statsSection',
  labels: {
    singular: 'Stats Section',
    plural: 'Stats Sections',
  },
  admin: {
    group: 'Universal Blocks',
  },
  fields: [
    {
      name: 'variant',
      type: 'select',
      defaultValue: 'standard',
      options: [
        { label: 'Standard', value: 'standard' },
        { label: 'Highlighted', value: 'highlighted' },
        { label: 'Minimal', value: 'minimal' },
        { label: 'Cards', value: 'cards' },
      ],
    },
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'subtitle',
      type: 'text',
    },
    {
      name: 'description',
      type: 'textarea',
      required: true,
    },
    {
      name: 'badge',
      type: 'text',
    },
    {
      name: 'stats',
      type: 'array',
      fields: [
        {
          name: 'value',
          type: 'text',
          required: true,
        },
        {
          name: 'label',
          type: 'text',
          required: true,
        },
        {
          name: 'description',
          type: 'text',
        },
      ],
    },
    {
      name: 'columns',
      type: 'select',
      defaultValue: '3',
      options: [
        { label: '2 Columns', value: '2' },
        { label: '3 Columns', value: '3' },
        { label: '4 Columns', value: '4' },
        { label: '5 Columns', value: '5' },
      ],
    },
    {
      name: 'backgroundStyle',
      type: 'select',
      defaultValue: 'background',
      options: [
        { label: 'Background', value: 'background' },
        { label: 'Surface', value: 'surface' },
        { label: 'White', value: 'white' },
      ],
    },
  ],
}

// Process Steps Block
export const processStepsBlock: Block = {
  slug: 'processSteps',
  labels: {
    singular: 'Process Steps',
    plural: 'Process Steps',
  },
  admin: {
    group: 'Universal Blocks',
  },
  fields: [
    {
      name: 'variant',
      type: 'select',
      defaultValue: 'numbered',
      options: [
        { label: 'Numbered', value: 'numbered' },
        { label: 'Timeline', value: 'timeline' },
        { label: 'Cards', value: 'cards' },
        { label: 'Minimal', value: 'minimal' },
      ],
    },
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'subtitle',
      type: 'text',
    },
    {
      name: 'description',
      type: 'textarea',
      required: true,
    },
    {
      name: 'badge',
      type: 'text',
    },
    {
      name: 'steps',
      type: 'array',
      fields: [
        {
          name: 'number',
          type: 'text',
          required: true,
        },
        {
          name: 'title',
          type: 'text',
          required: true,
        },
        {
          name: 'description',
          type: 'textarea',
        },
        {
          name: 'duration',
          type: 'text',
        },
        {
          name: 'deliverable',
          type: 'text',
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
      name: 'backgroundStyle',
      type: 'select',
      defaultValue: 'background',
      options: [
        { label: 'Background', value: 'background' },
        { label: 'Surface', value: 'surface' },
        { label: 'White', value: 'white' },
      ],
    },
  ],
}

// Content Cards Block
export const contentCardsBlock: Block = {
  slug: 'contentCards',
  labels: {
    singular: 'Content Cards',
    plural: 'Content Cards',
  },
  admin: {
    group: 'Universal Blocks',
  },
  fields: [
    {
      name: 'variant',
      type: 'select',
      defaultValue: 'general',
      options: [
        { label: 'Blog Posts', value: 'blog-posts' },
        { label: 'Service Brands', value: 'service-brands' },
        { label: 'Projects', value: 'projects' },
        { label: 'General', value: 'general' },
        { label: 'Featured Content', value: 'featured-content' },
      ],
    },
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'subtitle',
      type: 'text',
    },
    {
      name: 'description',
      type: 'textarea',
      required: true,
    },
    {
      name: 'badge',
      type: 'text',
    },
    {
      name: 'cards',
      type: 'array',
      fields: [
        {
          name: 'title',
          type: 'text',
          required: true,
        },
        {
          name: 'description',
          type: 'textarea',
        },
        {
          name: 'excerpt',
          type: 'textarea',
        },
        {
          name: 'category',
          type: 'text',
        },
        {
          name: 'readTime',
          type: 'text',
        },
        {
          name: 'publishedAt',
          type: 'text',
        },
        linkField({
          name: 'link',
          label: 'Card Link',
        }),
        {
          name: 'featured',
          type: 'checkbox',
        },
        {
          name: 'tags',
          type: 'array',
          fields: [
            {
              name: 'tag',
              type: 'text',
              required: true,
            },
          ],
        },
      ],
    },
    {
      name: 'columns',
      type: 'select',
      defaultValue: '3',
      options: [
        { label: '2 Columns', value: '2' },
        { label: '3 Columns', value: '3' },
        { label: '4 Columns', value: '4' },
      ],
    },
    {
      name: 'backgroundStyle',
      type: 'select',
      defaultValue: 'background',
      options: [
        { label: 'Background', value: 'background' },
        { label: 'Surface', value: 'surface' },
        { label: 'White', value: 'white' },
      ],
    },
  ],
}

// Contact Section Block
export const contactSectionBlock: Block = {
  slug: 'contactSection',
  labels: {
    singular: 'Contact Section',
    plural: 'Contact Sections',
  },
  admin: {
    group: 'Universal Blocks',
  },
  fields: [
    {
      name: 'variant',
      type: 'select',
      defaultValue: 'split',
      options: [
        { label: 'Form Only', value: 'form-only' },
        { label: 'Info Only', value: 'info-only' },
        { label: 'Split', value: 'split' },
        { label: 'Hero Style', value: 'hero-style' },
        { label: 'Compact', value: 'compact' },
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
    {
      name: 'badge',
      type: 'text',
    },
    {
      name: 'formTitle',
      type: 'text',
    },
    {
      name: 'formDescription',
      type: 'textarea',
    },
    {
      name: 'benefits',
      type: 'array',
      fields: [
        {
          name: 'benefit',
          type: 'text',
          required: true,
        },
      ],
    },
    {
      name: 'backgroundStyle',
      type: 'select',
      defaultValue: 'surface',
      options: [
        { label: 'Surface', value: 'surface' },
        { label: 'Background', value: 'background' },
        { label: 'White', value: 'white' },
        { label: 'Gradient', value: 'gradient' },
      ],
    },
  ],
}

// Comparison Table Block
export const comparisonTableBlock: Block = {
  slug: 'comparisonTable',
  labels: {
    singular: 'Comparison Table',
    plural: 'Comparison Tables',
  },
  admin: {
    group: 'Universal Blocks',
  },
  fields: [
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
    {
      name: 'badge',
      type: 'text',
    },
    {
      name: 'primaryLabel',
      type: 'text',
      required: true,
    },
    {
      name: 'secondaryLabel',
      type: 'text',
      required: true,
    },
    {
      name: 'items',
      type: 'array',
      fields: [
        {
          name: 'advantage',
          type: 'text',
          required: true,
        },
        {
          name: 'description',
          type: 'text',
        },
        {
          name: 'primary',
          type: 'select',
          options: [
            { label: 'Yes', value: 'yes' },
            { label: 'No', value: 'no' },
            { label: 'Partial', value: 'partial' },
          ],
        },
        {
          name: 'secondary',
          type: 'select',
          options: [
            { label: 'Yes', value: 'yes' },
            { label: 'No', value: 'no' },
            { label: 'Partial', value: 'partial' },
          ],
        },
      ],
    },
    {
      name: 'backgroundStyle',
      type: 'select',
      defaultValue: 'background',
      options: [
        { label: 'Background', value: 'background' },
        { label: 'Surface', value: 'surface' },
        { label: 'White', value: 'white' },
      ],
    },
  ],
}

// Simple Page Block
export const simplePageBlock: Block = {
  slug: 'simplePage',
  labels: {
    singular: 'Simple Page',
    plural: 'Simple Pages',
  },
  admin: {
    group: 'Universal Blocks',
  },
  fields: [
    {
      name: 'variant',
      type: 'select',
      defaultValue: 'standard',
      options: [
        { label: 'Standard', value: 'standard' },
        { label: 'Centered', value: 'centered' },
        { label: 'Documentation', value: 'documentation' },
        { label: 'Legal', value: 'legal' },
        { label: 'Minimal', value: 'minimal' },
      ],
    },
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'subtitle',
      type: 'text',
    },
    {
      name: 'content',
      type: 'richText',
      required: true,
    },
    {
      name: 'breadcrumbs',
      type: 'array',
      fields: [
        {
          name: 'label',
          type: 'text',
          required: true,
        },
        linkField({
          name: 'link',
          label: 'Breadcrumb Link',
        }),
      ],
    },
    {
      name: 'links',
      type: 'array',
      fields: [
        {
          name: 'title',
          type: 'text',
          required: true,
        },
        linkField({
          name: 'link',
          label: 'Page Link',
          required: true,
        }),
        {
          name: 'description',
          type: 'text',
        },
      ],
    },
  ],
}

// Brand Showcase Block
export const brandShowcaseBlock: Block = {
  slug: 'brandShowcase',
  labels: {
    singular: 'Brand Showcase',
    plural: 'Brand Showcases',
  },
  admin: {
    group: 'Universal Blocks',
  },
  fields: [
    {
      name: 'variant',
      type: 'select',
      defaultValue: 'grid',
      options: [
        { label: 'Grid', value: 'grid' },
        { label: 'Carousel', value: 'carousel' },
        { label: 'List', value: 'list' },
        { label: 'Featured', value: 'featured' },
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
    {
      name: 'badge',
      type: 'text',
    },
    {
      name: 'brands',
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
        },
        {
          name: 'logo',
          type: 'upload',
          relationTo: 'media',
        },
      ],
    },
    {
      name: 'backgroundStyle',
      type: 'select',
      defaultValue: 'background',
      options: [
        { label: 'Background', value: 'background' },
        { label: 'Surface', value: 'surface' },
        { label: 'White', value: 'white' },
      ],
    },
  ],
}

// Technical Content Block
export const technicalContentBlock: Block = {
  slug: 'technicalContent',
  labels: {
    singular: 'Technical Content',
    plural: 'Technical Content',
  },
  admin: {
    group: 'Universal Blocks',
  },
  fields: [
    {
      name: 'variant',
      type: 'select',
      defaultValue: 'overview',
      options: [
        { label: 'Overview', value: 'overview' },
        { label: 'Specifications', value: 'specifications' },
        { label: 'Process', value: 'process' },
        { label: 'Documentation', value: 'documentation' },
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
    {
      name: 'badge',
      type: 'text',
    },
    {
      name: 'overviewContent',
      type: 'richText',
    },
    {
      name: 'processSteps',
      type: 'array',
      fields: [
        {
          name: 'number',
          type: 'text',
          required: true,
        },
        {
          name: 'title',
          type: 'text',
          required: true,
        },
        {
          name: 'description',
          type: 'textarea',
        },
      ],
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
      name: 'backgroundStyle',
      type: 'select',
      defaultValue: 'background',
      options: [
        { label: 'Background', value: 'background' },
        { label: 'Surface', value: 'surface' },
        { label: 'White', value: 'white' },
      ],
    },
  ],
}

// Resource Gallery Block
export const resourceGalleryBlock: Block = {
  slug: 'resourceGallery',
  labels: {
    singular: 'Resource Gallery',
    plural: 'Resource Galleries',
  },
  admin: {
    group: 'Universal Blocks',
  },
  fields: [
    {
      name: 'variant',
      type: 'select',
      defaultValue: 'grid',
      options: [
        { label: 'Grid', value: 'grid' },
        { label: 'List', value: 'list' },
        { label: 'Categories', value: 'categories' },
        { label: 'Featured', value: 'featured' },
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
    {
      name: 'badge',
      type: 'text',
    },
    {
      name: 'resources',
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
        },
        {
          name: 'fileType',
          type: 'text',
        },
        {
          name: 'fileSize',
          type: 'text',
        },
        {
          name: 'category',
          type: 'text',
        },
        {
          name: 'downloadUrl',
          type: 'text',
        },
      ],
    },
    {
      name: 'galleryImages',
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
        },
        {
          name: 'category',
          type: 'text',
        },
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
        },
      ],
    },
    {
      name: 'backgroundStyle',
      type: 'select',
      defaultValue: 'background',
      options: [
        { label: 'Background', value: 'background' },
        { label: 'Surface', value: 'surface' },
        { label: 'White', value: 'white' },
      ],
    },
  ],
}

// Export all blocks as an array
export const universalBlocks = [
  universalHeroBlock,
  universalCTABlock,
  featureGridBlock,
  contentGridBlock,
  statsSectionBlock,
  processStepsBlock,
  contentCardsBlock,
  contactSectionBlock,
  comparisonTableBlock,
  simplePageBlock,
  brandShowcaseBlock,
  technicalContentBlock,
  resourceGalleryBlock,
]
