# Product

Branching Tales should read as a real RPG codex first and a Revisium demo
second.

## Public Story

Visitors browse a game database: regions, heroes, items, monsters, quests,
guides, and search. Revisium is visible through:

- source links to `cloud.revisium.io`;
- the Explainer Widget on data-backed pages;
- an `/about` page in the frontend;
- repo links for developers who want the implementation.

The home page should not feel like a generic SaaS landing page or admin
dashboard.

## Revisium Proof

- Schema-first content: game and CMS tables are defined in Revisium and exposed
  through generated APIs.
- One schema, several APIs: pages show GraphQL first, with REST/MCP equivalents
  where available.
- Federation: Apollo Router combines Revisium-owned fields with backend-owned
  fields.
- Files and media: codex art fields come from Revisium file values and frontend
  derivatives.
- Formulas: computed labels, totals, counts, and values come from schema
  formulas.
- Foreign keys: catalog and detail pages show linked rows and related entities.
- Branching: a balance-patch page can compare `head` and `draft` revisions.
- Public read: visitors can inspect source rows without signing in.

The full schema, migrations, and generated client are backend-owned. Do not keep
a duplicate data model in this repo.

## Route Scope

Exact route specs and implementation status live in
`demo-rpg-frontend/docs/product/`.

- Home and story: `/`, `/about`.
- World: `/regions`, `/regions/[id]`, `/locations`, `/factions`.
- Characters: `/heroes`, `/heroes/[id]`, `/classes`, `/abilities`, `/npcs`,
  `/parties`.
- Items: `/items`, `/items/[id]`, `/item-types`, `/stats`, `/effects`.
- Bestiary: `/monsters`, `/monsters/[id]`.
- Quests: `/quests`, `/quests/[id]`, `/dialogs`.
- Content: `/blog`, `/blog/[slug]`.
- Proof flows: `/search`, `/balance-patch`.

## Explainer Evidence

The frontend implementation contract for the widget lives in
`demo-rpg-frontend/docs/product/explainer-widget.md`.

The product expectation is simple: when a visitor opens the widget, they should
understand what Revisium feature the current page demonstrates and where the
source data lives.

Each page should expose only the evidence that is real for that page:

- GraphQL request and variables;
- sample response;
- owning subgraph chips where federation matters;
- cloud table/schema/row links;
- REST or MCP equivalents only when they exist;
- short summary in human language.

## Copy Direction

Use these phrases consistently:

- "Branching Tales is a public RPG codex backed by Revisium."
- "Browse the game first; open the source layer when you want to inspect how it
  works."
- "Revisium owns schemas, content, files, formulas, revisions, and generated API
  surfaces. The application writes the product-specific runtime layer."
