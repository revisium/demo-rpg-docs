# Branching Tales — Frontend Product & UX

UX/UI source of truth for `demo-rpg-frontend`.

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
- [Messaging](./messaging.md) — the canonical 80/20 narrative + the surface matrix (landing / about / news / blog / footer / README / DevRel). Every messaging surface pulls from here.
- **Page Functionality Reference** *(planned, `page-functionality.md`)* — recurring patterns: catalog, detail, JSON filter panel.
- [Explainer Widget Spec](./explainer-widget.md) — the per-page "How this uses Revisium" widget contract (anatomy, breakpoints, data contract, subgraph attribution, deep links, interplay, states, a11y).

## Relationship to `revisium-ux/products/admin`

This section mirrors the [`revisium-ux/products/admin/`](https://github.com/revisium/revisium-ux/tree/master/products/admin) layout deliberately — the demo's product/UX docs use the same shape (page inventory, page functionality, per-page docs with `Route` / `Purpose` / `Functional Blocks` / `Primary Actions` / `States` / `Transitions` tables) so a reader who has worked through the admin docs can pattern-match immediately.

What's different here:

- The audience is **public DevRel evaluators**, not internal admin users. Tone leans explanatory; the Explainer Widget exists *because* the audience is evaluating, not operating.
- Pages exist primarily to demonstrate Revisium capabilities, not to perform business work. Every page doc carries a `Revisium features demonstrated` block — see the coverage matrix.
- Design system tokens are reused from `revisium-ux/design-system`; tone is calmer than a typical game site, leaning into the "Revisium is a precise tool for structured data" positioning. The fantasy flavour is in the content (region names, hero classes), not in the chrome.

## Conventions

- Page docs follow the `revisium-ux/products/admin/pages/{section}/{page}/README.md` shape.
- Every page doc starts with `Route`, `Status`, `Purpose`, `Context And Entry` and ends with `Revisium features demonstrated` (a list of rows from the coverage matrix it implements).
- Mermaid for any non-trivial state diagram.
- Code samples reference the live `demo-rpg-frontend` source by path + line, not by paste; if a page diverges from its doc, fix one of them in the same PR.
