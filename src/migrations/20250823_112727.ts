import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-vercel-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_pages_blocks_hero_cta_buttons_type" AS ENUM('page', 'url', 'anchor');
  CREATE TYPE "public"."enum_pages_blocks_hero_cta_buttons_variant" AS ENUM('contrast', 'outlineLight');
  CREATE TYPE "public"."enum_pages_blocks_services_services_button_type" AS ENUM('page', 'url', 'anchor');
  CREATE TYPE "public"."enum_pages_blocks_about_button_type" AS ENUM('page', 'url', 'anchor');
  CREATE TYPE "public"."enum_pages_blocks_why_trust_pillars_icon" AS ENUM('shield', 'cog', 'headset');
  CREATE TYPE "public"."enum_pages_blocks_why_trust_button_type" AS ENUM('page', 'url', 'anchor');
  CREATE TYPE "public"."enum_pages_blocks_projects_button_type" AS ENUM('page', 'url', 'anchor');
  CREATE TYPE "public"."enum__pages_v_blocks_hero_cta_buttons_type" AS ENUM('page', 'url', 'anchor');
  CREATE TYPE "public"."enum__pages_v_blocks_hero_cta_buttons_variant" AS ENUM('contrast', 'outlineLight');
  CREATE TYPE "public"."enum__pages_v_blocks_services_services_button_type" AS ENUM('page', 'url', 'anchor');
  CREATE TYPE "public"."enum__pages_v_blocks_about_button_type" AS ENUM('page', 'url', 'anchor');
  CREATE TYPE "public"."enum__pages_v_blocks_why_trust_pillars_icon" AS ENUM('shield', 'cog', 'headset');
  CREATE TYPE "public"."enum__pages_v_blocks_why_trust_button_type" AS ENUM('page', 'url', 'anchor');
  CREATE TYPE "public"."enum__pages_v_blocks_projects_button_type" AS ENUM('page', 'url', 'anchor');
  CREATE TABLE "pages_blocks_hero_cta_buttons" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"type" "enum_pages_blocks_hero_cta_buttons_type" DEFAULT 'page',
  	"page_id" integer,
  	"url" varchar,
  	"anchor" varchar,
  	"variant" "enum_pages_blocks_hero_cta_buttons_variant" DEFAULT 'contrast'
  );
  
  CREATE TABLE "pages_blocks_hero" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"subtitle" varchar,
  	"background_image_id" integer,
  	"bottom_text" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_logo_belt_logos" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"logo_id" integer,
  	"alt" varchar
  );
  
  CREATE TABLE "pages_blocks_logo_belt" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_services_services_features" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"feature" varchar
  );
  
  CREATE TABLE "pages_blocks_services_services" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"description" varchar DEFAULT 'Sistematičen pristop, preverjene komponente, popolna dokumentacija.',
  	"image_id" integer,
  	"button_text" varchar DEFAULT 'Odkrij',
  	"button_type" "enum_pages_blocks_services_services_button_type" DEFAULT 'anchor',
  	"button_page_id" integer,
  	"button_url" varchar,
  	"button_anchor" varchar DEFAULT '#kontakt'
  );
  
  CREATE TABLE "pages_blocks_services" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"badge" varchar DEFAULT 'Področja dela',
  	"title" varchar DEFAULT 'Rešitve, ki jih izvajamo',
  	"subtitle" varchar DEFAULT 'Od zasnove do zagona in servisa – modulno ter prilagojeno vašim procesom.',
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_about_badges" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar
  );
  
  CREATE TABLE "pages_blocks_about_stats" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"number" varchar,
  	"label" varchar
  );
  
  CREATE TABLE "pages_blocks_about_process" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"step" varchar
  );
  
  CREATE TABLE "pages_blocks_about" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar DEFAULT 'Družinska tradicija industrijske avtomatizacije',
  	"description" varchar,
  	"image_id" integer,
  	"callout_text" varchar DEFAULT 'Naše ekipe načrtujejo, programirajo in zaganjajo sisteme krmiljenja, pogone ter HMI/SCADA v tesnem sodelovanju z vašimi tehnologijami.',
  	"button_text" varchar DEFAULT 'O nas',
  	"button_type" "enum_pages_blocks_about_button_type" DEFAULT 'anchor',
  	"button_page_id" integer,
  	"button_url" varchar,
  	"button_anchor" varchar DEFAULT '#onas',
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_why_trust_reasons" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"reason" varchar
  );
  
  CREATE TABLE "pages_blocks_why_trust_pillars" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"description" varchar,
  	"icon" "enum_pages_blocks_why_trust_pillars_icon"
  );
  
  CREATE TABLE "pages_blocks_why_trust" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar DEFAULT 'Zakaj nam stranke zaupajo?',
  	"image_id" integer,
  	"button_text" varchar DEFAULT 'Projekti',
  	"button_type" "enum_pages_blocks_why_trust_button_type" DEFAULT 'anchor',
  	"button_page_id" integer,
  	"button_url" varchar,
  	"button_anchor" varchar DEFAULT '#projekti',
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_projects_projects_stack" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"technology" varchar
  );
  
  CREATE TABLE "pages_blocks_projects_projects" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"category" varchar,
  	"image_id" integer,
  	"description" varchar,
  	"link" varchar DEFAULT '#kontakt'
  );
  
  CREATE TABLE "pages_blocks_projects" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"badge" varchar DEFAULT 'Študije primerov',
  	"title" varchar DEFAULT 'Uspešne implementacije naših rešitev',
  	"subtitle" varchar DEFAULT 'Izsek projektov, ki so izboljšali produktivnost, varnost in sledljivost.',
  	"button_text" varchar DEFAULT 'Kontakt',
  	"button_type" "enum_pages_blocks_projects_button_type" DEFAULT 'anchor',
  	"button_page_id" integer,
  	"button_url" varchar,
  	"button_anchor" varchar DEFAULT '#kontakt',
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_contact" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"badge" varchar DEFAULT 'Stopimo v stik',
  	"title" varchar DEFAULT 'Edini način za hitrejše doseganje vaših ciljev',
  	"subtitle" varchar DEFAULT 'Izpolnite obrazec – odgovorimo v enem delovnem dnevu.',
  	"phone" varchar DEFAULT '+386 (3) 426 36 46',
  	"email" varchar DEFAULT 'info@sinteh.pro',
  	"privacy_text" varchar DEFAULT 'Pošiljanjem soglašate z našo politiko zasebnosti. Vaših podatkov ne posredujemo tretjim.',
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_hero_cta_buttons" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"type" "enum__pages_v_blocks_hero_cta_buttons_type" DEFAULT 'page',
  	"page_id" integer,
  	"url" varchar,
  	"anchor" varchar,
  	"variant" "enum__pages_v_blocks_hero_cta_buttons_variant" DEFAULT 'contrast',
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_hero" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"subtitle" varchar,
  	"background_image_id" integer,
  	"bottom_text" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_logo_belt_logos" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"logo_id" integer,
  	"alt" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_logo_belt" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_services_services_features" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"feature" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_services_services" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"description" varchar DEFAULT 'Sistematičen pristop, preverjene komponente, popolna dokumentacija.',
  	"image_id" integer,
  	"button_text" varchar DEFAULT 'Odkrij',
  	"button_type" "enum__pages_v_blocks_services_services_button_type" DEFAULT 'anchor',
  	"button_page_id" integer,
  	"button_url" varchar,
  	"button_anchor" varchar DEFAULT '#kontakt',
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_services" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"badge" varchar DEFAULT 'Področja dela',
  	"title" varchar DEFAULT 'Rešitve, ki jih izvajamo',
  	"subtitle" varchar DEFAULT 'Od zasnove do zagona in servisa – modulno ter prilagojeno vašim procesom.',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_about_badges" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"text" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_about_stats" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"number" varchar,
  	"label" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_about_process" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"step" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_about" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar DEFAULT 'Družinska tradicija industrijske avtomatizacije',
  	"description" varchar,
  	"image_id" integer,
  	"callout_text" varchar DEFAULT 'Naše ekipe načrtujejo, programirajo in zaganjajo sisteme krmiljenja, pogone ter HMI/SCADA v tesnem sodelovanju z vašimi tehnologijami.',
  	"button_text" varchar DEFAULT 'O nas',
  	"button_type" "enum__pages_v_blocks_about_button_type" DEFAULT 'anchor',
  	"button_page_id" integer,
  	"button_url" varchar,
  	"button_anchor" varchar DEFAULT '#onas',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_why_trust_reasons" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"reason" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_why_trust_pillars" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"description" varchar,
  	"icon" "enum__pages_v_blocks_why_trust_pillars_icon",
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_why_trust" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar DEFAULT 'Zakaj nam stranke zaupajo?',
  	"image_id" integer,
  	"button_text" varchar DEFAULT 'Projekti',
  	"button_type" "enum__pages_v_blocks_why_trust_button_type" DEFAULT 'anchor',
  	"button_page_id" integer,
  	"button_url" varchar,
  	"button_anchor" varchar DEFAULT '#projekti',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_projects_projects_stack" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"technology" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_projects_projects" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"category" varchar,
  	"image_id" integer,
  	"description" varchar,
  	"link" varchar DEFAULT '#kontakt',
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_projects" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"badge" varchar DEFAULT 'Študije primerov',
  	"title" varchar DEFAULT 'Uspešne implementacije naših rešitev',
  	"subtitle" varchar DEFAULT 'Izsek projektov, ki so izboljšali produktivnost, varnost in sledljivost.',
  	"button_text" varchar DEFAULT 'Kontakt',
  	"button_type" "enum__pages_v_blocks_projects_button_type" DEFAULT 'anchor',
  	"button_page_id" integer,
  	"button_url" varchar,
  	"button_anchor" varchar DEFAULT '#kontakt',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_contact" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"badge" varchar DEFAULT 'Stopimo v stik',
  	"title" varchar DEFAULT 'Edini način za hitrejše doseganje vaših ciljev',
  	"subtitle" varchar DEFAULT 'Izpolnite obrazec – odgovorimo v enem delovnem dnevu.',
  	"phone" varchar DEFAULT '+386 (3) 426 36 46',
  	"email" varchar DEFAULT 'info@sinteh.pro',
  	"privacy_text" varchar DEFAULT 'Pošiljanjem soglašate z našo politiko zasebnosti. Vaših podatkov ne posredujemo tretjim.',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  DROP TABLE "homepage_hero_cta_buttons" CASCADE;
  DROP TABLE "homepage_quick_links_links" CASCADE;
  DROP TABLE "homepage" CASCADE;
  DROP TABLE "homepage_rels" CASCADE;
  ALTER TABLE "pages_blocks_hero_cta_buttons" ADD CONSTRAINT "pages_blocks_hero_cta_buttons_page_id_pages_id_fk" FOREIGN KEY ("page_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_hero_cta_buttons" ADD CONSTRAINT "pages_blocks_hero_cta_buttons_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_hero"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_hero" ADD CONSTRAINT "pages_blocks_hero_background_image_id_media_id_fk" FOREIGN KEY ("background_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_hero" ADD CONSTRAINT "pages_blocks_hero_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_logo_belt_logos" ADD CONSTRAINT "pages_blocks_logo_belt_logos_logo_id_media_id_fk" FOREIGN KEY ("logo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_logo_belt_logos" ADD CONSTRAINT "pages_blocks_logo_belt_logos_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_logo_belt"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_logo_belt" ADD CONSTRAINT "pages_blocks_logo_belt_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_services_services_features" ADD CONSTRAINT "pages_blocks_services_services_features_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_services_services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_services_services" ADD CONSTRAINT "pages_blocks_services_services_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_services_services" ADD CONSTRAINT "pages_blocks_services_services_button_page_id_pages_id_fk" FOREIGN KEY ("button_page_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_services_services" ADD CONSTRAINT "pages_blocks_services_services_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_services" ADD CONSTRAINT "pages_blocks_services_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_about_badges" ADD CONSTRAINT "pages_blocks_about_badges_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_about"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_about_stats" ADD CONSTRAINT "pages_blocks_about_stats_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_about"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_about_process" ADD CONSTRAINT "pages_blocks_about_process_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_about"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_about" ADD CONSTRAINT "pages_blocks_about_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_about" ADD CONSTRAINT "pages_blocks_about_button_page_id_pages_id_fk" FOREIGN KEY ("button_page_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_about" ADD CONSTRAINT "pages_blocks_about_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_why_trust_reasons" ADD CONSTRAINT "pages_blocks_why_trust_reasons_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_why_trust"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_why_trust_pillars" ADD CONSTRAINT "pages_blocks_why_trust_pillars_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_why_trust"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_why_trust" ADD CONSTRAINT "pages_blocks_why_trust_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_why_trust" ADD CONSTRAINT "pages_blocks_why_trust_button_page_id_pages_id_fk" FOREIGN KEY ("button_page_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_why_trust" ADD CONSTRAINT "pages_blocks_why_trust_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_projects_projects_stack" ADD CONSTRAINT "pages_blocks_projects_projects_stack_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_projects_projects"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_projects_projects" ADD CONSTRAINT "pages_blocks_projects_projects_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_projects_projects" ADD CONSTRAINT "pages_blocks_projects_projects_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_projects"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_projects" ADD CONSTRAINT "pages_blocks_projects_button_page_id_pages_id_fk" FOREIGN KEY ("button_page_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_projects" ADD CONSTRAINT "pages_blocks_projects_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_contact" ADD CONSTRAINT "pages_blocks_contact_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_hero_cta_buttons" ADD CONSTRAINT "_pages_v_blocks_hero_cta_buttons_page_id_pages_id_fk" FOREIGN KEY ("page_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_hero_cta_buttons" ADD CONSTRAINT "_pages_v_blocks_hero_cta_buttons_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_hero"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_hero" ADD CONSTRAINT "_pages_v_blocks_hero_background_image_id_media_id_fk" FOREIGN KEY ("background_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_hero" ADD CONSTRAINT "_pages_v_blocks_hero_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_logo_belt_logos" ADD CONSTRAINT "_pages_v_blocks_logo_belt_logos_logo_id_media_id_fk" FOREIGN KEY ("logo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_logo_belt_logos" ADD CONSTRAINT "_pages_v_blocks_logo_belt_logos_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_logo_belt"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_logo_belt" ADD CONSTRAINT "_pages_v_blocks_logo_belt_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_services_services_features" ADD CONSTRAINT "_pages_v_blocks_services_services_features_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_services_services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_services_services" ADD CONSTRAINT "_pages_v_blocks_services_services_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_services_services" ADD CONSTRAINT "_pages_v_blocks_services_services_button_page_id_pages_id_fk" FOREIGN KEY ("button_page_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_services_services" ADD CONSTRAINT "_pages_v_blocks_services_services_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_services" ADD CONSTRAINT "_pages_v_blocks_services_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_about_badges" ADD CONSTRAINT "_pages_v_blocks_about_badges_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_about"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_about_stats" ADD CONSTRAINT "_pages_v_blocks_about_stats_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_about"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_about_process" ADD CONSTRAINT "_pages_v_blocks_about_process_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_about"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_about" ADD CONSTRAINT "_pages_v_blocks_about_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_about" ADD CONSTRAINT "_pages_v_blocks_about_button_page_id_pages_id_fk" FOREIGN KEY ("button_page_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_about" ADD CONSTRAINT "_pages_v_blocks_about_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_why_trust_reasons" ADD CONSTRAINT "_pages_v_blocks_why_trust_reasons_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_why_trust"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_why_trust_pillars" ADD CONSTRAINT "_pages_v_blocks_why_trust_pillars_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_why_trust"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_why_trust" ADD CONSTRAINT "_pages_v_blocks_why_trust_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_why_trust" ADD CONSTRAINT "_pages_v_blocks_why_trust_button_page_id_pages_id_fk" FOREIGN KEY ("button_page_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_why_trust" ADD CONSTRAINT "_pages_v_blocks_why_trust_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_projects_projects_stack" ADD CONSTRAINT "_pages_v_blocks_projects_projects_stack_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_projects_projects"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_projects_projects" ADD CONSTRAINT "_pages_v_blocks_projects_projects_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_projects_projects" ADD CONSTRAINT "_pages_v_blocks_projects_projects_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_projects"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_projects" ADD CONSTRAINT "_pages_v_blocks_projects_button_page_id_pages_id_fk" FOREIGN KEY ("button_page_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_projects" ADD CONSTRAINT "_pages_v_blocks_projects_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_contact" ADD CONSTRAINT "_pages_v_blocks_contact_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "pages_blocks_hero_cta_buttons_order_idx" ON "pages_blocks_hero_cta_buttons" USING btree ("_order");
  CREATE INDEX "pages_blocks_hero_cta_buttons_parent_id_idx" ON "pages_blocks_hero_cta_buttons" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_hero_cta_buttons_page_idx" ON "pages_blocks_hero_cta_buttons" USING btree ("page_id");
  CREATE INDEX "pages_blocks_hero_order_idx" ON "pages_blocks_hero" USING btree ("_order");
  CREATE INDEX "pages_blocks_hero_parent_id_idx" ON "pages_blocks_hero" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_hero_path_idx" ON "pages_blocks_hero" USING btree ("_path");
  CREATE INDEX "pages_blocks_hero_background_image_idx" ON "pages_blocks_hero" USING btree ("background_image_id");
  CREATE INDEX "pages_blocks_logo_belt_logos_order_idx" ON "pages_blocks_logo_belt_logos" USING btree ("_order");
  CREATE INDEX "pages_blocks_logo_belt_logos_parent_id_idx" ON "pages_blocks_logo_belt_logos" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_logo_belt_logos_logo_idx" ON "pages_blocks_logo_belt_logos" USING btree ("logo_id");
  CREATE INDEX "pages_blocks_logo_belt_order_idx" ON "pages_blocks_logo_belt" USING btree ("_order");
  CREATE INDEX "pages_blocks_logo_belt_parent_id_idx" ON "pages_blocks_logo_belt" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_logo_belt_path_idx" ON "pages_blocks_logo_belt" USING btree ("_path");
  CREATE INDEX "pages_blocks_services_services_features_order_idx" ON "pages_blocks_services_services_features" USING btree ("_order");
  CREATE INDEX "pages_blocks_services_services_features_parent_id_idx" ON "pages_blocks_services_services_features" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_services_services_order_idx" ON "pages_blocks_services_services" USING btree ("_order");
  CREATE INDEX "pages_blocks_services_services_parent_id_idx" ON "pages_blocks_services_services" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_services_services_image_idx" ON "pages_blocks_services_services" USING btree ("image_id");
  CREATE INDEX "pages_blocks_services_services_button_button_page_idx" ON "pages_blocks_services_services" USING btree ("button_page_id");
  CREATE INDEX "pages_blocks_services_order_idx" ON "pages_blocks_services" USING btree ("_order");
  CREATE INDEX "pages_blocks_services_parent_id_idx" ON "pages_blocks_services" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_services_path_idx" ON "pages_blocks_services" USING btree ("_path");
  CREATE INDEX "pages_blocks_about_badges_order_idx" ON "pages_blocks_about_badges" USING btree ("_order");
  CREATE INDEX "pages_blocks_about_badges_parent_id_idx" ON "pages_blocks_about_badges" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_about_stats_order_idx" ON "pages_blocks_about_stats" USING btree ("_order");
  CREATE INDEX "pages_blocks_about_stats_parent_id_idx" ON "pages_blocks_about_stats" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_about_process_order_idx" ON "pages_blocks_about_process" USING btree ("_order");
  CREATE INDEX "pages_blocks_about_process_parent_id_idx" ON "pages_blocks_about_process" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_about_order_idx" ON "pages_blocks_about" USING btree ("_order");
  CREATE INDEX "pages_blocks_about_parent_id_idx" ON "pages_blocks_about" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_about_path_idx" ON "pages_blocks_about" USING btree ("_path");
  CREATE INDEX "pages_blocks_about_image_idx" ON "pages_blocks_about" USING btree ("image_id");
  CREATE INDEX "pages_blocks_about_button_button_page_idx" ON "pages_blocks_about" USING btree ("button_page_id");
  CREATE INDEX "pages_blocks_why_trust_reasons_order_idx" ON "pages_blocks_why_trust_reasons" USING btree ("_order");
  CREATE INDEX "pages_blocks_why_trust_reasons_parent_id_idx" ON "pages_blocks_why_trust_reasons" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_why_trust_pillars_order_idx" ON "pages_blocks_why_trust_pillars" USING btree ("_order");
  CREATE INDEX "pages_blocks_why_trust_pillars_parent_id_idx" ON "pages_blocks_why_trust_pillars" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_why_trust_order_idx" ON "pages_blocks_why_trust" USING btree ("_order");
  CREATE INDEX "pages_blocks_why_trust_parent_id_idx" ON "pages_blocks_why_trust" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_why_trust_path_idx" ON "pages_blocks_why_trust" USING btree ("_path");
  CREATE INDEX "pages_blocks_why_trust_image_idx" ON "pages_blocks_why_trust" USING btree ("image_id");
  CREATE INDEX "pages_blocks_why_trust_button_button_page_idx" ON "pages_blocks_why_trust" USING btree ("button_page_id");
  CREATE INDEX "pages_blocks_projects_projects_stack_order_idx" ON "pages_blocks_projects_projects_stack" USING btree ("_order");
  CREATE INDEX "pages_blocks_projects_projects_stack_parent_id_idx" ON "pages_blocks_projects_projects_stack" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_projects_projects_order_idx" ON "pages_blocks_projects_projects" USING btree ("_order");
  CREATE INDEX "pages_blocks_projects_projects_parent_id_idx" ON "pages_blocks_projects_projects" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_projects_projects_image_idx" ON "pages_blocks_projects_projects" USING btree ("image_id");
  CREATE INDEX "pages_blocks_projects_order_idx" ON "pages_blocks_projects" USING btree ("_order");
  CREATE INDEX "pages_blocks_projects_parent_id_idx" ON "pages_blocks_projects" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_projects_path_idx" ON "pages_blocks_projects" USING btree ("_path");
  CREATE INDEX "pages_blocks_projects_button_button_page_idx" ON "pages_blocks_projects" USING btree ("button_page_id");
  CREATE INDEX "pages_blocks_contact_order_idx" ON "pages_blocks_contact" USING btree ("_order");
  CREATE INDEX "pages_blocks_contact_parent_id_idx" ON "pages_blocks_contact" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_contact_path_idx" ON "pages_blocks_contact" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_hero_cta_buttons_order_idx" ON "_pages_v_blocks_hero_cta_buttons" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_hero_cta_buttons_parent_id_idx" ON "_pages_v_blocks_hero_cta_buttons" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_hero_cta_buttons_page_idx" ON "_pages_v_blocks_hero_cta_buttons" USING btree ("page_id");
  CREATE INDEX "_pages_v_blocks_hero_order_idx" ON "_pages_v_blocks_hero" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_hero_parent_id_idx" ON "_pages_v_blocks_hero" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_hero_path_idx" ON "_pages_v_blocks_hero" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_hero_background_image_idx" ON "_pages_v_blocks_hero" USING btree ("background_image_id");
  CREATE INDEX "_pages_v_blocks_logo_belt_logos_order_idx" ON "_pages_v_blocks_logo_belt_logos" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_logo_belt_logos_parent_id_idx" ON "_pages_v_blocks_logo_belt_logos" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_logo_belt_logos_logo_idx" ON "_pages_v_blocks_logo_belt_logos" USING btree ("logo_id");
  CREATE INDEX "_pages_v_blocks_logo_belt_order_idx" ON "_pages_v_blocks_logo_belt" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_logo_belt_parent_id_idx" ON "_pages_v_blocks_logo_belt" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_logo_belt_path_idx" ON "_pages_v_blocks_logo_belt" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_services_services_features_order_idx" ON "_pages_v_blocks_services_services_features" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_services_services_features_parent_id_idx" ON "_pages_v_blocks_services_services_features" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_services_services_order_idx" ON "_pages_v_blocks_services_services" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_services_services_parent_id_idx" ON "_pages_v_blocks_services_services" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_services_services_image_idx" ON "_pages_v_blocks_services_services" USING btree ("image_id");
  CREATE INDEX "_pages_v_blocks_services_services_button_button_page_idx" ON "_pages_v_blocks_services_services" USING btree ("button_page_id");
  CREATE INDEX "_pages_v_blocks_services_order_idx" ON "_pages_v_blocks_services" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_services_parent_id_idx" ON "_pages_v_blocks_services" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_services_path_idx" ON "_pages_v_blocks_services" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_about_badges_order_idx" ON "_pages_v_blocks_about_badges" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_about_badges_parent_id_idx" ON "_pages_v_blocks_about_badges" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_about_stats_order_idx" ON "_pages_v_blocks_about_stats" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_about_stats_parent_id_idx" ON "_pages_v_blocks_about_stats" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_about_process_order_idx" ON "_pages_v_blocks_about_process" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_about_process_parent_id_idx" ON "_pages_v_blocks_about_process" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_about_order_idx" ON "_pages_v_blocks_about" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_about_parent_id_idx" ON "_pages_v_blocks_about" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_about_path_idx" ON "_pages_v_blocks_about" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_about_image_idx" ON "_pages_v_blocks_about" USING btree ("image_id");
  CREATE INDEX "_pages_v_blocks_about_button_button_page_idx" ON "_pages_v_blocks_about" USING btree ("button_page_id");
  CREATE INDEX "_pages_v_blocks_why_trust_reasons_order_idx" ON "_pages_v_blocks_why_trust_reasons" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_why_trust_reasons_parent_id_idx" ON "_pages_v_blocks_why_trust_reasons" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_why_trust_pillars_order_idx" ON "_pages_v_blocks_why_trust_pillars" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_why_trust_pillars_parent_id_idx" ON "_pages_v_blocks_why_trust_pillars" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_why_trust_order_idx" ON "_pages_v_blocks_why_trust" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_why_trust_parent_id_idx" ON "_pages_v_blocks_why_trust" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_why_trust_path_idx" ON "_pages_v_blocks_why_trust" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_why_trust_image_idx" ON "_pages_v_blocks_why_trust" USING btree ("image_id");
  CREATE INDEX "_pages_v_blocks_why_trust_button_button_page_idx" ON "_pages_v_blocks_why_trust" USING btree ("button_page_id");
  CREATE INDEX "_pages_v_blocks_projects_projects_stack_order_idx" ON "_pages_v_blocks_projects_projects_stack" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_projects_projects_stack_parent_id_idx" ON "_pages_v_blocks_projects_projects_stack" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_projects_projects_order_idx" ON "_pages_v_blocks_projects_projects" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_projects_projects_parent_id_idx" ON "_pages_v_blocks_projects_projects" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_projects_projects_image_idx" ON "_pages_v_blocks_projects_projects" USING btree ("image_id");
  CREATE INDEX "_pages_v_blocks_projects_order_idx" ON "_pages_v_blocks_projects" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_projects_parent_id_idx" ON "_pages_v_blocks_projects" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_projects_path_idx" ON "_pages_v_blocks_projects" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_projects_button_button_page_idx" ON "_pages_v_blocks_projects" USING btree ("button_page_id");
  CREATE INDEX "_pages_v_blocks_contact_order_idx" ON "_pages_v_blocks_contact" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_contact_parent_id_idx" ON "_pages_v_blocks_contact" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_contact_path_idx" ON "_pages_v_blocks_contact" USING btree ("_path");
  DROP TYPE "public"."enum_homepage_hero_cta_buttons_type";
  DROP TYPE "public"."enum_homepage_hero_cta_buttons_style";
  DROP TYPE "public"."enum_homepage_quick_links_links_type";
  DROP TYPE "public"."enum_homepage_featured_posts_display_type";`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_homepage_hero_cta_buttons_type" AS ENUM('page', 'url', 'blog');
  CREATE TYPE "public"."enum_homepage_hero_cta_buttons_style" AS ENUM('primary', 'secondary', 'outline');
  CREATE TYPE "public"."enum_homepage_quick_links_links_type" AS ENUM('page', 'url', 'blog', 'categories');
  CREATE TYPE "public"."enum_homepage_featured_posts_display_type" AS ENUM('latest', 'featured', 'manual');
  CREATE TABLE "homepage_hero_cta_buttons" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar NOT NULL,
  	"type" "enum_homepage_hero_cta_buttons_type" DEFAULT 'page' NOT NULL,
  	"page_id" integer,
  	"url" varchar,
  	"style" "enum_homepage_hero_cta_buttons_style" DEFAULT 'primary'
  );
  
  CREATE TABLE "homepage_quick_links_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"description" varchar,
  	"icon" varchar,
  	"type" "enum_homepage_quick_links_links_type" DEFAULT 'page',
  	"page_id" integer,
  	"url" varchar
  );
  
  CREATE TABLE "homepage" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"hero_title" varchar DEFAULT 'Welcome to My Website' NOT NULL,
  	"hero_subtitle" varchar,
  	"hero_background_image_id" integer,
  	"featured_posts_enabled" boolean DEFAULT true,
  	"featured_posts_title" varchar DEFAULT 'Latest Posts',
  	"featured_posts_description" varchar,
  	"featured_posts_display_type" "enum_homepage_featured_posts_display_type" DEFAULT 'latest',
  	"featured_posts_number_of_posts" numeric DEFAULT 6,
  	"featured_pages_enabled" boolean DEFAULT false,
  	"featured_pages_title" varchar DEFAULT 'Explore Our Pages',
  	"quick_links_enabled" boolean DEFAULT true,
  	"quick_links_title" varchar DEFAULT 'Quick Links',
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "homepage_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"posts_id" integer,
  	"pages_id" integer
  );
  
  DROP TABLE "pages_blocks_hero_cta_buttons" CASCADE;
  DROP TABLE "pages_blocks_hero" CASCADE;
  DROP TABLE "pages_blocks_logo_belt_logos" CASCADE;
  DROP TABLE "pages_blocks_logo_belt" CASCADE;
  DROP TABLE "pages_blocks_services_services_features" CASCADE;
  DROP TABLE "pages_blocks_services_services" CASCADE;
  DROP TABLE "pages_blocks_services" CASCADE;
  DROP TABLE "pages_blocks_about_badges" CASCADE;
  DROP TABLE "pages_blocks_about_stats" CASCADE;
  DROP TABLE "pages_blocks_about_process" CASCADE;
  DROP TABLE "pages_blocks_about" CASCADE;
  DROP TABLE "pages_blocks_why_trust_reasons" CASCADE;
  DROP TABLE "pages_blocks_why_trust_pillars" CASCADE;
  DROP TABLE "pages_blocks_why_trust" CASCADE;
  DROP TABLE "pages_blocks_projects_projects_stack" CASCADE;
  DROP TABLE "pages_blocks_projects_projects" CASCADE;
  DROP TABLE "pages_blocks_projects" CASCADE;
  DROP TABLE "pages_blocks_contact" CASCADE;
  DROP TABLE "_pages_v_blocks_hero_cta_buttons" CASCADE;
  DROP TABLE "_pages_v_blocks_hero" CASCADE;
  DROP TABLE "_pages_v_blocks_logo_belt_logos" CASCADE;
  DROP TABLE "_pages_v_blocks_logo_belt" CASCADE;
  DROP TABLE "_pages_v_blocks_services_services_features" CASCADE;
  DROP TABLE "_pages_v_blocks_services_services" CASCADE;
  DROP TABLE "_pages_v_blocks_services" CASCADE;
  DROP TABLE "_pages_v_blocks_about_badges" CASCADE;
  DROP TABLE "_pages_v_blocks_about_stats" CASCADE;
  DROP TABLE "_pages_v_blocks_about_process" CASCADE;
  DROP TABLE "_pages_v_blocks_about" CASCADE;
  DROP TABLE "_pages_v_blocks_why_trust_reasons" CASCADE;
  DROP TABLE "_pages_v_blocks_why_trust_pillars" CASCADE;
  DROP TABLE "_pages_v_blocks_why_trust" CASCADE;
  DROP TABLE "_pages_v_blocks_projects_projects_stack" CASCADE;
  DROP TABLE "_pages_v_blocks_projects_projects" CASCADE;
  DROP TABLE "_pages_v_blocks_projects" CASCADE;
  DROP TABLE "_pages_v_blocks_contact" CASCADE;
  ALTER TABLE "homepage_hero_cta_buttons" ADD CONSTRAINT "homepage_hero_cta_buttons_page_id_pages_id_fk" FOREIGN KEY ("page_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "homepage_hero_cta_buttons" ADD CONSTRAINT "homepage_hero_cta_buttons_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."homepage"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "homepage_quick_links_links" ADD CONSTRAINT "homepage_quick_links_links_page_id_pages_id_fk" FOREIGN KEY ("page_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "homepage_quick_links_links" ADD CONSTRAINT "homepage_quick_links_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."homepage"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "homepage" ADD CONSTRAINT "homepage_hero_background_image_id_media_id_fk" FOREIGN KEY ("hero_background_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "homepage_rels" ADD CONSTRAINT "homepage_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."homepage"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "homepage_rels" ADD CONSTRAINT "homepage_rels_posts_fk" FOREIGN KEY ("posts_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "homepage_rels" ADD CONSTRAINT "homepage_rels_pages_fk" FOREIGN KEY ("pages_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "homepage_hero_cta_buttons_order_idx" ON "homepage_hero_cta_buttons" USING btree ("_order");
  CREATE INDEX "homepage_hero_cta_buttons_parent_id_idx" ON "homepage_hero_cta_buttons" USING btree ("_parent_id");
  CREATE INDEX "homepage_hero_cta_buttons_page_idx" ON "homepage_hero_cta_buttons" USING btree ("page_id");
  CREATE INDEX "homepage_quick_links_links_order_idx" ON "homepage_quick_links_links" USING btree ("_order");
  CREATE INDEX "homepage_quick_links_links_parent_id_idx" ON "homepage_quick_links_links" USING btree ("_parent_id");
  CREATE INDEX "homepage_quick_links_links_page_idx" ON "homepage_quick_links_links" USING btree ("page_id");
  CREATE INDEX "homepage_hero_hero_background_image_idx" ON "homepage" USING btree ("hero_background_image_id");
  CREATE INDEX "homepage_rels_order_idx" ON "homepage_rels" USING btree ("order");
  CREATE INDEX "homepage_rels_parent_idx" ON "homepage_rels" USING btree ("parent_id");
  CREATE INDEX "homepage_rels_path_idx" ON "homepage_rels" USING btree ("path");
  CREATE INDEX "homepage_rels_posts_id_idx" ON "homepage_rels" USING btree ("posts_id");
  CREATE INDEX "homepage_rels_pages_id_idx" ON "homepage_rels" USING btree ("pages_id");
  DROP TYPE "public"."enum_pages_blocks_hero_cta_buttons_type";
  DROP TYPE "public"."enum_pages_blocks_hero_cta_buttons_variant";
  DROP TYPE "public"."enum_pages_blocks_services_services_button_type";
  DROP TYPE "public"."enum_pages_blocks_about_button_type";
  DROP TYPE "public"."enum_pages_blocks_why_trust_pillars_icon";
  DROP TYPE "public"."enum_pages_blocks_why_trust_button_type";
  DROP TYPE "public"."enum_pages_blocks_projects_button_type";
  DROP TYPE "public"."enum__pages_v_blocks_hero_cta_buttons_type";
  DROP TYPE "public"."enum__pages_v_blocks_hero_cta_buttons_variant";
  DROP TYPE "public"."enum__pages_v_blocks_services_services_button_type";
  DROP TYPE "public"."enum__pages_v_blocks_about_button_type";
  DROP TYPE "public"."enum__pages_v_blocks_why_trust_pillars_icon";
  DROP TYPE "public"."enum__pages_v_blocks_why_trust_button_type";
  DROP TYPE "public"."enum__pages_v_blocks_projects_button_type";`)
}
