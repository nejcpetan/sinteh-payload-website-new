import { vercelBlobStorage } from '@payloadcms/storage-vercel-blob'
import { vercelPostgresAdapter } from '@payloadcms/db-vercel-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'

import { Users } from './collections/Users'
import { Media } from './collections/Media'
import { Pages } from './collections/Pages'
import { Posts } from './collections/Posts'
import { Categories } from './collections/Categories'
import { ContactSubmissions } from './collections/ContactSubmissions'
// Import globals
import { Header } from './globals/Header'
import { Footer } from './globals/Footer'
import { SEO } from './globals/SEO'
import { Homepage } from './globals/Homepage'
import { EmailAdmin } from './globals/EmailAdmin'

// Import language objects
import { en } from './translations/en'
import { de } from './translations/de'
import { sl } from './translations/sl'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  // Admin panel translations (keep existing)
  i18n: {
    supportedLanguages: {
      en: en as any,
      de: de as any,
      sl: sl as any,
    },
  },
  // Content localization for frontend
  localization: {
    locales: [
      {
        label: 'Slovenščina',
        code: 'sl',
      },
      {
        label: 'English',
        code: 'en',
      },
      {
        label: 'Deutsch',
        code: 'de',
      },
      {
        label: 'Hrvatski',
        code: 'hr',
      },
    ],
    defaultLocale: 'sl',
    fallback: true,
  },
  collections: [Users, Media, Pages, Posts, Categories, ContactSubmissions],
  globals: [Header, Footer, SEO, Homepage, EmailAdmin],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: vercelPostgresAdapter({
    pool: {
      connectionString: process.env.POSTGRES_URL || '',
    },
    // 2025 Payload CMS Best Practice:
    // - Development: Use push=true for fast schema iteration
    // - Production: Use push=false to enforce proper migrations
    // - Vercel: Automatically detected as production environment
    push: process.env.NODE_ENV === 'development' && !process.env.VERCEL,
  }),
  plugins: [
    vercelBlobStorage({
      collections: {
        media: true,
      },
      token: process.env.BLOB_READ_WRITE_TOKEN || '',
    }),
  ],
})
