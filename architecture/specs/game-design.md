# Game Design — Branching Tales

> Status: Draft. Locked enough to drive schemas; flavor details (proper names, exact stat numbers) can still tune without touching the table contract.

**Navigation:** [project passport](../../README.md) · [overview](../overview.md) · [schemas](./schemas.md) · [formulas](./formulas.md) · [files](./files.md)

## Concept

Branching Tales is a fantasy adventurer's guild simulator set in **Eldoria**, a continent emerging from the **Sundering** — a magical cataclysm two centuries ago that reshaped the land, broke the old kingdoms, and left scars across the geography. The player runs a guild that recruits heroes, equips them, sends them on quests, and grows the roster over time.

The demo is read-only: visitors browse the world, the heroes, the items, the monsters, and observe a fully-modelled game-content domain expressed in Revisium.

## Pillars

1. **Recognizable fantasy.** Warrior / mage / rogue, orc / elf / undead, evocation / necromancy. Demo visitors should not have to learn lore to read schemas. Naming is utility, not surprise.
2. **Rich relationships.** Every form of foreign key is exercised: single FK, FK array, self-referencing FK array, FK inside embedded objects.
3. **Numerical depth.** Hit points, damage, modifiers, rarity multipliers, drop chances — every numerical entity hosts at least one computed field.
4. **Visual content.** Portraits, icons, maps, crests — every visible category has a file field.
5. **Iterative balance.** Damage tuning and drop tables ship in `master + balance-patch-1.x` branches to demonstrate Revisium's branching workflow without disturbing live data.

## World — Eldoria

Eldoria is a single continent, ~3000 km north-to-south. The Sundering 200 years ago broke the central plains into the Ashen Wastes and pushed the surviving kingdoms toward the edges of the map. The five present-day regions formed in its aftermath.

### Regions

| Region | Climate / Terrain | Dominant culture | Demo role |
|---|---|---|---|
| **Verdant Marches** | Temperate plains and woodland | Mixed human kingdoms (Order of the Silver Dawn seat) | Starter region; tutorial-grade quests |
| **Ironcrest Mountains** | Northern alpine, deep mines | Dwarven clans (Stoneward Brotherhood) | Mid-tier quests; mining and forge content |
| **Sundered Coast** | Eastern littoral, broken islands | Port cities, pirate confederacies | Naval-themed quests; trade |
| **Ashen Wastes** | Southern desert, scarred by Sundering | Forsaken (undead), nomad tribes | Endgame quests; danger zone |
| **Whispering Vale** | Western primeval forest | Elven scholars (Whisperwood Concord) | Magic-heavy quests; lore depth |

### Factions

| Faction | Alignment | Allies | Enemies |
|---|---|---|---|
| **Order of the Silver Dawn** | Lawful good — paladins, oaths, light magic | Stoneward Brotherhood | Crimson Pact, The Forsaken |
| **Stoneward Brotherhood** | Lawful neutral — dwarven clans, mining and forging | Order of the Silver Dawn, Whisperwood Concord | Crimson Pact, The Forsaken |
| **Whisperwood Concord** | Neutral — elven scholars, druids, ancient magic | Stoneward Brotherhood | The Forsaken |
| **Crimson Pact** | Chaotic neutral — orc warband, raiders | (none) | Order of the Silver Dawn, Stoneward Brotherhood, Whisperwood Concord |
| **The Forsaken** | Chaotic evil — undead remnants of pre-Sundering kingdoms | (none) | All living factions |

The relationship table exercises self-referencing FK arrays (`ally_ids[]` and `enemy_ids[]` both target `factions`).

## Hero Classes

Six recognizable archetypes:

| Class | Primary stat | base_hp | hp_per_level | mp_per_level | Notes |
|---|---|---|---|---|---|
| **Warrior** | Strength | 120 | 10 | 2 | Front-line melee |
| **Paladin** | Strength | 110 | 9 | 5 | Holy warrior; partial caster |
| **Rogue** | Dexterity | 80 | 6 | 3 | Stealth and burst damage |
| **Mage** | Intelligence | 60 | 4 | 12 | Pure caster, glass cannon |
| **Cleric** | Wisdom | 90 | 7 | 10 | Divine support |
| **Ranger** | Dexterity | 95 | 7 | 4 | Wilderness specialist |

Class data is static — used as an FK target by `heroes.class_id`. Heroes carry their own `level` and computed equipment bonuses. Cross-table aggregation (e.g. "compute total HP using class.base_hp + class.hp_per_level * level + constitution") is **not** computed by the formula engine because Revisium formulas operate on a single row. Heroes' visible HP is computed by the application layer (`demo-rpg-backend`) using the class FK.

## Magic Schools (enum)

`abilities.school` is constrained to one of:

`abjuration` · `conjuration` · `divination` · `enchantment` · `evocation` · `illusion` · `necromancy` · `transmutation`

Eight schools — the classic D&D taxonomy — chosen because every fantasy reader recognizes them. The enum constraint demonstrates JSON Schema enum validation in Revisium.

## Item Types

`item_types` is a small lookup with four canonical entries:

| Type | Purpose | Slots |
|---|---|---|
| `weapon` | Damage / offense | one-handed, two-handed, ranged |
| `armor` | Defense | head, chest, legs, hands, feet |
| `potion` | Consumable buff or restore | inventory only |
| `scroll` | One-shot spell cast | inventory only |

`items.type_id` references this table. Storing types as a table (not an enum) is deliberate — it lets editors add a `talisman` or `gem` type later without a schema migration.

## Item Rarity

