# Schemas — Branching Tales

> Status: Draft scaffolding. Full JSON Schema bodies added in next session.

This is the source-of-truth catalogue for all Revisium tables in `demo-rpg-data`. The companion CMS project `demo-rpg-cms` is documented separately at the end.

## Design goals

Every table is shaped to demonstrate at least one Revisium feature beyond plain CRUD:

| Feature | Tables that demo it |
|---|---|
| Single FK | `items.typeId`, `npcs.factionId`, `npcs.locationId`, `monsters.factionId`, `quests.giverNpcId`, `heroes.classId` |
| FK array | `factions.allyIds`, `factions.enemyIds`, `classes.startingAbilityIds`, `monsters.abilityIds`, `heroes.abilityIds`, `heroes.inventoryItemIds`, `parties.heroIds`, `quests.objectiveIds`, `quests.rewardItemIds`, `regions.locationIds`, `locations.npcIds`, `locations.monsterIds` |
| Self-referencing FK array | `factions.allyIds` / `factions.enemyIds` (both reference factions) |
| File field | `heroes.portrait`, `npcs.portrait`, `monsters.image`, `items.icon`, `abilities.icon`, `locations.map`, `factions.crest` |
| Computed field (scalar) | `items.marketValue`, `abilities.damageAtLevel` |
| Computed field (cross-table) | `heroes.totalHp` (joins to class), `heroes.totalDamage` (joins via inventory) |
| Computed field (array aggregation) | `parties.partyPower` (AVG over heroes), `parties.totalGold` (SUM over heroes), `quests.totalXp` (SUM over objectives) |
| Computed field (nested array path) | `quests.totalLoot` (SUM over `objectiveIds[*].rewardItemIds[*].xp`) |
| Conditional formula | `items.rarityTag` (if rarity == "legendary" then ...) |
| String concat | `heroes.fullTitle` (class.name + " " + name) |
| Localisation | `name` / `nameRu` on every user-facing entity |
| Enum constraint | `abilities.school` (evocation / necromancy / conjuration / illusion / abjuration / ...) |
| Deep nested JSON | `dialogs.lines` (array of objects with branches) |

## Tables

### Game dictionary (`demo-rpg-data`)

| # | Table | Purpose | Demonstrates |
|---|---|---|---|
| 1 | `regions` | Continents / kingdoms | hierarchy root, FK array → locations |
| 2 | `locations` | Towns, dungeons | FK → region, file map, FK arrays → npcs/monsters |
| 3 | `factions` | Allegiances | self-referencing FK arrays, file crest |
| 4 | `item_types` | Weapon/armor/potion/scroll | enum-style dictionary, FK target |
| 5 | `items` | Equipment & consumables | FK → type, file icon, scalar formula `marketValue` |
| 6 | `abilities` | Spells & skills | enum-constrained `school`, formula `damageAtLevel`, file icon |
| 7 | `classes` | Hero archetypes | FK array → starting abilities, formula `avgStartingPower` |
| 8 | `npcs` | Quest givers, merchants | FK → faction, FK → location, file portrait |
| 9 | `monsters` | Enemies | FK → faction, FK array → abilities, formula `challengeRating` |
| 10 | `heroes` | Roster | FK → class, FK array → abilities + inventory, **multi-table** formula `totalHp` |
| 11 | `parties` | Adventuring groups | FK array → heroes, **aggregation** formulas (SUM/AVG/MAX) |
| 12 | `quests` | Adventures | FK → giver npc, FK arrays → objectives + rewards, file map, **nested-array** formula |
| 13 | `quest_objectives` | Sub-tasks | child of `quests`, formula `xpReward` |
| 14 | `dialogs` | NPC dialogue | FK → npc, deep nested JSON arrays |
| 15 | `localizations` | en/ru side-by-side strings | locale + key + value pattern |

### Marketing CMS (`demo-rpg-cms`)

| # | Table | Purpose |
|---|---|---|
| 1 | `landing_hero` | Hero section copy |
| 2 | `landing_features` | Feature grid |
| 3 | `landing_testimonials` | Player quotes |
| 4 | `blog_posts` | Markdown articles, SEO metadata, hero image |
| 5 | `blog_authors` | Author profiles, avatar |

## Schema bodies

<!-- TODO. Each table gets a full ```json …``` block with its JSON Schema, including:
- type, properties, required
- foreignKey markers
- file $ref
- computed-field markers (formula expression)
- enum lists where appropriate
-->

## FK graph

<!-- TODO mermaid graph showing all foreign-key relationships. -->

## Migration plan

<!-- TODO: which tables ship in v1, which add later, which use schema evolution to demo migrations CLI. -->
