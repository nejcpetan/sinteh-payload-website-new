#!/usr/bin/env node

/**
 * Simple Homepage Translator
 * Clean, straightforward approach to translate homepage content
 */

const axios = require('axios')
const { OpenAI } = require('openai')
const chalk = require('chalk')
require('dotenv').config({ path: '.env.local' })

class SimpleHomepageTranslator {
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

  async fetchHomepage() {
    console.log(chalk.blue('📥 Fetching homepage...'))

    const response = await axios.get(`${this.baseUrl}/api/globals/homepage`, {
      headers: this.headers,
      params: {
        locale: 'sl', // Slovenian source
        depth: 5, // Deep fetch
      },
    })

    console.log(chalk.green('✅ Homepage fetched'))
    return response.data
  }

  // Simple function to extract all text from any object
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

  // Apply translations back to the original object
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

      // Clean media objects to IDs - be very aggressive
      Object.keys(result).forEach((key) => {
        const value = result[key]

        // Convert any object with an ID that looks like media
        if (value && typeof value === 'object' && value.id) {
          // Check if it has media-like properties OR field name suggests media
          const hasMediaProps = value.url || value.filename || value.mimeType || value.alt
          const isMediaField =
            key.toLowerCase().includes('image') ||
            key.toLowerCase().includes('logo') ||
            key.toLowerCase().includes('media') ||
            key.toLowerCase().includes('background')

          if (hasMediaProps || isMediaField) {
            console.log(chalk.yellow(`🔧 Converting ${key} from object to ID: ${value.id}`))
            result[key] = value.id
          }
        }
      })

      // Remove id fields
      delete result.id

      return result
    }

    return obj
  }

  // Build localized update object for Payload CMS
  buildLocalizedUpdate(originalData, translations) {
    console.log(chalk.blue('🔧 Building localized update object for homepage...'))

    const localizedUpdate = {}

    // Handle layout blocks (localized) - homepage only has layout field that's localized
    if (originalData.layout && Array.isArray(originalData.layout)) {
      localizedUpdate.layout = this.applyTranslations(originalData.layout, translations, 'layout')
      console.log(chalk.green(`✓ Layout: ${originalData.layout.length} blocks translated`))
    }

    console.log(
      chalk.blue(`📦 Localized update contains: ${Object.keys(localizedUpdate).join(', ')}`),
    )
    return localizedUpdate
  }

  // Recursively clean ALL media objects in the entire structure
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

  async updateHomepage(originalData, localizedUpdate, targetLanguage) {
    console.log(chalk.blue(`📝 Updating homepage for ${targetLanguage}...`))

    try {
      // Use POST for globals with only localized fields
      const response = await axios.post(`${this.baseUrl}/api/globals/homepage`, localizedUpdate, {
        headers: this.headers,
        params: { locale: targetLanguage },
      })

      if (response.status === 200) {
        console.log(chalk.green(`✅ Homepage updated for ${targetLanguage}`))
        console.log(chalk.gray(`   Updated fields: ${Object.keys(localizedUpdate).join(', ')}`))
        return true
      }

      throw new Error(`Update failed: ${response.status}`)
    } catch (error) {
      console.error(chalk.red(`❌ Failed to update homepage for ${targetLanguage}:`), error.message)
      if (error.response?.data) {
        console.error(chalk.red('   API Response:'), JSON.stringify(error.response.data, null, 2))
      }
      throw error
    }
  }

  async translateHomepage() {
    try {
      await this.authenticate()

      // Fetch original homepage
      const originalHomepage = await this.fetchHomepage()

      // FIRST: Clean all media objects to IDs before doing anything else
      const cleanedOriginal = this.deepCleanMediaObjects(originalHomepage)
      console.log(chalk.yellow('🧹 Pre-cleaned all media objects'))

      // Extract all text from cleaned data
      const allTexts = this.extractAllText(cleanedOriginal)
      console.log(chalk.yellow(`📊 Found ${Object.keys(allTexts).length} text fields to translate`))

      // Translate to each language
      const languages = ['en', 'de', 'hr']
      const languageNames = { en: 'English', de: 'German', hr: 'Croatian' }

      for (const lang of languages) {
        console.log(chalk.cyan(`\n🌍 Translating to ${languageNames[lang]}...`))

        // Translate texts
        const translations = await this.translateTexts(allTexts, languageNames[lang])

        // Build localized update object for Payload CMS
        const localizedUpdate = this.buildLocalizedUpdate(cleanedOriginal, translations)

        // Update in database with only localized fields
        await this.updateHomepage(cleanedOriginal, localizedUpdate, lang)
      }

      console.log(chalk.green('\n🎉 Homepage translation completed!'))
      console.log(chalk.blue('Check your website: http://localhost:3000/en'))
    } catch (error) {
      console.error(chalk.red('❌ Translation failed:'), error.message)
      if (error.response?.data) {
        console.error(chalk.red('Details:'), JSON.stringify(error.response.data, null, 2))
      }
    }
  }
}

// Run the translator
const translator = new SimpleHomepageTranslator()
translator.translateHomepage()
