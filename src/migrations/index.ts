import * as migration_20250629_202637_initial from './20250629_202637_initial'
import * as migration_20250712_180432 from './20250712_180432'
import * as migration_20250823_112727 from './20250823_112727'
import * as migration_20250823_114311 from './20250823_114311'
import * as migration_20250831_111320_universal_blocks from './20250831_111320_universal_blocks'
import * as migration_20250907_102003_header_dropdown_navigation from './20250907_102003_header_dropdown_navigation'

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
]
