#!/usr/bin/env node

/**
 * Fix Media References
 * This script will fix the foreign key constraint issue by updating
 * the footer to reference the existing media file
 */

const axios = require('axios')
const chalk = require('chalk')

class MediaReferenceFixer {
  constructor() {
    this.baseUrl = 'http://localhost:3000'
  }

  async fixMediaReferences() {
    console.log(chalk.blue('🔧 Fixing Media References...'))

    try {
      // Step 1: Login (you'll need to update these credentials)
      console.log(chalk.yellow('🔐 Logging in...'))

      const loginResponse = await axios.post(`${this.baseUrl}/api/users/login`, {
        email: 'nathan@webfast.si', // UPDATE THIS
        password: 'Adidas_forlife1!', // UPDATE THIS
      })

      if (loginResponse.status !== 200) {
        console.log(chalk.red('❌ Login failed - please update credentials in script'))
        return
      }

      console.log(chalk.green('✅ Login successful'))
      const token = loginResponse.data.token

      // Step 2: Get existing media to see what we have
      console.log(chalk.yellow('📋 Checking existing media...'))
      const mediaResponse = await axios.get(`${this.baseUrl}/api/media?limit=100`)

      if (!mediaResponse.data.docs || mediaResponse.data.docs.length === 0) {
        console.log(chalk.red('❌ No media files found'))
        return
      }

      const existingMedia = mediaResponse.data.docs[0] // Use the first (and only) media file
      console.log(
        chalk.green(`✅ Found media: ID=${existingMedia.id}, filename=${existingMedia.filename}`),
      )

      // Step 3: Get current footer data
      console.log(chalk.yellow('📄 Getting footer data...'))
      const footerResponse = await axios.get(`${this.baseUrl}/api/globals/footer?locale=sl`)

      if (footerResponse.status !== 200) {
        console.log(chalk.red('❌ Failed to get footer data'))
        return
      }

      const footerData = footerResponse.data
      console.log(chalk.gray(`Current footer logo_id: ${footerData.logo_id || 'none'}`))

      // Step 4: Update footer to reference the existing media
      console.log(chalk.yellow('🔧 Updating footer logo reference...'))

      const updateData = {
        ...footerData,
        logo_id: existingMedia.id, // Use the existing media ID
      }

      // Remove any fields that might cause issues
      delete updateData.id
      delete updateData.createdAt
      delete updateData.updatedAt

      const updateResponse = await axios.post(
        `${this.baseUrl}/api/globals/footer?locale=sl`,
        updateData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        },
      )

      if (updateResponse.status === 200) {
        console.log(chalk.green('✅ Footer logo reference updated successfully!'))
        console.log(chalk.green(`   Updated logo_id from 3 to ${existingMedia.id}`))

        // Step 5: Test database write capability
        console.log(chalk.yellow('\n🧪 Testing database write capability...'))

        // Try to update a page to see if writes now work
        const pagesResponse = await axios.get(`${this.baseUrl}/api/pages?limit=1&locale=sl`)

        if (pagesResponse.data.docs && pagesResponse.data.docs.length > 0) {
          const page = pagesResponse.data.docs[0]

          const testUpdate = {
            title: page.title + ' (write test)',
          }

          try {
            const testResponse = await axios.patch(
              `${this.baseUrl}/api/pages/${page.id}?locale=sl`,
              testUpdate,
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                  'Content-Type': 'application/json',
                },
              },
            )

            if (testResponse.status === 200) {
              console.log(chalk.green('✅ Database writes are now working!'))

              // Revert the test change
              await axios.patch(
                `${this.baseUrl}/api/pages/${page.id}?locale=sl`,
                { title: page.title },
                {
                  headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                  },
                },
              )
              console.log(chalk.gray('   Reverted test change'))

              console.log(chalk.blue('\n🎉 SUCCESS! You can now run your translation scripts!'))
              console.log(chalk.yellow('💡 The translations should now persist to the database'))
            } else {
              console.log(chalk.red('❌ Database writes still not working'))
            }
          } catch (testError) {
            console.log(chalk.red('❌ Database write test failed:'))
            console.log(chalk.red(testError.response?.data || testError.message))
          }
        }
      } else {
        console.log(chalk.red('❌ Failed to update footer'))
        console.log(chalk.red(updateResponse.data))
      }
    } catch (error) {
      console.error(chalk.red('❌ Media reference fix failed:'), error.message)

      if (error.response?.status === 401) {
        console.log(chalk.yellow('💡 Please update the admin credentials in this script:'))
        console.log(chalk.gray('   email: your-admin@email.com'))
        console.log(chalk.gray('   password: your-admin-password'))
      } else if (error.response?.data) {
        console.log(chalk.red('Error details:'), JSON.stringify(error.response.data, null, 2))
      }
    }
  }
}

// Run the fixer
const fixer = new MediaReferenceFixer()
fixer
  .fixMediaReferences()
  .then(() => {
    console.log(chalk.blue('\n🏁 Media reference fix completed'))
  })
  .catch((error) => {
    console.error(chalk.red('Fix failed:'), error)
  })
