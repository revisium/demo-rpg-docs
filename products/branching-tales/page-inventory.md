# Page Inventory — Branching Tales

> Canonical list of every route in `demo-rpg-frontend`, the data it reads, and the page doc that describes it. The list grows as page docs land under [`pages/`](./README.md) — empty rows are tracked as `(planned)` until the corresponding doc + implementation exists.

**Navigation:** [products README](./README.md) · [feature coverage matrix](./revisium-feature-coverage.md) · [BR-0003](../../requirements/BR-0003-frontend-showcase.md)

## Conventions

- **Route** — react-router path. `[id]` denotes a dynamic segment resolved from the Revisium row id.
- **Page doc** — link under `pages/`. When the row is `(planned)`, the cell is plain text.
- **Data sources** — the subgraphs and tables a page reads. Federated entities list every subgraph contributing fields.
- **Capabilities demonstrated** — short tag list pointing into [`revisium-feature-coverage.md`](./revisium-feature-coverage.md).
- **Status** — Draft (row only) / In delivery (page doc opened) / Done (live + Explainer Widget asserts the capability).

## Routes

| Route | Page doc | Data sources | Capabilities demonstrated | Status |
|---|---|---|---|---|
| `/` | `pages/home/` (planned) | `cms.landing_hero`, `cms.landing_features`, optional `cms.blog_posts`, game data previews as implemented | Game database/codex home: global search, featured catalogs, latest guides/updates, featured entities, world preview, optional Explainer Widget for live sections | Draft |
| `/about` | `pages/about/` (planned) | static page + [`messaging.md`](./messaging.md) | Long-form 80/20 narrative + architecture Mermaid diagram + "what Revisium did vs what we wrote" tables; canonical destination for technical source-story links | Draft |
| `/regions` | `pages/regions/` (planned) | `data.regions` | Catalog, `totalCount`, pagination, enum (climate), localized strings, required cover image file | Draft |
| `/regions/[id]` | `pages/regions/[id]/` (planned) | `data.regions` + `backend.RegionsNode` (federated) | **Federation enrichment** (likes / viewCount / comments owned by backend, name/climate/description/cover image owned by Revisium), single FK to nothing, cover image detail view | Draft |
| `/heroes` | `pages/heroes/` (planned) | `data.heroes`, `data.classes`, `data.regions`, `data.factions` | Catalog with FK-resolved class/region filters, formula-derived `display_name_en`, portrait file field, filter+sort+pagination | Draft |
| `/heroes/[id]` | `pages/heroes/[id]/` (planned) | `data.heroes` + FKs | Single FK (`class_id`), array FKs (`ability_ids`, `inventory_item_ids`), embedded `equipment[]`, formulas (`is_veteran`, `total_equipment_modifier`, `equipped_count`), PNG portrait | Draft |
| `/items` | `pages/items/` (planned) | `data.items`, `data.item_types`, `data.stats` | Large-catalog complex `where` filters (numeric range, FK equality, contains), multi-field `orderBy`, cursor pagination, SVG icon files | Draft |
| `/items/[id]` | `pages/items/[id]/` (planned) | `data.items` + FKs | Single FK (`type_id`), embedded `modifiers[]`, formulas (`market_value`, `rarity_tag`), SVG icon | Draft |
| `/item-types` | `pages/item-types/` (planned) | `data.item_types` | Supporting lookup catalog for `items.type_id`; localized labels, descriptions, and stable machine codes | Draft |
| `/stats` | `pages/stats/` (planned) | `data.stats` | Supporting lookup catalog for `items.modifiers[*].stat_id`; localized labels plus stable abbreviations | Draft |
| `/effects` | `pages/effects/` (planned) | `data.effects` | Supporting lookup catalog for `abilities.effects[*].effect_id`; enum `kind` and default duration | Draft |
| `/monsters` | `pages/monsters/` (planned) | `data.monsters`, `data.factions` | Single FK (`faction_id`), embedded `drops[]`, formulas (`avg_drop_chance`, `drop_count`), illustration file field | Draft |
| `/monsters/[id]` | `pages/monsters/[id]/` (planned) | `data.monsters` + FKs + array FK (`ability_ids`) | Same + array FK to `abilities` | Draft |
| `/quests` | `pages/quests/` (planned) | `data.quests`, `data.npcs`, `data.locations` | Catalog with FK columns, level filter, repeatable flag | Draft |
| `/quests/[id]` | `pages/quests/[id]/` (planned) | `data.quests` + FKs + `data.items` (loot resolution) | Embedded `steps[]` with required `steps[].image`, nested `steps[].rewards[]` (two-level), formulas (`total_xp`, `total_loot_xp`, `step_count`) | Draft |
| `/dialogs` | `pages/dialogs/` (planned) | `data.dialogs`, `data.npcs` | NPC dialog catalog with FK to NPCs, embedded `lines[]`, localized line text, and `line_count` formula | Draft |
| `/parties` | `pages/parties/` (planned) | `data.parties`, `data.heroes` | Catalog with FK-array column, formula counters | Draft |
| `/parties/[id]` | `pages/parties/[id]/` (planned) | `data.parties` + array FK (`hero_ids`) | Array foreign key resolution, `count(hero_ids)`, boolean from length (`is_full`) | Draft |
| `/factions` | `pages/factions/` (planned) | `data.factions` | Catalog with SVG crest field, alignment enum | Draft |
| `/factions/[id]` | `pages/factions/[id]/` (planned) | `data.factions` + reverse joins to `monsters` / `heroes` (via `faction_id`) | Crest file rendering, reverse-FK aggregations | Draft |
| `/npcs` | `pages/npcs/` (planned) | `data.npcs`, `data.locations` | Catalog with portrait + `display_label_en` precomposed string | Draft |
| `/locations` | `pages/locations/` (planned) | `data.locations`, `data.regions` | FK to region, map image file, required gallery array field | Draft |
| `/locations/[id]` | `pages/locations/[id]/` (planned) | `data.locations` + FK to `regions` | Large map image + dimensions metadata, gallery file array, coordinate object | Draft |
| `/classes` | `pages/classes/` (planned) | `data.classes` | Small enum-like catalog with required class icon file | Draft |
| `/abilities` | `pages/abilities/` (planned) | `data.abilities` | SVG icon catalog | Draft |
| `/search` | `pages/search/` (planned) | Revisium `search_rows` across `data` + `cms` | Full-text search; results grouped by subgraph/table | Draft |
| `/balance-patch` *(BR-0003 §9 Q2)* | `pages/balance-patch/` (planned) | `data.items` at `master:head` vs `master:draft` | **Branching preview** — revision URI swap; `get_revision_changes` diff | Draft |
| `/blog` | `pages/blog/` (planned) | `cms.blog_posts`, `cms.blog_authors` | Guides/articles catalog in the public nav; can carry the long-form 80/20 essay and game-world guides until a dedicated news table exists | Draft |
| `/blog/[slug]` | `pages/blog/[slug]/` (planned) | `cms.blog_posts`, `cms.blog_authors` | Guide/article detail with hero image, author avatar, and markdown body | Draft |
| `/news` | `pages/news/` (planned) | **Blocked:** no confirmed `news` table yet. Candidate: future `data.news` or `cms.news` + optional `backend.NewsNode` for `likes` / `viewCount` | Future patch-notes/news feed demonstrating **multi-key `orderBy`**, **time-window `where`**, enum category, pinned-first pattern, and cover-image file field | Blocked |
| `/news/[slug]` | `pages/news/[slug]/` (planned) | **Blocked:** same as `/news` | Future news detail; possible second federation reference after `/regions/[id]` | Blocked |

