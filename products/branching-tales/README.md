# Branching Tales — Frontend Product & UX

UX/UI source of truth for `demo-rpg-frontend`.

The public product surface is a game database / RPG codex. Visitors should be
able to browse Branching Tales as game content first: heroes, items, monsters,
regions, quests, guides, search results, and related entities. Revisium remains
the technical proof layer exposed through the Explainer Widget, source links,
and the `/about` narrative.

Status: scaffolding — capability matrix landed, per-page docs to follow.

Source snapshot:

- repository: `revisium/demo-rpg-frontend`
- branch inspected: `master`
- last commit reviewed: `42ce4e2` (2026-05-12)

Refresh this section after meaningful page, navigation, or layout changes in `demo-rpg-frontend`.

## Start Here

- [Revisium Feature Coverage Matrix](./revisium-feature-coverage.md) — every Revisium primitive mapped to the page that demonstrates it. **Read this first** — it scopes the whole frontend.
- [BR-0003 — Frontend Showcase](../../requirements/BR-0003-frontend-showcase.md) — the umbrella business requirement (the *why*).
- [Page Inventory](./page-inventory.md) — canonical list of every route, the data it reads, and the page doc that describes it.
- [Messaging](./messaging.md) — the canonical codex-first framing plus the
  80/20 proof narrative for `/about`, guides, footer/source references, README,
  and DevRel copy. Every messaging surface pulls from here.
- **Page Functionality Reference** *(planned, `page-functionality.md`)* — recurring patterns: catalog, detail, JSON filter panel.
- [Explainer Widget Spec](./explainer-widget.md) — the per-page "How this uses Revisium" widget contract (anatomy, breakpoints, data contract, subgraph attribution, deep links, interplay, states, a11y).

## Relationship to `revisium-ux/products/admin`

This section mirrors the [`revisium-ux/products/admin/`](https://github.com/revisium/revisium-ux/tree/master/products/admin) layout deliberately — the demo's product/UX docs use the same shape (page inventory, page functionality, per-page docs with `Route` / `Purpose` / `Functional Blocks` / `Primary Actions` / `States` / `Transitions` tables) so a reader who has worked through the admin docs can pattern-match immediately.

What's different here:

- The primary visitor experience is **game database browsing**, not internal
  administration. Tone is concise and content-led; the Explainer Widget exists
  because evaluators still need proof of how each page is powered.
- Pages must be useful as catalogs and detail pages even before the technical
  panel is opened. Every page doc still carries a `Revisium features
  demonstrated` block — see the coverage matrix.
- Design system tokens are reused from `revisium-ux/design-system`, but the
  product shape follows RPG codex/database references. Fantasy flavour appears
  in content, imagery, metadata, and related-entity sections; Revisium proof
  appears in the Explainer Widget and source links.
- V1 top navigation uses direct links, not dropdowns. Section families expose
  sibling catalogs through on-page subnavigation.

## Conventions

- Page docs follow the `revisium-ux/products/admin/pages/{section}/{page}/README.md` shape.
- Every page doc starts with `Route`, `Status`, `Purpose`, `Context And Entry` and ends with `Revisium features demonstrated` (a list of rows from the coverage matrix it implements).
- Mermaid for any non-trivial state diagram.
- Code samples reference the live `demo-rpg-frontend` source by path + line, not by paste; if a page diverges from its doc, fix one of them in the same PR.
