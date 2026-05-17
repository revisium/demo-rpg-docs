# Messaging — Branching Tales

> Canonical product framing for the Branching Tales demo. **Single source of
> truth** for the codex home, guide/news copy, `/about`, footer/source
> references, README abstracts, and DevRel posts. If a visitor walks away with
> one impression of the demo, it should be the one written below.

**Status:** v2 draft.
**Owner:** @anton-revisium
**Last updated:** 2026-05-17

**Navigation:** [products README](./README.md) ·
[BR-0003](../../requirements/BR-0003-frontend-showcase.md) ·
[feature coverage matrix](./revisium-feature-coverage.md) ·
[page inventory](./page-inventory.md)

## Why this doc exists

Every messaging surface in the demo - codex home, catalog copy, guide/news
posts, the `/about` page, footer/source references, the GitHub README, and
future Show-HN / DevRel posts - must tell the same story in the same words.
Without one canonical place, the surfaces drift, the visitor gets four
different one-liners, and the message loses its edge.

This doc captures:

1. The public product frame: what the visitor sees first.
2. The Revisium proof narrative: what the Explainer Widget and `/about` reveal.
3. The surface matrix: where each story appears.
4. Ready-to-use draft copy per surface.

Implementations (CMS seed rows, page components, repo READMEs) pull from the
draft copy here. Updates flow back to this doc first, never directly into the
surfaces.

## 1. Public Product Frame

Branching Tales is a public RPG codex and game database. The first read should
feel like a real companion site for a content-heavy game: visitors search and
browse heroes, items, monsters, regions, quests, guides, and related entities.

The main UI does **not** present itself as a Revisium dashboard, an admin tool,
or a generic DevRel landing page. Revisium is visible through:

- the Explainer Widget on catalog, detail, guide/news, search, and revision
  pages;
- source links to `cloud.revisium.io` tables, schemas, and rows;
- the `/about` page and guide copy that explain the 80/20 story.

The codex experience uses the current game data tables:

- characters: heroes, classes, abilities, NPCs, and parties;
- items: items plus item types, stats, and effects as supporting references;
- world: regions, locations, and factions;
- quests: quests plus dialogs as related narrative content;
- bestiary: monsters and their drops, abilities, and faction links;
- guides/articles: `blog_posts` and `blog_authors` until a dedicated news table
  exists.

V1 navigation is intentionally direct. Top navigation links to the primary
catalog routes and does not use dropdowns. Sibling catalogs appear as simple
section subnavigation on the page.

## 2. Revisium Proof Points

| # | Message | What it claims | What proves it on the demo |
|---|---|---|---|
| **M-1** | **Schema-first content** | Define one JSON Schema; REST + GraphQL + MCP appear automatically, with OpenAPI and SDL generated, not written. | Every `data.*` table renders a typed GraphQL type and an OpenAPI operation without a single hand-written controller. The Explainer Widget shows the auto-generated SDL excerpt. |
| **M-2** | **Federation glues two storage models** | Content lives in Revisium; operational data lives in the backend. One GraphQL type, multiple subgraphs, one request from the client. | `RegionsNode { name (data) likes (backend) comments (backend) }` - Explainer Widget tags each rendered field with its owning subgraph (`data` / `cms` / `backend`). |
| **M-3** | **Branching for content** | Drafts and revisions for data, the way git does for code. Preview a balance patch in `master:draft` before publishing. | `/balance-patch` swaps the revision URI; the widget shows `master:head` vs `master:draft` and the resulting JSON diff. |
| **M-4** | **Three surfaces for free** | REST + GraphQL + MCP from one schema - pick your client. AI agents call MCP, humans use REST or GraphQL, no extra plumbing. | Every Explainer Widget shows the same operation under the available surface tabs. Same JSON shape, generated from one schema. |
| **M-5** | **No glue code** | Migrations are applied by CLI. OpenAPI and frontend types are generated. You write only the product-specific business logic. | `revisium-cli` PreSync Job, generated backend client, generated frontend SDK, and small custom app code. |

The aggregate claim: **Revisium closes roughly 80% of the work; your backend
writes the remaining 20%.**

- **Revisium does**: schemas, content, files, formulas, branching, search,
  three APIs, federation participation.
- **Your backend writes**: counters, comments, recommendations, aggregations,
  auth, cache, runtime state.

Do not make this the first visual layer of the home page. The visitor should
first believe the game database, then open the proof layer.

## 3. Surface Matrix

Surfaces ordered from first impression to already-engaged proof:

