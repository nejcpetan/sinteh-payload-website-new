import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-vercel-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "header_navigation_dropdown_items_locales" ALTER COLUMN "label" DROP DEFAULT;
  ALTER TABLE "header_navigation_locales" ALTER COLUMN "label" DROP DEFAULT;
  ALTER TABLE "header_navigation_locales" ALTER COLUMN "label" SET NOT NULL;`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "header_navigation_dropdown_items_locales" ALTER COLUMN "label" SET DEFAULT 'Dropdown Item';
  ALTER TABLE "header_navigation_locales" ALTER COLUMN "label" SET DEFAULT 'Navigation Item';
  ALTER TABLE "header_navigation_locales" ALTER COLUMN "label" DROP NOT NULL;`)
}
