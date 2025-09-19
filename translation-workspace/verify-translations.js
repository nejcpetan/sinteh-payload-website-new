const axios = require('axios')
const fs = require('fs-extra')
const config = require('./config')
const chalk = require('chalk')

class TranslationVerifier {
  constructor() {
    this.baseUrl = config.payloadUrl
    this.headers = {
      'Content-Type': 'application/json',
    }
    this.authToken = null
    this.verificationResults = []
  }

  async authenticate() {
    try {
      console.log(chalk.blue('🔐 Authenticating with Payload CMS...'))

      const response = await axios.post(`${this.baseUrl}/api/users/login`, {
        email: process.env.PAYLOAD_ADMIN_EMAIL || 'admin@example.com',
        password: process.env.PAYLOAD_ADMIN_PASSWORD || 'password',
      })

      if (response.data.token) {
        this.authToken = response.data.token
        this.headers['Authorization'] = `JWT ${this.authToken}`
        console.log(chalk.green('✅ Authentication successful'))
        return true
      }
    } catch (error) {
      console.log(chalk.yellow('⚠️ Direct auth failed, trying without auth for local dev...'))
      return true
    }
  }

  async verifyPageTranslation(pageId, pageTitle, targetLanguage) {
    try {
      const response = await axios.get(`${this.baseUrl}/api/pages/${pageId}`, {
        headers: this.headers,
        params: {
          locale: targetLanguage,
          depth: 2,
        },
      })

      const page = response.data

      // Check if page has content in target language
      const hasTitle = page.title && page.title.trim() !== ''
      const hasLayout = page.layout && Array.isArray(page.layout) && page.layout.length > 0
      const hasMeta = page.meta && (page.meta.title || page.meta.description)

      // Count translated blocks
      let translatedBlocks = 0
      let totalBlocks = 0

      if (page.layout) {
        totalBlocks = page.layout.length

        for (const block of page.layout) {
          let hasTranslatedContent = false

          // Check common translatable fields
          const textFields = ['title', 'subtitle', 'description', 'content']
          for (const field of textFields) {
            if (block[field] && typeof block[field] === 'string' && block[field].trim() !== '') {
              hasTranslatedContent = true
              break
            }
          }

          // Check rich text content
          if (block.content && block.content.root && block.content.root.children) {
            const hasText = this.extractTextFromRichContent(block.content).trim() !== ''
            if (hasText) {
              hasTranslatedContent = true
            }
          }

          // Check arrays (features, testimonials, faqs)
          const arrayFields = ['features', 'testimonials', 'faqs']
          for (const field of arrayFields) {
            if (block[field] && Array.isArray(block[field]) && block[field].length > 0) {
              const hasArrayContent = block[field].some((item) => {
                return Object.values(item).some(
                  (value) => typeof value === 'string' && value.trim() !== '',
                )
              })
              if (hasArrayContent) {
                hasTranslatedContent = true
                break
              }
            }
          }

          if (hasTranslatedContent) {
            translatedBlocks++
          }
        }
      }

      const completionPercentage =
        totalBlocks > 0 ? Math.round((translatedBlocks / totalBlocks) * 100) : 0

      return {
        pageId,
        pageTitle,
        language: targetLanguage,
        hasTitle,
        hasLayout,
        hasMeta,
        totalBlocks,
        translatedBlocks,
        completionPercentage,
        isComplete: hasTitle && hasLayout && completionPercentage >= 80,
        lastUpdated: page.updatedAt,
      }
    } catch (error) {
      return {
        pageId,
        pageTitle,
        language: targetLanguage,
        error: error.message,
        isComplete: false,
        completionPercentage: 0,
      }
    }
  }

  extractTextFromRichContent(richContent) {
    if (!richContent || !richContent.root) return ''

    const extractText = (node) => {
      if (node.type === 'text') {
        return node.text || ''
      }

      if (node.children && Array.isArray(node.children)) {
        return node.children.map(extractText).join('')
      }

      return ''
    }

    return extractText(richContent.root)
  }

