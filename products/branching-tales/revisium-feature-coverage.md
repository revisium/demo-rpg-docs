# Revisium Feature Coverage — Branching Tales

> Status: v1 scope, derived from [BR-0003 — Frontend Showcase](../../requirements/BR-0003-frontend-showcase.md). Every row maps a Revisium (or Apollo Federation) capability to the frontend page that demonstrates it. A row is **In delivery** when there is an open page doc under [`pages/`](./README.md#planned-page-set) tracking it, **Done** when the page is shipped *and* the Explainer Widget surfaces the capability to the visitor.

**Navigation:** [products README](./README.md) · [BR-0003](../../requirements/BR-0003-frontend-showcase.md) · [schemas spec](../../architecture/specs/schemas.md) · [formulas spec](../../architecture/specs/formulas.md) · [files spec](../../architecture/specs/files.md)

## How to read this matrix

- **Capability** — the Revisium / federation feature being shown.
- **Where in the data** — concrete table.field on which the capability is observable. Lets the reader cross-check with [schemas](../../architecture/specs/schemas.md) / [formulas](../../architecture/specs/formulas.md) / [files](../../architecture/specs/files.md).
- **Demonstrated on** — the canonical frontend page that owns this row. Other pages may use the same capability incidentally; the canonical page is the one whose Explainer Widget calls it out.
- **API surface shown** — GraphQL is always available; this column flags pages that also surface the REST and/or MCP equivalent in the widget tabs.
- **Explainer reveals** — what the Explainer Widget shows on that page, beyond rendered UI: the query/REST/MCP snippet, JSON sample, subgraph attribution, `cloud.revisium.io` deep link, etc.
- **Status** — Draft (scope only) / In delivery (page doc opened) / Done (live + explainer asserts it).

## 1. Schema modelling

| Capability | Where in the data | Demonstrated on | API surface shown | Explainer reveals | Status |
|---|---|---|---|---|---|
| Nested JSON objects | `regions.data.name`, `items.data.icon` | `pages/regions/` | GraphQL | The `data { name { en } description { en } }` projection — Revisium auto-generates GraphQL types from JSON Schema | Done (regions catalog) |
| Localized strings (`en` / `ru` / `zh`) | `<LocalizedString>` convention (regions, heroes, items, …) | `pages/regions/`, `pages/heroes/` | GraphQL | A language toggle re-issues the query with a different sub-field selection (`name.en` vs `name.ru`); link to schemas spec convention | In delivery |
| Single foreign key | `heroes.region_id → regions`, `items.item_type_id → item_types` | `pages/heroes/[id]/`, `pages/items/[id]/` | GraphQL | The FK column in the JSON schema + the nested object the router resolves to in the response; deep link to the target row in `cloud.revisium.io` | Draft |
| Array foreign key | `parties.members[] → heroes`, `factions.allies[] → factions` | `pages/parties/[id]/` | GraphQL | The `foreignKey` annotation in the schema + the resolved-array response shape; "follow each FK" deep links | Draft |
| Embedded arrays (single-level) | `quests.steps[]`, `heroes.equipment[]` | `pages/quests/[id]/`, `pages/heroes/[id]/` | GraphQL | The inline-array JSON schema definition + the way you query it without a separate table | Draft |
| Embedded arrays (two-level nesting) | `quests.steps[].rewards[]`, `monsters.drops[].loot[]` | `pages/quests/[id]/`, `pages/monsters/[id]/` | GraphQL | The nested array shape + the formula that reduces across both levels (`total_loot_xp`) | Draft |
| Enums | `regions.data.climate`, `items.data.rarity` | `pages/regions/`, `pages/items/` | GraphQL | The `enum` JSON Schema declaration + how it surfaces as `enum` in the federated GraphQL SDL | Draft |
| Schema evolution / migrations | All tables (via `migrations.json`) | `pages/balance-patch/` *(planned)* | GraphQL | The `migrations.json` excerpt + `revisium-cli apply-migrations` invocation that produced the current schema; link to the operations runbook | Draft |

## 2. Computed / formula fields

For the formula engine semantics, see [`formulas.md`](../../architecture/specs/formulas.md). Each row below pulls a concrete formula and the page that surfaces its output.

| Capability | Formula | Demonstrated on | API surface shown | Explainer reveals | Status |
|---|---|---|---|---|---|
| Scalar arithmetic | `items.market_value` | `pages/items/[id]/` | GraphQL | The formula expression + the input fields it reads + the live output value; link to formulas spec §1 | Draft |
| Nested conditional | `items.rarity_tag` | `pages/items/[id]/` | GraphQL | The conditional expression + the rendered tag; link to formulas spec §2 | Draft |
| Boolean derived | `heroes.is_veteran` | `pages/heroes/[id]/` | GraphQL | The boolean expression + how a "Veteran" pill is gated on it; link to formulas spec §3 | Draft |
| Counter on FK array | `factions.ally_count` | `pages/factions/[id]/` | GraphQL | The `length(allies)` formula + the rendered count chip | Draft |
| Embedded array SUM (one level) | `heroes.total_equipment_modifier`, `quests.total_xp` | `pages/heroes/[id]/`, `pages/quests/[id]/` | GraphQL | The `sum(equipment[].modifier)` expression + the rendered total | Draft |
| Embedded array SUM (two levels) | `quests.total_loot_xp` | `pages/quests/[id]/` | GraphQL | The `sum(steps[].rewards[].xp)` expression + the rendered total | Draft |
| Embedded array AVG | `monsters.avg_drop_chance` | `pages/monsters/[id]/` | GraphQL | The `avg(drops[].chance)` expression + the rendered percentage | Draft |
| Embedded array MAX | `monsters.max_drop_quantity` | `pages/monsters/[id]/` | GraphQL | The `max(drops[].quantity)` expression + the rendered count | Draft |
| Length on embedded array | `parties.member_count`, `quests.step_count` | `pages/parties/[id]/`, `pages/quests/[id]/` | GraphQL | The `length(...)` formula + the rendered counter | Draft |
| Boolean from length | `parties.is_full` | `pages/parties/[id]/` | GraphQL | The `member_count >= capacity` expression + how it gates a "Full" badge | Draft |
| String concat | `heroes.display_name_en`, `npcs.display_label_en` | `pages/heroes/`, `pages/npcs/` | GraphQL | The `concat(...)` expression + how the precomposed string is used in the catalog | Draft |

## 3. File fields

For file shape, see [`files.md`](../../architecture/specs/files.md).

| Capability | Field | Demonstrated on | API surface shown | Explainer reveals | Status |
|---|---|---|---|---|---|
| Single PNG portrait | `heroes.portrait`, `npcs.portrait` | `pages/heroes/[id]/`, `pages/npcs/[id]/` | GraphQL + REST file URL | The `file-schema:1.0.0` ref + the `fileId` / `hash` / `url` triple; link to files spec | Draft |
| Single PNG illustration | `monsters.image` | `pages/monsters/[id]/` | GraphQL + REST file URL | Same as above for the larger asset | Draft |
| SVG vector icon | `items.icon`, `abilities.icon` | `pages/items/`, `pages/abilities/` | GraphQL + REST file URL | Sharp-at-any-zoom rendering + the file-schema; the icon appears in the catalog grid | Draft |
| SVG crest | `factions.crest` | `pages/factions/[id]/` | GraphQL + REST file URL | Alpha-background SVG composited on the page; the file-schema | Draft |
| Large map image | `locations.map` | `pages/locations/[id]/` | GraphQL + REST file URL | The dimensions metadata Revisium stores (`width` / `height`) and how it informs srcset | Draft |
| Marketing hero (CMS) | `landing_hero.bg_image` | `pages/home/` | GraphQL | The CMS-vs-data subgraph attribution + the SSR-optimised image markup | Draft |
| Avatar (CMS) | `blog_authors.avatar` | `pages/blog/[slug]/` | GraphQL | The author panel + the file-schema | Draft |
| Markdown attachment / OG image | `blog_posts.hero_image` | `pages/blog/[slug]/` | GraphQL | The OG-image meta tag + the original Revisium file URL | Draft |

## 4. Querying — filter / sort / paginate

| Capability | Where | Demonstrated on | API surface shown | Explainer reveals | Status |
|---|---|---|---|---|---|
| `where` clauses (string equality, contains, in) | `items.data.rarity = …`, `items.data.name.en contains …` | `pages/items/` | GraphQL + REST `/items?filter=…` | Live JSON filter panel: editing the form mutates the `where` payload visibly *before* the request fires | Draft |
| `where` clauses (numeric range, gt / lt / between) | `items.market_value`, `heroes.level` | `pages/heroes/`, `pages/items/` | GraphQL + REST | Range sliders bound to `gt` / `lt` keys in the JSON payload | Draft |
| `where` clauses (FK equality) | `heroes.region_id = …` | `pages/heroes/` | GraphQL + REST | Dropdown bound to a FK equality clause, with the resolved target shown beside | Draft |
| `orderBy` on a single field | `items.market_value desc` | `pages/items/` | GraphQL + REST | A `Sort by` dropdown bound to a `[{ field: 'market_value', direction: 'desc' }]` JSON shape | Draft |
| `orderBy` on multiple fields | `items.rarity asc, market_value desc` | `pages/items/` | GraphQL + REST | A sortable column header set bound to a multi-key `orderBy` JSON array; the panel renders the array live | Draft |
| Cursor pagination (`edges` / `pageInfo`) | All catalogs | `pages/items/`, `pages/regions/` | GraphQL | `pageInfo.hasNextPage` driving a "Load more" button + the explainer showing the `after` cursor on each fetch | Draft |
| Total count alongside paged edges | `regionses.totalCount` | `pages/regions/` | GraphQL | The "5 of 5" badge + the GraphQL `totalCount` field; widget notes the cost trade-off | Done (regions catalog) |
| Field selection (GraphQL projection) | Any | every page | GraphQL | The widget shows the projection used; toggling a panel includes `data { climate }` vs `data { description { en } }` to demonstrate that the response shrinks accordingly | Draft |

## 5. Full-text search

| Capability | Where | Demonstrated on | API surface shown | Explainer reveals | Status |
|---|---|---|---|---|---|
| Search across all fields in a revision | Revisium `search_rows` | `pages/search/` | REST `/search` + GraphQL | The single `searchRows(query)` call that returns hits from heroes, items, monsters, …; widget shows the per-table grouping and the compact match payload | Draft |

## 6. Branching & revisions

| Capability | Where | Demonstrated on | API surface shown | Explainer reveals | Status |
|---|---|---|---|---|---|
| `head` vs `draft` revision toggle | `demo-rpg-data/master:head` vs `:draft` | `pages/balance-patch/` *(planned)* | GraphQL with revision URI | A toggle that swaps the upstream URI; the explainer shows the `revisium://.../master:draft` vs `:head` URI difference and the resulting data delta | Draft |
| Revision diff via `get_revision_changes` | Same | `pages/balance-patch/` *(planned)* | REST + MCP | An inline diff (e.g. `items.X.market_value: 50 → 65`) sourced from `get_revision_changes`; widget shows the same call | Draft |

## 7. Apollo Federation

The headline story: one GraphQL type carries fields from multiple subgraphs. Revisium types are *enriched* by the NestJS backend without copying data into the backend.

| Capability | Owning subgraphs | Demonstrated on | API surface shown | Explainer reveals | Status |
|---|---|---|---|---|---|
| Federated entity — Revisium-owned + backend-owned scalar fields | `RegionsNode` from `demo-rpg-data` + `RegionsNode.likes`, `RegionsNode.viewCount` from `demo-rpg-backend` | `pages/regions/[id]/` | GraphQL | Per-field subgraph chip (`data` / `backend`) on the rendered card; widget shows `extend type RegionsNode @key(fields: "id") { likes: Int! }` snippet from the backend with link to source | Draft |
| Federated entity — backend-owned list field | `RegionsNode.comments: [Comment!]!` | `pages/regions/[id]/` | GraphQL | The visited entity + the list field that only the backend can own (mutable, ordered, paginated); widget contrasts with Revisium's immutable revision model | Draft |
| Federated entity — `@requires` for cross-subgraph computation | e.g. backend computes a "popularity score" from Revisium-owned `views` (if added) or a hash of `name` | `pages/items/[id]/` *(planned candidate)* | GraphQL | The `@requires(fields: "name")` directive forcing the router to also fetch the Revisium-owned field; widget shows the SDL excerpt | Draft |
| Federated subgraph health view | All three subgraphs | A debug surface, possibly in `pages/home/` footer | GraphQL — `_service { sdl }` | Per-subgraph health pill that ticks green when `supergraph-builder` last composed successfully; widget links to the builder's `/supergraph/demo` endpoint | Draft |
| Auto-generated SDL from Revisium tables | All Revisium-modelled types | Footer of any page | GraphQL — link out | A "View full SDL" link that opens the composed supergraph SDL in a new tab; widget notes that not a line of this was written by hand | Draft |

## 8. API surfaces — REST / GraphQL / MCP parity

| Capability | Demonstrated on | API surface shown | Explainer reveals | Status |
|---|---|---|---|---|
| GraphQL operation | Every page | GraphQL | The exact query body sent to `/graphql` | In delivery (regions live) |
| REST equivalent | Catalog + detail pages | REST tab | The matching `GET /api/regions?…` URL on the demo-rpg-backend Swagger; same JSON keys; link to the OpenAPI page | Draft |
| MCP equivalent | Catalog + detail pages | MCP tab | The matching MCP tool name (e.g. `list_regions`, `get_region`) + the JSON arguments; link to `demo-rpg-docs/architecture/specs/...` for the tool catalogue | Draft |
| OpenAPI client codegen | A "See in code" tab on the home page or footer | REST | A snippet using `@hey-api/openapi-ts`-generated functions, mirroring the backend's own internal usage | Draft |

## 9. Operational surface

| Capability | Demonstrated on | Surface shown | Explainer reveals | Status |
|---|---|---|---|---|
| Public-read access (no auth) | Every page | n/a (implicit) | Widget footer notes "this query was issued anonymously; you can paste the same `curl` into your terminal and get the same response" | Draft |
| CORS-free same-origin layout | Every page | n/a | Widget footer explains that `/graphql` is co-located under the SSR ingress so the browser only ever does same-origin calls; link to the infrastructure chart | Draft |
| Federated supergraph composition (auto, no CI) | Footer / about | n/a | Widget shows the `supergraph-builder` polling loop diagram + last-composition timestamp | Draft |

---

## Status legend

- **Done** — page is shipped, Explainer Widget asserts the capability to the visitor.
- **In delivery** — page doc exists under `pages/`; implementation underway in `demo-rpg-frontend`.
- **Draft** — listed here only; no page doc yet.

Every row gains a `Done` only after both the rendered UI *and* the Explainer Widget call out the capability — UI without an explainer doesn't count toward BR-0003's success metric.
