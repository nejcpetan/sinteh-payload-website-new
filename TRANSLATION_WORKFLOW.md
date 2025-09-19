# Translation Workflow Guide

This guide explains how to translate content using Payload CMS API and OpenAI for the multilingual website.

## Overview

The website supports 4 languages:
- **Slovenian (sl)** - Default/primary language
- **English (en)** - Fallback language  
- **German (de)**
- **Croatian (hr)**

Content is created in Slovenian and then translated to other languages using the Payload API + OpenAI workflow.

## Content Localization Structure

### Collections with Localized Fields

#### Pages Collection
- `title` - Localized ✅
- `slug` - NOT localized (canonical across languages)
- `layout` (content blocks) - Localized ✅
- `meta` (SEO fields) - Localized ✅

#### Posts Collection  
- `title` - Localized ✅
- `slug` - NOT localized (canonical across languages)
- `excerpt` - Localized ✅
- `content` - Localized ✅
- `published` - Localized ✅ (per-locale visibility control)
- `meta` (SEO fields) - Localized ✅

#### Categories Collection
- `name` - Localized ✅
- `slug` - NOT localized (canonical across languages)
- `description` - Localized ✅

### Globals with Localized Fields

- **Header**: `siteName`, navigation `labels`
- **Footer**: `copyright`, footer link `titles` and `labels`
- **Homepage**: All content `blocks`

## Translation Workflow

### Step 1: Pull Source Content (Slovenian)

```bash
# Get a specific page in Slovenian
curl -X GET "https://your-payload-url/api/pages/PAGE_ID?locale=sl&depth=0" \
  -H "Authorization: Bearer YOUR_API_KEY"

# Get a specific blog post in Slovenian  
curl -X GET "https://your-payload-url/api/posts/POST_ID?locale=sl&depth=0" \
  -H "Authorization: Bearer YOUR_API_KEY"

# Get all pages to see what needs translation
curl -X GET "https://your-payload-url/api/pages?locale=sl&limit=100" \
  -H "Authorization: Bearer YOUR_API_KEY"

# Get all posts to see what needs translation
curl -X GET "https://your-payload-url/api/posts?locale=sl&limit=100" \
  -H "Authorization: Bearer YOUR_API_KEY"
```

### Step 2: Extract Translatable Content

From the API response, extract only the fields that need translation:

**For Pages:**
```json
{
  "title": "Slovenian page title",
  "layout": [
    {
      "blockType": "hero",
      "title": "Hero title in Slovenian",
      "subtitle": "Hero subtitle in Slovenian"
    }
  ],
  "meta": {
    "title": "SEO title in Slovenian",
    "description": "SEO description in Slovenian"
  }
}
```

**For Posts:**
```json
{
  "title": "Slovenian post title",
  "excerpt": "Post excerpt in Slovenian",
  "content": {
    "root": {
      "children": [
        {
          "children": [
            {
              "detail": 0,
              "format": 0,
              "mode": "normal",
              "style": "",
              "text": "Content in Slovenian",
              "type": "text",
              "version": 1
            }
          ]
        }
      ]
    }
  },
  "meta": {
    "title": "SEO title in Slovenian", 
    "description": "SEO description in Slovenian"
  }
}
```

### Step 3: Translate with OpenAI

#### Basic Translation Function

```javascript
async function translateContent(content, fromLocale, toLocale) {
  const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  })

  const response = await openai.chat.completions.create({
    model: "gpt-4-turbo",
    messages: [
      {
        role: "system",
        content: `You are a professional translator specializing in technical and business content. 
                 Translate the following content from ${fromLocale} to ${toLocale}.
                 
                 IMPORTANT RULES:
                 - Return ONLY valid JSON matching the exact input structure
                 - Preserve all HTML tags, field names, and data types
                 - Translate only text content, not field names or technical values
                 - Maintain the same JSON structure and nesting
                 - For rich text content, preserve the Lexical editor structure
                 - Keep professional, technical tone appropriate for industrial automation industry`
      },
      {
        role: "user",
        content: JSON.stringify(content)
      }
    ],
    temperature: 0.3,
    response_format: { type: "json_object" }
  })

  return JSON.parse(response.choices[0].message.content)
}
```