  async verifyAllTranslations() {
    try {
      // Load the original source data to know what pages should be translated
      const sourceData = await fs.readJson('./data/pages-source.json')
      console.log(chalk.green(`📖 Loaded ${sourceData.length} pages for verification`))

      const verificationResults = []

      for (let i = 0; i < sourceData.length; i++) {
        const page = sourceData[i]
        console.log(chalk.cyan(`\n📄 [${i + 1}/${sourceData.length}] Verifying: ${page.title}`))

        const pageResults = {
          pageId: page.id,
          title: page.title,
          slug: page.slug,
          languages: {},
        }

        // Verify each target language
        for (const language of config.targetLocales) {
          console.log(chalk.blue(`  🌍 Checking ${config.languageNames[language]}...`))

          const result = await this.verifyPageTranslation(page.id, page.title, language)
          pageResults.languages[language] = result

          if (result.error) {
            console.log(chalk.red(`    ❌ Error: ${result.error}`))
          } else if (result.isComplete) {
            console.log(chalk.green(`    ✅ Complete (${result.completionPercentage}%)`))
          } else {
            console.log(chalk.yellow(`    ⚠️ Incomplete (${result.completionPercentage}%)`))
          }

          // Small delay between requests
          await new Promise((resolve) => setTimeout(resolve, 300))
        }

        verificationResults.push(pageResults)

        // Progress update
        const progress = Math.round(((i + 1) / sourceData.length) * 100)
        console.log(chalk.blue(`📊 Progress: ${progress}% (${i + 1}/${sourceData.length})`))
      }

      return verificationResults
    } catch (error) {
      console.error(chalk.red('❌ Error during verification:'), error.message)
      throw error
    }
  }

  generateReport(verificationResults) {
    const report = {
      timestamp: new Date().toISOString(),
      summary: {
        totalPages: verificationResults.length,
        languageStats: {},
      },
      pages: verificationResults,
      recommendations: [],
    }

    // Calculate language statistics
    for (const language of config.targetLocales) {
      const languageResults = verificationResults.map((p) => p.languages[language])
      const completed = languageResults.filter((r) => r.isComplete).length
      const errors = languageResults.filter((r) => r.error).length
      const avgCompletion =
        languageResults.reduce((sum, r) => sum + (r.completionPercentage || 0), 0) /
        languageResults.length

      report.summary.languageStats[language] = {
        name: config.languageNames[language],
        completed,
        errors,
        avgCompletion: Math.round(avgCompletion),
        completionRate: Math.round((completed / verificationResults.length) * 100),
      }
    }

    // Generate recommendations
    const incompletePages = verificationResults.filter((p) =>
      Object.values(p.languages).some((l) => !l.isComplete),
    )

    if (incompletePages.length > 0) {
      report.recommendations.push({
        type: 'incomplete_translations',
        message: `${incompletePages.length} pages have incomplete translations`,
        pages: incompletePages.map((p) => ({ id: p.pageId, title: p.title })),
      })
    }

    const errorPages = verificationResults.filter((p) =>
      Object.values(p.languages).some((l) => l.error),
    )

    if (errorPages.length > 0) {
      report.recommendations.push({
        type: 'translation_errors',
        message: `${errorPages.length} pages have translation errors`,
        pages: errorPages.map((p) => ({ id: p.pageId, title: p.title })),
      })
    }

    // Find languages with low completion rates
    for (const [language, stats] of Object.entries(report.summary.languageStats)) {
      if (stats.completionRate < 80) {
        report.recommendations.push({
          type: 'low_completion_rate',
          message: `${stats.name} has low completion rate (${stats.completionRate}%)`,
          language: language,
        })
      }
    }

    return report
  }

  async run() {
    try {
      console.log(chalk.blue('🔍 Starting translation verification...'))

      await this.authenticate()

      const verificationResults = await this.verifyAllTranslations()
      const report = this.generateReport(verificationResults)

      // Save verification report
      await fs.ensureDir('./data')
      await fs.writeJson('./data/verification-report.json', report, { spaces: 2 })

      console.log(chalk.green(`\n🎉 Verification completed!`))
      console.log(chalk.blue(`📁 Report saved to: ./data/verification-report.json`))

      // Display summary
      console.log(chalk.yellow(`\n📊 Verification Summary:`))
      console.log(chalk.yellow(`   - Total pages: ${report.summary.totalPages}`))

      for (const [language, stats] of Object.entries(report.summary.languageStats)) {
        const statusColor = stats.completionRate >= 80 ? chalk.green : chalk.yellow
        console.log(
          statusColor(
            `   - ${stats.name}: ${stats.completed}/${report.summary.totalPages} complete (${stats.completionRate}%)`,
          ),
        )
      }

      if (report.recommendations.length > 0) {
        console.log(chalk.yellow(`\n💡 Recommendations:`))
        for (const rec of report.recommendations) {
          console.log(chalk.yellow(`   - ${rec.message}`))
        }
      } else {
        console.log(chalk.green(`\n✨ All translations are complete and working properly!`))
      }

      return report
    } catch (error) {
      console.error(chalk.red('\n❌ Fatal error during verification:'), error.message)
      process.exit(1)
    }
  }
}

// Run if called directly
if (require.main === module) {
  const verifier = new TranslationVerifier()
  verifier.run()
}

module.exports = TranslationVerifier
