# AI Translation Feature Plan

## Overview
A dedicated translation management system accessible via the Payload CMS admin sidebar that allows batch translation of pages and posts using OpenAI API.

## Feature Location
- **Admin Sidebar**: "Translations" menu item
- **Standalone Interface**: Separate from individual page/post editing
- **Centralized Management**: All translation operations in one place

## User Interface Flow

### 1. Translation Dashboard
```
Admin Sidebar → Translations → Translation Dashboard

Dashboard Components:
├── Content Selection Panel
├── Translation Settings Panel  
├── Progress Tracking Panel
└── Translation History Panel
```

### 2. Content Selection Panel
```
┌─ Content Selection ─────────────────────────┐
│ Content Type: [Pages ▼] [Posts ▼]          │
│                                             │
│ ☐ Select All                               │
│ ☐ Home Page                                │
│ ☐ About Us                                 │
│ ☐ Services                                 │
│ ☐ Contact                                  │
│                                             │
│ Blog Posts:                                │
│ ☐ Select All Posts                         │
│ ☐ "Our New Service" (2024-01-15)          │
│ ☐ "Industry Automation" (2024-01-10)      │
│ ☐ "Safety Standards" (2024-01-05)         │
│                                             │
│ Selected: 5 items                          │
└─────────────────────────────────────────────┘
```

### 3. Translation Settings Panel
```
┌─ Translation Settings ──────────────────────┐
│ Source Language: [Slovenian ▼]             │
│                                             │
│ Target Languages:                           │
│ ☐ English                                  │
│ ☐ German                                   │
│ ☐ Croatian                                 │
│                                             │
│ Translation Options:                        │
│ ☐ Overwrite existing translations          │
│ ☐ Skip already translated content          │
│ ☐ Auto-publish after translation           │
│                                             │
│ [Start Translation] [Preview Settings]      │
└─────────────────────────────────────────────┘
```

### 4. Progress Tracking Panel
```
┌─ Translation Progress ──────────────────────┐
│ Current Batch: 2/5 pages                   │
│ Overall Progress: ████████░░ 80%           │
│                                             │
│ Currently Processing:                       │
│ → "Services" page → English                │
│   ├── Hero Block ✓                        │
│   ├── Features Block (in progress...)      │
│   ├── CTA Block (pending)                 │
│   └── Contact Block (pending)             │
│                                             │
│ Completed:                                 │
│ ✓ "Home Page" → English, German           │
│ ✓ "About Us" → English                    │
│                                             │
│ Queue:                                     │
│ • "Contact" → English, German, Croatian    │
│ • "Blog Post 1" → English, German         │
│                                             │
│ [Pause] [Cancel] [View Logs]              │
└─────────────────────────────────────────────┘
```

## Technical Architecture

### 1. Database Schema Additions
```typescript
// New collection: TranslationJobs
interface TranslationJob {
  id: string
  status: 'pending' | 'processing' | 'completed' | 'failed' | 'cancelled'
  sourceLocale: string
  targetLocales: string[]
  contentItems: {
    collection: 'pages' | 'posts'
    id: string
    title: string
  }[]
  progress: {
    total: number
    completed: number
    failed: number
  }
  createdBy: string
  createdAt: Date
  completedAt?: Date
  errorLog?: string[]
}

// New collection: TranslationBatches  
interface TranslationBatch {
  id: string
  jobId: string
  contentId: string
  collection: 'pages' | 'posts'
  sourceLocale: string
  targetLocale: string
  blocks: {
    blockId: string
    blockType: string
    status: 'pending' | 'processing' | 'completed' | 'failed'
    originalContent: any
    translatedContent?: any
    error?: string
  }[]
  status: 'pending' | 'processing' | 'completed' | 'failed'
}
```

### 2. API Endpoints

#### Translation Management API
```typescript
// Start translation job
POST /api/admin/translations/start
{
  contentItems: [
    { collection: 'pages', id: 'page-1' },
    { collection: 'posts', id: 'post-1' }
  ],
  sourceLocale: 'sl',
  targetLocales: ['en', 'de', 'hr'],
  options: {
    overwriteExisting: false,
    skipTranslated: true,
    autoPublish: false
  }
}

// Get job status
GET /api/admin/translations/job/{jobId}

// Cancel job
POST /api/admin/translations/job/{jobId}/cancel

// Get translation history
GET /api/admin/translations/history
```

#### Translation Processing API
```typescript
// Process single batch
POST /api/admin/translations/process-batch
{
  batchId: 'batch-123',
  block: {
    id: 'hero-block',
    type: 'hero',
    content: { title: 'Naša storitev', description: '...' }
  },
  sourceLocale: 'sl',
  targetLocale: 'en'
}
```

### 3. Translation Processing Flow

#### Batch Processing Strategy
```typescript
class TranslationProcessor {
  async processJob(jobId: string) {
    const job = await getTranslationJob(jobId)
    
    // Process each content item sequentially
    for (const contentItem of job.contentItems) {
      await this.processContentItem(contentItem, job)
    }
  }
  
  async processContentItem(contentItem, job) {
    // Get content with all blocks
    const content = await payload.findByID({
      collection: contentItem.collection,
      id: contentItem.id,
      locale: job.sourceLocale,
      depth: 0
    })
    
    // Process each target locale
    for (const targetLocale of job.targetLocales) {
      await this.processLocale(content, job.sourceLocale, targetLocale)
    }
  }
  
  async processLocale(content, sourceLocale, targetLocale) {
    // Extract all translatable blocks
    const blocks = this.extractTranslatableBlocks(content)
    
    // Process blocks in small batches (to respect OpenAI limits)
    const batchSize = 3 // Process 3 blocks at a time
    
    for (let i = 0; i < blocks.length; i += batchSize) {
      const blockBatch = blocks.slice(i, i + batchSize)
      await this.translateBlockBatch(blockBatch, sourceLocale, targetLocale)
      
      // Small delay between batches to respect rate limits
      await this.delay(1000)
    }
  }
}
```