Items have a `rarity` enum (`common`, `uncommon`, `rare`, `epic`, `legendary`) and a `rarity_multiplier` number. Together they drive the `market_value` formula.

## Monster Archetypes

Monsters are not exhaustively designed at the design layer — the schema defines the shape, the seed data lists ~20 monsters across the regions. Categories:

- **Beasts** (Verdant Marches, Whispering Vale): Dire Wolf, Forest Bear, Giant Spider
- **Humanoids** (everywhere): Goblin Raider, Bandit, Orc Warlord
- **Undead** (Ashen Wastes, ruins): Skeleton Knight, Wight, Lich (boss)
- **Aberrations** (Sundering scars): Wraith, Twisted Beast
- **Constructs** (Ironcrest, ancient elven sites): Stone Sentinel, Animated Armor

Each monster carries embedded `drops[]` (item drop table) and FK array `ability_ids[]`, exercising both patterns side-by-side.

## Quest Archetypes

Quests use the `steps[]` embedded-array pattern from the existing `revisium-cli/examples/quests` schema, evolved for Branching Tales. Categories:

- **Tutorial** (Verdant Marches, level 1-3): "Clear the Goblin Camp", "Deliver the Mayor's Letter"
- **Side quests** (level 4-10): "The Lost Heirloom", "Smuggler's Cove"
- **Story** (level 8-15): "Ascent of Ironcrest", "The Vale Speaks"
- **Endgame** (level 15+): "Into the Ashen Wastes", "The Lich's Throne"

Each quest has nested embedded structure: `steps[*].rewards[*].bonus_xp` — two levels of array traversal for the formula `quests.total_loot_xp`.

## NPCs

NPCs anchor quests and locations. Categories:

- **Quest givers** (one per major quest)
- **Merchants** (one per city, embedded `inventory_item_ids[]`)
- **Trainers** (one per class)
- **Lore-keepers** (one per region — give world-building dialogs)

`npcs.title` is a localized object (e.g. `{ en: "Captain", ru: "Капитан", ch: "队长" }`) and `npcs.full_title_en` is the formula `concat(title.en, " ", name.en)` — demonstrates string concatenation across same-row fields with explicit locale.

## Localization

Branching Tales uses **inline localized objects** for every user-facing string. The schema for any localized field is:

```json
{
  "type": "object",
  "required": ["en"],
  "properties": {
    "en": { "type": "string", "default": "" },
    "ru": { "type": "string", "default": "" },
    "ch": { "type": "string", "default": "" }
  },
  "additionalProperties": false
}
```

- `en` is the canonical fallback and is required.
- `ru` (Russian, ISO 639-1) and `zh` (Chinese, defaults to Simplified) are optional and represent reach into two large non-English developer audiences.
- New locales are added by widening the inline object — a real schema migration that demonstrates Revisium's migration tooling.

This pattern is referenced throughout schemas as **`<LocalizedString>`** to keep the docs readable. The actual JSON in `demo-rpg-backend/revisium/schemas/*.json` (once that repo is bootstrapped) inlines the full object body in every place.

Every entity that displays to a player has at least one localized string. Internal identifiers, enum codes, and FK strings remain plain `string`.

Formulas operate on locale-specific subfields explicitly (e.g. `concat(title.en, " ", name.en)`), not on the locale object as a whole.

## Naming Convention

| Convention | Pattern | Example |
|---|---|---|
| Table name | `snake_case`, plural for collections, singular for lookups | `heroes`, `item_types` |
| Field name | `snake_case` | `base_damage`, `is_repeatable` |
| Single FK field | `<target>_id` | `class_id`, `region_id`, `giver_npc_id` |
| FK array field | `<target>_ids` | `ally_ids`, `inventory_item_ids`, `hero_ids` |
| Embedded array field | plural noun, no `_id` suffix | `steps`, `effects`, `modifiers`, `drops` |
| Computed field | descriptive `snake_case` | `market_value`, `total_xp`, `is_veteran` |
| Locale-specific computed field | suffix locale code | `display_label_en` |
| Enum value | `lowercase_snake_case` | `legendary`, `lawful_good`, `evocation` |

## Branching Strategy

Two branches in `revisium/demo-rpg-data` from day one:

| Branch | Purpose |
|---|---|
| `master` | Stable game-data; what the public demo shows by default. |
| `balance-patch-1.1` | Demonstrates Revisium branching: a draft balance tweak (lower fireball damage, raise legendary potion rarity multiplier) without disturbing `master`. |

The frontend exposes a "branch switcher" so visitors can compare values side by side — a concrete payoff for the platform's branching story.

## Out of Scope (intentionally)

- Player accounts, progress, save state. The demo is read-only.
- Combat simulation. Damage formulas exist as data; the demo does not "run" combat.
- Real-time leaderboards or multiplayer.
- Locales beyond `en` / `ru` / `zh`.
- Audio assets (deferred — see [`files.md`](./files.md) open questions).

## Open Questions

| # | Question | Status |
|---|---|---|
| 1 | Lock proper names for the Order of the Silver Dawn leadership and Stoneward thane | Open |
| 2 | Decide rarity tier for the Crown of Solenor (legendary?), the demo's "marquee" item | Open |
| 3 | Number of seed quests per region (suggest 3 starter, 2 mid, 1 endgame each — totals to 30) | Open |
| 4 | Whether to split `zh` into `zh_cn` (Simplified) and `zh_tw` (Traditional) as a future migration | Open |
| 5 | Whether to add a fourth locale (e.g. `es`) or keep three for the demo | Open |