#### Example Translation Call

```javascript
// Source content in Slovenian
const slovenianContent = {
  title: "Industrijska avtomatizacija",
  excerpt: "Napredne rešitve za industrijsko avtomatizacijo",
  meta: {
    title: "Avtomatizacija | SINTEH PRO",
    description: "Profesionalne storitve industrijske avtomatizacije"
  }
}

// Translate to English
const englishContent = await translateContent(slovenianContent, 'sl', 'en')

// Result:
{
  title: "Industrial Automation",
  excerpt: "Advanced solutions for industrial automation", 
  meta: {
    title: "Automation | SINTEH PRO",
    description: "Professional industrial automation services"
  }
}
```

### Step 4: Push Translated Content

```bash
# Update page with English translation
curl -X PATCH "https://your-payload-url/api/pages/PAGE_ID?locale=en" \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Industrial Automation",
    "layout": [
      {
        "blockType": "hero", 
        "title": "Advanced Industrial Solutions",
        "subtitle": "From design to commissioning and service"
      }
    ],
    "meta": {
      "title": "Industrial Automation | SINTEH PRO",
      "description": "Professional automation services and solutions"
    }
  }'

# Update blog post with English translation and publish
curl -X PATCH "https://your-payload-url/api/posts/POST_ID?locale=en" \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Our New Service",
    "excerpt": "Brief introduction to our latest offering",
    "content": {
      "root": {
        "children": [
          {
            "children": [
              {
                "detail": 0,
                "format": 0, 
                "mode": "normal",
                "style": "",
                "text": "Content in English",
                "type": "text",
                "version": 1
              }
            ]
          }
        ]
      }
    },
    "published": true,
    "meta": {
      "title": "Our New Service | SINTEH PRO",
      "description": "Learn about our latest service offering"
    }
  }'
```

## Batch Translation Script

Here's a complete Node.js script for batch translation:

```javascript
import OpenAI from 'openai'
import fetch from 'node-fetch'

const PAYLOAD_URL = process.env.PAYLOAD_URL
const PAYLOAD_API_KEY = process.env.PAYLOAD_API_KEY
const OPENAI_API_KEY = process.env.OPENAI_API_KEY

const openai = new OpenAI({ apiKey: OPENAI_API_KEY })

async function translateContent(content, fromLocale, toLocale) {
  const response = await openai.chat.completions.create({
    model: "gpt-4-turbo",
    messages: [
      {
        role: "system",
        content: `Translate from ${fromLocale} to ${toLocale}. Return only valid JSON with exact same structure.`
      },
      {
        role: "user",
        content: JSON.stringify(content)
      }
    ],
    temperature: 0.3,
    response_format: { type: "json_object" }
  })

  return JSON.parse(response.choices[0].message.content)
}

async function getContent(collection, id, locale) {
  const response = await fetch(`${PAYLOAD_URL}/api/${collection}/${id}?locale=${locale}&depth=0`, {
    headers: {
      'Authorization': `Bearer ${PAYLOAD_API_KEY}`
    }
  })
  return response.json()
}

async function updateContent(collection, id, locale, data) {
  const response = await fetch(`${PAYLOAD_URL}/api/${collection}/${id}?locale=${locale}`, {
    method: 'PATCH',
    headers: {
      'Authorization': `Bearer ${PAYLOAD_API_KEY}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
  return response.json()
}

async function translatePost(postId, targetLocale) {
  try {
    // 1. Get Slovenian content
    const slovenianPost = await getContent('posts', postId, 'sl')
    
    // 2. Extract translatable fields
    const translatableContent = {
      title: slovenianPost.title,
      excerpt: slovenianPost.excerpt,
      content: slovenianPost.content,
      meta: slovenianPost.meta
    }
    
    // 3. Translate
    const translatedContent = await translateContent(translatableContent, 'sl', targetLocale)
    
    // 4. Update with translation (published: false for review)
    const result = await updateContent('posts', postId, targetLocale, {
      ...translatedContent,
      published: false // Require manual review before publishing
    })
    
    console.log(`✅ Translated post ${postId} to ${targetLocale}`)
    return result
    
  } catch (error) {
    console.error(`❌ Error translating post ${postId} to ${targetLocale}:`, error)
    throw error
  }
}

