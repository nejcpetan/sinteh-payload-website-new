#!/usr/bin/env node

/**
 * Simple API Connection Test
 */

const axios = require('axios')
const chalk = require('chalk')

async function testConnection() {
  console.log(chalk.blue('🔍 Testing API Connection...'))

  try {
    // Test basic connectivity
    console.log(chalk.yellow('📡 Testing basic connectivity...'))
    const response = await axios.get('http://localhost:3000/api/pages', {
      timeout: 5000,
      params: {
        limit: 1,
        locale: 'sl',
      },
    })

    console.log(chalk.green(`✅ API Response Status: ${response.status}`))
    console.log(chalk.gray(`Response data keys: ${Object.keys(response.data).join(', ')}`))

    if (response.data.docs) {
      console.log(chalk.green(`✅ Found ${response.data.docs.length} pages`))
      if (response.data.docs.length > 0) {
        const firstPage = response.data.docs[0]
        console.log(chalk.gray(`First page: ${firstPage.title || firstPage.slug || firstPage.id}`))
      }
    }
  } catch (error) {
    console.error(chalk.red('❌ Connection test failed:'))
    console.error(chalk.red(`Error: ${error.message}`))

    if (error.code === 'ECONNREFUSED') {
      console.log(chalk.yellow('💡 Payload CMS server is not running on http://localhost:3000'))
      console.log(chalk.yellow('   Please start your server first'))
    } else if (error.response) {
      console.log(chalk.red(`HTTP Status: ${error.response.status}`))
      console.log(chalk.red(`Response: ${JSON.stringify(error.response.data, null, 2)}`))
    }
  }
}

testConnection()
