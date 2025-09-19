import type { CollectionConfig } from 'payload'
import { triggerRevalidation, isPublished } from '@/lib/revalidation'
import { universalBlocks } from './blocks/universalBlocks'
import { linkFieldArray } from '@/lib/linkField'

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
      localized: true, // Localize page title for different languages
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
      localized: true, // Localize page content blocks for different languages
      blocks: [
        // Homepage Blocks
        {
          slug: 'hero',
          labels: {
            singular: 'Hero Section',
            plural: 'Hero Sections',
          },
          admin: {
            group: 'Homepage',
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
          admin: {
            group: 'Homepage',
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
          admin: {
            group: 'Homepage',
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
          admin: {
            group: 'Homepage',
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
              defaultValue: [
                {
                  number: '500+',
                  label: 'Uspešnih implementacij',
                },
                {
                  number: '15',
                  label: 'Različnih industrij',
                },
                {
                  number: '99.9%',
                  label: 'Zanesljivost delovanja',
                },
              ],
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
          admin: {
            group: 'Homepage',
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
          admin: {
            group: 'Homepage',
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
          admin: {
            group: 'Homepage',
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
          admin: {
            group: 'General',
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
        // Product Page Blocks
        {
          slug: 'productHero',
          labels: {
            singular: 'Product Hero',
            plural: 'Product Heroes',
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
                placeholder: 'Mehanska varnost',
              },
            },
            {
              name: 'title',
              type: 'text',
              required: true,
              admin: {
                description: 'Main product title',
                placeholder: 'Fortress mGard',
              },
            },
            {
              name: 'subtitle',
              type: 'text',
              admin: {
                description: 'Product subtitle',
                placeholder: 'Mehanska varnost brez kompromisov',
              },
            },
            {
              name: 'description',
              type: 'textarea',
              admin: {
                description: 'Product description',
                placeholder:
                  'Popolnoma mehanska rešitev zaklepanja in medsebojnega zaklepanja komponent, ki ne zahteva električne povezave. Zasnovana za aplikacije, kjer je varnost potrebno zagotoviti fizično, neposredno in brez elektronskih tveganj.',
              },
            },
            {
              name: 'backgroundImage',
              type: 'upload',
              relationTo: 'media',
              admin: {
                description: 'Product hero image',
              },
            },
            {
              name: 'keyBenefits',
              type: 'array',
              defaultValue: [
                {
                  title: '100% Mehanska',
                  description: 'Brez električne povezave',
                },
                {
                  title: 'SIL 3 Certificiran',
                  description: 'Najvišji varnostni standardi',
                },
                {
                  title: 'Retrofit Prijazen',
                  description: 'Enostavna integracija',
                },
                {
                  title: 'Modularna Zasnova',
                  description: 'Prilagoditve po meri',
                },
              ],
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
              name: 'ctaButtons',
              type: 'array',
              defaultValue: [
                {
                  label: 'Zahtevaj ponudbo',
                  type: 'anchor',
                  anchor: 'kontakt',
                  variant: 'default',
                },
                {
                  label: 'Prenesi katalog',
                  type: 'anchor',
                  anchor: 'resources',
                  variant: 'outline',
                },
              ],
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
          ],
        },
        {
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
                placeholder: 'Ključne prednosti',
              },
            },
            {
              name: 'title',
              type: 'text',
              required: true,
              admin: {
                placeholder: 'Zakaj mGard?',
              },
            },
            {
              name: 'subtitle',
              type: 'textarea',
              admin: {
                placeholder:
                  'mGard deluje brez elektrike in zagotavlja fizično prisiljeno zaporedje dostopa brez napak ali by-pass možnosti.',
              },
            },
            {
              name: 'features',
              type: 'array',
              defaultValue: [
                {
                  icon: 'mechanical',
                  title: '100% Mehanska varnost',
                  description:
                    'Popolna varnost brez napajanja ali elektronskih komponent. Deluje na principu ujetih ključev za fizično prisiljeno zaporedje.',
                },
                {
                  icon: 'shield',
                  title: 'Najvišji certifikati',
                  description:
                    'SIL 3, Category 4, PLe s TÜV potrditvijo. Zagotovljena skladnost z najstrožjimi varnostnimi standardi.',
                },
                {
                  icon: 'retrofit',
                  title: 'Idealno za retrofit',
                  description:
                    'Enostavna integracija v obstoječe procese brez ožičenja. Minimalni posegi v trenutno infrastrukturo.',
                },
                {
                  icon: 'modular',
                  title: 'Modularno sestavljivo',
                  description:
                    'Prilagodite vsako aplikacijo s kombinacijo različnih ključavnic in aktuatorjev. Fleksibilne konfiguracije.',
                },
                {
                  icon: 'temperature',
                  title: 'Odporno na okolje',
                  description:
                    'Ohišja iz nerjavečega jekla ali ponikljane medenine. Visoka odpornost na mehanske vplive in korozijo.',
                },
                {
                  icon: 'key',
                  title: 'Trapped Key sistem',
                  description:
                    'Ključ ostane ujet v varnostni enoti, dokler je vir energije aktiven. Preprečuje prezgoden dostop do stroja.',
                },
              ],
              fields: [
                {
                  name: 'icon',
                  type: 'select',
                  required: true,
                  options: [
                    { label: 'Mechanical', value: 'mechanical' },
                    { label: 'Shield', value: 'shield' },
                    { label: 'Retrofit', value: 'retrofit' },
                    { label: 'Modular', value: 'modular' },
                    { label: 'Temperature', value: 'temperature' },
                    { label: 'Key', value: 'key' },
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
              defaultValue: {
                title: 'Rezultat? Varno zaporedje delovanja in zaščita osebja',
                description:
                  'Brez napak ali improvizacij. Modularna zasnova omogoča konfiguracijo po meri – glede na proces, tehnologijo in vrsto izolacije.',
              },
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
        },
        {
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
              admin: {
                placeholder: 'Galerija produktov',
              },
            },
            {
              name: 'title',
              type: 'text',
              required: true,
              admin: {
                placeholder: 'mGard sistem v detajlih',
              },
            },
            {
              name: 'subtitle',
              type: 'textarea',
              admin: {
                placeholder:
                  'Raziskajte različne komponente mGard sistema in njihove aplikacije v različnih industrijskih okoljih.',
              },
            },
            {
              name: 'images',
              type: 'array',
              defaultValue: [
                {
                  title: 'mGard Osnovni modul',
                  description: 'Jedro sistema z trapped key mehanizmom',
                  category: 'Osnovni moduli',
                },
                {
                  title: 'Ključavnica za ventile',
                  description: 'Specialna ključavnica za ball valve aplikacije',
                  category: 'Ključavnice',
                },
                {
                  title: 'Električna ključavnica',
                  description: 'mGard ključavnica za električne prekinjalnike',
                  category: 'Ključavnice',
                },
                {
                  title: 'Pneumatska ključavnica',
                  description: 'Za pnevmatske ventile in aktuatorje',
                  category: 'Ključavnice',
                },
                {
                  title: 'Instalacija v procesu',
                  description: 'Primer implementacije v kemijski industriji',
                  category: 'Implementacije',
                },
                {
                  title: 'ATEX certifkiran modul',
                  description: 'Za eksplozijsko nevarna območja',
                  category: 'Specialni moduli',
                },
                {
                  title: 'Kompletsna mGard postaja',
                  description: 'Večstopenjski varnostni sistem',
                  category: 'Implementacije',
                },
                {
                  title: 'Ključi in akcesoriji',
                  description: 'Različni tipi ključev in priključkov',
                  category: 'Akcesoriji',
                },
              ],
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
              defaultValue: {
                title: 'Potrebujete visoko-ločljivostne slike?',
                description:
                  'Prenesite celotno galerijo produktnih slik v tiskarsko kakovosti za vašo dokumentacijo.',
                downloadButtonText: 'Prenesi galerijo',
                requestButtonText: 'Zahtevaj specifične slike',
              },
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
        },
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
              defaultValue: [
                {
                  category: 'Varnostni certifikati',
                  items: [
                    { label: 'Varnostna raven', value: 'SIL 3' },
                    { label: 'Kategorija', value: 'Category 4' },
                    { label: 'Performance Level', value: 'PLe' },
                    { label: 'Certificiranje', value: 'TÜV potrjeno' },
                  ],
                },
                {
                  category: 'Materiali in konstrukcija',
                  items: [
                    { label: 'Ohišje', value: 'Nerjaveče jeklo / Ponikljana medenina' },
                    { label: 'Ključi', value: 'Nerjaveče jeklo' },
                    { label: 'Tesnila', value: 'NBR/EPDM' },
                    { label: 'Zaščitni razred', value: 'IP66/IP67' },
                  ],
                },
                {
                  category: 'Delovni pogoji',
                  items: [
                    { label: 'Temperatura', value: '-40°C do +80°C' },
                    { label: 'Vlažnost', value: 'Do 95% RH' },
                    { label: 'Vibracije', value: 'IEC 60068-2-6' },
                    { label: 'Korozijska odpornost', value: '1000h salt spray test' },
                  ],
                },
                {
                  category: 'Standardi skladnosti',
                  items: [
                    { label: 'Varnostni standardi', value: 'EN ISO 13849-1' },
                    { label: 'ATEX direktiva', value: '2014/34/EU' },
                    { label: 'Machinery direktiva', value: '2006/42/EC' },
                    { label: 'EMC direktiva', value: '2014/30/EU' },
                  ],
                },
              ],
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
              defaultValue: [
                {
                  name: 'SIL 3',
                  description: 'Safety Integrity Level',
                },
                {
                  name: 'TÜV',
                  description: 'Certificirano',
                },
                {
                  name: 'PLe',
                  description: 'Performance Level',
                },
                {
                  name: 'ATEX',
                  description: 'Ex zraky območja',
                },
              ],
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
              defaultValue: {
                title: 'Življenjska doba in vzdrževanje',
                description:
                  'mGard sistemi so zasnovani za dolgoletno delovanje v zahtevnih industrijskih okoljih. Mehansko delovanje zagotavlja minimalno potrebo po vzdrževanju.',
                details: [
                  {
                    label: 'Pričakovana življenjska doba',
                    value: '20+ let',
                  },
                  {
                    label: 'Vzdrževalni interval',
                    value: 'Letni pregled',
                  },
                ],
              },
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
        },
        {
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
              defaultValue: [
                {
                  icon: 'oilgas',
                  title: 'Procesna industrija',
                  description: 'Nafta, plin, kemija',
                  details: [
                    {
                      detail: 'Varno zapiranje ventilov na cevovodih',
                    },
                    {
                      detail: 'Isolation procedures za vzdrževanje',
                    },
                    {
                      detail: 'Lock-out/Tag-out sistemi',
                    },
                    {
                      detail: 'Varnostno zapiranje kompressorjev',
                    },
                  ],
                },
                {
                  icon: 'energy',
                  title: 'Energetski sistemi',
                  description: 'Transformatorji, turbine, stikališča',
                  details: [
                    {
                      detail: 'Electrical isolation procedures',
                    },
                    {
                      detail: 'Turbinski varnostni sistemi',
                    },
                    {
                      detail: 'Transformer maintenance safety',
                    },
                    {
                      detail: 'Switchgear locking systems',
                    },
                  ],
                },
                {
                  icon: 'pharm',
                  title: 'Farmacija in prehrambna industrija',
                  description: 'ATEX področja',
                  details: [
                    {
                      detail: 'Sterile area access control',
                    },
                    {
                      detail: 'Clean room safety protocols',
                    },
                    {
                      detail: 'Process vessel isolation',
                    },
                    {
                      detail: 'Powder handling safety',
                    },
                  ],
                },
                {
                  icon: 'manufacturing',
                  title: 'Proizvodnja',
                  description: 'Tovarne brez električnega zaklepanja',
                  details: [
                    {
                      detail: 'Machine guarding systems',
                    },
                    {
                      detail: 'Pneumatic system isolation',
                    },
                    {
                      detail: 'Press safety systems',
                    },
                    {
                      detail: 'Conveyor belt safety',
                    },
                  ],
                },
                {
                  icon: 'atex',
                  title: 'ATEX področja',
                  description: 'Eksplozijska nevarna območja',
                  details: [
                    {
                      detail: 'Zone 1 & Zone 2 applications',
                    },
                    {
                      detail: 'Dust explosion prevention',
                    },
                    {
                      detail: 'Gas isolation procedures',
                    },
                    {
                      detail: 'Intrinsically safe systems',
                    },
                  ],
                },
                {
                  icon: 'water',
                  title: 'Voda in kanalizacija',
                  description: 'Komunalne storitve',
                  details: [
                    {
                      detail: 'Pump station safety',
                    },
                    {
                      detail: 'Valve isolation systems',
                    },
                    {
                      detail: 'Treatment plant safety',
                    },
                    {
                      detail: 'Distribution network safety',
                    },
                  ],
                },
              ],
              fields: [
                {
                  name: 'icon',
                  type: 'select',
                  required: true,
                  options: [
                    { label: 'Oil & Gas', value: 'oilgas' },
                    { label: 'Energy', value: 'energy' },
                    { label: 'Pharmaceutical', value: 'pharm' },
                    { label: 'Manufacturing', value: 'manufacturing' },
                    { label: 'ATEX', value: 'atex' },
                    { label: 'Water', value: 'water' },
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
              defaultValue: {
                title: 'Primer uporabe: Kemijska industrija',
                description:
                  'V kemijski tovarni je mGard sistem omogočil varno vzdrževanje reaktorjev z mehanskim zaklepanjem vseh virov energije. Sistem zagotavlja, da se reaktor lahko odpre šele po popolni izolaciji vseh kemijskih dovoda.',
                stats: [
                  {
                    label: 'Zmanjšanje nesreč',
                    value: '100%',
                  },
                  {
                    label: 'Čas za vzdrževanje',
                    value: '-40%',
                  },
                ],
              },
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
        },
        {
          slug: 'technicalOverview',
          labels: {
            singular: 'Technical Overview',
            plural: 'Technical Overviews',
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
              name: 'description',
              type: 'textarea',
              required: true,
            },
            {
              name: 'technicalImage',
              type: 'upload',
              relationTo: 'media',
            },
            {
              name: 'processSteps',
              type: 'array',
              defaultValue: [
                {
                  title: 'Zaklepanje vira energije',
                  description: 'Ključ se ujame v zaklepno enoto, dokler je napajanje aktivno',
                },
                {
                  title: 'Fizično zaporedje',
                  description: 'Ključ se sprosti šele po varnem izklopu vira energije',
                },
                {
                  title: 'Dostop do stroja',
                  description: 'Šele zdaj je možen varen dostop za vzdrževanje ali servis',
                },
              ],
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
              name: 'technicalBenefits',
              type: 'array',
              defaultValue: [
                {
                  title: 'Fizična prisila',
                  description: 'Brez možnosti by-pass ali napačnega vrstnega reda operacij',
                },
                {
                  title: 'Logična sekvenca',
                  description: 'Zagotovljeno varno zaporedje delovanja brez napak',
                },
              ],
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
          ],
        },
        {
          slug: 'benefitsComparison',
          labels: {
            singular: 'Benefits Comparison',
            plural: 'Benefits Comparisons',
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
              name: 'benefits',
              type: 'array',
              defaultValue: [
                {
                  advantage: '100% mehanska varnost',
                  description: 'Popolna varnost brez napajanja ali elektronskih komponent',
                  mGard: '✓ Mehanski trapped key sistem',
                  electronic: '✗ Odvisno od napajanja',
                },
                {
                  advantage: 'Najvišji certifikati',
                  description: 'SIL 3, Category 4, PLe – s TÜV potrditvijo',
                  mGard: '✓ SIL 3 / PLe certificirano',
                  electronic: '△ Do SIL 2 (tipično)',
                },
                {
                  advantage: 'Idealno za retrofit',
                  description: 'Enostavna integracija v obstoječe procese brez ožičenja',
                  mGard: '✓ Brez električne povezave',
                  electronic: '✗ Kompleksna integracija',
                },
                {
                  advantage: 'Dokazana zanesljivost',
                  description: 'Rešitve, preizkušene v najzahtevnejših industrijskih okoljih',
                  mGard: '✓ 20+ let življenjska doba',
                  electronic: '△ 5-10 let življenjska doba',
                },
                {
                  advantage: 'Modularno sestavljivo',
                  description: 'Prilagodite vsako aplikacijo s kombinacijo različnih ključavnic',
                  mGard: '✓ Fleksibilne konfiguracije',
                  electronic: '△ Omejene možnosti',
                },
                {
                  advantage: 'ATEX združljivost',
                  description: 'Primerno za eksplozijsko nevarna območja',
                  mGard: '✓ Intrinsically safe',
                  electronic: '△ Posebne Ex verzije potrebne',
                },
                {
                  advantage: 'Vzdrževanje',
                  description: 'Minimalne potrebe po vzdrževanju in servisiranju',
                  mGard: '✓ Letni pregled zadostuje',
                  electronic: '✗ Redni servis potreben',
                },
                {
                  advantage: 'Stroški lastništva',
                  description: 'Dolgoročni stroški skozi življenjsko dobo sistema',
                  mGard: '✓ Nizki TCO',
                  electronic: '✗ Visoki TCO',
                },
              ],
              fields: [
                {
                  name: 'advantage',
                  type: 'text',
                  required: true,
                },
                {
                  name: 'description',
                  type: 'text',
                  required: true,
                },
                {
                  name: 'mGard',
                  type: 'text',
                  required: true,
                },
                {
                  name: 'electronic',
                  type: 'text',
                  required: true,
                },
              ],
            },
            {
              name: 'summaryCards',
              type: 'array',
              defaultValue: [
                {
                  icon: 'shield',
                  title: 'Maksimalna varnost',
                  description: 'SIL 3 certificirana mehanska varnost brez elektronskih komponent',
                },
                {
                  icon: 'clock',
                  title: 'Dolgotrajna rešitev',
                  description: '20+ let življenjska doba z minimalnim vzdrževanjem',
                },
                {
                  icon: 'users',
                  title: 'Zaupanja vredno',
                  description: '500+ uspešnih implementacij v kritičnih aplikacijah',
                },
              ],
              fields: [
                {
                  name: 'icon',
                  type: 'select',
                  required: true,
                  options: [
                    { label: 'Shield', value: 'shield' },
                    { label: 'Clock', value: 'clock' },
                    { label: 'Users', value: 'users' },
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
              ],
            },
            {
              name: 'bottomCTA',
              type: 'group',
              defaultValue: {
                title: 'Iščete zanesljivo varnostno rešitev?',
                description:
                  'mGard mehanski sistemi z ujetim ključem so preverjeni, robustni in logično zaporedni – brez možnosti napake. Idealna izbira za industrije, kjer elektronske rešitve niso dovolj zanesljive.',
                primaryButtonText: 'Kontaktirajte nas',
                secondaryButtonText: 'Prenesi dokumentacijo',
              },
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
                  name: 'primaryButtonText',
                  type: 'text',
                  defaultValue: 'Kontaktirajte nas',
                },
                {
                  name: 'secondaryButtonText',
                  type: 'text',
                  defaultValue: 'Prenesi dokumentacijo',
                },
              ],
            },
          ],
        },
        {
          slug: 'productCTA',
          labels: {
            singular: 'Product CTA',
            plural: 'Product CTAs',
          },
          admin: {
            group: 'Product Page',
          },
          fields: [
            {
              name: 'title',
              type: 'text',
              required: true,
              admin: {
                placeholder: 'Pripravljeni za varnejši obrat?',
              },
            },
            {
              name: 'description',
              type: 'textarea',
              required: true,
              admin: {
                placeholder:
                  'Naši strokovnjaki vam bodo pomagali izbrati pravo mGard rešitev za vašo aplikacijo. Kontaktirajte nas za brezplačno svetovanje in prilagojen predlog rešitve.',
              },
            },
            {
              name: 'stats',
              type: 'array',
              defaultValue: [
                {
                  value: 'SIL 3',
                  label: 'Najvišja varnost',
                },
                {
                  value: '20+',
                  label: 'Let izkušenj',
                },
                {
                  value: '500+',
                  label: 'Uspešnih projektov',
                },
              ],
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
              name: 'contactInfo',
              type: 'group',
              defaultValue: {
                phone: '+386 (3) 426 36 46',
                email: 'info@sinteh.pro',
                responseTime: '24 ur (delovni dnevi)',
              },
              fields: [
                {
                  name: 'phone',
                  type: 'text',
                },
                {
                  name: 'email',
                  type: 'text',
                },
                {
                  name: 'responseTime',
                  type: 'text',
                },
              ],
            },
            {
              name: 'whyUsPoints',
              type: 'array',
              defaultValue: [
                {
                  text: '30+ let izkušenj v industrijski avtomatizaciji',
                },
                {
                  text: 'Certificiran partner za varnostne sisteme',
                },
                {
                  text: 'Celotna podpora od načrtovanja do servisa',
                },
                {
                  text: 'Lokalna podpora v slovenskem jeziku',
                },
              ],
              fields: [
                {
                  name: 'text',
                  type: 'text',
                  required: true,
                },
              ],
            },
            {
              name: 'heroImage',
              type: 'upload',
              relationTo: 'media',
            },
            {
              name: 'formTitle',
              type: 'text',
              defaultValue: 'Povpraševanje za sistem',
              admin: {
                placeholder: 'Povpraševanje za mGard sistem',
              },
            },
            {
              name: 'applicationOptions',
              type: 'array',
              defaultValue: [
                {
                  value: 'procesna',
                  label: 'Procesna industrija',
                },
                {
                  value: 'energetika',
                  label: 'Energetski sistemi',
                },
                {
                  value: 'farmacija',
                  label: 'Farmacija / Prehrambna',
                },
                {
                  value: 'proizvodnja',
                  label: 'Proizvodnja',
                },
                {
                  value: 'atex',
                  label: 'ATEX področja',
                },
                {
                  value: 'drugo',
                  label: 'Drugo',
                },
              ],
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
              name: 'privacyText',
              type: 'text',
              defaultValue:
                'Soglašam z politiko zasebnosti in obdelavo osebnih podatkov za namen odgovora na povpraševanje.',
            },
          ],
        },
        {
          slug: 'productResources',
          labels: {
            singular: 'Product Resources',
            plural: 'Product Resources',
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
              name: 'resources',
              type: 'array',
              defaultValue: [
                {
                  title: 'Tehnična dokumentacija',
                  description: 'Podrobne specifikacije, dimenzije in navodila za vgradnjo',
                  fileType: 'PDF',
                  fileSize: '2.4 MB',
                  icon: '📋',
                  category: 'Dokumentacija',
                },
                {
                  title: 'Katalog produktov',
                  description: 'Celovit pregled vseh mGard komponent in konfiguracij',
                  fileType: 'PDF',
                  fileSize: '8.1 MB',
                  icon: '📖',
                  category: 'Katalogi',
                },
                {
                  title: 'Navodila za namestitev',
                  description: 'Korak-za-korakom vodič za pravilno namestitev',
                  fileType: 'PDF',
                  fileSize: '1.8 MB',
                  icon: '🔧',
                  category: 'Dokumentacija',
                },
                {
                  title: 'Video predstavitev',
                  description: 'Kako deluje mGard trapped key sistem',
                  fileType: 'VIDEO',
                  fileSize: 'HD kvaliteta',
                  icon: '🎥',
                  category: 'Video',
                },
                {
                  title: 'Certifikati',
                  description: 'SIL 3, TÜV in ATEX certifikati',
                  fileType: 'PDF',
                  fileSize: '1.2 MB',
                  icon: '🏆',
                  category: 'Certifikati',
                },
                {
                  title: 'CAD modeli',
                  description: '3D modeli za načrtovanje (.dwg, .step)',
                  fileType: 'ZIP',
                  fileSize: '5.6 MB',
                  icon: '📐',
                  category: 'CAD',
                },
                {
                  title: 'Aplikacijske študije',
                  description: 'Primeri uporabe v različnih industrijah',
                  fileType: 'PDF',
                  fileSize: '3.2 MB',
                  icon: '💼',
                  category: 'Študije',
                },
                {
                  title: 'Rezervni deli',
                  description: 'Seznam rezervnih delov in naročilne kode',
                  fileType: 'PDF',
                  fileSize: '0.8 MB',
                  icon: '⚙️',
                  category: 'Dokumentacija',
                },
              ],
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
                  name: 'fileType',
                  type: 'text',
                  required: true,
                },
                {
                  name: 'fileSize',
                  type: 'text',
                  required: true,
                },
                {
                  name: 'icon',
                  type: 'text',
                  required: true,
                },
                {
                  name: 'category',
                  type: 'text',
                  required: true,
                },
                {
                  name: 'downloadUrl',
                  type: 'text',
                },
              ],
            },
            {
              name: 'quickAccessItems',
              type: 'array',
              defaultValue: [
                {
                  name: 'Osnovni katalog',
                  fileInfo: 'PDF, 8.1 MB',
                },
                {
                  name: 'Tehnična dokumentacija',
                  fileInfo: 'PDF, 2.4 MB',
                },
                {
                  name: 'SIL 3 certifikat',
                  fileInfo: 'PDF, 0.5 MB',
                },
              ],
              fields: [
                {
                  name: 'name',
                  type: 'text',
                  required: true,
                },
                {
                  name: 'fileInfo',
                  type: 'text',
                  required: true,
                },
                {
                  name: 'downloadUrl',
                  type: 'text',
                },
              ],
            },
            {
              name: 'contactSection',
              type: 'group',
              defaultValue: {
                title: 'Potrebujete več?',
                description:
                  'Če potrebujete specifične dokumente, CAD modele ali tehnično podporo, nas kontaktirajte.',
                phone: '+386 (3) 426 36 46',
                email: 'info@sinteh.pro',
              },
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
                  name: 'phone',
                  type: 'text',
                },
                {
                  name: 'email',
                  type: 'text',
                },
              ],
            },
            {
              name: 'newsletterSection',
              type: 'group',
              defaultValue: {
                title: 'Ostanite obveščeni o novih dokumentih',
                description:
                  'Prijavite se na naše obvestilo in prejmite najnovejše tehnične dokumente, aplikacijske študije in posodobitve produktov.',
                privacyText: 'Spoštujemo vašo zasebnost. Odjava možna kadarkoli.',
              },
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
                  name: 'privacyText',
                  type: 'text',
                },
              ],
            },
          ],
        },
        // Contact Page Blocks
        {
          slug: 'contactHero',
          labels: {
            singular: 'Contact Hero',
            plural: 'Contact Heroes',
          },
          admin: {
            group: 'Contact Page',
          },
          fields: [
            {
              name: 'title',
              type: 'text',
              required: true,
              defaultValue: 'Kontakt',
              admin: {
                description: 'Main contact page title',
              },
            },
            {
              name: 'subtitle',
              type: 'text',
              defaultValue: 'Odgovarjamo v 24h | Nujna podpora: 24/7',
              admin: {
                description: 'Hero subtitle with response times',
              },
            },
            {
              name: 'quickContactMethods',
              type: 'array',
              defaultValue: [
                {
                  type: 'phone',
                  label: 'Telefon',
                  value: '+386 (3) 426 36 46',
                  link: 'tel:+38634263646',
                },
                {
                  type: 'email',
                  label: 'E-pošta',
                  value: 'info@sinteh.pro',
                  link: 'mailto:info@sinteh.pro',
                },
                {
                  type: 'location',
                  label: 'Lokacija',
                  value: 'Celje, Slovenija',
                  link: '#location',
                },
              ],
              fields: [
                {
                  name: 'type',
                  type: 'select',
                  required: true,
                  options: [
                    {
                      label: 'Phone',
                      value: 'phone',
                    },
                    {
                      label: 'Email',
                      value: 'email',
                    },
                    {
                      label: 'Location',
                      value: 'location',
                    },
                  ],
                },
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
                {
                  name: 'link',
                  type: 'text',
                  required: true,
                },
              ],
            },
          ],
        },
        {
          slug: 'contactForm',
          labels: {
            singular: 'Contact Form',
            plural: 'Contact Forms',
          },
          admin: {
            group: 'Contact Page',
          },
          fields: [
            {
              name: 'badge',
              type: 'text',
              defaultValue: 'Povpraševanje',
              admin: {
                description: 'Small badge text above title',
              },
            },
            {
              name: 'title',
              type: 'text',
              required: true,
              defaultValue: 'Pošljite sporočilo',
              admin: {
                description: 'Contact form section title',
              },
            },
            {
              name: 'subtitle',
              type: 'textarea',
              defaultValue: 'Odgovorimo v 24 urah.',
              admin: {
                description: 'Contact form section subtitle',
              },
            },
            {
              name: 'formTitle',
              type: 'text',
              defaultValue: 'Kontaktni obrazec',
              admin: {
                description: 'Title inside the form container',
              },
            },
            {
              name: 'submitButtonText',
              type: 'text',
              defaultValue: 'Pošlji povpraševanje',
            },
            {
              name: 'submitButtonLoadingText',
              type: 'text',
              defaultValue: 'Pošiljam...',
            },
            {
              name: 'privacyText',
              type: 'textarea',
              defaultValue:
                'Soglašam z obdelavo osebnih podatkov in politiko zasebnosti. Podatki bodo uporabljeni izključno za obravnavo povpraševanja in pripravo ponudbe.',
            },
          ],
        },
        {
          slug: 'contactInfo',
          labels: {
            singular: 'Contact Information',
            plural: 'Contact Information',
          },
          admin: {
            group: 'Contact Page',
          },
          fields: [
            {
              name: 'badge',
              type: 'text',
              defaultValue: 'Kontaktni podatki',
              admin: {
                description: 'Small badge text above title',
              },
            },
            {
              name: 'title',
              type: 'text',
              required: true,
              defaultValue: 'Direkten kontakt',
              admin: {
                description: 'Contact information section title',
              },
            },
            {
              name: 'subtitle',
              type: 'textarea',
              defaultValue: 'Telefon in e-mail za hitrejši odziv.',
              admin: {
                description: 'Contact information section subtitle',
              },
            },
            {
              name: 'contactMethods',
              type: 'array',
              defaultValue: [
                {
                  title: 'Splošne informacije',
                  email: 'info@sinteh.pro',
                  phone: '+386 (3) 426 36 46',
                  description: 'Splošna vprašanja, informacije o podjetju in storitvah',
                  hours: 'Pon-Pet: 7:00-16:00',
                },
                {
                  title: 'Tehnična podpora',
                  email: 'servis@sinteh.pro',
                  phone: '+386 (3) 426 36 46',
                  description: 'Servis, vzdrževanje, tehnična pomoč in nadomestni deli',
                  hours: '24/7 dežurna služba',
                },
                {
                  title: 'Prodaja in projekti',
                  email: 'prodaja@sinteh.pro',
                  phone: '+386 (3) 426 36 46',
                  description: 'Ponudbe, projekti, svetovanje in tehnični izračuni',
                  hours: 'Pon-Pet: 7:00-16:00',
                },
              ],
              fields: [
                {
                  name: 'title',
                  type: 'text',
                  required: true,
                },
                {
                  name: 'email',
                  type: 'text',
                  required: true,
                },
                {
                  name: 'phone',
                  type: 'text',
                  required: true,
                },
                {
                  name: 'description',
                  type: 'textarea',
                  required: true,
                },
                {
                  name: 'hours',
                  type: 'text',
                  required: true,
                },
              ],
            },
          ],
        },
        {
          slug: 'contactLocation',
          labels: {
            singular: 'Contact Location',
            plural: 'Contact Locations',
          },
          admin: {
            group: 'Contact Page',
          },
          fields: [
            {
              name: 'badge',
              type: 'text',
              defaultValue: 'Lokacija',
              admin: {
                description: 'Small badge text above title',
              },
            },
            {
              name: 'title',
              type: 'text',
              required: true,
              defaultValue: 'Naš urad',
              admin: {
                description: 'Location section title',
              },
            },
            {
              name: 'subtitle',
              type: 'textarea',
              defaultValue: 'V Celju, obisk po dogovoru.',
              admin: {
                description: 'Location section subtitle',
              },
            },
            {
              name: 'mapEmbedUrl',
              type: 'text',
              defaultValue:
                'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2751.8!2d15.2664!3d46.2396!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x476f8a89d21ae0ad%3A0x4a5b0f1c78ae9a7f!2sCesta%20na%20Ostro%C5%BEno%208%2C%203000%20Celje%2C%20Slovenia!5e0!3m2!1sen!2ssi!4v1700000000000!5m2!1sen!2ssi',
              admin: {
                description: 'Google Maps embed URL',
              },
            },
            {
              name: 'address',
              type: 'group',
              fields: [
                {
                  name: 'companyName',
                  type: 'text',
                  defaultValue: 'SINTEH PRO d.o.o.',
                },
                {
                  name: 'street',
                  type: 'text',
                  defaultValue: 'Cesta na Ostrožno 8',
                },
                {
                  name: 'city',
                  type: 'text',
                  defaultValue: '3000 Celje',
                },
                {
                  name: 'country',
                  type: 'text',
                  defaultValue: 'Slovenija - EU',
                },
              ],
            },
            {
              name: 'emergencyPhone',
              type: 'text',
              defaultValue: '+386 (3) 426 36 46',
            },
          ],
        },
        {
          slug: 'contactFAQ',
          labels: {
            singular: 'Contact FAQ',
            plural: 'Contact FAQs',
          },
          admin: {
            group: 'Contact Page',
          },
          fields: [
            {
              name: 'badge',
              type: 'text',
              defaultValue: 'Pogosta vprašanja',
              admin: {
                description: 'Small badge text above title',
              },
            },
            {
              name: 'title',
              type: 'text',
              required: true,
              defaultValue: 'Pogosta vprašanja',
              admin: {
                description: 'FAQ section title',
              },
            },
            {
              name: 'subtitle',
              type: 'textarea',
              defaultValue: 'Odgovori na najpogostejša vprašanja, ki nam jih zastavljajo stranke.',
              admin: {
                description: 'FAQ section subtitle',
              },
            },
            {
              name: 'faqs',
              type: 'array',
              defaultValue: [
                {
                  question: 'Kako hitro lahko začnete z delom?',
                  answer:
                    'Manjše projekte v 1-2 tednih, večje v 4-6 tednih. Nujne posege v 24 urah.',
                },
                {
                  question: 'Garancija?',
                  answer: '2 leti na naša dela, 1 leto na komponente.',
                },
                {
                  question: 'Plačilni pogoji?',
                  answer: '30 dni od računa. Za večje projekte obročno plačilo.',
                },
                {
                  question: 'Delate tudi v tujini?',
                  answer: 'Da, v regiji (Hrvaška, Srbija, Avstrija).',
                },
              ],
              fields: [
                {
                  name: 'question',
                  type: 'text',
                  required: true,
                },
                {
                  name: 'answer',
                  type: 'textarea',
                  required: true,
                },
              ],
            },
          ],
        },
        // Universal Blocks
        ...universalBlocks,
      ],
      admin: {
        description: 'Build your page using blocks. Mix and match different content sections.',
      },
    },
    {
      name: 'meta',
      type: 'group',
      localized: true, // Localize SEO meta fields
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
