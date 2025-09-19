const axios = require('axios')
const fs = require('fs-extra')
const config = require('./config')
const chalk = require('chalk')

class DatabaseUpdater {
  constructor() {
    this.baseUrl = config.payloadUrl
    this.headers = {
      'Content-Type': 'application/json',
    }
    this.authToken = null
    this.updatedPages = []
    this.errors = []
  }

  async authenticate() {
    try {
      console.log(chalk.blue('🔐 Authenticating with Payload CMS...'))

      const response = await axios.post(`${this.baseUrl}/api/users/login`, {
        email: 'nathan@webfast.si',
        password: 'Adidas_forlife1!',
      })

      if (response.data.token) {
        this.authToken = response.data.token
        this.headers['Authorization'] = `JWT ${this.authToken}`
        console.log(chalk.green('✅ Authentication successful'))
        return true
      }
    } catch (error) {
      console.error(chalk.red('❌ Authentication failed:'), error.message)
      throw error
    }
  }

  // Clean all IDs recursively - this is critical for Payload CMS updates
  cleanIds(obj) {
    if (Array.isArray(obj)) {
      return obj.map((item) => this.cleanIds(item))
    } else if (obj && typeof obj === 'object') {
      const cleaned = { ...obj }
      delete cleaned.id // Remove all id fields

      // Handle media relationships - convert media objects to just their IDs (aggressive)
      Object.keys(cleaned).forEach((key) => {
        const value = cleaned[key]

        // Convert any object with an ID that looks like media
        if (value && typeof value === 'object' && value.id) {
          // Check if it has media-like properties OR field name suggests media
          const hasMediaProps =
            value.url ||
            value.filename ||
            value.mimeType ||
            value.alt ||
            value.width ||
            value.height
          const isMediaField =
            key.toLowerCase().includes('image') ||
            key.toLowerCase().includes('logo') ||
            key.toLowerCase().includes('media') ||
            key.toLowerCase().includes('background')

          if (hasMediaProps || isMediaField) {
            cleaned[key] = value.id
          } else {
            // Recursively clean other fields
            cleaned[key] = this.cleanIds(cleaned[key])
          }
        } else {
          // Recursively clean other fields
          cleaned[key] = this.cleanIds(cleaned[key])
        }
      })

      return cleaned
    }
    return obj
  }

  reconstructBlockData(originalBlock, translatedBlock) {
    // Use the same approach as simple translator - apply translations by path
    const updatedBlock = this.applyTranslations(originalBlock, translatedBlock.translatable)

    // Clean media objects and return
    return this.cleanIds(updatedBlock)
  }

  // Apply translations back to the original object (same as simple translator)
  applyTranslations(obj, translations, path = '') {
    if (Array.isArray(obj)) {
      return obj.map((item, index) => {
        return this.applyTranslations(item, translations, `${path}[${index}]`)
      })
    } else if (obj && typeof obj === 'object') {
      const result = { ...obj }

      Object.keys(result).forEach((key) => {
        const currentPath = path ? `${path}.${key}` : key

        // If this exact path has a translation, apply it
        if (translations[currentPath]) {
          result[key] = translations[currentPath]
        } else if (typeof result[key] === 'object') {
          // Recursively apply to nested objects
          result[key] = this.applyTranslations(result[key], translations, currentPath)
        }
      })

      return result
    }

    return obj
  }

