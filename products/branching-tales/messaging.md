# Messaging — Branching Tales

> Canonical 80 / 20 narrative for the Branching Tales demo. **Single source of truth** for landing copy, blog posts, news, footer chip, README abstracts, and DevRel posts. If a visitor walks away with one impression of the demo, it should be the one written below.

**Status:** v1 draft.
**Owner:** @anton-revisium
**Last updated:** 2026-05-12

**Navigation:** [products README](./README.md) · [BR-0003](../../requirements/BR-0003-frontend-showcase.md) · [feature coverage matrix](./revisium-feature-coverage.md) · [page inventory](./page-inventory.md)

## Why this doc exists

Every messaging surface in the demo — landing hero, feature cards, the `/about` page, the footer, the blog welcome post, the pinned news, the GitHub README, future Show-HN / DevRel posts — must tell the same story in the same words. Without one canonical place, the surfaces drift, the visitor gets four different one-liners, and the message loses its edge.

This doc captures:

1. The five message points (the *what*).
2. The surface matrix (the *where*).
3. Ready-to-use draft copy per surface.

Implementations (CMS seed rows, page components, repo READMEs) pull from §3. Updates flow back to §1/§2 first, never directly into the surfaces.

## 1. Message points

| # | Message | What it claims | What proves it on the demo |
|---|---|---|---|
| **M-1** | **Schema-first content** | Define one JSON Schema; REST + GraphQL + MCP appear automatically, with OpenAPI and SDL generated, not written. | Every `data.*` table renders a typed GraphQL type and an OpenAPI operation without a single hand-written controller. The Explainer Widget shows the auto-generated SDL excerpt. |
| **M-2** | **Federation glues two storage models** | Content lives in Revisium (versioned, schema-first); operational data lives in our backend (mutable, transactional). One GraphQL type, multiple subgraphs, one request from the client. | `RegionsNode { name (data) likes (backend) comments (backend) }` — Explainer Widget tags each rendered field with its owning subgraph (`data` / `cms` / `backend`). |
| **M-3** | **Branching for content** | Drafts and revisions for data, the way git does for code. Preview a balance patch in `master:draft` before publishing. | `/balance-patch` page swaps the revision URI; the widget shows `master:head` vs `master:draft` and the resulting JSON diff. |
| **M-4** | **Three surfaces for free** | REST + GraphQL + MCP from one schema — pick your client. AI agents call MCP, humans use REST or GraphQL, no extra plumbing. | Every Explainer Widget shows the same operation under three tabs. Same JSON shape, three transports. |
| **M-5** | **No glue code** | Migrations applied by CLI. OpenAPI client generated from schema. Types generated from codegen. You write only the business logic that's *uniquely yours*. | `revisium-cli` PreSync Job, `@hey-api/openapi-ts`-generated client in the backend, `graphql-codegen`-generated SDK in the frontend. The repos are small. |

The aggregate claim: **Revisium closes roughly 80% of the work; your backend writes the remaining 20%.**

- **Revisium does**: schemas, content, files, formulas, branching, search, three APIs, federation participation.
- **Your backend writes**: counters, comments, recommendations, aggregations, auth, cache, runtime state.

Don't soften the claim on any surface — the 80/20 frame is the punchline.

## 2. Surface matrix

Surfaces ordered from outermost (first impression) to innermost (already engaged):