| Surface | What it carries | Pull from | Status |
|---|---|---|---|
| **Codex home** (`/`) | Game database entry: search, featured catalogs, latest guides/updates, and world/entity previews. | §4.1 | Planned. |
| **Catalog headers** (`/heroes`, `/items`, `/monsters`, `/regions`, `/quests`) | Game-facing summary of what can be browsed, with section subnav to sibling catalogs. | §4.2 | Planned. |
| **`/about` page** | Long-form 80/20 story + architecture Mermaid diagram + "what Revisium did vs what we wrote" table. | §4.4 | Planned. |
| **Guides/blog** (`/blog`, `/blog/[slug]`) | Editorial guide/article surface. Can carry the launch explainer until a dedicated news table exists. | §4.6 | Planned. |
| **News/updates** (`/news`) | Optional patch-notes feed once the `news` table is confirmed. Must stay blocked until the data source exists. | §4.5 | Blocked. |
| **Footer/source chip** | Small source/architecture entry point, not a repeating marketing banner. | §4.7 | Planned. |
| **demo-rpg-frontend README abstract** | First paragraphs of the repo README for GitHub-side visitors. | §4.8 | Planned. |
| **Explainer Widget** | Per-page proof: request, variables, response sample, source links, API surfaces, and subgraph ownership. | [Explainer Widget Spec](./explainer-widget.md) | Spec'd, implementation pending. |
| **Show-HN / DevRel posts** | External channel. Drafted from the guide/news copy with a channel-specific intro. | §4.5 + §4.6 | Pending. |

## 4. Draft Copy

