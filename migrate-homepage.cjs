/**
 * Homepage migration script - preserves all existing content
 * Run with: node migrate-homepage.cjs
 */

async function migrateHomepage() {
  console.log('🚀 Migrating homepage content to Slovenian locale...')
  
  try {
    // Dynamic import for ES modules
    const { getPayload } = await import('payload')
    const configModule = await import('./src/payload.config.ts')
    const config = configModule.default
    
    const payload = await getPayload({ config })
    
    // Get existing homepage content
    console.log('📖 Reading existing homepage...')
    const homepage = await payload.findGlobal({
      slug: 'homepage',
      depth: 0,
    })
    
    if (homepage?.layout && homepage.layout.length > 0) {
      console.log(`✅ Found ${homepage.layout.length} existing blocks`)
      console.log('📋 Block types:', homepage.layout.map(b => b.blockType).join(', '))
      
      // Save to Slovenian locale
      console.log('💾 Saving to Slovenian locale...')
      await payload.updateGlobal({
        slug: 'homepage',
        locale: 'sl',
        data: {
          layout: homepage.layout
        }
      })
      
      console.log('✅ Content saved to Slovenian locale!')
      
      // Verify
      const slovenianHomepage = await payload.findGlobal({
        slug: 'homepage',
        locale: 'sl',
        depth: 0,
      })
      
      console.log(`🔍 Verification: ${slovenianHomepage.layout?.length || 0} blocks in Slovenian`)
      
    } else {
      console.log('⚠️  No existing layout found, creating default Slovenian content...')
      
      await payload.updateGlobal({
        slug: 'homepage',
        locale: 'sl',
        data: {
          layout: [
            {
              blockType: 'hero',
              title: 'Sinteh d.o.o.',
              subtitle: 'Od zasnove do zagona in servisa – modulno ter prilagojeno vašim procesom.',
            }
          ]
        }
      })
      
      console.log('✅ Default Slovenian content created!')
    }
    
    console.log('\n🎉 Migration complete!')
    console.log('🔗 Your homepage is now available at: /sl/')
    console.log('💡 Original content preserved - nothing was deleted!')
    
    process.exit(0)
    
  } catch (error) {
    console.error('❌ Migration failed:', error)
    console.error('Stack:', error.stack)
    process.exit(1)
  }
}

migrateHomepage()
