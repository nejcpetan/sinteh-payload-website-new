import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-vercel-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."_locales" AS ENUM('sl', 'en', 'de', 'hr');
  CREATE TYPE "public"."enum_pages_blocks_hero_cta_buttons_type" AS ENUM('page', 'post', 'url', 'anchor');
  CREATE TYPE "public"."enum_pages_blocks_hero_cta_buttons_variant" AS ENUM('default', 'secondary', 'outline', 'ghost');
  CREATE TYPE "public"."enum_pages_blocks_services_services_button_type" AS ENUM('page', 'url', 'anchor');
  CREATE TYPE "public"."enum_pages_blocks_about_button_type" AS ENUM('page', 'post', 'url', 'anchor');
  CREATE TYPE "public"."enum_pages_blocks_why_trust_pillars_icon" AS ENUM('shield', 'cog', 'headset');
  CREATE TYPE "public"."enum_pages_blocks_why_trust_button_type" AS ENUM('page', 'post', 'url', 'anchor');
  CREATE TYPE "public"."enum_pages_blocks_projects_button_type" AS ENUM('page', 'post', 'url', 'anchor');
  CREATE TYPE "public"."enum_pages_blocks_product_hero_cta_buttons_type" AS ENUM('page', 'post', 'url', 'anchor');
  CREATE TYPE "public"."enum_pages_blocks_product_hero_cta_buttons_variant" AS ENUM('default', 'secondary', 'outline', 'ghost');
  CREATE TYPE "public"."enum_pages_blocks_key_features_features_icon" AS ENUM('mechanical', 'shield', 'retrofit', 'modular', 'temperature', 'key');
  CREATE TYPE "public"."enum_pages_blocks_applications_applications_icon" AS ENUM('oilgas', 'energy', 'pharm', 'manufacturing', 'atex', 'water');
  CREATE TYPE "public"."enum_pages_blocks_benefits_comparison_summary_cards_icon" AS ENUM('shield', 'clock', 'users');
  CREATE TYPE "public"."enum_pages_blocks_contact_hero_quick_contact_methods_type" AS ENUM('phone', 'email', 'location');
  CREATE TYPE "public"."enum_pages_blocks_universal_hero_contact_methods_link_type" AS ENUM('page', 'post', 'url', 'anchor');
  CREATE TYPE "public"."enum_pages_blocks_universal_hero_variant" AS ENUM('standard', 'blog', 'contact', 'minimal');
  CREATE TYPE "public"."enum_pages_blocks_universal_hero_benefits_layout" AS ENUM('grid', 'list');
  CREATE TYPE "public"."enum_pages_blocks_universal_hero_primary_c_t_a_type" AS ENUM('page', 'post', 'url', 'anchor');
  CREATE TYPE "public"."enum_pages_blocks_universal_hero_primary_c_t_a_variant" AS ENUM('default', 'outline', 'secondary', 'ghost');
  CREATE TYPE "public"."enum_pages_blocks_universal_hero_secondary_c_t_a_type" AS ENUM('page', 'post', 'url', 'anchor');
  CREATE TYPE "public"."enum_pages_blocks_universal_hero_secondary_c_t_a_variant" AS ENUM('default', 'outline', 'secondary', 'ghost');
  CREATE TYPE "public"."enum_pages_blocks_universal_hero_background_style" AS ENUM('surface', 'background', 'white', 'gradient');
  CREATE TYPE "public"."enum_pages_blocks_universal_hero_content_alignment" AS ENUM('left', 'center');
  CREATE TYPE "public"."enum_pages_blocks_universal_c_t_a_variant" AS ENUM('standard', 'with-contact-form', 'minimal', 'full-width');
  CREATE TYPE "public"."enum_pages_blocks_universal_c_t_a_primary_c_t_a_type" AS ENUM('page', 'post', 'url', 'anchor');
  CREATE TYPE "public"."enum_pages_blocks_universal_c_t_a_primary_c_t_a_variant" AS ENUM('default', 'outline', 'secondary', 'ghost');
  CREATE TYPE "public"."enum_pages_blocks_universal_c_t_a_secondary_c_t_a_type" AS ENUM('page', 'post', 'url', 'anchor');
  CREATE TYPE "public"."enum_pages_blocks_universal_c_t_a_secondary_c_t_a_variant" AS ENUM('default', 'outline', 'secondary', 'ghost');
  CREATE TYPE "public"."enum_pages_blocks_universal_c_t_a_background_style" AS ENUM('surface', 'background', 'white', 'gradient');
  CREATE TYPE "public"."enum_pages_blocks_feature_grid_features_link_type" AS ENUM('page', 'post', 'url', 'anchor');
  CREATE TYPE "public"."enum_pages_blocks_feature_grid_variant" AS ENUM('features', 'services', 'benefits', 'solutions');
  CREATE TYPE "public"."enum_pages_blocks_feature_grid_columns" AS ENUM('2', '3', '4');
  CREATE TYPE "public"."enum_pages_blocks_feature_grid_card_style" AS ENUM('default', 'minimal', 'bordered');
  CREATE TYPE "public"."enum_pages_blocks_feature_grid_background_style" AS ENUM('background', 'surface', 'white');
  CREATE TYPE "public"."enum_pages_blocks_content_grid_items_link_type" AS ENUM('page', 'post', 'url', 'anchor');
  CREATE TYPE "public"."enum_pages_blocks_content_grid_variant" AS ENUM('categories', 'topics', 'services', 'industries');
  CREATE TYPE "public"."enum_pages_blocks_content_grid_columns" AS ENUM('2', '3', '4');
  CREATE TYPE "public"."enum_pages_blocks_content_grid_background_style" AS ENUM('background', 'surface', 'white');
  CREATE TYPE "public"."enum_pages_blocks_stats_section_variant" AS ENUM('standard', 'highlighted', 'minimal', 'cards');
  CREATE TYPE "public"."enum_pages_blocks_stats_section_columns" AS ENUM('2', '3', '4', '5');
  CREATE TYPE "public"."enum_pages_blocks_stats_section_background_style" AS ENUM('background', 'surface', 'white');
  CREATE TYPE "public"."enum_pages_blocks_process_steps_variant" AS ENUM('numbered', 'timeline', 'cards', 'minimal');
  CREATE TYPE "public"."enum_pages_blocks_process_steps_background_style" AS ENUM('background', 'surface', 'white');
  CREATE TYPE "public"."enum_pages_blocks_content_cards_cards_link_type" AS ENUM('page', 'post', 'url', 'anchor');
  CREATE TYPE "public"."enum_pages_blocks_content_cards_variant" AS ENUM('blog-posts', 'service-brands', 'projects', 'general', 'featured-content');
  CREATE TYPE "public"."enum_pages_blocks_content_cards_columns" AS ENUM('2', '3', '4');
  CREATE TYPE "public"."enum_pages_blocks_content_cards_background_style" AS ENUM('background', 'surface', 'white');
  CREATE TYPE "public"."enum_pages_blocks_contact_section_variant" AS ENUM('form-only', 'info-only', 'split', 'hero-style', 'compact');
  CREATE TYPE "public"."enum_pages_blocks_contact_section_background_style" AS ENUM('surface', 'background', 'white', 'gradient');
  CREATE TYPE "public"."enum_pages_blocks_comparison_table_items_primary" AS ENUM('yes', 'no', 'partial');
  CREATE TYPE "public"."enum_pages_blocks_comparison_table_items_secondary" AS ENUM('yes', 'no', 'partial');
  CREATE TYPE "public"."enum_pages_blocks_comparison_table_background_style" AS ENUM('background', 'surface', 'white');
  CREATE TYPE "public"."enum_pages_blocks_simple_page_breadcrumbs_link_type" AS ENUM('page', 'post', 'url', 'anchor');
  CREATE TYPE "public"."enum_pages_blocks_simple_page_links_link_type" AS ENUM('page', 'post', 'url', 'anchor');
  CREATE TYPE "public"."enum_pages_blocks_simple_page_variant" AS ENUM('standard', 'centered', 'documentation', 'legal', 'minimal');
  CREATE TYPE "public"."enum_pages_blocks_brand_showcase_variant" AS ENUM('grid', 'carousel', 'list', 'featured');
  CREATE TYPE "public"."enum_pages_blocks_brand_showcase_background_style" AS ENUM('background', 'surface', 'white');
  CREATE TYPE "public"."enum_pages_blocks_technical_content_variant" AS ENUM('overview', 'specifications', 'process', 'documentation');
  CREATE TYPE "public"."enum_pages_blocks_technical_content_background_style" AS ENUM('background', 'surface', 'white');
  CREATE TYPE "public"."enum_pages_blocks_resource_gallery_variant" AS ENUM('grid', 'list', 'categories', 'featured');
  CREATE TYPE "public"."enum_pages_blocks_resource_gallery_background_style" AS ENUM('background', 'surface', 'white');
  CREATE TYPE "public"."enum_pages_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__pages_v_blocks_hero_cta_buttons_type" AS ENUM('page', 'post', 'url', 'anchor');
  CREATE TYPE "public"."enum__pages_v_blocks_hero_cta_buttons_variant" AS ENUM('default', 'secondary', 'outline', 'ghost');
  CREATE TYPE "public"."enum__pages_v_blocks_services_services_button_type" AS ENUM('page', 'url', 'anchor');
  CREATE TYPE "public"."enum__pages_v_blocks_about_button_type" AS ENUM('page', 'post', 'url', 'anchor');
  CREATE TYPE "public"."enum__pages_v_blocks_why_trust_pillars_icon" AS ENUM('shield', 'cog', 'headset');
  CREATE TYPE "public"."enum__pages_v_blocks_why_trust_button_type" AS ENUM('page', 'post', 'url', 'anchor');
  CREATE TYPE "public"."enum__pages_v_blocks_projects_button_type" AS ENUM('page', 'post', 'url', 'anchor');
  CREATE TYPE "public"."enum__pages_v_blocks_product_hero_cta_buttons_type" AS ENUM('page', 'post', 'url', 'anchor');
  CREATE TYPE "public"."enum__pages_v_blocks_product_hero_cta_buttons_variant" AS ENUM('default', 'secondary', 'outline', 'ghost');
  CREATE TYPE "public"."enum__pages_v_blocks_key_features_features_icon" AS ENUM('mechanical', 'shield', 'retrofit', 'modular', 'temperature', 'key');
  CREATE TYPE "public"."enum__pages_v_blocks_applications_applications_icon" AS ENUM('oilgas', 'energy', 'pharm', 'manufacturing', 'atex', 'water');
  CREATE TYPE "public"."enum__pages_v_blocks_benefits_comparison_summary_cards_icon" AS ENUM('shield', 'clock', 'users');
  CREATE TYPE "public"."enum__pages_v_blocks_contact_hero_quick_contact_methods_type" AS ENUM('phone', 'email', 'location');
  CREATE TYPE "public"."enum__pages_v_blocks_universal_hero_contact_methods_link_type" AS ENUM('page', 'post', 'url', 'anchor');
  CREATE TYPE "public"."enum__pages_v_blocks_universal_hero_variant" AS ENUM('standard', 'blog', 'contact', 'minimal');
  CREATE TYPE "public"."enum__pages_v_blocks_universal_hero_benefits_layout" AS ENUM('grid', 'list');
  CREATE TYPE "public"."enum__pages_v_blocks_universal_hero_primary_c_t_a_type" AS ENUM('page', 'post', 'url', 'anchor');
  CREATE TYPE "public"."enum__pages_v_blocks_universal_hero_primary_c_t_a_variant" AS ENUM('default', 'outline', 'secondary', 'ghost');
  CREATE TYPE "public"."enum__pages_v_blocks_universal_hero_secondary_c_t_a_type" AS ENUM('page', 'post', 'url', 'anchor');
  CREATE TYPE "public"."enum__pages_v_blocks_universal_hero_secondary_c_t_a_variant" AS ENUM('default', 'outline', 'secondary', 'ghost');
  CREATE TYPE "public"."enum__pages_v_blocks_universal_hero_background_style" AS ENUM('surface', 'background', 'white', 'gradient');
  CREATE TYPE "public"."enum__pages_v_blocks_universal_hero_content_alignment" AS ENUM('left', 'center');
  CREATE TYPE "public"."enum__pages_v_blocks_universal_c_t_a_variant" AS ENUM('standard', 'with-contact-form', 'minimal', 'full-width');
  CREATE TYPE "public"."enum__pages_v_blocks_universal_c_t_a_primary_c_t_a_type" AS ENUM('page', 'post', 'url', 'anchor');
  CREATE TYPE "public"."enum__pages_v_blocks_universal_c_t_a_primary_c_t_a_variant" AS ENUM('default', 'outline', 'secondary', 'ghost');
  CREATE TYPE "public"."enum__pages_v_blocks_universal_c_t_a_secondary_c_t_a_type" AS ENUM('page', 'post', 'url', 'anchor');
  CREATE TYPE "public"."enum__pages_v_blocks_universal_c_t_a_secondary_c_t_a_variant" AS ENUM('default', 'outline', 'secondary', 'ghost');
  CREATE TYPE "public"."enum__pages_v_blocks_universal_c_t_a_background_style" AS ENUM('surface', 'background', 'white', 'gradient');
  CREATE TYPE "public"."enum__pages_v_blocks_feature_grid_features_link_type" AS ENUM('page', 'post', 'url', 'anchor');
  CREATE TYPE "public"."enum__pages_v_blocks_feature_grid_variant" AS ENUM('features', 'services', 'benefits', 'solutions');
  CREATE TYPE "public"."enum__pages_v_blocks_feature_grid_columns" AS ENUM('2', '3', '4');
  CREATE TYPE "public"."enum__pages_v_blocks_feature_grid_card_style" AS ENUM('default', 'minimal', 'bordered');
  CREATE TYPE "public"."enum__pages_v_blocks_feature_grid_background_style" AS ENUM('background', 'surface', 'white');
  CREATE TYPE "public"."enum__pages_v_blocks_content_grid_items_link_type" AS ENUM('page', 'post', 'url', 'anchor');
  CREATE TYPE "public"."enum__pages_v_blocks_content_grid_variant" AS ENUM('categories', 'topics', 'services', 'industries');
  CREATE TYPE "public"."enum__pages_v_blocks_content_grid_columns" AS ENUM('2', '3', '4');
  CREATE TYPE "public"."enum__pages_v_blocks_content_grid_background_style" AS ENUM('background', 'surface', 'white');
  CREATE TYPE "public"."enum__pages_v_blocks_stats_section_variant" AS ENUM('standard', 'highlighted', 'minimal', 'cards');
  CREATE TYPE "public"."enum__pages_v_blocks_stats_section_columns" AS ENUM('2', '3', '4', '5');
  CREATE TYPE "public"."enum__pages_v_blocks_stats_section_background_style" AS ENUM('background', 'surface', 'white');
  CREATE TYPE "public"."enum__pages_v_blocks_process_steps_variant" AS ENUM('numbered', 'timeline', 'cards', 'minimal');
  CREATE TYPE "public"."enum__pages_v_blocks_process_steps_background_style" AS ENUM('background', 'surface', 'white');
  CREATE TYPE "public"."enum__pages_v_blocks_content_cards_cards_link_type" AS ENUM('page', 'post', 'url', 'anchor');
  CREATE TYPE "public"."enum__pages_v_blocks_content_cards_variant" AS ENUM('blog-posts', 'service-brands', 'projects', 'general', 'featured-content');
  CREATE TYPE "public"."enum__pages_v_blocks_content_cards_columns" AS ENUM('2', '3', '4');
  CREATE TYPE "public"."enum__pages_v_blocks_content_cards_background_style" AS ENUM('background', 'surface', 'white');
  CREATE TYPE "public"."enum__pages_v_blocks_contact_section_variant" AS ENUM('form-only', 'info-only', 'split', 'hero-style', 'compact');
  CREATE TYPE "public"."enum__pages_v_blocks_contact_section_background_style" AS ENUM('surface', 'background', 'white', 'gradient');
  CREATE TYPE "public"."enum__pages_v_blocks_comparison_table_items_primary" AS ENUM('yes', 'no', 'partial');
  CREATE TYPE "public"."enum__pages_v_blocks_comparison_table_items_secondary" AS ENUM('yes', 'no', 'partial');
  CREATE TYPE "public"."enum__pages_v_blocks_comparison_table_background_style" AS ENUM('background', 'surface', 'white');
  CREATE TYPE "public"."enum__pages_v_blocks_simple_page_breadcrumbs_link_type" AS ENUM('page', 'post', 'url', 'anchor');
  CREATE TYPE "public"."enum__pages_v_blocks_simple_page_links_link_type" AS ENUM('page', 'post', 'url', 'anchor');
  CREATE TYPE "public"."enum__pages_v_blocks_simple_page_variant" AS ENUM('standard', 'centered', 'documentation', 'legal', 'minimal');
  CREATE TYPE "public"."enum__pages_v_blocks_brand_showcase_variant" AS ENUM('grid', 'carousel', 'list', 'featured');
  CREATE TYPE "public"."enum__pages_v_blocks_brand_showcase_background_style" AS ENUM('background', 'surface', 'white');
  CREATE TYPE "public"."enum__pages_v_blocks_technical_content_variant" AS ENUM('overview', 'specifications', 'process', 'documentation');
  CREATE TYPE "public"."enum__pages_v_blocks_technical_content_background_style" AS ENUM('background', 'surface', 'white');
  CREATE TYPE "public"."enum__pages_v_blocks_resource_gallery_variant" AS ENUM('grid', 'list', 'categories', 'featured');
  CREATE TYPE "public"."enum__pages_v_blocks_resource_gallery_background_style" AS ENUM('background', 'surface', 'white');
  CREATE TYPE "public"."enum__pages_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__pages_v_published_locale" AS ENUM('sl', 'en', 'de', 'hr');
  CREATE TYPE "public"."enum_posts_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__posts_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__posts_v_published_locale" AS ENUM('sl', 'en', 'de', 'hr');
  CREATE TYPE "public"."enum_contact_submissions_emails_sent_type" AS ENUM('auto-reply', 'admin-notification', 'follow-up', 'response');
  CREATE TYPE "public"."enum_contact_submissions_status" AS ENUM('new', 'in-progress', 'responded', 'closed', 'spam');
  CREATE TYPE "public"."enum_contact_submissions_priority" AS ENUM('low', 'medium', 'high', 'urgent');
  CREATE TYPE "public"."enum_contact_submissions_source" AS ENUM('contact-form', 'product-cta', 'simple-contact', 'universal-contact');
  CREATE TYPE "public"."enum_header_navigation_dropdown_items_type" AS ENUM('page', 'url', 'blog', 'post', 'category', 'divider');
  CREATE TYPE "public"."enum_header_navigation_nav_type" AS ENUM('link', 'dropdown');
  CREATE TYPE "public"."enum_header_navigation_type" AS ENUM('page', 'url', 'blog', 'post', 'category');
  CREATE TYPE "public"."enum_header_navigation_dropdown_style" AS ENUM('simple', 'cards', 'columns');
  CREATE TYPE "public"."enum_header_categories_nav_display_type" AS ENUM('all', 'selected');
  CREATE TYPE "public"."enum_footer_footer_columns_links_type" AS ENUM('page', 'url', 'anchor');
  CREATE TYPE "public"."enum_footer_bottom_links_type" AS ENUM('page', 'url', 'anchor');
  CREATE TYPE "public"."enum_homepage_blocks_hero_cta_buttons_type" AS ENUM('page', 'url', 'anchor');
  CREATE TYPE "public"."enum_homepage_blocks_hero_cta_buttons_variant" AS ENUM('default', 'secondary', 'outline', 'ghost');
  CREATE TYPE "public"."enum_homepage_blocks_services_services_button_type" AS ENUM('page', 'url', 'anchor');
  CREATE TYPE "public"."enum_homepage_blocks_about_button_type" AS ENUM('page', 'url', 'anchor');
  CREATE TYPE "public"."enum_homepage_blocks_why_trust_pillars_icon" AS ENUM('shield', 'cog', 'headset');
  CREATE TYPE "public"."enum_homepage_blocks_why_trust_button_type" AS ENUM('page', 'url', 'anchor');
  CREATE TYPE "public"."enum_homepage_blocks_projects_button_type" AS ENUM('page', 'url', 'anchor');
  CREATE TABLE "pages_blocks_hero_cta_buttons" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"type" "enum_pages_blocks_hero_cta_buttons_type" DEFAULT 'page',
  	"page_id" integer,
  	"post_id" integer,
  	"url" varchar,
  	"anchor" varchar,
  	"variant" "enum_pages_blocks_hero_cta_buttons_variant" DEFAULT 'default'
  );
  
  CREATE TABLE "pages_blocks_hero" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
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
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"logo_id" integer,
  	"alt" varchar
  );
  
  CREATE TABLE "pages_blocks_logo_belt" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_services_services_features" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"feature" varchar
  );
  
  CREATE TABLE "pages_blocks_services_services" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"description" varchar DEFAULT 'Sistematičen pristop, preverjene komponente, popolna dokumentacija.',
  	"image_id" integer,
  	"button_text" varchar DEFAULT 'Več o storitvi',
  	"button_type" "enum_pages_blocks_services_services_button_type" DEFAULT 'page',
  	"button_page_id" integer,
  	"button_url" varchar,
  	"button_anchor" varchar
  );
  
  CREATE TABLE "pages_blocks_services" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"badge" varchar DEFAULT 'STORITVE',
  	"title" varchar DEFAULT 'Specializirani za krmiljenje in avtomatizacijo',
  	"subtitle" varchar DEFAULT 'Od načrtovanja do zagona in servisa',
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_about_badges" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar
  );
  
  CREATE TABLE "pages_blocks_about_stats" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"number" varchar,
  	"label" varchar
  );
  
  CREATE TABLE "pages_blocks_about_process" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"step" varchar
  );
  
  CREATE TABLE "pages_blocks_about" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar DEFAULT 'O podjetju',
  	"description" varchar DEFAULT 'Specializirani smo za industrijske avtomatizacijske sisteme z več kot 10-letnimi izkušnjami.',
  	"image_id" integer,
  	"callout_text" varchar,
  	"button_text" varchar DEFAULT 'Več o nas',
  	"button_type" "enum_pages_blocks_about_button_type" DEFAULT 'page',
  	"button_page_id" integer,
  	"button_post_id" integer,
  	"button_url" varchar,
  	"button_anchor" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_why_trust_reasons" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"reason" varchar
  );
  
  CREATE TABLE "pages_blocks_why_trust_pillars" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"description" varchar,
  	"icon" "enum_pages_blocks_why_trust_pillars_icon"
  );
  
  CREATE TABLE "pages_blocks_why_trust" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar DEFAULT 'Zakaj nam zaupajo?',
  	"image_id" integer,
  	"button_text" varchar DEFAULT 'Zaupajte nam',
  	"button_type" "enum_pages_blocks_why_trust_button_type" DEFAULT 'page',
  	"button_page_id" integer,
  	"button_post_id" integer,
  	"button_url" varchar,
  	"button_anchor" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_projects_projects_stack" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"technology" varchar
  );
  
  CREATE TABLE "pages_blocks_projects_projects" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"category" varchar,
  	"image_id" integer,
  	"description" varchar,
  	"link" varchar
  );
  
  CREATE TABLE "pages_blocks_projects" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"badge" varchar DEFAULT 'PROJEKTI',
  	"title" varchar DEFAULT 'Naši projekti',
  	"subtitle" varchar DEFAULT 'Izsek projektov, ki so izboljšali produktivnost, varnost in sledljivost.',
  	"button_text" varchar DEFAULT 'Vsi projekti',
  	"button_type" "enum_pages_blocks_projects_button_type" DEFAULT 'page',
  	"button_page_id" integer,
  	"button_post_id" integer,
  	"button_url" varchar,
  	"button_anchor" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_contact" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"badge" varchar DEFAULT 'KONTAKT',
  	"title" varchar DEFAULT 'Stopite v stik z nami',
  	"subtitle" varchar DEFAULT 'Pripravili vam bomo ponudbo v 24 urah',
  	"phone" varchar DEFAULT '+386 1 234 5678',
  	"email" varchar DEFAULT 'info@sinteh.si',
  	"privacy_text" varchar DEFAULT 'Pošiljanjem soglašate z našo politiko zasebnosti. Vaših podatkov ne posredujemo tretjim.',
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_rich_text" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"content" jsonb,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_product_hero_key_benefits" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"description" varchar
  );
  
  CREATE TABLE "pages_blocks_product_hero_cta_buttons" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"type" "enum_pages_blocks_product_hero_cta_buttons_type" DEFAULT 'page',
  	"page_id" integer,
  	"post_id" integer,
  	"url" varchar,
  	"anchor" varchar,
  	"variant" "enum_pages_blocks_product_hero_cta_buttons_variant" DEFAULT 'default'
  );
  
  CREATE TABLE "pages_blocks_product_hero" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
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
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"icon" "enum_pages_blocks_key_features_features_icon",
  	"title" varchar,
  	"description" varchar
  );
  
  CREATE TABLE "pages_blocks_key_features" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
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
  	"_locale" "_locales" NOT NULL,
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
  	"_locale" "_locales" NOT NULL,
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
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"value" varchar
  );
  
  CREATE TABLE "pages_blocks_specifications_specifications" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"category" varchar
  );
  
  CREATE TABLE "pages_blocks_specifications_certification_badges" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"description" varchar
  );
  
  CREATE TABLE "pages_blocks_specifications_additional_info_details" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"value" varchar
  );
  
  CREATE TABLE "pages_blocks_specifications" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
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
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"detail" varchar
  );
  
  CREATE TABLE "pages_blocks_applications_applications" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"icon" "enum_pages_blocks_applications_applications_icon",
  	"title" varchar,
  	"description" varchar
  );
  
  CREATE TABLE "pages_blocks_applications_stats" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"number" varchar,
  	"label" varchar
  );
  
  CREATE TABLE "pages_blocks_applications_case_study_stats" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"value" varchar
  );
  
  CREATE TABLE "pages_blocks_applications" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
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
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"description" varchar
  );
  
  CREATE TABLE "pages_blocks_technical_overview_technical_benefits" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"description" varchar
  );
  
  CREATE TABLE "pages_blocks_technical_overview" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
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
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"advantage" varchar,
  	"description" varchar,
  	"m_gard" varchar,
  	"electronic" varchar
  );
  
  CREATE TABLE "pages_blocks_benefits_comparison_summary_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"icon" "enum_pages_blocks_benefits_comparison_summary_cards_icon",
  	"title" varchar,
  	"description" varchar
  );
  
  CREATE TABLE "pages_blocks_benefits_comparison" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
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
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"value" varchar,
  	"label" varchar
  );
  
  CREATE TABLE "pages_blocks_product_c_t_a_why_us_points" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar
  );
  
  CREATE TABLE "pages_blocks_product_c_t_a_application_options" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"value" varchar,
  	"label" varchar
  );
  
  CREATE TABLE "pages_blocks_product_c_t_a" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
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
  	"_locale" "_locales" NOT NULL,
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
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"file_info" varchar,
  	"download_url" varchar
  );
  
  CREATE TABLE "pages_blocks_product_resources" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
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
  	"_locale" "_locales" NOT NULL,
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
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar DEFAULT 'Kontakt',
  	"subtitle" varchar DEFAULT 'Odgovarjamo v 24h | Nujna podpora: 24/7',
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_contact_form" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
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
  	"_locale" "_locales" NOT NULL,
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
  	"_locale" "_locales" NOT NULL,
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
  	"_locale" "_locales" NOT NULL,
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
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"question" varchar,
  	"answer" varchar
  );
  
  CREATE TABLE "pages_blocks_contact_f_a_q" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"badge" varchar DEFAULT 'Pogosta vprašanja',
  	"title" varchar DEFAULT 'Pogosta vprašanja',
  	"subtitle" varchar DEFAULT 'Odgovori na najpogostejša vprašanja, ki nam jih zastavljajo stranke.',
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_universal_hero_benefits" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"description" varchar
  );
  
  CREATE TABLE "pages_blocks_universal_hero_trust_indicators" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar
  );
  
  CREATE TABLE "pages_blocks_universal_hero_stats" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"value" varchar,
  	"label" varchar
  );
  
  CREATE TABLE "pages_blocks_universal_hero_contact_methods" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"link_type" "enum_pages_blocks_universal_hero_contact_methods_link_type" DEFAULT 'page',
  	"link_page_id" integer,
  	"link_post_id" integer,
  	"link_url" varchar,
  	"link_anchor" varchar,
  	"title" varchar,
  	"value" varchar
  );
  
  CREATE TABLE "pages_blocks_universal_hero" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"variant" "enum_pages_blocks_universal_hero_variant" DEFAULT 'standard',
  	"badge" varchar,
  	"title" varchar,
  	"subtitle" varchar,
  	"description" varchar,
  	"benefits_layout" "enum_pages_blocks_universal_hero_benefits_layout" DEFAULT 'grid',
  	"primary_c_t_a_text" varchar,
  	"primary_c_t_a_type" "enum_pages_blocks_universal_hero_primary_c_t_a_type" DEFAULT 'page',
  	"primary_c_t_a_page_id" integer,
  	"primary_c_t_a_post_id" integer,
  	"primary_c_t_a_url" varchar,
  	"primary_c_t_a_anchor" varchar,
  	"primary_c_t_a_variant" "enum_pages_blocks_universal_hero_primary_c_t_a_variant" DEFAULT 'default',
  	"secondary_c_t_a_text" varchar,
  	"secondary_c_t_a_type" "enum_pages_blocks_universal_hero_secondary_c_t_a_type" DEFAULT 'page',
  	"secondary_c_t_a_page_id" integer,
  	"secondary_c_t_a_post_id" integer,
  	"secondary_c_t_a_url" varchar,
  	"secondary_c_t_a_anchor" varchar,
  	"secondary_c_t_a_variant" "enum_pages_blocks_universal_hero_secondary_c_t_a_variant" DEFAULT 'default',
  	"trust_text" varchar,
  	"show_image" boolean DEFAULT true,
  	"background_style" "enum_pages_blocks_universal_hero_background_style" DEFAULT 'surface',
  	"content_alignment" "enum_pages_blocks_universal_hero_content_alignment" DEFAULT 'left',
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_universal_c_t_a_benefits" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"benefit" varchar
  );
  
  CREATE TABLE "pages_blocks_universal_c_t_a_stats" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"value" varchar,
  	"label" varchar
  );
  
  CREATE TABLE "pages_blocks_universal_c_t_a" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"variant" "enum_pages_blocks_universal_c_t_a_variant" DEFAULT 'standard',
  	"title" varchar,
  	"subtitle" varchar,
  	"description" varchar,
  	"primary_c_t_a_text" varchar,
  	"primary_c_t_a_type" "enum_pages_blocks_universal_c_t_a_primary_c_t_a_type" DEFAULT 'page',
  	"primary_c_t_a_page_id" integer,
  	"primary_c_t_a_post_id" integer,
  	"primary_c_t_a_url" varchar,
  	"primary_c_t_a_anchor" varchar,
  	"primary_c_t_a_variant" "enum_pages_blocks_universal_c_t_a_primary_c_t_a_variant" DEFAULT 'default',
  	"secondary_c_t_a_text" varchar,
  	"secondary_c_t_a_type" "enum_pages_blocks_universal_c_t_a_secondary_c_t_a_type" DEFAULT 'page',
  	"secondary_c_t_a_page_id" integer,
  	"secondary_c_t_a_post_id" integer,
  	"secondary_c_t_a_url" varchar,
  	"secondary_c_t_a_anchor" varchar,
  	"secondary_c_t_a_variant" "enum_pages_blocks_universal_c_t_a_secondary_c_t_a_variant" DEFAULT 'default',
  	"background_style" "enum_pages_blocks_universal_c_t_a_background_style" DEFAULT 'surface',
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_feature_grid_features_details" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"detail" varchar
  );
  
  CREATE TABLE "pages_blocks_feature_grid_features" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"description" varchar,
  	"badge" varchar,
  	"link_type" "enum_pages_blocks_feature_grid_features_link_type" DEFAULT 'page',
  	"link_page_id" integer,
  	"link_post_id" integer,
  	"link_url" varchar,
  	"link_anchor" varchar,
  	"cta_text" varchar
  );
  
  CREATE TABLE "pages_blocks_feature_grid" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"variant" "enum_pages_blocks_feature_grid_variant" DEFAULT 'features',
  	"title" varchar,
  	"subtitle" varchar,
  	"description" varchar,
  	"badge" varchar,
  	"columns" "enum_pages_blocks_feature_grid_columns" DEFAULT '3',
  	"card_style" "enum_pages_blocks_feature_grid_card_style" DEFAULT 'default',
  	"background_style" "enum_pages_blocks_feature_grid_background_style" DEFAULT 'background',
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_content_grid_items_applications" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"application" varchar
  );
  
  CREATE TABLE "pages_blocks_content_grid_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"title" varchar,
  	"description" varchar,
  	"link_type" "enum_pages_blocks_content_grid_items_link_type" DEFAULT 'page',
  	"link_page_id" integer,
  	"link_post_id" integer,
  	"link_url" varchar,
  	"link_anchor" varchar,
  	"post_count" numeric
  );
  
  CREATE TABLE "pages_blocks_content_grid" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"variant" "enum_pages_blocks_content_grid_variant" DEFAULT 'categories',
  	"title" varchar,
  	"subtitle" varchar,
  	"description" varchar,
  	"badge" varchar,
  	"columns" "enum_pages_blocks_content_grid_columns" DEFAULT '3',
  	"background_style" "enum_pages_blocks_content_grid_background_style" DEFAULT 'background',
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_stats_section_stats" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"value" varchar,
  	"label" varchar,
  	"description" varchar
  );
  
  CREATE TABLE "pages_blocks_stats_section" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
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
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"detail" varchar
  );
  
  CREATE TABLE "pages_blocks_process_steps_steps" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"_locale" "_locales" NOT NULL,
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
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"variant" "enum_pages_blocks_process_steps_variant" DEFAULT 'numbered',
  	"title" varchar,
  	"subtitle" varchar,
  	"description" varchar,
  	"badge" varchar,
  	"background_style" "enum_pages_blocks_process_steps_background_style" DEFAULT 'background',
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_content_cards_cards_tags" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"tag" varchar
  );
  
  CREATE TABLE "pages_blocks_content_cards_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"description" varchar,
  	"excerpt" varchar,
  	"category" varchar,
  	"read_time" varchar,
  	"published_at" varchar,
  	"link_type" "enum_pages_blocks_content_cards_cards_link_type" DEFAULT 'page',
  	"link_page_id" integer,
  	"link_post_id" integer,
  	"link_url" varchar,
  	"link_anchor" varchar,
  	"featured" boolean
  );
  
  CREATE TABLE "pages_blocks_content_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
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
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"benefit" varchar
  );
  
  CREATE TABLE "pages_blocks_contact_section" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"variant" "enum_pages_blocks_contact_section_variant" DEFAULT 'split',
  	"title" varchar,
  	"description" varchar,
  	"badge" varchar,
  	"form_title" varchar,
  	"form_description" varchar,
  	"background_style" "enum_pages_blocks_contact_section_background_style" DEFAULT 'surface',
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_comparison_table_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"advantage" varchar,
  	"description" varchar,
  	"primary" "enum_pages_blocks_comparison_table_items_primary",
  	"secondary" "enum_pages_blocks_comparison_table_items_secondary"
  );
  
  CREATE TABLE "pages_blocks_comparison_table" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"description" varchar,
  	"badge" varchar,
  	"primary_label" varchar,
  	"secondary_label" varchar,
  	"background_style" "enum_pages_blocks_comparison_table_background_style" DEFAULT 'background',
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_simple_page_breadcrumbs" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"link_type" "enum_pages_blocks_simple_page_breadcrumbs_link_type" DEFAULT 'page',
  	"link_page_id" integer,
  	"link_post_id" integer,
  	"link_url" varchar,
  	"link_anchor" varchar
  );
  
  CREATE TABLE "pages_blocks_simple_page_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"link_type" "enum_pages_blocks_simple_page_links_link_type" DEFAULT 'page',
  	"link_page_id" integer,
  	"link_post_id" integer,
  	"link_url" varchar,
  	"link_anchor" varchar,
  	"description" varchar
  );
  
  CREATE TABLE "pages_blocks_simple_page" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
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
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"description" varchar,
  	"logo_id" integer
  );
  
  CREATE TABLE "pages_blocks_brand_showcase" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"variant" "enum_pages_blocks_brand_showcase_variant" DEFAULT 'grid',
  	"title" varchar,
  	"description" varchar,
  	"badge" varchar,
  	"background_style" "enum_pages_blocks_brand_showcase_background_style" DEFAULT 'background',
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_technical_content_process_steps" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"number" varchar,
  	"title" varchar,
  	"description" varchar
  );
  
  CREATE TABLE "pages_blocks_technical_content_specifications_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"value" varchar
  );
  
  CREATE TABLE "pages_blocks_technical_content_specifications" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"category" varchar
  );
  
  CREATE TABLE "pages_blocks_technical_content" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"variant" "enum_pages_blocks_technical_content_variant" DEFAULT 'overview',
  	"title" varchar,
  	"description" varchar,
  	"badge" varchar,
  	"overview_content" jsonb,
  	"background_style" "enum_pages_blocks_technical_content_background_style" DEFAULT 'background',
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_resource_gallery_resources" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"_locale" "_locales" NOT NULL,
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
  	"_locale" "_locales" NOT NULL,
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
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"variant" "enum_pages_blocks_resource_gallery_variant" DEFAULT 'grid',
  	"title" varchar,
  	"description" varchar,
  	"badge" varchar,
  	"background_style" "enum_pages_blocks_resource_gallery_background_style" DEFAULT 'background',
  	"block_name" varchar
  );
  
  CREATE TABLE "pages" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"slug" varchar,
  	"published_at" timestamp(3) with time zone,
  	"status" "enum_pages_status" DEFAULT 'draft',
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"_status" "enum_pages_status" DEFAULT 'draft'
  );
  
  CREATE TABLE "pages_locales" (
  	"title" varchar,
  	"meta_title" varchar,
  	"meta_description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_hero_cta_buttons" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"type" "enum__pages_v_blocks_hero_cta_buttons_type" DEFAULT 'page',
  	"page_id" integer,
  	"post_id" integer,
  	"url" varchar,
  	"anchor" varchar,
  	"variant" "enum__pages_v_blocks_hero_cta_buttons_variant" DEFAULT 'default',
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_hero" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
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
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"logo_id" integer,
  	"alt" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_logo_belt" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_services_services_features" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"feature" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_services_services" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"description" varchar DEFAULT 'Sistematičen pristop, preverjene komponente, popolna dokumentacija.',
  	"image_id" integer,
  	"button_text" varchar DEFAULT 'Več o storitvi',
  	"button_type" "enum__pages_v_blocks_services_services_button_type" DEFAULT 'page',
  	"button_page_id" integer,
  	"button_url" varchar,
  	"button_anchor" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_services" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"badge" varchar DEFAULT 'STORITVE',
  	"title" varchar DEFAULT 'Specializirani za krmiljenje in avtomatizacijo',
  	"subtitle" varchar DEFAULT 'Od načrtovanja do zagona in servisa',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_about_badges" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"text" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_about_stats" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"number" varchar,
  	"label" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_about_process" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"step" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_about" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar DEFAULT 'O podjetju',
  	"description" varchar DEFAULT 'Specializirani smo za industrijske avtomatizacijske sisteme z več kot 10-letnimi izkušnjami.',
  	"image_id" integer,
  	"callout_text" varchar,
  	"button_text" varchar DEFAULT 'Več o nas',
  	"button_type" "enum__pages_v_blocks_about_button_type" DEFAULT 'page',
  	"button_page_id" integer,
  	"button_post_id" integer,
  	"button_url" varchar,
  	"button_anchor" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_why_trust_reasons" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"reason" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_why_trust_pillars" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_locale" "_locales" NOT NULL,
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
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar DEFAULT 'Zakaj nam zaupajo?',
  	"image_id" integer,
  	"button_text" varchar DEFAULT 'Zaupajte nam',
  	"button_type" "enum__pages_v_blocks_why_trust_button_type" DEFAULT 'page',
  	"button_page_id" integer,
  	"button_post_id" integer,
  	"button_url" varchar,
  	"button_anchor" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_projects_projects_stack" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"technology" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_projects_projects" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"category" varchar,
  	"image_id" integer,
  	"description" varchar,
  	"link" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_projects" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"badge" varchar DEFAULT 'PROJEKTI',
  	"title" varchar DEFAULT 'Naši projekti',
  	"subtitle" varchar DEFAULT 'Izsek projektov, ki so izboljšali produktivnost, varnost in sledljivost.',
  	"button_text" varchar DEFAULT 'Vsi projekti',
  	"button_type" "enum__pages_v_blocks_projects_button_type" DEFAULT 'page',
  	"button_page_id" integer,
  	"button_post_id" integer,
  	"button_url" varchar,
  	"button_anchor" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_contact" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"badge" varchar DEFAULT 'KONTAKT',
  	"title" varchar DEFAULT 'Stopite v stik z nami',
  	"subtitle" varchar DEFAULT 'Pripravili vam bomo ponudbo v 24 urah',
  	"phone" varchar DEFAULT '+386 1 234 5678',
  	"email" varchar DEFAULT 'info@sinteh.si',
  	"privacy_text" varchar DEFAULT 'Pošiljanjem soglašate z našo politiko zasebnosti. Vaših podatkov ne posredujemo tretjim.',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_rich_text" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"content" jsonb,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_product_hero_key_benefits" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"description" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_product_hero_cta_buttons" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"type" "enum__pages_v_blocks_product_hero_cta_buttons_type" DEFAULT 'page',
  	"page_id" integer,
  	"post_id" integer,
  	"url" varchar,
  	"anchor" varchar,
  	"variant" "enum__pages_v_blocks_product_hero_cta_buttons_variant" DEFAULT 'default',
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_product_hero" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
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
  	"_locale" "_locales" NOT NULL,
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
  	"_locale" "_locales" NOT NULL,
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
  	"_locale" "_locales" NOT NULL,
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
  	"_locale" "_locales" NOT NULL,
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
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"value" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_specifications_specifications" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"category" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_specifications_certification_badges" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"description" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_specifications_additional_info_details" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"value" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_specifications" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
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
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"detail" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_applications_applications" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"icon" "enum__pages_v_blocks_applications_applications_icon",
  	"title" varchar,
  	"description" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_applications_stats" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"number" varchar,
  	"label" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_applications_case_study_stats" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"value" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_applications" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
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
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"description" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_technical_overview_technical_benefits" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"description" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_technical_overview" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
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
  	"_locale" "_locales" NOT NULL,
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
  	"_locale" "_locales" NOT NULL,
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
  	"_locale" "_locales" NOT NULL,
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
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"value" varchar,
  	"label" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_product_c_t_a_why_us_points" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"text" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_product_c_t_a_application_options" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"value" varchar,
  	"label" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_product_c_t_a" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
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
  	"_locale" "_locales" NOT NULL,
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
  	"_locale" "_locales" NOT NULL,
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
  	"_locale" "_locales" NOT NULL,
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
  	"_locale" "_locales" NOT NULL,
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
  	"_locale" "_locales" NOT NULL,
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
  	"_locale" "_locales" NOT NULL,
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
  	"_locale" "_locales" NOT NULL,
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
  	"_locale" "_locales" NOT NULL,
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
  	"_locale" "_locales" NOT NULL,
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
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"question" varchar,
  	"answer" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_contact_f_a_q" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
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
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"description" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_universal_hero_trust_indicators" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"text" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_universal_hero_stats" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"value" varchar,
  	"label" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_universal_hero_contact_methods" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"link_type" "enum__pages_v_blocks_universal_hero_contact_methods_link_type" DEFAULT 'page',
  	"link_page_id" integer,
  	"link_post_id" integer,
  	"link_url" varchar,
  	"link_anchor" varchar,
  	"title" varchar,
  	"value" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_universal_hero" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"variant" "enum__pages_v_blocks_universal_hero_variant" DEFAULT 'standard',
  	"badge" varchar,
  	"title" varchar,
  	"subtitle" varchar,
  	"description" varchar,
  	"benefits_layout" "enum__pages_v_blocks_universal_hero_benefits_layout" DEFAULT 'grid',
  	"primary_c_t_a_text" varchar,
  	"primary_c_t_a_type" "enum__pages_v_blocks_universal_hero_primary_c_t_a_type" DEFAULT 'page',
  	"primary_c_t_a_page_id" integer,
  	"primary_c_t_a_post_id" integer,
  	"primary_c_t_a_url" varchar,
  	"primary_c_t_a_anchor" varchar,
  	"primary_c_t_a_variant" "enum__pages_v_blocks_universal_hero_primary_c_t_a_variant" DEFAULT 'default',
  	"secondary_c_t_a_text" varchar,
  	"secondary_c_t_a_type" "enum__pages_v_blocks_universal_hero_secondary_c_t_a_type" DEFAULT 'page',
  	"secondary_c_t_a_page_id" integer,
  	"secondary_c_t_a_post_id" integer,
  	"secondary_c_t_a_url" varchar,
  	"secondary_c_t_a_anchor" varchar,
  	"secondary_c_t_a_variant" "enum__pages_v_blocks_universal_hero_secondary_c_t_a_variant" DEFAULT 'default',
  	"trust_text" varchar,
  	"show_image" boolean DEFAULT true,
  	"background_style" "enum__pages_v_blocks_universal_hero_background_style" DEFAULT 'surface',
  	"content_alignment" "enum__pages_v_blocks_universal_hero_content_alignment" DEFAULT 'left',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_universal_c_t_a_benefits" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"benefit" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_universal_c_t_a_stats" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"value" varchar,
  	"label" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_universal_c_t_a" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"variant" "enum__pages_v_blocks_universal_c_t_a_variant" DEFAULT 'standard',
  	"title" varchar,
  	"subtitle" varchar,
  	"description" varchar,
  	"primary_c_t_a_text" varchar,
  	"primary_c_t_a_type" "enum__pages_v_blocks_universal_c_t_a_primary_c_t_a_type" DEFAULT 'page',
  	"primary_c_t_a_page_id" integer,
  	"primary_c_t_a_post_id" integer,
  	"primary_c_t_a_url" varchar,
  	"primary_c_t_a_anchor" varchar,
  	"primary_c_t_a_variant" "enum__pages_v_blocks_universal_c_t_a_primary_c_t_a_variant" DEFAULT 'default',
  	"secondary_c_t_a_text" varchar,
  	"secondary_c_t_a_type" "enum__pages_v_blocks_universal_c_t_a_secondary_c_t_a_type" DEFAULT 'page',
  	"secondary_c_t_a_page_id" integer,
  	"secondary_c_t_a_post_id" integer,
  	"secondary_c_t_a_url" varchar,
  	"secondary_c_t_a_anchor" varchar,
  	"secondary_c_t_a_variant" "enum__pages_v_blocks_universal_c_t_a_secondary_c_t_a_variant" DEFAULT 'default',
  	"background_style" "enum__pages_v_blocks_universal_c_t_a_background_style" DEFAULT 'surface',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_feature_grid_features_details" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"detail" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_feature_grid_features" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"description" varchar,
  	"badge" varchar,
  	"link_type" "enum__pages_v_blocks_feature_grid_features_link_type" DEFAULT 'page',
  	"link_page_id" integer,
  	"link_post_id" integer,
  	"link_url" varchar,
  	"link_anchor" varchar,
  	"cta_text" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_feature_grid" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"variant" "enum__pages_v_blocks_feature_grid_variant" DEFAULT 'features',
  	"title" varchar,
  	"subtitle" varchar,
  	"description" varchar,
  	"badge" varchar,
  	"columns" "enum__pages_v_blocks_feature_grid_columns" DEFAULT '3',
  	"card_style" "enum__pages_v_blocks_feature_grid_card_style" DEFAULT 'default',
  	"background_style" "enum__pages_v_blocks_feature_grid_background_style" DEFAULT 'background',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_content_grid_items_applications" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"application" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_content_grid_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"title" varchar,
  	"description" varchar,
  	"link_type" "enum__pages_v_blocks_content_grid_items_link_type" DEFAULT 'page',
  	"link_page_id" integer,
  	"link_post_id" integer,
  	"link_url" varchar,
  	"link_anchor" varchar,
  	"post_count" numeric,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_content_grid" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"variant" "enum__pages_v_blocks_content_grid_variant" DEFAULT 'categories',
  	"title" varchar,
  	"subtitle" varchar,
  	"description" varchar,
  	"badge" varchar,
  	"columns" "enum__pages_v_blocks_content_grid_columns" DEFAULT '3',
  	"background_style" "enum__pages_v_blocks_content_grid_background_style" DEFAULT 'background',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_stats_section_stats" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_locale" "_locales" NOT NULL,
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
  	"_locale" "_locales" NOT NULL,
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
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"detail" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_process_steps_steps" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_locale" "_locales" NOT NULL,
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
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"variant" "enum__pages_v_blocks_process_steps_variant" DEFAULT 'numbered',
  	"title" varchar,
  	"subtitle" varchar,
  	"description" varchar,
  	"badge" varchar,
  	"background_style" "enum__pages_v_blocks_process_steps_background_style" DEFAULT 'background',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_content_cards_cards_tags" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"tag" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_content_cards_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"description" varchar,
  	"excerpt" varchar,
  	"category" varchar,
  	"read_time" varchar,
  	"published_at" varchar,
  	"link_type" "enum__pages_v_blocks_content_cards_cards_link_type" DEFAULT 'page',
  	"link_page_id" integer,
  	"link_post_id" integer,
  	"link_url" varchar,
  	"link_anchor" varchar,
  	"featured" boolean,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_content_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
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
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"benefit" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_contact_section" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"variant" "enum__pages_v_blocks_contact_section_variant" DEFAULT 'split',
  	"title" varchar,
  	"description" varchar,
  	"badge" varchar,
  	"form_title" varchar,
  	"form_description" varchar,
  	"background_style" "enum__pages_v_blocks_contact_section_background_style" DEFAULT 'surface',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_comparison_table_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"advantage" varchar,
  	"description" varchar,
  	"primary" "enum__pages_v_blocks_comparison_table_items_primary",
  	"secondary" "enum__pages_v_blocks_comparison_table_items_secondary",
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_comparison_table" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"description" varchar,
  	"badge" varchar,
  	"primary_label" varchar,
  	"secondary_label" varchar,
  	"background_style" "enum__pages_v_blocks_comparison_table_background_style" DEFAULT 'background',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_simple_page_breadcrumbs" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"link_type" "enum__pages_v_blocks_simple_page_breadcrumbs_link_type" DEFAULT 'page',
  	"link_page_id" integer,
  	"link_post_id" integer,
  	"link_url" varchar,
  	"link_anchor" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_simple_page_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"link_type" "enum__pages_v_blocks_simple_page_links_link_type" DEFAULT 'page',
  	"link_page_id" integer,
  	"link_post_id" integer,
  	"link_url" varchar,
  	"link_anchor" varchar,
  	"description" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_simple_page" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
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
  	"_locale" "_locales" NOT NULL,
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
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"variant" "enum__pages_v_blocks_brand_showcase_variant" DEFAULT 'grid',
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
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"number" varchar,
  	"title" varchar,
  	"description" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_technical_content_specifications_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"value" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_technical_content_specifications" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"category" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_technical_content" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"variant" "enum__pages_v_blocks_technical_content_variant" DEFAULT 'overview',
  	"title" varchar,
  	"description" varchar,
  	"badge" varchar,
  	"overview_content" jsonb,
  	"background_style" "enum__pages_v_blocks_technical_content_background_style" DEFAULT 'background',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_resource_gallery_resources" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_locale" "_locales" NOT NULL,
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
  	"_locale" "_locales" NOT NULL,
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
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"variant" "enum__pages_v_blocks_resource_gallery_variant" DEFAULT 'grid',
  	"title" varchar,
  	"description" varchar,
  	"badge" varchar,
  	"background_style" "enum__pages_v_blocks_resource_gallery_background_style" DEFAULT 'background',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_slug" varchar,
  	"version_published_at" timestamp(3) with time zone,
  	"version_status" "enum__pages_v_version_status" DEFAULT 'draft',
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "enum__pages_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"snapshot" boolean,
  	"published_locale" "enum__pages_v_published_locale",
  	"latest" boolean
  );
  
  CREATE TABLE "_pages_v_locales" (
  	"version_title" varchar,
  	"version_meta_title" varchar,
  	"version_meta_description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "posts_tags" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"tag" varchar
  );
  
  CREATE TABLE "posts" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"slug" varchar,
  	"featured_image_id" integer,
  	"author_id" integer,
  	"published_at" timestamp(3) with time zone,
  	"status" "enum_posts_status" DEFAULT 'draft',
  	"reading_time" numeric,
  	"featured" boolean DEFAULT false,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"_status" "enum_posts_status" DEFAULT 'draft'
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
  
  CREATE TABLE "posts_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"categories_id" integer
  );
  
  CREATE TABLE "_posts_v_version_tags" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"tag" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_posts_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_slug" varchar,
  	"version_featured_image_id" integer,
  	"version_author_id" integer,
  	"version_published_at" timestamp(3) with time zone,
  	"version_status" "enum__posts_v_version_status" DEFAULT 'draft',
  	"version_reading_time" numeric,
  	"version_featured" boolean DEFAULT false,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "enum__posts_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"snapshot" boolean,
  	"published_locale" "enum__posts_v_published_locale",
  	"latest" boolean,
  	"autosave" boolean
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
  
  CREATE TABLE "_posts_v_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"categories_id" integer
  );
  
  CREATE TABLE "categories" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"slug" varchar NOT NULL,
  	"parent_id" integer,
  	"color" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
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
  
  CREATE TABLE "header_navigation_dropdown_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"type" "enum_header_navigation_dropdown_items_type" DEFAULT 'page',
  	"page_id" integer,
  	"post_id" integer,
  	"category_id" integer,
  	"url" varchar,
  	"new_tab" boolean DEFAULT false,
  	"featured" boolean DEFAULT false
  );
  
  CREATE TABLE "header_navigation_dropdown_items_locales" (
  	"label" varchar DEFAULT 'Dropdown Item',
  	"description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "header_navigation" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"nav_type" "enum_header_navigation_nav_type" DEFAULT 'link' NOT NULL,
  	"type" "enum_header_navigation_type" DEFAULT 'page',
  	"page_id" integer,
  	"post_id" integer,
  	"category_id" integer,
  	"url" varchar,
  	"new_tab" boolean DEFAULT false,
  	"dropdown_style" "enum_header_navigation_dropdown_style" DEFAULT 'simple'
  );
  
  CREATE TABLE "header_navigation_locales" (
  	"label" varchar DEFAULT 'Navigation Item',
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "header" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"logo_id" integer,
  	"mobile_navigation_enabled" boolean DEFAULT true,
  	"mobile_navigation_menu_button_label" varchar DEFAULT 'Menu',
  	"mobile_navigation_close_button_label" varchar DEFAULT 'Close menu',
  	"mobile_navigation_show_language_selector" boolean DEFAULT true,
  	"mobile_navigation_show_contact_button" boolean DEFAULT true,
  	"recent_posts_enabled" boolean DEFAULT false,
  	"recent_posts_label" varchar DEFAULT 'Recent Posts',
  	"recent_posts_number_of_posts" numeric DEFAULT 5,
  	"recent_posts_show_in_mobile" boolean DEFAULT true,
  	"categories_nav_enabled" boolean DEFAULT false,
  	"categories_nav_label" varchar DEFAULT 'Categories',
  	"categories_nav_display_type" "enum_header_categories_nav_display_type" DEFAULT 'all',
  	"categories_nav_max_categories" numeric DEFAULT 6,
  	"categories_nav_show_in_mobile" boolean DEFAULT true,
  	"social_links_facebook" varchar,
  	"social_links_twitter" varchar,
  	"social_links_instagram" varchar,
  	"social_links_linkedin" varchar,
  	"social_links_youtube" varchar,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "header_locales" (
  	"site_name" varchar DEFAULT 'My Website' NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "header_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"categories_id" integer
  );
  
  CREATE TABLE "footer_company_info_address" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"line" varchar NOT NULL
  );
  
  CREATE TABLE "footer_footer_columns_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"type" "enum_footer_footer_columns_links_type" DEFAULT 'anchor' NOT NULL,
  	"page_id" integer,
  	"url" varchar,
  	"anchor" varchar,
  	"new_tab" boolean DEFAULT false
  );
  
  CREATE TABLE "footer_footer_columns_links_locales" (
  	"label" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "footer_footer_columns" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "footer_footer_columns_locales" (
  	"title" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
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
  
  CREATE TABLE "footer" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"logo_id" integer NOT NULL,
  	"company_info_phone" varchar DEFAULT '+386 (3) 426 36 46',
  	"company_info_email" varchar DEFAULT 'info@sinteh.pro',
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "footer_locales" (
  	"copyright" varchar DEFAULT '© 2025 SINTEH PRO. Vse pravice pridržane.',
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "seo" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"site_name" varchar DEFAULT 'My Website' NOT NULL,
  	"site_description" varchar DEFAULT 'A modern website built with Payload CMS and Next.js' NOT NULL,
  	"site_url" varchar DEFAULT 'https://mywebsite.com' NOT NULL,
  	"default_image_id" integer,
  	"favicon_id" integer,
  	"keywords" varchar,
  	"author" varchar,
  	"twitter_handle" varchar,
  	"facebook_app_id" varchar,
  	"google_analytics_enabled" boolean DEFAULT false,
  	"google_analytics_measurement_id" varchar,
  	"google_tag_manager_enabled" boolean DEFAULT false,
  	"google_tag_manager_container_id" varchar,
  	"robots_index" boolean DEFAULT true,
  	"robots_follow" boolean DEFAULT true,
  	"robots_custom_robots" varchar,
  	"verification_google_site_verification" varchar,
  	"verification_bing_site_verification" varchar,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "homepage_blocks_hero_cta_buttons" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"_locale" "_locales" NOT NULL,
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
  	"_locale" "_locales" NOT NULL,
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
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"logo_id" integer NOT NULL,
  	"alt" varchar NOT NULL
  );
  
  CREATE TABLE "homepage_blocks_logo_belt" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "homepage_blocks_services_services_features" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"feature" varchar NOT NULL
  );
  
  CREATE TABLE "homepage_blocks_services_services" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"_locale" "_locales" NOT NULL,
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
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"badge" varchar DEFAULT 'STORITVE',
  	"title" varchar DEFAULT 'Specializirani za krmiljenje in avtomatizacijo' NOT NULL,
  	"subtitle" varchar DEFAULT 'Od načrtovanja do zagona in servisa',
  	"block_name" varchar
  );
  
  CREATE TABLE "homepage_blocks_about_badges" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar NOT NULL
  );
  
  CREATE TABLE "homepage_blocks_about_stats" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"number" varchar NOT NULL,
  	"label" varchar NOT NULL
  );
  
  CREATE TABLE "homepage_blocks_about_process" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"step" varchar NOT NULL
  );
  
  CREATE TABLE "homepage_blocks_about" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
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
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"reason" varchar NOT NULL
  );
  
  CREATE TABLE "homepage_blocks_why_trust_pillars" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"description" varchar NOT NULL,
  	"icon" "enum_homepage_blocks_why_trust_pillars_icon" NOT NULL
  );
  
  CREATE TABLE "homepage_blocks_why_trust" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
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
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"technology" varchar NOT NULL
  );
  
  CREATE TABLE "homepage_blocks_projects_projects" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"_locale" "_locales" NOT NULL,
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
  	"_locale" "_locales" NOT NULL,
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
  	"_locale" "_locales" NOT NULL,
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
  
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "pages_id" integer;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "posts_id" integer;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "categories_id" integer;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "contact_submissions_id" integer;
  ALTER TABLE "pages_blocks_hero_cta_buttons" ADD CONSTRAINT "pages_blocks_hero_cta_buttons_page_id_pages_id_fk" FOREIGN KEY ("page_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_hero_cta_buttons" ADD CONSTRAINT "pages_blocks_hero_cta_buttons_post_id_posts_id_fk" FOREIGN KEY ("post_id") REFERENCES "public"."posts"("id") ON DELETE set null ON UPDATE no action;
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
  ALTER TABLE "pages_blocks_about" ADD CONSTRAINT "pages_blocks_about_button_post_id_posts_id_fk" FOREIGN KEY ("button_post_id") REFERENCES "public"."posts"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_about" ADD CONSTRAINT "pages_blocks_about_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_why_trust_reasons" ADD CONSTRAINT "pages_blocks_why_trust_reasons_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_why_trust"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_why_trust_pillars" ADD CONSTRAINT "pages_blocks_why_trust_pillars_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_why_trust"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_why_trust" ADD CONSTRAINT "pages_blocks_why_trust_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_why_trust" ADD CONSTRAINT "pages_blocks_why_trust_button_page_id_pages_id_fk" FOREIGN KEY ("button_page_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_why_trust" ADD CONSTRAINT "pages_blocks_why_trust_button_post_id_posts_id_fk" FOREIGN KEY ("button_post_id") REFERENCES "public"."posts"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_why_trust" ADD CONSTRAINT "pages_blocks_why_trust_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_projects_projects_stack" ADD CONSTRAINT "pages_blocks_projects_projects_stack_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_projects_projects"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_projects_projects" ADD CONSTRAINT "pages_blocks_projects_projects_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_projects_projects" ADD CONSTRAINT "pages_blocks_projects_projects_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_projects"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_projects" ADD CONSTRAINT "pages_blocks_projects_button_page_id_pages_id_fk" FOREIGN KEY ("button_page_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_projects" ADD CONSTRAINT "pages_blocks_projects_button_post_id_posts_id_fk" FOREIGN KEY ("button_post_id") REFERENCES "public"."posts"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_projects" ADD CONSTRAINT "pages_blocks_projects_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_contact" ADD CONSTRAINT "pages_blocks_contact_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_rich_text" ADD CONSTRAINT "pages_blocks_rich_text_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_product_hero_key_benefits" ADD CONSTRAINT "pages_blocks_product_hero_key_benefits_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_product_hero"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_product_hero_cta_buttons" ADD CONSTRAINT "pages_blocks_product_hero_cta_buttons_page_id_pages_id_fk" FOREIGN KEY ("page_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_product_hero_cta_buttons" ADD CONSTRAINT "pages_blocks_product_hero_cta_buttons_post_id_posts_id_fk" FOREIGN KEY ("post_id") REFERENCES "public"."posts"("id") ON DELETE set null ON UPDATE no action;
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
  ALTER TABLE "pages_blocks_universal_hero_contact_methods" ADD CONSTRAINT "pages_blocks_universal_hero_contact_methods_link_page_id_pages_id_fk" FOREIGN KEY ("link_page_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_universal_hero_contact_methods" ADD CONSTRAINT "pages_blocks_universal_hero_contact_methods_link_post_id_posts_id_fk" FOREIGN KEY ("link_post_id") REFERENCES "public"."posts"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_universal_hero_contact_methods" ADD CONSTRAINT "pages_blocks_universal_hero_contact_methods_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_universal_hero"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_universal_hero" ADD CONSTRAINT "pages_blocks_universal_hero_primary_c_t_a_page_id_pages_id_fk" FOREIGN KEY ("primary_c_t_a_page_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_universal_hero" ADD CONSTRAINT "pages_blocks_universal_hero_primary_c_t_a_post_id_posts_id_fk" FOREIGN KEY ("primary_c_t_a_post_id") REFERENCES "public"."posts"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_universal_hero" ADD CONSTRAINT "pages_blocks_universal_hero_secondary_c_t_a_page_id_pages_id_fk" FOREIGN KEY ("secondary_c_t_a_page_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_universal_hero" ADD CONSTRAINT "pages_blocks_universal_hero_secondary_c_t_a_post_id_posts_id_fk" FOREIGN KEY ("secondary_c_t_a_post_id") REFERENCES "public"."posts"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_universal_hero" ADD CONSTRAINT "pages_blocks_universal_hero_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_universal_c_t_a_benefits" ADD CONSTRAINT "pages_blocks_universal_c_t_a_benefits_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_universal_c_t_a"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_universal_c_t_a_stats" ADD CONSTRAINT "pages_blocks_universal_c_t_a_stats_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_universal_c_t_a"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_universal_c_t_a" ADD CONSTRAINT "pages_blocks_universal_c_t_a_primary_c_t_a_page_id_pages_id_fk" FOREIGN KEY ("primary_c_t_a_page_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_universal_c_t_a" ADD CONSTRAINT "pages_blocks_universal_c_t_a_primary_c_t_a_post_id_posts_id_fk" FOREIGN KEY ("primary_c_t_a_post_id") REFERENCES "public"."posts"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_universal_c_t_a" ADD CONSTRAINT "pages_blocks_universal_c_t_a_secondary_c_t_a_page_id_pages_id_fk" FOREIGN KEY ("secondary_c_t_a_page_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_universal_c_t_a" ADD CONSTRAINT "pages_blocks_universal_c_t_a_secondary_c_t_a_post_id_posts_id_fk" FOREIGN KEY ("secondary_c_t_a_post_id") REFERENCES "public"."posts"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_universal_c_t_a" ADD CONSTRAINT "pages_blocks_universal_c_t_a_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_feature_grid_features_details" ADD CONSTRAINT "pages_blocks_feature_grid_features_details_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_feature_grid_features"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_feature_grid_features" ADD CONSTRAINT "pages_blocks_feature_grid_features_link_page_id_pages_id_fk" FOREIGN KEY ("link_page_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_feature_grid_features" ADD CONSTRAINT "pages_blocks_feature_grid_features_link_post_id_posts_id_fk" FOREIGN KEY ("link_post_id") REFERENCES "public"."posts"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_feature_grid_features" ADD CONSTRAINT "pages_blocks_feature_grid_features_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_feature_grid"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_feature_grid" ADD CONSTRAINT "pages_blocks_feature_grid_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_content_grid_items_applications" ADD CONSTRAINT "pages_blocks_content_grid_items_applications_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_content_grid_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_content_grid_items" ADD CONSTRAINT "pages_blocks_content_grid_items_link_page_id_pages_id_fk" FOREIGN KEY ("link_page_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_content_grid_items" ADD CONSTRAINT "pages_blocks_content_grid_items_link_post_id_posts_id_fk" FOREIGN KEY ("link_post_id") REFERENCES "public"."posts"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_content_grid_items" ADD CONSTRAINT "pages_blocks_content_grid_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_content_grid"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_content_grid" ADD CONSTRAINT "pages_blocks_content_grid_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_stats_section_stats" ADD CONSTRAINT "pages_blocks_stats_section_stats_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_stats_section"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_stats_section" ADD CONSTRAINT "pages_blocks_stats_section_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_process_steps_steps_details" ADD CONSTRAINT "pages_blocks_process_steps_steps_details_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_process_steps_steps"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_process_steps_steps" ADD CONSTRAINT "pages_blocks_process_steps_steps_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_process_steps"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_process_steps" ADD CONSTRAINT "pages_blocks_process_steps_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_content_cards_cards_tags" ADD CONSTRAINT "pages_blocks_content_cards_cards_tags_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_content_cards_cards"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_content_cards_cards" ADD CONSTRAINT "pages_blocks_content_cards_cards_link_page_id_pages_id_fk" FOREIGN KEY ("link_page_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_content_cards_cards" ADD CONSTRAINT "pages_blocks_content_cards_cards_link_post_id_posts_id_fk" FOREIGN KEY ("link_post_id") REFERENCES "public"."posts"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_content_cards_cards" ADD CONSTRAINT "pages_blocks_content_cards_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_content_cards"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_content_cards" ADD CONSTRAINT "pages_blocks_content_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_contact_section_benefits" ADD CONSTRAINT "pages_blocks_contact_section_benefits_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_contact_section"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_contact_section" ADD CONSTRAINT "pages_blocks_contact_section_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_comparison_table_items" ADD CONSTRAINT "pages_blocks_comparison_table_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_comparison_table"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_comparison_table" ADD CONSTRAINT "pages_blocks_comparison_table_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_simple_page_breadcrumbs" ADD CONSTRAINT "pages_blocks_simple_page_breadcrumbs_link_page_id_pages_id_fk" FOREIGN KEY ("link_page_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_simple_page_breadcrumbs" ADD CONSTRAINT "pages_blocks_simple_page_breadcrumbs_link_post_id_posts_id_fk" FOREIGN KEY ("link_post_id") REFERENCES "public"."posts"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_simple_page_breadcrumbs" ADD CONSTRAINT "pages_blocks_simple_page_breadcrumbs_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_simple_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_simple_page_links" ADD CONSTRAINT "pages_blocks_simple_page_links_link_page_id_pages_id_fk" FOREIGN KEY ("link_page_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_simple_page_links" ADD CONSTRAINT "pages_blocks_simple_page_links_link_post_id_posts_id_fk" FOREIGN KEY ("link_post_id") REFERENCES "public"."posts"("id") ON DELETE set null ON UPDATE no action;
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
  ALTER TABLE "pages_locales" ADD CONSTRAINT "pages_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_hero_cta_buttons" ADD CONSTRAINT "_pages_v_blocks_hero_cta_buttons_page_id_pages_id_fk" FOREIGN KEY ("page_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_hero_cta_buttons" ADD CONSTRAINT "_pages_v_blocks_hero_cta_buttons_post_id_posts_id_fk" FOREIGN KEY ("post_id") REFERENCES "public"."posts"("id") ON DELETE set null ON UPDATE no action;
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
  ALTER TABLE "_pages_v_blocks_about" ADD CONSTRAINT "_pages_v_blocks_about_button_post_id_posts_id_fk" FOREIGN KEY ("button_post_id") REFERENCES "public"."posts"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_about" ADD CONSTRAINT "_pages_v_blocks_about_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_why_trust_reasons" ADD CONSTRAINT "_pages_v_blocks_why_trust_reasons_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_why_trust"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_why_trust_pillars" ADD CONSTRAINT "_pages_v_blocks_why_trust_pillars_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_why_trust"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_why_trust" ADD CONSTRAINT "_pages_v_blocks_why_trust_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_why_trust" ADD CONSTRAINT "_pages_v_blocks_why_trust_button_page_id_pages_id_fk" FOREIGN KEY ("button_page_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_why_trust" ADD CONSTRAINT "_pages_v_blocks_why_trust_button_post_id_posts_id_fk" FOREIGN KEY ("button_post_id") REFERENCES "public"."posts"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_why_trust" ADD CONSTRAINT "_pages_v_blocks_why_trust_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_projects_projects_stack" ADD CONSTRAINT "_pages_v_blocks_projects_projects_stack_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_projects_projects"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_projects_projects" ADD CONSTRAINT "_pages_v_blocks_projects_projects_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_projects_projects" ADD CONSTRAINT "_pages_v_blocks_projects_projects_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_projects"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_projects" ADD CONSTRAINT "_pages_v_blocks_projects_button_page_id_pages_id_fk" FOREIGN KEY ("button_page_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_projects" ADD CONSTRAINT "_pages_v_blocks_projects_button_post_id_posts_id_fk" FOREIGN KEY ("button_post_id") REFERENCES "public"."posts"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_projects" ADD CONSTRAINT "_pages_v_blocks_projects_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_contact" ADD CONSTRAINT "_pages_v_blocks_contact_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_rich_text" ADD CONSTRAINT "_pages_v_blocks_rich_text_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_product_hero_key_benefits" ADD CONSTRAINT "_pages_v_blocks_product_hero_key_benefits_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_product_hero"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_product_hero_cta_buttons" ADD CONSTRAINT "_pages_v_blocks_product_hero_cta_buttons_page_id_pages_id_fk" FOREIGN KEY ("page_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_product_hero_cta_buttons" ADD CONSTRAINT "_pages_v_blocks_product_hero_cta_buttons_post_id_posts_id_fk" FOREIGN KEY ("post_id") REFERENCES "public"."posts"("id") ON DELETE set null ON UPDATE no action;
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
  ALTER TABLE "_pages_v_blocks_universal_hero_contact_methods" ADD CONSTRAINT "_pages_v_blocks_universal_hero_contact_methods_link_page_id_pages_id_fk" FOREIGN KEY ("link_page_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_universal_hero_contact_methods" ADD CONSTRAINT "_pages_v_blocks_universal_hero_contact_methods_link_post_id_posts_id_fk" FOREIGN KEY ("link_post_id") REFERENCES "public"."posts"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_universal_hero_contact_methods" ADD CONSTRAINT "_pages_v_blocks_universal_hero_contact_methods_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_universal_hero"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_universal_hero" ADD CONSTRAINT "_pages_v_blocks_universal_hero_primary_c_t_a_page_id_pages_id_fk" FOREIGN KEY ("primary_c_t_a_page_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_universal_hero" ADD CONSTRAINT "_pages_v_blocks_universal_hero_primary_c_t_a_post_id_posts_id_fk" FOREIGN KEY ("primary_c_t_a_post_id") REFERENCES "public"."posts"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_universal_hero" ADD CONSTRAINT "_pages_v_blocks_universal_hero_secondary_c_t_a_page_id_pages_id_fk" FOREIGN KEY ("secondary_c_t_a_page_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_universal_hero" ADD CONSTRAINT "_pages_v_blocks_universal_hero_secondary_c_t_a_post_id_posts_id_fk" FOREIGN KEY ("secondary_c_t_a_post_id") REFERENCES "public"."posts"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_universal_hero" ADD CONSTRAINT "_pages_v_blocks_universal_hero_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_universal_c_t_a_benefits" ADD CONSTRAINT "_pages_v_blocks_universal_c_t_a_benefits_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_universal_c_t_a"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_universal_c_t_a_stats" ADD CONSTRAINT "_pages_v_blocks_universal_c_t_a_stats_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_universal_c_t_a"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_universal_c_t_a" ADD CONSTRAINT "_pages_v_blocks_universal_c_t_a_primary_c_t_a_page_id_pages_id_fk" FOREIGN KEY ("primary_c_t_a_page_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_universal_c_t_a" ADD CONSTRAINT "_pages_v_blocks_universal_c_t_a_primary_c_t_a_post_id_posts_id_fk" FOREIGN KEY ("primary_c_t_a_post_id") REFERENCES "public"."posts"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_universal_c_t_a" ADD CONSTRAINT "_pages_v_blocks_universal_c_t_a_secondary_c_t_a_page_id_pages_id_fk" FOREIGN KEY ("secondary_c_t_a_page_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_universal_c_t_a" ADD CONSTRAINT "_pages_v_blocks_universal_c_t_a_secondary_c_t_a_post_id_posts_id_fk" FOREIGN KEY ("secondary_c_t_a_post_id") REFERENCES "public"."posts"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_universal_c_t_a" ADD CONSTRAINT "_pages_v_blocks_universal_c_t_a_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_feature_grid_features_details" ADD CONSTRAINT "_pages_v_blocks_feature_grid_features_details_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_feature_grid_features"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_feature_grid_features" ADD CONSTRAINT "_pages_v_blocks_feature_grid_features_link_page_id_pages_id_fk" FOREIGN KEY ("link_page_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_feature_grid_features" ADD CONSTRAINT "_pages_v_blocks_feature_grid_features_link_post_id_posts_id_fk" FOREIGN KEY ("link_post_id") REFERENCES "public"."posts"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_feature_grid_features" ADD CONSTRAINT "_pages_v_blocks_feature_grid_features_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_feature_grid"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_feature_grid" ADD CONSTRAINT "_pages_v_blocks_feature_grid_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_content_grid_items_applications" ADD CONSTRAINT "_pages_v_blocks_content_grid_items_applications_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_content_grid_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_content_grid_items" ADD CONSTRAINT "_pages_v_blocks_content_grid_items_link_page_id_pages_id_fk" FOREIGN KEY ("link_page_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_content_grid_items" ADD CONSTRAINT "_pages_v_blocks_content_grid_items_link_post_id_posts_id_fk" FOREIGN KEY ("link_post_id") REFERENCES "public"."posts"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_content_grid_items" ADD CONSTRAINT "_pages_v_blocks_content_grid_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_content_grid"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_content_grid" ADD CONSTRAINT "_pages_v_blocks_content_grid_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_stats_section_stats" ADD CONSTRAINT "_pages_v_blocks_stats_section_stats_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_stats_section"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_stats_section" ADD CONSTRAINT "_pages_v_blocks_stats_section_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_process_steps_steps_details" ADD CONSTRAINT "_pages_v_blocks_process_steps_steps_details_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_process_steps_steps"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_process_steps_steps" ADD CONSTRAINT "_pages_v_blocks_process_steps_steps_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_process_steps"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_process_steps" ADD CONSTRAINT "_pages_v_blocks_process_steps_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_content_cards_cards_tags" ADD CONSTRAINT "_pages_v_blocks_content_cards_cards_tags_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_content_cards_cards"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_content_cards_cards" ADD CONSTRAINT "_pages_v_blocks_content_cards_cards_link_page_id_pages_id_fk" FOREIGN KEY ("link_page_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_content_cards_cards" ADD CONSTRAINT "_pages_v_blocks_content_cards_cards_link_post_id_posts_id_fk" FOREIGN KEY ("link_post_id") REFERENCES "public"."posts"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_content_cards_cards" ADD CONSTRAINT "_pages_v_blocks_content_cards_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_content_cards"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_content_cards" ADD CONSTRAINT "_pages_v_blocks_content_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_contact_section_benefits" ADD CONSTRAINT "_pages_v_blocks_contact_section_benefits_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_contact_section"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_contact_section" ADD CONSTRAINT "_pages_v_blocks_contact_section_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_comparison_table_items" ADD CONSTRAINT "_pages_v_blocks_comparison_table_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_comparison_table"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_comparison_table" ADD CONSTRAINT "_pages_v_blocks_comparison_table_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_simple_page_breadcrumbs" ADD CONSTRAINT "_pages_v_blocks_simple_page_breadcrumbs_link_page_id_pages_id_fk" FOREIGN KEY ("link_page_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_simple_page_breadcrumbs" ADD CONSTRAINT "_pages_v_blocks_simple_page_breadcrumbs_link_post_id_posts_id_fk" FOREIGN KEY ("link_post_id") REFERENCES "public"."posts"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_simple_page_breadcrumbs" ADD CONSTRAINT "_pages_v_blocks_simple_page_breadcrumbs_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_simple_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_simple_page_links" ADD CONSTRAINT "_pages_v_blocks_simple_page_links_link_page_id_pages_id_fk" FOREIGN KEY ("link_page_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_simple_page_links" ADD CONSTRAINT "_pages_v_blocks_simple_page_links_link_post_id_posts_id_fk" FOREIGN KEY ("link_post_id") REFERENCES "public"."posts"("id") ON DELETE set null ON UPDATE no action;
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
  ALTER TABLE "_pages_v" ADD CONSTRAINT "_pages_v_parent_id_pages_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_locales" ADD CONSTRAINT "_pages_v_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "posts_tags" ADD CONSTRAINT "posts_tags_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "posts" ADD CONSTRAINT "posts_featured_image_id_media_id_fk" FOREIGN KEY ("featured_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "posts" ADD CONSTRAINT "posts_author_id_users_id_fk" FOREIGN KEY ("author_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "posts_locales" ADD CONSTRAINT "posts_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "posts_rels" ADD CONSTRAINT "posts_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "posts_rels" ADD CONSTRAINT "posts_rels_categories_fk" FOREIGN KEY ("categories_id") REFERENCES "public"."categories"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_posts_v_version_tags" ADD CONSTRAINT "_posts_v_version_tags_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_posts_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_posts_v" ADD CONSTRAINT "_posts_v_parent_id_posts_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."posts"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_posts_v" ADD CONSTRAINT "_posts_v_version_featured_image_id_media_id_fk" FOREIGN KEY ("version_featured_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_posts_v" ADD CONSTRAINT "_posts_v_version_author_id_users_id_fk" FOREIGN KEY ("version_author_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_posts_v_locales" ADD CONSTRAINT "_posts_v_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_posts_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_posts_v_rels" ADD CONSTRAINT "_posts_v_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_posts_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_posts_v_rels" ADD CONSTRAINT "_posts_v_rels_categories_fk" FOREIGN KEY ("categories_id") REFERENCES "public"."categories"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "categories" ADD CONSTRAINT "categories_parent_id_categories_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."categories"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "categories_locales" ADD CONSTRAINT "categories_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."categories"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "contact_submissions_emails_sent" ADD CONSTRAINT "contact_submissions_emails_sent_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."contact_submissions"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "contact_submissions" ADD CONSTRAINT "contact_submissions_assigned_to_id_users_id_fk" FOREIGN KEY ("assigned_to_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "contact_submissions_texts" ADD CONSTRAINT "contact_submissions_texts_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."contact_submissions"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "header_navigation_dropdown_items" ADD CONSTRAINT "header_navigation_dropdown_items_page_id_pages_id_fk" FOREIGN KEY ("page_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "header_navigation_dropdown_items" ADD CONSTRAINT "header_navigation_dropdown_items_post_id_posts_id_fk" FOREIGN KEY ("post_id") REFERENCES "public"."posts"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "header_navigation_dropdown_items" ADD CONSTRAINT "header_navigation_dropdown_items_category_id_categories_id_fk" FOREIGN KEY ("category_id") REFERENCES "public"."categories"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "header_navigation_dropdown_items" ADD CONSTRAINT "header_navigation_dropdown_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."header_navigation"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "header_navigation_dropdown_items_locales" ADD CONSTRAINT "header_navigation_dropdown_items_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."header_navigation_dropdown_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "header_navigation" ADD CONSTRAINT "header_navigation_page_id_pages_id_fk" FOREIGN KEY ("page_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "header_navigation" ADD CONSTRAINT "header_navigation_post_id_posts_id_fk" FOREIGN KEY ("post_id") REFERENCES "public"."posts"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "header_navigation" ADD CONSTRAINT "header_navigation_category_id_categories_id_fk" FOREIGN KEY ("category_id") REFERENCES "public"."categories"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "header_navigation" ADD CONSTRAINT "header_navigation_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."header"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "header_navigation_locales" ADD CONSTRAINT "header_navigation_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."header_navigation"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "header" ADD CONSTRAINT "header_logo_id_media_id_fk" FOREIGN KEY ("logo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "header_locales" ADD CONSTRAINT "header_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."header"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "header_rels" ADD CONSTRAINT "header_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."header"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "header_rels" ADD CONSTRAINT "header_rels_categories_fk" FOREIGN KEY ("categories_id") REFERENCES "public"."categories"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "footer_company_info_address" ADD CONSTRAINT "footer_company_info_address_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."footer"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "footer_footer_columns_links" ADD CONSTRAINT "footer_footer_columns_links_page_id_pages_id_fk" FOREIGN KEY ("page_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "footer_footer_columns_links" ADD CONSTRAINT "footer_footer_columns_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."footer_footer_columns"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "footer_footer_columns_links_locales" ADD CONSTRAINT "footer_footer_columns_links_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."footer_footer_columns_links"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "footer_footer_columns" ADD CONSTRAINT "footer_footer_columns_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."footer"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "footer_footer_columns_locales" ADD CONSTRAINT "footer_footer_columns_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."footer_footer_columns"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "footer_bottom_links" ADD CONSTRAINT "footer_bottom_links_page_id_pages_id_fk" FOREIGN KEY ("page_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "footer_bottom_links" ADD CONSTRAINT "footer_bottom_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."footer"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "footer" ADD CONSTRAINT "footer_logo_id_media_id_fk" FOREIGN KEY ("logo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "footer_locales" ADD CONSTRAINT "footer_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."footer"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "seo" ADD CONSTRAINT "seo_default_image_id_media_id_fk" FOREIGN KEY ("default_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "seo" ADD CONSTRAINT "seo_favicon_id_media_id_fk" FOREIGN KEY ("favicon_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
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
  CREATE INDEX "pages_blocks_hero_cta_buttons_order_idx" ON "pages_blocks_hero_cta_buttons" USING btree ("_order");
  CREATE INDEX "pages_blocks_hero_cta_buttons_parent_id_idx" ON "pages_blocks_hero_cta_buttons" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_hero_cta_buttons_locale_idx" ON "pages_blocks_hero_cta_buttons" USING btree ("_locale");
  CREATE INDEX "pages_blocks_hero_cta_buttons_page_idx" ON "pages_blocks_hero_cta_buttons" USING btree ("page_id");
  CREATE INDEX "pages_blocks_hero_cta_buttons_post_idx" ON "pages_blocks_hero_cta_buttons" USING btree ("post_id");
  CREATE INDEX "pages_blocks_hero_order_idx" ON "pages_blocks_hero" USING btree ("_order");
  CREATE INDEX "pages_blocks_hero_parent_id_idx" ON "pages_blocks_hero" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_hero_path_idx" ON "pages_blocks_hero" USING btree ("_path");
  CREATE INDEX "pages_blocks_hero_locale_idx" ON "pages_blocks_hero" USING btree ("_locale");
  CREATE INDEX "pages_blocks_hero_background_image_idx" ON "pages_blocks_hero" USING btree ("background_image_id");
  CREATE INDEX "pages_blocks_logo_belt_logos_order_idx" ON "pages_blocks_logo_belt_logos" USING btree ("_order");
  CREATE INDEX "pages_blocks_logo_belt_logos_parent_id_idx" ON "pages_blocks_logo_belt_logos" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_logo_belt_logos_locale_idx" ON "pages_blocks_logo_belt_logos" USING btree ("_locale");
  CREATE INDEX "pages_blocks_logo_belt_logos_logo_idx" ON "pages_blocks_logo_belt_logos" USING btree ("logo_id");
  CREATE INDEX "pages_blocks_logo_belt_order_idx" ON "pages_blocks_logo_belt" USING btree ("_order");
  CREATE INDEX "pages_blocks_logo_belt_parent_id_idx" ON "pages_blocks_logo_belt" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_logo_belt_path_idx" ON "pages_blocks_logo_belt" USING btree ("_path");
  CREATE INDEX "pages_blocks_logo_belt_locale_idx" ON "pages_blocks_logo_belt" USING btree ("_locale");
  CREATE INDEX "pages_blocks_services_services_features_order_idx" ON "pages_blocks_services_services_features" USING btree ("_order");
  CREATE INDEX "pages_blocks_services_services_features_parent_id_idx" ON "pages_blocks_services_services_features" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_services_services_features_locale_idx" ON "pages_blocks_services_services_features" USING btree ("_locale");
  CREATE INDEX "pages_blocks_services_services_order_idx" ON "pages_blocks_services_services" USING btree ("_order");
  CREATE INDEX "pages_blocks_services_services_parent_id_idx" ON "pages_blocks_services_services" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_services_services_locale_idx" ON "pages_blocks_services_services" USING btree ("_locale");
  CREATE INDEX "pages_blocks_services_services_image_idx" ON "pages_blocks_services_services" USING btree ("image_id");
  CREATE INDEX "pages_blocks_services_services_button_button_page_idx" ON "pages_blocks_services_services" USING btree ("button_page_id");
  CREATE INDEX "pages_blocks_services_order_idx" ON "pages_blocks_services" USING btree ("_order");
  CREATE INDEX "pages_blocks_services_parent_id_idx" ON "pages_blocks_services" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_services_path_idx" ON "pages_blocks_services" USING btree ("_path");
  CREATE INDEX "pages_blocks_services_locale_idx" ON "pages_blocks_services" USING btree ("_locale");
  CREATE INDEX "pages_blocks_about_badges_order_idx" ON "pages_blocks_about_badges" USING btree ("_order");
  CREATE INDEX "pages_blocks_about_badges_parent_id_idx" ON "pages_blocks_about_badges" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_about_badges_locale_idx" ON "pages_blocks_about_badges" USING btree ("_locale");
  CREATE INDEX "pages_blocks_about_stats_order_idx" ON "pages_blocks_about_stats" USING btree ("_order");
  CREATE INDEX "pages_blocks_about_stats_parent_id_idx" ON "pages_blocks_about_stats" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_about_stats_locale_idx" ON "pages_blocks_about_stats" USING btree ("_locale");
  CREATE INDEX "pages_blocks_about_process_order_idx" ON "pages_blocks_about_process" USING btree ("_order");
  CREATE INDEX "pages_blocks_about_process_parent_id_idx" ON "pages_blocks_about_process" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_about_process_locale_idx" ON "pages_blocks_about_process" USING btree ("_locale");
  CREATE INDEX "pages_blocks_about_order_idx" ON "pages_blocks_about" USING btree ("_order");
  CREATE INDEX "pages_blocks_about_parent_id_idx" ON "pages_blocks_about" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_about_path_idx" ON "pages_blocks_about" USING btree ("_path");
  CREATE INDEX "pages_blocks_about_locale_idx" ON "pages_blocks_about" USING btree ("_locale");
  CREATE INDEX "pages_blocks_about_image_idx" ON "pages_blocks_about" USING btree ("image_id");
  CREATE INDEX "pages_blocks_about_button_button_page_idx" ON "pages_blocks_about" USING btree ("button_page_id");
  CREATE INDEX "pages_blocks_about_button_button_post_idx" ON "pages_blocks_about" USING btree ("button_post_id");
  CREATE INDEX "pages_blocks_why_trust_reasons_order_idx" ON "pages_blocks_why_trust_reasons" USING btree ("_order");
  CREATE INDEX "pages_blocks_why_trust_reasons_parent_id_idx" ON "pages_blocks_why_trust_reasons" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_why_trust_reasons_locale_idx" ON "pages_blocks_why_trust_reasons" USING btree ("_locale");
  CREATE INDEX "pages_blocks_why_trust_pillars_order_idx" ON "pages_blocks_why_trust_pillars" USING btree ("_order");
  CREATE INDEX "pages_blocks_why_trust_pillars_parent_id_idx" ON "pages_blocks_why_trust_pillars" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_why_trust_pillars_locale_idx" ON "pages_blocks_why_trust_pillars" USING btree ("_locale");
  CREATE INDEX "pages_blocks_why_trust_order_idx" ON "pages_blocks_why_trust" USING btree ("_order");
  CREATE INDEX "pages_blocks_why_trust_parent_id_idx" ON "pages_blocks_why_trust" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_why_trust_path_idx" ON "pages_blocks_why_trust" USING btree ("_path");
  CREATE INDEX "pages_blocks_why_trust_locale_idx" ON "pages_blocks_why_trust" USING btree ("_locale");
  CREATE INDEX "pages_blocks_why_trust_image_idx" ON "pages_blocks_why_trust" USING btree ("image_id");
  CREATE INDEX "pages_blocks_why_trust_button_button_page_idx" ON "pages_blocks_why_trust" USING btree ("button_page_id");
  CREATE INDEX "pages_blocks_why_trust_button_button_post_idx" ON "pages_blocks_why_trust" USING btree ("button_post_id");
  CREATE INDEX "pages_blocks_projects_projects_stack_order_idx" ON "pages_blocks_projects_projects_stack" USING btree ("_order");
  CREATE INDEX "pages_blocks_projects_projects_stack_parent_id_idx" ON "pages_blocks_projects_projects_stack" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_projects_projects_stack_locale_idx" ON "pages_blocks_projects_projects_stack" USING btree ("_locale");
  CREATE INDEX "pages_blocks_projects_projects_order_idx" ON "pages_blocks_projects_projects" USING btree ("_order");
  CREATE INDEX "pages_blocks_projects_projects_parent_id_idx" ON "pages_blocks_projects_projects" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_projects_projects_locale_idx" ON "pages_blocks_projects_projects" USING btree ("_locale");
  CREATE INDEX "pages_blocks_projects_projects_image_idx" ON "pages_blocks_projects_projects" USING btree ("image_id");
  CREATE INDEX "pages_blocks_projects_order_idx" ON "pages_blocks_projects" USING btree ("_order");
  CREATE INDEX "pages_blocks_projects_parent_id_idx" ON "pages_blocks_projects" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_projects_path_idx" ON "pages_blocks_projects" USING btree ("_path");
  CREATE INDEX "pages_blocks_projects_locale_idx" ON "pages_blocks_projects" USING btree ("_locale");
  CREATE INDEX "pages_blocks_projects_button_button_page_idx" ON "pages_blocks_projects" USING btree ("button_page_id");
  CREATE INDEX "pages_blocks_projects_button_button_post_idx" ON "pages_blocks_projects" USING btree ("button_post_id");
  CREATE INDEX "pages_blocks_contact_order_idx" ON "pages_blocks_contact" USING btree ("_order");
  CREATE INDEX "pages_blocks_contact_parent_id_idx" ON "pages_blocks_contact" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_contact_path_idx" ON "pages_blocks_contact" USING btree ("_path");
  CREATE INDEX "pages_blocks_contact_locale_idx" ON "pages_blocks_contact" USING btree ("_locale");
  CREATE INDEX "pages_blocks_rich_text_order_idx" ON "pages_blocks_rich_text" USING btree ("_order");
  CREATE INDEX "pages_blocks_rich_text_parent_id_idx" ON "pages_blocks_rich_text" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_rich_text_path_idx" ON "pages_blocks_rich_text" USING btree ("_path");
  CREATE INDEX "pages_blocks_rich_text_locale_idx" ON "pages_blocks_rich_text" USING btree ("_locale");
  CREATE INDEX "pages_blocks_product_hero_key_benefits_order_idx" ON "pages_blocks_product_hero_key_benefits" USING btree ("_order");
  CREATE INDEX "pages_blocks_product_hero_key_benefits_parent_id_idx" ON "pages_blocks_product_hero_key_benefits" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_product_hero_key_benefits_locale_idx" ON "pages_blocks_product_hero_key_benefits" USING btree ("_locale");
  CREATE INDEX "pages_blocks_product_hero_cta_buttons_order_idx" ON "pages_blocks_product_hero_cta_buttons" USING btree ("_order");
  CREATE INDEX "pages_blocks_product_hero_cta_buttons_parent_id_idx" ON "pages_blocks_product_hero_cta_buttons" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_product_hero_cta_buttons_locale_idx" ON "pages_blocks_product_hero_cta_buttons" USING btree ("_locale");
  CREATE INDEX "pages_blocks_product_hero_cta_buttons_page_idx" ON "pages_blocks_product_hero_cta_buttons" USING btree ("page_id");
  CREATE INDEX "pages_blocks_product_hero_cta_buttons_post_idx" ON "pages_blocks_product_hero_cta_buttons" USING btree ("post_id");
  CREATE INDEX "pages_blocks_product_hero_order_idx" ON "pages_blocks_product_hero" USING btree ("_order");
  CREATE INDEX "pages_blocks_product_hero_parent_id_idx" ON "pages_blocks_product_hero" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_product_hero_path_idx" ON "pages_blocks_product_hero" USING btree ("_path");
  CREATE INDEX "pages_blocks_product_hero_locale_idx" ON "pages_blocks_product_hero" USING btree ("_locale");
  CREATE INDEX "pages_blocks_product_hero_background_image_idx" ON "pages_blocks_product_hero" USING btree ("background_image_id");
  CREATE INDEX "pages_blocks_key_features_features_order_idx" ON "pages_blocks_key_features_features" USING btree ("_order");
  CREATE INDEX "pages_blocks_key_features_features_parent_id_idx" ON "pages_blocks_key_features_features" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_key_features_features_locale_idx" ON "pages_blocks_key_features_features" USING btree ("_locale");
  CREATE INDEX "pages_blocks_key_features_order_idx" ON "pages_blocks_key_features" USING btree ("_order");
  CREATE INDEX "pages_blocks_key_features_parent_id_idx" ON "pages_blocks_key_features" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_key_features_path_idx" ON "pages_blocks_key_features" USING btree ("_path");
  CREATE INDEX "pages_blocks_key_features_locale_idx" ON "pages_blocks_key_features" USING btree ("_locale");
  CREATE INDEX "pages_blocks_product_gallery_images_order_idx" ON "pages_blocks_product_gallery_images" USING btree ("_order");
  CREATE INDEX "pages_blocks_product_gallery_images_parent_id_idx" ON "pages_blocks_product_gallery_images" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_product_gallery_images_locale_idx" ON "pages_blocks_product_gallery_images" USING btree ("_locale");
  CREATE INDEX "pages_blocks_product_gallery_images_image_idx" ON "pages_blocks_product_gallery_images" USING btree ("image_id");
  CREATE INDEX "pages_blocks_product_gallery_order_idx" ON "pages_blocks_product_gallery" USING btree ("_order");
  CREATE INDEX "pages_blocks_product_gallery_parent_id_idx" ON "pages_blocks_product_gallery" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_product_gallery_path_idx" ON "pages_blocks_product_gallery" USING btree ("_path");
  CREATE INDEX "pages_blocks_product_gallery_locale_idx" ON "pages_blocks_product_gallery" USING btree ("_locale");
  CREATE INDEX "pages_blocks_specifications_specifications_items_order_idx" ON "pages_blocks_specifications_specifications_items" USING btree ("_order");
  CREATE INDEX "pages_blocks_specifications_specifications_items_parent_id_idx" ON "pages_blocks_specifications_specifications_items" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_specifications_specifications_items_locale_idx" ON "pages_blocks_specifications_specifications_items" USING btree ("_locale");
  CREATE INDEX "pages_blocks_specifications_specifications_order_idx" ON "pages_blocks_specifications_specifications" USING btree ("_order");
  CREATE INDEX "pages_blocks_specifications_specifications_parent_id_idx" ON "pages_blocks_specifications_specifications" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_specifications_specifications_locale_idx" ON "pages_blocks_specifications_specifications" USING btree ("_locale");
  CREATE INDEX "pages_blocks_specifications_certification_badges_order_idx" ON "pages_blocks_specifications_certification_badges" USING btree ("_order");
  CREATE INDEX "pages_blocks_specifications_certification_badges_parent_id_idx" ON "pages_blocks_specifications_certification_badges" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_specifications_certification_badges_locale_idx" ON "pages_blocks_specifications_certification_badges" USING btree ("_locale");
  CREATE INDEX "pages_blocks_specifications_additional_info_details_order_idx" ON "pages_blocks_specifications_additional_info_details" USING btree ("_order");
  CREATE INDEX "pages_blocks_specifications_additional_info_details_parent_id_idx" ON "pages_blocks_specifications_additional_info_details" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_specifications_additional_info_details_locale_idx" ON "pages_blocks_specifications_additional_info_details" USING btree ("_locale");
  CREATE INDEX "pages_blocks_specifications_order_idx" ON "pages_blocks_specifications" USING btree ("_order");
  CREATE INDEX "pages_blocks_specifications_parent_id_idx" ON "pages_blocks_specifications" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_specifications_path_idx" ON "pages_blocks_specifications" USING btree ("_path");
  CREATE INDEX "pages_blocks_specifications_locale_idx" ON "pages_blocks_specifications" USING btree ("_locale");
  CREATE INDEX "pages_blocks_applications_applications_details_order_idx" ON "pages_blocks_applications_applications_details" USING btree ("_order");
  CREATE INDEX "pages_blocks_applications_applications_details_parent_id_idx" ON "pages_blocks_applications_applications_details" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_applications_applications_details_locale_idx" ON "pages_blocks_applications_applications_details" USING btree ("_locale");
  CREATE INDEX "pages_blocks_applications_applications_order_idx" ON "pages_blocks_applications_applications" USING btree ("_order");
  CREATE INDEX "pages_blocks_applications_applications_parent_id_idx" ON "pages_blocks_applications_applications" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_applications_applications_locale_idx" ON "pages_blocks_applications_applications" USING btree ("_locale");
  CREATE INDEX "pages_blocks_applications_stats_order_idx" ON "pages_blocks_applications_stats" USING btree ("_order");
  CREATE INDEX "pages_blocks_applications_stats_parent_id_idx" ON "pages_blocks_applications_stats" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_applications_stats_locale_idx" ON "pages_blocks_applications_stats" USING btree ("_locale");
  CREATE INDEX "pages_blocks_applications_case_study_stats_order_idx" ON "pages_blocks_applications_case_study_stats" USING btree ("_order");
  CREATE INDEX "pages_blocks_applications_case_study_stats_parent_id_idx" ON "pages_blocks_applications_case_study_stats" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_applications_case_study_stats_locale_idx" ON "pages_blocks_applications_case_study_stats" USING btree ("_locale");
  CREATE INDEX "pages_blocks_applications_order_idx" ON "pages_blocks_applications" USING btree ("_order");
  CREATE INDEX "pages_blocks_applications_parent_id_idx" ON "pages_blocks_applications" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_applications_path_idx" ON "pages_blocks_applications" USING btree ("_path");
  CREATE INDEX "pages_blocks_applications_locale_idx" ON "pages_blocks_applications" USING btree ("_locale");
  CREATE INDEX "pages_blocks_applications_case_study_case_study_image_idx" ON "pages_blocks_applications" USING btree ("case_study_image_id");
  CREATE INDEX "pages_blocks_technical_overview_process_steps_order_idx" ON "pages_blocks_technical_overview_process_steps" USING btree ("_order");
  CREATE INDEX "pages_blocks_technical_overview_process_steps_parent_id_idx" ON "pages_blocks_technical_overview_process_steps" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_technical_overview_process_steps_locale_idx" ON "pages_blocks_technical_overview_process_steps" USING btree ("_locale");
  CREATE INDEX "pages_blocks_technical_overview_technical_benefits_order_idx" ON "pages_blocks_technical_overview_technical_benefits" USING btree ("_order");
  CREATE INDEX "pages_blocks_technical_overview_technical_benefits_parent_id_idx" ON "pages_blocks_technical_overview_technical_benefits" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_technical_overview_technical_benefits_locale_idx" ON "pages_blocks_technical_overview_technical_benefits" USING btree ("_locale");
  CREATE INDEX "pages_blocks_technical_overview_order_idx" ON "pages_blocks_technical_overview" USING btree ("_order");
  CREATE INDEX "pages_blocks_technical_overview_parent_id_idx" ON "pages_blocks_technical_overview" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_technical_overview_path_idx" ON "pages_blocks_technical_overview" USING btree ("_path");
  CREATE INDEX "pages_blocks_technical_overview_locale_idx" ON "pages_blocks_technical_overview" USING btree ("_locale");
  CREATE INDEX "pages_blocks_technical_overview_technical_image_idx" ON "pages_blocks_technical_overview" USING btree ("technical_image_id");
  CREATE INDEX "pages_blocks_benefits_comparison_benefits_order_idx" ON "pages_blocks_benefits_comparison_benefits" USING btree ("_order");
  CREATE INDEX "pages_blocks_benefits_comparison_benefits_parent_id_idx" ON "pages_blocks_benefits_comparison_benefits" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_benefits_comparison_benefits_locale_idx" ON "pages_blocks_benefits_comparison_benefits" USING btree ("_locale");
  CREATE INDEX "pages_blocks_benefits_comparison_summary_cards_order_idx" ON "pages_blocks_benefits_comparison_summary_cards" USING btree ("_order");
  CREATE INDEX "pages_blocks_benefits_comparison_summary_cards_parent_id_idx" ON "pages_blocks_benefits_comparison_summary_cards" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_benefits_comparison_summary_cards_locale_idx" ON "pages_blocks_benefits_comparison_summary_cards" USING btree ("_locale");
  CREATE INDEX "pages_blocks_benefits_comparison_order_idx" ON "pages_blocks_benefits_comparison" USING btree ("_order");
  CREATE INDEX "pages_blocks_benefits_comparison_parent_id_idx" ON "pages_blocks_benefits_comparison" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_benefits_comparison_path_idx" ON "pages_blocks_benefits_comparison" USING btree ("_path");
  CREATE INDEX "pages_blocks_benefits_comparison_locale_idx" ON "pages_blocks_benefits_comparison" USING btree ("_locale");
  CREATE INDEX "pages_blocks_product_c_t_a_stats_order_idx" ON "pages_blocks_product_c_t_a_stats" USING btree ("_order");
  CREATE INDEX "pages_blocks_product_c_t_a_stats_parent_id_idx" ON "pages_blocks_product_c_t_a_stats" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_product_c_t_a_stats_locale_idx" ON "pages_blocks_product_c_t_a_stats" USING btree ("_locale");
  CREATE INDEX "pages_blocks_product_c_t_a_why_us_points_order_idx" ON "pages_blocks_product_c_t_a_why_us_points" USING btree ("_order");
  CREATE INDEX "pages_blocks_product_c_t_a_why_us_points_parent_id_idx" ON "pages_blocks_product_c_t_a_why_us_points" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_product_c_t_a_why_us_points_locale_idx" ON "pages_blocks_product_c_t_a_why_us_points" USING btree ("_locale");
  CREATE INDEX "pages_blocks_product_c_t_a_application_options_order_idx" ON "pages_blocks_product_c_t_a_application_options" USING btree ("_order");
  CREATE INDEX "pages_blocks_product_c_t_a_application_options_parent_id_idx" ON "pages_blocks_product_c_t_a_application_options" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_product_c_t_a_application_options_locale_idx" ON "pages_blocks_product_c_t_a_application_options" USING btree ("_locale");
  CREATE INDEX "pages_blocks_product_c_t_a_order_idx" ON "pages_blocks_product_c_t_a" USING btree ("_order");
  CREATE INDEX "pages_blocks_product_c_t_a_parent_id_idx" ON "pages_blocks_product_c_t_a" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_product_c_t_a_path_idx" ON "pages_blocks_product_c_t_a" USING btree ("_path");
  CREATE INDEX "pages_blocks_product_c_t_a_locale_idx" ON "pages_blocks_product_c_t_a" USING btree ("_locale");
  CREATE INDEX "pages_blocks_product_c_t_a_hero_image_idx" ON "pages_blocks_product_c_t_a" USING btree ("hero_image_id");
  CREATE INDEX "pages_blocks_product_resources_resources_order_idx" ON "pages_blocks_product_resources_resources" USING btree ("_order");
  CREATE INDEX "pages_blocks_product_resources_resources_parent_id_idx" ON "pages_blocks_product_resources_resources" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_product_resources_resources_locale_idx" ON "pages_blocks_product_resources_resources" USING btree ("_locale");
  CREATE INDEX "pages_blocks_product_resources_quick_access_items_order_idx" ON "pages_blocks_product_resources_quick_access_items" USING btree ("_order");
  CREATE INDEX "pages_blocks_product_resources_quick_access_items_parent_id_idx" ON "pages_blocks_product_resources_quick_access_items" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_product_resources_quick_access_items_locale_idx" ON "pages_blocks_product_resources_quick_access_items" USING btree ("_locale");
  CREATE INDEX "pages_blocks_product_resources_order_idx" ON "pages_blocks_product_resources" USING btree ("_order");
  CREATE INDEX "pages_blocks_product_resources_parent_id_idx" ON "pages_blocks_product_resources" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_product_resources_path_idx" ON "pages_blocks_product_resources" USING btree ("_path");
  CREATE INDEX "pages_blocks_product_resources_locale_idx" ON "pages_blocks_product_resources" USING btree ("_locale");
  CREATE INDEX "pages_blocks_contact_hero_quick_contact_methods_order_idx" ON "pages_blocks_contact_hero_quick_contact_methods" USING btree ("_order");
  CREATE INDEX "pages_blocks_contact_hero_quick_contact_methods_parent_id_idx" ON "pages_blocks_contact_hero_quick_contact_methods" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_contact_hero_quick_contact_methods_locale_idx" ON "pages_blocks_contact_hero_quick_contact_methods" USING btree ("_locale");
  CREATE INDEX "pages_blocks_contact_hero_order_idx" ON "pages_blocks_contact_hero" USING btree ("_order");
  CREATE INDEX "pages_blocks_contact_hero_parent_id_idx" ON "pages_blocks_contact_hero" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_contact_hero_path_idx" ON "pages_blocks_contact_hero" USING btree ("_path");
  CREATE INDEX "pages_blocks_contact_hero_locale_idx" ON "pages_blocks_contact_hero" USING btree ("_locale");
  CREATE INDEX "pages_blocks_contact_form_order_idx" ON "pages_blocks_contact_form" USING btree ("_order");
  CREATE INDEX "pages_blocks_contact_form_parent_id_idx" ON "pages_blocks_contact_form" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_contact_form_path_idx" ON "pages_blocks_contact_form" USING btree ("_path");
  CREATE INDEX "pages_blocks_contact_form_locale_idx" ON "pages_blocks_contact_form" USING btree ("_locale");
  CREATE INDEX "pages_blocks_contact_info_contact_methods_order_idx" ON "pages_blocks_contact_info_contact_methods" USING btree ("_order");
  CREATE INDEX "pages_blocks_contact_info_contact_methods_parent_id_idx" ON "pages_blocks_contact_info_contact_methods" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_contact_info_contact_methods_locale_idx" ON "pages_blocks_contact_info_contact_methods" USING btree ("_locale");
  CREATE INDEX "pages_blocks_contact_info_order_idx" ON "pages_blocks_contact_info" USING btree ("_order");
  CREATE INDEX "pages_blocks_contact_info_parent_id_idx" ON "pages_blocks_contact_info" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_contact_info_path_idx" ON "pages_blocks_contact_info" USING btree ("_path");
  CREATE INDEX "pages_blocks_contact_info_locale_idx" ON "pages_blocks_contact_info" USING btree ("_locale");
  CREATE INDEX "pages_blocks_contact_location_order_idx" ON "pages_blocks_contact_location" USING btree ("_order");
  CREATE INDEX "pages_blocks_contact_location_parent_id_idx" ON "pages_blocks_contact_location" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_contact_location_path_idx" ON "pages_blocks_contact_location" USING btree ("_path");
  CREATE INDEX "pages_blocks_contact_location_locale_idx" ON "pages_blocks_contact_location" USING btree ("_locale");
  CREATE INDEX "pages_blocks_contact_f_a_q_faqs_order_idx" ON "pages_blocks_contact_f_a_q_faqs" USING btree ("_order");
  CREATE INDEX "pages_blocks_contact_f_a_q_faqs_parent_id_idx" ON "pages_blocks_contact_f_a_q_faqs" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_contact_f_a_q_faqs_locale_idx" ON "pages_blocks_contact_f_a_q_faqs" USING btree ("_locale");
  CREATE INDEX "pages_blocks_contact_f_a_q_order_idx" ON "pages_blocks_contact_f_a_q" USING btree ("_order");
  CREATE INDEX "pages_blocks_contact_f_a_q_parent_id_idx" ON "pages_blocks_contact_f_a_q" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_contact_f_a_q_path_idx" ON "pages_blocks_contact_f_a_q" USING btree ("_path");
  CREATE INDEX "pages_blocks_contact_f_a_q_locale_idx" ON "pages_blocks_contact_f_a_q" USING btree ("_locale");
  CREATE INDEX "pages_blocks_universal_hero_benefits_order_idx" ON "pages_blocks_universal_hero_benefits" USING btree ("_order");
  CREATE INDEX "pages_blocks_universal_hero_benefits_parent_id_idx" ON "pages_blocks_universal_hero_benefits" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_universal_hero_benefits_locale_idx" ON "pages_blocks_universal_hero_benefits" USING btree ("_locale");
  CREATE INDEX "pages_blocks_universal_hero_trust_indicators_order_idx" ON "pages_blocks_universal_hero_trust_indicators" USING btree ("_order");
  CREATE INDEX "pages_blocks_universal_hero_trust_indicators_parent_id_idx" ON "pages_blocks_universal_hero_trust_indicators" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_universal_hero_trust_indicators_locale_idx" ON "pages_blocks_universal_hero_trust_indicators" USING btree ("_locale");
  CREATE INDEX "pages_blocks_universal_hero_stats_order_idx" ON "pages_blocks_universal_hero_stats" USING btree ("_order");
  CREATE INDEX "pages_blocks_universal_hero_stats_parent_id_idx" ON "pages_blocks_universal_hero_stats" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_universal_hero_stats_locale_idx" ON "pages_blocks_universal_hero_stats" USING btree ("_locale");
  CREATE INDEX "pages_blocks_universal_hero_contact_methods_order_idx" ON "pages_blocks_universal_hero_contact_methods" USING btree ("_order");
  CREATE INDEX "pages_blocks_universal_hero_contact_methods_parent_id_idx" ON "pages_blocks_universal_hero_contact_methods" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_universal_hero_contact_methods_locale_idx" ON "pages_blocks_universal_hero_contact_methods" USING btree ("_locale");
  CREATE INDEX "pages_blocks_universal_hero_contact_methods_link_link_page_idx" ON "pages_blocks_universal_hero_contact_methods" USING btree ("link_page_id");
  CREATE INDEX "pages_blocks_universal_hero_contact_methods_link_link_post_idx" ON "pages_blocks_universal_hero_contact_methods" USING btree ("link_post_id");
  CREATE INDEX "pages_blocks_universal_hero_order_idx" ON "pages_blocks_universal_hero" USING btree ("_order");
  CREATE INDEX "pages_blocks_universal_hero_parent_id_idx" ON "pages_blocks_universal_hero" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_universal_hero_path_idx" ON "pages_blocks_universal_hero" USING btree ("_path");
  CREATE INDEX "pages_blocks_universal_hero_locale_idx" ON "pages_blocks_universal_hero" USING btree ("_locale");
  CREATE INDEX "pages_blocks_universal_hero_primary_c_t_a_primary_c_t_a_page_idx" ON "pages_blocks_universal_hero" USING btree ("primary_c_t_a_page_id");
  CREATE INDEX "pages_blocks_universal_hero_primary_c_t_a_primary_c_t_a_post_idx" ON "pages_blocks_universal_hero" USING btree ("primary_c_t_a_post_id");
  CREATE INDEX "pages_blocks_universal_hero_secondary_c_t_a_secondary_c_t_a_page_idx" ON "pages_blocks_universal_hero" USING btree ("secondary_c_t_a_page_id");
  CREATE INDEX "pages_blocks_universal_hero_secondary_c_t_a_secondary_c_t_a_post_idx" ON "pages_blocks_universal_hero" USING btree ("secondary_c_t_a_post_id");
  CREATE INDEX "pages_blocks_universal_c_t_a_benefits_order_idx" ON "pages_blocks_universal_c_t_a_benefits" USING btree ("_order");
  CREATE INDEX "pages_blocks_universal_c_t_a_benefits_parent_id_idx" ON "pages_blocks_universal_c_t_a_benefits" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_universal_c_t_a_benefits_locale_idx" ON "pages_blocks_universal_c_t_a_benefits" USING btree ("_locale");
  CREATE INDEX "pages_blocks_universal_c_t_a_stats_order_idx" ON "pages_blocks_universal_c_t_a_stats" USING btree ("_order");
  CREATE INDEX "pages_blocks_universal_c_t_a_stats_parent_id_idx" ON "pages_blocks_universal_c_t_a_stats" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_universal_c_t_a_stats_locale_idx" ON "pages_blocks_universal_c_t_a_stats" USING btree ("_locale");
  CREATE INDEX "pages_blocks_universal_c_t_a_order_idx" ON "pages_blocks_universal_c_t_a" USING btree ("_order");
  CREATE INDEX "pages_blocks_universal_c_t_a_parent_id_idx" ON "pages_blocks_universal_c_t_a" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_universal_c_t_a_path_idx" ON "pages_blocks_universal_c_t_a" USING btree ("_path");
  CREATE INDEX "pages_blocks_universal_c_t_a_locale_idx" ON "pages_blocks_universal_c_t_a" USING btree ("_locale");
  CREATE INDEX "pages_blocks_universal_c_t_a_primary_c_t_a_primary_c_t_a_page_idx" ON "pages_blocks_universal_c_t_a" USING btree ("primary_c_t_a_page_id");
  CREATE INDEX "pages_blocks_universal_c_t_a_primary_c_t_a_primary_c_t_a_post_idx" ON "pages_blocks_universal_c_t_a" USING btree ("primary_c_t_a_post_id");
  CREATE INDEX "pages_blocks_universal_c_t_a_secondary_c_t_a_secondary_c_t_a_page_idx" ON "pages_blocks_universal_c_t_a" USING btree ("secondary_c_t_a_page_id");
  CREATE INDEX "pages_blocks_universal_c_t_a_secondary_c_t_a_secondary_c_t_a_post_idx" ON "pages_blocks_universal_c_t_a" USING btree ("secondary_c_t_a_post_id");
  CREATE INDEX "pages_blocks_feature_grid_features_details_order_idx" ON "pages_blocks_feature_grid_features_details" USING btree ("_order");
  CREATE INDEX "pages_blocks_feature_grid_features_details_parent_id_idx" ON "pages_blocks_feature_grid_features_details" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_feature_grid_features_details_locale_idx" ON "pages_blocks_feature_grid_features_details" USING btree ("_locale");
  CREATE INDEX "pages_blocks_feature_grid_features_order_idx" ON "pages_blocks_feature_grid_features" USING btree ("_order");
  CREATE INDEX "pages_blocks_feature_grid_features_parent_id_idx" ON "pages_blocks_feature_grid_features" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_feature_grid_features_locale_idx" ON "pages_blocks_feature_grid_features" USING btree ("_locale");
  CREATE INDEX "pages_blocks_feature_grid_features_link_link_page_idx" ON "pages_blocks_feature_grid_features" USING btree ("link_page_id");
  CREATE INDEX "pages_blocks_feature_grid_features_link_link_post_idx" ON "pages_blocks_feature_grid_features" USING btree ("link_post_id");
  CREATE INDEX "pages_blocks_feature_grid_order_idx" ON "pages_blocks_feature_grid" USING btree ("_order");
  CREATE INDEX "pages_blocks_feature_grid_parent_id_idx" ON "pages_blocks_feature_grid" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_feature_grid_path_idx" ON "pages_blocks_feature_grid" USING btree ("_path");
  CREATE INDEX "pages_blocks_feature_grid_locale_idx" ON "pages_blocks_feature_grid" USING btree ("_locale");
  CREATE INDEX "pages_blocks_content_grid_items_applications_order_idx" ON "pages_blocks_content_grid_items_applications" USING btree ("_order");
  CREATE INDEX "pages_blocks_content_grid_items_applications_parent_id_idx" ON "pages_blocks_content_grid_items_applications" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_content_grid_items_applications_locale_idx" ON "pages_blocks_content_grid_items_applications" USING btree ("_locale");
  CREATE INDEX "pages_blocks_content_grid_items_order_idx" ON "pages_blocks_content_grid_items" USING btree ("_order");
  CREATE INDEX "pages_blocks_content_grid_items_parent_id_idx" ON "pages_blocks_content_grid_items" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_content_grid_items_locale_idx" ON "pages_blocks_content_grid_items" USING btree ("_locale");
  CREATE INDEX "pages_blocks_content_grid_items_link_link_page_idx" ON "pages_blocks_content_grid_items" USING btree ("link_page_id");
  CREATE INDEX "pages_blocks_content_grid_items_link_link_post_idx" ON "pages_blocks_content_grid_items" USING btree ("link_post_id");
  CREATE INDEX "pages_blocks_content_grid_order_idx" ON "pages_blocks_content_grid" USING btree ("_order");
  CREATE INDEX "pages_blocks_content_grid_parent_id_idx" ON "pages_blocks_content_grid" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_content_grid_path_idx" ON "pages_blocks_content_grid" USING btree ("_path");
  CREATE INDEX "pages_blocks_content_grid_locale_idx" ON "pages_blocks_content_grid" USING btree ("_locale");
  CREATE INDEX "pages_blocks_stats_section_stats_order_idx" ON "pages_blocks_stats_section_stats" USING btree ("_order");
  CREATE INDEX "pages_blocks_stats_section_stats_parent_id_idx" ON "pages_blocks_stats_section_stats" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_stats_section_stats_locale_idx" ON "pages_blocks_stats_section_stats" USING btree ("_locale");
  CREATE INDEX "pages_blocks_stats_section_order_idx" ON "pages_blocks_stats_section" USING btree ("_order");
  CREATE INDEX "pages_blocks_stats_section_parent_id_idx" ON "pages_blocks_stats_section" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_stats_section_path_idx" ON "pages_blocks_stats_section" USING btree ("_path");
  CREATE INDEX "pages_blocks_stats_section_locale_idx" ON "pages_blocks_stats_section" USING btree ("_locale");
  CREATE INDEX "pages_blocks_process_steps_steps_details_order_idx" ON "pages_blocks_process_steps_steps_details" USING btree ("_order");
  CREATE INDEX "pages_blocks_process_steps_steps_details_parent_id_idx" ON "pages_blocks_process_steps_steps_details" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_process_steps_steps_details_locale_idx" ON "pages_blocks_process_steps_steps_details" USING btree ("_locale");
  CREATE INDEX "pages_blocks_process_steps_steps_order_idx" ON "pages_blocks_process_steps_steps" USING btree ("_order");
  CREATE INDEX "pages_blocks_process_steps_steps_parent_id_idx" ON "pages_blocks_process_steps_steps" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_process_steps_steps_locale_idx" ON "pages_blocks_process_steps_steps" USING btree ("_locale");
  CREATE INDEX "pages_blocks_process_steps_order_idx" ON "pages_blocks_process_steps" USING btree ("_order");
  CREATE INDEX "pages_blocks_process_steps_parent_id_idx" ON "pages_blocks_process_steps" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_process_steps_path_idx" ON "pages_blocks_process_steps" USING btree ("_path");
  CREATE INDEX "pages_blocks_process_steps_locale_idx" ON "pages_blocks_process_steps" USING btree ("_locale");
  CREATE INDEX "pages_blocks_content_cards_cards_tags_order_idx" ON "pages_blocks_content_cards_cards_tags" USING btree ("_order");
  CREATE INDEX "pages_blocks_content_cards_cards_tags_parent_id_idx" ON "pages_blocks_content_cards_cards_tags" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_content_cards_cards_tags_locale_idx" ON "pages_blocks_content_cards_cards_tags" USING btree ("_locale");
  CREATE INDEX "pages_blocks_content_cards_cards_order_idx" ON "pages_blocks_content_cards_cards" USING btree ("_order");
  CREATE INDEX "pages_blocks_content_cards_cards_parent_id_idx" ON "pages_blocks_content_cards_cards" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_content_cards_cards_locale_idx" ON "pages_blocks_content_cards_cards" USING btree ("_locale");
  CREATE INDEX "pages_blocks_content_cards_cards_link_link_page_idx" ON "pages_blocks_content_cards_cards" USING btree ("link_page_id");
  CREATE INDEX "pages_blocks_content_cards_cards_link_link_post_idx" ON "pages_blocks_content_cards_cards" USING btree ("link_post_id");
  CREATE INDEX "pages_blocks_content_cards_order_idx" ON "pages_blocks_content_cards" USING btree ("_order");
  CREATE INDEX "pages_blocks_content_cards_parent_id_idx" ON "pages_blocks_content_cards" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_content_cards_path_idx" ON "pages_blocks_content_cards" USING btree ("_path");
  CREATE INDEX "pages_blocks_content_cards_locale_idx" ON "pages_blocks_content_cards" USING btree ("_locale");
  CREATE INDEX "pages_blocks_contact_section_benefits_order_idx" ON "pages_blocks_contact_section_benefits" USING btree ("_order");
  CREATE INDEX "pages_blocks_contact_section_benefits_parent_id_idx" ON "pages_blocks_contact_section_benefits" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_contact_section_benefits_locale_idx" ON "pages_blocks_contact_section_benefits" USING btree ("_locale");
  CREATE INDEX "pages_blocks_contact_section_order_idx" ON "pages_blocks_contact_section" USING btree ("_order");
  CREATE INDEX "pages_blocks_contact_section_parent_id_idx" ON "pages_blocks_contact_section" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_contact_section_path_idx" ON "pages_blocks_contact_section" USING btree ("_path");
  CREATE INDEX "pages_blocks_contact_section_locale_idx" ON "pages_blocks_contact_section" USING btree ("_locale");
  CREATE INDEX "pages_blocks_comparison_table_items_order_idx" ON "pages_blocks_comparison_table_items" USING btree ("_order");
  CREATE INDEX "pages_blocks_comparison_table_items_parent_id_idx" ON "pages_blocks_comparison_table_items" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_comparison_table_items_locale_idx" ON "pages_blocks_comparison_table_items" USING btree ("_locale");
  CREATE INDEX "pages_blocks_comparison_table_order_idx" ON "pages_blocks_comparison_table" USING btree ("_order");
  CREATE INDEX "pages_blocks_comparison_table_parent_id_idx" ON "pages_blocks_comparison_table" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_comparison_table_path_idx" ON "pages_blocks_comparison_table" USING btree ("_path");
  CREATE INDEX "pages_blocks_comparison_table_locale_idx" ON "pages_blocks_comparison_table" USING btree ("_locale");
  CREATE INDEX "pages_blocks_simple_page_breadcrumbs_order_idx" ON "pages_blocks_simple_page_breadcrumbs" USING btree ("_order");
  CREATE INDEX "pages_blocks_simple_page_breadcrumbs_parent_id_idx" ON "pages_blocks_simple_page_breadcrumbs" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_simple_page_breadcrumbs_locale_idx" ON "pages_blocks_simple_page_breadcrumbs" USING btree ("_locale");
  CREATE INDEX "pages_blocks_simple_page_breadcrumbs_link_link_page_idx" ON "pages_blocks_simple_page_breadcrumbs" USING btree ("link_page_id");
  CREATE INDEX "pages_blocks_simple_page_breadcrumbs_link_link_post_idx" ON "pages_blocks_simple_page_breadcrumbs" USING btree ("link_post_id");
  CREATE INDEX "pages_blocks_simple_page_links_order_idx" ON "pages_blocks_simple_page_links" USING btree ("_order");
  CREATE INDEX "pages_blocks_simple_page_links_parent_id_idx" ON "pages_blocks_simple_page_links" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_simple_page_links_locale_idx" ON "pages_blocks_simple_page_links" USING btree ("_locale");
  CREATE INDEX "pages_blocks_simple_page_links_link_link_page_idx" ON "pages_blocks_simple_page_links" USING btree ("link_page_id");
  CREATE INDEX "pages_blocks_simple_page_links_link_link_post_idx" ON "pages_blocks_simple_page_links" USING btree ("link_post_id");
  CREATE INDEX "pages_blocks_simple_page_order_idx" ON "pages_blocks_simple_page" USING btree ("_order");
  CREATE INDEX "pages_blocks_simple_page_parent_id_idx" ON "pages_blocks_simple_page" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_simple_page_path_idx" ON "pages_blocks_simple_page" USING btree ("_path");
  CREATE INDEX "pages_blocks_simple_page_locale_idx" ON "pages_blocks_simple_page" USING btree ("_locale");
  CREATE INDEX "pages_blocks_brand_showcase_brands_order_idx" ON "pages_blocks_brand_showcase_brands" USING btree ("_order");
  CREATE INDEX "pages_blocks_brand_showcase_brands_parent_id_idx" ON "pages_blocks_brand_showcase_brands" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_brand_showcase_brands_locale_idx" ON "pages_blocks_brand_showcase_brands" USING btree ("_locale");
  CREATE INDEX "pages_blocks_brand_showcase_brands_logo_idx" ON "pages_blocks_brand_showcase_brands" USING btree ("logo_id");
  CREATE INDEX "pages_blocks_brand_showcase_order_idx" ON "pages_blocks_brand_showcase" USING btree ("_order");
  CREATE INDEX "pages_blocks_brand_showcase_parent_id_idx" ON "pages_blocks_brand_showcase" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_brand_showcase_path_idx" ON "pages_blocks_brand_showcase" USING btree ("_path");
  CREATE INDEX "pages_blocks_brand_showcase_locale_idx" ON "pages_blocks_brand_showcase" USING btree ("_locale");
  CREATE INDEX "pages_blocks_technical_content_process_steps_order_idx" ON "pages_blocks_technical_content_process_steps" USING btree ("_order");
  CREATE INDEX "pages_blocks_technical_content_process_steps_parent_id_idx" ON "pages_blocks_technical_content_process_steps" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_technical_content_process_steps_locale_idx" ON "pages_blocks_technical_content_process_steps" USING btree ("_locale");
  CREATE INDEX "pages_blocks_technical_content_specifications_items_order_idx" ON "pages_blocks_technical_content_specifications_items" USING btree ("_order");
  CREATE INDEX "pages_blocks_technical_content_specifications_items_parent_id_idx" ON "pages_blocks_technical_content_specifications_items" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_technical_content_specifications_items_locale_idx" ON "pages_blocks_technical_content_specifications_items" USING btree ("_locale");
  CREATE INDEX "pages_blocks_technical_content_specifications_order_idx" ON "pages_blocks_technical_content_specifications" USING btree ("_order");
  CREATE INDEX "pages_blocks_technical_content_specifications_parent_id_idx" ON "pages_blocks_technical_content_specifications" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_technical_content_specifications_locale_idx" ON "pages_blocks_technical_content_specifications" USING btree ("_locale");
  CREATE INDEX "pages_blocks_technical_content_order_idx" ON "pages_blocks_technical_content" USING btree ("_order");
  CREATE INDEX "pages_blocks_technical_content_parent_id_idx" ON "pages_blocks_technical_content" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_technical_content_path_idx" ON "pages_blocks_technical_content" USING btree ("_path");
  CREATE INDEX "pages_blocks_technical_content_locale_idx" ON "pages_blocks_technical_content" USING btree ("_locale");
  CREATE INDEX "pages_blocks_resource_gallery_resources_order_idx" ON "pages_blocks_resource_gallery_resources" USING btree ("_order");
  CREATE INDEX "pages_blocks_resource_gallery_resources_parent_id_idx" ON "pages_blocks_resource_gallery_resources" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_resource_gallery_resources_locale_idx" ON "pages_blocks_resource_gallery_resources" USING btree ("_locale");
  CREATE INDEX "pages_blocks_resource_gallery_gallery_images_order_idx" ON "pages_blocks_resource_gallery_gallery_images" USING btree ("_order");
  CREATE INDEX "pages_blocks_resource_gallery_gallery_images_parent_id_idx" ON "pages_blocks_resource_gallery_gallery_images" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_resource_gallery_gallery_images_locale_idx" ON "pages_blocks_resource_gallery_gallery_images" USING btree ("_locale");
  CREATE INDEX "pages_blocks_resource_gallery_gallery_images_image_idx" ON "pages_blocks_resource_gallery_gallery_images" USING btree ("image_id");
  CREATE INDEX "pages_blocks_resource_gallery_order_idx" ON "pages_blocks_resource_gallery" USING btree ("_order");
  CREATE INDEX "pages_blocks_resource_gallery_parent_id_idx" ON "pages_blocks_resource_gallery" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_resource_gallery_path_idx" ON "pages_blocks_resource_gallery" USING btree ("_path");
  CREATE INDEX "pages_blocks_resource_gallery_locale_idx" ON "pages_blocks_resource_gallery" USING btree ("_locale");
  CREATE UNIQUE INDEX "pages_slug_idx" ON "pages" USING btree ("slug");
  CREATE INDEX "pages_updated_at_idx" ON "pages" USING btree ("updated_at");
  CREATE INDEX "pages_created_at_idx" ON "pages" USING btree ("created_at");
  CREATE INDEX "pages__status_idx" ON "pages" USING btree ("_status");
  CREATE UNIQUE INDEX "pages_locales_locale_parent_id_unique" ON "pages_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_hero_cta_buttons_order_idx" ON "_pages_v_blocks_hero_cta_buttons" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_hero_cta_buttons_parent_id_idx" ON "_pages_v_blocks_hero_cta_buttons" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_hero_cta_buttons_locale_idx" ON "_pages_v_blocks_hero_cta_buttons" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_hero_cta_buttons_page_idx" ON "_pages_v_blocks_hero_cta_buttons" USING btree ("page_id");
  CREATE INDEX "_pages_v_blocks_hero_cta_buttons_post_idx" ON "_pages_v_blocks_hero_cta_buttons" USING btree ("post_id");
  CREATE INDEX "_pages_v_blocks_hero_order_idx" ON "_pages_v_blocks_hero" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_hero_parent_id_idx" ON "_pages_v_blocks_hero" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_hero_path_idx" ON "_pages_v_blocks_hero" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_hero_locale_idx" ON "_pages_v_blocks_hero" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_hero_background_image_idx" ON "_pages_v_blocks_hero" USING btree ("background_image_id");
  CREATE INDEX "_pages_v_blocks_logo_belt_logos_order_idx" ON "_pages_v_blocks_logo_belt_logos" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_logo_belt_logos_parent_id_idx" ON "_pages_v_blocks_logo_belt_logos" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_logo_belt_logos_locale_idx" ON "_pages_v_blocks_logo_belt_logos" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_logo_belt_logos_logo_idx" ON "_pages_v_blocks_logo_belt_logos" USING btree ("logo_id");
  CREATE INDEX "_pages_v_blocks_logo_belt_order_idx" ON "_pages_v_blocks_logo_belt" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_logo_belt_parent_id_idx" ON "_pages_v_blocks_logo_belt" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_logo_belt_path_idx" ON "_pages_v_blocks_logo_belt" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_logo_belt_locale_idx" ON "_pages_v_blocks_logo_belt" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_services_services_features_order_idx" ON "_pages_v_blocks_services_services_features" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_services_services_features_parent_id_idx" ON "_pages_v_blocks_services_services_features" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_services_services_features_locale_idx" ON "_pages_v_blocks_services_services_features" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_services_services_order_idx" ON "_pages_v_blocks_services_services" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_services_services_parent_id_idx" ON "_pages_v_blocks_services_services" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_services_services_locale_idx" ON "_pages_v_blocks_services_services" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_services_services_image_idx" ON "_pages_v_blocks_services_services" USING btree ("image_id");
  CREATE INDEX "_pages_v_blocks_services_services_button_button_page_idx" ON "_pages_v_blocks_services_services" USING btree ("button_page_id");
  CREATE INDEX "_pages_v_blocks_services_order_idx" ON "_pages_v_blocks_services" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_services_parent_id_idx" ON "_pages_v_blocks_services" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_services_path_idx" ON "_pages_v_blocks_services" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_services_locale_idx" ON "_pages_v_blocks_services" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_about_badges_order_idx" ON "_pages_v_blocks_about_badges" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_about_badges_parent_id_idx" ON "_pages_v_blocks_about_badges" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_about_badges_locale_idx" ON "_pages_v_blocks_about_badges" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_about_stats_order_idx" ON "_pages_v_blocks_about_stats" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_about_stats_parent_id_idx" ON "_pages_v_blocks_about_stats" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_about_stats_locale_idx" ON "_pages_v_blocks_about_stats" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_about_process_order_idx" ON "_pages_v_blocks_about_process" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_about_process_parent_id_idx" ON "_pages_v_blocks_about_process" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_about_process_locale_idx" ON "_pages_v_blocks_about_process" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_about_order_idx" ON "_pages_v_blocks_about" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_about_parent_id_idx" ON "_pages_v_blocks_about" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_about_path_idx" ON "_pages_v_blocks_about" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_about_locale_idx" ON "_pages_v_blocks_about" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_about_image_idx" ON "_pages_v_blocks_about" USING btree ("image_id");
  CREATE INDEX "_pages_v_blocks_about_button_button_page_idx" ON "_pages_v_blocks_about" USING btree ("button_page_id");
  CREATE INDEX "_pages_v_blocks_about_button_button_post_idx" ON "_pages_v_blocks_about" USING btree ("button_post_id");
  CREATE INDEX "_pages_v_blocks_why_trust_reasons_order_idx" ON "_pages_v_blocks_why_trust_reasons" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_why_trust_reasons_parent_id_idx" ON "_pages_v_blocks_why_trust_reasons" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_why_trust_reasons_locale_idx" ON "_pages_v_blocks_why_trust_reasons" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_why_trust_pillars_order_idx" ON "_pages_v_blocks_why_trust_pillars" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_why_trust_pillars_parent_id_idx" ON "_pages_v_blocks_why_trust_pillars" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_why_trust_pillars_locale_idx" ON "_pages_v_blocks_why_trust_pillars" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_why_trust_order_idx" ON "_pages_v_blocks_why_trust" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_why_trust_parent_id_idx" ON "_pages_v_blocks_why_trust" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_why_trust_path_idx" ON "_pages_v_blocks_why_trust" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_why_trust_locale_idx" ON "_pages_v_blocks_why_trust" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_why_trust_image_idx" ON "_pages_v_blocks_why_trust" USING btree ("image_id");
  CREATE INDEX "_pages_v_blocks_why_trust_button_button_page_idx" ON "_pages_v_blocks_why_trust" USING btree ("button_page_id");
  CREATE INDEX "_pages_v_blocks_why_trust_button_button_post_idx" ON "_pages_v_blocks_why_trust" USING btree ("button_post_id");
  CREATE INDEX "_pages_v_blocks_projects_projects_stack_order_idx" ON "_pages_v_blocks_projects_projects_stack" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_projects_projects_stack_parent_id_idx" ON "_pages_v_blocks_projects_projects_stack" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_projects_projects_stack_locale_idx" ON "_pages_v_blocks_projects_projects_stack" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_projects_projects_order_idx" ON "_pages_v_blocks_projects_projects" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_projects_projects_parent_id_idx" ON "_pages_v_blocks_projects_projects" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_projects_projects_locale_idx" ON "_pages_v_blocks_projects_projects" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_projects_projects_image_idx" ON "_pages_v_blocks_projects_projects" USING btree ("image_id");
  CREATE INDEX "_pages_v_blocks_projects_order_idx" ON "_pages_v_blocks_projects" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_projects_parent_id_idx" ON "_pages_v_blocks_projects" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_projects_path_idx" ON "_pages_v_blocks_projects" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_projects_locale_idx" ON "_pages_v_blocks_projects" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_projects_button_button_page_idx" ON "_pages_v_blocks_projects" USING btree ("button_page_id");
  CREATE INDEX "_pages_v_blocks_projects_button_button_post_idx" ON "_pages_v_blocks_projects" USING btree ("button_post_id");
  CREATE INDEX "_pages_v_blocks_contact_order_idx" ON "_pages_v_blocks_contact" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_contact_parent_id_idx" ON "_pages_v_blocks_contact" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_contact_path_idx" ON "_pages_v_blocks_contact" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_contact_locale_idx" ON "_pages_v_blocks_contact" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_rich_text_order_idx" ON "_pages_v_blocks_rich_text" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_rich_text_parent_id_idx" ON "_pages_v_blocks_rich_text" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_rich_text_path_idx" ON "_pages_v_blocks_rich_text" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_rich_text_locale_idx" ON "_pages_v_blocks_rich_text" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_product_hero_key_benefits_order_idx" ON "_pages_v_blocks_product_hero_key_benefits" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_product_hero_key_benefits_parent_id_idx" ON "_pages_v_blocks_product_hero_key_benefits" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_product_hero_key_benefits_locale_idx" ON "_pages_v_blocks_product_hero_key_benefits" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_product_hero_cta_buttons_order_idx" ON "_pages_v_blocks_product_hero_cta_buttons" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_product_hero_cta_buttons_parent_id_idx" ON "_pages_v_blocks_product_hero_cta_buttons" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_product_hero_cta_buttons_locale_idx" ON "_pages_v_blocks_product_hero_cta_buttons" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_product_hero_cta_buttons_page_idx" ON "_pages_v_blocks_product_hero_cta_buttons" USING btree ("page_id");
  CREATE INDEX "_pages_v_blocks_product_hero_cta_buttons_post_idx" ON "_pages_v_blocks_product_hero_cta_buttons" USING btree ("post_id");
  CREATE INDEX "_pages_v_blocks_product_hero_order_idx" ON "_pages_v_blocks_product_hero" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_product_hero_parent_id_idx" ON "_pages_v_blocks_product_hero" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_product_hero_path_idx" ON "_pages_v_blocks_product_hero" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_product_hero_locale_idx" ON "_pages_v_blocks_product_hero" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_product_hero_background_image_idx" ON "_pages_v_blocks_product_hero" USING btree ("background_image_id");
  CREATE INDEX "_pages_v_blocks_key_features_features_order_idx" ON "_pages_v_blocks_key_features_features" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_key_features_features_parent_id_idx" ON "_pages_v_blocks_key_features_features" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_key_features_features_locale_idx" ON "_pages_v_blocks_key_features_features" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_key_features_order_idx" ON "_pages_v_blocks_key_features" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_key_features_parent_id_idx" ON "_pages_v_blocks_key_features" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_key_features_path_idx" ON "_pages_v_blocks_key_features" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_key_features_locale_idx" ON "_pages_v_blocks_key_features" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_product_gallery_images_order_idx" ON "_pages_v_blocks_product_gallery_images" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_product_gallery_images_parent_id_idx" ON "_pages_v_blocks_product_gallery_images" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_product_gallery_images_locale_idx" ON "_pages_v_blocks_product_gallery_images" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_product_gallery_images_image_idx" ON "_pages_v_blocks_product_gallery_images" USING btree ("image_id");
  CREATE INDEX "_pages_v_blocks_product_gallery_order_idx" ON "_pages_v_blocks_product_gallery" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_product_gallery_parent_id_idx" ON "_pages_v_blocks_product_gallery" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_product_gallery_path_idx" ON "_pages_v_blocks_product_gallery" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_product_gallery_locale_idx" ON "_pages_v_blocks_product_gallery" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_specifications_specifications_items_order_idx" ON "_pages_v_blocks_specifications_specifications_items" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_specifications_specifications_items_parent_id_idx" ON "_pages_v_blocks_specifications_specifications_items" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_specifications_specifications_items_locale_idx" ON "_pages_v_blocks_specifications_specifications_items" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_specifications_specifications_order_idx" ON "_pages_v_blocks_specifications_specifications" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_specifications_specifications_parent_id_idx" ON "_pages_v_blocks_specifications_specifications" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_specifications_specifications_locale_idx" ON "_pages_v_blocks_specifications_specifications" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_specifications_certification_badges_order_idx" ON "_pages_v_blocks_specifications_certification_badges" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_specifications_certification_badges_parent_id_idx" ON "_pages_v_blocks_specifications_certification_badges" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_specifications_certification_badges_locale_idx" ON "_pages_v_blocks_specifications_certification_badges" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_specifications_additional_info_details_order_idx" ON "_pages_v_blocks_specifications_additional_info_details" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_specifications_additional_info_details_parent_id_idx" ON "_pages_v_blocks_specifications_additional_info_details" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_specifications_additional_info_details_locale_idx" ON "_pages_v_blocks_specifications_additional_info_details" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_specifications_order_idx" ON "_pages_v_blocks_specifications" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_specifications_parent_id_idx" ON "_pages_v_blocks_specifications" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_specifications_path_idx" ON "_pages_v_blocks_specifications" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_specifications_locale_idx" ON "_pages_v_blocks_specifications" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_applications_applications_details_order_idx" ON "_pages_v_blocks_applications_applications_details" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_applications_applications_details_parent_id_idx" ON "_pages_v_blocks_applications_applications_details" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_applications_applications_details_locale_idx" ON "_pages_v_blocks_applications_applications_details" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_applications_applications_order_idx" ON "_pages_v_blocks_applications_applications" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_applications_applications_parent_id_idx" ON "_pages_v_blocks_applications_applications" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_applications_applications_locale_idx" ON "_pages_v_blocks_applications_applications" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_applications_stats_order_idx" ON "_pages_v_blocks_applications_stats" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_applications_stats_parent_id_idx" ON "_pages_v_blocks_applications_stats" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_applications_stats_locale_idx" ON "_pages_v_blocks_applications_stats" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_applications_case_study_stats_order_idx" ON "_pages_v_blocks_applications_case_study_stats" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_applications_case_study_stats_parent_id_idx" ON "_pages_v_blocks_applications_case_study_stats" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_applications_case_study_stats_locale_idx" ON "_pages_v_blocks_applications_case_study_stats" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_applications_order_idx" ON "_pages_v_blocks_applications" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_applications_parent_id_idx" ON "_pages_v_blocks_applications" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_applications_path_idx" ON "_pages_v_blocks_applications" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_applications_locale_idx" ON "_pages_v_blocks_applications" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_applications_case_study_case_study_image_idx" ON "_pages_v_blocks_applications" USING btree ("case_study_image_id");
  CREATE INDEX "_pages_v_blocks_technical_overview_process_steps_order_idx" ON "_pages_v_blocks_technical_overview_process_steps" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_technical_overview_process_steps_parent_id_idx" ON "_pages_v_blocks_technical_overview_process_steps" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_technical_overview_process_steps_locale_idx" ON "_pages_v_blocks_technical_overview_process_steps" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_technical_overview_technical_benefits_order_idx" ON "_pages_v_blocks_technical_overview_technical_benefits" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_technical_overview_technical_benefits_parent_id_idx" ON "_pages_v_blocks_technical_overview_technical_benefits" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_technical_overview_technical_benefits_locale_idx" ON "_pages_v_blocks_technical_overview_technical_benefits" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_technical_overview_order_idx" ON "_pages_v_blocks_technical_overview" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_technical_overview_parent_id_idx" ON "_pages_v_blocks_technical_overview" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_technical_overview_path_idx" ON "_pages_v_blocks_technical_overview" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_technical_overview_locale_idx" ON "_pages_v_blocks_technical_overview" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_technical_overview_technical_image_idx" ON "_pages_v_blocks_technical_overview" USING btree ("technical_image_id");
  CREATE INDEX "_pages_v_blocks_benefits_comparison_benefits_order_idx" ON "_pages_v_blocks_benefits_comparison_benefits" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_benefits_comparison_benefits_parent_id_idx" ON "_pages_v_blocks_benefits_comparison_benefits" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_benefits_comparison_benefits_locale_idx" ON "_pages_v_blocks_benefits_comparison_benefits" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_benefits_comparison_summary_cards_order_idx" ON "_pages_v_blocks_benefits_comparison_summary_cards" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_benefits_comparison_summary_cards_parent_id_idx" ON "_pages_v_blocks_benefits_comparison_summary_cards" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_benefits_comparison_summary_cards_locale_idx" ON "_pages_v_blocks_benefits_comparison_summary_cards" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_benefits_comparison_order_idx" ON "_pages_v_blocks_benefits_comparison" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_benefits_comparison_parent_id_idx" ON "_pages_v_blocks_benefits_comparison" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_benefits_comparison_path_idx" ON "_pages_v_blocks_benefits_comparison" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_benefits_comparison_locale_idx" ON "_pages_v_blocks_benefits_comparison" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_product_c_t_a_stats_order_idx" ON "_pages_v_blocks_product_c_t_a_stats" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_product_c_t_a_stats_parent_id_idx" ON "_pages_v_blocks_product_c_t_a_stats" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_product_c_t_a_stats_locale_idx" ON "_pages_v_blocks_product_c_t_a_stats" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_product_c_t_a_why_us_points_order_idx" ON "_pages_v_blocks_product_c_t_a_why_us_points" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_product_c_t_a_why_us_points_parent_id_idx" ON "_pages_v_blocks_product_c_t_a_why_us_points" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_product_c_t_a_why_us_points_locale_idx" ON "_pages_v_blocks_product_c_t_a_why_us_points" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_product_c_t_a_application_options_order_idx" ON "_pages_v_blocks_product_c_t_a_application_options" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_product_c_t_a_application_options_parent_id_idx" ON "_pages_v_blocks_product_c_t_a_application_options" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_product_c_t_a_application_options_locale_idx" ON "_pages_v_blocks_product_c_t_a_application_options" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_product_c_t_a_order_idx" ON "_pages_v_blocks_product_c_t_a" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_product_c_t_a_parent_id_idx" ON "_pages_v_blocks_product_c_t_a" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_product_c_t_a_path_idx" ON "_pages_v_blocks_product_c_t_a" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_product_c_t_a_locale_idx" ON "_pages_v_blocks_product_c_t_a" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_product_c_t_a_hero_image_idx" ON "_pages_v_blocks_product_c_t_a" USING btree ("hero_image_id");
  CREATE INDEX "_pages_v_blocks_product_resources_resources_order_idx" ON "_pages_v_blocks_product_resources_resources" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_product_resources_resources_parent_id_idx" ON "_pages_v_blocks_product_resources_resources" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_product_resources_resources_locale_idx" ON "_pages_v_blocks_product_resources_resources" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_product_resources_quick_access_items_order_idx" ON "_pages_v_blocks_product_resources_quick_access_items" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_product_resources_quick_access_items_parent_id_idx" ON "_pages_v_blocks_product_resources_quick_access_items" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_product_resources_quick_access_items_locale_idx" ON "_pages_v_blocks_product_resources_quick_access_items" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_product_resources_order_idx" ON "_pages_v_blocks_product_resources" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_product_resources_parent_id_idx" ON "_pages_v_blocks_product_resources" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_product_resources_path_idx" ON "_pages_v_blocks_product_resources" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_product_resources_locale_idx" ON "_pages_v_blocks_product_resources" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_contact_hero_quick_contact_methods_order_idx" ON "_pages_v_blocks_contact_hero_quick_contact_methods" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_contact_hero_quick_contact_methods_parent_id_idx" ON "_pages_v_blocks_contact_hero_quick_contact_methods" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_contact_hero_quick_contact_methods_locale_idx" ON "_pages_v_blocks_contact_hero_quick_contact_methods" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_contact_hero_order_idx" ON "_pages_v_blocks_contact_hero" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_contact_hero_parent_id_idx" ON "_pages_v_blocks_contact_hero" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_contact_hero_path_idx" ON "_pages_v_blocks_contact_hero" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_contact_hero_locale_idx" ON "_pages_v_blocks_contact_hero" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_contact_form_order_idx" ON "_pages_v_blocks_contact_form" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_contact_form_parent_id_idx" ON "_pages_v_blocks_contact_form" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_contact_form_path_idx" ON "_pages_v_blocks_contact_form" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_contact_form_locale_idx" ON "_pages_v_blocks_contact_form" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_contact_info_contact_methods_order_idx" ON "_pages_v_blocks_contact_info_contact_methods" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_contact_info_contact_methods_parent_id_idx" ON "_pages_v_blocks_contact_info_contact_methods" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_contact_info_contact_methods_locale_idx" ON "_pages_v_blocks_contact_info_contact_methods" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_contact_info_order_idx" ON "_pages_v_blocks_contact_info" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_contact_info_parent_id_idx" ON "_pages_v_blocks_contact_info" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_contact_info_path_idx" ON "_pages_v_blocks_contact_info" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_contact_info_locale_idx" ON "_pages_v_blocks_contact_info" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_contact_location_order_idx" ON "_pages_v_blocks_contact_location" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_contact_location_parent_id_idx" ON "_pages_v_blocks_contact_location" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_contact_location_path_idx" ON "_pages_v_blocks_contact_location" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_contact_location_locale_idx" ON "_pages_v_blocks_contact_location" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_contact_f_a_q_faqs_order_idx" ON "_pages_v_blocks_contact_f_a_q_faqs" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_contact_f_a_q_faqs_parent_id_idx" ON "_pages_v_blocks_contact_f_a_q_faqs" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_contact_f_a_q_faqs_locale_idx" ON "_pages_v_blocks_contact_f_a_q_faqs" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_contact_f_a_q_order_idx" ON "_pages_v_blocks_contact_f_a_q" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_contact_f_a_q_parent_id_idx" ON "_pages_v_blocks_contact_f_a_q" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_contact_f_a_q_path_idx" ON "_pages_v_blocks_contact_f_a_q" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_contact_f_a_q_locale_idx" ON "_pages_v_blocks_contact_f_a_q" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_universal_hero_benefits_order_idx" ON "_pages_v_blocks_universal_hero_benefits" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_universal_hero_benefits_parent_id_idx" ON "_pages_v_blocks_universal_hero_benefits" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_universal_hero_benefits_locale_idx" ON "_pages_v_blocks_universal_hero_benefits" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_universal_hero_trust_indicators_order_idx" ON "_pages_v_blocks_universal_hero_trust_indicators" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_universal_hero_trust_indicators_parent_id_idx" ON "_pages_v_blocks_universal_hero_trust_indicators" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_universal_hero_trust_indicators_locale_idx" ON "_pages_v_blocks_universal_hero_trust_indicators" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_universal_hero_stats_order_idx" ON "_pages_v_blocks_universal_hero_stats" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_universal_hero_stats_parent_id_idx" ON "_pages_v_blocks_universal_hero_stats" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_universal_hero_stats_locale_idx" ON "_pages_v_blocks_universal_hero_stats" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_universal_hero_contact_methods_order_idx" ON "_pages_v_blocks_universal_hero_contact_methods" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_universal_hero_contact_methods_parent_id_idx" ON "_pages_v_blocks_universal_hero_contact_methods" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_universal_hero_contact_methods_locale_idx" ON "_pages_v_blocks_universal_hero_contact_methods" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_universal_hero_contact_methods_link_link_page_idx" ON "_pages_v_blocks_universal_hero_contact_methods" USING btree ("link_page_id");
  CREATE INDEX "_pages_v_blocks_universal_hero_contact_methods_link_link_post_idx" ON "_pages_v_blocks_universal_hero_contact_methods" USING btree ("link_post_id");
  CREATE INDEX "_pages_v_blocks_universal_hero_order_idx" ON "_pages_v_blocks_universal_hero" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_universal_hero_parent_id_idx" ON "_pages_v_blocks_universal_hero" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_universal_hero_path_idx" ON "_pages_v_blocks_universal_hero" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_universal_hero_locale_idx" ON "_pages_v_blocks_universal_hero" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_universal_hero_primary_c_t_a_primary_c_t_a_page_idx" ON "_pages_v_blocks_universal_hero" USING btree ("primary_c_t_a_page_id");
  CREATE INDEX "_pages_v_blocks_universal_hero_primary_c_t_a_primary_c_t_a_post_idx" ON "_pages_v_blocks_universal_hero" USING btree ("primary_c_t_a_post_id");
  CREATE INDEX "_pages_v_blocks_universal_hero_secondary_c_t_a_secondary_c_t_a_page_idx" ON "_pages_v_blocks_universal_hero" USING btree ("secondary_c_t_a_page_id");
  CREATE INDEX "_pages_v_blocks_universal_hero_secondary_c_t_a_secondary_c_t_a_post_idx" ON "_pages_v_blocks_universal_hero" USING btree ("secondary_c_t_a_post_id");
  CREATE INDEX "_pages_v_blocks_universal_c_t_a_benefits_order_idx" ON "_pages_v_blocks_universal_c_t_a_benefits" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_universal_c_t_a_benefits_parent_id_idx" ON "_pages_v_blocks_universal_c_t_a_benefits" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_universal_c_t_a_benefits_locale_idx" ON "_pages_v_blocks_universal_c_t_a_benefits" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_universal_c_t_a_stats_order_idx" ON "_pages_v_blocks_universal_c_t_a_stats" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_universal_c_t_a_stats_parent_id_idx" ON "_pages_v_blocks_universal_c_t_a_stats" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_universal_c_t_a_stats_locale_idx" ON "_pages_v_blocks_universal_c_t_a_stats" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_universal_c_t_a_order_idx" ON "_pages_v_blocks_universal_c_t_a" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_universal_c_t_a_parent_id_idx" ON "_pages_v_blocks_universal_c_t_a" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_universal_c_t_a_path_idx" ON "_pages_v_blocks_universal_c_t_a" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_universal_c_t_a_locale_idx" ON "_pages_v_blocks_universal_c_t_a" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_universal_c_t_a_primary_c_t_a_primary_c_t_a_page_idx" ON "_pages_v_blocks_universal_c_t_a" USING btree ("primary_c_t_a_page_id");
  CREATE INDEX "_pages_v_blocks_universal_c_t_a_primary_c_t_a_primary_c_t_a_post_idx" ON "_pages_v_blocks_universal_c_t_a" USING btree ("primary_c_t_a_post_id");
  CREATE INDEX "_pages_v_blocks_universal_c_t_a_secondary_c_t_a_secondary_c_t_a_page_idx" ON "_pages_v_blocks_universal_c_t_a" USING btree ("secondary_c_t_a_page_id");
  CREATE INDEX "_pages_v_blocks_universal_c_t_a_secondary_c_t_a_secondary_c_t_a_post_idx" ON "_pages_v_blocks_universal_c_t_a" USING btree ("secondary_c_t_a_post_id");
  CREATE INDEX "_pages_v_blocks_feature_grid_features_details_order_idx" ON "_pages_v_blocks_feature_grid_features_details" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_feature_grid_features_details_parent_id_idx" ON "_pages_v_blocks_feature_grid_features_details" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_feature_grid_features_details_locale_idx" ON "_pages_v_blocks_feature_grid_features_details" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_feature_grid_features_order_idx" ON "_pages_v_blocks_feature_grid_features" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_feature_grid_features_parent_id_idx" ON "_pages_v_blocks_feature_grid_features" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_feature_grid_features_locale_idx" ON "_pages_v_blocks_feature_grid_features" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_feature_grid_features_link_link_page_idx" ON "_pages_v_blocks_feature_grid_features" USING btree ("link_page_id");
  CREATE INDEX "_pages_v_blocks_feature_grid_features_link_link_post_idx" ON "_pages_v_blocks_feature_grid_features" USING btree ("link_post_id");
  CREATE INDEX "_pages_v_blocks_feature_grid_order_idx" ON "_pages_v_blocks_feature_grid" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_feature_grid_parent_id_idx" ON "_pages_v_blocks_feature_grid" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_feature_grid_path_idx" ON "_pages_v_blocks_feature_grid" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_feature_grid_locale_idx" ON "_pages_v_blocks_feature_grid" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_content_grid_items_applications_order_idx" ON "_pages_v_blocks_content_grid_items_applications" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_content_grid_items_applications_parent_id_idx" ON "_pages_v_blocks_content_grid_items_applications" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_content_grid_items_applications_locale_idx" ON "_pages_v_blocks_content_grid_items_applications" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_content_grid_items_order_idx" ON "_pages_v_blocks_content_grid_items" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_content_grid_items_parent_id_idx" ON "_pages_v_blocks_content_grid_items" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_content_grid_items_locale_idx" ON "_pages_v_blocks_content_grid_items" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_content_grid_items_link_link_page_idx" ON "_pages_v_blocks_content_grid_items" USING btree ("link_page_id");
  CREATE INDEX "_pages_v_blocks_content_grid_items_link_link_post_idx" ON "_pages_v_blocks_content_grid_items" USING btree ("link_post_id");
  CREATE INDEX "_pages_v_blocks_content_grid_order_idx" ON "_pages_v_blocks_content_grid" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_content_grid_parent_id_idx" ON "_pages_v_blocks_content_grid" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_content_grid_path_idx" ON "_pages_v_blocks_content_grid" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_content_grid_locale_idx" ON "_pages_v_blocks_content_grid" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_stats_section_stats_order_idx" ON "_pages_v_blocks_stats_section_stats" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_stats_section_stats_parent_id_idx" ON "_pages_v_blocks_stats_section_stats" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_stats_section_stats_locale_idx" ON "_pages_v_blocks_stats_section_stats" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_stats_section_order_idx" ON "_pages_v_blocks_stats_section" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_stats_section_parent_id_idx" ON "_pages_v_blocks_stats_section" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_stats_section_path_idx" ON "_pages_v_blocks_stats_section" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_stats_section_locale_idx" ON "_pages_v_blocks_stats_section" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_process_steps_steps_details_order_idx" ON "_pages_v_blocks_process_steps_steps_details" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_process_steps_steps_details_parent_id_idx" ON "_pages_v_blocks_process_steps_steps_details" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_process_steps_steps_details_locale_idx" ON "_pages_v_blocks_process_steps_steps_details" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_process_steps_steps_order_idx" ON "_pages_v_blocks_process_steps_steps" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_process_steps_steps_parent_id_idx" ON "_pages_v_blocks_process_steps_steps" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_process_steps_steps_locale_idx" ON "_pages_v_blocks_process_steps_steps" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_process_steps_order_idx" ON "_pages_v_blocks_process_steps" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_process_steps_parent_id_idx" ON "_pages_v_blocks_process_steps" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_process_steps_path_idx" ON "_pages_v_blocks_process_steps" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_process_steps_locale_idx" ON "_pages_v_blocks_process_steps" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_content_cards_cards_tags_order_idx" ON "_pages_v_blocks_content_cards_cards_tags" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_content_cards_cards_tags_parent_id_idx" ON "_pages_v_blocks_content_cards_cards_tags" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_content_cards_cards_tags_locale_idx" ON "_pages_v_blocks_content_cards_cards_tags" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_content_cards_cards_order_idx" ON "_pages_v_blocks_content_cards_cards" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_content_cards_cards_parent_id_idx" ON "_pages_v_blocks_content_cards_cards" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_content_cards_cards_locale_idx" ON "_pages_v_blocks_content_cards_cards" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_content_cards_cards_link_link_page_idx" ON "_pages_v_blocks_content_cards_cards" USING btree ("link_page_id");
  CREATE INDEX "_pages_v_blocks_content_cards_cards_link_link_post_idx" ON "_pages_v_blocks_content_cards_cards" USING btree ("link_post_id");
  CREATE INDEX "_pages_v_blocks_content_cards_order_idx" ON "_pages_v_blocks_content_cards" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_content_cards_parent_id_idx" ON "_pages_v_blocks_content_cards" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_content_cards_path_idx" ON "_pages_v_blocks_content_cards" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_content_cards_locale_idx" ON "_pages_v_blocks_content_cards" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_contact_section_benefits_order_idx" ON "_pages_v_blocks_contact_section_benefits" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_contact_section_benefits_parent_id_idx" ON "_pages_v_blocks_contact_section_benefits" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_contact_section_benefits_locale_idx" ON "_pages_v_blocks_contact_section_benefits" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_contact_section_order_idx" ON "_pages_v_blocks_contact_section" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_contact_section_parent_id_idx" ON "_pages_v_blocks_contact_section" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_contact_section_path_idx" ON "_pages_v_blocks_contact_section" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_contact_section_locale_idx" ON "_pages_v_blocks_contact_section" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_comparison_table_items_order_idx" ON "_pages_v_blocks_comparison_table_items" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_comparison_table_items_parent_id_idx" ON "_pages_v_blocks_comparison_table_items" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_comparison_table_items_locale_idx" ON "_pages_v_blocks_comparison_table_items" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_comparison_table_order_idx" ON "_pages_v_blocks_comparison_table" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_comparison_table_parent_id_idx" ON "_pages_v_blocks_comparison_table" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_comparison_table_path_idx" ON "_pages_v_blocks_comparison_table" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_comparison_table_locale_idx" ON "_pages_v_blocks_comparison_table" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_simple_page_breadcrumbs_order_idx" ON "_pages_v_blocks_simple_page_breadcrumbs" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_simple_page_breadcrumbs_parent_id_idx" ON "_pages_v_blocks_simple_page_breadcrumbs" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_simple_page_breadcrumbs_locale_idx" ON "_pages_v_blocks_simple_page_breadcrumbs" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_simple_page_breadcrumbs_link_link_page_idx" ON "_pages_v_blocks_simple_page_breadcrumbs" USING btree ("link_page_id");
  CREATE INDEX "_pages_v_blocks_simple_page_breadcrumbs_link_link_post_idx" ON "_pages_v_blocks_simple_page_breadcrumbs" USING btree ("link_post_id");
  CREATE INDEX "_pages_v_blocks_simple_page_links_order_idx" ON "_pages_v_blocks_simple_page_links" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_simple_page_links_parent_id_idx" ON "_pages_v_blocks_simple_page_links" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_simple_page_links_locale_idx" ON "_pages_v_blocks_simple_page_links" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_simple_page_links_link_link_page_idx" ON "_pages_v_blocks_simple_page_links" USING btree ("link_page_id");
  CREATE INDEX "_pages_v_blocks_simple_page_links_link_link_post_idx" ON "_pages_v_blocks_simple_page_links" USING btree ("link_post_id");
  CREATE INDEX "_pages_v_blocks_simple_page_order_idx" ON "_pages_v_blocks_simple_page" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_simple_page_parent_id_idx" ON "_pages_v_blocks_simple_page" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_simple_page_path_idx" ON "_pages_v_blocks_simple_page" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_simple_page_locale_idx" ON "_pages_v_blocks_simple_page" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_brand_showcase_brands_order_idx" ON "_pages_v_blocks_brand_showcase_brands" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_brand_showcase_brands_parent_id_idx" ON "_pages_v_blocks_brand_showcase_brands" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_brand_showcase_brands_locale_idx" ON "_pages_v_blocks_brand_showcase_brands" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_brand_showcase_brands_logo_idx" ON "_pages_v_blocks_brand_showcase_brands" USING btree ("logo_id");
  CREATE INDEX "_pages_v_blocks_brand_showcase_order_idx" ON "_pages_v_blocks_brand_showcase" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_brand_showcase_parent_id_idx" ON "_pages_v_blocks_brand_showcase" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_brand_showcase_path_idx" ON "_pages_v_blocks_brand_showcase" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_brand_showcase_locale_idx" ON "_pages_v_blocks_brand_showcase" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_technical_content_process_steps_order_idx" ON "_pages_v_blocks_technical_content_process_steps" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_technical_content_process_steps_parent_id_idx" ON "_pages_v_blocks_technical_content_process_steps" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_technical_content_process_steps_locale_idx" ON "_pages_v_blocks_technical_content_process_steps" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_technical_content_specifications_items_order_idx" ON "_pages_v_blocks_technical_content_specifications_items" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_technical_content_specifications_items_parent_id_idx" ON "_pages_v_blocks_technical_content_specifications_items" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_technical_content_specifications_items_locale_idx" ON "_pages_v_blocks_technical_content_specifications_items" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_technical_content_specifications_order_idx" ON "_pages_v_blocks_technical_content_specifications" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_technical_content_specifications_parent_id_idx" ON "_pages_v_blocks_technical_content_specifications" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_technical_content_specifications_locale_idx" ON "_pages_v_blocks_technical_content_specifications" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_technical_content_order_idx" ON "_pages_v_blocks_technical_content" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_technical_content_parent_id_idx" ON "_pages_v_blocks_technical_content" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_technical_content_path_idx" ON "_pages_v_blocks_technical_content" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_technical_content_locale_idx" ON "_pages_v_blocks_technical_content" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_resource_gallery_resources_order_idx" ON "_pages_v_blocks_resource_gallery_resources" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_resource_gallery_resources_parent_id_idx" ON "_pages_v_blocks_resource_gallery_resources" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_resource_gallery_resources_locale_idx" ON "_pages_v_blocks_resource_gallery_resources" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_resource_gallery_gallery_images_order_idx" ON "_pages_v_blocks_resource_gallery_gallery_images" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_resource_gallery_gallery_images_parent_id_idx" ON "_pages_v_blocks_resource_gallery_gallery_images" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_resource_gallery_gallery_images_locale_idx" ON "_pages_v_blocks_resource_gallery_gallery_images" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_resource_gallery_gallery_images_image_idx" ON "_pages_v_blocks_resource_gallery_gallery_images" USING btree ("image_id");
  CREATE INDEX "_pages_v_blocks_resource_gallery_order_idx" ON "_pages_v_blocks_resource_gallery" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_resource_gallery_parent_id_idx" ON "_pages_v_blocks_resource_gallery" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_resource_gallery_path_idx" ON "_pages_v_blocks_resource_gallery" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_resource_gallery_locale_idx" ON "_pages_v_blocks_resource_gallery" USING btree ("_locale");
  CREATE INDEX "_pages_v_parent_idx" ON "_pages_v" USING btree ("parent_id");
  CREATE INDEX "_pages_v_version_version_slug_idx" ON "_pages_v" USING btree ("version_slug");
  CREATE INDEX "_pages_v_version_version_updated_at_idx" ON "_pages_v" USING btree ("version_updated_at");
  CREATE INDEX "_pages_v_version_version_created_at_idx" ON "_pages_v" USING btree ("version_created_at");
  CREATE INDEX "_pages_v_version_version__status_idx" ON "_pages_v" USING btree ("version__status");
  CREATE INDEX "_pages_v_created_at_idx" ON "_pages_v" USING btree ("created_at");
  CREATE INDEX "_pages_v_updated_at_idx" ON "_pages_v" USING btree ("updated_at");
  CREATE INDEX "_pages_v_snapshot_idx" ON "_pages_v" USING btree ("snapshot");
  CREATE INDEX "_pages_v_published_locale_idx" ON "_pages_v" USING btree ("published_locale");
  CREATE INDEX "_pages_v_latest_idx" ON "_pages_v" USING btree ("latest");
  CREATE UNIQUE INDEX "_pages_v_locales_locale_parent_id_unique" ON "_pages_v_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "posts_tags_order_idx" ON "posts_tags" USING btree ("_order");
  CREATE INDEX "posts_tags_parent_id_idx" ON "posts_tags" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "posts_slug_idx" ON "posts" USING btree ("slug");
  CREATE INDEX "posts_featured_image_idx" ON "posts" USING btree ("featured_image_id");
  CREATE INDEX "posts_author_idx" ON "posts" USING btree ("author_id");
  CREATE INDEX "posts_updated_at_idx" ON "posts" USING btree ("updated_at");
  CREATE INDEX "posts_created_at_idx" ON "posts" USING btree ("created_at");
  CREATE INDEX "posts__status_idx" ON "posts" USING btree ("_status");
  CREATE UNIQUE INDEX "posts_locales_locale_parent_id_unique" ON "posts_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "posts_rels_order_idx" ON "posts_rels" USING btree ("order");
  CREATE INDEX "posts_rels_parent_idx" ON "posts_rels" USING btree ("parent_id");
  CREATE INDEX "posts_rels_path_idx" ON "posts_rels" USING btree ("path");
  CREATE INDEX "posts_rels_categories_id_idx" ON "posts_rels" USING btree ("categories_id");
  CREATE INDEX "_posts_v_version_tags_order_idx" ON "_posts_v_version_tags" USING btree ("_order");
  CREATE INDEX "_posts_v_version_tags_parent_id_idx" ON "_posts_v_version_tags" USING btree ("_parent_id");
  CREATE INDEX "_posts_v_parent_idx" ON "_posts_v" USING btree ("parent_id");
  CREATE INDEX "_posts_v_version_version_slug_idx" ON "_posts_v" USING btree ("version_slug");
  CREATE INDEX "_posts_v_version_version_featured_image_idx" ON "_posts_v" USING btree ("version_featured_image_id");
  CREATE INDEX "_posts_v_version_version_author_idx" ON "_posts_v" USING btree ("version_author_id");
  CREATE INDEX "_posts_v_version_version_updated_at_idx" ON "_posts_v" USING btree ("version_updated_at");
  CREATE INDEX "_posts_v_version_version_created_at_idx" ON "_posts_v" USING btree ("version_created_at");
  CREATE INDEX "_posts_v_version_version__status_idx" ON "_posts_v" USING btree ("version__status");
  CREATE INDEX "_posts_v_created_at_idx" ON "_posts_v" USING btree ("created_at");
  CREATE INDEX "_posts_v_updated_at_idx" ON "_posts_v" USING btree ("updated_at");
  CREATE INDEX "_posts_v_snapshot_idx" ON "_posts_v" USING btree ("snapshot");
  CREATE INDEX "_posts_v_published_locale_idx" ON "_posts_v" USING btree ("published_locale");
  CREATE INDEX "_posts_v_latest_idx" ON "_posts_v" USING btree ("latest");
  CREATE INDEX "_posts_v_autosave_idx" ON "_posts_v" USING btree ("autosave");
  CREATE UNIQUE INDEX "_posts_v_locales_locale_parent_id_unique" ON "_posts_v_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_posts_v_rels_order_idx" ON "_posts_v_rels" USING btree ("order");
  CREATE INDEX "_posts_v_rels_parent_idx" ON "_posts_v_rels" USING btree ("parent_id");
  CREATE INDEX "_posts_v_rels_path_idx" ON "_posts_v_rels" USING btree ("path");
  CREATE INDEX "_posts_v_rels_categories_id_idx" ON "_posts_v_rels" USING btree ("categories_id");
  CREATE UNIQUE INDEX "categories_slug_idx" ON "categories" USING btree ("slug");
  CREATE INDEX "categories_parent_idx" ON "categories" USING btree ("parent_id");
  CREATE INDEX "categories_updated_at_idx" ON "categories" USING btree ("updated_at");
  CREATE INDEX "categories_created_at_idx" ON "categories" USING btree ("created_at");
  CREATE UNIQUE INDEX "categories_name_idx" ON "categories_locales" USING btree ("name","_locale");
  CREATE UNIQUE INDEX "categories_locales_locale_parent_id_unique" ON "categories_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "contact_submissions_emails_sent_order_idx" ON "contact_submissions_emails_sent" USING btree ("_order");
  CREATE INDEX "contact_submissions_emails_sent_parent_id_idx" ON "contact_submissions_emails_sent" USING btree ("_parent_id");
  CREATE INDEX "contact_submissions_assigned_to_idx" ON "contact_submissions" USING btree ("assigned_to_id");
  CREATE INDEX "contact_submissions_updated_at_idx" ON "contact_submissions" USING btree ("updated_at");
  CREATE INDEX "contact_submissions_created_at_idx" ON "contact_submissions" USING btree ("created_at");
  CREATE INDEX "contact_submissions_texts_order_parent_idx" ON "contact_submissions_texts" USING btree ("order","parent_id");
  CREATE INDEX "header_navigation_dropdown_items_order_idx" ON "header_navigation_dropdown_items" USING btree ("_order");
  CREATE INDEX "header_navigation_dropdown_items_parent_id_idx" ON "header_navigation_dropdown_items" USING btree ("_parent_id");
  CREATE INDEX "header_navigation_dropdown_items_page_idx" ON "header_navigation_dropdown_items" USING btree ("page_id");
  CREATE INDEX "header_navigation_dropdown_items_post_idx" ON "header_navigation_dropdown_items" USING btree ("post_id");
  CREATE INDEX "header_navigation_dropdown_items_category_idx" ON "header_navigation_dropdown_items" USING btree ("category_id");
  CREATE UNIQUE INDEX "header_navigation_dropdown_items_locales_locale_parent_id_unique" ON "header_navigation_dropdown_items_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "header_navigation_order_idx" ON "header_navigation" USING btree ("_order");
  CREATE INDEX "header_navigation_parent_id_idx" ON "header_navigation" USING btree ("_parent_id");
  CREATE INDEX "header_navigation_page_idx" ON "header_navigation" USING btree ("page_id");
  CREATE INDEX "header_navigation_post_idx" ON "header_navigation" USING btree ("post_id");
  CREATE INDEX "header_navigation_category_idx" ON "header_navigation" USING btree ("category_id");
  CREATE UNIQUE INDEX "header_navigation_locales_locale_parent_id_unique" ON "header_navigation_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "header_logo_idx" ON "header" USING btree ("logo_id");
  CREATE UNIQUE INDEX "header_locales_locale_parent_id_unique" ON "header_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "header_rels_order_idx" ON "header_rels" USING btree ("order");
  CREATE INDEX "header_rels_parent_idx" ON "header_rels" USING btree ("parent_id");
  CREATE INDEX "header_rels_path_idx" ON "header_rels" USING btree ("path");
  CREATE INDEX "header_rels_categories_id_idx" ON "header_rels" USING btree ("categories_id");
  CREATE INDEX "footer_company_info_address_order_idx" ON "footer_company_info_address" USING btree ("_order");
  CREATE INDEX "footer_company_info_address_parent_id_idx" ON "footer_company_info_address" USING btree ("_parent_id");
  CREATE INDEX "footer_footer_columns_links_order_idx" ON "footer_footer_columns_links" USING btree ("_order");
  CREATE INDEX "footer_footer_columns_links_parent_id_idx" ON "footer_footer_columns_links" USING btree ("_parent_id");
  CREATE INDEX "footer_footer_columns_links_page_idx" ON "footer_footer_columns_links" USING btree ("page_id");
  CREATE UNIQUE INDEX "footer_footer_columns_links_locales_locale_parent_id_unique" ON "footer_footer_columns_links_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "footer_footer_columns_order_idx" ON "footer_footer_columns" USING btree ("_order");
  CREATE INDEX "footer_footer_columns_parent_id_idx" ON "footer_footer_columns" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "footer_footer_columns_locales_locale_parent_id_unique" ON "footer_footer_columns_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "footer_bottom_links_order_idx" ON "footer_bottom_links" USING btree ("_order");
  CREATE INDEX "footer_bottom_links_parent_id_idx" ON "footer_bottom_links" USING btree ("_parent_id");
  CREATE INDEX "footer_bottom_links_page_idx" ON "footer_bottom_links" USING btree ("page_id");
  CREATE INDEX "footer_logo_idx" ON "footer" USING btree ("logo_id");
  CREATE UNIQUE INDEX "footer_locales_locale_parent_id_unique" ON "footer_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "seo_default_image_idx" ON "seo" USING btree ("default_image_id");
  CREATE INDEX "seo_favicon_idx" ON "seo" USING btree ("favicon_id");
  CREATE INDEX "homepage_blocks_hero_cta_buttons_order_idx" ON "homepage_blocks_hero_cta_buttons" USING btree ("_order");
  CREATE INDEX "homepage_blocks_hero_cta_buttons_parent_id_idx" ON "homepage_blocks_hero_cta_buttons" USING btree ("_parent_id");
  CREATE INDEX "homepage_blocks_hero_cta_buttons_locale_idx" ON "homepage_blocks_hero_cta_buttons" USING btree ("_locale");
  CREATE INDEX "homepage_blocks_hero_cta_buttons_page_idx" ON "homepage_blocks_hero_cta_buttons" USING btree ("page_id");
  CREATE INDEX "homepage_blocks_hero_order_idx" ON "homepage_blocks_hero" USING btree ("_order");
  CREATE INDEX "homepage_blocks_hero_parent_id_idx" ON "homepage_blocks_hero" USING btree ("_parent_id");
  CREATE INDEX "homepage_blocks_hero_path_idx" ON "homepage_blocks_hero" USING btree ("_path");
  CREATE INDEX "homepage_blocks_hero_locale_idx" ON "homepage_blocks_hero" USING btree ("_locale");
  CREATE INDEX "homepage_blocks_hero_background_image_idx" ON "homepage_blocks_hero" USING btree ("background_image_id");
  CREATE INDEX "homepage_blocks_logo_belt_logos_order_idx" ON "homepage_blocks_logo_belt_logos" USING btree ("_order");
  CREATE INDEX "homepage_blocks_logo_belt_logos_parent_id_idx" ON "homepage_blocks_logo_belt_logos" USING btree ("_parent_id");
  CREATE INDEX "homepage_blocks_logo_belt_logos_locale_idx" ON "homepage_blocks_logo_belt_logos" USING btree ("_locale");
  CREATE INDEX "homepage_blocks_logo_belt_logos_logo_idx" ON "homepage_blocks_logo_belt_logos" USING btree ("logo_id");
  CREATE INDEX "homepage_blocks_logo_belt_order_idx" ON "homepage_blocks_logo_belt" USING btree ("_order");
  CREATE INDEX "homepage_blocks_logo_belt_parent_id_idx" ON "homepage_blocks_logo_belt" USING btree ("_parent_id");
  CREATE INDEX "homepage_blocks_logo_belt_path_idx" ON "homepage_blocks_logo_belt" USING btree ("_path");
  CREATE INDEX "homepage_blocks_logo_belt_locale_idx" ON "homepage_blocks_logo_belt" USING btree ("_locale");
  CREATE INDEX "homepage_blocks_services_services_features_order_idx" ON "homepage_blocks_services_services_features" USING btree ("_order");
  CREATE INDEX "homepage_blocks_services_services_features_parent_id_idx" ON "homepage_blocks_services_services_features" USING btree ("_parent_id");
  CREATE INDEX "homepage_blocks_services_services_features_locale_idx" ON "homepage_blocks_services_services_features" USING btree ("_locale");
  CREATE INDEX "homepage_blocks_services_services_order_idx" ON "homepage_blocks_services_services" USING btree ("_order");
  CREATE INDEX "homepage_blocks_services_services_parent_id_idx" ON "homepage_blocks_services_services" USING btree ("_parent_id");
  CREATE INDEX "homepage_blocks_services_services_locale_idx" ON "homepage_blocks_services_services" USING btree ("_locale");
  CREATE INDEX "homepage_blocks_services_services_image_idx" ON "homepage_blocks_services_services" USING btree ("image_id");
  CREATE INDEX "homepage_blocks_services_services_button_button_page_idx" ON "homepage_blocks_services_services" USING btree ("button_page_id");
  CREATE INDEX "homepage_blocks_services_order_idx" ON "homepage_blocks_services" USING btree ("_order");
  CREATE INDEX "homepage_blocks_services_parent_id_idx" ON "homepage_blocks_services" USING btree ("_parent_id");
  CREATE INDEX "homepage_blocks_services_path_idx" ON "homepage_blocks_services" USING btree ("_path");
  CREATE INDEX "homepage_blocks_services_locale_idx" ON "homepage_blocks_services" USING btree ("_locale");
  CREATE INDEX "homepage_blocks_about_badges_order_idx" ON "homepage_blocks_about_badges" USING btree ("_order");
  CREATE INDEX "homepage_blocks_about_badges_parent_id_idx" ON "homepage_blocks_about_badges" USING btree ("_parent_id");
  CREATE INDEX "homepage_blocks_about_badges_locale_idx" ON "homepage_blocks_about_badges" USING btree ("_locale");
  CREATE INDEX "homepage_blocks_about_stats_order_idx" ON "homepage_blocks_about_stats" USING btree ("_order");
  CREATE INDEX "homepage_blocks_about_stats_parent_id_idx" ON "homepage_blocks_about_stats" USING btree ("_parent_id");
  CREATE INDEX "homepage_blocks_about_stats_locale_idx" ON "homepage_blocks_about_stats" USING btree ("_locale");
  CREATE INDEX "homepage_blocks_about_process_order_idx" ON "homepage_blocks_about_process" USING btree ("_order");
  CREATE INDEX "homepage_blocks_about_process_parent_id_idx" ON "homepage_blocks_about_process" USING btree ("_parent_id");
  CREATE INDEX "homepage_blocks_about_process_locale_idx" ON "homepage_blocks_about_process" USING btree ("_locale");
  CREATE INDEX "homepage_blocks_about_order_idx" ON "homepage_blocks_about" USING btree ("_order");
  CREATE INDEX "homepage_blocks_about_parent_id_idx" ON "homepage_blocks_about" USING btree ("_parent_id");
  CREATE INDEX "homepage_blocks_about_path_idx" ON "homepage_blocks_about" USING btree ("_path");
  CREATE INDEX "homepage_blocks_about_locale_idx" ON "homepage_blocks_about" USING btree ("_locale");
  CREATE INDEX "homepage_blocks_about_image_idx" ON "homepage_blocks_about" USING btree ("image_id");
  CREATE INDEX "homepage_blocks_about_button_button_page_idx" ON "homepage_blocks_about" USING btree ("button_page_id");
  CREATE INDEX "homepage_blocks_why_trust_reasons_order_idx" ON "homepage_blocks_why_trust_reasons" USING btree ("_order");
  CREATE INDEX "homepage_blocks_why_trust_reasons_parent_id_idx" ON "homepage_blocks_why_trust_reasons" USING btree ("_parent_id");
  CREATE INDEX "homepage_blocks_why_trust_reasons_locale_idx" ON "homepage_blocks_why_trust_reasons" USING btree ("_locale");
  CREATE INDEX "homepage_blocks_why_trust_pillars_order_idx" ON "homepage_blocks_why_trust_pillars" USING btree ("_order");
  CREATE INDEX "homepage_blocks_why_trust_pillars_parent_id_idx" ON "homepage_blocks_why_trust_pillars" USING btree ("_parent_id");
  CREATE INDEX "homepage_blocks_why_trust_pillars_locale_idx" ON "homepage_blocks_why_trust_pillars" USING btree ("_locale");
  CREATE INDEX "homepage_blocks_why_trust_order_idx" ON "homepage_blocks_why_trust" USING btree ("_order");
  CREATE INDEX "homepage_blocks_why_trust_parent_id_idx" ON "homepage_blocks_why_trust" USING btree ("_parent_id");
  CREATE INDEX "homepage_blocks_why_trust_path_idx" ON "homepage_blocks_why_trust" USING btree ("_path");
  CREATE INDEX "homepage_blocks_why_trust_locale_idx" ON "homepage_blocks_why_trust" USING btree ("_locale");
  CREATE INDEX "homepage_blocks_why_trust_image_idx" ON "homepage_blocks_why_trust" USING btree ("image_id");
  CREATE INDEX "homepage_blocks_why_trust_button_button_page_idx" ON "homepage_blocks_why_trust" USING btree ("button_page_id");
  CREATE INDEX "homepage_blocks_projects_projects_stack_order_idx" ON "homepage_blocks_projects_projects_stack" USING btree ("_order");
  CREATE INDEX "homepage_blocks_projects_projects_stack_parent_id_idx" ON "homepage_blocks_projects_projects_stack" USING btree ("_parent_id");
  CREATE INDEX "homepage_blocks_projects_projects_stack_locale_idx" ON "homepage_blocks_projects_projects_stack" USING btree ("_locale");
  CREATE INDEX "homepage_blocks_projects_projects_order_idx" ON "homepage_blocks_projects_projects" USING btree ("_order");
  CREATE INDEX "homepage_blocks_projects_projects_parent_id_idx" ON "homepage_blocks_projects_projects" USING btree ("_parent_id");
  CREATE INDEX "homepage_blocks_projects_projects_locale_idx" ON "homepage_blocks_projects_projects" USING btree ("_locale");
  CREATE INDEX "homepage_blocks_projects_projects_image_idx" ON "homepage_blocks_projects_projects" USING btree ("image_id");
  CREATE INDEX "homepage_blocks_projects_order_idx" ON "homepage_blocks_projects" USING btree ("_order");
  CREATE INDEX "homepage_blocks_projects_parent_id_idx" ON "homepage_blocks_projects" USING btree ("_parent_id");
  CREATE INDEX "homepage_blocks_projects_path_idx" ON "homepage_blocks_projects" USING btree ("_path");
  CREATE INDEX "homepage_blocks_projects_locale_idx" ON "homepage_blocks_projects" USING btree ("_locale");
  CREATE INDEX "homepage_blocks_projects_button_button_page_idx" ON "homepage_blocks_projects" USING btree ("button_page_id");
  CREATE INDEX "homepage_blocks_contact_order_idx" ON "homepage_blocks_contact" USING btree ("_order");
  CREATE INDEX "homepage_blocks_contact_parent_id_idx" ON "homepage_blocks_contact" USING btree ("_parent_id");
  CREATE INDEX "homepage_blocks_contact_path_idx" ON "homepage_blocks_contact" USING btree ("_path");
  CREATE INDEX "homepage_blocks_contact_locale_idx" ON "homepage_blocks_contact" USING btree ("_locale");
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_pages_fk" FOREIGN KEY ("pages_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_posts_fk" FOREIGN KEY ("posts_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_categories_fk" FOREIGN KEY ("categories_id") REFERENCES "public"."categories"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_contact_submissions_fk" FOREIGN KEY ("contact_submissions_id") REFERENCES "public"."contact_submissions"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "payload_locked_documents_rels_pages_id_idx" ON "payload_locked_documents_rels" USING btree ("pages_id");
  CREATE INDEX "payload_locked_documents_rels_posts_id_idx" ON "payload_locked_documents_rels" USING btree ("posts_id");
  CREATE INDEX "payload_locked_documents_rels_categories_id_idx" ON "payload_locked_documents_rels" USING btree ("categories_id");
  CREATE INDEX "payload_locked_documents_rels_contact_submissions_id_idx" ON "payload_locked_documents_rels" USING btree ("contact_submissions_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "pages_blocks_hero_cta_buttons" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_hero" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_logo_belt_logos" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_logo_belt" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_services_services_features" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_services_services" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_services" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_about_badges" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_about_stats" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_about_process" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_about" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_why_trust_reasons" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_why_trust_pillars" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_why_trust" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_projects_projects_stack" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_projects_projects" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_projects" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_contact" DISABLE ROW LEVEL SECURITY;
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
  ALTER TABLE "pages" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_hero_cta_buttons" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_hero" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_logo_belt_logos" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_logo_belt" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_services_services_features" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_services_services" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_services" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_about_badges" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_about_stats" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_about_process" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_about" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_why_trust_reasons" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_why_trust_pillars" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_why_trust" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_projects_projects_stack" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_projects_projects" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_projects" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_contact" DISABLE ROW LEVEL SECURITY;
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
  ALTER TABLE "_pages_v" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "posts_tags" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "posts" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "posts_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "posts_rels" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_posts_v_version_tags" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_posts_v" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_posts_v_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_posts_v_rels" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "categories" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "categories_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "contact_submissions_emails_sent" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "contact_submissions" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "contact_submissions_texts" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "header_navigation_dropdown_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "header_navigation_dropdown_items_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "header_navigation" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "header_navigation_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "header" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "header_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "header_rels" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "footer_company_info_address" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "footer_footer_columns_links" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "footer_footer_columns_links_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "footer_footer_columns" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "footer_footer_columns_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "footer_bottom_links" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "footer" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "footer_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "seo" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "homepage_blocks_hero_cta_buttons" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "homepage_blocks_hero" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "homepage_blocks_logo_belt_logos" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "homepage_blocks_logo_belt" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "homepage_blocks_services_services_features" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "homepage_blocks_services_services" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "homepage_blocks_services" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "homepage_blocks_about_badges" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "homepage_blocks_about_stats" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "homepage_blocks_about_process" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "homepage_blocks_about" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "homepage_blocks_why_trust_reasons" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "homepage_blocks_why_trust_pillars" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "homepage_blocks_why_trust" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "homepage_blocks_projects_projects_stack" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "homepage_blocks_projects_projects" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "homepage_blocks_projects" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "homepage_blocks_contact" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "homepage" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "email_admin" DISABLE ROW LEVEL SECURITY;
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
  DROP TABLE "pages" CASCADE;
  DROP TABLE "pages_locales" CASCADE;
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
  DROP TABLE "_pages_v" CASCADE;
  DROP TABLE "_pages_v_locales" CASCADE;
  DROP TABLE "posts_tags" CASCADE;
  DROP TABLE "posts" CASCADE;
  DROP TABLE "posts_locales" CASCADE;
  DROP TABLE "posts_rels" CASCADE;
  DROP TABLE "_posts_v_version_tags" CASCADE;
  DROP TABLE "_posts_v" CASCADE;
  DROP TABLE "_posts_v_locales" CASCADE;
  DROP TABLE "_posts_v_rels" CASCADE;
  DROP TABLE "categories" CASCADE;
  DROP TABLE "categories_locales" CASCADE;
  DROP TABLE "contact_submissions_emails_sent" CASCADE;
  DROP TABLE "contact_submissions" CASCADE;
  DROP TABLE "contact_submissions_texts" CASCADE;
  DROP TABLE "header_navigation_dropdown_items" CASCADE;
  DROP TABLE "header_navigation_dropdown_items_locales" CASCADE;
  DROP TABLE "header_navigation" CASCADE;
  DROP TABLE "header_navigation_locales" CASCADE;
  DROP TABLE "header" CASCADE;
  DROP TABLE "header_locales" CASCADE;
  DROP TABLE "header_rels" CASCADE;
  DROP TABLE "footer_company_info_address" CASCADE;
  DROP TABLE "footer_footer_columns_links" CASCADE;
  DROP TABLE "footer_footer_columns_links_locales" CASCADE;
  DROP TABLE "footer_footer_columns" CASCADE;
  DROP TABLE "footer_footer_columns_locales" CASCADE;
  DROP TABLE "footer_bottom_links" CASCADE;
  DROP TABLE "footer" CASCADE;
  DROP TABLE "footer_locales" CASCADE;
  DROP TABLE "seo" CASCADE;
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
  DROP TABLE "email_admin" CASCADE;
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_pages_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_posts_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_categories_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_contact_submissions_fk";
  
  DROP INDEX "payload_locked_documents_rels_pages_id_idx";
  DROP INDEX "payload_locked_documents_rels_posts_id_idx";
  DROP INDEX "payload_locked_documents_rels_categories_id_idx";
  DROP INDEX "payload_locked_documents_rels_contact_submissions_id_idx";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "pages_id";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "posts_id";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "categories_id";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "contact_submissions_id";
  DROP TYPE "public"."_locales";
  DROP TYPE "public"."enum_pages_blocks_hero_cta_buttons_type";
  DROP TYPE "public"."enum_pages_blocks_hero_cta_buttons_variant";
  DROP TYPE "public"."enum_pages_blocks_services_services_button_type";
  DROP TYPE "public"."enum_pages_blocks_about_button_type";
  DROP TYPE "public"."enum_pages_blocks_why_trust_pillars_icon";
  DROP TYPE "public"."enum_pages_blocks_why_trust_button_type";
  DROP TYPE "public"."enum_pages_blocks_projects_button_type";
  DROP TYPE "public"."enum_pages_blocks_product_hero_cta_buttons_type";
  DROP TYPE "public"."enum_pages_blocks_product_hero_cta_buttons_variant";
  DROP TYPE "public"."enum_pages_blocks_key_features_features_icon";
  DROP TYPE "public"."enum_pages_blocks_applications_applications_icon";
  DROP TYPE "public"."enum_pages_blocks_benefits_comparison_summary_cards_icon";
  DROP TYPE "public"."enum_pages_blocks_contact_hero_quick_contact_methods_type";
  DROP TYPE "public"."enum_pages_blocks_universal_hero_contact_methods_link_type";
  DROP TYPE "public"."enum_pages_blocks_universal_hero_variant";
  DROP TYPE "public"."enum_pages_blocks_universal_hero_benefits_layout";
  DROP TYPE "public"."enum_pages_blocks_universal_hero_primary_c_t_a_type";
  DROP TYPE "public"."enum_pages_blocks_universal_hero_primary_c_t_a_variant";
  DROP TYPE "public"."enum_pages_blocks_universal_hero_secondary_c_t_a_type";
  DROP TYPE "public"."enum_pages_blocks_universal_hero_secondary_c_t_a_variant";
  DROP TYPE "public"."enum_pages_blocks_universal_hero_background_style";
  DROP TYPE "public"."enum_pages_blocks_universal_hero_content_alignment";
  DROP TYPE "public"."enum_pages_blocks_universal_c_t_a_variant";
  DROP TYPE "public"."enum_pages_blocks_universal_c_t_a_primary_c_t_a_type";
  DROP TYPE "public"."enum_pages_blocks_universal_c_t_a_primary_c_t_a_variant";
  DROP TYPE "public"."enum_pages_blocks_universal_c_t_a_secondary_c_t_a_type";
  DROP TYPE "public"."enum_pages_blocks_universal_c_t_a_secondary_c_t_a_variant";
  DROP TYPE "public"."enum_pages_blocks_universal_c_t_a_background_style";
  DROP TYPE "public"."enum_pages_blocks_feature_grid_features_link_type";
  DROP TYPE "public"."enum_pages_blocks_feature_grid_variant";
  DROP TYPE "public"."enum_pages_blocks_feature_grid_columns";
  DROP TYPE "public"."enum_pages_blocks_feature_grid_card_style";
  DROP TYPE "public"."enum_pages_blocks_feature_grid_background_style";
  DROP TYPE "public"."enum_pages_blocks_content_grid_items_link_type";
  DROP TYPE "public"."enum_pages_blocks_content_grid_variant";
  DROP TYPE "public"."enum_pages_blocks_content_grid_columns";
  DROP TYPE "public"."enum_pages_blocks_content_grid_background_style";
  DROP TYPE "public"."enum_pages_blocks_stats_section_variant";
  DROP TYPE "public"."enum_pages_blocks_stats_section_columns";
  DROP TYPE "public"."enum_pages_blocks_stats_section_background_style";
  DROP TYPE "public"."enum_pages_blocks_process_steps_variant";
  DROP TYPE "public"."enum_pages_blocks_process_steps_background_style";
  DROP TYPE "public"."enum_pages_blocks_content_cards_cards_link_type";
  DROP TYPE "public"."enum_pages_blocks_content_cards_variant";
  DROP TYPE "public"."enum_pages_blocks_content_cards_columns";
  DROP TYPE "public"."enum_pages_blocks_content_cards_background_style";
  DROP TYPE "public"."enum_pages_blocks_contact_section_variant";
  DROP TYPE "public"."enum_pages_blocks_contact_section_background_style";
  DROP TYPE "public"."enum_pages_blocks_comparison_table_items_primary";
  DROP TYPE "public"."enum_pages_blocks_comparison_table_items_secondary";
  DROP TYPE "public"."enum_pages_blocks_comparison_table_background_style";
  DROP TYPE "public"."enum_pages_blocks_simple_page_breadcrumbs_link_type";
  DROP TYPE "public"."enum_pages_blocks_simple_page_links_link_type";
  DROP TYPE "public"."enum_pages_blocks_simple_page_variant";
  DROP TYPE "public"."enum_pages_blocks_brand_showcase_variant";
  DROP TYPE "public"."enum_pages_blocks_brand_showcase_background_style";
  DROP TYPE "public"."enum_pages_blocks_technical_content_variant";
  DROP TYPE "public"."enum_pages_blocks_technical_content_background_style";
  DROP TYPE "public"."enum_pages_blocks_resource_gallery_variant";
  DROP TYPE "public"."enum_pages_blocks_resource_gallery_background_style";
  DROP TYPE "public"."enum_pages_status";
  DROP TYPE "public"."enum__pages_v_blocks_hero_cta_buttons_type";
  DROP TYPE "public"."enum__pages_v_blocks_hero_cta_buttons_variant";
  DROP TYPE "public"."enum__pages_v_blocks_services_services_button_type";
  DROP TYPE "public"."enum__pages_v_blocks_about_button_type";
  DROP TYPE "public"."enum__pages_v_blocks_why_trust_pillars_icon";
  DROP TYPE "public"."enum__pages_v_blocks_why_trust_button_type";
  DROP TYPE "public"."enum__pages_v_blocks_projects_button_type";
  DROP TYPE "public"."enum__pages_v_blocks_product_hero_cta_buttons_type";
  DROP TYPE "public"."enum__pages_v_blocks_product_hero_cta_buttons_variant";
  DROP TYPE "public"."enum__pages_v_blocks_key_features_features_icon";
  DROP TYPE "public"."enum__pages_v_blocks_applications_applications_icon";
  DROP TYPE "public"."enum__pages_v_blocks_benefits_comparison_summary_cards_icon";
  DROP TYPE "public"."enum__pages_v_blocks_contact_hero_quick_contact_methods_type";
  DROP TYPE "public"."enum__pages_v_blocks_universal_hero_contact_methods_link_type";
  DROP TYPE "public"."enum__pages_v_blocks_universal_hero_variant";
  DROP TYPE "public"."enum__pages_v_blocks_universal_hero_benefits_layout";
  DROP TYPE "public"."enum__pages_v_blocks_universal_hero_primary_c_t_a_type";
  DROP TYPE "public"."enum__pages_v_blocks_universal_hero_primary_c_t_a_variant";
  DROP TYPE "public"."enum__pages_v_blocks_universal_hero_secondary_c_t_a_type";
  DROP TYPE "public"."enum__pages_v_blocks_universal_hero_secondary_c_t_a_variant";
  DROP TYPE "public"."enum__pages_v_blocks_universal_hero_background_style";
  DROP TYPE "public"."enum__pages_v_blocks_universal_hero_content_alignment";
  DROP TYPE "public"."enum__pages_v_blocks_universal_c_t_a_variant";
  DROP TYPE "public"."enum__pages_v_blocks_universal_c_t_a_primary_c_t_a_type";
  DROP TYPE "public"."enum__pages_v_blocks_universal_c_t_a_primary_c_t_a_variant";
  DROP TYPE "public"."enum__pages_v_blocks_universal_c_t_a_secondary_c_t_a_type";
  DROP TYPE "public"."enum__pages_v_blocks_universal_c_t_a_secondary_c_t_a_variant";
  DROP TYPE "public"."enum__pages_v_blocks_universal_c_t_a_background_style";
  DROP TYPE "public"."enum__pages_v_blocks_feature_grid_features_link_type";
  DROP TYPE "public"."enum__pages_v_blocks_feature_grid_variant";
  DROP TYPE "public"."enum__pages_v_blocks_feature_grid_columns";
  DROP TYPE "public"."enum__pages_v_blocks_feature_grid_card_style";
  DROP TYPE "public"."enum__pages_v_blocks_feature_grid_background_style";
  DROP TYPE "public"."enum__pages_v_blocks_content_grid_items_link_type";
  DROP TYPE "public"."enum__pages_v_blocks_content_grid_variant";
  DROP TYPE "public"."enum__pages_v_blocks_content_grid_columns";
  DROP TYPE "public"."enum__pages_v_blocks_content_grid_background_style";
  DROP TYPE "public"."enum__pages_v_blocks_stats_section_variant";
  DROP TYPE "public"."enum__pages_v_blocks_stats_section_columns";
  DROP TYPE "public"."enum__pages_v_blocks_stats_section_background_style";
  DROP TYPE "public"."enum__pages_v_blocks_process_steps_variant";
  DROP TYPE "public"."enum__pages_v_blocks_process_steps_background_style";
  DROP TYPE "public"."enum__pages_v_blocks_content_cards_cards_link_type";
  DROP TYPE "public"."enum__pages_v_blocks_content_cards_variant";
  DROP TYPE "public"."enum__pages_v_blocks_content_cards_columns";
  DROP TYPE "public"."enum__pages_v_blocks_content_cards_background_style";
  DROP TYPE "public"."enum__pages_v_blocks_contact_section_variant";
  DROP TYPE "public"."enum__pages_v_blocks_contact_section_background_style";
  DROP TYPE "public"."enum__pages_v_blocks_comparison_table_items_primary";
  DROP TYPE "public"."enum__pages_v_blocks_comparison_table_items_secondary";
  DROP TYPE "public"."enum__pages_v_blocks_comparison_table_background_style";
  DROP TYPE "public"."enum__pages_v_blocks_simple_page_breadcrumbs_link_type";
  DROP TYPE "public"."enum__pages_v_blocks_simple_page_links_link_type";
  DROP TYPE "public"."enum__pages_v_blocks_simple_page_variant";
  DROP TYPE "public"."enum__pages_v_blocks_brand_showcase_variant";
  DROP TYPE "public"."enum__pages_v_blocks_brand_showcase_background_style";
  DROP TYPE "public"."enum__pages_v_blocks_technical_content_variant";
  DROP TYPE "public"."enum__pages_v_blocks_technical_content_background_style";
  DROP TYPE "public"."enum__pages_v_blocks_resource_gallery_variant";
  DROP TYPE "public"."enum__pages_v_blocks_resource_gallery_background_style";
  DROP TYPE "public"."enum__pages_v_version_status";
  DROP TYPE "public"."enum__pages_v_published_locale";
  DROP TYPE "public"."enum_posts_status";
  DROP TYPE "public"."enum__posts_v_version_status";
  DROP TYPE "public"."enum__posts_v_published_locale";
  DROP TYPE "public"."enum_contact_submissions_emails_sent_type";
  DROP TYPE "public"."enum_contact_submissions_status";
  DROP TYPE "public"."enum_contact_submissions_priority";
  DROP TYPE "public"."enum_contact_submissions_source";
  DROP TYPE "public"."enum_header_navigation_dropdown_items_type";
  DROP TYPE "public"."enum_header_navigation_nav_type";
  DROP TYPE "public"."enum_header_navigation_type";
  DROP TYPE "public"."enum_header_navigation_dropdown_style";
  DROP TYPE "public"."enum_header_categories_nav_display_type";
  DROP TYPE "public"."enum_footer_footer_columns_links_type";
  DROP TYPE "public"."enum_footer_bottom_links_type";
  DROP TYPE "public"."enum_homepage_blocks_hero_cta_buttons_type";
  DROP TYPE "public"."enum_homepage_blocks_hero_cta_buttons_variant";
  DROP TYPE "public"."enum_homepage_blocks_services_services_button_type";
  DROP TYPE "public"."enum_homepage_blocks_about_button_type";
  DROP TYPE "public"."enum_homepage_blocks_why_trust_pillars_icon";
  DROP TYPE "public"."enum_homepage_blocks_why_trust_button_type";
  DROP TYPE "public"."enum_homepage_blocks_projects_button_type";`)
}