| Surface | What it carries | Pull from §3 | Status |
|---|---|---|---|
| **Landing hero** (`/`) — `landing_hero.title` + `subtitle` | One-liner that frames the whole demo. | §3.1 | Planned (CMS seed pending). |
| **Landing features** (`/`) — 5 `landing_features` rows | One feature card per message point M-1 … M-5. | §3.2 | Planned (CMS seed pending). |
| **Landing testimonials** (`/`) — `landing_testimonials` rows | Quotes from fictional/composite users echoing M-2 / M-5. | §3.3 | Planned (CMS seed pending). |
| **`/about` page** | Long-form 80/20 story + architecture Mermaid diagram + "what Revisium did vs what we wrote" table. Anchor for everything else. | §3.4 | Planned (page doc to follow). |
| **Pinned news** (`/news` first row) | Time-stamped launch post: "Branching Tales v1.0 — what Revisium did, what we wrote." | §3.5 | Planned (news table + CMS seed pending). |
| **Blog welcome post** (`/blog/welcome`) | Long-form essay version of the same story for evaluators who want depth. Links back to `/about` and the GitHub repos. | §3.6 | Planned (CMS seed pending). |
| **Footer chip** (every page) | Permanent reminder of the stack composition. | §3.7 | Planned (component spec to follow). |
| **demo-rpg-frontend README abstract** | First 3 paragraphs of the repo README — for GitHub-side visitors. | §3.8 | Planned (separate PR). |
| **Explainer Widget federation disclosure** (every page that renders federated fields) | Per-page recap: shows the `extend type X @key { … }` excerpt + links the backend source. Implicit per-page reinforcement of M-2. | Specified in the `explainer-widget.md` §Anatomy block (planned — [PR #8](https://github.com/revisium/demo-rpg-docs/pull/8)). | Spec'd, implementation pending. |
| **Show-HN / DevRel posts** | External channel. Drafted from §3.5 and §3.6 — never written from scratch. | §3.5 + §3.6 with channel-specific intro. | Pending (post-launch). |

## 3. Draft copy

> The strings below are **first-pass draft**. Translation (`en` / `ru` / `zh`) is a separate workstream — see [BR-0003 §4](../../requirements/BR-0003-frontend-showcase.md#4-scope). For now, write the `en` field; `ru` / `zh` follow once the en copy is locked.

### 3.1 Landing hero

```text
title:    Branching Tales
subtitle: A fantasy adventurer's guild, built end-to-end on Revisium.
          Schemas, three APIs, a federated supergraph, branching previews —
          all without writing CRUD.
cta:      Browse the regions →  (links to /regions)
secondary_cta:  How this works →  (links to /about)
```

Tone: confident, technical, no exclamation marks. The subtitle's three commas walk the reader through M-1, M-2/M-4, M-3 in order.

### 3.2 Landing feature cards (one per message point)

| # | `title` | `body` | `icon` (planned) |
|---|---|---|---|
| 1 | One schema. Three APIs. | Define your data once in JSON Schema. Revisium gives you REST, GraphQL, and MCP automatically. We didn't write a controller for any of this. | `🧾` |
| 2 | Federate, don't migrate. | Content lives in Revisium. Counters, comments, and recommendations live in our backend. Apollo Router fuses them into a single GraphQL type per entity. One request, two storage models. | `🧬` |
| 3 | Git for data. | Try a balance patch in `master:draft`, see the diff, ship to `master:head`. Same workflow as your code. | `🌿` |
| 4 | Your client of choice. | REST for `curl`. GraphQL for the frontend. MCP for AI agents. Same operations under three transports, generated, not written. | `🔁` |
| 5 | No glue code. | Migrations applied by CLI, OpenAPI client generated from your schema, types generated from codegen. The remaining code is your actual business logic. | `🪶` |

(Icons are placeholders — design system tokens will replace.)

### 3.3 Landing testimonials

| Role | Quote |
|---|---|
| Backend engineer evaluating headless CMS | "I spent fifteen minutes clicking through the demo and I didn't have to read the docs once. The Explainer Widget is the docs." |
| Tech lead on a content-heavy product | "I needed three things — versioned content, a typed API, and an MCP surface — and I expected to integrate three vendors. Revisium did all three under one schema." |
| AI engineer | "MCP tools generated from the same schema as the REST endpoints, with the same arguments. I copy-pasted a Claude prompt and it worked." |

Quotes are composite — illustrative, not attributed to real people. Once we have actual evaluators, replace.

### 3.4 `/about` page

Page-spec lives under `products/branching-tales/pages/about/` (planned). Page body composes from this doc:

1. Hero block: repeat §3.1.
2. Mermaid architecture diagram: copy the diagram from `architecture/overview.md` so the page stays in sync.
3. **What Revisium did** table — one row per M-1..M-5, "evidence on the demo" column links to the relevant page (`/items` for filters, `/balance-patch` for branching, etc.).
4. **What we wrote** table — concrete list of backend-only features (counters, comments, recommendations, runtime state) with the source-file link.
5. Pull quote: "Roughly 80% of the demo wasn't written — it was generated. The 20% that was, is the part you'd write anyway."
6. CTA: "View the source on GitHub" → `demo-rpg-frontend`, `demo-rpg-backend`, `demo-rpg-docs`.

### 3.5 Pinned news — launch post

```text
category: release
pinned:   true
title:    Branching Tales v1.0 is live
excerpt:  A fantasy adventurer's guild, built end-to-end on Revisium. Here's
          what Revisium did, what we wrote, and how to evaluate the platform
          for your own product in fifteen minutes.
```

Body outline (markdown, ~600 words):

- Two-sentence opening: what Branching Tales is, where to click first.
- The 80/20 frame in plain prose: "Roughly 80% wasn't written, it was generated. The 20% that was, is the part you'd write anyway."
- M-1 with the auto-generated SDL excerpt.
- M-2 with the per-field subgraph chip screenshot.
- M-3 with the balance-patch toggle.
- M-4 with the three Explainer Widget tabs.
- M-5 with the actual line count of each repo.
- Three CTAs: "Try filtering 200 items," "See branching live," "Read the schema in cloud.revisium.io."

### 3.6 Blog welcome post

Long-form essay version of §3.5 (~2000 words) at `/blog/welcome`. Same structure, more depth on each M-#, more code excerpts, more "here's what we considered and rejected" colour. Pinned in the `blog_posts` table via the same boolean as news.

### 3.7 Footer chip

Permanent, present on every page:

```text
Powered by Revisium  ·  2 Revisium subgraphs + 1 NestJS subgraph
federated by Apollo Router  ·  View architecture →
```

The arrow links to `/about`. The chip carries a per-subgraph health dot (green = `supergraph-builder` composed within the last minute, red = stale). See [feature coverage matrix §7](./revisium-feature-coverage.md) row "Federated subgraph health view".

### 3.8 GitHub README abstract (demo-rpg-frontend)

First three paragraphs of `demo-rpg-frontend/README.md`:

```markdown
# Branching Tales — Frontend

A fantasy adventurer's guild simulator built end-to-end on Revisium.
Schemas, three APIs (REST + GraphQL + MCP), a federated Apollo Router
supergraph, branching previews — all without hand-written CRUD.

Live demo: https://demo-rpg.dev.revisium.io

Roughly 80% of this demo wasn't written, it was generated:
**Revisium** owns the schemas, content, files, formulas, branching, and
the three API surfaces; **our NestJS backend** writes only the things
Revisium isn't supposed to own — counters, comments, recommendations,
aggregations, auth, cache. Apollo Router fuses them into one GraphQL
supergraph; the client makes one request per page.

[Read the full architecture story →](https://demo-rpg.dev.revisium.io/about)
```

The current `README.md` keeps its stack table, commands, layout — this block goes above all of that.

## 4. Surfaces that do **not** carry the message

For clarity:

- Per-page Explainer Widget body (request panel + JSON sample + deep links) — this is *technical evidence*, not messaging. The messaging is the disclosure block at the top, not the code excerpt below.
- Brand chrome (logo, navigation, button labels) — stays in the frontend i18n bundle, never echoes the 80/20 frame.
- Error pages — don't editorialise; just say what failed.

## 5. Open questions

| # | Question | Owner | Due | Status |
|---|---|---|---|---|
| 1 | Should the `/about` page be a separate route or a section on `/`? Compromises: separate keeps `/` short and snappy; section keeps everything one scroll away. | @anton-revisium | TBD | Open |
| 2 | Footer chip — render it on the landing too (where the hero already carries M-1..M-5), or hide on `/` to avoid duplication? | @anton-revisium | TBD | Open |
| 3 | When we add `ru` and `zh` translations, do we localise the 80/20 numerical claim ("80% / 20%") or leave it as a number across locales? | @anton-revisium | TBD | Open |
| 4 | Pinned launch post: drop the `pinned` mechanism once it's been unpinned in v2, or keep one "essentials" post always pinned? Affects whether `pinned` is a one-time editorial flag or a permanent surface. | @anton-revisium | TBD | Open |
| 5 | Show-HN / DevRel: do we draft these posts inside `demo-rpg-docs` (committed) or outside (so they can iterate independently)? Committed = single source of truth, outside = faster to ship. | @anton-revisium | TBD | Open |

## 6. Related artefacts

- **BR**: [BR-0003 — Frontend Showcase](../../requirements/BR-0003-frontend-showcase.md) §4 scope (new bullets for news + /about), §6 functional requirement row for the messaging-surface rendering.
- **Page inventory**: [page-inventory.md](./page-inventory.md) — `/about`, `/news`, `/news/[slug]` rows.
- **Feature coverage matrix**: [revisium-feature-coverage.md](./revisium-feature-coverage.md) — new rows for multi-key `orderBy`, time-window `where` filter, pinned-post pattern (anchored on `/news`).
- **Explainer Widget**: `explainer-widget.md` — planned, lands via [PR #8](https://github.com/revisium/demo-rpg-docs/pull/8). The federation disclosure block is the per-page reinforcement of M-2.
- **Schemas spec**: [schemas.md](../../architecture/specs/schemas.md) — proposed `news` table (open question + draft section).

## Changelog

### v1 (2026-05-12)

- Initial draft. Five message points (M-1..M-5), surface matrix (10 surfaces), draft copy for landing hero / feature cards / testimonials / about / pinned news / blog welcome / footer / README, 5 open questions.
