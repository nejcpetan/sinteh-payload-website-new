// Translation Configuration
require('dotenv').config({ path: '../.env.local' })

const config = {
  // Payload API Configuration
  payloadUrl: process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000',
  payloadSecret: process.env.PAYLOAD_SECRET,

  // Database Configuration (Test DB)
  databaseUrl: process.env.POSTGRES_URL,

  // OpenAI Configuration
  openaiApiKey: process.env.OPENAI_API_KEY,

  // Translation Settings
  sourceLocale: 'sl', // Slovenian (source)
  targetLocales: ['en', 'de', 'hr'], // English, German, Croatian

  // Language mappings for OpenAI
  languageNames: {
    en: 'English',
    de: 'German',
    hr: 'Croatian',
    sl: 'Slovenian',
  },

  // Processing Settings
  batchSize: 5, // Process 5 pages at a time
  delayBetweenRequests: 1000, // 1 second delay
  maxRetries: 3,

  // Content Processing
  preserveHtml: true,
  preserveFormatting: true,

  // Logging
  logLevel: 'info', // debug, info, warn, error
  logFile: './translation.log',

  // Safety Settings
  dryRun: false, // Set to true for testing without DB updates
  backupBeforeUpdate: true,

  // API Headers
  getHeaders() {
    return {
      'Content-Type': 'application/json',
      Authorization: `JWT ${this.payloadSecret}`, // Will be replaced with actual JWT token
    }
  },
}

module.exports = config