  // Legacy reconstruction for backward compatibility
  reconstructBlockDataOld(originalBlock, translatedBlock) {
    // Start with the original block structure
    const updatedBlock = { ...originalBlock }

    // Update translatable fields based on block type
    switch (translatedBlock.blockType) {
      case 'simplePage':
        if (translatedBlock.translatable.title) {
          updatedBlock.title = translatedBlock.translatable.title
        }
        if (translatedBlock.translatable.subtitle) {
          updatedBlock.subtitle = translatedBlock.translatable.subtitle
        }
        if (translatedBlock.translatable.content) {
          // For rich text content, we need to reconstruct the Lexical format
          updatedBlock.content = this.reconstructRichTextContent(
            originalBlock.content,
            translatedBlock.translatable.content,
          )
        }
        break

      case 'hero':
        if (translatedBlock.translatable.title) {
          updatedBlock.title = translatedBlock.translatable.title
        }
        if (translatedBlock.translatable.subtitle) {
          updatedBlock.subtitle = translatedBlock.translatable.subtitle
        }
        if (translatedBlock.translatable.description) {
          updatedBlock.description = translatedBlock.translatable.description
        }
        break

      case 'features':
        if (translatedBlock.translatable.title) {
          updatedBlock.title = translatedBlock.translatable.title
        }
        if (translatedBlock.translatable.subtitle) {
          updatedBlock.subtitle = translatedBlock.translatable.subtitle
        }
        if (translatedBlock.translatable.features && updatedBlock.features) {
          updatedBlock.features = updatedBlock.features.map((feature, index) => {
            const translatedFeature = translatedBlock.translatable.features[index]
            if (translatedFeature) {
              return {
                ...feature,
                title: translatedFeature.title || feature.title,
                description: translatedFeature.description || feature.description,
              }
            }
            return feature
          })
        }
        break

      case 'testimonials':
        if (translatedBlock.translatable.title) {
          updatedBlock.title = translatedBlock.translatable.title
        }
        if (translatedBlock.translatable.testimonials && updatedBlock.testimonials) {
          updatedBlock.testimonials = updatedBlock.testimonials.map((testimonial, index) => {
            const translatedTestimonial = translatedBlock.translatable.testimonials[index]
            if (translatedTestimonial) {
              return {
                ...testimonial,
                quote: translatedTestimonial.quote || testimonial.quote,
                position: translatedTestimonial.position || testimonial.position,
              }
            }
            return testimonial
          })
        }
        break

      case 'faq':
      case 'contactFAQ':
        if (translatedBlock.translatable.title) {
          updatedBlock.title = translatedBlock.translatable.title
        }
        if (translatedBlock.translatable.faqs && updatedBlock.faqs) {
          updatedBlock.faqs = updatedBlock.faqs.map((faq, index) => {
            const translatedFaq = translatedBlock.translatable.faqs[index]
            if (translatedFaq) {
              return {
                ...faq,
                question: translatedFaq.question || faq.question,
                answer: translatedFaq.answer || faq.answer,
              }
            }
            return faq
          })
        }
        break

      case 'productHero':
        if (translatedBlock.translatable.title) {
          updatedBlock.title = translatedBlock.translatable.title
        }
        if (translatedBlock.translatable.subtitle) {
          updatedBlock.subtitle = translatedBlock.translatable.subtitle
        }
        if (translatedBlock.translatable.description) {
          updatedBlock.description = translatedBlock.translatable.description
        }
        break

      case 'keyFeatures':
        if (translatedBlock.translatable.title) {
          updatedBlock.title = translatedBlock.translatable.title
        }
        if (translatedBlock.translatable.subtitle) {
          updatedBlock.subtitle = translatedBlock.translatable.subtitle
        }
        break

      case 'technicalOverview':
        if (translatedBlock.translatable.title) {
          updatedBlock.title = translatedBlock.translatable.title
        }
        if (translatedBlock.translatable.description) {
          updatedBlock.description = translatedBlock.translatable.description
        }
        break

      case 'productCTA':
        if (translatedBlock.translatable.title) {
          updatedBlock.title = translatedBlock.translatable.title
        }
        if (translatedBlock.translatable.description) {
          updatedBlock.description = translatedBlock.translatable.description
        }
        if (translatedBlock.translatable.formTitle) {
          updatedBlock.formTitle = translatedBlock.translatable.formTitle
        }
        if (translatedBlock.translatable.privacyText) {
          updatedBlock.privacyText = translatedBlock.translatable.privacyText
        }
        if (translatedBlock.translatable.stats && updatedBlock.stats) {
          updatedBlock.stats = updatedBlock.stats.map((stat, index) => {
            const translatedStat = translatedBlock.translatable.stats[index]
            if (translatedStat) {
              return {
                ...stat,
                label: translatedStat.label || stat.label,
              }
            }
            return stat
          })
        }
        if (translatedBlock.translatable.whyUsPoints && updatedBlock.whyUsPoints) {
          updatedBlock.whyUsPoints = updatedBlock.whyUsPoints.map((point, index) => {
            const translatedPoint = translatedBlock.translatable.whyUsPoints[index]
            if (translatedPoint) {
              return {
                ...point,
                text: translatedPoint.text || point.text,
              }
            }
            return point
          })
        }
        if (translatedBlock.translatable.applicationOptions && updatedBlock.applicationOptions) {
          updatedBlock.applicationOptions = updatedBlock.applicationOptions.map((option, index) => {
            const translatedOption = translatedBlock.translatable.applicationOptions[index]
            if (translatedOption) {
              return {
                ...option,
                label: translatedOption.label || option.label,
              }
            }
            return option
          })
        }
        if (translatedBlock.translatable.contactInfo && updatedBlock.contactInfo) {
          updatedBlock.contactInfo = {
            ...updatedBlock.contactInfo,
            responseTime:
              translatedBlock.translatable.contactInfo.responseTime ||
              updatedBlock.contactInfo.responseTime,
          }
        }
        break

      default:
        // Generic update for unknown block types
        for (const [key, value] of Object.entries(translatedBlock.translatable)) {
          if (typeof value === 'string' && value.trim() !== '') {
            updatedBlock[key] = value
          }
        }
    }

    // Clean all IDs before returning - this is critical!
    return this.cleanIds(updatedBlock)
  }

