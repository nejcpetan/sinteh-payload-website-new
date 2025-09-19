const axios = require('axios')
const fs = require('fs-extra')
const config = require('./config')
const chalk = require('chalk')

class PagesFetcher {
  constructor() {
    this.baseUrl = config.payloadUrl
    this.headers = {
      'Content-Type': 'application/json',
    }
    this.authToken = null
  }

  async authenticate() {
    try {
      console.log(chalk.blue('🔐 Authenticating with Payload CMS...'))

      // For local development, we'll use the API key directly
      // In production, you'd typically authenticate with username/password
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
      // For local development, API might be open
      return true
    }
  }

  async fetchAllPages() {
    try {
      console.log(chalk.blue('📄 Fetching all pages from Slovenian locale...'))

      const response = await axios.get(`${this.baseUrl}/api/pages`, {
        headers: this.headers,
        params: {
          locale: config.sourceLocale,
          limit: 100,
          depth: 0,
        },
      })

      const pages = response.data.docs
      console.log(chalk.green(`✅ Found ${pages.length} pages`))

      return pages
    } catch (error) {
      console.error(chalk.red('❌ Error fetching pages:'), error.message)
      throw error
    }
  }

  async fetchPageDetails(pageId) {
    try {
      console.log(chalk.blue(`📖 Fetching details for page ID: ${pageId}`))

      const response = await axios.get(`${this.baseUrl}/api/pages/${pageId}`, {
        headers: this.headers,
        params: {
          locale: config.sourceLocale,
          depth: 3, // Deep fetch to get all block content
        },
      })

      return response.data
    } catch (error) {
      console.error(chalk.red(`❌ Error fetching page ${pageId}:`), error.message)
      throw error
    }
  }

  async checkExistingTranslations(pageId) {
    const translations = {}

    // First get the Slovenian version for comparison
    let slovenianContent = null
    try {
      const slResponse = await axios.get(`${this.baseUrl}/api/pages/${pageId}`, {
        headers: this.headers,
        params: {
          locale: 'sl',
          depth: 5,
        },
      })
      slovenianContent = slResponse.data
    } catch (error) {
      console.log(chalk.yellow(`⚠️ Could not fetch Slovenian content for page ${pageId}`))
    }

    for (const locale of config.targetLocales) {
      try {
        const response = await axios.get(`${this.baseUrl}/api/pages/${pageId}`, {
          headers: this.headers,
          params: {
            locale: locale,
            depth: 5,
          },
        })

        const page = response.data

        // Check if page has meaningful content in this locale
        const hasBasicContent = page.title && page.layout && page.layout.length > 0

        // Check if content is actually translated (not just copied from Slovenian)
        let isActuallyTranslated = false

        if (hasBasicContent && slovenianContent) {
          // Compare some key content to see if it's different from Slovenian
          const differences = []

          // Check title (if different from Slovenian)
          if (page.title !== slovenianContent.title) {
            differences.push('title')
          }

          // Check first few blocks for content differences
          if (page.layout && slovenianContent.layout) {
            for (let i = 0; i < Math.min(3, page.layout.length); i++) {
              const targetBlock = page.layout[i]
              const sourceBlock = slovenianContent.layout[i]

              if (targetBlock && sourceBlock) {
                // Check common text fields
                const textFields = ['title', 'subtitle', 'description']
                for (const field of textFields) {
                  if (
                    targetBlock[field] &&
                    sourceBlock[field] &&
                    targetBlock[field] !== sourceBlock[field]
                  ) {
                    differences.push(`block${i}_${field}`)
                  }
                }
              }
            }
          }

          // Consider it translated if we found at least 2 differences
          isActuallyTranslated = differences.length >= 2

          console.log(
            chalk.gray(
              `    ${locale}: ${differences.length} differences found ${differences.length >= 2 ? '✅' : '❌'}`,
            ),
          )
        }

        translations[locale] = {
          exists: true,
          hasContent: hasBasicContent,
          isTranslated: isActuallyTranslated,
          title: page.title || null,
        }
      } catch (error) {
        translations[locale] = {
          exists: false,
          hasContent: false,
          isTranslated: false,
          title: null,
        }
      }
    }

    return translations
  }

