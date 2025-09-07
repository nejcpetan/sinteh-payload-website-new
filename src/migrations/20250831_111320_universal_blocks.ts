import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-vercel-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_pages_blocks_product_hero_cta_buttons_type" AS ENUM('page', 'url', 'anchor');
  CREATE TYPE "public"."enum_pages_blocks_product_hero_cta_buttons_variant" AS ENUM('default', 'secondary', 'outline', 'ghost');
  CREATE TYPE "public"."enum_pages_blocks_key_features_features_icon" AS ENUM('mechanical', 'shield', 'retrofit', 'modular', 'temperature', 'key');
  CREATE TYPE "public"."enum_pages_blocks_applications_applications_icon" AS ENUM('oilgas', 'energy', 'pharm', 'manufacturing', 'atex', 'water');
  CREATE TYPE "public"."enum_pages_blocks_benefits_comparison_summary_cards_icon" AS ENUM('shield', 'clock', 'users');
  CREATE TYPE "public"."enum_pages_blocks_contact_hero_quick_contact_methods_type" AS ENUM('phone', 'email', 'location');
  CREATE TYPE "public"."enum_pages_blocks_universal_hero_variant" AS ENUM('standard', 'blog', 'contact', 'minimal');
  CREATE TYPE "public"."enum_pages_blocks_universal_hero_benefits_layout" AS ENUM('grid', 'list');
  CREATE TYPE "public"."enum_pages_blocks_universal_hero_primary_c_t_a_variant" AS ENUM('default', 'outline');
  CREATE TYPE "public"."enum_pages_blocks_universal_hero_secondary_c_t_a_variant" AS ENUM('default', 'outline');
  CREATE TYPE "public"."enum_pages_blocks_universal_hero_background_style" AS ENUM('gradient', 'pattern', 'solid', 'animated');
  CREATE TYPE "public"."enum_pages_blocks_universal_hero_content_alignment" AS ENUM('left', 'center');
  CREATE TYPE "public"."enum_pages_blocks_universal_c_t_a_variant" AS ENUM('standard', 'with-contact-form', 'minimal', 'full-width');
  CREATE TYPE "public"."enum_pages_blocks_universal_c_t_a_primary_c_t_a_variant" AS ENUM('default', 'outline');
  CREATE TYPE "public"."enum_pages_blocks_universal_c_t_a_secondary_c_t_a_variant" AS ENUM('default', 'outline');
  CREATE TYPE "public"."enum_pages_blocks_universal_c_t_a_background_style" AS ENUM('surface', 'gradient', 'white', 'transparent');
  CREATE TYPE "public"."enum_pages_blocks_feature_grid_variant" AS ENUM('standard', 'capabilities', 'applications', 'compact', 'detailed');
  CREATE TYPE "public"."enum_pages_blocks_feature_grid_columns" AS ENUM('2', '3', '4');
  CREATE TYPE "public"."enum_pages_blocks_feature_grid_card_style" AS ENUM('elevated', 'bordered', 'minimal', 'gradient');
  CREATE TYPE "public"."enum_pages_blocks_feature_grid_background_style" AS ENUM('surface', 'background', 'white', 'gradient');
  CREATE TYPE "public"."enum_pages_blocks_content_grid_variant" AS ENUM('industry', 'blog-categories', 'applications', 'general', 'services');
  CREATE TYPE "public"."enum_pages_blocks_content_grid_columns" AS ENUM('2', '3', '4');
  CREATE TYPE "public"."enum_pages_blocks_content_grid_background_style" AS ENUM('surface', 'background', 'white', 'light-gray');
  CREATE TYPE "public"."enum_pages_blocks_stats_section_variant" AS ENUM('standard', 'compact', 'highlighted', 'inline', 'cards');
  CREATE TYPE "public"."enum_pages_blocks_stats_section_columns" AS ENUM('2', '3', '4', '5');
  CREATE TYPE "public"."enum_pages_blocks_stats_section_background_style" AS ENUM('background', 'surface', 'white', 'transparent');
  CREATE TYPE "public"."enum_pages_blocks_process_steps_variant" AS ENUM('horizontal', 'vertical', 'service-process', 'maintenance-programs');
  CREATE TYPE "public"."enum_pages_blocks_process_steps_background_style" AS ENUM('surface', 'background', 'white');
  CREATE TYPE "public"."enum_pages_blocks_content_cards_variant" AS ENUM('blog-posts', 'service-brands', 'projects', 'general', 'featured-content');
  CREATE TYPE "public"."enum_pages_blocks_content_cards_columns" AS ENUM('2', '3', '4');
  CREATE TYPE "public"."enum_pages_blocks_content_cards_background_style" AS ENUM('background', 'surface', 'white');
  CREATE TYPE "public"."enum_pages_blocks_contact_section_variant" AS ENUM('form-only', 'info-only', 'split', 'hero-style', 'compact');
  CREATE TYPE "public"."enum_pages_blocks_contact_section_background_style" AS ENUM('background', 'surface', 'white');
  CREATE TYPE "public"."enum_pages_blocks_comparison_table_background_style" AS ENUM('surface', 'background', 'white');
  CREATE TYPE "public"."enum_pages_blocks_simple_page_variant" AS ENUM('standard', 'centered', 'documentation', 'legal', 'minimal');
  CREATE TYPE "public"."enum_pages_blocks_brand_showcase_variant" AS ENUM('logo-belt', 'service-brands', 'partner-grid', 'certification-badges');
  CREATE TYPE "public"."enum_pages_blocks_brand_showcase_background_style" AS ENUM('background', 'surface', 'white');
  CREATE TYPE "public"."enum_pages_blocks_technical_content_variant" AS ENUM('overview', 'specifications', 'combined');
  CREATE TYPE "public"."enum_pages_blocks_technical_content_background_style" AS ENUM('surface', 'background', 'white');
  CREATE TYPE "public"."enum_pages_blocks_resource_gallery_variant" AS ENUM('resources', 'gallery', 'combined');
  CREATE TYPE "public"."enum_pages_blocks_resource_gallery_background_style" AS ENUM('surface', 'background', 'white');
  CREATE TYPE "public"."enum__pages_v_blocks_product_hero_cta_buttons_type" AS ENUM('page', 'url', 'anchor');
  CREATE TYPE "public"."enum__pages_v_blocks_product_hero_cta_buttons_variant" AS ENUM('default', 'secondary', 'outline', 'ghost');
  CREATE TYPE "public"."enum__pages_v_blocks_key_features_features_icon" AS ENUM('mechanical', 'shield', 'retrofit', 'modular', 'temperature', 'key');
  CREATE TYPE "public"."enum__pages_v_blocks_applications_applications_icon" AS ENUM('oilgas', 'energy', 'pharm', 'manufacturing', 'atex', 'water');
  CREATE TYPE "public"."enum__pages_v_blocks_benefits_comparison_summary_cards_icon" AS ENUM('shield', 'clock', 'users');
  CREATE TYPE "public"."enum__pages_v_blocks_contact_hero_quick_contact_methods_type" AS ENUM('phone', 'email', 'location');
  CREATE TYPE "public"."enum__pages_v_blocks_universal_hero_variant" AS ENUM('standard', 'blog', 'contact', 'minimal');
  CREATE TYPE "public"."enum__pages_v_blocks_universal_hero_benefits_layout" AS ENUM('grid', 'list');
  CREATE TYPE "public"."enum__pages_v_blocks_universal_hero_primary_c_t_a_variant" AS ENUM('default', 'outline');
  CREATE TYPE "public"."enum__pages_v_blocks_universal_hero_secondary_c_t_a_variant" AS ENUM('default', 'outline');
  CREATE TYPE "public"."enum__pages_v_blocks_universal_hero_background_style" AS ENUM('gradient', 'pattern', 'solid', 'animated');
  CREATE TYPE "public"."enum__pages_v_blocks_universal_hero_content_alignment" AS ENUM('left', 'center');
  CREATE TYPE "public"."enum__pages_v_blocks_universal_c_t_a_variant" AS ENUM('standard', 'with-contact-form', 'minimal', 'full-width');
  CREATE TYPE "public"."enum__pages_v_blocks_universal_c_t_a_primary_c_t_a_variant" AS ENUM('default', 'outline');
  CREATE TYPE "public"."enum__pages_v_blocks_universal_c_t_a_secondary_c_t_a_variant" AS ENUM('default', 'outline');
  CREATE TYPE "public"."enum__pages_v_blocks_universal_c_t_a_background_style" AS ENUM('surface', 'gradient', 'white', 'transparent');
  CREATE TYPE "public"."enum__pages_v_blocks_feature_grid_variant" AS ENUM('standard', 'capabilities', 'applications', 'compact', 'detailed');
  CREATE TYPE "public"."enum__pages_v_blocks_feature_grid_columns" AS ENUM('2', '3', '4');
  CREATE TYPE "public"."enum__pages_v_blocks_feature_grid_card_style" AS ENUM('elevated', 'bordered', 'minimal', 'gradient');
  CREATE TYPE "public"."enum__pages_v_blocks_feature_grid_background_style" AS ENUM('surface', 'background', 'white', 'gradient');
  CREATE TYPE "public"."enum__pages_v_blocks_content_grid_variant" AS ENUM('industry', 'blog-categories', 'applications', 'general', 'services');
  CREATE TYPE "public"."enum__pages_v_blocks_content_grid_columns" AS ENUM('2', '3', '4');
  CREATE TYPE "public"."enum__pages_v_blocks_content_grid_background_style" AS ENUM('surface', 'background', 'white', 'light-gray');
  CREATE TYPE "public"."enum__pages_v_blocks_stats_section_variant" AS ENUM('standard', 'compact', 'highlighted', 'inline', 'cards');
  CREATE TYPE "public"."enum__pages_v_blocks_stats_section_columns" AS ENUM('2', '3', '4', '5');
  CREATE TYPE "public"."enum__pages_v_blocks_stats_section_background_style" AS ENUM('background', 'surface', 'white', 'transparent');
  CREATE TYPE "public"."enum__pages_v_blocks_process_steps_variant" AS ENUM('horizontal', 'vertical', 'service-process', 'maintenance-programs');
  CREATE TYPE "public"."enum__pages_v_blocks_process_steps_background_style" AS ENUM('surface', 'background', 'white');
  CREATE TYPE "public"."enum__pages_v_blocks_content_cards_variant" AS ENUM('blog-posts', 'service-brands', 'projects', 'general', 'featured-content');
  CREATE TYPE "public"."enum__pages_v_blocks_content_cards_columns" AS ENUM('2', '3', '4');
  CREATE TYPE "public"."enum__pages_v_blocks_content_cards_background_style" AS ENUM('background', 'surface', 'white');
  CREATE TYPE "public"."enum__pages_v_blocks_contact_section_variant" AS ENUM('form-only', 'info-only', 'split', 'hero-style', 'compact');
  CREATE TYPE "public"."enum__pages_v_blocks_contact_section_background_style" AS ENUM('background', 'surface', 'white');
  CREATE TYPE "public"."enum__pages_v_blocks_comparison_table_background_style" AS ENUM('surface', 'background', 'white');
  CREATE TYPE "public"."enum__pages_v_blocks_simple_page_variant" AS ENUM('standard', 'centered', 'documentation', 'legal', 'minimal');
  CREATE TYPE "public"."enum__pages_v_blocks_brand_showcase_variant" AS ENUM('logo-belt', 'service-brands', 'partner-grid', 'certification-badges');
  CREATE TYPE "public"."enum__pages_v_blocks_brand_showcase_background_style" AS ENUM('background', 'surface', 'white');
  CREATE TYPE "public"."enum__pages_v_blocks_technical_content_variant" AS ENUM('overview', 'specifications', 'combined');
  CREATE TYPE "public"."enum__pages_v_blocks_technical_content_background_style" AS ENUM('surface', 'background', 'white');
  CREATE TYPE "public"."enum__pages_v_blocks_resource_gallery_variant" AS ENUM('resources', 'gallery', 'combined');
  CREATE TYPE "public"."enum__pages_v_blocks_resource_gallery_background_style" AS ENUM('surface', 'background', 'white');
  CREATE TYPE "public"."enum_footer_bottom_links_type" AS ENUM('page', 'url', 'anchor');
  CREATE TABLE "pages_blocks_rich_text" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"content" jsonb,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_product_hero_key_benefits" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"description" varchar
  );
  
  CREATE TABLE "pages_blocks_product_hero_cta_buttons" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"type" "enum_pages_blocks_product_hero_cta_buttons_type" DEFAULT 'page',
  	"page_id" integer,
  	"url" varchar,
  	"anchor" varchar,
  	"variant" "enum_pages_blocks_product_hero_cta_buttons_variant" DEFAULT 'default'
  );
  
  CREATE TABLE "pages_blocks_product_hero" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"badge" varchar,
  	"title" varchar,
  	"subtitle" varchar,
  	"description" varchar,
  	"background_image_id" integer,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_key_features_features" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"icon" "enum_pages_blocks_key_features_features_icon",
  	"title" varchar,
  	"description" varchar
  );
  
  CREATE TABLE "pages_blocks_key_features" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"badge" varchar,
  	"title" varchar,
  	"subtitle" varchar,
  	"bottom_highlight_title" varchar,
  	"bottom_highlight_description" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_product_gallery_images" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"description" varchar,
  	"category" varchar,
  	"image_id" integer
  );
  
  CREATE TABLE "pages_blocks_product_gallery" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"badge" varchar,
  	"title" varchar,
  	"subtitle" varchar,
  	"download_section_title" varchar,
  	"download_section_description" varchar,
  	"download_section_download_button_text" varchar DEFAULT 'Prenesi galerijo',
  	"download_section_request_button_text" varchar DEFAULT 'Zahtevaj specifične slike',
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_specifications_specifications_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"value" varchar
  );
  
  CREATE TABLE "pages_blocks_specifications_specifications" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"category" varchar
  );
  
  CREATE TABLE "pages_blocks_specifications_certification_badges" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"description" varchar
  );
  
  CREATE TABLE "pages_blocks_specifications_additional_info_details" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"value" varchar
  );
  
  CREATE TABLE "pages_blocks_specifications" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"badge" varchar,
  	"title" varchar,
  	"subtitle" varchar,
  	"additional_info_title" varchar,
  	"additional_info_description" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_applications_applications_details" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"detail" varchar
  );
  
  CREATE TABLE "pages_blocks_applications_applications" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"icon" "enum_pages_blocks_applications_applications_icon",
  	"title" varchar,
  	"description" varchar
  );
  
  CREATE TABLE "pages_blocks_applications_stats" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"number" varchar,
  	"label" varchar
  );
  
  CREATE TABLE "pages_blocks_applications_case_study_stats" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"value" varchar
  );
  
  CREATE TABLE "pages_blocks_applications" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"badge" varchar,
  	"title" varchar,
  	"subtitle" varchar,
  	"case_study_title" varchar,
  	"case_study_description" varchar,
  	"case_study_image_id" integer,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_technical_overview_process_steps" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"description" varchar
  );
  
  CREATE TABLE "pages_blocks_technical_overview_technical_benefits" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"description" varchar
  );
  
  CREATE TABLE "pages_blocks_technical_overview" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"badge" varchar,
  	"title" varchar,
  	"description" varchar,
  	"technical_image_id" integer,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_benefits_comparison_benefits" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"advantage" varchar,
  	"description" varchar,
  	"m_gard" varchar,
  	"electronic" varchar
  );
  
  CREATE TABLE "pages_blocks_benefits_comparison_summary_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"icon" "enum_pages_blocks_benefits_comparison_summary_cards_icon",
  	"title" varchar,
  	"description" varchar
  );
  
  CREATE TABLE "pages_blocks_benefits_comparison" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"badge" varchar,
  	"title" varchar,
  	"subtitle" varchar,
  	"bottom_c_t_a_title" varchar,
  	"bottom_c_t_a_description" varchar,
  	"bottom_c_t_a_primary_button_text" varchar DEFAULT 'Kontaktirajte nas',
  	"bottom_c_t_a_secondary_button_text" varchar DEFAULT 'Prenesi dokumentacijo',
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_product_c_t_a_stats" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"value" varchar,
  	"label" varchar
  );
  
  CREATE TABLE "pages_blocks_product_c_t_a_why_us_points" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar
  );
  
  CREATE TABLE "pages_blocks_product_c_t_a_application_options" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"value" varchar,
  	"label" varchar
  );
  
  CREATE TABLE "pages_blocks_product_c_t_a" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"description" varchar,
  	"contact_info_phone" varchar,
  	"contact_info_email" varchar,
  	"contact_info_response_time" varchar,
  	"hero_image_id" integer,
  	"form_title" varchar DEFAULT 'Povpraševanje za sistem',
  	"privacy_text" varchar DEFAULT 'Soglašam z politiko zasebnosti in obdelavo osebnih podatkov za namen odgovora na povpraševanje.',
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_product_resources_resources" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"description" varchar,
  	"file_type" varchar,
  	"file_size" varchar,
  	"icon" varchar,
  	"category" varchar,
  	"download_url" varchar
  );
  
  CREATE TABLE "pages_blocks_product_resources_quick_access_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"file_info" varchar,
  	"download_url" varchar
  );
  
  CREATE TABLE "pages_blocks_product_resources" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"badge" varchar,
  	"title" varchar,
  	"subtitle" varchar,
  	"contact_section_title" varchar,
  	"contact_section_description" varchar,
  	"contact_section_phone" varchar,
  	"contact_section_email" varchar,
  	"newsletter_section_title" varchar,
  	"newsletter_section_description" varchar,
  	"newsletter_section_privacy_text" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_contact_hero_quick_contact_methods" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"type" "enum_pages_blocks_contact_hero_quick_contact_methods_type",
  	"label" varchar,
  	"value" varchar,
  	"link" varchar
  );
  
  CREATE TABLE "pages_blocks_contact_hero" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar DEFAULT 'Kontakt',
  	"subtitle" varchar DEFAULT 'Odgovarjamo v 24h | Nujna podpora: 24/7',
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_contact_form" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"badge" varchar DEFAULT 'Povpraševanje',
  	"title" varchar DEFAULT 'Pošljite sporočilo',
  	"subtitle" varchar DEFAULT 'Odgovorimo v 24 urah.',
  	"form_title" varchar DEFAULT 'Kontaktni obrazec',
  	"submit_button_text" varchar DEFAULT 'Pošlji povpraševanje',
  	"submit_button_loading_text" varchar DEFAULT 'Pošiljam...',
  	"privacy_text" varchar DEFAULT 'Soglašam z obdelavo osebnih podatkov in politiko zasebnosti. Podatki bodo uporabljeni izključno za obravnavo povpraševanja in pripravo ponudbe.',
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_contact_info_contact_methods" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"email" varchar,
  	"phone" varchar,
  	"description" varchar,
  	"hours" varchar
  );
  
  CREATE TABLE "pages_blocks_contact_info" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"badge" varchar DEFAULT 'Kontaktni podatki',
  	"title" varchar DEFAULT 'Direkten kontakt',
  	"subtitle" varchar DEFAULT 'Telefon in e-mail za hitrejši odziv.',
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_contact_location" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"badge" varchar DEFAULT 'Lokacija',
  	"title" varchar DEFAULT 'Naš urad',
  	"subtitle" varchar DEFAULT 'V Celju, obisk po dogovoru.',
  	"map_embed_url" varchar DEFAULT 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2751.8!2d15.2664!3d46.2396!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x476f8a89d21ae0ad%3A0x4a5b0f1c78ae9a7f!2sCesta%20na%20Ostro%C5%BEno%208%2C%203000%20Celje%2C%20Slovenia!5e0!3m2!1sen!2ssi!4v1700000000000!5m2!1sen!2ssi',
  	"address_company_name" varchar DEFAULT 'SINTEH PRO d.o.o.',
  	"address_street" varchar DEFAULT 'Cesta na Ostrožno 8',
  	"address_city" varchar DEFAULT '3000 Celje',
  	"address_country" varchar DEFAULT 'Slovenija - EU',
  	"emergency_phone" varchar DEFAULT '+386 (3) 426 36 46',
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_contact_f_a_q_faqs" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"question" varchar,
  	"answer" varchar
  );
  
  CREATE TABLE "pages_blocks_contact_f_a_q" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"badge" varchar DEFAULT 'Pogosta vprašanja',
  	"title" varchar DEFAULT 'Pogosta vprašanja',
  	"subtitle" varchar DEFAULT 'Odgovori na najpogostejša vprašanja, ki nam jih zastavljajo stranke.',
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_universal_hero_benefits" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"description" varchar
  );
  
  CREATE TABLE "pages_blocks_universal_hero_trust_indicators" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar
  );
  
  CREATE TABLE "pages_blocks_universal_hero_stats" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"value" varchar,
  	"label" varchar
  );
  
  CREATE TABLE "pages_blocks_universal_hero_contact_methods" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"href" varchar,
  	"title" varchar,
  	"value" varchar
  );
  
  CREATE TABLE "pages_blocks_universal_hero" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"variant" "enum_pages_blocks_universal_hero_variant" DEFAULT 'standard',
  	"badge" varchar,
  	"title" varchar,
  	"subtitle" varchar,
  	"description" varchar,
  	"benefits_layout" "enum_pages_blocks_universal_hero_benefits_layout" DEFAULT 'grid',
  	"primary_c_t_a_text" varchar,
  	"primary_c_t_a_href" varchar,
  	"primary_c_t_a_variant" "enum_pages_blocks_universal_hero_primary_c_t_a_variant" DEFAULT 'default',
  	"secondary_c_t_a_text" varchar,
  	"secondary_c_t_a_href" varchar,
  	"secondary_c_t_a_variant" "enum_pages_blocks_universal_hero_secondary_c_t_a_variant" DEFAULT 'outline',
  	"trust_text" varchar,
  	"show_image" boolean DEFAULT true,
  	"background_style" "enum_pages_blocks_universal_hero_background_style" DEFAULT 'gradient',
  	"content_alignment" "enum_pages_blocks_universal_hero_content_alignment" DEFAULT 'left',
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_universal_c_t_a_benefits" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"benefit" varchar
  );
  
  CREATE TABLE "pages_blocks_universal_c_t_a_stats" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"value" varchar,
  	"label" varchar
  );
  
  CREATE TABLE "pages_blocks_universal_c_t_a" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"variant" "enum_pages_blocks_universal_c_t_a_variant" DEFAULT 'standard',
  	"title" varchar,
  	"subtitle" varchar,
  	"description" varchar,
  	"primary_c_t_a_text" varchar,
  	"primary_c_t_a_href" varchar,
  	"primary_c_t_a_variant" "enum_pages_blocks_universal_c_t_a_primary_c_t_a_variant" DEFAULT 'default',
  	"secondary_c_t_a_text" varchar,
  	"secondary_c_t_a_href" varchar,
  	"secondary_c_t_a_variant" "enum_pages_blocks_universal_c_t_a_secondary_c_t_a_variant" DEFAULT 'outline',
  	"background_style" "enum_pages_blocks_universal_c_t_a_background_style" DEFAULT 'surface',
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_feature_grid_features_details" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"detail" varchar
  );
  
  CREATE TABLE "pages_blocks_feature_grid_features" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"description" varchar,
  	"badge" varchar,
  	"href" varchar,
  	"cta_text" varchar
  );
  
  CREATE TABLE "pages_blocks_feature_grid" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"variant" "enum_pages_blocks_feature_grid_variant" DEFAULT 'standard',
  	"title" varchar,
  	"subtitle" varchar,
  	"description" varchar,
  	"badge" varchar,
  	"columns" "enum_pages_blocks_feature_grid_columns" DEFAULT '3',
  	"card_style" "enum_pages_blocks_feature_grid_card_style" DEFAULT 'elevated',
  	"background_style" "enum_pages_blocks_feature_grid_background_style" DEFAULT 'surface',
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_content_grid_items_applications" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"application" varchar
  );
  
  CREATE TABLE "pages_blocks_content_grid_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"title" varchar,
  	"description" varchar,
  	"href" varchar,
  	"post_count" numeric
  );
  
  CREATE TABLE "pages_blocks_content_grid" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"variant" "enum_pages_blocks_content_grid_variant" DEFAULT 'general',
  	"title" varchar,
  	"subtitle" varchar,
  	"description" varchar,
  	"badge" varchar,
  	"columns" "enum_pages_blocks_content_grid_columns" DEFAULT '3',
  	"background_style" "enum_pages_blocks_content_grid_background_style" DEFAULT 'surface',
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_stats_section_stats" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"value" varchar,
  	"label" varchar,
  	"description" varchar
  );
  
  CREATE TABLE "pages_blocks_stats_section" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"variant" "enum_pages_blocks_stats_section_variant" DEFAULT 'standard',
  	"title" varchar,
  	"subtitle" varchar,
  	"description" varchar,
  	"badge" varchar,
  	"columns" "enum_pages_blocks_stats_section_columns" DEFAULT '3',
  	"background_style" "enum_pages_blocks_stats_section_background_style" DEFAULT 'background',
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_process_steps_steps_details" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"detail" varchar
  );
  
  CREATE TABLE "pages_blocks_process_steps_steps" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"number" varchar,
  	"title" varchar,
  	"description" varchar,
  	"duration" varchar,
  	"deliverable" varchar
  );
  
  CREATE TABLE "pages_blocks_process_steps" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"variant" "enum_pages_blocks_process_steps_variant" DEFAULT 'horizontal',
  	"title" varchar,
  	"subtitle" varchar,
  	"description" varchar,
  	"badge" varchar,
  	"background_style" "enum_pages_blocks_process_steps_background_style" DEFAULT 'surface',
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_content_cards_cards_tags" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"tag" varchar
  );
  
  CREATE TABLE "pages_blocks_content_cards_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"description" varchar,
  	"excerpt" varchar,
  	"category" varchar,
  	"read_time" varchar,
  	"published_at" varchar,
  	"href" varchar,
  	"featured" boolean
  );
  
  CREATE TABLE "pages_blocks_content_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"variant" "enum_pages_blocks_content_cards_variant" DEFAULT 'general',
  	"title" varchar,
  	"subtitle" varchar,
  	"description" varchar,
  	"badge" varchar,
  	"columns" "enum_pages_blocks_content_cards_columns" DEFAULT '3',
  	"background_style" "enum_pages_blocks_content_cards_background_style" DEFAULT 'background',
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_contact_section_benefits" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"benefit" varchar
  );
  
  CREATE TABLE "pages_blocks_contact_section" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"variant" "enum_pages_blocks_contact_section_variant" DEFAULT 'split',
  	"title" varchar,
  	"description" varchar,
  	"badge" varchar,
  	"form_title" varchar,
  	"form_description" varchar,
  	"background_style" "enum_pages_blocks_contact_section_background_style" DEFAULT 'background',
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_comparison_table_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"advantage" varchar,
  	"description" varchar,
  	"primary" varchar,
  	"secondary" varchar
  );
  
  CREATE TABLE "pages_blocks_comparison_table" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"description" varchar,
  	"badge" varchar,
  	"primary_label" varchar,
  	"secondary_label" varchar,
  	"background_style" "enum_pages_blocks_comparison_table_background_style" DEFAULT 'surface',
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_simple_page_breadcrumbs" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"href" varchar
  );
  
  CREATE TABLE "pages_blocks_simple_page_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"href" varchar,
  	"description" varchar
  );
  
  CREATE TABLE "pages_blocks_simple_page" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"variant" "enum_pages_blocks_simple_page_variant" DEFAULT 'standard',
  	"title" varchar,
  	"subtitle" varchar,
  	"content" jsonb,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_brand_showcase_brands" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"description" varchar,
  	"logo_id" integer
  );
  
  CREATE TABLE "pages_blocks_brand_showcase" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"variant" "enum_pages_blocks_brand_showcase_variant" DEFAULT 'logo-belt',
  	"title" varchar,
  	"description" varchar,
  	"badge" varchar,
  	"background_style" "enum_pages_blocks_brand_showcase_background_style" DEFAULT 'background',
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_technical_content_process_steps" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"number" varchar,
  	"title" varchar,
  	"description" varchar
  );
  
  CREATE TABLE "pages_blocks_technical_content_specifications_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"value" varchar
  );
  
  CREATE TABLE "pages_blocks_technical_content_specifications" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"category" varchar
  );
  
  CREATE TABLE "pages_blocks_technical_content" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"variant" "enum_pages_blocks_technical_content_variant" DEFAULT 'overview',
  	"title" varchar,
  	"description" varchar,
  	"badge" varchar,
  	"overview_content" jsonb,
  	"background_style" "enum_pages_blocks_technical_content_background_style" DEFAULT 'surface',
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_resource_gallery_resources" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"description" varchar,
  	"file_type" varchar,
  	"file_size" varchar,
  	"category" varchar,
  	"download_url" varchar
  );
  
  CREATE TABLE "pages_blocks_resource_gallery_gallery_images" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"description" varchar,
  	"category" varchar,
  	"image_id" integer
  );
  
  CREATE TABLE "pages_blocks_resource_gallery" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"variant" "enum_pages_blocks_resource_gallery_variant" DEFAULT 'resources',
  	"title" varchar,
  	"description" varchar,
  	"badge" varchar,
  	"background_style" "enum_pages_blocks_resource_gallery_background_style" DEFAULT 'surface',
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_rich_text" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"content" jsonb,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_product_hero_key_benefits" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"description" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_product_hero_cta_buttons" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"type" "enum__pages_v_blocks_product_hero_cta_buttons_type" DEFAULT 'page',
  	"page_id" integer,
  	"url" varchar,
  	"anchor" varchar,
  	"variant" "enum__pages_v_blocks_product_hero_cta_buttons_variant" DEFAULT 'default',
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_product_hero" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"badge" varchar,
  	"title" varchar,
  	"subtitle" varchar,
  	"description" varchar,
  	"background_image_id" integer,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_key_features_features" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"icon" "enum__pages_v_blocks_key_features_features_icon",
  	"title" varchar,
  	"description" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_key_features" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"badge" varchar,
  	"title" varchar,
  	"subtitle" varchar,
  	"bottom_highlight_title" varchar,
  	"bottom_highlight_description" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_product_gallery_images" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"description" varchar,
  	"category" varchar,
  	"image_id" integer,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_product_gallery" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"badge" varchar,
  	"title" varchar,
  	"subtitle" varchar,
  	"download_section_title" varchar,
  	"download_section_description" varchar,
  	"download_section_download_button_text" varchar DEFAULT 'Prenesi galerijo',
  	"download_section_request_button_text" varchar DEFAULT 'Zahtevaj specifične slike',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_specifications_specifications_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"value" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_specifications_specifications" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"category" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_specifications_certification_badges" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"description" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_specifications_additional_info_details" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"value" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_specifications" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"badge" varchar,
  	"title" varchar,
  	"subtitle" varchar,
  	"additional_info_title" varchar,
  	"additional_info_description" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_applications_applications_details" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"detail" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_applications_applications" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"icon" "enum__pages_v_blocks_applications_applications_icon",
  	"title" varchar,
  	"description" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_applications_stats" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"number" varchar,
  	"label" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_applications_case_study_stats" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"value" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_applications" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"badge" varchar,
  	"title" varchar,
  	"subtitle" varchar,
  	"case_study_title" varchar,
  	"case_study_description" varchar,
  	"case_study_image_id" integer,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_technical_overview_process_steps" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"description" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_technical_overview_technical_benefits" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"description" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_technical_overview" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"badge" varchar,
  	"title" varchar,
  	"description" varchar,
  	"technical_image_id" integer,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_benefits_comparison_benefits" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"advantage" varchar,
  	"description" varchar,
  	"m_gard" varchar,
  	"electronic" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_benefits_comparison_summary_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"icon" "enum__pages_v_blocks_benefits_comparison_summary_cards_icon",
  	"title" varchar,
  	"description" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_benefits_comparison" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"badge" varchar,
  	"title" varchar,
  	"subtitle" varchar,
  	"bottom_c_t_a_title" varchar,
  	"bottom_c_t_a_description" varchar,
  	"bottom_c_t_a_primary_button_text" varchar DEFAULT 'Kontaktirajte nas',
  	"bottom_c_t_a_secondary_button_text" varchar DEFAULT 'Prenesi dokumentacijo',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_product_c_t_a_stats" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"value" varchar,
  	"label" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_product_c_t_a_why_us_points" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"text" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_product_c_t_a_application_options" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"value" varchar,
  	"label" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_product_c_t_a" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"description" varchar,
  	"contact_info_phone" varchar,
  	"contact_info_email" varchar,
  	"contact_info_response_time" varchar,
  	"hero_image_id" integer,
  	"form_title" varchar DEFAULT 'Povpraševanje za sistem',
  	"privacy_text" varchar DEFAULT 'Soglašam z politiko zasebnosti in obdelavo osebnih podatkov za namen odgovora na povpraševanje.',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_product_resources_resources" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"description" varchar,
  	"file_type" varchar,
  	"file_size" varchar,
  	"icon" varchar,
  	"category" varchar,
  	"download_url" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_product_resources_quick_access_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"file_info" varchar,
  	"download_url" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_product_resources" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"badge" varchar,
  	"title" varchar,
  	"subtitle" varchar,
  	"contact_section_title" varchar,
  	"contact_section_description" varchar,
  	"contact_section_phone" varchar,
  	"contact_section_email" varchar,
  	"newsletter_section_title" varchar,
  	"newsletter_section_description" varchar,
  	"newsletter_section_privacy_text" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_contact_hero_quick_contact_methods" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"type" "enum__pages_v_blocks_contact_hero_quick_contact_methods_type",
  	"label" varchar,
  	"value" varchar,
  	"link" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_contact_hero" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar DEFAULT 'Kontakt',
  	"subtitle" varchar DEFAULT 'Odgovarjamo v 24h | Nujna podpora: 24/7',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_contact_form" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"badge" varchar DEFAULT 'Povpraševanje',
  	"title" varchar DEFAULT 'Pošljite sporočilo',
  	"subtitle" varchar DEFAULT 'Odgovorimo v 24 urah.',
  	"form_title" varchar DEFAULT 'Kontaktni obrazec',
  	"submit_button_text" varchar DEFAULT 'Pošlji povpraševanje',
  	"submit_button_loading_text" varchar DEFAULT 'Pošiljam...',
  	"privacy_text" varchar DEFAULT 'Soglašam z obdelavo osebnih podatkov in politiko zasebnosti. Podatki bodo uporabljeni izključno za obravnavo povpraševanja in pripravo ponudbe.',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_contact_info_contact_methods" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"email" varchar,
  	"phone" varchar,
  	"description" varchar,
  	"hours" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_contact_info" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"badge" varchar DEFAULT 'Kontaktni podatki',
  	"title" varchar DEFAULT 'Direkten kontakt',
  	"subtitle" varchar DEFAULT 'Telefon in e-mail za hitrejši odziv.',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_contact_location" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"badge" varchar DEFAULT 'Lokacija',
  	"title" varchar DEFAULT 'Naš urad',
  	"subtitle" varchar DEFAULT 'V Celju, obisk po dogovoru.',
  	"map_embed_url" varchar DEFAULT 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2751.8!2d15.2664!3d46.2396!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x476f8a89d21ae0ad%3A0x4a5b0f1c78ae9a7f!2sCesta%20na%20Ostro%C5%BEno%208%2C%203000%20Celje%2C%20Slovenia!5e0!3m2!1sen!2ssi!4v1700000000000!5m2!1sen!2ssi',
  	"address_company_name" varchar DEFAULT 'SINTEH PRO d.o.o.',
  	"address_street" varchar DEFAULT 'Cesta na Ostrožno 8',
  	"address_city" varchar DEFAULT '3000 Celje',
  	"address_country" varchar DEFAULT 'Slovenija - EU',
  	"emergency_phone" varchar DEFAULT '+386 (3) 426 36 46',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_contact_f_a_q_faqs" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"question" varchar,
  	"answer" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_contact_f_a_q" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"badge" varchar DEFAULT 'Pogosta vprašanja',
  	"title" varchar DEFAULT 'Pogosta vprašanja',
  	"subtitle" varchar DEFAULT 'Odgovori na najpogostejša vprašanja, ki nam jih zastavljajo stranke.',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_universal_hero_benefits" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"description" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_universal_hero_trust_indicators" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"text" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_universal_hero_stats" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"value" varchar,
  	"label" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_universal_hero_contact_methods" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"href" varchar,
  	"title" varchar,
  	"value" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_universal_hero" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"variant" "enum__pages_v_blocks_universal_hero_variant" DEFAULT 'standard',
  	"badge" varchar,
  	"title" varchar,
  	"subtitle" varchar,
  	"description" varchar,
  	"benefits_layout" "enum__pages_v_blocks_universal_hero_benefits_layout" DEFAULT 'grid',
  	"primary_c_t_a_text" varchar,
  	"primary_c_t_a_href" varchar,
  	"primary_c_t_a_variant" "enum__pages_v_blocks_universal_hero_primary_c_t_a_variant" DEFAULT 'default',
  	"secondary_c_t_a_text" varchar,
  	"secondary_c_t_a_href" varchar,
  	"secondary_c_t_a_variant" "enum__pages_v_blocks_universal_hero_secondary_c_t_a_variant" DEFAULT 'outline',
  	"trust_text" varchar,
  	"show_image" boolean DEFAULT true,
  	"background_style" "enum__pages_v_blocks_universal_hero_background_style" DEFAULT 'gradient',
  	"content_alignment" "enum__pages_v_blocks_universal_hero_content_alignment" DEFAULT 'left',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_universal_c_t_a_benefits" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"benefit" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_universal_c_t_a_stats" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"value" varchar,
  	"label" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_universal_c_t_a" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"variant" "enum__pages_v_blocks_universal_c_t_a_variant" DEFAULT 'standard',
  	"title" varchar,
  	"subtitle" varchar,
  	"description" varchar,
  	"primary_c_t_a_text" varchar,
  	"primary_c_t_a_href" varchar,
  	"primary_c_t_a_variant" "enum__pages_v_blocks_universal_c_t_a_primary_c_t_a_variant" DEFAULT 'default',
  	"secondary_c_t_a_text" varchar,
  	"secondary_c_t_a_href" varchar,
  	"secondary_c_t_a_variant" "enum__pages_v_blocks_universal_c_t_a_secondary_c_t_a_variant" DEFAULT 'outline',
  	"background_style" "enum__pages_v_blocks_universal_c_t_a_background_style" DEFAULT 'surface',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_feature_grid_features_details" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"detail" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_feature_grid_features" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"description" varchar,
  	"badge" varchar,
  	"href" varchar,
  	"cta_text" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_feature_grid" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"variant" "enum__pages_v_blocks_feature_grid_variant" DEFAULT 'standard',
  	"title" varchar,
  	"subtitle" varchar,
  	"description" varchar,
  	"badge" varchar,
  	"columns" "enum__pages_v_blocks_feature_grid_columns" DEFAULT '3',
  	"card_style" "enum__pages_v_blocks_feature_grid_card_style" DEFAULT 'elevated',
  	"background_style" "enum__pages_v_blocks_feature_grid_background_style" DEFAULT 'surface',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_content_grid_items_applications" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"application" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_content_grid_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"title" varchar,
  	"description" varchar,
  	"href" varchar,
  	"post_count" numeric,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_content_grid" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"variant" "enum__pages_v_blocks_content_grid_variant" DEFAULT 'general',
  	"title" varchar,
  	"subtitle" varchar,
  	"description" varchar,
  	"badge" varchar,
  	"columns" "enum__pages_v_blocks_content_grid_columns" DEFAULT '3',
  	"background_style" "enum__pages_v_blocks_content_grid_background_style" DEFAULT 'surface',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_stats_section_stats" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"value" varchar,
  	"label" varchar,
  	"description" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_stats_section" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"variant" "enum__pages_v_blocks_stats_section_variant" DEFAULT 'standard',
  	"title" varchar,
  	"subtitle" varchar,
  	"description" varchar,
  	"badge" varchar,
  	"columns" "enum__pages_v_blocks_stats_section_columns" DEFAULT '3',
  	"background_style" "enum__pages_v_blocks_stats_section_background_style" DEFAULT 'background',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_process_steps_steps_details" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"detail" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_process_steps_steps" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"number" varchar,
  	"title" varchar,
  	"description" varchar,
  	"duration" varchar,
  	"deliverable" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_process_steps" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"variant" "enum__pages_v_blocks_process_steps_variant" DEFAULT 'horizontal',
  	"title" varchar,
  	"subtitle" varchar,
  	"description" varchar,
  	"badge" varchar,
  	"background_style" "enum__pages_v_blocks_process_steps_background_style" DEFAULT 'surface',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_content_cards_cards_tags" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"tag" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_content_cards_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"description" varchar,
  	"excerpt" varchar,
  	"category" varchar,
  	"read_time" varchar,
  	"published_at" varchar,
  	"href" varchar,
  	"featured" boolean,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_content_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"variant" "enum__pages_v_blocks_content_cards_variant" DEFAULT 'general',
  	"title" varchar,
  	"subtitle" varchar,
  	"description" varchar,
  	"badge" varchar,
  	"columns" "enum__pages_v_blocks_content_cards_columns" DEFAULT '3',
  	"background_style" "enum__pages_v_blocks_content_cards_background_style" DEFAULT 'background',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_contact_section_benefits" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"benefit" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_contact_section" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"variant" "enum__pages_v_blocks_contact_section_variant" DEFAULT 'split',
  	"title" varchar,
  	"description" varchar,
  	"badge" varchar,
  	"form_title" varchar,
  	"form_description" varchar,
  	"background_style" "enum__pages_v_blocks_contact_section_background_style" DEFAULT 'background',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_comparison_table_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"advantage" varchar,
  	"description" varchar,
  	"primary" varchar,
  	"secondary" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_comparison_table" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"description" varchar,
  	"badge" varchar,
  	"primary_label" varchar,
  	"secondary_label" varchar,
  	"background_style" "enum__pages_v_blocks_comparison_table_background_style" DEFAULT 'surface',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_simple_page_breadcrumbs" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"href" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_simple_page_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"href" varchar,
  	"description" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_simple_page" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"variant" "enum__pages_v_blocks_simple_page_variant" DEFAULT 'standard',
  	"title" varchar,
  	"subtitle" varchar,
  	"content" jsonb,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_brand_showcase_brands" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"description" varchar,
  	"logo_id" integer,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_brand_showcase" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"variant" "enum__pages_v_blocks_brand_showcase_variant" DEFAULT 'logo-belt',
  	"title" varchar,
  	"description" varchar,
  	"badge" varchar,
  	"background_style" "enum__pages_v_blocks_brand_showcase_background_style" DEFAULT 'background',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_technical_content_process_steps" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"number" varchar,
  	"title" varchar,
  	"description" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_technical_content_specifications_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"value" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_technical_content_specifications" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"category" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_technical_content" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"variant" "enum__pages_v_blocks_technical_content_variant" DEFAULT 'overview',
  	"title" varchar,
  	"description" varchar,
  	"badge" varchar,
  	"overview_content" jsonb,
  	"background_style" "enum__pages_v_blocks_technical_content_background_style" DEFAULT 'surface',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_resource_gallery_resources" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"description" varchar,
  	"file_type" varchar,
  	"file_size" varchar,
  	"category" varchar,
  	"download_url" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_resource_gallery_gallery_images" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"description" varchar,
  	"category" varchar,
  	"image_id" integer,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_resource_gallery" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"variant" "enum__pages_v_blocks_resource_gallery_variant" DEFAULT 'resources',
  	"title" varchar,
  	"description" varchar,
  	"badge" varchar,
  	"background_style" "enum__pages_v_blocks_resource_gallery_background_style" DEFAULT 'surface',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "footer_company_info_address" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"line" varchar NOT NULL
  );
  
  CREATE TABLE "footer_bottom_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar NOT NULL,
  	"type" "enum_footer_bottom_links_type" DEFAULT 'url' NOT NULL,
  	"page_id" integer,
  	"url" varchar,
  	"anchor" varchar
  );
  
  ALTER TABLE "pages_blocks_hero_cta_buttons" ALTER COLUMN "variant" SET DATA TYPE text;
  ALTER TABLE "pages_blocks_hero_cta_buttons" ALTER COLUMN "variant" SET DEFAULT 'default'::text;
  DROP TYPE "public"."enum_pages_blocks_hero_cta_buttons_variant";
  CREATE TYPE "public"."enum_pages_blocks_hero_cta_buttons_variant" AS ENUM('default', 'secondary', 'outline', 'ghost');
  ALTER TABLE "pages_blocks_hero_cta_buttons" ALTER COLUMN "variant" SET DEFAULT 'default'::"public"."enum_pages_blocks_hero_cta_buttons_variant";
  ALTER TABLE "pages_blocks_hero_cta_buttons" ALTER COLUMN "variant" SET DATA TYPE "public"."enum_pages_blocks_hero_cta_buttons_variant" USING "variant"::"public"."enum_pages_blocks_hero_cta_buttons_variant";
  ALTER TABLE "_pages_v_blocks_hero_cta_buttons" ALTER COLUMN "variant" SET DATA TYPE text;
  ALTER TABLE "_pages_v_blocks_hero_cta_buttons" ALTER COLUMN "variant" SET DEFAULT 'default'::text;
  DROP TYPE "public"."enum__pages_v_blocks_hero_cta_buttons_variant";
  CREATE TYPE "public"."enum__pages_v_blocks_hero_cta_buttons_variant" AS ENUM('default', 'secondary', 'outline', 'ghost');
  ALTER TABLE "_pages_v_blocks_hero_cta_buttons" ALTER COLUMN "variant" SET DEFAULT 'default'::"public"."enum__pages_v_blocks_hero_cta_buttons_variant";
  ALTER TABLE "_pages_v_blocks_hero_cta_buttons" ALTER COLUMN "variant" SET DATA TYPE "public"."enum__pages_v_blocks_hero_cta_buttons_variant" USING "variant"::"public"."enum__pages_v_blocks_hero_cta_buttons_variant";
  ALTER TABLE "footer_footer_columns_links" ALTER COLUMN "type" SET DATA TYPE text;
  ALTER TABLE "footer_footer_columns_links" ALTER COLUMN "type" SET DEFAULT 'anchor'::text;
  DROP TYPE "public"."enum_footer_footer_columns_links_type";
  CREATE TYPE "public"."enum_footer_footer_columns_links_type" AS ENUM('page', 'url', 'anchor');
  ALTER TABLE "footer_footer_columns_links" ALTER COLUMN "type" SET DEFAULT 'anchor'::"public"."enum_footer_footer_columns_links_type";
  ALTER TABLE "footer_footer_columns_links" ALTER COLUMN "type" SET DATA TYPE "public"."enum_footer_footer_columns_links_type" USING "type"::"public"."enum_footer_footer_columns_links_type";
  ALTER TABLE "pages_blocks_services_services" ALTER COLUMN "button_text" SET DEFAULT 'Več o storitvi';
  ALTER TABLE "pages_blocks_services_services" ALTER COLUMN "button_type" SET DEFAULT 'page';
  ALTER TABLE "pages_blocks_services_services" ALTER COLUMN "button_anchor" DROP DEFAULT;
  ALTER TABLE "pages_blocks_services" ALTER COLUMN "badge" SET DEFAULT 'STORITVE';
  ALTER TABLE "pages_blocks_services" ALTER COLUMN "title" SET DEFAULT 'Specializirani za krmiljenje in avtomatizacijo';
  ALTER TABLE "pages_blocks_services" ALTER COLUMN "subtitle" SET DEFAULT 'Od načrtovanja do zagona in servisa';
  ALTER TABLE "pages_blocks_about" ALTER COLUMN "title" SET DEFAULT 'O podjetju';
  ALTER TABLE "pages_blocks_about" ALTER COLUMN "description" SET DEFAULT 'Specializirani smo za industrijske avtomatizacijske sisteme z več kot 10-letnimi izkušnjami.';
  ALTER TABLE "pages_blocks_about" ALTER COLUMN "callout_text" DROP DEFAULT;
  ALTER TABLE "pages_blocks_about" ALTER COLUMN "button_text" SET DEFAULT 'Več o nas';
  ALTER TABLE "pages_blocks_about" ALTER COLUMN "button_type" SET DEFAULT 'page';
  ALTER TABLE "pages_blocks_about" ALTER COLUMN "button_anchor" DROP DEFAULT;
  ALTER TABLE "pages_blocks_why_trust" ALTER COLUMN "title" SET DEFAULT 'Zakaj nam zaupajo?';
  ALTER TABLE "pages_blocks_why_trust" ALTER COLUMN "button_text" SET DEFAULT 'Zaupajte nam';
  ALTER TABLE "pages_blocks_why_trust" ALTER COLUMN "button_type" SET DEFAULT 'page';
  ALTER TABLE "pages_blocks_why_trust" ALTER COLUMN "button_anchor" DROP DEFAULT;
  ALTER TABLE "pages_blocks_projects_projects" ALTER COLUMN "link" DROP DEFAULT;
  ALTER TABLE "pages_blocks_projects" ALTER COLUMN "badge" SET DEFAULT 'PROJEKTI';
  ALTER TABLE "pages_blocks_projects" ALTER COLUMN "title" SET DEFAULT 'Naši projekti';
  ALTER TABLE "pages_blocks_projects" ALTER COLUMN "button_text" SET DEFAULT 'Vsi projekti';
  ALTER TABLE "pages_blocks_projects" ALTER COLUMN "button_type" SET DEFAULT 'page';
  ALTER TABLE "pages_blocks_projects" ALTER COLUMN "button_anchor" DROP DEFAULT;
  ALTER TABLE "pages_blocks_contact" ALTER COLUMN "badge" SET DEFAULT 'KONTAKT';
  ALTER TABLE "pages_blocks_contact" ALTER COLUMN "title" SET DEFAULT 'Stopite v stik z nami';
  ALTER TABLE "pages_blocks_contact" ALTER COLUMN "subtitle" SET DEFAULT 'Pripravili vam bomo ponudbo v 24 urah';
  ALTER TABLE "pages_blocks_contact" ALTER COLUMN "phone" SET DEFAULT '+386 1 234 5678';
  ALTER TABLE "pages_blocks_contact" ALTER COLUMN "email" SET DEFAULT 'info@sinteh.si';
  ALTER TABLE "_pages_v_blocks_services_services" ALTER COLUMN "button_text" SET DEFAULT 'Več o storitvi';
  ALTER TABLE "_pages_v_blocks_services_services" ALTER COLUMN "button_type" SET DEFAULT 'page';
  ALTER TABLE "_pages_v_blocks_services_services" ALTER COLUMN "button_anchor" DROP DEFAULT;
  ALTER TABLE "_pages_v_blocks_services" ALTER COLUMN "badge" SET DEFAULT 'STORITVE';
  ALTER TABLE "_pages_v_blocks_services" ALTER COLUMN "title" SET DEFAULT 'Specializirani za krmiljenje in avtomatizacijo';
  ALTER TABLE "_pages_v_blocks_services" ALTER COLUMN "subtitle" SET DEFAULT 'Od načrtovanja do zagona in servisa';
  ALTER TABLE "_pages_v_blocks_about" ALTER COLUMN "title" SET DEFAULT 'O podjetju';
  ALTER TABLE "_pages_v_blocks_about" ALTER COLUMN "description" SET DEFAULT 'Specializirani smo za industrijske avtomatizacijske sisteme z več kot 10-letnimi izkušnjami.';
  ALTER TABLE "_pages_v_blocks_about" ALTER COLUMN "callout_text" DROP DEFAULT;
  ALTER TABLE "_pages_v_blocks_about" ALTER COLUMN "button_text" SET DEFAULT 'Več o nas';
  ALTER TABLE "_pages_v_blocks_about" ALTER COLUMN "button_type" SET DEFAULT 'page';
  ALTER TABLE "_pages_v_blocks_about" ALTER COLUMN "button_anchor" DROP DEFAULT;
  ALTER TABLE "_pages_v_blocks_why_trust" ALTER COLUMN "title" SET DEFAULT 'Zakaj nam zaupajo?';
  ALTER TABLE "_pages_v_blocks_why_trust" ALTER COLUMN "button_text" SET DEFAULT 'Zaupajte nam';
  ALTER TABLE "_pages_v_blocks_why_trust" ALTER COLUMN "button_type" SET DEFAULT 'page';
  ALTER TABLE "_pages_v_blocks_why_trust" ALTER COLUMN "button_anchor" DROP DEFAULT;
  ALTER TABLE "_pages_v_blocks_projects_projects" ALTER COLUMN "link" DROP DEFAULT;
  ALTER TABLE "_pages_v_blocks_projects" ALTER COLUMN "badge" SET DEFAULT 'PROJEKTI';
  ALTER TABLE "_pages_v_blocks_projects" ALTER COLUMN "title" SET DEFAULT 'Naši projekti';
  ALTER TABLE "_pages_v_blocks_projects" ALTER COLUMN "button_text" SET DEFAULT 'Vsi projekti';
  ALTER TABLE "_pages_v_blocks_projects" ALTER COLUMN "button_type" SET DEFAULT 'page';
  ALTER TABLE "_pages_v_blocks_projects" ALTER COLUMN "button_anchor" DROP DEFAULT;
  ALTER TABLE "_pages_v_blocks_contact" ALTER COLUMN "badge" SET DEFAULT 'KONTAKT';
  ALTER TABLE "_pages_v_blocks_contact" ALTER COLUMN "title" SET DEFAULT 'Stopite v stik z nami';
  ALTER TABLE "_pages_v_blocks_contact" ALTER COLUMN "subtitle" SET DEFAULT 'Pripravili vam bomo ponudbo v 24 urah';
  ALTER TABLE "_pages_v_blocks_contact" ALTER COLUMN "phone" SET DEFAULT '+386 1 234 5678';
  ALTER TABLE "_pages_v_blocks_contact" ALTER COLUMN "email" SET DEFAULT 'info@sinteh.si';
  ALTER TABLE "footer" ALTER COLUMN "copyright" SET DEFAULT '© 2025 SINTEH PRO. Vse pravice pridržane.';
  ALTER TABLE "header" ADD COLUMN "mobile_navigation_enabled" boolean DEFAULT true;
  ALTER TABLE "header" ADD COLUMN "mobile_navigation_menu_button_label" varchar DEFAULT 'Menu';
  ALTER TABLE "header" ADD COLUMN "mobile_navigation_close_button_label" varchar DEFAULT 'Close menu';
  ALTER TABLE "header" ADD COLUMN "mobile_navigation_show_language_selector" boolean DEFAULT true;
  ALTER TABLE "header" ADD COLUMN "mobile_navigation_show_contact_button" boolean DEFAULT true;
  ALTER TABLE "footer_footer_columns_links" ADD COLUMN "anchor" varchar;
  ALTER TABLE "footer" ADD COLUMN "logo_id" integer NOT NULL;
  ALTER TABLE "footer" ADD COLUMN "company_info_phone" varchar DEFAULT '+386 (3) 426 36 46';
  ALTER TABLE "footer" ADD COLUMN "company_info_email" varchar DEFAULT 'info@sinteh.pro';
  ALTER TABLE "seo" ADD COLUMN "favicon_id" integer;
  ALTER TABLE "pages_blocks_rich_text" ADD CONSTRAINT "pages_blocks_rich_text_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_product_hero_key_benefits" ADD CONSTRAINT "pages_blocks_product_hero_key_benefits_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_product_hero"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_product_hero_cta_buttons" ADD CONSTRAINT "pages_blocks_product_hero_cta_buttons_page_id_pages_id_fk" FOREIGN KEY ("page_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_product_hero_cta_buttons" ADD CONSTRAINT "pages_blocks_product_hero_cta_buttons_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_product_hero"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_product_hero" ADD CONSTRAINT "pages_blocks_product_hero_background_image_id_media_id_fk" FOREIGN KEY ("background_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_product_hero" ADD CONSTRAINT "pages_blocks_product_hero_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_key_features_features" ADD CONSTRAINT "pages_blocks_key_features_features_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_key_features"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_key_features" ADD CONSTRAINT "pages_blocks_key_features_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_product_gallery_images" ADD CONSTRAINT "pages_blocks_product_gallery_images_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_product_gallery_images" ADD CONSTRAINT "pages_blocks_product_gallery_images_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_product_gallery"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_product_gallery" ADD CONSTRAINT "pages_blocks_product_gallery_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_specifications_specifications_items" ADD CONSTRAINT "pages_blocks_specifications_specifications_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_specifications_specifications"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_specifications_specifications" ADD CONSTRAINT "pages_blocks_specifications_specifications_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_specifications"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_specifications_certification_badges" ADD CONSTRAINT "pages_blocks_specifications_certification_badges_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_specifications"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_specifications_additional_info_details" ADD CONSTRAINT "pages_blocks_specifications_additional_info_details_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_specifications"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_specifications" ADD CONSTRAINT "pages_blocks_specifications_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_applications_applications_details" ADD CONSTRAINT "pages_blocks_applications_applications_details_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_applications_applications"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_applications_applications" ADD CONSTRAINT "pages_blocks_applications_applications_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_applications"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_applications_stats" ADD CONSTRAINT "pages_blocks_applications_stats_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_applications"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_applications_case_study_stats" ADD CONSTRAINT "pages_blocks_applications_case_study_stats_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_applications"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_applications" ADD CONSTRAINT "pages_blocks_applications_case_study_image_id_media_id_fk" FOREIGN KEY ("case_study_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_applications" ADD CONSTRAINT "pages_blocks_applications_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_technical_overview_process_steps" ADD CONSTRAINT "pages_blocks_technical_overview_process_steps_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_technical_overview"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_technical_overview_technical_benefits" ADD CONSTRAINT "pages_blocks_technical_overview_technical_benefits_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_technical_overview"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_technical_overview" ADD CONSTRAINT "pages_blocks_technical_overview_technical_image_id_media_id_fk" FOREIGN KEY ("technical_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_technical_overview" ADD CONSTRAINT "pages_blocks_technical_overview_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_benefits_comparison_benefits" ADD CONSTRAINT "pages_blocks_benefits_comparison_benefits_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_benefits_comparison"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_benefits_comparison_summary_cards" ADD CONSTRAINT "pages_blocks_benefits_comparison_summary_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_benefits_comparison"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_benefits_comparison" ADD CONSTRAINT "pages_blocks_benefits_comparison_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_product_c_t_a_stats" ADD CONSTRAINT "pages_blocks_product_c_t_a_stats_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_product_c_t_a"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_product_c_t_a_why_us_points" ADD CONSTRAINT "pages_blocks_product_c_t_a_why_us_points_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_product_c_t_a"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_product_c_t_a_application_options" ADD CONSTRAINT "pages_blocks_product_c_t_a_application_options_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_product_c_t_a"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_product_c_t_a" ADD CONSTRAINT "pages_blocks_product_c_t_a_hero_image_id_media_id_fk" FOREIGN KEY ("hero_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_product_c_t_a" ADD CONSTRAINT "pages_blocks_product_c_t_a_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_product_resources_resources" ADD CONSTRAINT "pages_blocks_product_resources_resources_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_product_resources"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_product_resources_quick_access_items" ADD CONSTRAINT "pages_blocks_product_resources_quick_access_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_product_resources"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_product_resources" ADD CONSTRAINT "pages_blocks_product_resources_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_contact_hero_quick_contact_methods" ADD CONSTRAINT "pages_blocks_contact_hero_quick_contact_methods_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_contact_hero"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_contact_hero" ADD CONSTRAINT "pages_blocks_contact_hero_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_contact_form" ADD CONSTRAINT "pages_blocks_contact_form_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_contact_info_contact_methods" ADD CONSTRAINT "pages_blocks_contact_info_contact_methods_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_contact_info"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_contact_info" ADD CONSTRAINT "pages_blocks_contact_info_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_contact_location" ADD CONSTRAINT "pages_blocks_contact_location_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_contact_f_a_q_faqs" ADD CONSTRAINT "pages_blocks_contact_f_a_q_faqs_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_contact_f_a_q"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_contact_f_a_q" ADD CONSTRAINT "pages_blocks_contact_f_a_q_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_universal_hero_benefits" ADD CONSTRAINT "pages_blocks_universal_hero_benefits_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_universal_hero"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_universal_hero_trust_indicators" ADD CONSTRAINT "pages_blocks_universal_hero_trust_indicators_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_universal_hero"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_universal_hero_stats" ADD CONSTRAINT "pages_blocks_universal_hero_stats_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_universal_hero"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_universal_hero_contact_methods" ADD CONSTRAINT "pages_blocks_universal_hero_contact_methods_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_universal_hero"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_universal_hero" ADD CONSTRAINT "pages_blocks_universal_hero_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_universal_c_t_a_benefits" ADD CONSTRAINT "pages_blocks_universal_c_t_a_benefits_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_universal_c_t_a"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_universal_c_t_a_stats" ADD CONSTRAINT "pages_blocks_universal_c_t_a_stats_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_universal_c_t_a"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_universal_c_t_a" ADD CONSTRAINT "pages_blocks_universal_c_t_a_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_feature_grid_features_details" ADD CONSTRAINT "pages_blocks_feature_grid_features_details_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_feature_grid_features"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_feature_grid_features" ADD CONSTRAINT "pages_blocks_feature_grid_features_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_feature_grid"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_feature_grid" ADD CONSTRAINT "pages_blocks_feature_grid_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_content_grid_items_applications" ADD CONSTRAINT "pages_blocks_content_grid_items_applications_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_content_grid_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_content_grid_items" ADD CONSTRAINT "pages_blocks_content_grid_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_content_grid"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_content_grid" ADD CONSTRAINT "pages_blocks_content_grid_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_stats_section_stats" ADD CONSTRAINT "pages_blocks_stats_section_stats_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_stats_section"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_stats_section" ADD CONSTRAINT "pages_blocks_stats_section_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_process_steps_steps_details" ADD CONSTRAINT "pages_blocks_process_steps_steps_details_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_process_steps_steps"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_process_steps_steps" ADD CONSTRAINT "pages_blocks_process_steps_steps_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_process_steps"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_process_steps" ADD CONSTRAINT "pages_blocks_process_steps_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_content_cards_cards_tags" ADD CONSTRAINT "pages_blocks_content_cards_cards_tags_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_content_cards_cards"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_content_cards_cards" ADD CONSTRAINT "pages_blocks_content_cards_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_content_cards"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_content_cards" ADD CONSTRAINT "pages_blocks_content_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_contact_section_benefits" ADD CONSTRAINT "pages_blocks_contact_section_benefits_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_contact_section"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_contact_section" ADD CONSTRAINT "pages_blocks_contact_section_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_comparison_table_items" ADD CONSTRAINT "pages_blocks_comparison_table_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_comparison_table"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_comparison_table" ADD CONSTRAINT "pages_blocks_comparison_table_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_simple_page_breadcrumbs" ADD CONSTRAINT "pages_blocks_simple_page_breadcrumbs_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_simple_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_simple_page_links" ADD CONSTRAINT "pages_blocks_simple_page_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_simple_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_simple_page" ADD CONSTRAINT "pages_blocks_simple_page_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_brand_showcase_brands" ADD CONSTRAINT "pages_blocks_brand_showcase_brands_logo_id_media_id_fk" FOREIGN KEY ("logo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_brand_showcase_brands" ADD CONSTRAINT "pages_blocks_brand_showcase_brands_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_brand_showcase"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_brand_showcase" ADD CONSTRAINT "pages_blocks_brand_showcase_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_technical_content_process_steps" ADD CONSTRAINT "pages_blocks_technical_content_process_steps_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_technical_content"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_technical_content_specifications_items" ADD CONSTRAINT "pages_blocks_technical_content_specifications_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_technical_content_specifications"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_technical_content_specifications" ADD CONSTRAINT "pages_blocks_technical_content_specifications_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_technical_content"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_technical_content" ADD CONSTRAINT "pages_blocks_technical_content_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_resource_gallery_resources" ADD CONSTRAINT "pages_blocks_resource_gallery_resources_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_resource_gallery"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_resource_gallery_gallery_images" ADD CONSTRAINT "pages_blocks_resource_gallery_gallery_images_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_resource_gallery_gallery_images" ADD CONSTRAINT "pages_blocks_resource_gallery_gallery_images_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_resource_gallery"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_resource_gallery" ADD CONSTRAINT "pages_blocks_resource_gallery_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_rich_text" ADD CONSTRAINT "_pages_v_blocks_rich_text_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_product_hero_key_benefits" ADD CONSTRAINT "_pages_v_blocks_product_hero_key_benefits_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_product_hero"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_product_hero_cta_buttons" ADD CONSTRAINT "_pages_v_blocks_product_hero_cta_buttons_page_id_pages_id_fk" FOREIGN KEY ("page_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_product_hero_cta_buttons" ADD CONSTRAINT "_pages_v_blocks_product_hero_cta_buttons_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_product_hero"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_product_hero" ADD CONSTRAINT "_pages_v_blocks_product_hero_background_image_id_media_id_fk" FOREIGN KEY ("background_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_product_hero" ADD CONSTRAINT "_pages_v_blocks_product_hero_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_key_features_features" ADD CONSTRAINT "_pages_v_blocks_key_features_features_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_key_features"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_key_features" ADD CONSTRAINT "_pages_v_blocks_key_features_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_product_gallery_images" ADD CONSTRAINT "_pages_v_blocks_product_gallery_images_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_product_gallery_images" ADD CONSTRAINT "_pages_v_blocks_product_gallery_images_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_product_gallery"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_product_gallery" ADD CONSTRAINT "_pages_v_blocks_product_gallery_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_specifications_specifications_items" ADD CONSTRAINT "_pages_v_blocks_specifications_specifications_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_specifications_specifications"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_specifications_specifications" ADD CONSTRAINT "_pages_v_blocks_specifications_specifications_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_specifications"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_specifications_certification_badges" ADD CONSTRAINT "_pages_v_blocks_specifications_certification_badges_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_specifications"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_specifications_additional_info_details" ADD CONSTRAINT "_pages_v_blocks_specifications_additional_info_details_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_specifications"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_specifications" ADD CONSTRAINT "_pages_v_blocks_specifications_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_applications_applications_details" ADD CONSTRAINT "_pages_v_blocks_applications_applications_details_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_applications_applications"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_applications_applications" ADD CONSTRAINT "_pages_v_blocks_applications_applications_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_applications"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_applications_stats" ADD CONSTRAINT "_pages_v_blocks_applications_stats_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_applications"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_applications_case_study_stats" ADD CONSTRAINT "_pages_v_blocks_applications_case_study_stats_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_applications"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_applications" ADD CONSTRAINT "_pages_v_blocks_applications_case_study_image_id_media_id_fk" FOREIGN KEY ("case_study_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_applications" ADD CONSTRAINT "_pages_v_blocks_applications_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_technical_overview_process_steps" ADD CONSTRAINT "_pages_v_blocks_technical_overview_process_steps_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_technical_overview"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_technical_overview_technical_benefits" ADD CONSTRAINT "_pages_v_blocks_technical_overview_technical_benefits_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_technical_overview"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_technical_overview" ADD CONSTRAINT "_pages_v_blocks_technical_overview_technical_image_id_media_id_fk" FOREIGN KEY ("technical_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_technical_overview" ADD CONSTRAINT "_pages_v_blocks_technical_overview_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_benefits_comparison_benefits" ADD CONSTRAINT "_pages_v_blocks_benefits_comparison_benefits_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_benefits_comparison"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_benefits_comparison_summary_cards" ADD CONSTRAINT "_pages_v_blocks_benefits_comparison_summary_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_benefits_comparison"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_benefits_comparison" ADD CONSTRAINT "_pages_v_blocks_benefits_comparison_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_product_c_t_a_stats" ADD CONSTRAINT "_pages_v_blocks_product_c_t_a_stats_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_product_c_t_a"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_product_c_t_a_why_us_points" ADD CONSTRAINT "_pages_v_blocks_product_c_t_a_why_us_points_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_product_c_t_a"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_product_c_t_a_application_options" ADD CONSTRAINT "_pages_v_blocks_product_c_t_a_application_options_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_product_c_t_a"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_product_c_t_a" ADD CONSTRAINT "_pages_v_blocks_product_c_t_a_hero_image_id_media_id_fk" FOREIGN KEY ("hero_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_product_c_t_a" ADD CONSTRAINT "_pages_v_blocks_product_c_t_a_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_product_resources_resources" ADD CONSTRAINT "_pages_v_blocks_product_resources_resources_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_product_resources"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_product_resources_quick_access_items" ADD CONSTRAINT "_pages_v_blocks_product_resources_quick_access_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_product_resources"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_product_resources" ADD CONSTRAINT "_pages_v_blocks_product_resources_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_contact_hero_quick_contact_methods" ADD CONSTRAINT "_pages_v_blocks_contact_hero_quick_contact_methods_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_contact_hero"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_contact_hero" ADD CONSTRAINT "_pages_v_blocks_contact_hero_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_contact_form" ADD CONSTRAINT "_pages_v_blocks_contact_form_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_contact_info_contact_methods" ADD CONSTRAINT "_pages_v_blocks_contact_info_contact_methods_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_contact_info"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_contact_info" ADD CONSTRAINT "_pages_v_blocks_contact_info_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_contact_location" ADD CONSTRAINT "_pages_v_blocks_contact_location_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_contact_f_a_q_faqs" ADD CONSTRAINT "_pages_v_blocks_contact_f_a_q_faqs_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_contact_f_a_q"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_contact_f_a_q" ADD CONSTRAINT "_pages_v_blocks_contact_f_a_q_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_universal_hero_benefits" ADD CONSTRAINT "_pages_v_blocks_universal_hero_benefits_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_universal_hero"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_universal_hero_trust_indicators" ADD CONSTRAINT "_pages_v_blocks_universal_hero_trust_indicators_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_universal_hero"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_universal_hero_stats" ADD CONSTRAINT "_pages_v_blocks_universal_hero_stats_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_universal_hero"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_universal_hero_contact_methods" ADD CONSTRAINT "_pages_v_blocks_universal_hero_contact_methods_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_universal_hero"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_universal_hero" ADD CONSTRAINT "_pages_v_blocks_universal_hero_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_universal_c_t_a_benefits" ADD CONSTRAINT "_pages_v_blocks_universal_c_t_a_benefits_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_universal_c_t_a"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_universal_c_t_a_stats" ADD CONSTRAINT "_pages_v_blocks_universal_c_t_a_stats_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_universal_c_t_a"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_universal_c_t_a" ADD CONSTRAINT "_pages_v_blocks_universal_c_t_a_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_feature_grid_features_details" ADD CONSTRAINT "_pages_v_blocks_feature_grid_features_details_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_feature_grid_features"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_feature_grid_features" ADD CONSTRAINT "_pages_v_blocks_feature_grid_features_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_feature_grid"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_feature_grid" ADD CONSTRAINT "_pages_v_blocks_feature_grid_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_content_grid_items_applications" ADD CONSTRAINT "_pages_v_blocks_content_grid_items_applications_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_content_grid_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_content_grid_items" ADD CONSTRAINT "_pages_v_blocks_content_grid_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_content_grid"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_content_grid" ADD CONSTRAINT "_pages_v_blocks_content_grid_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_stats_section_stats" ADD CONSTRAINT "_pages_v_blocks_stats_section_stats_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_stats_section"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_stats_section" ADD CONSTRAINT "_pages_v_blocks_stats_section_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_process_steps_steps_details" ADD CONSTRAINT "_pages_v_blocks_process_steps_steps_details_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_process_steps_steps"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_process_steps_steps" ADD CONSTRAINT "_pages_v_blocks_process_steps_steps_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_process_steps"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_process_steps" ADD CONSTRAINT "_pages_v_blocks_process_steps_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_content_cards_cards_tags" ADD CONSTRAINT "_pages_v_blocks_content_cards_cards_tags_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_content_cards_cards"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_content_cards_cards" ADD CONSTRAINT "_pages_v_blocks_content_cards_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_content_cards"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_content_cards" ADD CONSTRAINT "_pages_v_blocks_content_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_contact_section_benefits" ADD CONSTRAINT "_pages_v_blocks_contact_section_benefits_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_contact_section"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_contact_section" ADD CONSTRAINT "_pages_v_blocks_contact_section_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_comparison_table_items" ADD CONSTRAINT "_pages_v_blocks_comparison_table_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_comparison_table"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_comparison_table" ADD CONSTRAINT "_pages_v_blocks_comparison_table_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_simple_page_breadcrumbs" ADD CONSTRAINT "_pages_v_blocks_simple_page_breadcrumbs_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_simple_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_simple_page_links" ADD CONSTRAINT "_pages_v_blocks_simple_page_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_simple_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_simple_page" ADD CONSTRAINT "_pages_v_blocks_simple_page_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_brand_showcase_brands" ADD CONSTRAINT "_pages_v_blocks_brand_showcase_brands_logo_id_media_id_fk" FOREIGN KEY ("logo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_brand_showcase_brands" ADD CONSTRAINT "_pages_v_blocks_brand_showcase_brands_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_brand_showcase"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_brand_showcase" ADD CONSTRAINT "_pages_v_blocks_brand_showcase_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_technical_content_process_steps" ADD CONSTRAINT "_pages_v_blocks_technical_content_process_steps_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_technical_content"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_technical_content_specifications_items" ADD CONSTRAINT "_pages_v_blocks_technical_content_specifications_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_technical_content_specifications"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_technical_content_specifications" ADD CONSTRAINT "_pages_v_blocks_technical_content_specifications_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_technical_content"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_technical_content" ADD CONSTRAINT "_pages_v_blocks_technical_content_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_resource_gallery_resources" ADD CONSTRAINT "_pages_v_blocks_resource_gallery_resources_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_resource_gallery"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_resource_gallery_gallery_images" ADD CONSTRAINT "_pages_v_blocks_resource_gallery_gallery_images_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_resource_gallery_gallery_images" ADD CONSTRAINT "_pages_v_blocks_resource_gallery_gallery_images_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_resource_gallery"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_resource_gallery" ADD CONSTRAINT "_pages_v_blocks_resource_gallery_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "footer_company_info_address" ADD CONSTRAINT "footer_company_info_address_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."footer"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "footer_bottom_links" ADD CONSTRAINT "footer_bottom_links_page_id_pages_id_fk" FOREIGN KEY ("page_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "footer_bottom_links" ADD CONSTRAINT "footer_bottom_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."footer"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "pages_blocks_rich_text_order_idx" ON "pages_blocks_rich_text" USING btree ("_order");
  CREATE INDEX "pages_blocks_rich_text_parent_id_idx" ON "pages_blocks_rich_text" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_rich_text_path_idx" ON "pages_blocks_rich_text" USING btree ("_path");
  CREATE INDEX "pages_blocks_product_hero_key_benefits_order_idx" ON "pages_blocks_product_hero_key_benefits" USING btree ("_order");
  CREATE INDEX "pages_blocks_product_hero_key_benefits_parent_id_idx" ON "pages_blocks_product_hero_key_benefits" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_product_hero_cta_buttons_order_idx" ON "pages_blocks_product_hero_cta_buttons" USING btree ("_order");
  CREATE INDEX "pages_blocks_product_hero_cta_buttons_parent_id_idx" ON "pages_blocks_product_hero_cta_buttons" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_product_hero_cta_buttons_page_idx" ON "pages_blocks_product_hero_cta_buttons" USING btree ("page_id");
  CREATE INDEX "pages_blocks_product_hero_order_idx" ON "pages_blocks_product_hero" USING btree ("_order");
  CREATE INDEX "pages_blocks_product_hero_parent_id_idx" ON "pages_blocks_product_hero" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_product_hero_path_idx" ON "pages_blocks_product_hero" USING btree ("_path");
  CREATE INDEX "pages_blocks_product_hero_background_image_idx" ON "pages_blocks_product_hero" USING btree ("background_image_id");
  CREATE INDEX "pages_blocks_key_features_features_order_idx" ON "pages_blocks_key_features_features" USING btree ("_order");
  CREATE INDEX "pages_blocks_key_features_features_parent_id_idx" ON "pages_blocks_key_features_features" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_key_features_order_idx" ON "pages_blocks_key_features" USING btree ("_order");
  CREATE INDEX "pages_blocks_key_features_parent_id_idx" ON "pages_blocks_key_features" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_key_features_path_idx" ON "pages_blocks_key_features" USING btree ("_path");
  CREATE INDEX "pages_blocks_product_gallery_images_order_idx" ON "pages_blocks_product_gallery_images" USING btree ("_order");
  CREATE INDEX "pages_blocks_product_gallery_images_parent_id_idx" ON "pages_blocks_product_gallery_images" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_product_gallery_images_image_idx" ON "pages_blocks_product_gallery_images" USING btree ("image_id");
  CREATE INDEX "pages_blocks_product_gallery_order_idx" ON "pages_blocks_product_gallery" USING btree ("_order");
  CREATE INDEX "pages_blocks_product_gallery_parent_id_idx" ON "pages_blocks_product_gallery" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_product_gallery_path_idx" ON "pages_blocks_product_gallery" USING btree ("_path");
  CREATE INDEX "pages_blocks_specifications_specifications_items_order_idx" ON "pages_blocks_specifications_specifications_items" USING btree ("_order");
  CREATE INDEX "pages_blocks_specifications_specifications_items_parent_id_idx" ON "pages_blocks_specifications_specifications_items" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_specifications_specifications_order_idx" ON "pages_blocks_specifications_specifications" USING btree ("_order");
  CREATE INDEX "pages_blocks_specifications_specifications_parent_id_idx" ON "pages_blocks_specifications_specifications" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_specifications_certification_badges_order_idx" ON "pages_blocks_specifications_certification_badges" USING btree ("_order");
  CREATE INDEX "pages_blocks_specifications_certification_badges_parent_id_idx" ON "pages_blocks_specifications_certification_badges" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_specifications_additional_info_details_order_idx" ON "pages_blocks_specifications_additional_info_details" USING btree ("_order");
  CREATE INDEX "pages_blocks_specifications_additional_info_details_parent_id_idx" ON "pages_blocks_specifications_additional_info_details" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_specifications_order_idx" ON "pages_blocks_specifications" USING btree ("_order");
  CREATE INDEX "pages_blocks_specifications_parent_id_idx" ON "pages_blocks_specifications" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_specifications_path_idx" ON "pages_blocks_specifications" USING btree ("_path");
  CREATE INDEX "pages_blocks_applications_applications_details_order_idx" ON "pages_blocks_applications_applications_details" USING btree ("_order");
  CREATE INDEX "pages_blocks_applications_applications_details_parent_id_idx" ON "pages_blocks_applications_applications_details" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_applications_applications_order_idx" ON "pages_blocks_applications_applications" USING btree ("_order");
  CREATE INDEX "pages_blocks_applications_applications_parent_id_idx" ON "pages_blocks_applications_applications" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_applications_stats_order_idx" ON "pages_blocks_applications_stats" USING btree ("_order");
  CREATE INDEX "pages_blocks_applications_stats_parent_id_idx" ON "pages_blocks_applications_stats" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_applications_case_study_stats_order_idx" ON "pages_blocks_applications_case_study_stats" USING btree ("_order");
  CREATE INDEX "pages_blocks_applications_case_study_stats_parent_id_idx" ON "pages_blocks_applications_case_study_stats" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_applications_order_idx" ON "pages_blocks_applications" USING btree ("_order");
  CREATE INDEX "pages_blocks_applications_parent_id_idx" ON "pages_blocks_applications" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_applications_path_idx" ON "pages_blocks_applications" USING btree ("_path");
  CREATE INDEX "pages_blocks_applications_case_study_case_study_image_idx" ON "pages_blocks_applications" USING btree ("case_study_image_id");
  CREATE INDEX "pages_blocks_technical_overview_process_steps_order_idx" ON "pages_blocks_technical_overview_process_steps" USING btree ("_order");
  CREATE INDEX "pages_blocks_technical_overview_process_steps_parent_id_idx" ON "pages_blocks_technical_overview_process_steps" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_technical_overview_technical_benefits_order_idx" ON "pages_blocks_technical_overview_technical_benefits" USING btree ("_order");
  CREATE INDEX "pages_blocks_technical_overview_technical_benefits_parent_id_idx" ON "pages_blocks_technical_overview_technical_benefits" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_technical_overview_order_idx" ON "pages_blocks_technical_overview" USING btree ("_order");
  CREATE INDEX "pages_blocks_technical_overview_parent_id_idx" ON "pages_blocks_technical_overview" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_technical_overview_path_idx" ON "pages_blocks_technical_overview" USING btree ("_path");
  CREATE INDEX "pages_blocks_technical_overview_technical_image_idx" ON "pages_blocks_technical_overview" USING btree ("technical_image_id");
  CREATE INDEX "pages_blocks_benefits_comparison_benefits_order_idx" ON "pages_blocks_benefits_comparison_benefits" USING btree ("_order");
  CREATE INDEX "pages_blocks_benefits_comparison_benefits_parent_id_idx" ON "pages_blocks_benefits_comparison_benefits" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_benefits_comparison_summary_cards_order_idx" ON "pages_blocks_benefits_comparison_summary_cards" USING btree ("_order");
  CREATE INDEX "pages_blocks_benefits_comparison_summary_cards_parent_id_idx" ON "pages_blocks_benefits_comparison_summary_cards" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_benefits_comparison_order_idx" ON "pages_blocks_benefits_comparison" USING btree ("_order");
  CREATE INDEX "pages_blocks_benefits_comparison_parent_id_idx" ON "pages_blocks_benefits_comparison" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_benefits_comparison_path_idx" ON "pages_blocks_benefits_comparison" USING btree ("_path");
  CREATE INDEX "pages_blocks_product_c_t_a_stats_order_idx" ON "pages_blocks_product_c_t_a_stats" USING btree ("_order");
  CREATE INDEX "pages_blocks_product_c_t_a_stats_parent_id_idx" ON "pages_blocks_product_c_t_a_stats" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_product_c_t_a_why_us_points_order_idx" ON "pages_blocks_product_c_t_a_why_us_points" USING btree ("_order");
  CREATE INDEX "pages_blocks_product_c_t_a_why_us_points_parent_id_idx" ON "pages_blocks_product_c_t_a_why_us_points" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_product_c_t_a_application_options_order_idx" ON "pages_blocks_product_c_t_a_application_options" USING btree ("_order");
  CREATE INDEX "pages_blocks_product_c_t_a_application_options_parent_id_idx" ON "pages_blocks_product_c_t_a_application_options" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_product_c_t_a_order_idx" ON "pages_blocks_product_c_t_a" USING btree ("_order");
  CREATE INDEX "pages_blocks_product_c_t_a_parent_id_idx" ON "pages_blocks_product_c_t_a" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_product_c_t_a_path_idx" ON "pages_blocks_product_c_t_a" USING btree ("_path");
  CREATE INDEX "pages_blocks_product_c_t_a_hero_image_idx" ON "pages_blocks_product_c_t_a" USING btree ("hero_image_id");
  CREATE INDEX "pages_blocks_product_resources_resources_order_idx" ON "pages_blocks_product_resources_resources" USING btree ("_order");
  CREATE INDEX "pages_blocks_product_resources_resources_parent_id_idx" ON "pages_blocks_product_resources_resources" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_product_resources_quick_access_items_order_idx" ON "pages_blocks_product_resources_quick_access_items" USING btree ("_order");
  CREATE INDEX "pages_blocks_product_resources_quick_access_items_parent_id_idx" ON "pages_blocks_product_resources_quick_access_items" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_product_resources_order_idx" ON "pages_blocks_product_resources" USING btree ("_order");
  CREATE INDEX "pages_blocks_product_resources_parent_id_idx" ON "pages_blocks_product_resources" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_product_resources_path_idx" ON "pages_blocks_product_resources" USING btree ("_path");
  CREATE INDEX "pages_blocks_contact_hero_quick_contact_methods_order_idx" ON "pages_blocks_contact_hero_quick_contact_methods" USING btree ("_order");
  CREATE INDEX "pages_blocks_contact_hero_quick_contact_methods_parent_id_idx" ON "pages_blocks_contact_hero_quick_contact_methods" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_contact_hero_order_idx" ON "pages_blocks_contact_hero" USING btree ("_order");
  CREATE INDEX "pages_blocks_contact_hero_parent_id_idx" ON "pages_blocks_contact_hero" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_contact_hero_path_idx" ON "pages_blocks_contact_hero" USING btree ("_path");
  CREATE INDEX "pages_blocks_contact_form_order_idx" ON "pages_blocks_contact_form" USING btree ("_order");
  CREATE INDEX "pages_blocks_contact_form_parent_id_idx" ON "pages_blocks_contact_form" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_contact_form_path_idx" ON "pages_blocks_contact_form" USING btree ("_path");
  CREATE INDEX "pages_blocks_contact_info_contact_methods_order_idx" ON "pages_blocks_contact_info_contact_methods" USING btree ("_order");
  CREATE INDEX "pages_blocks_contact_info_contact_methods_parent_id_idx" ON "pages_blocks_contact_info_contact_methods" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_contact_info_order_idx" ON "pages_blocks_contact_info" USING btree ("_order");
  CREATE INDEX "pages_blocks_contact_info_parent_id_idx" ON "pages_blocks_contact_info" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_contact_info_path_idx" ON "pages_blocks_contact_info" USING btree ("_path");
  CREATE INDEX "pages_blocks_contact_location_order_idx" ON "pages_blocks_contact_location" USING btree ("_order");
  CREATE INDEX "pages_blocks_contact_location_parent_id_idx" ON "pages_blocks_contact_location" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_contact_location_path_idx" ON "pages_blocks_contact_location" USING btree ("_path");
  CREATE INDEX "pages_blocks_contact_f_a_q_faqs_order_idx" ON "pages_blocks_contact_f_a_q_faqs" USING btree ("_order");
  CREATE INDEX "pages_blocks_contact_f_a_q_faqs_parent_id_idx" ON "pages_blocks_contact_f_a_q_faqs" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_contact_f_a_q_order_idx" ON "pages_blocks_contact_f_a_q" USING btree ("_order");
  CREATE INDEX "pages_blocks_contact_f_a_q_parent_id_idx" ON "pages_blocks_contact_f_a_q" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_contact_f_a_q_path_idx" ON "pages_blocks_contact_f_a_q" USING btree ("_path");
  CREATE INDEX "pages_blocks_universal_hero_benefits_order_idx" ON "pages_blocks_universal_hero_benefits" USING btree ("_order");
  CREATE INDEX "pages_blocks_universal_hero_benefits_parent_id_idx" ON "pages_blocks_universal_hero_benefits" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_universal_hero_trust_indicators_order_idx" ON "pages_blocks_universal_hero_trust_indicators" USING btree ("_order");
  CREATE INDEX "pages_blocks_universal_hero_trust_indicators_parent_id_idx" ON "pages_blocks_universal_hero_trust_indicators" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_universal_hero_stats_order_idx" ON "pages_blocks_universal_hero_stats" USING btree ("_order");
  CREATE INDEX "pages_blocks_universal_hero_stats_parent_id_idx" ON "pages_blocks_universal_hero_stats" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_universal_hero_contact_methods_order_idx" ON "pages_blocks_universal_hero_contact_methods" USING btree ("_order");
  CREATE INDEX "pages_blocks_universal_hero_contact_methods_parent_id_idx" ON "pages_blocks_universal_hero_contact_methods" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_universal_hero_order_idx" ON "pages_blocks_universal_hero" USING btree ("_order");
  CREATE INDEX "pages_blocks_universal_hero_parent_id_idx" ON "pages_blocks_universal_hero" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_universal_hero_path_idx" ON "pages_blocks_universal_hero" USING btree ("_path");
  CREATE INDEX "pages_blocks_universal_c_t_a_benefits_order_idx" ON "pages_blocks_universal_c_t_a_benefits" USING btree ("_order");
  CREATE INDEX "pages_blocks_universal_c_t_a_benefits_parent_id_idx" ON "pages_blocks_universal_c_t_a_benefits" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_universal_c_t_a_stats_order_idx" ON "pages_blocks_universal_c_t_a_stats" USING btree ("_order");
  CREATE INDEX "pages_blocks_universal_c_t_a_stats_parent_id_idx" ON "pages_blocks_universal_c_t_a_stats" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_universal_c_t_a_order_idx" ON "pages_blocks_universal_c_t_a" USING btree ("_order");
  CREATE INDEX "pages_blocks_universal_c_t_a_parent_id_idx" ON "pages_blocks_universal_c_t_a" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_universal_c_t_a_path_idx" ON "pages_blocks_universal_c_t_a" USING btree ("_path");
  CREATE INDEX "pages_blocks_feature_grid_features_details_order_idx" ON "pages_blocks_feature_grid_features_details" USING btree ("_order");
  CREATE INDEX "pages_blocks_feature_grid_features_details_parent_id_idx" ON "pages_blocks_feature_grid_features_details" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_feature_grid_features_order_idx" ON "pages_blocks_feature_grid_features" USING btree ("_order");
  CREATE INDEX "pages_blocks_feature_grid_features_parent_id_idx" ON "pages_blocks_feature_grid_features" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_feature_grid_order_idx" ON "pages_blocks_feature_grid" USING btree ("_order");
  CREATE INDEX "pages_blocks_feature_grid_parent_id_idx" ON "pages_blocks_feature_grid" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_feature_grid_path_idx" ON "pages_blocks_feature_grid" USING btree ("_path");
  CREATE INDEX "pages_blocks_content_grid_items_applications_order_idx" ON "pages_blocks_content_grid_items_applications" USING btree ("_order");
  CREATE INDEX "pages_blocks_content_grid_items_applications_parent_id_idx" ON "pages_blocks_content_grid_items_applications" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_content_grid_items_order_idx" ON "pages_blocks_content_grid_items" USING btree ("_order");
  CREATE INDEX "pages_blocks_content_grid_items_parent_id_idx" ON "pages_blocks_content_grid_items" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_content_grid_order_idx" ON "pages_blocks_content_grid" USING btree ("_order");
  CREATE INDEX "pages_blocks_content_grid_parent_id_idx" ON "pages_blocks_content_grid" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_content_grid_path_idx" ON "pages_blocks_content_grid" USING btree ("_path");
  CREATE INDEX "pages_blocks_stats_section_stats_order_idx" ON "pages_blocks_stats_section_stats" USING btree ("_order");
  CREATE INDEX "pages_blocks_stats_section_stats_parent_id_idx" ON "pages_blocks_stats_section_stats" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_stats_section_order_idx" ON "pages_blocks_stats_section" USING btree ("_order");
  CREATE INDEX "pages_blocks_stats_section_parent_id_idx" ON "pages_blocks_stats_section" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_stats_section_path_idx" ON "pages_blocks_stats_section" USING btree ("_path");
  CREATE INDEX "pages_blocks_process_steps_steps_details_order_idx" ON "pages_blocks_process_steps_steps_details" USING btree ("_order");
  CREATE INDEX "pages_blocks_process_steps_steps_details_parent_id_idx" ON "pages_blocks_process_steps_steps_details" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_process_steps_steps_order_idx" ON "pages_blocks_process_steps_steps" USING btree ("_order");
  CREATE INDEX "pages_blocks_process_steps_steps_parent_id_idx" ON "pages_blocks_process_steps_steps" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_process_steps_order_idx" ON "pages_blocks_process_steps" USING btree ("_order");
  CREATE INDEX "pages_blocks_process_steps_parent_id_idx" ON "pages_blocks_process_steps" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_process_steps_path_idx" ON "pages_blocks_process_steps" USING btree ("_path");
  CREATE INDEX "pages_blocks_content_cards_cards_tags_order_idx" ON "pages_blocks_content_cards_cards_tags" USING btree ("_order");
  CREATE INDEX "pages_blocks_content_cards_cards_tags_parent_id_idx" ON "pages_blocks_content_cards_cards_tags" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_content_cards_cards_order_idx" ON "pages_blocks_content_cards_cards" USING btree ("_order");
  CREATE INDEX "pages_blocks_content_cards_cards_parent_id_idx" ON "pages_blocks_content_cards_cards" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_content_cards_order_idx" ON "pages_blocks_content_cards" USING btree ("_order");
  CREATE INDEX "pages_blocks_content_cards_parent_id_idx" ON "pages_blocks_content_cards" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_content_cards_path_idx" ON "pages_blocks_content_cards" USING btree ("_path");
  CREATE INDEX "pages_blocks_contact_section_benefits_order_idx" ON "pages_blocks_contact_section_benefits" USING btree ("_order");
  CREATE INDEX "pages_blocks_contact_section_benefits_parent_id_idx" ON "pages_blocks_contact_section_benefits" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_contact_section_order_idx" ON "pages_blocks_contact_section" USING btree ("_order");
  CREATE INDEX "pages_blocks_contact_section_parent_id_idx" ON "pages_blocks_contact_section" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_contact_section_path_idx" ON "pages_blocks_contact_section" USING btree ("_path");
  CREATE INDEX "pages_blocks_comparison_table_items_order_idx" ON "pages_blocks_comparison_table_items" USING btree ("_order");
  CREATE INDEX "pages_blocks_comparison_table_items_parent_id_idx" ON "pages_blocks_comparison_table_items" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_comparison_table_order_idx" ON "pages_blocks_comparison_table" USING btree ("_order");
  CREATE INDEX "pages_blocks_comparison_table_parent_id_idx" ON "pages_blocks_comparison_table" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_comparison_table_path_idx" ON "pages_blocks_comparison_table" USING btree ("_path");
  CREATE INDEX "pages_blocks_simple_page_breadcrumbs_order_idx" ON "pages_blocks_simple_page_breadcrumbs" USING btree ("_order");
  CREATE INDEX "pages_blocks_simple_page_breadcrumbs_parent_id_idx" ON "pages_blocks_simple_page_breadcrumbs" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_simple_page_links_order_idx" ON "pages_blocks_simple_page_links" USING btree ("_order");
  CREATE INDEX "pages_blocks_simple_page_links_parent_id_idx" ON "pages_blocks_simple_page_links" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_simple_page_order_idx" ON "pages_blocks_simple_page" USING btree ("_order");
  CREATE INDEX "pages_blocks_simple_page_parent_id_idx" ON "pages_blocks_simple_page" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_simple_page_path_idx" ON "pages_blocks_simple_page" USING btree ("_path");
  CREATE INDEX "pages_blocks_brand_showcase_brands_order_idx" ON "pages_blocks_brand_showcase_brands" USING btree ("_order");
  CREATE INDEX "pages_blocks_brand_showcase_brands_parent_id_idx" ON "pages_blocks_brand_showcase_brands" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_brand_showcase_brands_logo_idx" ON "pages_blocks_brand_showcase_brands" USING btree ("logo_id");
  CREATE INDEX "pages_blocks_brand_showcase_order_idx" ON "pages_blocks_brand_showcase" USING btree ("_order");
  CREATE INDEX "pages_blocks_brand_showcase_parent_id_idx" ON "pages_blocks_brand_showcase" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_brand_showcase_path_idx" ON "pages_blocks_brand_showcase" USING btree ("_path");
  CREATE INDEX "pages_blocks_technical_content_process_steps_order_idx" ON "pages_blocks_technical_content_process_steps" USING btree ("_order");
  CREATE INDEX "pages_blocks_technical_content_process_steps_parent_id_idx" ON "pages_blocks_technical_content_process_steps" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_technical_content_specifications_items_order_idx" ON "pages_blocks_technical_content_specifications_items" USING btree ("_order");
  CREATE INDEX "pages_blocks_technical_content_specifications_items_parent_id_idx" ON "pages_blocks_technical_content_specifications_items" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_technical_content_specifications_order_idx" ON "pages_blocks_technical_content_specifications" USING btree ("_order");
  CREATE INDEX "pages_blocks_technical_content_specifications_parent_id_idx" ON "pages_blocks_technical_content_specifications" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_technical_content_order_idx" ON "pages_blocks_technical_content" USING btree ("_order");
  CREATE INDEX "pages_blocks_technical_content_parent_id_idx" ON "pages_blocks_technical_content" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_technical_content_path_idx" ON "pages_blocks_technical_content" USING btree ("_path");
  CREATE INDEX "pages_blocks_resource_gallery_resources_order_idx" ON "pages_blocks_resource_gallery_resources" USING btree ("_order");
  CREATE INDEX "pages_blocks_resource_gallery_resources_parent_id_idx" ON "pages_blocks_resource_gallery_resources" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_resource_gallery_gallery_images_order_idx" ON "pages_blocks_resource_gallery_gallery_images" USING btree ("_order");
  CREATE INDEX "pages_blocks_resource_gallery_gallery_images_parent_id_idx" ON "pages_blocks_resource_gallery_gallery_images" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_resource_gallery_gallery_images_image_idx" ON "pages_blocks_resource_gallery_gallery_images" USING btree ("image_id");
  CREATE INDEX "pages_blocks_resource_gallery_order_idx" ON "pages_blocks_resource_gallery" USING btree ("_order");
  CREATE INDEX "pages_blocks_resource_gallery_parent_id_idx" ON "pages_blocks_resource_gallery" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_resource_gallery_path_idx" ON "pages_blocks_resource_gallery" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_rich_text_order_idx" ON "_pages_v_blocks_rich_text" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_rich_text_parent_id_idx" ON "_pages_v_blocks_rich_text" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_rich_text_path_idx" ON "_pages_v_blocks_rich_text" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_product_hero_key_benefits_order_idx" ON "_pages_v_blocks_product_hero_key_benefits" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_product_hero_key_benefits_parent_id_idx" ON "_pages_v_blocks_product_hero_key_benefits" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_product_hero_cta_buttons_order_idx" ON "_pages_v_blocks_product_hero_cta_buttons" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_product_hero_cta_buttons_parent_id_idx" ON "_pages_v_blocks_product_hero_cta_buttons" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_product_hero_cta_buttons_page_idx" ON "_pages_v_blocks_product_hero_cta_buttons" USING btree ("page_id");
  CREATE INDEX "_pages_v_blocks_product_hero_order_idx" ON "_pages_v_blocks_product_hero" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_product_hero_parent_id_idx" ON "_pages_v_blocks_product_hero" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_product_hero_path_idx" ON "_pages_v_blocks_product_hero" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_product_hero_background_image_idx" ON "_pages_v_blocks_product_hero" USING btree ("background_image_id");
  CREATE INDEX "_pages_v_blocks_key_features_features_order_idx" ON "_pages_v_blocks_key_features_features" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_key_features_features_parent_id_idx" ON "_pages_v_blocks_key_features_features" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_key_features_order_idx" ON "_pages_v_blocks_key_features" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_key_features_parent_id_idx" ON "_pages_v_blocks_key_features" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_key_features_path_idx" ON "_pages_v_blocks_key_features" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_product_gallery_images_order_idx" ON "_pages_v_blocks_product_gallery_images" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_product_gallery_images_parent_id_idx" ON "_pages_v_blocks_product_gallery_images" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_product_gallery_images_image_idx" ON "_pages_v_blocks_product_gallery_images" USING btree ("image_id");
  CREATE INDEX "_pages_v_blocks_product_gallery_order_idx" ON "_pages_v_blocks_product_gallery" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_product_gallery_parent_id_idx" ON "_pages_v_blocks_product_gallery" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_product_gallery_path_idx" ON "_pages_v_blocks_product_gallery" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_specifications_specifications_items_order_idx" ON "_pages_v_blocks_specifications_specifications_items" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_specifications_specifications_items_parent_id_idx" ON "_pages_v_blocks_specifications_specifications_items" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_specifications_specifications_order_idx" ON "_pages_v_blocks_specifications_specifications" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_specifications_specifications_parent_id_idx" ON "_pages_v_blocks_specifications_specifications" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_specifications_certification_badges_order_idx" ON "_pages_v_blocks_specifications_certification_badges" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_specifications_certification_badges_parent_id_idx" ON "_pages_v_blocks_specifications_certification_badges" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_specifications_additional_info_details_order_idx" ON "_pages_v_blocks_specifications_additional_info_details" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_specifications_additional_info_details_parent_id_idx" ON "_pages_v_blocks_specifications_additional_info_details" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_specifications_order_idx" ON "_pages_v_blocks_specifications" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_specifications_parent_id_idx" ON "_pages_v_blocks_specifications" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_specifications_path_idx" ON "_pages_v_blocks_specifications" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_applications_applications_details_order_idx" ON "_pages_v_blocks_applications_applications_details" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_applications_applications_details_parent_id_idx" ON "_pages_v_blocks_applications_applications_details" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_applications_applications_order_idx" ON "_pages_v_blocks_applications_applications" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_applications_applications_parent_id_idx" ON "_pages_v_blocks_applications_applications" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_applications_stats_order_idx" ON "_pages_v_blocks_applications_stats" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_applications_stats_parent_id_idx" ON "_pages_v_blocks_applications_stats" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_applications_case_study_stats_order_idx" ON "_pages_v_blocks_applications_case_study_stats" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_applications_case_study_stats_parent_id_idx" ON "_pages_v_blocks_applications_case_study_stats" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_applications_order_idx" ON "_pages_v_blocks_applications" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_applications_parent_id_idx" ON "_pages_v_blocks_applications" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_applications_path_idx" ON "_pages_v_blocks_applications" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_applications_case_study_case_study_image_idx" ON "_pages_v_blocks_applications" USING btree ("case_study_image_id");
  CREATE INDEX "_pages_v_blocks_technical_overview_process_steps_order_idx" ON "_pages_v_blocks_technical_overview_process_steps" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_technical_overview_process_steps_parent_id_idx" ON "_pages_v_blocks_technical_overview_process_steps" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_technical_overview_technical_benefits_order_idx" ON "_pages_v_blocks_technical_overview_technical_benefits" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_technical_overview_technical_benefits_parent_id_idx" ON "_pages_v_blocks_technical_overview_technical_benefits" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_technical_overview_order_idx" ON "_pages_v_blocks_technical_overview" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_technical_overview_parent_id_idx" ON "_pages_v_blocks_technical_overview" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_technical_overview_path_idx" ON "_pages_v_blocks_technical_overview" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_technical_overview_technical_image_idx" ON "_pages_v_blocks_technical_overview" USING btree ("technical_image_id");
  CREATE INDEX "_pages_v_blocks_benefits_comparison_benefits_order_idx" ON "_pages_v_blocks_benefits_comparison_benefits" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_benefits_comparison_benefits_parent_id_idx" ON "_pages_v_blocks_benefits_comparison_benefits" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_benefits_comparison_summary_cards_order_idx" ON "_pages_v_blocks_benefits_comparison_summary_cards" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_benefits_comparison_summary_cards_parent_id_idx" ON "_pages_v_blocks_benefits_comparison_summary_cards" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_benefits_comparison_order_idx" ON "_pages_v_blocks_benefits_comparison" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_benefits_comparison_parent_id_idx" ON "_pages_v_blocks_benefits_comparison" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_benefits_comparison_path_idx" ON "_pages_v_blocks_benefits_comparison" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_product_c_t_a_stats_order_idx" ON "_pages_v_blocks_product_c_t_a_stats" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_product_c_t_a_stats_parent_id_idx" ON "_pages_v_blocks_product_c_t_a_stats" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_product_c_t_a_why_us_points_order_idx" ON "_pages_v_blocks_product_c_t_a_why_us_points" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_product_c_t_a_why_us_points_parent_id_idx" ON "_pages_v_blocks_product_c_t_a_why_us_points" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_product_c_t_a_application_options_order_idx" ON "_pages_v_blocks_product_c_t_a_application_options" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_product_c_t_a_application_options_parent_id_idx" ON "_pages_v_blocks_product_c_t_a_application_options" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_product_c_t_a_order_idx" ON "_pages_v_blocks_product_c_t_a" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_product_c_t_a_parent_id_idx" ON "_pages_v_blocks_product_c_t_a" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_product_c_t_a_path_idx" ON "_pages_v_blocks_product_c_t_a" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_product_c_t_a_hero_image_idx" ON "_pages_v_blocks_product_c_t_a" USING btree ("hero_image_id");
  CREATE INDEX "_pages_v_blocks_product_resources_resources_order_idx" ON "_pages_v_blocks_product_resources_resources" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_product_resources_resources_parent_id_idx" ON "_pages_v_blocks_product_resources_resources" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_product_resources_quick_access_items_order_idx" ON "_pages_v_blocks_product_resources_quick_access_items" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_product_resources_quick_access_items_parent_id_idx" ON "_pages_v_blocks_product_resources_quick_access_items" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_product_resources_order_idx" ON "_pages_v_blocks_product_resources" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_product_resources_parent_id_idx" ON "_pages_v_blocks_product_resources" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_product_resources_path_idx" ON "_pages_v_blocks_product_resources" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_contact_hero_quick_contact_methods_order_idx" ON "_pages_v_blocks_contact_hero_quick_contact_methods" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_contact_hero_quick_contact_methods_parent_id_idx" ON "_pages_v_blocks_contact_hero_quick_contact_methods" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_contact_hero_order_idx" ON "_pages_v_blocks_contact_hero" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_contact_hero_parent_id_idx" ON "_pages_v_blocks_contact_hero" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_contact_hero_path_idx" ON "_pages_v_blocks_contact_hero" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_contact_form_order_idx" ON "_pages_v_blocks_contact_form" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_contact_form_parent_id_idx" ON "_pages_v_blocks_contact_form" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_contact_form_path_idx" ON "_pages_v_blocks_contact_form" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_contact_info_contact_methods_order_idx" ON "_pages_v_blocks_contact_info_contact_methods" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_contact_info_contact_methods_parent_id_idx" ON "_pages_v_blocks_contact_info_contact_methods" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_contact_info_order_idx" ON "_pages_v_blocks_contact_info" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_contact_info_parent_id_idx" ON "_pages_v_blocks_contact_info" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_contact_info_path_idx" ON "_pages_v_blocks_contact_info" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_contact_location_order_idx" ON "_pages_v_blocks_contact_location" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_contact_location_parent_id_idx" ON "_pages_v_blocks_contact_location" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_contact_location_path_idx" ON "_pages_v_blocks_contact_location" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_contact_f_a_q_faqs_order_idx" ON "_pages_v_blocks_contact_f_a_q_faqs" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_contact_f_a_q_faqs_parent_id_idx" ON "_pages_v_blocks_contact_f_a_q_faqs" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_contact_f_a_q_order_idx" ON "_pages_v_blocks_contact_f_a_q" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_contact_f_a_q_parent_id_idx" ON "_pages_v_blocks_contact_f_a_q" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_contact_f_a_q_path_idx" ON "_pages_v_blocks_contact_f_a_q" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_universal_hero_benefits_order_idx" ON "_pages_v_blocks_universal_hero_benefits" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_universal_hero_benefits_parent_id_idx" ON "_pages_v_blocks_universal_hero_benefits" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_universal_hero_trust_indicators_order_idx" ON "_pages_v_blocks_universal_hero_trust_indicators" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_universal_hero_trust_indicators_parent_id_idx" ON "_pages_v_blocks_universal_hero_trust_indicators" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_universal_hero_stats_order_idx" ON "_pages_v_blocks_universal_hero_stats" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_universal_hero_stats_parent_id_idx" ON "_pages_v_blocks_universal_hero_stats" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_universal_hero_contact_methods_order_idx" ON "_pages_v_blocks_universal_hero_contact_methods" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_universal_hero_contact_methods_parent_id_idx" ON "_pages_v_blocks_universal_hero_contact_methods" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_universal_hero_order_idx" ON "_pages_v_blocks_universal_hero" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_universal_hero_parent_id_idx" ON "_pages_v_blocks_universal_hero" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_universal_hero_path_idx" ON "_pages_v_blocks_universal_hero" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_universal_c_t_a_benefits_order_idx" ON "_pages_v_blocks_universal_c_t_a_benefits" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_universal_c_t_a_benefits_parent_id_idx" ON "_pages_v_blocks_universal_c_t_a_benefits" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_universal_c_t_a_stats_order_idx" ON "_pages_v_blocks_universal_c_t_a_stats" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_universal_c_t_a_stats_parent_id_idx" ON "_pages_v_blocks_universal_c_t_a_stats" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_universal_c_t_a_order_idx" ON "_pages_v_blocks_universal_c_t_a" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_universal_c_t_a_parent_id_idx" ON "_pages_v_blocks_universal_c_t_a" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_universal_c_t_a_path_idx" ON "_pages_v_blocks_universal_c_t_a" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_feature_grid_features_details_order_idx" ON "_pages_v_blocks_feature_grid_features_details" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_feature_grid_features_details_parent_id_idx" ON "_pages_v_blocks_feature_grid_features_details" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_feature_grid_features_order_idx" ON "_pages_v_blocks_feature_grid_features" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_feature_grid_features_parent_id_idx" ON "_pages_v_blocks_feature_grid_features" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_feature_grid_order_idx" ON "_pages_v_blocks_feature_grid" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_feature_grid_parent_id_idx" ON "_pages_v_blocks_feature_grid" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_feature_grid_path_idx" ON "_pages_v_blocks_feature_grid" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_content_grid_items_applications_order_idx" ON "_pages_v_blocks_content_grid_items_applications" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_content_grid_items_applications_parent_id_idx" ON "_pages_v_blocks_content_grid_items_applications" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_content_grid_items_order_idx" ON "_pages_v_blocks_content_grid_items" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_content_grid_items_parent_id_idx" ON "_pages_v_blocks_content_grid_items" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_content_grid_order_idx" ON "_pages_v_blocks_content_grid" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_content_grid_parent_id_idx" ON "_pages_v_blocks_content_grid" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_content_grid_path_idx" ON "_pages_v_blocks_content_grid" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_stats_section_stats_order_idx" ON "_pages_v_blocks_stats_section_stats" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_stats_section_stats_parent_id_idx" ON "_pages_v_blocks_stats_section_stats" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_stats_section_order_idx" ON "_pages_v_blocks_stats_section" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_stats_section_parent_id_idx" ON "_pages_v_blocks_stats_section" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_stats_section_path_idx" ON "_pages_v_blocks_stats_section" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_process_steps_steps_details_order_idx" ON "_pages_v_blocks_process_steps_steps_details" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_process_steps_steps_details_parent_id_idx" ON "_pages_v_blocks_process_steps_steps_details" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_process_steps_steps_order_idx" ON "_pages_v_blocks_process_steps_steps" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_process_steps_steps_parent_id_idx" ON "_pages_v_blocks_process_steps_steps" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_process_steps_order_idx" ON "_pages_v_blocks_process_steps" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_process_steps_parent_id_idx" ON "_pages_v_blocks_process_steps" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_process_steps_path_idx" ON "_pages_v_blocks_process_steps" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_content_cards_cards_tags_order_idx" ON "_pages_v_blocks_content_cards_cards_tags" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_content_cards_cards_tags_parent_id_idx" ON "_pages_v_blocks_content_cards_cards_tags" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_content_cards_cards_order_idx" ON "_pages_v_blocks_content_cards_cards" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_content_cards_cards_parent_id_idx" ON "_pages_v_blocks_content_cards_cards" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_content_cards_order_idx" ON "_pages_v_blocks_content_cards" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_content_cards_parent_id_idx" ON "_pages_v_blocks_content_cards" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_content_cards_path_idx" ON "_pages_v_blocks_content_cards" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_contact_section_benefits_order_idx" ON "_pages_v_blocks_contact_section_benefits" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_contact_section_benefits_parent_id_idx" ON "_pages_v_blocks_contact_section_benefits" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_contact_section_order_idx" ON "_pages_v_blocks_contact_section" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_contact_section_parent_id_idx" ON "_pages_v_blocks_contact_section" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_contact_section_path_idx" ON "_pages_v_blocks_contact_section" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_comparison_table_items_order_idx" ON "_pages_v_blocks_comparison_table_items" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_comparison_table_items_parent_id_idx" ON "_pages_v_blocks_comparison_table_items" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_comparison_table_order_idx" ON "_pages_v_blocks_comparison_table" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_comparison_table_parent_id_idx" ON "_pages_v_blocks_comparison_table" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_comparison_table_path_idx" ON "_pages_v_blocks_comparison_table" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_simple_page_breadcrumbs_order_idx" ON "_pages_v_blocks_simple_page_breadcrumbs" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_simple_page_breadcrumbs_parent_id_idx" ON "_pages_v_blocks_simple_page_breadcrumbs" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_simple_page_links_order_idx" ON "_pages_v_blocks_simple_page_links" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_simple_page_links_parent_id_idx" ON "_pages_v_blocks_simple_page_links" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_simple_page_order_idx" ON "_pages_v_blocks_simple_page" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_simple_page_parent_id_idx" ON "_pages_v_blocks_simple_page" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_simple_page_path_idx" ON "_pages_v_blocks_simple_page" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_brand_showcase_brands_order_idx" ON "_pages_v_blocks_brand_showcase_brands" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_brand_showcase_brands_parent_id_idx" ON "_pages_v_blocks_brand_showcase_brands" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_brand_showcase_brands_logo_idx" ON "_pages_v_blocks_brand_showcase_brands" USING btree ("logo_id");
  CREATE INDEX "_pages_v_blocks_brand_showcase_order_idx" ON "_pages_v_blocks_brand_showcase" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_brand_showcase_parent_id_idx" ON "_pages_v_blocks_brand_showcase" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_brand_showcase_path_idx" ON "_pages_v_blocks_brand_showcase" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_technical_content_process_steps_order_idx" ON "_pages_v_blocks_technical_content_process_steps" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_technical_content_process_steps_parent_id_idx" ON "_pages_v_blocks_technical_content_process_steps" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_technical_content_specifications_items_order_idx" ON "_pages_v_blocks_technical_content_specifications_items" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_technical_content_specifications_items_parent_id_idx" ON "_pages_v_blocks_technical_content_specifications_items" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_technical_content_specifications_order_idx" ON "_pages_v_blocks_technical_content_specifications" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_technical_content_specifications_parent_id_idx" ON "_pages_v_blocks_technical_content_specifications" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_technical_content_order_idx" ON "_pages_v_blocks_technical_content" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_technical_content_parent_id_idx" ON "_pages_v_blocks_technical_content" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_technical_content_path_idx" ON "_pages_v_blocks_technical_content" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_resource_gallery_resources_order_idx" ON "_pages_v_blocks_resource_gallery_resources" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_resource_gallery_resources_parent_id_idx" ON "_pages_v_blocks_resource_gallery_resources" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_resource_gallery_gallery_images_order_idx" ON "_pages_v_blocks_resource_gallery_gallery_images" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_resource_gallery_gallery_images_parent_id_idx" ON "_pages_v_blocks_resource_gallery_gallery_images" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_resource_gallery_gallery_images_image_idx" ON "_pages_v_blocks_resource_gallery_gallery_images" USING btree ("image_id");
  CREATE INDEX "_pages_v_blocks_resource_gallery_order_idx" ON "_pages_v_blocks_resource_gallery" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_resource_gallery_parent_id_idx" ON "_pages_v_blocks_resource_gallery" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_resource_gallery_path_idx" ON "_pages_v_blocks_resource_gallery" USING btree ("_path");
  CREATE INDEX "footer_company_info_address_order_idx" ON "footer_company_info_address" USING btree ("_order");
  CREATE INDEX "footer_company_info_address_parent_id_idx" ON "footer_company_info_address" USING btree ("_parent_id");
  CREATE INDEX "footer_bottom_links_order_idx" ON "footer_bottom_links" USING btree ("_order");
  CREATE INDEX "footer_bottom_links_parent_id_idx" ON "footer_bottom_links" USING btree ("_parent_id");
  CREATE INDEX "footer_bottom_links_page_idx" ON "footer_bottom_links" USING btree ("page_id");
  ALTER TABLE "footer" ADD CONSTRAINT "footer_logo_id_media_id_fk" FOREIGN KEY ("logo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "seo" ADD CONSTRAINT "seo_favicon_id_media_id_fk" FOREIGN KEY ("favicon_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "footer_logo_idx" ON "footer" USING btree ("logo_id");
  CREATE INDEX "seo_favicon_idx" ON "seo" USING btree ("favicon_id");
  ALTER TABLE "pages" DROP COLUMN "content";
  ALTER TABLE "_pages_v" DROP COLUMN "version_content";
  ALTER TABLE "footer" DROP COLUMN "description";
  ALTER TABLE "footer" DROP COLUMN "contact_info_email";
  ALTER TABLE "footer" DROP COLUMN "contact_info_phone";
  ALTER TABLE "footer" DROP COLUMN "contact_info_address";
  ALTER TABLE "footer" DROP COLUMN "newsletter_enabled";
  ALTER TABLE "footer" DROP COLUMN "newsletter_title";
  ALTER TABLE "footer" DROP COLUMN "newsletter_description";`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "pages_blocks_rich_text" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_product_hero_key_benefits" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_product_hero_cta_buttons" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_product_hero" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_key_features_features" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_key_features" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_product_gallery_images" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_product_gallery" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_specifications_specifications_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_specifications_specifications" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_specifications_certification_badges" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_specifications_additional_info_details" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_specifications" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_applications_applications_details" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_applications_applications" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_applications_stats" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_applications_case_study_stats" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_applications" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_technical_overview_process_steps" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_technical_overview_technical_benefits" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_technical_overview" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_benefits_comparison_benefits" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_benefits_comparison_summary_cards" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_benefits_comparison" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_product_c_t_a_stats" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_product_c_t_a_why_us_points" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_product_c_t_a_application_options" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_product_c_t_a" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_product_resources_resources" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_product_resources_quick_access_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_product_resources" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_contact_hero_quick_contact_methods" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_contact_hero" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_contact_form" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_contact_info_contact_methods" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_contact_info" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_contact_location" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_contact_f_a_q_faqs" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_contact_f_a_q" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_universal_hero_benefits" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_universal_hero_trust_indicators" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_universal_hero_stats" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_universal_hero_contact_methods" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_universal_hero" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_universal_c_t_a_benefits" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_universal_c_t_a_stats" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_universal_c_t_a" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_feature_grid_features_details" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_feature_grid_features" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_feature_grid" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_content_grid_items_applications" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_content_grid_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_content_grid" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_stats_section_stats" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_stats_section" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_process_steps_steps_details" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_process_steps_steps" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_process_steps" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_content_cards_cards_tags" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_content_cards_cards" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_content_cards" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_contact_section_benefits" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_contact_section" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_comparison_table_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_comparison_table" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_simple_page_breadcrumbs" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_simple_page_links" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_simple_page" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_brand_showcase_brands" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_brand_showcase" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_technical_content_process_steps" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_technical_content_specifications_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_technical_content_specifications" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_technical_content" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_resource_gallery_resources" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_resource_gallery_gallery_images" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_resource_gallery" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_rich_text" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_product_hero_key_benefits" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_product_hero_cta_buttons" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_product_hero" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_key_features_features" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_key_features" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_product_gallery_images" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_product_gallery" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_specifications_specifications_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_specifications_specifications" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_specifications_certification_badges" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_specifications_additional_info_details" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_specifications" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_applications_applications_details" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_applications_applications" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_applications_stats" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_applications_case_study_stats" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_applications" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_technical_overview_process_steps" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_technical_overview_technical_benefits" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_technical_overview" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_benefits_comparison_benefits" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_benefits_comparison_summary_cards" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_benefits_comparison" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_product_c_t_a_stats" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_product_c_t_a_why_us_points" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_product_c_t_a_application_options" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_product_c_t_a" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_product_resources_resources" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_product_resources_quick_access_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_product_resources" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_contact_hero_quick_contact_methods" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_contact_hero" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_contact_form" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_contact_info_contact_methods" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_contact_info" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_contact_location" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_contact_f_a_q_faqs" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_contact_f_a_q" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_universal_hero_benefits" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_universal_hero_trust_indicators" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_universal_hero_stats" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_universal_hero_contact_methods" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_universal_hero" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_universal_c_t_a_benefits" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_universal_c_t_a_stats" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_universal_c_t_a" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_feature_grid_features_details" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_feature_grid_features" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_feature_grid" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_content_grid_items_applications" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_content_grid_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_content_grid" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_stats_section_stats" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_stats_section" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_process_steps_steps_details" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_process_steps_steps" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_process_steps" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_content_cards_cards_tags" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_content_cards_cards" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_content_cards" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_contact_section_benefits" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_contact_section" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_comparison_table_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_comparison_table" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_simple_page_breadcrumbs" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_simple_page_links" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_simple_page" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_brand_showcase_brands" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_brand_showcase" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_technical_content_process_steps" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_technical_content_specifications_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_technical_content_specifications" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_technical_content" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_resource_gallery_resources" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_resource_gallery_gallery_images" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_resource_gallery" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "footer_company_info_address" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "footer_bottom_links" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "pages_blocks_rich_text" CASCADE;
  DROP TABLE "pages_blocks_product_hero_key_benefits" CASCADE;
  DROP TABLE "pages_blocks_product_hero_cta_buttons" CASCADE;
  DROP TABLE "pages_blocks_product_hero" CASCADE;
  DROP TABLE "pages_blocks_key_features_features" CASCADE;
  DROP TABLE "pages_blocks_key_features" CASCADE;
  DROP TABLE "pages_blocks_product_gallery_images" CASCADE;
  DROP TABLE "pages_blocks_product_gallery" CASCADE;
  DROP TABLE "pages_blocks_specifications_specifications_items" CASCADE;
  DROP TABLE "pages_blocks_specifications_specifications" CASCADE;
  DROP TABLE "pages_blocks_specifications_certification_badges" CASCADE;
  DROP TABLE "pages_blocks_specifications_additional_info_details" CASCADE;
  DROP TABLE "pages_blocks_specifications" CASCADE;
  DROP TABLE "pages_blocks_applications_applications_details" CASCADE;
  DROP TABLE "pages_blocks_applications_applications" CASCADE;
  DROP TABLE "pages_blocks_applications_stats" CASCADE;
  DROP TABLE "pages_blocks_applications_case_study_stats" CASCADE;
  DROP TABLE "pages_blocks_applications" CASCADE;
  DROP TABLE "pages_blocks_technical_overview_process_steps" CASCADE;
  DROP TABLE "pages_blocks_technical_overview_technical_benefits" CASCADE;
  DROP TABLE "pages_blocks_technical_overview" CASCADE;
  DROP TABLE "pages_blocks_benefits_comparison_benefits" CASCADE;
  DROP TABLE "pages_blocks_benefits_comparison_summary_cards" CASCADE;
  DROP TABLE "pages_blocks_benefits_comparison" CASCADE;
  DROP TABLE "pages_blocks_product_c_t_a_stats" CASCADE;
  DROP TABLE "pages_blocks_product_c_t_a_why_us_points" CASCADE;
  DROP TABLE "pages_blocks_product_c_t_a_application_options" CASCADE;
  DROP TABLE "pages_blocks_product_c_t_a" CASCADE;
  DROP TABLE "pages_blocks_product_resources_resources" CASCADE;
  DROP TABLE "pages_blocks_product_resources_quick_access_items" CASCADE;
  DROP TABLE "pages_blocks_product_resources" CASCADE;
  DROP TABLE "pages_blocks_contact_hero_quick_contact_methods" CASCADE;
  DROP TABLE "pages_blocks_contact_hero" CASCADE;
  DROP TABLE "pages_blocks_contact_form" CASCADE;
  DROP TABLE "pages_blocks_contact_info_contact_methods" CASCADE;
  DROP TABLE "pages_blocks_contact_info" CASCADE;
  DROP TABLE "pages_blocks_contact_location" CASCADE;
  DROP TABLE "pages_blocks_contact_f_a_q_faqs" CASCADE;
  DROP TABLE "pages_blocks_contact_f_a_q" CASCADE;
  DROP TABLE "pages_blocks_universal_hero_benefits" CASCADE;
  DROP TABLE "pages_blocks_universal_hero_trust_indicators" CASCADE;
  DROP TABLE "pages_blocks_universal_hero_stats" CASCADE;
  DROP TABLE "pages_blocks_universal_hero_contact_methods" CASCADE;
  DROP TABLE "pages_blocks_universal_hero" CASCADE;
  DROP TABLE "pages_blocks_universal_c_t_a_benefits" CASCADE;
  DROP TABLE "pages_blocks_universal_c_t_a_stats" CASCADE;
  DROP TABLE "pages_blocks_universal_c_t_a" CASCADE;
  DROP TABLE "pages_blocks_feature_grid_features_details" CASCADE;
  DROP TABLE "pages_blocks_feature_grid_features" CASCADE;
  DROP TABLE "pages_blocks_feature_grid" CASCADE;
  DROP TABLE "pages_blocks_content_grid_items_applications" CASCADE;
  DROP TABLE "pages_blocks_content_grid_items" CASCADE;
  DROP TABLE "pages_blocks_content_grid" CASCADE;
  DROP TABLE "pages_blocks_stats_section_stats" CASCADE;
  DROP TABLE "pages_blocks_stats_section" CASCADE;
  DROP TABLE "pages_blocks_process_steps_steps_details" CASCADE;
  DROP TABLE "pages_blocks_process_steps_steps" CASCADE;
  DROP TABLE "pages_blocks_process_steps" CASCADE;
  DROP TABLE "pages_blocks_content_cards_cards_tags" CASCADE;
  DROP TABLE "pages_blocks_content_cards_cards" CASCADE;
  DROP TABLE "pages_blocks_content_cards" CASCADE;
  DROP TABLE "pages_blocks_contact_section_benefits" CASCADE;
  DROP TABLE "pages_blocks_contact_section" CASCADE;
  DROP TABLE "pages_blocks_comparison_table_items" CASCADE;
  DROP TABLE "pages_blocks_comparison_table" CASCADE;
  DROP TABLE "pages_blocks_simple_page_breadcrumbs" CASCADE;
  DROP TABLE "pages_blocks_simple_page_links" CASCADE;
  DROP TABLE "pages_blocks_simple_page" CASCADE;
  DROP TABLE "pages_blocks_brand_showcase_brands" CASCADE;
  DROP TABLE "pages_blocks_brand_showcase" CASCADE;
  DROP TABLE "pages_blocks_technical_content_process_steps" CASCADE;
  DROP TABLE "pages_blocks_technical_content_specifications_items" CASCADE;
  DROP TABLE "pages_blocks_technical_content_specifications" CASCADE;
  DROP TABLE "pages_blocks_technical_content" CASCADE;
  DROP TABLE "pages_blocks_resource_gallery_resources" CASCADE;
  DROP TABLE "pages_blocks_resource_gallery_gallery_images" CASCADE;
  DROP TABLE "pages_blocks_resource_gallery" CASCADE;
  DROP TABLE "_pages_v_blocks_rich_text" CASCADE;
  DROP TABLE "_pages_v_blocks_product_hero_key_benefits" CASCADE;
  DROP TABLE "_pages_v_blocks_product_hero_cta_buttons" CASCADE;
  DROP TABLE "_pages_v_blocks_product_hero" CASCADE;
  DROP TABLE "_pages_v_blocks_key_features_features" CASCADE;
  DROP TABLE "_pages_v_blocks_key_features" CASCADE;
  DROP TABLE "_pages_v_blocks_product_gallery_images" CASCADE;
  DROP TABLE "_pages_v_blocks_product_gallery" CASCADE;
  DROP TABLE "_pages_v_blocks_specifications_specifications_items" CASCADE;
  DROP TABLE "_pages_v_blocks_specifications_specifications" CASCADE;
  DROP TABLE "_pages_v_blocks_specifications_certification_badges" CASCADE;
  DROP TABLE "_pages_v_blocks_specifications_additional_info_details" CASCADE;
  DROP TABLE "_pages_v_blocks_specifications" CASCADE;
  DROP TABLE "_pages_v_blocks_applications_applications_details" CASCADE;
  DROP TABLE "_pages_v_blocks_applications_applications" CASCADE;
  DROP TABLE "_pages_v_blocks_applications_stats" CASCADE;
  DROP TABLE "_pages_v_blocks_applications_case_study_stats" CASCADE;
  DROP TABLE "_pages_v_blocks_applications" CASCADE;
  DROP TABLE "_pages_v_blocks_technical_overview_process_steps" CASCADE;
  DROP TABLE "_pages_v_blocks_technical_overview_technical_benefits" CASCADE;
  DROP TABLE "_pages_v_blocks_technical_overview" CASCADE;
  DROP TABLE "_pages_v_blocks_benefits_comparison_benefits" CASCADE;
  DROP TABLE "_pages_v_blocks_benefits_comparison_summary_cards" CASCADE;
  DROP TABLE "_pages_v_blocks_benefits_comparison" CASCADE;
  DROP TABLE "_pages_v_blocks_product_c_t_a_stats" CASCADE;
  DROP TABLE "_pages_v_blocks_product_c_t_a_why_us_points" CASCADE;
  DROP TABLE "_pages_v_blocks_product_c_t_a_application_options" CASCADE;
  DROP TABLE "_pages_v_blocks_product_c_t_a" CASCADE;
  DROP TABLE "_pages_v_blocks_product_resources_resources" CASCADE;
  DROP TABLE "_pages_v_blocks_product_resources_quick_access_items" CASCADE;
  DROP TABLE "_pages_v_blocks_product_resources" CASCADE;
  DROP TABLE "_pages_v_blocks_contact_hero_quick_contact_methods" CASCADE;
  DROP TABLE "_pages_v_blocks_contact_hero" CASCADE;
  DROP TABLE "_pages_v_blocks_contact_form" CASCADE;
  DROP TABLE "_pages_v_blocks_contact_info_contact_methods" CASCADE;
  DROP TABLE "_pages_v_blocks_contact_info" CASCADE;
  DROP TABLE "_pages_v_blocks_contact_location" CASCADE;
  DROP TABLE "_pages_v_blocks_contact_f_a_q_faqs" CASCADE;
  DROP TABLE "_pages_v_blocks_contact_f_a_q" CASCADE;
  DROP TABLE "_pages_v_blocks_universal_hero_benefits" CASCADE;
  DROP TABLE "_pages_v_blocks_universal_hero_trust_indicators" CASCADE;
  DROP TABLE "_pages_v_blocks_universal_hero_stats" CASCADE;
  DROP TABLE "_pages_v_blocks_universal_hero_contact_methods" CASCADE;
  DROP TABLE "_pages_v_blocks_universal_hero" CASCADE;
  DROP TABLE "_pages_v_blocks_universal_c_t_a_benefits" CASCADE;
  DROP TABLE "_pages_v_blocks_universal_c_t_a_stats" CASCADE;
  DROP TABLE "_pages_v_blocks_universal_c_t_a" CASCADE;
  DROP TABLE "_pages_v_blocks_feature_grid_features_details" CASCADE;
  DROP TABLE "_pages_v_blocks_feature_grid_features" CASCADE;
  DROP TABLE "_pages_v_blocks_feature_grid" CASCADE;
  DROP TABLE "_pages_v_blocks_content_grid_items_applications" CASCADE;
  DROP TABLE "_pages_v_blocks_content_grid_items" CASCADE;
  DROP TABLE "_pages_v_blocks_content_grid" CASCADE;
  DROP TABLE "_pages_v_blocks_stats_section_stats" CASCADE;
  DROP TABLE "_pages_v_blocks_stats_section" CASCADE;
  DROP TABLE "_pages_v_blocks_process_steps_steps_details" CASCADE;
  DROP TABLE "_pages_v_blocks_process_steps_steps" CASCADE;
  DROP TABLE "_pages_v_blocks_process_steps" CASCADE;
  DROP TABLE "_pages_v_blocks_content_cards_cards_tags" CASCADE;
  DROP TABLE "_pages_v_blocks_content_cards_cards" CASCADE;
  DROP TABLE "_pages_v_blocks_content_cards" CASCADE;
  DROP TABLE "_pages_v_blocks_contact_section_benefits" CASCADE;
  DROP TABLE "_pages_v_blocks_contact_section" CASCADE;
  DROP TABLE "_pages_v_blocks_comparison_table_items" CASCADE;
  DROP TABLE "_pages_v_blocks_comparison_table" CASCADE;
  DROP TABLE "_pages_v_blocks_simple_page_breadcrumbs" CASCADE;
  DROP TABLE "_pages_v_blocks_simple_page_links" CASCADE;
  DROP TABLE "_pages_v_blocks_simple_page" CASCADE;
  DROP TABLE "_pages_v_blocks_brand_showcase_brands" CASCADE;
  DROP TABLE "_pages_v_blocks_brand_showcase" CASCADE;
  DROP TABLE "_pages_v_blocks_technical_content_process_steps" CASCADE;
  DROP TABLE "_pages_v_blocks_technical_content_specifications_items" CASCADE;
  DROP TABLE "_pages_v_blocks_technical_content_specifications" CASCADE;
  DROP TABLE "_pages_v_blocks_technical_content" CASCADE;
  DROP TABLE "_pages_v_blocks_resource_gallery_resources" CASCADE;
  DROP TABLE "_pages_v_blocks_resource_gallery_gallery_images" CASCADE;
  DROP TABLE "_pages_v_blocks_resource_gallery" CASCADE;
  DROP TABLE "footer_company_info_address" CASCADE;
  DROP TABLE "footer_bottom_links" CASCADE;
  ALTER TABLE "footer" DROP CONSTRAINT "footer_logo_id_media_id_fk";
  
  ALTER TABLE "seo" DROP CONSTRAINT "seo_favicon_id_media_id_fk";
  
  ALTER TABLE "pages_blocks_hero_cta_buttons" ALTER COLUMN "variant" SET DATA TYPE text;
  ALTER TABLE "pages_blocks_hero_cta_buttons" ALTER COLUMN "variant" SET DEFAULT 'contrast'::text;
  DROP TYPE "public"."enum_pages_blocks_hero_cta_buttons_variant";
  CREATE TYPE "public"."enum_pages_blocks_hero_cta_buttons_variant" AS ENUM('contrast', 'outlineLight');
  ALTER TABLE "pages_blocks_hero_cta_buttons" ALTER COLUMN "variant" SET DEFAULT 'contrast'::"public"."enum_pages_blocks_hero_cta_buttons_variant";
  ALTER TABLE "pages_blocks_hero_cta_buttons" ALTER COLUMN "variant" SET DATA TYPE "public"."enum_pages_blocks_hero_cta_buttons_variant" USING "variant"::"public"."enum_pages_blocks_hero_cta_buttons_variant";
  ALTER TABLE "_pages_v_blocks_hero_cta_buttons" ALTER COLUMN "variant" SET DATA TYPE text;
  ALTER TABLE "_pages_v_blocks_hero_cta_buttons" ALTER COLUMN "variant" SET DEFAULT 'contrast'::text;
  DROP TYPE "public"."enum__pages_v_blocks_hero_cta_buttons_variant";
  CREATE TYPE "public"."enum__pages_v_blocks_hero_cta_buttons_variant" AS ENUM('contrast', 'outlineLight');
  ALTER TABLE "_pages_v_blocks_hero_cta_buttons" ALTER COLUMN "variant" SET DEFAULT 'contrast'::"public"."enum__pages_v_blocks_hero_cta_buttons_variant";
  ALTER TABLE "_pages_v_blocks_hero_cta_buttons" ALTER COLUMN "variant" SET DATA TYPE "public"."enum__pages_v_blocks_hero_cta_buttons_variant" USING "variant"::"public"."enum__pages_v_blocks_hero_cta_buttons_variant";
  ALTER TABLE "footer_footer_columns_links" ALTER COLUMN "type" SET DATA TYPE text;
  ALTER TABLE "footer_footer_columns_links" ALTER COLUMN "type" SET DEFAULT 'page'::text;
  DROP TYPE "public"."enum_footer_footer_columns_links_type";
  CREATE TYPE "public"."enum_footer_footer_columns_links_type" AS ENUM('page', 'url', 'blog', 'categories');
  ALTER TABLE "footer_footer_columns_links" ALTER COLUMN "type" SET DEFAULT 'page'::"public"."enum_footer_footer_columns_links_type";
  ALTER TABLE "footer_footer_columns_links" ALTER COLUMN "type" SET DATA TYPE "public"."enum_footer_footer_columns_links_type" USING "type"::"public"."enum_footer_footer_columns_links_type";
  DROP INDEX "footer_logo_idx";
  DROP INDEX "seo_favicon_idx";
  ALTER TABLE "pages_blocks_services_services" ALTER COLUMN "button_text" SET DEFAULT 'Odkrij';
  ALTER TABLE "pages_blocks_services_services" ALTER COLUMN "button_type" SET DEFAULT 'anchor';
  ALTER TABLE "pages_blocks_services_services" ALTER COLUMN "button_anchor" SET DEFAULT '#kontakt';
  ALTER TABLE "pages_blocks_services" ALTER COLUMN "badge" SET DEFAULT 'Področja dela';
  ALTER TABLE "pages_blocks_services" ALTER COLUMN "title" SET DEFAULT 'Rešitve, ki jih izvajamo';
  ALTER TABLE "pages_blocks_services" ALTER COLUMN "subtitle" SET DEFAULT 'Od zasnove do zagona in servisa – modulno ter prilagojeno vašim procesom.';
  ALTER TABLE "pages_blocks_about" ALTER COLUMN "title" SET DEFAULT 'Družinska tradicija industrijske avtomatizacije';
  ALTER TABLE "pages_blocks_about" ALTER COLUMN "description" DROP DEFAULT;
  ALTER TABLE "pages_blocks_about" ALTER COLUMN "callout_text" SET DEFAULT 'Naše ekipe načrtujejo, programirajo in zaganjajo sisteme krmiljenja, pogone ter HMI/SCADA v tesnem sodelovanju z vašimi tehnologijami.';
  ALTER TABLE "pages_blocks_about" ALTER COLUMN "button_text" SET DEFAULT 'O nas';
  ALTER TABLE "pages_blocks_about" ALTER COLUMN "button_type" SET DEFAULT 'anchor';
  ALTER TABLE "pages_blocks_about" ALTER COLUMN "button_anchor" SET DEFAULT '#onas';
  ALTER TABLE "pages_blocks_why_trust" ALTER COLUMN "title" SET DEFAULT 'Zakaj nam stranke zaupajo?';
  ALTER TABLE "pages_blocks_why_trust" ALTER COLUMN "button_text" SET DEFAULT 'Projekti';
  ALTER TABLE "pages_blocks_why_trust" ALTER COLUMN "button_type" SET DEFAULT 'anchor';
  ALTER TABLE "pages_blocks_why_trust" ALTER COLUMN "button_anchor" SET DEFAULT '#projekti';
  ALTER TABLE "pages_blocks_projects_projects" ALTER COLUMN "link" SET DEFAULT '#kontakt';
  ALTER TABLE "pages_blocks_projects" ALTER COLUMN "badge" SET DEFAULT 'Študije primerov';
  ALTER TABLE "pages_blocks_projects" ALTER COLUMN "title" SET DEFAULT 'Uspešne implementacije naših rešitev';
  ALTER TABLE "pages_blocks_projects" ALTER COLUMN "button_text" SET DEFAULT 'Kontakt';
  ALTER TABLE "pages_blocks_projects" ALTER COLUMN "button_type" SET DEFAULT 'anchor';
  ALTER TABLE "pages_blocks_projects" ALTER COLUMN "button_anchor" SET DEFAULT '#kontakt';
  ALTER TABLE "pages_blocks_contact" ALTER COLUMN "badge" SET DEFAULT 'Stopimo v stik';
  ALTER TABLE "pages_blocks_contact" ALTER COLUMN "title" SET DEFAULT 'Edini način za hitrejše doseganje vaših ciljev';
  ALTER TABLE "pages_blocks_contact" ALTER COLUMN "subtitle" SET DEFAULT 'Izpolnite obrazec – odgovorimo v enem delovnem dnevu.';
  ALTER TABLE "pages_blocks_contact" ALTER COLUMN "phone" SET DEFAULT '+386 (3) 426 36 46';
  ALTER TABLE "pages_blocks_contact" ALTER COLUMN "email" SET DEFAULT 'info@sinteh.pro';
  ALTER TABLE "_pages_v_blocks_services_services" ALTER COLUMN "button_text" SET DEFAULT 'Odkrij';
  ALTER TABLE "_pages_v_blocks_services_services" ALTER COLUMN "button_type" SET DEFAULT 'anchor';
  ALTER TABLE "_pages_v_blocks_services_services" ALTER COLUMN "button_anchor" SET DEFAULT '#kontakt';
  ALTER TABLE "_pages_v_blocks_services" ALTER COLUMN "badge" SET DEFAULT 'Področja dela';
  ALTER TABLE "_pages_v_blocks_services" ALTER COLUMN "title" SET DEFAULT 'Rešitve, ki jih izvajamo';
  ALTER TABLE "_pages_v_blocks_services" ALTER COLUMN "subtitle" SET DEFAULT 'Od zasnove do zagona in servisa – modulno ter prilagojeno vašim procesom.';
  ALTER TABLE "_pages_v_blocks_about" ALTER COLUMN "title" SET DEFAULT 'Družinska tradicija industrijske avtomatizacije';
  ALTER TABLE "_pages_v_blocks_about" ALTER COLUMN "description" DROP DEFAULT;
  ALTER TABLE "_pages_v_blocks_about" ALTER COLUMN "callout_text" SET DEFAULT 'Naše ekipe načrtujejo, programirajo in zaganjajo sisteme krmiljenja, pogone ter HMI/SCADA v tesnem sodelovanju z vašimi tehnologijami.';
  ALTER TABLE "_pages_v_blocks_about" ALTER COLUMN "button_text" SET DEFAULT 'O nas';
  ALTER TABLE "_pages_v_blocks_about" ALTER COLUMN "button_type" SET DEFAULT 'anchor';
  ALTER TABLE "_pages_v_blocks_about" ALTER COLUMN "button_anchor" SET DEFAULT '#onas';
  ALTER TABLE "_pages_v_blocks_why_trust" ALTER COLUMN "title" SET DEFAULT 'Zakaj nam stranke zaupajo?';
  ALTER TABLE "_pages_v_blocks_why_trust" ALTER COLUMN "button_text" SET DEFAULT 'Projekti';
  ALTER TABLE "_pages_v_blocks_why_trust" ALTER COLUMN "button_type" SET DEFAULT 'anchor';
  ALTER TABLE "_pages_v_blocks_why_trust" ALTER COLUMN "button_anchor" SET DEFAULT '#projekti';
  ALTER TABLE "_pages_v_blocks_projects_projects" ALTER COLUMN "link" SET DEFAULT '#kontakt';
  ALTER TABLE "_pages_v_blocks_projects" ALTER COLUMN "badge" SET DEFAULT 'Študije primerov';
  ALTER TABLE "_pages_v_blocks_projects" ALTER COLUMN "title" SET DEFAULT 'Uspešne implementacije naših rešitev';
  ALTER TABLE "_pages_v_blocks_projects" ALTER COLUMN "button_text" SET DEFAULT 'Kontakt';
  ALTER TABLE "_pages_v_blocks_projects" ALTER COLUMN "button_type" SET DEFAULT 'anchor';
  ALTER TABLE "_pages_v_blocks_projects" ALTER COLUMN "button_anchor" SET DEFAULT '#kontakt';
  ALTER TABLE "_pages_v_blocks_contact" ALTER COLUMN "badge" SET DEFAULT 'Stopimo v stik';
  ALTER TABLE "_pages_v_blocks_contact" ALTER COLUMN "title" SET DEFAULT 'Edini način za hitrejše doseganje vaših ciljev';
  ALTER TABLE "_pages_v_blocks_contact" ALTER COLUMN "subtitle" SET DEFAULT 'Izpolnite obrazec – odgovorimo v enem delovnem dnevu.';
  ALTER TABLE "_pages_v_blocks_contact" ALTER COLUMN "phone" SET DEFAULT '+386 (3) 426 36 46';
  ALTER TABLE "_pages_v_blocks_contact" ALTER COLUMN "email" SET DEFAULT 'info@sinteh.pro';
  ALTER TABLE "footer" ALTER COLUMN "copyright" SET DEFAULT '© 2025 My Website. All rights reserved.';
  ALTER TABLE "pages" ADD COLUMN "content" jsonb;
  ALTER TABLE "_pages_v" ADD COLUMN "version_content" jsonb;
  ALTER TABLE "footer" ADD COLUMN "description" varchar;
  ALTER TABLE "footer" ADD COLUMN "contact_info_email" varchar;
  ALTER TABLE "footer" ADD COLUMN "contact_info_phone" varchar;
  ALTER TABLE "footer" ADD COLUMN "contact_info_address" varchar;
  ALTER TABLE "footer" ADD COLUMN "newsletter_enabled" boolean DEFAULT false;
  ALTER TABLE "footer" ADD COLUMN "newsletter_title" varchar DEFAULT 'Subscribe to our newsletter';
  ALTER TABLE "footer" ADD COLUMN "newsletter_description" varchar DEFAULT 'Get the latest updates and news delivered to your inbox.';
  ALTER TABLE "header" DROP COLUMN "mobile_navigation_enabled";
  ALTER TABLE "header" DROP COLUMN "mobile_navigation_menu_button_label";
  ALTER TABLE "header" DROP COLUMN "mobile_navigation_close_button_label";
  ALTER TABLE "header" DROP COLUMN "mobile_navigation_show_language_selector";
  ALTER TABLE "header" DROP COLUMN "mobile_navigation_show_contact_button";
  ALTER TABLE "footer_footer_columns_links" DROP COLUMN "anchor";
  ALTER TABLE "footer" DROP COLUMN "logo_id";
  ALTER TABLE "footer" DROP COLUMN "company_info_phone";
  ALTER TABLE "footer" DROP COLUMN "company_info_email";
  ALTER TABLE "seo" DROP COLUMN "favicon_id";
  DROP TYPE "public"."enum_pages_blocks_product_hero_cta_buttons_type";
  DROP TYPE "public"."enum_pages_blocks_product_hero_cta_buttons_variant";
  DROP TYPE "public"."enum_pages_blocks_key_features_features_icon";
  DROP TYPE "public"."enum_pages_blocks_applications_applications_icon";
  DROP TYPE "public"."enum_pages_blocks_benefits_comparison_summary_cards_icon";
  DROP TYPE "public"."enum_pages_blocks_contact_hero_quick_contact_methods_type";
  DROP TYPE "public"."enum_pages_blocks_universal_hero_variant";
  DROP TYPE "public"."enum_pages_blocks_universal_hero_benefits_layout";
  DROP TYPE "public"."enum_pages_blocks_universal_hero_primary_c_t_a_variant";
  DROP TYPE "public"."enum_pages_blocks_universal_hero_secondary_c_t_a_variant";
  DROP TYPE "public"."enum_pages_blocks_universal_hero_background_style";
  DROP TYPE "public"."enum_pages_blocks_universal_hero_content_alignment";
  DROP TYPE "public"."enum_pages_blocks_universal_c_t_a_variant";
  DROP TYPE "public"."enum_pages_blocks_universal_c_t_a_primary_c_t_a_variant";
  DROP TYPE "public"."enum_pages_blocks_universal_c_t_a_secondary_c_t_a_variant";
  DROP TYPE "public"."enum_pages_blocks_universal_c_t_a_background_style";
  DROP TYPE "public"."enum_pages_blocks_feature_grid_variant";
  DROP TYPE "public"."enum_pages_blocks_feature_grid_columns";
  DROP TYPE "public"."enum_pages_blocks_feature_grid_card_style";
  DROP TYPE "public"."enum_pages_blocks_feature_grid_background_style";
  DROP TYPE "public"."enum_pages_blocks_content_grid_variant";
  DROP TYPE "public"."enum_pages_blocks_content_grid_columns";
  DROP TYPE "public"."enum_pages_blocks_content_grid_background_style";
  DROP TYPE "public"."enum_pages_blocks_stats_section_variant";
  DROP TYPE "public"."enum_pages_blocks_stats_section_columns";
  DROP TYPE "public"."enum_pages_blocks_stats_section_background_style";
  DROP TYPE "public"."enum_pages_blocks_process_steps_variant";
  DROP TYPE "public"."enum_pages_blocks_process_steps_background_style";
  DROP TYPE "public"."enum_pages_blocks_content_cards_variant";
  DROP TYPE "public"."enum_pages_blocks_content_cards_columns";
  DROP TYPE "public"."enum_pages_blocks_content_cards_background_style";
  DROP TYPE "public"."enum_pages_blocks_contact_section_variant";
  DROP TYPE "public"."enum_pages_blocks_contact_section_background_style";
  DROP TYPE "public"."enum_pages_blocks_comparison_table_background_style";
  DROP TYPE "public"."enum_pages_blocks_simple_page_variant";
  DROP TYPE "public"."enum_pages_blocks_brand_showcase_variant";
  DROP TYPE "public"."enum_pages_blocks_brand_showcase_background_style";
  DROP TYPE "public"."enum_pages_blocks_technical_content_variant";
  DROP TYPE "public"."enum_pages_blocks_technical_content_background_style";
  DROP TYPE "public"."enum_pages_blocks_resource_gallery_variant";
  DROP TYPE "public"."enum_pages_blocks_resource_gallery_background_style";
  DROP TYPE "public"."enum__pages_v_blocks_product_hero_cta_buttons_type";
  DROP TYPE "public"."enum__pages_v_blocks_product_hero_cta_buttons_variant";
  DROP TYPE "public"."enum__pages_v_blocks_key_features_features_icon";
  DROP TYPE "public"."enum__pages_v_blocks_applications_applications_icon";
  DROP TYPE "public"."enum__pages_v_blocks_benefits_comparison_summary_cards_icon";
  DROP TYPE "public"."enum__pages_v_blocks_contact_hero_quick_contact_methods_type";
  DROP TYPE "public"."enum__pages_v_blocks_universal_hero_variant";
  DROP TYPE "public"."enum__pages_v_blocks_universal_hero_benefits_layout";
  DROP TYPE "public"."enum__pages_v_blocks_universal_hero_primary_c_t_a_variant";
  DROP TYPE "public"."enum__pages_v_blocks_universal_hero_secondary_c_t_a_variant";
  DROP TYPE "public"."enum__pages_v_blocks_universal_hero_background_style";
  DROP TYPE "public"."enum__pages_v_blocks_universal_hero_content_alignment";
  DROP TYPE "public"."enum__pages_v_blocks_universal_c_t_a_variant";
  DROP TYPE "public"."enum__pages_v_blocks_universal_c_t_a_primary_c_t_a_variant";
  DROP TYPE "public"."enum__pages_v_blocks_universal_c_t_a_secondary_c_t_a_variant";
  DROP TYPE "public"."enum__pages_v_blocks_universal_c_t_a_background_style";
  DROP TYPE "public"."enum__pages_v_blocks_feature_grid_variant";
  DROP TYPE "public"."enum__pages_v_blocks_feature_grid_columns";
  DROP TYPE "public"."enum__pages_v_blocks_feature_grid_card_style";
  DROP TYPE "public"."enum__pages_v_blocks_feature_grid_background_style";
  DROP TYPE "public"."enum__pages_v_blocks_content_grid_variant";
  DROP TYPE "public"."enum__pages_v_blocks_content_grid_columns";
  DROP TYPE "public"."enum__pages_v_blocks_content_grid_background_style";
  DROP TYPE "public"."enum__pages_v_blocks_stats_section_variant";
  DROP TYPE "public"."enum__pages_v_blocks_stats_section_columns";
  DROP TYPE "public"."enum__pages_v_blocks_stats_section_background_style";
  DROP TYPE "public"."enum__pages_v_blocks_process_steps_variant";
  DROP TYPE "public"."enum__pages_v_blocks_process_steps_background_style";
  DROP TYPE "public"."enum__pages_v_blocks_content_cards_variant";
  DROP TYPE "public"."enum__pages_v_blocks_content_cards_columns";
  DROP TYPE "public"."enum__pages_v_blocks_content_cards_background_style";
  DROP TYPE "public"."enum__pages_v_blocks_contact_section_variant";
  DROP TYPE "public"."enum__pages_v_blocks_contact_section_background_style";
  DROP TYPE "public"."enum__pages_v_blocks_comparison_table_background_style";
  DROP TYPE "public"."enum__pages_v_blocks_simple_page_variant";
  DROP TYPE "public"."enum__pages_v_blocks_brand_showcase_variant";
  DROP TYPE "public"."enum__pages_v_blocks_brand_showcase_background_style";
  DROP TYPE "public"."enum__pages_v_blocks_technical_content_variant";
  DROP TYPE "public"."enum__pages_v_blocks_technical_content_background_style";
  DROP TYPE "public"."enum__pages_v_blocks_resource_gallery_variant";
  DROP TYPE "public"."enum__pages_v_blocks_resource_gallery_background_style";
  DROP TYPE "public"."enum_footer_bottom_links_type";`)
}
