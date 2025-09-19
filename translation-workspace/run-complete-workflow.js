#!/usr/bin/env node

/**
 * Complete Translation Workflow Runner
 * Runs fetch -> translate -> update -> verify in sequence
 */

const { spawn } = require('child_process')
const chalk = require('chalk')

async function runCommand(command, description) {
  return new Promise((resolve, reject) => {
    console.log(chalk.blue(`\n🚀 ${description}...`))

    const child = spawn('node', [command], {
      stdio: 'inherit',
      shell: true,
    })

    child.on('close', (code) => {
      if (code === 0) {
        console.log(chalk.green(`✅ ${description} completed successfully`))
        resolve()
      } else {
        console.error(chalk.red(`❌ ${description} failed with code ${code}`))
        reject(new Error(`${description} failed`))
      }
    })

    child.on('error', (error) => {
      console.error(chalk.red(`❌ ${description} error:`), error.message)
      reject(error)
    })
  })
}

async function runWorkflow() {
  try {
    console.log(chalk.yellow('🔄 Starting Complete Translation Workflow'))

    // Step 1: Fetch pages with updated extraction logic
    await runCommand('fetch-pages.js', 'Fetching pages with complete translatable content')

    // Step 2: Translate the content
    await runCommand('translate-content.js', 'Translating content with OpenAI')

    // Step 3: Update database with translations
    await runCommand('update-database.js', 'Updating database with translations')

    // Step 4: Verify translations
    await runCommand('verify-translations.js', 'Verifying translations')

    console.log(chalk.green('\n🎉 Complete translation workflow finished successfully!'))
    console.log(chalk.blue('📝 Check your website to see the translated content'))
  } catch (error) {
    console.error(chalk.red('\n❌ Workflow failed:'), error.message)
    process.exit(1)
  }
}

runWorkflow()