  reconstructRichTextContent(originalContent, translatedText) {
    if (!originalContent || !originalContent.root) {
      // Create a simple rich text structure if original doesn't exist
      return {
        root: {
          type: 'root',
          format: '',
          indent: 0,
          version: 1,
          children: [
            {
              type: 'paragraph',
              format: '',
              indent: 0,
              version: 1,
              children: [
                {
                  type: 'text',
                  format: 0,
                  style: '',
                  mode: 'normal',
                  text: translatedText,
                  version: 1,
                },
              ],
            },
          ],
        },
      }
    }

    // For now, replace the text content while preserving structure
    // This is a simplified approach - in production you might want more sophisticated handling
    const updateTextNodes = (node) => {
      if (node.type === 'text') {
        return {
          ...node,
          text: translatedText,
        }
      }

      if (node.children && Array.isArray(node.children)) {
        return {
          ...node,
          children: node.children.map(updateTextNodes),
        }
      }

      return node
    }

    return {
      ...originalContent,
      root: updateTextNodes(originalContent.root),
    }
  }

  async updatePageForLanguage(pageData, targetLanguage) {
    try {
      console.log(chalk.cyan(`    Updating ${config.languageNames[targetLanguage]} version...`))

      const translations = pageData.languageVersions[targetLanguage]
      if (!translations) {
        throw new Error(`No translations found for ${targetLanguage}`)
      }

      // Prepare the update payload
      const updateData = {
        title: translations.title,
        meta: {
          title: translations.meta.title,
          description: translations.meta.description,
        },
      }

      // Reconstruct layout blocks
      if (translations.blocks && pageData.originalData.layout) {
        updateData.layout = pageData.originalData.layout.map((originalBlock, index) => {
          const translatedBlock = translations.blocks[index]
          if (translatedBlock) {
            const reconstructed = this.reconstructBlockData(originalBlock, translatedBlock)
            // The reconstructBlockData already cleans IDs, but this is already clean
            return reconstructed
          }
          // Also clean the original block if no translation
          return this.cleanIds(originalBlock)
        })
      }

      // Update the page via API
      const response = await axios.patch(`${this.baseUrl}/api/pages/${pageData.id}`, updateData, {
        headers: this.headers,
        params: {
          locale: targetLanguage,
        },
      })

      if (response.status === 200) {
        console.log(
          chalk.green(`      ✅ ${config.languageNames[targetLanguage]} updated successfully`),
        )
        return {
          success: true,
          language: targetLanguage,
          pageId: pageData.id,
          title: translations.title,
        }
      } else {
        throw new Error(`Unexpected response status: ${response.status}`)
      }
    } catch (error) {
      console.error(chalk.red(`      ❌ Failed to update ${targetLanguage}:`), error.message)
      return {
        success: false,
        language: targetLanguage,
        pageId: pageData.id,
        error: error.message,
      }
    }
  }

  async updatePage(pageData) {
    console.log(chalk.blue(`  📝 Updating: ${pageData.title} (ID: ${pageData.id})`))

    const results = []
    const languages = Object.keys(pageData.languageVersions)

    for (const language of languages) {
      const result = await this.updatePageForLanguage(pageData, language)
      results.push(result)

      // Small delay between language updates
      await new Promise((resolve) => setTimeout(resolve, config.delayBetweenRequests))
    }

    return results
  }

