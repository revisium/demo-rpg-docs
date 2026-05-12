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
- [Page Inventory](./page-inventory.md) — every route and what it does. *(planned)*
- [Page Functionality Reference](./page-functionality.md) — recurring patterns: catalog, detail, explainer widget, JSON filter panel. *(planned)*
- [Explainer Widget Spec](./explainer-widget.md) — the per-page "How this uses Revisium" widget contract. *(planned)*

## Relationship to `revisium-ux/products/admin`

This section mirrors the [`revisium-ux/products/admin/`](https://github.com/revisium/revisium-ux/tree/master/products/admin) layout deliberately — the demo's product/UX docs use the same shape (page inventory, page functionality, per-page docs with `Route` / `Purpose` / `Functional Blocks` / `Primary Actions` / `States` / `Transitions` tables) so a reader who has worked through the admin docs can pattern-match immediately.

What's different here:

- The audience is **public DevRel evaluators**, not internal admin users. Tone leans explanatory; the Explainer Widget exists *because* the audience is evaluating, not operating.
- Pages exist primarily to demonstrate Revisium capabilities, not to perform business work. Every page doc carries a `Revisium features demonstrated` block — see the coverage matrix.
- Design system tokens are reused from `revisium-ux/design-system`; tone is calmer than a typical game site, leaning into the "Revisium is a precise tool for structured data" positioning. The fantasy flavour is in the content (region names, hero classes), not in the chrome.

## Planned Page Set

- `home/` — landing page, CMS-driven (`landing_hero`, `landing_features`, `landing_testimonials`).
- `regions/` — first catalog page (already shipped end-to-end). Reference for the JSON filter / sort panel and the Explainer Widget.
- `regions/[id]/` — federated detail page: Revisium fields + backend fields on the same `RegionsNode` (likes, view count, comments).
- `heroes/`, `heroes/[id]/` — catalog + detail; demonstrates portrait file fields, formula fields (`is_veteran`, `total_equipment_modifier`).
- `items/`, `items/[id]/` — large catalog; demonstrates complex filtering / sorting, computed `market_value` / `rarity_tag`, SVG icon files.
- `monsters/`, `monsters/[id]/` — embedded drop arrays, formula aggregates (`avg_drop_chance`, `max_drop_quantity`).
- `quests/`, `quests/[id]/` — embedded steps + loot arrays, two-level nested formula sums (`total_xp`, `total_loot_xp`).
- `parties/`, `parties/[id]/` — array foreign keys (`members[]`), formula counters (`member_count`, `is_full`).
- `factions/`, `factions/[id]/` — single + array FKs, SVG crest files, ally counters.
- `npcs/`, `locations/`, `classes/`, `abilities/` — smaller catalogs; rotate through file types and FK shapes.
- `search/` — global full-text search across all 15 + 5 tables, results grouped by table.
- `blog/`, `blog/[slug]/` — CMS-driven blog pages, OG-image file fields.
- `balance-patch/` *(open question — see BR-0003 §9 Q2)* — branching showcase: `master:head` vs `master:draft` for `items` after a balance pass.

## Conventions

- Page docs follow the `revisium-ux/products/admin/pages/{section}/{page}/README.md` shape.
- Every page doc starts with `Route`, `Status`, `Purpose`, `Context And Entry` and ends with `Revisium features demonstrated` (a list of rows from the coverage matrix it implements).
- Mermaid for any non-trivial state diagram.
- Code samples reference the live `demo-rpg-frontend` source by path + line, not by paste; if a page diverges from its doc, fix one of them in the same PR.
