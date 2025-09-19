import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-vercel-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."_locales" AS ENUM('sl', 'en', 'de', 'hr');
  CREATE TYPE "public"."enum__pages_v_published_locale" AS ENUM('sl', 'en', 'de', 'hr');
  CREATE TYPE "public"."enum__posts_v_published_locale" AS ENUM('sl', 'en', 'de', 'hr');
  CREATE TYPE "public"."enum_contact_submissions_emails_sent_type" AS ENUM('auto-reply', 'admin-notification', 'follow-up', 'response');
  CREATE TYPE "public"."enum_contact_submissions_status" AS ENUM('new', 'in-progress', 'responded', 'closed', 'spam');
  CREATE TYPE "public"."enum_contact_submissions_priority" AS ENUM('low', 'medium', 'high', 'urgent');
  CREATE TYPE "public"."enum_contact_submissions_source" AS ENUM('contact-form', 'product-cta', 'simple-contact', 'universal-contact');
  CREATE TABLE "pages_locales" (
  	"title" varchar,
  	"meta_title" varchar,
  	"meta_description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_pages_v_locales" (
  	"version_title" varchar,
  	"version_meta_title" varchar,
  	"version_meta_description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "posts_locales" (
  	"title" varchar,
  	"excerpt" varchar,
  	"content" jsonb,
  	"published" boolean DEFAULT false,
  	"meta_title" varchar,
  	"meta_description" varchar,
  	"meta_keywords" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_posts_v_locales" (
  	"version_title" varchar,
  	"version_excerpt" varchar,
  	"version_content" jsonb,
  	"version_published" boolean DEFAULT false,
  	"version_meta_title" varchar,
  	"version_meta_description" varchar,
  	"version_meta_keywords" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "categories_locales" (
  	"name" varchar NOT NULL,
  	"description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "contact_submissions_emails_sent" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"type" "enum_contact_submissions_emails_sent_type",
  	"sent_at" timestamp(3) with time zone,
  	"recipient" varchar,
  	"subject" varchar,
  	"success" boolean DEFAULT true
  );
  
  CREATE TABLE "contact_submissions" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"email" varchar NOT NULL,
  	"company" varchar,
  	"phone" varchar,
  	"subject" varchar NOT NULL,
  	"message" varchar NOT NULL,
  	"project_type" varchar,
  	"budget" varchar,
  	"urgency" varchar,
  	"application" varchar,
  	"status" "enum_contact_submissions_status" DEFAULT 'new' NOT NULL,
  	"priority" "enum_contact_submissions_priority" DEFAULT 'medium',
  	"assigned_to_id" integer,
  	"internal_notes" jsonb,
  	"follow_up_date" timestamp(3) with time zone,
  	"source" "enum_contact_submissions_source" DEFAULT 'contact-form',
  	"ip_address" varchar,
  	"user_agent" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "contact_submissions_texts" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer NOT NULL,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"text" varchar
  );
  
  CREATE TABLE "header_navigation_dropdown_items_locales" (
  	"label" varchar DEFAULT 'Dropdown Item',
  	"description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "header_navigation_locales" (
  	"label" varchar DEFAULT 'Navigation Item',
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "header_locales" (
  	"site_name" varchar DEFAULT 'My Website' NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "footer_footer_columns_links_locales" (
  	"label" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "footer_footer_columns_locales" (
  	"title" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "footer_locales" (
  	"copyright" varchar DEFAULT '© 2025 SINTEH PRO. Vse pravice pridržane.',
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "email_admin" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"email_settings_from_email" varchar DEFAULT 'noreply@sinteh.pro' NOT NULL,
  	"email_settings_from_name" varchar DEFAULT 'SINTEH PRO' NOT NULL,
  	"email_settings_contact_email" varchar DEFAULT 'info@sinteh.pro' NOT NULL,
  	"email_settings_reply_to_email" varchar DEFAULT 'info@sinteh.pro',
  	"email_settings_auto_reply_enabled" boolean DEFAULT true,
  	"email_settings_notification_enabled" boolean DEFAULT true,
  	"templates_customer_confirmation_subject" varchar DEFAULT 'Potrditev prejema povpraševanja - SINTEH PRO' NOT NULL,
  	"templates_customer_confirmation_heading" varchar DEFAULT 'Hvala za vaše povpraševanje!' NOT NULL,
  	"templates_customer_confirmation_message" jsonb,
  	"templates_customer_confirmation_response_time" varchar DEFAULT 'V 24 urah (delovni dnevi)',
  	"templates_admin_notification_subject" varchar DEFAULT 'Novo povpraševanje: {{subject}}' NOT NULL,
  	"templates_admin_notification_heading" varchar DEFAULT 'Novo povpraševanje s spletne strani' NOT NULL,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  DROP INDEX "categories_name_idx";
  ALTER TABLE "pages_blocks_hero_cta_buttons" ADD COLUMN "_locale" "_locales" NOT NULL;
  ALTER TABLE "pages_blocks_hero" ADD COLUMN "_locale" "_locales" NOT NULL;
  ALTER TABLE "pages_blocks_logo_belt_logos" ADD COLUMN "_locale" "_locales" NOT NULL;
  ALTER TABLE "pages_blocks_logo_belt" ADD COLUMN "_locale" "_locales" NOT NULL;
  ALTER TABLE "pages_blocks_services_services_features" ADD COLUMN "_locale" "_locales" NOT NULL;
  ALTER TABLE "pages_blocks_services_services" ADD COLUMN "_locale" "_locales" NOT NULL;
  ALTER TABLE "pages_blocks_services" ADD COLUMN "_locale" "_locales" NOT NULL;
  ALTER TABLE "pages_blocks_about_badges" ADD COLUMN "_locale" "_locales" NOT NULL;
  ALTER TABLE "pages_blocks_about_stats" ADD COLUMN "_locale" "_locales" NOT NULL;
  ALTER TABLE "pages_blocks_about_process" ADD COLUMN "_locale" "_locales" NOT NULL;
  ALTER TABLE "pages_blocks_about" ADD COLUMN "_locale" "_locales" NOT NULL;
  ALTER TABLE "pages_blocks_why_trust_reasons" ADD COLUMN "_locale" "_locales" NOT NULL;
  ALTER TABLE "pages_blocks_why_trust_pillars" ADD COLUMN "_locale" "_locales" NOT NULL;
  ALTER TABLE "pages_blocks_why_trust" ADD COLUMN "_locale" "_locales" NOT NULL;
  ALTER TABLE "pages_blocks_projects_projects_stack" ADD COLUMN "_locale" "_locales" NOT NULL;
  ALTER TABLE "pages_blocks_projects_projects" ADD COLUMN "_locale" "_locales" NOT NULL;
  ALTER TABLE "pages_blocks_projects" ADD COLUMN "_locale" "_locales" NOT NULL;
  ALTER TABLE "pages_blocks_contact" ADD COLUMN "_locale" "_locales" NOT NULL;
  ALTER TABLE "pages_blocks_rich_text" ADD COLUMN "_locale" "_locales" NOT NULL;
  ALTER TABLE "pages_blocks_product_hero_key_benefits" ADD COLUMN "_locale" "_locales" NOT NULL;
  ALTER TABLE "pages_blocks_product_hero_cta_buttons" ADD COLUMN "_locale" "_locales" NOT NULL;
  ALTER TABLE "pages_blocks_product_hero" ADD COLUMN "_locale" "_locales" NOT NULL;
  ALTER TABLE "pages_blocks_key_features_features" ADD COLUMN "_locale" "_locales" NOT NULL;
  ALTER TABLE "pages_blocks_key_features" ADD COLUMN "_locale" "_locales" NOT NULL;
  ALTER TABLE "pages_blocks_product_gallery_images" ADD COLUMN "_locale" "_locales" NOT NULL;
  ALTER TABLE "pages_blocks_product_gallery" ADD COLUMN "_locale" "_locales" NOT NULL;
  ALTER TABLE "pages_blocks_specifications_specifications_items" ADD COLUMN "_locale" "_locales" NOT NULL;
  ALTER TABLE "pages_blocks_specifications_specifications" ADD COLUMN "_locale" "_locales" NOT NULL;
  ALTER TABLE "pages_blocks_specifications_certification_badges" ADD COLUMN "_locale" "_locales" NOT NULL;
  ALTER TABLE "pages_blocks_specifications_additional_info_details" ADD COLUMN "_locale" "_locales" NOT NULL;
  ALTER TABLE "pages_blocks_specifications" ADD COLUMN "_locale" "_locales" NOT NULL;
  ALTER TABLE "pages_blocks_applications_applications_details" ADD COLUMN "_locale" "_locales" NOT NULL;
  ALTER TABLE "pages_blocks_applications_applications" ADD COLUMN "_locale" "_locales" NOT NULL;
  ALTER TABLE "pages_blocks_applications_stats" ADD COLUMN "_locale" "_locales" NOT NULL;
  ALTER TABLE "pages_blocks_applications_case_study_stats" ADD COLUMN "_locale" "_locales" NOT NULL;
  ALTER TABLE "pages_blocks_applications" ADD COLUMN "_locale" "_locales" NOT NULL;
  ALTER TABLE "pages_blocks_technical_overview_process_steps" ADD COLUMN "_locale" "_locales" NOT NULL;
  ALTER TABLE "pages_blocks_technical_overview_technical_benefits" ADD COLUMN "_locale" "_locales" NOT NULL;
  ALTER TABLE "pages_blocks_technical_overview" ADD COLUMN "_locale" "_locales" NOT NULL;
  ALTER TABLE "pages_blocks_benefits_comparison_benefits" ADD COLUMN "_locale" "_locales" NOT NULL;
  ALTER TABLE "pages_blocks_benefits_comparison_summary_cards" ADD COLUMN "_locale" "_locales" NOT NULL;
  ALTER TABLE "pages_blocks_benefits_comparison" ADD COLUMN "_locale" "_locales" NOT NULL;
  ALTER TABLE "pages_blocks_product_c_t_a_stats" ADD COLUMN "_locale" "_locales" NOT NULL;
  ALTER TABLE "pages_blocks_product_c_t_a_why_us_points" ADD COLUMN "_locale" "_locales" NOT NULL;
  ALTER TABLE "pages_blocks_product_c_t_a_application_options" ADD COLUMN "_locale" "_locales" NOT NULL;
  ALTER TABLE "pages_blocks_product_c_t_a" ADD COLUMN "_locale" "_locales" NOT NULL;
  ALTER TABLE "pages_blocks_product_resources_resources" ADD COLUMN "_locale" "_locales" NOT NULL;
  ALTER TABLE "pages_blocks_product_resources_quick_access_items" ADD COLUMN "_locale" "_locales" NOT NULL;
  ALTER TABLE "pages_blocks_product_resources" ADD COLUMN "_locale" "_locales" NOT NULL;
  ALTER TABLE "pages_blocks_contact_hero_quick_contact_methods" ADD COLUMN "_locale" "_locales" NOT NULL;
  ALTER TABLE "pages_blocks_contact_hero" ADD COLUMN "_locale" "_locales" NOT NULL;
  ALTER TABLE "pages_blocks_contact_form" ADD COLUMN "_locale" "_locales" NOT NULL;
  ALTER TABLE "pages_blocks_contact_info_contact_methods" ADD COLUMN "_locale" "_locales" NOT NULL;
  ALTER TABLE "pages_blocks_contact_info" ADD COLUMN "_locale" "_locales" NOT NULL;
  ALTER TABLE "pages_blocks_contact_location" ADD COLUMN "_locale" "_locales" NOT NULL;
  ALTER TABLE "pages_blocks_contact_f_a_q_faqs" ADD COLUMN "_locale" "_locales" NOT NULL;
  ALTER TABLE "pages_blocks_contact_f_a_q" ADD COLUMN "_locale" "_locales" NOT NULL;
  ALTER TABLE "pages_blocks_universal_hero_benefits" ADD COLUMN "_locale" "_locales" NOT NULL;
  ALTER TABLE "pages_blocks_universal_hero_trust_indicators" ADD COLUMN "_locale" "_locales" NOT NULL;
  ALTER TABLE "pages_blocks_universal_hero_stats" ADD COLUMN "_locale" "_locales" NOT NULL;
  ALTER TABLE "pages_blocks_universal_hero_contact_methods" ADD COLUMN "_locale" "_locales" NOT NULL;
  ALTER TABLE "pages_blocks_universal_hero" ADD COLUMN "_locale" "_locales" NOT NULL;
  ALTER TABLE "pages_blocks_universal_c_t_a_benefits" ADD COLUMN "_locale" "_locales" NOT NULL;
  ALTER TABLE "pages_blocks_universal_c_t_a_stats" ADD COLUMN "_locale" "_locales" NOT NULL;
  ALTER TABLE "pages_blocks_universal_c_t_a" ADD COLUMN "_locale" "_locales" NOT NULL;
  ALTER TABLE "pages_blocks_feature_grid_features_details" ADD COLUMN "_locale" "_locales" NOT NULL;
  ALTER TABLE "pages_blocks_feature_grid_features" ADD COLUMN "_locale" "_locales" NOT NULL;
  ALTER TABLE "pages_blocks_feature_grid" ADD COLUMN "_locale" "_locales" NOT NULL;
  ALTER TABLE "pages_blocks_content_grid_items_applications" ADD COLUMN "_locale" "_locales" NOT NULL;
  ALTER TABLE "pages_blocks_content_grid_items" ADD COLUMN "_locale" "_locales" NOT NULL;
  ALTER TABLE "pages_blocks_content_grid" ADD COLUMN "_locale" "_locales" NOT NULL;
  ALTER TABLE "pages_blocks_stats_section_stats" ADD COLUMN "_locale" "_locales" NOT NULL;
  ALTER TABLE "pages_blocks_stats_section" ADD COLUMN "_locale" "_locales" NOT NULL;
  ALTER TABLE "pages_blocks_process_steps_steps_details" ADD COLUMN "_locale" "_locales" NOT NULL;
  ALTER TABLE "pages_blocks_process_steps_steps" ADD COLUMN "_locale" "_locales" NOT NULL;
  ALTER TABLE "pages_blocks_process_steps" ADD COLUMN "_locale" "_locales" NOT NULL;
  ALTER TABLE "pages_blocks_content_cards_cards_tags" ADD COLUMN "_locale" "_locales" NOT NULL;
  ALTER TABLE "pages_blocks_content_cards_cards" ADD COLUMN "_locale" "_locales" NOT NULL;
  ALTER TABLE "pages_blocks_content_cards" ADD COLUMN "_locale" "_locales" NOT NULL;
  ALTER TABLE "pages_blocks_contact_section_benefits" ADD COLUMN "_locale" "_locales" NOT NULL;
  ALTER TABLE "pages_blocks_contact_section" ADD COLUMN "_locale" "_locales" NOT NULL;
  ALTER TABLE "pages_blocks_comparison_table_items" ADD COLUMN "_locale" "_locales" NOT NULL;
  ALTER TABLE "pages_blocks_comparison_table" ADD COLUMN "_locale" "_locales" NOT NULL;
  ALTER TABLE "pages_blocks_simple_page_breadcrumbs" ADD COLUMN "_locale" "_locales" NOT NULL;
  ALTER TABLE "pages_blocks_simple_page_links" ADD COLUMN "_locale" "_locales" NOT NULL;
  ALTER TABLE "pages_blocks_simple_page" ADD COLUMN "_locale" "_locales" NOT NULL;
  ALTER TABLE "pages_blocks_brand_showcase_brands" ADD COLUMN "_locale" "_locales" NOT NULL;
  ALTER TABLE "pages_blocks_brand_showcase" ADD COLUMN "_locale" "_locales" NOT NULL;
  ALTER TABLE "pages_blocks_technical_content_process_steps" ADD COLUMN "_locale" "_locales" NOT NULL;
  ALTER TABLE "pages_blocks_technical_content_specifications_items" ADD COLUMN "_locale" "_locales" NOT NULL;
  ALTER TABLE "pages_blocks_technical_content_specifications" ADD COLUMN "_locale" "_locales" NOT NULL;
  ALTER TABLE "pages_blocks_technical_content" ADD COLUMN "_locale" "_locales" NOT NULL;
  ALTER TABLE "pages_blocks_resource_gallery_resources" ADD COLUMN "_locale" "_locales" NOT NULL;
  ALTER TABLE "pages_blocks_resource_gallery_gallery_images" ADD COLUMN "_locale" "_locales" NOT NULL;
  ALTER TABLE "pages_blocks_resource_gallery" ADD COLUMN "_locale" "_locales" NOT NULL;
  ALTER TABLE "_pages_v_blocks_hero_cta_buttons" ADD COLUMN "_locale" "_locales" NOT NULL;
  ALTER TABLE "_pages_v_blocks_hero" ADD COLUMN "_locale" "_locales" NOT NULL;
  ALTER TABLE "_pages_v_blocks_logo_belt_logos" ADD COLUMN "_locale" "_locales" NOT NULL;
  ALTER TABLE "_pages_v_blocks_logo_belt" ADD COLUMN "_locale" "_locales" NOT NULL;
  ALTER TABLE "_pages_v_blocks_services_services_features" ADD COLUMN "_locale" "_locales" NOT NULL;
  ALTER TABLE "_pages_v_blocks_services_services" ADD COLUMN "_locale" "_locales" NOT NULL;
  ALTER TABLE "_pages_v_blocks_services" ADD COLUMN "_locale" "_locales" NOT NULL;
  ALTER TABLE "_pages_v_blocks_about_badges" ADD COLUMN "_locale" "_locales" NOT NULL;
  ALTER TABLE "_pages_v_blocks_about_stats" ADD COLUMN "_locale" "_locales" NOT NULL;
  ALTER TABLE "_pages_v_blocks_about_process" ADD COLUMN "_locale" "_locales" NOT NULL;
  ALTER TABLE "_pages_v_blocks_about" ADD COLUMN "_locale" "_locales" NOT NULL;
  ALTER TABLE "_pages_v_blocks_why_trust_reasons" ADD COLUMN "_locale" "_locales" NOT NULL;
  ALTER TABLE "_pages_v_blocks_why_trust_pillars" ADD COLUMN "_locale" "_locales" NOT NULL;
  ALTER TABLE "_pages_v_blocks_why_trust" ADD COLUMN "_locale" "_locales" NOT NULL;
  ALTER TABLE "_pages_v_blocks_projects_projects_stack" ADD COLUMN "_locale" "_locales" NOT NULL;
  ALTER TABLE "_pages_v_blocks_projects_projects" ADD COLUMN "_locale" "_locales" NOT NULL;
  ALTER TABLE "_pages_v_blocks_projects" ADD COLUMN "_locale" "_locales" NOT NULL;
  ALTER TABLE "_pages_v_blocks_contact" ADD COLUMN "_locale" "_locales" NOT NULL;
  ALTER TABLE "_pages_v_blocks_rich_text" ADD COLUMN "_locale" "_locales" NOT NULL;
  ALTER TABLE "_pages_v_blocks_product_hero_key_benefits" ADD COLUMN "_locale" "_locales" NOT NULL;
  ALTER TABLE "_pages_v_blocks_product_hero_cta_buttons" ADD COLUMN "_locale" "_locales" NOT NULL;
  ALTER TABLE "_pages_v_blocks_product_hero" ADD COLUMN "_locale" "_locales" NOT NULL;
  ALTER TABLE "_pages_v_blocks_key_features_features" ADD COLUMN "_locale" "_locales" NOT NULL;
  ALTER TABLE "_pages_v_blocks_key_features" ADD COLUMN "_locale" "_locales" NOT NULL;
  ALTER TABLE "_pages_v_blocks_product_gallery_images" ADD COLUMN "_locale" "_locales" NOT NULL;
  ALTER TABLE "_pages_v_blocks_product_gallery" ADD COLUMN "_locale" "_locales" NOT NULL;
  ALTER TABLE "_pages_v_blocks_specifications_specifications_items" ADD COLUMN "_locale" "_locales" NOT NULL;
  ALTER TABLE "_pages_v_blocks_specifications_specifications" ADD COLUMN "_locale" "_locales" NOT NULL;
  ALTER TABLE "_pages_v_blocks_specifications_certification_badges" ADD COLUMN "_locale" "_locales" NOT NULL;
  ALTER TABLE "_pages_v_blocks_specifications_additional_info_details" ADD COLUMN "_locale" "_locales" NOT NULL;
  ALTER TABLE "_pages_v_blocks_specifications" ADD COLUMN "_locale" "_locales" NOT NULL;
  ALTER TABLE "_pages_v_blocks_applications_applications_details" ADD COLUMN "_locale" "_locales" NOT NULL;
  ALTER TABLE "_pages_v_blocks_applications_applications" ADD COLUMN "_locale" "_locales" NOT NULL;
  ALTER TABLE "_pages_v_blocks_applications_stats" ADD COLUMN "_locale" "_locales" NOT NULL;
  ALTER TABLE "_pages_v_blocks_applications_case_study_stats" ADD COLUMN "_locale" "_locales" NOT NULL;
  ALTER TABLE "_pages_v_blocks_applications" ADD COLUMN "_locale" "_locales" NOT NULL;
  ALTER TABLE "_pages_v_blocks_technical_overview_process_steps" ADD COLUMN "_locale" "_locales" NOT NULL;
  ALTER TABLE "_pages_v_blocks_technical_overview_technical_benefits" ADD COLUMN "_locale" "_locales" NOT NULL;
  ALTER TABLE "_pages_v_blocks_technical_overview" ADD COLUMN "_locale" "_locales" NOT NULL;
  ALTER TABLE "_pages_v_blocks_benefits_comparison_benefits" ADD COLUMN "_locale" "_locales" NOT NULL;
  ALTER TABLE "_pages_v_blocks_benefits_comparison_summary_cards" ADD COLUMN "_locale" "_locales" NOT NULL;
  ALTER TABLE "_pages_v_blocks_benefits_comparison" ADD COLUMN "_locale" "_locales" NOT NULL;
  ALTER TABLE "_pages_v_blocks_product_c_t_a_stats" ADD COLUMN "_locale" "_locales" NOT NULL;
  ALTER TABLE "_pages_v_blocks_product_c_t_a_why_us_points" ADD COLUMN "_locale" "_locales" NOT NULL;
  ALTER TABLE "_pages_v_blocks_product_c_t_a_application_options" ADD COLUMN "_locale" "_locales" NOT NULL;
  ALTER TABLE "_pages_v_blocks_product_c_t_a" ADD COLUMN "_locale" "_locales" NOT NULL;
  ALTER TABLE "_pages_v_blocks_product_resources_resources" ADD COLUMN "_locale" "_locales" NOT NULL;
  ALTER TABLE "_pages_v_blocks_product_resources_quick_access_items" ADD COLUMN "_locale" "_locales" NOT NULL;
  ALTER TABLE "_pages_v_blocks_product_resources" ADD COLUMN "_locale" "_locales" NOT NULL;
  ALTER TABLE "_pages_v_blocks_contact_hero_quick_contact_methods" ADD COLUMN "_locale" "_locales" NOT NULL;
  ALTER TABLE "_pages_v_blocks_contact_hero" ADD COLUMN "_locale" "_locales" NOT NULL;
  ALTER TABLE "_pages_v_blocks_contact_form" ADD COLUMN "_locale" "_locales" NOT NULL;
  ALTER TABLE "_pages_v_blocks_contact_info_contact_methods" ADD COLUMN "_locale" "_locales" NOT NULL;
  ALTER TABLE "_pages_v_blocks_contact_info" ADD COLUMN "_locale" "_locales" NOT NULL;
  ALTER TABLE "_pages_v_blocks_contact_location" ADD COLUMN "_locale" "_locales" NOT NULL;
  ALTER TABLE "_pages_v_blocks_contact_f_a_q_faqs" ADD COLUMN "_locale" "_locales" NOT NULL;
  ALTER TABLE "_pages_v_blocks_contact_f_a_q" ADD COLUMN "_locale" "_locales" NOT NULL;
  ALTER TABLE "_pages_v_blocks_universal_hero_benefits" ADD COLUMN "_locale" "_locales" NOT NULL;
  ALTER TABLE "_pages_v_blocks_universal_hero_trust_indicators" ADD COLUMN "_locale" "_locales" NOT NULL;
  ALTER TABLE "_pages_v_blocks_universal_hero_stats" ADD COLUMN "_locale" "_locales" NOT NULL;
  ALTER TABLE "_pages_v_blocks_universal_hero_contact_methods" ADD COLUMN "_locale" "_locales" NOT NULL;
  ALTER TABLE "_pages_v_blocks_universal_hero" ADD COLUMN "_locale" "_locales" NOT NULL;
  ALTER TABLE "_pages_v_blocks_universal_c_t_a_benefits" ADD COLUMN "_locale" "_locales" NOT NULL;
  ALTER TABLE "_pages_v_blocks_universal_c_t_a_stats" ADD COLUMN "_locale" "_locales" NOT NULL;
  ALTER TABLE "_pages_v_blocks_universal_c_t_a" ADD COLUMN "_locale" "_locales" NOT NULL;
  ALTER TABLE "_pages_v_blocks_feature_grid_features_details" ADD COLUMN "_locale" "_locales" NOT NULL;
  ALTER TABLE "_pages_v_blocks_feature_grid_features" ADD COLUMN "_locale" "_locales" NOT NULL;
  ALTER TABLE "_pages_v_blocks_feature_grid" ADD COLUMN "_locale" "_locales" NOT NULL;
  ALTER TABLE "_pages_v_blocks_content_grid_items_applications" ADD COLUMN "_locale" "_locales" NOT NULL;
  ALTER TABLE "_pages_v_blocks_content_grid_items" ADD COLUMN "_locale" "_locales" NOT NULL;
  ALTER TABLE "_pages_v_blocks_content_grid" ADD COLUMN "_locale" "_locales" NOT NULL;
  ALTER TABLE "_pages_v_blocks_stats_section_stats" ADD COLUMN "_locale" "_locales" NOT NULL;
  ALTER TABLE "_pages_v_blocks_stats_section" ADD COLUMN "_locale" "_locales" NOT NULL;
  ALTER TABLE "_pages_v_blocks_process_steps_steps_details" ADD COLUMN "_locale" "_locales" NOT NULL;
  ALTER TABLE "_pages_v_blocks_process_steps_steps" ADD COLUMN "_locale" "_locales" NOT NULL;
  ALTER TABLE "_pages_v_blocks_process_steps" ADD COLUMN "_locale" "_locales" NOT NULL;
  ALTER TABLE "_pages_v_blocks_content_cards_cards_tags" ADD COLUMN "_locale" "_locales" NOT NULL;
  ALTER TABLE "_pages_v_blocks_content_cards_cards" ADD COLUMN "_locale" "_locales" NOT NULL;
  ALTER TABLE "_pages_v_blocks_content_cards" ADD COLUMN "_locale" "_locales" NOT NULL;
  ALTER TABLE "_pages_v_blocks_contact_section_benefits" ADD COLUMN "_locale" "_locales" NOT NULL;
  ALTER TABLE "_pages_v_blocks_contact_section" ADD COLUMN "_locale" "_locales" NOT NULL;
  ALTER TABLE "_pages_v_blocks_comparison_table_items" ADD COLUMN "_locale" "_locales" NOT NULL;
  ALTER TABLE "_pages_v_blocks_comparison_table" ADD COLUMN "_locale" "_locales" NOT NULL;
  ALTER TABLE "_pages_v_blocks_simple_page_breadcrumbs" ADD COLUMN "_locale" "_locales" NOT NULL;
  ALTER TABLE "_pages_v_blocks_simple_page_links" ADD COLUMN "_locale" "_locales" NOT NULL;
  ALTER TABLE "_pages_v_blocks_simple_page" ADD COLUMN "_locale" "_locales" NOT NULL;
  ALTER TABLE "_pages_v_blocks_brand_showcase_brands" ADD COLUMN "_locale" "_locales" NOT NULL;
  ALTER TABLE "_pages_v_blocks_brand_showcase" ADD COLUMN "_locale" "_locales" NOT NULL;
  ALTER TABLE "_pages_v_blocks_technical_content_process_steps" ADD COLUMN "_locale" "_locales" NOT NULL;
  ALTER TABLE "_pages_v_blocks_technical_content_specifications_items" ADD COLUMN "_locale" "_locales" NOT NULL;
  ALTER TABLE "_pages_v_blocks_technical_content_specifications" ADD COLUMN "_locale" "_locales" NOT NULL;
  ALTER TABLE "_pages_v_blocks_technical_content" ADD COLUMN "_locale" "_locales" NOT NULL;
  ALTER TABLE "_pages_v_blocks_resource_gallery_resources" ADD COLUMN "_locale" "_locales" NOT NULL;
  ALTER TABLE "_pages_v_blocks_resource_gallery_gallery_images" ADD COLUMN "_locale" "_locales" NOT NULL;
  ALTER TABLE "_pages_v_blocks_resource_gallery" ADD COLUMN "_locale" "_locales" NOT NULL;
  ALTER TABLE "_pages_v" ADD COLUMN "snapshot" boolean;
  ALTER TABLE "_pages_v" ADD COLUMN "published_locale" "enum__pages_v_published_locale";
  ALTER TABLE "_posts_v" ADD COLUMN "snapshot" boolean;
  ALTER TABLE "_posts_v" ADD COLUMN "published_locale" "enum__posts_v_published_locale";
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "contact_submissions_id" integer;
  ALTER TABLE "homepage_blocks_hero_cta_buttons" ADD COLUMN "_locale" "_locales" NOT NULL;
  ALTER TABLE "homepage_blocks_hero" ADD COLUMN "_locale" "_locales" NOT NULL;
  ALTER TABLE "homepage_blocks_logo_belt_logos" ADD COLUMN "_locale" "_locales" NOT NULL;
  ALTER TABLE "homepage_blocks_logo_belt" ADD COLUMN "_locale" "_locales" NOT NULL;
  ALTER TABLE "homepage_blocks_services_services_features" ADD COLUMN "_locale" "_locales" NOT NULL;
  ALTER TABLE "homepage_blocks_services_services" ADD COLUMN "_locale" "_locales" NOT NULL;
  ALTER TABLE "homepage_blocks_services" ADD COLUMN "_locale" "_locales" NOT NULL;
  ALTER TABLE "homepage_blocks_about_badges" ADD COLUMN "_locale" "_locales" NOT NULL;
  ALTER TABLE "homepage_blocks_about_stats" ADD COLUMN "_locale" "_locales" NOT NULL;
  ALTER TABLE "homepage_blocks_about_process" ADD COLUMN "_locale" "_locales" NOT NULL;
  ALTER TABLE "homepage_blocks_about" ADD COLUMN "_locale" "_locales" NOT NULL;
  ALTER TABLE "homepage_blocks_why_trust_reasons" ADD COLUMN "_locale" "_locales" NOT NULL;
  ALTER TABLE "homepage_blocks_why_trust_pillars" ADD COLUMN "_locale" "_locales" NOT NULL;
  ALTER TABLE "homepage_blocks_why_trust" ADD COLUMN "_locale" "_locales" NOT NULL;
  ALTER TABLE "homepage_blocks_projects_projects_stack" ADD COLUMN "_locale" "_locales" NOT NULL;
  ALTER TABLE "homepage_blocks_projects_projects" ADD COLUMN "_locale" "_locales" NOT NULL;
  ALTER TABLE "homepage_blocks_projects" ADD COLUMN "_locale" "_locales" NOT NULL;
  ALTER TABLE "homepage_blocks_contact" ADD COLUMN "_locale" "_locales" NOT NULL;
  ALTER TABLE "pages_locales" ADD CONSTRAINT "pages_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_locales" ADD CONSTRAINT "_pages_v_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "posts_locales" ADD CONSTRAINT "posts_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_posts_v_locales" ADD CONSTRAINT "_posts_v_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_posts_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "categories_locales" ADD CONSTRAINT "categories_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."categories"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "contact_submissions_emails_sent" ADD CONSTRAINT "contact_submissions_emails_sent_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."contact_submissions"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "contact_submissions" ADD CONSTRAINT "contact_submissions_assigned_to_id_users_id_fk" FOREIGN KEY ("assigned_to_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "contact_submissions_texts" ADD CONSTRAINT "contact_submissions_texts_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."contact_submissions"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "header_navigation_dropdown_items_locales" ADD CONSTRAINT "header_navigation_dropdown_items_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."header_navigation_dropdown_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "header_navigation_locales" ADD CONSTRAINT "header_navigation_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."header_navigation"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "header_locales" ADD CONSTRAINT "header_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."header"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "footer_footer_columns_links_locales" ADD CONSTRAINT "footer_footer_columns_links_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."footer_footer_columns_links"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "footer_footer_columns_locales" ADD CONSTRAINT "footer_footer_columns_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."footer_footer_columns"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "footer_locales" ADD CONSTRAINT "footer_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."footer"("id") ON DELETE cascade ON UPDATE no action;
  CREATE UNIQUE INDEX "pages_locales_locale_parent_id_unique" ON "pages_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "_pages_v_locales_locale_parent_id_unique" ON "_pages_v_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "posts_locales_locale_parent_id_unique" ON "posts_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "_posts_v_locales_locale_parent_id_unique" ON "_posts_v_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "categories_name_idx" ON "categories_locales" USING btree ("name","_locale");
  CREATE UNIQUE INDEX "categories_locales_locale_parent_id_unique" ON "categories_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "contact_submissions_emails_sent_order_idx" ON "contact_submissions_emails_sent" USING btree ("_order");
  CREATE INDEX "contact_submissions_emails_sent_parent_id_idx" ON "contact_submissions_emails_sent" USING btree ("_parent_id");
  CREATE INDEX "contact_submissions_assigned_to_idx" ON "contact_submissions" USING btree ("assigned_to_id");
  CREATE INDEX "contact_submissions_updated_at_idx" ON "contact_submissions" USING btree ("updated_at");
  CREATE INDEX "contact_submissions_created_at_idx" ON "contact_submissions" USING btree ("created_at");
  CREATE INDEX "contact_submissions_texts_order_parent_idx" ON "contact_submissions_texts" USING btree ("order","parent_id");
  CREATE UNIQUE INDEX "header_navigation_dropdown_items_locales_locale_parent_id_unique" ON "header_navigation_dropdown_items_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "header_navigation_locales_locale_parent_id_unique" ON "header_navigation_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "header_locales_locale_parent_id_unique" ON "header_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "footer_footer_columns_links_locales_locale_parent_id_unique" ON "footer_footer_columns_links_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "footer_footer_columns_locales_locale_parent_id_unique" ON "footer_footer_columns_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "footer_locales_locale_parent_id_unique" ON "footer_locales" USING btree ("_locale","_parent_id");
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_contact_submissions_fk" FOREIGN KEY ("contact_submissions_id") REFERENCES "public"."contact_submissions"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "pages_blocks_hero_cta_buttons_locale_idx" ON "pages_blocks_hero_cta_buttons" USING btree ("_locale");
  CREATE INDEX "pages_blocks_hero_locale_idx" ON "pages_blocks_hero" USING btree ("_locale");
  CREATE INDEX "pages_blocks_logo_belt_logos_locale_idx" ON "pages_blocks_logo_belt_logos" USING btree ("_locale");
  CREATE INDEX "pages_blocks_logo_belt_locale_idx" ON "pages_blocks_logo_belt" USING btree ("_locale");
  CREATE INDEX "pages_blocks_services_services_features_locale_idx" ON "pages_blocks_services_services_features" USING btree ("_locale");
  CREATE INDEX "pages_blocks_services_services_locale_idx" ON "pages_blocks_services_services" USING btree ("_locale");
  CREATE INDEX "pages_blocks_services_locale_idx" ON "pages_blocks_services" USING btree ("_locale");
  CREATE INDEX "pages_blocks_about_badges_locale_idx" ON "pages_blocks_about_badges" USING btree ("_locale");
  CREATE INDEX "pages_blocks_about_stats_locale_idx" ON "pages_blocks_about_stats" USING btree ("_locale");
  CREATE INDEX "pages_blocks_about_process_locale_idx" ON "pages_blocks_about_process" USING btree ("_locale");
  CREATE INDEX "pages_blocks_about_locale_idx" ON "pages_blocks_about" USING btree ("_locale");
  CREATE INDEX "pages_blocks_why_trust_reasons_locale_idx" ON "pages_blocks_why_trust_reasons" USING btree ("_locale");
  CREATE INDEX "pages_blocks_why_trust_pillars_locale_idx" ON "pages_blocks_why_trust_pillars" USING btree ("_locale");
  CREATE INDEX "pages_blocks_why_trust_locale_idx" ON "pages_blocks_why_trust" USING btree ("_locale");
  CREATE INDEX "pages_blocks_projects_projects_stack_locale_idx" ON "pages_blocks_projects_projects_stack" USING btree ("_locale");
  CREATE INDEX "pages_blocks_projects_projects_locale_idx" ON "pages_blocks_projects_projects" USING btree ("_locale");
  CREATE INDEX "pages_blocks_projects_locale_idx" ON "pages_blocks_projects" USING btree ("_locale");
  CREATE INDEX "pages_blocks_contact_locale_idx" ON "pages_blocks_contact" USING btree ("_locale");
  CREATE INDEX "pages_blocks_rich_text_locale_idx" ON "pages_blocks_rich_text" USING btree ("_locale");
  CREATE INDEX "pages_blocks_product_hero_key_benefits_locale_idx" ON "pages_blocks_product_hero_key_benefits" USING btree ("_locale");
  CREATE INDEX "pages_blocks_product_hero_cta_buttons_locale_idx" ON "pages_blocks_product_hero_cta_buttons" USING btree ("_locale");
  CREATE INDEX "pages_blocks_product_hero_locale_idx" ON "pages_blocks_product_hero" USING btree ("_locale");
  CREATE INDEX "pages_blocks_key_features_features_locale_idx" ON "pages_blocks_key_features_features" USING btree ("_locale");
  CREATE INDEX "pages_blocks_key_features_locale_idx" ON "pages_blocks_key_features" USING btree ("_locale");
  CREATE INDEX "pages_blocks_product_gallery_images_locale_idx" ON "pages_blocks_product_gallery_images" USING btree ("_locale");
  CREATE INDEX "pages_blocks_product_gallery_locale_idx" ON "pages_blocks_product_gallery" USING btree ("_locale");
  CREATE INDEX "pages_blocks_specifications_specifications_items_locale_idx" ON "pages_blocks_specifications_specifications_items" USING btree ("_locale");
  CREATE INDEX "pages_blocks_specifications_specifications_locale_idx" ON "pages_blocks_specifications_specifications" USING btree ("_locale");
  CREATE INDEX "pages_blocks_specifications_certification_badges_locale_idx" ON "pages_blocks_specifications_certification_badges" USING btree ("_locale");
  CREATE INDEX "pages_blocks_specifications_additional_info_details_locale_idx" ON "pages_blocks_specifications_additional_info_details" USING btree ("_locale");
  CREATE INDEX "pages_blocks_specifications_locale_idx" ON "pages_blocks_specifications" USING btree ("_locale");
  CREATE INDEX "pages_blocks_applications_applications_details_locale_idx" ON "pages_blocks_applications_applications_details" USING btree ("_locale");
  CREATE INDEX "pages_blocks_applications_applications_locale_idx" ON "pages_blocks_applications_applications" USING btree ("_locale");
  CREATE INDEX "pages_blocks_applications_stats_locale_idx" ON "pages_blocks_applications_stats" USING btree ("_locale");
  CREATE INDEX "pages_blocks_applications_case_study_stats_locale_idx" ON "pages_blocks_applications_case_study_stats" USING btree ("_locale");
  CREATE INDEX "pages_blocks_applications_locale_idx" ON "pages_blocks_applications" USING btree ("_locale");
  CREATE INDEX "pages_blocks_technical_overview_process_steps_locale_idx" ON "pages_blocks_technical_overview_process_steps" USING btree ("_locale");
  CREATE INDEX "pages_blocks_technical_overview_technical_benefits_locale_idx" ON "pages_blocks_technical_overview_technical_benefits" USING btree ("_locale");
  CREATE INDEX "pages_blocks_technical_overview_locale_idx" ON "pages_blocks_technical_overview" USING btree ("_locale");
  CREATE INDEX "pages_blocks_benefits_comparison_benefits_locale_idx" ON "pages_blocks_benefits_comparison_benefits" USING btree ("_locale");
  CREATE INDEX "pages_blocks_benefits_comparison_summary_cards_locale_idx" ON "pages_blocks_benefits_comparison_summary_cards" USING btree ("_locale");
  CREATE INDEX "pages_blocks_benefits_comparison_locale_idx" ON "pages_blocks_benefits_comparison" USING btree ("_locale");
  CREATE INDEX "pages_blocks_product_c_t_a_stats_locale_idx" ON "pages_blocks_product_c_t_a_stats" USING btree ("_locale");
  CREATE INDEX "pages_blocks_product_c_t_a_why_us_points_locale_idx" ON "pages_blocks_product_c_t_a_why_us_points" USING btree ("_locale");
  CREATE INDEX "pages_blocks_product_c_t_a_application_options_locale_idx" ON "pages_blocks_product_c_t_a_application_options" USING btree ("_locale");
  CREATE INDEX "pages_blocks_product_c_t_a_locale_idx" ON "pages_blocks_product_c_t_a" USING btree ("_locale");
  CREATE INDEX "pages_blocks_product_resources_resources_locale_idx" ON "pages_blocks_product_resources_resources" USING btree ("_locale");
  CREATE INDEX "pages_blocks_product_resources_quick_access_items_locale_idx" ON "pages_blocks_product_resources_quick_access_items" USING btree ("_locale");
  CREATE INDEX "pages_blocks_product_resources_locale_idx" ON "pages_blocks_product_resources" USING btree ("_locale");
  CREATE INDEX "pages_blocks_contact_hero_quick_contact_methods_locale_idx" ON "pages_blocks_contact_hero_quick_contact_methods" USING btree ("_locale");
  CREATE INDEX "pages_blocks_contact_hero_locale_idx" ON "pages_blocks_contact_hero" USING btree ("_locale");
  CREATE INDEX "pages_blocks_contact_form_locale_idx" ON "pages_blocks_contact_form" USING btree ("_locale");
  CREATE INDEX "pages_blocks_contact_info_contact_methods_locale_idx" ON "pages_blocks_contact_info_contact_methods" USING btree ("_locale");
  CREATE INDEX "pages_blocks_contact_info_locale_idx" ON "pages_blocks_contact_info" USING btree ("_locale");
  CREATE INDEX "pages_blocks_contact_location_locale_idx" ON "pages_blocks_contact_location" USING btree ("_locale");
  CREATE INDEX "pages_blocks_contact_f_a_q_faqs_locale_idx" ON "pages_blocks_contact_f_a_q_faqs" USING btree ("_locale");
  CREATE INDEX "pages_blocks_contact_f_a_q_locale_idx" ON "pages_blocks_contact_f_a_q" USING btree ("_locale");
  CREATE INDEX "pages_blocks_universal_hero_benefits_locale_idx" ON "pages_blocks_universal_hero_benefits" USING btree ("_locale");
  CREATE INDEX "pages_blocks_universal_hero_trust_indicators_locale_idx" ON "pages_blocks_universal_hero_trust_indicators" USING btree ("_locale");
  CREATE INDEX "pages_blocks_universal_hero_stats_locale_idx" ON "pages_blocks_universal_hero_stats" USING btree ("_locale");
  CREATE INDEX "pages_blocks_universal_hero_contact_methods_locale_idx" ON "pages_blocks_universal_hero_contact_methods" USING btree ("_locale");
  CREATE INDEX "pages_blocks_universal_hero_locale_idx" ON "pages_blocks_universal_hero" USING btree ("_locale");
  CREATE INDEX "pages_blocks_universal_c_t_a_benefits_locale_idx" ON "pages_blocks_universal_c_t_a_benefits" USING btree ("_locale");
  CREATE INDEX "pages_blocks_universal_c_t_a_stats_locale_idx" ON "pages_blocks_universal_c_t_a_stats" USING btree ("_locale");
  CREATE INDEX "pages_blocks_universal_c_t_a_locale_idx" ON "pages_blocks_universal_c_t_a" USING btree ("_locale");
  CREATE INDEX "pages_blocks_feature_grid_features_details_locale_idx" ON "pages_blocks_feature_grid_features_details" USING btree ("_locale");
  CREATE INDEX "pages_blocks_feature_grid_features_locale_idx" ON "pages_blocks_feature_grid_features" USING btree ("_locale");
  CREATE INDEX "pages_blocks_feature_grid_locale_idx" ON "pages_blocks_feature_grid" USING btree ("_locale");
  CREATE INDEX "pages_blocks_content_grid_items_applications_locale_idx" ON "pages_blocks_content_grid_items_applications" USING btree ("_locale");
  CREATE INDEX "pages_blocks_content_grid_items_locale_idx" ON "pages_blocks_content_grid_items" USING btree ("_locale");
  CREATE INDEX "pages_blocks_content_grid_locale_idx" ON "pages_blocks_content_grid" USING btree ("_locale");
  CREATE INDEX "pages_blocks_stats_section_stats_locale_idx" ON "pages_blocks_stats_section_stats" USING btree ("_locale");
  CREATE INDEX "pages_blocks_stats_section_locale_idx" ON "pages_blocks_stats_section" USING btree ("_locale");
  CREATE INDEX "pages_blocks_process_steps_steps_details_locale_idx" ON "pages_blocks_process_steps_steps_details" USING btree ("_locale");
  CREATE INDEX "pages_blocks_process_steps_steps_locale_idx" ON "pages_blocks_process_steps_steps" USING btree ("_locale");
  CREATE INDEX "pages_blocks_process_steps_locale_idx" ON "pages_blocks_process_steps" USING btree ("_locale");
  CREATE INDEX "pages_blocks_content_cards_cards_tags_locale_idx" ON "pages_blocks_content_cards_cards_tags" USING btree ("_locale");
  CREATE INDEX "pages_blocks_content_cards_cards_locale_idx" ON "pages_blocks_content_cards_cards" USING btree ("_locale");
  CREATE INDEX "pages_blocks_content_cards_locale_idx" ON "pages_blocks_content_cards" USING btree ("_locale");
  CREATE INDEX "pages_blocks_contact_section_benefits_locale_idx" ON "pages_blocks_contact_section_benefits" USING btree ("_locale");
  CREATE INDEX "pages_blocks_contact_section_locale_idx" ON "pages_blocks_contact_section" USING btree ("_locale");
  CREATE INDEX "pages_blocks_comparison_table_items_locale_idx" ON "pages_blocks_comparison_table_items" USING btree ("_locale");
  CREATE INDEX "pages_blocks_comparison_table_locale_idx" ON "pages_blocks_comparison_table" USING btree ("_locale");
  CREATE INDEX "pages_blocks_simple_page_breadcrumbs_locale_idx" ON "pages_blocks_simple_page_breadcrumbs" USING btree ("_locale");
  CREATE INDEX "pages_blocks_simple_page_links_locale_idx" ON "pages_blocks_simple_page_links" USING btree ("_locale");
  CREATE INDEX "pages_blocks_simple_page_locale_idx" ON "pages_blocks_simple_page" USING btree ("_locale");
  CREATE INDEX "pages_blocks_brand_showcase_brands_locale_idx" ON "pages_blocks_brand_showcase_brands" USING btree ("_locale");
  CREATE INDEX "pages_blocks_brand_showcase_locale_idx" ON "pages_blocks_brand_showcase" USING btree ("_locale");
  CREATE INDEX "pages_blocks_technical_content_process_steps_locale_idx" ON "pages_blocks_technical_content_process_steps" USING btree ("_locale");
  CREATE INDEX "pages_blocks_technical_content_specifications_items_locale_idx" ON "pages_blocks_technical_content_specifications_items" USING btree ("_locale");
  CREATE INDEX "pages_blocks_technical_content_specifications_locale_idx" ON "pages_blocks_technical_content_specifications" USING btree ("_locale");
  CREATE INDEX "pages_blocks_technical_content_locale_idx" ON "pages_blocks_technical_content" USING btree ("_locale");
  CREATE INDEX "pages_blocks_resource_gallery_resources_locale_idx" ON "pages_blocks_resource_gallery_resources" USING btree ("_locale");
  CREATE INDEX "pages_blocks_resource_gallery_gallery_images_locale_idx" ON "pages_blocks_resource_gallery_gallery_images" USING btree ("_locale");
  CREATE INDEX "pages_blocks_resource_gallery_locale_idx" ON "pages_blocks_resource_gallery" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_hero_cta_buttons_locale_idx" ON "_pages_v_blocks_hero_cta_buttons" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_hero_locale_idx" ON "_pages_v_blocks_hero" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_logo_belt_logos_locale_idx" ON "_pages_v_blocks_logo_belt_logos" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_logo_belt_locale_idx" ON "_pages_v_blocks_logo_belt" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_services_services_features_locale_idx" ON "_pages_v_blocks_services_services_features" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_services_services_locale_idx" ON "_pages_v_blocks_services_services" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_services_locale_idx" ON "_pages_v_blocks_services" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_about_badges_locale_idx" ON "_pages_v_blocks_about_badges" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_about_stats_locale_idx" ON "_pages_v_blocks_about_stats" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_about_process_locale_idx" ON "_pages_v_blocks_about_process" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_about_locale_idx" ON "_pages_v_blocks_about" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_why_trust_reasons_locale_idx" ON "_pages_v_blocks_why_trust_reasons" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_why_trust_pillars_locale_idx" ON "_pages_v_blocks_why_trust_pillars" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_why_trust_locale_idx" ON "_pages_v_blocks_why_trust" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_projects_projects_stack_locale_idx" ON "_pages_v_blocks_projects_projects_stack" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_projects_projects_locale_idx" ON "_pages_v_blocks_projects_projects" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_projects_locale_idx" ON "_pages_v_blocks_projects" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_contact_locale_idx" ON "_pages_v_blocks_contact" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_rich_text_locale_idx" ON "_pages_v_blocks_rich_text" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_product_hero_key_benefits_locale_idx" ON "_pages_v_blocks_product_hero_key_benefits" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_product_hero_cta_buttons_locale_idx" ON "_pages_v_blocks_product_hero_cta_buttons" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_product_hero_locale_idx" ON "_pages_v_blocks_product_hero" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_key_features_features_locale_idx" ON "_pages_v_blocks_key_features_features" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_key_features_locale_idx" ON "_pages_v_blocks_key_features" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_product_gallery_images_locale_idx" ON "_pages_v_blocks_product_gallery_images" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_product_gallery_locale_idx" ON "_pages_v_blocks_product_gallery" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_specifications_specifications_items_locale_idx" ON "_pages_v_blocks_specifications_specifications_items" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_specifications_specifications_locale_idx" ON "_pages_v_blocks_specifications_specifications" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_specifications_certification_badges_locale_idx" ON "_pages_v_blocks_specifications_certification_badges" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_specifications_additional_info_details_locale_idx" ON "_pages_v_blocks_specifications_additional_info_details" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_specifications_locale_idx" ON "_pages_v_blocks_specifications" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_applications_applications_details_locale_idx" ON "_pages_v_blocks_applications_applications_details" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_applications_applications_locale_idx" ON "_pages_v_blocks_applications_applications" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_applications_stats_locale_idx" ON "_pages_v_blocks_applications_stats" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_applications_case_study_stats_locale_idx" ON "_pages_v_blocks_applications_case_study_stats" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_applications_locale_idx" ON "_pages_v_blocks_applications" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_technical_overview_process_steps_locale_idx" ON "_pages_v_blocks_technical_overview_process_steps" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_technical_overview_technical_benefits_locale_idx" ON "_pages_v_blocks_technical_overview_technical_benefits" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_technical_overview_locale_idx" ON "_pages_v_blocks_technical_overview" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_benefits_comparison_benefits_locale_idx" ON "_pages_v_blocks_benefits_comparison_benefits" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_benefits_comparison_summary_cards_locale_idx" ON "_pages_v_blocks_benefits_comparison_summary_cards" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_benefits_comparison_locale_idx" ON "_pages_v_blocks_benefits_comparison" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_product_c_t_a_stats_locale_idx" ON "_pages_v_blocks_product_c_t_a_stats" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_product_c_t_a_why_us_points_locale_idx" ON "_pages_v_blocks_product_c_t_a_why_us_points" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_product_c_t_a_application_options_locale_idx" ON "_pages_v_blocks_product_c_t_a_application_options" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_product_c_t_a_locale_idx" ON "_pages_v_blocks_product_c_t_a" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_product_resources_resources_locale_idx" ON "_pages_v_blocks_product_resources_resources" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_product_resources_quick_access_items_locale_idx" ON "_pages_v_blocks_product_resources_quick_access_items" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_product_resources_locale_idx" ON "_pages_v_blocks_product_resources" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_contact_hero_quick_contact_methods_locale_idx" ON "_pages_v_blocks_contact_hero_quick_contact_methods" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_contact_hero_locale_idx" ON "_pages_v_blocks_contact_hero" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_contact_form_locale_idx" ON "_pages_v_blocks_contact_form" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_contact_info_contact_methods_locale_idx" ON "_pages_v_blocks_contact_info_contact_methods" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_contact_info_locale_idx" ON "_pages_v_blocks_contact_info" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_contact_location_locale_idx" ON "_pages_v_blocks_contact_location" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_contact_f_a_q_faqs_locale_idx" ON "_pages_v_blocks_contact_f_a_q_faqs" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_contact_f_a_q_locale_idx" ON "_pages_v_blocks_contact_f_a_q" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_universal_hero_benefits_locale_idx" ON "_pages_v_blocks_universal_hero_benefits" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_universal_hero_trust_indicators_locale_idx" ON "_pages_v_blocks_universal_hero_trust_indicators" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_universal_hero_stats_locale_idx" ON "_pages_v_blocks_universal_hero_stats" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_universal_hero_contact_methods_locale_idx" ON "_pages_v_blocks_universal_hero_contact_methods" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_universal_hero_locale_idx" ON "_pages_v_blocks_universal_hero" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_universal_c_t_a_benefits_locale_idx" ON "_pages_v_blocks_universal_c_t_a_benefits" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_universal_c_t_a_stats_locale_idx" ON "_pages_v_blocks_universal_c_t_a_stats" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_universal_c_t_a_locale_idx" ON "_pages_v_blocks_universal_c_t_a" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_feature_grid_features_details_locale_idx" ON "_pages_v_blocks_feature_grid_features_details" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_feature_grid_features_locale_idx" ON "_pages_v_blocks_feature_grid_features" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_feature_grid_locale_idx" ON "_pages_v_blocks_feature_grid" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_content_grid_items_applications_locale_idx" ON "_pages_v_blocks_content_grid_items_applications" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_content_grid_items_locale_idx" ON "_pages_v_blocks_content_grid_items" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_content_grid_locale_idx" ON "_pages_v_blocks_content_grid" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_stats_section_stats_locale_idx" ON "_pages_v_blocks_stats_section_stats" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_stats_section_locale_idx" ON "_pages_v_blocks_stats_section" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_process_steps_steps_details_locale_idx" ON "_pages_v_blocks_process_steps_steps_details" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_process_steps_steps_locale_idx" ON "_pages_v_blocks_process_steps_steps" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_process_steps_locale_idx" ON "_pages_v_blocks_process_steps" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_content_cards_cards_tags_locale_idx" ON "_pages_v_blocks_content_cards_cards_tags" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_content_cards_cards_locale_idx" ON "_pages_v_blocks_content_cards_cards" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_content_cards_locale_idx" ON "_pages_v_blocks_content_cards" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_contact_section_benefits_locale_idx" ON "_pages_v_blocks_contact_section_benefits" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_contact_section_locale_idx" ON "_pages_v_blocks_contact_section" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_comparison_table_items_locale_idx" ON "_pages_v_blocks_comparison_table_items" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_comparison_table_locale_idx" ON "_pages_v_blocks_comparison_table" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_simple_page_breadcrumbs_locale_idx" ON "_pages_v_blocks_simple_page_breadcrumbs" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_simple_page_links_locale_idx" ON "_pages_v_blocks_simple_page_links" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_simple_page_locale_idx" ON "_pages_v_blocks_simple_page" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_brand_showcase_brands_locale_idx" ON "_pages_v_blocks_brand_showcase_brands" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_brand_showcase_locale_idx" ON "_pages_v_blocks_brand_showcase" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_technical_content_process_steps_locale_idx" ON "_pages_v_blocks_technical_content_process_steps" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_technical_content_specifications_items_locale_idx" ON "_pages_v_blocks_technical_content_specifications_items" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_technical_content_specifications_locale_idx" ON "_pages_v_blocks_technical_content_specifications" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_technical_content_locale_idx" ON "_pages_v_blocks_technical_content" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_resource_gallery_resources_locale_idx" ON "_pages_v_blocks_resource_gallery_resources" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_resource_gallery_gallery_images_locale_idx" ON "_pages_v_blocks_resource_gallery_gallery_images" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_resource_gallery_locale_idx" ON "_pages_v_blocks_resource_gallery" USING btree ("_locale");
  CREATE INDEX "_pages_v_snapshot_idx" ON "_pages_v" USING btree ("snapshot");
  CREATE INDEX "_pages_v_published_locale_idx" ON "_pages_v" USING btree ("published_locale");
  CREATE INDEX "_posts_v_snapshot_idx" ON "_posts_v" USING btree ("snapshot");
  CREATE INDEX "_posts_v_published_locale_idx" ON "_posts_v" USING btree ("published_locale");
  CREATE INDEX "payload_locked_documents_rels_contact_submissions_id_idx" ON "payload_locked_documents_rels" USING btree ("contact_submissions_id");
  CREATE INDEX "homepage_blocks_hero_cta_buttons_locale_idx" ON "homepage_blocks_hero_cta_buttons" USING btree ("_locale");
  CREATE INDEX "homepage_blocks_hero_locale_idx" ON "homepage_blocks_hero" USING btree ("_locale");
  CREATE INDEX "homepage_blocks_logo_belt_logos_locale_idx" ON "homepage_blocks_logo_belt_logos" USING btree ("_locale");
  CREATE INDEX "homepage_blocks_logo_belt_locale_idx" ON "homepage_blocks_logo_belt" USING btree ("_locale");
  CREATE INDEX "homepage_blocks_services_services_features_locale_idx" ON "homepage_blocks_services_services_features" USING btree ("_locale");
  CREATE INDEX "homepage_blocks_services_services_locale_idx" ON "homepage_blocks_services_services" USING btree ("_locale");
  CREATE INDEX "homepage_blocks_services_locale_idx" ON "homepage_blocks_services" USING btree ("_locale");
  CREATE INDEX "homepage_blocks_about_badges_locale_idx" ON "homepage_blocks_about_badges" USING btree ("_locale");
  CREATE INDEX "homepage_blocks_about_stats_locale_idx" ON "homepage_blocks_about_stats" USING btree ("_locale");
  CREATE INDEX "homepage_blocks_about_process_locale_idx" ON "homepage_blocks_about_process" USING btree ("_locale");
  CREATE INDEX "homepage_blocks_about_locale_idx" ON "homepage_blocks_about" USING btree ("_locale");
  CREATE INDEX "homepage_blocks_why_trust_reasons_locale_idx" ON "homepage_blocks_why_trust_reasons" USING btree ("_locale");
  CREATE INDEX "homepage_blocks_why_trust_pillars_locale_idx" ON "homepage_blocks_why_trust_pillars" USING btree ("_locale");
  CREATE INDEX "homepage_blocks_why_trust_locale_idx" ON "homepage_blocks_why_trust" USING btree ("_locale");
  CREATE INDEX "homepage_blocks_projects_projects_stack_locale_idx" ON "homepage_blocks_projects_projects_stack" USING btree ("_locale");
  CREATE INDEX "homepage_blocks_projects_projects_locale_idx" ON "homepage_blocks_projects_projects" USING btree ("_locale");
  CREATE INDEX "homepage_blocks_projects_locale_idx" ON "homepage_blocks_projects" USING btree ("_locale");
  CREATE INDEX "homepage_blocks_contact_locale_idx" ON "homepage_blocks_contact" USING btree ("_locale");
  ALTER TABLE "pages" DROP COLUMN "title";
  ALTER TABLE "pages" DROP COLUMN "meta_title";
  ALTER TABLE "pages" DROP COLUMN "meta_description";
  ALTER TABLE "_pages_v" DROP COLUMN "version_title";
  ALTER TABLE "_pages_v" DROP COLUMN "version_meta_title";
  ALTER TABLE "_pages_v" DROP COLUMN "version_meta_description";
  ALTER TABLE "posts" DROP COLUMN "title";
  ALTER TABLE "posts" DROP COLUMN "excerpt";
  ALTER TABLE "posts" DROP COLUMN "content";
  ALTER TABLE "posts" DROP COLUMN "meta_title";
  ALTER TABLE "posts" DROP COLUMN "meta_description";
  ALTER TABLE "posts" DROP COLUMN "meta_keywords";
  ALTER TABLE "_posts_v" DROP COLUMN "version_title";
  ALTER TABLE "_posts_v" DROP COLUMN "version_excerpt";
  ALTER TABLE "_posts_v" DROP COLUMN "version_content";
  ALTER TABLE "_posts_v" DROP COLUMN "version_meta_title";
  ALTER TABLE "_posts_v" DROP COLUMN "version_meta_description";
  ALTER TABLE "_posts_v" DROP COLUMN "version_meta_keywords";
  ALTER TABLE "categories" DROP COLUMN "name";
  ALTER TABLE "categories" DROP COLUMN "description";
  ALTER TABLE "header_navigation_dropdown_items" DROP COLUMN "label";
  ALTER TABLE "header_navigation_dropdown_items" DROP COLUMN "description";
  ALTER TABLE "header_navigation" DROP COLUMN "label";
  ALTER TABLE "header" DROP COLUMN "site_name";
  ALTER TABLE "footer_footer_columns_links" DROP COLUMN "label";
  ALTER TABLE "footer_footer_columns" DROP COLUMN "title";
  ALTER TABLE "footer" DROP COLUMN "copyright";`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "pages_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "posts_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_posts_v_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "categories_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "contact_submissions_emails_sent" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "contact_submissions" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "contact_submissions_texts" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "header_navigation_dropdown_items_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "header_navigation_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "header_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "footer_footer_columns_links_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "footer_footer_columns_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "footer_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "email_admin" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "pages_locales" CASCADE;
  DROP TABLE "_pages_v_locales" CASCADE;
  DROP TABLE "posts_locales" CASCADE;
  DROP TABLE "_posts_v_locales" CASCADE;
  DROP TABLE "categories_locales" CASCADE;
  DROP TABLE "contact_submissions_emails_sent" CASCADE;
  DROP TABLE "contact_submissions" CASCADE;
  DROP TABLE "contact_submissions_texts" CASCADE;
  DROP TABLE "header_navigation_dropdown_items_locales" CASCADE;
  DROP TABLE "header_navigation_locales" CASCADE;
  DROP TABLE "header_locales" CASCADE;
  DROP TABLE "footer_footer_columns_links_locales" CASCADE;
  DROP TABLE "footer_footer_columns_locales" CASCADE;
  DROP TABLE "footer_locales" CASCADE;
  DROP TABLE "email_admin" CASCADE;
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_contact_submissions_fk";
  
  DROP INDEX "pages_blocks_hero_cta_buttons_locale_idx";
  DROP INDEX "pages_blocks_hero_locale_idx";
  DROP INDEX "pages_blocks_logo_belt_logos_locale_idx";
  DROP INDEX "pages_blocks_logo_belt_locale_idx";
  DROP INDEX "pages_blocks_services_services_features_locale_idx";
  DROP INDEX "pages_blocks_services_services_locale_idx";
  DROP INDEX "pages_blocks_services_locale_idx";
  DROP INDEX "pages_blocks_about_badges_locale_idx";
  DROP INDEX "pages_blocks_about_stats_locale_idx";
  DROP INDEX "pages_blocks_about_process_locale_idx";
  DROP INDEX "pages_blocks_about_locale_idx";
  DROP INDEX "pages_blocks_why_trust_reasons_locale_idx";
  DROP INDEX "pages_blocks_why_trust_pillars_locale_idx";
  DROP INDEX "pages_blocks_why_trust_locale_idx";
  DROP INDEX "pages_blocks_projects_projects_stack_locale_idx";
  DROP INDEX "pages_blocks_projects_projects_locale_idx";
  DROP INDEX "pages_blocks_projects_locale_idx";
  DROP INDEX "pages_blocks_contact_locale_idx";
  DROP INDEX "pages_blocks_rich_text_locale_idx";
  DROP INDEX "pages_blocks_product_hero_key_benefits_locale_idx";
  DROP INDEX "pages_blocks_product_hero_cta_buttons_locale_idx";
  DROP INDEX "pages_blocks_product_hero_locale_idx";
  DROP INDEX "pages_blocks_key_features_features_locale_idx";
  DROP INDEX "pages_blocks_key_features_locale_idx";
  DROP INDEX "pages_blocks_product_gallery_images_locale_idx";
  DROP INDEX "pages_blocks_product_gallery_locale_idx";
  DROP INDEX "pages_blocks_specifications_specifications_items_locale_idx";
  DROP INDEX "pages_blocks_specifications_specifications_locale_idx";
  DROP INDEX "pages_blocks_specifications_certification_badges_locale_idx";
  DROP INDEX "pages_blocks_specifications_additional_info_details_locale_idx";
  DROP INDEX "pages_blocks_specifications_locale_idx";
  DROP INDEX "pages_blocks_applications_applications_details_locale_idx";
  DROP INDEX "pages_blocks_applications_applications_locale_idx";
  DROP INDEX "pages_blocks_applications_stats_locale_idx";
  DROP INDEX "pages_blocks_applications_case_study_stats_locale_idx";
  DROP INDEX "pages_blocks_applications_locale_idx";
  DROP INDEX "pages_blocks_technical_overview_process_steps_locale_idx";
  DROP INDEX "pages_blocks_technical_overview_technical_benefits_locale_idx";
  DROP INDEX "pages_blocks_technical_overview_locale_idx";
  DROP INDEX "pages_blocks_benefits_comparison_benefits_locale_idx";
  DROP INDEX "pages_blocks_benefits_comparison_summary_cards_locale_idx";
  DROP INDEX "pages_blocks_benefits_comparison_locale_idx";
  DROP INDEX "pages_blocks_product_c_t_a_stats_locale_idx";
  DROP INDEX "pages_blocks_product_c_t_a_why_us_points_locale_idx";
  DROP INDEX "pages_blocks_product_c_t_a_application_options_locale_idx";
  DROP INDEX "pages_blocks_product_c_t_a_locale_idx";
  DROP INDEX "pages_blocks_product_resources_resources_locale_idx";
  DROP INDEX "pages_blocks_product_resources_quick_access_items_locale_idx";
  DROP INDEX "pages_blocks_product_resources_locale_idx";
  DROP INDEX "pages_blocks_contact_hero_quick_contact_methods_locale_idx";
  DROP INDEX "pages_blocks_contact_hero_locale_idx";
  DROP INDEX "pages_blocks_contact_form_locale_idx";
  DROP INDEX "pages_blocks_contact_info_contact_methods_locale_idx";
  DROP INDEX "pages_blocks_contact_info_locale_idx";
  DROP INDEX "pages_blocks_contact_location_locale_idx";
  DROP INDEX "pages_blocks_contact_f_a_q_faqs_locale_idx";
  DROP INDEX "pages_blocks_contact_f_a_q_locale_idx";
  DROP INDEX "pages_blocks_universal_hero_benefits_locale_idx";
  DROP INDEX "pages_blocks_universal_hero_trust_indicators_locale_idx";
  DROP INDEX "pages_blocks_universal_hero_stats_locale_idx";
  DROP INDEX "pages_blocks_universal_hero_contact_methods_locale_idx";
  DROP INDEX "pages_blocks_universal_hero_locale_idx";
  DROP INDEX "pages_blocks_universal_c_t_a_benefits_locale_idx";
  DROP INDEX "pages_blocks_universal_c_t_a_stats_locale_idx";
  DROP INDEX "pages_blocks_universal_c_t_a_locale_idx";
  DROP INDEX "pages_blocks_feature_grid_features_details_locale_idx";
  DROP INDEX "pages_blocks_feature_grid_features_locale_idx";
  DROP INDEX "pages_blocks_feature_grid_locale_idx";
  DROP INDEX "pages_blocks_content_grid_items_applications_locale_idx";
  DROP INDEX "pages_blocks_content_grid_items_locale_idx";
  DROP INDEX "pages_blocks_content_grid_locale_idx";
  DROP INDEX "pages_blocks_stats_section_stats_locale_idx";
  DROP INDEX "pages_blocks_stats_section_locale_idx";
  DROP INDEX "pages_blocks_process_steps_steps_details_locale_idx";
  DROP INDEX "pages_blocks_process_steps_steps_locale_idx";
  DROP INDEX "pages_blocks_process_steps_locale_idx";
  DROP INDEX "pages_blocks_content_cards_cards_tags_locale_idx";
  DROP INDEX "pages_blocks_content_cards_cards_locale_idx";
  DROP INDEX "pages_blocks_content_cards_locale_idx";
  DROP INDEX "pages_blocks_contact_section_benefits_locale_idx";
  DROP INDEX "pages_blocks_contact_section_locale_idx";
  DROP INDEX "pages_blocks_comparison_table_items_locale_idx";
  DROP INDEX "pages_blocks_comparison_table_locale_idx";
  DROP INDEX "pages_blocks_simple_page_breadcrumbs_locale_idx";
  DROP INDEX "pages_blocks_simple_page_links_locale_idx";
  DROP INDEX "pages_blocks_simple_page_locale_idx";
  DROP INDEX "pages_blocks_brand_showcase_brands_locale_idx";
  DROP INDEX "pages_blocks_brand_showcase_locale_idx";
  DROP INDEX "pages_blocks_technical_content_process_steps_locale_idx";
  DROP INDEX "pages_blocks_technical_content_specifications_items_locale_idx";
  DROP INDEX "pages_blocks_technical_content_specifications_locale_idx";
  DROP INDEX "pages_blocks_technical_content_locale_idx";
  DROP INDEX "pages_blocks_resource_gallery_resources_locale_idx";
  DROP INDEX "pages_blocks_resource_gallery_gallery_images_locale_idx";
  DROP INDEX "pages_blocks_resource_gallery_locale_idx";
  DROP INDEX "_pages_v_blocks_hero_cta_buttons_locale_idx";
  DROP INDEX "_pages_v_blocks_hero_locale_idx";
  DROP INDEX "_pages_v_blocks_logo_belt_logos_locale_idx";
  DROP INDEX "_pages_v_blocks_logo_belt_locale_idx";
  DROP INDEX "_pages_v_blocks_services_services_features_locale_idx";
  DROP INDEX "_pages_v_blocks_services_services_locale_idx";
  DROP INDEX "_pages_v_blocks_services_locale_idx";
  DROP INDEX "_pages_v_blocks_about_badges_locale_idx";
  DROP INDEX "_pages_v_blocks_about_stats_locale_idx";
  DROP INDEX "_pages_v_blocks_about_process_locale_idx";
  DROP INDEX "_pages_v_blocks_about_locale_idx";
  DROP INDEX "_pages_v_blocks_why_trust_reasons_locale_idx";
  DROP INDEX "_pages_v_blocks_why_trust_pillars_locale_idx";
  DROP INDEX "_pages_v_blocks_why_trust_locale_idx";
  DROP INDEX "_pages_v_blocks_projects_projects_stack_locale_idx";
  DROP INDEX "_pages_v_blocks_projects_projects_locale_idx";
  DROP INDEX "_pages_v_blocks_projects_locale_idx";
  DROP INDEX "_pages_v_blocks_contact_locale_idx";
  DROP INDEX "_pages_v_blocks_rich_text_locale_idx";
  DROP INDEX "_pages_v_blocks_product_hero_key_benefits_locale_idx";
  DROP INDEX "_pages_v_blocks_product_hero_cta_buttons_locale_idx";
  DROP INDEX "_pages_v_blocks_product_hero_locale_idx";
  DROP INDEX "_pages_v_blocks_key_features_features_locale_idx";
  DROP INDEX "_pages_v_blocks_key_features_locale_idx";
  DROP INDEX "_pages_v_blocks_product_gallery_images_locale_idx";
  DROP INDEX "_pages_v_blocks_product_gallery_locale_idx";
  DROP INDEX "_pages_v_blocks_specifications_specifications_items_locale_idx";
  DROP INDEX "_pages_v_blocks_specifications_specifications_locale_idx";
  DROP INDEX "_pages_v_blocks_specifications_certification_badges_locale_idx";
  DROP INDEX "_pages_v_blocks_specifications_additional_info_details_locale_idx";
  DROP INDEX "_pages_v_blocks_specifications_locale_idx";
  DROP INDEX "_pages_v_blocks_applications_applications_details_locale_idx";
  DROP INDEX "_pages_v_blocks_applications_applications_locale_idx";
  DROP INDEX "_pages_v_blocks_applications_stats_locale_idx";
  DROP INDEX "_pages_v_blocks_applications_case_study_stats_locale_idx";
  DROP INDEX "_pages_v_blocks_applications_locale_idx";
  DROP INDEX "_pages_v_blocks_technical_overview_process_steps_locale_idx";
  DROP INDEX "_pages_v_blocks_technical_overview_technical_benefits_locale_idx";
  DROP INDEX "_pages_v_blocks_technical_overview_locale_idx";
  DROP INDEX "_pages_v_blocks_benefits_comparison_benefits_locale_idx";
  DROP INDEX "_pages_v_blocks_benefits_comparison_summary_cards_locale_idx";
  DROP INDEX "_pages_v_blocks_benefits_comparison_locale_idx";
  DROP INDEX "_pages_v_blocks_product_c_t_a_stats_locale_idx";
  DROP INDEX "_pages_v_blocks_product_c_t_a_why_us_points_locale_idx";
  DROP INDEX "_pages_v_blocks_product_c_t_a_application_options_locale_idx";
  DROP INDEX "_pages_v_blocks_product_c_t_a_locale_idx";
  DROP INDEX "_pages_v_blocks_product_resources_resources_locale_idx";
  DROP INDEX "_pages_v_blocks_product_resources_quick_access_items_locale_idx";
  DROP INDEX "_pages_v_blocks_product_resources_locale_idx";
  DROP INDEX "_pages_v_blocks_contact_hero_quick_contact_methods_locale_idx";
  DROP INDEX "_pages_v_blocks_contact_hero_locale_idx";
  DROP INDEX "_pages_v_blocks_contact_form_locale_idx";
  DROP INDEX "_pages_v_blocks_contact_info_contact_methods_locale_idx";
  DROP INDEX "_pages_v_blocks_contact_info_locale_idx";
  DROP INDEX "_pages_v_blocks_contact_location_locale_idx";
  DROP INDEX "_pages_v_blocks_contact_f_a_q_faqs_locale_idx";
  DROP INDEX "_pages_v_blocks_contact_f_a_q_locale_idx";
  DROP INDEX "_pages_v_blocks_universal_hero_benefits_locale_idx";
  DROP INDEX "_pages_v_blocks_universal_hero_trust_indicators_locale_idx";
  DROP INDEX "_pages_v_blocks_universal_hero_stats_locale_idx";
  DROP INDEX "_pages_v_blocks_universal_hero_contact_methods_locale_idx";
  DROP INDEX "_pages_v_blocks_universal_hero_locale_idx";
  DROP INDEX "_pages_v_blocks_universal_c_t_a_benefits_locale_idx";
  DROP INDEX "_pages_v_blocks_universal_c_t_a_stats_locale_idx";
  DROP INDEX "_pages_v_blocks_universal_c_t_a_locale_idx";
  DROP INDEX "_pages_v_blocks_feature_grid_features_details_locale_idx";
  DROP INDEX "_pages_v_blocks_feature_grid_features_locale_idx";
  DROP INDEX "_pages_v_blocks_feature_grid_locale_idx";
  DROP INDEX "_pages_v_blocks_content_grid_items_applications_locale_idx";
  DROP INDEX "_pages_v_blocks_content_grid_items_locale_idx";
  DROP INDEX "_pages_v_blocks_content_grid_locale_idx";
  DROP INDEX "_pages_v_blocks_stats_section_stats_locale_idx";
  DROP INDEX "_pages_v_blocks_stats_section_locale_idx";
  DROP INDEX "_pages_v_blocks_process_steps_steps_details_locale_idx";
  DROP INDEX "_pages_v_blocks_process_steps_steps_locale_idx";
  DROP INDEX "_pages_v_blocks_process_steps_locale_idx";
  DROP INDEX "_pages_v_blocks_content_cards_cards_tags_locale_idx";
  DROP INDEX "_pages_v_blocks_content_cards_cards_locale_idx";
  DROP INDEX "_pages_v_blocks_content_cards_locale_idx";
  DROP INDEX "_pages_v_blocks_contact_section_benefits_locale_idx";
  DROP INDEX "_pages_v_blocks_contact_section_locale_idx";
  DROP INDEX "_pages_v_blocks_comparison_table_items_locale_idx";
  DROP INDEX "_pages_v_blocks_comparison_table_locale_idx";
  DROP INDEX "_pages_v_blocks_simple_page_breadcrumbs_locale_idx";
  DROP INDEX "_pages_v_blocks_simple_page_links_locale_idx";
  DROP INDEX "_pages_v_blocks_simple_page_locale_idx";
  DROP INDEX "_pages_v_blocks_brand_showcase_brands_locale_idx";
  DROP INDEX "_pages_v_blocks_brand_showcase_locale_idx";
  DROP INDEX "_pages_v_blocks_technical_content_process_steps_locale_idx";
  DROP INDEX "_pages_v_blocks_technical_content_specifications_items_locale_idx";
  DROP INDEX "_pages_v_blocks_technical_content_specifications_locale_idx";
  DROP INDEX "_pages_v_blocks_technical_content_locale_idx";
  DROP INDEX "_pages_v_blocks_resource_gallery_resources_locale_idx";
  DROP INDEX "_pages_v_blocks_resource_gallery_gallery_images_locale_idx";
  DROP INDEX "_pages_v_blocks_resource_gallery_locale_idx";
  DROP INDEX "_pages_v_snapshot_idx";
  DROP INDEX "_pages_v_published_locale_idx";
  DROP INDEX "_posts_v_snapshot_idx";
  DROP INDEX "_posts_v_published_locale_idx";
  DROP INDEX "payload_locked_documents_rels_contact_submissions_id_idx";
  DROP INDEX "homepage_blocks_hero_cta_buttons_locale_idx";
  DROP INDEX "homepage_blocks_hero_locale_idx";
  DROP INDEX "homepage_blocks_logo_belt_logos_locale_idx";
  DROP INDEX "homepage_blocks_logo_belt_locale_idx";
  DROP INDEX "homepage_blocks_services_services_features_locale_idx";
  DROP INDEX "homepage_blocks_services_services_locale_idx";
  DROP INDEX "homepage_blocks_services_locale_idx";
  DROP INDEX "homepage_blocks_about_badges_locale_idx";
  DROP INDEX "homepage_blocks_about_stats_locale_idx";
  DROP INDEX "homepage_blocks_about_process_locale_idx";
  DROP INDEX "homepage_blocks_about_locale_idx";
  DROP INDEX "homepage_blocks_why_trust_reasons_locale_idx";
  DROP INDEX "homepage_blocks_why_trust_pillars_locale_idx";
  DROP INDEX "homepage_blocks_why_trust_locale_idx";
  DROP INDEX "homepage_blocks_projects_projects_stack_locale_idx";
  DROP INDEX "homepage_blocks_projects_projects_locale_idx";
  DROP INDEX "homepage_blocks_projects_locale_idx";
  DROP INDEX "homepage_blocks_contact_locale_idx";
  ALTER TABLE "pages" ADD COLUMN "title" varchar;
  ALTER TABLE "pages" ADD COLUMN "meta_title" varchar;
  ALTER TABLE "pages" ADD COLUMN "meta_description" varchar;
  ALTER TABLE "_pages_v" ADD COLUMN "version_title" varchar;
  ALTER TABLE "_pages_v" ADD COLUMN "version_meta_title" varchar;
  ALTER TABLE "_pages_v" ADD COLUMN "version_meta_description" varchar;
  ALTER TABLE "posts" ADD COLUMN "title" varchar;
  ALTER TABLE "posts" ADD COLUMN "excerpt" varchar;
  ALTER TABLE "posts" ADD COLUMN "content" jsonb;
  ALTER TABLE "posts" ADD COLUMN "meta_title" varchar;
  ALTER TABLE "posts" ADD COLUMN "meta_description" varchar;
  ALTER TABLE "posts" ADD COLUMN "meta_keywords" varchar;
  ALTER TABLE "_posts_v" ADD COLUMN "version_title" varchar;
  ALTER TABLE "_posts_v" ADD COLUMN "version_excerpt" varchar;
  ALTER TABLE "_posts_v" ADD COLUMN "version_content" jsonb;
  ALTER TABLE "_posts_v" ADD COLUMN "version_meta_title" varchar;
  ALTER TABLE "_posts_v" ADD COLUMN "version_meta_description" varchar;
  ALTER TABLE "_posts_v" ADD COLUMN "version_meta_keywords" varchar;
  ALTER TABLE "categories" ADD COLUMN "name" varchar NOT NULL;
  ALTER TABLE "categories" ADD COLUMN "description" varchar;
  ALTER TABLE "header_navigation_dropdown_items" ADD COLUMN "label" varchar;
  ALTER TABLE "header_navigation_dropdown_items" ADD COLUMN "description" varchar;
  ALTER TABLE "header_navigation" ADD COLUMN "label" varchar NOT NULL;
  ALTER TABLE "header" ADD COLUMN "site_name" varchar DEFAULT 'My Website' NOT NULL;
  ALTER TABLE "footer_footer_columns_links" ADD COLUMN "label" varchar NOT NULL;
  ALTER TABLE "footer_footer_columns" ADD COLUMN "title" varchar NOT NULL;
  ALTER TABLE "footer" ADD COLUMN "copyright" varchar DEFAULT '© 2025 SINTEH PRO. Vse pravice pridržane.';
  CREATE UNIQUE INDEX "categories_name_idx" ON "categories" USING btree ("name");
  ALTER TABLE "pages_blocks_hero_cta_buttons" DROP COLUMN "_locale";
  ALTER TABLE "pages_blocks_hero" DROP COLUMN "_locale";
  ALTER TABLE "pages_blocks_logo_belt_logos" DROP COLUMN "_locale";
  ALTER TABLE "pages_blocks_logo_belt" DROP COLUMN "_locale";
  ALTER TABLE "pages_blocks_services_services_features" DROP COLUMN "_locale";
  ALTER TABLE "pages_blocks_services_services" DROP COLUMN "_locale";
  ALTER TABLE "pages_blocks_services" DROP COLUMN "_locale";
  ALTER TABLE "pages_blocks_about_badges" DROP COLUMN "_locale";
  ALTER TABLE "pages_blocks_about_stats" DROP COLUMN "_locale";
  ALTER TABLE "pages_blocks_about_process" DROP COLUMN "_locale";
  ALTER TABLE "pages_blocks_about" DROP COLUMN "_locale";
  ALTER TABLE "pages_blocks_why_trust_reasons" DROP COLUMN "_locale";
  ALTER TABLE "pages_blocks_why_trust_pillars" DROP COLUMN "_locale";
  ALTER TABLE "pages_blocks_why_trust" DROP COLUMN "_locale";
  ALTER TABLE "pages_blocks_projects_projects_stack" DROP COLUMN "_locale";
  ALTER TABLE "pages_blocks_projects_projects" DROP COLUMN "_locale";
  ALTER TABLE "pages_blocks_projects" DROP COLUMN "_locale";
  ALTER TABLE "pages_blocks_contact" DROP COLUMN "_locale";
  ALTER TABLE "pages_blocks_rich_text" DROP COLUMN "_locale";
  ALTER TABLE "pages_blocks_product_hero_key_benefits" DROP COLUMN "_locale";
  ALTER TABLE "pages_blocks_product_hero_cta_buttons" DROP COLUMN "_locale";
  ALTER TABLE "pages_blocks_product_hero" DROP COLUMN "_locale";
  ALTER TABLE "pages_blocks_key_features_features" DROP COLUMN "_locale";
  ALTER TABLE "pages_blocks_key_features" DROP COLUMN "_locale";
  ALTER TABLE "pages_blocks_product_gallery_images" DROP COLUMN "_locale";
  ALTER TABLE "pages_blocks_product_gallery" DROP COLUMN "_locale";
  ALTER TABLE "pages_blocks_specifications_specifications_items" DROP COLUMN "_locale";
  ALTER TABLE "pages_blocks_specifications_specifications" DROP COLUMN "_locale";
  ALTER TABLE "pages_blocks_specifications_certification_badges" DROP COLUMN "_locale";
  ALTER TABLE "pages_blocks_specifications_additional_info_details" DROP COLUMN "_locale";
  ALTER TABLE "pages_blocks_specifications" DROP COLUMN "_locale";
  ALTER TABLE "pages_blocks_applications_applications_details" DROP COLUMN "_locale";
  ALTER TABLE "pages_blocks_applications_applications" DROP COLUMN "_locale";
  ALTER TABLE "pages_blocks_applications_stats" DROP COLUMN "_locale";
  ALTER TABLE "pages_blocks_applications_case_study_stats" DROP COLUMN "_locale";
  ALTER TABLE "pages_blocks_applications" DROP COLUMN "_locale";
  ALTER TABLE "pages_blocks_technical_overview_process_steps" DROP COLUMN "_locale";
  ALTER TABLE "pages_blocks_technical_overview_technical_benefits" DROP COLUMN "_locale";
  ALTER TABLE "pages_blocks_technical_overview" DROP COLUMN "_locale";
  ALTER TABLE "pages_blocks_benefits_comparison_benefits" DROP COLUMN "_locale";
  ALTER TABLE "pages_blocks_benefits_comparison_summary_cards" DROP COLUMN "_locale";
  ALTER TABLE "pages_blocks_benefits_comparison" DROP COLUMN "_locale";
  ALTER TABLE "pages_blocks_product_c_t_a_stats" DROP COLUMN "_locale";
  ALTER TABLE "pages_blocks_product_c_t_a_why_us_points" DROP COLUMN "_locale";
  ALTER TABLE "pages_blocks_product_c_t_a_application_options" DROP COLUMN "_locale";
  ALTER TABLE "pages_blocks_product_c_t_a" DROP COLUMN "_locale";
  ALTER TABLE "pages_blocks_product_resources_resources" DROP COLUMN "_locale";
  ALTER TABLE "pages_blocks_product_resources_quick_access_items" DROP COLUMN "_locale";
  ALTER TABLE "pages_blocks_product_resources" DROP COLUMN "_locale";
  ALTER TABLE "pages_blocks_contact_hero_quick_contact_methods" DROP COLUMN "_locale";
  ALTER TABLE "pages_blocks_contact_hero" DROP COLUMN "_locale";
  ALTER TABLE "pages_blocks_contact_form" DROP COLUMN "_locale";
  ALTER TABLE "pages_blocks_contact_info_contact_methods" DROP COLUMN "_locale";
  ALTER TABLE "pages_blocks_contact_info" DROP COLUMN "_locale";
  ALTER TABLE "pages_blocks_contact_location" DROP COLUMN "_locale";
  ALTER TABLE "pages_blocks_contact_f_a_q_faqs" DROP COLUMN "_locale";
  ALTER TABLE "pages_blocks_contact_f_a_q" DROP COLUMN "_locale";
  ALTER TABLE "pages_blocks_universal_hero_benefits" DROP COLUMN "_locale";
  ALTER TABLE "pages_blocks_universal_hero_trust_indicators" DROP COLUMN "_locale";
  ALTER TABLE "pages_blocks_universal_hero_stats" DROP COLUMN "_locale";
  ALTER TABLE "pages_blocks_universal_hero_contact_methods" DROP COLUMN "_locale";
  ALTER TABLE "pages_blocks_universal_hero" DROP COLUMN "_locale";
  ALTER TABLE "pages_blocks_universal_c_t_a_benefits" DROP COLUMN "_locale";
  ALTER TABLE "pages_blocks_universal_c_t_a_stats" DROP COLUMN "_locale";
  ALTER TABLE "pages_blocks_universal_c_t_a" DROP COLUMN "_locale";
  ALTER TABLE "pages_blocks_feature_grid_features_details" DROP COLUMN "_locale";
  ALTER TABLE "pages_blocks_feature_grid_features" DROP COLUMN "_locale";
  ALTER TABLE "pages_blocks_feature_grid" DROP COLUMN "_locale";
  ALTER TABLE "pages_blocks_content_grid_items_applications" DROP COLUMN "_locale";
  ALTER TABLE "pages_blocks_content_grid_items" DROP COLUMN "_locale";
  ALTER TABLE "pages_blocks_content_grid" DROP COLUMN "_locale";
  ALTER TABLE "pages_blocks_stats_section_stats" DROP COLUMN "_locale";
  ALTER TABLE "pages_blocks_stats_section" DROP COLUMN "_locale";
  ALTER TABLE "pages_blocks_process_steps_steps_details" DROP COLUMN "_locale";
  ALTER TABLE "pages_blocks_process_steps_steps" DROP COLUMN "_locale";
  ALTER TABLE "pages_blocks_process_steps" DROP COLUMN "_locale";
  ALTER TABLE "pages_blocks_content_cards_cards_tags" DROP COLUMN "_locale";
  ALTER TABLE "pages_blocks_content_cards_cards" DROP COLUMN "_locale";
  ALTER TABLE "pages_blocks_content_cards" DROP COLUMN "_locale";
  ALTER TABLE "pages_blocks_contact_section_benefits" DROP COLUMN "_locale";
  ALTER TABLE "pages_blocks_contact_section" DROP COLUMN "_locale";
  ALTER TABLE "pages_blocks_comparison_table_items" DROP COLUMN "_locale";
  ALTER TABLE "pages_blocks_comparison_table" DROP COLUMN "_locale";
  ALTER TABLE "pages_blocks_simple_page_breadcrumbs" DROP COLUMN "_locale";
  ALTER TABLE "pages_blocks_simple_page_links" DROP COLUMN "_locale";
  ALTER TABLE "pages_blocks_simple_page" DROP COLUMN "_locale";
  ALTER TABLE "pages_blocks_brand_showcase_brands" DROP COLUMN "_locale";
  ALTER TABLE "pages_blocks_brand_showcase" DROP COLUMN "_locale";
  ALTER TABLE "pages_blocks_technical_content_process_steps" DROP COLUMN "_locale";
  ALTER TABLE "pages_blocks_technical_content_specifications_items" DROP COLUMN "_locale";
  ALTER TABLE "pages_blocks_technical_content_specifications" DROP COLUMN "_locale";
  ALTER TABLE "pages_blocks_technical_content" DROP COLUMN "_locale";
  ALTER TABLE "pages_blocks_resource_gallery_resources" DROP COLUMN "_locale";
  ALTER TABLE "pages_blocks_resource_gallery_gallery_images" DROP COLUMN "_locale";
  ALTER TABLE "pages_blocks_resource_gallery" DROP COLUMN "_locale";
  ALTER TABLE "_pages_v_blocks_hero_cta_buttons" DROP COLUMN "_locale";
  ALTER TABLE "_pages_v_blocks_hero" DROP COLUMN "_locale";
  ALTER TABLE "_pages_v_blocks_logo_belt_logos" DROP COLUMN "_locale";
  ALTER TABLE "_pages_v_blocks_logo_belt" DROP COLUMN "_locale";
  ALTER TABLE "_pages_v_blocks_services_services_features" DROP COLUMN "_locale";
  ALTER TABLE "_pages_v_blocks_services_services" DROP COLUMN "_locale";
  ALTER TABLE "_pages_v_blocks_services" DROP COLUMN "_locale";
  ALTER TABLE "_pages_v_blocks_about_badges" DROP COLUMN "_locale";
  ALTER TABLE "_pages_v_blocks_about_stats" DROP COLUMN "_locale";
  ALTER TABLE "_pages_v_blocks_about_process" DROP COLUMN "_locale";
  ALTER TABLE "_pages_v_blocks_about" DROP COLUMN "_locale";
  ALTER TABLE "_pages_v_blocks_why_trust_reasons" DROP COLUMN "_locale";
  ALTER TABLE "_pages_v_blocks_why_trust_pillars" DROP COLUMN "_locale";
  ALTER TABLE "_pages_v_blocks_why_trust" DROP COLUMN "_locale";
  ALTER TABLE "_pages_v_blocks_projects_projects_stack" DROP COLUMN "_locale";
  ALTER TABLE "_pages_v_blocks_projects_projects" DROP COLUMN "_locale";
  ALTER TABLE "_pages_v_blocks_projects" DROP COLUMN "_locale";
  ALTER TABLE "_pages_v_blocks_contact" DROP COLUMN "_locale";
  ALTER TABLE "_pages_v_blocks_rich_text" DROP COLUMN "_locale";
  ALTER TABLE "_pages_v_blocks_product_hero_key_benefits" DROP COLUMN "_locale";
  ALTER TABLE "_pages_v_blocks_product_hero_cta_buttons" DROP COLUMN "_locale";
  ALTER TABLE "_pages_v_blocks_product_hero" DROP COLUMN "_locale";
  ALTER TABLE "_pages_v_blocks_key_features_features" DROP COLUMN "_locale";
  ALTER TABLE "_pages_v_blocks_key_features" DROP COLUMN "_locale";
  ALTER TABLE "_pages_v_blocks_product_gallery_images" DROP COLUMN "_locale";
  ALTER TABLE "_pages_v_blocks_product_gallery" DROP COLUMN "_locale";
  ALTER TABLE "_pages_v_blocks_specifications_specifications_items" DROP COLUMN "_locale";
  ALTER TABLE "_pages_v_blocks_specifications_specifications" DROP COLUMN "_locale";
  ALTER TABLE "_pages_v_blocks_specifications_certification_badges" DROP COLUMN "_locale";
  ALTER TABLE "_pages_v_blocks_specifications_additional_info_details" DROP COLUMN "_locale";
  ALTER TABLE "_pages_v_blocks_specifications" DROP COLUMN "_locale";
  ALTER TABLE "_pages_v_blocks_applications_applications_details" DROP COLUMN "_locale";
  ALTER TABLE "_pages_v_blocks_applications_applications" DROP COLUMN "_locale";
  ALTER TABLE "_pages_v_blocks_applications_stats" DROP COLUMN "_locale";
  ALTER TABLE "_pages_v_blocks_applications_case_study_stats" DROP COLUMN "_locale";
  ALTER TABLE "_pages_v_blocks_applications" DROP COLUMN "_locale";
  ALTER TABLE "_pages_v_blocks_technical_overview_process_steps" DROP COLUMN "_locale";
  ALTER TABLE "_pages_v_blocks_technical_overview_technical_benefits" DROP COLUMN "_locale";
  ALTER TABLE "_pages_v_blocks_technical_overview" DROP COLUMN "_locale";
  ALTER TABLE "_pages_v_blocks_benefits_comparison_benefits" DROP COLUMN "_locale";
  ALTER TABLE "_pages_v_blocks_benefits_comparison_summary_cards" DROP COLUMN "_locale";
  ALTER TABLE "_pages_v_blocks_benefits_comparison" DROP COLUMN "_locale";
  ALTER TABLE "_pages_v_blocks_product_c_t_a_stats" DROP COLUMN "_locale";
  ALTER TABLE "_pages_v_blocks_product_c_t_a_why_us_points" DROP COLUMN "_locale";
  ALTER TABLE "_pages_v_blocks_product_c_t_a_application_options" DROP COLUMN "_locale";
  ALTER TABLE "_pages_v_blocks_product_c_t_a" DROP COLUMN "_locale";
  ALTER TABLE "_pages_v_blocks_product_resources_resources" DROP COLUMN "_locale";
  ALTER TABLE "_pages_v_blocks_product_resources_quick_access_items" DROP COLUMN "_locale";
  ALTER TABLE "_pages_v_blocks_product_resources" DROP COLUMN "_locale";
  ALTER TABLE "_pages_v_blocks_contact_hero_quick_contact_methods" DROP COLUMN "_locale";
  ALTER TABLE "_pages_v_blocks_contact_hero" DROP COLUMN "_locale";
  ALTER TABLE "_pages_v_blocks_contact_form" DROP COLUMN "_locale";
  ALTER TABLE "_pages_v_blocks_contact_info_contact_methods" DROP COLUMN "_locale";
  ALTER TABLE "_pages_v_blocks_contact_info" DROP COLUMN "_locale";
  ALTER TABLE "_pages_v_blocks_contact_location" DROP COLUMN "_locale";
  ALTER TABLE "_pages_v_blocks_contact_f_a_q_faqs" DROP COLUMN "_locale";
  ALTER TABLE "_pages_v_blocks_contact_f_a_q" DROP COLUMN "_locale";
  ALTER TABLE "_pages_v_blocks_universal_hero_benefits" DROP COLUMN "_locale";
  ALTER TABLE "_pages_v_blocks_universal_hero_trust_indicators" DROP COLUMN "_locale";
  ALTER TABLE "_pages_v_blocks_universal_hero_stats" DROP COLUMN "_locale";
  ALTER TABLE "_pages_v_blocks_universal_hero_contact_methods" DROP COLUMN "_locale";
  ALTER TABLE "_pages_v_blocks_universal_hero" DROP COLUMN "_locale";
  ALTER TABLE "_pages_v_blocks_universal_c_t_a_benefits" DROP COLUMN "_locale";
  ALTER TABLE "_pages_v_blocks_universal_c_t_a_stats" DROP COLUMN "_locale";
  ALTER TABLE "_pages_v_blocks_universal_c_t_a" DROP COLUMN "_locale";
  ALTER TABLE "_pages_v_blocks_feature_grid_features_details" DROP COLUMN "_locale";
  ALTER TABLE "_pages_v_blocks_feature_grid_features" DROP COLUMN "_locale";
  ALTER TABLE "_pages_v_blocks_feature_grid" DROP COLUMN "_locale";
  ALTER TABLE "_pages_v_blocks_content_grid_items_applications" DROP COLUMN "_locale";
  ALTER TABLE "_pages_v_blocks_content_grid_items" DROP COLUMN "_locale";
  ALTER TABLE "_pages_v_blocks_content_grid" DROP COLUMN "_locale";
  ALTER TABLE "_pages_v_blocks_stats_section_stats" DROP COLUMN "_locale";
  ALTER TABLE "_pages_v_blocks_stats_section" DROP COLUMN "_locale";
  ALTER TABLE "_pages_v_blocks_process_steps_steps_details" DROP COLUMN "_locale";
  ALTER TABLE "_pages_v_blocks_process_steps_steps" DROP COLUMN "_locale";
  ALTER TABLE "_pages_v_blocks_process_steps" DROP COLUMN "_locale";
  ALTER TABLE "_pages_v_blocks_content_cards_cards_tags" DROP COLUMN "_locale";
  ALTER TABLE "_pages_v_blocks_content_cards_cards" DROP COLUMN "_locale";
  ALTER TABLE "_pages_v_blocks_content_cards" DROP COLUMN "_locale";
  ALTER TABLE "_pages_v_blocks_contact_section_benefits" DROP COLUMN "_locale";
  ALTER TABLE "_pages_v_blocks_contact_section" DROP COLUMN "_locale";
  ALTER TABLE "_pages_v_blocks_comparison_table_items" DROP COLUMN "_locale";
  ALTER TABLE "_pages_v_blocks_comparison_table" DROP COLUMN "_locale";
  ALTER TABLE "_pages_v_blocks_simple_page_breadcrumbs" DROP COLUMN "_locale";
  ALTER TABLE "_pages_v_blocks_simple_page_links" DROP COLUMN "_locale";
  ALTER TABLE "_pages_v_blocks_simple_page" DROP COLUMN "_locale";
  ALTER TABLE "_pages_v_blocks_brand_showcase_brands" DROP COLUMN "_locale";
  ALTER TABLE "_pages_v_blocks_brand_showcase" DROP COLUMN "_locale";
  ALTER TABLE "_pages_v_blocks_technical_content_process_steps" DROP COLUMN "_locale";
  ALTER TABLE "_pages_v_blocks_technical_content_specifications_items" DROP COLUMN "_locale";
  ALTER TABLE "_pages_v_blocks_technical_content_specifications" DROP COLUMN "_locale";
  ALTER TABLE "_pages_v_blocks_technical_content" DROP COLUMN "_locale";
  ALTER TABLE "_pages_v_blocks_resource_gallery_resources" DROP COLUMN "_locale";
  ALTER TABLE "_pages_v_blocks_resource_gallery_gallery_images" DROP COLUMN "_locale";
  ALTER TABLE "_pages_v_blocks_resource_gallery" DROP COLUMN "_locale";
  ALTER TABLE "_pages_v" DROP COLUMN "snapshot";
  ALTER TABLE "_pages_v" DROP COLUMN "published_locale";
  ALTER TABLE "_posts_v" DROP COLUMN "snapshot";
  ALTER TABLE "_posts_v" DROP COLUMN "published_locale";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "contact_submissions_id";
  ALTER TABLE "homepage_blocks_hero_cta_buttons" DROP COLUMN "_locale";
  ALTER TABLE "homepage_blocks_hero" DROP COLUMN "_locale";
  ALTER TABLE "homepage_blocks_logo_belt_logos" DROP COLUMN "_locale";
  ALTER TABLE "homepage_blocks_logo_belt" DROP COLUMN "_locale";
  ALTER TABLE "homepage_blocks_services_services_features" DROP COLUMN "_locale";
  ALTER TABLE "homepage_blocks_services_services" DROP COLUMN "_locale";
  ALTER TABLE "homepage_blocks_services" DROP COLUMN "_locale";
  ALTER TABLE "homepage_blocks_about_badges" DROP COLUMN "_locale";
  ALTER TABLE "homepage_blocks_about_stats" DROP COLUMN "_locale";
  ALTER TABLE "homepage_blocks_about_process" DROP COLUMN "_locale";
  ALTER TABLE "homepage_blocks_about" DROP COLUMN "_locale";
  ALTER TABLE "homepage_blocks_why_trust_reasons" DROP COLUMN "_locale";
  ALTER TABLE "homepage_blocks_why_trust_pillars" DROP COLUMN "_locale";
  ALTER TABLE "homepage_blocks_why_trust" DROP COLUMN "_locale";
  ALTER TABLE "homepage_blocks_projects_projects_stack" DROP COLUMN "_locale";
  ALTER TABLE "homepage_blocks_projects_projects" DROP COLUMN "_locale";
  ALTER TABLE "homepage_blocks_projects" DROP COLUMN "_locale";
  ALTER TABLE "homepage_blocks_contact" DROP COLUMN "_locale";
  DROP TYPE "public"."_locales";
  DROP TYPE "public"."enum__pages_v_published_locale";
  DROP TYPE "public"."enum__posts_v_published_locale";
  DROP TYPE "public"."enum_contact_submissions_emails_sent_type";
  DROP TYPE "public"."enum_contact_submissions_status";
  DROP TYPE "public"."enum_contact_submissions_priority";
  DROP TYPE "public"."enum_contact_submissions_source";`)
}
