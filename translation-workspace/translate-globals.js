#!/usr/bin/env node

/**
 * Global Content Translation Script
 * Handles translation of Payload CMS globals: homepage, header, footer
 */

const axios = require('axios')
const fs = require('fs-extra')
const chalk = require('chalk')
const OpenAI = require('openai')
const config = require('./config.js')

class GlobalTranslator {
  constructor() {
    this.baseUrl = config.payloadUrl
    this.headers = {
      'Content-Type': 'application/json',
    }
    this.openai = new OpenAI({
      apiKey: config.openaiApiKey,
    })
    this.translatedGlobals = []
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
        this.headers.Authorization = `JWT ${response.data.token}`
        console.log(chalk.green('✅ Authentication successful'))
        return true
      } else {
        throw new Error('No token received from login')
      }
    } catch (error) {
      console.error(chalk.red('❌ Authentication failed:'), error.message)
      throw error
    }
  }

  async fetchGlobal(globalSlug) {
    try {
      console.log(chalk.blue(`📥 Fetching ${globalSlug} global...`))

      // Try the correct Payload CMS globals API endpoint
      const response = await axios.get(`${this.baseUrl}/api/globals/${globalSlug}`, {
        headers: this.headers,
        params: {
          locale: 'sl', // Fetch Slovenian version as source
          depth: 10, // Deep fetch to get all nested content
        },
      })

      return response.data
    } catch (error) {
      console.error(chalk.red(`❌ Failed to fetch ${globalSlug}:`), error.message)

      // Debug: Let's see what endpoints are available
      if (error.response?.status === 404) {
        console.log(chalk.yellow('🔍 Trying to find correct endpoint...'))
        try {
          // Try without the 's' in globals
          const altResponse = await axios.get(`${this.baseUrl}/api/global/${globalSlug}`, {
            headers: this.headers,
            params: {
              locale: 'sl',
              depth: 10, // Deep fetch to get all nested content
            },
          })
          console.log(chalk.green(`✅ Found correct endpoint: /api/global/${globalSlug}`))
          return altResponse.data
        } catch (altError) {
          console.error(chalk.red('Alternative endpoint also failed'))
        }
      }

      throw error
    }
  }

  extractTranslatableContent(globalData, globalSlug) {
    const content = {
      slug: globalSlug,
      translatable: {},
    }

    switch (globalSlug) {
      case 'homepage':
        content.translatable = this.extractHomepageContent(globalData)
        break
      case 'header':
        content.translatable = this.extractHeaderContent(globalData)
        break
      case 'footer':
        content.translatable = this.extractFooterContent(globalData)
        break
      case 'seo':
        content.translatable = this.extractSeoContent(globalData)
        break
      default:
        console.log(chalk.yellow(`⚠️ Unknown global type: ${globalSlug}`))
    }

    return content
  }

  extractHomepageContent(data) {
    const content = {}

    if (data.layout && Array.isArray(data.layout)) {
      content.layout = data.layout.map((block) => {
        const extractedBlock = {
          blockType: block.blockType,
          id: block.id,
          translatable: {},
        }

        // Use deep extraction for all blocks
        extractedBlock.translatable = this.extractDeepContent(block)

        // Debug: Log what was extracted for this block
        console.log(
          chalk.gray(
            `🔍 Block ${block.blockType} extracted:`,
            JSON.stringify(extractedBlock.translatable, null, 2),
          ),
        )

        return extractedBlock
      })
    }

    return content
  }

  // Deep content extraction that goes through all nested structures
  extractDeepContent(obj, parentKey = '') {
    const extracted = {}

    if (!obj || typeof obj !== 'object') {
      return extracted
    }

    Object.keys(obj).forEach((key) => {
      const value = obj[key]
      const fullKey = parentKey ? `${parentKey}.${key}` : key

      // Skip non-translatable fields
      if (this.shouldSkipField(key, value)) {
        return
      }

      if (typeof value === 'string' && value.trim() !== '') {
        // Direct string field
        extracted[key] = value
      } else if (Array.isArray(value)) {
        // Array of items - extract from each item
        const extractedArray = value
          .map((item, index) => {
            if (typeof item === 'string' && item.trim() !== '') {
              return item
            } else if (typeof item === 'object' && item !== null) {
              return this.extractDeepContent(item, `${fullKey}[${index}]`)
            }
            return null
          })
          .filter(
            (item) => item !== null && (typeof item === 'string' || Object.keys(item).length > 0),
          )

        if (extractedArray.length > 0) {
          extracted[key] = extractedArray
        }
      } else if (typeof value === 'object' && value !== null) {
        // Nested object - extract recursively
        const nestedExtracted = this.extractDeepContent(value, fullKey)
        if (Object.keys(nestedExtracted).length > 0) {
          extracted[key] = nestedExtracted
        }
      }
    })

    return extracted
  }

  shouldSkipField(key, value) {
    // Skip technical/system fields
    const skipFields = [
      'id',
      '_id',
      'createdAt',
      'updatedAt',
      'publishedAt',
      'blockType',
      'blockName',
      '__v',
      '_status',
    ]

    // Skip media relationship fields (images, files, etc.)
    if (this.isMediaField(key, value)) {
      return true
    }

    // Skip if it's a system field
    if (skipFields.includes(key)) {
      return true
    }

    // Skip if key starts with underscore (system fields)
    if (key.startsWith('_')) {
      return true
    }

    // Skip boolean, number, or null values (usually not translatable)
    if (typeof value === 'boolean' || typeof value === 'number' || value === null) {
      return true
    }

    // Skip empty arrays or objects
    if (Array.isArray(value) && value.length === 0) {
      return true
    }

    if (typeof value === 'object' && value !== null && Object.keys(value).length === 0) {
      return true
    }

    return false
  }

  extractHeaderContent(data) {
    // Use deep extraction for header content
    return this.extractDeepContent(data)
  }

  extractFooterContent(data) {
    // Use deep extraction for footer content
    return this.extractDeepContent(data)
  }

  extractSeoContent(data) {
    // Use deep extraction for SEO content
    return this.extractDeepContent(data)
  }

  async translateContent(content, targetLanguage) {
    try {
      console.log(
        chalk.cyan(`🔄 Translating ${content.slug} to ${config.languageNames[targetLanguage]}...`),
      )

      // Debug: Log what content is being sent to OpenAI
      console.log(
        chalk.gray(`📤 Sending to OpenAI:`, JSON.stringify(content.translatable, null, 2)),
      )

      // Check content size and use appropriate model
      const contentStr = JSON.stringify(content.translatable, null, 2)
      const estimatedTokens = contentStr.length / 4 // Rough token estimation

      let model = 'gpt-4o-mini' // Use the correct model name
      if (estimatedTokens > 100000) {
        model = 'gpt-4o' // Use full gpt-4o for very large content
        console.log(
          chalk.yellow(
            `⚠️ Large content detected (~${Math.round(estimatedTokens)} tokens), using GPT-4o`,
          ),
        )
      }

      const prompt = `You are a professional translator. Translate the following JSON content from Slovenian to ${config.languageNames[targetLanguage]}.

CRITICAL INSTRUCTIONS:
1. Return ONLY valid JSON - no explanations, no markdown, no extra text
2. Translate ALL text values from Slovenian to ${config.languageNames[targetLanguage]}
3. Keep the exact same JSON structure and all key names
4. Do NOT add quotation marks around the entire response
5. Translate: titles, descriptions, button text, badges, etc.
6. Keep technical product names (like "Siemens TIA Portal") unchanged
7. Keep email addresses and phone numbers unchanged

JSON to translate:
${contentStr}`

      const response = await this.openai.chat.completions.create({
        model: model,
        messages: [
          {
            role: 'system',
            content:
              'You are a professional translator specializing in technical and business content. Translate accurately while preserving technical terminology and proper nouns. Always maintain the exact JSON structure.',
          },
          {
            role: 'user',
            content: prompt,
          },
        ],
        temperature: 0.3,
      })

      const translatedText = response.choices[0].message.content

      // Debug: Log what OpenAI returned
      console.log(
        chalk.gray(
          `📥 OpenAI returned (first 500 chars):`,
          translatedText.substring(0, 500) + '...',
        ),
      )

      // Clean and parse the JSON response
      let cleanedText = translatedText.trim()

      // Remove any leading text before the JSON (like "Translated content:" or similar)
      const jsonStart = cleanedText.indexOf('{')
      if (jsonStart > 0) {
        cleanedText = cleanedText.substring(jsonStart)
      }

      // Remove any trailing text after the JSON
      const jsonEnd = cleanedText.lastIndexOf('}')
      if (jsonEnd > 0) {
        cleanedText = cleanedText.substring(0, jsonEnd + 1)
      }

      const translatedContent = JSON.parse(cleanedText)

      return {
        slug: content.slug,
        language: targetLanguage,
        translatable: translatedContent,
      }
    } catch (error) {
      console.error(
        chalk.red(`❌ Translation failed for ${content.slug} -> ${targetLanguage}:`),
        error.message,
      )

      // Debug: show what we actually received
      if (error.message.includes('JSON')) {
        console.error(chalk.red('Raw response from OpenAI:'))
        console.error(chalk.gray(response.choices[0].message.content.substring(0, 500) + '...'))
      }

      throw error
    }
  }

  async updateGlobal(globalSlug, translatedContent, targetLanguage, originalData) {
    try {
      console.log(
        chalk.cyan(`📝 Updating ${globalSlug} for ${config.languageNames[targetLanguage]}...`),
      )

      // Reconstruct the global data with translations
      const updateData = this.reconstructGlobalData(originalData, translatedContent, globalSlug)

      // Debug: Log problematic fields before sending
      if (globalSlug === 'homepage') {
        console.log(chalk.gray('🔍 Checking for media fields in homepage...'))
        if (updateData.layout) {
          updateData.layout.forEach((block, index) => {
            Object.keys(block).forEach((key) => {
              const value = block[key]
              if (value && typeof value === 'object' && value.id) {
                console.log(
                  chalk.red(`⚠️ Block ${index}.${key} still has object with ID:`, value.id),
                )
                console.log(chalk.gray(`   Object keys:`, Object.keys(value)))
              }
            })
          })
        }
      }

      // Use POST method for updating globals (we discovered this works)
      const response = await axios.post(`${this.baseUrl}/api/globals/${globalSlug}`, updateData, {
        headers: this.headers,
        params: { locale: targetLanguage },
      })

      if (response.status === 200) {
        console.log(
          chalk.green(
            `✅ ${globalSlug} updated successfully for ${config.languageNames[targetLanguage]}`,
          ),
        )
        return true
      }
    } catch (error) {
      console.error(
        chalk.red(`❌ Failed to update ${globalSlug} for ${targetLanguage}:`),
        error.message,
      )
      if (error.response?.data) {
        console.error(chalk.red('Error details:'), JSON.stringify(error.response.data, null, 2))
      }
      throw error
    }
  }

  reconstructGlobalData(originalData, translatedContent, globalSlug) {
    const updateData = { ...originalData }

    // Use deep reconstruction for all global types
    const reconstructedData = this.deepReconstruct(updateData, translatedContent.translatable)

    // Clean IDs and convert media objects
    let cleaned = this.cleanIds(reconstructedData)

    // Extra aggressive media cleaning for layout blocks
    if (cleaned.layout && Array.isArray(cleaned.layout)) {
      cleaned.layout = cleaned.layout.map((block) => {
        const cleanedBlock = { ...block }

        // Force convert any media objects to IDs
        Object.keys(cleanedBlock).forEach((key) => {
          const value = cleanedBlock[key]
          if (value && typeof value === 'object' && value.id) {
            // Check if this is likely a media field
            if (
              key.toLowerCase().includes('image') ||
              key.toLowerCase().includes('media') ||
              key.toLowerCase().includes('logo') ||
              key.toLowerCase().includes('background')
            ) {
              console.log(chalk.yellow(`🔧 Converting ${key} from object to ID: ${value.id}`))
              cleanedBlock[key] = value.id
            }
          }
        })

        return cleanedBlock
      })
    }

    return cleaned
  }

  // Deep reconstruction that merges translated content back into original structure
  deepReconstruct(original, translated) {
    if (!original || typeof original !== 'object') {
      return original
    }

    if (Array.isArray(original)) {
      return original.map((item, index) => {
        if (Array.isArray(translated) && translated[index]) {
          return this.deepReconstruct(item, translated[index])
        }
        return this.cleanIds(item)
      })
    }

    const result = { ...original }

    // First, preserve all original fields to avoid missing required fields
    // BUT don't overwrite fields that will be translated
    Object.keys(result).forEach((key) => {
      // Skip fields that have translations available
      if (translated && translated[key] !== undefined) {
        return // Don't process this field here, let the translation section handle it
      }

      if (result[key] && typeof result[key] === 'object') {
        // Check if this is a media object that should be converted to ID
        if (result[key].id && (result[key].url || result[key].filename || result[key].mimeType)) {
          console.log(
            chalk.yellow(
              `🔧 deepReconstruct converting ${key} from object to ID: ${result[key].id}`,
            ),
          )
          result[key] = result[key].id
        } else {
          result[key] = this.cleanIds(result[key])
        }
      }
    })

    // Then apply translations where available
    console.log(
      chalk.gray(`🔍 deepReconstruct - available translation keys:`, Object.keys(translated || {})),
    )
    Object.keys(translated || {}).forEach((key) => {
      const translatedValue = translated[key]
      const originalValue = original[key]
      console.log(
        chalk.gray(
          `🔍 Processing key "${key}": ${typeof translatedValue} vs ${typeof originalValue}`,
        ),
      )

      if (typeof translatedValue === 'string' && translatedValue.trim() !== '') {
        // Direct string replacement
        console.log(
          chalk.green(
            `✏️ Applying translation for ${key}: "${originalValue}" → "${translatedValue}"`,
          ),
        )
        result[key] = translatedValue
      } else if (Array.isArray(translatedValue) && Array.isArray(originalValue)) {
        // Reconstruct array items
        result[key] = originalValue.map((item, index) => {
          if (translatedValue[index]) {
            return this.deepReconstruct(item, translatedValue[index])
          }
          // Check if item is a media object
          if (
            item &&
            typeof item === 'object' &&
            item.id &&
            (item.url || item.filename || item.mimeType)
          ) {
            console.log(chalk.yellow(`🔧 deepReconstruct array converting item to ID: ${item.id}`))
            return item.id
          }
          return this.cleanIds(item)
        })
      } else if (
        typeof translatedValue === 'object' &&
        translatedValue !== null &&
        typeof originalValue === 'object' &&
        originalValue !== null
      ) {
        // Special handling for 'translatable' objects - apply translations directly to original
        if (key === 'translatable') {
          console.log(
            chalk.blue(
              `🔄 Processing translatable object with keys: ${Object.keys(translatedValue)}`,
            ),
          )
          // Apply each translated field directly to the parent object
          Object.keys(translatedValue).forEach((transKey) => {
            const transValue = translatedValue[transKey]
            if (typeof transValue === 'string' && transValue.trim() !== '') {
              console.log(
                chalk.green(
                  `✏️ Applying translatable field ${transKey}: "${originalValue[transKey]}" → "${transValue}"`,
                ),
              )
              result[transKey] = transValue
            } else if (
              Array.isArray(transValue) ||
              (typeof transValue === 'object' && transValue !== null)
            ) {
              // Recursively handle nested translatable content
              result[transKey] = this.deepReconstruct(originalValue[transKey], transValue)
            }
          })
        } else {
          // Recursively reconstruct other nested objects
          result[key] = this.deepReconstruct(originalValue, translatedValue)
        }
      }
    })

    return result
  }

  reconstructBlock(originalBlock, translatedBlock) {
    const updatedBlock = { ...originalBlock }

    switch (translatedBlock.blockType) {
      case 'hero':
        if (translatedBlock.translatable.title) {
          updatedBlock.title = translatedBlock.translatable.title
        }
        if (translatedBlock.translatable.subtitle) {
          updatedBlock.subtitle = translatedBlock.translatable.subtitle
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
                author: translatedTestimonial.author || testimonial.author,
                position: translatedTestimonial.position || testimonial.position,
                company: translatedTestimonial.company || testimonial.company,
              }
            }
            return testimonial
          })
        }
        break

      case 'cta':
        if (translatedBlock.translatable.title) {
          updatedBlock.title = translatedBlock.translatable.title
        }
        if (translatedBlock.translatable.description) {
          updatedBlock.description = translatedBlock.translatable.description
        }
        if (translatedBlock.translatable.buttonText) {
          updatedBlock.buttonText = translatedBlock.translatable.buttonText
        }
        break

      default:
        // Generic update
        Object.keys(translatedBlock.translatable).forEach((key) => {
          if (translatedBlock.translatable[key]) {
            updatedBlock[key] = translatedBlock.translatable[key]
          }
        })
    }

    return this.cleanIds(updatedBlock)
  }

  cleanIds(obj) {
    if (Array.isArray(obj)) {
      return obj.map((item) => this.cleanIds(item))
    } else if (obj && typeof obj === 'object') {
      const cleaned = { ...obj }
      delete cleaned.id // Remove all id fields

      // Handle media relationships - convert media objects to just their IDs
      Object.keys(cleaned).forEach((key) => {
        const value = cleaned[key]

        // Check if this looks like a media relationship field OR any object with an ID
        if (
          this.isMediaField(key, value) ||
          (value &&
            typeof value === 'object' &&
            value.id &&
            (value.url || value.filename || value.mimeType))
        ) {
          if (value && typeof value === 'object' && value.id) {
            // Convert media object to just its ID
            console.log(
              chalk.yellow(`🔧 cleanIds converting ${key} from object to ID: ${value.id}`),
            )
            cleaned[key] = value.id
          }
        } else if (Array.isArray(value)) {
          // Handle arrays that might contain media objects
          cleaned[key] = value.map((item) => {
            if (this.isMediaField(key, item)) {
              return item && typeof item === 'object' && item.id ? item.id : item
            }
            return this.cleanIds(item)
          })
        } else {
          // Recursively clean other fields
          cleaned[key] = this.cleanIds(cleaned[key])
        }
      })

      return cleaned
    }
    return obj
  }

  isMediaField(fieldName, value) {
    // Common media field names
    const mediaFieldNames = [
      'image',
      'logo',
      'backgroundImage',
      'heroImage',
      'thumbnail',
      'avatar',
      'photo',
      'picture',
      'media',
      'file',
      'attachment',
    ]

    // Check if field name suggests it's a media field
    const isMediaFieldName = mediaFieldNames.some((name) =>
      fieldName.toLowerCase().includes(name.toLowerCase()),
    )

    // Check if value looks like a media object (has id and media-related fields)
    const looksLikeMedia =
      value &&
      typeof value === 'object' &&
      value.id &&
      (value.url || value.filename || value.mimeType || value.alt || value.width || value.height)

    return isMediaFieldName || looksLikeMedia
  }

  async run() {
    try {
      console.log(chalk.blue('🚀 Starting global content translation...'))

      // Authenticate
      await this.authenticate()

      // Define which globals to translate (excluding email-admin as it contains technical settings)
      const globalsToTranslate = ['homepage', 'header', 'footer', 'seo']

      for (const globalSlug of globalsToTranslate) {
        console.log(chalk.cyan(`\n📄 Processing ${globalSlug} global...`))

        try {
          // Fetch the global data
          const globalData = await this.fetchGlobal(globalSlug)

          // Extract translatable content
          const translatableContent = this.extractTranslatableContent(globalData, globalSlug)

          // Skip if no translatable content
          if (
            !translatableContent.translatable ||
            Object.keys(translatableContent.translatable).length === 0
          ) {
            console.log(chalk.yellow(`⚠️ No translatable content found in ${globalSlug}`))
            continue
          }

          // Translate to each target language
          for (const targetLanguage of config.targetLocales) {
            try {
              console.log(
                chalk.blue(`  🔄 Translating to ${config.languageNames[targetLanguage]}...`),
              )

              const translatedContent = await this.translateContent(
                translatableContent,
                targetLanguage,
              )

              await this.updateGlobal(globalSlug, translatedContent, targetLanguage, globalData)

              // Small delay between requests
              await new Promise((resolve) => setTimeout(resolve, config.delayBetweenRequests))
            } catch (error) {
              console.error(
                chalk.red(`❌ Failed to process ${globalSlug} -> ${targetLanguage}:`),
                error.message,
              )
              this.errors.push({
                global: globalSlug,
                language: targetLanguage,
                error: error.message,
              })
            }
          }

          this.translatedGlobals.push(globalSlug)
        } catch (error) {
          console.error(chalk.red(`❌ Failed to process ${globalSlug}:`), error.message)
          this.errors.push({
            global: globalSlug,
            error: error.message,
          })
        }
      }

      // Save results
      const results = {
        timestamp: new Date().toISOString(),
        summary: {
          totalGlobals: globalsToTranslate.length,
          successfulGlobals: this.translatedGlobals.length,
          failedGlobals: globalsToTranslate.length - this.translatedGlobals.length,
          totalErrors: this.errors.length,
        },
        translatedGlobals: this.translatedGlobals,
        errors: this.errors,
      }

      await fs.writeJson('./data/globals-translation-results.json', results, { spaces: 2 })

      console.log(chalk.green('\n🎉 Global translation completed!'))
      console.log(chalk.blue('📁 Results saved to: ./data/globals-translation-results.json'))

      console.log(chalk.yellow('\n📊 Translation Summary:'))
      console.log(chalk.yellow(`   - Total globals processed: ${results.summary.totalGlobals}`))
      console.log(
        chalk.yellow(`   - Successfully translated: ${results.summary.successfulGlobals}`),
      )
      console.log(chalk.yellow(`   - Failed: ${results.summary.failedGlobals}`))
      console.log(chalk.yellow(`   - Total errors: ${results.summary.totalErrors}`))

      if (this.errors.length > 0) {
        console.log(chalk.red(`\n⚠️ There were ${this.errors.length} errors during translation.`))
        console.log(chalk.red('Check ./data/globals-translation-results.json for details.'))
      }
    } catch (error) {
      console.error(chalk.red('\n❌ Fatal error during global translation:'), error.message)
      process.exit(1)
    }
  }
}

// Run the translator
const translator = new GlobalTranslator()
translator.run()