  extractTranslatableContent(pageData) {
    const content = {
      id: pageData.id,
      slug: pageData.slug,
      title: pageData.title,
      meta: {
        title: pageData.meta?.title || null,
        description: pageData.meta?.description || null,
      },
      blocks: [],
    }

    if (pageData.layout && Array.isArray(pageData.layout)) {
      content.blocks = this.extractBlockContent(pageData.layout)
    }

    return content
  }

  extractBlockContent(blocks) {
    return blocks.map((block) => {
      const extractedBlock = {
        blockType: block.blockType,
        id: block.id,
        translatable: {},
      }

      // Use deep extraction for ALL blocks (like the simple translator)
      extractedBlock.translatable = this.extractAllText(block)

      return extractedBlock
    })
  }

  // Deep content extraction - same as simple translator
  extractAllText(obj, path = '') {
    const textFields = {}

    if (typeof obj === 'string' && obj.trim() !== '') {
      textFields[path] = obj
    } else if (Array.isArray(obj)) {
      obj.forEach((item, index) => {
        const itemTexts = this.extractAllText(item, `${path}[${index}]`)
        Object.assign(textFields, itemTexts)
      })
    } else if (obj && typeof obj === 'object') {
      Object.keys(obj).forEach((key) => {
        // Skip system fields
        if (['id', '_id', 'createdAt', 'updatedAt', 'blockType', '__v'].includes(key)) {
          return
        }

        // Skip media fields
        if (key.toLowerCase().includes('image') || key.toLowerCase().includes('media')) {
          return
        }

        const newPath = path ? `${path}.${key}` : key
        const itemTexts = this.extractAllText(obj[key], newPath)
        Object.assign(textFields, itemTexts)
      })
    }

    return textFields
  }

  // Legacy extraction for backward compatibility (now using deep extraction above)
  extractBlockContentOld(blocks) {
    return blocks.map((block) => {
      const extractedBlock = {
        blockType: block.blockType,
        id: block.id,
        translatable: {},
      }

      // Extract translatable fields based on block type
      switch (block.blockType) {
        case 'simplePage':
          extractedBlock.translatable = {
            title: block.title || null,
            subtitle: block.subtitle || null,
            content: this.extractRichTextContent(block.content),
          }
          break

        case 'hero':
          extractedBlock.translatable = {
            title: block.title || null,
            subtitle: block.subtitle || null,
            description: block.description || null,
          }
          break

        case 'features':
          extractedBlock.translatable = {
            title: block.title || null,
            subtitle: block.subtitle || null,
            features:
              block.features?.map((f) => ({
                title: f.title || null,
                description: f.description || null,
              })) || [],
          }
          break

        case 'testimonials':
          extractedBlock.translatable = {
            title: block.title || null,
            testimonials:
              block.testimonials?.map((t) => ({
                quote: t.quote || null,
                author: t.author || null,
                position: t.position || null,
                company: t.company || null,
              })) || [],
          }
          break

        case 'faq':
        case 'contactFAQ':
          extractedBlock.translatable = {
            title: block.title || null,
            subtitle: block.subtitle || null,
            faqs:
              block.faqs?.map((f) => ({
                question: f.question || null,
                answer: f.answer || null,
              })) || [],
          }
          break

        case 'productCTA':
          extractedBlock.translatable = {
            title: block.title || null,
            description: block.description || null,
            formTitle: block.formTitle || null,
            privacyText: block.privacyText || null,
            stats:
              block.stats?.map((s) => ({
                value: s.value || null,
                label: s.label || null,
              })) || [],
            whyUsPoints:
              block.whyUsPoints?.map((p) => ({
                text: p.text || null,
              })) || [],
            applicationOptions:
              block.applicationOptions?.map((o) => ({
                value: o.value || null,
                label: o.label || null,
              })) || [],
            contactInfo: {
              phone: block.contactInfo?.phone || null,
              email: block.contactInfo?.email || null,
              responseTime: block.contactInfo?.responseTime || null,
            },
          }
          break

        case 'productHero':
          extractedBlock.translatable = {
            title: block.title || null,
            subtitle: block.subtitle || null,
            description: block.description || null,
          }
          break

        case 'keyFeatures':
          extractedBlock.translatable = {
            title: block.title || null,
            subtitle: block.subtitle || null,
            features:
              block.features?.map((f) => ({
                title: f.title || null,
                description: f.description || null,
              })) || [],
          }
          break

        case 'technicalOverview':
          extractedBlock.translatable = {
            title: block.title || null,
            description: block.description || null,
          }
          break

        default:
          // Generic extraction for unknown block types
          extractedBlock.translatable = this.extractGenericContent(block)
      }

      return extractedBlock
    })
  }

