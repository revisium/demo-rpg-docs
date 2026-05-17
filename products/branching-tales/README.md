# Branching Tales — Frontend Product & UX

Product scope, messaging, and Revisium capability coverage for
`demo-rpg-frontend`.

The public product surface is a game database / RPG codex. Visitors should be
able to browse Branching Tales as game content first: heroes, items, monsters,
regions, quests, guides, search results, and related entities. Revisium remains
the technical proof layer exposed through the Explainer Widget, source links,
and the `/about` narrative.

This folder does **not** own the frontend implementation contract. Exact route
behaviour, page specs, layout, implementation status, and review gates live in
`demo-rpg-frontend/docs/`.

## Start Here

- [Revisium Feature Coverage Matrix](./revisium-feature-coverage.md) — every Revisium primitive mapped to the page that demonstrates it. **Read this first** — it scopes the whole frontend.
- [BR-0003 — Frontend Showcase](../../requirements/BR-0003-frontend-showcase.md) — the umbrella business requirement (the *why*).
- [Page Inventory](./page-inventory.md) — product-level route scope and links to the implementation contracts in `demo-rpg-frontend`.
- [Messaging](./messaging.md) — the canonical codex-first framing plus the
  80/20 proof narrative for `/about`, guides, footer/source references, README,
  and DevRel copy. Every messaging surface pulls from here.
- [Explainer Widget Spec](./explainer-widget.md) — product-level "How this uses Revisium" evidence contract. The component layout and descriptor implementation live in `demo-rpg-frontend/docs/product/explainer-widget.md`.

## Relationship to `revisium-ux/products/admin`

This section mirrors the [`revisium-ux/products/admin/`](https://github.com/revisium/revisium-ux/tree/master/products/admin) product documentation shape deliberately: product scope, capability coverage, page inventory, and messaging. Per-page implementation specs live with the frontend code so developers and review bots have one local contract to enforce.

What's different here:

- The primary visitor experience is **game database browsing**, not internal
  administration. Tone is concise and content-led; the Explainer Widget exists
  because evaluators still need proof of how each page is powered.
- Pages must be useful as catalogs and detail pages even before the technical
  panel is opened. Every implemented frontend page spec should point back to
  the relevant rows in the coverage matrix.
- Design system tokens are reused from `revisium-ux/design-system`, but the
  product shape follows RPG codex/database references. Fantasy flavour appears
  in content, imagery, metadata, and related-entity sections; Revisium proof
  appears in the Explainer Widget and source links.
- V1 top navigation uses direct links, not dropdowns. Section families expose
  sibling catalogs through on-page subnavigation.

## Conventions

- Do not add per-page implementation specs to this repo. Add or update them in
  `demo-rpg-frontend/docs/product/pages/`.
- Product-level route scope changes update [page-inventory.md](./page-inventory.md).
- Implementation status changes update `demo-rpg-frontend/docs/product/page-inventory.md`.
- Mermaid for any non-trivial state diagram.
- Code samples reference the live `demo-rpg-frontend` source by path + line, not by paste; if a page diverges from its doc, fix one of them in the same PR.