## Navigation Model

V1 top navigation uses direct links and no dropdowns:

| Header item | Target | Notes |
|---|---|---|
| Home | `/` | Codex/database entry. |
| Heroes | `/heroes` | Character-family entry route. |
| Items | `/items` | Item-family entry route. |
| Monsters | `/monsters` | Bestiary entry route. |
| World | `/regions` | World-family entry route. |
| Quests | `/quests` | Quest-family entry route. |
| Guides | `/blog` | Editorial/guides route backed by `blog_posts`. |
| Search | `/search` | Global search across game data and CMS. |
| Language | n/a | Header button showing `EN`, `RU`, or `ZH`; opens the language switcher. |

Section subnavigation appears inside catalog/detail pages rather than in header
dropdowns:

| Section family | Entry route | Sibling catalogs |
|---|---|---|
| Heroes | `/heroes` | Heroes (`/heroes`), Classes (`/classes`), Abilities (`/abilities`), NPCs (`/npcs`), Parties (`/parties`) |
| Items | `/items` | Items (`/items`), Item Types (`/item-types`), Stats (`/stats`), Effects (`/effects`) |
| World | `/regions` | Regions (`/regions`), Locations (`/locations`), Factions (`/factions`) |
| Quests | `/quests` | Quests (`/quests`), Dialogs (`/dialogs`) |

Top-level items should not link to abstract hub pages until those pages become
useful aggregators. In v1, each top-level item opens the primary catalog for its
family.

## How this index stays accurate

Every PR that adds a route, page doc, or removes a page from the frontend updates this table in the same commit. A row's status moves forward (Draft → In delivery → Done) only after both the page doc and the Explainer Widget for that page assert the capability.
