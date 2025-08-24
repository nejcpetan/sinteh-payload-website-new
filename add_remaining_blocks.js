// Script to add remaining product blocks to Pages.ts
const fs = require('fs');
const path = require('path');

const pagesFile = path.join(__dirname, 'src/collections/Pages.ts');
let content = fs.readFileSync(pagesFile, 'utf8');

// Define all the remaining blocks
const blocks = [
  {
    slug: 'specifications',
    labels: {
      singular: 'Specifications',
      plural: 'Specifications',
    },
    admin: {
      group: 'Product Page',
    },
    fields: [
      { name: 'badge', type: 'text' },
      { name: 'title', type: 'text', required: true },
      { name: 'subtitle', type: 'textarea' },
      {
        name: 'specifications',
        type: 'array',
        fields: [
          { name: 'category', type: 'text', required: true },
          {
            name: 'items',
            type: 'array',
            fields: [
              { name: 'label', type: 'text', required: true },
              { name: 'value', type: 'text', required: true },
            ],
          },
        ],
      },
      {
        name: 'certificationBadges',
        type: 'array',
        fields: [
          { name: 'name', type: 'text', required: true },
          { name: 'description', type: 'text', required: true },
        ],
      },
      {
        name: 'additionalInfo',
        type: 'group',
        fields: [
          { name: 'title', type: 'text' },
          { name: 'description', type: 'textarea' },
          {
            name: 'details',
            type: 'array',
            fields: [
              { name: 'label', type: 'text', required: true },
              { name: 'value', type: 'text', required: true },
            ],
          },
        ],
      },
    ],
  }
];

// Create the block string representations
const blockStrings = blocks.map(block => {
  return `        {
          slug: '${block.slug}',
          labels: ${JSON.stringify(block.labels, null, 12).replace(/"/g, "'")},
          admin: ${JSON.stringify(block.admin, null, 12).replace(/"/g, "'")},
          fields: ${JSON.stringify(block.fields, null, 12).replace(/"/g, "'")},
        }`;
}).join(',\n');

// Replace the end of the blocks array
const replacement = `          ],
        },
${blockStrings},
      ],`;

content = content.replace(/          \],\s*\},\s*\],/, replacement);

fs.writeFileSync(pagesFile, content);
console.log('Added remaining blocks successfully!');
