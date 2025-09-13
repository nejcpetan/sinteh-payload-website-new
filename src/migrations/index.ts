import * as migration_20250629_202637_initial from './20250629_202637_initial';
import * as migration_20250712_180432 from './20250712_180432';
import * as migration_20250823_112727 from './20250823_112727';
import * as migration_20250823_114311 from './20250823_114311';
import * as migration_20250831_111320_universal_blocks from './20250831_111320_universal_blocks';
import * as migration_20250907_102003_header_dropdown_navigation from './20250907_102003_header_dropdown_navigation';
import * as migration_20250913_113931 from './20250913_113931';
import * as migration_20250913_114737_data_preserving_localization from './20250913_114737_data_preserving_localization';
import * as migration_20250913_120903_migrate_homepage_content from './20250913_120903_migrate_homepage_content';
import * as migration_20250913_120915_migrate_homepage_to_slovenian from './20250913_120915_migrate_homepage_to_slovenian';
import * as migration_20250913_migrate_homepage_content from './20250913_migrate_homepage_content';

export const migrations = [
  {
    up: migration_20250629_202637_initial.up,
    down: migration_20250629_202637_initial.down,
    name: '20250629_202637_initial',
  },
  {
    up: migration_20250712_180432.up,
    down: migration_20250712_180432.down,
    name: '20250712_180432',
  },
  {
    up: migration_20250823_112727.up,
    down: migration_20250823_112727.down,
    name: '20250823_112727',
  },
  {
    up: migration_20250823_114311.up,
    down: migration_20250823_114311.down,
    name: '20250823_114311',
  },
  {
    up: migration_20250831_111320_universal_blocks.up,
    down: migration_20250831_111320_universal_blocks.down,
    name: '20250831_111320_universal_blocks',
  },
  {
    up: migration_20250907_102003_header_dropdown_navigation.up,
    down: migration_20250907_102003_header_dropdown_navigation.down,
    name: '20250907_102003_header_dropdown_navigation',
  },
  {
    up: migration_20250913_113931.up,
    down: migration_20250913_113931.down,
    name: '20250913_113931',
  },
  {
    up: migration_20250913_114737_data_preserving_localization.up,
    down: migration_20250913_114737_data_preserving_localization.down,
    name: '20250913_114737_data_preserving_localization',
  },
  {
    up: migration_20250913_120903_migrate_homepage_content.up,
    down: migration_20250913_120903_migrate_homepage_content.down,
    name: '20250913_120903_migrate_homepage_content',
  },
  {
    up: migration_20250913_120915_migrate_homepage_to_slovenian.up,
    down: migration_20250913_120915_migrate_homepage_to_slovenian.down,
    name: '20250913_120915_migrate_homepage_to_slovenian',
  },
  {
    up: migration_20250913_migrate_homepage_content.up,
    down: migration_20250913_migrate_homepage_content.down,
    name: '20250913_migrate_homepage_content'
  },
];
