import { MigrateUpArgs, MigrateDownArgs } from '@payloadcms/db-postgres'
import { sql } from 'drizzle-orm'

export async function up({ payload, req }: MigrateUpArgs): Promise<void> {
  payload.logger.info('🚀 Starting homepage content migration to Slovenian locale...')

  try {
    // Step 1: Get existing homepage content
    const existingHomepage = await payload.findGlobal({
      slug: 'homepage',
      req,
      depth: 0,
    })

    if (existingHomepage && existingHomepage.layout) {
      payload.logger.info(
        `📖 Found existing homepage with ${existingHomepage.layout.length} blocks`,
      )

      // Step 2: Save to Slovenian locale
      await payload.updateGlobal({
        slug: 'homepage',
        locale: 'sl',
        req,
        data: {
          layout: existingHomepage.layout,
        },
      })

      payload.logger.info('✅ Successfully migrated homepage content to Slovenian locale')

      // Step 3: Create minimal placeholders for other locales
      const otherLocales = ['en', 'de', 'hr']

      for (const locale of otherLocales) {
        try {
          await payload.updateGlobal({
            slug: 'homepage',
            locale,
            req,
            data: {
              layout: [
                {
                  blockType: 'hero',
                  title: 'Sinteh d.o.o.',
                  subtitle: `[Content to be translated to ${locale.toUpperCase()}]`,
                  ctaButtons: [],
                },
              ],
            },
          })

          payload.logger.info(`✅ Created placeholder for ${locale} locale`)
        } catch (error) {
          payload.logger.warn(`⚠️  Could not create placeholder for ${locale}: ${error.message}`)
        }
      }
    } else {
      payload.logger.info(
        'ℹ️  No existing homepage layout found, creating default Slovenian content',
      )

      // Create default Slovenian content
      await payload.updateGlobal({
        slug: 'homepage',
        locale: 'sl',
        req,
        data: {
          layout: [
            {
              blockType: 'hero',
              title: 'Sinteh d.o.o.',
              subtitle: 'Od zasnove do zagona in servisa – modulno ter prilagojeno vašim procesom.',
              ctaButtons: [
                {
                  text: 'Naše storitve',
                  type: 'anchor',
                  anchor: '#storitve',
                },
                {
                  text: 'Kontakt',
                  type: 'anchor',
                  anchor: '#kontakt',
                },
              ],
            },
          ],
        },
      })
    }

    payload.logger.info('🎉 Homepage migration completed successfully!')
  } catch (error) {
    payload.logger.error('❌ Homepage migration failed:', error)
    throw error
  }
}

export async function down({ payload, req }: MigrateDownArgs): Promise<void> {
  payload.logger.info('⏪ Rolling back homepage content migration...')

  try {
    // Get the Slovenian content
    const slovenianHomepage = await payload.findGlobal({
      slug: 'homepage',
      locale: 'sl',
      req,
      depth: 0,
    })

    if (slovenianHomepage && slovenianHomepage.layout) {
      // Restore to non-localized structure
      await payload.updateGlobal({
        slug: 'homepage',
        req,
        data: {
          layout: slovenianHomepage.layout,
        },
      })

      payload.logger.info('✅ Homepage content restored to non-localized structure')
    }
  } catch (error) {
    payload.logger.error('❌ Homepage migration rollback failed:', error)
    throw error
  }
}
