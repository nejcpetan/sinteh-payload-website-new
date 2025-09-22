#!/usr/bin/env node

/**
 * Test Database Persistence
 * This script will test if translations are actually being persisted to the database
 * by making a direct API call and checking the response
 */

const axios = require('axios')
const chalk = require('chalk')

class DatabasePersistenceTest {
  constructor() {
    this.baseUrl = 'http://localhost:3000'
  }

  async testPersistence() {
    console.log(chalk.blue('🔍 Testing Database Persistence...'))

    try {
      // Test 1: Check if we can fetch pages
      console.log(chalk.yellow('📄 Fetching pages from database...'))
      const pagesResponse = await axios.get(`${this.baseUrl}/api/pages?locale=sl&depth=2`)

      if (pagesResponse.data && pagesResponse.data.docs) {
        console.log(chalk.green(`✅ Found ${pagesResponse.data.docs.length} pages in Slovenian`))

        // Test 2: Check if English versions exist
        console.log(chalk.yellow('🔍 Checking English versions...'))

        for (const page of pagesResponse.data.docs.slice(0, 2)) {
          // Test first 2 pages
          console.log(chalk.cyan(`\n📋 Testing page: ${page.title || page.slug}`))

          // Fetch Slovenian version
          const slResponse = await axios.get(
            `${this.baseUrl}/api/pages/${page.id}?locale=sl&depth=2`,
          )
          console.log(chalk.gray(`   SL Title: ${slResponse.data.title}`))

          // Fetch English version
          try {
            const enResponse = await axios.get(
              `${this.baseUrl}/api/pages/${page.id}?locale=en&depth=2`,
            )
            console.log(chalk.gray(`   EN Title: ${enResponse.data.title}`))

            // Compare content
            if (slResponse.data.title === enResponse.data.title) {
              console.log(
                chalk.red(`   ❌ English content appears to be same as Slovenian (not translated)`),
              )
            } else {
              console.log(
                chalk.green(`   ✅ English content appears to be different (likely translated)`),
              )
            }

            // Check layout blocks
            if (slResponse.data.layout && enResponse.data.layout) {
              const slBlocks = slResponse.data.layout.length
              const enBlocks = enResponse.data.layout.length
              console.log(chalk.gray(`   Blocks: SL=${slBlocks}, EN=${enBlocks}`))

              if (slBlocks === enBlocks && slBlocks > 0) {
                // Check first block content
                const slFirstBlock = JSON.stringify(slResponse.data.layout[0])
                const enFirstBlock = JSON.stringify(enResponse.data.layout[0])

                if (slFirstBlock === enFirstBlock) {
                  console.log(chalk.red(`   ❌ Block content identical (not translated)`))
                } else {
                  console.log(chalk.green(`   ✅ Block content different (likely translated)`))
                }
              }
            }
          } catch (error) {
            console.log(chalk.red(`   ❌ Failed to fetch English version: ${error.message}`))
          }
        }

        // Test 3: Check homepage global
        console.log(chalk.yellow('\n🏠 Checking homepage global...'))
        try {
          const homepageSl = await axios.get(
            `${this.baseUrl}/api/globals/homepage?locale=sl&depth=2`,
          )
          const homepageEn = await axios.get(
            `${this.baseUrl}/api/globals/homepage?locale=en&depth=2`,
          )

          console.log(chalk.gray(`   SL Hero Title: ${homepageSl.data.hero?.title || 'N/A'}`))
          console.log(chalk.gray(`   EN Hero Title: ${homepageEn.data.hero?.title || 'N/A'}`))

          if (homepageSl.data.hero?.title === homepageEn.data.hero?.title) {
            console.log(chalk.red(`   ❌ Homepage content appears identical (not translated)`))
          } else {
            console.log(chalk.green(`   ✅ Homepage content appears different (likely translated)`))
          }
        } catch (error) {
          console.log(chalk.red(`   ❌ Failed to check homepage: ${error.message}`))
        }
      } else {
        console.log(chalk.red('❌ No pages found in database'))
      }
    } catch (error) {
      console.error(chalk.red('❌ Database persistence test failed:'), error.message)

      if (error.code === 'ECONNREFUSED') {
        console.log(
          chalk.yellow('💡 Make sure your Payload CMS is running on http://localhost:3000'),
        )
      }
    }
  }
}

// Run the test
const tester = new DatabasePersistenceTest()
tester
  .testPersistence()
  .then(() => {
    console.log(chalk.blue('\n🏁 Database persistence test completed'))
  })
  .catch((error) => {
    console.error(chalk.red('Test failed:'), error)
  })
