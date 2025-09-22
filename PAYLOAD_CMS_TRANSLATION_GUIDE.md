# Payload CMS 3 Translation Guide with OpenAI

A comprehensive guide for implementing automated translations in Payload CMS 3 using OpenAI's API.

## 🎯 Overview

This guide covers the correct approach to implement automated translations in Payload CMS 3, addressing common pitfalls and providing working solutions for both development and production environments.

## 📋 Table of Contents

- [Prerequisites](#prerequisites)
- [Configuration Setup](#configuration-setup)
- [Database Considerations](#database-considerations)
- [Translation Script Architecture](#translation-script-architecture)
- [Implementation Examples](#implementation-examples)
- [Common Issues & Solutions](#common-issues--solutions)
- [Best Practices](#best-practices)

## Prerequisites

### Required Dependencies

```bash
npm install axios openai chalk dotenv
```

### Environment Variables

Create a `.env.local` file in your translation workspace:

```env
# Database Configuration
POSTGRES_URL="your-neon-database-url"
PAYLOAD_SECRET="your-payload-secret"

# OpenAI Configuration
OPENAI_API_KEY="your-openai-api-key"

# Optional: Server Configuration
NEXT_PUBLIC_SITE_URL="http://localhost:3000"
```

## Configuration Setup

### 1. Payload CMS Configuration

**Critical Configuration for Both Dev and Production:**

```typescript
// src/payload.config.ts
export default buildConfig({
  // ... other config
  
  // Content localization for frontend
  localization: {
    locales: [
      { label: 'Slovenščina', code: 'sl' },
      { label: 'English', code: 'en' },
      { label: 'Deutsch', code: 'de' },
      { label: 'Hrvatski', code: 'hr' },
    ],
    defaultLocale: 'sl',
    fallback: true,
  },
  
  // Database adapter configuration
  db: vercelPostgresAdapter({
    pool: {
      connectionString: process.env.POSTGRES_URL || '',
    },
    // CRITICAL: Enable push mode for both dev and production
    // This allows automatic schema synchronization
    push: true,
  }),
})
```

### 2. Collection/Global Schema Configuration

**Essential Field Configuration:**

```typescript
// Collections (e.g., Pages.ts)
export const Pages: CollectionConfig = {
  slug: 'pages',
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      localized: true, // ← REQUIRED for translations
    },
    {
      name: 'layout',
      type: 'blocks',
      localized: true, // ← REQUIRED for block translations
      blocks: [
        // ... your blocks
      ],
    },
    {
      name: 'meta',
      type: 'group',
      localized: true, // ← REQUIRED for SEO translations
      fields: [
        {
          name: 'title',
          type: 'text',
        },
        {
          name: 'description',
          type: 'textarea',
        },
      ],
    },
  ],
}

// Globals (e.g., Homepage.ts)
export const Homepage: GlobalConfig = {
  slug: 'homepage',
  fields: [
    {
      name: 'layout',
      type: 'blocks',
      localized: true, // ← REQUIRED for homepage translations
      blocks: [
        // ... your blocks
      ],
    },
  ],
}
```

## Database Considerations

### Localization Table Structure

Payload CMS 3 automatically creates localization tables:

```sql
-- Main table
pages (id, slug, status, created_at, updated_at)

-- Localization table (auto-generated)
pages_locales (id, title, meta_title, meta_description, _locale, _parent_id)
```

### Key Points:

- **`_locale`**: Stores the language code (`sl`, `en`, `de`, `hr`)
- **`_parent_id`**: References the main record
- **Localized fields**: Only fields marked as `localized: true` appear here

## Translation Script Architecture

### Core Components

1. **Authentication**: JWT token-based API access
2. **Content Extraction**: Recursive text extraction from complex objects
3. **OpenAI Translation**: Batch translation with proper formatting
4. **Localized Updates**: Payload-specific data structure for updates

### Base Class Structure

```javascript
class BaseTranslator {
  constructor() {
    this.baseUrl = 'http://localhost:3000'
    this.openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    })
    this.headers = {}
  }

  async authenticate() {
    const response = await axios.post(`${this.baseUrl}/api/users/login`, {
      email: 'your-admin-email',
      password: 'your-admin-password',
    })
    
    this.headers = {
      Authorization: `JWT ${response.data.token}`,
      'Content-Type': 'application/json',
    }
  }
}
```

## Implementation Examples

### 1. Text Extraction Function

```javascript
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

      // Skip enum/select fields
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
```

### 2. OpenAI Translation Function

```javascript
async translateTexts(texts, targetLanguage) {
  // Create simplified object for translation
  const textsToTranslate = {}
  Object.keys(texts).forEach((path) => {
    const simpleKey = `text_${Object.keys(textsToTranslate).length}`
    textsToTranslate[simpleKey] = texts[path]
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
  
  // Parse and map back to original paths
  let translatedTexts
  try {
    translatedTexts = JSON.parse(translatedText)
  } catch (error) {
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
    }
  })

  return result
}
```

### 3. Critical: Localized Update Builder

**This is the key function that makes translations work:**

```javascript
buildLocalizedUpdate(originalData, translations) {
  console.log(chalk.blue('🔧 Building localized update object...'))
  
  const localizedUpdate = {}

  // Handle title field (localized)
  if (translations['title']) {
    localizedUpdate.title = translations['title']
  }

  // Handle layout blocks (localized)
  if (originalData.layout && Array.isArray(originalData.layout)) {
    localizedUpdate.layout = this.applyTranslations(originalData.layout, translations, 'layout')
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
  }

  return localizedUpdate
}
```

### 4. API Update Functions

**For Collections (Pages):**

```javascript
async updatePage(originalPageData, localizedUpdate, targetLanguage) {
  const response = await axios.patch(
    `${this.baseUrl}/api/pages/${originalPageData.id}`,
    localizedUpdate,
    {
      headers: this.headers,
      params: { locale: targetLanguage },
    },
  )

  if (response.status === 200) {
    console.log(`✅ Page updated for ${targetLanguage}`)
    return true
  }

  throw new Error(`Update failed: ${response.status}`)
}
```

**For Globals (Homepage):**

```javascript
async updateHomepage(originalData, localizedUpdate, targetLanguage) {
  const response = await axios.post(
    `${this.baseUrl}/api/globals/homepage`,
    localizedUpdate,
    {
      headers: this.headers,
      params: { locale: targetLanguage },
    },
  )

  if (response.status === 200) {
    console.log(`✅ Homepage updated for ${targetLanguage}`)
    return true
  }

  throw new Error(`Update failed: ${response.status}`)
}
```

## Common Issues & Solutions

### Issue 1: "API Returns 200 but No Database Changes"

**Cause**: Sending entire object instead of localized fields only.

**Solution**: Use `buildLocalizedUpdate()` function to send only localized fields.

```javascript
// ❌ WRONG
await axios.patch(`/api/pages/${id}`, entirePageObject, { params: { locale: 'en' } })

// ✅ CORRECT
const localizedUpdate = this.buildLocalizedUpdate(originalData, translations)
await axios.patch(`/api/pages/${id}`, localizedUpdate, { params: { locale: 'en' } })
```

### Issue 2: "Fields Not Marked as Localized"

**Cause**: Missing `localized: true` in field configuration.

**Solution**: Add `localized: true` to all translatable fields:

```typescript
// ❌ WRONG
{
  name: 'title',
  type: 'text',
}

// ✅ CORRECT
{
  name: 'title',
  type: 'text',
  localized: true,
}
```

### Issue 3: "Production vs Development Database Issues"

**Cause**: Different `push` settings between environments.

**Solution**: Use `push: true` for both environments:

```typescript
// ✅ CORRECT
db: vercelPostgresAdapter({
  pool: { connectionString: process.env.POSTGRES_URL },
  push: true, // Enable for both dev and production
})
```

### Issue 4: "Media Objects Causing API Errors"

**Cause**: Sending full media objects instead of IDs.

**Solution**: Clean media objects before translation:

```javascript
deepCleanMediaObjects(obj) {
  if (Array.isArray(obj)) {
    return obj.map((item) => this.deepCleanMediaObjects(item))
  } else if (obj && typeof obj === 'object') {
    const result = { ...obj }

    Object.keys(result).forEach((key) => {
      const value = result[key]

      if (value && typeof value === 'object' && value.id) {
        const hasMediaProps = value.url || value.filename || value.mimeType
        const isMediaField = key.toLowerCase().includes('image') || 
                           key.toLowerCase().includes('media')

        if (hasMediaProps || isMediaField) {
          result[key] = value.id // Convert to ID only
        } else {
          result[key] = this.deepCleanMediaObjects(value)
        }
      }
    })

    delete result.id // Remove document IDs
    return result
  }

  return obj
}
```

## Best Practices

### 1. Environment Configuration

```javascript
// Always use proper environment loading
require('dotenv').config({ path: '.env.local' })
```

### 2. Error Handling

```javascript
try {
  const translations = await this.translateTexts(allTexts, languageNames[lang])
  const localizedUpdate = this.buildLocalizedUpdate(cleanedData, translations)
  await this.updatePage(originalData, localizedUpdate, lang)
} catch (error) {
  console.error(`❌ Failed to translate to ${lang}:`, error.message)
  if (error.response?.data) {
    console.error('API Response:', JSON.stringify(error.response.data, null, 2))
  }
}
```

### 3. Rate Limiting

```javascript
// Add delays between API calls
for (const lang of languages) {
  await this.translateToLanguage(lang)
  
  // Small delay to avoid overwhelming the API
  if (i < languages.length - 1) {
    await new Promise((resolve) => setTimeout(resolve, 1000))
  }
}
```

### 4. Batch Processing

```javascript
// Process pages in batches
const batchSize = 5
for (let i = 0; i < pages.length; i += batchSize) {
  const batch = pages.slice(i, i + batchSize)
  await Promise.all(batch.map(page => this.translatePage(page)))
}
```

### 5. Validation

```javascript
// Validate translations before updating
if (Object.keys(localizedUpdate).length === 0) {
  console.log('⏭️ No translatable content found, skipping')
  return
}
```

## Complete Working Example

See the `simple-pages-translator.js` and `simple-homepage-translator.js` files in the `translation-workspace` directory for complete, working implementations.

### Usage:

```bash
cd translation-workspace
node simple-homepage-translator.js
node simple-pages-translator.js
```

## Verification

After running translations, verify success by:

1. **Admin Panel**: Check Payload CMS admin for translated content
2. **Database**: Query `*_locales` tables for translated data
3. **Frontend**: Visit `/en`, `/de`, `/hr` URLs to see translations
4. **API**: Test `GET /api/pages?locale=en` endpoints

## Conclusion

This approach ensures reliable, production-ready translations in Payload CMS 3 by:

- Properly configuring localization at the field level
- Using correct API endpoints and data structures
- Handling complex nested content (blocks, arrays, groups)
- Maintaining data integrity with proper media object handling
- Providing comprehensive error handling and logging

The key insight is that Payload CMS 3 requires **field-specific localized updates** rather than full document replacements, and all translatable fields must be explicitly marked as `localized: true` in the schema configuration.
