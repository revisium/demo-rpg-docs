# Explainer Widget

Product-level contract for the cross-cutting "How this uses Revisium" widget in
the Branching Tales frontend.

**Status:** v1 product scope.
**Owner:** @anton-revisium
**Last updated:** 2026-05-17

**Navigation:** [products README](./README.md) ·
[BR-0003](../../requirements/BR-0003-frontend-showcase.md) ·
[feature coverage matrix](./revisium-feature-coverage.md) ·
[page inventory](./page-inventory.md)

## Boundary

This file defines what the widget must prove to a visitor. The exact descriptor
TypeScript shape, component layout, responsive behaviour, and implementation
constraints live in
[`demo-rpg-frontend/docs/product/explainer-widget.md`](https://github.com/revisium/demo-rpg-frontend/blob/master/docs/product/explainer-widget.md).

Do not duplicate frontend component rules here. When the product claim changes,
update this file and the frontend implementation contract in the same PR.

## Purpose

Surface the source of every important page claim:

- the exact GraphQL operation the page used;
- the variables derived from filters, locale, cursor, route id, or revision;
- a real response sample from the page request;
- the subgraph that owns each rendered field when federation is visible;
- deep links to source tables, schemas, rows, OpenAPI, MCP tools, or backend SDL.

The widget lets a developer evaluate Revisium without leaving the RPG codex
experience or guessing which part was generated.

## Required On

| Page family | Required | Product reason |
|---|---|---|
| Catalog pages | Yes | Prove schema-generated list queries, filters, pagination, and file fields. |
| Detail pages | Yes | Prove row shape, FKs, files, formulas, and related entities. |
| Search | Yes | Prove full-text search across data/CMS. |
| Balance patch | Yes | Prove `head` vs `draft` revision switching and diff calls. |
| Blog and guides | Yes | Prove CMS subgraph content. |
| Home | Only beside live CMS/data sections | Static brand copy does not need source proof. |
| Error pages | No | There is no successful Revisium request to explain. |

## Evidence Blocks

| Block | Product requirement |
|---|---|
| Summary | One plain sentence naming the Revisium capability on the page. |
| Subgraph chips | Show `data`, `cms`, and/or `backend` ownership for the current page. |
| GraphQL surface | Always present; shows the operation body. |
| REST surface | Present only when a real equivalent exists. |
| MCP surface | Present only when a real MCP tool exists. |
| Variables | Reflect current page state, not a static example. |
| Response sample | Use the latest successful page response, capped for readability. |
| Deep links | Link to cloud table/schema/row and backend/source references where relevant. |
| Federation disclosure | Required when one rendered entity combines fields from multiple subgraphs. |
| Public-read note | Reinforce that the same read can be repeated anonymously. |

## API Surface Rules

- GraphQL is the default proof surface for every implemented page.
- REST and MCP tabs are hidden until the page has a verified equivalent. Do not
  show aspirational tabs.
- Link labels should name the source, not the implementation detail: "View
  schema", "View row", "View OpenAPI", "View MCP tool", "View federation SDL".
- The widget is a proof layer, not the first content layer. Catalog/detail pages
  must remain useful as game database pages before the widget is opened.

## Capability Mapping

Each page's widget summary should be derived from the relevant rows in
[revisium-feature-coverage.md](./revisium-feature-coverage.md). A capability is
not `Done` until both the user-facing page and the widget evidence exist in the
frontend implementation.

## Related Artefacts

- Frontend implementation contract:
  `demo-rpg-frontend/docs/product/explainer-widget.md`.
- Widget source:
  `demo-rpg-frontend/src/widgets/explainer-widget/`.
- Page specs:
  `demo-rpg-frontend/docs/product/pages/`.
