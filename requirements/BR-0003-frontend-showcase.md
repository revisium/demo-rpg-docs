# BR-0003: Frontend Showcase

## Metadata

| Field | Value |
|---|---|
| Owner | @anton-revisium |
| Status | Draft |
| Version | 1.3 |
| Last updated | 2026-05-17 |

## 1. Context

The dev stand for `demo-rpg` is live: `demo-rpg-data` and `demo-rpg-cms` are bootstrapped in Revisium Cloud, the NestJS subgraph and federated Apollo Router are deployed, and the SSR React frontend ([demo-rpg.dev.revisium.io](https://demo-rpg.dev.revisium.io)) renders the first catalog page (`/regions`).

The frontend's user-facing job, from this point on, is a **public RPG codex /
game database**: a visitor should be able to browse Branching Tales through
heroes, items, monsters, regions, quests, guides, search, and related entity
links. The demo still has a DevRel evaluation job, but that proof layer is
secondary and explicit: the Explainer Widget, `/about`, and source links show
how the game database is powered by Revisium.

An evaluator should be able to *see and inspect* every Revisium capability
without reading documentation first — JSON Schema modelling, foreign keys,
embedded arrays, file fields, computed formulas, filtering / sorting /
pagination, full-text search, branching, schema evolution, the three API
surfaces (REST, GraphQL, MCP), **and the Apollo Federation story** where one
entity carries fields contributed by Revisium *and* by the NestJS backend on the
same response (e.g. `region.likes` is owned by the backend, `region.name` is
owned by `demo-rpg-data`, both arrive in one query). Each capability must be
visible in the Explainer Widget as code (the actual request + JSON payload), not
as developer-dashboard chrome in the primary page layout.

This BR is the umbrella for that work. Product scope, capability coverage, and
messaging live in `demo-rpg-docs/products/branching-tales/`. Exact per-page
contracts (functional blocks, primary actions, states, data contracts, and
implementation status) live in `demo-rpg-frontend/docs/product/pages/`.

## 2. Goals & metrics

### Business goals

- **Make the demo credible as a real game database** before the visitor opens
  any technical panel.
- **Cut "can Revisium do X?" evaluation time** from reading docs to clicking
  around in the codex and opening the Explainer Widget (<5 min to first
  "yes/no" on any single capability).
- **Lower the perceived barrier** of using Revisium for a real product: visitors leave understanding that the frontend, three APIs, and content management are all already-shipped pieces, not whiteboard concepts.
- **Convert curious developers into hands-on triallists** — every Revisium capability shown on the frontend links straight to its source-of-truth at `cloud.revisium.io/revisium/{demo-rpg-data,demo-rpg-cms}` where the visitor can explore the schema, table, or row themselves.

### Success metrics

| Metric | Baseline | Target | Measured by |
|---|---|---|---|
| Game database entry points visible without dropdowns | 0 | Home, Heroes, Items, Monsters, World, Quests, Guides, Search, and language button are reachable from the header | Manual nav audit |
| Revisium primitives demonstrated on at least one page | 0 | 100% of `revisium-feature-coverage.md` rows | Manual audit of the page inventory matrix each release |
| Pages with an `ExplainerWidget` discoverable on initial paint (above the fold on tablet/desktop; accordion header above the fold on phone) | 0 | 100% of catalog + detail pages | Visual / Steiger-style audit |
| Mean "click-through to cloud.revisium.io" CTR from any page's explainer link | — | ≥ 10% of unique sessions reaching a catalog page | Plausible / analytics on the dev stand once added |
| Show-HN / DevRel posts citing the demo URL | 0 | At least one with > 100 upvotes inside one calendar quarter post-launch | Public post history |

## 3. Audience

| Role | Who | Interest |
|---|---|---|
| Primary | Game/content visitor or evaluator opening the demo cold | Wants to browse a believable RPG codex with clear catalogs, search, media, and related entities. |
| Primary | Backend / platform engineer evaluating headless CMS or schema-first data platforms | Wants to see real schemas + real queries after opening the Explainer Widget, before writing a single line of integration code. |
| Primary | Tech lead deciding whether a small team can ship a content-heavy app on Revisium | Wants to see the operational story: federated APIs, file pipeline, branching, schema migration. |
| Secondary | DevRel / sales engineer demoing Revisium to a prospect | Wants a stable, polished URL to click through during a 5-minute live demo without preparing slides. |
| Secondary | AI agent (Claude Code, Cursor, etc.) reasoning about Revisium for a user | Wants discoverable, machine-readable hints: each page exposes the GraphQL query / REST endpoint / cloud.revisium.io deep link so an agent can imitate the pattern. |

## 4. Scope

### In scope

- A no-dropdown top navigation for the public codex: Home, Heroes, Items,
  Monsters, World, Quests, Guides, Search, and a header language button.
- Section subnavigation on catalog/detail pages for sibling catalogs, for
  example Heroes / Classes / Abilities / NPCs / Parties inside the character
  family.
- Catalog pages for every dictionary table that demonstrates a distinct capability (regions, heroes, items, monsters, quests, parties, factions, npcs, locations — full list in [`revisium-feature-coverage.md`](../products/branching-tales/revisium-feature-coverage.md)).
- Detail pages for entities where foreign-key resolution / embedded arrays /
  computed fields are the load-bearing story (hero detail, item detail, quest
  detail, party detail, monster detail). Relationships are rendered as
  game-facing related-entity sections such as "Dropped by", "Used by", and
  "Quest rewards", with the underlying FK/array/formula proof left to the
  Explainer Widget.
- A uniform per-page **Explainer Widget** (own UX spec to follow) that shows: the actual query/REST request the page is making, a JSON sample of the response, and a deep link into `cloud.revisium.io/revisium/{demo-rpg-data|demo-rpg-cms}` at the relevant table / row / schema.
- A live **JSON filter / sort panel** on catalog pages: visitor edits filters/sorts in a form, the panel renders the corresponding `where` / `orderBy` JSON in real time, and the page re-fetches.
- A **branching preview** UX: a toggle that switches the page between `master:head` and `master:draft` (with a visible explanation that this is Revisium's per-revision data view) — demonstrated on at least one page where draft data exists.
- A **search** entry point that hits Revisium's full-text search across all data + CMS tables.
- **Federation enrichment** showcase: at least one Revisium entity (e.g. `Region`, `Item`, `Hero`) has backend-contributed fields (likes counter, view counter, comments, computed-on-write rollups) federated onto the same GraphQL type via `@key` / `@external` / `@requires`. The explainer widget tags each field with the owning subgraph (`data` / `cms` / `backend`) so the visitor can see federation in action without reading SDL.
- CMS-driven content for the codex home (`landing_hero`, `landing_features`)
  and guides/blog (`blog_posts`, `blog_authors`) — proving Revisium covers both
  dictionary and editorial use cases on the same platform. `landing_testimonials`
  may be repurposed or omitted from the public codex UI if it reads as generic
  marketing.
- A **news / patch-notes** feed remains optional and blocked until a real
  `news` table is added. The current bootstrap has `blog_posts`, not `news`, so
  the frontend must not present `/news` as live data until the source exists.
- A dedicated **`/about` page** carrying the long-form 80/20 story + the architecture diagram, linked from the home page's source/story CTA and the footer chip. Source-of-truth for the narrative lives in [`products/branching-tales/messaging.md`](../products/branching-tales/messaging.md).
- An on-page hint surfacing which API surface (`GraphQL` federated, `REST` direct, or `MCP`) each example would use, with a tab to swap between them where it makes sense.
- **Localization** — every user-facing string with a `<LocalizedString>` shape
  in the schema (`en` / `ru` / `zh`) is rendered through a header language
  button/switcher; switching languages re-issues the GraphQL query with the
  appropriate sub-field selection (`name { en }` → `name { ru }`) so the
  Explainer Widget visibly demonstrates that localized strings are a schema
  feature, not a frontend translation table.
- **Responsive layout** — every page is usable on phone, tablet, and desktop. On small viewports the Explainer Widget collapses to a tappable accordion whose **header stays above the fold** (so the widget is still discoverable on initial paint) while the body sits below; the JSON filter/sort panel becomes a bottom-sheet; catalog grids reflow to a single column. No horizontal scroll except inside code-display panels.

### Out of scope

- User authentication, signup, profile, write operations, billing — the demo is read-only and unauthenticated. Auth is showcased separately by `revisium-admin`.
- Production-tier hosting / CDN / DDoS protection. The frontend lives on the dev stand only for v1.
- Real game logic (combat resolution, quest progression). Branching Tales is a *content* showcase, not a playable game.
- Mobile-native apps. Mobile web only.
- Custom Revisium client libraries — the demo uses the codegen'd `graphql-request` SDK and the auto-generated REST OpenAPI client. No new client packages are produced as part of this BR.

### Assumptions

- The dev stand stays available (Argo CD-managed). Outages on `cloud.revisium.io` will show up as error states; the frontend handles them gracefully (per US-4 below) but does not paper over them.
- Schema in `demo-rpg-data` / `demo-rpg-cms` is stable enough that catalogs can ship in a meaningful state. Where formulas / file fields / new tables land later, the page inventory grows accordingly.
- `revisium-ux` design system tokens are usable from this repo — the demo adopts the same look-and-feel as `revisium-admin` so a returning user already feels at home.

## 5. User scenarios

### US-1: Evaluator scanning for capability presence

**As** a backend engineer evaluating headless CMSes,
**I want** to land on the demo and within five minutes see whether Revisium supports filtering, sorting, foreign keys, computed fields, and file uploads,
**so that** I can decide whether to spend the rest of my afternoon reading the docs.

**Acceptance:**

- [ ] Given the visitor opens `/` for the first time, the homepage reads as an
      RPG codex/database entry with search, featured catalogs, featured
      entities, latest guides/updates, and links to Heroes, Items, Monsters,
      World, Quests, Guides, and Search.
- [ ] Given the visitor uses the header, the top navigation uses direct links
      without dropdowns.
- [ ] Given the visitor opens a catalog family, sibling catalogs are available
      through section subnavigation on the page.
- [ ] Given the visitor opens `/` for the first time, the homepage links to at least one page per Revisium primitive listed in [`revisium-feature-coverage.md`](../products/branching-tales/revisium-feature-coverage.md).
- [ ] Given the visitor opens any catalog page, the **Explainer Widget** is discoverable on initial paint (visible above the fold on tablet/desktop, with the accordion header above the fold on phone) and answers "what Revisium feature is on this page?" in one sentence.

### US-2: Engineer inspecting the actual GraphQL query

**As** a developer who already knows GraphQL,
**I want** to read the exact query the page sends and inspect a sample of the JSON response,
**so that** I can copy it into Apollo Studio / GraphiQL / `curl` and adapt it to my project.

**Acceptance:**

- [ ] Given any catalog or detail page, the **Explainer Widget** shows the GraphQL `query …` body verbatim and a representative JSON response sample.
- [ ] Given any catalog page, changing filter / sort / page in the UI updates the JSON `where` / `orderBy` / `pagination` payload visibly *before* the request is re-sent, so the cause-effect is clear.
- [ ] Given the user clicks "View in cloud.revisium.io" inside the widget, a new tab opens at the corresponding table or row.

### US-3: Tech lead inspecting the operational story

**As** a tech lead evaluating Revisium for a content-heavy product,
**I want** to see proof of branching, schema migrations, and the three API surfaces (REST, GraphQL, MCP),
**so that** I can de-risk the decision to standardise on Revisium for a team.

**Acceptance:**

- [ ] Given any page demonstrating branching, a `head` / `draft` toggle changes the data view and the widget explains what changed.
- [ ] Given any page, the **Explainer Widget** surfaces an "Also available as" bar listing the equivalent REST endpoint (link to demo-rpg-backend's Swagger) and MCP tool name (link to `demo-rpg-docs/architecture/...`).

### US-4: Visitor hitting an error

**As** any visitor,
**I want** the page to fail gracefully when an upstream is unreachable,
**so that** my evaluation doesn't end on a white screen.

**Acceptance:**

- [ ] Given Apollo Router or any subgraph is unreachable, the catalog page renders a visible, non-stack-trace error block that names the failing service and links to status.
- [ ] Given an empty result set (e.g. a filter that matches nothing), the page renders a clearly-labelled empty state with a "Reset filters" action.

### US-5: Visitor switching to another locale

**As** a non-English-speaking developer (Russian or Chinese fluency),
**I want** to switch the page to my language and see the catalog content render natively,
**so that** I understand Revisium handles localized content as a first-class schema feature, not as a frontend i18n bolt-on.

**Acceptance:**

- [ ] Given any page rendering a `<LocalizedString>` field (region name, hero
      name, item description, blog post title), the header language button shows
      the active language (`EN`, `RU`, `ZH`) and opens a switcher.
- [ ] Given the visitor switches language, the page re-issues the GraphQL query
      with the language-specific sub-field selection.
- [ ] Given the Explainer Widget on that page, the displayed query body updates to show `name { ru }` after the user switches to Russian — making it obvious that locale is a *schema concern*.
- [ ] Given a row whose non-en locale is empty, the page falls back to `en` and the widget notes which strings were fallbacks.
- [ ] Given UI chrome (button labels, error states), those translations live in the frontend's own i18n bundle, not in the Revisium content — the widget calls out the distinction.

### US-6: Visitor on a mobile phone

**As** a visitor reading the demo on a phone (e.g. linked from a chat or social post),
**I want** the page to be usable without horizontal scrolling, with the catalog and Explainer Widget both reachable,
**so that** I don't bounce after the first card.

**Acceptance:**

- [ ] Given a viewport ≤ 480 px wide, every page renders without horizontal scroll (except inside code-display panels inside the Explainer Widget, which scroll inside their own scrollable region).
- [ ] Given the same viewport, the Explainer Widget collapses to a tappable accordion: its header stays above the fold (so the widget is discoverable on initial paint), its body expands below on tap. The catalog grid reflows to a single column; the JSON filter / sort panel becomes a bottom-sheet that the user can summon with a single tap.
- [ ] Given a viewport between 481 px and 1024 px (tablet), the layout uses a two-column split — catalog grid on the left, Explainer Widget docked at the right.
- [ ] Given a viewport ≥ 1024 px (desktop), the Explainer Widget docks as a side panel without obscuring catalog content.

### US-7: Engineer seeing Apollo Federation in action

**As** an engineer who has read about Apollo Federation in theory,
**I want** to see one GraphQL type that visibly carries fields from two different subgraphs in the same response,
**so that** I understand "subgraph-owned fields" beyond hello-world federation examples.

**Acceptance:**

- [ ] Given a federated entity page (e.g. `/regions/whispering-vale`), the page renders at least one field owned by `demo-rpg-data` (e.g. `name`, `description`) *and* at least one field owned by `demo-rpg-backend` (e.g. `likes`, `viewCount`, `comments`) on the same card.
- [ ] Given the same page, the **Explainer Widget** tags each rendered field with its owning subgraph (`data` / `cms` / `backend`) — visible chip or footnote, not buried in a tooltip.
- [ ] Given the visitor expands the widget's "How does this work?" panel, the federation directives (`@key` on `RegionsNode`, `extend type RegionsNode @key(fields: "id") { likes: Int! }` on the backend side) are shown verbatim with a link to the backend's federation source.
- [ ] Given the visitor "likes" the region (if interactive) — out of scope for v1, but the API surface is shown read-only — the explainer notes that the same field would be a mutation on the backend subgraph, not on Revisium.

### US-8: AI agent imitating the pattern

**As** an AI coding agent helping a user build their first Revisium-backed app,
**I want** to discover, on each page, the GraphQL operation name + the REST endpoint + the MCP tool name + the cloud.revisium.io deep link,
**so that** I can recommend a working pattern without inventing one.

**Acceptance:**

- [ ] Given any page, the **Explainer Widget** content is HTML/text — not an image, canvas, or video — so it is indexable by a browsing agent.
- [ ] Given the page renders SSR, the widget content is present in the initial HTML, not added only after hydration.

## 6. Functional requirements

| Requirement | Priority | Status | Realised by |
|---|---|---|---|
| Every Revisium primitive in [`revisium-feature-coverage.md`](../products/branching-tales/revisium-feature-coverage.md) is demonstrated on at least one frontend page | Must | Draft | `demo-rpg-frontend/docs/product/pages/` |
| Every catalog and detail page renders an `ExplainerWidget` with query body, JSON sample, cloud.revisium.io deep link, and verified REST/MCP equivalents where they exist | Must | Draft | Product scope: `products/branching-tales/explainer-widget.md`; implementation contract: `demo-rpg-frontend/docs/product/explainer-widget.md` |
| Catalog pages expose a JSON filter / sort panel that shows the `where` / `orderBy` payload live as the user edits the form | Must | Draft | `demo-rpg-frontend/docs/product/pages/regions/` (reference page) + `items/` |
| One page demonstrates the `head` vs `draft` branching toggle on Revisium data | Should | Draft | `demo-rpg-frontend/docs/product/pages/balance-patch/` |
| At least one Revisium-modeled entity has backend-federated fields (e.g. `RegionsNode.likes`, `ItemsNode.viewCount`) rendered alongside Revisium-owned fields in the same response; the page tags each rendered field with its owning subgraph | Must | Draft | `demo-rpg-frontend/docs/product/pages/regions-id/` + `demo-rpg-backend` federation extension |
| A global search bar uses Revisium's full-text search across `demo-rpg-data` + `demo-rpg-cms` tables | Should | Draft | `demo-rpg-frontend/docs/product/pages/search/` |
| Home page is a game database/codex entry driven from `demo-rpg-cms` where available (hero/features) and current game data catalogs where implemented; Revisium/80-20 proof is secondary through Explainer Widget and `/about` | Must | Draft | `demo-rpg-frontend/docs/product/pages/home/` |
| Every page is SSR-rendered with no client-only fallback paths (the widget content is present in initial HTML) | Must | In delivery | demo-rpg-frontend SSR layer (already shipped) |
| Public-read access — visitors do not need to sign in or carry an API key for any read query | Must | Done | `demo-rpg-data` + `demo-rpg-cms` configured public-read |
| Canonical codex-first framing and 80/20 narrative are rendered consistently across home, `/about`, guides/blog, footer/source references, the GitHub README abstract, and Explainer Widget summaries — every surface pulls from the same source-of-truth, never paraphrased independently | Must | Draft | [`products/branching-tales/messaging.md`](../products/branching-tales/messaging.md); CMS seed rows + `/about` page doc + `demo-rpg-frontend/README.md` abstract land in follow-up PRs |
| News feed (`/news`) demonstrating multi-key `orderBy` with `pinned` priority, time-window `where` filter, and enum categories | Should | Blocked | Requires a confirmed `news` table in `demo-rpg-data` or `demo-rpg-cms`; current bootstrap has `blog_posts` only |
| Localized content rendering — `<LocalizedString>` fields render in the active locale (`en` / `ru` / `zh`) with `en` fallback; switching locale through the header language button re-issues the GraphQL query with the locale-specific sub-field selection | Must | Draft | header language button/switcher + per-page query parameterisation; UI chrome strings live in a separate frontend i18n bundle |
| Responsive layout — every page works on phone (≤ 480 px), tablet (481–1024 px), desktop (≥ 1024 px); no horizontal scroll outside designated code panels; Explainer Widget collapses to an accordion on small viewports | Must | Draft | `revisium-ux/design-system` breakpoint tokens + per-page audit |

## 7. Business rules and constraints

- **Same-origin** — `/graphql` is served under `demo-rpg.dev.revisium.io` so the browser only makes same-origin requests (Apollo Router CORS stays at its default). Implemented in `revisium/infrastructure#101`.
- **No write surface** — even when Revisium would allow it, the frontend uses read endpoints only. Any "edit" affordance on a row deep-links to `cloud.revisium.io` instead.
- **Schema is the source of truth** — page UI never invents fields. If a panel cannot be filled from the live schema, it is hidden until the schema gains the field.
- **Public codex surface** — no PII, no real customer data, no telemetry that re-identifies visitors. Aggregate analytics only.
- **English-first with localized fallback** — every user-facing string is at least `en`. The active locale (`en` / `ru` / `zh`) determines the rendered field on `<LocalizedString>` content; missing translations fall back to `en` and the Explainer Widget marks the field as a fallback so the visitor understands the behaviour. UI chrome (button labels, error strings) lives in the frontend i18n bundle, never inside Revisium content.

## 8. Non-functional requirements

| Category | Requirement |
|---|---|
| Performance | SSR TTFB ≤ 500 ms p95 from EU / US (cold subgraph round-trip excluded), client bundle ≤ 250 KB gzip for the entry chunk. |
| Availability | Demo stand uptime ≥ 99% measured monthly; Argo CD auto-syncs deployments; explicit outage banner if any subgraph reports unhealthy. |
| Security | Read-only public endpoints; no API keys in the client bundle; no third-party scripts beyond analytics (if added later); CSP set to deny inline scripts (with the necessary SSR hash allowances). |
| Responsiveness | Mobile-first layout — phone (≤ 480 px) usable without horizontal scroll, tablet (481–1024 px) two-column, desktop (≥ 1024 px) Explainer Widget docked as side panel. Touch targets ≥ 44×44 px. Layout shifts < 0.1 CLS p95 on initial paint. |
| Localization | All `<LocalizedString>` content fields render via the header language button/switcher (`EN` / `RU` / `ZH`) with `en` fallback. Locale switches re-issue the query with the appropriate sub-field selection (no client-side translation of data). UI chrome strings live in a separate frontend i18n bundle; the Explainer Widget makes the distinction explicit. |
| Accessibility | WCAG 2.2 AA targets — semantic landmarks, focusable interactive controls, visible focus states, sufficient colour contrast, `prefers-reduced-motion` respected. Locale switcher accessible via keyboard. |
| Audit | Every shipped page has a matching row in [`page-inventory.md`](../products/branching-tales/page-inventory.md) and at least one acceptance test in `demo-rpg-frontend`. Responsive + a11y audit per page using the `page-audit-guidelines.md` style. |

## 9. Open questions

| # | Question | Owner | Due | Status |
|---|---|---|---|---|
| 1 | Do we adopt the `revisium-ux` design system tokens verbatim, or do we re-tone Branching Tales to match a game database / RPG codex while keeping the structural primitives? | @anton-revisium | TBD | Open |
| 2 | Which page hosts the branching toggle — a dedicated `/balance-patch` page or a banner on `/items` that toggles between drafted balance changes and the live values? | @anton-revisium | TBD | Open |
| 3 | Do we ship a minimal in-page MCP playground (paste-a-prompt → invokes a backend MCP tool over WebSockets), or just link out to the MCP tool list? Front-loads UX work vs. simply linking. | @anton-revisium | TBD | Open |
| 4 | Should the explainer widget surface the OpenAPI operation ID directly (e.g. `getRegions`) as well as the GraphQL operation name? | @anton-revisium | TBD | Open |
| 5 | Analytics: privacy-friendly (Plausible) or none at all for v1? Affects metric 3 in §2. | @anton-revisium | TBD | Open |
| 6 | Which Revisium entity gets the first backend-federated fields? `Region` (small set, easy `likes` + `viewCount`) is the natural starting point; `Item` (large catalog, fits a `wishlisted` counter) is the next most interesting. Drives which page in `pages/` is the federation reference. | @anton-revisium | TBD | Open |
| 7 | Backend-federated counters need durable storage (Postgres on the backend). Do we add a tiny `region_stats` / `item_stats` table and a sync job, or compute the counter on the fly from a `likes` event log? Affects schema migration story on the backend side. | @anton-revisium | TBD | Open |
| 8 | Does the future `news` table belong in `demo-rpg-data` (next to other game content) or `demo-rpg-cms` (next to blogs)? Argument for `data`: news is the game's runtime story, lives next to quests / monsters. Argument for `cms`: news is editorial, lives next to `blog_posts` and shares the `author_id` FK. The page inventory must stay blocked until this is confirmed. | @anton-revisium | TBD | Open |
| 9 | Editorial cadence for `news` post-launch: who maintains the feed? If nobody, the demo's most prominent "Latest news" widget goes stale. Options: (a) one pinned launch post forever; (b) seed 5–10 in-world entries plus the launch post; (c) automate via a scheduled job that promotes blog posts to news. | @anton-revisium | TBD | Open |

## 10. Related artefacts

- **ADR**: [ADR-0001 — Federation with Revisium Cloud as a subgraph](../architecture/adr/ADR-0001-federation-with-revisium-cloud.md), [ADR-0002 — Dictionary vs CMS split](../architecture/adr/ADR-0002-dictionary-vs-cms-split.md).
- **Spec**: [schemas](../architecture/specs/schemas.md), [formulas](../architecture/specs/formulas.md), [files](../architecture/specs/files.md), [game design](../architecture/specs/game-design.md).
- **Product / UX docs**: [`products/branching-tales/`](../products/branching-tales/README.md) — capability matrix + page inventory + per-page UX contracts (mirroring `revisium-ux/products/admin/`).
- **Roadmap / tickets**: tracked in [`demo-rpg-frontend`](https://github.com/revisium/demo-rpg-frontend) issues once page docs are merged.

## Changelog

### v1.3 (2026-05-17)

- Reframe the public frontend as an RPG codex/game database first, with
  Revisium proof shown through the Explainer Widget, `/about`, and source links.
- Add no-dropdown header navigation and section-subnav direction.
- Clarify the header language button/switcher requirement.
- Mark `/news` blocked until a real news table exists.

### v1.2 (2026-05-12)

- Add news feed + `/about` page to scope (new ingredients for the 80/20 narrative).
- Add a Must functional requirement: every messaging surface pulls from a single source-of-truth (`products/branching-tales/messaging.md`), never paraphrased per surface.
- Add a Should functional requirement: news feed (`/news`) demonstrating multi-key `orderBy` with `pinned` priority, time-window `where` filter, enum categories.
- Two new open questions: where the `news` table lives (Q8), editorial cadence post-launch (Q9).

### v1.1 (2026-05-12)

- Add localization scenario (US-5), responsive layout scenario (US-6), and the corresponding scope + functional + NFR rows. Re-number federation + AI-agent scenarios to US-7 / US-8.
- Promote @anton-revisium from a comment placeholder to the visible owner.

### v1 (2026-05-12)

- Initial draft. Umbrella BR scoping every Revisium primitive to a visible page, the per-page Explainer Widget pattern, the JSON filter / sort panel on catalogs, the branching preview, the CMS-driven landing, and a federation-enrichment showcase (Revisium-owned + backend-owned fields on the same GraphQL type, with per-field subgraph attribution).
