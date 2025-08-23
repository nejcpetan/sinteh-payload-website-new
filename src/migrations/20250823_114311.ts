import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-vercel-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_homepage_blocks_hero_cta_buttons_type" AS ENUM('page', 'url', 'anchor');
  CREATE TYPE "public"."enum_homepage_blocks_hero_cta_buttons_variant" AS ENUM('default', 'secondary', 'outline', 'ghost');
  CREATE TYPE "public"."enum_homepage_blocks_services_services_button_type" AS ENUM('page', 'url', 'anchor');
  CREATE TYPE "public"."enum_homepage_blocks_about_button_type" AS ENUM('page', 'url', 'anchor');
  CREATE TYPE "public"."enum_homepage_blocks_why_trust_pillars_icon" AS ENUM('shield', 'cog', 'headset');
  CREATE TYPE "public"."enum_homepage_blocks_why_trust_button_type" AS ENUM('page', 'url', 'anchor');
  CREATE TYPE "public"."enum_homepage_blocks_projects_button_type" AS ENUM('page', 'url', 'anchor');
  CREATE TABLE "homepage_blocks_hero_cta_buttons" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar NOT NULL,
  	"type" "enum_homepage_blocks_hero_cta_buttons_type" DEFAULT 'page' NOT NULL,
  	"page_id" integer,
  	"url" varchar,
  	"anchor" varchar,
  	"variant" "enum_homepage_blocks_hero_cta_buttons_variant" DEFAULT 'default'
  );
  
  CREATE TABLE "homepage_blocks_hero" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar DEFAULT 'Sinteh d.o.o.' NOT NULL,
  	"subtitle" varchar DEFAULT 'Od zasnove do zagona in servisa – modulno ter prilagojeno vašim procesom.',
  	"background_image_id" integer NOT NULL,
  	"bottom_text" varchar DEFAULT 'Certifcirane komponente, sledljivost in varnost',
  	"block_name" varchar
  );
  
  CREATE TABLE "homepage_blocks_logo_belt_logos" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"logo_id" integer NOT NULL,
  	"alt" varchar NOT NULL
  );
  
  CREATE TABLE "homepage_blocks_logo_belt" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "homepage_blocks_services_services_features" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"feature" varchar NOT NULL
  );
  
  CREATE TABLE "homepage_blocks_services_services" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"description" varchar DEFAULT 'Sistematičen pristop, preverjene komponente, popolna dokumentacija.',
  	"image_id" integer NOT NULL,
  	"button_text" varchar DEFAULT 'Več o storitvi' NOT NULL,
  	"button_type" "enum_homepage_blocks_services_services_button_type" DEFAULT 'page' NOT NULL,
  	"button_page_id" integer,
  	"button_url" varchar,
  	"button_anchor" varchar
  );
  
  CREATE TABLE "homepage_blocks_services" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"badge" varchar DEFAULT 'STORITVE',
  	"title" varchar DEFAULT 'Specializirani za krmiljenje in avtomatizacijo' NOT NULL,
  	"subtitle" varchar DEFAULT 'Od načrtovanja do zagona in servisa',
  	"block_name" varchar
  );
  
  CREATE TABLE "homepage_blocks_about_badges" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar NOT NULL
  );
  
  CREATE TABLE "homepage_blocks_about_stats" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"number" varchar NOT NULL,
  	"label" varchar NOT NULL
  );
  
  CREATE TABLE "homepage_blocks_about_process" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"step" varchar NOT NULL
  );
  
  CREATE TABLE "homepage_blocks_about" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar DEFAULT 'O podjetju' NOT NULL,
  	"description" varchar DEFAULT 'Specializirani smo za industrijske avtomatizacijske sisteme z več kot 10-letnimi izkušnjami.',
  	"image_id" integer NOT NULL,
  	"callout_text" varchar DEFAULT 'Naše ekipe načrtujejo, programirajo in zaganjajo sisteme krmiljenja, pogone ter HMI/SCADA v tesnem sodelovanju z vašimi tehnologijami.',
  	"button_text" varchar DEFAULT 'Več o nas' NOT NULL,
  	"button_type" "enum_homepage_blocks_about_button_type" DEFAULT 'page' NOT NULL,
  	"button_page_id" integer,
  	"button_url" varchar,
  	"button_anchor" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "homepage_blocks_why_trust_reasons" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"reason" varchar NOT NULL
  );
  
  CREATE TABLE "homepage_blocks_why_trust_pillars" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"description" varchar NOT NULL,
  	"icon" "enum_homepage_blocks_why_trust_pillars_icon" NOT NULL
  );
  
  CREATE TABLE "homepage_blocks_why_trust" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar DEFAULT 'Zakaj nam zaupajo?' NOT NULL,
  	"image_id" integer NOT NULL,
  	"button_text" varchar DEFAULT 'Zaupajte nam' NOT NULL,
  	"button_type" "enum_homepage_blocks_why_trust_button_type" DEFAULT 'page' NOT NULL,
  	"button_page_id" integer,
  	"button_url" varchar,
  	"button_anchor" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "homepage_blocks_projects_projects_stack" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"technology" varchar NOT NULL
  );
  
  CREATE TABLE "homepage_blocks_projects_projects" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"category" varchar NOT NULL,
  	"image_id" integer NOT NULL,
  	"description" varchar NOT NULL,
  	"link" varchar
  );
  
  CREATE TABLE "homepage_blocks_projects" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"badge" varchar DEFAULT 'PROJEKTI',
  	"title" varchar DEFAULT 'Naši projekti' NOT NULL,
  	"subtitle" varchar DEFAULT 'Izsek projektov, ki so izboljšali produktivnost, varnost in sledljivost.',
  	"button_text" varchar DEFAULT 'Vsi projekti' NOT NULL,
  	"button_type" "enum_homepage_blocks_projects_button_type" DEFAULT 'page' NOT NULL,
  	"button_page_id" integer,
  	"button_url" varchar,
  	"button_anchor" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "homepage_blocks_contact" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"badge" varchar DEFAULT 'KONTAKT',
  	"title" varchar DEFAULT 'Stopite v stik z nami' NOT NULL,
  	"subtitle" varchar DEFAULT 'Pripravili vam bomo ponudbo v 24 urah',
  	"phone" varchar DEFAULT '+386 1 234 5678',
  	"email" varchar DEFAULT 'info@sinteh.si',
  	"privacy_text" varchar DEFAULT 'Pošiljanjem soglašate z našo politiko zasebnosti. Vaših podatkov ne posredujemo tretjim.',
  	"block_name" varchar
  );
  
  CREATE TABLE "homepage" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  ALTER TABLE "homepage_blocks_hero_cta_buttons" ADD CONSTRAINT "homepage_blocks_hero_cta_buttons_page_id_pages_id_fk" FOREIGN KEY ("page_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "homepage_blocks_hero_cta_buttons" ADD CONSTRAINT "homepage_blocks_hero_cta_buttons_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."homepage_blocks_hero"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "homepage_blocks_hero" ADD CONSTRAINT "homepage_blocks_hero_background_image_id_media_id_fk" FOREIGN KEY ("background_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "homepage_blocks_hero" ADD CONSTRAINT "homepage_blocks_hero_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."homepage"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "homepage_blocks_logo_belt_logos" ADD CONSTRAINT "homepage_blocks_logo_belt_logos_logo_id_media_id_fk" FOREIGN KEY ("logo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "homepage_blocks_logo_belt_logos" ADD CONSTRAINT "homepage_blocks_logo_belt_logos_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."homepage_blocks_logo_belt"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "homepage_blocks_logo_belt" ADD CONSTRAINT "homepage_blocks_logo_belt_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."homepage"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "homepage_blocks_services_services_features" ADD CONSTRAINT "homepage_blocks_services_services_features_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."homepage_blocks_services_services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "homepage_blocks_services_services" ADD CONSTRAINT "homepage_blocks_services_services_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "homepage_blocks_services_services" ADD CONSTRAINT "homepage_blocks_services_services_button_page_id_pages_id_fk" FOREIGN KEY ("button_page_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "homepage_blocks_services_services" ADD CONSTRAINT "homepage_blocks_services_services_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."homepage_blocks_services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "homepage_blocks_services" ADD CONSTRAINT "homepage_blocks_services_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."homepage"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "homepage_blocks_about_badges" ADD CONSTRAINT "homepage_blocks_about_badges_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."homepage_blocks_about"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "homepage_blocks_about_stats" ADD CONSTRAINT "homepage_blocks_about_stats_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."homepage_blocks_about"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "homepage_blocks_about_process" ADD CONSTRAINT "homepage_blocks_about_process_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."homepage_blocks_about"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "homepage_blocks_about" ADD CONSTRAINT "homepage_blocks_about_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "homepage_blocks_about" ADD CONSTRAINT "homepage_blocks_about_button_page_id_pages_id_fk" FOREIGN KEY ("button_page_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "homepage_blocks_about" ADD CONSTRAINT "homepage_blocks_about_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."homepage"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "homepage_blocks_why_trust_reasons" ADD CONSTRAINT "homepage_blocks_why_trust_reasons_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."homepage_blocks_why_trust"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "homepage_blocks_why_trust_pillars" ADD CONSTRAINT "homepage_blocks_why_trust_pillars_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."homepage_blocks_why_trust"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "homepage_blocks_why_trust" ADD CONSTRAINT "homepage_blocks_why_trust_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "homepage_blocks_why_trust" ADD CONSTRAINT "homepage_blocks_why_trust_button_page_id_pages_id_fk" FOREIGN KEY ("button_page_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "homepage_blocks_why_trust" ADD CONSTRAINT "homepage_blocks_why_trust_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."homepage"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "homepage_blocks_projects_projects_stack" ADD CONSTRAINT "homepage_blocks_projects_projects_stack_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."homepage_blocks_projects_projects"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "homepage_blocks_projects_projects" ADD CONSTRAINT "homepage_blocks_projects_projects_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "homepage_blocks_projects_projects" ADD CONSTRAINT "homepage_blocks_projects_projects_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."homepage_blocks_projects"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "homepage_blocks_projects" ADD CONSTRAINT "homepage_blocks_projects_button_page_id_pages_id_fk" FOREIGN KEY ("button_page_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "homepage_blocks_projects" ADD CONSTRAINT "homepage_blocks_projects_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."homepage"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "homepage_blocks_contact" ADD CONSTRAINT "homepage_blocks_contact_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."homepage"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "homepage_blocks_hero_cta_buttons_order_idx" ON "homepage_blocks_hero_cta_buttons" USING btree ("_order");
  CREATE INDEX "homepage_blocks_hero_cta_buttons_parent_id_idx" ON "homepage_blocks_hero_cta_buttons" USING btree ("_parent_id");
  CREATE INDEX "homepage_blocks_hero_cta_buttons_page_idx" ON "homepage_blocks_hero_cta_buttons" USING btree ("page_id");
  CREATE INDEX "homepage_blocks_hero_order_idx" ON "homepage_blocks_hero" USING btree ("_order");
  CREATE INDEX "homepage_blocks_hero_parent_id_idx" ON "homepage_blocks_hero" USING btree ("_parent_id");
  CREATE INDEX "homepage_blocks_hero_path_idx" ON "homepage_blocks_hero" USING btree ("_path");
  CREATE INDEX "homepage_blocks_hero_background_image_idx" ON "homepage_blocks_hero" USING btree ("background_image_id");
  CREATE INDEX "homepage_blocks_logo_belt_logos_order_idx" ON "homepage_blocks_logo_belt_logos" USING btree ("_order");
  CREATE INDEX "homepage_blocks_logo_belt_logos_parent_id_idx" ON "homepage_blocks_logo_belt_logos" USING btree ("_parent_id");
  CREATE INDEX "homepage_blocks_logo_belt_logos_logo_idx" ON "homepage_blocks_logo_belt_logos" USING btree ("logo_id");
  CREATE INDEX "homepage_blocks_logo_belt_order_idx" ON "homepage_blocks_logo_belt" USING btree ("_order");
  CREATE INDEX "homepage_blocks_logo_belt_parent_id_idx" ON "homepage_blocks_logo_belt" USING btree ("_parent_id");
  CREATE INDEX "homepage_blocks_logo_belt_path_idx" ON "homepage_blocks_logo_belt" USING btree ("_path");
  CREATE INDEX "homepage_blocks_services_services_features_order_idx" ON "homepage_blocks_services_services_features" USING btree ("_order");
  CREATE INDEX "homepage_blocks_services_services_features_parent_id_idx" ON "homepage_blocks_services_services_features" USING btree ("_parent_id");
  CREATE INDEX "homepage_blocks_services_services_order_idx" ON "homepage_blocks_services_services" USING btree ("_order");
  CREATE INDEX "homepage_blocks_services_services_parent_id_idx" ON "homepage_blocks_services_services" USING btree ("_parent_id");
  CREATE INDEX "homepage_blocks_services_services_image_idx" ON "homepage_blocks_services_services" USING btree ("image_id");
  CREATE INDEX "homepage_blocks_services_services_button_button_page_idx" ON "homepage_blocks_services_services" USING btree ("button_page_id");
  CREATE INDEX "homepage_blocks_services_order_idx" ON "homepage_blocks_services" USING btree ("_order");
  CREATE INDEX "homepage_blocks_services_parent_id_idx" ON "homepage_blocks_services" USING btree ("_parent_id");
  CREATE INDEX "homepage_blocks_services_path_idx" ON "homepage_blocks_services" USING btree ("_path");
  CREATE INDEX "homepage_blocks_about_badges_order_idx" ON "homepage_blocks_about_badges" USING btree ("_order");
  CREATE INDEX "homepage_blocks_about_badges_parent_id_idx" ON "homepage_blocks_about_badges" USING btree ("_parent_id");
  CREATE INDEX "homepage_blocks_about_stats_order_idx" ON "homepage_blocks_about_stats" USING btree ("_order");
  CREATE INDEX "homepage_blocks_about_stats_parent_id_idx" ON "homepage_blocks_about_stats" USING btree ("_parent_id");
  CREATE INDEX "homepage_blocks_about_process_order_idx" ON "homepage_blocks_about_process" USING btree ("_order");
  CREATE INDEX "homepage_blocks_about_process_parent_id_idx" ON "homepage_blocks_about_process" USING btree ("_parent_id");
  CREATE INDEX "homepage_blocks_about_order_idx" ON "homepage_blocks_about" USING btree ("_order");
  CREATE INDEX "homepage_blocks_about_parent_id_idx" ON "homepage_blocks_about" USING btree ("_parent_id");
  CREATE INDEX "homepage_blocks_about_path_idx" ON "homepage_blocks_about" USING btree ("_path");
  CREATE INDEX "homepage_blocks_about_image_idx" ON "homepage_blocks_about" USING btree ("image_id");
  CREATE INDEX "homepage_blocks_about_button_button_page_idx" ON "homepage_blocks_about" USING btree ("button_page_id");
  CREATE INDEX "homepage_blocks_why_trust_reasons_order_idx" ON "homepage_blocks_why_trust_reasons" USING btree ("_order");
  CREATE INDEX "homepage_blocks_why_trust_reasons_parent_id_idx" ON "homepage_blocks_why_trust_reasons" USING btree ("_parent_id");
  CREATE INDEX "homepage_blocks_why_trust_pillars_order_idx" ON "homepage_blocks_why_trust_pillars" USING btree ("_order");
  CREATE INDEX "homepage_blocks_why_trust_pillars_parent_id_idx" ON "homepage_blocks_why_trust_pillars" USING btree ("_parent_id");
  CREATE INDEX "homepage_blocks_why_trust_order_idx" ON "homepage_blocks_why_trust" USING btree ("_order");
  CREATE INDEX "homepage_blocks_why_trust_parent_id_idx" ON "homepage_blocks_why_trust" USING btree ("_parent_id");
  CREATE INDEX "homepage_blocks_why_trust_path_idx" ON "homepage_blocks_why_trust" USING btree ("_path");
  CREATE INDEX "homepage_blocks_why_trust_image_idx" ON "homepage_blocks_why_trust" USING btree ("image_id");
  CREATE INDEX "homepage_blocks_why_trust_button_button_page_idx" ON "homepage_blocks_why_trust" USING btree ("button_page_id");
  CREATE INDEX "homepage_blocks_projects_projects_stack_order_idx" ON "homepage_blocks_projects_projects_stack" USING btree ("_order");
  CREATE INDEX "homepage_blocks_projects_projects_stack_parent_id_idx" ON "homepage_blocks_projects_projects_stack" USING btree ("_parent_id");
  CREATE INDEX "homepage_blocks_projects_projects_order_idx" ON "homepage_blocks_projects_projects" USING btree ("_order");
  CREATE INDEX "homepage_blocks_projects_projects_parent_id_idx" ON "homepage_blocks_projects_projects" USING btree ("_parent_id");
  CREATE INDEX "homepage_blocks_projects_projects_image_idx" ON "homepage_blocks_projects_projects" USING btree ("image_id");
  CREATE INDEX "homepage_blocks_projects_order_idx" ON "homepage_blocks_projects" USING btree ("_order");
  CREATE INDEX "homepage_blocks_projects_parent_id_idx" ON "homepage_blocks_projects" USING btree ("_parent_id");
  CREATE INDEX "homepage_blocks_projects_path_idx" ON "homepage_blocks_projects" USING btree ("_path");
  CREATE INDEX "homepage_blocks_projects_button_button_page_idx" ON "homepage_blocks_projects" USING btree ("button_page_id");
  CREATE INDEX "homepage_blocks_contact_order_idx" ON "homepage_blocks_contact" USING btree ("_order");
  CREATE INDEX "homepage_blocks_contact_parent_id_idx" ON "homepage_blocks_contact" USING btree ("_parent_id");
  CREATE INDEX "homepage_blocks_contact_path_idx" ON "homepage_blocks_contact" USING btree ("_path");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "homepage_blocks_hero_cta_buttons" CASCADE;
  DROP TABLE "homepage_blocks_hero" CASCADE;
  DROP TABLE "homepage_blocks_logo_belt_logos" CASCADE;
  DROP TABLE "homepage_blocks_logo_belt" CASCADE;
  DROP TABLE "homepage_blocks_services_services_features" CASCADE;
  DROP TABLE "homepage_blocks_services_services" CASCADE;
  DROP TABLE "homepage_blocks_services" CASCADE;
  DROP TABLE "homepage_blocks_about_badges" CASCADE;
  DROP TABLE "homepage_blocks_about_stats" CASCADE;
  DROP TABLE "homepage_blocks_about_process" CASCADE;
  DROP TABLE "homepage_blocks_about" CASCADE;
  DROP TABLE "homepage_blocks_why_trust_reasons" CASCADE;
  DROP TABLE "homepage_blocks_why_trust_pillars" CASCADE;
  DROP TABLE "homepage_blocks_why_trust" CASCADE;
  DROP TABLE "homepage_blocks_projects_projects_stack" CASCADE;
  DROP TABLE "homepage_blocks_projects_projects" CASCADE;
  DROP TABLE "homepage_blocks_projects" CASCADE;
  DROP TABLE "homepage_blocks_contact" CASCADE;
  DROP TABLE "homepage" CASCADE;
  DROP TYPE "public"."enum_homepage_blocks_hero_cta_buttons_type";
  DROP TYPE "public"."enum_homepage_blocks_hero_cta_buttons_variant";
  DROP TYPE "public"."enum_homepage_blocks_services_services_button_type";
  DROP TYPE "public"."enum_homepage_blocks_about_button_type";
  DROP TYPE "public"."enum_homepage_blocks_why_trust_pillars_icon";
  DROP TYPE "public"."enum_homepage_blocks_why_trust_button_type";
  DROP TYPE "public"."enum_homepage_blocks_projects_button_type";`)
}
