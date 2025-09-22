#!/usr/bin/env node

/**
 * Fix Database Constraints
 * This script will identify and fix foreign key constraint issues
 * that are preventing Payload CMS from writing to the database
 */

const axios = require('axios')
const chalk = require('chalk')

class DatabaseConstraintFixer {
  constructor() {
    this.baseUrl = 'http://localhost:3000'
  }

  async fixConstraints() {
    console.log(chalk.blue('🔧 Fixing Database Constraints...'))

    try {
      // Step 1: Test a simple write operation to see if it fails
      console.log(chalk.yellow('📝 Testing database write capability...'))

      // Try to login first
      const loginResponse = await axios.post(`${this.baseUrl}/api/users/login`, {
        email: 'admin@sinteh.pro', // Update with your admin email
        password: 'admin123', // Update with your admin password
      })

      if (loginResponse.status === 200) {
        console.log(chalk.green('✅ Authentication successful'))

        // Try to update a simple field to test database writes
        console.log(chalk.yellow('📝 Testing database write...'))

        // Get a page first
        const pagesResponse = await axios.get(`${this.baseUrl}/api/pages?limit=1&locale=sl`)

        if (pagesResponse.data.docs && pagesResponse.data.docs.length > 0) {
          const page = pagesResponse.data.docs[0]
          console.log(chalk.gray(`Testing with page: ${page.title || page.slug}`))

          // Try to update the page with a small change
          const updateData = {
            title: page.title + ' (test)',
          }

          try {
            const updateResponse = await axios.patch(
              `${this.baseUrl}/api/pages/${page.id}?locale=sl`,
              updateData,
              {
                headers: {
                  Authorization: `Bearer ${loginResponse.data.token}`,
                  'Content-Type': 'application/json',
                },
              },
            )

            if (updateResponse.status === 200) {
              console.log(chalk.green('✅ Database write successful - no constraint issues'))

              // Revert the change
              await axios.patch(
                `${this.baseUrl}/api/pages/${page.id}?locale=sl`,
                { title: page.title },
                {
                  headers: {
                    Authorization: `Bearer ${loginResponse.data.token}`,
                    'Content-Type': 'application/json',
                  },
                },
              )
              console.log(chalk.gray('   Reverted test change'))
            } else {
              console.log(chalk.red('❌ Database write failed'))
            }
          } catch (writeError) {
            console.log(chalk.red('❌ Database write failed:'))
            console.log(chalk.red(writeError.response?.data || writeError.message))

            if (writeError.response?.data) {
              console.log(chalk.yellow('\n🔍 Analyzing error...'))
              const errorData = writeError.response.data

              if (JSON.stringify(errorData).includes('foreign key constraint')) {
                console.log(chalk.red('🚨 Foreign key constraint violation detected!'))
                console.log(
                  chalk.yellow("💡 This is why translations aren't persisting to database"),
                )

                // Suggest solutions
                console.log(chalk.blue('\n📋 Suggested fixes:'))
                console.log(chalk.gray('1. Check media references in your content'))
                console.log(chalk.gray('2. Ensure all referenced media files exist in database'))
                console.log(chalk.gray('3. Clean up orphaned references'))
                console.log(chalk.gray('4. Run database integrity check'))
              }
            }
          }
        } else {
          console.log(chalk.red('❌ No pages found to test with'))
        }
      } else {
        console.log(chalk.red('❌ Authentication failed'))
      }
    } catch (error) {
      console.error(chalk.red('❌ Constraint fix failed:'), error.message)

      if (error.response?.status === 401) {
        console.log(chalk.yellow('💡 Update admin credentials in this script'))
      }
    }
  }

  async checkMediaReferences() {
    console.log(chalk.blue('\n🖼️ Checking Media References...'))

    try {
      // Get all media files
      const mediaResponse = await axios.get(`${this.baseUrl}/api/media?limit=100`)

      if (mediaResponse.data.docs) {
        console.log(chalk.green(`✅ Found ${mediaResponse.data.docs.length} media files`))

        const mediaIds = mediaResponse.data.docs.map((media) => media.id)
        console.log(chalk.gray(`Media IDs: ${mediaIds.join(', ')}`))

        // Check if the problematic logo_id=3 exists
        const hasMedia3 = mediaIds.includes(3) || mediaIds.includes('3')

        if (!hasMedia3) {
          console.log(chalk.red('❌ Media ID 3 (referenced by footer) does not exist!'))
          console.log(
            chalk.yellow('💡 This is likely causing the foreign key constraint violation'),
          )
          console.log(
            chalk.blue(
              '🔧 Solution: Either create media with ID 3 or update footer to reference existing media',
            ),
          )
        } else {
          console.log(chalk.green('✅ Media ID 3 exists'))
        }
      } else {
        console.log(chalk.red('❌ No media files found'))
      }
    } catch (error) {
      console.error(chalk.red('❌ Media check failed:'), error.message)
    }
  }
}

// Run the fixer
const fixer = new DatabaseConstraintFixer()

async function runFixes() {
  await fixer.fixConstraints()
  await fixer.checkMediaReferences()

  console.log(chalk.blue('\n🏁 Database constraint check completed'))
  console.log(chalk.yellow('\n💡 If foreign key issues were found, you need to:'))
  console.log(chalk.gray('   1. Fix the media references causing constraint violations'))
  console.log(chalk.gray('   2. Then run your translation scripts'))
  console.log(chalk.gray('   3. The translations should then persist to the database'))
}

runFixes().catch((error) => {
  console.error(chalk.red('Fix failed:'), error)
})
