# BR-0003: Frontend Showcase

## Metadata

| Field | Value |
|---|---|
| Owner | <!-- @anton-revisium --> |
| Status | Draft |
| Version | 1 |
| Last updated | 2026-05-12 |

## 1. Context

The dev stand for `demo-rpg` is live: `demo-rpg-data` and `demo-rpg-cms` are bootstrapped in Revisium Cloud, the NestJS subgraph and federated Apollo Router are deployed, and the SSR React frontend ([demo-rpg.dev.revisium.io](https://demo-rpg.dev.revisium.io)) renders the first catalog page (`/regions`).

The frontend's job, from this point on, is **DevRel evaluation surface**: a developer landing on the demo should be able to *see and inspect* every Revisium capability without reading documentation first — JSON Schema modelling, foreign keys, embedded arrays, file fields, computed formulas, filtering / sorting / pagination, full-text search, branching, schema evolution, the three API surfaces (REST, GraphQL, MCP), **and the Apollo Federation story** where one entity carries fields contributed by Revisium *and* by the NestJS backend on the same response (e.g. `region.likes` is owned by the backend, `region.name` is owned by `demo-rpg-data`, both arrive in one query). Each capability must be visible *as code* on the page (the actual request + JSON payload), not just as rendered UI, with the federation widget making the "which subgraph owns which field" attribution explicit.

This BR is the umbrella for that work. Per-page contracts (functional blocks, primary actions, states) live under [`products/branching-tales/pages/`](../products/branching-tales/README.md) — mirroring the [`revisium-ux/products/admin/`](https://github.com/revisium/revisium-ux/tree/master/products/admin) house format.

## 2. Goals & metrics

### Business goals

- **Cut "can Revisium do X?" evaluation time** from reading docs to clicking around in the demo (<5 min to first "yes/no" on any single capability).
- **Lower the perceived barrier** of using Revisium for a real product: visitors leave understanding that the frontend, three APIs, and content management are all already-shipped pieces, not whiteboard concepts.
- **Convert curious developers into hands-on triallists** — every Revisium capability shown on the frontend links straight to its source-of-truth at `cloud.revisium.io/revisium/{demo-rpg-data,demo-rpg-cms}` where the visitor can explore the schema, table, or row themselves.

### Success metrics

| Metric | Baseline | Target | Measured by |
|---|---|---|---|
| Revisium primitives demonstrated on at least one page | 0 | 100% of `revisium-feature-coverage.md` rows | Manual audit of the page inventory matrix each release |
| Pages with an `ExplainerWidget` rendered above the fold | 0 | 100% of catalog + detail pages | Visual / Steiger-style audit |
| Mean "click-through to cloud.revisium.io" CTR from any page's explainer link | — | ≥ 10% of unique sessions reaching a catalog page | Plausible / analytics on the dev stand once added |
| Show-HN / DevRel posts citing the demo URL | 0 | At least one with > 100 upvotes inside one calendar quarter post-launch | Public post history |

## 3. Audience

| Role | Who | Interest |
|---|---|---|
| Primary | Backend / platform engineer evaluating headless CMS or schema-first data platforms | Wants to see real schemas + real queries before writing a single line of integration code. |
| Primary | Tech lead deciding whether a small team can ship a content-heavy app on Revisium | Wants to see the operational story: federated APIs, file pipeline, branching, schema migration. |
| Secondary | DevRel / sales engineer demoing Revisium to a prospect | Wants a stable, polished URL to click through during a 5-minute live demo without preparing slides. |
| Secondary | AI agent (Claude Code, Cursor, etc.) reasoning about Revisium for a user | Wants discoverable, machine-readable hints: each page exposes the GraphQL query / REST endpoint / cloud.revisium.io deep link so an agent can imitate the pattern. |

## 4. Scope

### In scope

- Catalog pages for every dictionary table that demonstrates a distinct capability (regions, heroes, items, monsters, quests, parties, factions, npcs, locations — full list in [`revisium-feature-coverage.md`](../products/branching-tales/revisium-feature-coverage.md)).
- Detail pages for entities where foreign-key resolution / embedded arrays / computed fields are the load-bearing story (hero detail, item detail, quest detail, party detail, monster detail).
- A uniform per-page **Explainer Widget** (own UX spec to follow) that shows: the actual query/REST request the page is making, a JSON sample of the response, and a deep link into `cloud.revisium.io/revisium/{demo-rpg-data|demo-rpg-cms}` at the relevant table / row / schema.
- A live **JSON filter / sort panel** on catalog pages: visitor edits filters/sorts in a form, the panel renders the corresponding `where` / `orderBy` JSON in real time, and the page re-fetches.
- A **branching preview** UX: a toggle that switches the page between `master:head` and `master:draft` (with a visible explanation that this is Revisium's per-revision data view) — demonstrated on at least one page where draft data exists.
- A **search** entry point that hits Revisium's full-text search across all data + CMS tables.
- **Federation enrichment** showcase: at least one Revisium entity (e.g. `Region`, `Item`, `Hero`) has backend-contributed fields (likes counter, view counter, comments, computed-on-write rollups) federated onto the same GraphQL type via `@key` / `@external` / `@requires`. The explainer widget tags each field with the owning subgraph (`data` / `cms` / `backend`) so the visitor can see federation in action without reading SDL.
- CMS-driven content for the landing page (`landing_hero`, `landing_features`, `landing_testimonials`) and blog (`blog_posts`, `blog_authors`) — proving Revisium covers both dictionary and marketing-CMS use cases on the same platform.
- An on-page hint surfacing which API surface (`GraphQL` federated, `REST` direct, or `MCP`) each example would use, with a tab to swap between them where it makes sense.

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

- [ ] Given the visitor opens `/` for the first time, the homepage links to at least one page per Revisium primitive listed in [`revisium-feature-coverage.md`](../products/branching-tales/revisium-feature-coverage.md).
- [ ] Given the visitor opens any catalog page, the **Explainer Widget** is visible above the fold and answers "what Revisium feature is on this page?" in one sentence.

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

### US-5: Engineer seeing Apollo Federation in action

**As** an engineer who has read about Apollo Federation in theory,
**I want** to see one GraphQL type that visibly carries fields from two different subgraphs in the same response,
**so that** I understand "subgraph-owned fields" beyond hello-world federation examples.

**Acceptance:**

- [ ] Given a federated entity page (e.g. `/regions/whispering-vale`), the page renders at least one field owned by `demo-rpg-data` (e.g. `name`, `description`) *and* at least one field owned by `demo-rpg-backend` (e.g. `likes`, `viewCount`, `comments`) on the same card.
- [ ] Given the same page, the **Explainer Widget** tags each rendered field with its owning subgraph (`data` / `cms` / `backend`) — visible chip or footnote, not buried in a tooltip.
- [ ] Given the visitor expands the widget's "How does this work?" panel, the federation directives (`@key` on `RegionsNode`, `extend type RegionsNode @key(fields: "id") { likes: Int! }` on the backend side) are shown verbatim with a link to the backend's federation source.
- [ ] Given the visitor "likes" the region (if interactive) — out of scope for v1, but the API surface is shown read-only — the explainer notes that the same field would be a mutation on the backend subgraph, not on Revisium.

### US-6: AI agent imitating the pattern

**As** an AI coding agent helping a user build their first Revisium-backed app,
**I want** to discover, on each page, the GraphQL operation name + the REST endpoint + the MCP tool name + the cloud.revisium.io deep link,
**so that** I can recommend a working pattern without inventing one.

**Acceptance:**

- [ ] Given any page, the **Explainer Widget** content is HTML/text — not an image, canvas, or video — so it is indexable by a browsing agent.
- [ ] Given the page renders SSR, the widget content is present in the initial HTML, not added only after hydration.

## 6. Functional requirements

| Requirement | Priority | Status | Realised by |
|---|---|---|---|
| Every Revisium primitive in [`revisium-feature-coverage.md`](../products/branching-tales/revisium-feature-coverage.md) is demonstrated on at least one frontend page | Must | Draft | per-page docs under `products/branching-tales/pages/` |
| Every catalog and detail page renders an `ExplainerWidget` above the fold with: query body, JSON sample, cloud.revisium.io deep link, REST + MCP equivalents | Must | Draft | `products/branching-tales/explainer-widget.md` (UX spec — to follow) |
| Catalog pages expose a JSON filter / sort panel that shows the `where` / `orderBy` payload live as the user edits the form | Must | Draft | `products/branching-tales/pages/regions/` (reference page) + `products/branching-tales/pages/items/` |
| One page demonstrates the `head` vs `draft` branching toggle on Revisium data | Should | Draft | `products/branching-tales/pages/balance-patch/` (planned) |
| At least one Revisium-modeled entity has backend-federated fields (e.g. `RegionsNode.likes`, `ItemsNode.viewCount`) rendered alongside Revisium-owned fields in the same response; the page tags each rendered field with its owning subgraph | Must | Draft | `products/branching-tales/pages/regions/` (federated detail) + `demo-rpg-backend` adds `extend type` for the chosen entity |
| A global search bar uses Revisium's full-text search across `demo-rpg-data` + `demo-rpg-cms` tables | Should | Draft | `products/branching-tales/pages/search/` (planned) |
| Landing page is driven from `demo-rpg-cms` (hero, features, testimonials) — no hardcoded strings beyond brand-level copy | Must | Draft | `products/branching-tales/pages/home/` (planned) |
| Every page is SSR-rendered with no client-only fallback paths (the widget content is present in initial HTML) | Must | In delivery | demo-rpg-frontend SSR layer (already shipped) |
| Public-read access — visitors do not need to sign in or carry an API key for any read query | Must | Done | `demo-rpg-data` + `demo-rpg-cms` configured public-read |

## 7. Business rules and constraints

- **Same-origin** — `/graphql` is served under `demo-rpg.dev.revisium.io` so the browser only makes same-origin requests (Apollo Router CORS stays at its default). Implemented in `revisium/infrastructure#101`.
- **No write surface** — even when Revisium would allow it, the frontend uses read endpoints only. Any "edit" affordance on a row deep-links to `cloud.revisium.io` instead.
- **Schema is the source of truth** — page UI never invents fields. If a panel cannot be filled from the live schema, it is hidden until the schema gains the field.
- **Public DevRel surface** — no PII, no real customer data, no telemetry that re-identifies visitors. Aggregate analytics only.
- **English-first** — every user-facing string is at least `en`. `ru` / `zh` rendering is allowed but the en fallback must always be visible.

## 8. Non-functional requirements

| Category | Requirement |
|---|---|
| Performance | SSR TTFB ≤ 500 ms p95 from EU / US (cold subgraph round-trip excluded), client bundle ≤ 250 KB gzip for the entry chunk. |
| Availability | Demo stand uptime ≥ 99% measured monthly; Argo CD auto-syncs deployments; explicit outage banner if any subgraph reports unhealthy. |
| Security | Read-only public endpoints; no API keys in the client bundle; no third-party scripts beyond analytics (if added later); CSP set to deny inline scripts (with the necessary SSR hash allowances). |
| Audit | Every shipped page has a matching row in [`page-inventory.md`](../products/branching-tales/page-inventory.md) (to follow) and at least one acceptance test in `demo-rpg-frontend`. |

## 9. Open questions

| # | Question | Owner | Due | Status |
|---|---|---|---|---|
| 1 | Do we adopt the `revisium-ux` design system tokens verbatim, or do we re-tone Branching Tales to match a fantasy / game atmosphere while keeping the structural primitives? | @anton-revisium | TBD | Open |
| 2 | Which page hosts the branching toggle — a dedicated `/balance-patch` page or a banner on `/items` that toggles between drafted balance changes and the live values? | @anton-revisium | TBD | Open |
| 3 | Do we ship a minimal in-page MCP playground (paste-a-prompt → invokes a backend MCP tool over WebSockets), or just link out to the MCP tool list? Front-loads UX work vs. simply linking. | @anton-revisium | TBD | Open |
| 4 | Should the explainer widget surface the OpenAPI operation ID directly (e.g. `getRegions`) as well as the GraphQL operation name? | @anton-revisium | TBD | Open |
| 5 | Analytics: privacy-friendly (Plausible) or none at all for v1? Affects metric 3 in §2. | @anton-revisium | TBD | Open |
| 6 | Which Revisium entity gets the first backend-federated fields? `Region` (small set, easy `likes` + `viewCount`) is the natural starting point; `Item` (large catalog, fits a `wishlisted` counter) is the next most interesting. Drives which page in `pages/` is the federation reference. | @anton-revisium | TBD | Open |
| 7 | Backend-federated counters need durable storage (Postgres on the backend). Do we add a tiny `region_stats` / `item_stats` table and a sync job, or compute the counter on the fly from a `likes` event log? Affects schema migration story on the backend side. | @anton-revisium | TBD | Open |

## 10. Related artefacts

- **ADR**: [ADR-0001 — Federation with Revisium Cloud as a subgraph](../architecture/adr/ADR-0001-federation-with-revisium-cloud.md), [ADR-0002 — Dictionary vs CMS split](../architecture/adr/ADR-0002-dictionary-vs-cms-split.md).
- **Spec**: [schemas](../architecture/specs/schemas.md), [formulas](../architecture/specs/formulas.md), [files](../architecture/specs/files.md), [game design](../architecture/specs/game-design.md).
- **Product / UX docs**: [`products/branching-tales/`](../products/branching-tales/README.md) — capability matrix + page inventory + per-page UX contracts (mirroring `revisium-ux/products/admin/`).
- **Roadmap / tickets**: tracked in [`demo-rpg-frontend`](https://github.com/revisium/demo-rpg-frontend) issues once page docs are merged.

## Changelog

### v1 (2026-05-12)

- Initial draft. Umbrella BR scoping every Revisium primitive to a visible page, the per-page Explainer Widget pattern, the JSON filter / sort panel on catalogs, the branching preview, the CMS-driven landing, and a federation-enrichment showcase (Revisium-owned + backend-owned fields on the same GraphQL type, with per-field subgraph attribution).