> The strings below are first-pass draft. Translation (`en` / `ru` / `zh`) is a
> separate workstream - see
> [BR-0003 §4](../../requirements/BR-0003-frontend-showcase.md#4-scope).

### 4.1 Codex Home

```text
title:    Branching Tales
subtitle: Explore heroes, items, monsters, quests, regions, and guides from a
          live RPG content database.
cta:      Browse heroes ->  (links to /heroes)
secondary_cta:  Search the codex ->  (links to /search)
```

Home blocks:

1. Global codex search.
2. Featured database cards: Heroes, Items, Monsters, World, Quests, Guides.
3. Featured entities from current data rows.
4. Latest guides/updates from `blog_posts`; `/news` replaces this only after a
   real news table exists.
5. Small source/reference affordance that opens the Explainer Widget. Do not
   make Revisium the hero headline.

Tone: confident, content-led, no exclamation marks. The visitor should
understand this as a game database before they understand the implementation.

### 4.2 Catalog Section Headers

Top navigation has no dropdowns in v1:

```text
Home · Heroes · Items · Monsters · World · Quests · Guides · Search · EN
```

The language control is a header button showing the active language (`EN`,
`RU`, `ZH`). Opening it presents the language switcher. It is a content-language
control, not a technical settings panel.

Section subnavigation appears on pages, not in the top nav:

| Section | Entry route | Sibling links |
|---|---|---|
| Heroes | `/heroes` | Heroes (`/heroes`), Classes (`/classes`), Abilities (`/abilities`), NPCs (`/npcs`), Parties (`/parties`) |
| Items | `/items` | Items (`/items`), Item Types (`/item-types`), Stats (`/stats`), Effects (`/effects`) |
| World | `/regions` | Regions (`/regions`), Locations (`/locations`), Factions (`/factions`) |
| Quests | `/quests` | Quests (`/quests`), Dialogs (`/dialogs`) |

Sibling links may point to planned/stub pages only when the page inventory marks
the target route and the UI makes the incomplete state clear.

### 4.3 Revisium Proof Cards

These are not primary home hero cards. Use them inside `/about`, guide copy, or
the Explainer Widget summary area.

| # | `title` | `body` |
|---|---|---|
| 1 | One schema. Three APIs. | Define your data once in JSON Schema. Revisium gives you REST, GraphQL, and MCP automatically. We did not write a controller for this content. |
| 2 | Federate, do not migrate. | Content lives in Revisium. Counters, comments, and recommendations live in the backend. Apollo Router fuses them into one GraphQL type per entity. |
| 3 | Git for data. | Try a balance patch in `master:draft`, see the diff, ship to `master:head`. Same workflow as code. |
| 4 | Your client of choice. | REST for `curl`, GraphQL for the frontend, MCP for AI agents. Same operations under generated transports. |
| 5 | No glue code. | Migrations are applied by CLI, OpenAPI client generated from schema, types generated from codegen. The remaining code is product logic. |

### 4.4 `/about` Page

Page-spec lives under `products/branching-tales/pages/about/` (planned). Page
body composes from this doc:

1. Hero block: explain that the codex is backed by Revisium.
2. Mermaid architecture diagram: copy the diagram from `architecture/overview.md`
   so the page stays in sync.
3. **What Revisium did** table - one row per M-1..M-5, "evidence on the demo"
   column links to the relevant page.
4. **What we wrote** table - concrete list of backend-only features (counters,
   comments, recommendations, runtime state) with the source-file link.
5. Pull quote: "Roughly 80% of the demo was not written - it was generated. The
   20% that was, is the part you would write anyway."
6. CTA: "View the source on GitHub" -> `demo-rpg-frontend`,
   `demo-rpg-backend`, `demo-rpg-docs`.

### 4.5 News Or Updates Feed

`/news` is blocked until the data source is real. There is no `news` table in
the current `demo-rpg-cms` or `demo-rpg-data` bootstrap set. Until that table
exists, home should use `blog_posts` as Guides/Updates instead of pretending a
news feed is live.

When a news table is added, the launch post can use this shape:

```text
category: release
pinned:   true
title:    Branching Tales v1.0 is live
excerpt:  Explore the Branching Tales codex, then open the source layer to see
          what Revisium generated and what the application wrote.
```

Body outline:

- Two-sentence opening: what Branching Tales is, where to click first.
- The 80/20 frame in plain prose.
- M-1 with the auto-generated SDL excerpt.
- M-2 with the per-field subgraph chip screenshot.
- M-3 with the balance-patch toggle.
- M-4 with the Explainer Widget surface tabs.
- M-5 with concrete source links.
- CTAs into the codex: Heroes, Items, Monsters, World, Quests.

### 4.6 Guides / Blog Welcome Post

`/blog` is presented as Guides in the site navigation. `/blog/welcome` can be a
long-form essay version of §4.5. Same structure, more depth on each M-#, more
code excerpts, more "here is what we considered and rejected" colour.

### 4.7 Footer/Source Chip

Permanent, present on every page but visually small:

```text
Powered by Revisium · 2 Revisium subgraphs + 1 NestJS subgraph
federated by Apollo Router · View architecture ->
```

The arrow links to `/about`. The chip should not compete with game database
navigation or catalog content.

### 4.8 GitHub README Abstract

First paragraphs of `demo-rpg-frontend/README.md`:

```markdown
# Branching Tales — Frontend

Branching Tales is a public RPG codex and game database backed by Revisium.
Visitors browse heroes, items, monsters, quests, regions, and guides first;
the Explainer Widget reveals the live GraphQL request, source rows, and API
surfaces behind each page.

Live demo: https://demo-rpg.dev.revisium.io

Roughly 80% of this demo was not written, it was generated:
**Revisium** owns schemas, content, files, formulas, branching, search, and
API surfaces; **our NestJS backend** writes only the product-specific runtime
state. Apollo Router fuses them into one GraphQL supergraph.

[Read the full architecture story ->](https://demo-rpg.dev.revisium.io/about)
```

## 5. Surfaces That Do Not Carry The Message

For clarity:

- Per-page Explainer Widget body (request panel + JSON sample + deep links) is
  technical evidence. It should not become the first visual layer of catalog
  pages.
- Brand chrome (logo, navigation, button labels, language button) stays in the
  frontend i18n bundle and never repeats the 80/20 frame.
- Error pages do not editorialise; they say what failed and how to recover.

## 6. Open Questions

| # | Question | Owner | Due | Status |
|---|---|---|---|---|
| 1 | Should the `/about` page be a separate route or a section on `/`? Current direction: separate route, because `/` is a codex/database entry page. | @anton-revisium | TBD | Open |
| 2 | Footer/source chip - render it on the home page too, or rely on the Explainer Widget trigger there? | @anton-revisium | TBD | Open |
| 3 | When we add `ru` and `zh` translations, do we localise the 80/20 numerical claim or leave it as a number across locales? | @anton-revisium | TBD | Open |
| 4 | Pinned launch post: one-time launch flag or permanent "essentials" post? | @anton-revisium | TBD | Open |
| 5 | Show-HN / DevRel: do we draft these posts inside `demo-rpg-docs` or outside so they can iterate independently? | @anton-revisium | TBD | Open |
| 6 | Should the future news table live in `demo-rpg-cms` with guides/blog, or in `demo-rpg-data` as in-world game updates? | @anton-revisium | TBD | Open |

## 7. Related Artefacts

- **BR**:
  [BR-0003 — Frontend Showcase](../../requirements/BR-0003-frontend-showcase.md).
- **Page inventory**: [page-inventory.md](./page-inventory.md).
- **Feature coverage matrix**:
  [revisium-feature-coverage.md](./revisium-feature-coverage.md).
- **Explainer Widget**: [explainer-widget.md](./explainer-widget.md).
- **Schemas spec**: [schemas.md](../../architecture/specs/schemas.md) - future
  `news` table decision lives there when implemented.

## Changelog

### v2 (2026-05-17)

- Reframed the primary product surface from DevRel landing/dashboard to RPG
  codex/game database.
- Moved Revisium/80-20 messaging into `/about`, guides, source references, and
  the Explainer Widget.
- Added no-dropdown top navigation and section subnavigation direction.
- Marked `/news` as blocked until a real news table exists.

### v1 (2026-05-12)

- Initial draft. Five message points (M-1..M-5), surface matrix, draft copy for
  landing hero / feature cards / testimonials / about / pinned news / blog
  welcome / footer / README, and open questions.
