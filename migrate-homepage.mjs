#!/usr/bin/env node

/**
 * Quick homepage migration script
 * Run with: node migrate-homepage.mjs
 */

import { getPayload } from 'payload'
import config from './src/payload.config.ts'

async function migrateHomepage() {
  console.log('🚀 Migrating homepage content to Slovenian locale...')
  
  try {
    const payload = await getPayload({ config })
    
    // Get existing homepage content
    console.log('📖 Reading existing homepage...')
    const homepage = await payload.findGlobal({
      slug: 'homepage',
      depth: 0,
    })
    
    if (homepage?.layout && homepage.layout.length > 0) {
      console.log(`✅ Found ${homepage.layout.length} existing blocks`)
      
      // Save to Slovenian locale
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
      console.log('⚠️  No existing content found, creating default...')
      
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
    
    process.exit(0)
    
  } catch (error) {
    console.error('❌ Migration failed:', error)
    process.exit(1)
  }
}

migrateHomepage()
