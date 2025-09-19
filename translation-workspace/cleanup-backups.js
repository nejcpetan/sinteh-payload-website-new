#!/usr/bin/env node

/**
 * Cleanup old backup files
 * Keeps only the most recent backup and removes older ones
 */

const fs = require('fs')
const path = require('path')
const chalk = require('chalk')

const dataDir = './data'

function cleanupBackups() {
  console.log(chalk.blue('🧹 Cleaning up old backup files...'))

  try {
    const files = fs.readdirSync(dataDir)
    const backupFiles = files
      .filter((file) => file.startsWith('backup-') && file.endsWith('.json'))
      .sort()
      .reverse() // Most recent first

    console.log(chalk.yellow(`📁 Found ${backupFiles.length} backup files`))

    if (backupFiles.length <= 1) {
      console.log(chalk.green('✅ No cleanup needed - only 1 or fewer backups'))
      return
    }

    // Keep the most recent, delete the rest
    const toKeep = backupFiles[0]
    const toDelete = backupFiles.slice(1)

    console.log(chalk.green(`📌 Keeping: ${toKeep}`))

    toDelete.forEach((file) => {
      const filePath = path.join(dataDir, file)
      fs.unlinkSync(filePath)
      console.log(chalk.gray(`🗑️ Deleted: ${file}`))
    })

    console.log(chalk.green(`✅ Cleanup complete! Removed ${toDelete.length} old backups`))
  } catch (error) {
    console.error(chalk.red('❌ Cleanup failed:'), error.message)
  }
}

cleanupBackups()
