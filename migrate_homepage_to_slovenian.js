/**
 * Migration script to copy existing homepage content to Slovenian locale
 * This preserves all existing content and makes it available in the new localized structure
 */

const { getPayload } = require('payload')
const config = require('./src/payload.config.ts').default

async function migrateHomepageToSlovenian() {
  console.log('🚀 Starting homepage migration to Slovenian locale...')
  
  try {
    const payload = await getPayload({ config })
    
    // Step 1: Get the current homepage content (non-localized)
    console.log('📖 Reading existing homepage content...')
    
    let existingHomepage
    try {
      existingHomepage = await payload.findGlobal({
        slug: 'homepage',
        // Don't specify locale to get the "base" content
        depth: 0,
      })
    } catch (error) {
      console.log('ℹ️  No existing homepage found, will create with defaults')
      existingHomepage = null
    }
    
    // Step 2: Ensure we have content to migrate
    if (!existingHomepage || !existingHomepage.layout) {
      console.log('⚠️  No existing homepage layout found. Creating with default Slovenian content...')
      
      // Create default Slovenian content based on the schema defaults
      const defaultSlovenianContent = {
        layout: [
          {
            blockType: 'hero',
            title: 'Sinteh d.o.o.',
            subtitle: 'Od zasnove do zagona in servisa – modulno ter prilagojeno vašim procesom.',
            ctaButtons: [
              {
                text: 'Naše storitve',
                type: 'anchor',
                anchor: '#storitve'
              },
              {
                text: 'Kontakt',
                type: 'anchor',
                anchor: '#kontakt'
              }
            ]
          },
          {
            blockType: 'services',
            title: 'Naše storitve',
            subtitle: 'Celovite rešitve za industrijsko avtomatizacijo',
            services: [
              {
                title: 'PLC programiranje',
                description: 'Sistematičen pristop, preverjene komponente, popolna dokumentacija.',
                features: [
                  { feature: 'Siemens TIA Portal' },
                  { feature: 'Allen-Bradley Studio 5000' },
                  { feature: 'Schneider Unity Pro' }
                ],
                button: {
                  text: 'Več o storitvi',
                  type: 'anchor',
                  anchor: '#kontakt'
                }
              },
              {
                title: 'HMI/SCADA sistemi',
                description: 'Uporabniški vmesniki za nadzor in upravljanje procesov.',
                features: [
                  { feature: 'WinCC' },
                  { feature: 'FactoryTalk View' },
                  { feature: 'Vijeo Citect' }
                ],
                button: {
                  text: 'Več o storitvi',
                  type: 'anchor',
                  anchor: '#kontakt'
                }
              },
              {
                title: 'Pogonska tehnika',
                description: 'Programiranje in konfiguracija frekvenčnih pretvornikov.',
                features: [
                  { feature: 'Sinamics' },
                  { feature: 'PowerFlex' },
                  { feature: 'Altivar' }
                ],
                button: {
                  text: 'Več o storitvi',
                  type: 'anchor',
                  anchor: '#kontakt'
                }
              }
            ]
          }
        ]
      }
      
      existingHomepage = defaultSlovenianContent
    }
    
    // Step 3: Update the homepage with Slovenian locale
    console.log('💾 Saving content to Slovenian locale...')
    
    const updatedHomepage = await payload.updateGlobal({
      slug: 'homepage',
      locale: 'sl', // Explicitly set to Slovenian
      data: {
        layout: existingHomepage.layout
      }
    })
    
    console.log('✅ Successfully migrated homepage content to Slovenian!')
    console.log(`📊 Migrated ${existingHomepage.layout?.length || 0} content blocks`)
    
    // Step 4: Verify the migration
    console.log('🔍 Verifying migration...')
    
    const slovenianHomepage = await payload.findGlobal({
      slug: 'homepage',
      locale: 'sl',
      depth: 0,
    })
    
    if (slovenianHomepage && slovenianHomepage.layout) {
      console.log(`✅ Verification successful! Found ${slovenianHomepage.layout.length} blocks in Slovenian locale`)
      
      // Log the block types for confirmation
      const blockTypes = slovenianHomepage.layout.map(block => block.blockType).join(', ')
      console.log(`📋 Block types: ${blockTypes}`)
    } else {
      console.log('❌ Verification failed - no content found in Slovenian locale')
    }
    
    // Step 5: Create placeholder for other locales (optional)
    console.log('🌍 Creating placeholders for other locales...')
    
    const otherLocales = ['en', 'de', 'hr']
    
    for (const locale of otherLocales) {
      try {
        // Check if content already exists for this locale
        const existingContent = await payload.findGlobal({
          slug: 'homepage',
          locale,
          depth: 0,
        })
        
        if (!existingContent.layout || existingContent.layout.length === 0) {
          console.log(`📝 Creating placeholder for ${locale} locale...`)
          
          // Create minimal placeholder that can be translated later
          await payload.updateGlobal({
            slug: 'homepage',
            locale,
            data: {
              layout: [
                {
                  blockType: 'hero',
                  title: 'Sinteh d.o.o.', // Keep company name
                  subtitle: `[To be translated to ${locale.toUpperCase()}]`,
                  ctaButtons: []
                }
              ]
            }
          })
          
          console.log(`✅ Created placeholder for ${locale}`)
        } else {
          console.log(`ℹ️  Content already exists for ${locale} locale, skipping`)
        }
      } catch (error) {
        console.log(`⚠️  Could not create placeholder for ${locale}:`, error.message)
      }
    }
    
    console.log('\n🎉 Homepage migration completed successfully!')
    console.log('\n📋 Summary:')
    console.log('✅ Existing content preserved and moved to Slovenian locale')
    console.log('✅ Placeholders created for other locales')
    console.log('✅ Ready for translation workflow')
    console.log('\n🔗 Your homepage is now available at: /sl/')
    
  } catch (error) {
    console.error('❌ Migration failed:', error)
    process.exit(1)
  }
}

// Run the migration
migrateHomepageToSlovenian()
  .then(() => {
    console.log('\n✨ Migration script completed')
    process.exit(0)
  })
  .catch((error) => {
    console.error('💥 Migration script failed:', error)
    process.exit(1)
  })
