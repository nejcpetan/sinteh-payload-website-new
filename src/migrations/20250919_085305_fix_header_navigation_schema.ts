import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-vercel-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  payload.logger.info('🔧 Fixing header navigation schema and posts constraints...')

  // First, fix the posts table constraints that were blocking schema migration
  await db.execute(sql`
   ALTER TABLE "posts" DROP CONSTRAINT IF EXISTS "posts_featured_image_id_media_id_fk";
  
  ALTER TABLE "_posts_v" DROP CONSTRAINT IF EXISTS "_posts_v_version_featured_image_id_media_id_fk";
  
  DROP INDEX IF EXISTS "posts_featured_image_idx";
  DROP INDEX IF EXISTS "_posts_v_version_version_featured_image_idx";
  ALTER TABLE "posts" DROP COLUMN IF EXISTS "featured_image_id";
  ALTER TABLE "_posts_v" DROP COLUMN IF EXISTS "version_featured_image_id";`)

  payload.logger.info('✅ Removed problematic posts constraints')

  // Now fix the header navigation schema - migrate existing data to localized structure
  payload.logger.info('🔄 Migrating header navigation to localized structure...')

  // Check if the old label column exists in header_navigation table
  const tableInfo = await db.execute(sql`
    SELECT column_name 
    FROM information_schema.columns 
    WHERE table_name = 'header_navigation' 
    AND column_name = 'label'
  `)

  if (tableInfo.length > 0) {
    payload.logger.info('📋 Found old label column, migrating data...')

    // Get all existing navigation items with their labels
    const existingNavItems = await db.execute(sql`
      SELECT id, label 
      FROM header_navigation 
      WHERE label IS NOT NULL
    `)

    payload.logger.info(`📊 Found ${existingNavItems.length} navigation items to migrate`)

    // Create locale entries for each existing navigation item
    for (const navItem of existingNavItems) {
      // Create entries for all configured locales
      const locales = ['sl', 'en', 'de', 'hr']

      for (const locale of locales) {
        await db.execute(sql`
          INSERT INTO header_navigation_locales (_parent_id, _locale, label)
          VALUES (${navItem.id}, ${locale}, ${navItem.label})
          ON CONFLICT (_locale, _parent_id) DO UPDATE SET label = EXCLUDED.label
        `)
      }
    }

    payload.logger.info('✅ Migrated navigation labels to localized structure')

    // Now drop the old label column
    await db.execute(sql`
      ALTER TABLE header_navigation DROP COLUMN label
    `)

    payload.logger.info('🗑️  Removed old label column from header_navigation')
  } else {
    payload.logger.info('ℹ️  No old label column found, schema already updated')
  }

  // Do the same for dropdown items if needed
  const dropdownTableInfo = await db.execute(sql`
    SELECT column_name 
    FROM information_schema.columns 
    WHERE table_name = 'header_navigation_dropdown_items' 
    AND column_name = 'label'
  `)

  if (dropdownTableInfo.length > 0) {
    payload.logger.info('📋 Found old dropdown label column, migrating data...')

    const existingDropdownItems = await db.execute(sql`
      SELECT id, label 
      FROM header_navigation_dropdown_items 
      WHERE label IS NOT NULL
    `)

    for (const dropdownItem of existingDropdownItems) {
      const locales = ['sl', 'en', 'de', 'hr']

      for (const locale of locales) {
        await db.execute(sql`
          INSERT INTO header_navigation_dropdown_items_locales (_parent_id, _locale, label)
          VALUES (${dropdownItem.id}, ${locale}, ${dropdownItem.label})
          ON CONFLICT (_locale, _parent_id) DO UPDATE SET label = EXCLUDED.label
        `)
      }
    }

    await db.execute(sql`
      ALTER TABLE header_navigation_dropdown_items DROP COLUMN label
    `)

    payload.logger.info('✅ Migrated dropdown labels to localized structure')
  }

  payload.logger.info('🎉 Header navigation schema migration completed successfully!')
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "posts" ADD COLUMN "featured_image_id" integer;
  ALTER TABLE "_posts_v" ADD COLUMN "version_featured_image_id" integer;
  ALTER TABLE "posts" ADD CONSTRAINT "posts_featured_image_id_media_id_fk" FOREIGN KEY ("featured_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_posts_v" ADD CONSTRAINT "_posts_v_version_featured_image_id_media_id_fk" FOREIGN KEY ("version_featured_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "posts_featured_image_idx" ON "posts" USING btree ("featured_image_id");
  CREATE INDEX "_posts_v_version_version_featured_image_idx" ON "_posts_v" USING btree ("version_featured_image_id");`)
}