  extractRichTextContent(richTextData) {
    if (!richTextData || !richTextData.root) return null

    // Extract plain text from Lexical editor format
    const extractText = (node) => {
      if (node.type === 'text') {
        return node.text || ''
      }

      if (node.children && Array.isArray(node.children)) {
        return node.children.map(extractText).join('')
      }

      return ''
    }

    return extractText(richTextData.root)
  }

  extractGenericContent(block) {
    const content = {}

    // Look for common text fields
    const textFields = ['title', 'subtitle', 'description', 'content', 'text', 'label']

    textFields.forEach((field) => {
      if (block[field] && typeof block[field] === 'string') {
        content[field] = block[field]
      }
    })

    return content
  }

  async run() {
    try {
      await this.authenticate()

      const pages = await this.fetchAllPages()
      const pagesData = []

      console.log(chalk.blue('\n📚 Processing pages...'))

      for (const page of pages) {
        console.log(chalk.cyan(`\nProcessing: ${page.title} (ID: ${page.id})`))

        // Fetch detailed page content
        const pageDetails = await this.fetchPageDetails(page.id)

        // Check existing translations
        const existingTranslations = await this.checkExistingTranslations(page.id)

        // Extract translatable content
        const translatableContent = this.extractTranslatableContent(pageDetails)

        // Determine which languages need translation
        const needsTranslation = []
        for (const locale of config.targetLocales) {
          // Need translation if: no content OR content exists but is not actually translated
          if (
            !existingTranslations[locale].hasContent ||
            !existingTranslations[locale].isTranslated
          ) {
            needsTranslation.push(locale)
          }
        }

        pagesData.push({
          ...translatableContent,
          existingTranslations,
          needsTranslation,
          originalData: pageDetails,
        })

        console.log(
          chalk.green(`  ✅ Needs translation for: ${needsTranslation.join(', ') || 'none'}`),
        )

        // Small delay to be nice to the API
        await new Promise((resolve) => setTimeout(resolve, config.delayBetweenRequests))
      }

      // Save extracted data
      await fs.ensureDir('./data')
      await fs.writeJson('./data/pages-source.json', pagesData, { spaces: 2 })

      console.log(chalk.green(`\n🎉 Successfully extracted ${pagesData.length} pages`))
      console.log(chalk.blue(`📁 Data saved to: ./data/pages-source.json`))

      // Summary
      const totalNeedingTranslation = pagesData.filter((p) => p.needsTranslation.length > 0).length
      console.log(chalk.yellow(`\n📊 Summary:`))
      console.log(chalk.yellow(`   - Total pages: ${pagesData.length}`))
      console.log(chalk.yellow(`   - Pages needing translation: ${totalNeedingTranslation}`))

      return pagesData
    } catch (error) {
      console.error(chalk.red('\n❌ Fatal error:'), error.message)
      process.exit(1)
    }
  }
}

// Run if called directly
if (require.main === module) {
  const fetcher = new PagesFetcher()
  fetcher.run()
}

module.exports = PagesFetcher
