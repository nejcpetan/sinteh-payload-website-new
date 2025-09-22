#!/usr/bin/env node

/**
 * Simple Pages Translator
 * Based on the working simple-homepage-translator.js
 * Clean, straightforward approach to translate all pages content
 */

const axios = require('axios')
const { OpenAI } = require('openai')
const chalk = require('chalk')
require('dotenv').config({ path: '.env.local' })

class SimplePagesTranslator {
  constructor() {
    this.baseUrl = 'http://localhost:3000'
    this.openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    })
    this.headers = {}
  }

  async authenticate() {
    console.log(chalk.blue('🔐 Authenticating...'))

    const response = await axios.post(`${this.baseUrl}/api/users/login`, {
      email: 'nathan@webfast.si', // Replace with your admin email
      password: 'Adidas_forlife1!', // Replace with your admin password
    })

    this.headers = {
      Authorization: `JWT ${response.data.token}`,
      'Content-Type': 'application/json',
    }

    console.log(chalk.green('✅ Authentication successful'))
  }

  async fetchAllPages() {
    console.log(chalk.blue('📥 Fetching all pages...'))

    const response = await axios.get(`${this.baseUrl}/api/pages`, {
      headers: this.headers,
      params: {
        locale: 'sl', // Slovenian source
        depth: 5, // Deep fetch
        limit: 100, // Get all pages
      },
    })

    console.log(chalk.green(`✅ Found ${response.data.docs.length} pages`))
    return response.data.docs
  }

  async fetchPageDetails(pageId) {
    const response = await axios.get(`${this.baseUrl}/api/pages/${pageId}`, {
      headers: this.headers,
      params: {
        locale: 'sl', // Slovenian source
        depth: 5, // Deep fetch
      },
    })

    return response.data
  }

  // Simple function to extract all text from any object (same as homepage translator)
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

        // Skip enum/select fields that have specific allowed values
        if (['status', '_status', 'type', 'variant', 'icon', 'publishedAt'].includes(key)) {
          return
        }

        const newPath = path ? `${path}.${key}` : key
        const itemTexts = this.extractAllText(obj[key], newPath)
        Object.assign(textFields, itemTexts)
      })
    }

    return textFields
  }

  async translateTexts(texts, targetLanguage) {
    console.log(
      chalk.blue(`🔄 Translating ${Object.keys(texts).length} text fields to ${targetLanguage}...`),
    )

    // Create a simple object with all texts
    const textsToTranslate = {}
    Object.keys(texts).forEach((path) => {
      // Use a simple key instead of complex path
      const simpleKey = `text_${Object.keys(textsToTranslate).length}`
      textsToTranslate[simpleKey] = texts[path]
    })

    console.log(chalk.gray('📤 Sample texts to translate:'))
    Object.keys(textsToTranslate)
      .slice(0, 3)
      .forEach((key) => {
        console.log(chalk.gray(`  ${key}: "${textsToTranslate[key]}"`))
      })

    const prompt = `Translate this JSON from Slovenian to ${targetLanguage}. Keep the same keys, translate only the values:

${JSON.stringify(textsToTranslate, null, 2)}`

    const response = await this.openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        {
          role: 'system',
          content: `You are a translator. Translate JSON values from Slovenian to ${targetLanguage}. Return only valid JSON.`,
        },
        {
          role: 'user',
          content: prompt,
        },
      ],
      temperature: 0.1,
    })

    const translatedText = response.choices[0].message.content.trim()
    console.log(chalk.gray('📥 Translation received'))

    // Parse the response
    let translatedTexts
    try {
      translatedTexts = JSON.parse(translatedText)
    } catch (error) {
      // Try to clean the response
      const cleaned = translatedText.replace(/^```json?\n?/, '').replace(/\n?```$/, '')
      translatedTexts = JSON.parse(cleaned)
    }

    // Map back to original paths
    const result = {}
    const originalPaths = Object.keys(texts)
    const translatedKeys = Object.keys(translatedTexts)

    originalPaths.forEach((path, index) => {
      if (translatedKeys[index]) {
        result[path] = translatedTexts[translatedKeys[index]]
        console.log(chalk.green(`✏️ ${path}: "${texts[path]}" → "${result[path]}"`))
      }
    })

    return result
  }

  // Apply translations back to the original object (same as homepage translator)
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

  // Build localized update object for Payload CMS
  buildLocalizedUpdate(originalData, translations) {
    console.log(chalk.blue('🔧 Building localized update object...'))

    const localizedUpdate = {}

    // Handle title field (localized)
    if (translations['title']) {
      localizedUpdate.title = translations['title']
      console.log(chalk.green(`✓ Title: "${translations['title']}"`))
    }

    // Handle layout blocks (localized)
    if (originalData.layout && Array.isArray(originalData.layout)) {
      localizedUpdate.layout = this.applyTranslations(originalData.layout, translations, 'layout')
      console.log(chalk.green(`✓ Layout: ${originalData.layout.length} blocks translated`))
    }

    // Handle meta fields (localized group)
    const metaTranslations = {}
    Object.keys(translations).forEach((path) => {
      if (path.startsWith('meta.')) {
        const metaField = path.replace('meta.', '')
        metaTranslations[metaField] = translations[path]
      }
    })

    if (Object.keys(metaTranslations).length > 0) {
      localizedUpdate.meta = {
        ...originalData.meta,
        ...metaTranslations,
      }
      console.log(chalk.green(`✓ Meta: ${Object.keys(metaTranslations).length} fields translated`))
    }

    console.log(
      chalk.blue(`📦 Localized update contains: ${Object.keys(localizedUpdate).join(', ')}`),
    )
    return localizedUpdate
  }

  // Recursively clean ALL media objects in the entire structure (same as homepage translator)
  deepCleanMediaObjects(obj) {
    if (Array.isArray(obj)) {
      return obj.map((item) => this.deepCleanMediaObjects(item))
    } else if (obj && typeof obj === 'object') {
      const result = { ...obj }

      Object.keys(result).forEach((key) => {
        const value = result[key]

        // If this is a media object, convert to ID
        if (value && typeof value === 'object' && value.id) {
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
            console.log(chalk.yellow(`🧹 Deep cleaning ${key}: ${value.id}`))
            result[key] = value.id
          } else {
            // Recursively clean nested objects
            result[key] = this.deepCleanMediaObjects(value)
          }
        } else if (typeof value === 'object') {
          // Recursively clean nested objects/arrays
          result[key] = this.deepCleanMediaObjects(value)
        }
      })

      // Remove all id fields except for media IDs we just set
      if (result.id && typeof result.id === 'string' && result.id.length > 10) {
        delete result.id
      }

      return result
    }

    return obj
  }

  async updatePage(originalPageData, localizedUpdate, targetLanguage) {
    console.log(chalk.blue(`📝 Updating ${originalPageData.title} for ${targetLanguage}...`))

    try {
      // Use PATCH for pages with only localized fields
      const response = await axios.patch(
        `${this.baseUrl}/api/pages/${originalPageData.id}`,
        localizedUpdate,
        {
          headers: this.headers,
          params: { locale: targetLanguage },
        },
      )

      if (response.status === 200) {
        console.log(chalk.green(`✅ Page updated for ${targetLanguage}`))
        console.log(chalk.gray(`   Updated fields: ${Object.keys(localizedUpdate).join(', ')}`))
        return true
      }

      throw new Error(`Update failed: ${response.status}`)
    } catch (error) {
      console.error(chalk.red(`❌ Failed to update page for ${targetLanguage}:`), error.message)
      if (error.response?.data) {
        console.error(chalk.red('   API Response:'), JSON.stringify(error.response.data, null, 2))
      }
      throw error
    }
  }

  async translatePage(page) {
    console.log(chalk.cyan(`\n📄 Processing: ${page.title} (ID: ${page.id})`))

    try {
      // Fetch full page details
      const pageDetails = await this.fetchPageDetails(page.id)

      // FIRST: Clean all media objects to IDs before doing anything else
      const cleanedPage = this.deepCleanMediaObjects(pageDetails)
      console.log(chalk.yellow('🧹 Pre-cleaned all media objects'))

      // Extract all text from cleaned data
      const allTexts = this.extractAllText(cleanedPage)
      console.log(chalk.yellow(`📊 Found ${Object.keys(allTexts).length} text fields to translate`))

      // Skip if no translatable content
      if (Object.keys(allTexts).length === 0) {
        console.log(chalk.gray('⏭️ No translatable content found, skipping'))
        return
      }

      // Translate to each language
      const languages = ['en', 'de', 'hr']
      const languageNames = { en: 'English', de: 'German', hr: 'Croatian' }

      for (const lang of languages) {
        console.log(chalk.cyan(`  🌍 Translating to ${languageNames[lang]}...`))

        try {
          // Translate texts
          const translations = await this.translateTexts(allTexts, languageNames[lang])

          // Build localized update object for Payload CMS
          const localizedUpdate = this.buildLocalizedUpdate(cleanedPage, translations)

          // Update in database with only localized fields
          await this.updatePage(cleanedPage, localizedUpdate, lang)
        } catch (error) {
          console.error(chalk.red(`    ❌ Failed to translate to ${lang}:`), error.message)
          if (error.response?.data) {
            console.error(chalk.red('    Details:'), JSON.stringify(error.response.data, null, 2))
          }
        }
      }
    } catch (error) {
      console.error(chalk.red(`❌ Failed to process ${page.title}:`), error.message)
    }
  }

  async translateAllPages() {
    try {
      await this.authenticate()

      // Fetch all pages
      const pages = await this.fetchAllPages()

      console.log(chalk.blue(`\n🚀 Starting translation of ${pages.length} pages...`))

      // Process each page
      for (let i = 0; i < pages.length; i++) {
        const page = pages[i]
        console.log(chalk.blue(`\n[${i + 1}/${pages.length}] Processing: ${page.title}`))

        await this.translatePage(page)

        // Small delay between pages to avoid overwhelming the API
        if (i < pages.length - 1) {
          await new Promise((resolve) => setTimeout(resolve, 1000))
        }
      }

      console.log(chalk.green('\n🎉 All pages translation completed!'))
      console.log(chalk.blue('Check your website to see the translated content'))
    } catch (error) {
      console.error(chalk.red('❌ Translation failed:'), error.message)
      if (error.response?.data) {
        console.error(chalk.red('Details:'), JSON.stringify(error.response.data, null, 2))
      }
    }
  }
}

// Run the translator
const translator = new SimplePagesTranslator()
translator.translateAllPages()