// Usage example
async function main() {
  const postId = 'your-post-id'
  const targetLocales = ['en', 'de', 'hr']
  
  for (const locale of targetLocales) {
    await translatePost(postId, locale)
    // Add delay to respect rate limits
    await new Promise(resolve => setTimeout(resolve, 1000))
  }
}

main().catch(console.error)
```

## Content Publishing Workflow

### 1. Translation Review Process

After translation, content is saved with `published: false`. Editors should:

1. Review translated content in Payload admin
2. Edit/refine translations as needed
3. Set `published: true` when satisfied
4. Content becomes visible on frontend

### 2. Per-Locale Publishing

Each locale has independent publishing control:

- Slovenian post published ✅ → Visible at `/sl/blog/post-slug`
- English translation not published ❌ → Not visible at `/en/blog/post-slug` 
- German translation published ✅ → Visible at `/de/blog/post-slug`

### 3. Blog Visibility Rules

- **Blog lists**: Only show posts with `published: true` for current locale
- **Blog detail**: Return 404 if post not published in current locale
- **No cross-locale fallback**: Strict separation between languages

## API Endpoints for Translation Management

### Check Translation Status

```bash
# Get all posts and their translation status
curl -X GET "https://your-payload-url/api/posts?limit=100" \
  -H "Authorization: Bearer YOUR_API_KEY"

# Check specific post in all locales
for locale in sl en de hr; do
  echo "=== $locale ==="
  curl -X GET "https://your-payload-url/api/posts/POST_ID?locale=$locale" \
    -H "Authorization: Bearer YOUR_API_KEY"
done
```

### Bulk Operations

```bash
# Get all untranslated posts (published in sl but not in en)
curl -X GET "https://your-payload-url/api/posts?where[published][equals]=true&locale=sl" \
  -H "Authorization: Bearer YOUR_API_KEY" | \
  jq '.docs[].id' | \
  while read id; do
    # Check if English translation exists and is published
    curl -X GET "https://your-payload-url/api/posts/$id?locale=en" \
      -H "Authorization: Bearer YOUR_API_KEY"
  done
```

## Best Practices

### 1. Content Strategy
- Always create content in Slovenian first
- Translate in batches to maintain consistency
- Review all translations before publishing
- Keep canonical slugs in English for SEO

### 2. Translation Quality
- Use specific prompts for technical content
- Maintain consistent terminology across translations
- Review and edit AI translations for accuracy
- Test translations with native speakers

### 3. SEO Considerations
- Translate meta titles and descriptions
- Maintain keyword relevance per locale
- Use hreflang tags (automatically generated)
- Monitor search performance per locale

### 4. Performance
- Respect OpenAI rate limits (add delays between requests)
- Process translations in small batches
- Use caching for repeated translations
- Monitor API usage and costs

## Troubleshooting

### Common Issues

1. **Rich Text Structure**: Ensure Lexical editor structure is preserved
2. **API Rate Limits**: Add delays between translation requests
3. **Content Validation**: Check required fields per collection
4. **Publishing Status**: Remember to set `published: true` after review

### Error Handling

```javascript
async function safeTranslate(content, fromLocale, toLocale, retries = 3) {
  for (let i = 0; i < retries; i++) {
    try {
      return await translateContent(content, fromLocale, toLocale)
    } catch (error) {
      console.error(`Translation attempt ${i + 1} failed:`, error)
      if (i === retries - 1) throw error
      await new Promise(resolve => setTimeout(resolve, 2000 * (i + 1)))
    }
  }
}
```

This workflow ensures high-quality translations while maintaining content structure and providing editorial control over the publishing process.