  async run() {
    try {
      console.log(chalk.blue('🚀 Starting database update process...'))

      if (config.dryRun) {
        console.log(chalk.yellow('🧪 DRY RUN MODE - No actual database updates will be made'))
      }

      await this.authenticate()

      // Load translated data
      const translatedData = await fs.readJson('./data/pages-translated.json')
      console.log(chalk.green(`📖 Loaded ${translatedData.length} translated pages`))

      if (translatedData.length === 0) {
        console.log(chalk.yellow('⚠️ No translated data found. Run translation first.'))
        return
      }

      // Create backup of current state
      if (config.backupBeforeUpdate && !config.dryRun) {
        console.log(chalk.blue('💾 Creating backup...'))
        const timestamp = new Date().toISOString().replace(/[:.]/g, '-')
        await fs.copy('./data/pages-source.json', `./data/backup-${timestamp}.json`)
        console.log(chalk.green('✅ Backup created'))
      }

      // Process each page
      for (let i = 0; i < translatedData.length; i++) {
        const pageData = translatedData[i]
        console.log(
          chalk.cyan(`\n📄 [${i + 1}/${translatedData.length}] Processing: ${pageData.title}`),
        )

        if (config.dryRun) {
          console.log(
            chalk.yellow('  🧪 DRY RUN - Would update languages:'),
            Object.keys(pageData.languageVersions),
          )
          continue
        }

        try {
          const results = await this.updatePage(pageData)

          // Track results
          const successful = results.filter((r) => r.success)
          const failed = results.filter((r) => !r.success)

          this.updatedPages.push({
            pageId: pageData.id,
            title: pageData.title,
            successful: successful.map((r) => r.language),
            failed: failed.map((r) => ({ language: r.language, error: r.error })),
          })

          if (failed.length > 0) {
            this.errors.push(...failed)
          }

          console.log(
            chalk.green(
              `    ✅ Successfully updated: ${successful.map((r) => r.language).join(', ')}`,
            ),
          )
          if (failed.length > 0) {
            console.log(
              chalk.red(`    ❌ Failed updates: ${failed.map((r) => r.language).join(', ')}`),
            )
          }
        } catch (error) {
          console.error(chalk.red(`    ❌ Page update failed:`), error.message)
          this.errors.push({
            pageId: pageData.id,
            title: pageData.title,
            error: error.message,
          })
        }

        // Progress update
        const progress = Math.round(((i + 1) / translatedData.length) * 100)
        console.log(chalk.blue(`📊 Progress: ${progress}% (${i + 1}/${translatedData.length})`))

        // Batch delay
        if ((i + 1) % config.batchSize === 0) {
          console.log(chalk.yellow('⏳ Batch completed, taking a short break...'))
          await new Promise((resolve) => setTimeout(resolve, 2000))
        }
      }

      // Save results
      const results = {
        timestamp: new Date().toISOString(),
        dryRun: config.dryRun,
        summary: {
          totalPages: translatedData.length,
          successfulPages: this.updatedPages.filter((p) => p.failed.length === 0).length,
          partiallySuccessfulPages: this.updatedPages.filter(
            (p) => p.successful.length > 0 && p.failed.length > 0,
          ).length,
          failedPages: this.updatedPages.filter((p) => p.successful.length === 0).length,
          totalErrors: this.errors.length,
        },
        updatedPages: this.updatedPages,
        errors: this.errors,
      }

      await fs.writeJson('./data/update-results.json', results, { spaces: 2 })

      // Final summary
      console.log(chalk.green(`\n🎉 Database update completed!`))
      console.log(chalk.blue(`📁 Results saved to: ./data/update-results.json`))

      console.log(chalk.yellow(`\n📊 Update Summary:`))
      console.log(chalk.yellow(`   - Total pages processed: ${results.summary.totalPages}`))
      console.log(chalk.yellow(`   - Fully successful: ${results.summary.successfulPages}`))
      console.log(
        chalk.yellow(`   - Partially successful: ${results.summary.partiallySuccessfulPages}`),
      )
      console.log(chalk.yellow(`   - Failed: ${results.summary.failedPages}`))
      console.log(chalk.yellow(`   - Total errors: ${results.summary.totalErrors}`))

      if (this.errors.length > 0) {
        console.log(
          chalk.red(`\n⚠️ There were ${this.errors.length} errors during the update process.`),
        )
        console.log(chalk.red(`Check ./data/update-results.json for details.`))
      }

      return results
    } catch (error) {
      console.error(chalk.red('\n❌ Fatal error during database update:'), error.message)

      // Save partial results if any
      if (this.updatedPages.length > 0 || this.errors.length > 0) {
        const partialResults = {
          timestamp: new Date().toISOString(),
          partial: true,
          error: error.message,
          updatedPages: this.updatedPages,
          errors: this.errors,
        }
        await fs.writeJson('./data/update-results-partial.json', partialResults, { spaces: 2 })
        console.log(chalk.yellow('💾 Partial results saved to: ./data/update-results-partial.json'))
      }

      process.exit(1)
    }
  }
}

// Run if called directly
if (require.main === module) {
  const updater = new DatabaseUpdater()
  updater.run()
}

module.exports = DatabaseUpdater
