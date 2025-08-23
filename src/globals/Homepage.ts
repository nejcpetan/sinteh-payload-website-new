import type { GlobalConfig } from 'payload'

export const Homepage: GlobalConfig = {
  slug: 'homepage',
  access: {
    read: () => true,
    update: ({ req: { user } }) => Boolean(user),
  },
  fields: [
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
              defaultValue: 'Sinteh d.o.o.',
              admin: {
                description: 'Main hero title',
              },
            },
            {
              name: 'subtitle',
              type: 'textarea',
              defaultValue:
                'Od zasnove do zagona in servisa – modulno ter prilagojeno vašim procesom.',
              admin: {
                description: 'Hero subtitle or description',
              },
            },
            {
              name: 'backgroundImage',
              type: 'upload',
              relationTo: 'media',
              required: true,
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
              defaultValue: [
                {
                  label: 'Naši projekti',
                  type: 'anchor',
                  anchor: '#projekti',
                  variant: 'default',
                },
                {
                  label: 'Kontakt',
                  type: 'anchor',
                  anchor: '#kontakt',
                  variant: 'outline',
                },
              ],
            },
            {
              name: 'bottomText',
              type: 'text',
              defaultValue: 'Certifcirane komponente, sledljivost in varnost',
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
              defaultValue: [
                {
                  title: 'PLC programiranje',
                  description:
                    'Sistematičen pristop, preverjene komponente, popolna dokumentacija.',
                  features: [
                    { feature: 'Siemens TIA Portal' },
                    { feature: 'Allen-Bradley Studio 5000' },
                    { feature: 'Schneider Unity Pro' },
                  ],
                  button: {
                    text: 'Več o storitvi',
                    type: 'anchor',
                    anchor: '#kontakt',
                  },
                },
                {
                  title: 'HMI/SCADA sistemi',
                  description: 'Uporabniški vmesniki za nadzor in upravljanje procesov.',
                  features: [
                    { feature: 'WinCC' },
                    { feature: 'FactoryTalk View' },
                    { feature: 'Vijeo Citect' },
                  ],
                  button: {
                    text: 'Več o storitvi',
                    type: 'anchor',
                    anchor: '#kontakt',
                  },
                },
                {
                  title: 'Pogonska tehnika',
                  description: 'Programiranje in konfiguracija frekvenčnih pretvornikov.',
                  features: [
                    { feature: 'Sinamics' },
                    { feature: 'PowerFlex' },
                    { feature: 'Altivar' },
                  ],
                  button: {
                    text: 'Več o storitvi',
                    type: 'anchor',
                    anchor: '#kontakt',
                  },
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
              defaultValue: [
                { text: 'ISO 9001' },
                { text: 'CE označevanje' },
                { text: 'Siemens partner' },
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
              defaultValue: [
                { number: '150+', label: 'Končanih projektov' },
                { number: '10+', label: 'Let izkušenj' },
                { number: '50+', label: 'Zadovoljnih strank' },
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
              defaultValue: [
                { step: 'Analiza potreb' },
                { step: 'Načrtovanje' },
                { step: 'Programiranje' },
                { step: 'Testiranje' },
                { step: 'Zagon' },
                { step: 'Podpora' },
              ],
            },
            {
              name: 'calloutText',
              type: 'textarea',
              defaultValue:
                'Naše ekipe načrtujejo, programirajo in zaganjajo sisteme krmiljenja, pogone ter HMI/SCADA v tesnem sodelovanju z vašimi tehnologijami.',
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
              defaultValue: {
                text: 'Več o nas',
                type: 'anchor',
                anchor: '#kontakt',
              },
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
              defaultValue: [
                { reason: 'Certificirane komponente in skladnost s standardi' },
                { reason: 'Obsežna dokumentacija in prenos znanja' },
                { reason: 'Predvidljivi roki in transparentno komuniciranje' },
                { reason: 'Odziven servis in dolgoročna podpora' },
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
              defaultValue: [
                {
                  title: 'Varnost',
                  description: 'Skladnost s standardi in preverjene komponente.',
                  icon: 'shield',
                },
                {
                  title: 'Zanesljivost',
                  description: 'Stabilno delovanje in predvidljivi zagoni.',
                  icon: 'cog',
                },
                {
                  title: 'Podpora',
                  description: 'Odziven servis ter prenos znanja vaši ekipi.',
                  icon: 'headset',
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
              defaultValue: {
                text: 'Zaupajte nam',
                type: 'anchor',
                anchor: '#kontakt',
              },
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
              defaultValue: [
                {
                  title: 'Avtomatizacija proizvodne linije',
                  category: 'Avtomatizacija',
                  description:
                    'Popolna avtomatizacija proizvodne linije z integracijo MES sistema.',
                  stack: [
                    { technology: 'Siemens S7-1500' },
                    { technology: 'WinCC' },
                    { technology: 'PROFINET' },
                  ],
                },
                {
                  title: 'Sistem nadzora kakovosti',
                  category: 'Kakovost',
                  description: 'Implementacija sistema za nadzor kakovosti s sledljivostjo.',
                  stack: [
                    { technology: 'Allen-Bradley' },
                    { technology: 'FactoryTalk' },
                    { technology: 'Cognex' },
                  ],
                },
                {
                  title: 'Energetski management',
                  category: 'Energetika',
                  description: 'Sistem za upravljanje energije in optimizacijo porabe.',
                  stack: [
                    { technology: 'Schneider' },
                    { technology: 'PowerLogic' },
                    { technology: 'Modbus' },
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
              defaultValue: {
                text: 'Vsi projekti',
                type: 'anchor',
                anchor: '#kontakt',
              },
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
      ],
    },
  ],
}
