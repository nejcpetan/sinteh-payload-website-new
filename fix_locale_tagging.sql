-- SQL script to tag existing content as Slovenian locale
-- This will make your existing content appear in the Slovenian locale

-- 1. Insert existing pages content into pages_locales table as Slovenian
INSERT INTO pages_locales (title, meta_title, meta_description, _locale, _parent_id)
SELECT 
    title, 
    meta_title, 
    meta_description, 
    'sl' as _locale,
    id as _parent_id
FROM pages 
WHERE id NOT IN (
    SELECT _parent_id FROM pages_locales WHERE _locale = 'sl'
);

-- 2. Insert existing posts content into posts_locales table as Slovenian
INSERT INTO posts_locales (title, excerpt, meta_title, meta_description, meta_keywords, published, _locale, _parent_id)
SELECT 
    title,
    excerpt,
    meta_title,
    meta_description, 
    meta_keywords,
    true as published, -- Mark as published in Slovenian
    'sl' as _locale,
    id as _parent_id
FROM posts
WHERE id NOT IN (
    SELECT _parent_id FROM posts_locales WHERE _locale = 'sl'
);

-- 3. Insert existing categories into categories_locales table as Slovenian
INSERT INTO categories_locales (name, description, _locale, _parent_id)
SELECT 
    name,
    description,
    'sl' as _locale,
    id as _parent_id
FROM categories
WHERE id NOT IN (
    SELECT _parent_id FROM categories_locales WHERE _locale = 'sl'
);

-- 4. Insert existing header content into header_locales table as Slovenian
INSERT INTO header_locales (site_name, _locale, _parent_id)
SELECT 
    site_name,
    'sl' as _locale,
    id as _parent_id
FROM header
WHERE id NOT IN (
    SELECT _parent_id FROM header_locales WHERE _locale = 'sl'
);

-- 5. Insert existing footer content into footer_locales table as Slovenian
INSERT INTO footer_locales (copyright, _locale, _parent_id)
SELECT 
    copyright,
    'sl' as _locale,
    id as _parent_id
FROM footer
WHERE id NOT IN (
    SELECT _parent_id FROM footer_locales WHERE _locale = 'sl'
);

-- 6. Tag all homepage blocks as Slovenian locale
-- Update hero blocks
UPDATE homepage_blocks_hero 
SET _locale = 'sl' 
WHERE _locale IS NULL OR _locale != 'sl';

-- Update services blocks
UPDATE homepage_blocks_services 
SET _locale = 'sl' 
WHERE _locale IS NULL OR _locale != 'sl';

-- Update about blocks
UPDATE homepage_blocks_about 
SET _locale = 'sl' 
WHERE _locale IS NULL OR _locale != 'sl';

-- Update logo belt blocks
UPDATE homepage_blocks_logo_belt 
SET _locale = 'sl' 
WHERE _locale IS NULL OR _locale != 'sl';

-- Update all nested homepage block elements
UPDATE homepage_blocks_hero_cta_buttons 
SET _locale = 'sl' 
WHERE _locale IS NULL OR _locale != 'sl';

UPDATE homepage_blocks_services_services 
SET _locale = 'sl' 
WHERE _locale IS NULL OR _locale != 'sl';

UPDATE homepage_blocks_services_services_features 
SET _locale = 'sl' 
WHERE _locale IS NULL OR _locale != 'sl';

UPDATE homepage_blocks_about_badges 
SET _locale = 'sl' 
WHERE _locale IS NULL OR _locale != 'sl';

UPDATE homepage_blocks_about_stats 
SET _locale = 'sl' 
WHERE _locale IS NULL OR _locale != 'sl';

UPDATE homepage_blocks_about_process 
SET _locale = 'sl' 
WHERE _locale IS NULL OR _locale != 'sl';

UPDATE homepage_blocks_logo_belt_logos 
SET _locale = 'sl' 
WHERE _locale IS NULL OR _locale != 'sl';

-- 7. Tag navigation elements as Slovenian
UPDATE header_navigation_locales 
SET _locale = 'sl' 
WHERE _locale IS NULL OR _locale != 'sl';

UPDATE header_navigation_dropdown_items_locales 
SET _locale = 'sl' 
WHERE _locale IS NULL OR _locale != 'sl';

-- 8. Tag footer elements as Slovenian
UPDATE footer_footer_columns_locales 
SET _locale = 'sl' 
WHERE _locale IS NULL OR _locale != 'sl';

UPDATE footer_footer_columns_links_locales 
SET _locale = 'sl' 
WHERE _locale IS NULL OR _locale != 'sl';

-- Verification queries (run these to check the results)
-- SELECT COUNT(*) as slovenian_pages FROM pages_locales WHERE _locale = 'sl';
-- SELECT COUNT(*) as slovenian_posts FROM posts_locales WHERE _locale = 'sl';
-- SELECT COUNT(*) as slovenian_categories FROM categories_locales WHERE _locale = 'sl';
-- SELECT COUNT(*) as slovenian_homepage_blocks FROM homepage_blocks_hero WHERE _locale = 'sl';