#### OpenAI Integration Strategy
```typescript
class OpenAITranslator {
  async translateBlocks(blocks: Block[], sourceLocale: string, targetLocale: string) {
    const prompt = this.buildTranslationPrompt(blocks, sourceLocale, targetLocale)
    
    const response = await openai.chat.completions.create({
      model: "gpt-4-turbo",
      messages: [
        {
          role: "system",
          content: `You are a professional translator. Translate content from ${sourceLocale} to ${targetLocale}. 
                   Return ONLY valid JSON matching the exact input structure. 
                   Preserve all HTML tags, field names, and data types.
                   Translate only text content, not field names or technical values.`
        },
        {
          role: "user", 
          content: prompt
        }
      ],
      temperature: 0.3,
      response_format: { type: "json_object" }
    })
    
    return JSON.parse(response.choices[0].message.content)
  }
  
  buildTranslationPrompt(blocks: Block[], sourceLocale: string, targetLocale: string) {
    return JSON.stringify({
      instruction: `Translate the following content blocks from ${sourceLocale} to ${targetLocale}`,
      blocks: blocks.map(block => ({
        id: block.id,
        type: block.blockType,
        content: this.extractTranslatableContent(block)
      }))
    })
  }
}
```

### 4. Admin UI Components

#### Main Translation Component
```typescript
// src/components/admin/TranslationCenter.tsx
export function TranslationCenter() {
  return (
    <div className="translation-center">
      <ContentSelector onSelectionChange={handleContentSelection} />
      <TranslationSettings onSettingsChange={handleSettingsChange} />
      <ProgressTracker jobId={currentJobId} />
      <TranslationHistory />
    </div>
  )
}
```

#### Content Selector Component
```typescript
// src/components/admin/ContentSelector.tsx
export function ContentSelector({ onSelectionChange }) {
  const [selectedPages, setSelectedPages] = useState([])
  const [selectedPosts, setSelectedPosts] = useState([])
  
  // Fetch available content
  // Render selection checkboxes
  // Handle bulk selection
}
```

#### Progress Tracker Component
```typescript
// src/components/admin/ProgressTracker.tsx
export function ProgressTracker({ jobId }) {
  const [job, setJob] = useState(null)
  
  // Real-time job status updates
  // Progress visualization
  // Error handling and display
}
```

### 5. Integration with Payload Admin

#### Admin Sidebar Configuration
```typescript
// payload.config.ts
admin: {
  components: {
    Nav: [
      {
        path: '/admin/translations',
        label: 'Translations',
        Component: TranslationCenter
      }
    ]
  }
}
```

#### Custom Admin Route
```typescript
// src/app/(payload)/admin/translations/page.tsx
export default function TranslationsPage() {
  return <TranslationCenter />
}
```

## Error Handling & Recovery

### 1. OpenAI API Failures
```typescript
// Retry logic with exponential backoff
// Fallback to smaller batch sizes
// Manual retry for failed blocks
// Error logging and notification
```

### 2. Database Transaction Safety
```typescript
// Atomic updates per block
// Rollback on partial failures  
// Backup original content
// Version tracking
```

### 3. Rate Limiting
```typescript
// Respect OpenAI rate limits
// Queue management
// Automatic throttling
// Progress estimation
```

## Content Structure Preservation

### 1. Rich Text Handling
```typescript
// Preserve Lexical editor structure
// Maintain HTML formatting
// Handle embedded media
// Preserve internal links
```

### 2. Block Structure Integrity
```typescript
// Maintain block hierarchy
// Preserve field relationships
// Handle nested content
// Validate translated structure
```

### 3. Data Type Preservation
```typescript
// Numbers stay numbers
// Dates stay dates  
// URLs stay URLs
// Only translate text content
```

## User Experience Features

### 1. Real-time Updates
- WebSocket connection for live progress
- Real-time status updates
- Live error notifications

### 2. Translation Preview
- Preview translations before applying
- Side-by-side comparison
- Manual editing capability

### 3. Batch Management
- Pause/resume functionality
- Priority queue management
- Selective retry options

### 4. History & Audit
- Translation job history
- Content change tracking
- User action logging

## Security & Permissions

### 1. Access Control
```typescript
// Admin-only access
// Role-based permissions
// API key management
// Audit logging
```

### 2. Content Safety
```typescript
// Backup before translation
// Version control integration
// Rollback capabilities
// Content validation
```

## Implementation Phases

### Phase 1: Core Infrastructure
- Database schema setup
- Basic API endpoints
- Job queue system

### Phase 2: Translation Engine
- OpenAI integration
- Batch processing logic
- Error handling

### Phase 3: Admin UI
- Translation center interface
- Progress tracking
- Content selection

### Phase 4: Advanced Features
- Real-time updates
- Preview functionality
- History management

### Phase 5: Polish & Optimization
- Performance optimization
- Enhanced error handling
- User experience improvements

## Configuration

### Environment Variables
```bash
OPENAI_API_KEY=sk-...
TRANSLATION_BATCH_SIZE=3
TRANSLATION_DELAY_MS=1000
TRANSLATION_MAX_RETRIES=3
```

### Admin Settings
```typescript
// Configurable via admin panel
{
  maxConcurrentJobs: 1,
  batchSize: 3,
  autoPublish: false,
  retryAttempts: 3,
  rateLimitDelay: 1000
}
```

This translation feature will provide a powerful, centralized way to manage multilingual content while respecting API limits and maintaining content integrity.
