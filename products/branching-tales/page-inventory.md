# Page Inventory — Branching Tales

> Product-level route scope for the Branching Tales frontend. Exact route
> behaviour, page specs, data contracts, and implementation status live in
> [`demo-rpg-frontend/docs/product/page-inventory.md`](https://github.com/revisium/demo-rpg-frontend/blob/master/docs/product/page-inventory.md).

**Navigation:** [products README](./README.md) ·
[feature coverage matrix](./revisium-feature-coverage.md) ·
[BR-0003](../../requirements/BR-0003-frontend-showcase.md)

## Boundary

This file answers: "Which public routes belong to the demo product, and why?"

It does not answer: "Is the route implemented, what components does it use, or
what exact fields does the frontend query?" Those implementation details belong
to `demo-rpg-frontend/docs/product/`.

## Route Scope

| Route | Product role | Capability focus |
|---|---|---|
| `/` | Codex/database entry point | Search, catalog routing, featured data, guides |
| `/about` | Technical source story | 80/20 Revisium proof, architecture narrative |
| `/regions` | World atlas catalog | Nested JSON, localized strings, enum, cover image, pagination |
| `/regions/[id]` | Region detail | Federation reference: Revisium-owned fields plus backend-owned enrichment |
| `/heroes` | Hero catalog | FK filters, formula labels, portrait files |
| `/heroes/[id]` | Hero detail | Single FK, array FK, embedded equipment, formulas, portrait |
| `/items` | Item catalog | Complex filters, multi-key sort, cursor pagination, SVG icons |
| `/items/[id]` | Item detail | Embedded modifiers, formulas, type/stat references |
| `/item-types` | Item taxonomy | Supporting lookup table for item types |
| `/stats` | Stat taxonomy | Supporting lookup table for item modifiers |
| `/effects` | Effect taxonomy | Supporting lookup table for ability effects |
| `/monsters` | Bestiary catalog | Faction FK, drops, formula counters, illustration |
| `/monsters/[id]` | Monster detail | Ability array FK, drop formulas, source links |
| `/quests` | Quest catalog | NPC/location FKs, repeatable and level filters |
| `/quests/[id]` | Quest detail | Two-level embedded arrays, step images, formulas |
| `/dialogs` | Dialog catalog | NPC speaker FKs, embedded localized lines |
| `/parties` | Party catalog | Array FK column and formula counters |
| `/parties/[id]` | Party detail | Array FK resolution, `member_count`, `is_full` |
| `/factions` | Faction catalog | Crest file and alignment enum |
| `/factions/[id]` | Faction detail | Reverse-FK aggregations and crest rendering |
| `/npcs` | NPC catalog | Portrait file and computed display label |
| `/npcs/[id]` | NPC detail | Location FK and portrait source proof |
| `/locations` | Location catalog | Region FK, map preview, gallery file array |
| `/locations/[id]` | Location detail | Large map file, dimensions, gallery |
| `/classes` | Class reference catalog | Required icon file and hero FK target |
| `/abilities` | Ability catalog | SVG icon file and effect references |
| `/search` | Global search | Revisium full-text search across data and CMS |
| `/balance-patch` | Revision story | `head` vs `draft`, revision diff |
| `/blog` | Guide/article catalog | CMS markdown content |
| `/blog/[slug]` | Guide/article detail | CMS markdown body, hero image, author avatar |
| `/news` | Future updates feed | Blocked until a real news table/source is confirmed |
| `/news/[slug]` | Future update detail | Blocked until a real news table/source is confirmed |

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

## Update Rule

Update this file when the product route set or navigation intent changes. Update
`demo-rpg-frontend/docs/product/page-inventory.md` when implementation status,
page specs, exact data contracts, or frontend route behaviour changes.
